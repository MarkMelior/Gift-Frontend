// import { RootState } from '@/app/providers/StoreProvider';
// import { LocalstorageKeys } from '@/shared/const/localstorage';
// import { SettingsStateKey } from '../../slice/settingsSlice';

// interface ConfigSettingsValue {
// 	defaultStateTrue: SettingsStateKey[];
// }

// const getSettingsValue = (settings: SettingsStateKey, state?: RootState) => {
// 	let defaultState = false;

// 	const config: ConfigSettingsValue = {
// 		defaultStateTrue: ['effects', 'animations'],
// 	};

// 	if (config.defaultStateTrue.includes(settings)) {
// 		defaultState = true;
// 	}

// 	if (typeof window !== 'undefined') {
// 		const data = localStorage.getItem(LocalstorageKeys[settings.toUpperCase()]);
// 		return data ? JSON.parse(data) : defaultState;
// 	}

// 	return state?.settings[settings];
// };
