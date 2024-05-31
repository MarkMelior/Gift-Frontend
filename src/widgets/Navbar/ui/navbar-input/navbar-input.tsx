'use client';

import { ModalSearch } from '@/features/search';
import { SearchIcon } from '@/shared/assets/icon/Search';
import { MediaSize } from '@/shared/const';
import { Button } from '@/shared/ui/button';
import { Kbd, useDisclosure } from '@nextui-org/react';
import { FC, useCallback, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import cls from './navbar-input.module.scss';

export const NavbarInput: FC = () => {
	const isMD = useMediaQuery({ maxWidth: MediaSize.MD });

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.ctrlKey && ['k', 'л'].includes(e.key)) {
				e.preventDefault();
				onOpenChange();
			}
		},
		[onOpenChange],
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<>
			<Button
				onClick={onOpen}
				className={cls.searchButton}
				startContent={<SearchIcon width={18} height={18} />}
			>
				Поиск
				{!isMD && <Kbd keys={['ctrl']}>K</Kbd>}
			</Button>
			<ModalSearch isOpen={isOpen} onOpenChange={onOpenChange} />
		</>
	);
};
