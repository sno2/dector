import {
  assertEquals,
  assertStrictEquals,
} from "https://deno.land/std@0.70.0/testing/asserts.ts";

import { Dector } from "../mod.ts";

Deno.test("Dector.components", () => {
  const myDector = new Dector(2, 3);

  assertEquals(myDector.components, [2, 3]);
});

Deno.test("Dector.dimension", () => {
  const myDector = new Dector(2, 3);

  assertStrictEquals(myDector.dimension, 2);
});

Deno.test("Dector.[dimensionName]", () => {
  const myDector = new Dector(
    ...Dector.supportedDimensionNames.map((_, index) => index)
  );

  for (let i = 0; i < Dector.supportedDimensionNames.length; i++) {
    const supportedDimensionName: string = Dector.supportedDimensionNames[i];
    const myObject = myDector.toObject();
    assertStrictEquals(myObject[supportedDimensionName], i);
    myObject[supportedDimensionName]++;
    assertStrictEquals(myObject[supportedDimensionName], i + 1);
  }
});

Deno.test("Dector.length", () => {
  const myDector = new Dector(2, 3);
  assertStrictEquals(myDector.length, Math.sqrt(13));
});

Deno.test("Dector.add()", () => {
  const myDector = new Dector(2, 3);
  myDector.add(new Dector(1, 2));
  assertStrictEquals(myDector.x, 3);
  assertStrictEquals(myDector.y, 5);
});

Deno.test("Dector.subtract()", () => {
  const myDector = new Dector(2, 3);
  myDector.subtract(new Dector(1, 2));
  assertStrictEquals(myDector.x, 1);
  assertStrictEquals(myDector.y, 1);
});

Deno.test("Dector.multiply()", () => {
  const myDector = new Dector(2, 3);
  myDector.multiply(2);
  assertStrictEquals(myDector.x, 4);
  assertStrictEquals(myDector.y, 6);
});

Deno.test("Dector.dotProduct()", () => {
  const myDector = new Dector(2, 3);
  assertStrictEquals(myDector.dotProduct(new Dector(5, 6)), 28);
  assertStrictEquals(myDector.dotProduct(new Dector(3, 10)), 36);
});

Deno.test("Dector.crossProduct()", () => {
  assertStrictEquals(new Dector(2, 3).crossProduct(new Dector(2, 3)), null);
  const myDector = new Dector(1, 2, 3);
  assertEquals(myDector.crossProduct(new Dector(4, 5, 6))?.components, [
    -3,
    6,
    -3,
  ]);
});

Deno.test("Dector.negate()", () => {
  const myDector = new Dector(1, 2, 3);
  myDector.negate();
  assertEquals(myDector.components, [-1, -2, -3]);
});
