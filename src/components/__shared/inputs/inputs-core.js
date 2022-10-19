import { IconClear } from '../__assets/icons/icon-clear';

export const cssClassesList = {
	error: 'pds-has-error',
	success: 'pds-has-success',
	required: 'pds-is-required',
	disabled: 'pds-is-disabled',
	isTextarea: 'pds-is-textarea',
};

export const ClearButton = ({ id, label, handleClearInput }) => {
	return (
		<button
			type='button'
			className='pds-input-field__accessory pds-input-field__clear'
			title={`Clear ${label} input`}
			aria-controls={id}
			onClick={handleClearInput}
		>
			<IconClear />
		</button>
	);
};
