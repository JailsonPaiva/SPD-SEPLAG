import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; // Importação do MatDialogModule
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';

@NgModule({
  declarations: [
    // outros componentes
    FilterBarComponent
  ],
  imports: [
    FormsModule,
    MatDialogModule // Adicione esta linha
  ],
  bootstrap: [/* componente raiz */]
})
export class AppModule {}
