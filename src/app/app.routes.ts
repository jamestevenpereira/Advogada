import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sobre', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
    { path: 'areas', loadComponent: () => import('./pages/practice-areas/practice-areas.component').then(m => m.PracticeAreasComponent) },
    { path: 'areas/direito-da-familia', loadComponent: () => import('./pages/areas/direito-da-familia/direito-da-familia.component').then(m => m.DireitoDaFamiliaComponent) },
    { path: 'areas/direito-civil', loadComponent: () => import('./pages/areas/direito-civil/direito-civil.component').then(m => m.DireitoCivilComponent) },
    { path: 'areas/direito-do-trabalho', loadComponent: () => import('./pages/areas/direito-do-trabalho/direito-do-trabalho.component').then(m => m.DireitoDoTrabalhoComponent) },
    { path: 'areas/direito-comercial', loadComponent: () => import('./pages/areas/direito-comercial/direito-comercial.component').then(m => m.DireitoComercialComponent) },
    { path: 'areas/direito-penal', loadComponent: () => import('./pages/areas/direito-penal/direito-penal.component').then(m => m.DireitoPenalComponent) },
    { path: 'areas/direito-administrativo', loadComponent: () => import('./pages/areas/direito-administrativo/direito-administrativo.component').then(m => m.DireitoAdministrativoComponent) },
    { path: 'viseu', loadComponent: () => import('./pages/cidades/viseu/viseu.component').then(m => m.ViseuComponent) },
    { path: 'nelas', loadComponent: () => import('./pages/cidades/nelas/nelas.component').then(m => m.NelasComponent) },
    { path: 'santa-comba-dao', loadComponent: () => import('./pages/cidades/santa-comba-dao/santa-comba-dao.component').then(m => m.SantaCombaDaoComponent) },
    { path: 'tondela', loadComponent: () => import('./pages/cidades/tondela/tondela.component').then(m => m.TondelaComponent) },
    { path: 'carregal-do-sal', loadComponent: () => import('./pages/cidades/carregal-do-sal/carregal-do-sal.component').then(m => m.CarregalDoSalComponent) },
    { path: 'agendamento', loadComponent: () => import('./pages/scheduling/scheduling.component').then(m => m.SchedulingComponent) },
    { path: 'politica-privacidade', loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) },
    { path: 'politica-cookies', loadComponent: () => import('./pages/cookie-policy/cookie-policy.component').then(m => m.CookiePolicyComponent) },
    { path: '**', redirectTo: '' }
];
