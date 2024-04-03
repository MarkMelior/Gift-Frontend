import { Markets } from './markets/markets';
import { MediaSize } from './mediaSize/mediaSize';
import { Rates, exchangeRates } from './rates/rates';
import {
	AppRouteByPathPattern,
	AppRoutes,
	getRouteFavorites,
	getRouteMain,
	getRouteProduct,
	getRouteProfile,
	getRouteShop,
} from './router/router';

export {
	AppRouteByPathPattern,
	Markets,
	MediaSize,
	exchangeRates,
	getRouteFavorites,
	getRouteMain,
	getRouteProduct,
	getRouteProfile,
	getRouteShop,
};

export type { AppRoutes, Rates };
