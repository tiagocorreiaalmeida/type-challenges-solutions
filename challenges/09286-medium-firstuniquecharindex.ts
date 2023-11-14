// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
  Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
  Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"aaa">, -1>>
];

// ============= Your Code Here =============
type FirstUniqueCharIndex<
  T extends string,
  SeenValues extends string[] = []
> = T extends `${infer Head}${infer Tail}`
  ? Tail extends `${string}${Head}${string}`
    ? FirstUniqueCharIndex<Tail, [...SeenValues, Head]>
    : Head extends SeenValues[number]
    ? FirstUniqueCharIndex<Tail, [...SeenValues, Head]>
    : SeenValues["length"]
  : -1;
