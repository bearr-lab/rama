/* eslint-disable */
const { ESLint } = require("eslint");
const fs = require("fs");

async function main() {
  const eslint = new ESLint({ fix: true });
  const results = await eslint.lintFiles([
    "app/(public)/[locale]/invest/page.tsx",
    "app/(public)/[locale]/projects/page.tsx",
    "app/(public)/[locale]/areas/page.tsx",
    "app/(public)/[locale]/homes/page.tsx",
    "app/(public)/[locale]/insights/page.tsx",
    "components/layout/page-header.tsx",
    "components/insights/insights-client.tsx",
    "components/layout/footer.tsx"
  ]);

  await ESLint.outputFixes(results);

  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);
  console.log(resultText);
}

main().catch(console.error);
