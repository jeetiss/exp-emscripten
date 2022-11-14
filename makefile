CC=emcc

all: example_interop_asm example_interop_wasm example_simple_asm example_simple_wasm example_recursion_asm example_recursion_wasm

example_interop_asm:
	$(CC) ./interop/*.cc --bind -Os -g0 --closure 1 --memory-init-file 0 -sWASM=0 -o interop_asm.mjs

example_interop_wasm:
	$(CC) ./interop/*.cc --bind -Os -g0 --closure 1 -o interop_wasm.mjs

example_simple_asm:
	$(CC) ./simple/*.cpp --bind -Os -g0 --closure 1 --memory-init-file 0 -sWASM=0 -o simple_asm.mjs

example_simple_wasm:
	$(CC) ./simple/*.cpp --bind -Os -g0 --closure 1 -o simple_wasm.mjs

example_recursion_asm:
	$(CC) ./recursion/*.cpp --bind -Os -g0 --closure 1 --memory-init-file 0 -sWASM=0 -o recursion_asm.mjs

example_recursion_wasm:
	$(CC) ./recursion/*.cpp --bind -Os -g0 --closure 1 -o recursion_wasm.mjs
