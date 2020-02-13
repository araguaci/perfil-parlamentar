import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CargoParlamentar } from '../models/cargoParlamentar.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiderancaService {

  private url = environment.apiUrl + 'liderancas';

  constructor(private http: HttpClient) { }

  getLiderancas(casa: string): Observable<CargoParlamentar[]> {
    const params = new HttpParams()
      .set('casa', casa);
    return this.http.get<CargoParlamentar[]>(this.url, { params });
  }
}
