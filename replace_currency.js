const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const targetFiles = [];
walkDir('./src/app', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    targetFiles.push(filePath);
  }
});

targetFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace ${something.toFixed(2)} with {something.toFixed(2)} TND
  // This matches $ immediately followed by { ... .toFixed( ... ) }
  content = content.replace(/\$\{([^}]+?\.toFixed\([^)]+?\))\}/g, '{$1} TND');
  
  // Replace hardcoded $xx.xx with xx.xx TND
  content = content.replace(/\$([0-9]+\.[0-9]+)/g, '$1 TND');
  
  // Replace "over $50" to "over 50 TND"
  content = content.replace(/over \$([0-9]+)/g, 'over $1 TND');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
