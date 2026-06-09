import { Component, inject, DOCUMENT, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlurFadeComponent } from '../../../components/magic-ui/blur-fade/blur-fade.component';
import { LucideAngularModule, Briefcase, AlertTriangle, HeartPulse, Scale } from 'lucide-angular';
import { SeoService } from '../../../services/seo.service';
import { FaqComponent, FaqItem } from '../../../components/faq/faq.component';

@Component({
  selector: 'app-direito-do-trabalho',
  standalone: true,
  imports: [CommonModule, RouterLink, BlurFadeComponent, LucideAngularModule, FaqComponent],
  templateUrl: './direito-do-trabalho.component.html',
})
export class DireitoDoTrabalhoComponent implements OnDestroy {
  private doc = inject(DOCUMENT);

  BriefcaseIcon = Briefcase;
  AlertTriangleIcon = AlertTriangle;
  HeartPulseIcon = HeartPulse;
  ScaleIcon = Scale;

  faqs: FaqItem[] = [
    {
      q: 'O que é um despedimento ilícito e como posso contestá-lo?',
      a: 'Um despedimento é ilícito quando não respeita os procedimentos legais ou quando não existe justa causa para a cessação do contrato de trabalho. Se foi despedido sem procedimento disciplinar correto, sem motivo válido, ou em situação de retaliação por exercer os seus direitos, pode reclamar em tribunal. O prazo para impugnar um despedimento é de 60 dias a contar da data de receção da carta. A Dra. Conceição Lopes analisa o seu caso gratuitamente e indica-lhe se tem fundamento para avançar.'
    },
    {
      q: 'O que constitui assédio laboral (mobbing)?',
      a: 'O assédio moral no trabalho é todo o comportamento indesejado, nomeadamente o baseado em fator de discriminação, praticado aquando do acesso ao emprego ou no próprio emprego, que tenha por objetivo ou efeito perturbar ou constranger a pessoa, afetar a sua dignidade, criar ambiente intimidativo, hostil, degradante, humilhante ou desestabilizador. Pode incluir isolamento, críticas constantes infundadas, exclusão de reuniões, mudanças abusivas de funções ou horários. O assédio laboral é crime em Portugal e dá direito a indemnização.'
    },
    {
      q: 'Tive um acidente de trabalho — quais são os meus direitos?',
      a: 'Tem direito a assistência médica e medicamentosa, reabilitação profissional e uma indemnização por incapacidade (temporária ou permanente). A indemnização é calculada com base no seu salário e no grau de incapacidade fixado. A seguradora patronal tem 30 dias para reconhecer o acidente. Em caso de discordância com a indemnização proposta, pode contestar em tribunal laboral. É essencial ter apoio jurídico para garantir que a incapacidade é corretamente avaliada e a indemnização calculada nos termos máximos previstos na lei.'
    },
    {
      q: 'Tenho direito a indemnização por fim de contrato a termo?',
      a: 'Sim. No final de um contrato a termo (prazo certo ou incerto), o trabalhador tem direito a uma compensação equivalente a 18 dias de retribuição base por cada ano completo de duração do contrato. Em contratos a termo incerto, a compensação é de 24 dias por ano. A partir do terceiro renovação consecutiva, o contrato pode caducar ou converter-se em permanente — a Dra. Conceição Lopes analisa a sua situação específica e assegura que recebe tudo a que tem direito.'
    }
  ];

  constructor() {
    inject(SeoService).update({
      title: 'Advogada Direito do Trabalho em Viseu',
      description: 'Advogada laboral em Nelas e Viseu. Despedimento ilícito, assédio laboral, acidentes de trabalho e negociação de indemnizações. Dra. Conceição Lopes.',
      canonical: 'https://www.conceicaolopes-advogada.pt/areas/direito-do-trabalho',
    });

    if (!this.doc.querySelector('script[data-schema-trabalho]')) {
      const faqScript = this.doc.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.setAttribute('data-schema-trabalho', 'faq');
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
      breadcrumbScript.setAttribute('data-schema-trabalho', 'breadcrumb');
      breadcrumbScript.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.conceicaolopes-advogada.pt/' },
          { '@type': 'ListItem', position: 2, name: 'Áreas de Atuação', item: 'https://www.conceicaolopes-advogada.pt/areas' },
          { '@type': 'ListItem', position: 3, name: 'Direito do Trabalho', item: 'https://www.conceicaolopes-advogada.pt/areas/direito-do-trabalho' }
        ]
      });
      this.doc.head.appendChild(breadcrumbScript);
    }
  }

  ngOnDestroy(): void {
    this.doc.querySelectorAll('script[data-schema-trabalho]').forEach(el => el.remove());
  }
}
