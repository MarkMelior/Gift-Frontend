import { rtkApi } from '@/shared/api/rtkApi';
import { ReviewFindRequest, ReviewResponse } from '@melior-gift/zod-contracts';

export const reviewsApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		getReviews: build.query<ReviewResponse[], ReviewFindRequest>({
			query: (dto) => ({
				url: '/reviews',
				method: 'GET',
				params: dto,
			}),
		}),
		// todo reviews
		// addReview: build.mutation<
		// 	ReviewResponse,
		// 	ReviewCreateRequest
		// >({
		// 	query: ({ body, images }) => {
		// 		const formData = new FormData();
		// 		Array.from(images).forEach((image) => {
		// 			formData.append(`images`, image);
		// 		});
		// 		formData.append('body', JSON.stringify(body));

		// 		return {
		// 			url: `/products`,
		// 			method: 'POST',
		// 			body: formData,
		// 		};
		// 	},
		// }),
	}),
});

export const { useGetReviewsQuery } = reviewsApi;
