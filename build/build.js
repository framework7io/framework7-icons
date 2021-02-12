const buildFont = require('./build-font');
const copySvg = require('./copy-svg');
const buildReact = require('./build-react');
const buildVue = require('./build-vue');
const buildSvelte = require('./build-svelte');

const build = () => {
  buildFont();
  copySvg();
  buildReact();
  buildSvelte();
  buildVue();
};

build();
