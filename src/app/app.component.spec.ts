import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'pessoas-desaparecidas' title`, () => {
    expect(component.title).toEqual('pessoas-desaparecidas');
  });

  it('should fetch data on initialization', () => {
    spyOn(component, 'fetchData');
    component.ngOnInit();
    expect(component.fetchData).toHaveBeenCalled();
  });

  it('should render title in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('PESSOAS DESAPARECIDAS');
  });

  it('should handle next page correctly', () => {
    component.currentPage = 0;
    spyOn(component, 'fetchData');
    component.handleNextPage();
    expect(component.currentPage).toBe(1);
    expect(component.fetchData).toHaveBeenCalled();
  });

  it('should handle previous page correctly', () => {
    component.currentPage = 1;
    spyOn(component, 'fetchData');
    component.handlePreviousPage();
    expect(component.currentPage).toBe(0);
    expect(component.fetchData).toHaveBeenCalled();
  });

  it('should not go to previous page if already on the first page', () => {
    component.currentPage = 0;
    spyOn(component, 'fetchData');
    component.handlePreviousPage();
    expect(component.currentPage).toBe(0);
    expect(component.fetchData).not.toHaveBeenCalled();
  });

  it('should open person details modal', () => {
    const person = { id: 1 };
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of() } as any);
    component.openPersonDetails(person);
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should calculate missing days correctly', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const missingDays = component.calculateMissingDays(yesterday.toISOString());
    expect(missingDays).toBe(1);
  });

  it('should format date correctly', () => {
    const formattedDate = component.formatDate('2025-03-28T00:00:00');
    expect(formattedDate).toBe('28/03/2025');
  });

  it('should return empty string for invalid date format', () => {
    const formattedDate = component.formatDate('invalid-date');
    expect(formattedDate).toBe('');
  });
});

