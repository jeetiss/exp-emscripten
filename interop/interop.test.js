import { beforeAll, expect, test } from "vitest";
import instantiate from "../wasm";

let lib;
beforeAll(async () => {
  lib = await instantiate("interop");
});

test("cpp <- js interop", async () => {
  expect(lib.runCpp(4)).toBe(42);
  expect(lib.runCpp(2)).toBe(42);
});

test("cpp <-> js interop", async () => {
  lib.setFunc(lib.Callback.implement({ fn: (value) => value * 10 }));
  expect(lib.runCpp(4)).toBe(40);
  expect(lib.runCpp(2)).toBe(20);
});

test("cpp <-> js unsetting function", async () => {
  lib.setFunc(lib.Callback.implement({ fn: (value) => value * 0 }));
  lib.unsetFunc();
  expect(lib.runCpp(-1)).toBe(42);
});
