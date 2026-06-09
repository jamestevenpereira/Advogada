# Relatório de Auditoria Adversarial — conceicaolopesadvogada.pt

**Data:** 2026-06-09
**Auditores:** Red Team / Segurança (Agente 1), Legal & Compliance EU/Portugal (Agente 2), Crítico de Produto / Concorrente (Agente 3)
**Âmbito:** Auditoria completa do projeto, autorizada. Produto serve clientes em Portugal e na União Europeia.

---

## 1. Resumo Executivo

O site é visualmente cuidado mas apresenta vários riscos sérios, concretos e rapidamente corrigíveis. O problema operacional mais grave é que **todos os pedidos de agendamento submetidos por clientes reais são silenciosamente encaminhados para o Gmail pessoal do programador** em vez do escritório da advogada — o que significa que dados dos clientes (nomes, números de telefone, situações jurídicas declaradas) estão a ser enviados a uma terceira parte não autorizada a cada submissão. Agravando isto, a Política de Privacidade está criticamente incompleta ao abrigo do RGPD/Art. 13, sem menção aos processadores de dados efetivamente usados (Firebase/Google, EmailJS), sem base legal declarada e sem prazos de retenção. Serviços de terceiros carregam antes do consentimento em todas as páginas. Uma password em texto claro foi committed para um repositório GitHub público. O site não tem Termos & Condições nem aviso profissional de "não constitui aconselhamento jurídico" — uma lacuna de responsabilidade grave para um escritório de advocacia.

---

## 2. Riscos Críticos Transversais a Todos os Agentes

| # | Risco | Agentes | Severidade |
|---|-------|---------|-----------|
| 1 | Gmail pessoal do programador recebe todos os dados de agendamento dos clientes | Agente 3 | **Crítico** |
| 2 | Política de Privacidade sem os elementos obrigatórios do Art. 13 do RGPD | Agente 2 | **Crítico** |
| 3 | `Dados.txt` com password em texto claro committed no repositório GitHub público | Agente 2 | **Alto** |
| 4 | Google Fonts CDN + iframe do Google Maps carregam antes do consentimento | Agente 2 | **Alto** |
| 5 | Firebase e EmailJS não divulgados como subprocessadores de dados | Agente 2 | **Alto** |
| 6 | Não existe página de Termos & Condições em nenhuma parte do site | Agente 2 | **Alto** |
| 7 | Sem aviso "não constitui aconselhamento jurídico" no site de um escritório de advocacia | Agente 2 + Agente 3 | **Alto** |
| 8 | Dados pessoais dos clientes impressos no console do browser a cada submissão | Agente 3 (disputado pelo Agente 1 — verificar) | **Alto** |
| 9 | `og-image.jpg` inexistente — todas as partilhas sociais mostram pré-visualização quebrada | Agente 3 | **Alto** |
| 10 | Consentimento de cookies sem granularidade; cookies de terceiros não listados | Agente 2 | **Alto** |

---

## 3. Findings por Agente

---

### Agente 1 — Red Team / Segurança

**Resumo:** Não foram encontradas vulnerabilidades exploráveis de alta confiança. A postura de segurança é adequada para uma aplicação Angular estática sem renderização de HTML gerado pelo utilizador. O Agente 1 analisou commits recentes e concluiu que melhoram a segurança (headers CSP adicionados, console.logs removidos). No entanto, os Agentes 2 e 3 encontraram evidências contraditórias na working tree (console.logs ainda presentes, sem CSP no vercel.json). **Discrepância assinalada — estes dois itens devem ser verificados manualmente antes de aceitar qualquer avaliação como definitiva.**

---

#### SEC-01: Escritas no Firestore sem Autenticação na Coleção `leads`

- **Severidade:** Média
- **Evidência:** [src/app/services/firebase.service.ts](src/app/services/firebase.service.ts) — `addDoc()` para a coleção `leads` sem qualquer verificação de autenticação
- **Impacto:** Qualquer pessoa com a chave pública do Firebase (visível no bundle do cliente) pode inundar a coleção `leads` com dados arbitrários via API REST do Firestore. Pode sobrecarregar a caixa de entrada da advogada ou esgotar a quota do plano gratuito do Firestore.
- **Correção recomendada:** Adicionar Firebase Security Rules que limitem ou restrinjam as escritas em `leads` (ex: exigir token reCAPTCHA válido ou implementar rate-limit por IP via Cloud Function intermediária).
- **Corrigido?** Não — apenas reportado.

---

#### SEC-02: CSP com `'unsafe-inline'` em `script-src` / Sem CSP (Discrepância)

