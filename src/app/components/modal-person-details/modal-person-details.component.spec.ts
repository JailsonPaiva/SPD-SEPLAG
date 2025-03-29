import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalPersonDetails } from './modal-person-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('ModalPersonDetails', () => {
  let component: ModalPersonDetails;
  let fixture: ComponentFixture<ModalPersonDetails>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ModalPersonDetails>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ModalPersonDetails],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { name: 'João Silva', age: 25, gender: 'Masculino' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPersonDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render person details passed via MAT_DIALOG_DATA', () => {
    const nameElement = fixture.debugElement.query(By.css('.person-name')).nativeElement;
    const ageElement = fixture.debugElement.query(By.css('.person-age')).nativeElement;
    const genderElement = fixture.debugElement.query(By.css('.person-gender')).nativeElement;

    expect(nameElement.textContent).toContain('João Silva');
    expect(ageElement.textContent).toContain('25 anos');
    expect(genderElement.textContent).toContain('Masculino');
  });

  it('should close the modal when close button is clicked', () => {
    const closeButton = fixture.debugElement.query(By.css('.close-button')).nativeElement;
    closeButton.click();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
