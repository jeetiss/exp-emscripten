import {createTests } from "./wasm.test.js";
import { instantiateAsm } from "../wasm";

const lib = await instantiateAsm("simple");

createTests('asm', lib);
