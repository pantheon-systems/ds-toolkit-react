## Purpose

The `RadioGroup` component presents a user with a set of options to select only one option from. This is useful for short lists of options, for longer lists a select field may be better suited.

## Implementation

A `RadioGroup` instance uses the `options` prop to know which options to present. This is an array of objects where each object has the shape as follows:

- `id` – A unique string to identify the option (required)
- `label` – The content to represent the option, usually a string (required)
- `value` – The programmatic value the system will use to represent this option (required)

Example:

```json
[
	{
		"id": "input-alpha-option-1",
		"label": "Option 1",
		"value": "option-1"
	},
	{
		"id": "input-alpha-option-2",
		"label": "Option 2",
		"value": "option-2"
	},
	{
		"id": "input-alpha-option-3",
		"label": "Option 3",
		"value": "option-3"
	}
]
```
