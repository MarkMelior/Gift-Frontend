import { ThunkConfig } from '@/app/store';
import { ProductCard } from '@/entities/products';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const searchProduct = createAsyncThunk<
	ProductCard[],
	string,
	ThunkConfig<string>
>('products/search', async (query, { dispatch, extra, rejectWithValue }) => {
	try {
		const response = await extra.api.get<ProductCard[]>(
			`/products/search/${query}`,
		);

		return response.data;
	} catch (e: any) {
		return rejectWithValue(e.response.data.message);
	}
});
