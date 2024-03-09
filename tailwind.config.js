const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
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
			themes: {
				light: {
					colors: {},
				},
				dark: {
					colors: {
						default: {
							foreground: '#FFFFFF',
							DEFAULT: '#3a3641',
						},
						primary: {
							foreground: '#FFFFFF',
							DEFAULT: '#B336FF',
						},
						secondary: {
							foreground: '#FFFFFF',
							DEFAULT: '#006FEE',
						},
					},
				},
			},
		}),
	],
};
