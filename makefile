CC=emcc

all: example_wasm example_interop example_simple

example_interop:
	$(CC) ./interop/*.cc --bind -Os -g0 --closure 1 -o interop.mjs

example_simple:
	$(CC) ./simple/*.cpp --bind -Os -g0 --closure 1 -o simple.mjs

example_wasm:
	$(CC) ./recursion/*.cpp --bind -Os -g0 --closure 1 -o recursion.mjs

