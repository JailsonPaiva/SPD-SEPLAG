import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterBarComponent } from './filter-bar.component';
import { FormsModule } from '@angular/forms';

describe('FilterBarComponent', () => {
  let component: FilterBarComponent;
  let fixture: ComponentFixture<FilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FilterBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onFilter event with correct filters', () => {
    spyOn(component.onFilter, 'emit');

    component.filters = {
      nome: 'João',
      faixaIdadeInicial: 18,
      faixaIdadeFinal: 30,
      sexo: 'MASCULINO',
      status: 'DESAPARECIDO',
    };

    component.handleFilter();

    expect(component.onFilter.emit).toHaveBeenCalledWith({
      nome: 'João',
      faixaIdadeInicial: 18,
      faixaIdadeFinal: 30,
      sexo: 'MASCULINO',
      status: 'DESAPARECIDO',
    });
  });

  it('should emit default values if filters are not set', () => {
    spyOn(component.onFilter, 'emit');

    component.filters = {
      nome: '',
      faixaIdadeInicial: 0,
      faixaIdadeFinal: 0,
      sexo: '',
      status: 'DESAPARECIDO',
    };

    component.handleFilter();

    expect(component.onFilter.emit).toHaveBeenCalledWith({
      nome: '',
      faixaIdadeInicial: 0,
      faixaIdadeFinal: 0,
      sexo: '',
      status: 'DESAPARECIDO',
    });
  });
});