- **Severidade:** Média
- **Evidência:** O Agente 1 encontrou `vercel.json` a adicionar `script-src 'self' 'unsafe-inline'`; o Agente 2 não encontrou qualquer header CSP no `vercel.json`. Não podem ambos ser verdade para o mesmo estado do ficheiro — **verificação manual necessária**.
- **Impacto:** Se `unsafe-inline` estiver presente: reduz a proteção XSS (risco efetivo baixo nesta app sem renderização de HTML controlado pelo utilizador). Se o CSP estiver completamente ausente: sem proteção contra scripts injetados na página do formulário que recolhe dados pessoais.
- **Correção recomendada:** Adicionar um CSP estrito ao `vercel.json` que permita apenas `'self'`, `fonts.googleapis.com`, `fonts.gstatic.com`, `*.firebaseapp.com`, `*.googleapis.com`, `api.emailjs.com` e `maps.googleapis.com`. Evitar `unsafe-inline`.
- **Corrigido?** Não — verificar estado primeiro.

---

#### SEC-03: Chave API Firebase e Credenciais EmailJS no Bundle do Cliente

- **Severidade:** Baixa (por design)
- **Evidência:** [src/environments/environment.prod.ts](src/environments/environment.prod.ts) — `apiKey`, `measurementId`, EmailJS `serviceId`, `templateId`, `publicKey`
- **Impacto:** As chaves de cliente do Firebase e as chaves públicas do EmailJS são intencionalmente públicas — são concebidas para serem incorporadas nos bundles do browser. A segurança é aplicada via Firebase Security Rules e listas de domínios permitidos no EmailJS, não pelo sigilo das chaves. Não é uma vulnerabilidade a menos que essas regras estejam mal configuradas.
- **Correção recomendada:** Verificar que as Firebase Security Rules são adequadamente restritivas (requer acesso à consola Firebase). Verificar que o domínio EmailJS está restrito no painel EmailJS.
- **Corrigido?** N/A — requer verificação externa.

---

### Agente 2 — Legal & Compliance EU/Portugal

---

#### LEG-01: Política de Privacidade Criticamente Incompleta

- **Severidade:** Crítica
- **Evidência:** [src/app/pages/privacy-policy/privacy-policy.component.html](src/app/pages/privacy-policy/privacy-policy.component.html) — 35 linhas no total, apenas 4 secções
- **Impacto:** Não conforme com o Art. 13 do RGPD. Em falta: base legal do tratamento, prazos de conservação dos dados, lista de subprocessadores (Firebase/Google, EmailJS), divulgações de transferências internacionais, direito à portabilidade (Art. 20), direito de reclamação à CNPD (Art. 77), designação de DPO ou declaração de dispensa, e identidade completa do responsável pelo tratamento (nome + morada + NIF). Coima potencial da CNPD até 20M€ ou 4% do volume de negócios. Cria também risco reputacional para uma advogada cujo próprio site viola a lei de proteção de dados.
- **Ficheiros afetados:** [src/app/pages/privacy-policy/privacy-policy.component.html](src/app/pages/privacy-policy/privacy-policy.component.html)
- **Correção recomendada:** Reescrita completa para satisfazer os requisitos do Art. 13 do RGPD, revista por especialista em proteção de dados. Adições mínimas: base legal, prazos de conservação, lista completa de processadores/subprocessadores, mecanismo de transferência internacional (CCPs para Firebase/Google e EmailJS), os seis direitos dos titulares, contacto da CNPD e identificação completa do responsável pelo tratamento.
- **Corrigido?** Não — requer revisão jurídica e reescrita.
- **Classificação:** Problema confirmado.

---

#### LEG-02: Não Existe Página de Termos & Condições

- **Severidade:** Alta
- **Evidência:** [src/app/app.routes.ts](src/app/app.routes.ts) — Rotas definidas: `/`, `/sobre`, `/areas`, `/agendamento`, `/politica-privacidade`, `/politica-cookies`. Sem rota `/termos-e-condicoes` ou `/aviso-legal`. Grep em toda a pasta `src/` confirma ausência de qualquer componente com esse conteúdo.
- **Impacto:** Sem cláusula de limitação de responsabilidade, sem proibições de uso, sem cláusula de jurisdição. O DL 7/2004 (lei do comércio eletrónico português) exige informação pré-contratual incluindo identidade do prestador, lei aplicável e resolução de litígios. O Estatuto da Ordem dos Advogados exige transparência sobre os termos do mandato.
- **Correção recomendada:** Criar página `/termos-e-condicoes` (ou `/aviso-legal`) cobrindo: identidade do prestador de serviços, âmbito do conteúdo do site, jurisdição, limitação de responsabilidade e declaração clara de que o conteúdo do site não constitui aconselhamento jurídico.
- **Corrigido?** Não — nova página necessária.
- **Classificação:** Problema confirmado.

