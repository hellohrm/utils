'use strict';

var test_toast = function (log) {
    //
    if (log.length == 0 || log[0].length<2) return;
    //
    _gsC('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css', 'css', function (data) {
        _gsC('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js', 'js', function (data) {
            //
            _gsC(srcpf$ + '/media/css/toastr_ex.css', 'css', function () {
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": true,
                    "progressBar": false,
                    "positionClass": "toast-bottom-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "0",
                    "hideDuration": "0",

                    //"timeOut": "0",
                    //"extendedTimeOut": "0",

                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut",
                    //tapToDismiss: false,
                    toastClass: 'rtv_msg',
                    containerId: 'rtv-container',
                };//
                //debugger;
                toastr[log[2]===1?'info':'success']('<div class="card" style="background: none;">' +
                    '<div class="media ml-1 mr-3"><i class="ti-check msgicon"></i>' +
                        '<div class="media-body">' +
                            '<h6 class="mt-1 mb-0">No.' + log[1][0] + ' / Usr: ' + log[0][0] + '</h6><span>' + log[0][1] + '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>');

            }, 'toastr_ex.css');
            //
        }, 'toastr.min.js');
    }, 'toastr.css');
},

gloEVTs = {
    RTEVT: function (e) {//device realtime event log
        var msg = this;
        if (msg && msg.length > 3 && msg[3] == e) {
            //debugger;
            test_toast([msg[4].split('\t'), msg[2], msg[5]]);
        };
    }
},

