import { beforeAll, expect, test } from "vitest";
import instantiate from "../wasm";

let lib;
beforeAll(async () => {
  lib = await instantiate("simple");
});

test("simple lerp", async () => {
  expect(lib.lerp).toBeDefined();
  expect(lib.lerp(5, 10, 0.5)).toBe(7.5);
});
