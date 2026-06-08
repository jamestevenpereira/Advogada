import { Component, inject, DOCUMENT, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlurFadeComponent } from '../../../components/magic-ui/blur-fade/blur-fade.component';
import { LucideAngularModule, Building, FileText, TrendingDown, Scale } from 'lucide-angular';
import { SeoService } from '../../../services/seo.service';
import { FaqComponent, FaqItem } from '../../../components/faq/faq.component';

@Component({
  selector: 'app-direito-comercial',
  standalone: true,
  imports: [CommonModule, RouterLink, BlurFadeComponent, LucideAngularModule, FaqComponent],
  templateUrl: './direito-comercial.component.html',
})
export class DireitoComercialComponent implements OnDestroy {
  private doc = inject(DOCUMENT);

  BuildingIcon = Building;
  FileTextIcon = FileText;
  TrendingDownIcon = TrendingDown;
  ScaleIcon = Scale;

  faqs: FaqItem[] = [
    {
      q: 'Como constituir uma sociedade em Portugal?',
      a: 'A forma mais comum é a Sociedade por Quotas (Lda.), que pode ser constituída online no portal "Empresa na Hora" em apenas um dia, com um capital social mínimo de 1€ por sócio. Para estruturas mais complexas — Sociedades Anónimas (SA), holdings ou sociedades unipessoais — recomendamos apoio jurídico para redigir o pacto social, definir a estrutura de capital e evitar conflitos futuros entre sócios. A Dra. Conceição Lopes acompanha todo o processo de constituição e aconselha sobre a estrutura mais adequada ao seu negócio.'
    },
    {
      q: 'O que devo verificar num contrato comercial antes de assinar?',
      a: 'Os contratos comerciais devem ser analisados quanto à clareza das obrigações de cada parte, prazos de entrega e pagamento, penalidades por incumprimento, cláusulas de rescisão, propriedade intelectual e lei aplicável. Contratos de franchising, distribuição, fornecimento e parceria têm especificidades que podem comprometer seriamente o seu negócio se não forem bem redigidos. A revisão jurídica prévia é um investimento que evita litígios custosos no futuro.'
    },
    {
      q: 'A minha empresa está em dificuldades — que opções tenho?',
      a: 'Existem vários mecanismos legais antes da insolvência: o Processo Especial de Revitalização (PER), que permite negociar com credores num ambiente protegido, o RERE (Regime Extrajudicial de Recuperação de Empresas) e o PEVE (Processo Especial de Viabilização de Empresas). A insolvência não significa necessariamente o fim — pode ser um instrumento de reestruturação. A Dra. Conceição Lopes avalia a situação da sua empresa e apresenta o caminho mais adequado para salvar o negócio ou minimizar as perdas.'
    },
    {
      q: 'Como posso recuperar créditos em atraso de clientes?',
      a: 'O processo de injunção é o mecanismo mais rápido para cobrar dívidas comerciais de valor até 15.000€ (até 30.000€ entre empresas) — permite obter um título executivo sem necessidade de julgamento. Para valores superiores ou situações mais complexas, avançamos para ação declarativa no tribunal. Em casos urgentes, é possível requerer providências cautelares para arrestar bens do devedor. A Dra. Conceição Lopes analisa o caso e escolhe a via mais eficiente para recuperar o seu dinheiro.'
    }
  ];

  constructor() {
    inject(SeoService).update({
      title: 'Advogada Direito Comercial em Viseu',
      description: 'Direito Comercial no Distrito de Viseu. Constituição de sociedades, contratos comerciais, recuperação de créditos e insolvência. Dra. Conceição Lopes — Cédula 66631C.',
      canonical: 'https://www.conceicaolopes-advogada.pt/areas/direito-comercial',
    });

    if (!this.doc.querySelector('script[data-schema-comercial]')) {
      const faqScript = this.doc.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.setAttribute('data-schema-comercial', 'faq');
      faqScript.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: this.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      });
      this.doc.head.appendChild(faqScript);

      const breadcrumbScript = this.doc.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.setAttribute('data-schema-comercial', 'breadcrumb');
      breadcrumbScript.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.conceicaolopes-advogada.pt/' },
          { '@type': 'ListItem', position: 2, name: 'Áreas de Atuação', item: 'https://www.conceicaolopes-advogada.pt/areas' },
          { '@type': 'ListItem', position: 3, name: 'Direito Comercial', item: 'https://www.conceicaolopes-advogada.pt/areas/direito-comercial' }
        ]
      });
      this.doc.head.appendChild(breadcrumbScript);
    }
  }

  ngOnDestroy(): void {
    this.doc.querySelectorAll('script[data-schema-comercial]').forEach(el => el.remove());
  }
}
