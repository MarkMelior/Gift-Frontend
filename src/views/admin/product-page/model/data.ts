export const columns = [
	{ name: 'Изображение', uid: 'images' },
	{ name: 'ID', uid: '_id' },
	{ name: 'Артикул', uid: 'article' },
	{ name: 'Название', uid: 'title', sortable: true },
	{ name: 'Креативность', uid: 'creativity', sortable: true },
	{ name: 'Описание', uid: 'description' },
	{ name: 'Дата создания', uid: 'createdAt', sortable: true },
	{ name: 'Дата обновления', uid: 'updatedAt', sortable: true },
	{ name: 'Кол-во обновлений', uid: '__v' },
	{ name: 'Фильтры', uid: 'filters' },
	// { name: 'Маркет', uid: 'markets', sortable: true },
	// { name: 'Характеристики', uid: 'options' },
	{ name: 'Действие', uid: 'actions' },
];

export const INITIAL_VISIBLE_COLUMNS = [
	'images',
	'article',
	'title',
	'creativity',
	'actions',
];

export const filtersOptions = [{ name: 'День рождение', uid: 'birthday' }];
