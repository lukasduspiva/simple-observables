import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const globalName = 'simpleObservables';

export default {
  input: 'src/index.js',
  output: [
    {
      file: `${pkg.main}`,
      format: 'umd',
      name: globalName,
      globals: {},
    },
    {
      file: `${pkg.module}`,
      format: 'es',
      name: globalName,
    },
  ],
  external: (id) => id.includes('@babel/runtime'),
  plugins: [
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
    }),
    commonjs(),
    terser(),
  ],
};
