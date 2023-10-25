// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsPalindrome<"abc">, false>>,
  Expect<Equal<IsPalindrome<"b">, true>>,
  Expect<Equal<IsPalindrome<"abca">, false>>,
  Expect<Equal<IsPalindrome<"abcba">, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>
];

// ============= Your Code Here =============
type ToString<T extends string | number> = `${T}`;

type ReverseValue<T extends string> = T extends `${infer Head}${infer Tail}`
  ? `${ReverseValue<Tail>}${Head}`
  : T;

type IsPalindrome<T extends string | number> = ToString<T> extends ReverseValue<
  ToString<T>
>
  ? true
  : false;
