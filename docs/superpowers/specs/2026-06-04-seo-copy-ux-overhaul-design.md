# SEO + Copy + UX Overhaul — Design Spec

**Date:** 2026-06-04
**Approach:** B — Full SEO + Copy Overhaul
**Geographic focus:** Distrito de Viseu (primary), Nelas (local anchor)
**Goals:** More consultation bookings + better Google rankings
**Copy freedom:** Full rewrite authorized

---

## Context

Website for **Dra. Conceição Lopes** (Cédula OA 66631C), lawyer based in Nelas, Av. João XXIII 2 R/C, 3520-059 Nelas. Angular SSR app hosted on Vercel. 4 public routes: `/`, `/sobre`, `/areas`, `/agendamento`.

---

## Section 1: Technical SEO (7 changes)

### 1.1 Fix JSON-LD in `src/index.html` (critical bug)

The current structured data has a **wrong address** and missing fields.

**Current (broken):**
```json
"streetAddress": "Av. da Liberdade 89",
"postalCode": "3520-001",
"areaServed": { "@type": "City", "name": "Nelas" }
```

**New (correct + expanded):**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "name": "Conceição Lopes — Advogada",
      "url": "https://www.conceicaolopesadvogada.pt",
      "logo": "https://www.conceicaolopesadvogada.pt/assets/logo.png",
      "image": "https://www.conceicaolopesadvogada.pt/assets/advogada.jpg",
      "description": "Escritório de advocacia em Nelas especializado em Direito da Família, Civil, Trabalho, Comercial, Penal e Administrativo. Servindo todo o Distrito de Viseu.",
      "telephone": "+351 910 322 893",
      "email": "conceicao-66631c@adv.oa.pt",
      "priceRange": "€€",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. João XXIII 2 R/C",
        "addressLocality": "Nelas",
        "postalCode": "3520-059",
        "addressCountry": "PT"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.534,
        "longitude": -7.855
      },
      "areaServed": [
        { "@type": "City", "name": "Nelas" },
        { "@type": "City", "name": "Viseu" },
        { "@type": "AdministrativeArea", "name": "Distrito de Viseu" },
        { "@type": "City", "name": "Santa Comba Dão" },
        { "@type": "City", "name": "Carregal do Sal" },
        { "@type": "City", "name": "Oliveira do Hospital" }
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/in/concei%C3%A7%C3%A3o-lopes-a63996319/",
        "https://www.facebook.com/p/Concei%C3%A7%C3%A3o-Lopes-Advogada-61555354289580/"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.conceicaolopesadvogada.pt/#lawyer",
      "name": "Conceição Lopes",
      "jobTitle": "Advogada",
      "description": "Advogada inscrita na Ordem dos Advogados com Cédula n.º 66631C, com 7 anos de experiência no Distrito de Viseu.",
      "url": "https://www.conceicaolopesadvogada.pt/sobre",
      "image": "https://www.conceicaolopesadvogada.pt/assets/advogada.jpg",
      "worksFor": { "@id": "https://www.conceicaolopesadvogada.pt" }
    }
  ]
}
```

### 1.2 Add `SeoService.update()` to `HomeComponent`

`src/app/pages/home/home.component.ts` — inject `SeoService` in constructor:

```ts
constructor() {
  inject(SeoService).update({
    title: 'Advogada em Nelas e Viseu',
    description: 'Dra. Conceição Lopes, advogada com 7 anos de experiência a servir Nelas, Viseu e o Distrito de Viseu. Especializada em Direito da Família, Civil, Trabalho e Comercial. Agende a sua consulta.',
    canonical: 'https://www.conceicaolopesadvogada.pt/',
  });
}
```

### 1.3 Update per-page meta descriptions

| Page | File | New description |
|------|------|----------------|
| `/sobre` | `about.component.ts` | Conheça a Dra. Conceição Lopes (Cédula 66631C), advogada em Nelas com 7 anos de experiência a servir clientes em todo o Distrito de Viseu. |
| `/areas` | `practice-areas.component.ts` | Serviços jurídicos em Nelas e Viseu: Direito da Família, Civil, Penal, Trabalho, Comercial e Administrativo. Consulta personalizada com a Dra. Conceição Lopes. |
| `/agendamento` | `scheduling.component.ts` | Agende a sua consulta jurídica com a Dra. Conceição Lopes em Nelas. Atendimento de 2ª a 6ª, 9h–18h. Rápido, fácil e sem compromisso. |

Also update `/areas` page title from `'Áreas de Prática Jurídica | Nelas & Viseu'` to `'Serviços Jurídicos em Nelas e Viseu'`.

### 1.4 Add `src/robots.txt`

```text
User-agent: *
Allow: /

