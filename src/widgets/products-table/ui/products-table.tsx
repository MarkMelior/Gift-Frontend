'use client';

import { ModalConfirm } from '@/features/modal-confirm';
import {
	ProductModal,
	deleteProduct,
	productModalActions,
	useGetProductsQuery,
} from '@/features/products';
import { CopyIcon } from '@/shared/assets/icon/Copy';
import { DeleteIcon } from '@/shared/assets/icon/Delete';
import { EditIcon } from '@/shared/assets/icon/Edit';
import { EyeIcon } from '@/shared/assets/icon/Eye';
import { ReviewIcon } from '@/shared/assets/icon/Review';
import { SearchIcon } from '@/shared/assets/icon/Search';
import { StarIcon } from '@/shared/assets/icon/Star';
import { ConvertData } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks';
import Input from '@/shared/ui/input/ui/input';
import { useMessage } from '@/shared/ui/message';
import { PageLoader } from '@/shared/ui/page-loader';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { ageButton, categoryButton, sexButton } from '@/widgets/sorts';
import {
	ProductResponse,
	SortFilters,
	SortSorting,
} from '@melior-gift/zod-contracts';
import {
	Button,
	Chip,
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
import { INITIAL_VISIBLE_COLUMNS, columns } from '../model/data';
import cls from './products-table.module.scss';

export const ProductsTable: FC = () => {
	const {
		isOpen: isOpenAdd,
		onOpen: onOpenAdd,
		onOpenChange: onOpenChangeAdd,
	} = useDisclosure();
	const dispatch = useAppDispatch();
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [filterValue, setFilterValue] = useState('');
	const [page, setPage] = useState(1);
	const [statusFilter, setStatusFilter] = useState<Selection>(new Set([]));
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: 'new',
		direction: 'ascending',
	});
	const { data } = useGetProductsQuery({
		limit: rowsPerPage,
		param: filterValue,
		sort: sortDescriptor.column as SortSorting,
		page,
		filters: Array.from(statusFilter) as SortFilters[],
	});
	const products = data?.products;
	const totalProducts = data?.totalProducts || 0;
	const pages = Math.ceil(totalProducts / rowsPerPage);
	const { showMessage } = useMessage();
	// todo:
	// const { addProduct } = useProduct();

	const [isProductEdit, setIsProductEdit] = useState(false);
	const [visibleColumns, setVisibleColumns] = useState<Selection>(
		new Set(INITIAL_VISIBLE_COLUMNS),
	);

	const headerColumns = useMemo(() => {
		if (visibleColumns === 'all') return columns;

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.uid),
		);
	}, [visibleColumns]);

	const onNextPage = useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

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
						// classNames={{
						// 	inputWrapper:
						// 		'dark:bg-zinc-900 border-solid border-2 dark:border-zinc-800 dark:hover:bg-zinc-800',
						// }}
					/>
					<div className='flex gap-3'>
						<Dropdown>
							<DropdownTrigger className='hidden sm:flex'>
								<Button variant='flat'>Фильтры</Button>
							</DropdownTrigger>
							<DropdownMenu
								aria-label='Table Columns'
								closeOnSelect={false}
								selectionMode='multiple'
								selectedKeys={statusFilter}
								onSelectionChange={setStatusFilter}
							>
								{[...ageButton, ...sexButton, ...categoryButton].map(
									(status) => (
										<DropdownItem key={status.key}>{status.text}</DropdownItem>
									),
								)}
							</DropdownMenu>
						</Dropdown>
						{/* <Select
							selectionMode='multiple'
							placeholder='Фильтры'
							selectedKeys={statusFilter}
							onSelectionChange={setStatusFilter}
						>
							{[...ageButton, ...sexButton, ...categoryButton].map((status) => (
								<SelectItem key={status.key}>{status.text}</SelectItem>
							))}
						</Select> */}
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
						<Button
							color='primary'
							onPress={() => {
								setIsProductEdit(false);
								onOpenAdd();
							}}
						>
							Добавить продукт
						</Button>
						<ProductModal
							isOpen={isOpenAdd}
							isEdit={isProductEdit}
							onOpenChange={onOpenChangeAdd}
						/>
					</div>
				</div>
				<div className='flex justify-between items-center'>
					<span className='text-default-400 text-small'>
						Всего продуктов: {totalProducts}
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
		isOpenAdd,
		isProductEdit,
		onOpenChangeAdd,
		totalProducts,
		onRowsPerPageChange,
		onOpenAdd,
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
				case 'filters':
					return (
						<div className='flex gap-1 flex-wrap'>
							{product.filters &&
								product.filters.map((filter) => (
									<Chip size='sm' key={filter}>
										{filter}
									</Chip>
								))}
						</div>
					);
				case 'title':
					return <div className={cls.title}>{product.title}</div>;
				case 'createdAt':
					return <div>{ConvertData(product.createdAt)}</div>;
				case 'updatedAt':
					return <div>{ConvertData(product.updatedAt)}</div>;
				case '_id':
					return (
						<Button
							size='sm'
							onClick={() => {
								showMessage({
									content: `ID ${product._id} скопирован!`,
									type: 'success',
								});
								navigator.clipboard.writeText(product._id);
							}}
							startContent={<CopyIcon width={18} height={18} />}
						>
							{product._id}
						</Button>
					);
				case 'article':
					return (
						<Button
							size='sm'
							onClick={() => {
								showMessage({
									content: `Артикул ${product.article} скопирован!`,
									type: 'success',
								});
								navigator.clipboard.writeText(product.article);
							}}
							startContent={<CopyIcon width={18} height={18} />}
						>
							{product.article}
						</Button>
					);
				// @ts-ignore
				case 'price':
					return (
						<div className='text-nowrap'>{product.markets[0].price} ₽</div>
					);
				// @ts-ignore
				case 'oldPrice':
					return (
						<div className='text-nowrap'>{product.markets[0].oldPrice} ₽</div>
					);
				// @ts-ignore
				case 'rating':
					return (
						<div className={cls.imgTextWrapper}>
							<StarIcon width='16' height='16' />
							<span>{product.markets[0].rating}</span>
						</div>
					);
				// @ts-ignore
				case 'reviewCount':
					return (
						<div className={cls.imgTextWrapper}>
							<ReviewIcon width='16' height='16' />
							<span>{product.markets[0].reviewCount}</span>
						</div>
					);
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
										setIsProductEdit(true);
										dispatch(productModalActions.updateProductModal(product));
										onOpenAdd();
									}}
								>
									<EditIcon width={18} height={18} className='opacity-50' />
								</Button>
							</Tooltip>
							<ModalConfirm
								onConfirm={() => {
									dispatch(deleteProduct(product.article));
									showMessage({
										content: `Продукт ${product.article} успешно удалён!`,
										type: 'close',
									});
								}}
								description={`Вы уверены, что хотите удалить продукт ${product.article}?`}
							>
								{/* <Tooltip content='Удалить' showArrow closeDelay={0}> */}
								<Button isIconOnly size='sm' variant='light' color='danger'>
									<DeleteIcon
										color='hsl(var(--gift-danger-500))'
										width={18}
										height={18}
									/>
								</Button>
								{/* </Tooltip> */}
							</ModalConfirm>
						</div>
					);
				default:
					return <>{cellValue}</>;
			}
		},
		[dispatch, onOpenAdd, showMessage],
	);

	const bottomContent = useMemo(() => {
		return (
			<div className='py-2 px-2 flex justify-between items-center'>
				{/* <span className='w-[30%] text-small text-default-400'>
					{selectedKeys === 'all'
						? 'Все выбрано'
						: `${selectedKeys.size} из ${totalProducts} выбрано`}
				</span> */}
				<Pagination
					isCompact
					showControls
					showShadow
					color='primary'
					page={page}
					total={pages}
					onChange={setPage}
				/>
				<div className='hidden sm:flex w-[30%] justify-end gap-2'>
					<Button
						isDisabled={page === 1}
						size='sm'
						variant='flat'
						onPress={onPreviousPage}
					>
						Назад
					</Button>
					<Button
						isDisabled={pages === 1 || page === pages}
						size='sm'
						variant='flat'
						onPress={onNextPage}
					>
						Далее
					</Button>
				</div>
			</div>
		);
	}, [onNextPage, onPreviousPage, page, pages]);

	if (!products) return <PageLoader />;

	return (
		<Table
			className={cn(cls.wrapper, 'content')}
			classNames={{
				wrapper: 'dark:bg-zinc-950',
			}}
			aria-label='Example table with custom cells, pagination and sorting'
			// selectedKeys={selectedKeys}
			// selectionMode='multiple'
			// onSelectionChange={setSelectedKeys}
			topContent={topContent}
			topContentPlacement='outside'
			bottomContent={bottomContent}
			bottomContentPlacement='outside'
			sortDescriptor={sortDescriptor}
			onSortChange={setSortDescriptor}
			selectionMode='single'
			// BaseComponent={BackgroundColorSpin}
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
