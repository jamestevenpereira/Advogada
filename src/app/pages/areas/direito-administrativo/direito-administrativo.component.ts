import { Component, inject, DOCUMENT, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlurFadeComponent } from '../../../components/magic-ui/blur-fade/blur-fade.component';
import { LucideAngularModule, Gavel, FileText, Scale, Building } from 'lucide-angular';
import { SeoService } from '../../../services/seo.service';
import { FaqComponent, FaqItem } from '../../../components/faq/faq.component';

@Component({
  selector: 'app-direito-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink, BlurFadeComponent, LucideAngularModule, FaqComponent],
  templateUrl: './direito-administrativo.component.html',
})
export class DireitoAdministrativoComponent implements OnDestroy {
  private doc = inject(DOCUMENT);

  GavelIcon = Gavel;
  FileTextIcon = FileText;
  ScaleIcon = Scale;
  BuildingIcon = Building;

  faqs: FaqItem[] = [
    {
      q: 'Como posso impugnar um ato administrativo ilegal?',
      a: 'Um ato administrativo pode ser impugnado quando viola a lei, quando a entidade pública não tinha competência para o praticar, quando existem vícios formais ou quando é arbitrário ou desproporcionado. A impugnação pode ser feita por via administrativa (reclamação ou recurso hierárquico) ou por via judicial (ação administrativa no Tribunal Administrativo). Os prazos são curtos — geralmente 3 meses para a via judicial e 15 dias para a reclamação. A Dra. Conceição Lopes analisa o ato e indica-lhe a via mais eficaz.'
    },
    {
      q: 'O que é o contencioso tributário e quando preciso de um advogado?',
      a: 'O contencioso tributário abrange a contestação de liquidações fiscais, coimas tributárias, reversões fiscais e execuções fiscais. Pode reclamar administrativamente junto da AT (Autoridade Tributária) num prazo de 120 dias, ou impugnar judicialmente no Tribunal Tributário. Em casos de reversão fiscal (responsabilidade tributária de gerentes por dívidas da empresa), é especialmente urgente ter apoio jurídico imediato, pois os prazos são muito curtos. A Dra. Conceição Lopes tem experiência em contencioso tributário no Distrito de Viseu.'
    },
    {
      q: 'O meu pedido de licenciamento foi recusado — o que posso fazer?',
      a: 'Uma decisão de indeferimento de licenciamento (construção, restauração, comércio) pode ser impugnada se não respeitar os regulamentos municipais, se a fundamentação for insuficiente ou se existir discriminação face a casos similares. Pode apresentar reclamação à própria câmara, recurso hierárquico para o membro do governo com tutela, ou ação administrativa judicial. A Dra. Conceição Lopes analisa a decisão, identifica os seus fundamentos de impugnação e acompanha-o no processo.'
    },
    {
      q: 'Como posso defender os meus direitos numa relação com a Administração Pública?',
      a: 'Os cidadãos têm direitos constitucionais nas suas relações com a Administração Pública: direito à informação, à participação, à fundamentação das decisões, à proteção jurídica e à impugnação de atos lesivos. Se uma entidade pública (câmara, Segurança Social, AT, universidade, hospital público) tomou uma decisão que o prejudica, tem direito a contestá-la. A Dra. Conceição Lopes representa-o tanto na fase administrativa como na via judicial, incluindo perante o Tribunal Administrativo do Círculo de Coimbra.'
    }
  ];

  constructor() {
    inject(SeoService).update({
      title: 'Advogada Direito Administrativo em Viseu',
      description: 'Direito Administrativo no Distrito de Viseu. Impugnação de atos, contencioso tributário e relações com entidades públicas. Dra. Conceição Lopes.',
      canonical: 'https://www.conceicaolopes-advogada.pt/areas/direito-administrativo',
    });

    if (!this.doc.querySelector('script[data-schema-administrativo]')) {
      const faqScript = this.doc.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.setAttribute('data-schema-administrativo', 'faq');
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
      breadcrumbScript.setAttribute('data-schema-administrativo', 'breadcrumb');
      breadcrumbScript.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.conceicaolopes-advogada.pt/' },
          { '@type': 'ListItem', position: 2, name: 'Áreas de Atuação', item: 'https://www.conceicaolopes-advogada.pt/areas' },
          { '@type': 'ListItem', position: 3, name: 'Direito Administrativo', item: 'https://www.conceicaolopes-advogada.pt/areas/direito-administrativo' }
        ]
      });
      this.doc.head.appendChild(breadcrumbScript);
    }
  }

  ngOnDestroy(): void {
    this.doc.querySelectorAll('script[data-schema-administrativo]').forEach(el => el.remove());
  }
}