---

#### LEG-03: Google Fonts CDN Carrega Antes do Consentimento

- **Severidade:** Alta
- **Evidência:** [src/index.html](src/index.html) linhas 35–41 — `<link rel="preconnect" href="https://fonts.googleapis.com">` é executado em cada carregamento de página. [src/app/components/cookie-consent/cookie-consent.component.ts](src/app/components/cookie-consent/cookie-consent.component.ts) linha 33 — `setTimeout(() => this.showBanner.set(true), 1500)` atrasa o banner em 1,5 segundos. As fontes carregam antes de o utilizador poder interagir com a UI de consentimento.
- **Impacto:** Os pedidos ao CDN do Google Fonts transmitem o endereço IP do utilizador para servidores Google antes do consentimento. Uma decisão judicial alemã de 2022 (LG München I) e orientações da CNPD tratam isto como uma violação do RGPD. Afeta cada carregamento de página.
- **Correção recomendada:** Alojar as fontes Google localmente, fazendo download dos ficheiros de fonte e servindo-os a partir de `/assets`. Elimina completamente o pedido ao CDN e é a solução mais limpa.
- **Corrigido?** Não — apenas reportado.
- **Classificação:** Problema técnico confirmado.

---

#### LEG-04: Iframe do Google Maps Carrega Antes do Consentimento

- **Severidade:** Alta
- **Evidência:** [src/app/pages/about/about.component.html](src/app/pages/about/about.component.html) linhas 134–138 — `<iframe src="https://www.google.com/maps/embed?...">` carrega incondicionalmente na página Sobre, sem qualquer bloqueio de consentimento.
- **Impacto:** O Google Maps define cookies e transmite dados do utilizador para o Google ao carregar a página. Não é solicitado qualquer consentimento. Mesma exposição legal que LEG-03.
- **Correção recomendada:** Substituir o iframe por uma captura de ecrã estática do mapa com uma sobreposição: "Clique para carregar o mapa interativo (Google irá processar os seus dados)." Carregar o iframe real apenas após clique/consentimento.
- **Corrigido?** Não — apenas reportado.
- **Classificação:** Problema técnico confirmado.

---

#### LEG-05: Firebase e EmailJS Não Divulgados como Subprocessadores

- **Severidade:** Alta
- **Evidência:** [src/app/services/firebase.service.ts](src/app/services/firebase.service.ts) + [src/app/services/email.service.ts](src/app/services/email.service.ts) — Dados dos utilizadores fluem para o Firebase Firestore e EmailJS a cada submissão do formulário. [src/app/pages/privacy-policy/privacy-policy.component.html](src/app/pages/privacy-policy/privacy-policy.component.html) — Nenhum dos serviços é mencionado em qualquer parte da política de privacidade.
- **Impacto:** O Art. 13(1)(e) do RGPD exige que, no momento da recolha de dados, os utilizadores sejam informados dos destinatários dos seus dados pessoais. O Firebase (Google LLC, EUA) e o EmailJS (EUA) envolvem transferências internacionais ao abrigo do Art. 46. Adicionalmente: existem Contratos de Tratamento de Dados (DPAs) celebrados com ambos os serviços? Não pode ser verificado a partir deste repositório.
- **Correção recomendada:** Adicionar secção de subprocessadores à política de privacidade. Para cada processador: finalidade, localização do tratamento de dados, mecanismo legal de transferência (decisão de adequação ou CCPs). Verificar existência de DPAs com Firebase/Google e EmailJS.
- **Corrigido?** Não — requer atualização da política e verificação externa.
- **Classificação:** Problema confirmado.

---

#### LEG-06: Ficheiro de Credenciais Committed no Repositório GitHub Público

- **Severidade:** Alta
- **Evidência:** `Dados.txt` (raiz do repositório) contém:
  ```
  Password - LpdTzd9T8_36gJy
  Service Key - service_cwkcr1a
  Template Key - template_uufnfct
  ```
  `Dados.txt` NÃO está no `.gitignore`. O repositório é público em `github.com/jamestevenpereira/Advogada` (confirmado em `DOCUMENTACAO_EXTERNA.txt`).
