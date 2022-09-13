import Docs from './grid.docs.md';
import './grid.css';

export default {
	title: 'Utilities/Grid',
	parameters: {
		componentSubtitle: '',
		docs: {
			description: {
				component: Docs,
			},
		},
		controls: { disabled: true },
	},
};

export const TwoItems = ({}) => {
	return (
		<div className='pds-grid'>
			<div className='pds-grid-item pds-grid-item--sm-2 pds-grid-item--md-3 pds-grid-item--lg-6'>
				Item 1
			</div>
			<div className='pds-grid-item pds-grid-item--sm-2 pds-grid-item--md-3 pds-grid-item--lg-6'>
				Item 2
			</div>
		</div>
	);
};

export const ThreeItems = ({}) => {
	return (
		<div className='pds-grid'>
			<div className='pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-2 pds-grid-item--lg-4'>
				Item 1
			</div>
			<div className='pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-2 pds-grid-item--lg-4'>
				Item 2
			</div>
			<div className='pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-2 pds-grid-item--lg-4'>
				Item 3
			</div>
		</div>
	);
};

export const FourItems = ({}) => {
	return (
		<div className='pds-grid'>
			<div className='pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-3 pds-grid-item--lg-3'>
				Item 1
			</div>
			<div className='pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-3 pds-grid-item--lg-3'>
				Item 2
			</div>
			<div className='pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-3 pds-grid-item--lg-3'>
				Item 3
			</div>
			<div className='pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-3 pds-grid-item--lg-3'>
				Item 4
			</div>
		</div>
	);
};
