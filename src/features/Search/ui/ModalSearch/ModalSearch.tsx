'use client';

import { productData } from '@/db';
import { Cards } from '@/entities/Product';
import { SearchIcon } from '@/shared/assets/icon/Search';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { Input } from '@/shared/ui/Input';
import {
	Kbd,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Tooltip,
} from '@nextui-org/react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from '../..';
import { getQuery } from '../../model/selector/getQuery/getQuery';
import { searchReducer } from '../../model/slice/searchSlice';
import cls from './ModalSearch.module.scss';

export interface ModalSearchProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const initialReducers: ReducersList = {
	search: searchReducer,
};

const ModalSearch: FC<ModalSearchProps> = ({ isOpen, onOpenChange }) => {
	const dispatch = useDispatch();
	const query = useSelector(getQuery);

	const filteredProduct = productData.filter((item) => {
		const queryLower = query.toLowerCase();
		const words = queryLower.split(/\s+/); // Разделить строку поиска на отдельные слова

		const titleLower = item.title.toLowerCase();
		const descriptionLower = (item.description || '').toLowerCase();

		return (
			words.some((word) => titleLower.includes(word)) ||
			words.some((word) => descriptionLower.includes(word))
		);
	});

	return (
		<DynamicModuleLoader reducers={initialReducers}>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement='center'
				size='2xl'
				scrollBehavior='inside'
				className={cls.wrapper}
				hideCloseButton
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								<Input
									placeholder='Поиск'
									autoFocus
									variant='bordered'
									onChange={(e) => {
										dispatch(searchActions.setQuery(e.target.value));
									}}
									value={query}
									startContent={<SearchIcon />}
									endContent={
										<Tooltip
											closeDelay={0}
											offset={5}
											placement='top'
											showArrow
											content='Закрыть'
										>
											<Kbd
												className={cls.kbd}
												onClick={() => onOpenChange(true)}
											>
												Esc
											</Kbd>
										</Tooltip>
									}
								/>
							</ModalHeader>
							<ModalBody>
								<Cards size='sm' data={filteredProduct} />
							</ModalBody>
							{/* <ModalFooter></ModalFooter> */}
						</>
					)}
				</ModalContent>
			</Modal>
		</DynamicModuleLoader>
	);
};

export default ModalSearch;
