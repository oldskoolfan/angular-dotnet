import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private oktaService: OktaAuthService
  ) { }

  public quotationForm = this.formBuilder.group({
    ages: [''],
    startDate: [''],
    endDate: ['']
  });

  ngOnInit(): void {
  }

  public getQuote(): void {
    const quoteInfo = {
      currency_id: 'USD',
      age: this.quotationForm.get('ages')?.value,
      start_date: this.quotationForm.get('startDate')?.value,
      end_date: this.quotationForm.get('endDate')?.value
    };
    console.log(quoteInfo);



    this.httpClient.post('/quotation',
    quoteInfo,
    { 
      headers: {
        'Authorization': 'Bearer ' + this.oktaService.getAccessToken()
      } 
    }).subscribe(response => {
      console.log(response);
    });
  }
}
