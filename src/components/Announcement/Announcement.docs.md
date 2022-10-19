## Purpose

The `Announcement` component is used to display a product/top level announcement, such as new features or account level warnings that require action.

Only one announcement should be shown at any given time. This is meant to be used at the top most layout level of the page.

## Usage

### Content

The `message` prop of the component accepts either a simple string or a React node/component.

Example of content with a link:

```jsx
<Announcement
	message={
		<>
			This is an example with <a href='#'>an action</a>.
		</>
	}
/>
```

### Dismissing

This component does not self remove from the DOM. The dismiss action is handled by the parent context. Use the `onDismiss` prop to pass in a function that will perform whatever actions are desired to dismiss the alert.

Example:

```javascript
const announcementOnDismiss = () => {
	console.log(`-> Announcement dismiss button clicked...`);
	setFieldOneVisible(false);
};
```

```jsx
{
	fieldOneVisible && (
		<AlertInline
			message='New feature now available!'
			isDismissible
			onDismiss='{announcementOnDismiss}'
		/>
	);
}
```
