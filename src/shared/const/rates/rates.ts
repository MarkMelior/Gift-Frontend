import { Currency } from '../../types/localization';

export type Rates = {
	[key in Currency]: number;
};

export const exchangeRates: Rates = {
	RUB: 1,
	USD: 0.013,
	EUR: 0.012,
};
