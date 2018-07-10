import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { ApiService } from '../../business/services/api.services';
import { IExchange } from '../../components/exchanges-selector/exchanges-selector.component';
import { isLessThanTenMinutes } from '../../commons/index';

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
export interface IPreviousConversions {
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
  ) {}

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
    const selectedIndex: number = this.form.controls[controlsConfig.availableExchanges.name].value;
    const { from, to } = this.availableExchanges[selectedIndex].currencies;
    const fromAmount: number = this.form.controls[controlsConfig.from.name].value;
    const currentConversionKey = `${from}-${to}-${fromAmount}`;
    const previousConversions: IPreviousConversions = JSON.parse(window.sessionStorage.getItem('previousConversions')) || {};

    if (previousConversions.hasOwnProperty(currentConversionKey) && isLessThanTenMinutes(previousConversions[currentConversionKey])) {
      this.form.controls[controlsConfig.to.name].patchValue(previousConversions[`${from}-${to}-${fromAmount}`].result);
    } else {
      this._apiService.postCurrenciesExchanges({
        from,
        to,
        amount: fromAmount
      }).subscribe((result) => {
        const newResult: IPreviousConversions = {
          ...previousConversions,
          [`${from}-${to}-${fromAmount}`]: {
            result: result.amount,
            createdAt: new Date(),
          }
        };

        this.form.controls[controlsConfig.to.name].patchValue(result.amount);
        window.sessionStorage.setItem('previousConversions', JSON.stringify(newResult));

      }, (error) => {
        throw new Error(error);
      });
    }
  }

  areExchangesLoaded(availableExchanges: Array<IExchange>): boolean {
    return availableExchanges.length > 0;
  }


}
