#include <emscripten/bind.h>
#include <stdlib.h>

class Callback {
 public:
  virtual ~Callback() {}
  virtual int fn(int arg) = 0;
};

class CallbackWrapper : public emscripten::wrapper<Callback> {
 public:
  EMSCRIPTEN_WRAPPER(CallbackWrapper);
  int fn(int arg) {
    return call<int>("fn", arg);
  }
};

std::unique_ptr<CallbackWrapper> func = nullptr;

void setFunc(CallbackWrapper *js_func) {
  func.reset(js_func);
};

void unsetFunc(void) {
  func.reset(nullptr);
};

int runCpp(int arg) {
  if (func != nullptr) {
    return func->fn(arg);
  } else {
    return 42;
  }
}

EMSCRIPTEN_BINDINGS(my_module) {
  emscripten::class_<Callback>("Callback")
      .function("fn", &Callback::fn, emscripten::pure_virtual())
      .allow_subclass<CallbackWrapper>("CallbackWrapper");

  emscripten::function("setFunc", &setFunc, emscripten::allow_raw_pointers());
  emscripten::function("unsetFunc", &unsetFunc);
  emscripten::function("runCpp", &runCpp);
}
