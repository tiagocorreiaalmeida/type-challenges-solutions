// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>
];

// @ts-expect-error
type error = MyOmit<Todo, "description" | "invalid">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

type MyExclude<T, U> = T extends U ? never : T;
type MyPick<T, U extends keyof T> = {
  [key in keyof T as key extends U ? key : never]: T[key];
};

// ============= Your Code Here =============
type MyOmit<T, K extends keyof T> = MyPick<T, MyExclude<keyof T, K>>;
