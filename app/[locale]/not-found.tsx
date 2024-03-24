import { NotFoundPage } from '@/views';
import { FC } from 'react';

// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

const NotFound: FC = () => {
	return <NotFoundPage />;
};

export default NotFound;
