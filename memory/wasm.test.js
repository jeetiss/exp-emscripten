import { describe, expect, test } from "vitest";
import { instantiateWasm } from "../wasm";

const lib = await instantiateWasm("memory");

export const createTests = (name, lib) => {
  describe(name, () => {
    test("should provide allocate and free functions", () => {
      expect(lib.allocate).toBeDefined();
      expect(lib.free).toBeDefined();
    });

    test("should fail on memory allocation", async () => {
      expect(() => lib.allocate(16777216)).toThrow();
      expect(() => lib.free()).not.toThrow();
    });

    test("should alloc small memory", async () => {
      expect(() => lib.allocate(40)).not.toThrow();
      expect(() => lib.free()).not.toThrow();
    });
  });
};

createTests("wasm", lib);
