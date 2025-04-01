import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'detalhes/:id',
    loadComponent: () => import('./components/modal-person-details/modal-person-details.component').then(m => m.ModalPersonDetails)
  }
];
