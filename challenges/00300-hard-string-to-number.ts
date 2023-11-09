// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<ToNumber<"0">, 0>>,
  Expect<Equal<ToNumber<"5">, 5>>,
  Expect<Equal<ToNumber<"12">, 12>>,
  Expect<Equal<ToNumber<"27">, 27>>,
  Expect<Equal<ToNumber<"18@7_$%">, never>>
];

// ============= Your Code Here =============
type Numbers = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";

type IsStringNumber<T> = T extends `${infer Head}${infer Tail}`
  ? Head extends Numbers
    ? Tail extends ""
      ? true
      : IsStringNumber<Tail>
    : false
  : false;

type AccPlaceholder = "+";

type GetNumber<
  NumberAsString extends string,
  Acc extends AccPlaceholder[] = []
> = NumberAsString extends `${Acc["length"]}`
  ? Acc["length"]
  : GetNumber<NumberAsString, [...Acc, AccPlaceholder]>;

type ToNumberV1<S extends string> = IsStringNumber<S> extends true
  ? GetNumber<S>
  : never;

type ToNumber<S extends string> = S extends `${infer Num extends number}`
  ? Num
  : never;
