type TExchangeDirection = 'from-to' | 'both';

export interface IParameters {
  exchanges: [
    {
      currencies: { from: string, to: string },
      config: {
        direction: Array<TExchangeDirection>
      }
    }
  ];
}
