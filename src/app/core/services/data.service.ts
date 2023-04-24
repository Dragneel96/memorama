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
   * This function retrieves data from an API and maps it to an array of Card objects with a default of
   * 5 entries per page.
   * @param {number} [perPage=5] - The `perPage` parameter is a number that specifies the number of
   * items to be returned per page from the API. It has a default value of 5 if no value is provided.
   * @returns The `getData` function returns an Observable of an array of `Card` objects. The `Card`
   * objects have three properties: `uuid`, `title`, and `imageUrl`. The function retrieves data from
   * an API endpoint using the `http.get` method and maps the retrieved data to an array of `Card`
   * objects using the `map` operator. The `perPage` parameter is optional and defaults
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
