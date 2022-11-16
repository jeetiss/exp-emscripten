import { instantiateAsm } from "../wasm";
import { createTests } from "./wasm.test";

const lib = await instantiateAsm("memory");

createTests("asm", lib);
