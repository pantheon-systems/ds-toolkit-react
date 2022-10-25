## Purpose

The Toasts component creates an area where toast messages are shown. A toast is a concise message that is communicated to the user in a consistent position. Toast messages should be used to communicate the completion of a task by the user, an error or warning that occurred as a result of an action by the user, or generally any message that would not create negative impact if it is missed by the user. Ideally a toast should contain _no_ interactive controls.

## Implementation

### Props

- `toasts` — An array of toast objects (described below) — required.
- `position` — A string describing the location of the toasts area. The following descriptions are in the context of a right-to-left writing and North American context:
  - 'start-start' — to display toasts in the upper left corner.
  - 'start-end' — to display toasts in the upper right corner.
  - 'end-start' — to display toasts in the lower left corner.
  - 'end-end' — to display toasts in the lower right corner.

### Toast

The shape of the data passed to the Toasts component is an array of `toasts`. Each toast in the array is an object with the following properties:

- `id` — A short string that uniquely identifies the toast — required.
- `type` — A string describing the type of toast to show, one of: 'info', 'success', 'warning', 'error', 'pantheon' — required.
- `message` — The content of the toast, either a string or a React element/node — required.
- `isDismissible` — A boolean to indicate if the toast will wait for the user to dismiss it.
- `onDismiss` — The function to perform when the toast is dismissed, manually or automatically.
- `autodismiss` — An object with the following shape:
  - `autodismiss` — A boolean to indicate that the toast will self dismiss after a period of time.
  - `timeInSeconds` — A numeric value describing the number of seconds the toast will remain visible prior to dismissing itself.

#### Example data array

```json
[
	{
		id: `pds-toast-7gVgbAhI`,
		type: 'info',
		message: 'This is the first toast.',
	},
	{
		id: `pds-toast-xAtNczUX`,
		type: 'success',
		message: 'This is the second toast.',
		isDismissible: true,
		onDismiss: dismissClickSomeDismissible,
	},
	{
		id: `pds-toast-5WJ6f4sp`,
		type: 'warning',
		message: 'This is the third toast.',
		autodismiss: {
			autodismiss: true,
			timeInSeconds: autoDismissTimeInSeconds,
		},
		onDismiss: dismissAuto,
	},
]
```

##### Sample `onDismiss` callback function

```javascript
const handleDismissButtonClick = (event, id) => {
	console.log(`[DEBUG] Dismiss button clicked for: ${id}...`);

	// locate the toast in the data array passed to the `Toasts` component
	// NOTE: `myToastsDataArray` is the data array variable/prop that is being passed to the Toasts component
	const removeAtIndex = myToastsDataArray.findIndex((toast) => toast.id === id);

	// remove the toast from the data array
	if (removeAtIndex !== -1) {
		myToastsDataArray.splice(removeAtIndex, 1);
	}

	// optionally send a custom event to further handle dismissing of a toast within the parent context of the Toasts component
	const eventTrigger = new CustomEvent('myCustomDismissToastEvent');
	document.dispatchEvent(eventTrigger);
};
```
