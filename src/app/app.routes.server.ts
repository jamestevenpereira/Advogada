import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'sobre', renderMode: RenderMode.Prerender },

  // Practice areas hub + individual pages
  { path: 'areas', renderMode: RenderMode.Prerender },
  { path: 'areas/direito-da-familia', renderMode: RenderMode.Prerender },
  { path: 'areas/direito-civil', renderMode: RenderMode.Prerender },
  { path: 'areas/direito-do-trabalho', renderMode: RenderMode.Prerender },
  { path: 'areas/direito-comercial', renderMode: RenderMode.Prerender },
  { path: 'areas/direito-penal', renderMode: RenderMode.Prerender },
  { path: 'areas/direito-administrativo', renderMode: RenderMode.Prerender },

  // City pages
  { path: 'viseu', renderMode: RenderMode.Prerender },
  { path: 'nelas', renderMode: RenderMode.Prerender },
  { path: 'santa-comba-dao', renderMode: RenderMode.Prerender },
  { path: 'tondela', renderMode: RenderMode.Prerender },
  { path: 'carregal-do-sal', renderMode: RenderMode.Prerender },

  { path: 'agendamento', renderMode: RenderMode.Prerender },
  { path: 'politica-privacidade', renderMode: RenderMode.Prerender },
  { path: 'politica-cookies', renderMode: RenderMode.Prerender },

  // Unrecognised paths → serve SPA shell
  { path: '**', renderMode: RenderMode.Client },
];
