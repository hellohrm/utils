
var helloguy,
    _stateGUY = function (m, act) {
        if (!helloguy) {
            helloguy = document.getElementById('helloguy');
        };
        helloguy.style.display = m;
    };

//
var ffetch = function () {

        //debugger;
        //__rmvs();
        //
        var url = this,
            _uri = url.split('/'),
            delaySRIPT = [];

        _uri.splice(_uri.length - 1, 1);
        //
        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, // this line is important, if this content-type is not set it wont work
        }).then(function (res) {

            if (!res.ok) {
                throw new Error('Network response was not OK');
            }
            return res.text();
            //
        }).then(function (myBlob) {
            //
            //
            console.log(new Date().getTime(), 'display form login');
            //
            //
            //myImage.src = URL.createObjectURL(myBlob);
            var elemDiv = document.createElement('div'), $t = myBlob;//e.data.substring(6);
            elemDiv.innerHTML = $t;//.replace(new RegExp('srcpfmedia', 'g'), srcpf$ + '/media');
            //
            var maxEL = elemDiv.children.length;
            //
            for (var i = maxEL - 1; i > -1; i--) {

                var child = elemDiv.children[i];
                if (child.getAttribute('seel') !== 'itme') continue;
                //
                switch (child.tagName.toLowerCase()) {
                    case 'prehead': {
                        //document.getElementsByTagName('head')[0].innerHTML += (child.innerHTML);
                        break;
                    }
                    case 'pre': {
                        //_a$.tmp[child.id] = child.innerHTML;
                        break;
                    }
                    case 'style': {
                        document.getElementsByTagName('head')[0].appendChild(child);
                        break;
                    }
                    case 'link': {
                        //debugger;
                        if (child.rel == 'stylesheet') {
                            var referCSS = child.outerHTML.match(/href="([^"]*)/)[1],
                                referURI = referCSS.split('/');
                            //
                            if (referURI.length > 0 && referURI[0].indexOf('http') != 0) {

                                for (var kk = referURI.length - 1; kk > -1; kk--) {
                                    if (referURI[kk] == '..') {
                                        for (var z = _uri.length - 1; z > -1; z++) {
                                            //
                                            referURI.splice(kk, 1);
                                            _uri.splice(z, 1);
                                            //
                                            kk--;
                                            //
                                            if (kk < 0) {
                                                break;
                                            }
                                        };
                                        break;
                                    }
                                };
                                //
                                referCSS = _uri.concat(referURI).join('/');
                                //
                            };
                            _gsC(referCSS, 'css', function () {

                            });
                        }
                        break;
                    }
                    case 'script': {
                        delaySRIPT.push(child);
                        break;
                    }
                    default: {
                        //
                        //chinh sua nut remember me ....
                        if (window['_cordovaNative']) window._cordovaNative.__.remME(child);
                        //
                        document.body.appendChild(child);
                        //
                        break;
                    }
                };
            };


            for (var y = 0; y < delaySRIPT.length; y++) {
                apisvr.a$.scod(delaySRIPT[y], 'js');
            };

            //debugger;
            setTimeout(function () {
                _stateGUY('none','initok');
                if (!helloguy.classList.contains('init-bg')) {
                    helloguy.classList.add('init-bg');
                }
            }, 100);

        }).catch(function (error) {
            //debugger;
            console.error('There has been a problem with your fetch operation:', error);
            _stateGUY('none', 'initerr');
        });



        if (window['_cordovaNative']) {
            //code nay duoc viet trong file https://hellohrm.github.io/utils/pagelands/js/liway_android_index.js
            //quy uoc logout thi set android USR_HRM='';
            window._cordovaNative.__.hieu_comjs('USR_HRM', btoa(''), '');
        };



    }, Mr_WEB = function (th$, mrweb) {
        //
        //debugger;
        //khi pm.js ko login duoc se goi thong tin ve day
        //
        if (apisvr.review_regis != undefined) {
            //
            //dang muon review register 
            //
            window.sweetalert2_DLG = function () {
                //debugger;
                window.dupHELLO({
                    showConfirmButton: false,
                    showCancelButton: false,
                    backdrop: 'transparent',
                    txt: 'js_regis'
                }
                , function (rst) {/*callback fn here*/
                    //debugger;
                });
            };

        } else {
            //
            //tro ve man hinh login
            //
            (function (cb) {
                // Detect if user is on IE browser
                var isIE = !!window.MSInputMethodContext && !!document.documentMode;
                //
                if (isIE) {
                    // Create Promise polyfill script tag
                    _gsC("https://cdn.jsdelivr.net/npm/promise-polyfill@8.1.3/dist/polyfill.min.js", 'js', function () {
                        _gsC("https://cdn.jsdelivr.net/npm/whatwg-fetch@3.4.0/dist/fetch.umd.min.js", 'js', function () {

                            cb();

                        }, 'fetch.umd.min.js');
                    }, 'polyfill.min.js');
                } else {

                    cb();

                }
            })(ffetch.bind(mrweb.split('|')[1]));//
        };
        //
    };
