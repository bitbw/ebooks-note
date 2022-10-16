// 测试 promise 加 for

function handlePormise(i) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(i);
      resolve(i)
    }, 10);
  });
}

async function handle() {
  for (let i = 0; i < 10; i++) {
    let res =  await handlePormise(i);
    console.log("Bowen: handle -> res", res)
  }
}
handle();
