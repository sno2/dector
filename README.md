# Dector

[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/dector/mod.ts)

A zero-dependency vector module for Deno.

## Usage

```ts
import { Dector } from "https://deno.land/x/dector";

const myDector1 = new Dector(2, 3);
const myDector2 = new Dector(5, -4);

const dotProduct: number = myDector1.dotProduct(myDector2);
const crossProduct: Dector = myDector1.crossProduct(myDector2)!; // ! used because `crossProduct` may return null

// these methods modify the given `Dector` and return itself which allows chaining
myDector1.multiply(6).add(myDector2).subtract(myDector2).negate();
```

## Docs

Check out the full documentation by clicking the button below!

[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/dector/mod.ts)

## Contributions

Contributions are welcome, but make sure you provide a descriptive title and description to limit the number of questions and further increase the cohesion of communication. Also, make sure you run `deno test` before submitting any pull requests to make sure that your code passes the tests. Of course, you have to modify the `tests/dector.test.ts` file if you are adding any features or changes.
