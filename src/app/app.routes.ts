import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'country-list',
    pathMatch: 'full',
  },
  {
    path: 'country-list',
    loadComponent: () => import('./features/countries/country-list/country-list.page').then( m => m.CountryListPage)
  },

];
