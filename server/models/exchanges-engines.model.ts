import { ForexModel } from './forex.model';

export interface IExchangesEnginesArgs {
  apiKey: string;
  version?: string;
}

export type  TExchangesEnginesNames = 'forex';
export type  TExchangesEngines = ForexModel;

const exchangesEngines = {
  forex: ForexModel,
};

export function exchangesEnginesFactory(name: 'forex', args: IExchangesEnginesArgs): ForexModel;
export function exchangesEnginesFactory(name: TExchangesEnginesNames, args: IExchangesEnginesArgs): TExchangesEngines;
export function exchangesEnginesFactory(name: TExchangesEnginesNames, args: IExchangesEnginesArgs) {
  if (exchangesEngines.hasOwnProperty(name)) {
    return new exchangesEngines[name](args);
  } else {
    throw new Error(`Engine ${name} does not exist.`);
  }
}
