import { AccessRole } from './access-role/access-role';
import { Markets } from './markets/markets';
import { MediaSize } from './media-size/media-size';
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
	AccessRole,
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
