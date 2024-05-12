'use client';

import { useGetProductsQuery } from '@/entities/products';
import { ConfirmButton } from '@/features/confirm-action';
import { DeleteIcon } from '@/shared/assets/icon/Delete';
import { EditIcon } from '@/shared/assets/icon/Edit';
import { EyeIcon } from '@/shared/assets/icon/Eye';
import { useAppDispatch } from '@/shared/lib/hooks';
import { ProductModal, productModalActions } from '@/widgets/admin';
import { PageLoader } from '@/widgets/page-loader';
import { ProductResponse } from '@melior-gift/zod-contracts';
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Selection,
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
import { FC, Key, useCallback, useMemo, useState } from 'react';
import { INITIAL_VISIBLE_COLUMNS, columns, filtersOptions } from './model/data';
import cls from './product-page.module.scss';

export const AdminProductPage: FC = () => {
	const {
		isOpen: isOpenAdd,
		onOpen: onOpenAdd,
		onOpenChange: onOpenChangeAdd,
	} = useDisclosure();
	const dispatch = useAppDispatch();
	const { data: products } = useGetProductsQuery({ limit: 10 });

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

	const topContent = useMemo(() => {
		if (!products) return <PageLoader />;

		return (
			<div className='flex flex-col gap-4'>
				<div className='flex justify-between gap-3 items-end'>
					{/* TODO: SEARCH PRODUCTS */}
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
					{/* <label className='flex items-center text-default-400 text-small'>
							Rows per page:
							<select
								className='bg-transparent outline-none text-default-400 text-small'
								onChange={onRowsPerPageChange}
							>
								<option value='5'>5</option>
								<option value='10'>10</option>
								<option value='15'>15</option>
							</select>
						</label> */}
				</div>
			</div>
		);
	}, [
		products,
		statusFilter,
		visibleColumns,
		onOpenAdd,
		isOpenAdd,
		onOpenChangeAdd,
	]);

	const renderCell = useCallback((product: ProductResponse, columnKey: Key) => {
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
									dispatch(productModalActions.updateProductModal(product));
									onOpenAdd();
								}}
							>
								<EditIcon width={18} height={18} className='opacity-50' />
							</Button>
						</Tooltip>
						<Tooltip content='Удалить' showArrow closeDelay={0}>
							<ConfirmButton
								size='sm'
								isIconOnly
								variant='light'
								color='danger'
								onConfirm={() => console.log('DELETE PRODUCT')}
								confirmDescription={`Вы уверены, что хотите удалить продукт ${product.article}?`}
							>
								<DeleteIcon
									color='hsl(var(--gift-danger-500))'
									width={18}
									height={18}
								/>
							</ConfirmButton>
						</Tooltip>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	if (!products) return <PageLoader />;

	return (
		<Table
			className={cn(cls.wrapper, 'content')}
			aria-label='Example table with custom cells, pagination and sorting'
			topContent={topContent}
			topContentPlacement='outside'
			selectedKeys={selectedKeys}
			selectionMode='multiple'
			onSelectionChange={setSelectedKeys}
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
