import { ThunkConfig } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCard } from '../types/product.type';

export const fetchFavoritesProducts = createAsyncThunk<
	ProductCard[],
	void,
	ThunkConfig<string>
>('products/favorites', async (_, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.get<ProductCard[]>(
			`/products/favorites`,
		);

		return response.data;
	} catch (e) {
		console.log(e);
		return thunkAPI.rejectWithValue('error');
	}
});
