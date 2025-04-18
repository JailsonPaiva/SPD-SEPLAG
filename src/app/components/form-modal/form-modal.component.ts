import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule],
  providers: [HttpClient, PeopleService],
})
export class FormModalComponent {
  formData = {
    informacao: '',
    descricao: '',
    data: '',
    personId: '',
    ocoId: '',
    anexos: '',
  };

  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private peopleService: PeopleService
  ) {
    this.formData.personId = data?.id || '';
    this.formData.ocoId = data?.ocoId || '';
    // console.log('Dados no formulario:', this.formData);
  }

  // Método para capturar o arquivo selecionado
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
  
      if (allowedTypes.includes(file.type)) {
        this.selectedFile = file;
        // console.log('Arquivo selecionado:', this.selectedFile);
      } else {
        this.selectedFile = null;
        console.error('Tipo de arquivo não permitido. Por favor, selecione um arquivo PNG, JPEG, JPG ou SVG.');
        alert('Tipo de arquivo não permitido. Por favor, selecione um arquivo PNG, JPEG, JPG ou SVG.');
      }
    }
  }

  // Método para enviar o formulário
  submitForm(): void {
    const formData = new FormData();
    formData.append('informacao', this.formData.informacao);
    formData.append('descricao', this.formData.descricao);
    formData.append('data', this.formData.data);
    formData.append('ocoId', this.formData.ocoId);

    // Adicione o arquivo ao FormData, se existir
    if (this.selectedFile) {
      formData.append('anexos', this.selectedFile);
    }

    this.peopleService.submitForm(formData).subscribe({
      next: (response: any) => {
        console.log('Dados enviados com sucesso:', this.formData);
        this.dialogRef.close(this.formData); 
        alert('Formulário enviado com sucesso!');
      },
      error: (error: any) => {
        console.error('Erro ao enviar os dados:', error);
        alert('Erro ao enviar o formulário. Por favor, tente novamente.');
      }
    });
  }

  closeModal(): void {
    alert('Modal fechado.');
    this.dialogRef.close(); // Fecha o modal sem retornar dados
  }
}