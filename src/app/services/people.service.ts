import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { missingPeople } from '../interfaces/people.interface';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = 'https://abitus-api.geia.vip/v1';

  constructor(private http: HttpClient) { }

  getPeople(params: any): Observable<missingPeople> {
    return this.http.get<missingPeople>(`${this.apiUrl}/pessoas/aberto/filtro`, { params });
  }

  getPersonDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pessoas/${id}`);
  }

  submitForm(formData: FormData): Observable<any> {
    // console.log('Dados enviados:', formData);
    return this.http.post(`${this.apiUrl}/ocorrencias/informacoes-desaparecido`, formData);
  }
} 