const fs = require("fs");
const util = require("util");
const mkdir = util.promisify(fs.mkdir);
async function exec() {
  const commonModule = await import("./esmodule.js");
  console.log("Bowen: exec -> commonModule", commonModule);
  await mkdir("./test");
}
exec();
