module.exports = function(grunt) {
    grunt.initConfig({
        pkg: '<json:package.json>',
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: false
                },
                files: {
                    "index.html": "index.html"
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: "compressed"
                },
                files: {
                    'css/style.css': 'theme/unverschaemt.scss'
                }
            }
        },
        concat: {
            dist: {
                src: ['js/translation.js', 'js/config.js', 'js/obscene.js', 'js/view.js', 'js/controller.js'],
                dest: 'js/bin/main.js'
            }
        },
        uglify: {
            dist: {
                src: 'js/bin/main.js',
                dest: 'js/bin/main.min.js'
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['sass', 'htmlmin', 'concat', 'uglify']);
};
