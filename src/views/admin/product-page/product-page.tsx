'use client';

import { deleteProduct, useGetProductsQuery } from '@/entities/products';
import { ConfirmButton } from '@/features/confirm-action';
import { DeleteIcon } from '@/shared/assets/icon/Delete';
import { EditIcon } from '@/shared/assets/icon/Edit';
import { EyeIcon } from '@/shared/assets/icon/Eye';
import { SearchIcon } from '@/shared/assets/icon/Search';
import { useAppDispatch } from '@/shared/lib/hooks';
import { Input } from '@/shared/ui/input';
import { ProductModal, productModalActions } from '@/widgets/admin';
import { PageLoader } from '@/widgets/page-loader';
import { ProductResponse } from '@melior-gift/zod-contracts';
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Pagination,
	Selection,
	SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
	useDisclosure,
} from '@nextui-org/react';
import cn from 'clsx';
import Link from 'next/link';
import { ChangeEvent, FC, Key, useCallback, useMemo, useState } from 'react';
import { INITIAL_VISIBLE_COLUMNS, columns, filtersOptions } from './model/data';
import cls from './product-page.module.scss';

export const AdminProductPage: FC = () => {
	const {
		isOpen: isOpenAdd,
		onOpen: onOpenAdd,
		onOpenChange: onOpenChangeAdd,
	} = useDisclosure();
	const dispatch = useAppDispatch();
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [filterValue, setFilterValue] = useState('');
	const { data: products } = useGetProductsQuery({
		limit: rowsPerPage,
		param: filterValue,
		sort: 'new',
		page,
	});
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: 'age',
		direction: 'ascending',
	});

	// const [isProductEdit, setIsProductEdit] = useState(false);
	const [statusFilter, setStatusFilter] = useState<Selection>('all');
	const [visibleColumns, setVisibleColumns] = useState<Selection>(
		new Set(INITIAL_VISIBLE_COLUMNS),
	);
	const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

	const headerColumns = useMemo(() => {
		if (visibleColumns === 'all') return columns;

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.uid),
		);
	}, [visibleColumns]);

	const onNextPage = useCallback(() => {
		// if (page < pages)
		setPage(page + 1);
	}, [page]);

	const onPreviousPage = useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	const onRowsPerPageChange = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			setRowsPerPage(Number(e.target.value));
			setPage(1);
		},
		[],
	);

	const onSearchChange = useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue('');
		}
	}, []);

	const topContent = useMemo(() => {
		if (!products) return <PageLoader />;

		return (
			<div className='flex flex-col gap-4'>
				<div className='flex justify-between gap-3 items-end'>
					<Input
						isClearable
						className='w-full sm:max-w-[44%]'
						placeholder='Поиск продуктов...'
						startContent={<SearchIcon />}
						value={filterValue}
						onClear={() => setFilterValue('')}
						onValueChange={onSearchChange}
					/>
					<div className='flex gap-3'>
						<Dropdown>
							<DropdownTrigger className='hidden sm:flex'>
								<Button variant='flat'>Фильтры</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label='Table Columns'
								closeOnSelect={false}
								selectionMode='multiple'
								selectedKeys={statusFilter}
								onSelectionChange={setStatusFilter}
							>
								{filtersOptions.map((status) => (
									<DropdownItem key={status.uid}>{status.name}</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Dropdown>
							<DropdownTrigger className='hidden sm:flex'>
								<Button variant='flat'>Столбцы</Button>
							</DropdownTrigger>
							<DropdownMenu
								disallowEmptySelection
								aria-label='Table Columns'
								closeOnSelect={false}
								selectedKeys={visibleColumns}
								selectionMode='multiple'
								onSelectionChange={setVisibleColumns}
							>
								{columns.map((column) => (
									<DropdownItem key={column.uid}>{column.name}</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Button color='primary' onPress={onOpenAdd}>
							Добавить продукт
						</Button>
						<ProductModal isOpen={isOpenAdd} onOpenChange={onOpenChangeAdd} />
					</div>
				</div>
				<div className='flex justify-between items-center'>
					<span className='text-default-400 text-small'>
						Всего продуктов: {products.length}
					</span>
					<label className='flex items-center text-default-400 text-small'>
						Строк на странице:
						<select
							className='bg-transparent outline-none text-default-400 text-small'
							onChange={onRowsPerPageChange}
						>
							<option value='5'>5</option>
							<option value='10'>10</option>
							<option value='15'>15</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [
		products,
		filterValue,
		onSearchChange,
		statusFilter,
		visibleColumns,
		onOpenAdd,
		isOpenAdd,
		onOpenChangeAdd,
		onRowsPerPageChange,
	]);

	const renderCell = useCallback(
		(product: ProductResponse, columnKey: Key) => {
			const cellValue = product[columnKey as keyof ProductResponse];

			switch (columnKey as keyof ProductResponse) {
				case 'images':
					return (
						<img
							src={`${process.env.UPLOADS}/products/${product.article}/${product.images[0]}`}
							className='w-12 h-12 rounded-md'
						/>
					);
				case 'title':
					return <div className={cls.title}>{product.title}</div>;
				// @ts-ignore
				case 'actions':
					return (
						<div className='relative flex justify-center items-center gap-2'>
							<Tooltip content='Посмотреть' showArrow closeDelay={0}>
								<Button
									as={Link}
									target='_blank'
									href={`/product/${product.article}`}
									isIconOnly
									size='sm'
									variant='light'
								>
									<EyeIcon width={18} height={18} className='opacity-50' />
								</Button>
							</Tooltip>
							<Tooltip content='Редактировать продукт' showArrow closeDelay={0}>
								<Button
									isIconOnly
									size='sm'
									variant='light'
									onClick={() => {
										// @ts-ignore
										dispatch(productModalActions.updateProductModal(product));
										onOpenAdd();
									}}
								>
									<EditIcon width={18} height={18} className='opacity-50' />
								</Button>
							</Tooltip>
							{/* <Tooltip content='Удалить' showArrow closeDelay={0}> */}
							<ConfirmButton
								size='sm'
								isIconOnly
								variant='light'
								color='danger'
								onConfirm={() => dispatch(deleteProduct(product.article))}
								confirmDescription={`Вы уверены, что хотите удалить продукт ${product.article}?`}
							>
								<DeleteIcon
									color='hsl(var(--gift-danger-500))'
									width={18}
									height={18}
								/>
							</ConfirmButton>
							{/* </Tooltip> */}
						</div>
					);
				default:
					return <>{cellValue}</>;
			}
		},
		[dispatch, onOpenAdd],
	);

	// const { showNotification, notification } = useNotification({
	// 	message: 'Hello, Ant Design!',
	// });

	const bottomContent = useMemo(() => {
		return (
			<div className='py-2 px-2 flex justify-between items-center'>
				{/* {notification()} */}
				{/* <Button
					onClick={() => {
						// todo: show notification
						showNotification();
						// messageApi.success('Hello, Ant Design!', 20000);
					}}
				>
					TEST
				</Button> */}
				<span className='w-[30%] text-small text-default-400'>
					{selectedKeys === 'all'
						? 'All items selected'
						: `${selectedKeys.size} of ? selected`}
				</span>
				<Pagination
					isCompact
					showControls
					showShadow
					color='primary'
					page={page}
					total={5}
					onChange={setPage}
				/>
				<div className='hidden sm:flex w-[30%] justify-end gap-2'>
					<Button
						isDisabled={page === 1}
						// isDisabled={pages === 1}
						size='sm'
						variant='flat'
						onPress={onPreviousPage}
					>
						Назад
					</Button>
					<Button
						// isDisabled={pages === 1}
						size='sm'
						variant='flat'
						onPress={onNextPage}
					>
						Далее
					</Button>
				</div>
			</div>
		);
	}, [onNextPage, onPreviousPage, page, selectedKeys]);

	if (!products) return <PageLoader />;

	return (
		<Table
			className={cn(cls.wrapper, 'content')}
			aria-label='Example table with custom cells, pagination and sorting'
			selectedKeys={selectedKeys}
			selectionMode='multiple'
			onSelectionChange={setSelectedKeys}
			topContent={topContent}
			topContentPlacement='outside'
			bottomContent={bottomContent}
			bottomContentPlacement='outside'
			sortDescriptor={sortDescriptor}
			onSortChange={setSortDescriptor}
		>
			<TableHeader columns={headerColumns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === 'actions' ? 'center' : 'start'}
						allowsSorting={column.sortable}
					>
						{column.name.toUpperCase()}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={'Продукты не найдены'} items={products}>
				{(item) => (
					<TableRow key={item.article}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
