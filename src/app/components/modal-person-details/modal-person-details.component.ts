import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal-person-details',
  templateUrl: './modal-person-details.component.html',
  styleUrls: ['./modal-person-details.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule, // Módulo para diálogos
    MatIconModule,   // Módulo para ícones
    CommonModule,    // Import CommonModule for ngClass
  ],
})
export class ModalPersonDetails {
  @Input() person: any; // Add Input property for person

  constructor(
    public dialogRef: MatDialogRef<ModalPersonDetails>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeModal() {
    this.dialogRef.close(); // Close the modal
  }

  sendInformation() {
    console.log('Enviar informações sobre a vítima');
    // Adicione a lógica para envio de informações
  }

  downloadPoster() {
    if (this.person?.urlPoste) {
      const link = document.createElement('a');
      link.href = this.person.urlPoste.toString();
      link.download = `cartaz-desaparecido-${this.person.name}.pdf`;
      link.click();
    } else {
      alert('Arquivo não disponível para download.');
    }
  }

  shareOnWhatsApp() {
    const message = `Pessoa desaparecida: ${this.person.name}, ${this.person.age} anos. Por favor, compartilhe.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  }

  shareOnInstagram() {
    window.open('https://instagram.com');
  }

  missingDays(dataDesaparecimento?: string): number {
    if (!dataDesaparecimento) return 0;
    const desaparecimento = new Date(dataDesaparecimento);
    const hoje = new Date();
    const diffTime = Math.abs(hoje.getTime() - desaparecimento.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    const cleanDateString = dateString.split('T')[0];
    const [year, month, day] = cleanDateString.split('-').map(Number);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      console.error('Data inválida:', dateString);
      return '';
    }

    const date = new Date(year, month - 1, day);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getFullYear()}`;
  }

}