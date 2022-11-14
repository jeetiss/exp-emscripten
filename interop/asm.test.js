import { instantiateWasm } from "../wasm";
import { createTests } from "./wasm.test";

const lib = await instantiateWasm("interop");

createTests("asm", lib);
