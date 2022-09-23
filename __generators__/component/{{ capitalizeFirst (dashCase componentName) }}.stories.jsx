import {{ properCase componentName }}Component from './{{ capitalizeFirst (dashCase componentName) }}';
import DocsDescription from './{{ capitalizeFirst (dashCase componentName) }}.docs.md';

export default {
	title: 'Components/{{ titleCase componentName }}',
	component: {{ properCase componentName }}Component,
	parameters: {
		componentSubtitle:
			'A component <add description here>',
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
	},
	decorators: [
	],
};

const Template = (args) => <{{ properCase componentName }}Component {...args} />;

export const {{ properCase componentName }} = Template.bind({});
{{ properCase componentName }}.args = {
};
{{ properCase componentName }}.storyName = '{{ titleCase componentName }}';