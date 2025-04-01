import { Component, Inject, Input, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'modal-person-details',
  templateUrl: './modal-person-details.component.html',
  styleUrls: ['./modal-person-details.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule, // Módulo para diálogos
    MatIconModule,   // Módulo para ícones
    CommonModule,
    FormsModule,    // Import CommonModule for ngClass
    MatProgressSpinnerModule,
    HttpClientModule
  ],
})
export class ModalPersonDetails {
  @Input() person: any; // Add Input property for person
  showForm = false; // Controle de exibição do formulário
  data: any;

  constructor(
    @Optional() public dialogRef: MatDialogRef<ModalPersonDetails>,
    @Optional() @Inject(MAT_DIALOG_DATA) dialogData: any,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    if (dialogData) {
      this.data = dialogData;
    } else {
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.loadPersonDetails(params['id']);
        }
      });
    }
  }

  private loadPersonDetails(id: string) {
    this.http.get<any>(`https://abitus-api.geia.vip/v1/pessoas/${id}`).subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.error('Erro ao carregar detalhes da pessoa:', error);
        this.router.navigate(['/']);
      }
    );
  }

  downloadPoster(person: any) {
    if (person?.ultimaOcorrencia.listaCartaz.length > 0) {
      console.log('Baixar cartaz:', person.ultimaOcorrencia.listaCartaz[0]);
      const link = document.createElement('a');
      link.href = person.ultimaOcorrencia.listaCartaz[0].urlCartaz.toString();
      link.download = `cartaz-desaparecido-${person.nome}.pdf`;
      link.click();
    } else {
      alert('Arquivo não disponível para download.');
    }
  }

  shareOnWhatsApp(person: any) {
    console.log('Compartilhar no WhatsApp:', person);
    const message = `Pessoa desaparecida: ${person?.nome}, ${person?.idade} anos. Por favor, compartilhe.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
  }

  shareOnInstagram() {
    window.open('https://instagram.com');
  }

  missingDays(dataDesaparecimento?: string): number {
    if (!dataDesaparecimento) return 0; // Retorna 0 se a data for inválida
    const desaparecimento = new Date(dataDesaparecimento);
    if (isNaN(desaparecimento.getTime())) {
      console.error('Data inválida:', dataDesaparecimento);
      return 0; // Retorna 0 se a data não for válida
    }
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

  closeModal() {
    if (this.dialogRef) {
      this.dialogRef.close(); // Close the modal
    } else {
      this.router.navigate(['/']);
    }
  }

  openFormModal(): void {
    if (!this.data?.id || !this.data?.ultimaOcorrencia?.ocoId) {
      console.error('Dados necessários não encontrados:', this.data);
      return;
    }

    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '600px',
      data: { 
        id: this.data.id, 
        ocoId: this.data.ultimaOcorrencia.ocoId 
      },
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Formulário enviado com sucesso:', result);
      }
    });
  }
}