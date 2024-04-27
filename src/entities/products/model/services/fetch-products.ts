import { ThunkConfig } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/product.type';
import { FindProductsDto } from '../types/products.type';

export const fetchProducts = createAsyncThunk<
	Product[],
	FindProductsDto,
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
