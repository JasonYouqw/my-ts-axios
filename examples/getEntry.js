const  fs = require('fs');
const path = require('path');

const getEntry = () => {
  // console.log(`__dirname:${__dirname};__filename:${__filename}`);
  console.log(`fs.readdirSync(__dirname):${JSON.stringify(fs.readdirSync(__dirname))}`);

  const entryDirs = fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir);
    const entry = path.join(fullDir, 'app.ts');
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = [entry];
    }
    // console.log(`entries:${JSON.stringify(entries)}`);
    return entries;
  }, {});
  return entryDirs;
};

module.exports = getEntry;
