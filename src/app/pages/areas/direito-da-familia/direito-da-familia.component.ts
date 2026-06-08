import { Component, inject, DOCUMENT, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlurFadeComponent } from '../../../components/magic-ui/blur-fade/blur-fade.component';
import { LucideAngularModule, Heart, Scale, Users, Home } from 'lucide-angular';
import { SeoService } from '../../../services/seo.service';
import { FaqComponent, FaqItem } from '../../../components/faq/faq.component';

@Component({
  selector: 'app-direito-da-familia',
  standalone: true,
  imports: [CommonModule, RouterLink, BlurFadeComponent, LucideAngularModule, FaqComponent],
  templateUrl: './direito-da-familia.component.html',
})
export class DireitoDaFamiliaComponent implements OnDestroy {
  private doc = inject(DOCUMENT);

  HeartIcon = Heart;
  ScaleIcon = Scale;
  UsersIcon = Users;
  HomeIcon = Home;

  faqs: FaqItem[] = [
    {
      q: 'Como funciona o divórcio por mútuo acordo em Portugal?',
      a: 'O divórcio por mútuo acordo pode ser requerido na Conservatória do Registo Civil quando ambos os cônjuges estão de acordo quanto à dissolução do casamento e às suas consequências (partilha de bens, pensão de alimentos, residência dos filhos). O processo é mais rápido e económico do que o divórcio litigioso. A Dra. Conceição Lopes acompanha-o em todas as fases, desde a recolha de documentação até à sentença final.'
    },
    {
      q: 'O que é a pensão de alimentos e como é calculada?',
      a: 'A pensão de alimentos é a prestação periódica destinada a cobrir as necessidades básicas dos filhos (alimentação, habitação, saúde e educação). O valor é fixado pelo tribunal tendo em conta as necessidades do filho e as possibilidades económicas de cada progenitor. Em caso de incumprimento, existem mecanismos legais de cobrança coerciva, incluindo o desconto no vencimento. A Dra. Conceição Lopes representa-o tanto para fixar como para rever ou executar a pensão.'
    },
    {
      q: 'O que é a regulação do exercício das responsabilidades parentais?',
      a: 'É o processo judicial que define com quem residem os filhos menores após a separação, como é exercida a guarda, o regime de visitas e a participação de cada progenitor nas decisões importantes da vida do filho. As responsabilidades parentais relativas a atos da vida corrente são exercidas pelo progenitor com quem o filho reside; as decisões de particular importância (educação, saúde, saídas do país) requerem acordo de ambos. A Dra. Conceição Lopes defende sempre o superior interesse da criança e os direitos do seu cliente.'
    },
    {
      q: 'Como se faz a partilha de bens após o divórcio?',
      a: 'A partilha de bens dissolve a comunhão patrimonial e divide o património comum do casal. Pode ser feita por escritura notarial (extrajudicial) ou em processo de inventário judicial quando não há acordo. É fundamental inventariar todos os bens comuns — imóveis, veículos, contas bancárias, investimentos — e verificar a existência de dívidas comuns. A Dra. Conceição Lopes analisa o regime de bens do seu casamento e orienta-o para a solução mais vantajosa.'
    }
  ];

  constructor() {
    inject(SeoService).update({
      title: 'Advogada Direito da Família em Viseu',
      description: 'Advogada de Direito da Família em Nelas e Viseu. Divórcio, regulação do poder parental, pensão de alimentos e partilhas. Dra. Conceição Lopes — Cédula 66631C.',
      canonical: 'https://www.conceicaolopes-advogada.pt/areas/direito-da-familia',
    });

    if (!this.doc.querySelector('script[data-schema-familia]')) {
      const faqScript = this.doc.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.setAttribute('data-schema-familia', 'faq');
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
      breadcrumbScript.setAttribute('data-schema-familia', 'breadcrumb');
      breadcrumbScript.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.conceicaolopes-advogada.pt/' },
          { '@type': 'ListItem', position: 2, name: 'Áreas de Atuação', item: 'https://www.conceicaolopes-advogada.pt/areas' },
          { '@type': 'ListItem', position: 3, name: 'Direito da Família', item: 'https://www.conceicaolopes-advogada.pt/areas/direito-da-familia' }
        ]
      });
      this.doc.head.appendChild(breadcrumbScript);
    }
  }

  ngOnDestroy(): void {
    this.doc.querySelectorAll('script[data-schema-familia]').forEach(el => el.remove());
  }
}
