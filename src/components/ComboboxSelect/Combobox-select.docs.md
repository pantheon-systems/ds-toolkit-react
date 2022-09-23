## Purpose

A select-only combobox is a type of input field that has a popup showing available options from which one can be selected.

## Usage

### Select options data

The shape of the data passed to the select-only combobox component for options is an array of the following item shape:

```json
{
	"label": "Admin",
	"value": "admin-level"
}
```

In the above "value" is optional but recommended. If omitted the component will return the label as its value.

## Accessibility

### Keyboard navigation

#### Menu button

<table width="100%">
	<thead>
		<tr>
			<th style="width: 20%">Key</th>
			<th>Function</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Down Arrow<br/>Space<br/>Enter</td>
			<td>Open the listbox and focus on the first focusable option or the currently selected one</td>
		</tr>
		<tr>
			<td>Up arrow</td>
			<td>Open the listbox and focus on the last focusable option or the currently selected one</td>
		</tr>
	</tbody>
</table>

#### Menu

<table width="100%">
	<thead>
		<tr>
			<th style="width: 20%">Key</th>
			<th>Function</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Enter</td>
			<td>
				- Marks the current option as selected
				- Then closes the listbox
				- And sets focus on the combobox
			</td>
		</tr>
		<tr>
			<td>Escape</td>
			<td>
				- Closes the listbox
				- And sets focus on the combobox
			</td>
		</tr>
		<tr>
			<td>Up arrow</td>
			<td>
				- Moves the focus to the previous option
				- If focus is on the first option, focus moves to the last option
			</td>
		</tr>
		<tr>
			<td>Down arrow</td>
			<td>
				- Moves the focus to the next option
				- If focus is on the last option, focus moves to the first option
			</td>
		</tr>
		<tr>
			<td>Home</td>
			<td>Moves the focus to the first option</td>
		</tr>
		<tr>
			<td>End</td>
			<td>Moves the focus to the last option</td>
		</tr>
		<tr>
			<td>
				A-Z<br/>
				a-z
			</td>
			<td>
				- Moves the focus to the next option with a label that starts with the typed character if such an option exists
				- Otherwise, focus does not move
			</td>
		</tr>
	</tbody>
</table>
