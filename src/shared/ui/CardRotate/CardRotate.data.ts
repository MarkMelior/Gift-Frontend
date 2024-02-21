export interface cardRotateProps {
	name: string;
	color: string;
	icon: string;
	text: string;
}

export const cardRotateData: cardRotateProps[] = [
	{
		name: 'Расширяемый',
		color: '#80eead',
		icon: 'scale_more.png',
		text: 'Проект построен на модульной структуре, обеспечивающей легкость добавления новых функций и компонентов',
	},
	{
		name: 'Стильный',
		color: '#ff6464',
		icon: 'design_palette.png',
		text: 'Привлекательный дизайн, следующий современным визуальным трендам и лучшим практикам веб-дизайна',
	},
	{
		name: 'Современный',
		color: '#8875ff',
		icon: 'code.png',
		text: 'Интеграция новейших технологий разработки, обеспечивающих высокую производительность',
	},
];
