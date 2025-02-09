
import { Routes } from '@angular/router';
import { MediaListComponent } from './media-list/media-list.component';
import { DetalleComponent } from './detalle/detalle.component';
import { VerComponent } from './ver/ver.component';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
    {
        path: 'Dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
        children: [
            { path: 'Config', component:SettingsComponent },
            { path: ':type/:category', component:MediaListComponent },
            { path: ':type/:category/:id', component:DetalleComponent },
            { path: ':type/:category/:id/ver', component:VerComponent }
        ]
    },
    {
        path: '',
        loadComponent: () => import('./auth/auth.component').then(c => c.AuthComponent),
    },


];


