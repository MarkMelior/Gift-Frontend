'use client';

import { Cards, useGetProductsQuery } from '@/features/products';
import { SearchIcon } from '@/shared/assets/icon/Search';
import {
	Component,
	DynamicModuleLoader,
	ReducersList,
} from '@/shared/lib/components';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { ErrorScreen } from '@/shared/ui/errors';
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
import { getQuery } from '../model/selectors/getQuery';
import { getQueryInput } from '../model/selectors/getQueryInput';
import { searchActions, searchReducer } from '../model/slice/search.slice';
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
	const { data, isLoading, error } = useGetProductsQuery(
		{ limit: 20, param: query },
		{
			skip: !query,
		},
	);
	const searchedData = data?.products;

	const handleSearch = useCallback(
		(e: FormEvent) => {
			e.preventDefault();

			dispatch(searchActions.setQuery(queryInput));
		},
		[dispatch, queryInput],
	);

	const renderBody = useCallback(() => {
		if (!searchedData) {
			return <ErrorScreen typeError='what-search' fullHeight />;
		} else if (!searchedData?.length) {
			return <ErrorScreen typeError='not-found-search' fullHeight />;
		} else {
			return (
				<Cards
					size='sm'
					data={searchedData}
					isLoading={isLoading}
					skeletonCount={3}
					// error={error}
				/>
			);
		}
	}, [isLoading, searchedData]);

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
								<ModalBody>{renderBody()}</ModalBody>
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
