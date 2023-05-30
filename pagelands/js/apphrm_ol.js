
(function () {

    "use strict";

    String.prototype.utoa = function () {
        return window.btoa(unescape(encodeURIComponent(this)));
    };
    // base64 encoded ascii to ucs-2 string
    String.prototype.atou = function () {
        return decodeURIComponent(escape(window.atob(this)));
    };
    //

    var cok = function (a, b, u) {

        u = u || 'Date';

        var exdate = new Date(), st_hn = window.location.hostname; exdate['set' + u](exdate['get' + u]() + b);
        document.cookie = a + '; domain=' + (/^((\d){1,3}\.){3}(\d){1,3}$/.test(st_hn) ? '' : '.') + st_hn.replace('www.', '') + (window.location.protocol.indexOf('https:') >= 0 ? '; SameSite=None; Secure' : '') + ';path=/ ; expires=' + exdate.toUTCString();
    }

        ,

        gQRY = function () {

            var QRY = window.location.search.substring(1),
                rst = {};

            // is there anything there ?
            //https://stackoverflow.com/questions/12381563/how-can-i-stop-the-browser-back-button-using-javascript
            if (QRY.length) {
                //
                //luu giu lai url query string :tham_so_demo
                localStorage.setItem('dGhhbV9zb19kZW1v', QRY);
                //
                // are the new history methods available ?
                if (window.history != undefined && window.history.pushState != undefined) {
                    //remove url query string 
                    // if pushstate exists, add a new state to the history, this changes the url without reloading the page
                    window.history.pushState({}, document.title, window.location.pathname);
                    //
                };
                //
            } else {
                QRY = localStorage.getItem('dGhhbV9zb19kZW1v') || '';
            };
            //
            //
            if (QRY.length > 0) {
                var ps = decodeURIComponent(QRY).split(/\?|\&/);
                for (var z = 0; z < ps.length; z++) {
                    if (ps[z]) {
                        var p = ps[z].split("=");
                        rst[p[0].trim()] = p[1] && p[1].trim();
                        //
                        //quy uoc query string key dau tien la language
                        if (z == 0) {
                            rst['lan'] = p[0].trim();
                            cok("selected_language=" + p[0].trim(), 365);
                        };
                        //
                    };
                };
            };
            //
            return rst;
            //
        }(),

        libs = {

            shared: '../media_shared'//'https://apphrm.github.io/media_shared'//
            ,
            vs2010: 'hellodat.dnd.vn'//'hellodat.pages.dev' //'localhost:5114'//  //(1 in 2)     vs2010
            ,
            srcpf$: 'https://hrm.dnd.vn'//'http://192.168.1.91:10996'//

            ,

            testARG: JSON.stringify({ 'mnu': 'JS_nhapxuat', 'arg': {} })

        }
        ,

        rundemo = function (lg) {


            var csPrnt,

                JOB = {

                    iniMSG: function () {

                        var def = $.Deferred(),
                            terMSG = $('<div style="margin:auto;width:500px;font-size:larger;"></div>').appendTo(app_container);

                        //debugger;
                        _gsC(srcpf$ + '/media/js/termynal.js', 'js', function () {

                            csPrnt = new Termynal(terMSG[0], {
                                cbNewLine: function () {
                                    //debugger;
                                    //terMSG[0].scrollTop = terMSG[0].scrollHeight;
                                }
                                , //lineDelay: 5
                                typeDelay: 40,
                                lineDelay: 700
                            });


                            //csPrnt.WriteLns(
                            //    [
                            //        { type: 'input', prompt: '▲', value: 'npm uninstall react' },
                            //        { value: 'Are you sure you want to uninstall \'react\'?' },
                            //        { type: 'input', typeDelay: 1000, prompt: '(y/n)', value: 'y' },
                            //        { type: 'progress', progressChar: '·' },
                            //        { value: 'Uninstalled \'react\'' },
                            //        { type: 'input', prompt: '▲', value: 'node' },
                            //        { type: 'input', prompt: '>', value: "Array(5).fill('🦄 ')" },
                            //        { value: "['🦄', '🦄', '🦄', '🦄', '🦄']" },
                            //        { type: 'input', prompt: '▲', value: 'cd ~/repos' },
                            //        { type: 'input', prompt: '▲ ~/repos', value: ' git checkout branch master' },
                            //        { type: 'input', prompt: '▲ ~/repos (master)', value: 'git commit -m \'Fix things\'' },
                            //    ]);


                            //csPrnt.WriteLn({ type: 'input', prompt: ' ▲ ', value: dog, typeDelay: 10 }, function (ln) {
                            //    //fnMSG();
                            //});

                            csPrnt.WriteLn({ type: 'input', prompt: '▲', value: 'Please wait a while we are establishing demo data.' }, function (ln) {
                                csPrnt.WriteLn({ type: 'progress', progressChar: '·' }, function (ln) {
                                    //fnMSG();
                                    def.resolve();
                                });
                            });

                        }, 'TermynalJS');
                        //
                        return def.promise();
                        //
                    }
                    ,
                    iniDAT: function () {
                        //
                        var def = $.Deferred(),


                            frm = '//' + $('#poorway').attr('pages-dev');


                        frm = libs.shared; //'https://qlns.pages.dev';


                        dbXLSX({

                            uri: '/api/headermaster', "act": 'GET', 'qry': 'demo', 'url': frm + '/odat/' + lg + '/assets/demo1.dat'

                        }).then(function (v1) {
                            //
                            def.resolve(v1);
                            //
                        }, function (error) {

                            def.resolve();

                        });
                        //
                        //
                        return def.promise();
                        //
                    }

                };
            //
            var demoargs = st('getItem', 'ZGVtb2FyZ3M') || libs.testARG;
            //
            if (demoargs) {
                //
                st('removeItem', 'ZGVtb2FyZ3M');
                //
                //
                JOB.iniDAT().then(function (cf) {

                    //debugger;

                    var exe = function () {
                        //debugger;
                        //
                        demoargs = JSON.parse(demoargs);
                        //
                        $('#' + demoargs.mnu).trigger('click', { 'demo': btoa(JSON.stringify(demoargs.arg)) });
                    }

                    if (cf.inidat) {
                        //chua co nhan vien, va , ko phai import nham...
                        JOB.iniMSG().done(function (msg) {
                            //
                            $.when(cf.ini).done(function (p) {
                                //debugger;
                                csPrnt.WriteLn({ value: "['🦄', '🦄', '🦄', '🦄', '🦄']" }, function (ln) {
                                    csPrnt.distroy();
                                    exe()
                                });
                            });
                            //
                        });
                    } else {

                        exe();

                    };
                });
                //
                //
            };
            //
        };




    if (gQRY['lan'] && gQRY[gQRY['lan']]) {
        //'ZGVtb2FyZ3M'  //demoargs

        debugger;

        var demoargs = JSON.parse(gQRY[gQRY['lan']].atou());
        libs.testARG = JSON.stringify(demoargs[1]); // JSON.stringify({ 'mnu': 'JS_nhapxuat', 'arg': {} });
        libs.shared = demoargs[0].shr;
        libs.srcpf$ = demoargs[0].jcs;
        libs.vs2010 = demoargs[0].fnc;
        //        libs = {

        //            shared: '../media_shared'//'https://apphrm.github.io/media_shared'//
        //        ,
        //            vs2010: 'hellodat.dnd.vn'//'hellodat.pages.dev' //'localhost:5114'//  //(1 in 2)     vs2010
        //        ,
        //            srcpf$: 'https://hrm.dnd.vn'//'http://192.168.1.91:10996'//

        //        ,

        //            testARG: JSON.stringify({ 'mnu': 'JS_nhapxuat', 'arg': {} })

        //        }
    };




    document.write('<link rel="stylesheet" type="text/css" href="https://hrm.dnd.vn/media/css/pm.css">' +
        '<div id="helloguy" class="ekko-lightbox-loader">' +
        '<div id = "anim-six">' +
        '<div class="stopwatch">' +
        '<div class="head">' +
        '</div>' +
        '<div class="hand rotate">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>');
    //
    //
    var div = document.createElement('div');
    div.innerHTML = '<iframe id="poorway" data-src="&lt;form&gt;&lt;input type=&quot;hidden&quot; name=&quot;whoami&quot; id=&quot;whoami&quot; data-whoareu=&quot;&quot; data-prefixsrc=&quot;https://hrm.dnd.vn&quot;/&gt;&lt;input type=&quot;hidden&quot; name=&quot;diesvr&quot; id=&quot;diesvr&quot; value=&quot;&quot; /&gt;&lt;/form&gt;"' +

        'data-lang=""' +

        'pages-dev="' + libs.vs2010 + '"' + //localhost:5114 (1 in 2) zkdat.pages.dev    vs2010

        'style="position:absolute;width:1px;height:1px;left:-10px" ></iframe> ';
    //
    div = div.getElementsByTagName('IFRAME')[0];
    //
    div.onload = function () {
        //
        div = document.createElement('script');
        div.setAttribute('type', 'text/javascript');

        div.src = libs.srcpf$ + "/media/js/pm.js"//"http://192.168.1.91:10996/media/js/pm.js"//"https://hrm.dnd.vn/media/js/pm.js";//(2 in 2)
        //
        //
        div.addEventListener('load', function () {
            //
            admined = function (a, b, c) {
                //
                var lgDIC = $.extend(true, {}
                    ,
                    JSON.parse(atob('eyJ2aSI6eyIwIjoidmkiLCIxIjoiVGlcdTFlYmZuZyBWaVx1MWVjN3QiLCIyIjp7ImVuIjoiRW5nbGlzaCIsInZpIjoiVGlcdTFlYmZuZyBWaVx1MWVjN3QifSwiZl8wMDNfMSI6Ilx1MDExMFx1MDBmM25nIiwiZl8wMDNfMiI6Ilx1MDExMFx1MDEwM25nIG5oXHUxZWFkcCIsImZfMDAzXzMiOiJcdTAxMTBcdTAxMDNuZyBrXHUwMGZkIiwiZl8wMDNfNCI6Ilx1MDExMFx1MDEwM25nIHh1XHUxZWE1dCIsImZfMDAzXzUiOiJUXHUwMGVjbSBraVx1MWViZm0gLi4uIiwiZl8wMDNfNiI6IlRoaVx1MWViZnQgQlx1MWVjYiIsImZfMDAzXzciOiJUXHUwMGVkbmggQ1x1MDBmNG5nIiwiZl8wMDNfOCI6IkNcdTAwZTBpIFx1MDExMFx1MWViN3QiLCJmXzAwM185IjoiUXVcdTFlYTNuIGxcdTAwZmQgbmdcdTAwZTB5IExcdTFlYzUiLCJmXzAwM18xMCI6Ikx1XHUxZWFkdCBUXHUwMTAzbmcgY2EiLCJmXzAwM18xMSI6Ilx1MDExMFx1MDFhMW4gdlx1MWVjYiB0XHUwMGVkbmggQ1x1MDBmNG5nIiwiZl8wMDNfMTIiOiJUXHUwMGUwaSBsaVx1MWVjN3UgaFx1MDFiMFx1MWVkYm5nIGRcdTFlYWJuIiwiZl8wMDNfMTMiOiJIXHUxZWQzIHNcdTAxYTEgbmhcdTAwZTJuIHZpXHUwMGVhbiIsImZfMDAzXzE0IjoiKzg0IDMzOTQ0OTYyMS1ISUhSUyIsImZfMDAzXzE1IjoiTGlcdTAwZWFuIGhcdTFlYzcgYlx1MWVhM24gcXV5XHUxZWMxbiIsImZfMDAzXzE2IjoiVElOIE5IXHUxZWFlTiIsImpzXzAwM18xIjoiXHUwMTEwXHUwMGYzbmciLCJqc18wMDNfb2siOiJUaGFvIHRcdTAwZTFjIGhvXHUwMGUwbiB0XHUxZWE1dC4iLCJqc18wMDNfZXJyIjoiXHUwMTEwXHUwMGUzIGNcdTAwZjMgbFx1MWVkN2ksIHZ1aSBsXHUwMGYybmcgdGhcdTFlZWQgbFx1MWVhMWkgISIsImpzXzAwM19oZWxwIjoiVHJcdTFlZTMgZ2lcdTAwZmFwIiwianNfMDAzX2MiOlt7ImlkIjo0LCJkaXMiOiJUXHUwMTAzbmcgY2EifSx7ImlkIjozMSwiZGlzIjoiQ2Ega1x1MDBlZHAifSx7ImlkIjozNCwiZGlzIjoiSFx1MWVhMW4gbVx1MWVlNWMgQ1x1MDBmNG5nIGhcdTFlYzcgdGhcdTFlZDFuZyJ9XSwianNfMDAxXzE1IjoiPGJyXC8+PGEgaHJlZj1qYXZhc2NyaXB0OnZvaWQoJiMzOTswJiMzOTspPjxzdHJvbmc+UGhpXHUwMGVhbiBiXHUxZWEzbiBjXHUwMGUwaSBcdTAxMTFcdTFlYjd0IFdpbmRvd3MgXC88XC9zdHJvbmc+PFwvYT4gPGEgaHJlZj1qYXZhc2NyaXB0OnZvaWQoJiMzOTswJiMzOTspPlRoaVx1MWViZnQga1x1MWViZiBnaVx1MWVhM2kgcGhcdTAwZTFwICZhbXA7IFBoXHUxZWE3biBtXHUxZWMxbSBcLzxcL2E+IDxhIGhyZWY9amF2YXNjcmlwdDp2b2lkKCYjMzk7MCYjMzk7KT5UaGlcdTFlYmZ0IGJcdTFlY2IgY2hcdTFlYTVtIGNcdTAwZjRuZzxcL2E+IiwianNfMDAxXzE2IjoiVFx1MDBlYW4gbmhcdTAwZTJuIHZpXHUwMGVhbiIsImpzXzAwMV8xNyI6Ik1cdTFlZGYgcmEgaFx1MWViZnQiLCJqc18wMDFfMTgiOiJUaHUgZ1x1MWVjZG4gbFx1MWVhMWkiLCJqc18wMDFfMTkiOiJUXHUxZWQ1bmcgc1x1MWVkMSIsImpzXzAwMV8yMCI6Ilx1MDExMGFuZyB0XHUxZWEzaSIsImpzXzAwMV8yMSI6WyJOXHUxZWVmIiwiTmFtIl0sImpzXzAwMV8yMiI6Ik5cdTAxMDNtIiwianNfMDAxXzIzIjoiXHUwMTEwXHUwMTAzbmcgS1x1MDBmZCBDaFx1MWVhNW0gQ1x1MDBmNG5nIiwianNfMDAxXzI0IjoiTmhcdTAwZjNtIHRoZW8iLCJqc18wMDFfMjUiOiJWdWkgbFx1MDBmMm5nIHhcdTAwZTFjIG5oXHUxZWFkbiBiXHUxZWExbiB0aFx1MWVhZHQgc1x1MWVmMSBtdVx1MWVkMW4geFx1MDBmM2EgPyIsImpzXzAwMV8yNiI6IlRcdTFlYTNpIGxcdTFlYTFpIiwianNfMDAxXzI3IjoiVnVpIGxcdTAwZjJuZyB4XHUwMGUxYyBuaFx1MWVhZG4gdHJcdTAxYjBcdTFlZGJjIGtoaSB0aVx1MWViZnAgdFx1MWVlNWMgdGhcdTFlZjFjIGhpXHUxZWM3bi4iLCJqc18wMDFfMjgiOiJcdTFlZDIgISBcdTAxMTBcdTFlY2JuaCBkXHUxZWExbmcgXHUxZWEzbmgga2hcdTAwZjRuZyBoXHUxZWUzcCBsXHUxZWM3LiIsImpzXzAwMV8yOSI6IlhcdTAwZjNhIHRcdTFlYTV0IGNcdTFlYTMgXHUwMTExYW5nIGNoXHUxZWNkbiIsImpzXzAwMV8zMCI6IlF1XHUxZWEzbiBsXHUwMGZkIFx1MDExMFx1MDEwM25nIG5oXHUxZWFkcCIsImpzXzAwN18xIjoiTVx1MDBlMyBBQyIsImpzXzAwN18yIjoiQ1x1MWVhN24gbmhcdTFlYWRwIG1cdTAwZTMgQUMiLCJqc18wMDdfYWNubyI6IlRyXHUwMGY5bmcgbVx1MDBlMyBBQyIsImpzXzAwN18zIjoiTVx1MDBlMyBOLnZpXHUwMGVhbiIsImpzXzAwN180IjoiQ1x1MWVhN24gbmhcdTFlYWRwIG1cdTAwZTMgTmhcdTAwZTJuIHZpXHUwMGVhbiIsImpzXzAwN19lbXBjb2RlIjoiVHJcdTAwZjluZyBtXHUwMGUzIE5oXHUwMGUybiB2aVx1MDBlYW4iLCJqc18wMDdfNSI6IkhcdTFlY2QgJiBsXHUwMGYzdCIsImpzXzAwN182IjoiQ1x1MWVhN24gbmhcdTFlYWRwIEhcdTFlY2QgJiBsXHUwMGYzdCIsImpzXzAwN183IjoiVFx1MDBlYW4gTi52aVx1MDBlYW4iLCJqc18wMDdfOCI6IkNcdTFlYTduIG5oXHUxZWFkcCBUXHUwMGVhbiBuaFx1MDBlMm4gdmlcdTAwZWFuIiwianNfMDA3XzkiOiJOZ1x1MDBlMHkgc2luaCIsImpzXzAwN18xMCI6Ik5nXHUwMGUweSB2XHUwMGUwbyIsImpzXzAwN18xMSI6Ilx1MDExMFx1MDBlMyBjXHUwMGYzIGxcdTFlZDdpLCB2dWkgbFx1MDBmMm5nIGtpXHUxZWMzbSB0cmEgbFx1MWVhMWkgISIsImpzXzAwN18xMiI6IkdpXHUxZWRiaSB0XHUwMGVkbmgiLCJqc18wMDdfMTMiOiJIXHUxZWQzIFNcdTAxYTEgTmhcdTAwZTJuIFZpXHUwMGVhbiIsImpzXzAwN18xNCI6IlBoXHUwMGYybmcgYmFuIiwianNfMDA3XzE1IjoiQ2hcdTFlZTljIHZcdTFlZTUiLCJqc18wMDdfMTYiOiJCXHUxZWIxbmcgY1x1MWVhNXAiLCJqc18wMDdfMTciOiJIXHUwMGY0biBuaFx1MDBlMm4iLCJqc18wMDdfMTgiOiJUaFx1MDBmNGkgdmlcdTFlYzdjIiwianNfMDA3XzE5IjoiXHUwMTEwaVx1MWVjN24gdGhvXHUxZWExaSIsImpzXzAwN18yMCI6IlNcdTFlZDEgQ01ORCIsImpzXzAwN18yMSI6Ik5nXHUwMGUweSBjXHUxZWE1cCIsImpzXzAwN18yMiI6Ik5cdTAxYTFpIGNcdTFlYTVwIiwianNfMDA3XzIzIjoiXHUwMTEwXHUxZWNiYSBjaFx1MWVjOSIsImpzXzAwN18yNCI6IkdoaSBjaFx1MDBmYSIsImpzXzAwN18yNSI6IlRcdTFlYTFvIG1cdTFlZGJpIiwianNfMDA3XzI2IjoiU1x1MWVlZGEiLCJqc18wMDdfMjciOiJYXHUwMGYzYSIsImpzXzAwN18yOCI6IkhcdTAwZWNuaCBcdTFlYTNuaCIsImpzXzAwN18yOSI6IkxcdTAxYjB1IHRyXHUxZWVmIiwianNfMDA3XzMwIjoiQlx1MWVjZiBxdWEiLCJqc18wMDdfMzEiOiJYXHUwMGUxYyBuaFx1MWVhZG4geFx1MDBmM2EgTmhcdTAwZTJuIHZpXHUwMGVhbiIsImpzXzAwN18wMzEiOiJMXHUwMWIwdSBcdTAwZmQgbFx1MDBlMCBiXHUxZWExbiBraFx1MDBmNG5nIHRoXHUxZWMzIHBoXHUxZWU1YyBoXHUxZWQzaSBuaFx1MDBlMm4gdmlcdTAwZWFuIGJcdTFlY2IgeFx1MDBmM2EgISIsImpzXzAwN18zMiI6IkhvXHUwMGUwbiB0XHUxZWE1dCB4XHUwMGYzYSBuaFx1MDBlMm4gdmlcdTAwZWFuICEiLCJqc18wMDdfMzMiOiJCXHUxZWExbiBjaFx1MWVhZmMgY2hcdTFlYWZuIGxcdTAwZTAgbXVcdTFlZDFuIHhcdTAwZjNhIGhcdTAwZWNuaCBOaFx1MDBlMm4gdmlcdTAwZWFuPyIsImpzXzAwN18zNCI6IlRoYW8gdFx1MDBlMWMgaG9cdTAwZTBuIHRcdTFlYTV0LiIsImpzXzAwN18zNSI6IlZ1aSBsXHUwMGYybmcgXHUwMTExaVx1MWVjMW4gXHUwMTExXHUxZWE3eSBcdTAxMTFcdTFlZTcgdHJcdTAxYjBcdTFlZGRuZyBjXHUxZWE3biB0aGlcdTFlYmZ0LiIsImpzXzAwN18zNiI6IkNoXHUxZWNkbiBuaFx1MDBlMm4gdmlcdTAwZWFuIiwianNfMDA3XzM3IjoiXHUwMTEwXHUwMGYzbmcifX0='))
                    ,
                    JSON.parse(atob('eyJlbiI6eyIwIjoiZW4iLCIxIjoiRW5nbGlzaCIsIjIiOnsiZW4iOiJFbmdsaXNoIiwidmkiOiJUaVx1MWViZm5nIFZpXHUxZWM3dCJ9LCJmXzAwM18xIjoiQ2xvc2UiLCJmXzAwM18yIjoiTG9nIGluIiwiZl8wMDNfMyI6IlNpZ24gdXAiLCJmXzAwM180IjoiTG9nIG91dCIsImZfMDAzXzUiOiJTZWFyY2guLi4iLCJmXzAwM182IjoiRGV2aWNlcyIsImZfMDAzXzciOiJDYWxjdWxhdGluZyIsImZfMDAzXzgiOiJTZXR0aW5nIiwiZl8wMDNfOSI6IkhvbGlkYXkgTWFuYWdlbWVudCIsImZfMDAzXzEwIjoiT3ZlcnRpbWUgUnVsZXMiLCJmXzAwM18xMSI6IlRpbWUgQXR0ZW5kYW5jZSBVbml0cyIsImZfMDAzXzEyIjoiRG9jdW1lbnRhdGlvbiIsImZfMDAzXzEzIjoiRW1wbG95ZWVzIHByb2ZpbGUiLCJmXzAwM18xNCI6Iis4NCAzMzk0NDk2MjEtSElIUlMiLCJmXzAwM18xNSI6IkFsbCByaWdodHMgcmVzZXJ2ZWQiLCJmXzAwM18xNiI6Ik1FU1NBR0VTIiwianNfMDAzXzEiOiJDbG9zZSIsImpzXzAwM19vayI6Ik9wZXJhdGlvbiBpcyBjb21wbGV0ZS4iLCJqc18wMDNfZXJyIjoiRXJyb3JzIGhhdmUgb2NjdXJyZWQsIHBsZWFzZSB0cnkgYWdhaW4gISIsImpzXzAwM19oZWxwIjoiSGVscCIsImpzXzAwM19jIjpbeyJpZCI6NCwiZGlzIjoiT3ZlcnRpbWUifSx7ImlkIjozMSwiZGlzIjoiU2hpZnQifSx7ImlkIjozNCwiZGlzIjoiQXR0ZW5kYW5jZSBzeXN0ZW0gaXRlbXMifV0sImpzXzAwMV8xNSI6IjxiclwvPjxhIGhyZWY9amF2YXNjcmlwdDp2b2lkKCYjMzk7MCYjMzk7KT48c3Ryb25nPlBoaVx1MDBlYW4gYlx1MWVhM24gY1x1MDBlMGkgXHUwMTExXHUxZWI3dCBXaW5kb3dzIFwvPFwvc3Ryb25nPjxcL2E+IDxhIGhyZWY9amF2YXNjcmlwdDp2b2lkKCYjMzk7MCYjMzk7KT5UaGlcdTFlYmZ0IGtcdTFlYmYgZ2lcdTFlYTNpIHBoXHUwMGUxcCAmYW1wOyBQaFx1MWVhN24gbVx1MWVjMW0gXC88XC9hPiA8YSBocmVmPWphdmFzY3JpcHQ6dm9pZCgmIzM5OzAmIzM5Oyk+VGhpXHUxZWJmdCBiXHUxZWNiIGNoXHUxZWE1bSBjXHUwMGY0bmc8XC9hPiIsImpzXzAwMV8xNiI6IkZ1bGwgbmFtZSIsImpzXzAwMV8xNyI6IkV4cGFuZCBhbGwiLCJqc18wMDFfMTgiOiJDb2xsYXBzZSBhbGwiLCJqc18wMDFfMTkiOiJUb3RhbCIsImpzXzAwMV8yMCI6IkxvYWRpbmciLCJqc18wMDFfMjEiOlsiRmVtYWxlIiwiTWFsZSJdLCJqc18wMDFfMjMiOiJSZWdpc3RyYXRpb24gVGltZWtlZXBpbmciLCJqc18wMDdfMSI6IkFDIG5vIiwianNfMDA3XzIiOiJSZXF1aXJlIGlucHV0IEFDIG5vIiwianNfMDA3X2Fjbm8iOiJEdXBsaWNhdGUgQUMgbm8iLCJqc18wMDdfMyI6IkVtcCdzIGNvZGUiLCJqc18wMDdfNCI6IlJlcXVpcmUgaW5wdXQgRW1wbG95ZWUncyBjb2RlIiwianNfMDA3X2VtcGNvZGUiOiJEdXBsaWNhdGUgZW1wJ3MgY29kZSIsImpzXzAwN181IjoiTGFzdCBuYW1lIiwianNfMDA3XzYiOiJSZXF1aXJlIGlucHV0IExhc3QgbmFtZSIsImpzXzAwN183IjoiRmlyc3QgbmFtZSIsImpzXzAwN184IjoiUmVxdWlyZSBpbnB1dCBGaXJzdCBuYW1lIiwianNfMDA3XzkiOiJCaXJ0aGRhdGUiLCJqc18wMDdfMTAiOiJIaXJlZGF0ZSIsImpzXzAwN18xMSI6IkVycm9ycyBoYXZlIG9jY3VycmVkLCBwbGVhc2UgY2hlY2sgYWdhaW4gISIsImpzXzAwN18xMiI6IkdlbmRlciIsImpzXzAwN18xMyI6IkVtcGxveWVlJ3MgUHJvZmlsZSIsImpzXzAwN18xNCI6Ik9yZ2FuaXphdGlvbiIsImpzXzAwN18xNSI6IlBvc2l0aW9uIiwianNfMDA3XzE2IjoiRGVncmVlIiwianNfMDA3XzE3IjoiTWFyaXRhbCIsImpzXzAwN18xOCI6IkZhcmV3ZWxsIiwianNfMDA3XzE5IjoiUGhvbmUiLCJqc18wMDdfMjAiOiJJZGVudGl0eSBjYXJkIiwianNfMDA3XzIxIjoiSXNzdWVkIG9uIiwianNfMDA3XzIyIjoiSXNzdWVkIHBsYWNlIiwianNfMDA3XzIzIjoiQWRkcmVzcyIsImpzXzAwN18yNCI6Ik5vdGVzIiwianNfMDA3XzI1IjoiQWRkIG5ldyIsImpzXzAwN18yNiI6IkVkaXQiLCJqc18wMDdfMjciOiJEZWxldGUiLCJqc18wMDdfMjgiOiJQaWN0dXJlIiwianNfMDA3XzI5IjoiU2F2ZSIsImpzXzAwN18zMCI6IkNhbmNlbCIsImpzXzAwN18zMSI6IkRlbGV0ZSBFbXBsb3llZSBjb25maXJtYXRpb24iLCJqc18wMDdfMDMxIjoiTm90ZSB0aGF0IHlvdSBjYW5ub3QgcmVzdG9yZSBkZWxldGVkIGVtcGxveWVlICEiLCJqc18wMDdfMzIiOiJEZWxldGUgZW1wbG95ZWUgY29tcGxldGVkICEiLCJqc18wMDdfMzMiOiJZb3UgYXJlIHN1cmUgd2FudCB0byBkZWxldGUgdGhlIEVtcGxveWVlIHBpY3R1cmU/IiwianNfMDA3XzM0IjoiT3BlcmF0aW9uIGlzIGNvbXBsZXRlLiIsImpzXzAwN18zNSI6IlBsZWFzZSBmaWxsIGluIGFsbCByZXF1aXJlZCBmaWVsZHMuIiwianNfMDA3XzM2IjoiQ2hvb3NlIEVtcGxveWVlcyIsImpzXzAwN18zNyI6IkNsb3NlIn19'))
                )

                    , lg = window['apisvr'] ? apisvr.a$.selected_language : 'vi'
                    , _gLA = function (na, ix) {
                        //
                        var re = lgDIC[lg] && lgDIC[lg][na] && lgDIC[lg][na];
                        //
                        if (ix === undefined || !re) return re;
                        //
                        return re[ix];
                    };
                //
                //
                $('#app').on('onTabAdding', function (e, tab) {
                    //debugger;

                    //var preLang = $(tab).find('pre#lang'),
                    //    dume = JSON.parse(atob(preLang.text()));

                    //preLang.text('eyJqc18wMDRfMjUiOiJBY05vIiwianNfMDA0XzI2IjoiTmFtZSIsImpzXzAwNF8yNyI6IkNoZWNrIHRpbWUiLCJqc18wMDRfMzIiOiJUb3RhbCBsb2dzIiwianNfMDA0XzMzIjoiRW1wbG95ZWVzIiwianNfMDA0XzEiOiJDcmVhdGUgTmV3IFNoaWZ0IiwianNfMDA0XzIiOiJDaG9vc2UgU2hpZnQgRnJvbSBMaXN0IiwianNfMDA0XzMiOiJPSyIsImpzXzAwNF80IjoiU2F2ZSBjaGFuZ2VzIiwianNfMDA0XzUiOiI8YnJcLz48YSBocmVmPWphdmFzY3JpcHQ6dm9pZCgmIzM5OzAmIzM5Oyk+PHN0cm9uZz5QaGlcdTAwZWFuIGJcdTFlYTNuIGNcdTAwZTBpIFx1MDExMVx1MWViN3QgV2luZG93cyBcLzxcL3N0cm9uZz48XC9hPiA8YSBocmVmPWphdmFzY3JpcHQ6dm9pZCgmIzM5OzAmIzM5Oyk+VGhpXHUxZWJmdCBrXHUxZWJmIGdpXHUxZWEzaSBwaFx1MDBlMXAgJmFtcDsgUGhcdTFlYTduIG1cdTFlYzFtIFwvPFwvYT4gPGEgaHJlZj1qYXZhc2NyaXB0OnZvaWQoJiMzOTswJiMzOTspPlRoaVx1MWViZnQgYlx1MWVjYiBjaFx1MWVhNW0gY1x1MDBmNG5nPFwvYT4iLCJqc18wMDRfNiI6IlJlbW92ZSBhbGwgU2hpZnQgb24gbGlzdCIsImpzXzAwNF83IjoiUmVtb3ZlIFNoaWZ0IiwianNfMDA0XzgiOiJOZXh0IiwianNfMDA0XzkiOiJCYWNrIiwianNfMDA0XzEwIjoiU2hpZnQgRGlhZ3JhbSIsImpzXzAwNF8xMSI6WyJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLiIsIlBsZWFzZSBlbnRlciBhdCBsZWFzdCAwMiBjaGFyYWN0ZXJzLiIsIkludmFsaWQgZGF0YS4iLCJEdXBsaWNhdGUgY29kZSEiXSwianNfMDA0XzEyIjpbIkRyb3AgdGhlIGZpbGUgY29udGFpbmluZyBhdHR0ZW5kYW5jZSBsb2dzIGRhdGEgaGVyZSwgb3IgY2xpY2sgdG8gc2VsZWN0IHRoZSBmaWxlIHRvIHVwbG9hZCAoLmRhdCwgLnhsc3gsIC54bHMsIC5jc3YsIC50eHQpIl0sImpzXzAwNF8xMyI6WyJGcm9tIGRhdGU6ICIsIlRvIGRhdGU6ICIsIk1pbiBsb2ciLCJNYXggbG9nIl0sImpzXzAwNF8xNCI6WyJDaG9vc2UgdGltZSBwZXJpb2QuLi4iLCJVc2VkIHRvIGxpbWl0IGNhcmQgZGF0YSBmb3IgdGhlIHBlcmlvZCBGcm9tIGRhdGUgLSBUbyBkYXRlLiIsIlNlbGVjdCBlbXBsb3llZXMuLi4iLCJTZWxlY3QgZW1wbG95ZWVzIHRvIGJlIGNvdW50ZWQgKGRlZmF1bHQgaXMgbm90IHNlbGVjdGVkIHRvIGNvdW50IGFsbCBpbiB0aGUgbGlzdCkiXSwianNfMDA0XzE1IjpbIkNob29zZSBmcm9tIHN0b3JhZ2UiLCJTdG9yYWdlIGxpc3QiLCJGaWxlIG5hbWUiLCJUaW1lIiwiVG90YWw6IiwiVGltZSBhbmQgYXR0ZW5kYW5jZSBkYXRhIGhhcyBjaGFuZ2VkIGZyb20gdGhlIG9yaWdpbmFsIHN0b3JhZ2U8YnJcLz5QcmVzcyA8aSBjbGFzcz0nY29udGV4dC1oZWxwIHRpLW1vdXNlLWFsdCc+PFwvaT4gT0sgdG8gc2F2ZSBhbmQgcmVjYWxjdWxhdGUuIl0sImpzXzAwNF8xNiI6WyJQbGVhc2UgY29uZmlybSB0aGF0OiIsIkRvIHlvdSByZWFsbHkgd2FudCB0byBDYW5jZWwgc2F2aW5nIHRoZSBjdXJyZW50IEZpbGU/IiwiRG8geW91IHJlYWxseSB3YW50IHRvIGRlbGV0ZSB0aGUgc2VsZWN0ZWQgc3RvcmFnZT8iLCJZb3UgcmVhbGx5IHdhbnQgdG8gcmVtb3ZlIChub3QgZGVsZXRlIGZyb20gc3RvcmFnZSkiLCJZb3UgcmVhbGx5IHdhbnQgdG8gcmVtb3ZlIGFsbCAobm90IGRlbGV0ZSBmcm9tIHN0b3JhZ2UpIiwiWW91IHJlYWxseSB3YW50IHRvIGlnbm9yZSB0aGUgY2hhbmdlIGFuZCBnbyBiYWNrIHRvIHRoZSBvcmlnaW5hbD8iXSwianNfMDA0XzE3IjpbIlRoaXMgZmlsZSBoYXMgYmVlbiBzYXZlZCAuLi4gPGJyXC8+UGxlYXNlIGNvbmZpcm0gaWYgeW91IHdhbnQgYSBuZXcgdXBkYXRlIiwiRGF0YSBoYXMgY2hhbmdlZCIsIllvdSBjYW4gU2F2ZSBvciBDYW5jZWwgdGhpcyBjaGFuZ2UgYnkgcHJlc3NpbmcgPGkgY2xhc3M9J2NvbnRleHQtaGVscCB0aS1tb3VzZS1hbHQnPjxcL2k+IG9uIG9uZSBvZiB0aGUgdHdvIGJ1dHRvbnMgYWJvdmUgLi4uIiwiWW91IGNhbiBDYW5jZWwgdGhpcyBjaGFuZ2UgYnkgcHJlc3NpbmcgPGkgY2xhc3M9J2NvbnRleHQtaGVscCB0aS1tb3VzZS1hbHQnPjxcL2k+IG9uIGJ1dHRvbiBhYm92ZSAuLi4iXSwianNfMDA0XzE4IjpbIk5lZWQgWW91ciBEZWNpc2lvbiEiLCI8ZGl2IGNsYXNzPSd0ZXh0LWNlbnRlcic+PHA+VGhlIGRhdGEgaGFzIGNoYW5nZWQgZnJvbSB0aGUgb3JpZ2luYWwuPFwvcD5QbGVhc2UgcHJlc3MgPGkgY2xhc3M9J2NvbnRleHQtaGVscCB0aS1tb3VzZS1hbHQnPjxcL2k+IG9uIG9uZSBvZiB0aGUgYnV0dG9ucyBiZWxvdy4uLjxcL2Rpdj4iLCJWaWV3IG9sZCByZXN1bHRzIiwiVXBkYXRlICYgQ2FsY3VsYXRlIl0sImpzXzAwNF8xOSI6WyJDYWxjdWxhdGluZyIsIllvdSBjYW4gc3RvcCBieSBwcmVzc2luZyB0aGUgXHUyMDFjIFN0b3AgXHUyMDFkIGJ1dHRvbiAuLi4iLCJDYWxjdWxhdGlvbiBydWxlcyIsIllvdSBjYW4gY2hhbmdlIHRoZSBydWxlIGFuZCBwcmVzcyB0aGUgXHUyMDFjIFJlLUNhbGMgXHUyMDFkIGJ1dHRvbiIsIlJlLUNhbGMiLCJQbGVhc2UgY29uZmlybSBiZWZvcmUgUmUtQ2FsYy4iLCJSZXN1bHQgcmVuZGVyaW5nIiwiUmV0cmlldmluZyByZXN1bHQiXSwianNfZ29qcyI6WyJXRUVLIFdPUktJTkcgU0NIRURVTEUiLCJNb24iLCJUdWUiLCJXZWQiLCJUaHUiLCJGcmkiLCJTYXQiLCJTdW4iLCJBdXRvIGNhbGN1bGF0ZSBPVCBpZiBlbnRlcmVkIGVhcmxpZXI6ICIsIkF1dG8gY2FsY3VsYXRlIE9UIGlmIGNvbWUgb3V0IGxhdGVyOiAiLCJJbiB0aW1lOiAiLCJPdXQgdGltZTogIiwiVG90YWwgb2YgSG91cmx5IHdvcmtlZDogIiwiY29udmVydCB0byBEYXkgbGFib3I6ICIsIlRoZXJlIGFyZSBhc3NpZ25lZCB3b3JraW5nIGhvdXJzOiAiLCJJdCdzIGEgd2Vla2VuZDogIiwiSWYgbW9yZSBPVVQgY2FyZHMgd2lsbCB0YWtlIGNhcmQ6IiwiSWYgbW9yZSBJTiBjYXJkcyB3aWxsIHRha2UgY2FyZDoiLCJJTlRFUkVTVCBUSU1FIiwiQWZ0ZXIgY2hlY2staW4gKG1pbnV0ZXMpOiAiLCJUb3RhbCBtaW51dGVzIHJlc3Q6ICIsIlNraXAgdGhpcyBwYXJhbWV0ZXIgaWYgdmFsdWUgPSAtMSBPbmx5IGNvdW50IHdoZW4gdmFsdWUgPj0wIG1pbnV0ZXMiLCJDaGVjayBpbj8iLCJDaGVjayBvdXQ/IiwiVGltZSB0byBzdGFydCByZXN0aW5nIiwiQnJlYWsgdGltZSBpcyBvdmVyIl0sImpzX2dvanNfMSI6Ik1vdmUgZGlhZ3JhbSIsImpzX2dvanNfMiI6Ik9yaWdpbiBaRVJPIEhvdXIiLCJqc19nb2pzXzMiOlt7ImlkIjoiMCIsImRlcyI6ImVhcmxpZXN0In0seyJpZCI6IjEiLCJkZXMiOiJsYXRlc3QifV0sImpzX2dvanNfNCI6WyJUb3RhbCB0aW1lIiwiVmFsaWQgdGltZSBwZXJpb2QgZm9yIGNoZWNrLUluICBDYXJkIiwiVGltZSBwZXJpb2QgZm9yIGNoZWNrLUluLUxhdGUgQ2FyZCIsIlRpbWUgcGVyaW9kIGZvciBjaGVjay1PdXQtRWFybHkgQ2FyZCIsIlZhbGlkIHRpbWUgcGVyaW9kIGZvciBjaGVjay1PdXQgQ2FyZCIsIm1pbnV0ZXMiXSwianNfZ29qc181IjpbIkluIiwiTGF0ZSIsIkVhcmx5IiwiT3V0Il0sImpzX2dvanNfNiI6WyJDb25maXJtIEJlZm9yZSBEZWxldGU/IiwiQXJlIHlvdSBzdXJlIHdhbnQgdG8gZGVsZXRlIHNlbGVjdGVkIFNoaWZ0PyIsIkFyZSB5b3Ugc3VyZSB3YW50IHRvIGRlbGV0ZSBhbGwgU2hpZnRzPyJdLCJqc19nb2pzXzciOlsiQ29uZmlybSBCZWZvcmUgU2F2ZSBTaGlmdCBQYXJhbWV0ZXJzIENoYW5nZWQ/IiwiQXV0byBTYXZlIHdpdGhvdXQgYXNraW5nIiwiKEJlZ2luLWluIHRpbWUpIiwiKEluIHRpbWUpIiwiKExhdGUtaW4gdGltZSkiLCIoRXhwaXJlLWluIHRpbWUpIiwiKEJlZ2luLW91dCB0aW1lKSIsIihFYXJseS1vdXQgY291bnRpbmcgdGltZSkiLCIoT3V0IHRpbWUpIiwiKEV4cGlyZS1vdXQgdGltZSkiXX0=');


                }).find('[lanf]').each(function (idx, el) {
                    //
                    var key = el.getAttribute('lanf'),
                        laN = $(el);
                    //
                    if (key.indexOf('lanCF') > -1) {
                        key = key.split('\x04');
                        laN.html(_gLA(key[1]));
                        //
                        laN.prev().html('<i class="flag-icon flag-icon-' + _gLA(0) + '"></i>');
                        //
                        //xu ly dropdown....
                        laN.parent().next().find('a').map(function (a, b) {
                            //
                            a = $(b);
                            key = a.attr('lang');
                            //
                            a.find('>i').css('visibility', lg == key ? 'visible' : 'hidden');
                            //
                            //render language item
                            a.find('span>i').next().html(_gLA(2, key));
                        });
                        //
                    } else if (key.indexOf('placeholder') > -1) {
                        //
                        key = key.split('\x04');
                        laN.attr(key[0], _gLA(key[1]));
                        //
                    } else {
                        laN.html(_gLA(key));
                    };
                    //
                });
                //
                rundemo(lg);
                //
            };

        });

        document.body.appendChild(div);
    };
    //
    //div luc nay la iframe;
    document.body.appendChild(div);
    //
})();
