import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/people-list/people-list.component').then(m => m.MissingPeopleComponent)
  }
];
