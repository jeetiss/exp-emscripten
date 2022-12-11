#include <emscripten/bind.h>

#include <memory>

int *ptr;

bool allocate_m(unsigned long size) {
  ptr = reinterpret_cast<int *>(std::malloc(size * sizeof(int)));
  return ptr != nullptr;
}

void free_m() {
  std::free(ptr);
}

using namespace emscripten;

EMSCRIPTEN_BINDINGS(my_module) {
  function("allocate", &allocate_m);
  function("free", &free_m);
}
