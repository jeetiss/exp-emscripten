import { describe, expect, test } from "vitest";
import { instantiateWasm } from "../wasm";

const lib = await instantiateWasm("recursion");

export const createTests = (name, lib) => {
  describe(name, () => {
    test("Access WebAssembly from cpp", async () => {
      expect(lib.checkWebAssembly).toBeDefined();
      expect(lib.checkWebAssembly()).toBe(true);
    });
  });
};

createTests("wasm", lib);
