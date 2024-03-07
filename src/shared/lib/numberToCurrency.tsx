export const numberToCurrency = (number: number, currency = 'RUB'): string => {
	const exchangeRates: { [key: string]: number } = {
		RUB: 1,
		USD: 0.013,
		EUR: 0.012,
	};

	if (!(currency in exchangeRates)) {
		throw new Error('Unsupported currency');
	}

	const targetPrice = number * exchangeRates[currency];

	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: 0, // Определяет количество десятичных знаков после запятой
	}).format(targetPrice);
};
