import fs from "fs";
import util from "util";
import commonModule from "./6.cjs.js";
const mkdir = util.promisify(fs.mkdir);
//
async function exec() {
  console.log("Bowen: exec -> commonModule", commonModule);
  await mkdir("./test");
}
exec();
