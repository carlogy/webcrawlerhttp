const { readline } = require("node:readline");

const { stdin: input, stdout: output } = require("node:process");

const { argv } = require("node:process");

const { crawlPage } = require("./crawl.js");

async function main() {
  if (argv.length > 3) {
    console.log(
      `Error the number of arguments passed is more than required to execute.`,
    );
    process.exit(1);
  }

  if (argv.length < 3) {
    console.log(
      `Error the number of arguments passed is less than required to execute.`,
    );
    process.exit(1);
  }

  try {
    const baseURL = argv[2];
    console.log(`Starting crawling on the page ${baseURL}`);
    const totalPages = await crawlPage(baseURL);
    console.log(totalPages);
  } catch (error) {
    console.log(error.message);
  }
}

main();
