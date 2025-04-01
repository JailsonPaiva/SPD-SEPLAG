import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormModalComponent } from './form-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('FormModalComponent', () => {
  let component: FormModalComponent;
  let fixture: ComponentFixture<FormModalComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<FormModalComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [FormModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { id: '123', ocoId: '456' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formData with data from MAT_DIALOG_DATA', () => {
    expect(component.formData.personId).toBe('123');
    expect(component.formData.ocoId).toBe('456');
  });

  it('should close the modal when closeModal is called', () => {
    component.closeModal();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should call submitForm and send data correctly', () => {
    spyOn(component, 'submitForm').and.callThrough();
    component.formData = {
      informacao: 'Informação de teste',
      descricao: 'Descrição de teste',
      data: '2025-03-29',
      personId: '123',
      ocoId: '456',
      anexos: '',
    };

    const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
    formElement.dispatchEvent(new Event('submit'));

    expect(component.submitForm).toHaveBeenCalled();
  });

  it('should handle file selection correctly', () => {
    const file = new File(['content'], 'test-file.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    expect(component.selectedFile).toBe(file);
  });

  it('should not accept invalid file types', () => {
    const file = new File(['content'], 'test-file.txt', { type: 'text/plain' });
    const event = { target: { files: [file] } } as unknown as Event;

    spyOn(window, 'alert');
    component.onFileSelected(event);

    expect(component.selectedFile).toBeNull();
    expect(window.alert).toHaveBeenCalledWith(
      'Tipo de arquivo não permitido. Por favor, selecione um arquivo PNG, JPEG, JPG ou SVG.'
    );
  });
});