- **Impacto:** Uma password em texto claro de finalidade desconhecida está publicamente exposta no histórico git. Se for uma password de conta de administrador, email ou serviço, está comprometida. As chaves de serviço/template do EmailJS também estão expostas (risco menor mas desnecessário).
- **Correção recomendada:** (1) Rotacionar/invalidar imediatamente a password em `Dados.txt`. (2) Adicionar `Dados.txt` ao `.gitignore` agora. (3) Usar `git filter-repo` para remover o ficheiro de todo o histórico e fazer force-push. (4) Auditar a que conta/serviço pertence a password.
- **Corrigido?** Não — ação imediata necessária.
- **Classificação:** Problema confirmado.

---

#### LEG-07: Sem Aviso "Não Constitui Aconselhamento Jurídico"

- **Severidade:** Alta
- **Evidência:** Toda a pasta `src/app/pages/` revista. Sem aviso em nenhuma página. [src/app/pages/home/home.component.ts](src/app/pages/home/home.component.ts) linhas 37–61 — FAQ fornece respostas a questões jurídicas (prazos de divórcio, elegibilidade para apoio judiciário). As páginas de áreas de prática fazem afirmações jurídicas substantivas.
- **Impacto:** Sem aviso legal, o site cria exposição de responsabilidade profissional. Se um utilizador agir com base no conteúdo da FAQ e sofrer danos, a ausência de "isto não é aconselhamento jurídico" enfraquece a posição da advogada. É prática padrão em todos os sites de advocacia da UE e requerida pelo Estatuto da Ordem dos Advogados.
- **Correção recomendada:** Adicionar um "Aviso Legal" no rodapé e no topo da FAQ: *"O conteúdo deste website tem carácter meramente informativo e não constitui aconselhamento jurídico. A relação de cliente só se estabelece mediante contrato formal de mandato."*
- **Corrigido?** Não — adição de conteúdo necessária.
- **Classificação:** Problema confirmado.

---

#### LEG-08: Consentimento de Cookies Sem Granularidade de Categorias

- **Severidade:** Alta
- **Evidência:** [src/app/components/cookie-consent/cookie-consent.component.html](src/app/components/cookie-consent/cookie-consent.component.html) — Banner oferece apenas "Aceitar" / "Recusar" sem desagregação por categoria. [src/app/pages/cookie-policy/cookie-policy.component.html](src/app/pages/cookie-policy/cookie-policy.component.html) — Lista apenas "Cookies Essenciais" e "Cookies de Funcionalidade" — não menciona pedidos CDN do Google Fonts, iframe do Google Maps, nem SDK do Firebase.
- **Impacto:** A Diretiva ePrivacy e o Considerando 32 do RGPD exigem consentimento informado e específico. Dizer aos utilizadores que apenas são usados "cookies essenciais e funcionais", enquanto o Google Fonts e o Maps fazem pedidos de rede ao Google, é materialmente enganoso.
- **Correção recomendada:** (1) Auditar todos os cookies/pedidos em tempo de execução. (2) Atualizar a política de cookies para listar com precisão todos os pedidos de terceiros. (3) Implementar consentimento granular (Essenciais / Funcionais+Analíticos). (4) Bloquear o iframe do Google Maps até ao consentimento (ver LEG-04).
- **Corrigido?** Não.
- **Classificação:** Problema confirmado.

---

#### LEG-09: Texto da Checkbox RGPD Genérico e Não Informativo

- **Severidade:** Média
- **Evidência:** [src/app/pages/scheduling/scheduling.component.html](src/app/pages/scheduling/scheduling.component.html) linhas 171–176 — Texto: *"Eu concordo que este site armazene as informações enviadas por mim de forma a que se proceda à resposta da informação solicitada."* Sem menção ao Firebase, sem link para a política de privacidade, sem base legal declarada.
- **Impacto:** Ao abrigo do Art. 7 e do Considerando 42 do RGPD, o consentimento deve ser específico e informado. "Este site armazena as suas informações" sem nomear os processadores nem ligar à política de privacidade provavelmente não constitui consentimento informado válido.
- **Correção recomendada:** Reescrever para nomear o processador real, incluir link inline para a política de privacidade e clarificar a base legal. Exemplo: *"Concordo com o tratamento dos meus dados pessoais pela Dra. Conceição Lopes (via Firebase/Google) para resposta ao pedido de agendamento. [Política de Privacidade]"*
- **Corrigido?** Não.
- **Classificação:** Problema confirmado.

---

#### LEG-10 / PROD-04 (MERGED): robots.txt Bloqueia Política de Privacidade e Política de Cookies dos Motores de Busca

- **Severidade:** Média
- **Evidência:** [src/robots.txt](src/robots.txt) linhas 3–4:
  ```
  Disallow: /politica-privacidade
  Disallow: /politica-cookies
  ```
  Também: [src/sitemap.xml](src/sitemap.xml) — nenhuma das páginas está incluída no sitemap.
