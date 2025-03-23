// filepath: c:\Users\JailsonPaiva\pessoas-desaparecidas\src\app\components\filter-bar\filter-bar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importação do FormsModule
import { NgIf } from '@angular/common'; // Importação do NgIf para condicional no template

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  standalone: true,
  imports: [FormsModule], // Adicione o FormsModule aqui
})
export class FilterBarComponent {
  @Output() onFilter = new EventEmitter<{
    nome: string;
    faixaIdadeInicial: number | 0;
    faixaIdadeFinal: number | 0;
    sexo: string;
    status: string;
  }>();

  filters = {
    nome: '',
    faixaIdadeInicial: 0,
    faixaIdadeFinal: 0,
    sexo: '',
    status: 'DESAPARECIDO',
  };

  applyFilters() {
    this.onFilter.emit({
      nome: this.filters.nome,
      faixaIdadeInicial: this.filters.faixaIdadeInicial ?? 0,
      faixaIdadeFinal: this.filters.faixaIdadeFinal ?? 0,
      sexo: this.filters.sexo,
      status: this.filters.status,
    });
  }
}