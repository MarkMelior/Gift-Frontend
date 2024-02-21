import Image from 'next/image';
import { cardRotateData } from './CardRotate.data';
import style from './CardRotate.module.scss';

export function CardRotate({ container = true }: { container?: boolean }) {
	return (
		<div className={`${style.card__container} ${container ? 'container' : ''}`}>
			{cardRotateData.map((card) => (
				<div key={card.name} className={`${style.card}`}>
					<div
						className={`${style.front}`}
						style={{
							boxShadow: `0px -6px 0px -1px ${card.color}, 0px 0px 0px 1px rgba(255, 255, 255, 0.08)`,
						}}
					>
						<div className={`${style.inner}`}>
							<div className='relative flex w-full'>
								<h1>{card.name}</h1>
								<Image
									src='/refresh.svg'
									alt='Иконка перезагрузки'
									className={style.refresh}
									width={20}
									height={20}
								/>
							</div>
							<Image
								src={`/${card.icon}`}
								alt='Картинка карточки'
								className='noselect'
								width={256}
								height={256}
							/>
						</div>
					</div>
					<div
						className={`${style.back}`}
						style={{
							boxShadow: `0px -6px 0px -1px ${card.color}, 0px 0px 0px 1px rgba(255, 255, 255, 0.08)`,
						}}
					>
						<div className={`${style.inner}`}>
							<h1 style={{ color: card.color }}>{card.name}</h1>
							<p>{card.text}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
