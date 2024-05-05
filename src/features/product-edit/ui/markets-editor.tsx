import { Markets } from '@/shared/const';
import { ProductMarkets } from '@melior-gift/zod-contracts';
import type { Selection } from '@nextui-org/react';
import {
	Accordion,
	AccordionItem,
	Button,
	Input,
	Select,
	SelectItem,
} from '@nextui-org/react';
import { FC, memo, useState } from 'react';

interface MarketsEditorProps {
	markets: ProductMarkets[];
	setMarkets: (markets: ProductMarkets[]) => void;
}

export const MarketsEditor: FC<MarketsEditorProps> = memo(
	({ markets, setMarkets }) => {
		const [selectedKey, setSelectedKey] = useState<Selection>(new Set([]));

		const handleChange = (
			event: React.ChangeEvent<HTMLInputElement>,
			index: number,
		) => {
			const { name, value } = event.target;
			const updatedMarkets = [...markets];
			updatedMarkets[index] = {
				...updatedMarkets[index],
				[name]: value,
			};
			setMarkets(updatedMarkets);
		};

		return (
			<>
				<Accordion variant='splitted'>
					{markets.map(
						({ link, market, price, oldPrice, rating, reviewCount }, index) => (
							<AccordionItem key={index} aria-label={market} title={market}>
								<Select
									selectedKeys={selectedKey}
									onSelectionChange={setSelectedKey}
									name='market'
									label='Select an animal'
									className='max-w-xs'
								>
									{Object.keys(Markets).map((market) => (
										<SelectItem key={market} value={market}>
											<img
												src={`/images/icons/market/${Markets[market].image}`}
												alt=''
											/>
											{Markets[market].name}
										</SelectItem>
									))}
								</Select>
								<Input
									type='text'
									name='link'
									placeholder='Ссылка'
									size='sm'
									variant='bordered'
									value={link}
									onChange={(e) => handleChange(e, index)}
								/>
								<Input
									type='number'
									name='rating'
									placeholder='Рейтинг'
									size='sm'
									variant='bordered'
									value={rating}
									onChange={(e) => handleChange(e, index)}
								/>
								<Input
									type='number'
									name='reviewCount'
									placeholder='Кол-во отзывов'
									size='sm'
									variant='bordered'
									value={reviewCount}
									onChange={(e) => handleChange(e, index)}
								/>
								<Input
									type='number'
									name='price'
									placeholder='Цена'
									size='sm'
									variant='bordered'
									value={price}
									onChange={(e) => handleChange(e, index)}
								/>
								<Input
									type='number'
									name='oldPrice'
									placeholder='Старая цена'
									size='sm'
									variant='bordered'
									value={oldPrice}
									onChange={(e) => handleChange(e, index)}
								/>
								<Button color='danger' size='sm'>
									Удалить
								</Button>
							</AccordionItem>
						),
					)}
				</Accordion>
				<Button type='submit'>Добавить</Button>
			</>
		);
	},
);
