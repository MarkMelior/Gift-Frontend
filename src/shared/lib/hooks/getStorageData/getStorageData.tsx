import { LocalstorageKeys } from '@/shared/types/localstorage';
import { ProductDataProps } from '@/shared/types/product';

export const getStorageData = (
	data: ProductDataProps[],
	item: LocalstorageKeys,
	max?: number,
) => {
	const isAdded = (id: ProductDataProps['id']) => {
		const favorites: number[] = JSON.parse(localStorage.getItem(item) || '[]');
		return favorites.includes(id);
	};

	const filteredData: ProductDataProps[] = data
		.filter((el) => isAdded(el.id))
		.reverse()
		.slice(0, max);

	if (!filteredData.length) return false;

	return filteredData;
};
