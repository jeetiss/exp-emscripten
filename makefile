all: example_interop example_simple

example_interop:
	@emcc ./interop/*.cc --bind -Os -g0 --closure 1 -o interop.mjs

example_simple:
	@echo hello world
