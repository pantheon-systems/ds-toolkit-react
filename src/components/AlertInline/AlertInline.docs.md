## Purpose

The `AlertInline` component is used to display an alert within a content area. Such messaging is intended to provide information of importance as needed contextually, usually in reaction to a user action.

## Usage

### Dismissing

This component does not self remove from the DOM. The dismiss action is handled by the parent context. Use the `onDismiss` prop to pass in a function that will perform whatever actions are desired to dismiss the alert.

Example:

```javascript
const fieldOneOnDismiss = () => {
	console.log(`-> Field one dismiss button clicked...`);
	setFieldOneVisible(false);
};
```

```jsx
{
	fieldOneVisible && (
		<AlertInline
			message='Field value is approved.'
			isDismissible
			onDismiss='{fieldOneOnDismiss}'
		/>
	);
}
```
