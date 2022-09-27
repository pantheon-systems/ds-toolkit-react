## Purpose

The split variation of a button is essentially a group made of a button to easily access a primary action, and a menu button to show all available actions. This can be particularly useful to conserve space when showing actionable content in rows.

## Usage

A split button's action items should be for triggering actions within the application. Items that navigate to a new location or page are acceptable but should be used sparingly.

## Action items data

The shape of the data passed to the split button component for action items is an array of the following items:

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

Keyboard navigation is identical to menu button.
