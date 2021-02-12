const fs = require('fs');
const path = require('path');

const copySvg = () => {
  fs.readdirSync(path.resolve(__dirname, '../package/svg/')).forEach((file) => {
    fs.unlinkSync(path.resolve(__dirname, '../package/svg/', file));
  });
  fs.readdirSync(path.resolve(__dirname, '../src/f7')).forEach((file) => {
    fs.copyFileSync(
      path.resolve(__dirname, `../src/f7/${file}`),
      path.resolve(__dirname, `../package/svg/${file}`),
    );
  });
  fs.readdirSync(path.resolve(__dirname, '../src/sf')).forEach((file) => {
    fs.copyFileSync(
      path.resolve(__dirname, `../src/sf/${file}`),
      path.resolve(__dirname, `../package/svg/${file}`),
    );
  });
};
module.exports = copySvg;
