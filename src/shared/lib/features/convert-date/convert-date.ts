export const ConvertData = (
	date: string,
	isTime: boolean = true,
	isDate: boolean = true,
) => {
	if (!date) return '';

	const convertedDate = new Date(date);

	let formattedDate = '';

	if (isDate) {
		formattedDate += `${convertedDate.getDate()}.${
			convertedDate.getMonth() + 1
		}.${convertedDate.getFullYear()}`;
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