sockjo = function () {

    var isfrm = !w0w.Worker || false,
        soclib = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.1/socket.io.min.js',
        socjs = (srcp$f ? srcp$f : w0w.location.href.split(w0w.location.pathname)[0]) + '/media/utils/jsc/globalevts.js' + src$id,
        calcSession = '123456789',
        postArgs = [[], , 0],
        so$io,
        hwp = 'hasOwnProperty',
        jobRST = function (s, e) {
            //
            //s:0 : from iframe, 1:job worker
            //
            //debugger;
            var rst = e.evtData;
            if (f_n[hwp](rst[0])) { //event bind collection
                var bindEVT = f_n[rst[0]];
                if (typeof bindEVT === "function") {

                    bindEVT.bind(rst[0])();//moi load xong  call bm9kZWpzX3NvY2tldF9vaw

                } else {
                    for (var _self in bindEVT) {
                        if (bindEVT[hwp](_self)) {
                            //
                            if (_self.indexOf('self__') == 0) {//property nay moi la event
                                var EVTs = bindEVT[_self], ename = rst[1];
                                if (EVTs[hwp](ename)) {//event name
                                    //
                                    EVTs[ename].bind(rst[2])();
                                    //
                                    //
                                    //detect global event
                                    if (bindEVT.gloE[hwp](ename)) {
                                        if (bindEVT.gloE[hwp](ename)) {
                                            var pubevt=bindEVT.gloE[ename];
                                            gloEVTs[pubevt].bind(rst[2])(pubevt);
                                        }
                                    };
                                    //
                                };
                            };
                            //
                        };
                    };
                };
            };
        },


        f_n = {//default se co event loaded ????
            'bm9kZWpzX3NvY2tldF9vaw': function () {
                //
                while (postArgs[0].length > 0) {
                    so$io.postMessage.apply(so$io, [postArgs[0].shift(), postArgs[1]]);//postArgs[1]="*" if iframe
                };
                postArgs[2] = 1;//alreaddy load
                //
                delete f_n[this];//remove luon item nay khoi collection f_n
                //
            }
        }//nodejs_socket_ok

        , clean_f_n = function (__k) {
            var bindEVT = f_n[__k];
            for (var _self in bindEVT) {
                if (bindEVT.hasOwnProperty(_self)) {
                    return 1;
                    break;
                };
            };
            delete f_n[__k];//clean luon
            return 0;
        }

        , __ = function () {
            //

            if (isfrm) {
                var gevt = document.createElement('iframe');
                gevt.setAttribute("style", "height:1px;width:1px;border:none;opacity:0");
                //
                document.body.appendChild(gevt);//append vao step 3 main div
                var te = gevt.contentWindow.document;
                te.open();
                te.write('<script  type="text/javascript" src="' + soclib + '"></script><script seson="' + btoa(calcSession + '|' + w0w.location.origin + '|' + isfrm) + '" type="text/javascript" src="' + socjs + '"></script>');
                te.close();
                gevt.onload = function () {
                    //
                    //debugger;
                    so$io = gevt.contentWindow;
                    so$io.init_ifrm();
                    //
                };
                postArgs[1] = "*";
                apisvr.a$.sessions[calcSession] = {
                    id: calcSession,
                    fn: function (a, b, c) {
                        if (a == 'job') {
                            jobRST(0, b, c);
                        };
                    }
                };
            } else {//job worker
                so$io = new Worker(window.URL.createObjectURL(
                        new Blob(["importScripts('" + [soclib, socjs].join("','") + "');"],
                        {
                            type: 'text/javascript'
                        })
                    ));
                so$io.onmessage = function (e) { jobRST(1, e.data); };
            };
        };

    window.JO = (function () { // scoping

        return (function (addr, opts, MORs) { // constructor

            var th$t = this,
                sockid = MORs[0],
                myself = 'self__' + new Date().getTime(),
                ename = [],
                gloE = {},
                msg = {
                    messageType: 'iniSOCK', evtData: {
                        id: sockid,
                        s0ck: [addr, opts, ename]
                    }
                },
                evts = {};
            //
            this.wdms = {};//wdms options
            //
            this.on = function (e, fn,pubE) {
                //debugger;
                //
                ename.push(e);//event name
                //
                //ko sao ca, cai moi chong len cai cu cua global
                evts[e] = function () {
                    fn.bind(th$t)(this);
                };//this la parameter bind
                //
                if (pubE && !gloE[hwp](e)) gloE[e] = pubE;
                //
                return th$t;
            };
            //
            //
            this.off = function (e) {
                //
                ename.splice($.inArray(e, ename), 1);//dung jquery
                //
                delete evts[e];
                return th$t;
            };
            //
            //
            this.close = function (ags) {
                //
                //debugger;
                //
                if (f_n[hwp](sockid)) {//chua da ton tai listen cua server socket io
                    //
                    var isPUB = 0,
                        pe = ags && ags[0]==1 ? [] : ename.reduce(function (ge, n) {//pe:public event
                            if (gloE[hwp](n)) {
                                //
                                isPUB++;
                                ge.push("$" + n);//dua sang engine de giu lai
                                //
                                //chua no lai de bat su kien de truyen sang global....
                                evts[n] = function () { };
                                //
                            } else {
                                //
                                delete evts[n];//off event hien tai *****
                            };
                            //
                            //
                            return ge;
                        }, []);
                    //
                    so$io.postMessage.apply(so$io, [{
                        messageType: 'closeSOCK', evtData: {
                            id: sockid,
                            pe: pe
                        }
                    }, postArgs[1]]);//postArgs[1]="*" if iframe
                    //
                    //
                    if (isPUB == 0) {//ko co global event
                        //remove socket instance, event ....
                        delete f_n[sockid];
                    };
                    //
                    ename=[];//empty luon
                    //
                };
                return th$t;
            };
            //
            this.emit = function (e, d) {
                if (postArgs[2] == 1) {//already
                    so$io.postMessage.apply(so$io, [{
                        messageType: 'emitSOCK', evtData: {
                            id: sockid,
                            s0ck: [e, d]
                        }
                    }, postArgs[1]]);//postArgs[1]="*" if iframe
                }
                return th$t;
            };
            //
            //
            this.STARTd = function (newO) {
                //
                //debugger;
                //
                if (!f_n[hwp](sockid))//chua da ton tai listen cua server socket io
                    f_n[sockid] = {
                        instance: this,
                        gloE: gloE//global event cua socket, <=> khi socket close, neu ton tai tham so nay thi se tiep tuc chay
                    };
                //
                //
                f_n[sockid][myself] = evts;
                //
                //
                if (postArgs[2] == 0) {
                    postArgs[0].push(msg);//luu tru o day de khi load xong se postmessage
                    __();
                } else {
                    so$io.postMessage.apply(so$io, [msg, postArgs[1]]);//postArgs[1]="*" if iframe
                };
                //
                return th$t;
                //
            };

            this.sockAUT = function () {
                return (msg.evtData.s0ck,msg.evtData.s0ck[1].auth);
            }

            this.setAUTH = function (aut) {
                if (postArgs[2] == 1) {//already
                    so$io.postMessage.apply(so$io, [{
                        messageType: 'setAUTH', evtData: {
                            id: sockid,
                            auth: aut
                        }
                    }, postArgs[1]]);//postArgs[1]="*" if iframe
                }
                return th$t;
            }

        });

    })();
    //
    return {
        getSOCK: function (sockid) {
            return f_n[sockid];
        },
        soclib: soclib
    };
    //
}()


