const fs = require('fs');
const path = require('path');

fs.readdirSync(path.resolve(__dirname, '../svg/')).forEach((file) => {
    fs.unlinkSync(path.resolve(__dirname, '../svg/', file));
});
fs.readdirSync(path.resolve(__dirname, '../src/f7')).forEach((file) => {
    fs.copyFileSync(path.resolve(__dirname, `../src/f7/${file}`), path.resolve(__dirname, `../svg/${file}`))
})
fs.readdirSync(path.resolve(__dirname, '../src/sf')).forEach((file) => {
    fs.copyFileSync(path.resolve(__dirname, `../src/sf/${file}`), path.resolve(__dirname, `../svg/${file}`))
})