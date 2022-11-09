#include <emscripten/bind.h>

float lerp(float a, float b, float t) {
    return (1 - t) * a + t * b;
}

using namespace emscripten;

EMSCRIPTEN_BINDINGS(my_module) {
    function("lerp", &lerp);
}