, pagerAll = function (pager) {
    var addFuckCss = function (pager) {
        if (pager._pageSizeEditor) {
            pager._pageSizeEditor.option('onOpened', function (e) {
                e.component._$list.addClass('fuck-pager');
            });
        };
    };
    pager._updateLightMode = function (e) {
        pager.constructor.prototype._updateLightMode.call(this);
        addFuckCss(this);
    };
    setTimeout(function () { addFuckCss(pager); });
};

function activeTabClose() {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent('click', false, false);
    $('.chrome-tab[active] .chrome-tab-close')[0].dispatchEvent(evt);//.trigger('click');
}

function is$Date(dtArray) {
    try {
        var dtMonth = parseInt(dtArray[1].replace(/^0+/, ""))
        , dtDay = parseInt(dtArray[2].replace(/^0+/, ""))
        , dtYear = parseInt(dtArray[0].replace(/^0+/, ""));
        if (dtYear < 1900 || dtYear > 2100) {
            return false;
        }
        else if (dtMonth < 1 || dtMonth > 12)
            return false;
        else if (dtDay < 1 || dtDay > 31)
            return false;
        else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
            return false;
        else if (dtMonth == 2) {
            var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
            if (dtDay > 29 || (dtDay == 29 && !isleap))
                return false;
        };
        return true;
    } catch (err) {

    }
    return false;
}

function _uniARR(a) {
    var arr = [];
    for (var i = 0; i < a.length; i++) {
        if (arr.indexOf(a[i]) == -1) {
            arr.push(a[i]);
        }
    }
    return arr;
}

function toastMsg(msg, type, d,p) {
    if (window['DevExpress']) {
        //
        //cho nay gay loi de len setting tab, --> lam click 2 lan nut save ...

        //DevExpress.ui.dxOverlay.baseZIndex = function () { return 9999999; };

        DevExpress.ui.notify({
            hideOnOutsideClick:true,
            message: msg, type: type, displayTime: !d ? 1000 /* 30 * 60000*/: d, maxWidth: '300px', position: !p ? 'bottom center' : p
        });

    } else {
        //ko co dev thi dung toast

        _gsC('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.css', 'css', function (data) {
            _gsC('https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js', 'js', function (data) {
                //
                _gsC(srcpf$ + '/media/css/toastr_ex.css', 'css', function () {
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": true,
                        "progressBar": false,
                        "positionClass": "toast-bottom-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": "0",
                        "hideDuration": "0",

                        "timeOut": !d ? 1000 /* 30 * 60000*/ : d,
                        //"extendedTimeOut": "0",

                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut",
                        "tapToDismiss": true,
                        //toastClass: 'rtv_msg',
                        //containerId: 'rtv-container',
                    };//
                    //debugger;
                    toastr[type]('<div>' +
                        '<div class="media ml-1 mr-3">' +
                            '<div class="media-body">' +
                                msg +
                            '</div>' +
                        '</div>' +
                    '</div>');

                }, 'toastr_ex.css');
                //
            }, 'toastr.min.js');
        }, 'toastr.css');
    }
};

function devMSG(key) {
    return DevExpress.localization.message.getDictionary()[key];
};

