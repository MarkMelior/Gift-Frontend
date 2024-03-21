export type StorageDataProps = 'likedProducts' | 'historyProducts';

export const getStorageData = (data: any, item: StorageDataProps) => {
	const isFavorite = (id: number) => {
		const favorites: number[] = JSON.parse(localStorage.getItem(item) || '[]');
		return favorites.includes(id);
	};

	const filteredData = data.filter((el: { id: number }) => isFavorite(el.id));

	if (!filteredData.length) return false;

	return filteredData;
};
