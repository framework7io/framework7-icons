const fs = require('fs');
const path = require('path');
const { promise: exec } = require('exec-sh');

const clean = async () => {
  await exec('rm -rf package/vue/vue/*.vue');
};
const buildVue = async () => {
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
          return `<svg fill="currentcolor" ${attrs}>`;
        });

      const component = `
<template>
${content}
</template>    
<script>
  const ${name} = {};
  export default ${name};
</script>
    `.trim();
      fs.writeFileSync(path.resolve(__dirname, '../package/vue/vue', `${name}.vue`), component);
    });

  const importComponents = components
    .map(({ name }) => `import ${name} from './vue/${name}.vue';`)
    .join('\n');
  const exportComponents = `export {${components.map(({ name }) => name).join(', ')}}`;

  fs.writeFileSync(
    path.resolve(__dirname, '../package/vue/framework7-icons-vue.js'),
    `${importComponents}\n${exportComponents}`,
  );
};

module.exports = buildVue;
