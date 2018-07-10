import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { ApiService } from '../../business/services/api.services';
import { IExchange } from '../../components/exchanges-selector/exchanges-selector.component';
import { isLessThanTenMinutes } from '../../commons/index';
import { empty } from 'rxjs';

const controlsConfig = {
  availableExchanges: {
    name: 'availableExchanges',
  },
  from: {
    name: 'from',
  },
  to: {
    name: 'to',
  }
};

// TODO: LOOK A PLACE FOR THIS
export interface IPreviousResults {
  [key: string]: {
    result: number,
    createdAt: Date,
  };
}

@Component({
  selector: 'app-client-area',
  templateUrl: './client-area.component.html',
  styleUrls: ['./client-area.component.sass']
})
export class ClientAreaComponent implements OnInit {
  public availableExchanges: Array<IExchange> = [];
  public controlsConfig = controlsConfig;
  public form: FormGroup;

  fromOptions = { prefix: '', thousands: ',', decimal: '.' };
  toOptions =  { prefix: '', thousands: ',', decimal: '.' };

  constructor(
    private _apiService: ApiService,
    private _formBuilder: FormBuilder,
  ) {
    this.handleNewConversion = this.handleNewConversion.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  public ngOnInit() {
    this.buildForm();

    this._apiService.getParameters('exchanges').subscribe((response) => {
      this.availableExchanges = response;
    }, (error) => {
      throw new Error(error);
    });
  }

  public buildForm() {
    this.form = this._formBuilder.group({
      [controlsConfig.availableExchanges.name]: ['', Validators.required],
      [controlsConfig.from.name]: ['', Validators.required],
      [controlsConfig.to.name]: [{value: '', disabled: true}],
    });
  }

  onExchangeSelect() {
    const selectedIndex: number = this.form.controls[controlsConfig.availableExchanges.name].value;
    const { from, to } = this.availableExchanges[selectedIndex].currencies;

    this.fromOptions = { prefix: from, thousands: ',', decimal: '.' };
    this.toOptions = { prefix: to, thousands: ',', decimal: '.' };

  }

  onSubmit(): void {
    const { handleNewConversion,
            handleError } = this;
    const selectedIndex: number = this.form.controls[controlsConfig.availableExchanges.name].value;
    const { from, to } = this.availableExchanges[selectedIndex].currencies;
    const fromAmount: number = this.form.controls[controlsConfig.from.name].value;
    const conversionKey = `${from}-${to}-${fromAmount}`;
    const previousResults: IPreviousResults = JSON.parse(window.sessionStorage.getItem('previousResults')) || {};

    if (previousResults.hasOwnProperty(conversionKey) && isLessThanTenMinutes(previousResults[conversionKey])) {
      this.form.controls[controlsConfig.to.name].patchValue(previousResults[conversionKey].result);
    } else {
      this._apiService.postCurrenciesExchanges({
        from,
        to,
        amount: fromAmount
      }).pipe(
        mergeMap(() => handleNewConversion({
          conversionKey,
          amount: fromAmount,
          previousResults,
        })),
        catchError(handleError),
      ).subscribe(() => {
        console.log('Calling currencies exchanges');
      });
    }
  }

  handleNewConversion(config: {
    conversionKey: string,
    amount: number,
    previousResults: Object,
  }) {
    const { conversionKey, amount, previousResults } = config;
    const newResult: IPreviousResults = {
      [conversionKey]: {
        result: amount,
        createdAt: new Date(),
      }
    };

    this.form.controls[controlsConfig.to.name].patchValue(amount);
    window.sessionStorage.setItem('previousResults', JSON.stringify(newResult));

    return empty();
  }

  handleError(error) {
    console.warn(error);

    window.alert('Sorry, try again later');
    return empty();
  }

  areExchangesLoaded(availableExchanges: Array<IExchange>): boolean {
    return availableExchanges.length > 0;
  }


}
