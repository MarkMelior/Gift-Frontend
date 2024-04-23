'use client';

import { Cards } from '@/entities/products';
import { SearchIcon } from '@/shared/assets/icon/Search';
import {
	Component,
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components';
import { Input } from '@/shared/ui/input';
import {
	Kbd,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Tooltip,
} from '@nextui-org/react';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuery } from '../../model/selectors/getQuery';
import { getSearchData } from '../../model/selectors/getSearchData';
import { searchProduct } from '../../model/service/search-product';
import { searchActions, searchReducer } from '../../model/slice/search.slice';
import cls from './modal-search.module.scss';

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
	const searchData = useSelector(getSearchData);

	useEffect(() => {
		dispatch(searchProduct(query));
	}, [dispatch, query]);

	return (
		<Component isRender={isOpen} delayClose={500}>
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
									<Cards size='sm' data={searchData} />
								</ModalBody>
								{/* <ModalFooter></ModalFooter> */}
							</>
						)}
					</ModalContent>
				</Modal>
			</DynamicModuleLoader>
		</Component>
	);
};

export default ModalSearch;
