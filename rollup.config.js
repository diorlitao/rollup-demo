import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/my-lib.min.js',
    format: 'iife',
    name: 'myLib',
  },
  // output: [
  //   {
  //     file: 'dist/my-lib.js',
  //     format: 'iife',
  //     name: 'myLib',
  //   },
  //   {
  //     file: 'dist/my-lib.min.js',
  //     format: 'iife',
  //     name: 'myLib',
  //   },
  // ],
  plugins: [
    babel({
      presets: ['@babel/preset-env'], // 配置 Babel 编译的预设。
      plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]], // 配置 Babel 编译的插件。
      babelHelpers: 'runtime', // 配置 Babel helpers 生成的方式
    }),
    commonjs(),
    resolve(),
    terser(),
  ],
};
