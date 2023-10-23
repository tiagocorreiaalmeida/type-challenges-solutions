// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];

// ============= Your Code Here =============
type RemoveFromArray<T extends unknown[], ValueToRemove> = T extends [
  infer Head,
  ...infer Tail
]
  ? Head extends ValueToRemove
    ? RemoveFromArray<Tail, ValueToRemove>
    : [Head, ...RemoveFromArray<Tail, ValueToRemove>]
  : T;

type Without<T extends unknown[], U> = U extends unknown[]
  ? RemoveFromArray<T, U[number]>
  : RemoveFromArray<T, U>;
