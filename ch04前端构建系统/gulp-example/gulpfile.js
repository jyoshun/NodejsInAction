// 代码清单 4-1 用Babel处理ES2015和React的gulpfile
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const watch = require('gulp-watch');

gulp.task('default', () => {
  return gulp.src('app/*.jsx') // 用Gulp自带的文件聚集工具gulp.src查找所有的React jsx文件
    .pipe(sourcemaps.init()) // 开始监视源文件，为调试构建源码映射
    .pipe(babel({
      presets: ['es2015', 'react'] // 使用ES2015和React(JSX)配置gulp-babel
    }))
    .pipe(concat('all.js')) // 把所有源文件拼到一个all.js中
    .pipe(sourcemaps.write('.')) // 单独写入源码映射文件
    .pipe(gulp.dest('dist')); // 将所有文件放到dist/目录下
});

gulp.task('watch', () => {
  watch('app/**.jsx', () => gulp.start('default'));
});
