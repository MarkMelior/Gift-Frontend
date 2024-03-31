import { useSearchParams } from 'next/navigation';

export const getSearchparams = <T = string>(key: string): T => {
	const searchParams = useSearchParams();
	return searchParams.get(key)?.split('-') as T;
};
