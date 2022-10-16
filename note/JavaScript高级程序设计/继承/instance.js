/**
 * 组合式继承
 * 缺点：原型上有多余属性
 */

//  function SuperType (name) {
//     this.name = name;
//     this.colors = ["red", "blue"];
//  }
//  SuperType.prototype = {
//      consturctor: SuperType,
//      sayName: function () {
//         console.log("My name is ", this.name);
//      }
//  }

//  function SubType (age) {
//     SuperType.call(this, "jack")
//     this.age = age;
//  }
// SubType.prototype = new SuperType()
// SubType.prototype.consturctor = SubType
// let instance1 = new SubType(18)
// let instance2 = new SuperType("tom")
// let instance3 = Object.create(new SuperType("rose"))
// instance1.colors.push("greet")
// instance2.colors.push("blak")
// console.log("Bowen: SuperType.prototype.isPrototypeOf(instance1)", SuperType.prototype.isPrototypeOf(instance1))
// console.log("Bowen: SuperType.prototype.isPrototypeOf(instance2)", SuperType.prototype.isPrototypeOf(instance2))
// console.log("Bowen: SuperType.prototype.isPrototypeOf(instance2)", SuperType.prototype.isPrototypeOf(instance3))
// console.log("Bowen: instance1 instanceof SuperType", instance1 instanceof SuperType)
// console.log("Bowen: instance2 instanceof SuperType", instance2 instanceof SubType)
// console.log("Bowen: instance3 instanceof SuperType", instance3 instanceof SuperType)
// let superProtoType1 = Object.getPrototypeOf(instance1)
// let superProtoType2 = Object.getPrototypeOf(instance2)
// instance1.sayName()
// instance2.sayName()
// instance3.sayName()
// console.log("Bowen: instance1", instance1.colors)
// console.log("Bowen: instance2", instance2.colors)
// console.log("Bowen: instance2", instance3.colors)

/**
 * 寄生组合式继承
 * 优点：子类原型上没有多余属性  只需要调用一次父类
 */
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue"];
}
SuperType.prototype = {
  consturctor: SuperType,
  sayName: function () {
    console.log("My name is ", this.name);
  }
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
let SuperPrototype = SuperType.prototype;
// 根据原型继承创建一个空对象但具有父类原型 ，将整个空对象赋值给子类的原型
SubType.prototype = Object.create(SuperPrototype);
// 构造函数指回子类
SubType.prototype.consturctor = SubType;
// 添加额外方法
SubType.prototype.sayAge = function () {
  console.log("My age is", this.age);
};
let instance1 = new SuperType("tom");
let instance2 = new SubType("jack", 18);
let test  = function () {
    this.name = 'aa'
}
instance1.colors.push("greet");
instance2.colors.push("blak");

instance1.sayName();
instance2.sayName();
instance2.sayAge();
