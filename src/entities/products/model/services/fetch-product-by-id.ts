import { ThunkConfig } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product.type';

export const fetchProductById = createAsyncThunk<
	Product,
	string,
	ThunkConfig<string>
>('products/byId', async (productId, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.get<Product>(
			`/products/${productId}`,
		);

		return response.data;
	} catch (e) {
		console.log(e);
		return thunkAPI.rejectWithValue('error');
	}
});
