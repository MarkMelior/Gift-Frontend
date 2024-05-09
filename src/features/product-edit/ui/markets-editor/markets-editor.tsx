import { DeleteIcon } from '@/shared/assets/icon/Delete';
import { ReviewIcon } from '@/shared/assets/icon/Review';
import { StarIcon } from '@/shared/assets/icon/Star';
import { Markets } from '@/shared/const';
import { useAppDispatch } from '@/shared/lib/hooks';
import {
	getMarketsProductModal,
	getProductModalErrors,
	productModalActions,
	productModalInitialState,
} from '@/widgets/admin';
import { MarketType } from '@melior-gift/zod-contracts';
import type { Selection } from '@nextui-org/react';
import {
	Accordion,
	AccordionItem,
	Button,
	Input,
	Select,
	SelectItem,
} from '@nextui-org/react';
import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

export const MarketsEditor: FC = memo(() => {
	const dispatch = useAppDispatch();
	const markets = useSelector(getMarketsProductModal);
	const errors = useSelector(getProductModalErrors);

	const onChangeMarket = useCallback(
		(value: Selection, index: number) => {
			dispatch(
				productModalActions.updateMarketsProductModal({
					market: Array.from(value)[0] as MarketType,
					index,
				}),
			);
		},
		[dispatch],
	);

	const onChangeLink = useCallback(
		(value: string, index: number) => {
			dispatch(
				productModalActions.updateMarketsProductModal({ link: value, index }),
			);
		},
		[dispatch],
	);

	const onChangeRating = useCallback(
		(value: string, index: number) => {
			dispatch(
				productModalActions.updateMarketsProductModal({
					rating: Number(value),
					index,
				}),
			);
		},
		[dispatch],
	);

	const onChangeReviewCount = useCallback(
		(value: string, index: number) => {
			dispatch(
				productModalActions.updateMarketsProductModal({
					reviewCount: Number(value),
					index,
				}),
			);
		},
		[dispatch],
	);

	const onChangePrice = useCallback(
		(value: string, index: number) => {
			dispatch(
				productModalActions.updateMarketsProductModal({
					price: Number(value),
					index,
				}),
			);
		},
		[dispatch],
	);

	const onChangeOldPrice = useCallback(
		(value: string, index: number) => {
			dispatch(
				productModalActions.updateMarketsProductModal({
					oldPrice: Number(value),
					index,
				}),
			);
		},
		[dispatch],
	);

	const removeMarket = useCallback(
		(index: number) => {
			dispatch(
				productModalActions.updateProductModal({
					markets: markets?.filter((_, i) => i !== index),
				}),
			);
		},
		[dispatch, markets],
	);

	const addMarket = useCallback(() => {
		if (markets) {
			dispatch(
				productModalActions.updateProductModal({
					markets: [...markets, ...productModalInitialState.markets],
				}),
			);
		}
	}, [dispatch, markets]);

	if (!markets) return null;

	return (
		<>
			<label>Маркетплейсы</label>
			<Accordion
				variant='splitted'
				className='px-0'
				itemClasses={{
					trigger: 'py-2',
				}}
			>
				{markets.map(
					({ link, market, price, oldPrice, rating, reviewCount }, index) => (
						<AccordionItem
							key={index}
							aria-label={market}
							className='text-sm w-full'
							classNames={{
								content: 'flex flex-col gap-2',
							}}
							startContent={
								<div className='flex gap-2 w-52'>
									<Button
										color='danger'
										isIconOnly
										onClick={() => removeMarket(index)}
										size='sm'
										variant='flat'
									>
										<DeleteIcon
											color='hsl(var(--gift-danger-500))'
											width={18}
											height={18}
										/>
									</Button>
									<Select
										selectedKeys={[market]}
										onSelectionChange={(keys) => onChangeMarket(keys, index)}
										name='market'
										disallowEmptySelection
										startContent={
											<img
												src={`/images/icons/market/${Markets[market].image}`}
												alt='Test'
												width={18}
												height={18}
											/>
										}
										size='sm'
									>
										{Object.keys(Markets).map((value) => (
											<SelectItem
												key={value}
												value={value}
												textValue={Markets[value as MarketType].name}
											>
												<div className='flex gap-2'>
													<img
														src={`/images/icons/market/${
															Markets[value as MarketType].image
														}`}
														alt='Test'
														width={18}
														height={18}
														className='object-contain'
													/>
													{Markets[value as MarketType].name}
												</div>
											</SelectItem>
										))}
									</Select>
								</div>
							}
						>
							<Input
								type='text'
								name='link'
								label='Ссылка'
								size='sm'
								variant='underlined'
								isInvalid={errors?.markets?.[index]?.link !== undefined}
								errorMessage={errors?.markets?.[index]?.link}
								value={link}
								onChange={(e) => onChangeLink(e.target.value, index)}
							/>
							<Input
								type='number'
								name='rating'
								label='Рейтинг'
								startContent={
									<StarIcon
										color='hsl(var(--gift-default-300))'
										width={18}
										height={18}
									/>
								}
								size='sm'
								variant='underlined'
								isInvalid={errors?.markets?.[index]?.rating !== undefined}
								errorMessage={errors?.markets?.[index]?.rating}
								value={String(rating)}
								onChange={(e) => onChangeRating(e.target.value, index)}
							/>
							<Input
								type='number'
								name='reviewCount'
								label='Кол-во отзывов'
								startContent={
									<ReviewIcon width={18} height={18} opacity={0.25} />
								}
								size='sm'
								variant='underlined'
								isInvalid={errors?.markets?.[index]?.reviewCount !== undefined}
								errorMessage={errors?.markets?.[index]?.reviewCount}
								value={String(reviewCount)}
								onChange={(e) => onChangeReviewCount(e.target.value, index)}
							/>
							<Input
								type='number'
								name='price'
								label='Цена'
								startContent={
									<div className='pointer-events-none flex items-center'>
										<span className='text-default-400 text-small'>₽</span>
									</div>
								}
								size='sm'
								variant='underlined'
								isInvalid={errors?.markets?.[index]?.price !== undefined}
								errorMessage={errors?.markets?.[index]?.price}
								value={String(price)}
								onChange={(e) => onChangePrice(e.target.value, index)}
							/>
							<Input
								type='number'
								name='oldPrice'
								label='Старая цена'
								startContent={
									<div className='pointer-events-none flex items-center'>
										<span className='text-default-400 text-small'>₽</span>
									</div>
								}
								size='sm'
								variant='underlined'
								isInvalid={errors?.markets?.[index]?.oldPrice !== undefined}
								errorMessage={errors?.markets?.[index]?.oldPrice}
								value={String(oldPrice)}
								onChange={(e) => onChangeOldPrice(e.target.value, index)}
							/>
						</AccordionItem>
					),
				)}
			</Accordion>
			<Button onClick={addMarket} variant='flat'>
				Добавить
			</Button>
		</>
	);
});
