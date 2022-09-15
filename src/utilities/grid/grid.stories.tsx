import Docs from './grid.docs.md';
import './grid.css';

export default {
	title: 'Utilities/Grid',
	parameters: {
		componentSubtitle:
			'A fluid grid based on 4-columns at the small breakpoint, 6-columns at medium, and 12-columns at large',
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
			gridMarkup.push(
				<div className={classes}>
					<div
						style={{
							backgroundColor: 'PaleTurquoise',
							textAlign: 'center',
							padding: '1rem',
						}}
					>
						Item {index + 1}
					</div>
				</div>,
			);
		},
	);

	return <div className='pds-grid'>{gridMarkup}</div>;
};

export const Grid = Template.bind({});
