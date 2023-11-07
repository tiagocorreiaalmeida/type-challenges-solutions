// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type foo = {
  foo: string;
  bars: [{ foo: { bar: { foo: string } } }];
};

type Foo = {
  Foo: string;
  Bars: [
    {
      Foo: { Bar: { Foo: string } };
    }
  ];
};

type cases = [Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>];

// ============= Your Code Here =============
type CapitalizeArray<T> = T extends [infer Head, ...infer Tail]
  ? [CapitalizeNestObjectKeys<Head>, ...CapitalizeArray<Tail>]
  : T;

type CapitalizeNestObjectKeys<T> = T extends object
  ? {
      [Key in keyof T as Key extends string
        ? Capitalize<Key>
        : Key]: T[Key] extends any[]
        ? CapitalizeArray<T[Key]>
        : CapitalizeNestObjectKeys<T[Key]>;
    }
  : T;
