const fs = require('fs');
const path = require('path');

const srcRegExp = /require\((['"])@src\/(.+?)\1\)/i;
const srcRegExpGlobal = /require\((['"])@src\/(.+?)\1\)/gi;

const processFile = (file) => {
  const dirname = path.dirname(file);
  const content = fs.readFileSync(file).toString();
  const newContent = content.replace(srcRegExpGlobal, (match) => {
    const [, quote, oldPath] = match.match(srcRegExp);
    let newPath = path.relative(dirname, path.resolve('./.build', oldPath));
    if (!/^\./.test(newPath)) newPath = `./${newPath}`;
    return `require(${quote}${newPath}${quote})`;
  });

  if (newContent !== content) {
    console.log(`Updating ${file}…`);
    fs.writeFileSync(file, newContent);
  }
};

const processDir = (dir) => {
  const entries = fs.readdirSync(dir);
  entries.forEach((entry) => {
    const filepath = path.resolve(dir, entry);
    const stats = fs.statSync(filepath);
    const ext = stats.isFile() && path.extname(filepath);
    if (stats.isDirectory()) processDir(filepath);
    else if (ext === '.js') processFile(filepath);
  });
};

processDir('./.build');
