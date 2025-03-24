import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    idPessoa: '',
  };

  constructor(
    public dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formData.idPessoa = data?.id || '';
  }

  submitForm(): void {
    console.log('Formulário enviado:', this.formData);
    this.dialogRef.close(this.formData); // Fecha o modal e retorna os dados
  }

  closeModal(): void {
    this.dialogRef.close(); // Fecha o modal sem retornar dados
  }
}
