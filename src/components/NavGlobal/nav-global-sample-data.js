import {
	IconHome,
	IconTeam,
	IconSupport,
	IconStreams,
	IconSettings,
	IconAutopilot,
	IconSites,
} from './__assets/icons';

export const sampleNavItems = [
	{
		label: 'Home',
		url: '/',
		icon: <IconHome />,
	},
	{
		label: 'Sites',
		url: '/sites',
		icon: <IconSites />,
	},
	{
		label: 'Team',
		url: '/team',
		icon: <IconTeam />,
	},
	{
		label: 'Autopilot',
		url: '/autopilot',
		icon: <IconAutopilot />,
	},

	{
		label: 'Streams',
		url: '/streams',
		icon: <IconStreams />,
	},
	{
		label: 'Support',
		url: '/support',
		icon: <IconSupport />,
	},

	{
		label: 'Settings',
		url: '/settings',
		icon: <IconSettings />,
	},
];
