import Docs from '!!raw-loader!./images.docs.mdx';

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
	return <img src='https://picsum.photos/id/560/400/250' />;
};

export const Figure = ({}) => {
	return (
		<figure>
			<img src='https://picsum.photos/id/260/400/250' />
			<figcaption>Snowcapped mountains through trees</figcaption>
		</figure>
	);
};
