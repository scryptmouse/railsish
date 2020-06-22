import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";
import babel from "rollup-plugin-babel";

export default [
  {
    input: "src/main.js",
    output: {
      name: "railsish",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: "node_modules/**",
      }),
    ],
  },

  {
    input: "src/main.js",
    external: ["lodash.get", "is-number", "is-plain-object"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
  {
    input: "src/jest-matchers.js",
    external: ["lodash.get", "is-number", "is-plain-object"],
    output: [
      { file: "./dist/railsish.jestMatchers.cjs.js", format: "cjs", exports: "named" },
      { file: "./dist/railsish.jestMatchers.esm.js", format: "es" },
    ],
  },
];
