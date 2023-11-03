// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

// Edge cases
const noCharsOutput = join("-")();
const oneCharOutput = join("-")("a");
const noDelimiterOutput = join("")("a", "b", "c");

// Regular cases
const hyphenOutput = join("-")("a", "b", "c");
const hashOutput = join("#")("a", "b", "c");
const twoCharOutput = join("-")("a", "b");
const longOutput = join("-")("a", "b", "c", "d", "e", "f", "g", "h");

type cases = [
  Expect<Equal<typeof noCharsOutput, "">>,
  Expect<Equal<typeof oneCharOutput, "a">>,
  Expect<Equal<typeof noDelimiterOutput, "abc">>,
  Expect<Equal<typeof twoCharOutput, "a-b">>,
  Expect<Equal<typeof hyphenOutput, "a-b-c">>,
  Expect<Equal<typeof hashOutput, "a#b#c">>,
  Expect<Equal<typeof longOutput, "a-b-c-d-e-f-g-h">>
];

// ============= Your Code Here =============

type Join<
  Parts extends readonly string[],
  Delimiter extends string
> = Parts extends [infer Head extends string, ...infer Tail extends string[]]
  ? Tail extends []
    ? Head
    : `${Head}${Delimiter}${Join<Tail, Delimiter>}`
  : "";

declare function join<Delimiter extends string>(
  delimiter: Delimiter
): <Parts extends readonly string[]>(...parts: Parts) => Join<Parts, Delimiter>;
