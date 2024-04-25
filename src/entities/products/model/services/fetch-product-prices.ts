import { ThunkConfig } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductPrices } from '../types/product.type';

export const fetchProductPrices = createAsyncThunk<
	ProductPrices,
	void,
	ThunkConfig<string>
>('products/prices', async (_, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.get<ProductPrices>(
			'products/prices',
		);

		return response.data;
	} catch (e) {
		console.log(e);
		return thunkAPI.rejectWithValue(
			'fetchProductPrices error: Цены не найдены',
		);
	}
});
