import Docs from '!!raw-loader!./details.docs.mdx';

export default {
	title: 'Foundations/Spacing',
	parameters: {
		componentSubtitle: 'Foundational spacing for <details> tag',
		docs: {
			description: {
				component: Docs,
			},
		},
		controls: { disabled: true },
	},
	argTypes: {},
};

export const DetailsTag = ({}) => {
	return (
		<details>
			<summary>About Pantheon Systems</summary>
			<p>
				Our mission is to make the web a first-class platform that delivers
				results. We’re building the world’s best WebOps (Website Operations)
				Platform— one that empowers marketing and development teams to take
				control of their websites, while giving them the agility to win in the
				dynamic world of digital marketing. With Pantheon, marketers and
				developers deliver results by iterating quickly, learning, and
				experimenting with their websites in the same way they do with virtually
				every other tool in their martech and development stacks.
			</p>
		</details>
	);
};
DetailsTag.storyName = 'Details tag';
