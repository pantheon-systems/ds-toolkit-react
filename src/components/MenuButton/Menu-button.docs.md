## Purpose

A menu button is a button that shows a menu or list of actions. The items within the menu are typically actions that trigger operations within the application.

## Usage

A menu button's menu items should be for triggering actions within the application. They should not be used as a navigation menu, see the [navigation menu](#) component for that purpose.

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
			<td>Open the menu and focus on the first focusable menu item</td>
		</tr>
		<tr>
			<td>Up arrow</td>
			<td>Open the menu and focus on the last focusable menu item</td>
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
