import { useTranslations } from 'next-intl';
import Image from 'next/image';
import cls from './CardRotate.module.scss';

interface CardRotateProps {
	name: string;
	color: string;
	icon: string;
	text: string;
}

export function CardRotate({ name, color, icon, text }: CardRotateProps) {
	const t = useTranslations('CardRotate');

	return (
		<div className={cls.container}>
			<div className={cls.card}>
				<div
					className={cls.front}
					style={{
						boxShadow: `0px -6px 0px -1px ${color}, 0px 0px 0px 1px rgba(255, 255, 255, 0.08)`,
					}}
				>
					<div className={cls.inner}>
						<div>
							<h1>{name}</h1>
							<Image
								src='/images/icons/refresh.svg'
								alt={t('icon-reload')}
								className={`${cls.refresh} noselect`}
								width={20}
								height={20}
							/>
						</div>
						<Image
							src={icon}
							alt={t('image')}
							className='noselect'
							width={256}
							height={256}
						/>
					</div>
				</div>
				<div
					className={cls.back}
					style={{
						boxShadow: `0px -6px 0px -1px ${color}, 0px 0px 0px 1px rgba(255, 255, 255, 0.08)`,
					}}
				>
					<div className={cls.inner}>
						<h1 style={{ color }}>{name}</h1>
						<p>{text}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
