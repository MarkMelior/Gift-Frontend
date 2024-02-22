interface LinkItem {
	link: string;
	image: string;
}

interface LinksProps {
	telegram: LinkItem;
	gmail: LinkItem;
}

export const Links: LinksProps = {
	telegram: {
		link: 'https://t.me/upsoord',
		image: '/images/icons/telegram.svg',
	},
	gmail: {
		link: 'mailto:melior.commercial@gmail.com',
		image: '/images/icons/gmail.svg',
	},
};
