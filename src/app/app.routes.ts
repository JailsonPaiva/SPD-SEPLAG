import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/people-list/people-list.component').then(m => m.MissingPeopleComponent)
  },
  {
    path: 'detalhes/:id',
    loadComponent: () => import('./components/modal-person-details/modal-person-details.component').then(m => m.ModalPersonDetails)
  }
];
