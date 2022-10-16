/*
 * @Description: 测试async的执行
 * @LastEditors: zhangbowen
 * @LastEditTime: 2021-03-26 09:05:34
 */


(async function name(params) {
    console.time('testForEach')
    await new Promise(r => setTimeout(r,1000))
    console.timeEnd('testForEach')
})()
