import resolve from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';

const isDev = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'src/index.ts',
  output: {
    format: 'esm',
    file: 'dist/ariaket.js',
  },
  // external,
  context: 'window',
  cache: isDev,
  plugins: [
    resolve({
      extensions: ['.js', '.ts'],
    }),
    ts({
      transpiler: 'swc',
    }),
    !isDev && terser(),
  ],
};
