import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sobre', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
    { path: 'areas', loadComponent: () => import('./pages/practice-areas/practice-areas.component').then(m => m.PracticeAreasComponent) },
    { path: 'agendamento', loadComponent: () => import('./pages/scheduling/scheduling.component').then(m => m.SchedulingComponent) },
    { path: 'politica-privacidade', loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) },
    { path: 'politica-cookies', loadComponent: () => import('./pages/cookie-policy/cookie-policy.component').then(m => m.CookiePolicyComponent) },
    { path: '**', redirectTo: '' }
];

