#include <emscripten/bind.h>
#include <emscripten/val.h>

using namespace emscripten;

bool checkWebAssembly() {
  val WebAssembly = val::global("WebAssembly");

  return WebAssembly.as<bool>();
}

EMSCRIPTEN_BINDINGS(my_module) {
  function("checkWebAssembly", &checkWebAssembly);
}
