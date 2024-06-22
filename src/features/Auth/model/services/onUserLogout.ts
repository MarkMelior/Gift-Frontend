export const onUserLogout = async () => {
	const response = await fetch('/api/logout', {
		method: 'POST',
	});

	if (!response.ok) {
		throw new Error('Failed to log out');
	}

	return response.json();
};
