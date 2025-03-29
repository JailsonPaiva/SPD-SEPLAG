import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MissingPersonCardComponent } from './components/cadr-desaparecida/card-desaparecida.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { missingPeople } from './app.interface';
import { ModalPersonDetails } from './components/modal-person-details/modal-person-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MissingPersonCardComponent,
    FilterBarComponent,
    FormsModule,
    HttpClientModule,
    ModalPersonDetails, // Ensure ModalPersonDetails is imported
    MatDialogModule, // Certifique-se de importar o MatDialogModule
  ],
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  title = 'pessoas-desaparecidas';
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
  totalPages = 0; // Adiciona a propriedade totalPages

  selectedPerson: any = null; // Pessoa selecionada para exibir no modal
  isModalOpen = false; // Controle de exibição do modal

  constructor(public http: HttpClient, public dialog: MatDialog) { }

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

    this.http.get<missingPeople>(`https://abitus-api.geia.vip/v1/pessoas/aberto/filtro`, { params: queryParams })
      .subscribe((response: missingPeople) => {
        this.missingPeople = {
          ...response,
          first: response.first ?? false,
          last: response.last ?? false,
          sort: response.sort ?? null,
          number: response.number ?? 0,
          size: response.size ?? 0
        };
        this.totalPages = response.totalPages; // Atualiza o total de páginas
        console.log('Dados carregados:', this.missingPeople.content);
      });
  }

  handleFilter(filters: {
    nome: string;
    faixaIdadeInicial: number;
    faixaIdadeFinal: number;
    sexo: string;
    status: string;
  }) {
    this.filters = filters;
    this.currentPage = 0;
    this.fetchData();
    console.log('Filtros aplicados:', filters);
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

  openPersonDetails(person: any): void {
    const id = person.id; // Pegue o ID do objeto person
    const apiUrl = `https://abitus-api.geia.vip/v1/pessoas/${id}`;

    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        // Abra o modal com os dados retornados pela API
        this.dialog.open(ModalPersonDetails, {
          data: response, // Dados passados para o modal
          width: '550px',
          panelClass: 'custom-modal', // Classe personalizada
        });
        console.log(response)
      },
      (error) => {
        console.error('Erro ao buscar os detalhes da pessoa:', error);
      }
    );
  }
}