export const TelegramIcon = ({
	color = 'var(--color-main-inverted)',
	...props
}) => (
	<svg
		width='24'
		height='25'
		viewBox='0 0 24 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M3.22615 11.4249L15.1395 6.47793C16.3155 5.96263 20.3036 4.31364 20.3036 4.31364C20.3036 4.31364 22.1443 3.59221 21.9909 5.34426C21.9398 6.06569 21.5307 8.59069 21.1217 11.3218L19.8435 19.4122C19.8435 19.4122 19.7412 20.5974 18.872 20.8035C18.0028 21.0096 16.5711 20.0821 16.3155 19.8759C16.111 19.7213 12.4807 17.4025 11.1513 16.2688C10.7934 15.9596 10.3844 15.3412 11.2025 14.6198C13.0431 12.9193 15.2417 10.8065 16.5711 9.46672C17.1847 8.84835 17.7982 7.40549 15.2417 9.15753L8.03238 14.053C8.03238 14.053 7.2143 14.5683 5.6804 14.1045C4.14649 13.6407 2.35694 13.0223 2.35694 13.0223C2.35694 13.0223 1.12981 12.2494 3.22615 11.4249V11.4249Z'
			fill={color}
		/>
	</svg>
);
