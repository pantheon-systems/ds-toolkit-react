## Purpose

This component is used to facilitate the horizontal layout of items to align with our grid. It can be used to create an entire main content layout (such as content with a sidebar), or as a row within another layout.

The items will be displayed as horizontal columns at medium and large viewport sizes, and stacked as full-width rows at small.

## Implementation

<br/>

### Content Slots

This component uses the concept of named slots, which act as content placeholders. The root tag of each child element should have an attribute named `slot` with the value of either `first-item` or `second-item`, depending on where you would like the component to be placed within the layout. Each slot can contain multiple child elements.

Child elements without a slot, or that have a slot value that is not allowed for this component, will not be rendered.

### Layout Variants

This component takes a `layoutVariant` prop which determines the width for each item at medium and large viewport sizes (they will always stack full-width at small). All variants will contain a gap between items.

Options include:

- `equal` : Both items will span half of the total width.
- `one-third-start`: The first item will span one-third of the total width and the second item will span two-thirds.
- `one-third-end`: The first item will span two-thirds of the total width and the second item will span one-third.

<br/>

**Note:** This is purely a layout component and does not contain any visual styles. The sample "card" and "item" components below are for demonstration purposes only.
