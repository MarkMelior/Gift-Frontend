import { LocalstorageKeys } from '@/shared/types';
import { DataCardProps } from '@/shared/ui/Card';

export const getStorageData = (
	data: DataCardProps[],
	item: LocalstorageKeys,
	max?: number,
) => {
	const isAdded = (id: number) => {
		const favorites: number[] = JSON.parse(localStorage.getItem(item) || '[]');
		return favorites.includes(id);
	};

	const filteredData: DataCardProps[] = data
		.filter((el: { id: number }) => isAdded(el.id))
		.reverse()
		.slice(0, max);

	if (!filteredData.length) return false;

	return filteredData;
};
