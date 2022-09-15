import Docs from './images.docs.md';

export default {
	title: 'Foundations/Spacing/Images',
	parameters: {
		componentSubtitle: 'Foundational spacing for images',
		docs: {
			description: {
				component: Docs,
			},
		},
		controls: { disabled: true },
	},
	argTypes: {},
};

export const IMG = ({}) => {
	return (
		<img
			src='https://picsum.photos/id/560/400/250'
			alt='Small dirt walking trail in a forest of pine trees'
		/>
	);
};

export const Figure = ({}) => {
	return (
		<figure>
			<img
				src='https://picsum.photos/id/260/400/250'
				alt='Snowcapped mountains through trees'
			/>
			<figcaption>Snowcapped mountains through trees</figcaption>
		</figure>
	);
};
