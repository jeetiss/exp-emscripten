import { beforeAll, expect, test } from "vitest";
import { readFile } from "node:fs/promises";

async function instantiateWasm(name) {
  const [Module, binary] = await Promise.all([
    import(`../${name}.mjs`).then(({ default: Module }) => Module),
    readFile(new URL("../interop.wasm", import.meta.url)),
  ]);

  return Module({
    instantiateWasm: async (info, receiveInstance) => {
      const { instance: wasm } = await WebAssembly.instantiate(binary, info);
      receiveInstance(wasm);
    },
  });
}

let lib;
beforeAll(async () => {
  lib = await instantiateWasm("interop");
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
