const version = require('./package.json').version;

const banner =
  '/*!\n' +
  ' * Bgset.js v' + version + '\n' +
  ' * (c) 2015-' + new Date().getFullYear() + ' Mateusz Łuczak\n' +
  ' * Released under the MIT License.\n' +
  ' */';


export default {
  input: 'src/main.js',
  output: [
    {
        file: 'dist/bgset.js',
        name: 'bgset',
        banner,
        format: 'umd'
    },
    {
        file: 'dist/bgset.es.js',
        format: 'es'
    }]
};