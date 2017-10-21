module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: true,
          optimization: 2
        },
        files: [
          {
            expand: true,
            cwd: './assets/less/',
            src: ['*.less'],
            dest: './static/css/',
            ext: '.css'
          }
        ]
      }
    },
    watch: {
      styles: {
        files: ['./assets/less/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};
