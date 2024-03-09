import { nextui } from '@nextui-org/react';
import { nextuiThemes } from './src/shared/config/nextuiThemes/index.js';

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		colors: {},
		extend: {},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			prefix: 'gift',
			themes: nextuiThemes,
		}),
	],
};

export default config;
