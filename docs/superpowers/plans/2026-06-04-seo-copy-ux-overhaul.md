# SEO + Copy + UX Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve Google rankings and consultation bookings for conceicaolopesadvogada.pt by fixing critical SEO bugs, rewriting all copy to target the Viseu district, and adding a FAQ section with rich snippets.

**Architecture:** Angular 17 SSR (prerender) app on Vercel. SEO metadata is managed by `SeoService` (per-route injection in constructors). New FAQ component receives data via `@Input()` from `HomeComponent`, which also injects the FAQ JSON-LD schema into `document.head`. Static files (`robots.txt`, `sitemap.xml`) are already configured in `angular.json` assets — just need to be created.

**Tech Stack:** Angular 17 standalone components, Angular SSR, Tailwind CSS, Lucide Angular icons, Jasmine/Karma tests.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/index.html` | Modify | Fix wrong address + expand JSON-LD structured data |
| `src/robots.txt` | Create | Allow crawling, reference sitemap |
| `src/sitemap.xml` | Create | 4-page sitemap for Search Console |
| `src/app/pages/home/home.component.ts` | Modify | Add SeoService, FAQ data, FAQ JSON-LD, word-rotate update |
| `src/app/pages/home/home.component.html` | Modify | Hero copy, phone CTA, core values copy, add FAQ |
| `src/app/pages/home/home.component.spec.ts` | Modify | Add SeoService spy, FAQ tests |
| `src/app/pages/about/about.component.ts` | Modify | Update meta description |
| `src/app/pages/about/about.component.html` | Modify | Fix h1→h2, rewrite bio, alt texts, add OA fact |
| `src/app/pages/about/about.component.spec.ts` | Modify | Fix h1→h2 selector in existing test |
| `src/app/pages/practice-areas/practice-areas.component.ts` | Modify | Update meta title/description + all 6 area descriptions |
| `src/app/pages/practice-areas/practice-areas.component.html` | Modify | Fix h1→h2 |
| `src/app/pages/scheduling/scheduling.component.ts` | Modify | Update meta description |
| `src/app/components/layout/footer/footer.component.html` | Modify | Update tagline |
| `src/app/components/faq/faq.component.ts` | Create | Accordion FAQ, accepts `faqs` @Input |
| `src/app/components/faq/faq.component.html` | Create | Accordion template |
| `src/app/components/faq/faq.component.spec.ts` | Create | Unit tests for toggle behaviour |

---

## Task 1: Fix JSON-LD structured data in `src/index.html`

**Files:**
- Modify: `src/index.html`

The current JSON-LD has the wrong street address (`Av. da Liberdade 89`) and missing fields. This directly hurts Local SEO.

- [ ] **Step 1: Replace the `<script type="application/ld+json">` block** in `src/index.html` with:

```html
<script type="application/ld+json">
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
</script>
```

- [ ] **Step 2: Verify no old address remains**

```bash
grep -n "Liberdade" src/index.html
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/index.html
git commit -m "fix: correct JSON-LD address and expand structured data to Viseu district"
```

---

## Task 2: Fix heading hierarchy — About page

**Files:**
- Modify: `src/app/pages/about/about.component.html`
- Modify: `src/app/pages/about/about.component.spec.ts`

The About page has `<h1 class="main-title">Dra. Conceição Lopes</h1>` inside a section — a page should have exactly one `<h1>`. Fix the test first (it currently asserts `querySelector('h1')`), then fix the template.

- [ ] **Step 1: Update the existing test to expect `h2` instead of `h1`**

In `src/app/pages/about/about.component.spec.ts`, replace:

```ts
it('should have the correct lawyer name in title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Dra. Conceição Lopes');
});
```

With:

```ts
it('should display the lawyer name in an h2 heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h2s = Array.from(compiled.querySelectorAll('h2'));
    const nameHeading = h2s.find(el => el.textContent?.includes('Dra. Conceição Lopes'));
    expect(nameHeading).toBeTruthy();
});

