export const ConvertData = (
	date: string | undefined,
	options?: {
		isTime?: boolean;
		isDate?: boolean;
	},
) => {
	if (!date) return '';

	const { isTime = true, isDate = true } = options || {};

	const convertedDate = new Date(date);

	let formattedDate = '';

	if (isDate) {
		formattedDate +=
			`${convertedDate.getDate().toString().padStart(2, '0')}.` +
			`${(convertedDate.getMonth() + 1).toString().padStart(2, '0')}.` +
			`${convertedDate.getFullYear()}`;
	}

	if (isTime) {
		if (formattedDate) {
			formattedDate += ', ';
		}
		formattedDate += `${convertedDate.getHours()}:${convertedDate
			.getMinutes()
			.toString()
			.padStart(2, '0')}`;
	}

	return formattedDate;
};
