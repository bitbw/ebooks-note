/*
 * @Description: Promise Test
 * @LastEditors: Bowen
 * @LastEditTime: 2021-04-23 14:29:20
 */




  export function Delay(time = 0){
    return new Promise((r)=>setTimeout(()=>{
        console.log(time);
        r(time)
    },time))
 } 
  export function DelayError(time = 0){
    return new Promise((resolve,reject)=>setTimeout(()=>{
        console.log('error:',time);
        reject({type:'error',message:time})
    },time))
 } 
/**
 * Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
 * 所有参数的状态都变成fulfilled，res的状态才会变成fulfilled
 */
//     console.time('testForEach')
// //  let res = await Promise.all([Delay(1100),DelayError(1200),Delay(1500),Delay(5000)]).catch((e)=>console.log(e)||e)
//     let res = await Promise.all([Delay(1100),Delay(1500),Delay(5000)]).catch((e)=>console.log(e)||e)
//     console.log("Bowen: res", res)
//     console.timeEnd('testForEach')

/**
 * Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
 * 参数之中有一个实例率先改变状态，res的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数
 */
// console.time('testForEach')
// let res =  await Promise.race([Delay(1500),Delay(1100),Delay(1200)])
// console.log("Bowen: res", res)
// console.timeEnd('testForEach')

/**
 * 运行结果
1100
Bowen: res 1100    
testForEach: 1.142s
1200
1500
 */


/**
 * Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
 * 只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束。
 */
// console.time('testForEach')
// let res =  await Promise.allSettled([Delay(1500),DelayError(1100),Delay(1200)])
// console.log("Bowen: res", res)
// console.timeEnd('testForEach')
/**
 * 
error: 1100
1200
1500
Bowen: res [
  { status: 'fulfilled', value: 1500 },
  { status: 'rejected', reason: 1100 },
  { status: 'fulfilled', value: 1200 } 
]
testForEach: 1.508s
 */
 

/**
 * Promise.any()方法。该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。
 * 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；
 * 如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
 */
console.time('testForEach')
let res =  await Promise.any([Delay(1500),DelayError(1100),Delay(1200)])
console.log("Bowen: res", res)
console.timeEnd('testForEach')