it('should have no h1 tag (heading hierarchy: h2 used within sections)', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')).toBeNull();
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npx ng test --include="src/app/pages/about/**" --watch=false
```

Expected: `should have no h1 tag` FAILS (h1 still exists).

- [ ] **Step 3: Fix the template — change `<h1 class="main-title">` to `<h2 class="main-title">` on line 34**

In `src/app/pages/about/about.component.html`, change:

```html
<h1 class="main-title">Dra. Conceição Lopes</h1>
```

To:

```html
<h2 class="main-title">Dra. Conceição Lopes</h2>
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npx ng test --include="src/app/pages/about/**" --watch=false
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/about/
git commit -m "fix: correct h1 misuse on About page — heading hierarchy now valid"
```

---

## Task 3: Fix heading hierarchy — Practice Areas page

**Files:**
- Modify: `src/app/pages/practice-areas/practice-areas.component.html`
- Modify: `src/app/pages/practice-areas/practice-areas.component.spec.ts`

- [ ] **Step 1: Add a failing test in `src/app/pages/practice-areas/practice-areas.component.spec.ts`**

Open the file and add inside the `describe` block:

```ts
it('should use h2 for the main section title, not h1', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')).toBeNull();
    const h2s = Array.from(compiled.querySelectorAll('h2'));
    const areasHeading = h2s.find(el => el.textContent?.includes('Áreas de Especialização'));
    expect(areasHeading).toBeTruthy();
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npx ng test --include="src/app/pages/practice-areas/**" --watch=false
```

Expected: new test FAILS.

- [ ] **Step 3: Fix the template**

In `src/app/pages/practice-areas/practice-areas.component.html`, change:

```html
<h1 class="main-title">Áreas de Especialização</h1>
```

To:

```html
<h2 class="main-title">Áreas de Especialização</h2>
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npx ng test --include="src/app/pages/practice-areas/**" --watch=false
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/practice-areas/
git commit -m "fix: correct h1 misuse on Practice Areas page"
```

---

## Task 4: Add `robots.txt` and `sitemap.xml`

**Files:**
- Create: `src/robots.txt`
- Create: `src/sitemap.xml`

Note: `angular.json` already declares both files in the `assets` array — no changes needed there.

- [ ] **Step 1: Create `src/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://www.conceicaolopesadvogada.pt/sitemap.xml
```

- [ ] **Step 2: Create `src/sitemap.xml`**

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

- [ ] **Step 3: Verify both files exist**

```bash
ls src/robots.txt src/sitemap.xml
```

Expected: both files listed.

- [ ] **Step 4: Commit**

```bash
git add src/robots.txt src/sitemap.xml
git commit -m "feat: add robots.txt and sitemap.xml for crawlability"
```

---

## Task 5: Add `SeoService` to `HomeComponent` + update all meta descriptions

**Files:**
- Modify: `src/app/pages/home/home.component.ts`
- Modify: `src/app/pages/home/home.component.spec.ts`
- Modify: `src/app/pages/about/about.component.ts`
- Modify: `src/app/pages/practice-areas/practice-areas.component.ts`
- Modify: `src/app/pages/scheduling/scheduling.component.ts`

- [ ] **Step 1: Add a failing test for homepage SEO in `home.component.spec.ts`**

Replace the full content of `src/app/pages/home/home.component.spec.ts` with:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { SeoService } from '../../services/seo.service';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let seoSpy: jasmine.SpyObj<SeoService>;

    beforeEach(async () => {
        seoSpy = jasmine.createSpyObj('SeoService', ['update']);

        await TestBed.configureTestingModule({
            imports: [HomeComponent, NoopAnimationsModule],
            providers: [
                provideRouter([]),
                { provide: SeoService, useValue: seoSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the lawyer name', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Conceição Lopes');
    });

    it('should have testimonials', () => {
        expect(component.testimonials.length).toBeGreaterThan(0);
    });

    it('should call SeoService.update with Viseu-targeting title and description', () => {
        expect(seoSpy.update).toHaveBeenCalledWith(jasmine.objectContaining({
            title: jasmine.stringContaining('Viseu'),
            description: jasmine.stringContaining('Viseu'),
            canonical: 'https://www.conceicaolopesadvogada.pt/'
        }));
    });
});
```

- [ ] **Step 2: Run tests to confirm the new test fails**

```bash
npx ng test --include="src/app/pages/home/**" --watch=false
```

Expected: `should call SeoService.update` FAILS.

- [ ] **Step 3: Add `SeoService` import and constructor to `HomeComponent`**

In `src/app/pages/home/home.component.ts`, make two targeted edits:

**Add import** (after the existing imports):
```ts
import { SeoService } from '../../services/seo.service';
```

**Add constructor** (after the `Users = Users;` line, before `schedulingRedirect()`):
```ts
constructor() {
  inject(SeoService).update({
    title: 'Advogada em Nelas e Viseu',
    description: 'Dra. Conceição Lopes, advogada com 7 anos de experiência a servir Nelas, Viseu e o Distrito de Viseu. Especializada em Direito da Família, Civil, Trabalho e Comercial. Agende a sua consulta.',
    canonical: 'https://www.conceicaolopesadvogada.pt/',
  });
}
```

Leave all other code (testimonials, schedulingRedirect, icon fields) unchanged.

- [ ] **Step 4: Run tests to confirm they pass**

```bash
npx ng test --include="src/app/pages/home/**" --watch=false
```

Expected: all 4 tests PASS.

- [ ] **Step 5: Update About page meta description**

In `src/app/pages/about/about.component.ts`, update the `SeoService.update()` call:

```ts
inject(SeoService).update({
  title: 'Dra. Conceição Lopes | Advogada em Nelas',
  description: 'Conheça a Dra. Conceição Lopes (Cédula 66631C), advogada em Nelas com 7 anos de experiência a servir clientes em todo o Distrito de Viseu.',
  canonical: 'https://www.conceicaolopesadvogada.pt/sobre',
});
```

- [ ] **Step 6: Update Practice Areas meta description and title**

In `src/app/pages/practice-areas/practice-areas.component.ts`, update:

```ts
inject(SeoService).update({
  title: 'Serviços Jurídicos em Nelas e Viseu',
  description: 'Serviços jurídicos em Nelas e Viseu: Direito da Família, Civil, Penal, Trabalho, Comercial e Administrativo. Consulta personalizada com a Dra. Conceição Lopes.',
  canonical: 'https://www.conceicaolopesadvogada.pt/areas',
});
```

- [ ] **Step 7: Update Scheduling page meta description**

In `src/app/pages/scheduling/scheduling.component.ts`, update the description:

```ts
inject(SeoService).update({
  title: 'Agendar Consulta Jurídica em Nelas',
  description: 'Agende a sua consulta jurídica com a Dra. Conceição Lopes em Nelas. Atendimento de 2ª a 6ª, 9h–18h. Rápido, fácil e sem compromisso.',
  canonical: 'https://www.conceicaolopesadvogada.pt/agendamento',
});
```

- [ ] **Step 8: Run all page tests**

```bash
npx ng test --watch=false
```

Expected: all tests PASS.

- [ ] **Step 9: Commit**

```bash
git add src/app/pages/
git commit -m "feat: add homepage SEO tags and update all page meta descriptions for Viseu district"
```

---

## Task 6: Rewrite hero section copy + add phone CTA

**Files:**
- Modify: `src/app/pages/home/home.component.html`
- Modify: `src/app/pages/home/home.component.ts`

- [ ] **Step 1: Update badge text** in `home.component.html` (line 22):

```html
<span class="text-xs font-medium text-secondary tracking-wide uppercase">Advogada em Nelas &amp; Distrito de Viseu</span>
```

- [ ] **Step 2: Update hero description paragraph** (the `<p class="hero-description ...">` block):

```html
<p class="hero-description text-lg text-zinc-600 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
    Com 7 anos de experiência no Distrito de Viseu, a Dra. Conceição Lopes defende os seus
    direitos com dedicação, ética e clareza — para que nunca enfrente sozinho os desafios
    legais da sua vida.
</p>
```

- [ ] **Step 3: Add phone CTA below the action buttons** — after the closing `</div>` of the two buttons and before the closing `</app-blur-fade>`:

```html
<p class="text-sm text-zinc-500 mt-3 text-center lg:text-left">
    <a href="tel:+351910322893" class="text-secondary font-medium hover:underline">
        📞 +351 910 322 893
    </a>
    <span class="text-zinc-400"> — 2ª a 6ª, 9h–18h (chamada rede móvel nacional)</span>
</p>
```

- [ ] **Step 4: Update word-rotate array** in `home.component.ts` — change:

```ts
// Find the word-rotate usage in the template — the data comes from the template directly.
// In home.component.html, find the app-word-rotate tag and update the [words] binding:
```

In `home.component.html`, change the `app-word-rotate` `[words]` binding:

```html
<app-word-rotate [words]="['Família', 'Civil', 'Trabalho', 'Comercial', 'Penal']"
    class="text-secondary font-bold" />
```

- [ ] **Step 5: Run the app and verify hero section visually**

```bash
npx ng serve
```

Open `http://localhost:4200` and verify:
- Badge reads "Advogada em Nelas & Distrito de Viseu"
- Description paragraph has the new text
- Phone number appears below buttons
- Word-rotate cycles through 5 words including "Penal"

- [ ] **Step 6: Commit**

```bash
git add src/app/pages/home/home.component.html src/app/pages/home/home.component.ts
git commit -m "feat: update hero copy to target Viseu district and add phone CTA"
```

---

## Task 7: Rewrite core values cards copy

**Files:**
- Modify: `src/app/pages/home/home.component.html`

- [ ] **Step 1: Update the three feature card descriptions** in the Core Values section:

Replace the entire Core Values section (the `<section class="py-24 bg-white">` with 3 `feature-item` divs) with:

```html
<!-- Core Values Section -->
<section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <!-- Confidentiality -->
            <div class="feature-item">
                <div class="icon-container">
                    <lucide-icon [name]="ShieldCheck" class="w-8 h-8 text-secondary" />
                </div>
                <h3 class="feature-title">Confidencialidade</h3>
                <p class="feature-description">Tudo o que partilha fica entre nós. Sigilo profissional absoluto em cada conversa, documento e processo.</p>
            </div>

            <!-- Ethics & Justice -->
            <div class="feature-item">
                <div class="icon-container">
                    <lucide-icon [name]="Scale" class="w-8 h-8 text-secondary" />
                </div>
                <h3 class="feature-title">Ética e Justiça</h3>
                <p class="feature-description">Membro da Ordem dos Advogados (Cédula 66631C). Atuamos sempre com rigor deontológico e em defesa genuína dos seus interesses.</p>
            </div>

            <!-- Humane Treatment -->
            <div class="feature-item">
                <div class="icon-container">
                    <lucide-icon [name]="Users" class="w-8 h-8 text-secondary" />
                </div>
                <h3 class="feature-title">Atendimento Humano</h3>
                <p class="feature-description">O seu caso não é um número. Explicamos tudo em linguagem clara, acompanhamos cada etapa e respondemos sempre às suas dúvidas.</p>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/pages/home/home.component.html
git commit -m "feat: rewrite core values copy to be more specific and benefit-driven"
```

---

## Task 8: Rewrite About page bio, fix alt texts, add OA fact

**Files:**
- Modify: `src/app/pages/about/about.component.html`

- [ ] **Step 1: Replace the bio paragraphs** — find the `<div class="bio-content">` block in the biography section and replace the 3 `<p>` tags:

```html
<div class="bio-content">
    <p>
        A Dra. Conceição Lopes é advogada inscrita na Ordem dos Advogados (Cédula n.º 66631C),
        com escritório em Nelas a servir clientes em todo o Distrito de Viseu.
    </p>
    <p>
        Com 7 anos de experiência, especializou-se em casos de Direito da Família, Civil,
        Laboral e Comercial — acompanhando os seus clientes desde a primeira consulta até
        à resolução definitiva do processo.
    </p>
    <p>
        A sua abordagem é direta: explica os seus direitos em linguagem simples, apresenta
        as opções disponíveis e defende os seus interesses com determinação.
    </p>
</div>
```

- [ ] **Step 2: Add OA fact to the quick facts grid** — find the `<div class="grid grid-cols-2 gap-6 pt-4">` and add a third fact:

```html
<div class="grid grid-cols-2 gap-6 pt-4">
    <div class="fact-item">
        <span class="fact-label">Formação</span>
        <span class="fact-value">Faculdade de Direito</span>
    </div>
    <div class="fact-item">
        <span class="fact-label">Experiência</span>
        <span class="fact-value">7 Anos</span>
    </div>
    <div class="fact-item">
        <span class="fact-label">Cédula OA</span>
        <span class="fact-value">66631C</span>
    </div>
</div>
```

- [ ] **Step 3: Update image alt texts**

Change `advogada.jpg` alt:
```html
<img src="assets/advogada.jpg" alt="Dra. Conceição Lopes, advogada em Nelas, Viseu"
```

Change `fotoloja.jpg` alt:
```html
<img src="assets/fotoloja.jpg" alt="Escritório da Dra. Conceição Lopes em Nelas, Av. João XXIII"
```

Change the mission section `foto-estatua.jpg` alt:
```html
<img src="assets/foto-estatua.jpg" alt="Estátua da Justiça — Missão e Valores"
```

- [ ] **Step 4: Run tests**

```bash
npx ng test --include="src/app/pages/about/**" --watch=false
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/pages/about/about.component.html
git commit -m "feat: rewrite About page bio and fix image alt texts"
```

---

## Task 9: Rewrite Practice Area descriptions + fix hero alt text

**Files:**
- Modify: `src/app/pages/practice-areas/practice-areas.component.ts`
- Modify: `src/app/pages/home/home.component.html`

- [ ] **Step 1: Replace the `practiceAreas` array** in `practice-areas.component.ts`:

```ts
practiceAreas = [
  {
    title: 'Direito da Família',
    description: 'Divórcios, regulação do poder parental, pensão de alimentos, partilhas e inventários. Acompanhamento humano e discreto nos momentos mais difíceis da sua vida familiar.',
    icon: Heart,
    class: 'md:col-span-1'
  },
  {
    title: 'Direito Civil',
    description: 'Elaboração e revisão de contratos, responsabilidade civil, direitos reais e posse. Defendemos os seus interesses em litígios civis com rigor e eficácia.',
    icon: Scale,
    class: 'md:col-span-1'
  },
  {
    title: 'Direito do Trabalho',
    description: 'Despedimento ilícito, rescisão com justa causa, assédio laboral, acidentes de trabalho e negociação de indemnizações. Defenda os seus direitos enquanto trabalhador.',
    icon: Briefcase,
    class: 'md:col-span-1'
  },
  {
    title: 'Direito Comercial',
    description: 'Constituição e dissolução de sociedades, contratos comerciais, recuperação de créditos e processos de insolvência. Assessoria jurídica para empresas e empresários do Distrito de Viseu.',
    icon: Building,
    class: 'md:col-span-1'
  },
  {
    title: 'Direito Penal',
    description: 'Defesa em processos-crime, constituição como assistente, recursos e habeas corpus. Representação discreta e eficaz em todas as fases do processo penal.',
    icon: Shield,
    class: 'md:col-span-1'
  },
  {
    title: 'Direito Administrativo',
    description: 'Impugnação de atos administrativos, contencioso tributário, licenciamentos e relações com entidades públicas. Defendemos os seus direitos face à Administração Pública.',
    icon: Gavel,
    class: 'md:col-span-1'
  }
];
```

- [ ] **Step 2: Fix hero image alt text** in `home.component.html` — change the `foto-estatua.jpg` alt on the right hero column:

```html
<img src="assets/foto-estatua.jpg" alt="Estátua da Justiça — símbolo da advocacia"
```

- [ ] **Step 3: Commit**

```bash
git add src/app/pages/practice-areas/practice-areas.component.ts src/app/pages/home/home.component.html
git commit -m "feat: expand practice area descriptions and fix hero alt text"
```

---

## Task 10: Update footer tagline

**Files:**
- Modify: `src/app/components/layout/footer/footer.component.html`

- [ ] **Step 1: Update the tagline `<p>` tag** in `footer.component.html` (inside the `col-span-1 md:col-span-2` div):

```html
<p class="text-white/70 max-w-sm mb-6">
    Advogada em Nelas ao serviço do Distrito de Viseu.
    Soluções jurídicas claras, éticas e centradas em si.
</p>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/layout/footer/footer.component.html
git commit -m "feat: update footer tagline with local SEO keyword"
```

---

## Task 11: Create FAQ accordion component

**Files:**
- Create: `src/app/components/faq/faq.component.ts`
- Create: `src/app/components/faq/faq.component.html`
- Create: `src/app/components/faq/faq.component.spec.ts`

- [ ] **Step 1: Write the failing test** — create `src/app/components/faq/faq.component.spec.ts`:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaqComponent, FaqItem } from './faq.component';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('FaqComponent', () => {
    let component: FaqComponent;
    let fixture: ComponentFixture<FaqComponent>;

    const mockFaqs: FaqItem[] = [
        { q: 'Pergunta 1?', a: 'Resposta 1.' },
        { q: 'Pergunta 2?', a: 'Resposta 2.' },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FaqComponent, NoopAnimationsModule],
            providers: [provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(FaqComponent);
        component = fixture.componentInstance;
        component.faqs = mockFaqs;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render all FAQ questions', () => {
        const buttons = fixture.debugElement.queryAll(By.css('button[data-faq-button]'));
        expect(buttons.length).toBe(2);
        expect(buttons[0].nativeElement.textContent).toContain('Pergunta 1?');
    });

    it('should start with all answers collapsed', () => {
        const answers = fixture.debugElement.queryAll(By.css('[data-faq-answer]'));
        expect(answers.length).toBe(0);
    });

    it('should open an answer when its button is clicked', () => {
        const button = fixture.debugElement.query(By.css('button[data-faq-button]'));
        button.nativeElement.click();
        fixture.detectChanges();
        const answers = fixture.debugElement.queryAll(By.css('[data-faq-answer]'));
        expect(answers.length).toBe(1);
        expect(answers[0].nativeElement.textContent).toContain('Resposta 1.');
    });

    it('should close an open answer when its button is clicked again', () => {
        const button = fixture.debugElement.query(By.css('button[data-faq-button]'));
        button.nativeElement.click();
        fixture.detectChanges();
        button.nativeElement.click();
        fixture.detectChanges();
        const answers = fixture.debugElement.queryAll(By.css('[data-faq-answer]'));
        expect(answers.length).toBe(0);
    });

    it('should only show one answer at a time', () => {
        const buttons = fixture.debugElement.queryAll(By.css('button[data-faq-button]'));
        buttons[0].nativeElement.click();
        fixture.detectChanges();
        buttons[1].nativeElement.click();
        fixture.detectChanges();
        const answers = fixture.debugElement.queryAll(By.css('[data-faq-answer]'));
        expect(answers.length).toBe(1);
        expect(answers[0].nativeElement.textContent).toContain('Resposta 2.');
    });
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npx ng test --include="src/app/components/faq/**" --watch=false
```

Expected: FAIL — FaqComponent not found.

- [ ] **Step 3: Create `src/app/components/faq/faq.component.ts`**

```ts
import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ChevronDown } from 'lucide-angular';
import { BlurFadeComponent } from '../magic-ui/blur-fade/blur-fade.component';

export interface FaqItem {
  q: string;
  a: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, BlurFadeComponent],
  templateUrl: './faq.component.html',
})
export class FaqComponent {
  @Input() faqs: FaqItem[] = [];

