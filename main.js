const { readline } = require("node:readline");

const { stdin: input, stdout: output } = require("node:process");

const { argv } = require("node:process");

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
      console.log(`Initiating crawler at ${baseURL.href}`);
    } catch (error) {
      console.log(error.message);
    }

    // argv.forEach((val, index) => {
    //   console.log(`${ index }: ${ val }`);
    // });
  }
}

main();
