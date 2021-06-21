import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable } from 'rxjs';
import { QuoteResponse } from '../models/QuoteResponse';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  constructor(
    private httpClient: HttpClient,
    private oktaService: OktaAuthService
  ) { }

  public getQuote(quoteInfo): Observable<QuoteResponse> {
    return this.httpClient.post<QuoteResponse>(
      '/quotation',
      quoteInfo,
      { 
        headers: {
          'Authorization': 'Bearer ' + this.oktaService.getAccessToken()
        } 
      });
  }
}
