import { IExchangesEnginesArgs } from './exchanges-engines.model';

export class ForexModel {
  // TODO: Look a place for this
  private _PREFIX = 'https://forex.1forge.com';

  constructor(
    private _config: IExchangesEnginesArgs,
  ) {
    this._config = {
      apiKey: _config.apiKey,
      version: _config.version || '1.0.3',
    };
  }

  getConversionUri(config: {
    from: string,
    to: string,
    amount: number,
  }): string {
    const { from, to, amount } = config;
    const { _PREFIX } = this;
    const { version, apiKey } = this._config;

    return `${_PREFIX}/${version}/convert?from=${from}&to=${to}&quantity=${amount}&api_key=${apiKey}`;
  }
}
