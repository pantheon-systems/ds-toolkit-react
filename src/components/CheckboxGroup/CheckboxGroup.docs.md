## Purpose

The `CheckboxGroup` component presents a user with a limited number of options where they may select more than one. This is useful fields that can accept more than one value. This component can also be used as a filtering mechanism for long lists or tables.

## Implementation

A `CheckboxGroup` instance uses the `options` prop to render the possible options. Each option in the array is an object with the following properties:

- `label` — The name of the option as presented to the user (required).
- `value` — The programmatic value the system will use to represent this option (required).
- `checked` — If the option is checked initially (optional, defaults to `false`).
- `disabled` — If the option is disabled initially (optional, defaults to `false`).

Example data array for the `options` prop:

```json
[
	{
		"label": "Alpha",
		"value": "alpha",
		"checked": true
	},
	{
		"label": "Beta",
		"value": "beta"
	},
	{
		"label": "Gamma",
		"value": "gamma"
	},
	{
		"label": "Delta",
		"value": "delta"
	},
	{
		"label": "Epsilon",
		"value": "epsilon",
		"disabled": true
	}
]
```
