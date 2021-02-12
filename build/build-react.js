const fs = require('fs');
const path = require('path');
const { promise: exec } = require('exec-sh');

const clean = async () => {
  await exec('rm -rf package/react/*.js');
  await exec('rm -rf package/react/esm/*.js');
  await exec('rm -rf package/react/*.js');
  await exec('rm -rf package/react/cjs/*.js');
};
const buildReact = async () => {
  await clean();
  const files = fs.readdirSync(path.resolve(__dirname, '../package/svg'));

  const components = [];
  files.forEach((file) => {
    const name = file
      .split('.svg')[0]
      .split('_')
      .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
      .join('');

    components.push({ file, name });

    let content = fs
      .readFileSync(path.resolve(__dirname, '../package/svg', file), 'utf-8')
      .replace(/<svg ([^>]*)>/, (tag, attrs) => {
        return `<svg fill="currentcolor" ${attrs} {...attrs}>`;
      })
      .replace(/([A-Za-z-]*)="([^"]*)"/g, (pair, key, value) => {
        if (key.includes('-')) {
          key = key
            .split('-')
            .map((word, index) => {
              if (index === 0) return word;
              return `${word[0].toUpperCase()}${word.slice(1)}`;
            })
            .join('');
        }
        return `${key}="${value}"`;
      });

    const component = `
  import React from 'react';

  function ${name}(props) {
    const {
      children,
      ...attrs
    } = props;
    return (
      ${content}
    )
  }

  export default ${name}
    `.trim();
    fs.writeFileSync(path.resolve(__dirname, '../package/react/esm', `${name}.js`), component);
  });

  const importComponents = components
    .map(({ name }) => `import ${name} from './esm/${name}.js';`)
    .join('\n');
  const exportComponents = `export {${components.map(({ name }) => name).join(', ')}}`;

  fs.writeFileSync(
    path.resolve(__dirname, '../package/react/framework7-icons-react.esm.js'),
    `${importComponents}\n${exportComponents}`,
  );

  await exec(
    `MODULES=cjs npx babel --config-file ./build/babel-react.config.js package/react/esm --out-dir package/react/cjs --ignore "*.ts","*.json"`,
  );
  await exec(
    `MODULES=cjs npx babel --config-file ./build/babel-react.config.js package/react/framework7-icons-react.esm.js --out-file package/react/framework7-icons-react.cjs.js`,
  );
  const cjsContent = fs.readFileSync('package/react/framework7-icons-react.cjs.js', 'utf-8');
  fs.writeFileSync(
    'package/react/framework7-icons-react.cjs.js',
    cjsContent.replace(/esm/g, 'cjs'),
  );

  await exec(
    `MODULES=esm npx babel --config-file ./build/babel-react.config.js package/react/esm --out-dir package/react/esm --ignore "*.ts"`,
  );
};

module.exports = buildReact;
