module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		'next/core-web-vitals',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:import/recommended',
		'plugin:prettier/recommended',
		'plugin:i18next/recommended',
		'plugin:storybook/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		indent: [2, 'tab', { SwitchCase: 1 }],
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				jsxSingleQuote: true,
				useTabs: true,
				endOfLine: 'auto',
				parser: 'flow',
			},
		],
		'react/jsx-indent': [2, 'tab'],
		'react/display-name': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'i18next/no-literal-string': 'warn',
	},
	globals: {
		IS_DEV: true,
	},
	overrides: [
		{
			files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
			rules: {},
		},
	],
};
