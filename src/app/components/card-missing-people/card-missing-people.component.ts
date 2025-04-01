import { Component, Input } from '@angular/core';
import { MissingPerson } from './card-missing-people.interface';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common'; 
@Component({
  selector: 'card-missing-people',
  templateUrl: './card-missing-people.component.html',
  styleUrls: ['./card-missing-people.component.scss'],
  imports: [NgIf],
})
export class CardMissingPeopleComponent {
  @Input() person!: MissingPerson;
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() age: number = 0;
  @Input() gender: string = '';
  @Input() imageUrl?: string;
  @Input() missingDays: number = 0;
  @Input() lastSeen: string = '';
  @Input() localizadoEm: string = '';
  @Input() desaparecidoEm: string = '';
  @Input() vestimentas: string = '';
  @Input() informacao: string = '';
  
}