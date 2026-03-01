import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
    title: string;
    description: string;
    canonical: string;
    /** Optional OG image override. Defaults to site-wide image. */
    ogImage?: string;
}

const SITE_NAME = 'Conceição Lopes — Advogada';
const DEFAULT_OG_IMAGE = 'https://www.conceicaolopesadvogada.pt/assets/og-image.jpg';

@Injectable({ providedIn: 'root' })
export class SeoService {
    private titleSvc = inject(Title);
    private meta = inject(Meta);
    private document = inject(DOCUMENT);

    /**
     * Updates all SEO metadata (title, description, canonical, OG, Twitter)
     * for the current route. Call this in each page component constructor.
     */
    update(config: SeoConfig): void {
        const fullTitle = `${config.title} | ${SITE_NAME}`;
        const image = config.ogImage ?? DEFAULT_OG_IMAGE;

        this.titleSvc.setTitle(fullTitle);

        // Standard
        this.meta.updateTag({ name: 'description', content: config.description });

        // Open Graph
        this.meta.updateTag({ property: 'og:title', content: fullTitle });
        this.meta.updateTag({ property: 'og:description', content: config.description });
        this.meta.updateTag({ property: 'og:url', content: config.canonical });
        this.meta.updateTag({ property: 'og:image', content: image });

        // Twitter Card
        this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
        this.meta.updateTag({ name: 'twitter:description', content: config.description });
        this.meta.updateTag({ name: 'twitter:image', content: image });

        // Canonical link
        this.updateCanonical(config.canonical);
    }

    private updateCanonical(url: string): void {
        let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
        if (!link) {
            link = this.document.createElement('link');
            link.setAttribute('rel', 'canonical');
            this.document.head.appendChild(link);
        }
        link.setAttribute('href', url);
    }
}
