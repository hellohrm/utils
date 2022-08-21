'use strict';
window.hihrsSIG_LOG = (function () {

    var div_slider_exlogin = document.createElement('div')
        , bdy_slider_exlogin = document.getElementsByTagName('body')[0]
        , toggleSlider = function (fn) {
            //
            if (bdy_slider_exlogin.classList.contains('opened')) {
                bdy_slider_exlogin.classList.remove('opened');
                bdy_slider_exlogin.classList.add('closed');
                setTimeout(function () {
                    div_slider_exlogin.innerHTML = '';
                }, 1000);
            } else {
                //
                div_slider_exlogin.innerHTML = '';
                var ifrm = document.createElement('iframe');
                //
                ifrm.onload = function () {
                    var th$ = this;
                    th$.onload = null;
                    //
                    setTimeout(function () {
                        var te = th$.contentWindow.document
                            , session = 'landpage'
                            , datcnt = []
                            , hostdata = 'https://zkdev.dnd.vn/log_reg';

                        te.open();
                        te.write('<form method="post" action="' + hostdata + '" id="reg_log"><input type="hidden" name="duty" id="duty" value="' +
                            window.encodeURIComponent(session + '|' + '' + '|' + window.location.origin + '|' + datcnt.join(',') + '|' + fn) + '"/></form>');
                        te.close();

                        document.createElement('form').submit.call(te.getElementById('reg_log'));
                    }, 100);

                    //
                };
                div_slider_exlogin.appendChild(ifrm);
                //
            }
        }

        , _init = function (args) {
            //
            if (!args) args = {};
            var evtTimeout = -1,
                hwndEVT=null,
                fnEVT = function () {
                    clearTimeout(evtTimeout);
                    hwndEVT = null;
                    if (this) {
                        args[this[0]](div_slider_exlogin, this[1]);
                    };
                };

            //
            div_slider_exlogin.className = 'div_slider_exlogin';
            bdy_slider_exlogin.appendChild(div_slider_exlogin);
            //
            function exlogin_hwndMsg(e) {
                if (e.data.msgtype == 'session') {
                    if (e.data.evtData.evt == 'closed') {
                        if (args.fnclosed && typeof args.fnclosed === "function") {
                            hwndEVT = fnEVT.bind(['fnclosed', e.data.evtData]);
                            evtTimeout = setTimeout(hwndEVT, 1000);
                        }
                        //
                        toggleSlider();
                        //
                    } else if (e.data.evtData.evt == 'loaded') {
                        //
                        if (args.fnLoaded && typeof args.fnLoaded === "function") {
                            hwndEVT = fnEVT.bind(['fnLoaded', e.data.evtData]);
                            evtTimeout = setTimeout(hwndEVT , 1000);
                        }
                        //
                        bdy_slider_exlogin.classList.remove('closed');
                        bdy_slider_exlogin.classList.add('opened');
                        //
                    } else if (e.data.evtData.evt == 'loginok') {
                        var nd = document.createElement("div"); nd.innerHTML = e.data.evtData.html;
                        var script = document.createElement('script');
                        script.type = 'text/javascript';
                        script.innerHTML = nd.getElementsByTagName('script')[0].innerHTML;
                        document.body.appendChild(script);
                    };
                }
            }

            if (window.addEventListener) {
                window.addEventListener('message', exlogin_hwndMsg, false);
            } else if (window.attachEvent) { // ie8
                window.attachEvent('onmessage', exlogin_hwndMsg);
            };

            div_slider_exlogin.addEventListener('transitionend', function(e) {
                //console.log('Transition ended');
                debugger;
                if (hwndEVT) hwndEVT();
            });

        }

    return {
        init: _init,
        toggleUI: toggleSlider
    }
})();



