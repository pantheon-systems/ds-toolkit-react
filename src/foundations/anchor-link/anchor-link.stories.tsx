import Docs from '!!raw-loader!./anchor-link.docs.mdx';

export default {
	title: 'Foundations/Anchor Link',
	parameters: {
		componentSubtitle: 'Base anchor link styles',
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
			<p>
				Sample bodycopy content with links. Schlitz cliche vegan whatever vape.
				Chillwave selvage etsy <a href='#'>biodiesel gentrify</a> gluten-free
				cray. Venmo freegan pabst church-key before they sold out street art
				hexagon lomo irony gastropub kombucha. Tumeric yes plz leggings keytar
				semiotics. Kinfolk kale chips sriracha celiac JOMO distillery.{' '}
				<a href='#'>VHS</a> before they sold out yr forage biodiesel narwhal
				listicle artisan meggings meh mlkshk snackwave.
			</p>
		</>
	);
};

export const Default = Template.bind({});
