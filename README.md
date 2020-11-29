# paint-by-the-numbers

A utility based on Microsoft Excel's "Color Scales" conditional formatter for number cells.

## Usage

### Constructor

You can use the `Painter` class like this:

```javascript
const Painter = require("paint-by-the-numbers");

let p = new Painter(min, max, ...colorStops);
```

where:

- `min`: the minimum numeric value of the range
- `max`: the maximum numeric value of the range
- `colorStops`: a comma-separated list of colors (min. 2). May be any RGB(A) string that can be parsed by [Qix-'s color-string package](https://github.com/Qix-/color-string) as a color.

For example:

```javascript
const Painter = require("paint-by-the-numbers");

let p = new Painter(0, 100, "#F00", "#0F0");
```

### getRGBA(value)

Accepts a number as an argument, and outputs the color as an `rgba()` string:

e.g.

```javascript
let color = p.getRGBA(50);
console.log(color); // Prints 'rgba(128, 128, 0, 1)'
```

Values less than `min` are set to `min`, and values greater than `max` are set to `max`.

## Adding more color stops

You can add more than 2 colors in the `Painter` constructor. The first and last colors define the colors for the minimum and maximum values respectively. Any other colors in between are used to divide the range in equal segments.

For example, if you write:

```javascript
let p = new Painter(0, 100, "#F00", "#0F0", "#00F");
```

then any value between 0 (or lower) and 50 will be in the linear gradient range between <span style="color: #F00">#F00</span> and <span style="color: #0F0">#0F0</span>. Any value between 50 and 100 will be in the linear gradient range between <span style="color: #0F0">#0F0</span> and <span style="color: #00F">#00F</span>.

## Credits

Thanks to [Qix-](https://github.com/Qix-) for his [color-string](https://github.com/Qix-/color-string) node package.
