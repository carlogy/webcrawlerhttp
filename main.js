const { readline } = require("node:readline");

const { stdin: input, stdout: output } = require("node:process");

const { argv } = require("node:process");

const { crawlPage } = require("./crawl.js");

function main() {
  if (argv.length > 3) {
    console.log(
      `Error the number of arguments passed is more than required to execute.`,
    );
  } else if (argv.length < 3) {
    console.log(
      `Error the number of arguments passed is less than required to execute.`,
    );
  } else {
    try {
      const baseURL = argv[2];
      console.log(`Initiating crawler at ${baseURL}`);
      crawlPage(baseURL);
    } catch (error) {
      console.log(error.message);
    }
  }
}

main();
