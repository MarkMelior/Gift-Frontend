export const parseErrorPathToNestedObject = (
	path: (string | number)[],
	errorMessage: string,
) => {
	const nestedErrorObject: any = {};

	let currentObject = nestedErrorObject;
	for (let i = 0; i < path.length - 1; i++) {
		const key = path[i];
		currentObject[key] = {};
		currentObject = currentObject[key];
	}

	currentObject[path[path.length - 1]] = errorMessage;

	return nestedErrorObject;
};