- **Impacto:** As páginas de conformidade são invisíveis para os motores de busca. Uma autoridade de proteção de dados ou verificação de due diligence que consulte o `robots.txt` verá o site a impedir explicitamente os utilizadores de encontrar a política de privacidade via Google — o oposto dos princípios de transparência do RGPD (Considerando 39). Utilizadores que pesquisem a política de privacidade não a encontram através da pesquisa.
- **Correção recomendada:** Remover ambas as linhas `Disallow`. Adicionar ambos os URLs ao `sitemap.xml`.
- **Corrigido?** Não.
- **Classificação:** Problema confirmado.

---

#### LEG-11: Testemunhos Hard-Coded — Autenticidade Não Verificável

- **Severidade:** Média
- **Evidência:** [src/app/pages/home/home.component.ts](src/app/pages/home/home.component.ts) linhas 96–138 — Sete testemunhos codificados como objetos TypeScript com nomes como "Maria João", "Ricardo André", "Paula Santos".
- **Impacto:** A Diretiva 2005/29/CE (práticas comerciais desleais) proíbe testemunhos fabricados. Mesmo que autênticos, não há transparência sobre como foram recolhidos ou se representam todo o feedback recebido.
- **Correção recomendada:** Substituir por widget de Google Reviews incorporado (testemunhos verificáveis de terceiros), ou confirmar que cada testemunho é de um cliente real com consentimento escrito para publicação e adicionar nota: *"Testemunhos reais de clientes, partilhados com consentimento."*
- **Corrigido?** Não.
- **Classificação:** Risco potencial — autenticidade não pode ser determinada a partir do código.

---

#### LEG-12: Sem Informação Pré-Contratual Antes do Formulário de Agendamento

- **Severidade:** Média
- **Evidência:** [src/app/pages/scheduling/scheduling.component.html](src/app/pages/scheduling/scheduling.component.html) — Apenas a checkbox RGPD é apresentada antes da submissão. Sem T&C, sem política de cancelamento, sem informação pré-contratual exigida pelo DL 7/2004 Art. 10.
- **Impacto:** O DL 7/2004 (lei portuguesa do comércio eletrónico que transpõe a Diretiva 2000/31/CE) exige que os prestadores de serviços disponibilizem ao destinatário, antes de colocar um pedido, informação sobre: identidade do prestador, preços, características principais do serviço e condições de cancelamento.
- **Corrigido?** Não.
- **Classificação:** Risco potencial — requer revisão jurídica sobre a aplicabilidade ao formulário de agendamento.

---

#### LEG-13: `measurementId` do GA4 Presente mas Analytics Não Inicializado

- **Severidade:** Baixa
- **Evidência:** [src/environments/environment.prod.ts](src/environments/environment.prod.ts) — `measurementId: "G-99QVJXWM66"` presente. Nenhuma chamada a `provideAnalytics()` ou `getAnalytics()` encontrada em `src/`.
- **Impacto:** O GA4 não está atualmente ativo. No entanto, um programador futuro que adicione `getAnalytics()` sem bloqueio de consentimento criaria imediatamente uma violação do RGPD. A chave de propriedade GA4 também está exposta publicamente sem necessidade.
- **Correção recomendada:** Remover `measurementId` dos ficheiros de ambiente, ou documentar explicitamente que só pode ser inicializado após consentimento e implementar o padrão de ativação condicional ao consentimento antes de ativar o analytics.
- **Corrigido?** Não.
- **Classificação:** Risco atual baixo; risco futuro real.

---

#### LEG-14: Sem Verificação de Idade no Formulário de Recolha de Dados

- **Severidade:** Baixa
- **Evidência:** [src/app/pages/scheduling/scheduling.component.html](src/app/pages/scheduling/scheduling.component.html) — Sem qualquer verificação de idade.
- **Impacto:** O Art. 8 do RGPD fixa a idade de consentimento digital nos 16 anos em Portugal. Um menor que submeta o formulário requer consentimento parental que atualmente não é solicitado nem documentado.
- **Correção recomendada:** Adicionar checkbox: *"Confirmo que tenho 16 ou mais anos, ou que tenho consentimento parental para submeter este formulário."*
- **Corrigido?** Não.
- **Classificação:** Risco potencial.

---

### Agente 3 — Crítico de Produto / Concorrente

---

#### PROD-01: Gmail Pessoal do Programador Recebe Todos os Pedidos de Agendamento dos Clientes

- **Severidade:** Crítica
- **Evidência:** [src/app/services/email.service.ts](src/app/services/email.service.ts) linhas 25–36:
  ```typescript
  private readonly TEST_RECIPIENT_EMAIL = 'jamestevenpereira@gmail.com';
  // ...
  to_email: this.TEST_RECIPIENT_EMAIL,
  ```
