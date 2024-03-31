import { ProductDataProps } from '@/shared/types/product';

export const convertIdToProductData = (
	ids: number[] | undefined,
	data: ProductDataProps[],
	max?: number,
) => {
	if (ids === undefined || !ids.length) return [];

	const filteredData: ProductDataProps[] = data
		.filter((el) => ids.includes(el.id))
		.reverse()
		.slice(0, max);

	return filteredData;
};
