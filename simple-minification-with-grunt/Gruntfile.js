module.exports = (grunt) => {
    /**
     * Buat task baru untuk minifikasi dengan nama "minification".
     */
    grunt.registerTask("do-minify", "Script minification.", () => {
        /**
         * List file CSS yang ingin diminifikasi.
         * Urutan file sangat berpengaruh, jadi tentukan mana yang harus duluan mana yang setelahnya.
         */
        const CSS = [
            "css/reset.css",
            "css/style.css"
        ]

        /**
         * List file JS yang ingin diminifikasi.
         * Sama dengan file CSS, urutan file sangat berpengaruh.
         */
        const JS = [
            "js/variable.js",
            "js/script.js"
        ]

        /**
         * Load module yang akan digunakan.
         */
        grunt.loadNpmTasks('grunt-contrib-concat')
        grunt.loadNpmTasks('grunt-contrib-uglify')
        grunt.loadNpmTasks('grunt-contrib-cssmin')

        /**
         * Task config.
         * 
         * Ini adalah konfigurasi dari task-task yang akan dijalankan.
         * Kita perlu menentukan lokasi file yang akan diminifikasi dan
         * lokasi hasil minifikasinya.
         */
        grunt.initConfig({
            concat: {
                scss: {
                    src: CSS,
                    dest: 'dist/css/style.css'
                },
                js: {
                    src: JS,
                    dest: 'dist/js/script.js'
                }
            },
            cssmin: {
                options: {
                    // menghilangkan komen agar file yang sudah diminifikasi
                    // hanya berisi kode yang dibutuhkan saja
                    level: { 1: { specialComments: 0 } }
                },
                main: {
                    files: [{
                        expand: true,
                        cwd: 'dist/css',
                        src: 'style.css',
                        dest: 'dist/css',
                        ext: '.css'
                    }]
                }
            },
            uglify: {
                main: {
                    files: [{
                        expand: true,
                        cwd: 'dist/js',
                        src: 'script.js',
                        dest: 'dist/js'
                    }]
                }
            }
        })

        /**
         * Run task.
         * Task akan dijalankan sesuai urutan.
         */
        grunt.task.run([
            // 01. file CSS dan JS akan digabungkan menjadi 1 file.
            // Pada proses ini, akan membuat folder baru dengan nama "dist"
            // di dalam folder tersebut ada file css dan js yang sudah digabung.
            'concat',

            // 02. file JS yang sudah digabung akan di-minifikasi.
            'uglify',

            // 03. file CSS yang sudah digabung akan di-minifikasi.
            'cssmin'
        ])
    })
}