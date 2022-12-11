#include <emscripten/bind.h>

#include <iostream>

float print() {
  std::cout << "Hello world";
  return 0;
}

using namespace emscripten;

EMSCRIPTEN_BINDINGS(my_module) {
  function("print", &print);
}
