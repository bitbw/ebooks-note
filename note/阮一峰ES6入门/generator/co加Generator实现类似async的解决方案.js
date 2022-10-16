/*
 * @Description: ES6  Generator  （顺便研究一下 stream ）
 * @LastEditors: Bowen
 * @LastEditTime: 2021-04-30 14:26:58
 */
const co = require('co');
const fs = require('fs');
const { resolve } = require('path')
const stream = fs.createReadStream(resolve(__dirname,'Les_Miserables.txt'));
let valjeanCount = 0;
// 这里co(function*()) 相当于 async
co(function*() {
  let i = 0
  while(true) {
    // 这里的 yield 相当于 await
    const res = yield Promise.race([
    // 分了14次全部流完 
      new Promise(resolve => stream.once('data', (chunk)=>{
        // chunk 为 buffer  调用 tostring转为读取的字符串
        let str = chunk.toString()
        console.log(i + 'star ===================================================================')
        console.log("Bowen: co -> str", str)
        console.log(i + 'end ===================================================================')
        resolve(chunk)
      })),
      new Promise(resolve => stream.once('end', ()=>{
        console.log('已没有数据');
        resolve()
      })),
      new Promise((resolve, reject) => stream.once('error', reject))
    ]);
    i ++
    if (!res) {
      break;
    }
    stream.removeAllListeners('data');
    stream.removeAllListeners('end');
    stream.removeAllListeners('error');
    valjeanCount += (res.toString().match(/valjean/ig) || []).length;
  }
  console.log('count:', valjeanCount); // count: 326
});