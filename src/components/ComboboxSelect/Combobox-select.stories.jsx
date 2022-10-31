import ComboboxSelectComponent from './Combobox-select';
import DocsDescription from './Combobox-select.docs.md';

import {
	sampleSelectOptions,
	sampleSelectOptionsScrolling,
} from './combobox-select-sample-data';

export default {
	title: 'Components/Inputs/Combobox Select',
	component: ComboboxSelectComponent,
	parameters: {
		componentSubtitle:
			'A component used to render a select-only combobox similar to an HTML `select` element.',
		docs: {
			description: {
				component: DocsDescription,
			},
			source: {
				excludeDecorators: true,
			},
		},
	},
	argTypes: {
		selectOptions: {
			description: 'Sample data sets of menu items',
			options: Object.keys({
				sampleSelectOptions,
				sampleSelectOptionsScrolling,
			}),
			mapping: { sampleSelectOptions, sampleSelectOptionsScrolling },
			control: {
				type: 'select',
				labels: {
					sampleSelectOptions: 'Short list of options',
					sampleSelectOptionsScrolling: 'Long list of options that scroll',
				},
			},
		},
	},
	decorators: [
		(Story) => (
			<div style={{ marginBlockEnd: '24rem' }}>
				<Story />
			</div>
		),
	],
};

const Template = (args) => <ComboboxSelectComponent {...args} />;

export const ComboboxSelect = Template.bind({});
ComboboxSelect.args = {
	label: 'Please select one',
	selectOptions: sampleSelectOptions,
};
ComboboxSelect.storyName = 'Combobox Select';
