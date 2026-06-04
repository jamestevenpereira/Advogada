import { Component, inject, DOCUMENT } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { WordRotateComponent } from '../../components/magic-ui/word-rotate/word-rotate.component';
import { MarqueeComponent } from '../../components/magic-ui/marquee/marquee.component';
import { BlurFadeComponent } from '../../components/magic-ui/blur-fade/blur-fade.component';
import { LucideAngularModule, ChevronRight, ShieldCheck, Scale, Users } from 'lucide-angular';
import { ShinyButtonComponent } from '../../components/magic-ui/shiny-button/shiny-button.component';
import { SeoService } from '../../services/seo.service';
import { FaqComponent, FaqItem } from '../../components/faq/faq.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    WordRotateComponent,
    MarqueeComponent,
    BlurFadeComponent,
    LucideAngularModule,
    ShinyButtonComponent,
    FaqComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);

  ChevronRight = ChevronRight;
  ShieldCheck = ShieldCheck;
  Scale = Scale;
  Users = Users;

  faqs: FaqItem[] = [
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

  constructor() {
    inject(SeoService).update({
      title: 'Advogada em Nelas e Viseu',
      description: 'Dra. Conceição Lopes, advogada com 7 anos de experiência no Distrito de Viseu. Direito da Família, Civil, Trabalho e Comercial. Agende a sua consulta.',
      canonical: 'https://www.conceicaolopesadvogada.pt/',
    });

    const doc = inject(DOCUMENT);
    if (!doc.querySelector('script[data-faq-schema]')) {
      const script = doc.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-faq-schema', 'true');
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: this.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      });
      doc.head.appendChild(script);
    }
  }

  schedulingRedirect() {
    this.router.navigate(['/agendamento']);
  }

  testimonials = [
    {
      text: "Excelente serviço profissional. A Dra. Conceição Lopes resolveu o meu caso de divórcio rapidamente e com muita sensibilidade.",
      initials: "MJ",
      author: "Maria João",
      caseType: "Direito da Família"
    },
    {
      text: "Muito profissional e dedicada. Senti-me sempre acompanhado e bem informado durante todo o processo laboral.",
      initials: "RA",
      author: "Ricardo André",
      caseType: "Direito do Trabalho"
    },
    {
      text: "Uma advogada que realmente se preocupa com o cliente. Transparência total em todos os momentos.",
      initials: "PS",
      author: "Paula Santos",
      caseType: "Direito Civil"
    },
    {
      text: "Recomendo vivamente. Ética e competência num serviço jurídico de excelência.",
      initials: "LF",
      author: "Luís Ferreira",
      caseType: "Direito Comercial"
    },
    {
      text: "Dra. Conceição é uma profissional impecável. Senti-me segura e bem representada em todo o processo de partilhas.",
      initials: "AM",
      author: "Ana Martins",
      caseType: "Direito de Família"
    },
    {
      text: "Excelente atendimento e clareza nas explicações. Recomendo para qualquer assunto de direito comercial.",
      initials: "JP",
      author: "João Pedro",
      caseType: "Direito Comercial"
    },
    {
      text: "A dedicação e o rigor colocados no meu caso foram fundamentais para o sucesso. Muito grata pelo apoio.",
      initials: "HG",
      author: "Helena Gomes",
      caseType: "Direito Civil"
    }
  ];
}
