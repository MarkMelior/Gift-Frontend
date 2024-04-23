import { ThunkConfig } from '@/app/store';
import { Product } from '@/entities/products';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const searchProduct = createAsyncThunk<
	Product[],
	string,
	ThunkConfig<string>
>('products/search', async (query, { dispatch, extra, rejectWithValue }) => {
	try {
		const response = await extra.api.get<Product[]>(
			`/products/search/${query}`,
		);

		return response.data;
	} catch (e: any) {
		return rejectWithValue(e.response.data.message);
	}
});
