## Purpose

The `InputObscured` component allows the creation of an input field that is obscured, such as a password, in order to accept sensitive data from the user.

The accessories section contains the clear button, visible only when a value is present in the input area, to instantly empty the input area when desired. A toggle button is also included to make the contents of the input field visible or return it to the obscured state. It also includes space for a counter, such as a character or word counter.

When the input field loses focus it will automatically return to the obscured state to maintain security.

## Usage

### Optional functions

#### counterFunction

This optional function allows you to provide a custom counter function that will display a count update within the input field.

The counter function will be called on every change event from the editable input area – each keystroke and clear button activation.

Example:

```javascript
(value) => {
	const maxCount = 100;

	return `${value.length}/${maxCount}`;
};
```

#### validationFunction

This optional function allows you to provide a custom validation function of the input value. The function should accept one argument, the input's value, and return an object with a key of either `error` or `success`, and optionally a `message` key providing a description to clarify the result.

Validation will occur on the blur event, when focus leaves the editable input area.

Example:

```javascript
(value) => {
	const maxLength = 10;
	const disallowedCharacters = ['*', '@'];

	// if input value is not a permitted length
	if (value.length > maxLength) {
		return {
			error: true,
			message: `Please enter a password with no more than ${maxLength} characters.`,
		};
	}

	// if input value contains disallowed characters
	const regex = new RegExp(`[${disallowedCharacters.join('|')}]`, 'g');
	if (value.match(regex)) {
		return {
			error: true,
			message: `Please enter a password that does not include the following characters: ${disallowedCharacters.join(
				', ',
			)}.`,
		};
	}
};
```

## Accessibility

This component has a few accessibility features built-in.

The clear button will set focus back to the input area when clicked.

If your optional validation function returns an error, the message will be announced when the field validates. Validation occurs on blur events.
