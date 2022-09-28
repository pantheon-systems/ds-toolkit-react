## Purpose

The split variation of a button consists of a button to access a primary action, grouped with a menu button to show all available actions. This can be particularly useful to conserve space when showing actionable content in rows.

## Usage

A split button's action items should be for triggering actions within the application. Items that navigate to a new location or page are acceptable but should be used sparingly.

## Action items data

The shape of the data passed to the split button component for action items is an array of the following item types:

### Standard action item

```json
{
	"label": "Enable Autopilot",
	"callback": () => { ... } // function to execute when menu item is activated/clicked/tapped
}
```

### Navigation item (with React Router)

If an action item should navigate please use React Router's programmatic method in the action item's callback function. See example below. [Read more about React Router's `useNavigate` API](https://reactrouter.com/en/main/hooks/use-navigate).

```js
/* Required import */
import { useNavigate } from 'react-router-dom';
```

```json
{
	"label": "View report",
	"callback": () => {
			navigate(destinationURL);
		} // function to execute when menu item is activated/clicked/tapped
}
```

## Accessibility

### Keyboard navigation

#### Actions menu button

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
			<td>Open the menu and focus on the first focusable menu item</td>
		</tr>
		<tr>
			<td>Up arrow</td>
			<td>Open the menu and focus on the last focusable menu item</td>
		</tr>
	</tbody>
</table>

#### Actions menu

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
				- Activates the menu item
				- Then closes the menu
				- And sets focus on the menu button
			</td>
		</tr>
		<tr>
			<td>Escape</td>
			<td>
				- Closes the menu
				- And sets focus on the menu button
			</td>
		</tr>
		<tr>
			<td>Up arrow</td>
			<td>
				- Moves the focus to the previous menu item
				- If focus is on the first menu item, focus moves to the last menu item
			</td>
		</tr>
		<tr>
			<td>Down arrow</td>
			<td>
				- Moves the focus to the next menu item
				- If focus is on the last menu item, focus moves to the first menu item
			</td>
		</tr>
		<tr>
			<td>Home</td>
			<td>Moves the focus to the first menu item</td>
		</tr>
		<tr>
			<td>End</td>
			<td>Moves the focus to the last menu item</td>
		</tr>
		<tr>
			<td>
				A-Z<br/>
				a-z
			</td>
			<td>
				- Moves the focus to the next menu item with a label that starts with the typed character if such an item exists
				- Otherwise, focus does not move
			</td>
		</tr>
	</tbody>
</table>
