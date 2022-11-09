#include <iostream>
#include <emscripten/bind.h>

float print() {
  std::cout << "Hello world";
  return 0;
}

using namespace emscripten;

EMSCRIPTEN_BINDINGS(my_module) {
    function("print", &print);
}
