import { readableColor } from 'color2k';
import { blue } from './colors/blue';
import { green } from './colors/green';
import { purple } from './colors/purple';
import { red } from './colors/red';
import { yellow } from './colors/yellow';
import { zinc } from './colors/zinc';
import { swapColorValues } from './lib/swap-color-values';

const themeColorsLight = {
	default: {
		...zinc,
		foreground: readableColor(zinc[300]),
		DEFAULT: zinc[300],
	},
	primary: {
		...blue,
		foreground: readableColor(blue[400]),
		DEFAULT: blue[400],
	},
	secondary: {
		...purple,
		foreground: readableColor(purple[500]),
		DEFAULT: purple[500],
	},
	success: {
		...green,
		foreground: readableColor(green[500]),
		DEFAULT: green[500],
	},
	warning: {
		...yellow,
		foreground: readableColor(yellow[500]),
		DEFAULT: yellow[500],
	},
	danger: {
		...red,
		foreground: '#FFFFFF',
		DEFAULT: red[500],
	},
};

const themeColorsDark = {
	default: {
		...swapColorValues(zinc),
		foreground: readableColor(zinc[700]),
		DEFAULT: zinc[700],
	},
	primary: {
		...swapColorValues(blue),
		foreground: readableColor(blue[500]),
		DEFAULT: blue[500],
	},
	secondary: {
		...swapColorValues(purple),
		foreground: readableColor(purple[400]),
		DEFAULT: purple[400],
	},
	success: {
		...swapColorValues(green),
		foreground: readableColor(green[500]),
		DEFAULT: green[500],
	},
	warning: {
		...swapColorValues(yellow),
		foreground: readableColor(yellow[500]),
		DEFAULT: yellow[500],
	},
	danger: {
		...swapColorValues(red),
		foreground: '#FFFFFF',
		DEFAULT: red[500],
	},
};

export const nextuiThemes = {
	light: {
		colors: themeColorsLight,
	},
	dark: {
		colors: themeColorsDark,
	},
};
