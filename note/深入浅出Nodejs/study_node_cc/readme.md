

## C/C++扩展模块的编写

它的JavaScript原型代码与前面的例子一样

```js
        exports.sayHello = function () {    
                  return 'Hello world! ';      
       };
```

新建hello目录作为自己的项目位置，编写hello.cc并将其存储到src目录下，相关代码如下：

```c++
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

```

C/C++扩展模块与内建模块的套路一样，将方法挂载在target对象上，然后通过NODE_MODULE声明即可。由于不像编写内建模块那样将对象声明到node_module_list链表中，所以无法被认作是一个原生模块，只能通过dlopen()来动态加载，然后导出给JavaScript调用

## 全局安装  node-gyp

```sh
npm i -g node-gyp
```
### 项目内安装 node-addon-api
```sh
 npm i node-addon-api --save
```
[node-addon-api](https://github.com/nodejs/node-addon-api) 模块包含 仅包含头文件的 C++ 包装类，这些类在使用 C++ 时简化了 Node.js 提供的基于 C 的Node-API的使用。它以低开销提供了 C++ 对象模型和异常处理语义。

## C/C++扩展模块的编译

在GYP工具的帮助下，C/C++扩展模块的编译是一件省心的事情，无须为每个平台编写不同的项目编译文件。写好．gyp项目文件是除编码外的头等大事，然而你也无须担心此事太难，因为．gyp项目文件是足够简单的。node-gyp约定．gyp文件为binding.gyp，其内容如下所示：

```gyp
{
  "targets": [
    {
      "target_name": "hello",
      "sources": [
        "src/hello.cc"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "defines": ["NAPI_CPP_EXCEPTIONS"],
      "xcode_settings": {
        "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
      }
    }
  ]
}

```

然后调用：

```sh
node-gyp configure
```

node-gyp configure这个命令会在当前目录中创建build目录，并生成系统相关的项目文件。在*nix平台下，build目录中会出现Makefile等文件；在Windows下，则会生成vcxproj等文件。继续执行如下代码：


```sh
node-gyp build
```

编译过程会根据平台不同，分别通过make或vcbuild进行编译。编译完成后，hello.node文件会生成在build/Release目录下。
## C/C++扩展模块的加载
得到hello.node结果文件后，如何调用扩展模块其实在前面已经提及。require()方法通过解析标识符、路径分析、文件定位，然后加载执行即可。下面的代码引入前面编译得到的．node文件，并调用执行其中的方法：
```js
const hello = require('./build/Release/hello.node');

console.log(hello.hello());
```
以上代码存为hello.js，调用node hello.js命令即可得到如下的输出结果：
```
  Hello world!

```

## 报错解决

[node-gyp环境配置报错处理，nodejs 调用 c++接口](https://blog.csdn.net/weixin_45253306/article/details/125167927)