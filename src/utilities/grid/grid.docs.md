## Purpose

The grid establishes how visual elements should be positioned horizontally within a layout.

## Usage

The grid consists of two element types — a **grid container** and **grid items**. A single grid container should contain multiple grid items.

Our grid properties vary depending on how wide the grid is at any given time. We’ve adopted fixed numbers of columns at each breakpoint to ensure that our layouts are flexible without compromising consistency.

### Columns per grid width

| Breakpoint name and id | Width range (in px) | Total number of columns |
| ---------------------- | ------------------- | ----------------------- |
| Small — `sm`           | 0 - 640             | 4                       |
| Medium — `md`          | 641 - 1024          | 6                       |
| Large — `lg`           | 1025 - ∞            | 12                      |

## Implementation

### Grid container

A grid container is implemented by applying the CSS class `pds-grid` to a `<div>` or another HTML sectioning element such as `<main>` or `<section>`. A grid container should contain only grid items as direct descendants.

### Grid items

Grid items must always be direct descendants of the grid container and are typically made up of `<div>` elements. However, there may be use cases where other HTML sectioning elements could be considered such as `<aside>`, `<article>`, or `<section>`.

Each grid item will contain the base class `pds-grid-item`, as well as a modifier class for each breakpoint based on the following convention: `pds-grid-item--[breakpoint]-[columns]`.

For example, a grid item that is full-width at small and 50% at medium and large would have the following markup.

```

<div className="pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-3 pds-grid-item--lg-6"></div>

```

**Note:** Grid items that have missing or invalid modifier classes for each breakpoint will default to the maximum column width for that breakpoint.
