import { readFile } from "node:fs/promises";

async function instantiateWasm(name) {
  const [Module, binary] = await Promise.all([
    import(`./${name}.mjs`).then(({ default: Module }) => Module),
    readFile(new URL(`./${name}.wasm`, import.meta.url)),
  ]);

  return Module({
    instantiateWasm: async (info, receiveInstance) => {
      const { instance: wasm } = await WebAssembly.instantiate(binary, info);
      receiveInstance(wasm);
    },
  });
}

export default instantiateWasm
