import Docs from './typography.docs.md';

export default {
	title: 'Foundations/Typography',
	parameters: {
		componentSubtitle: 'Foundational typography',
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
			<h1>First level header</h1>
			<h2>Second level header</h2>
			<h3>Third level header</h3>
			<h4>Fourth level header</h4>
			<h5>Fifth level header</h5>

			<p>
				Sample bodycopy content. Schlitz cliche vegan whatever vape. Chillwave
				selvage etsy biodiesel gentrify gluten-free cray. Venmo freegan pabst
				church-key before they sold out street art hexagon lomo irony gastropub
				kombucha. Tumeric yes plz leggings keytar semiotics. Kinfolk kale chips
				sriracha celiac JOMO distillery. VHS before they sold out yr forage
				biodiesel narwhal listicle artisan meggings meh mlkshk snackwave.
			</p>
		</>
	);
};

export const Default = Template.bind({});
