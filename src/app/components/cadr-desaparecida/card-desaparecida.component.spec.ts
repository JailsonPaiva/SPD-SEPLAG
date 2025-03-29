import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MissingPersonCardComponent } from './card-desaparecida.component';
import { By } from '@angular/platform-browser';

describe('MissingPersonCardComponent', () => {
  let component: MissingPersonCardComponent;
  let fixture: ComponentFixture<MissingPersonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingPersonCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MissingPersonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the name, age, and gender correctly', () => {
    component.name = 'João Silva';
    component.age = 25;
    component.gender = 'Masculino';
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    const ageGenderElement = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(nameElement.textContent).toContain('João Silva');
    expect(ageGenderElement.textContent).toContain('25 anos • Masculino');
  });

  it('should render the missing date if not located', () => {
    component.localizadoEm = '';
    component.desaparecidoEm = '01/01/2025';
    fixture.detectChanges();

    const missingDateElement = fixture.debugElement.query(By.css('.text-gray-600')).nativeElement;
    expect(missingDateElement.textContent).toContain('Desaparecido(a) em: 01/01/2025');
  });

  it('should render the located date if available', () => {
    component.localizadoEm = '02/01/2025';
    fixture.detectChanges();

    const locatedDateElement = fixture.debugElement.query(By.css('.text-gray-600')).nativeElement;
    expect(locatedDateElement.textContent).toContain('Localizado(a) em: 02/01/2025');
  });

  it('should render the default image if no imageUrl is provided', () => {
    component.imageUrl = '';
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain('https://desaparecidos.pjc.mt.gov.br/assets/img/sem-foto.svg');
  });

  it('should render the provided imageUrl if available', () => {
    component.imageUrl = 'https://example.com/image.jpg';
    fixture.detectChanges();

    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toContain('https://example.com/image.jpg');
  });
});
