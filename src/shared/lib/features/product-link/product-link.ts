import { getRouteProduct } from '@/shared/const';
import { ProductResponse } from '@melior-gift/zod-contracts';
import { toKebabCase } from '../to-kebab-case/to-kebab-case';
import { toLatin } from '../to-latin/to-latin';

export function filterInvalidURLCharacters(str: string) {
	const regex = /[^a-zA-Z0-9\-_\s]/g;
	return str.replace(regex, '');
}

export const productLink = (
	title: string,
	article: ProductResponse['article'],
) => {
	return `${getRouteProduct(
		filterInvalidURLCharacters(toLatin(toKebabCase(title))) + '-' + article,
	)}`;
};
