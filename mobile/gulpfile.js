var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("1001/js/*.js").on('change',reload);
    gulp.watch("1001/*html").on('change',reload);
    gulp.watch("1001/css/*.css").on('change',reload);
});