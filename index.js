const colorString = require("color-string");

class Painter {
  constructor(min, max, ...colorStops) {
    this.min = min;
    if (this.min == null) {
      throw new Error("Painter is missing a min value!");
    }

    this.max = max;
    if (this.max == null) {
      throw new Error("Painter is missing a max value!");
    }

    this.range = max - min;
    if (this.range < 0) {
      this.range = -this.range;
    }

    if (colorStops.length < 2) {
      throw new Error("Painter needs at least 2 colors!");
    }
    this.colorStops = [];
    for (let stop of colorStops) {
      let rgbValue = colorString.get.rgb(stop);
      if (rgbValue == null) {
        throw new Error(`"${stop}" is not a valid color value!`);
      }

      this.colorStops.push(rgbValue);
    }

    this.segments = this.colorStops.length - 1;
  }

  getRGBA(value) {
    value = value <= this.min ? this.min : value >= this.max ? this.max : value;
    let relativePct = (value - this.min) / this.range;
    let segment = Math.max(Math.ceil(relativePct * this.segments), 1);

    let [minRed, minGreen, minBlue, minAlpha] = this.colorStops[segment - 1];
    let [maxRed, maxGreen, maxBlue, maxAlpha] = this.colorStops[segment];
    let weight = relativePct * this.segments - (segment - 1);

    let r = Math.round(weight * maxRed + (1 - weight) * minRed);
    let g = Math.round(weight * maxGreen + (1 - weight) * minGreen);
    let b = Math.round(weight * maxBlue + (1 - weight) * minBlue);
    let a = Math.round(weight * maxAlpha + (1 - weight) * minAlpha);

    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}

module.exports = Painter;
