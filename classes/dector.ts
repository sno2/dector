export class Dector {
  public static supportedDimensionNames = ["x", "y", "z", "w", "p", "r"];
  public components: number[];
  public readonly dimension: number = 0;

  // Ah, so easy to have typescript.
  constructor(...components: number[]) {
    this.components = components;
    this.dimension = components.length;
  }

  // TODO: Make letter-based gets & sets return `null` instead of `undefined` if there is not a component for that index.

  get x(): number {
    return this.components[0];
  }

  set x(newX: number) {
    this.components[0] = newX;
  }

  get y(): number {
    return this.components[1];
  }

  set y(newY: number) {
    this.components[1] = newY;
  }

  get z(): number {
    return this.components[2];
  }

  set z(newZ: number) {
    this.components[2] = newZ;
  }

  get w(): number {
    return this.components[3];
  }

  set w(newW: number) {
    this.components[3] = newW;
  }

  get p(): number {
    return this.components[4];
  }

  set p(newP: number) {
    this.components[4] = newP;
  }

  get r(): number {
    return this.components[5];
  }

  set r(newP: number) {
    this.components[5] = newP;
  }

  /**
   * Gives the length, also known as magnitude, of the super `Dector`.
   * @returns the length of the current `Dector object`
   */
  get length(): number {
    return Math.sqrt(this.dotProduct(this)); // thanks to Sal Khan for teaching me this black magic xD
  }

  // TODO: Add check for if the compared `Dector`s have the same dimensions in multiple methods.
  // TODO: Refactor `for const dector of dectors` to just using reduces.

  /**
   * Adds this `Dector`'s components by all the `Dector`s in the tuple parameter.
   * @param dectors a tuple of `Dector`s
   * @returns this
   */
  public add(...dectors: Dector[]): this {
    for (const dector of dectors) {
      for (let i = 0; i < this.components.length; i++) {
        this.components[i] += dector.components[i];
      }
    }

    return this;
  }

  /**
   * Subtracts this `Dector`'s components by all the `Dector`s in the tuple parameter.
   * @param dectors a tuple of `Dector`s
   * @returns this
   */
  public subtract(...dectors: Dector[]): this {
    for (const dector of dectors) {
      for (let i = 0; i < this.components.length; i++) {
        this.components[i] -= dector.components[i];
      }
    }

    return this;
  }

  /**
   * Multiplies the `Dector`'s components by all numbers within a scalar tuple.
   * @returns this
   */
  public multiply(...scalars: number[]): this {
    const scalarsSum = scalars.reduce((a, b) => a + b, 0);

    for (let i = 0; i < this.components.length; i++) {
      this.components[i] *= scalarsSum;
    }

    return this;
  }

  /**
   * Calculates and returns the dot product of the current `Dector` object and parameter `Dector`.
   * @param dector2 the second dector in the dot product formula
   * @returns `number` dot product
   */
  public dotProduct(dector2: Dector): number {
    let dotProduct = 0;
    for (let i = 0; i < this.components.length; i++) {
      dotProduct += this.components[i] * dector2.components[i];
    }
    return dotProduct;
  }

  /**
   * Calculates and returns the cross product of the current `Dector` object and parameter `Dector`.
   * @param dector2 the second dector in the cross product formula
   * @returns `number` cross product
   */
  public crossProduct(dector2: Dector): Dector | null {
    if (this.dimension !== 3 || this.dimension !== dector2.dimension) {
      return null;
    }

    const [x1, y1, z1] = this.components;
    const [x2, y2, z2] = dector2.components;

    return new Dector(y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2); // Thanks again, Sal!
  }

  /**
   * Negates the components of the current `Dector`.
   * @returns this
   */
  public negate(): this {
    for (let i = 0; i < this.components.length; i++) {
      this.components[i] = -this.components[i];
    }

    return this;
  }

  /**
   * Gives the components of the `Dector` object. Here is an example formatted output:
   *
   *     [
   *       [7, -3, 5]
   *     ]
   * @returns array with the `this.components` array inside
   */
  public toArray(): number[][] {
    return [this.components];
  }

  /**
   * Gives the components of the `Dector` object in an object with the keys as the dimension letter name. Here is an example output:
   *
   *     { x: 1, y: -7, z: 2, w: 23, p: -4, r: 65 }
   * @returns object of the dimension names as keys and their corresponding components as values
   */
  public toObject() {
    const componentObject: { [key: string]: number } = {};
    for (let i = 0; i < this.components.length; i++) {
      if (Dector.supportedDimensionNames[i]) {
        componentObject[Dector.supportedDimensionNames[i]] = this.components[i];
      } else {
        console.error(
          `Warning: Dimension \`${
            i + 1
          }\` does not have a letter name identifier (supports ${Dector.supportedDimensionNames.join(
            ", "
          )}).  Implicitly using the dimension number as the key (ex: \`{ 7: 3 }\` with the value of \`7\` being \`this.components[6]\`).  Try using \`Dector.toArray()\` instead.`
        );
        componentObject[i + 1] = this.components[i];
      }
    }
    return componentObject;
  }
}