- **Impacto:** Cada submissão do formulário de agendamento encaminha o nome, email, telefone, situação jurídica e data solicitada do cliente para o Gmail pessoal do programador — uma terceira parte sem qualquer obrigação legal de sigilo profissional. O escritório da advogada provavelmente nunca recebe estes pedidos. É simultaneamente uma falha operacional crítica (clientes não recebem resposta), uma violação do Art. 5 do RGPD (minimização de dados — dados partilhados com parte não autorizada) e um problema deontológico perante a Ordem dos Advogados.
- **Ficheiros/rotas afetados:** [src/app/services/email.service.ts](src/app/services/email.service.ts), `/agendamento`
- **Passos para reproduzir:** Submeter o formulário em `/agendamento` com dados de teste. Verificar que nenhum email chega a `conceicao-66631c@adv.oa.pt`.
- **Correção recomendada:** Substituir `jamestevenpereira@gmail.com` por `conceicao-66631c@adv.oa.pt` e renomear a constante removendo o prefixo `TEST_`. **É uma alteração de uma linha.**
- **Corrigido?** Não — ação imediata necessária.
- **Classificação:** Problema confirmado.

---

#### PROD-02: Código de Produção Imprime Dados Pessoais dos Clientes no Console do Browser

- **Severidade:** Alta (disputado — verificar)
- **Evidência:** [src/app/pages/scheduling/scheduling.component.ts](src/app/pages/scheduling/scheduling.component.ts) linha 124:
  ```typescript
  console.log('Submitting lead to Firestore secure database...', leadData);
  ```
  `leadData` contém `firstName`, `lastName`, `email`, `phone` e `reason` (situação jurídica declarada). Também: [src/app/services/email.service.ts](src/app/services/email.service.ts) linhas 47–50.
- **Nota:** O Agente 1 encontrou um commit recente que afirmava remover os console.logs. O Agente 3 encontrou-os ainda presentes. **Verificar estado atual antes de assumir qualquer avaliação como correta.**
- **Impacto:** Qualquer extensão de browser, dispositivo partilhado ou olhar indiscreto com DevTools aberto vê os dados pessoais do cliente em texto claro a cada submissão. Contradiz diretamente o "sigilo profissional absoluto" promovido no marketing do site.
- **Correção recomendada:** Remover todos os `console.log` e `console.warn` de debug dos caminhos de código de produção.
- **Corrigido?** Disputado — verificar estado atual.

---

#### PROD-03: `og-image.jpg` Inexistente — Todas as Partilhas Sociais Mostram Pré-visualização Quebrada

- **Severidade:** Alta
- **Evidência:**
  - [src/index.html](src/index.html) linha 19: `<meta property="og:image" content="https://www.conceicaolopesadvogada.pt/assets/og-image.jpg">`
  - [src/app/services/seo.service.ts](src/app/services/seo.service.ts) linha 14: `DEFAULT_OG_IMAGE = 'https://www.conceicaolopesadvogada.pt/assets/og-image.jpg'`
  - O ficheiro `src/assets/og-image.jpg` **não existe** no repositório.
- **Impacto:** Cada partilha social (LinkedIn, WhatsApp, Facebook, X/Twitter) obtém um 404 para a imagem, mostrando um placeholder cinzento de imagem quebrada. Para um prestador de serviços profissionais onde as referências são um canal de aquisição primário, isto faz com que cada partilha orgânica pareça pouco cuidada. O URL quebrado é também usado como default dinâmico em `seo.service.ts`, afetando as OG tags de todas as páginas.
- **Correção recomendada:** Criar um `og-image.jpg` (1200×630px) a partir dos assets existentes (ex: versão com marca de `advogada.jpg`) e commit para `src/assets/`.
- **Corrigido?** Não.

---

#### PROD-04 / LEG-10 (MERGED): robots.txt Bloqueia as Páginas de Compliance do Google

*(Ver finding LEG-10 / PROD-04 acima — merged.)*

---

#### PROD-05: Erro de Submissão do Formulário Usa `alert()` Nativo do Browser

- **Severidade:** Média
- **Evidência:** [src/app/pages/scheduling/scheduling.component.ts](src/app/pages/scheduling/scheduling.component.ts) linha 153:
  ```typescript
  alert('Ocorreu um erro ao enviar o seu pedido de forma segura. Por favor, tente novamente.');
  ```
