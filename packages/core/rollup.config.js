import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import ts from 'rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';

const isDev = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
  // external,
  context: 'window',
  cache: isDev,
  plugins: [
    resolve({
      extensions: ['.js', '.ts'],
      browser: true,
    }),
    ts({
      transpiler: 'swc',
    }),
    commonjs(),
    !isDev && terser(),
  ],
};
