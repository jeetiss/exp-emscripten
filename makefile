build_wasm=emcc --bind -Os -g0 --closure 1 $^ -o $@
build_asmjs=emcc --bind -Os -g0 --closure 1 --memory-init-file 0 -sWASM=0 $^ -o $@

.PHONY: all

all: interop_wasm.mjs interop_asm.mjs \
	simple_asm.mjs simple_wasm.mjs \
	recursion_asm.mjs recursion_wasm.mjs

interop_asm.mjs: 
	$(build_asmjs) ./interop/*.cpp

recursion_asm.mjs:
	$(build_asmjs) ./recursion/*.cpp

simple_asm.mjs: 
	$(build_asmjs) ./simple/*.cpp

interop_wasm.mjs:
	$(build_wasm) ./interop/*.cpp

simple_wasm.mjs:
	$(build_wasm) ./simple/*.cpp

recursion_wasm.mjs:
	$(build_wasm) ./recursion/*.cpp
