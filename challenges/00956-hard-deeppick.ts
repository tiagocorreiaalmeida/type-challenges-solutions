// ============= Test Cases =============
import type { Equal, Expect, UnionToIntersection } from "./test-utils";

type Obj = {
  a: number;
  b: string;
  c: boolean;
  obj: {
    d: number;
    e: string;
    f: boolean;
    obj2: {
      g: number;
      h: string;
      i: boolean;
    };
  };
  obj3: {
    j: number;
    k: string;
    l: boolean;
  };
};

type cases = [
  Expect<Equal<DeepPick<Obj, "">, unknown>>,
  Expect<Equal<DeepPick<Obj, "a">, { a: number }>>,
  Expect<Equal<DeepPick<Obj, "a" | "">, { a: number } & unknown>>,
  Expect<
    Equal<DeepPick<Obj, "a" | "obj.e">, { a: number } & { obj: { e: string } }>
  >,
  Expect<
    Equal<
      DeepPick<Obj, "a" | "obj.e" | "obj.obj2.i">,
      { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }
    >
  >
];

// ============= Your Code Here =============
type PathSeparator = ".";
type DeepPick<T, Path> = UnionToIntersection<
  Path extends keyof T
    ? Record<Path, T[Path]>
    : Path extends `${infer Head}${PathSeparator}${infer Tail}`
    ? Head extends keyof T
      ? Record<Head, DeepPick<T[Head], Tail>>
      : never
    : never
>;
