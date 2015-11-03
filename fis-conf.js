/**
 * @file fis配置文件
 * @author zhaoran
 * @date 2015-06-03
 */

//开发机 192.168.1.222 rongyi/rongyi 
// ssh rongyi@192.168.1.222
// nginx 端口
// http://192.168.1.222:8088
// node receiver 端口
// http://192.168.1.222:8999/receiver
// 首页
// http://192.168.1.222:8088/static/business/index.html

fis.config.merge({
    replace: {
        outputqa: {
            from : new RegExp([
                'cms\\.w\\.rongyi\\.com',
                'manager\\.w\\.rongyi\\.com',
            ].join('|'), 'g'),

            to : function(m){

                var ouji = '';

                switch (m) {
                    case 'cms.w.rongyi.com':
                        ouji = '192.168.1.204:9100';
                        break;
                    case 'manager.w.rongyi.com':
                        ouji = '192.168.1.89';
                        break;
                }

                return ouji;
            }
        },
        remote: {
            from : new RegExp([
                'cms\\.w\\.rongyi\\.com',
                'manager\\.w\\.rongyi\\.com',
            ].join('|'), 'g'),

            to : function(m){

                var ouji = '';

                switch (m) {
                    case 'cms.w.rongyi.com':
                        ouji = '192.168.1.204:9100';
                        break;
                    case 'manager.w.rongyi.com':
                        ouji = '192.168.1.196';
                        break;
                }

                return ouji;
            }
        },
        local: {
            from : new RegExp([
                'html5Mode\\(true\\)',
                'cms\\.w\\.rongyi\\.com',
                'manager\\.w\\.rongyi\\.com',
            ].join('|'), 'g'),

            to : function(m){

                var ouji = '';

                switch (m) {
                    case 'html5Mode(true)':
                        ouji = 'html5Mode(false)';
                        break;
                    case 'cms.w.rongyi.com':
                        ouji = '192.168.1.204:9100';
                        break;
                    case 'manager.w.rongyi.com':
                        ouji = '192.168.1.196';
                        break;
                }

                return ouji;
            }
        }
    }
});

fis.config.merge({
    rdmachine: [
        {
            rdtest: '',
            odpdir: ''

        }
    ]

});

fis.config.merge({

    staticModule : 'static',

    // modules : {
    //     parser : {
    //         less : ['less']
    //     }
    // },

    // roadmap : {
        
    // },
    pack : {
        '/pkg/vendor.js': [
            '/public/lib/mod.js',
            '/public/bower_components/jquery/dist/jquery.js',
            '/public/bower_components/angular/angular.js'
        ],
        'pkg/vendor2.js': [
            '/public/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            '/public/bower_components/angular-cookies/angular-cookies.js',
            '/public/bower_components/angular-sanitize/angular-sanitize.js',
             '/public/bower_components/angular-animate/angular-animate.js',
            '/public/bower_components/ui-router/release/angular-ui-router.js',
            '/public/bower_components/angular-i18n/angular-locale_zh-cn.js',
            '/public/bower_components/ng-elif/src/elif.js',
            '/public/bower_components/ng-file-upload/ng-file-upload-all.js',
            '/public/bower_components/moment/moment.js',
            '/public/bower_components/bootstrap-daterangepicker/daterangepicker.js',
            '/public/bower_components/angular-daterangepicker/js/angular-daterangepicker.js'
        ],
        '/pkg/vendor.css': [
            '/public/bower_components/bootstrap/dist/css/bootstrap.css',
            '/public/bower_components/font-awesome/css/font-awesome.css',
            '/public/bower_components/textAngular/dist/textAngular.css',
            '/public/bower_components/bootstrap-daterangepicker/daterangepicker-bs3.css',
            '/public/styles/site.less'
        ]
    },
    deploy: {
        // output: [
        //     {
        //         from: '/static',
        //         to: './output'
        //     }
        // ],
        outputqa: [
            {
                from: '/static',
                to: './outputqa',
                replace : fis.config.get('replace').outputqa
            }
        ],
        local: [
            {
                from: '/static',
                to: 'preview',
                replace : fis.config.get('replace').local
            }
        ],
        remote: [
            {
                receiver: 'http://192.168.1.222:8999/receiver',
                from: '/static',
                to: '/home/rongyi/cmsgoods/webroot',
                replace : fis.config.get('replace').remote

            }
        ]

    }
});

// fis.config.get('roadmap.path').unshift(
//     {

//         reg: /.*business\/index\.html$/i,
//         isMod: false,
//         useHash: false,
//         release: '${staticModule}/$&'
//     },
//     {

//         reg: /.*\.html$/i,
//         isMod: false,
//         useHash: true,
//         release: '${staticModule}/$&'
//     });
