interface ICurrency {
  kind: string;
  symbol: string;
}


export class Currency {
  constructor(private currency: ICurrency) {
    this.currency = {
      kind: '',
      symbol: '',
    };
  }
}
