import { ProductCreateRequest } from '@melior-gift/zod-contracts';

export interface ProductModalState {
	data: ProductCreateRequest;
	errors?: DeepPartial<DeepStringify<ProductCreateRequest>>;
}
