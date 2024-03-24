import { ProductDataProps } from '@/shared/types/product';
import { toKebabCase } from '../toKebabCase/toKebabCase';
import { toLatin } from '../toLatin/toLatin';

export function filterInvalidURLCharacters(str: string) {
	const regex = /[^a-zA-Z0-9\-_\s]/g;
	return str.replace(regex, '');
}

export const productLink = (
	title: string | false,
	id: ProductDataProps['id'],
) => {
	if (!title) return `/product/${id}`;
	return `/product/${filterInvalidURLCharacters(toLatin(toKebabCase(title)))}-${id}`;
};
