import { Component, inject, DOCUMENT, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlurFadeComponent } from '../../../components/magic-ui/blur-fade/blur-fade.component';
import { LucideAngularModule, Scale, FileText, Shield, Landmark } from 'lucide-angular';
import { SeoService } from '../../../services/seo.service';
import { FaqComponent, FaqItem } from '../../../components/faq/faq.component';

@Component({
  selector: 'app-direito-civil',
  standalone: true,
  imports: [CommonModule, RouterLink, BlurFadeComponent, LucideAngularModule, FaqComponent],
  templateUrl: './direito-civil.component.html',
})
export class DireitoCivilComponent implements OnDestroy {
  private doc = inject(DOCUMENT);

  ScaleIcon = Scale;
  FileTextIcon = FileText;
  ShieldIcon = Shield;
  LandmarkIcon = Landmark;

  faqs: FaqItem[] = [
    {
      q: 'Quando devo recorrer a um advogado para um contrato?',
      a: 'Sempre que esteja em causa um contrato de valor significativo ou com cláusulas complexas — compra e venda de imóvel, arrendamento, prestação de serviços, contrato de empreitada ou financiamento. Um advogado analisa o contrato antes de assinar, identifica cláusulas abusivas ou lacunas perigosas e negocia alterações a seu favor. Prevenir um litígio é sempre mais económico do que litigá-lo em tribunal.'
    },
    {
      q: 'O que é a responsabilidade civil e quando posso pedir indemnização?',
      a: 'A responsabilidade civil obriga quem causou um dano a ressarcir a vítima. Pode ser contratual (violação de um contrato) ou extracontratual (dano causado a terceiro por ato ilícito ou negligência). Para obter indemnização é necessário provar o facto ilícito, a culpa do agente, o dano sofrido e o nexo de causalidade. A Dra. Conceição Lopes avalia a viabilidade do seu pedido e representa-o no processo judicial ou na negociação extrajudicial.'
    },
    {
      q: 'O que são direitos reais e como posso proteger a minha propriedade?',
      a: 'Os direitos reais são direitos sobre coisas — propriedade, usufruto, servidão, hipoteca. Conflitos de propriedade, demarcações de terrenos, ações de reivindicação e cancelamento de hipotecas são situações que requerem intervenção jurídica especializada. A Dra. Conceição Lopes analisa os títulos de propriedade, registo predial e caderneta rústica para identificar a melhor forma de proteger o seu direito.'
    },
    {
      q: 'Como funciona um litígio civil no tribunal em Viseu?',
      a: 'Os litígios civis de valor até 5.000€ são julgados nos Julgados de Paz ou no tribunal de comarca (Viseu). Para valores superiores, o processo corre no Tribunal Judicial da Comarca de Viseu. O processo tem fases de articulação, instrução e julgamento, podendo durar meses a anos conforme a complexidade. A Dra. Conceição Lopes representa-o em todas as fases, avalia a probabilidade de sucesso e informa-o sobre custas e riscos antes de avançar.'
    }
  ];

  constructor() {
    inject(SeoService).update({
      title: 'Advogada Direito Civil em Viseu',
      description: 'Serviços de Direito Civil em Nelas e Viseu. Contratos, responsabilidade civil, direitos reais e litígios civis. Dra. Conceição Lopes — Cédula 66631C.',
      canonical: 'https://www.conceicaolopes-advogada.pt/areas/direito-civil',
    });

    if (!this.doc.querySelector('script[data-schema-civil]')) {
      const faqScript = this.doc.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.setAttribute('data-schema-civil', 'faq');
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
      breadcrumbScript.setAttribute('data-schema-civil', 'breadcrumb');
      breadcrumbScript.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.conceicaolopes-advogada.pt/' },
          { '@type': 'ListItem', position: 2, name: 'Áreas de Atuação', item: 'https://www.conceicaolopes-advogada.pt/areas' },
          { '@type': 'ListItem', position: 3, name: 'Direito Civil', item: 'https://www.conceicaolopes-advogada.pt/areas/direito-civil' }
        ]
      });
      this.doc.head.appendChild(breadcrumbScript);
    }
  }

  ngOnDestroy(): void {
    this.doc.querySelectorAll('script[data-schema-civil]').forEach(el => el.remove());
  }
}
