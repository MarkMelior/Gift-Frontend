'use client';

import { getSettings } from '@/shared/config/settings';
import { Rates, exchangeRates } from '@/shared/const';
import { Currency } from '@/shared/types/localization';
import { useSelector } from 'react-redux';

interface Options {
	from?: Currency;
	to?: Currency;
	rates?: Rates;
	returnOnlyNumber?: boolean;
	/**
	 * Определяет количество десятичных знаков после запятой
	 */
	precision?: number;
}

export const useCurrency = (
	number: number | undefined,
	options: Options = {},
): string | number | false => {
	const { currency: isUSD } = useSelector(getSettings);

	const {
		from = 'RUB',
		to = isUSD,
		returnOnlyNumber = false,
		rates = exchangeRates,
		precision = 0,
	} = options;

	if (number === undefined) return false;

	if (returnOnlyNumber) {
		return number * rates[to];
	}

	const targetPrice = number * rates[to];

	const formattedCurrency = new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: to,
		minimumFractionDigits: precision,
	}).format(targetPrice);

	return formattedCurrency;
};