function devDlg(vbBOX, msg, t) {

    //AbortRetryIgnore	2	//OK	0	//OKCancel	1	//RetryCancel	5	//YesNo	4	//YesNoCancel	3	
    // Abort	3	Cancel	2	Ignore	5	No	7	None	0	OK	1	Retry	4	Yes	6	

    if (window['DevExpress']) {
        var defF, Yes = { text: devMSG('Yes'), onClick: function (e) { return 6 } }, OK = { text: devMSG('OK'), onClick: function (e) { return 1 } }
        , No = {
            text: devMSG('No'), onClick: function (e) { return 7 }, onContentReady: function (e) {
                defF = e.component;
            }
        }
        , Cancel = {
            text: devMSG('Cancel'), onClick: function (e) { return 2 }, onContentReady: function (e) {
                defF = e.component;
            }
        }
        , btn = []
        , opts = {
            showTitle: false,
            //title: "Custom dialog",
            messageHtml: msg,
            popupOptions: {
                onShown: function (e) {
                    if (defF) defF.focus();
                }
            }
        };
        if (t) {
            opts.showTitle = true;
            opts.title = t;
        }
        switch (vbBOX) {
            case 0: {
                btn = [OK];
                break;
            }
            case 1: {
                btn = [OK, Cancel];
                break;
            }
            case 4: {
                btn = [Yes, No];
                break;
            }
        }
        opts['buttons'] = btn;
        return DevExpress.ui.dialog.custom(opts);
    } else {
        //dung message boottrap popup
        var dag = {
            show: function () {
                puhwnd.modal('show');
                return this;
            }
            ,
            done: function (cb) {
                this.done = cb;
            }
        }
        ,
        puhwnd = admin$.popup({
            a: 'd', m: msg + '</span></div>', cbClosed: function () {
                dag.done('close');
            }
        });
        //
        puhwnd.find('#popupdone').remove();
        puhwnd.addClass('bootstrap-dlg');
        //
        return dag;
        //
    };
};
var glbK = {
    _kLK:null,
    kLK: function () {//lockup devexpress employees
        if (!this._kLK) this._kLK = new Date().getTime();
        return this._kLK;
    }
    , _regVEL: null,//registration V:valid E:emp L:list
    regVEL: function () { //regis form valid em
        if (!this._regVEL) this._regVEL = new Date().getTime();
        return this._regVEL;
    }

    ,

    regDYN: function (na) { //hom mua may tinh DELL 7520 , phat sinh key dynamic cho look, (bat dat la nut menu ben desktop list
        //JS_SJ_reglv.js  : glbK.regDYN('frm_regis')
        if (!this[na]) this[na] = new Date().getTime();
        return this[na];
    }

}
function dogOutCLK(o, v) {
    o[GetIEVersion() == 11 ? 'closeOnOutsideClick' : 'hideOnOutsideClick'] = v;
    return o;
};

function devCTXmnu(target, cont, buildCB) {

    // if this constructor is used without `new`, it adds `new` before itself:
    //if (!(this instanceof JSZip)) {
    //    return new JSZip();
    //}
    if (!devDlg.ctx) {//muon tam devDlg // cap nay se di cung nhau neu ko bi loi
        //
        var tmpl = $('<div class="devCTXmnu"></div>').append(cont.el);
        //
        //choi lon, append to body luon
        //https://stackoverflow.com/questions/12307112/difference-between-document-body-and-body
        devDlg.ctx = [$('<div></div>').appendTo($(document.body)).dxPopover($.extend({}, {
            contentTemplate: function (e) {
                return tmpl;
            },
            target: target,
            showEvent: 'dxclick',
            //position: 'bottom',
            maxWidth: 400,
            hideOnOutsideClick: false,
            shading: false,
            shadingColor: 'rgba(0, 0, 0, 0.5)',
            onDisposing: function (e) {
                //console.log('onDisposing: function (e)');
            },
            onContentReady: function (e) {
                e.component._$popupContent.css('padding', '10px');
                if (buildCB && typeof buildCB === 'function') buildCB();
            },
        }, cont.op)).dxPopover("instance").on('hiding', function (xyz) {
            xyz.component.option('target', null);//reset target
            devDlg.atMNU = {};//reset show status
        })

        ,

        [cont],

        tmpl

        ];
        //
        //
        devDlg.ctxCLEAR = function (MNU) {
            //
            MNU.forEach(function (m) {
                tmpl.find("div[class*='_k-" + m + "']").unbind().removeData().remove();
            });
            //
            devDlg.atMNU = {//reset
                _k: -1,
                _s: false //s:show
            };
        };
        //
    } else {
        //neu bang voi cai load truoc
        if (devDlg.atMNU && devDlg.atMNU._k == cont._k && devDlg.atMNU._s === true) {
            devDlg.ctx[0].hide();
            srclocked(false);
            return;
        };
        //
        var old_po = devDlg.ctx[2].closest('.devCTXmnu').find("div[class*='_k-']"), isOld = 0;
        //
        old_po.map(function (a, o) {
            var O = $(o);
            if (O.hasClass('_k-' + cont._k)) {
                isOld = 1;
                O.removeClass("d-none");
            } else {
                O.addClass("d-none");
            };
        });
        //
        if (isOld == 0) {
            devDlg.ctx[2].append(cont.el);
            if (buildCB && typeof buildCB === 'function') buildCB();
        };
        //
        devDlg.ctx[0].option($.extend({}, {
            'onHidden': null,
            'onHiding': null,
            'onShown': null,
            'onShowing': null,
            //'closeOnOutsideClick':null,
            'hideOnOutsideClick': null,
            'maxWidth': 400,
            'target': target
        }, cont.op || {}));
        //
    };


    devDlg.ctx[0].show();

    devDlg.atMNU = {
        _k: cont._k,
        _s:true //s:show
    }

    srclocked(false);
};

