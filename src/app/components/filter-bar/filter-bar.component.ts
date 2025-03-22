// filepath: c:\Users\JailsonPaiva\pessoas-desaparecidas\src\app\components\filter-bar\filter-bar.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent {
  @Output() onFilter = new EventEmitter<{
    nome: string;
    faixaIdadeInicial: number | null;
    faixaIdadeFinal: number | null;
    sexo: string;
    status: string;
  }>();

  nome: string = '';
  faixaIdadeInicial: number | null = null;
  faixaIdadeFinal: number | null = null;
  sexo: string = '';
  status: string = '';

  handleFilter() {
    this.onFilter.emit({
      nome: this.nome,
      faixaIdadeInicial: this.faixaIdadeInicial,
      faixaIdadeFinal: this.faixaIdadeFinal,
      sexo: this.sexo,
      status: this.status,
    });
  }
}