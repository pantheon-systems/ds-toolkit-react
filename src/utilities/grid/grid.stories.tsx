import Docs from './grid.docs.md';
import './grid.css';

export default {
	title: 'Utilities/Grid',
	parameters: {
		componentSubtitle: '',
		docs: {
			description: {
				component: Docs,
			},
		},
	},
	argTypes: {
		items: {
			name: 'Grid Items',
			description:
				'Sample grid items for prototyping. Edit, add, or remove items within the array to see various combinations. <br/> <br/> The `sm`, `md`, and `lg`  properties indicate how many columns an item should span at each breakpoint.',
		},
	},
	args: {
		items: [
			{ sm: 4, md: 2, lg: 4 },
			{ sm: 4, md: 2, lg: 4 },
			{ sm: 4, md: 2, lg: 4 },
		],
	},
};

const Template = (args: { items: any }) => {
	const items = args.items;
	const gridMarkup: JSX.Element[] = [];

	items.forEach(
		(item: { sm: number; md: number; lg: number }, index: number) => {
			const classes = `pds-grid-item pds-grid-item--sm-${item.sm} pds-grid-item--md-${item.md} pds-grid-item--lg-${item.lg}`;
			gridMarkup.push(<div className={classes}>Item {index + 1}</div>);
		},
	);

	return <div className='pds-grid'>{gridMarkup}</div>;
};

export const Default = Template.bind({});
