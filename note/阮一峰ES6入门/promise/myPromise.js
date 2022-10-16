/*
 * @Description:
 * @Autor: Bowen
 * @Date: 2021-09-15 09:02:41
 * @LastEditors: Bowen
 * @LastEditTime: 2021-09-16 15:42:37
 */

// new Promise((resolve,reject)=>{})
// pormise 接收一个回调

const STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "REJECTED",
};
class MyPromise {
  constructor(executor) {
    //   执行回调传入 resolve reject
    executor(this.resolve, this.reject);
  }
  //   默认为pending
  status = STATUS.PENDING;
  //   结果
  result = null;
  //   错误
  error = null;
  //   then中的成功回调集合
  onFulfilledCallbacks = [];
  //   then中失败的回调集合
  onRejectedCallbacks = [];
  //   resolve
  resolve = (result) => {
    if (this.status !== STATUS.PENDING) return;
    this.result = result;
    this.status = STATUS.FULFILLED;
    // 调用每个回调
    while (this.onFulfilledCallbacks.length) {
      let onFulfilledCallback = this.onFulfilledCallbacks.shift();
      onFulfilledCallback && onFulfilledCallback(this.result);
    }
  };
  //   reject
  reject = (error) => {
    if (this.status !== STATUS.PENDING) return;
    this.error = error;
    this.status = STATUS.REJECTED;
    // 调用每个回调
    while (this.onRejectedCallbacks.length) {
      let onRejectedCallback = this.onRejectedCallbacks.shift();
      onRejectedCallback && onRejectedCallback(this.result);
    }
  };
  // then
  then(onFulfilledCallback, onRejectedCallback) {
    const promise = new MyPromise((resolve, reject) => {
      let fulfilledMicrotask = (result) => {
        // queueMicrotask 相当于 Rromise.resolve().then 用于创建一个微任务
        queueMicrotask(() => {
          // try
          try {
            let x = onFulfilledCallback(result);
            //  如果成功回调返回 promise 先使用 resolvePromise 解一下
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      let rejectedMicrotask = (error) =>
        queueMicrotask(() => {
          // try
          try {
            let x = onRejectedCallback(error);
            //  如果成功回调返回 promise 先使用 resolvePromise 解一下
            resolvePromise(promise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      switch (this.status) {
        // STATUS.FULFILLED  STATUS.REJECTED 判断为同步情况
        // promise 如果同步调用 resolve, reject 下面的 switch 会直接调用 onFulfilledCallback, onRejectedCallback
        case STATUS.FULFILLED:
          fulfilledMicrotask(this.result);
          break;
        case STATUS.REJECTED:
          rejectedMicrotask(this.error);
          break;
        // STATUS.PENDING 判断为异步的情况
        // 将 onFulfilledCallback, onRejectedCallback 等都推入 this 上等待 resolve, reject 调用后再来调用
        case STATUS.PENDING:
          this.onFulfilledCallbacks.push(fulfilledMicrotask);
          this.onRejectedCallbacks.push(rejectedMicrotask);
          break;
        default:
          break;
      }
    });
    // 可以链式调用
    return promise;
  }
  test(a) {}
  //   静态方法
  static Resolve(x) {
    //   promise
    if (x instanceof MyPromise) return x;
    //  thenbal
    if (x instanceof Object && typeof x.then === "fuction") {
      return new MyPromise((resolve, reject) => x.then(resolve, reject));
    }
    // 其他值
    return new MyPromise((resolve) => resolve(x));
  }
  static Reject(x) {
    return new MyPromise((resolve, reject) => reject(x));
  }
}
// 判断 x 是否是 promise
function resolvePromise(thenResult, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (thenResult === x) {
    reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
  }
  //  是 通过 then 解开 promise 的的结果调用 reovle 或 reject
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    //   不是 直接返回结果
    resolve(x);
  }
}
// const promise = new MyPromise((res, rej) => setTimeout(res, 1000, "fulfilled"));
// promise.then((res) => {
//   console.log(1);
//   console.log(res);
// });
// promise.then((res) => {
//   console.log(2);
//   console.log(res);
// });
// promise.then((res) => {
//   console.log(3);
//   console.log(res);
// });

// 多级链式调用

// const promise = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("success 1000");
//   }, 1000);
// });

// function other() {
//   return new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("other 2000");
//     }, 1000);
//   });
// }

// promise
//   .then((value) => {
//     console.log("1-1");
//     console.log("resolve", value);
//     // return "then callback";
//     return other();
//   })
//   .then((value) => {
//     console.log("1-2");
//     console.log("resolve", value);
//   });
// promise
//   .then((value) => {
//     console.log("2-1");
//     console.log("resolve", value);
//     // return "then callback";
//     return other();
//   })
//   .then((value) => {
//     console.log("2-2");
//     console.log("resolve", value);
//   });

queueMicrotask(() => console.log(2));
MyPromise.Resolve(3).then(console.log);
console.log(1);
