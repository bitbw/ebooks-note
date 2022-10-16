
/**
 * generatorFn生成器函数
 * 调用 generatorFn 返回 generator 生成器
 * generator 生成器 内部实现了 iterator 接口，generator 可以调用next方法
 * - 调用generatorFn生成器函数的时候并不会执行内部代码
 * - generator调用next方法， 开始执行generatorFn内部代码
 * - 遇到yield关键字将停止执行代码，并将yield后面的值返回
 * - 再次调用next方法 将从上一个yield 所在行开始执行
 * - 如果next中有参数将传递给开始执行所在行的yield，如果是首次调用next将没有yield可以供其赋值
 * - 遇到return关键字将返回 { value: return后面的值, done: true } 
 * - 如果函数内没有return也没有yield的了 将返回 { value: undefined, done: true } 
 */

 function* generatorFn(params) {
    console.log(params);
    console.log('yield1',yield "yield1");   // 遇到 yield ，yield所在行的代码都不会执行，但是 yield 后边的参数会返回
    console.log('yield2',yield 'yield2');   // 不会执行 console.log，下次调用next时才会执行 console.log 以及后面的代码
    console.log('end');
}

const generator = generatorFn('foo')

console.log('next1', generator.next('bar'))
// foo
// next1 { value: 'yield1', done: false }
console.log('next2', generator.next('baz'))
// yield1 baz
// next2 { value: 'yield2', done: false }
console.log('next3', generator.next('qux'))
// yield2 qux
// end
// next3 { value: undefined, done: true }



function* generatorFn1() {
    console.log("0->yield1");
    yield "yield1"					// 停止 返回 yield1
    console.log("yield1->yield2");
    yield 'yield2'					// 停止 返回 yield2
    console.log("yield2->end");
}

const generator1= generator1Fn1()
console.log('next1',generator1.next())
// 0->yield1
// next1 { value: 'yield1', done: false }
console.log('next2',generator1.next())
// yield1->yield2
// next2 { value: 'yield2', done: false }
console.log('next3',generator1.next())
// yield2->end
// next3 { value: undefined, done: true 