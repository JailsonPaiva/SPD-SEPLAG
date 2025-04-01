import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class FormModalComponent {
  formData = {
    informacao: '',
    descricao: '',
    data: '',
    personId: '',
    ocoId: '',
  };

  selectedFile: File | null = null; // Propriedade para armazenar o arquivo selecionado

  constructor(
    public dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.formData.personId = data?.id || '';
    this.formData.ocoId = data?.ocoId || '';
    console.log('Dados no formulario:', this.formData);
  }

  // Método para capturar o arquivo selecionado
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
  
      if (allowedTypes.includes(file.type)) {
        this.selectedFile = file;
        console.log('Arquivo selecionado:', this.selectedFile);
      } else {
        this.selectedFile = null;
        console.error('Tipo de arquivo não permitido. Por favor, selecione um arquivo PNG, JPEG, JPG ou SVG.');
        alert('Tipo de arquivo não permitido. Por favor, selecione um arquivo PNG, JPEG, JPG ou SVG.');
      }
    }
  }

  // Método para enviar o formulário
  submitForm(): void {
    const apiUrl = 'https://abitus-api.geia.vip/v1/ocorrencias/informacoes-desaparecido';

    const formData = new FormData();
    formData.append('informacao', this.formData.informacao);
    formData.append('descricao', this.formData.descricao);
    formData.append('data', this.formData.data);
    formData.append('ocoId', this.formData.ocoId);

    // Adicione o arquivo ao FormData, se existir
    if (this.selectedFile) {
      formData.append('arquivo', this.selectedFile, this.selectedFile.name);
    }

    this.http.post(apiUrl, formData).subscribe(
      (response) => {
        console.log('Dados enviados com sucesso:', response);
        this.dialogRef.close(this.formData); // Fecha o modal e retorna os dados
        alert('Formulário enviado com sucesso!');
      },
      (error) => {
        console.error('Erro ao enviar os dados:', error);
        alert('Erro ao enviar o formulário. Por favor, tente novamente.');
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close(); // Fecha o modal sem retornar dados
  }
}