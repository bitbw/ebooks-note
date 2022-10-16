console.log("模块3执行了");

const add = (...args) => {
  const sum = args.reduce((sum, item) => (sum += item), 0);
  console.log("sum", sum);
};

add(123123, 2351235);
