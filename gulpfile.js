const {src, dest, parallel} = require('gulp');

function copyJson2Js() {

  const modifyFile = require('gulp-modify-file');
  const rename = require('gulp-rename');
  console.log('Hi!');

  return src('./txcircuit/circuitsCompiled/*.json')
    .pipe(modifyFile((content, path, file) => {
      const start = `var ${file} = `;
      const end = ';';
      return `${start}${content}${end}`
    }))
    .pipe(rename({extname: '.js'}))
    .pipe(
      dest('./src/assets')
    )
}

// exports.default = parallel(copyJson2Js);
exports.default = copyJson2Js;
