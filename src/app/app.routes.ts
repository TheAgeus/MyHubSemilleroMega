
import { Routes } from '@angular/router';
import { MediaListComponent } from './media-list/media-list.component';
import { DetalleComponent } from './detalle/detalle.component';
import { VerComponent } from './ver/ver.component';
import { SettingsComponent } from './settings/settings.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guards/auth.guard';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
    {
        path: 'Dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
        children: [
            { path: '', component:MediaListComponent },
            { path: 'Config', component:SettingsComponent },
            { path: 'List/:type/:category', component:MediaListComponent },
            { path: 'Detail/:type/:id', component:DetalleComponent },
            { path: 'Watch/:type/:id', component:VerComponent },
            { path: 'List_fav/:Favorities', component:MediaListComponent },
            { path: 'List_watch/:Viendo', component:MediaListComponent }
        ],
        canActivate: [authGuard]
    },
    {
        path: '',
        component: AuthComponent,
    },
    {
        path : 'register',
        component:RegisterComponent
    },
    {
        path : '**',
        component: PageNoFoundComponent
    }


];