Sitemap: https://www.conceicaolopesadvogada.pt/sitemap.xml
```

Configure `angular.json` `assets` array to include `robots.txt` in the build output.

### 1.5 Add `src/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.conceicaolopesadvogada.pt/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.conceicaolopesadvogada.pt/areas</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.conceicaolopesadvogada.pt/sobre</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.conceicaolopesadvogada.pt/agendamento</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

Configure `angular.json` `assets` array to include `sitemap.xml`.

### 1.6 Fix heading hierarchy

**`src/app/pages/about/about.component.html`** — change one `<h1 class="main-title">` to `<h2 class="main-title">`:
- Line 34: `<h1 class="main-title">Dra. Conceição Lopes</h1>` → `<h2>`
- Lines 88 and 163 are already `<h2>` — no change needed

**`src/app/pages/practice-areas/practice-areas.component.html`** — change `<h1 class="main-title">` to `<h2 class="main-title">`.

### 1.7 Improve image alt texts

| File | Image | Current alt | New alt |
|------|-------|-------------|---------|
| `home.component.html` | `foto-estatua.jpg` | "Justiça e Direito" | "Estátua da Justiça — símbolo da advocacia" |
| `about.component.html` | `advogada.jpg` | "Dra. Conceição Lopes" | "Dra. Conceição Lopes, advogada em Nelas, Viseu" |
| `about.component.html` | `fotoloja.jpg` | "Escritório de Advocacia" | "Escritório da Dra. Conceição Lopes em Nelas, Av. João XXIII" |
| `about.component.html` | `foto-estatua.jpg` | "Missão e Valores" | "Estátua da Justiça — Missão e Valores" |

---

## Section 2: Copy Rewrite (6 areas)

### 2.1 Hero section (`home.component.html` + `home.component.ts`)

**Badge text:**
- Current: `"Advocacia de Excelência"`
- New: `"Advogada em Nelas & Distrito de Viseu"`

**Hero description:**
- Current: `"A sua advogada de confiança. Oferecemos soluções jurídicas personalizadas com foco na excelência, transparência e na defesa intransigente dos seus interesses."`
- New: `"Com 7 anos de experiência no Distrito de Viseu, a Dra. Conceição Lopes defende os seus direitos com dedicação, ética e clareza — para que nunca enfrente sozinho os desafios legais da sua vida."`

**Word-rotate array** (`home.component.ts`):
- Current: `['Família', 'Civil', 'Trabalho', 'Comercial']`
- New: `['Família', 'Civil', 'Trabalho', 'Comercial', 'Penal']`

**Phone CTA** — add below the two action buttons:
```html
<p class="text-sm text-zinc-500 mt-2 text-center lg:text-left">
  <a href="tel:+351910322893" class="text-secondary hover:underline">📞 +351 910 322 893</a>
  <span class="text-zinc-400"> — 2ª a 6ª, 9h–18h (chamada rede móvel nacional)</span>
</p>
```

### 2.2 Core values cards (`home.component.html`)

