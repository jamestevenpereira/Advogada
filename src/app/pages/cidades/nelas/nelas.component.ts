import { Component, inject, DOCUMENT, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlurFadeComponent } from '../../../components/magic-ui/blur-fade/blur-fade.component';
import { LucideAngularModule, Heart, Scale, Briefcase, Building, Shield, Gavel, MapPin, Clock, Award } from 'lucide-angular';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-nelas',
  standalone: true,
  imports: [CommonModule, RouterLink, BlurFadeComponent, LucideAngularModule],
  templateUrl: './nelas.component.html',
})
export class NelasComponent implements OnDestroy {
  private doc = inject(DOCUMENT);

  HeartIcon = Heart;
  ScaleIcon = Scale;
  BriefcaseIcon = Briefcase;
  BuildingIcon = Building;
  ShieldIcon = Shield;
  GavelIcon = Gavel;
  MapPinIcon = MapPin;
  ClockIcon = Clock;
  AwardIcon = Award;

  practiceAreas = [
    { title: 'Direito da Família', description: 'Divórcio, poder parental, pensão de alimentos e partilhas.', icon: Heart, slug: 'direito-da-familia' },
    { title: 'Direito Civil', description: 'Contratos, responsabilidade civil e direitos reais.', icon: Scale, slug: 'direito-civil' },
    { title: 'Direito do Trabalho', description: 'Despedimento, assédio laboral e acidentes de trabalho.', icon: Briefcase, slug: 'direito-do-trabalho' },
    { title: 'Direito Comercial', description: 'Sociedades, contratos comerciais e recuperação de créditos.', icon: Building, slug: 'direito-comercial' },
    { title: 'Direito Penal', description: 'Defesa criminal e constituição como assistente.', icon: Shield, slug: 'direito-penal' },
    { title: 'Direito Administrativo', description: 'Impugnação de atos e contencioso tributário.', icon: Gavel, slug: 'direito-administrativo' },
  ];

  constructor() {
    inject(SeoService).update({
      title: 'Advogada em Nelas',
      description: 'Advogada em Nelas — Dra. Conceição Lopes, escritório na Av. João XXIII 2 R/C, Nelas. A única advogada com escritório em Nelas. Consulta jurídica presencial ou online.',
      canonical: 'https://www.conceicaolopes-advogada.pt/nelas',
    });

    if (!this.doc.querySelector('script[data-schema-nelas]')) {
      const breadcrumbScript = this.doc.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.setAttribute('data-schema-nelas', 'breadcrumb');
      breadcrumbScript.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.conceicaolopes-advogada.pt/' },
          { '@type': 'ListItem', position: 2, name: 'Nelas', item: 'https://www.conceicaolopes-advogada.pt/nelas' }
        ]
      });
      this.doc.head.appendChild(breadcrumbScript);
    }
  }

  ngOnDestroy(): void {
    this.doc.querySelectorAll('script[data-schema-nelas]').forEach(el => el.remove());
  }
}