  ChevronDown = ChevronDown;
  openIndex = signal<number | null>(null);

  toggle(index: number): void {
    this.openIndex.update(current => current === index ? null : index);
  }
}
```

- [ ] **Step 4: Create `src/app/components/faq/faq.component.html`**

```html
<section class="py-24 bg-zinc-50 border-t border-zinc-200">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <app-blur-fade [delay]="100">
            <div class="text-center mb-16">
                <h2 class="section-badge">Perguntas Frequentes</h2>
                <div class="title-accent"></div>
                <p class="section-description mt-4">
                    As dúvidas mais comuns sobre os nossos serviços jurídicos.
                </p>
            </div>
        </app-blur-fade>

        <div class="space-y-3">
            <app-blur-fade *ngFor="let faq of faqs; let i = index" [delay]="200 + i * 80">
                <div class="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <button
                        data-faq-button
                        (click)="toggle(i)"
                        class="w-full flex justify-between items-center px-6 py-4 text-left text-zinc-900 font-medium hover:bg-zinc-50 transition-colors duration-150"
                        [attr.aria-expanded]="openIndex() === i"
                        [attr.aria-controls]="'faq-answer-' + i">
                        <span>{{ faq.q }}</span>
                        <lucide-icon
                            [name]="ChevronDown"
                            class="w-5 h-5 text-secondary shrink-0 transition-transform duration-200"
                            [class.rotate-180]="openIndex() === i" />
                    </button>
                    <div
                        *ngIf="openIndex() === i"
                        data-faq-answer
                        [id]="'faq-answer-' + i"
                        class="px-6 pb-5 pt-2 text-zinc-600 leading-relaxed border-t border-zinc-100 text-sm">
                        {{ faq.a }}
                    </div>
                </div>
            </app-blur-fade>
        </div>

        <app-blur-fade [delay]="800">
            <div class="text-center mt-12">
                <a routerLink="/agendamento" class="btn-primary">
                    Agendar Consulta
                </a>
            </div>
        </app-blur-fade>
    </div>
