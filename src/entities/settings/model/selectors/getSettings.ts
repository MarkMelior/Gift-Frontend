import { buildSelector } from '@/shared/lib/store';

export const [useSettings, getSettings] = buildSelector(
	(state) => state.settings,
);
