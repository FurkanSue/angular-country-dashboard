import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly apiUrl = 'https://countries.trevorblades.com/';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    const query = {
      query: `
        {
          countries {
            code
            name
            capital
            emoji
            continent {
              name
            }
          }
        }
      `,
    };

    return this.http
      .post<any>(this.apiUrl, query)
      .pipe(map(res => res.data.countries));
  }
}