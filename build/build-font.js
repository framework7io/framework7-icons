const { promise: exec } = require('exec-sh');

const buildFont = async () => {
  exec(
    `python ./build/generate.py && ttf2woff ./package/fonts/Framework7Icons-Regular.ttf ./package/fonts/Framework7Icons-Regular.woff`,
  );
};
module.exports = buildFont;
