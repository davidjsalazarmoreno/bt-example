import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IExchange } from 'src/app/components/exchanges-selector/exchanges-selector.component';

export type TParameter = 'exchanges';

@Injectable()
export class ApiService {

  constructor(
    private _httpClient: HttpClient,
  ) { }

  getParameters(parameter: TParameter): Observable<Array<IExchange>> {
    return this._httpClient.get<Array<IExchange>>(`${environment.apiEndpoint}/api/v1/parameters`, {
      params: {
        parameter
      }
    });
  }

  postCurrenciesExchanges(body: {
    from: string,
    to: string,
    amount: number,
  }): Observable<{amount: number}> {
    const { from } = body;
    return this._httpClient.post<{amount: number}>(`${environment.apiEndpoint}/api/v1/currencies/exchanges/${from}/`, body);
  }
}
