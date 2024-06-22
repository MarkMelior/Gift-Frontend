import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';

type Selector<T, Args extends any[]> = (state: RootState, ...args: Args) => T;
type Hook<T, Args extends any[]> = (...args: Args) => T;
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>];

export function buildSelector<T, Args extends any[]>(
	selector: Selector<T, Args>,
): Result<T, Args> {
	const useSelectorHook: Hook<T, Args> = (...args: Args) => {
		return useSelector((state: RootState) => selector(state, ...args));
	};

	return [useSelectorHook, selector];
}
