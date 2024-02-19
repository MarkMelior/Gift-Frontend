'use client';

import { usePathname, useRouter } from '@/shared/config/i18n/navigation';
import { ChangeEvent, ReactNode, useTransition } from 'react';

type Props = {
	children: ReactNode;
	defaultValue: string;
};

export default function LocaleSwitcherSelect({
	children,
	defaultValue,
}: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const pathname = usePathname();

	function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		const nextLocale = event.target.value;
		startTransition(() => {
			router.replace(pathname, { locale: nextLocale });
		});
	}

	return (
		// eslint-disable-next-line jsx-a11y/label-has-associated-control
		<label>
			<select
				className='inline-flex appearance-none bg-transparent py-3 pl-2 pr-6'
				defaultValue={defaultValue}
				disabled={isPending}
				onChange={onSelectChange}
			>
				{children}
			</select>
			<span className='pointer-events-none absolute right-2 top-[8px]'>⌄</span>
		</label>
	);
}
