#include <napi.h>
#include <stdio.h>
using namespace Napi;

String Hello(const CallbackInfo& info) {
  return String::New(info.Env(), "Hello world");
}
Napi::Object  Init(Env env, Object exports) {
  exports.Set("hello", Function::New(env, Hello));
  return exports;
}
NODE_API_MODULE(addon, Init)
