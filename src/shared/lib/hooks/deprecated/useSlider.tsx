// 'use client';

// import React, { useEffect, useRef, useState } from 'react';

// interface UseSliderProps {
// 	startElement?: number;
// 	autoSlideDuration?: number;
// }

// export const useSlider = ({
// 	startElement = 0,
// 	autoSlideDuration,
// }: UseSliderProps) => {
// 	const [isDragging, setIsDragging] = useState(false);
// 	const [startX, setStartX] = useState(0);
// 	const [scrollLeft, setScrollLeft] = useState(0);
// 	const sliderRef = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		if (sliderRef.current) {
// 			const cards = Array.from(sliderRef.current.children) as HTMLDivElement[];
// 			if (cards.length > startElement) {
// 				sliderRef.current.scrollTo({
// 					left: cards[startElement].offsetLeft,
// 					behavior: 'smooth',
// 				});
// 			}
// 		}
// 	}, [startElement]);

// 	const handleMouseDown = (
// 		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
// 	) => {
// 		if (sliderRef.current) {
// 			setIsDragging(true);
// 			setStartX(event.pageX - sliderRef.current.offsetLeft);
// 			setScrollLeft(sliderRef.current.scrollLeft);
// 		}
// 	};

// 	const handleMouseMove = (
// 		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
// 	) => {
// 		if (!isDragging || !sliderRef.current) return;
// 		const x = event.pageX - sliderRef.current.offsetLeft;
// 		const walk = x - startX;
// 		sliderRef.current.scrollLeft = scrollLeft - walk;
// 	};

// 	const handleMouseUp = () => {
// 		setIsDragging(false);
// 		snapToNearestCard();
// 	};

// 	const snapToNearestCard = () => {
// 		if (!sliderRef.current) return;
// 		const cards = Array.from(sliderRef.current.children) as HTMLDivElement[];
// 		const distances = cards.map((card) =>
// 			Math.abs(card.offsetLeft - sliderRef.current!.scrollLeft),
// 		);
// 		const closestIndex = distances.indexOf(Math.min(...distances));
// 		sliderRef.current.scrollTo({
// 			left: cards[closestIndex].offsetLeft,
// 			behavior: 'smooth',
// 		});
// 	};

// 	useEffect(() => {
// 		let intervalId: NodeJS.Timeout;
// 		if (autoSlideDuration && sliderRef.current) {
// 			intervalId = setInterval(scrollToNextCard, autoSlideDuration);
// 		}
// 		return () => {
// 			clearInterval(intervalId);
// 		};
// 	}, [autoSlideDuration]);

// 	const scrollToNextCard = () => {
// 		if (!sliderRef.current) return;
// 		const cards = Array.from(sliderRef.current.children) as HTMLDivElement[];
// 		const currentScrollLeft = sliderRef.current.scrollLeft;
// 		const nextCardIndex = cards.findIndex(
// 			(card) => card.offsetLeft > currentScrollLeft,
// 		);
// 		if (nextCardIndex !== -1) {
// 			sliderRef.current.scrollTo({
// 				left: cards[nextCardIndex].offsetLeft,
// 				behavior: 'smooth',
// 			});
// 		}
// 	};

// 	const scrollToPrevCard = () => {
// 		if (!sliderRef.current) return;
// 		const cards = Array.from(sliderRef.current.children) as HTMLDivElement[];
// 		const currentScrollLeft = sliderRef.current.scrollLeft;
// 		const prevCardIndex = cards
// 			.slice()
// 			.reverse()
// 			.findIndex((card) => card.offsetLeft < currentScrollLeft);
// 		if (prevCardIndex !== -1) {
// 			const reversedIndex = cards.length - 1 - prevCardIndex;
// 			sliderRef.current.scrollTo({
// 				left: cards[reversedIndex].offsetLeft,
// 				behavior: 'smooth',
// 			});
// 		}
// 	};

// 	const goToPage = (pageIndex: number) => {
// 		if (!sliderRef.current) return;
// 		const cards = Array.from(sliderRef.current.children) as HTMLDivElement[];
// 		if (pageIndex >= 0 && pageIndex < cards.length) {
// 			sliderRef.current.scrollTo({
// 				left: cards[pageIndex].offsetLeft,
// 				behavior: 'smooth',
// 			});
// 		}
// 	};

// 	return {
// 		sliderRef,
// 		handleMouseDown,
// 		handleMouseMove,
// 		handleMouseUp,
// 		scrollToNextCard,
// 		scrollToPrevCard,
// 		goToPage,
// 	};
// };