- **Impacto:** O resto da UI tem animações de fade, painéis glassmorphism e efeito border-beam. Em qualquer falha de submissão, o site serve uma caixa de popup nativa do sistema operativo — sem estilo, sem marca e dissonante. No iOS Safari exibe o domínio do site como título do modal. Não fornece link de fallback por email nem passo seguinte acionável.
- **Correção recomendada:** Substituir por estado de erro inline renderizado dentro do card do formulário, correspondendo ao design do estado de sucesso existente.
- **Corrigido?** Não.

---

#### PROD-06: Credencial "Faculdade de Direito" Demasiado Vaga para Gerar Confiança

- **Severidade:** Média
- **Evidência:** [src/app/pages/about/about.component.html](src/app/pages/about/about.component.html) linhas 61–62:
  ```html
  <span class="fact-label">Formação</span>
  <span class="fact-value">Faculdade de Direito</span>
  ```
- **Impacto:** Todos os licenciados em direito em Portugal frequentaram "uma Faculdade de Direito." Não nomear a instituição real (Coimbra, Lisboa, Porto, etc.) parece evasivo ao lado do número de cédula da OA verificável. Concorrentes que listam a sua instituição e ano de licenciatura parecem imediatamente mais credíveis.
- **Correção recomendada:** Substituir pelo nome real da instituição e ano de licenciatura, ou remover a linha "Formação" — requer confirmação com a cliente.
- **Corrigido?** Não — requer confirmação com a cliente.

---

#### PROD-07: Erro Gramatical "Direito de Família" nos Testemunhos

- **Severidade:** Baixa
- **Evidência:** [src/app/pages/home/home.component.ts](src/app/pages/home/home.component.ts) — linha 101: `"Direito da Família"` (correto); linha 125: `"Direito de Família"` (incorreto — "de Família" não é terminologia jurídica portuguesa standard).
- **Impacto:** Erro subtil mas visível no nome de uma área de prática core num site de advocacia. A inconsistência entre duas instâncias na mesma página torna-o mais notório.
- **Correção recomendada:** Alterar linha 125 de `"Direito de Família"` para `"Direito da Família"`.
- **Corrigido?** Não.

---

## 4. Tabela de Severidade

| Severidade | Total | Findings |
|-----------|-------|---------|
| Crítico | 2 | PROD-01, LEG-01 |
| Alto | 8 | LEG-02, LEG-03, LEG-04, LEG-05, LEG-06, LEG-07, LEG-08, PROD-02, PROD-03 |
| Médio | 7 | LEG-09, LEG-11, LEG-12, LEG-10/PROD-04 (merged), PROD-05, PROD-06, SEC-01 |
| Baixo | 5 | SEC-02, SEC-03, LEG-13, LEG-14, PROD-07 |

---

## 5. Checklist de Remediação Prioritária

### Imediato (minutos — não fazer deploy sem corrigir)

- [ ] **Corrigir destinatário Gmail do programador** — alterar `TEST_RECIPIENT_EMAIL` em [src/app/services/email.service.ts](src/app/services/email.service.ts) de `jamestevenpereira@gmail.com` para `conceicao-66631c@adv.oa.pt`. **Uma linha de código. Correção operacional crítica.**
- [ ] **Rotacionar a password do `Dados.txt`** — identificar a que serviço pertence `LpdTzd9T8_36gJy` e alterá-la imediatamente. Adicionar `Dados.txt` ao `.gitignore`. Agendar `git filter-repo` para purgar do histórico.
- [ ] **Verificar estado dos console.logs** — abrir [src/app/pages/scheduling/scheduling.component.ts](src/app/pages/scheduling/scheduling.component.ts) e [src/app/services/email.service.ts](src/app/services/email.service.ts) e confirmar se os console.logs de debug ainda existem. Remover os que forem encontrados.

### Curto prazo (este sprint)

- [ ] **Criar `og-image.jpg`** — imagem com marca 1200×630px para `src/assets/`. Elimina pré-visualizações sociais quebradas em todas as páginas.
- [ ] **Corrigir robots.txt** — remover `Disallow: /politica-privacidade` e `Disallow: /politica-cookies`; adicionar ambas ao `sitemap.xml`.
- [ ] **Alojar Google Fonts localmente** — fazer download dos ficheiros de fonte e servir a partir de `/assets`. Elimina a transferência de dados confirmada para o Google antes do consentimento em cada carregamento de página.
- [ ] **Bloquear iframe do Google Maps por consentimento** — substituir `<iframe>` incondicional por captura de ecrã estática + overlay de clique para carregar.
- [ ] **Adicionar "Aviso Legal" / aviso de "não constitui aconselhamento jurídico"** — adicionar ao rodapé e acima da FAQ.
- [ ] **Corrigir erro gramatical "Direito de Família"** em [src/app/pages/home/home.component.ts](src/app/pages/home/home.component.ts) linha 125.
- [ ] **Substituir handler de erro `alert()`** em [src/app/pages/scheduling/scheduling.component.ts](src/app/pages/scheduling/scheduling.component.ts) por estado de erro inline com estilo.
- [ ] **Verificar/corrigir estado do CSP** em `vercel.json` — os agentes divergiram; confirmar se o CSP está presente e se `unsafe-inline` está em `script-src`.

