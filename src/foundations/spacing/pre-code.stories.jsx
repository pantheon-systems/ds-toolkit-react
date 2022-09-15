import Docs from './pre-code.docs.md';

export default {
	title: 'Foundations/Spacing/Pre & Code',
	parameters: {
		componentSubtitle: 'Foundational spacing for <pre> & <code> tags',
		docs: {
			description: {
				component: Docs,
			},
		},
		controls: { disabled: true },
	},
	argTypes: {},
};

const codeSample = `function lorem(ipsum, dolor = 1) {
  const sit = ipsum == null ? 0 : ipsum.sit;
  dolor = sit - amet(dolor);
  return sit ? consectetur(ipsum, 0, dolor < 0 ? 0 : dolor) : [];
}`;

const preSample = `Tumeric yes plz leggings keytar semiotics.
Kinfolk kale chips sriracha celiac JOMO distillery.
VHS before they sold out yr forage biodiesel narwhal listicle artisan meggings meh mlkshk snackwave.`;

export const PRE = ({}) => {
	return <pre>{preSample}</pre>;
};

export const CODE = ({}) => {
	return <code>{codeSample}</code>;
};

export const CodeInPre = ({}) => {
	return (
		<pre>
			<code>{codeSample}</code>
		</pre>
	);
};
CodeInPre.storyName = 'Code in a <pre> tag';
