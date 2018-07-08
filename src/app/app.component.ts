import { Component, OnInit,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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

export interface IExchange {
  currencies: { from: string, to: string };
  config: {
    direction: Array<string>;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public availableExchanges: Array<IExchange> = [];
  public controlsConfig = controlsConfig;
  public form: FormGroup;

  fromOptions = {};
  toOptions = {};

  constructor(
    private _httpClient: HttpClient,
    private _formBuilder: FormBuilder,
  ) {

  }

  public ngOnInit() {
    this.buildForm();

    this._httpClient.get<Array<IExchange>>('http://localhost:7777/api/v1/parameters', {
      params: {
        parameter: 'exchanges'
      }
    }).subscribe((response) => {
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

    this.fromOptions = { prefix: from, thousands: '.', decimal: ',' };
    this.toOptions = { prefix: to, thousands: '.', decimal: ',' };

  }

  onSubmit() {
    const selectedIndex: number = this.form.controls[controlsConfig.availableExchanges.name].value;
    const { from, to } = this.availableExchanges[selectedIndex].currencies;
    const fromAmount: number = this.form.controls[controlsConfig.from.name].value;

    this._httpClient.post<{amount: number}>(`http://localhost:7777/api/v1/currency/exchange/${from}/`, {
      to,
      amount: fromAmount
    }).subscribe((result) => {
      this.form.controls[controlsConfig.to.name].patchValue(result.amount);
    }, (error) => {
      throw new Error(error);
    });
  }
}
