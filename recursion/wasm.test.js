import { beforeAll, expect, test } from "vitest";
import instantiate from "../wasm";

let lib;
beforeAll(async () => {
  lib = await instantiate("recursion");
});

test("Access WebAssembly from cpp", async () => {
  expect(lib.checkWebAssembly).toBeDefined();
  expect(lib.checkWebAssembly()).toBe(true);
});
