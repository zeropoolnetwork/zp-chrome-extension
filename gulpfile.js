const {src, dest, parallel} = require('gulp');
const modifyFile = require('gulp-modify-file');
const rename = require('gulp-rename');

const getFileName = (file) => file.path.replace(file._base, '').replace('/', '');

function copyJson2Js() {
  return src('./txcircuit/circuitsCompiled/*.json')
    .pipe(modifyFile((content, path, file) => {
      const fileName = getFileName(file);
      const globalVariableName = fileName.replace('.', '_');
      return `var ${globalVariableName} = ${content};`
    }))
    .pipe(rename({extname: '.json.js'}))
    .pipe(
      dest('./src/assets')
    );
}

function copyBin() {
  return src('./txcircuit/circuitsCompiled/*.bin')
    .pipe(
      dest('./src/assets')
    )
}

function copyJs() {
  return src(`./txcircuit/browser/*.js`)
    .pipe(
      dest('./src/assets')
    )
}

function copyAbi() {
  return src(`./MiMCTree/build/contracts/*.json`)
    .pipe(
      dest('./src/assets/ABI')
    )
}

exports.default = parallel(
  copyJson2Js,
  copyBin,
  copyJs,
  copyAbi
);

