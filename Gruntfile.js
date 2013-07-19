module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    coffee: {
      compile: {
          files: {
            'build/conekta.js': ['src/conekta.js.coffee', 'src/charge.js.coffee', 'src/card.js.coffee'] //'src/ie_cors_patch.js.coffee',  
          }
        }
    },
    concat:{
        conekta_js:{
            src:["lib/easyXDM.min.js","lib/json2.min.js", "build/conekta.js"],
            dest:'build/conekta.js'
        }
    },
    uglify:{
        dependencies:{
            src:'build/conekta.js',
            dest:'build/conekta.min.js'
        },
        json2:{
            src:'lib/json2.js',
            dest:'lib/json2.min.js'
        }
    },
  });
  grunt.registerTask('default', ['coffee', 'concat', 'uglify']);
};
