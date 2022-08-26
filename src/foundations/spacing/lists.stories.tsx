import Docs from '!!raw-loader!./lists.docs.mdx';

export default {
	title: 'Foundations/Spacing/Lists',
	parameters: {
		componentSubtitle: 'Foundational spacing for lists',
		docs: {
			description: {
				component: Docs,
			},
		},
		controls: { disabled: true },
	},
	argTypes: {},
};

export const UL = ({}) => {
	return (
		<ul>
			<li>Gamma</li>
			<li>Alpha</li>
			<li>
				Beta
				<ul>
					<li>
						Epsilon
						<ul>
							<li>Deeply nested</li>
						</ul>
					</li>
				</ul>
			</li>
		</ul>
	);
};
UL.storyName = 'Unordered';

export const OL = ({}) => {
	return (
		<ol>
			<li>Alpha</li>
			<li>Beta</li>
			<li>
				Gamma
				<ol>
					<li>
						Epsilon
						<ol>
							<li>Deeply nested</li>
						</ol>
					</li>
				</ol>
			</li>
		</ol>
	);
};
OL.storyName = 'Ordered';

export const DL = ({}) => {
	return (
		<dl>
			<dt>Alpha</dt>
			<dd>The first letter of the Greek alphabet</dd>

			<dt>Beta</dt>
			<dd>The second letter of the Greek alphabet</dd>

			<dt>Gamma</dt>
			<dd>The third letter of the Greek alphabet</dd>

			<dt>Carrot</dt>
			<dt>Cucumber</dt>
			<dt>Potato</dt>
			<dd>Vegetables that can be grown at home</dd>
		</dl>
	);
};
DL.storyName = 'Definition';
