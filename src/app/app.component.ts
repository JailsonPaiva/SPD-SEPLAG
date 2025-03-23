// filepath: c:\Users\JailsonPaiva\pessoas-desaparecidas\src\app\app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MissingPersonCardComponent } from './components/cadr-desaparecida/card-desaparecida.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MissingPersonCardComponent,
    FilterBarComponent,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  missingPeople: any[] = [];
  filters = {
    nome: '',
    faixaIdadeInicial: 0,
    faixaIdadeFinal: 0,
    sexo: '',
    status: 'DESAPARECIDO'
  };
  currentPage = 0;
  recordsPerPage = 12;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const queryParams = {
      faixaIdadeInicial: this.filters.faixaIdadeInicial,
      faixaIdadeFinal: this.filters.faixaIdadeFinal,
      nome: this.filters.nome,
      sexo: this.filters.sexo,
      status: this.filters.status,
      porPagina: this.recordsPerPage,
      pagina: this.currentPage
    };

    this.http.get<any[]>(`https://abitus-api.pjc.mt.gov.br/v1/pessoas/aberto/filtro`, { params: queryParams })
      .subscribe((response: any) => {
        this.missingPeople = response.content || [];
      });
  }

  handleFilter(filters: {
    nome: string;
    faixaIdadeInicial: number;
    faixaIdadeFinal: number;
    sexo: string;
    status: string;
  }) {
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

  // Função para calcular os dias desaparecido
  calculateMissingDays(dataDesaparecimento?: string): number {
    if (!dataDesaparecimento) return 0;
    const desaparecimento = new Date(dataDesaparecimento);
    const hoje = new Date();
    const diffTime = Math.abs(hoje.getTime() - desaparecimento.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Converte para dias
  }

  // Função para formatar a data no formato dia/mês/ano
  formatDate(dateString?: string): string {
    if (!dateString) return 'data desconhecida';
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  }
}