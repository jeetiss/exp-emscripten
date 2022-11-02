import { beforeAll, expect, test } from "vitest";
import { readFile } from "node:fs/promises";
import Module from "./builded.mjs";

let lib;
beforeAll(async () => {
  lib = await Module({
    instantiateWasm: async (info, receiveInstance) => {
      const binary = await readFile(new URL("./builded.wasm", import.meta.url));
      const { instance: wasm } = await WebAssembly.instantiate(binary, info);

      receiveInstance(wasm);
    },
  });
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
