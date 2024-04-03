import { ProductDataProps } from '@/entities/Product/model/types/product';
import { getRouteProduct } from '@/shared/const';
import { toKebabCase } from '../toKebabCase/toKebabCase';
import { toLatin } from '../toLatin/toLatin';

export function filterInvalidURLCharacters(str: string) {
	const regex = /[^a-zA-Z0-9\-_\s]/g;
	return str.replace(regex, '');
}

export const productLink = (title: string, id: ProductDataProps['id']) => {
	return `${getRouteProduct(filterInvalidURLCharacters(toLatin(toKebabCase(title))) + '-' + id)}`;
};
