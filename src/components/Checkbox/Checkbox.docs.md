## Purpose

The `Checkbox` component is used to present the user with a boolean selection — on/off, yes/no, true/false, etc — and is also used as part of the `CheckboxGroup` component where users can select multiple items from a group of options.

A single boolean checkbox is often used in forms where the user must agree to a policy or to opt in to certain functionality.

## Implementation

When using an `onChange` callback function, you will have access to the entire checkbox object. You may then access the individual properties from there. For example, if you need to know the current checked state of the checkbox, use `checkbox.checked` in your function.
