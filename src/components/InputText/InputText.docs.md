## Purpose

The `InputText` component allows the creation of a basic text focused input field in order to accept data from the user. This implementation provides the following standard HTML input types: text, number, email, tel, url, search, and textarea.

This input field is comprised of three sections: an optional decorator, the input area, and optional accessories.

The decorator section will show a predefined icon or symbol depending on the type being used. Currently only the search type has a decorator.

The accessories section contains the clear button, visible only when a value is present in the input area, to instantly empty the input area when desired. It also includes space for a counter, such as a character or word counter.

_NOTE:_ If you would like an input field that formats the data in specific ways during input please refer to the `InputFormatted` component.

## Usage

### Types

Below is a description of each available type of input and when it is appropriate to use each type.

<table width="100%">
<thead>
<tr>
<th style="width: 20%">Type</th>
<th>Description/Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td>text</td>
<td>
	A single-line text field.
</td>
</tr>
<tr>
<td>number</td>
<td>
	A control for entering a number. Displays a spinner — a set of buttons to increment and decrement the value.
	
	Use only for numbers, not for numeric strings such as credit card numbers.
</td>
</tr>
<tr>
<td>email</td>
<td>
	A field accepting an e-mail address. On some devices with dynamic keyboards the keyboard will be adapted for entry of e-mail addresses.
</td>
</tr>
<tr>
<td>tel</td>
<td>
	A field for entering a telephone number. On some devices with dynamic keyboards the keyboard will be adapted and show a telephone keypad.
	
	To have the input formatted in specific ways, such as USA telephone format, please use the `InputFormatted` component.
</td>
</tr>
<tr>
<td>url</td>
<td>
	A field for entering URL. On some devices with dynamic keyboards the keyboard will be adapted for entry of URLs.
</td>
</tr>
<tr>
<td>search</td>
<td>
	A single-line field for entering search strings.
	
	Use only in forms and actions that perform an actual search or filtering operation.
</td>
</tr>
<tr>
<td>textarea</td>
<td>
	A multi-line field for entering text.
</td>
</tr>
</tbody>
</table>

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
	const validValues = ['alpha', 'beta', 'gamma'];

	// if input value is not a permitted Greek letter
	if (!validValues.includes(value.toLowerCase()) && value.length > 0) {
		return {
			error: true,
			message: 'Please enter one of the first three Greek letters.',
		};
	}
};
```

## Accessibility

This component has a few accessibility features built-in.

The clear button will set focus back to the input area when clicked.

If your optional validation function returns an error, the message will be announced when the field validates. Validation occurs on blur events.