</section>
```

- [ ] **Step 5: Run tests to confirm they pass**

```bash
npx ng test --include="src/app/components/faq/**" --watch=false
```

Expected: all 5 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/faq/
git commit -m "feat: add FAQ accordion component with accessibility attributes"
```

---

## Task 12: Add FAQ section to Homepage + inject FAQ JSON-LD schema

**Files:**
- Modify: `src/app/pages/home/home.component.ts`
- Modify: `src/app/pages/home/home.component.html`

- [ ] **Step 1: Add failing test for FAQ data existence** in `home.component.spec.ts` — add inside the `describe` block:

```ts
it('should have 6 FAQ items', () => {
    expect(component.faqs.length).toBe(6);
});
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
npx ng test --include="src/app/pages/home/**" --watch=false
```

Expected: `should have 6 FAQ items` FAILS.

- [ ] **Step 3: Update `home.component.ts`** — add `FaqComponent`, `DOCUMENT`, and FAQ data:

```ts
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
      description: 'Dra. Conceição Lopes, advogada com 7 anos de experiência a servir Nelas, Viseu e o Distrito de Viseu. Especializada em Direito da Família, Civil, Trabalho e Comercial. Agende a sua consulta.',
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
```

- [ ] **Step 4: Add `<app-faq>` to `home.component.html`** — append after the Core Values section, before the closing of the page:

