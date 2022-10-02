import Docs from './Select.docs.md';

import { createShortUUID } from '../../libs/components/utils';

export default {
	title: 'Foundations/Select',
	parameters: {
		componentSubtitle: 'Base select field styles',
		docs: {
			description: {
				component: Docs,
			},
		},
		controls: { disabled: true },
	},
	argTypes: {},
};

const Template = ({}) => {
	const selectID = `sample-select-${createShortUUID()}`;

	return (
		<>
			<label for={selectID}>Please select one:</label>
			<select id={selectID}>
				<option>Select an option</option>
				<option>Alpha</option>
				<option>Beta</option>
				<option>Gamma</option>
				<optgroup label='Miscellaneous'>
					<option>Epsilon</option>
				</optgroup>
			</select>
		</>
	);
};

export const Default = Template.bind({});
Default.storyName = 'Select';
