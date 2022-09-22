## Purpose

This component is used to facilitate the horizontal layout of items to align with our grid. It can be used to create an entire main content layout (such as content with a sidebar), or as a row within another layout.

The items will be displayed as horizontal columns at medium and large viewport sizes, and stacked as full-width rows at small.

## Implementation

<br/>

### Content Slots

This layout component uses the concept of named slots, which act as content placeholders. The root tag of each child component should have a prop named `slot` with the value of either `first-item` or `second-item` depending on where you would like the component to be placed within the layout. Each slot can contain multiple child components.

Child components without a slot prop, or that have a slot value that is not allowed for this component, will not be rendered.

### Layout Variants

This component takes a `layoutVariant` prop which determines the width for each item at medium and large viewport sizes (they will stack full-width at small). All variants will contain a gap between items.

Options include:

- `equal` : Both items will span half of the total width with a gap between items.
- `one-third-start`: The first item will span one-third of the total width and the second item will span two-thirds.
- `one-third-end`: The first item will span two-thirds of the total width and the second item will span one-third.
