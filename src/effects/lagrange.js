/**
 * At least two points are needed to interpolate something.
 * @class Lagrange polynomial interpolation.
 * The computed interpolation polynomial will be reffered to as L(x).
 * @example
 * let l = new Lagrange(0, 0, 1, 1);
 * let index = l.addPoint(0.5, 0.8);
 * console.log(l.valueOf(0.1));
 *
 * l.changePoint(index, 0.5, 0.1);
 * console.log(l.valueOf(0.1));
 *
 * @see https://gist.github.com/dburner/8550030
 * @see http://jsfiddle.net/maccesch/jgU3Y/
 */
export default class Lagrange {

  constructor(x1, y1, x2, y2) {
    this.xs = [x1, x2];
    this.ys = [y1, y2];
    this.ws = [];
    this.updateWeights();
  }

  /**
   * Adds a new point to the polynomial. L(x) = y
   * @return {Number} The index of the added point. Used for changing the point. See changePoint.
   */
  addPoint(x, y) {
    this.xs.push(x);
    this.ys.push(y);
    this.updateWeights();
    return this.xs.length - 1;
  }

  /**
   * Recalculate barycentric weights.
   */
  updateWeights() {
    const len = this.xs.length;
    let weight;
    for (let j = 0; j < len; j += 1) {
      weight = 1;
      for (let i = 0; i < len; i += 1) {
        if (i !== j) {
          weight *= this.xs[j] - this.xs[i];
        }
      }
      this.ws[j] = 1 / weight;
    }
  }

  /**
   * Calculate L(x)
   */
  valueOf(x) {
    let a = 0;
    let b = 0;
    let c = 0;
    const len = this.xs.length;
    for (let j = 0; j < len; j += 1) {
      if (x !== this.xs[j]) {
        a = this.ws[j] / (x - this.xs[j]);
        b += a * this.ys[j];
        c += a;
      } else {
        return this.ys[j];
      }
    }
    return b / c;
  }

  addMultiPoints(arr) {
    const len = arr.length;
    for (let i = 0; i < len; i += 1) {
      if (arr[i][0] !== 0 && arr[i][0] !== 1) {
        this.addPoint(arr[i][1], arr[i][2]);
      }
    }
  }
}