(function () {

    var lod = '',

        //'https://fwlogin.pages.dev/liway_login' 'http://hellohrm2020.ddns.net:10996/liway_login?XDEBUG_SESSION_START=154A5348'
        liwaywayapp = 'https://fwlogin.pages.dev/liway_login',//'https://fwlogin.pages.dev/liway_login'//

        mrweb = 'mrweb="https://hellohrm.github.io/utils|' + liwaywayapp + '"';//https://hellohrm.github.io/utils //http://192.168.1.91:10996
    //
    document.body.innerHTML += lod +
        '<iframe id="poorway" data-src="&lt;form&gt;&lt;input type=&quot;hidden&quot; name=&quot;whoami&quot; id=&quot;whoami&quot; data-whoareu=&quot;&quot; ' +

        //neu run online data-prefixsrc=&quot;https://hrm.dnd.vn&quot;
        'data-prefixsrc=&quot;https://hrm.dnd.vn&quot;/&gt;&lt;input type=&quot;hidden&quot; name=&quot;diesvr&quot; id=&quot;diesvr&quot; value=&quot;&quot; /&gt;&lt;/form&gt;" data-lang="" pages-dev="" '

        + mrweb + ' style="position:absolute;width:1px;height:1px;left:-10px"></iframe>';

    //
    var spt = document.createElement("script");
    spt.type = "text/javascript";
    spt.src = "https://hrm.dnd.vn/media/js/pm.js";//"http://192.168.1.91:10996/media/js/pm.js";//"https://hrm.dnd.vn/media/js/pm.js"; //"https://hrm.dnd.vn/media/js/pm.js"; // "https://hrm.dnd.vn/media/js/pm.js";
    document.body.appendChild(spt);
    //


    if (window._cordovaNative) {
        //
        //1. extend  method __ into hieu_comjs trong cordova class SystemExposedJsApi.js

        //2. use in admin.min.js
        //
        const JAV = window._cordovaNative,

            JSR = JAV.__ = {

                hieu_comjs: function (/*argument dynamic*/) {
                    //hieu_comjs co 02 cho ben native android.
                    //1. SystemExposedJsApi --> cho pm chinh load len, va setup cac thong so USR_HRM
                    //2. ChatHeadJavaScriptInterface ---> khi bong bong chat hien len va view expand.
                    //
                    try {
                        if (!this.isLOAD) {//call lan dau khi load admin.min.js
                            //hide setting theme....
                            //qryU lay ben pm.js
                            //admin.min.js call thi chua co $
                            //
                            if (qryU['timegold_regisview'] != undefined) {
                                //ko cho hien ra...
                                document.getElementById('settings').classList.add('d-none');
                                //
                                document.body.classList.remove(cS$.c0lor + 'color');
                                //
                            };
                            this.isLOAD = 1;//raise flag
                        };
                        //
                        return JAV.hieu_comjs([].slice.apply(arguments, [0]));//
                        //
                    } catch (err) { };
                }

                ,

                remME: function (frm) {
                    try {
                        var blg = frm.querySelector('#btnlogin').previousElementSibling;
                        blg.style.display = 'none';
                        //
                        blg = blg.previousElementSibling;
                        blg.checked = true;
                        blg.style.display = 'none';
                        //
                        var div = document.createElement('div');
                        div.innerHTML = '<div href="javascript:void(0)" style="cursor:pointer;font-style:italic">Copyright  &copy;</div>';
                        blg.parentNode.insertBefore(div, blg);
                        //
                        div.addEventListener("dblclick", function (e) {

                            //alert('here');
                            //window.location.replace(location.href.split('#')[0]);
                            //
                            //
                            e.preventDefault();
                            e.stopPropagation();
                            //
      
                            //
                            //
                            window.__copyright = function () {
                                $('#tmp_cakip_overview').trigger('click');
                            };
                            //
                            _stateGUY('');
                            //
                            //
                            const bod = helloguy.parentNode;
                            bod.innerHTML = helloguy.outerHTML;
                            //
                            bod.classList.add('timegold_regisview');
                            //
                            setTimeout(function () {
                                //
                                //debugger;
                                //
                                var pubAPP = window._cordovaNative.__debug ;
                                if (pubAPP) {
                                    pubAPP = pubAPP.apphrm_ol;
                                } else {
                                    pubAPP = 'https://hellohrm.github.io/utils/pagelands/js/apphrm_ol.js';
                                };
                                //
                                //
                                _gsC(pubAPP+ '?t=' + new Date().getTime(), 'js', function () {
                                    //
                                    //
                                }, 'apphrm_ol.js');

                            });

                            //if (window['_cordovaNative']) window._cordovaNative.__.remME(child);


                        }, false);
                        //
                    } catch (err) { };
                }

                ,

                regis_chat: function (mobi_cmm, IMG) {

                    if (qryU['timegold_regisview'] == undefined) {
                        //duoc chay tren appHRM-phone native, 
                        //goi qua do de set link server hinh + regis data
                        try {
                            //debugger;
                            //JS_JS_reglv.js ---- > . SystemExposedJsApi --> cho pm chinh load len, va setup cac thong so USR_HRM
                            if (IMG) JAV.hieu_comjs(IMG);

                        } catch (err) { };
                        //
                        return "2";
                        //
                    };

                    //function nay lay template quan ly noi dung chat ...

                    var def = $.Deferred();

                    mobi_cmm.trigger('get', [srcp$f + '/media/utils/bubble_msg_demo.html' + src$id, function (data) {//get co ky tu \x03 giua chu e va chu t
                        //  
                        var ecU = this;

                        mobi_cmm.trigger('',//trigger event "\x1C\x1D\x1E\x1F"

                        [data,

                            false,//option add script when load , no worry, vi link jquery se emty string.

                            $.Deferred().done(function () {
                                //
                                const rawHTML = $(adCS(arguments[0], ecU));
                                //
                                for (var z = rawHTML.length - 1; z > -1; z--) {

                                    if (rawHTML[z].classList && rawHTML[z].classList.contains("bubble_chat_msg_body")) {
                                        //
                                        //add them css link vao html
                                        rawHTML[z].innerHTML += "<link rel='stylesheet' href='" + srcp$f + "/media/utils/pagelands/css/bubble_msg_demo.css'/>";
                                        //
                                        //doi class them ve container chat
                                        $(document.body).append(rawHTML[z]);
                                        //
                                        break;
                                        //
                                    };
                                };
                                //
                                //add code vao 
                                apisvr.a$.scod(arguments[3].join(''));
                                //
                                //
                                def.resolve('1');//sure script already .
                                //

                                /*
                                rawHTML = rawHTML.find('.upload_hsnv_excel');
                                //
                                rawHTML.find('[data-lang]').each(function (idx, el) {
                                    //
                                    var key = el.getAttribute('data-lang');
                                    $(el).html(_La$N(key, elUI.lan));
                                    //
                                });
                                */
                                //pDIV.html(rawHTML.html());
                                //
                                //dume.init_S(pDIV);
                                //
                            })]);
                        //
                    }]);

                    return def.promise();

                }

                ,

                bubble_sync_main: function () {

                    debugger;

                    const tha = this, args = [].slice.apply(arguments, [0]),
                        fNA = args.splice(0, 1);
                    //
                    tha.bubble_sync_main.__[fNA].apply(null, args);
                }
            }
    };


})();
