import { ThunkConfig } from '@/app/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../..';

export const fetchProductData = createAsyncThunk<
	Product[],
	void,
	ThunkConfig<string>
>('products/fetchProductData', async (_, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.get<Product[]>('/products');

		return response.data;
	} catch (e) {
		console.log(e);
		return thunkAPI.rejectWithValue('error');
	}
});
