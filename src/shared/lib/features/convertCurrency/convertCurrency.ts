'use client';

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import { getSettings } from '@/app/providers/StoreProvider';
import { Rates, exchangeRates } from '@/shared/const/rates';
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

export const convertCurrency = (
	number: number | undefined,
	options: Options = {},
): string | number | false => {
	const isUSD = useSelector(getSettings('currency'));

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
		currency: to as Currency,
		minimumFractionDigits: precision,
	}).format(targetPrice);

	return formattedCurrency;
};
