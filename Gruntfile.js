module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    coffee: {
      compile: {
          files: {
            'build/conekta.js': ['src/ie_cors_patch.js.coffee', 'src/conekta.js.coffee', 'src/charge.js.coffee', 'src/card.js.coffee']
          }
        }
    },
    uglify:{
        dependencies:{
            src:'build/conekta.js',
            dest:'build/conekta.min.js'
        }
    },
  });
  grunt.registerTask('default', ['coffee', 'uglify']);
};