| Card | New description |
|------|----------------|
| Confidencialidade | "Tudo o que partilha fica entre nós. Sigilo profissional absoluto em cada conversa, documento e processo." |
| Ética e Justiça | "Membro da Ordem dos Advogados (Cédula 66631C). Atuamos sempre com rigor deontológico e em defesa genuína dos seus interesses." |
| Atendimento Humano | "O seu caso não é um número. Explicamos tudo em linguagem clara, acompanhamos cada etapa e respondemos sempre às suas dúvidas." |

### 2.3 Lawyer bio (`about.component.html`)

Replace the 3 `<p>` tags inside `.bio-content` with:

```
"A Dra. Conceição Lopes é advogada inscrita na Ordem dos Advogados (Cédula n.º 66631C), com escritório em Nelas a servir clientes em todo o Distrito de Viseu."

"Com 7 anos de experiência, especializou-se em casos de Direito da Família, Civil, Laboral e Comercial — acompanhando os seus clientes desde a primeira consulta até à resolução definitiva do processo."

"A sua abordagem é direta: explica os seus direitos em linguagem simples, apresenta as opções disponíveis e defende os seus interesses com determinação."
```

Also add "OA: 66631C" as a third fact item in the quick facts grid.

### 2.4 Practice area descriptions (`practice-areas.component.ts`)

| Área | New description |
|------|----------------|
| Direito da Família | "Divórcios, regulação do poder parental, pensão de alimentos, partilhas e inventários. Acompanhamento humano e discreto nos momentos mais difíceis da sua vida familiar." |
| Direito Civil | "Elaboração e revisão de contratos, responsabilidade civil, direitos reais e posse. Defendemos os seus interesses em litígios civis com rigor e eficácia." |
| Direito do Trabalho | "Despedimento ilícito, rescisão com justa causa, assédio laboral, acidentes de trabalho e negociação de indemnizações. Defenda os seus direitos enquanto trabalhador." |
| Direito Comercial | "Constituição e dissolução de sociedades, contratos comerciais, recuperação de créditos e processos de insolvência. Assessoria jurídica para empresas e empresários do Distrito de Viseu." |
| Direito Penal | "Defesa em processos-crime, constituição como assistente, recursos e habeas corpus. Representação discreta e eficaz em todas as fases do processo penal." |
| Direito Administrativo | "Impugnação de atos administrativos, contencioso tributário, licenciamentos e relações com entidades públicas. Defendemos os seus direitos face à Administração Pública." |

### 2.5 Footer tagline (`footer.component.html`)

- Current: `"Defendendo os seus direitos com ética, transparência e profissionalismo. Comprometida com a justiça e a dignidade humana."`
- New: `"Advogada em Nelas ao serviço do Distrito de Viseu. Soluções jurídicas claras, éticas e centradas em si."`

---

## Section 3: New UX Additions

### 3.1 FAQ Section — new component on Homepage

Create `src/app/components/faq/faq.component.ts` and `faq.component.html`.

**Location:** Insert in `home.component.html` after the Core Values section and before the end of the page.

**Design:** Accordion style, consistent with existing site aesthetic (Tailwind + site color tokens). Uses Angular's `*ngFor` + click-toggle pattern.

**FAQ data (6 Q&As):**

```ts
faqs = [
  {
    q: 'Quanto custa uma consulta jurídica?',
    a: 'Os honorários são definidos caso a caso e comunicados com total transparência antes de qualquer compromisso. Prestamos também apoio judiciário para quem não possa suportar os custos.'
  },
  {
    q: 'Trabalha no âmbito do Apoio Judiciário?',
    a: 'Sim. Prestamos assessoria em processos de apoio judiciário, garantindo o acesso à justiça independentemente da situação económica do cliente.'
  },
  {
    q: 'Atende clientes fora de Nelas?',
    a: 'Sim. O escritório serve clientes em todo o Distrito de Viseu, incluindo Viseu, Santa Comba Dão, Carregal do Sal e Oliveira do Hospital.'
  },
  {
    q: 'Quanto tempo demora um processo de divórcio?',
    a: 'Um divórcio por mútuo acordo pode ser resolvido em poucas semanas. Casos mais complexos dependem da agenda dos tribunais. Orientamo-lo em cada etapa do processo.'
  },
  {
    q: 'Como posso marcar uma consulta?',
    a: 'Pode agendar online através do formulário de agendamento no nosso site, ou ligar para +351 910 322 893 de segunda a sexta, das 9h às 18h.'
  },
  {
    q: 'O escritório fica em Nelas — e se eu não me puder deslocar?',
    a: 'Em situações pontuais, é possível realizar consultas por videochamada. Contacte-nos para avaliar a melhor solução para o seu caso.'
  }
];
```

