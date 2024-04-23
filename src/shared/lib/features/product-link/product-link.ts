import { Product } from '@/entities/products';
import { getRouteProduct } from '@/shared/const';
import { toKebabCase } from '../to-kebab-case/to-kebab-case';
import { toLatin } from '../to-latin/to-latin';

export function filterInvalidURLCharacters(str: string) {
	const regex = /[^a-zA-Z0-9\-_\s]/g;
	return str.replace(regex, '');
}

export const productLink = (title: string, id: Product['id']) => {
	return `${getRouteProduct(
		filterInvalidURLCharacters(toLatin(toKebabCase(title))) + '-' + id,
	)}`;
};
