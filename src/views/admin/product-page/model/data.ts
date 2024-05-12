export const columns = [
	{ name: 'Изображение', uid: 'images' },
	{ name: 'Артикул', uid: 'article' },
	{ name: 'Название', uid: 'title', sortable: true },
	{ name: 'Креативность', uid: 'creativity', sortable: true },
	{ name: 'Описание', uid: 'description' },
	// { name: 'Маркет', uid: 'markets', sortable: true },
	// { name: 'Фильтры', uid: 'filters' },
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
