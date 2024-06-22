import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

type Selector<T> = (state: RootState) => T;
type Result<T> = [() => T, Selector<T>];

export const buildSelector = <T>(selector: Selector<T>): Result<T> => {
	const useSelectorHook = () => {
		return useSelector(selector);
	};

	return [useSelectorHook, selector];
};
