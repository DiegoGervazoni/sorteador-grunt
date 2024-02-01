module.exports = function (grunt) {
  //Exporta o módulo para ser utilizado pelo Grunt
  grunt.initConfig({
    //Inicia a configuração do Grunt
    pkg: grunt.file.readJSON("package.json"), //Lê o arquivo package.json
    less: {
      development: {
        files: {
          "dev/styles/main.css": "src/styles/main.less",
        },
      },
      production: {
        options: {
          compress: true,
        },
        files: {
          "dist/styles/main.min.css": "src/styles/main.less",
        },
      },
    },
    watch: {
      less: {
        files: ["src/styles/**/*.less"],
        tasks: ["less:development"],
      },
      html: {
        files: ["src/index.html"],
        tasks: ["replace:dev"],
      },
    },
    replace: {
      dev: {
        options: {
          patterns: [
            {
              match: "ENDERECO_DO_CSS",
              replacement: "./styles/main.css",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["src/index.html"],
            dest: "dev/",
          },
        ],
      },
    },
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: "ENDERECO_DO_CSS",
              replacement: "./styles/main.min.css",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["prebuild/index.html"],
            dest: "dist/",
          },
        ],
      },
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true, //Remove comentários
          collapseWhitespace: true, //Remove espaços em branco
        },
        files: {
          "prebuild/index.html": "src/index.html",
        },
      },
    },
    clean: ["prebuild"],
  });

  grunt.loadNpmTasks("grunt-contrib-less"); //Carrega a tarefa do Grunt para less
  grunt.loadNpmTasks("grunt-contrib-watch"); //Carrega a tarefa do Grunt para watch
  grunt.loadNpmTasks("grunt-replace"); //Carrega a tarefa do Grunt para replace
  grunt.loadNpmTasks("grunt-contrib-htmlmin"); //Carrega a tarefa do Grunt para htmlmin
  grunt.loadNpmTasks("grunt-contrib-clean"); //Carrega a tarefa do Grunt para clean

  grunt.registerTask("default", ["watch"]); //Registra a tarefa default
  grunt.registerTask("build", [
    "less:production",
    "htmlmin:dist",
    "replace:dist",
    "clean",
  ]);
};
