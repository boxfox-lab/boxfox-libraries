import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import autoprefixer from 'autoprefixer';
import path from 'path';
import postcss from 'rollup-plugin-postcss';
import reactSvg from 'rollup-plugin-react-svg';
import url from 'rollup-plugin-url';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const external = pack => {
  const externals = [...Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies })];
  return externals.some(externalPkg => {
    return pack === externalPkg || pack.startsWith(`${externalPkg}/`);
  });
};

export default [
  buildCJS('src/index.ts'),
  buildESM('src/index.ts', { preserveModules: true }),
  buildCSS('styles/index.scss', pkg.style),
  buildCSS('styles/index.scss', 'css/fe-components.min.css', {
    minimize: {
      preset: ['default'],
    },
  }),
];

function buildJS(input, output, format, { visualize = false, preserveModules = false } = {}) {
  return {
    input,
    external,
    output: [
      { 
        format, 
        sourcemap: true, 
        ...(preserveModules ? { dir: path.dirname(output) } : { file: output }), 
      }
    ],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
      }),
      babel({
        babelrc: true,
        extensions,
        babelHelpers: 'runtime',
        rootMode: 'upward',
        presets: ['@babel/env', '@babel/typescript', '@babel/react', '@emotion/css-prop'],
        plugins: ['@babel/transform-runtime', '@emotion'],
      }),
      url(),
      reactSvg(),
      resolve({ extensions }),
      commonjs(),
      visualize ? visualizer() : undefined,
    ],
    preserveModules
  };
}

function buildCJS(input, { visualize } = {}) {
  const filename = path.parse(input).name;

  return buildJS(input, `dist/${filename}.js`, 'cjs', {
    visualize,
  });
}

function buildESM(input, { visualize, preserveModules } = {}) {
  const filename = path.parse(input).name;
  return buildJS(input, `dist/esm/${filename}.js`, 'es', {
    visualize,
    preserveModules
  });
}

function buildCSS(inputFile, outputFile, postCSSOptions = {}) {
  return {
    input: inputFile,
    output: { file: `dist/${outputFile}`, format: 'cjs' },
    plugins: [
      postcss({
        plugins: [autoprefixer],
        sourceMap: true,
        extract: true,
        extensions: ['.scss', '.css'],
        ...postCSSOptions,
      }),
    ],
  };
}
