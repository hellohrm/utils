(function (_) {
    if (!_o$h.hasOwnProperty('tikestep_device')) _o$h['tikestep_device'] = _();//pass pubArgs later if need
})
(function (c) {
    "use strict";

    function privateSharedFunction() {
        // has access to privateSharedVar
        // may also access publicSharedVar via explicit MyObj.prototype
        // can't be called via this
    }
    function MyObj(opts, frmEL, elUI) { // constructor

        var isEDITING = 0
            , fn_wdms_HWND = null
            , msgSTOP = false
            , HEAVY_JOB_HWND = null
            , info_deferred = $.Deferred()
            , nodejs_deferred = $.Deferred()
            , wait_push_hwnd
            , wait_push_TO = new Date();

        const hasUA = opts.ua > 1 ? 'UA' : 'noU', thIs = this,
            online_signal = function () { // scoping

                function _draw(canvas) {//https://codepen.io/collin-garvey/pen/BdWMMb
                    //debugger;
                    //var canvas = document.getElementById('binary-canvas');
                    if (!canvas) return;

                    var raf;

                    const ctx = canvas.getContext('2d'),
                        fontSize = 20,
                        columns = Math.floor(canvas.width / fontSize),
                        rows = Math.floor(canvas.height / fontSize),

                        binChars = ['0', '1'],
                        bits = [],
                        bitHeight = fontSize,
                        bitWidth = fontSize;

                    //ctx.canvas.width = canvas.innerWidth;
                    //ctx.canvas.height = canvas.innerHeight;

                    ctx.font = '20px Arial';
                    ctx.fillStyle = '#444444';

                    // Populate array of 'bits'
                    for (var r = 0; r < rows; r++) {
                        for (var c = 0; c < columns; c++) {
                            bits.push({
                                x: c * bitWidth,
                                y: r * bitHeight,
                                value: binChars[Math.floor(Math.random() * binChars.length)],
                                hasDrawn: false
                            });
                        }
                    }

                    // Vars for manually calculating frame rate
                    const fps = 10,
                        interval = 1000 / fps;

                    var now,then = Date.now(),delta;

                    // Draw all bits once before starting animation
                    bits.forEach(function (bit) {
                        ctx.clearRect(bit.x, bit.y, bitWidth, bitHeight);
                        ctx.fillText(bit.value, bit.x, bit.y + bitHeight);
                        bit.hasDrawn = true;
                    });

                    function dogDR() {
                        raf = window.requestAnimationFrame(dogDR);
                        now = Date.now();
                        delta = now - then;

                        if (delta > interval) {
                            bits.forEach(function (bit) {
                                if (bit.hasDrawn === true && (Math.random() * 100) > 95) { // If passes the randomness check
                                    var newVal = (bit.value === binChars[1]) ? binChars[0] : binChars[1];

                                    ctx.clearRect(bit.x, bit.y, bitWidth, bitHeight);
                                    ctx.fillText(newVal, bit.x, bit.y + bitHeight);
                                    bit.value = newVal;
                                }
                            });
                            then = now - (delta % interval);
                        }
                    }
                    dogDR();
                };

                return {
                    draw:_draw
                };
            }()


            , live = function () {
                msgSTOP = false;
                reset_terMSG();
                //terMSG.html('<canvas></canvas>');
                //online_signal.draw(terMSG.find('canvas')[0]);
                //
                var dog_canvas = wdmsInfo.find('.dog_canvas');
                dog_canvas.html('<canvas></canvas>');
                online_signal.draw(dog_canvas.find('canvas')[0]);
                //
                wdmsInfo.find('.mt-3').html(ht_m[6][0]);
                selA['btnOK'].option({ 'visible': true, 'disabled': false });
                selA.btnCANCEL[0].option('disabled', false);//2 nut close bottom toolbar

                reg_step(2, 0);//lay chu online
                reg_step(3, 0);
                terMSG.next().removeClass().addClass('text-success');
                dead._lastMSG = -1;//reset
            }
            , dead = function (msg) {
                msgSTOP = true;
                if (dead._lastMSG == msg) return;
                //
                reset_terMSG();
                terMSG.next().removeClass().addClass('text-warning');
                reg_step(2, 1);
                selA['btnOK'].option('visible', false);
                selA.btnCANCEL[0].option('disabled', false);//2 nut close bottom toolbar
                wdmsInfo.find('.mt-3').html(ht_m[6][msg][0]);
                //
                //
                terMSG.addClass('timeout');
                wait_push_hwnd = 1;
                wait_push_TO = new Date();
                wait_push_fn(0, ht_m[6][msg]);
                //
                dead._lastMSG = msg;
            }

            , WDMS_CMD_HWND = {}
   

            , WDMS_CMD_HWND_loop = function () {

                clearTimeout(WDMS_CMD_HWND_loop.hwndTimeout);
                //
                const msg = this[0], isTimeout = this[1];

                for (var k in WDMS_CMD_HWND) {

                    if (WDMS_CMD_HWND.hasOwnProperty(k)) WDMS_CMD_HWND[k](msg, k, isTimeout);

                };

            }
            , makeKEY = function (svrI_1) {
                //debugger;
                return btoa(window[st0('1')](svrI_1.replace(/\"/g, "").replace(/,/g, "").slice(1, -1)))
            }
            , wdms_newO = function (wdo, nw, ignoreI) {
                if (wdo) {
                    nw.forEach(function (v, i) {
                        if (ignoreI.indexOf(i) == -1 && v == wdo[1][i]) {
                            nw[i] = -111111111;
                        }
                    });
                }
                return nw;
            }

            , modAUTH = function (phpGRP) {

                //debugger;

                const thr = phpGRP.auth;
                thr.statux = 1;//active, vi khi server mat connect, reconnect send statux=1
                //
                if (phpGRP.DEVs.length > 1 && phpGRP.mcc_statux.hasOwnProperty(phpGRP.DEVs[0])) {
                    //2024-06-24 dam cuoi anh Phong - cau 4 An-Dinh, ty phat hien loi khi co new device kich hoat, trinh duyet reconnect se mat cai cu
                    const chanel_INF = phpGRP.mcc_statux[phpGRP.DEVs[0]];
                    //
                    thr.sn = chanel_INF[3];
                    thr.id = chanel_INF[2];
                    thr.statux = chanel_INF[1];
                    thr.token = phpGRP.DEVs[0];//lay lai token chinh dai dien trinh duyet
                    //
                    phpGRP.setAUTH(thr);//'update socke authr
                } else if (phpGRP.DEVs.length == 1) {
                    //*** (CHU Y) **** 2025/03/01 iphone connect , sau do kick-off lien se bi loi ko khoa man hinh
                    phpGRP.setAUTH(thr);//'update socke authr
                };
            }

            , commit_wdms = function (localCONN) {
                //
                selA.btnCANCEL[0].option('disabled', true);
                selA.btnOK.option('disabled', true);
                //
                //ngan chan call 2 lan khi click nut done loi lan 1
                clearTimeout(WDMS_CMD_HWND_loop.hwndTimeout);
                info_deferred.reject();
                nodejs_deferred.reject();
                //
                //init lại  FUCK !!!
                info_deferred = $.Deferred();
                nodejs_deferred = $.Deferred();;
                //
                //
                const atIO = selA['btnOK'].__k
                , fnKEY = Math.random().toString(36).slice(2, 10) + new Date().getTime()
                , cmdRST = function (req, res, rst) {
                    if (req[0][1] == res[1]) {//cmd request == cmdresponse
                        if (res[1] == -9999) {//cmd cai dat thiet bi wdms
                            //console.log(res[2]);
                            //console.log(rst);
                            //
                            var wdmsI = [-1];
                            switch (res[2]) {
                                case 1: {//command co hien thi message ...
                                    wdmsInfo.find('.mt-3').html(rst[6]);
                                    break;
                                }
                                case 10001:
                                    {
                                        wdmsI[0] = 1;//HRS_MSG
                                        wdmsI[1] = JSON.parse(rst[6]);
                                        break;
                                    }
                                case 50:
                                    {
                                        wdmsI[0] = 2;//Device capacity
                                        wdmsI[1] = rst[6];
                                        break;
                                    }
                            };

                            if (wdmsI[0]>-1) {
                                elUI.WDM[atIO[0]].wdms[PU_valF('serno', 'value')][wdmsI[0]] = wdmsI[1];//gan vao de khi edit thi load len
                            };

                            if (res[0] == 0) {//hoan tat

                                clearTimeout(WDMS_CMD_HWND_loop.hwndTimeout);

                                delete WDMS_CMD_HWND[fnKEY];

                                //(***) new code
                                return localCONN?3:2;

                            };
                        };
                    };
                    return 0;//chua hoan tat
                }
                , inf =atIO && atIO.length>2 && atIO[2].split('\n')
                , reginfo_mor = function () {
                    //old code ---- inf.length > 1 ? '' : inf[0]
                    return JSON.stringify([new Date().getTime() /*moter_session*/]);
                }
                , cmd = [1, -9999, reginfo_mor(), atIO[3],
                     wdms_newO(elUI.WDM[atIO[0]].wdms[PU_valF('serno', 'value')], [PU_valF('rtevt', 'value') ? 1 : 0, PU_valF('timezone', 'selectedItem').tim, PU_valF('timezone', 'value'), PU_valF('isatt', 'value') ? 1 : 0, 0], [1, 2])//0:Realtime,1:TimeZone,2:TimeZoneclock,3:attdevice ,4: region
                ]//[1, 11, '~SerialNumber'];

                , datR = ['DeviceName']



                , fnMSG = function () {
                    if (!msgSTOP) {
                        if (inf.length > 0) {
                            var dog = apisvr.a$.trim(inf.shift());
                            if (dog.substring(0, 1) == '~') {
                                csPrnt.WriteLn({ type: 'input', prompt: ' ▲ ', value: dog, typeDelay: 10 }, function (ln) {
                                    fnMSG();
                                });
                                //
                                datR.forEach(function (dz) {
                                    var datF = dog.split(dz + '=');
                                    if (datF.length == 2 && datF[0] == '~') atIO[4][dz] = datF[1];
                                });
                                //
                            } else {
                                fnMSG();
                            };
                        } else {
                            info_deferred.resolve('info');
                        };
                    };
                };

                WDMS_CMD_HWND[fnKEY] = function (msg, k, isTimeout) {
                    var isRMV = 0;
                    //
                    if (isTimeout == 0) {//same c program, >0 error
                        //console.log( btoa( JSON.stringify(msg)));
                        var bid = this;
                        //(***) new code
                        if (atIO[1] == msg[2] || localCONN) {//token ma hoa
                            isRMV = cmdRST(bid, msg[3], msg[4]);
                        };
                        //
                    } else {
                        isRMV = 1;
                        msgSTOP = true;//show error message
                        info_deferred.reject('info');//reject vi timout client
                        soc_msg(ht_m[7][isTimeout], 'text-danger', 2, true);
                        selA.btnOK.option('visible', false);
                    };
                    //
                    if (isRMV > 0) {

                        delete WDMS_CMD_HWND[k];

                        if (isRMV == 2) {
                            //
                            nodejs_deferred.resolve(msg[5]);
                            //
                            /*
                            //debugger;
                            const phpGRP = elUI.WDM[atIO[0]],
                                thr = phpGRP.auth;
                            thr.statux = 1;//active, vi khi server mat connect, reconnect send statux=1
                            //
                            if (phpGRP.DEVs.length > 1 && phpGRP.mcc_statux.hasOwnProperty(phpGRP.DEVs[0])) {
                                //2024-06-24 dam cuoi anh Phong - cau 4 An-Dinh, ty phat hien loi khi co new device kich hoat, trinh duyet reconnect se mat cai cu
                                const chanel_INF = phpGRP.mcc_statux[phpGRP.DEVs[0]];
                                //
                                thr.sn = chanel_INF[3];
                                thr.id = chanel_INF[2];
                                thr.statux = chanel_INF[1];
                                thr.token = phpGRP.DEVs[0];//lay lai token chinh dai dien trinh duyet
                                //
                                elUI.WDM[atIO[0]].setAUTH(thr);//'update socke authr
                            };
                            */
                            modAUTH(elUI.WDM[atIO[0]]);
                            //
                            //
                            return;
                            //
                        } else if (isRMV == 3) {//(***) new code

                            info_deferred.resolve('');
                            nodejs_deferred.resolve(msg[5]);

                        };//
                        //
                        selA.btnCANCEL[0].option('disabled', false);
                        selA.btnOK.option('disabled', false);
                    };
                    //
                }.bind([cmd]);
                //
                //info_deferred = $.Deferred();
                //nodejs_deferred = $.Deferred();
                $.when(info_deferred, nodejs_deferred).done(function (info, cntUSR) {
                    popup.isSAVE = 1;
                    //debugger;
                    popup.saveDB(elUI.WDM[atIO[0]].wdms, cntUSR);
                    popup.hide();//kich hoat save callback
                });
                //
                info_deferred.promise();
                nodejs_deferred.promise();
                //
                WDMS_CMD_HWND_loop.hwndTimeout = setTimeout(function () {
                    WDMS_CMD_HWND_loop.bind([null, 3])();//sau 15 second ko co reply thi se raise
                }, 25000);
                //

                atIO[4] = {};

                //debugger;

                //(***) new code
                if (!localCONN) {
                    //old nodejs socket io
                    elUI.WDM[atIO[0]].emit(elUI.___[1], [[atIO[1]], cmd]);//WDMS_CMD atIO[3]:9999-regnew; 1: reg&run ; 1111:exwdms run after reg
                    fnMSG();
                    //
                } else {
                    //
                    localCONN(fnKEY);
                    //
                };
            }
            , kill_wdms_server = function (TOK, DEL, sn, only_localDEV) {

                //debugger;

                //return;
                if (!TOK) return;//(***) new code


                const svrI = atob(TOK).split(String.fromCharCode(4)),

                    __k = svrI[svrI.length - 1] != 'localconn' ? makeKEY(svrI[1]) :

                    (gloEVTs.giaidoan2_localDEV/*localDEV*/((DEL == 1 ? 'destroy' : 'disconn'), [svrI[svrI.length - 2]/*local ip*/, svrI[0]/*key remove*/,

                        [/*2*/,/*3*/, ['del', sn, only_localDEV[0]]]

                    ]), 'return');


                if (__k == 'return') return 'localconn';


                if (elUI.WDM[__k]) {
                    //
                    var idx = elUI.WDM[__k].DEVs.indexOf(svrI[0]),
                        exwmdID=['0','1'];//default 2 gia tri SN , MAC
                    //cmd = [1, 12, '\x45\x6E\x61\x62\x6C\x65\x50\x72\x6F\x78\x79\x53\x65\x72\x76\x65\x72\x3D\x30']//[1, 12, 'EnableProxyServer=0'];
                    //
                    //
                    if (DEL === 1) {
                        //ngay 2012/08/11 doi cho (***) ==> ly do la kickoff moter_session
                        //===> suy cho cung thi kick ok hay ko thi ko quan trong, vi chi muc dich demo thoi
                        //===> binh thuong remove ra khoi trinh duyet roi thi ko con lien quan gi den may cham cong nay nua...
                        //debugger;
                        if (elUI.WDM[__k].wdms.hasOwnProperty(sn)) {
                            var adm = elUI.WDM[__k].wdms[sn];
                            exwmdID = [sn, adm[0] ];
                        }
                        elUI.WDM[__k].emit(elUI.___[2], [svrI[0], 0, exwmdID]);//'DEV_JOIN_RMV' :0 remove
                        console.log([svrI[0], 0, exwmdID]);
                    };
                    //
                    //
                    if (idx > -1) {
                        //debugger;
                        var rmv = elUI.WDM[__k].DEVs.splice(idx, 1);
                        //
                        //goi tin hieu offline ben realtime truoc khi remove
                        if (rmv.length > 0 &&  (elUI.WDM[__k].auth.sn != sn || elUI.WDM[__k].auth.sn == sn && elUI.WDM[__k].auth.statux != 0 || svrI[0] != elUI.WDM[__k].auth.token)) {

                            gloEVTs.dumeTHIETBI.f1.bind(['offline', rmv[0],/*2*/,/*3*/, ['del'].concat(exwmdID)])();

                        };
                    };
                    //
                    if (elUI.WDM[__k].DEVs.length == 0) {//disconnect luon socket nay
                        //
                        setTimeout(function () {
                            elUI.WDM[__k].off('disconnect').close([1]); //close thi ben kia no tu xu ...
                            delete elUI.WDM[__k];
                        }, DEL === 1 ? 1000 : 1);
                        //
                    } else {
                        //
                        if (DEL === 1) {
                            //debugger;
                            //elUI.WDM[__k].emit(elUI.___[1], [[svrI[0]], cmd]);//WDMS_CMD
                            //(***) elUI.WDM[__k].emit(elUI.___[2], [svrI[0], 0]);//'DEV_JOIN_RMV' :0 remove
                            elUI.WDM[__k].auth = {
                                token: elUI.WDM[__k].DEVs[0],
                                statux: 1 // 0: connection wait commit new reg, 1: running 
                            };//udpate auth theo cai moi nhat -> chap nhan, remove, cancel phai care back lai.
                        };
                        //
                    };
                };
            }
            , online_light = function (msg) {
                //

                //console.log(new Date().getTime(), msg);

                //
                var isWdmso = msg.length > 4,
                    devcap,
                    Wdm = isWdmso && msg[4][0] == 'wdmso' ? (devcap = msg[4][4], msg[4][3]) : [];
                //
                if (msg[0] == 'kickoff') {

                    debugger;
                    elUI.fnHANDSHAKE([msg[0], [msg[1]], msg[0], "0"/*usr count msg[3]*/, Wdm, devcap]);

                } else if (msg[0] == 'usr') {

                    //Wdm = msg[4] && msg[4] || [];
                    elUI.fnHANDSHAKE([msg[0], [msg[1]], msg[0], msg[3], Wdm, devcap]);

                } else if (['online', 'offline'].indexOf(msg[0]) > -1) {
                    //
                    elUI.fnHANDSHAKE(['sigLIVE', [msg[1]], msg[0], msg[3], Wdm, devcap], msg);
                    //
                    //
                    if (msg[3] !== 'cntU') gloEVTs.dumeTHIETBI.f1.bind(msg)();//khi nusr chua nhan nut done thi node js tra ve ten bien cua count user monitor
                    //
                    //
                } else {
                    if (msg[3]) switch (msg[3]) {
                        case elUI.___[0]: {//RTEVT
                            frmEL.trigger(msg[3] + 'S', [msg[4].split('\t')]);
                            break;
                        };
                    }
                };
                return isWdmso || Wdm.length > 0;
            }
            , connect_to_wdms_server = function () {
                //
                if (!this || !this[0]) return;
                //
                //debugger;
                //
                const TOK = this,

                    svrI = atob(TOK[0]).split(String.fromCharCode(4)),

                    __k = svrI[svrI.length - 1] != 'localconn' ?

                    makeKEY(svrI[1]) : //connect nodejs in web case

                    ( TOK[5]=='-9999'?fn_wdms_HWND(['kickoff'])

                    : gloEVTs.giaidoan2_localDEV/*localDEV*/('connect', [[svrI[svrI.length - 2], '0'/*port wdms*/, TOK[2]/*device ID*/], TOK[0], TOK[4], function (rst) {

                        //debugger;
                        if (fn_wdms_HWND && typeof fn_wdms_HWND === "function") {
                            fn_wdms_HWND(['connect']);
                        };

                    }]), 'return'),

                    __auth = {
                        token: svrI[0],
                        statux: TOK[1], // 0: connection wait commit new reg, 1: running 
                        id: TOK[2],//device ID
                        sn:TOK[3] //serino
                    },

                    bindEVT = function () {
                        elUI.WDM[__k].on('connect', function (s) {
                            //
                            if (fn_wdms_HWND && typeof fn_wdms_HWND === "function") {
                                fn_wdms_HWND(['connect']);
                            } else {


                                //khi ket noi thi chi co 1 token, co the co nhieu device
                                var curAUT = elUI.WDM[__k].auth,
                                    socAUT = elUI.WDM[__k].sockAUT(),
                                        _sigstatux = elUI.WDM[__k].mcc_statux;

                                elUI.WDM[__k].DEVs.forEach(function (dev) {
                                    if (dev != socAUT.token) {

                                        for (var fuk in _sigstatux) {
                                            if (_sigstatux.hasOwnProperty(fuk)) {
                                                const atE_d = _sigstatux[fuk];
                                                if (dev == atE_d[0]) {
                                                    elUI.WDM[__k].emit(elUI.___[2], [dev, 1, 1, atE_d[2], atE_d[3]]);//'DEV_JOIN_RMV' :1 new
                                                };
                                            };
                                        };
                                        //
                                        /*
                                        if (!_sigstatux) _sigstatux = frmEL.find('.mcc-statux');
                                        //
                                        _sigstatux.map(function (z, el) {
                                            var e$ = $(el);
                                            if (e$.attr('tok') == dev) {
                                                var atE_d = e$.data(dev);
                                                elUI.WDM[__k].emit(elUI.___[2], [dev, 1, 1, atE_d[2], atE_d[3]]);//'DEV_JOIN_RMV' :1 new
                                            };
                                        });
                                        console.log('if (dev != elUI.WDM[__k].auth.token) {');
                                        //neu bang socket thi la cai moi nhat, trong token no se co statux=0?1
                                        //elUI.WDM[__k].emit(elUI.___[2], [curAUT.token, 1, 1, curAUT.id, curAUT.sn]);//'DEV_JOIN_RMV' :1 new
                                        */
                                    };
                                });


                            };
                            //
                            if (isEDITING > 0) {
                                live();
                            };
                            //
                        }).on('connect_error', function (err) {
                            console.log('connect_to_wdms_server connect_error');
                            var isDisconnect = false, eI = 0, _e = 'eeeeeeee', ms = err.message && err.message.split(_e) || [];
                            if (ms.length == 2 && ms[0] == '') {
                                _e = JSON.parse(ms[1]);
                                if (_e[0] == 'disconnect') {//SERVER DISCONNECT
                                    eI = _e[1];
                                    ms = _e[2];
                                    isDisconnect = true;
                                };
                            };
                            //
                            //debugger;
                            if (fn_wdms_HWND && typeof fn_wdms_HWND === "function") fn_wdms_HWND(['connect_error', isDisconnect]);
                            //
                            if (isEDITING > 0) {
                                if (!isDisconnect) {
                                    dead(1);
                                } else {
                                    soc_msg(ht_m[2][eI], 'text-danger', ms);
                                }
                            };
                            //doi voi cac connection co san.
                            if (elUI.WDM[__k].DEVs && elUI.fnHANDSHAKE.currMSG != 'offline') {
                                elUI.WDM[__k].DEVs.forEach(function (dv) {
                                    elUI.fnHANDSHAKE(['sigLIVE', [dv], 'offline', 0, []]); //0: so luong user monitor device
                                });
                            }
                            //
                        }).on('reconnect', function (n) {

                            console.log('connect_to_wdms_server reconnect');

                        }).on('disconnect', function (r, e) {

                            console.log('connect_to_wdms_server disconnect');
                            //doi voi cac connection co san.
                            if (elUI.WDM[__k].DEVs) {
                                elUI.WDM[__k].DEVs.forEach(function (dv) {
                                    elUI.fnHANDSHAKE(['sigLIVE', [dv], 'offline', 0, []]); //0: so luong user monitor device
                                });
                            }
                        }).on('DEV_MSG', function (msg) {
                            if (msg[0] == 'RST_CMD') {//ben nodejs write qua

                                WDMS_CMD_HWND_loop.bind([msg, msg[1]])();//msg[1] la timeout

                            } else {
                                if (isEDITING > 0) {
                                    if (msg[0] == 'online') {
                                        live();
                                    } else {
                                        dead(2);
                                    };
                                };
                                //
                                if (msg[3] !== 'cntU' && msg[0] == 'DEV_JOIN_RMV') {
                                    //giong nhu new connection, phai modify auth
                                    modAUTH(this);
                                    //
                                    msg[0] = 'online';//get back for live signal
                                    //
                                };
                                //
                                //cho nhung cai nam o phia duoi..??
                                if (online_light(msg)) {//mg[3] = wdms option
                                    if (msg[4][0] == 'wdmso') {//nguyen con

                                        console.log('new wdmso' + new Date().getTime() + JSON.stringify(msg[4][3]));

                                        this.wdms[msg[4][1]] = [msg[4][2], msg[4][3],

                                            msg[4][4],//device capacity
                                            msg[4][5] //ban quyen

                                        ];//gan vao de khi edit thi load len


                                    } else {
                                        // this.wdms[msg[4][1]] = msg[4][3];
                                    };
                                };
                                //
                            };
                            //

                        }, 'RTEVT'//flag detect public event

                        )

                        .STARTd();//khac biet cho nay


                    };
                //
                //
                //case android local connection...
                if (__k == 'return') {
                    console.log(svrI[svrI.length - 2]);
                    return [__k, TOK[0]];
                }
                //
                //
                //
                //
                const oldSOCK = sockjo.getSOCK(__k),
                    hasDEV = oldSOCK && oldSOCK.instance.DEVs.indexOf(svrI[0]) >-1;
                //
                if (hasDEV===true && elUI.hasOwnProperty('onlyDEV_ATT_EVT')) {//new update
                    //ko lam gi ..

                } else {
                    elUI.WDM[__k] = oldSOCK;
                };
                //
                //
                if (!elUI.WDM[__k]) {
                    //debugger;
                    //
                    //
                    // "192.168.1.91:3000";
                    const svrad = JSON.parse(svrI[1]).reduce(function (a, b) { return a + String.fromCharCode(parseInt(b, 16)); }, "");
                    //
                    //*****************************************************************************************
                    var prot = window.location.protocol;
                    //
                    //debugger;

                    prot = prot.indexOf('file:') > -1 ?

                       (window.debuglocal === 1 ? 'http:' : 'https:')

                        : prot;//android app
                    //
                    //console.log(prot + '//' + (prot.indexOf('https') > -1 ? svrad.split(':')[0] : svrad));
                    //
                    elUI.WDM[__k] = new JO(prot + '//' + (prot.indexOf('https') > -1 ? svrad.split(':')[0] : svrad)
                            , {//io(addr, {//
                                auth: __auth
                                //, path: '/octagon/socket.io'
                            , transports: ["websocket", "polling"] // use WebSocket first, if available
                            }
                        , [__k]//khac biet cho nay

                        );//https://viblo.asia/p/mot-so-events-xu-ly-loi-trong-socketio-924lJpEaKPM
                    //
                    bindEVT();
                    //
                    elUI.WDM[__k].auth = __auth;
                    elUI.WDM[__k].DEVs = [svrI[0]];
                    //
                } else {
                    //
                    if (hasDEV===true && elUI.hasOwnProperty('onlyDEV_ATT_EVT')) {//new update
                        //
                        //ko lam gi ca, se ve ben cho call xy ly !!!
                        //
                    } else {//old
                        //
                        var reopentab = false;
                        if (elUI.WDM[__k].hasOwnProperty('instance')) {
                            elUI.WDM[__k] = elUI.WDM[__k]['instance'];
                            bindEVT();
                            reopentab = elUI.WDM[__k].DEVs.indexOf(svrI[0]) > -1;//exist
                        };
                        //
                        //
                        elUI.WDM[__k].auth = __auth;//udpate auth theo cai moi nhat -> chap nhan, remove, cancel phai care back lai.
                        //vi trong __auth.statux =0 khi regnew wait commit -->truong hop server lost tam thoi, khi build lai thi se verify socket , 
                        //
                        elUI.WDM[__k].emit(elUI.___[2], [svrI[0], 1, TOK[1], TOK[2], TOK[3]]);//'DEV_JOIN_RMV' :1 new
                        //
                        if (!reopentab || elUI.WDM[__k].DEVs.indexOf(svrI[0]) == -1) {
                            //close tab, reopen tab neu co globle event
                            elUI.WDM[__k].DEVs.push(svrI[0]);
                        };
                        //
                    };
                    //
                    //
                    if (fn_wdms_HWND && typeof fn_wdms_HWND === "function") fn_wdms_HWND([elUI.___[2]]);
                    //
                };
                //
                return [__k, svrI[0]];
                //
            }
            , wait_push_fn = function (isExpire, p1, p2) {
                if (wait_push_hwnd > 0) {
                    clearTimeout(wait_push_hwnd);
                    var seconds = isExpire - parseInt((new Date().getTime() - wait_push_TO.getTime()) / 1000);
                    if (isExpire > 0 && seconds <= 0) {
                        CANCEL_TerMSG();
                    } else {
                        if (isExpire > 0) {
                            seconds = seconds + p1[0];//seconds + ' seconds next expired'
                        } else {
                            seconds = Math.abs(seconds) + ' seconds passed';
                            p2 = p1[Math.abs(isExpire)];
                            isExpire -= 1;
                            if (Math.abs(isExpire) > p1.length - 1) {
                                isExpire = 0;//reset
                            };
                        };
                        csPrnt.WriteLn({ type: 'input', prompt: ' ⏳ ' + seconds, value: p2, typeDelay: 30 }, function (ln) {
                            if (wait_push_hwnd != -2) {//RESET THI KO LOOP
                                wait_push_hwnd = setTimeout(function () { wait_push_fn(isExpire, p1, p2); }, 2000);
                            };
                        });
                    };
                };
            }
            , reset_terMSG = function () {
                terMSG.empty();
                clearTimeout(wait_push_hwnd)
                wait_push_hwnd = -2;//RESET 
                terMSG.removeClass('timeout');
            }
            , exe_wdmscmd = function (__k, svrI, cmd, c$b) {

                //debugger;

                const idx = elUI.WDM[__k].DEVs.indexOf(svrI[0]),fnKEY = Math.random().toString(36).slice(2, 10) + new Date().getTime(),
                        hwdTO = setTimeout(function () {

                            WDMS_CMD_HWND_loop.bind([[, , svrI[0]], 3])();//sau 15 second ko co reply thi se raise

                        }, cmd[1] == -505 ? 30000 : 8000);//lenh -505 tai log nhieu khi vuot qua 10 ngan.
                //


                //var worker = function () {
                //    var result;
                //    self.addEventListener('message', function (e) {
                //        debugger;
                //        // Send message back to the main script
                //        self.postMessage('Done! Worker counted to ' + result);
                //    }, false);
                //}
                


                //HEAVY_JOB_HWND = function (sFN) {
                //    //
                //    debugger;
                //    sFN = '(' +
                //                sFN
                //            + ')()';

                //    var blob = new Blob([sFN]);
                //    var url = w0w.URL.createObjectURL(blob);

                //    // Construct the Web Worker
                //    var worker = new Worker(url);
                //    //worker.onmessage = jobRST;

                //    return worker;

                //}(worker.toString());



                WDMS_CMD_HWND[fnKEY] = function (msg, k, isTimeout) {
                    //
                    //
                    const tha = this, fnRESET = function (tio) {
                        //
                        clearTimeout(tha[2]);//timout handloer
                        //
                        delete WDMS_CMD_HWND[k];
                        //
                    };
                    //
                    //chua on timeout
                    if (tha[1] != msg[2]) return;
                    //
                    //
                    //debugger;
                    if (isTimeout == 0) {//kick server ok.

                        if (msg[3][0] == 0) {//res=msg[3] hoan tat

                            fnRESET();

                            //toastMsg(ht_m[8][4], 'success');
                            //
                            c$b('OK', msg, k);
                            //
                        } else if (msg[3][2] == 10001) {//result of wdms option
                            //
                            if (elUI.WDM[__k].wdms[doD.serno]) {
                                elUI.WDM[__k].wdms[doD.serno][1] = JSON.parse(msg[4][6]);
                            };
                            //no o day di ....
                        }
                        //
                    } else {
                        //3: timeout sau 8s client trigger
                        //orther timeout server Nodejs...
                        fnRESET();
                        //
                        if (tha[0][1] != '-505') toastMsg(ht_m[8][3] + '(' + isTimeout + ')', 'error');//server nodejs tra ve loi timeout
                        //
                        c$b('ERR',
                            [, , , [0]]//error message
                            , k);
                    };


                }.bind([cmd, svrI[0], hwdTO]);
                //
                //
                //
                elUI.WDM[__k].emit(elUI.___[1], [[svrI[0]], cmd]);//WDMS_CMD
                //
                //
            }
            , cmd_2_wdms_c$b = function (t$t, rst) {

                //debugger;

                rst = rst.concat([t$t[2], t$t[3]]);

                if (t$t && typeof t$t[4] === "function") {

                    rst.push(t$t[5]);

                    t$t[4](rst);

                } else {

                    //debugger;

                    $(t$t[0].target).trigger('rst_devstas', rst);

                    toastMsg(ht_m[8][4], 'success');//lay thong tin thiet bi

                    srclocked(false);

                };

            }
            , cmd_2_wdms =

                elUI._cmddev//o giai doan 2, att phan ra nhieu part ,nen phai new handle

            = function () {

                //debugger;

                const t$t = this, cmd = t$t[1], TOK = t$t[2].tok

                    ,

                    lenh = [cmd/*CMD_ATTLOG_RRQ*/,
                                    //"SELECT * FROM ATT_LOG WHERE ID>%s ORDER BY ID LIMIT %s"  | sed -e '$ s/^/|/' | cut  -d $'|' -f2- | bzip2 -c | base64 | sed '$!N;$!N;$!N;s/\n//g' 
                                    //"s+Py1/ryLumNrm116XbWcXq8E16/C2bCdUOvzwM/KEsMXdpY7RixR3s6SRWnld5N59JqGMdj5EN2SyVNjY4KvlqZmGEEvOmD/L2AEJriIENqgbb9YUQ67uUjcjdvUJltR0df0Ag6qZfhItwMF9hhvLjmzk81Ej2r0Eb0Jab8oBqX5aQIAOpqMdAXaqkR0L1+8HDJ1sjtbNZ1Bf9/Yy862A==",
                                    //"s+Py1/ryLumNrm116XbWcXq8E16/C2bCdUOvzwM/KEsMXdpY7RixR3s6SRWnld5Nw3Kahs5TnCTisUMarcpAmZKqXG7sAa3tx/+RQ9HmxU+Bq3CxIlzH0VFfTxptPWi8dFAfGFpmdHEZ5ScbnGl+c7epDg+/1UIwl9bwgYllLFCB1wu04lmyRAyk2Cj6/nIKZr8kR0w6b+S+/3B76hLhfQ==",
                                    //"s+Py1/ryLumNrm116XbWcXq8E16/C2bCdUOvzwM/KEsMXdpY7RixR3s6SRWnld5Nw3Kahs5TnCTisUMarcpAmZKqXG7sAa3tx/+RQ9HmxU+Bq3CxIlzH0VFfTxptPWi8dFAfGFpmdHEZ5ScbnGl+c7epDg+/1UIwl9bwgYllLFCYXDaPxUOyppjzP72Iv/1m",
                                    //new -> co them count all row %
                                    //"s+Py1/ryLumNrm116XbWcXq8E16/C2bCdUOvzwM/KEsMXdpY7RixR3s6SRWnld5Nw3Kahs5TnCTisUMarcpAmbLpSup4ArP+4/Uum4ViyXVtGTQsrTejVpozFCw7M4DSH+HB9/Z3UI1+RMmSuSMd0vjlL488vhPg/4WBeOItUTpERt5DTCj0V6QkFY9SP8OfGJUkXvF2c2l+GSnA0yio8Q==",

                                    
                                    //-> before gion dowload USB "RocX8fPu8CM6HymwUub1GqCoxKq/8pGJ7csvzNk/LWrHqUSLrDhZaRnTtMK5mROQ7wCsEG+4qDZSzWEPuyR0YpkilgEl9Uc5UwMprTL+gUeNKpnmqcvY9zDYB8/4UUuqc35j9UYYlQ8pDyoQRJ6nul/4nbcxMiGxfVjlkWEjhK6cOTrwaVxu39PXfo9NAFEyqycLreXqK+ApT5xRuZ0Xsw==",

                                    //->str co chua device_id "RocX8fPu8CM6HymwUub1GmcFvvegwXZWz4CGeTJykzjUq/msHOcCRdmolfityey3Rq+b8VGaNpREMKBaoLR1EVEezE0UhNLwr123MK33m61KQYN3nV1RrOt5fPqtbHCah1svpv0VNS7fyKGdsnzy/Tu6mdW30B0C/yJfq7wzGA+rxfhjUvgXi6gzHpwnzXBAVkO6unhDX/aVeLx4KFBciQ==",


t$t[6] || //moi them vao chuan bi lay user template
(

//old sqllite query

                                   parseInt(t$t[3]) > 0 //download log
                                   ? "RocX8fPu8CM6HymwUub1GmcFvvegwXZWz4CGeTJykziuiTC8P/bEhfjYbn4mjk+r5FIAhp5EsONgoKuUMlRd/Hii5dbxS/OkKuc3yHSeXb9UWSVin6FFhEe5y7U8UAiXma98+r/F7oDlH1EPgcP9wtokBMHbrbO/xofN6XZU12qm8ncMsaHhiw1hDI5ub4udUOkdpXLMqfuT1s6qVjMnNw=="
                                   //get device user list hex Name "RocX8fPu8CM6HymwUub1GmjbQ5FYju273uNvj7fbmfSKwaSR7fWSIvS1uDzq4hrpoP8nN4xeJcbI9prAV5oFRSLrvbjyUGj8URphBiYkDmBpLU72AfqWcBX15kH4o+wK9se3+uNvGjl3Hs3wPEiaVq1bSvSoTbTSZB4wB8Xn8fx/n+p+Juj/CS7Wy4Azv6mU1OgSHxXFURYAnwnsMNYO4X0OHFqpaGsRL3VZanaQBpHQr0IsaqFtW86u7MmPxX5Z" //
                                   : "RocX8fPu8CM6HymwUub1GoXQWDXTSmJ2D81pQIk1TRbExeU0Wp3Dl6Jcekat1tYVSaGDV3GlgoaS6jlZ/MPPlysyqysvJXDB8zQdvz+ZtRFvcozp5Pk8pdR70AF3Z+28TXidUGkH8WU7+a0nHEXVWHC5pGAVtc3GRerCMjsJMJPjbV063/tyaV8GouSOscPOw8ALHkvFpBbz6B7tsnzArcbttt8kbR1ITGxlZuXvbrHE7MYslf1ajZTlaTN7hB50"// "RocX8fPu8CM6HymwUub1GvISK99tchTXdoAfC+38fUGgR35sLBAihm5iRVZ4b00b3Ig3JgFDtAAoqtuDWeL6P/elw9EAU9n3hrUJsS3iyl8Lps3Lp1e+OpK1WZZsly8fytiBSSCaKe/d0wlfd5ONVBv5Ik1e57EC2+MRjMHSRT/ALeDoP6bRa1fPf9p/46jFaO3RhYpA7mE4ycXRHSx1b1cUDsNp9QzDXu0ZlPnGWWk=" //"RocX8fPu8CM6HymwUub1GvISK99tchTXdoAfC+38fUGgR35sLBAihm5iRVZ4b00b3Ig3JgFDtAAoqtuDWeL6P/elw9EAU9n3hrUJsS3iyl8Lps3Lp1e+OpK1WZZsly8fytiBSSCaKe/d0wlfd5ONVFfTjWL4thucCu7lvCueQvFVCSaw/3eNq3mNh+httMoV0yptHWscZea58VGMxoToVN7RsqAq6exTFSL53FFONUZYpAaKkxBrxSDjOjREiexu"

)
                                   ,

                                   //cac tham so dynamic string format.0: where ID> 0 1: Litmit 500 ; cac tham so sau dung de du phong.
                                    t$t[5] || "0|100|0|$!N;$!N;$!N;|0|2"
                                    //"SELECT%20%2A%20FROM%20ATT_LOG%20WHERE%20ID%3E0%0AORDER%20BY%20ID%20LIMIT%2010"
                                    //"%20%22SELECT%20%2A%20FROM%20ATT_LOG%20WHERE%20ID%3E0%20ORDER%20BY%20ID%20LIMIT%2050%22%20%7C%20sed%20%27%3Aa%3BN%3B%24%21ba%3Bs%2F%5Cn%2F_%2Fg%27"
                                    //"%20%22SELECT%20%2A%20FROM%20ATT_LOG%20WHERE%20ID%3E0%20ORDER%20BY%20ID%20LIMIT%2050%22%20%20%7C%20sed%20%27%24%20s%2F%5E%2F%5C%7C%2F%27%20%7C%20cut%20%20-d%20%24%27%7C%27%20-f2-%20%7C%20sed%20%27%3Aa%3BN%3B%24%21ba%3Bs%2F%5Cn%2F_%2Fg%27"
                                    //"%22SELECT%20%2A%20FROM%20ATT_LOG%20WHERE%20ID%3E0%20ORDER%20BY%20ID%20LIMIT%20500%22%20%20%7C%20sed%20-e%20%27%24%20s%2F%5E%2F%7C%2F%27%20%7C%20cut%20%20-d%20%24%27%7C%27%20-f2-%20%7C%20bzip2%20-c%20%7C%20base64%20%7C%20sed%20%27%24%21N%3B%24%21N%3B%24%21N%3Bs%2F%5Cn%2F%2Fg%27%20"
                                    //,
                                    //"%22SELECT%20%2A%20FROM%20ATT_LOG%20WHERE%20ID%3E0%20ORDER%20BY%20ID%20LIMIT%20500%22%20%7C%20bzip2%20-c%20%3E%20f_t_z%20%7C%20ftpput%20-u%20epiz_28165287%20-p%20HcfVuhgQpdEIqQN%20ftpupload.net%20%20%2Fhtdocs%2Ffcm%2Fzkweb.bz2%20%20%20f_t_z%20%5Cx26%5Cx26%20rm%20%20f_t_z"
                                    ,
                                    t$t[2].id, //device_id
                                    ,
                                    t$t[3] // flag download att or template
                    ]


                    ,

                    svrI = atob(TOK).split(String.fromCharCode(4)),

                    //__k = makeKEY(svrI[1]);
                    __k = svrI[svrI.length - 1] != 'localconn' ?

                    makeKEY(svrI[1]) : //connect nodejs in web case

                    (function (p) {
                        //
                        gloEVTs.giaidoan2_localDEV/*localDEV*/('devcmd', p);
                        //
                        return 'return';
                        //
                    })([

                        [svrI[svrI.length - 2]],
                        TOK,
                        lenh,
                        function (a, m) {

                            //debugger;

                            //debugger;

                            //console.log("CB du me: " + t$t[2].wdms + ';' + m);

                            //$(t$t[0].target).trigger('rst_devstas', [a, [, , , ['localconn', lenh[0], lenh[2]]], t$t[2], t$t[3], t$t[4]]);
                            //debugger;
                            const RE=[m, , , ['localconn', lenh[0], lenh[2]]] ;
                           
                            if (m[4] && m[4].length > 0) {
                                const kq = m[4][m[4].length - 1];
                                if (kq.indexOf('["re"') > -1) {
                                    RE.push(JSON.parse(kq));
                                };
                            };
                        

                            cmd_2_wdms_c$b(t$t, [a, RE]);


                            srclocked(false);

                        }]);


                if (__k == 'return') return;

                //debugger;

                //
                if (elUI.WDM[__k]) {


                    exe_wdmscmd(__k, svrI,

                        cmd == -505 ?

                        (lenh.unshift(

                        t$t[0]//them url heavyENGINE

                        ), lenh)

                        : [1, cmd, 'tinhsau']

                        , function (a, m, k) {
                            try {
                                if (m[3][0] == 0) {//res=msg[3] hoan tat
                                    //$(t$t[0].target).trigger('rst_devstas', [a, m, t$t[2], t$t[3], t$t[4]]);
                                    cmd_2_wdms_c$b(t$t, [a, m]);
                                };
                            }
                            catch (err) {
                                devDlg(0, err.toString(), 'tikestep_device / exe_wdmscmd').show();
                                srclocked(false);
                            }finally {
                    
                            };
                        }
                    );
                };
            };

        var hwndFieldDataChanged
            , csPrnt
            , wdmsInfo
            , popup
            , PUcontent;

        const reg_step = function (inS, err) {
            //
            ht_m.$regstep = inS;
            //
            const ste = wdmsInfo.find('.wdms-regstep span.btn');
            //
            //
            for (var i = 0; i < ste.length; i++) {
                var $ste = $(ste[i]), $p = $ste.next();
                $p.removeAttr('class').html('<small>' + $p.text() + '</small>');
                if (i <= inS) {
                    if (i < inS) {
                        $ste.removeAttr('disabled').removeClass('btn-default btn-warning').addClass('btn-success');
                        $ste.text('✔');
                        $p.text($p.text());
                        $p.addClass('text-success');
                    } else {
                        var cls = 'btn-success';
                        if (err > 0) {
                            cls = 'btn-warning';
                            $p.text($p.text()).addClass('text-warning');
                        }
                        $ste.removeAttr('disabled').removeClass('btn-default').addClass(cls);
                        wdmsInfo.find('.text_conn').text($p.text());
                    };
                } else {
                    $ste.attr('disabled', 'disabled').removeClass('btn-success').addClass('btn-default');
                };
            };
            ste.closest('.wdms-regstep').css('display', '');
        }, btnCANCEL = function (a, b, c) {
            //c:0 = connecting, 1:connected , 2 error
            selA.btnCANCEL[0].option({ icon: selA.btnCANCEL[a], text: selA.btnCANCEL[b] });
            selA.btnCANCEL.act = c;
            //
        }, soc_msg = function (b, c, d, dog) {
            //debugger;
            if (ht_m[4][0] != d || dog) {
                //
                //debugger;
                //
                ht_m[4][0] = d;
                wdmsInfo.empty();
                reset_terMSG();
                wdmsInfo.append([terMSG, $('<div>' + ht_m[0].replace('$TIT$', ht_m[4][d]) + '<div class="mt-3 text-center"><i class="fa fa-quote-left"></i> ' + b + ' <i class="fa fa-quote-right" aria-hidden="true"></div></div>')]);
                //phai de cuoi cung
                terMSG.next().addClass(c);
                //
                //
                if (d == 3) {///success
                    btnCANCEL(3, 4, 1);
                } else {
                    btnCANCEL(1, 2, 2);
                };
                //
            };
        }
        , config_s1 = function () {
            soc_msg(ht_m[3], 'text-success', 3);

            reset_terMSG();
            terMSG.addClass('timeout');
            wait_push_hwnd = 1;
            wait_push_TO = new Date();
            wait_push_fn(120, [ht_m[6][5]], ht_m[6][6]);
        }
        , wait_conn = function (addr) {

            //https://socket.io/docs/v3/client-initialization/
            //https://stackoverflow.com/questions/8970880/cross-domain-connection-in-socket-io
            //https://stackoverflow.com/questions/23406163/socket-io-client-how-to-set-request-header-when-making-connection

            var addr = PUcontent.getEditor('wdms').option('value'),
                regex = /^(http|https):\/\/[^:\/]+(?::(\d+))?/,
                match = addr.match(regex),
                tmp = document.createElement('a'),
                socOPT = function () {

                    addr = tmp.pathname.split("/");

                    return {//io(addr, {//
                        auth: {
                            token: 'token-secure-socket',
                            ireg: {
                                sn: PU_valF('serno','value'),
                                pkey: PU_valF('pkey','value'),
                                tz: PU_valF('timezone','selectedItem').tim,
                                rtevt: PU_valF('rtevt','value') ? 1 : 0,
                                grp: addr[addr.length - 1],//tmp.pathname.replace("/", ''),//neu lay group ko dung xyz, hoac abc thi se error.
                                tep: 0
                            }
                        }
                        //, path: '/octagon/socket.io'
                        , transports: ["websocket", "polling"] // use WebSocket first, if available
                    }
                };
            // debugger;
            if (match === null) {
                //https://www.namecheap.com/support/knowledgebase/article.aspx/9705/33/installing-an-ssl-certificate-on-nodejs/

                if (window.location.protocol.indexOf('file:') > -1 && window.debuglocal === 1) {
                    addr = window.location.protocol + '////' + addr;
                } else {
                    addr = window.location.protocol + '//' + addr;
                }

                //} else {
                //    return match[2] ? match[2] : { http: "80", https: "443" }[match[1]];
            };

            tmp.href = addr;
            //
            if (elUI.socIO) elUI.socIO.off();//stop
            //
            //console.log(tmp.hostname + ((tmp.protocol.indexOf('file:') > -1//android app
            //       || tmp.protocol.indexOf('https') > -1) ? "" : ":11015")
            //       );
            //debugger;
            //var wdsm = $(addr).attr('href');

          

            var isFILE = tmp.protocol.indexOf('file:') > -1 ? 'wss://' : '';//android app
            isFILE=isFILE  + tmp.hostname + ((isFILE != ''
                || tmp.protocol.indexOf('https') > -1) ? ":444" : ":11015");
            //

            //debugger;
            if (window.debuglocal === 1 && window.location.protocol.indexOf('file:') > -1) {
                isFILE = "ws://" + PUcontent.getEditor('wdms').option('value').split(':')[0] + ":11015";
            }
            //
            elUI.socIO = io(isFILE, socOPT());

            //elUI.socIO.emit('joining msg', "abcdef");
            //
            //https://viblo.asia/p/mot-so-events-xu-ly-loi-trong-socketio-924lJpEaKPM
            elUI.socIO.on('connect', function (s) {
                //debugger;
                config_s1();
            }).on('connect_error', function (err) {
                //debugger;
                var eI = 0, _e = 'eeeeeeee', ms = err.message && err.message.split(_e) || [];
                if (ms.length == 2 && ms[0] == '') {
                    _e = JSON.parse(ms[1]);
                    if (_e[0] == 'disconnect') {//SERVER DISCONNECT
                        eI = _e[1];
                        ms = _e[2];
                    }
                } else {
                    ms = 2;
                };

                soc_msg(ht_m[2][eI], 'text-danger', ms);

            }).on('reconnect', function (n) {
                //console.log("elUI.socIO.on('reconnect', (attemptNumber): " + n);
            }).on('disconnect', function (r, e) {
                //
                soc_msg(ht_m[2][0], 'text-danger', 2);
                //
                if (r == 'transport close') {
                };
                console.log("elUI.socIO.on('disconnect', (reason): " + r);
                //
                //if (reason === 'io server disconnect') {
                //    // the disconnection was initiated by the server, you need to reconnect manually
                //    socket.connect();
                //}
                // else the socket will automatically try to reconnect
            }).on('reg_wdms', function (msg) {
                //
                msg = JSON.parse(msg);
                if (msg[0] == 'begincmd') {//thiet bi bat dau nhan lenh khoi dong WDMS
                    reset_terMSG();
                    csPrnt.WriteLn({ type: 'input', prompt: ' ▲ ', value: 'We are checking your WDMS device, please wait a moment ...', typeDelay: 20 }, function (ln) {
                        //
                        if (ht_m.$regstep == 0) {
                            var pW, pCHAR = $('<span class="progress"></span>');
                            pCHAR.appendTo(terMSG);
                            pW = pCHAR.innerWidth();
                            //
                            ht_m.$pCHAR = [$('<span class="progress-bar" style="width:' + (pW * 0.2) + 'px; position: absolute; white-space: nowrap; transition: none 0s ease 0s;">20%</span>').appendTo(pCHAR)
                                , msg[1], pW];
                        };
                        //debugger;
                    });
                    reg_step(0, 0);
                    //
                } else if (msg[0] == 'handshakecmd') {
                    //thiet bi nhan xong 1 line command handshake
                    var pCHAR = ht_m.$pCHAR;
                    if (pCHAR) {
                        var pwi = msg[1] / pCHAR[1],
                        pc = parseInt((pwi * 100)),
                        ww = pwi * pCHAR[2];
                        pCHAR[0].width(ww > pCHAR[2] ? pCHAR[2] : ww).text((pc > 100 ? 100 : pc) + '%');
                    }
                } else if (msg[0] == 'handshakeend') {//Chuc mung thiet bi da duoc nhan dang, va tao tai khoan thanh cong
                    //tra loi Nodejs tiep tuc cong viec thiet lap
                    //elUI.socIO.emit('reg_wdms', JSON.stringify(['handshakeend']));
                    //
                    if (msg[1] != 'CHK::OK') {
                        //da bi error, va se bi server disconnect
                        console.log('reg_check_err');
                        soc_msg(ht_m[5][0], 'text-danger', 4);
                        reg_step(0, 1);//error
                        //
                    } else {
                        reset_terMSG();
                        csPrnt.WriteLn({ type: 'input', prompt: ' ▲ ', value: ht_m[5][1], typeDelay: 20 }, function (ln) {
                        });
                        reg_step(1, 0);
                    };
                } else if (msg[0] == 'activeend') {//Chuc mung thiet bi da duoc nhan dang, va tao tai khoan thanh cong
                    //
                    if (msg[1] != 'WDMS::OK') {//da bi error, va se bi server disconnect
                        console.log(msg[1]);
                        soc_msg(ht_m[5][2] + msg[1], 'text-danger', 4);
                        reg_step(1, 1);//error
                    } else {
                        reset_terMSG();
                        csPrnt.WriteLn({ type: 'input', prompt: ' ▲ ', value: ht_m[5][3], typeDelay: 20 }, function (ln) {
                        });
                        reg_step(2, 0);
                    };
                } else if (msg[0] == 'regresult') {//Chuc mung thiet bi da duoc nhan dang, va tao tai khoan thanh cong
                    //
                    if (msg[1] != '') {//OK
                        //
                        //debugger;
                        //elUI.socIO.off('disconnect').close(); //close thi ben kia no tu xu ...
                        //elUI.socIO = null;
                        //
                        this.auth.ireg.tep = -9999;
                        //
                        //
                        var frmDAT = PUcontent.option('formData');
                        frmDAT.tok = msg[1];
                        if (msg[4]) frmDAT.fcmk = msg[4];//fcm key add for send realtime
                        //
                        //
                        dead._lastMSG = -1;
                        isEDITING = 1;//chuyen qua server ket noi nodejs voi c program mcc
                        selA['btnOK'].__k = connect_to_wdms_server.bind([msg[1], 0, frmDAT.id, frmDAT.serno, [DEVICE_ARGS(frmDAT)] ])();
                        selA['btnOK'].__k.push(msg[2]);//device information
                        selA['btnOK'].__k.push(msg[3]);//msg[3]:9999=wdms reg new,1:reg and run
                        //
                        btnCANCEL(1, 2, 2);//index[2]==2 meaning: click button thi se close elUI.socIO 
                        //
                        elUI.socIO.off('connect')
                            .off('disconnect')
                            .off('connect_error')
                            .off('reg_wdms');
                    } else {
                        soc_msg(ht_m[5][2], 'text-danger', 4);
                        reg_step(2, 1);//error
                    };
                };
                //
                $('.sockmsg').text(msg);
                //$('#messages').append($('<li>').text(msg));
            });
            //
        }, clearMSG_FRM = function () {
            wdmsInfo.html('');
            PUcontent.option({ 'readOnly': false, 'disabled': false });
            selA.btnWDMS.option('visible', true);
            selA['btnCLOSE'].option('disabled', false);//2 nut close X
            selA.btnCANCEL[0].option('disabled', false);//2 nut close bottom toolbar
            selA.btnOK.option('disabled', false);
            //
            selA['btnOK'].option('visible', false);
            selA['btnOK'].__k = null;// spec nhan dang da chuyen sang che do elUI.WDM
            //
            PUcontent._$element.removeClass('opac2');
            btnCANCEL(1, 2, 0);
            popup.preventCANCEL_AGAIN = 0;
            ht_m[4][0] = 0;
            //
        }, fillFRM = function (dat, isN) {
            elUI.dogTimezone[0].visible = true;
            var isD = false;
            if (isN > -1 && dat) {//chi update
                //
                for (var w in elUI.WDM) {
                    if (elUI.WDM.hasOwnProperty(w)) {
                        var __w = elUI.WDM[w].wdms;
                        if (__w.hasOwnProperty(dat.serno)) {
                            isD = true;
                            isN = __w[dat.serno][1];
                            dat['rtevt'] = isN[0] == 1;
                            dat['time_zone'] = isN[1];
                            dat['timezone'] = isN[2];
                            dat['isatt'] = isN[3] == 1;
                            //
                            if (isN[1] != 2000) {//not set value
                                elUI.dogTimezone[0].visible = false;
                            };
                            //
                        };
                    };
                };
            };
            //
            if (!isD) {
                dat['rtevt'] = true;
                dat['time_zone'] = 2000;//VN
                dat['timezone'] = 2000;
                dat['isatt'] = true;
            };
            //
            if (PUcontent) PU_valF('timezone', 'dataSource', elUI.dogTimezone);
        }

            , PU_valF=function(e,o,v){
                var el=  PUcontent.getEditor(e);
                if (v!==undefined)
                    el.option(o, v)
                else
                    return el.option(o);
            }

            , selA = { 'btnCANCEL': [null, "revert", elUI.lan.js_009_19 || "Cancel", "ti ti-unlink", elUI.lan.js_009_20 || "Stop MOBI", "tips", "Hoan tat"] }
            , terMSG = $('<div class="more-link"></div>')
 
            , ht_m = ['<div class="wdms-regstep text-small" style="display:none;">' +
                        '<div> ' +
                            '<span class="btn btn-sm btn-default">1</span>' +
                            '<p><small>Check</small></p>' +
                        '</div>' +
                        //'<div> ' +
                        //'    <span class="btn btn-sm btn-default">2</span>' +
                        //'    <p><small>Cloud</small></p>' +
                        //'</div>' +
                        '<div> ' +
                        '    <span class="btn btn-sm btn-default">2</span>' +
                        '    <p><small>Active</small></p>' +
                        '</div>' +
                        '<div>' +
                        '    <span class="btn btn-sm btn-default">3</span>' +
                        '    <p><small>Online</small></p>' +
                        '</div>' +
                    '</div>' +
                    '<div>' +
                        '<div class="dog_canvas"></div>' +
                        '<div class="box_conn">' +
                            '<div class="text_conn text-uppercase">' + //https://codepen.io/Gugiui/pen/Ybwqop
                                '$TIT$' +
                            '</div>' +
                            '<div class="comp"></div>' +
                            '<div class="loader_conn"></div>' +
                            '<div class="con"></div>' +
                            '<div class="byte"></div>' +
                            '<div class="server"></div>' +
                        '</div>' +
                  '</div>'

                , 'Connect to Mobi service ...'

                , ['Connect error, please check WDMS or IP address and try again  ...', 'Token invalid for connection!', 'There is another Active your device.']//INDEX 2

                , (elUI.lan.js_009_21 || 'Please enter server Mobi into device') + '. <a href="javascript:void(0)">' + (elUI.lan.js_009_22 || 'Click here for a help') + ' </a>'
                , [0, 'CONNECTING', 'ERROR', 'CONNECTED', 'UNSUPPORTED', 'INVALID', 'DUPLICATED'] //index 4
                , ['Sorry, our service have not yet support your device ...'
                    , 'Congratulation your device passed our check! Next step we establish WDMS cloud for your device, keep patient ....'
                    , 'Device actived error: '
                    , 'Device try connecting to our WDMS server ...'
                ]
                , ['Complete by click OK button'
                    , ['Opps! Mobi service down...', 'Please check Device network connection...', 'Please check Device IP, DNS, Gateway...', '... Try more please !']
                    , ['Humm! We are looking for your device...', 'Please check Device network connection...', 'Please check Device IP, DNS, Gateway...']
                    , "<i>" + (elUI.lan.js_009_23 || "Please confirm you want to skip MOBI activation") + " ?</i>"
                    , "<i>" + (elUI.lan.js_009_24 || "Please confirm that you want to remove the device") + " ?</i>"
                    , ' seconds next expired'
                    , 'Is your device ready ...?'
                ]//index 6
                , [''
                    , 'Standalone command timeout'// khi nodejs send command to device, after 5 second no reply
                    , 'Can not find MOTER'// nodejs getMOTER null    const Mo = getMOTER(so.id);
                    , 'Mobi service timeout' // emit timout
                    , 'Can not find your Device' //   let idxDEV = Mo.DEVs.indexOf(s);
                ]//index 7
                , elUI.lan.js_009_25 || [
                    "<i>Please confirm save changes ?</i>",
                    'Opps! no changes for updating.',
                    'The device is offline, it can not be updated !',
                    'An error occurred during the update, please try again.',
                    'Update successful'
                ]
            ]

            ,

            PUTitle = $('<div class="fuck-title text-center text-uppercase ">Activate Mobi function</div>')
        , _confirmDAG = function (txt, _cb) {
            //debugger;
            DevExpress.ui.dialog.confirm(txt, null, false).done(function (rst) {
                setTimeout(function () {

                    _cb(rst);

                }, 100);
            });
        }
        
        , onFieldDataChanged = function (e) {
            //debugger;
            var isUPT = selA['btnUPT'].option('visible'), val;//update mode
            if (['ten','serno','wdms','pkey'].indexOf(e.dataField) > -1) {
                val = apisvr.a$.trim(e.value);
                e.component.getEditor(e.dataField).option({ 'value': val });
            };
            if (isUPT) {
                selA['btnUPT'].option('disabled', false);
                popup._cpFieldChanged[0][e.dataField] = val?val:e.value;
            };
            //
            popup.isSAVE = 1;
        };

        function CANCEL_TerMSG(e) {
            //
            if (document.activeElement) {
                document.activeElement.blur();
            };
            //
            reset_terMSG();
            //
            //debugger;
            var _X_ = function () {
                closeREG();
                var frmD=PUcontent.option('formData');
                kill_wdms_server(frmD.tok, 1, frmD.serno);
                //
                //local connction kill
                if (!frmD.tok && elUI.localDEV) {
                    gloEVTs['elUI_localDEV']/*elUI.localDEV*/('disconn', [frmD['wdms']]);
                };
                //
                //
                clearMSG_FRM();
                popup.preventCANCEL_AGAIN = 1;//chan popup hidden call clear button again
                popup.hide();//click bang nut 
            }
            , closeREG = function () {
                var isR = 0;
                if (selA.btnCANCEL.act != 0) {
                    if (elUI.socIO) {
                        //
                        elUI.socIO.close(); //close thi ben kia no tu xu ...
                        //
                        isR = 1;
                    };
                }
                //
                clearMSG_FRM();
                //
                return isR==1;
            };
            //
            if (e) {
                if (selA['btnOK'].__k) {//xu ly ket noi elUI.WDM
                    if (selA['btnOK'].option('visible')) {
                        _confirmDAG(ht_m[6][3], function (rst) {
                            if (!rst) return;
                            _X_();
                        });
                    } else {
                        _X_();
                    };
                } else {
                    if (!closeREG()) {
                        popup.preventCANCEL_AGAIN = 1;//chan popup hidden call clear button again
                        popup.hide();
                    };
                }
            } else {
                closeREG();
            };
        }
        function chk_INPUT(F,msg, dat) {
            var idF = PUcontent.getEditor(F),
                VAL = idF.option('value'),
                va = idF._$element.data('dxValidator'),
                cusAC = va && va._getValidationRules()[0],
                isVALID = 100;

            if (!cusAC) return;

            if (dat) {//can check validate voi cai cu
                if (VAL === null || VAL === undefined || apisvr.a$.trim(VAL.toString()) === '') {
                    isVALID = 0;
                } else {
                    dat.forEach(function (dx) {
                        if (dx[F] == VAL) {
                            isVALID = 1;
                        };
                    });
                };
            };
            //
            if (isVALID<100) {
                cusAC.message = msg[isVALID];
                cusAC.isValid = false;
                idF.focus();
            } else {
                cusAC.message ='';
                cusAC.isValid = true;
            };
            va.validate();
            return isVALID;
        }

        function DEVICE_ARGS(doD) {
            return JSON.stringify([doD.rtevt ? 1 : 0, doD.time_zone, doD.timezone, doD.isatt ? 1 : 0, 0]);
        };

        const fTXT = {
            "seri": [_La$N('js_009_25|11', elUI.lan) || 'Serial empty', _La$N('js_009_25|12', elUI.lan) || 'Serial duplicated'],
            "ip": [_La$N('js_009_25|13', elUI.lan) || 'IP empty', _La$N('js_009_25|14', elUI.lan) || 'IP duplicated'],
            "id": [_La$N('js_009_25|15', elUI.lan) || 'Id empty', _La$N('js_009_25|16', elUI.lan) || 'Id duplicated'],
            'ten': [_La$N('js_009_25|17', elUI.lan) || 'Name empty', _La$N('js_009_25|18', elUI.lan) || 'Name duplicated']
        }
        , validF = function (ki, thi, devT) {
            //debugger;
            //
            if (ki[0] == 0) {//active mobil
                if (chk_INPUT(ki[1], fTXT.seri, thi) < 100) return;
            } else {//local connection
                chk_INPUT('wdms', fTXT.ip, thi.filter(function (d) { return d.kind == ki[0]; }));
            };
            //
            if (chk_INPUT('id', fTXT.id, thi) < 100) return;
            //
            if (chk_INPUT('ten', fTXT.ten, thi) < 100) return;
            //
            //
            //
            var result = PUcontent.validate();
            if (!result.isValid) {
                toastMsg(_La$N('js_009_25|5', elUI.lan) || "Require to fill information", 'error', null, 'top center');
                return;
            };
            //
            return "OK";
        };
        

        function Start_WDMS(e) {
            //
            const ki = kindF.kind, thi = this[0], devT = this[1];
            //
            if (validF(ki, thi, devT) !== "OK") {
                return;
            };
            //
            if (document.activeElement) {
                document.activeElement.blur();
            };
            //
            PUcontent.option('readOnly', true);
            selA.btnWDMS.option('visible', false);
            selA['btnCLOSE'].option('disabled', true);
            //
            soc_msg(ht_m[1], '', 1);
            //
            PUcontent._$element.addClass('opac2');
            //
            //
            setTimeout(function () {
                //
                var dogRUN = function () {

                    const doD = PUcontent.option('formData');

                    if (devT == 101) {//101 connect local mode

                        if (!w0w['_cordovaNative']) {
                            soc_msg(ht_m[2][0], 'text-danger', 2);//tam thoi loi ket noi local o che do web
                            return;
                        };


                        //debugger;
                        //tan dung lai variable result
                        return gloEVTs.giaidoan2_localDEV/*localDEV*/('connect', [[doD['wdms'], '0'/*port wdms*/, doD.id/*device ID*/], null

                            , [DEVICE_ARGS(doD),/*android rawREQ[5]*/, doD.pkey]

                        ]);//LOCAL_CONNECT_DEV([this]);
                        //
                    };


                    if (ki[0] == 0 ) {//device has function WDMS
                        //
                        _gsC(sockjo.soclib, 'js', function (data) {
                            wait_conn();
                        }, 'socket.io.js');
                        //
                    } else { //use active key
                        //config_s1();
                        dead._lastMSG = -1;
                        //debugger;
                        isEDITING = 1;//chuyen qua server ket noi nodejs voi c program mcc
                        selA['btnOK'].__k = connect_to_wdms_server.bind(["STZSZE1FOFo4WmNUVXNId3RwaW5odUE5RlhFL0c1b2p1and6MDVsOHc2ZmJseWp0RFBOZzZHc2Rpb3E2ZWdGVWZWcXkzT2cvak9Eb3pOQ2JMelVKa0QwMitiejJqQS9YeXdZQ2dUN1JjOE09BFsiMzEiLCIzOSIsIjMyIiwiMmUiLCIzMSIsIjM2IiwiMzgiLCIyZSIsIjMxIiwiMmUiLCIzOSIsIjMxIiwiM2EiLCIzMyIsIjMwIiwiMzAiLCIzMCJd", 1,
                            0, 0, [DEVICE_ARGS(doD)] ])();

                        selA['btnOK'].__k.push('msg[2]');//device information
                        selA['btnOK'].__k.push('0');//tmp
                        //
                        btnCANCEL(1, 2, 0);//0 meaning: click button thi se bo qua close elUI.socIO 
                    };
                };

                //
                if (!csPrnt) {
                    //debugger;
                    _gsC(srcpf$ + '/media/js/termynal.js', 'js', function () {
                        csPrnt = new Termynal(terMSG[0], {
                            cbNewLine: function () {
                                //debugger;
                                //terMSG[0].scrollTop = terMSG[0].scrollHeight;
                            }
                            , lineDelay: 5
                            //, typeDelay:10
                        });

                        dogRUN();

                    }, 'TermynalJS');
                } else {

                    dogRUN();

                };

            }, 50);
            //
        };

        function popup_HIDDEN_NEW(wdm, cntUSR) {

            //debugger;


            var _cb = this[0], isN = this[1];


            if (cntUSR === 'new_localconn_chk') {
                return _cb(wdm, cntUSR);
            };




            //saveDB();
            isEDITING = 0;
            if (popup.isSAVE == 1 && _cb && typeof _cb === "function") {
                popup.isSAVE = 0;
                var doD = PUcontent.option('formData'),
                    dumaWDO = [];
                //
                doD.time_zone = PU_valF('timezone', 'selectedItem').tim;// PUcontent.getEditor('timezone').option('selectedItem').tim;
                //
                //wdms option
                doD.wdmo = JSON.stringify([]);
                if (wdm) {
                    //debugger;
                    var sn = PU_valF('serno', 'value');
                    if (wdm.hasOwnProperty(sn)) {
                        doD.wdmo = JSON.stringify(wdm[sn]);
                        //
                        if (wdm[sn].hasOwnProperty('__uuidphone') && isN === -1) {//new
                            doD.__uuidphone = wdm[sn].__uuidphone ;
                        };
                        //****(2024/04/23) co 03 cho thay doi them wdmso [1]=SN ,[2]=MAC
                        dumaWDO = ['wdmso', sn, wdm[sn][0], wdm[sn][1], wdm[sn][2]];
                        //
                    }
                };
                //
                if (isN === -1) {//new

                    var InF = selA['btnOK'].__k,
                        MF = InF[4],
                        tok = InF[1], TOK = doD.tok;
                    //

                    //debugger;
                    if (!TOK) {
                        //truong hop local connection ko co iclock.js nen ve day moi gan ....
                        doD.tok = tok;
                        TOK = tok;
                    };



                    for (var fi in MF) {
                        if (MF.hasOwnProperty(fi) && doD.hasOwnProperty(fi)) {
                            doD[fi] = MF[fi];
                        };
                    };
                    _cb(doD);
                    //
                    //
                    //debugger;
                    frmEL.find('.mcc-statux[tok="' + TOK + '"]').attr('tok', tok)
                    .data(tok, [tok, 1, doD.id, doD.serno]);
                    //
                    //
                    //2024_06_25 mcc-statux ko the luu giu data dung cho cac chuc nang khac ...
                    if (doD.kind==0) elUI.WDM[InF[0]].mcc_statux[tok] = [tok, 1, doD.id, doD.serno];
                    //
                    //
                    //
                    var DEVs_Index3 = [];//nodejs la 1 array co index=3   ,[0]=device id
                    online_light(['online', tok, DEVs_Index3, cntUSR, dumaWDO]);
                    //
                    console.log('dosave');
                } else {//update
                    //
                    _cb(doD, isN);
                    //
                };
                //
                //du me store dung reqoverlay
                PU_valF.__doD = doD;
                //
                //neu ket noi global tu read device thi phai goi fcm key cho firebase cloud message ...
                if (doD.kind == 0 && gloEVTs['elUI_localDEV']/*elUI.localDEV*/) gloEVTs['elUI_localDEV']/*elUI.localDEV*/('fcmdev', [doD, '3']);
                //
            };
        };

        function popup_HIDDEN_UPT() {

            if (document.activeElement) {
                document.activeElement.blur();
            };


            var __E = function () {
                popup.preventCANCEL_AGAIN = 1;
                popup.hide();
                srclocked(false);
            };
            if (popup.isSAVE == 1) {

                const oldD = popup._cpFieldChanged[1], chg = popup._cpFieldChanged[0],
                    fU = [];
                for (var fi in chg) {
                    if (chg.hasOwnProperty(fi) && oldD.hasOwnProperty(fi) && chg[fi] != oldD[fi]) {
                        fU.push(fi);
                    };
                };
                if (fU.length > 0) {
                    //
                    if (this) {//click nut save update
                        const ki = kindF.kind, thi = this[0], devT = this[1];
                        if (validF(ki, thi.filter(function (d) {
                            return d.id != oldD.id;
                        }), devT) !== "OK") {
                            return;
                        };
                    };
                    //
                    _confirmDAG(ht_m[8][0], function (rst) {
                        //
                        if (!rst) return;//keep form display
                        //
                        srclocked(true);
                        selA['btnCLOSE'].option('disabled', true);//2 nut close X
                        selA.btnCANCEL[0].option('disabled', true);//2 nut close bottom toolbar
                        selA.btnUPT.option('disabled', true);
                        //
                        const doD = PUcontent.option('formData'),
                            TOK = (doD.time_zone = PU_valF('timezone', 'selectedItem').tim,//PUcontent.getEditor('timezone').option('selectedItem').tim;

                                    doD.tok),

                            svrI = atob(TOK).split(String.fromCharCode(4)),
                            //__k = makeKEY(svrI[1]);
                            __k = svrI[svrI.length - 1] != 'localconn' ?

                            makeKEY(svrI[1]) : //connect nodejs in web case

                            ((function () {

                                //debugger;

                                const fuk = DEVICE_ARGS(doD);

                                gloEVTs.giaidoan2_localDEV/*localDEV*/('edit', [[svrI[svrI.length - 2], '0'/*port wdms*/, doD.id/*device ID*/], TOK, [fuk, /*android rawREQ[5]*/, doD.pkey], function (r, wdms) {
                                    //
                                    debugger;
                                    //
                                    if (!wdms) {
                                        wdms = {};
                                        wdms[doD.serno] = JSON.parse(doD.wdmo);
                                    };
                                    //
                                    popup.saveDB(wdms);
                                    //
                                    toastMsg(ht_m[8][4], 'success');
                                    //
                                    __E();
                                    //
                                    gloEVTs.giaidoan2_localDEV /*localDEV*/('fcmdev', [doD, '33']);//33 dung chung fcmdev
                                    //
                                }]);


                            })(), 'return');



                        if (__k == 'return') return;
                        //
                        //
                        if (elUI.WDM[__k]) {// && elUI.WDM[__k].connect
                            //
                            var idx = elUI.WDM[__k].DEVs.indexOf(svrI[0]),
                                fnKEY = Math.random().toString(36).slice(2, 10) + new Date().getTime(),
                                fnRESET = function () {
                                    clearTimeout(WDMS_CMD_HWND_loop.hwndTimeout);
                                    delete WDMS_CMD_HWND[fnKEY];
                                },
                                cmd = [1, -9998,
                                    wdms_newO(elUI.WDM[__k].wdms[PU_valF('serno', 'value')], [doD.rtevt ? 1 : 0, doD.time_zone, doD.timezone, doD.isatt ? 1 : 0, 0], [])//0:Realtime,1:TimeZone,2:TimeZoneclock,3:attdevice ,4: region
                                ];//[2, 10000, fU];//2: goi lenh vao nodejs handshark o local device
                            //
                            WDMS_CMD_HWND[fnKEY] = function (msg, k, isTimeout) {
                                if (isTimeout == 0) {//kick server ok.
                                    if (msg[3][0] == 0) {//res=msg[3] hoan tat
                                        fnRESET();
                                        toastMsg(ht_m[8][4], 'success');
                                        //
                                        popup.saveDB(elUI.WDM[__k].wdms);
                                        //
                                        __E();
                                    } else if (msg[3][2] == 10001) {//result of wdms option
                                        //
                                        if (elUI.WDM[__k].wdms[doD.serno]) {
                                            elUI.WDM[__k].wdms[doD.serno][1] = JSON.parse(msg[4][6]);
                                        };
                                        //no o day di ....
                                    }
                                } else {
                                    //3: timeout sau 8s client trigger
                                    //orther timeout server Nodejs...
                                    fnRESET();
                                    toastMsg(ht_m[8][3] + '(' + isTimeout + ')', 'error');//server nodejs tra ve loi timeout
                                    __E();
                                };
                            }.bind([cmd]);
                            //
                            WDMS_CMD_HWND_loop.hwndTimeout = setTimeout(function () {
                                WDMS_CMD_HWND_loop.bind([null, 3])();//sau 15 second ko co reply thi se raise
                            }, 8000);
                            //
                            elUI.WDM[__k].emit(elUI.___[1], [[svrI[0]], cmd]);//WDMS_CMD
                            //
                        } else {
                            toastMsg(ht_m[8][2], 'error');//offline error
                            __E();
                        };
                    });
                    return;//cho confirm
                } else {
                    toastMsg(ht_m[8][1], 'warning');//no changed field update
                };
            };
            //
            __E();
        };


        const kindF = function (k) { return k == 0 ? 'serno' : 'serno' },
            kindT = function (k) { return k == 0 ? 'Serial number' : 'Serial number' },
            ipT = function (k) { return k == 0 ? 'Mobi server' : 'IP Address' },
            btnCONN = function (k) {
                //debugger;
                return _La$N('js_009_18|' + (k == 0 ? k : 1), elUI.lan) || (k == 0 ? "Start MOBI" : 'Connect');

            },
            senoVA_RU = function (k) {
                if (k == 0) {
                    return [{
                        type: "custom",
                        validationCallback: function (params) {
                            return !params.rule.hasOwnProperty('isValid') || params.rule.isValid;
                        }
                    }, { type: 'required' }];
                } else {
                    return [];
                };
            };
            

        this._Device = function (_sarg, _cb, atDAT,isN,kind) {
            //
            //var test = new Date(1658820980630);
            hwndFieldDataChanged = null;//reset
            //
            fillFRM(_sarg.dat, isN);
            //
            const _onShowing = function (e) {
                //
                const txt1 = PUcontent.getEditor('txt1'), regkind = (kindF.kind ? kindF.kind[0] : kind);

                //console.log(new Date().getTime(), '_renderFUK: ', regkind);

                //debugger;
                if (txt1) txt1._$element.closest('.dx-item')[(regkind == '0' ? 'remove' : 'add') + 'Class']('d-none d-sm-block');
                //
                //debugger;
                //tam thoi set serri no mcc 208 
                //*** (CHU Y) ****
                if (isN == '-1') {
                    txt1.option('value', '');//0095140400113 2000:not set ;79: vi-VN  5418212160193
                    const wdms = PUcontent.getEditor('wdms');

                    //wdms.dnd.vn:16868/xyz
                    //Serial number	5418212160193

                    wdms.option('value','');// regkind == '0' ? 'wdms.dnd.vn:16868/xyz': '192.168.1.10');//'wdms.dnd.vn:16868/abc': '192.168.1.249' 'wdms.dnd.vn:16868/xyz' );//2000:not set ;79: vi-VN
                };
                //
                if (selA['btnWDMS']) {
                    selA['btnWDMS']._$element.find('.dx-icon').attr('class', 'dx-icon ' + (regkind == 101 ? 'ti-plug' : 'dx-icon-globe'));
                };
                //
                srclocked(false);
            }
            ,
            _onHidden = function (e) {
                if (popup.preventCANCEL_AGAIN != 1) CANCEL_TerMSG();
                //dung cho ios cordova xu ly keyboard
                if (window['cdv_jsex']) e.component._$popupContent.trigger('cdvHidden', [popup]);
            }
            ,
            _onShown = function (e) {
                //
                setTimeout(function () {
                    PUcontent.updateDimensions();
                    //selA['btnWDMS'].repaint();//.option({ 'visible': true, 'disabled': false });
                    //selA.btnCANCEL[0].repaint();//.option({ 'visible': true, 'disabled': false });
                    //popup.repaint();
                }, 200);
                //
                dumeFRM();
                hwndFieldDataChanged = onFieldDataChanged;//bat dau trigger

                //dung cho ios cordova xu ly keyboard
                if (window['cdv_jsex']) e.component._$popupContent.trigger('cdvShown', [popup]);

            }
            ,
            dumeFRM = function () {
                //
                const regkind = PUcontent ? PUcontent.option('formData').kind : kind;
                kindF.kind = [regkind, kindF(regkind)];
                //
                selA['txt1']._$element.closest('.dx-item')[(regkind == '0' ? 'remove' : 'add') + 'Class']('d-none d-sm-block');
                //
                selA['txt1'].option({ 'disabled': regkind == 0 ? false : true });

                //
                const isUPT = selA['btnUPT'].option('visible');//update mode
                //
                PUcontent.getEditor('wdms').option('readOnly', isUPT);
                PUcontent.getEditor('pkey').option('readOnly', isUPT);
                PUcontent.getEditor('serno').option('readOnly', isUPT);
                //
                if (!isUPT) PUcontent.getEditor('timezone').option('value', 2000);//2000:not set ;79: vi-VN
                //
            };
            //
            var dume_hwnd = -1;
            //

            admin$.DEV(function () {
                setTimeout(function () {
                    //
                    if (!popup) {
                        popup = $("<div></div>").appendTo(frmEL.on('onRemoving', function (z) {
                            popup.dispose();//ko co cai nay ki load lai thi no loi
                        })).dxPopup({
                            contentTemplate: function (container) {
                                //var scrl = $("<div/>");
                                PUcontent = $("<div class='filter_fucking' style='min-height:50vh'></div>").appendTo(container).dxForm({
                                    labelMode: 'floating',
                                    formData: _sarg.dat,
                                    screenByWidth: function (width) {
                                        //
                                        return width < 400 ? 'xs' : (width < 500 ? 'sm' : 'md');
                                        //
                                    },
                                    colCountByScreen: {
                                        md: 4,
                                        sm: 1,
                                    },
                                    items: [
                                         {
                                             dataField: 'wdms',
                                             colSpan: 2,
                                             label: {
                                                 text: ipT(kind)
                                             },
                                             validationRules: [{
                                                 type: 'required',
                                                 message: _La$N('js_009_25|6', elUI.lan) || "Require to fill",
                                             }]
                                         },
                                         {
                                             name: 'txt1',
                                             dataField: kindF(kind),
                                             colSpan: 2,
                                             label: {
                                                 text: kindT(kind),
                                             }
                                             , editorOptions: {
                                                 disabled: kind == 0 ? false : true,
                                                 onContentReady: function (e) {
                                                     //
                                                     selA['txt1'] = e.component;
                                                     //
                                                     //console.log(new Date().getTime(),'kindF.kind', kindF.kind);
                                                     clearTimeout(dume_hwnd);
                                                     if (PUcontent) {
                                                         dume_hwnd = setTimeout(dumeFRM, 300);
                                                     };
                                                     //
                                                 }
                                             }
                                             , validationRules: senoVA_RU(kind)
                                         }
                                        ,

                                        {
                                            itemType: 'group',
                                            colCountByScreen: {
                                                sm: 4,
                                                xs:2
                                            },
                                            colSpan: 4,
                                            colCount: 4,
                                            items: [
                                                {
                                                    dataField: 'pkey',
                                                    label: {
                                                        text: 'Mobi P-key'
                                                    }
                                                     , validationRules: [{
                                                         type: "custom",
                                                         validationCallback: function (params) {
                                                             //debugger;
                                                             return !params.rule.hasOwnProperty('isValid') || params.rule.isValid;
                                                         }
                                                     }]
                                                }
                                                ,
                                                {
                                                    dataField: 'id',
                                                    label: {
                                                        text: 'No.'
                                                    }
                                                    , validationRules: [{
                                                        type: "custom",
                                                        validationCallback: function (params) {
                                                            return !params.rule.hasOwnProperty('isValid')||params.rule.isValid;
                                                        }
                                                    }]
                                                }
                                                , {
                                                    dataField: 'ten',
                                                    colSpan: 2,
                                                    label: {
                                                        text: elUI.lan.js_009_17 || 'Name'
                                                    },
                                                    editorOptions: {
                                                        maxLength: 15
                                                    },
                                                    validationRules: [{
                                                        type: "custom",
                                                        validationCallback: function (params) {
                                                            return !params.rule.hasOwnProperty('isValid') || params.rule.isValid;
                                                        }
                                                    }]
                                                }
                                            ]
                                        }


                                       
                                        ,
                                        {
                                            itemType: 'group',
                                            caption: elUI.lan.js_009_4 || 'Advanced setting',
                                            cssClass:'advance-item',
                                            colCountByScreen: {
                                                md: 4,
                                                sm: 1,
                                            },
                                            colSpan: 4,
                                            colCount: 4,
                                            items: [
                                                //{
                                                //    dataField: 'isreg',
                                                //    label: {
                                                //        text: 'Registration device'
                                                //    }
                                                //}, 
                                                {
                                                    dataField: 'area',
                                                    colSpan: 2,
                                                    editorOptions: {
                                                        text: "(Default)",
                                                        disabled:true
                                                    },
                                                    label: {
                                                        text: elUI.lan.js_009_8 || 'Area'
                                                    }
                                                }
                                                , {
                                                    dataField: 'timezone',
                                                    colSpan: 2,
                                                    editorType:'dxSelectBox',
                                                    editorOptions: {
                                                        dataSource: elUI.dogTimezone,
                                                        displayExpr: 'dis',
                                                        valueExpr: 'id'
                                                    },
                                                    label: {
                                                        text: elUI.lan.js_009_6 || 'Timezone'
                                                    }
                                                }
                                            ]
                                        }
                                        ,
                                        {
                                            itemType: 'group',
                                            colCountByScreen: {
                                                sm: 4,
                                                xs:1
                                            },
                                            colSpan: 4,
                                            colCount: 4,
                                            items: [
                                                {
                                                    dataField: 'isatt',
                                                    colSpan: 2,
                                                    editorType: "dxCheckBox",
                                                    label: {
                                                        text: elUI.lan.js_009_7|| 'Attendance device'
                                                    }
                                                },
                                                {
                                                    dataField: 'rtevt',
                                                    colSpan: 2,
                                                    editorType: "dxCheckBox",
                                                    label: {
                                                        text: elUI.lan.js_009_5 || 'Realtime event'
                                                    }
                                                }
                                                //, {
                                                //    dataField: 'heartbeat',
                                                //    label: {
                                                //        text: 'Request heartbeat'
                                                //    }
                                                //}
                                            ]
                                        }
                                    ]
                                    ,
                                    readOnly: false,
                                    showColonAfterLabel: true,
                                    labelLocation: 'left',
                                    minColWidth: 300,
                                    colCount: 4,
                                    onFieldDataChanged: function (e) {
                                        if (hwndFieldDataChanged && typeof hwndFieldDataChanged === "function") {
                                            hwndFieldDataChanged(e);
                                        };
                                    }
                                }).dxForm('instance');

                                wdmsInfo = $("<div class='font-italic'></div>").appendTo(container);
                                ////content.text("test content").height(1000);
                                //scrl.dxScrollView({
                                //    height: '100%',
                                //    width: '100%',
                                //    direction: 'both'
                                //});

                                //container.append(scrl);



                                return container;
                            },
                            deferRendering: false,//de cho no add scrollview ngay,  va luon
                            width: '100%',
                            maxWidth: 600,
                            height: 'auto',
                            fullScreen: DevExpress.devices._realDevice.deviceType == 'phone',
                            //container: filterDIV.closest('.kiem-the'),
                            showTitle: true,
                            //title: "Information",
                            visible: false,
                            dragEnabled: false,
                            //closeOnOutsideClick: true,
                            showCloseButton: true,
                            animation: {
                                show: {
                                    type: 'pop' //bat buoc iphone cung phai pop
                                }
                            },
                            onHidden: _onHidden,
                            onShowing: _onShowing,
                            onShown: _onShown,
                            onContentReady: function (e) {
                                //
                                e.component._$wrapper.addClass('tbh-filter-popup keep-def containscroll caidat_push_device' + (DevExpress.devices._realDevice.deviceType == 'phone' ? '' : ' caidat_push_device_overflow'));
                                //
                                var dogEL = e.component._$content;
                                selA['btnCLOSE'] = dogEL.find('.dx-closebutton').dxButton('instance');
                                //
                                //dogEL.find('.dx-closebutton').off('click').on('click', function (e) {
                                //    var pu = dxPU['ctrl'],
                                //        PFSI = dxPU[pu.idx]&&dxPU[pu.idx].PFSI;
                                //    //
                                //    if (PFSI) {
                                //        $(PFSI.element).removeClass('duy-nhat-scroll');
                                //        PFSI.destroy();
                                //        //
                                //        dxPU[pu.idx].dispose(); //huy builder filter
                                //        delete dxPU[pu.idx];
                                //        //
                                //    };
                                //    //
                                //});
                                //
                            },
                            toolbarItems: [{//
                                html: PUTitle,
                                location: "after"
                            },
                            {
                                widget: "dxButton",
                                location: "before",
                                options: {
                                    icon: "help",
                                    type: "success",
                                    stylingMode: "text",
                                    onClick: function (e) {
                                        //debugger;
                                        //_Y['slideToggle']({
                                        //    cb: function (x) {
                                        //        andchorFilter();//neofilter lai 
                                        //    }
                                        //});
                                    },
                                }
                            },


                            {
                                widget: "dxButton",
                                toolbar: "bottom",
                                location: "center",
                                options: {
                                    icon: selA.btnCANCEL[1],
                                    elementAttr: { 'class': 'show-orther-more' },
                                    text: selA.btnCANCEL[2],
                                    stylingMode: "outlined",
                                    //disabled: true,
                                    onContentReady: function (e) {
                                        selA.btnCANCEL[0] = e.component;//copy button
                                        selA.btnCANCEL.act = 0;
                                    },
                                    onClick: CANCEL_TerMSG
                                }
                            },
                            {
                                widget: "dxButton",
                                toolbar: "bottom",
                                location: "center",
                                options: {
                                    icon: "globe",
                                    elementAttr: { 'class': 'show-orther-more' },
                                    text:btnCONN(kind),
                                    type: "default",
                                    stylingMode: "outlined",
                                    visible: (isN===-1 ? true : false),
                                    onContentReady: function (e) {
                                        selA['btnWDMS'] = e.component;//udpate button
                                    },
                                    onClick: Start_WDMS.bind([atDAT,kind])
                                }
                            }

                            , {
                                widget: "dxButton",
                                toolbar: "bottom",
                                location: "center",
                                options: {
                                    icon: "ti ti-save",
                                    text:  _La$N('js_007_29', aLAN) ||  "Save",
                                    type: 'success',
                                    stylingMode: 'outlined',
                                    visible: (isN === -1 ? false : true),
                                    disabled:true,
                                    onContentReady: function (e) {
                                        selA['btnUPT'] = e.component;//udpate button
                                    },
                                    onClick: popup_HIDDEN_UPT.bind([atDAT, kind]),
                                }
                            }
                            , {
                                widget: "dxButton",
                                toolbar: "bottom",
                                location: "center",
                                options: {
                                    icon: 'tips',
                                    type: 'success',
                                    stylingMode: 'outlined',
                                    text: "OK",
                                    visible: false,
                                    onContentReady: function (e) {
                                        selA['btnOK'] = e.component;//udpate button
                                    },
                                    onClick: function (e) {
                                        if (document.activeElement) {
                                            document.activeElement.blur();
                                        };
                                        commit_wdms();
                                    }
                                }
                            }]
                        }).dxPopup("instance");


                    } else {
                        //
                        PUcontent.option('formData', _sarg.dat);
                        //
                        if (isN == -1) {
                            selA['btnWDMS'].option({ 'onClick': Start_WDMS.bind([atDAT, kind]), 'text': btnCONN(kind) });
                        } else {
                            selA['btnUPT'].option({ 'onClick': popup_HIDDEN_UPT.bind([atDAT, kind]) });
                        };
                        //
                        clearMSG_FRM();
                        //
                        selA['btnUPT'].option({ 'visible': isN === -1 ? false : true, 'disabled': true });

                        selA['btnWDMS'].option('visible', isN === -1 ? true : false);
                        //
                        //chk_INPUT('id', ['id empty', 'id trung'], null);
                        chk_INPUT('id',fTXT.id, []);
                        //
                        var isUPT = isN === -1 ? false : true,
                            kindA = kindF.kind;
                        //
                        //debugger;
                        kindA[1] = kindF(kind);
                        PUcontent.itemOption('txt1', 'dataField', kindA[1]);
                        PUcontent.itemOption('txt1', 'label', { text: kindT(kind) });
                        PUcontent.itemOption('txt1', 'validationRules', senoVA_RU(kind));


                        PUcontent.itemOption('wdms', 'label', { text:ipT(kind) });
                        //PUcontent.getEditor('wdms').option('value', "");
                        PUcontent.getEditor('txt1').option({ 'disabled': kind == 0 ? false : true });

                        kindA[0] = kind;
                        //
                        if (kind == 0) {
                            chk_INPUT(kindA[1], fTXT.seri , []);
                        } else {
                            chk_INPUT(kindA[1], fTXT.ip, []);
                        };
                        //
                        kindF.kind = kindA;//gan lai
                        //
                        popup.option({ onShowing: _onShowing, onHidden: _onHidden, onShown: _onShown });
                        //
                    };
                    //
                    PUTitle.html(_sarg.txt);//elUI.lan['js_009_14']);
                    popup._cpFieldChanged = [{}, JSON.parse(JSON.stringify(_sarg.dat))];
                    popup.isSAVE = 0;
                    popup.show();
                    //
                    popup.saveDB = popup_HIDDEN_NEW.bind([_cb, isN]);
                    //
                }, 10);

            });
        }
        this._confirmDEL = function (_sarg, _cb) {
            admin$.DEV(function () {
                setTimeout(function () {
                    _confirmDAG(ht_m[6][4], function (rst) {
                        _cb(rst, kill_wdms_server);
                    });
                    srclocked(false);
                }, 10);
            });
        }
        this._cmddev = function (_, cmd, d, datI, giaidoan2, p1, p2, p3) {
            
            if (giaidoan2 || cmd=='50') {

                cmd_2_wdms.bind([_, cmd, d, datI, giaidoan2, p1, p2, p3])();

            } else {

                admin$.DEV(cmd_2_wdms.bind([_, cmd, d, datI, giaidoan2, p1, p2, p3]));

            };

        };
        this.wdms_conn = function (_, d, f) {
            //
            gloEVTs.devcnt = d.length;
            //
            var its = d.length, idx = 0, _sigstatux = frmEL.find('.mcc-statux'),

                fn = function () {
                    //
                    if (idx < its) {

                        fn_wdms_HWND = function (rst) {
                            //debugger;
                            fn_wdms_HWND = null;//reset
                            if (rst[0] == 'connect_error' && rst[1]) {//isDisconnect
                                kill_wdms_server(d[idx].tok, 0,"");//ko goi ve server
                            };
                            idx += 1;//tang len 1
                            fn(); //loop lai
                        };
                        //
                        //debugger;
                        //
                        const m = d[idx],

                            connD = [m.tok, 1, m.id, m.serno, [DEVICE_ARGS(m),/*android rawREQ[5]*/, m.pkey], m.kind]

                            ,

                            _K = connect_to_wdms_server.bind(connD)()

                            ,

                            _sig = _K && (

                            connD[0]= _K[1] ,

                            _sigstatux.map(function (z, el) {
                                if (el.getAttribute('tok') === m.tok) {
                                    el.setAttribute('tok', _K[1]);
                                    $(el).data(_K[1], connD);
                                };
                            }), elUI.onlyDEV_ATT_EVT && elUI.onlyDEV_ATT_EVT.bind([_K, m, connD])(),

                                //2024_06_25 mcc-statux ko the luu giu data dung cho cac chuc nang khac ...
                                m.kind==0 &&  (elUI.WDM[_K[0]].mcc_statux[_K[1]] = connD)
                                //
                            );

                    };
                };
            //debugger;
            if (its > 0) fn();
        }


        elUI['\x5F\x5F'].forEach(function (_) { //__ https://www.dcode.fr/ascii-code
            frmEL['\x6F\x6E'](_, thIs[atob(_)]); //on https://coding.tools/ascii-to-hex
        });


        //ben sockjo.js ko load kip, thi tam thoi load truoc.
        if (!window['gloEVTs']) window['gloEVTs'] = {};



        //debugger;
        //
        // su kien nay utien cao nhat cho chuc nang quan ly thiet bi, moi lan goi no se gan lai.
        if (!gloEVTs.giaidoan2 || !gloEVTs.devcnt || gloEVTs.devcnt == 0) {

            gloEVTs.giaidoan2_localDEV = (function () { // scoping

                const NA__VE = w0w['_cordovaNative'],

                      ajaxsession = new Date().getTime() + Math.random().toString(36).substring(7),

                      _DEV = {};

                if (NA__VE) {

                    const eHIS = {}

                        ,

                        eCONN = (function () { // scoping

                            return function (arg, cmd) { // constructor


                                var WDM = []
                                ,

                                defOL
                                ,

                                fn = {

                                    'SND_OK': function (mg) {
                                        //moi khi send ok ko bi loi thi android device se goi ve message
                                        //console.log(" 'SND_OK': function (mg)", new Date().getTime());
                                    }

                                    ,

                                    'conn_err': function (iErr,tit/*index of title error*/) {
                                        //debugger;
                                        //connect fail
                                        //debugger;
                                        soc_msg(ht_m[2][iErr] ? ht_m[2][iErr] : ht_m[2][0], 'text-danger',tit || 2);
                                        //
                                        delete eHIS[fn.IP];
                                        //
                                        //de ko tiep tuc defOL.resolve()
                                        delete fn.IP;
                                    }

                                    ,

                                    'connect': function (rst) {
                                        //
                                        //debugger;

                                        WDM = [];//reset
                                        delete WDM.__uuidphone;
                                        //
                                        //unlock for //new connection
                                        if (!fn.TOK) selA.btnCANCEL[0].option('disabled', false);
                                        //
                                        //
                                        if (rst == '0' || (rst.indexOf('CONN_STA') > 0 && rst.indexOf('offline') > 0)) {
                                            //
                                            if (!fn.TOK) {//new connectin
                                                fn.conn_err(rst.split(String.fromCharCode(4))[2]);
                                            };
                                            //
                                            return;
                                            //
                                        } else {
                                            //
                                            rst = rst.split(';');
                                            //
                                            if (!fn.TOK) {//new connection
                                                //
                                                //debugger;
                                                //
                                                if (popup.saveDB(

                                                            [fn.IP].concat([].slice.apply(rst, [6, 8]))

                                                                , 'new_localconn_chk') === "1") { // bi trung ..

                                           

                                                    NA__VE.hieu_comjs(['ATT_DEV_CONN', fn.IP, "0", 'disconn', ajaxsession, "1", "2", "3"]);//3 cai du phong


                                                    //
                                                    fn.conn_err("0", 6);
                                                    //
                                                    //

                                                    //
                                                    return;
                                                    //
                                                };
                                                //
                                                //
                                                const dog = elUI;
                                                //
                                                soc_msg(ht_m[1], 'text-success', 3);
                                                //reset_terMSG();
                                                //
                                                //
                                                //debugger;
                                                //
                                                PU_valF('serno', 'value', rst[7]);

                                                WDM.push(rst[6]);

                                                WDM.push(JSON.parse(rst[4]));//cai cuoi cung cho online ve push vao
                                                //
                                                //index 2 duung cho device capacity infomratin
                                                //
                                                //
                                                WDM.__uuidphone = rst[rst.length - 1];/* uuid_phone moi them vao cho nay danh cho device uuid -> finger templ upload*/
                                                //
                                                //
                                                defOL = $.Deferred();
                                                //
                                                var errTO = setTimeout(function () {
                                                    //sau 5 second se reject
                                                    defOL.reject();
                                                    fn.conn_err(0);
                                                }, 10000);
                                                //
                                                //debugger;

                                                const id = btoa(rst[7] + ';' + rst[6])//SN + MAC 

                                                    ,

                                                    k = btoa([rst[1], fn.IP, 'localconn'].join(String.fromCharCode(4)));

                                                //
                                                csPrnt.WriteLn({ type: 'input', prompt: ' ▲ ', value: 'MAC: ' + rst[6], typeDelay: 20 }, function (ln) {
                                                    csPrnt.WriteLn({ type: 'input', prompt: ' ▲ ', value: 'SN: ' + rst[7], typeDelay: 20 }, function (ln) {

                                                        $.when(defOL).done(function (msg) {

                                                            commit_wdms(function (fnKEY) {
                                                                //
                                                                clearTimeout(errTO);//du me ko clear no xoa mat 
                                                                //
                                                                //debugger;
                                                                //
                                                                //ben hihrs encode to cmd=USR_EYE, ben android cut into dbK[8]
                                                                msg[5] = rst[8];
                                                                //
                                                                //debugger;
                                                                //
                                                                WDMS_CMD_HWND[fnKEY](msg, fnKEY, 0);
                                                                //
                                                                //debugger;
                                                                //
                                                                gloEVTs.giaidoan2_localDEV/*localDEV*/('fcmdev', [PU_valF.__doD, '33', fn.IP]);//33 dung chung fcmdev
                                                                //
                                                                //
                                                                //****** gan lai local device nay !!!
                                                                //debugger;
                                                                fn.TOK = k;
                                                                //
                                                                //
                                                            });

                                                        });

                                                    });
                                                });
                                                //return;
                                                //debugger;
                                                //



                                                //
                                                //debugger;

                                                selA['btnOK'].__k = [id, k, rst[7], "0"];

                                                //frmDAT.tok = k;//set cho nay luon, khi ok, se build html default mcc-statux
                                                //
                                            };
                                            //
                                            //debugger;
                                            //****(2024/04/23) co 03 cho thay doi them wdmso [1]=SN ,[2]=MAC
                                            fn.wdmso = ['wdmso', rst[7], rst[6]/* new Date().getTime()*/, JSON.parse(rst[4]), '', rst[5]];
                                            //
                                        };
                                        //
                                        //
                                        //debugger;
                                        //
                                        //2. step 2 - online if connect ok
                                        NA__VE.hieu_comjs(['ATT_DEV_CONN', fn.IP, "0", lenh = 'conn_online', ajaxsession, "conn_online=50"/*CMD_GET_FREE_SIZES*/, "2", "3"]);//3 cai du phong
                                        //
                                    }

                                    ,

                                    'online': function (rst) {
                                        //
                                        //debugger;
                                        //
                                        //console.log(rst);
                                        rst = rst.split(String.fromCharCode(31));


                                        if (rst[1].indexOf('RTEVT_STA') == 0) {

                                            rst[0] = 'LOCAL_DEV_MSG';//modify tranh chu online, chu ko co y nghia gi.
                                            online_light(rst);

                                            return;

                                        } else if (rst[1].indexOf('USR_EYE') == 0) {

                                            online_light(['usr', fn.TOK, [],

                                                    rst[1].split(String.fromCharCode(4))[1]//so luong user monitor device

                                            ]);

                                            return;

                                        } else if (rst[1].indexOf('ATT_LOG') == 0) {

                                            //debugger;
                                            //console.log('ONLINE: ' + this.IP);
                                            //console.log('ONLINE: ' + rst[1]);

                                            //debugger;
                                            if (fn.cb) {

                                                fn.cb('OK', rst[1].split(String.fromCharCode(4))[1]);

                                                //xoa call back function
                                                delete fn.cb;
                                            }

                                            return;

                                        } else if (rst[1].indexOf('CONN_STA') == 0) {
                                            //
                                            //du lieu duoc cach chr(4)
                                            var dat = rst[1].split(String.fromCharCode(4));
                                            dat.shift();//remove item index 0
                                            //
                                            //
                                            var dbK = dat[1].split(";");//old msg[7]

                                            //bien  dat[1] thanh k
                                            dat[1] = fn.TOK ? fn.TOK : btoa([dbK[1], fn.IP, 'localconn'].join(String.fromCharCode(4)));//k

                                            dat.push([]);
                                            //
                                            //eye-moter
                                            dat.push(0);

                                            if (dbK.length > 4) {
                                                //
                                                dat[3] = dbK[8];
                                                //
                                                //offline 
                                                //dbK[4] = OCL
                                                //dbK[5] = device capacity
                                                //****(2024/04/23) co 03 cho thay doi them wdmso [1]=SN ,[2]=MAC
                                                dat.push(['wdmso', dbK[7], dbK[6], JSON.parse(dbK[4]), dbK[5]]);
                                                //
                                            };

                                            //dat.push(100);
                                            //
                                            if (['reconnect', 'edit'].indexOf(lenh) > -1) {
                                                //
                                                //debugger;

                                                var wdms;//wdms options
                                                //
                                                if (dbK.length > 4) {
                                                    //
                                                    //debugger;
                                                    //tai hien lai dung edit.
                                                    wdms = {};
                                                    const id = btoa(dbK[7] + ';' + dbK[6]);//SN + MAC
                                                    wdms[dbK[7]/*serino*/] = [dbK[6], JSON.parse(dbK[4]), dbK[5]];
                                                    elUI['WDM'][id] = { 'wdms': wdms};
                                                }

                                                //
                                                //if (lenh == 'edit') {
                                                //save lai nua ...
                                                if (fn.cb) {
                                                    fn.cb('OK', wdms);
                                                    //xoa call back function
                                                    delete fn.cb;
                                                }
                                                //};
                                                //
                                                if (['offline', 'kickoff'].indexOf(dat[0]) == -1) {
                                                    lenh = 'online';
                                                    dat[0] = lenh;
                                                };
                                                //
                                            };
                                            //
                                            //debugger;
                                            online_light(dat);
                                            //
                                            //quan ly rte-log
                                            //
                                            return;

                                        };
                                        //
                                        //success
                                        //
                                        //
                                        rst = rst[1].split(String.fromCharCode(4));
                                        //
                                        rst[1] = rst[6].split("=")[1];//device capacity

                                        if (fn.TOK) {

                                            fn.wdmso[4] = rst[1];

                                            var dbK = ['online', fn.TOK, [], 50, fn.wdmso];

                                            //debugger;
                                            online_light(dbK);

                                            return;

                                        };
                                        //
                                        //
                                        //
                                        WDM[2] = rst[1];//device capacity
                                        //
                                        //
                                        //rstIn[1] = Buffer.from(dog + String.fromCharCode(4) + ConvertStringToHex(server_DICHVU[0] + ':' + server_DICHVU[1])).toString('base64');
                                        var k = selA['btnOK'].__k;
                                        //
                                        //
                                        //
                                        var wdms = {};
                                        wdms[k[2]/*serino*/] = WDM;
                                        elUI['WDM'][k[0]] = { 'wdms': wdms };//JSON.parse('{"wdms":{"8116222160619":["1693048942057",[1,2000,2000,1,0,0,30,15,1,1],"3-2-68-0-0-0-3000-3000-200000-0-0-0-0-0-0-0-693157417-383-0-0"]},"auth":{"token":"XQsnN1ozfAfdZ6vq7xazniWJrl69In5mm0FBKdjStnt/JNFp2GRdYwNd/elF/H/5rMCUfAB5TdOJ+6cOqKQUmvxanYkp/uls+3O2i6QgC+I=","statux":0,"id":1,"sn":"2145222960096"},"DEVs":["XQsnN1ozfAfdZ6vq7xazniWJrl69In5mm0FBKdjStnt/JNFp2GRdYwNd/elF/H/5rMCUfAB5TdOJ+6cOqKQUmvxanYkp/uls+3O2i6QgC+I="]}');
                                        //
                                        //
                                        //debugger;
                                        //
                                        const msg = [/*0*/,/*1*/,/*2*/,

                                            [0/*finish*/, -9999, 50/*device capacity*/]/*3*/,

                                            [, , , , , , WDM[2]/*6*/, , ],

                                            1/*5 count user moter --- will modify in defOL.resolve(msg) */

                                        ];
                                        //
                                        //debugger;
                                        if (!fn.IP) return;
                                        //
                                        defOL.resolve(msg);
                                        //
                                    }

                                    ,

                                    'devcmd': function (rst) {

                                        //debugger;

                                        lenh = 'online';

                                        //debugger;

                                        rst = rst.split(String.fromCharCode(4));

                                        var KQ = "OK";

                                        if (rst.length>0 && rst[1].indexOf('offline') > -1) {

                                            KQ = "ERR";

                                        } else if (rst[0].indexOf('ATT_LOG') > -1) {

                                            if (fn.cb) {

                                                fn.cb(KQ, rst[1]);

                                                //xoa call back function
                                                delete fn.cb;

                                            }

                                            return;

                                        } else if (rst.length > 6) {

                                            rst[6] = rst[6].split("=")[1];//device capacity
                                        };
                                        //
                                        if (fn.cb) {

                                            fn.cb(KQ, [, , , , rst]);

                                            //xoa call back function
                                            delete fn.cb;
                                        }
                                    }
                                }

                                ,

                                lenh = ''
                                ,

                                _MyObj = function (arg, cmd) { // constructor

                                    //debugger;

                                    const svrI = arg[0],
                                        ex = arg[2] || [],
                                        toS = function (k) {
                                            return ex[k] && ex[k].toString() || "";
                                        };

      
                                    //debugger;

                                    fn.IP = svrI[0];
                                    fn.TOK = arg[1];



                                    if (arg[3]) fn.cb = arg[3];//callback event...

                                    //debugger;

                                    NA__VE.hieu_comjs(['ATT_DEV_CONN'
                                        , svrI[0] //IP mcc
                                        , svrI[1] ? svrI[1] : '0'//Port exadms web
                                        , lenh = cmd || (fn.TOK ? 'reconnect' : 'connect')//cmd
                                        , ajaxsession//listen call back event
                                        , toS(0), toS(1), toS(2), toS(3), toS(4), toS(5), ''/*10 tu thiet bi*/, (svrI[2] || '').toString() /*11: id may cham cong*/]);//5 cai du phong


                                    //
                                }


                                fn.conn_online = fn.online;
                                fn.reconnect = fn.online;
                                fn.edit = fn.online;


                                _MyObj(arg, cmd);

                                this.rst = function (rst, or_cmd) {

                                    if (rst == 'SND_OK') {
                                        //
                                        fn[rst](or_cmd);
                                        //
                                    } else if (or_cmd) {

                                        _MyObj(rst, or_cmd);

                                    } else {
                                        //
                                        if (fn[lenh]) {
                                            fn[lenh](rst);
                                        } else {
                                            //debugger;
                                            if (fn.cb) {
                                                //
                                                fn.cb(rst);
                                                //xoa call back function
                                                delete fn.cb;
                                            };
                                        };
                                    };
                                };

                                //console.log(arg);

                            };



                        })();





                    $.extend(_DEV, {

                        connect: function (arg) {
                            //
                            //1.lock nut cancel
                            if (!arg[1]) selA.btnCANCEL[0].option('disabled', true);//2 nut close bottom toolbar
                            //
                            //debugger;
                            eHIS[arg[0][0]] = new eCONN(arg);
                            //
                        }
                        ,
                        disconn: function (arg) {
                            //
                            //debugger;
                            //goi tin hieu offline ben realtime truoc khi remove
                            arg.length > 2 && gloEVTs.dumeTHIETBI.f1.bind(['offline', arg[1]].concat(arg[2]) )();
                            //
                            //
                            NA__VE.hieu_comjs(['ATT_DEV_CONN', arg[0], "0", 'disconn', ajaxsession, "1", "2", "3"]);//3 cai du phong
                            //
                            //tha luon, no care result
                            delete eHIS[arg[0]];
                            //
                        }
                        , devcmd: function (arg,cmd) {
                            //
                            //debugger;
                            //
                            if (!eHIS[arg[0][0]] && cmd) {
                                //
                                //conn global save file or lam gi do, tren phone ios,android.
                                eHIS[arg[0][0]] = new eCONN(arg,cmd || 'devcmd');
                                //
                                //
                            } else {
                                eHIS[arg[0][0]].rst(arg, cmd || 'devcmd');
                            };
                            //
                        }
                        , edit: function (arg) {

                            //debugger;

                            eHIS[arg[0][0]].rst(arg, 'edit');

                        }
                        ,
                        destroy: function (e) {

                            //remove att ko co reative threadList + dieSOCK

                            NA__VE.hieu_comjs(['ATT_DEV_CONN', e[0], "0", 'destroy', ajaxsession, "1", "2", "3"]);//3 cai du phong

                            //release local device connection event
                            //delete w0w.dopostqueue[ajaxsession];
                        }
                        ,

                        fcmdev: function (e) {
                            //debugger;
                            var atD = e.splice(0, 1),//index 0 la data

                                devI = JSON.parse(atD[0].wdmo),

                                fcmK = atD[0].fcmk || '',//'fcm_key'

                                tinydb = e[0] == '0' ? (e[2] || "2") : 'tinydb',

                                mod = (devI[1][0] == '0'//no realtime
                                    || devI[1][3] == '0' // no attdevice
                                ) ? '1'/*remove*/ : e[0];
                            //
                            //se quyet dinh tham so real device fcm o cho nay ...
                            //
                            NA__VE.hieu_comjs(['ATT_DEV_CONN', fcmK, mod/*mode add to lst_MCC android*/
                                , 'fcmdev', ajaxsession, e[1] || "1", tinydb, e[3] || "3", e[4] || "4", e[5] || "5", e[6] || "6", e[7] || "7", e[8] || "8", e[9] || "9", e[10] || "10"]);//10 cai du phong
                            //
                        }

                    });

                    w0w.dopostqueue[ajaxsession] = function (rst) {

                        //debugger;

                        //d[rst.kq](rst.result);
                        rst = rst.split(String.fromCharCode(3));
                        if (eHIS.hasOwnProperty(rst[0])) {
                            //rst[0] = IP may cham cong
                            if (rst[1] == 'SND_OK') {

                                eHIS[rst[0]].rst(rst[1], rst[2]);

                            } else {

                                //console.log(new Date().getTime(),ajaxsession, ' w0w.dopostqueue[ajaxsession] ', rst);

                                eHIS[rst[0]].rst(rst[1]);

                            };
                        };


                    };
                    //
                };
                //
                //them ngoai 1 cai nua
                return gloEVTs['elUI_localDEV'] = function (na, op) {
                    if (_DEV.hasOwnProperty(na)) {

                        return _DEV[na](op);

                    } else if (['reqoverlay'].indexOf(na) > -1 && _DEV.hasOwnProperty('devcmd')) {

                        return _DEV['devcmd'](op, na);

                    } else {

                        return "webapp";

                    };
                };
                //
            })()

           

            const tmplet = function (devlst) {

                const def = $.Deferred();

                if (tmplet.raw) return def.resolve();

                debugger;

                devlst.trigger('get', [srcp$f + '/media/utils/device_step2.html'  /*'http://192.168.1.91:10996/media/utils/device_step2.html'*/ + src$id, function (data) {//get co ky tu \x03 giua chu e va chu t
                    //  

                    var ecU = this;

                    devlst.trigger('',//trigger event "\x1C\x1D\x1E\x1F"

                    [data,

                        false,//option add script when load , no worry, vi link jquery se emty string.

                        $.Deferred().done(function () {
                            //
                            const rawHTML = $(adCS(arguments[0], ecU));
                            //
                            for (var z = rawHTML.length - 1; z > -1; z--) {

                                if (rawHTML[z].classList && rawHTML[z].classList.contains("device-page__content")) {
                                    //
                                    //add them css link vao html
                                    //rawHTML[z].innerHTML += "<link rel='stylesheet' href='" + srcpf$ + "/media/css/bubble_msg_demo.css'/>";
                                    //
                                    //
                                    //******** doan code nay dung de tao language base64 cho device_step2.html
                                    //const test = {};
                                    //$.each(elUI.lan, function (k, v) {
                                    //    if (['js_009_31', 'js_009_32'].indexOf(k) > -1) {
                                    //        test[k] = v;
                                    //    };
                                    //});
                                    //console.log(
                                    //    btoa(encodeURIComponent(JSON.stringify(test)))
                                    //    );
                                    //************************************************************************************

                                    //
                                    //
                                    //
                                    tmplet.raw = rawHTML[z].outerHTML;
                                    //
                                    break;
                                    //
                                    //if (isAPP && qryU.hasOwnProperty('timegold_regisview')) {


                                    //    //doi class them ve container chat
                                    //    $(document.body).append(rawHTML[z]);


                                    //    //
                                    //} else {
                                    //    //
                                    //    rawHTML[z].innerHTML += "<div id='init_chathome_bg'></div>";
                                    //    //
                                    //    //raise flag has new UI
                                    //    mobi_cmm._new_UI = "1";
                                    //    //
                                    //    //
                                    //    //tan dung lai variable... ecU
                                    //    ecU = mobi_cmm.closest('.form_container');
                                    //    //
                                    //    const bubble = $(rawHTML[z]),

                                    //        chat__content = bubble.find('.chat_khuvuc .chat__content'),

                                    //        messages_page__header = bubble.find('.messages-page__header').addClass('d-none');

                                    //    bubble.insertAfter(ecU);
                                    //    //
                                    //    //
                                    //    ecU.find('.empty_msg').addClass('px-3').insertAfter(messages_page__header.next());
                                    //    //
                                    //    mobi_cmm.closest('.container').appendTo(chat__content);
                                    //    //
                                    //    setTimeout(function () {
                                    //        bubble.removeClass('d-none');
                                    //    }, 300);

                                    //};
                                    //
                                    break;
                                    //
                                };
                            };
                            //
                            //add code vao 
                            //debugger;
                            //add code xu ly form vao.
                            apisvr.a$.scod(arguments[3].splice(0, 1)[0]);

                            //du me doan code bz2 ... worker

                            tmplet.wokJS = arguments[3];// arguments[3][0] + ';(function(){' + arguments[3][1].replace('_$_ATTLOG_$_', '_$_ATTLOG_$_'.hexEncode()) + '})()';
                            tmplet.wokJS.unshift('_$_ATTLOG_$_'.hexEncode());
                            //

                            //
                            //
                            //debugger;
                            def.resolve();//sure script already .
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

                return def;
            };


            DEVI__Q.VER[1] = hasUA;//set de ben sockjo -> cb$STEP2()

            gloEVTs.giaidoan2 = function (e, tit, devlst, on_or_one) {
                //

                //debugger;

                const renderAttFrm = function (nextQ) {

                    //debugger;

                    tmplet(devlst).done(function (a) {
                        //var def = $.Deferred();
                        //debugger;
                        //
                        const

                            buoc2 = $(tmplet.raw).on('buoc2_c$b', gloEVTs.cb$STEP2)

                            ,

                            frm = (['JS_JS_payrollonline', 'attlog_oneday'].indexOf(tit) > -1 ? devlst : puhwnd.find('.modal-body')).append(buoc2).ready(function (e) {
                                //
                                //
                                if (w0w['_cordovaNative']) {//phone
                                    frm.addClass('client_dienthoai');
                                };
                                //

                                if (Main.hasOwnProperty('device_step2')) {


                                    //fn.tailog({
                                    //    lstMCC: devlst.__dbDAT.filter(function (e) {
                                    //        return e.isatt == true;
                                    //    })
                                    //});

                                    //tmplet.wokJS = arguments[3][0] + ';(function(){' + arguments[3][1].replace('_$_ATTLOG_$_', '_$_ATTLOG_$_'.hexEncode()) + '})()';
                                    //debugger;
                                    //
                                    const bkDEV = devlst[0].tagName.toLowerCase() == 'dulieu';
                                    //
                                    if (bkDEV === true) {
                                        //select employee dowload template ...
                                        frm.data('__bk_res', {

                                            sem: JSON.parse(atob(devlst.attr('sem'))),

                                            tok: devlst.attr('tok'),

                                            __fn: devlst.data('__fn')

                                        });//.attr('sem', devlst.attr('sem'));
                                    };
                                    //
                                    //
                                    gloEVTs.giaidoan2.fnXX = new Main.device_step2({

                                        el: frm,

                                        elUI: elUI,

                                        //chu y sau nay filter condition
                                        wokJS: tmplet.wokJS,

                                        zkblob: zkblob
                                    });
                                    //
                                    //init jobworker moi thiet bi//gloEVTs_giaidoan2_fn
                                    gloEVTs.giaidoan2.fnXX.initWOK(

                                        bkDEV===false?

                                            devlst.__dbDAT.filter(function (x) {
                                                //
                                                return x.isatt === true
                                                //
                                            })

                                            :

                                            devlst.__dbDAT

                                        );
                                    //
                                    //defPU.resolve();

                                };
                                //
                                puhwnd.removeClass('invisible');
                                //
                            }).on('DOWN_ATTLOG_END', function () {

                                console.log('DOWN_ATTLOG_END ', new Date().getTime());

                                nextQ();

                            });
                        


                        //neu desktop thi build nice scrollbar
                        if (i$Desk && ['JS_JS_payrollonline', 'attlog_oneday', 'dev-user-get', 'hide-tit-hed'].indexOf(tit) < 0) {
                            //debugger;
                            if (!puhwnd.log_scrollPerfect) {
                                //scroll prefect tree ca kip
                                puhwnd.att_scrollPerfect = new PerfectScrollbar(frm[0], {
                                    suppressScrollX: true
                                });
                            };
                        };



                    });


                    //noidung();
                }

                ,

                zkblob = (function () { // scoping

                    return function (cmd, d, datI, whe, hevyENGINE, __bk_res) { // constructor
                        //
                        //debugger;
                        //
                        setTimeout(function () {

                            elUI[
                                //ko lay thang, viet vong vong choi.
                                atob("\x58\x32\x4e\x74\x5a\x47\x52\x6c\x64\x67")//_cmddev https://www.dcode.fr/ascii-code

                            ].bind([hevyENGINE, cmd, d, datI, dumeCB, whe, __bk_res])();

                        }, 100);
                        //
                        //
                        //
                        const dumeCB = function (args) {

                            debugger;
                            console.log(new Date().getTime(), 'dumeCB = function (args 3) : ', args[3]);

                            const pag = args[4].split('|'),

                                fakeBLO = (parseInt(pag[1]) + parseInt(pag[4])),

                                txt = parseInt(args[3]) < 0 && pag[2]=="0" ? ' in progressing ..' : ' get block ' + pag[4] + ' ~ ' + fakeBLO;

                            //
                            toastMsg(args[2].ten +  txt,

                               args[0] == 'OK' ? 'success' : 'error'

                                , null, null, "fogetdev");//lay thong tin thiet bi
                            //
                            //
                            //console.log('ios', 'indexedDBx');
                            //debugger;
                            gloEVTs.giaidoan2.fnXX.bz2(args);
                            //
                        };
                        //
                        console.log('ios', hevyENGINE);
                        //
                        //
                    }

                })();




                if (['JS_JS_payrollonline', 'attlog_oneday'].indexOf(tit) > -1) {
                    //
                    //add vao queue ....
                    DEVI__Q(renderAttFrm);
                    //
                    return;
                    //
                };

                //

                //setTimeout(function () {//load UI before ...

                //    devlst.__dbDAT.filter(function (_dat, datI) {
                //        //
                //        if (_dat.isatt === true) {
                //            //chi tai nhung may dung de cham cong

                //            //zkblob(-505, _dat, datI + 1, "0|100|0|1|2");
                //            //$!N; khong che base64 break line zk break 76 char / 1line, -> 10 line = 760 char
                //            new zkblob(-505, _dat, datI + 1, "0|300|$!N;$!N;$!N;$!N;$!N;$!N;$!N;$!N;$!N;|1|2");

                //        };
                //        //
                //    });

                //}, 100);

                //
                //
                //
                //1. show modal popup form
                const puhwnd = admin$.popup.bind(/*new fn*/).apply(null, [{
                    a: 'd', t: tit, cBu: 1, fw: 0, cbClosed: function (e) {
                        //
                        //huy perfect scrollbar cua DIV modal-body
                        if (puhwnd.att_scrollPerfect) puhwnd.att_scrollPerfect.destroy();
                        //
                        // unBind events when popup close
                        if (elUI.unFixW) elUI.unFixW();
                        //
                    }
                }])

                , btndone = puhwnd.find('#popupdone')

                , btndonefn = function (state) {
                    btndone[(state ? 'add' : 'remove') + 'Class']('btn-primary').prop('disabled', !state);
                }, noidung = function () {
                    //

                };

                puhwnd.find('.modal-dialog').addClass('modal-dialog-centered modal-dialog-zoom pu_fullW my-0') // 
                        .css({ 'max-width': '800px' });

                //puhwnd.removeClass('fade').addClass('fadeIn');


                //
                if (['hide-tit-hed','dev-user-get'].indexOf(tit) >-1) {
                    puhwnd.addClass('invisible').find(".modal-header").remove();//.addClass('d-none');
                };
                //
                puhwnd.find('.modal-footer').remove();
                btndone.remove();
                //
                //
                puhwnd[on_or_one ? on_or_one : 'one']('shown.bs.modal', function () {

                    DEVI__Q(renderAttFrm);

                });
                //
                //}).one('hide.bs.modal', function () {
                //    //fuckScroll.destroy();
                //});
                setTimeout(DEVI__Q(function (nextQ) {


                    puhwnd.modal('show');

                    nextQ();

                    //renderAttFrm();

                }), 1);


                //if (mnu.hasClass('downattlog')) {
                //alert('downattlog');
                //} else {
                //alert('mngusrs');
                //}

                return puhwnd;

            };

        };
        
    }

    MyObj.prototype.publicSharedVar = 'quux';
    MyObj.prototype.publicSharedMethod = function (param) {
        // has access to shared and public vars
        // canonical way for method creation:
        // try to use this as much as possible
    };

    return MyObj;

});


