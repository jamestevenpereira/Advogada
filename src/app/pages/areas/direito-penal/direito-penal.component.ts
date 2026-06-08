import { Component, inject, DOCUMENT, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlurFadeComponent } from '../../../components/magic-ui/blur-fade/blur-fade.component';
import { LucideAngularModule, Shield, Scale, FileText, AlertCircle } from 'lucide-angular';
import { SeoService } from '../../../services/seo.service';
import { FaqComponent, FaqItem } from '../../../components/faq/faq.component';

@Component({
  selector: 'app-direito-penal',
  standalone: true,
  imports: [CommonModule, RouterLink, BlurFadeComponent, LucideAngularModule, FaqComponent],
  templateUrl: './direito-penal.component.html',
})
export class DireitoPenalComponent implements OnDestroy {
  private doc = inject(DOCUMENT);

  ShieldIcon = Shield;
  ScaleIcon = Scale;
  FileTextIcon = FileText;
  AlertCircleIcon = AlertCircle;

  faqs: FaqItem[] = [
    {
      q: 'O que devo fazer se fui constituído arguido?',
      a: 'Se foi constituído arguido, tem o direito de ser assistido por advogado desde o primeiro interrogatório, o direito ao silêncio (não é obrigado a responder a perguntas que o possam incriminar), o direito a conhecer os factos que lhe são imputados e o direito a consultar o processo. Nunca preste declarações às autoridades sem o seu advogado presente — qualquer declaração pode ser usada contra si. Contacte a Dra. Conceição Lopes imediatamente para assegurar a sua defesa desde o início.'
    },
    {
      q: 'Que tipos de crimes defende a Dra. Conceição Lopes?',
      a: 'A Dra. Conceição Lopes presta defesa criminal em processos-crime de natureza diversa, incluindo crimes patrimoniais (burla, furto, abuso de confiança), crimes contra a integridade física, crimes rodoviários (condução perigosa, alcoolemia), crimes de difamação e injúria, crimes económicos e crimes informáticos. Em cada caso, a abordagem é discreta, rigorosa e centrada na proteção dos seus direitos constitucionais.'
    },
    {
      q: 'O que é a constituição como assistente no processo penal?',
      a: 'A constituição como assistente permite à vítima de um crime participar ativamente no processo penal — apresentar provas, requerer diligências, deduzir acusação particular (nos crimes semi-públicos e particulares) e recorrer de decisões. É especialmente relevante em crimes de difamação, injúria, violência doméstica, crimes contra a honra e crimes patrimoniais. A Dra. Conceição Lopes representa-o enquanto assistente para garantir que os seus direitos são efetivamente protegidos.'
    },
    {
      q: 'Quais são as fases do processo penal em Portugal?',
      a: 'O processo penal português tem várias fases: inquérito (investigação pelo Ministério Público e OPC), instrução (facultativa, para controlo judicial da acusação), julgamento e recursos. Na fase de inquérito, o arguido pode ser interrogado, sujeito a medidas de coação (como proibição de ausência do país ou prisão preventiva) e ter bens apreendidos. A intervenção de um advogado é crucial desde o início para garantir que os seus direitos são respeitados em cada fase.'
    }
  ];

  constructor() {
    inject(SeoService).update({
      title: 'Advogada Direito Penal em Viseu',
      description: 'Defesa criminal em Nelas e Viseu. Representação em processos-crime, constituição como assistente e recursos. Dra. Conceição Lopes — Cédula 66631C.',
      canonical: 'https://www.conceicaolopes-advogada.pt/areas/direito-penal',
    });

    if (!this.doc.querySelector('script[data-schema-penal]')) {
      const faqScript = this.doc.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.setAttribute('data-schema-penal', 'faq');
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
      breadcrumbScript.setAttribute('data-schema-penal', 'breadcrumb');
      breadcrumbScript.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.conceicaolopes-advogada.pt/' },
          { '@type': 'ListItem', position: 2, name: 'Áreas de Atuação', item: 'https://www.conceicaolopes-advogada.pt/areas' },
          { '@type': 'ListItem', position: 3, name: 'Direito Penal', item: 'https://www.conceicaolopes-advogada.pt/areas/direito-penal' }
        ]
      });
      this.doc.head.appendChild(breadcrumbScript);
    }
  }

  ngOnDestroy(): void {
    this.doc.querySelectorAll('script[data-schema-penal]').forEach(el => el.remove());
  }
}
