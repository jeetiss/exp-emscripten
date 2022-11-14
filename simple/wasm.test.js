import { describe, expect, test } from "vitest";
import { instantiateWasm } from "../wasm";

const lib = await instantiateWasm("simple");

export const createTests = (name, lib) => {
  describe(name, () => {
    test("simple print", async () => {
      expect(lib.print).toBeDefined();
      expect(lib.print()).toBe(0);
    });
  });
};

createTests("wasm", lib);
