function printReport(pages) {
  console.log("Generating report ...");
  const sortedPages = sortPages(pages);

  for (const page of sortedPages) {
    console.log(`Found ${page[1]} internal links to ${page[0]}`);
  }
}

function sortPages(pages) {
  try {
    const pagesArray = Object.entries(pages);
    pagesArray.sort((a, b) => b[1] - a[1]);

    return pagesArray;
  } catch (error) {
    console.log(`Error when attempting to sort pages ${pages}`);
  }
}

module.exports = {
  printReport,
};
