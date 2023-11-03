// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<
      Camelize<{
        some_prop: string;
        prop: { another_prop: string };
        array: [
          { snake_case: string },
          { another_element: { yet_another_prop: string } },
          { yet_another_element: string }
        ];
      }>,
      {
        someProp: string;
        prop: { anotherProp: string };
        array: [
          { snakeCase: string },
          { anotherElement: { yetAnotherProp: string } },
          { yetAnotherElement: string }
        ];
      }
    >
  >
];

// ============= Your Code Here =============
type Separator = "_";
type ToCamelCase<T> = T extends `${infer Head}${Separator}${infer Tail}`
  ? `${Head}${ToCamelCase<Capitalize<Tail>>}`
  : T;

type CamelizeArray<T extends unknown[]> = T extends [infer Head, ...infer Tail]
  ? [Camelize<Head>, ...CamelizeArray<Tail>]
  : T;

type Camelize<T> = T extends object
  ? {
      [key in keyof T as ToCamelCase<key>]: T[key] extends unknown[]
        ? CamelizeArray<T[key]>
        : Camelize<T[key]>;
    }
  : T;

type A = Camelize<{
  some_prop: string;
  prop: { another_prop: string };
  array: [
    { snake_case: string },
    { another_element: { yet_another_prop: [{ x: 1 }] } },
    { yet_another_element: string }
  ];
}>;

const teste: A = {
  array: [
    { snakeCase: "a" },
    { anotherElement: { yetAnotherProp: [{ x: 1 }] } },
    { yetAnotherElement: "a" },
  ],
};
