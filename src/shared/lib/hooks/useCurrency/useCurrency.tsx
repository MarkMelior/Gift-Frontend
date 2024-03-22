/* eslint-disable prettier/prettier */
export type Currency = 'RUB' | 'USD' | 'EUR';

export type Rates = {
	[key in Currency]: number;
};

interface Options {
	rates?: Rates;
	precision?: number; // Определяет количество десятичных знаков после запятой
}

const exchangeRates: Rates = {
	RUB: 1,
	USD: 0.013,
	EUR: 0.012,
};

export const useCurrency = (
	number: number,
	to: Currency,
	{ rates = exchangeRates, precision = 0 }: Options,
): string => {
	if (!(to in rates)) {
		throw new Error('Unsupported currency');
	}

	const targetPrice = number * rates[to];

	const formattedCurrency = new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: to,
		minimumFractionDigits: precision,
	}).format(targetPrice);

	return formattedCurrency;
};
