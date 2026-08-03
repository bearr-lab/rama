const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (!dirPath.includes('node_modules') && !dirPath.includes('.git') && !dirPath.includes('.next')) {
        walkDir(dirPath, callback);
      }
    } else {
      if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts') || dirPath.endsWith('.css') || dirPath.endsWith('.js')) {
        callback(path.join(dir, f));
      }
    }
  });
}

let count = 0;
walkDir('c:/dubai/rama', function(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('rounded-none-none')) {
    const newContent = content.replace(/rounded-none-none/g, 'rounded-none');
    fs.writeFileSync(filePath, newContent, 'utf-8');
    count++;
    console.log(`Fixed: ${filePath}`);
  }
});
console.log(`Finished fixing ${count} files.`);
