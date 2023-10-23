import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const packageJson = require('./package.json')

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
        globals: {
          react: 'React',
        },
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
        globals: {
          react: 'React',
        },
      },
    ],
    plugins: [peerDepsExternal(), resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' }), terser()],
    external: ['react', 'react-dom', 'styled-components'],
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/types.d.ts', format: 'es' }],
    plugins: [dts.default()],
  },
]
