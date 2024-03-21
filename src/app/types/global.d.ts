declare module '*.scss' {
	// eslint-disable-next-line prettier/prettier
	interface IClassNames {
		[className: string]: string;
	}
	const classNames: IClassNames;
	export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
	import React from 'react';

	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare const IS_DEV: boolean;

type Messages = typeof import('public/locales/ru.json');
type EnMessages = typeof import('public/locales/en.json');

declare interface IntlMessages extends Messages, EnMessages {}
