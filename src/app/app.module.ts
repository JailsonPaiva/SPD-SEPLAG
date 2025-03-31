import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    FilterBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    MatDialogModule, 
    BrowserAnimationsModule, 
    ToastrModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
