'use client';

import { Cards } from '@/entities/products';
import { SearchIcon } from '@/shared/assets/icon/Search';
import {
	Component,
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import {
	Kbd,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Tooltip,
} from '@nextui-org/react';
import { FC, FormEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useGetSearchedProductsQuery } from '../../api/search.api';
import { getQuery } from '../../model/selectors/getQuery';
import { getQueryInput } from '../../model/selectors/getQueryInput';
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
	const dispatch = useAppDispatch();
	const query = useSelector(getQuery);
	const queryInput = useSelector(getQueryInput);
	const { data: searchedData, isLoading } = useGetSearchedProductsQuery(query, {
		skip: !query,
	});

	const handleSearch = useCallback(
		(e: FormEvent) => {
			e.preventDefault();

			dispatch(searchActions.setQuery(queryInput));
		},
		[dispatch, queryInput],
	);

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
								<ModalHeader>
									<form onSubmit={handleSearch} className={cls.form}>
										<Input
											placeholder='Поиск'
											autoFocus
											variant='bordered'
											onChange={(e) => {
												dispatch(searchActions.setQueryInput(e.target.value));
											}}
											value={queryInput}
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
										<Button type='submit' className={cls.find}>
											Найти
										</Button>
									</form>
								</ModalHeader>
								<ModalBody>
									<Cards
										size='sm'
										data={searchedData}
										isLoading={isLoading}
										skeletonCount={3}
									/>
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
