"use strict";

module.exports = function(grunt) {
	
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	
	grunt.loadNpmTasks('assemble');
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		
		dirs: {
			input: 'source',
			output: 'compile'
		},
		
		copy: {
			assets: {
				expand: true,
				cwd: '<%= dirs.input %>/images/',
				src: ['**/*.{gif,png,jpeg,jpg,svg,woff,woff2,ttf,eot,mp3,mp4}'],
				dest: '<%= dirs.output %>/images/'
			},
			fonts: {
				expand: true,
				cwd: '<%= dirs.input %>/fonts/',
				src: ['**/*.{gif,woff,woff2,ttf,eot}'],
				dest: '<%= dirs.output %>/fonts/'
			},
			sprites: {
				expand: true,
				cwd: '<%= dirs.input %>/images/sprites/',
				src: ['**/*.{gif,png,jpeg,svg,woff,woff2,ttf,eot,mp3,mp4}'],
				dest: '<%= dirs.output %>/images/sprites/'
			},
			javascripts: {
				expand: true,
				cwd: '<%= dirs.input %>/javascripts/',
				src: ['libs.js'],
				dest: '<%= dirs.output %>/javascripts/'
			}
		},
		
		clean: {
			build: {
				src: ['<%= dirs.output %>']
			},
			stylesheets: {
				src: ['<%= dirs.output %>/**/*.css']
			},
			javascripts: {
				src: ['<%= dirs.output %>/**/*.js']
			}
		},
		
		/*
		sass: {
			options: {
				includePaths: ['bower_components/foundation/scss']
			},
			dist: {
				options: {
					outputStyle: 'nested', // nested, compact, compressed, expanded.
					sourceMap: true,
				},
				files: {
					'<%= dirs.input %>/stylesheets/temp/app.css': '<%= dirs.input %>/stylesheets/app.scss'
				}
			}
		},
		cssmin: {
			stylesheets: {
				files: [{
					expand: true,
					cwd: '<%= dirs.input %>/stylesheets/temp/',
					src: ['*.css', '!*.min.css','!*.css.map'],
					dest: '<%= dirs.input %>/stylesheets/temp/',
					ext: '.min.css'
				}]
			}
		},
		*/
		
		less: {
			build: {
				options: {
					compress: true
				},
				expand: true,
				cwd: '<%= dirs.input %>/stylesheets',
				src: [ '*.less', '!_*.less', '!pdf.less' ],
				dest: '<%= dirs.input %>/stylesheets/temp',
				ext: '.css'
			},
			pdf: {
				options: {
					compress: true
				},
				expand: true,
				cwd: '<%= dirs.input %>/stylesheets',
				src: [ 'pdf.less', '!_*.less', '!app.less' ],
				dest: '<%= dirs.input %>/stylesheets/temp',
				ext: '.css'
			}
		},
		
		bless: {
			css: {
				options: {
					compress: true
				},
				files: {
					'<%= dirs.output %>/stylesheets/app.min.css': '<%= dirs.input %>/stylesheets/temp/app.css'
				}
			},
			pdf: {
				options: {
					compress: true
				},
				files: {
					'<%= dirs.output %>/stylesheets/pdf.min.css': '<%= dirs.input %>/stylesheets/temp/pdf.css'
				}
			}
		},
		
		autoprefixer: {
			options: {
				browsers: [
					'last 2 versions',
					'ie >= 9', 
					'Opera >= 12.0',
					'Chrome >= 9.0', 
					'ff >= 5.0',
					'Safari >= 5.0'
				]
			},
			build: {
				src: '<%= dirs.input %>/stylesheets/temp/*.css'
			}
		},
		
		concat: {
			javascripts: {
				options: {
					separator: ';'
				},
				files: {
					'<%= dirs.output %>/javascripts/app.js': ['<%= dirs.input %>/javascripts/app.js'],
					'<%= dirs.input %>/javascripts/libs.js': [
						'bower_components/modernizr/modernizr.js'
						
						,'bower_components/jquery/dist/jquery.js'
						
						,'bower_components/bootstrap/js/tooltip.js'
						,'bower_components/bootstrap/js/modal.js'
						,'bower_components/bootstrap/js/dropdown.js'
						,'bower_components/bootstrap/js/alert.js'
						
						,'bower_components/jquery-mousewheel/jquery.mousewheel.js'						
						,'bower_components/owlcarousel/owl-carousel/owl.carousel.js'
						
						,'bower_components/fotorama/fotorama.js'
						,'<%= dirs.input %>/javascripts/vendor/maphilight/layzr.js'
						,'<%= dirs.input %>/javascripts/vendor/maphilight/jquery-migrate-1.0.0.js'
						,'<%= dirs.input %>/javascripts/vendor/maphilight/jquery.maphilight.js'
						
						,'<%= dirs.input %>/javascripts/vendor/jquery.validate/jquery.validate.js'
						,'<%= dirs.input %>/javascripts/vendor/jquery.validate/localization/messages_ru.js'
						
						,'<%= dirs.input %>/javascripts/vendor/jquery.inputmask.3.x/inputmask.js'
						,'<%= dirs.input %>/javascripts/vendor/jquery.inputmask.3.x/jquery.inputmask.js'
						
						,'<%= dirs.input %>/javascripts/vendor/jquery-simulate-ext/bililiteRange.js'
						,'<%= dirs.input %>/javascripts/vendor/jquery-simulate-ext/jquery.simulate.js'
						,'<%= dirs.input %>/javascripts/vendor/jquery-simulate-ext/jquery.simulate.ext.js'
						// ,'<%= dirs.input %>/javascripts/vendor/jquery-simulate-ext/jquery.simulate.drag-n-drop.js'
						,'<%= dirs.input %>/javascripts/vendor/jquery-simulate-ext/jquery.simulate.key-sequence.js'
						,'<%= dirs.input %>/javascripts/vendor/jquery-simulate-ext/jquery.simulate.key-combo.js'
						
					]
				}
			},
			stylesheets: {
				files: {
					'<%= dirs.output %>/stylesheets/app.css': ['<%= dirs.input %>/stylesheets/temp/app.css'],
					'<%= dirs.output %>/stylesheets/pdf.css': ['<%= dirs.input %>/stylesheets/temp/pdf.css']
				}
			}
		},
		
		uglify: {
			build: {
				files: {
					'<%= dirs.output %>/javascripts/libs.min.js': [
						'<%= dirs.input %>/javascripts/libs.js'
					],
					'<%= dirs.output %>/javascripts/app.min.js': [
						'<%= dirs.input %>/javascripts/app.js'
					]
				}
			}
		},
		
		assemble: {
			options: {
				helpers: [
					'handlebars-helper-repeat',
					'handlebars-helpers'
				],
				layoutdir: '<%= dirs.input %>/templates/layouts',
				partials: ['<%= dirs.input %>/templates/partials/**/*.hbs'],
				data: ['bower.json']
			},
			site: {
				expand: true,
				cwd: '<%= dirs.input %>/templates/pages/',
				src: '**/*.hbs',
				dest: './<%= dirs.output %>'
			}
		},
		
		sprite: {
			all: {
				src: [
					'<%= dirs.input %>/images/sprites/*.png',
					'!<%= dirs.input %>/images/sprites/sprite.png'
				],
				dest: '<%= dirs.output %>/images/sprites/sprite.png',
				destCss: '<%= dirs.input %>/stylesheets/sprites/sprites.less',
				cssTemplate: '<%= dirs.input %>/stylesheets/sprites/template-handlebars/less.template.handlebars',
				imgPath: '../images/sprites/sprite.png',
				algorithm: 'binary-tree',
				padding: 10
			}
		},
		
		connect: {
			server: {
				options: {
					port: '3000',
					base: '<%= dirs.output %>',
					open: true,
					livereload: true
				}
			}
		},
		
		watch: {
			options: {
				livereload: true,
				files: [
					'<%= dirs.input %>/**/*.{gif,png,jpeg,svt,woff,woff2,ttf,eot,mp3,mp4}'
				]
			},
			
			sprites: {
				files: ['<%= dirs.input %>/images/sprites/**'],
				tasks: 'copy:sprites'
			},
			
			assets: {
				files: ['<%= dirs.input %>/images/**'],
				tasks: 'copy:assets'
			},
			
			templates: {
				files: '<%= dirs.input %>/templates/**',
				tasks: 'assemble'
			},
			
			stylesheets: {
				files: ['<%= dirs.input %>/stylesheets/**/*.less','!<%= dirs.input %>/stylesheets/temp/**'],
				tasks: 'stylesheets'
			},
			
			javascripts: {
				files: '<%= dirs.input %>/javascripts/**',
				tasks: 'javascripts'
			},

			js: {
				files: '<%= dirs.output %>/javascripts/*.min.js>',
				tasks: ['uglify']
			},
			
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: 'build'
			}
		}
		
	});
	
	grunt.registerTask('copy:sprites', ['sprite']);
	
	grunt.registerTask('stylesheets', ['clean:stylesheets','sprite','less','autoprefixer','concat:stylesheets','bless']);
	
	grunt.registerTask('javascripts', ['clean:javascripts','concat:javascripts','copy:javascripts','uglify']);
	
	grunt.registerTask('build', ['clean','copy','javascripts','stylesheets','assemble']);
	
	grunt.registerTask('default', ['build','connect','watch']);
	
};
