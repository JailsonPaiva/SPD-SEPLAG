import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CardMissingPeopleComponent } from "../card-missing-people/card-missing-people.component"
import { FilterBarComponent } from '../filter-bar/filter-bar.component';
import { missingPeople } from '../../app.interface';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'people-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    CardMissingPeopleComponent,
    FilterBarComponent
  ],
  providers: [HttpClient, PeopleService],
  templateUrl: './people-list.component.html'
})
export class MissingPeopleComponent implements OnInit {
  missingPeople: missingPeople = {
    totalPages: 0,
    totalElements: 0,
    pageable: null,
    numberOfElements: 0,
    content: [],
    first: false,
    last: false,
    sort: null,
    number: 0,
    size: 0
  };

  filters = {
    nome: '',
    faixaIdadeInicial: 0,
    faixaIdadeFinal: 0,
    sexo: '',
    status: 'DESAPARECIDO'
  };

  currentPage = 0;
  recordsPerPage = 12;
  totalPages = 0;

  constructor(
    private peopleService: PeopleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const queryParams = {
      faixaIdadeInicial: this.filters.faixaIdadeInicial,
      faixaIdadeFinal: this.filters.faixaIdadeFinal,
      nome: this.filters.nome,
      sexo: this.filters.sexo,
      status: this.filters.status || 'DESAPARECIDO',
      porPagina: this.recordsPerPage,
      pagina: this.currentPage
    };

    this.peopleService.getPeople(queryParams)
      .subscribe((response: missingPeople) => {
        this.missingPeople = {
          ...response,
          first: response.first ?? false,
          last: response.last ?? false,
          sort: response.sort ?? null,
          number: response.number ?? 0,
          size: response.size ?? 0
        };
        this.totalPages = response.totalPages;
      });
  }

  handleFilter(filters: {
    nome: string;
    faixaIdadeInicial: number;
    faixaIdadeFinal: number;
    sexo: string;
    status: string;
  }): void {
    this.filters = filters;
    this.currentPage = 0;
    this.fetchData();
  }

  handleNextPage() {
    this.currentPage++;
    this.fetchData();
  }

  handlePreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchData();
    }
  }

  openPersonDetails(person: any): void {
    this.router.navigate(['/detalhes', person.id]);
  }

  calculateMissingDays(dataDesaparecimento?: string): number {
    if (!dataDesaparecimento) return 0;
    const desaparecimento = new Date(dataDesaparecimento);
    const hoje = new Date();
    const diffTime = Math.abs(hoje.getTime() - desaparecimento.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    const cleanDateString = dateString.split('T')[0];
    const [year, month, day] = cleanDateString.split('-').map(Number);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      console.error('Data inválida:', dateString);
      return '';
    }

    const date = new Date(year, month - 1, day);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  }
} 