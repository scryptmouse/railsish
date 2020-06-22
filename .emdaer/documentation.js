const { spawn } = require("promisify-child-process");
const { withFile } = require("tmp-promise");
const { readFile } = require("fs").promises;

async function runYarn(script, ...options) {
  await spawn("yarn", [script, ...options]);
}

/**
 * Render documentation from specified source code.
 *
 * @see {@link http://documentation.js.org/}
 * @example
 * <!--emdaer-p
 *   - '@emdaer/plugin-documentation'
 *   - yarnTask: "docs:api:md"
 * -->
 * @param {object} options
 * @param {string} options.yarnTask
 * @returns {Promise<string>} The rendered documentation
 */
async function documentationPlugin({ yarnTask }) {
  const output = await withFile(async ({ fd, path }) => {
    await runYarn(yarnTask, "-o", path);

    return await readFile(path, "utf-8");
  });

  return output;
  //return documentation.formats.md(await documentation.build(sources, { order }), {});
}

module.exports = documentationPlugin;
