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
        var hasUA = opts.ua > 1 ? 'UA' : 'noU',thIs=this;
        var privateInstanceVar = 'bar';
        this.publicInstanceVar = 'baz';
        function privateInstanceFunction() {
            // has access to all vars
            // can't be called via this
        };
        this.publicInstanceMethod = function () {
            // has access to all vars
            // also known as a privileged method
        };

        var online_signal = function () { // scoping

            function _draw(canvas) {//https://codepen.io/collin-garvey/pen/BdWMMb
                //debugger;
                //var canvas = document.getElementById('binary-canvas');
                if (!canvas) return;
                var ctx = canvas.getContext('2d'),raf;

                //ctx.canvas.width = canvas.innerWidth;
                //ctx.canvas.height = canvas.innerHeight;

                ctx.font = '20px Arial';
                ctx.fillStyle = '#444444';

                var fontSize = 20;
                var columns = Math.floor(canvas.width / fontSize);
                var rows = Math.floor(canvas.height / fontSize);

                var binChars = ['0', '1'];
                var bits = [];
                var bitHeight = fontSize;
                var bitWidth = fontSize;

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
                var fps = 10;
                var interval = 1000 / fps;
                var now;
                var then = Date.now();
                var delta;

                // Draw all bits once before starting animation
                bits.forEach(function (bit) {
                    ctx.clearRect(bit.x, bit.y, bitWidth, bitHeight);
                    ctx.fillText(bit.value, bit.x, bit.y + bitHeight);
                    bit.hasDrawn = true;
                });

                var dogDR = function () {
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
        }();

        var isEDITING = 0
            , fn_wdms_HWND = null
            , msgSTOP = false
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
            , WDMS_CMD_HWND_loop = function (msg, isTimeout) {
                clearTimeout(WDMS_CMD_HWND_loop.hwndTimeout);
                for (var k in WDMS_CMD_HWND) {
                    if (WDMS_CMD_HWND.hasOwnProperty(k)) WDMS_CMD_HWND[k](msg, k, isTimeout);
                };
            }
            , makeKEY = function (svrI_1) {
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
            , info_deferred = $.Deferred(), nodejs_deferred = $.Deferred()
            , commit_wdms = function () {
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
                var atIO = selA['btnOK'].__k
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
                                return 2;
                            };
                        };
                    };
                    return 0;//chua hoan tat
                }
                , inf = atIO[2].split('\n')
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
                        var bid = this;
                        if (atIO[1] == msg[2]) {//token ma hoa
                            isRMV = cmdRST(bid, msg[3], msg[4]);
                        };
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
                            debugger;
                            var thr = elUI.WDM[atIO[0]].auth;
                            thr.statux = 1;//active, vi khi server mat connect, reconnect send statux=1
                            //
                            elUI.WDM[atIO[0]].setAUTH(thr);//'update socke authr
                            //
                            //
                            return;
                            //
                        };
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
                info_deferred.promise();
                nodejs_deferred.promise();
                //
                WDMS_CMD_HWND_loop.hwndTimeout = setTimeout(function () {
                    WDMS_CMD_HWND_loop(null, 3);//sau 15 second ko co reply thi se raise
                }, 25000);
                //
                //debugger;
                elUI.WDM[atIO[0]].emit(elUI.___[1], [[atIO[1]], cmd]);//WDMS_CMD atIO[3]:9999-regnew; 1: reg&run ; 1111:exwdms run after reg
                //
                atIO[4] = {};
                fnMSG();
            }
            , kill_wdms_server = function (TOK, DEL,sn) {
                //debugger;
                var svrI = atob(TOK).split(String.fromCharCode(4)),
                    __k = makeKEY(svrI[1]);

                if (elUI.WDM[__k]) {
                    //
                    var idx = elUI.WDM[__k].DEVs.indexOf(svrI[0]),
                        exwmdID='';
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
                        elUI.WDM[__k].DEVs.splice(idx, 1);
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
                //debugger;
                var isWdmso = msg.length > 4,
                    devcap,
                    Wdm = isWdmso && msg[4][0] == 'wdmso' ? (devcap = msg[4][4], msg[4][3]) : [];
                //
                if (msg[0] == 'kickoff') {
                    //debugger;
                    elUI.fnHANDSHAKE([msg[0], [msg[1]], msg[0], msg[3], Wdm, devcap]);
                } else if (msg[0] == 'usr') {
                    //Wdm = msg[4] && msg[4] || [];
                    elUI.fnHANDSHAKE([msg[0], [msg[1]], msg[0], msg[3], Wdm, devcap]);
                } else if (['online', 'offline'].indexOf(msg[0]) > -1) {
                    elUI.fnHANDSHAKE(['sigLIVE', [msg[1]], msg[0], msg[3], Wdm, devcap]);
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
                var TOK = this,
                    svrI = atob(TOK[0]).split(String.fromCharCode(4)),
                    __k = makeKEY(svrI[1]),

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
                                     _sigstatux;

                                elUI.WDM[__k].DEVs.forEach(function (dev) {
                                    if (dev != socAUT.token) {
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
                                WDMS_CMD_HWND_loop(msg, msg[1]);//msg[1] la timeout
                            } else {
                                if (isEDITING > 0) {
                                    if (msg[0] == 'online') {
                                        live();
                                    } else {
                                        dead(2);
                                    };
                                };
                                //cho nhung cai nam o phia duoi..??
                                if (online_light(msg)) {//mg[3] = wdms option
                                    if (msg[4][0] == 'wdmso') {//nguyen con
                                        console.log('new wdmso' + new Date().getTime() + JSON.stringify(msg[4][3]));
                                        this.wdms[msg[4][1]] = [msg[4][2], msg[4][3], msg[4][4]];//gan vao de khi edit thi load len
                                    } else {
                                        // this.wdms[msg[4][1]] = msg[4][3];
                                    };
                                };
                            };
                            //

                        }, 'RTEVT'//flag detect public event

                        ).STARTd();//khac biet cho nay
                    };
                //
                //
                elUI.WDM[__k] = sockjo.getSOCK(__k);
                //
                if (!elUI.WDM[__k]) {
                    //debugger;
                    //
                    //
                    // "192.168.1.91:3000";
                    var svrad = JSON.parse(svrI[1]).reduce(function (a, b) { return a + String.fromCharCode(parseInt(b, 16)); }, "");
                    //
                    //*****************************************************************************************
                    var prot = window.location.protocol;
                    //
                    prot = prot.indexOf('file:') > -1 ? 'https:' : prot;//android app
                    //
                    console.log(prot + '//' + (prot.indexOf('https') > -1 ? svrad.split(':')[0] : svrad));
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
                    //debugger;
                    //
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
                    if (fn_wdms_HWND && typeof fn_wdms_HWND === "function") fn_wdms_HWND([elUI.___[2]]);
                };
                //
                return [__k, svrI[0]];
            }
            , wait_push_hwnd, wait_push_TO = new Date()
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
                var idx = elUI.WDM[__k].DEVs.indexOf(svrI[0]),
                        fnKEY = Math.random().toString(36).slice(2, 10) + new Date().getTime(),
                        fnRESET = function () {
                            clearTimeout(WDMS_CMD_HWND_loop.hwndTimeout);
                            delete WDMS_CMD_HWND[fnKEY];
                        };
                //
                WDMS_CMD_HWND[fnKEY] = function (msg, k, isTimeout) {
                    if (isTimeout == 0) {//kick server ok.
                        if (msg[3][0] == 0) {//res=msg[3] hoan tat
                            fnRESET();
                            toastMsg(ht_m[8][4], 'success');
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
                    } else {
                        //3: timeout sau 8s client trigger
                        //orther timeout server Nodejs...
                        fnRESET();
                        toastMsg(ht_m[8][3] + '(' + isTimeout + ')', 'error');//server nodejs tra ve loi timeout
                        //
                        c$b('ERR');
                    };
                }.bind([cmd]);
                //
                WDMS_CMD_HWND_loop.hwndTimeout = setTimeout(function () {
                    WDMS_CMD_HWND_loop(null, 3);//sau 15 second ko co reply thi se raise
                }, 8000);
                //
                elUI.WDM[__k].emit(elUI.___[1], [[svrI[0]], cmd]);//WDMS_CMD
            }
            , cmd_2_wdms = function () {
                var t$t = this, cmd = t$t[1], TOK = t$t[2].tok
                    , svrI = atob(TOK).split(String.fromCharCode(4)),
                    __k = makeKEY(svrI[1]);
                //
                if (elUI.WDM[__k]) {
                    exe_wdmscmd(__k, svrI,
                        [1, cmd, 'tinhsau']
                        , function (a, m, k) {
                            if (m[3][0] == 0) {//res=msg[3] hoan tat
                                if (a == 'OK') $(t$t[0].target).trigger('rst_devstas', [a, m, t$t[2], t$t[3]]);
                                srclocked(false);
                            };
                        }
                    );
                };
            };
  
        var reg_step = function (inS, err) {
            //
            ht_m.$regstep = inS;
            //
            var ste = wdmsInfo.find('.wdms-regstep span.btn');
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
            if (ht_m[4][0] != d || dog) {
                //
                ht_m[4][0] = d;
                wdmsInfo.empty();
                reset_terMSG();
                wdmsInfo.append([terMSG, $('<div>' + ht_m[0].replace('$TIT$', ht_m[4][d]) + '<div class="mt-3 text-center"><i class="fa fa-quote-left" aria-hidden="true"></i> ' + b + ' <i class="fa fa-quote-right" aria-hidden="true"></div></div>')]);
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
                    return {//io(addr, {//
                        auth: {
                            token: 'token-secure-socket',
                            ireg: {
                                sn: PU_valF('serno','value'),
                                pkey: PU_valF('pkey','value'),
                                tz: PU_valF('timezone','selectedItem').tim,
                                rtevt: PU_valF('rtevt','value') ? 1 : 0,
                                grp: tmp.pathname.replace("/", ''),
                                tep: 0
                            }
                        }
                        //, path: '/octagon/socket.io'
                        , transports: ["websocket", "polling"] // use WebSocket first, if available
                    }
                };

            if (match === null) {
                //https://www.namecheap.com/support/knowledgebase/article.aspx/9705/33/installing-an-ssl-certificate-on-nodejs/
                addr = window.location.protocol+ '//' + addr;
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
            const isFILE = tmp.protocol.indexOf('file:') > -1 ? 'wss://' : '';//android app
            //
            elUI.socIO = io(isFILE  + tmp.hostname + ((isFILE != ''
                || tmp.protocol.indexOf('https') > -1) ? "" : ":11015"), socOPT());

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
                        var frmDAT = PUcontent.option('formData');
                        frmDAT.tok = msg[1];
                        //
                        //
                        dead._lastMSG = -1;
                        isEDITING = 1;//chuyen qua server ket noi nodejs voi c program mcc
                        selA['btnOK'].__k = connect_to_wdms_server.bind([msg[1], 0, frmDAT.id, frmDAT.serno])();
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
            , popup
            , PUcontent
            , PU_valF=function(e,o,v){
                var el=  PUcontent.getEditor(e);
                if (v!==undefined)
                    el.option(o, v)
                else
                    return el.option(o);
            }
            , wdmsInfo, selA = { 'btnCANCEL': [null, "revert", elUI.lan.js_009_19 || "Cancel", "ti ti-unlink", elUI.lan.js_009_20 || "Stop MOBI", "tips", "Hoan tat"] }
            , terMSG = $('<div class="more-link"></div>')
            , csPrnt,
            ht_m = ['<div class="wdms-regstep text-small" style="display:none;">' +
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
                , ['Connect error, please check WDMS address and try again  ...', 'Token invalid for connection!', 'There is another Active your device.']//INDEX 2
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
            ],

            PUTitle = $('<div class="fuck-title text-center text-uppercase ">Activate Mobi function</div>')
        , _confirmDAG = function (txt, _cb) {
            //debugger;
            DevExpress.ui.dialog.confirm(txt, null, false).done(function (rst) {
                _cb(rst);
            });
        }
        ,hwndFieldDataChanged, onFieldDataChanged = function (e) {
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
            reset_terMSG();
            //
            //debugger;
            var _X_ = function () {
                closeREG();
                var frmD=PUcontent.option('formData');
                kill_wdms_server(frmD.tok, 1, frmD.serno);
                //
                clearMSG_FRM();
                popup.preventCANCEL_AGAIN = 1;//chan popup hidden call clear button again
                popup.hide();//click bang nut 
            }
            , closeREG = function () {
                var isR = 0;
                if (elUI.socIO && selA.btnCANCEL.act != 0) {
                    //
                    elUI.socIO.close(); //close thi ben kia no tu xu ...
                    //
                    isR=1;
                };
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
                cusAC = va._getValidationRules()[0],
                isVALID = 100;

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
        function Start_WDMS(e) {
            //
            //debugger;
            var ki = kindF.kind;
            if (ki[0] == 0) {
                if (chk_INPUT(ki[1], ['empty serno', 'trung serno'], this) < 100) return;
            } else {
                chk_INPUT(ki[1], ['empty pubkey', 'trung pubkey'], null);
            };
            //
            if (chk_INPUT('id', ['id empty', 'id trung'], this) < 100) return;
            //
            PUcontent.option('readOnly', true);
            selA.btnWDMS.option('visible', false);
            selA['btnCLOSE'].option('disabled', true);
            //
            soc_msg(ht_m[1], '', 1);
            //
            PUcontent._$element.addClass('opac2');
            //
            setTimeout(function () {
                //
                var dogRUN = function () {
                    if (ki[0] == 0) {//device has function WDMS

                        _gsC(sockjo.soclib, 'js', function (data) {
                            wait_conn();
                        }, 'socket.io.js');

                       
                    } else { //use active key
                        //config_s1();
                        dead._lastMSG = -1;
                        //debugger;
                        isEDITING = 1;//chuyen qua server ket noi nodejs voi c program mcc
                        selA['btnOK'].__k = connect_to_wdms_server.bind(["STZSZE1FOFo4WmNUVXNId3RwaW5odUE5RlhFL0c1b2p1and6MDVsOHc2ZmJseWp0RFBOZzZHc2Rpb3E2ZWdGVWZWcXkzT2cvak9Eb3pOQ2JMelVKa0QwMitiejJqQS9YeXdZQ2dUN1JjOE09BFsiMzEiLCIzOSIsIjMyIiwiMmUiLCIzMSIsIjM2IiwiMzgiLCIyZSIsIjMxIiwiMmUiLCIzOSIsIjMxIiwiM2EiLCIzMyIsIjMwIiwiMzAiLCIzMCJd",1])();
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

        function popup_HIDDEN_NEW(wdm,cntUSR) {
            //debugger;
            var _cb = this[0], isN=this[1];
            //saveDB();
            isEDITING = 0;
            if (popup.isSAVE == 1 && _cb && typeof _cb === "function") {
                popup.isSAVE = 0;
                var doD = PUcontent.option('formData'),
                    dumaWDO = [];
                //
                doD.time_zone =PU_valF('timezone','selectedItem').tim;// PUcontent.getEditor('timezone').option('selectedItem').tim;
                //
                //wdms option
                doD.wdmo = JSON.stringify([]);
                if (wdm) {
                    var sn=PU_valF('serno','value');
                    if (wdm.hasOwnProperty(sn)) {
                        doD.wdmo = JSON.stringify(wdm[sn]);
                        dumaWDO = ['wdmso', , , wdm[sn][1], wdm[sn][2]];
                    }
                };
                //
                if (isN===-1) {//new
                    var InF = selA['btnOK'].__k,
                        MF = InF[4],
                        tok = InF[1], TOK = doD.tok;
                    //
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
                    var DEVs_Index3 = [];//nodejs la 1 array co index=3   ,[0]=device id
                    online_light(['online', tok, DEVs_Index3, cntUSR, dumaWDO]);
                    //
                    console.log('dosave');
                } else {//update
                    _cb(doD, isN);
                };
            };
        }
        function popup_HIDDEN_UPT() {
            var __E = function () {
                popup.preventCANCEL_AGAIN = 1;
                popup.hide();
                srclocked(false);
            };
            if (popup.isSAVE == 1) {
                var oldD = popup._cpFieldChanged[1], chg = popup._cpFieldChanged[0],
                    fU = [];
                for (var fi in chg) {
                    if (chg.hasOwnProperty(fi) && oldD.hasOwnProperty(fi) && chg[fi] != oldD[fi]) {
                        fU.push(fi);
                    };
                };
                if (fU.length > 0) {
                    _confirmDAG(ht_m[8][0], function (rst) {
                        //
                        if (!rst) return;//keep form display
                        //
                        srclocked(true);
                        selA['btnCLOSE'].option('disabled', true);//2 nut close X
                        selA.btnCANCEL[0].option('disabled', true);//2 nut close bottom toolbar
                        selA.btnUPT.option('disabled', true);
                        //
                        var doD = PUcontent.option('formData'),
                            TOK = doD.tok,
                            svrI = atob(TOK).split(String.fromCharCode(4)),
                            __k = makeKEY(svrI[1]);
                        //
                        doD.time_zone = PU_valF('timezone','selectedItem').tim;//PUcontent.getEditor('timezone').option('selectedItem').tim;
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
                                ]//[2, 10000, fU];//2: goi lenh vao nodejs handshark o local device
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
                                WDMS_CMD_HWND_loop(null, 3);//sau 15 second ko co reply thi se raise
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


        var kindF = function (k) { return k == 0 ? 'serno' : 'pubkey' }, kindT = function (k) { return k == 0 ? 'Serial number' : 'Active key' }
        this._Device = function (_sarg, _cb, atDAT,isN,kind) {
            //
            //var test = new Date(1658820980630);
            hwndFieldDataChanged = null;//reset
            //
            fillFRM(_sarg.dat, isN);
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
                                PUcontent = $("<div class='filter_fucking'></div>").appendTo(container).dxForm({
                                    labelMode: 'floating',
                                    formData: _sarg.dat,
                                    screenByWidth:function(width) {
                                        return width < 400 ? 'xs': (width < 500 ?'sm' : 'md');
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
                                                 text: 'Mobi server'
                                             },
                                             validationRules: [{
                                                 type: 'required',
                                                 message: 'Email is required',
                                             }]
                                         },
                                         {
                                             name: 'txt1',
                                             dataField: kindF(kind),
                                             colSpan: 2,
                                             label: {
                                                 text: kindT(kind),
                                             }
                                             ,editorOptions: {
                                                 onContentReady: function (e) {
                                                     selA['txt1'] = e.component;
                                                     kindF.kind = [kind, kindF(kind)];
                                                 }
                                             }
                                             , validationRules: [{
                                                 type: "custom",
                                                 validationCallback: function (params) {
                                                     return !params.rule.hasOwnProperty('isValid') || params.rule.isValid;
                                                 }
                                             }]
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
                                                        type: 'required',
                                                        message: 'Email is required',
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
                            onHidden: function () {
                                if (popup.preventCANCEL_AGAIN != 1) CANCEL_TerMSG();
                            },
                            onShowing: function () {
                                srclocked(false);
                            },
                            onShown: function (e) {
                                //
                                setTimeout(function () {
                                    PUcontent.updateDimensions();
                                    //selA['btnWDMS'].repaint();//.option({ 'visible': true, 'disabled': false });
                                    //selA.btnCANCEL[0].repaint();//.option({ 'visible': true, 'disabled': false });
                                    //popup.repaint();
                                }, 200);

                                var isUPT = selA['btnUPT'].option('visible');//update mode
                                PUcontent.getEditor('wdms').option('readOnly', isUPT);
                                if (!isUPT) PUcontent.getEditor('timezone').option('value', 2000);//2000:not set ;79: vi-VN
                                hwndFieldDataChanged = onFieldDataChanged;//bat dau trigger
                            },
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
                                    text: elUI.lan.js_009_18 || "Start MOBI",
                                    type: "default",
                                    stylingMode: "outlined",
                                    visible: (isN===-1 ? true : false),
                                    onContentReady: function (e) {
                                        selA['btnWDMS'] = e.component;//udpate button
                                    },
                                    onClick: Start_WDMS.bind(atDAT)
                                }
                            }

                            , {
                                widget: "dxButton",
                                toolbar: "bottom",
                                location: "center",
                                options: {
                                    icon: "ti ti-save",
                                    text: "Save",
                                    type: 'success',
                                    stylingMode: 'outlined',
                                    visible: (isN === -1 ? false : true),
                                    disabled:true,
                                    onContentReady: function (e) {
                                        selA['btnUPT'] = e.component;//udpate button
                                    },
                                    onClick: popup_HIDDEN_UPT,
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
                                        commit_wdms();
                                    }
                                }
                            }]
                        }).dxPopup("instance");
                    } else {
                        PUcontent.option('formData', _sarg.dat);
                        selA['btnWDMS'].option('onClick', Start_WDMS.bind(atDAT));
                        //
                        clearMSG_FRM();
                        //
                        selA['btnUPT'].option({ 'visible': isN === -1 ? false : true, 'disabled': true });
                        selA['btnWDMS'].option('visible', isN === -1 ? true : false);
                        //
                        chk_INPUT('id', ['id empty', 'id trung'], null);
                        //
                        var isUPT = isN === -1 ? false : true,
                            kindA = kindF.kind;
                        //
                        //debugger;
                        kindA[1] = kindF(kind);
                        PUcontent.itemOption('txt1', 'dataField', kindA[1]);
                        PUcontent.itemOption('txt1', 'label', { text: kindT(kind) });
                        kindA[0] = kind;
                        //
                        if (kind == 0) {
                            chk_INPUT(kindA[1], ['empty serno', 'trung serno'], null);
                        } else {
                            chk_INPUT(kindA[1], ['empty pubkey', 'trung pubkey'], null);
                        };
                        kindF.kind = kindA;//gan lai
                        //
                    };
                    //
                    PUTitle.html(elUI.lan['js_009_14']);
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
        this._cmddev = function (_, cmd, d, datI) {
            admin$.DEV(cmd_2_wdms.bind([_, cmd, d,datI]));
        };
        this.wdms_conn = function (_, d, f) {
            var its = d.length, idx = 0, _sigstatux = frmEL.find('.mcc-statux'),

                fn = function () {
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
                        var m = d[idx],
                            connD = [m.tok, 1, m.id, m.serno],
                            _K = connect_to_wdms_server.bind(connD)(),
                            _sig = _sigstatux.map(function (z, el) {
                                if (el.getAttribute('tok') === m.tok) {
                                    el.setAttribute('tok', _K[1]);
                                    $(el).data(_K[1],connD);
                                };
                            });
                    };
                };
            //debugger;
            if (its > 0) fn();
        }


        elUI['\x5F\x5F'].forEach(function (_) { //__ https://www.dcode.fr/ascii-code
            frmEL['\x6F\x6E'](_, thIs[atob(_)]); //on https://coding.tools/ascii-to-hex
        });
        
    }
    MyObj.prototype.publicSharedVar = 'quux';
    MyObj.prototype.publicSharedMethod = function (param) {
        // has access to shared and public vars
        // canonical way for method creation:
        // try to use this as much as possible
    };

    return MyObj;

});


