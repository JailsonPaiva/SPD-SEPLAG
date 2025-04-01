import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class FilterBarComponent {
  @Output() filterChange = new EventEmitter<{
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

  // Exponha o objeto Math para o template
  Math = Math;

  handleFilter() {
    this.filterChange.emit({
      nome: this.filters.nome,
      faixaIdadeInicial: this.filters.faixaIdadeInicial ?? 0,
      faixaIdadeFinal: this.filters.faixaIdadeFinal ?? 0,
      sexo: this.filters.sexo,
      status: this.filters.status,
    });
  }
}