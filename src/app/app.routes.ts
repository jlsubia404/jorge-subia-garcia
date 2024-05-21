import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/search', pathMatch: 'full' },
    { path: 'search', loadChildren: () => import('./pages/list-product/list-product.module').then(m => m.ListProductModule) }
];
