module.exports = function(grunt){

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    coffee: {
      compile: {
          files: {
            'build/conekta_no_dependencies.js': ['src/conekta.js.coffee', 'src/charge.js.coffee', 'src/card.js.coffee'] //'src/ie_cors_patch.js.coffee',  
          }
        }
    },
    concat:{
        conekta_js:{
            src:["build/conekta_no_dependencies.js", "lib/easyXDM.min.js","lib/json2.min.js"],
            dest:'build/conekta.js'
        }
    },
    uglify:{
        no_dependencies:{
          options:{
            preserveComments:'some',
          },
          files:{
            'build/conekta_no_dependencies.min.js':['build/conekta_no_dependencies.js']
          }
        },
        dependencies:{
          options:{
            preserveComments:'some',
          },
          files:{
            'build/conekta.min.js':['build/conekta.js']
          }
        },
        json2:{
          options:{
            preserveComments:'some'
          },
          files:{
            'lib/json2.min.js':['lib/json2.js']
          }
        }
    },
  });
  grunt.registerTask('default', ['coffee', 'concat', 'uglify']);
};
