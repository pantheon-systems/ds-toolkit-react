export const defaultIcon = (
	<svg
		aria-hidden='true'
		className='select-indicator'
		key={`combobox-select-indicator-icon-${Date.now()}`}
		focusable='false'
		role='img'
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 448 512'
	>
		<path
			fill='currentColor'
			d='M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z'
		></path>
	</svg>
);

export const checkmarkIcon = (
	<svg
		viewBox='0 0 48 48'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		aria-hidden='true'
		className='checked-indicator'
		key={`combobox-select-checkmark-icon-${Date.now()}`}
		focusable='false'
		role='img'
	>
		<path
			d='M16.5405 30.3716L40.7838 6.75L46.3784 12.3446L16.5405 41.5608L1 26.0203L6.59459 20.4257L16.5405 30.3716Z'
			fill='currentColor'
			stroke='currentColor'
		/>
	</svg>
);
