import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PracticeAreasComponent } from './pages/practice-areas/practice-areas.component';
import { SchedulingComponent } from './pages/scheduling/scheduling.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { CookiePolicyComponent } from './pages/cookie-policy/cookie-policy.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sobre', component: AboutComponent },
    { path: 'areas', component: PracticeAreasComponent },
    { path: 'agendamento', component: SchedulingComponent },
    { path: 'politica-privacidade', component: PrivacyPolicyComponent },
    { path: 'politica-cookies', component: CookiePolicyComponent },
    { path: '**', redirectTo: '' }
];
