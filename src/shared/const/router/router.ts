export enum AppRoutes {
	MAIN = 'main',
	SHOP = 'shop',
	FAVORITES = 'favorites',
	PROFILE = 'profile',
	PRODUCT = 'product',
}

export const getRouteMain = () => '/';
export const getRouteShop = () => '/shop';
export const getRouteFavorites = () => '/favorites';
export const getRouteProfile = (id: string) => `/@${id}`;
export const getRouteProduct = (id: string) => `/product/${id}`;

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
	[getRouteMain()]: AppRoutes.MAIN,
	[getRouteShop()]: AppRoutes.SHOP,
	[getRouteFavorites()]: AppRoutes.FAVORITES,
	[getRouteProfile(':id')]: AppRoutes.PROFILE,
	[getRouteProduct(':id')]: AppRoutes.PRODUCT,
};
