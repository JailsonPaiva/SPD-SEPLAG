import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';

@NgModule({
  declarations: [
    // outros componentes
    FilterBarComponent
  ],
  imports: [
    FormsModule
  ],
  bootstrap: [/* componente raiz */]
})
export class AppModule {}