//function mobPULL() {
//    var isChrome = window.chrome || navigator.userAgent.match('CriOS');
//    var isTouch = 'ontouchstart' in document.documentElement;

//    if (!isChrome || !isTouch) {
//        return;
//    }

//    var supportsOverscroll = false;
//    var supportsPassive = false;
//    var lastTouchY = 0;
//    var maybePrevent = false;

//    try {
//        if (CSS.supports('overscroll-behavior-y', 'contain')) {
//            supportsOverscroll = true;
//        }
//    } catch (e) { }

//    if (supportsOverscroll) {
//        return (document.body.style.overscrollBehaviorY = 'contain');
//    } else {
//        var head = document.head || document.body;
//        var style = document.createElement('style');
//        var css =
//          '\n      ::-webkit-scrollbar {\n        width: 5px;\n      }\n      ::-webkit-scrollbar-thumb {\n        border-radius: 5px;\n        background-color: rgba(0, 0, 0, 0.2);\n      }\n      body {\n        -webkit-overflow-scrolling: auto!important;\n      }\n    ';
//        style.type = 'text/css';

//        if (style.styleSheet) {
//            style.styleSheet.cssText = css;
//        } else {
//            style.appendChild(document.createTextNode(css));
//        }

//        head.appendChild(style);
//    }

//    try {
//        window.addEventListener('test', null, {
//            get passive() {
//                supportsPassive = true;
//            },
//        });
//    } catch (e) { }

//    var setTouchStartPoint = function setTouchStartPoint(event) {
//        lastTouchY = event.touches[0].clientY;
//    };

//    var isScrollingUp = function isScrollingUp(event) {
//        var touchY = event.touches[0].clientY;
//        var touchYDelta = touchY - lastTouchY;
//        lastTouchY = touchY;
//        return touchYDelta > 0;
//    };

//    var touchstartHandler = function touchstartHandler(event) {
//        if (event.touches.length !== 1) return;
//        setTouchStartPoint(event);
//        maybePrevent = window.pageYOffset === 0;
//    };

//    var touchmoveHandler = function touchmoveHandler(event) {
//        if (maybePrevent) {
//            maybePrevent = false;

//            if (isScrollingUp(event)) {
//                return event.preventDefault();
//            }
//        }
//    };

//    document.addEventListener(
//      'touchstart',
//      touchstartHandler,
//      supportsPassive
//        ? {
//            passive: true,
//        }
//        : false
//    );
//    document.addEventListener(
//      'touchmove',
//      touchmoveHandler,
//      supportsPassive
//        ? {
//            passive: false,
//        }
//        : false
//    );
//};

//if (Main.isMobile()) {
//    mobPULL();
//};
function sav_e_i(img, cb, apiUrl,$p) {
    // Replace ctrlq with your own API key
    // 0 -> 10
    //Math.floor(Math.random() * 11);
    // 1 -> 10
    //Math.floor(Math.random() * 10) + 1;
    // 5 -> 20
    //Math.floor(Math.random() * 16) + 5;
    // -10 -> (-2)
    //Math.floor(Math.random() * 9) - 10;
    var apiKey = ['7672f6b2b03808a', '1ed4fd2f66f9821'], k = apiKey[Math.floor(Math.random() * 2)],
        fd = new FormData(), s={
        async: false,
        crossDomain: true,
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',

        url: apiUrl,

        type :"POST",
        data: fd

    };
    //
    //
    if (img) {//co the chi post change password
        if ($.type(img) === "string") {
            fd.append('image', img.split(';base64,')[1]);
        } else {
            fd.append('image', img);
        };
    };
    //
    //
    if (!apiUrl) {
        s = $.extend({
            url: 'https://api.imgur.com/3/image',
            headers: {
                Authorization: 'Client-ID ' + k,
                Accept: 'application/json',
            }
        }, s);
    } else {
        if ($p) {
            for (var p in $p) {
                if ($p.hasOwnProperty(p)) {
                    fd.append(p, $p[p]);
                };
            };
        };
    };
    //
    // Response contains stringified JSON
    // Image URL available at response.data.link
    $.ajax(s).done(function (r) {
        cb({ msg: "OK", type: 'success', res: JSON.parse(r) });
    }).fail(function (jqXHR, textStatus) {
        cb({ msg: 'ERR', type: 'error', res: JSON.parse(jqXHR.responseText) });
    });
};


