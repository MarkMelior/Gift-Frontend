export type ErrorDataKey =
	| 'default'
	| 'not-found-search'
	| 'what-search'
	| 'unauthorized';

export interface ErrorData {
	key: ErrorDataKey;
	title: string;
	description: string;
	image: string;
}

export const errorsData: ErrorData[] = [
	{
		key: 'default',
		title: 'Упс! Попробуйте обновить страницу',
		description: 'Неизвестная ошибка',
		image: 'cancel.png',
	},
	{
		key: 'what-search',
		title: 'Что будем искать?',
		description: 'Постараемся найти то, что нужно',
		image: 'product.png',
	},
	{
		key: 'not-found-search',
		title: 'Мы ничего не нашли!',
		description: 'Измените параметры поиска',
		image: '404-error.png',
	},
	{
		key: 'unauthorized',
		title: 'Войдите или зарегистрируйтесь',
		description: 'Вы не авторизованы',
		image: 'lock.png',
	},
];
