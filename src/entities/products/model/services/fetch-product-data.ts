import { ThunkConfig } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FindProductDto, Product } from '../types/product.type';

export const fetchProductData = createAsyncThunk<
	Product[],
	FindProductDto,
	ThunkConfig<string>
>('products/find', async (dto, thunkAPI) => {
	try {
		const response = await thunkAPI.extra.api.post<Product[]>(
			'/products/find',
			dto,
		);

		return response.data;
	} catch (e) {
		console.log(e);
		return thunkAPI.rejectWithValue('error');
	}
});
