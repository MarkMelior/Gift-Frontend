import { useFindUsersQuery } from '@/entities/user';
import { StarRating } from '@/shared/ui/star-rating';
import { ReviewResponse } from '@melior-gift/zod-contracts';
import { User } from '@nextui-org/react';
import Link from 'next/link';
import { FC, memo } from 'react';
import cls from './review-card.module.scss';

interface ReviewCardProps {
	review: ReviewResponse;
}

export const ReviewCard: FC<ReviewCardProps> = memo(({ review }) => {
	const { data: users } = useFindUsersQuery({
		usersIds: [review.userId],
	});

	return (
		<div className={cls.wrapper}>
			<div className={cls.header}>
				<User
					name={
						(users && users[0].first + ' ' + users && users[0].last) ||
						(users && users[0].username)
					}
					description={
						<Link target='_blank' href='https://twitter.com/jrgarciadev'>
							{`@${users && users[0].username}`}
						</Link>
					}
					avatarProps={{
						src: `${process.env.UPLOADS}/avatars/${users && users[0].id}/${
							users && users[0].avatar
						}`,
					}}
				/>
				<StarRating rating={review.rating} />
			</div>
			<p className={cls.text}>{review.comment}</p>
		</div>
	);
});