```html
<!-- FAQ Section -->
<app-faq [faqs]="faqs" />
```

- [ ] **Step 5: Run all tests**

```bash
npx ng test --watch=false
```

Expected: all tests PASS.

- [ ] **Step 6: Run the app and verify FAQ section**

```bash
npx ng serve
```

Open `http://localhost:4200`, scroll to the bottom of the homepage, and verify:
- FAQ section appears with 6 items
- Clicking a question expands the answer
- Clicking again collapses it
- Only one answer open at a time
- CTA button at the bottom navigates to `/agendamento`
- In DevTools → Elements, verify a `<script type="application/ld+json" data-faq-schema>` tag exists in `<head>` with all 6 Q&As

- [ ] **Step 7: Commit**

```bash
git add src/app/pages/home/
git commit -m "feat: add FAQ section with JSON-LD schema to homepage"
```

---

## Final verification

- [ ] **Run full test suite**

```bash
npx ng test --watch=false
```

Expected: all tests PASS with 0 failures.

- [ ] **Build for production to verify SSR**

```bash
npx ng build
```

Expected: build completes with no errors.

- [ ] **Validate structured data**

Visit [https://search.google.com/test/rich-results](https://search.google.com/test/rich-results) and test `https://www.conceicaolopesadvogada.pt/`. Verify:
- LegalService rich result detected
- FAQ rich result detected

- [ ] **Final commit tag**

```bash
git add -A
git commit -m "chore: complete SEO + copy + UX overhaul — Viseu district targeting"
```
