const fs = require('fs');
const path = require('path');
const { promise: exec } = require('exec-sh');

const clean = async () => {
  await exec('rm -rf package/svelte/svelte/*.svelte');
};
const buildSvelte = async () => {
  await clean();
  const files = fs.readdirSync(path.resolve(__dirname, '../package/svg'));
  const components = [];
  files
    .filter((f) => !f.includes('DS_Store'))
    .forEach((file) => {
      const name = file
        .split('.svg')[0]
        .split('_')
        .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
        .join('');

      components.push({ file, name });

      let content = fs
        .readFileSync(path.resolve(__dirname, '../package/svg', file), 'utf-8')
        .replace(/<svg ([^>]*)>/, (tag, attrs) => {
          attrs = attrs.replace('width="56"', 'width="1em"').replace('height="56"', 'height="1em"');
          return `<svg fill="currentcolor" ${attrs} {...($$restProps || {})}>`;
        });

      const component = content;
      fs.writeFileSync(
        path.resolve(__dirname, '../package/svelte/svelte', `${name}.svelte`),
        component,
      );
    });

  const importComponents = components
    .map(({ name }) => `import ${name} from './${name}.svelte';`)
    .join('\n');
  const exportComponents = `export {${components.map(({ name }) => name).join(', ')}}`;

  fs.writeFileSync(
    path.resolve(__dirname, '../package/svelte/framework7-icons-svelte.js'),
    `${importComponents}\n${exportComponents}`,
  );
};

module.exports = buildSvelte;
