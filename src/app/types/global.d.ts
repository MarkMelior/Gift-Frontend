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

type Messages = typeof import('public/locales/ru.json');
type EnMessages = typeof import('public/locales/en.json');

declare interface IntlMessages extends Messages, EnMessages {}

type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
	  }
	: T;

type OptionalRecord<K extends keyof any, T> = {
	[P in K]?: T;
};

type DeepStringify<T> = {
	[K in keyof T]: T[K] extends object ? DeepStringify<T[K]> : string;
};
