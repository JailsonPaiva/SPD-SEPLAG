import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; // Importação do MatDialogModule
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';

@NgModule({
  declarations: [
    // outros componentes
    FilterBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Adicionar HttpClientModule
    FormsModule,
    MatDialogModule // Adicione esta linha
  ],
  bootstrap: [/* componente raiz */]
})
export class AppModule {}
