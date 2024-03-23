import { getSpaceCanvasValue } from '@/shared/ui/SpaceCanvas';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
	children?: ReactNode;
	initialState?: StateSchema;
}

export const StoreProvider = (props: StoreProviderProps) => {
	const { children } = props;

	const initialState = {
		spaceCanvas: {
			value: getSpaceCanvasValue(),
		},
	};

	const store = createReduxStore(initialState as StateSchema);

	return <Provider store={store}>{children}</Provider>;
};
