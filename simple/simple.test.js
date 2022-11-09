import { beforeAll, expect, test } from "vitest";
import instantiate from "../wasm";

let lib;
beforeAll(async () => {
  lib = await instantiate("simple");
});

test("simple lerp", async () => {
  expect(lib.print).toBeDefined();
  expect(lib.print()).toBe(0);
});
