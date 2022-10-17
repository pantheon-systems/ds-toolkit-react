## Purpose

The `InputFormatted` component allows the creation of an input field that will be formatted in a pre-determined way.

The accessories section contains the clear button, visible only when a value is present in the input area, to instantly empty the input area when desired.

## Usage

### Optional functions

#### validationFunction

This optional function allows you to provide a custom validation function of the input value. The function should accept one argument, the input's value, and return an object with a key of either `error` or `success`, and optionally a `message` key providing a description to clarify the result.

Validation will occur on the blur event, when focus leaves the editable input area.

Example:

```javascript
(value) => {
	const maxLength = 16;
	const disallowedStart = ['99', '76'];

	// if input value is not a permitted length
	if (value.length > maxLength) {
		return {
			error: true,
			message: `Please enter a value with no more than ${maxLength} characters.`,
		};
	}

	// if input value contains disallowed starting characters
	const regex = new RegExp(`^(?:${disallowedStart.join('|')})`, 'g');
	if (value.match(regex)) {
		return {
			error: true,
			message: `Please enter a value that does not start with the following characters: ${disallowedStart.join(
				', ',
			)}.`,
		};
	}
};
```

#### onChange

When passing an `onChange` function to this component be aware that it must accept an object with the keys `formattedValue` and `rawValue`. The matching values from the input component will then be passed to this function to achieve the desired results.

Example:

```javascript
({ formattedValue, rawValue }) => {
	console.log(
		`-> The formatted value of "${formattedValue}" will be submitted as the raw value of "${rawValue}".`,
	);
};
```

## Accessibility

This component has a few accessibility features built-in.

The clear button will set focus back to the input area when clicked.

If your optional validation function returns an error, the message will be announced when the field validates. Validation occurs on blur events.
