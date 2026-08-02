/* eslint-disable */
const { ESLint } = require("eslint");
const fs = require("fs");

async function main() {
  const eslint = new ESLint({ fix: true });
  const results = await eslint.lintFiles([
    "app/(workspace)/[locale]/settings/appearance/page.tsx",
    "components/auth/user-menu.tsx"
  ]);

  await ESLint.outputFixes(results);

  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);
  console.log(resultText);
}

main().catch(console.error);
