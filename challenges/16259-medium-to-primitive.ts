// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type PersonInfo = {
  name: "Tom";
  age: 30;
  married: false;
  addr: {
    home: "123456";
    phone: "13111111111";
  };
  hobbies: ["sing", "dance"];
  readonlyArr: readonly ["test"];
  fn: () => any;
};

type ExpectedResult = {
  name: string;
  age: number;
  married: boolean;
  addr: {
    home: string;
    phone: string;
  };
  hobbies: [string, string];
  readonlyArr: readonly [string];
  fn: Function;
};

type cases = [Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>];

// ============= Your Code Here =============
type ValueToPrimitive<T> = T extends string
  ? string
  : T extends boolean
  ? boolean
  : T extends number
  ? number
  : T extends Function
  ? Function
  : ToPrimitive<T>;

type ToPrimitive<T> = T extends object
  ? {
      [key in keyof T]: ValueToPrimitive<T[key]>;
    }
  : T;
