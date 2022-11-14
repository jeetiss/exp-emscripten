import { readFile } from "node:fs/promises";

async function instantiateAsm(name) {
  const Module = await import(`./${name}_asm.mjs`).then(
    ({ default: Module }) => Module
  );

  return Module();
}

async function instantiateWasm(name) {
  const [Module, binary] = await Promise.all([
    import(`./${name}_wasm.mjs`).then(({ default: Module }) => Module),
    readFile(new URL(`./${name}_wasm.wasm`, import.meta.url)),
  ]);

  return Module({
    instantiateWasm: async (info, receiveInstance) => {
      const { instance: wasm } = await WebAssembly.instantiate(binary, info);
      receiveInstance(wasm);
    },
  });
}

export { instantiateWasm, instantiateAsm };
