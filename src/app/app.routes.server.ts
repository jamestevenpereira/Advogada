import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'sobre', renderMode: RenderMode.Prerender },
  { path: 'areas', renderMode: RenderMode.Prerender },
  { path: 'agendamento', renderMode: RenderMode.Prerender },
  { path: 'politica-privacidade', renderMode: RenderMode.Prerender },
  { path: 'politica-cookies', renderMode: RenderMode.Prerender },
  // Unrecognised paths → serve SPA shell (404 page hydrates on client)
  { path: '**', renderMode: RenderMode.Client },
];
