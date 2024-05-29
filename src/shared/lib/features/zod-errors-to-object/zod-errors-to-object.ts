export const ZodErrorsToObject = (errors: any) => {
	const allErrors = errors.data.errors.reduce(
		(accumulator: any, error: any) => {
			accumulator[error.path[0]] = error.message;
			return accumulator;
		},
		{},
	);

	return allErrors;
};
