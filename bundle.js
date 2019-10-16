const path = require("path");
const rollup = require("rollup");
const babel = require("rollup-plugin-babel");
const glob = require("glob");

const srcDir = "./src";
const distDir = "./bin";

// ./src以下のjsファイルのリストを取得する。ただし_から始まるファイルとmodulesディレクトリは除外する。
const entries = glob.sync("**/*.js", {
  ignore: ["modules/**/*.js", "**/_*.js"],
  cwd: srcDir
});

//リストアップしたjsファイルをバンドルする。
for (let entry of entries) {
  const inputOptions = {
    input: path.resolve(srcDir, entry),
    plugins: [babel()]
  };
  const outputOptions = {
    format: "cjs",
    file: path.resolve(distDir, entry)
  };
  build(inputOptions, outputOptions);
}

async function build(inputOptions, outputOptions) {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}