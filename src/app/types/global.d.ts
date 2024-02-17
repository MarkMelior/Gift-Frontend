declare module '*.scss' {
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

// eslint-disable-next-line no-unused-vars
declare const IS_DEV: boolean;

type Messages = typeof import('../../../public/locales/ru/translation.json');
type EnMessages = typeof import('../../../public/locales/en/translation.json');

// eslint-disable-next-line no-unused-vars
declare interface IntlMessages extends Messages, EnMessages {}
