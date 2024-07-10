import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
        children: [

        ]
    },
    {
        path: '',
        loadComponent: () => import('./auth/auth.component').then(c => c.AuthComponent),
        children: [

        ]
    }


];