### 3.2 FAQ JSON-LD schema

Inject `FAQPage` schema directly in `HomeComponent` constructor using `DOCUMENT` injection — no changes to `SeoService` needed. Append a `<script type="application/ld+json">` tag to `document.head`.

Full schema (answers match Section 3.1 data):

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto custa uma consulta jurídica?",
      "acceptedAnswer": { "@type": "Answer", "text": "Os honorários são definidos caso a caso e comunicados com total transparência antes de qualquer compromisso. Prestamos também apoio judiciário para quem não possa suportar os custos." }
    },
    {
      "@type": "Question",
      "name": "Trabalha no âmbito do Apoio Judiciário?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sim. Prestamos assessoria em processos de apoio judiciário, garantindo o acesso à justiça independentemente da situação económica do cliente." }
    },
    {
      "@type": "Question",
      "name": "Atende clientes fora de Nelas?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sim. O escritório serve clientes em todo o Distrito de Viseu, incluindo Viseu, Santa Comba Dão, Carregal do Sal e Oliveira do Hospital." }
    },
    {
      "@type": "Question",
      "name": "Quanto tempo demora um processo de divórcio?",
      "acceptedAnswer": { "@type": "Answer", "text": "Um divórcio por mútuo acordo pode ser resolvido em poucas semanas. Casos mais complexos dependem da agenda dos tribunais. Orientamo-lo em cada etapa do processo." }
    },
    {
      "@type": "Question",
      "name": "Como posso marcar uma consulta?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pode agendar online através do formulário de agendamento no nosso site, ou ligar para +351 910 322 893 de segunda a sexta, das 9h às 18h." }
    },
    {
      "@type": "Question",
      "name": "O escritório fica em Nelas — e se eu não me puder deslocar?",
      "acceptedAnswer": { "@type": "Answer", "text": "Em situações pontuais, é possível realizar consultas por videochamada. Contacte-nos para avaliar a melhor solução para o seu caso." }
    }
  ]
}
```

**Implementation:** In `HomeComponent` constructor, use `inject(DOCUMENT)` and create/append the script tag. This is SSR-safe because Angular SSR serializes `document.head` modifications made during construction.

---

## Files Changed Summary

| File | Type of change |
|------|---------------|
| `src/index.html` | Fix JSON-LD (address, add phone/email/sameAs/Attorney/areaServed) |
| `src/robots.txt` | New file |
| `src/sitemap.xml` | New file |
| `angular.json` | Add robots.txt + sitemap.xml to assets |
| `src/app/services/seo.service.ts` | No changes needed |
| `src/app/pages/home/home.component.ts` | Add SeoService call + FAQ data + word-rotate update |
| `src/app/pages/home/home.component.html` | Hero badge, description, phone CTA, core values copy, add FAQ component |
| `src/app/pages/about/about.component.ts` | Update meta description + title |
| `src/app/pages/about/about.component.html` | Fix h1→h2, rewrite bio, update alt texts, add OA fact |
| `src/app/pages/practice-areas/practice-areas.component.ts` | Update meta description + title + area descriptions |
| `src/app/pages/practice-areas/practice-areas.component.html` | Fix h1→h2 |
| `src/app/pages/scheduling/scheduling.component.ts` | Update meta description |
| `src/app/components/layout/footer/footer.component.html` | Update tagline |
| `src/app/components/faq/faq.component.ts` | New component |
| `src/app/components/faq/faq.component.html` | New component |
