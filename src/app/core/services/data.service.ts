import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card, Entry } from '../models/entry.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {

  apiUrl = 'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries';

  constructor(private http: HttpClient) { }

  /**
  Obtiene los datos de la API REST y los transforma en un array de objetos Card.
  @returns Un observable que emite un array de objetos Card.
  */
  getData(perPage: number = 5): Observable<Card[]> {
    const apiUrlWithPage = `${this.apiUrl}?per_page=${perPage}`;

    return this.http.get<{ entries: Entry[] }>(apiUrlWithPage).pipe(
      map((data) => {
        return data.entries.map((entry) => {
          return {
            uuid: entry.fields.image.uuid,
            title: entry.fields.image.title,
            imageUrl: entry.fields.image.url,
          };
        });
      })
    );
  }

}