### Médio prazo (requer revisão jurídica)

- [ ] **Reescrever Política de Privacidade** para satisfazer o Art. 13 do RGPD — base legal, prazos de conservação, lista de subprocessadores (Firebase/Google, EmailJS, Google Fonts CDN, Google Maps), mecanismo de transferência internacional, os seis direitos dos titulares, contacto da CNPD, identidade completa do responsável pelo tratamento. Encomendar revisão por especialista em proteção de dados.
- [ ] **Criar página de Termos & Condições / Aviso Legal** — adicionar rota `/termos-e-condicoes` e conteúdo cobrindo: identidade do prestador, âmbito, jurisdição, responsabilidade e termos de mandato profissional.
- [ ] **Melhorar consentimento de cookies** — adicionar granularidade por categoria (Essenciais / Funcionais); atualizar política de cookies para listar com precisão todos os pedidos de terceiros; implementar bloqueio pré-consentimento de pedidos de terceiros não essenciais.
- [ ] **Reescrever checkbox de consentimento RGPD** — nomear Firebase como processador, incluir link inline para a política de privacidade.
- [ ] **Verificar autenticidade dos testemunhos** — confirmar que todos os sete são clientes reais com consentimento documentado, ou substituir por Google Reviews incorporado.
- [ ] **Verificar Firebase Security Rules** na consola Firebase — garantir que a coleção `leads` não pode ser inundada com escritas não autenticadas.
- [ ] **Confirmar nome da instituição para campo "Formação"** com a cliente; atualizar ou remover.
- [ ] **Remover ou documentar `measurementId`** — eliminar dos ficheiros de ambiente ou implementar padrão de ativação condicional ao consentimento antes de ativar analytics.
- [ ] **Verificar existência de DPAs** com Firebase/Google e EmailJS.

---

## 6. O Que Não Pôde Ser Inspecionado

- **Comportamento do site em produção em tempo real** — sequência de carregamento de cookies em runtime, aplicação efetiva das Firebase Security Rules
- **Firebase Security Rules** — não estão neste repositório; requer acesso à consola Firebase
- **Profundidade do histórico git** — apenas commits recentes revistos; linha temporal completa de exposição de credenciais no histórico git não totalmente avaliada
- **Painel EmailJS** — se o domínio está restrito apenas a `conceicaolopesadvogada.pt`
- **Autenticidade dos testemunhos** — não pode ser verificada a partir do código; requer entrevista com a cliente
- **`vercel.json` em produção** — os agentes divergiram sobre a presença do CSP; verificar contra headers de produção via `curl -I https://www.conceicaolopesadvogada.pt`

---

## 7. Problemas Confirmados vs. Riscos Potenciais que Requerem Revisão Manual/Jurídica

**Confirmados (evidência no código-fonte):**
PROD-01, LEG-01, LEG-02, LEG-03, LEG-04, LEG-05, LEG-06, LEG-07, LEG-08, LEG-09, LEG-10/PROD-04, PROD-03, PROD-05, PROD-06, PROD-07, LEG-13

**Riscos potenciais que requerem revisão manual ou jurídica:**
- LEG-11 (autenticidade dos testemunhos — verificação manual com a cliente)
- LEG-12 (informação pré-contratual — caracterização jurídica do formulário de agendamento ao abrigo do direito português)
- LEG-14 (verificação de idade — avaliação de probabilidade vs. custo)
- SEC-02 (estado do CSP — divergência entre agentes, verificar contra headers em produção)
- PROD-02 (console.logs — disputado entre agentes, verificar estado atual dos ficheiros)

---

> As três correções que eliminam mais risco no menor tempo são: **(1)** alterar o destinatário Gmail para o email da advogada — uma linha, cinco minutos, impede que todos os pedidos futuros de clientes vazem para uma parte não autorizada; **(2)** rotacionar a password do `Dados.txt` e adicionar o ficheiro ao `.gitignore` antes do próximo push; **(3)** alojar as fontes Google localmente, o que elimina a única violação confirmada do RGPD pré-consentimento que ocorre em cada carregamento de página sem qualquer interação do utilizador necessária.
