## Purpose

The `LayoutGlobal` component allows the easy implementation of the core content layout for the Pantheon dashboard.

## Implementation

This component uses the concept of named slots, which act as content placeholders. The root tag of each child element should have an attribute named `slot` with one of the values described below, depending on where you would like the component to be placed within the layout. Each slot can contain multiple child elements.

Child elements without a slot, or that have a slot value that is not allowed for this component, will not be rendered.

The slot names and uses are as follows:

- `main-nav` — The main navigation area.
- `main-content-header` — The header area of the main content area.
- `main-content` — The main content area.