(function () {

    var GetItem = function (itemtype) {
            var val = "";
            switch (itemtype) {
                case ItemType.Session:
                    val = w0w.name;
                    break;
                case ItemType.Local:
                    val = gcok(tKey);//decodeURIComponent(getCookie(tKey));
                    if (val == undefined)
                        val = "";
                    break;
            }
            return val;
        }
        ,

         SetItem = function (itemtype, val) {
             switch (itemtype) {
                 case ItemType.Session:
                     w0w.name = val;
                     break;
                 case ItemType.Local:
                     //setCookie(tKey, val);
                     cok(tKey + "=" + (val || ""));
                     break;
             }
         }

        ,
         createGUID = function () {
             var s4 = function () {
                 return Math.floor((1 + Math.random()) * 0x10000)
                   .toString(16)
                   .substring(1);
             };
             return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
         }

        ,

        //https://www.jqueryscript.net/other/Prevent-Webpage-Opened-Multiple-Tabs-duplicateWindow.html
        tout = (5) * 1000, // 15,000 milliseconds = 15 seconds.

        reInterval = (8 / 2) * 1000, // 10,000 milliseconds = 10 seconds.

        tKey = 'hellohrm-browser-tab',

        mySESS = createGUID(),

        ItemType = {
            Session: 1,
            Local: 2
        }
        ,

        setTabObj = function () {

            var val = GetItem(ItemType.Local) || '';

            //console.log('isEqual: ', mySESS == val, 'mySESS: ', mySESS, 'shared: ', val, 'time: ', new Date().getTime());

            if (true||mySESS != val) {
                //
                if ( val == '') {
                    //meaning .. co 1 tab close, thi toi phai keep ...
                    SetItem(ItemType.Local, mySESS);
                    //continue tracking ...
                    tout = setTimeout(setTabObj, reInterval);
                    //
                } else {
                
                    window.sweetalert2_DLG = function () {
                        window.dupHELLO(
                            apisvr._khachhang ? {
                                showConfirmButton: false,
                                showCancelButton: false,
                            } : null
                        ,
                        function (rst) {/*callback fn here*/
                            if (apisvr._khachhang) {
                                //ben admin_liway.php co gai tham so nay
                                //apisvr._khachhang = 'XHg2Q1x4NjlceDc3XHg2MVx4NzlceDc3XHg2MVx4Nzk'
                                //
                                //kill all events biding body
                                //https://stackoverflow.com/questions/3569393/how-to-unbind-all-event-using-jquery
                                $(document).off().unbind().removeData().find("*").off().unbind().removeData();
                            };
                        });
                    };
                    _gsC('/dupbrowsertab_lanjs.php?k=1&XDEBUG_SESSION_START=154A5348', 'js', function () { });
                    //$.get("/dupbrowsertab_lanjs.php?k=1&XDEBUG_SESSION_START=154A5348", function (data) {
                    //    debugger;
                    //    apisvr.a$.scod(data);
                    //});
                };
                //
            } else {
                //continue tracking ...
                tout = setTimeout(setTabObj, reInterval);
                //
            };
        }
        ,

        OnBeforeUnLoad = function () {
            //release all ???
            SetItem(ItemType.Local, "");
        };

    //
    w0w.addEventListener("beforeunload", OnBeforeUnLoad, false);
    //
    //toi da hien dien, 
    SetItem(ItemType.Local, mySESS);
    //
    //va bat dau check xem neu co thang hien dien khac toi thi toi se out
    tout = setTimeout(setTabObj, reInterval);
    //
})();