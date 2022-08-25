import Docs from '!!raw-loader!./typography.docs.mdx';

export default {
	title: 'Utilities/Typography',
	parameters: {
		componentSubtitle: 'Utility classes for typography',
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
	return (
		<>
			<div class='pds-subheader'>
				This is a subheader. Unlike headers (H1-H5) it has no inherent
				hierarchy.
			</div>
		</>
	);
};

export const Default = Template.bind({});
