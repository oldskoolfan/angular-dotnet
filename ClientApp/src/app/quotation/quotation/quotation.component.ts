import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { QuoteInfo } from 'src/app/models/QuoteInfo';
import { QuoteResponse } from 'src/app/models/QuoteResponse';
import { QuotationService } from 'src/app/services/quotation.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {
  private _quoteResponse: BehaviorSubject<QuoteResponse | null> = new BehaviorSubject(null);
  private _error: BehaviorSubject<string | null> = new BehaviorSubject(null);

  constructor(
    private formBuilder: FormBuilder,
    private quotationService: QuotationService
  ) { }

  public quoteResponse$ = this._quoteResponse.asObservable();
  public serverError$ = this._error.asObservable();

  public get ages() { return this.quotationForm.get('ages'); }
  public get startDate() { return this.quotationForm.get('startDate'); }
  public get endDate() { return this.quotationForm.get('endDate'); }

  public quotationForm = this.formBuilder.group({
    ages: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  }, { 
    validators: [this.startDateBeforeEndDateValidator()],
    updateOn: 'blur',
  });

  ngOnInit(): void {
  }

  public getQuote(): void {
    this.resetMessages();
    this.quotationService.getQuote(this.getQuoteInfo())
      .subscribe(resp => this._quoteResponse.next(resp), 
      _ => this._error.next('There was a problem obtaining your quote'));
  }

  private resetMessages(): void {
    this._quoteResponse.next(null);
    this._error.next(null);
  }

  private getQuoteInfo = (): QuoteInfo => ({
    currency_id: 'USD',
    age: this.quotationForm.get('ages')?.value,
    start_date: this.quotationForm.get('startDate')?.value,
    end_date: this.quotationForm.get('endDate')?.value
  } as QuoteInfo);

  private startDateBeforeEndDateValidator(): ValidatorFn {
    return (formGroup: FormGroup) => {
      const startDate = formGroup.get('startDate')?.value as Date;
      const endDate = formGroup.get('endDate')?.value as Date;

      if (startDate > endDate) {
        return { startDateBeforeEndDate : true };
      }

      return null;
    };
  }
}
