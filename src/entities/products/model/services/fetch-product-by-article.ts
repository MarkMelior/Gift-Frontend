import { ThunkConfig } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product.type';

export const fetchProductByArticle = createAsyncThunk<
	Product,
	string,
	ThunkConfig<string>
>('product/findByArticle', async (productArticle, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.get<Product>(
			`/products/${productArticle}`,
		);

		return response.data;
	} catch (e) {
		console.log(e);
		return thunkAPI.rejectWithValue('error');
	}
});
