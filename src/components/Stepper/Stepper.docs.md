## Purpose

The Stepper displays progress during a linear process which requires users to complete one step in order to move on to the next. It informs users about which steps have been completed, which step they are currently on, and which steps remain.

Steppers should only be used for processes that contain between 3 to 5 steps.

Users can navigate to previously completed steps by clicking the stepper, but future steps are not able to be selected until the prior step has been completed.

## Implementation

The shape of the data passed to the Stepper component is an array of `steps`, with a minimum of 3 and maximum of 5. Each step in the array is an object with the following properties:

- `label` — A short string that describes the step — required.
- `callback` — A function to navigate back to the step once it has been completed — required.
- `isCurrent` — A boolean to indicate which step is the current step.
- `hasError` — A boolean to indicate if there is an error on the current step.

### Example data array

```json
[
  {
    "label": "Part A",
    "callback": () => { ... },
  },
  {
    "label": "Part B",
    "callback": () => { ... },
    "isCurrent": true,
    "hasError": true,
  },
  {
    "label": "Part C",
    "callback": () => { ... },
  },
];
```
