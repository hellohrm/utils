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
                var ctx = canvas.getContext('2d');
                var raf;

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
            , fn_wdms_HWND=null
            , msgSTOP = false
            , live = function () {
                msgSTOP = false;
                reset_terMSG();
                terMSG.html('<canvas></canvas>');

                online_signal.draw(terMSG.find('canvas')[0]);

                wdmsInfo.find('.mt-3').html(ht_m[6][0]);
                selA['btnOK'].option({'visible': true,'disabled': false});
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
            , commit_wdms = function () {
                //
                selA.btnCANCEL[0].option('disabled', true);
                selA.btnOK.option('disabled', true);
                //
                var atIO = selA['btnOK'].__k
                , fnKEY = Math.random().toString(36).slice(2, 10) + new Date().getTime()
                , cmdRST = function (req, res, rst) {
                    if (req[0][1] == res[1]) {//cmd request == cmdresponse
                        if (res[1] == -9999) {//cmd cai dat thiet bi wdms
                            console.log(res[2]);
                            console.log(rst);
                            if (res[0] == 0) {//hoan tat
                                clearTimeout(WDMS_CMD_HWND_loop.hwndTimeout);
                                delete WDMS_CMD_HWND[fnKEY];
                                return 2;
                            } else {//con dang chay 1 so lenh
                                switch (res[2]) {
                                    case 1: {//command co hien thi message ...
                                        wdmsInfo.find('.mt-3').html(rst[6]);
                                    };
                                }
                            };
                        };
                    };
                    return 0;//chua hoan tat
                }
                , inf = atIO[2].split('\n')
                , cmd = [1, -9999, inf.length > 1 ? '' : inf[0]]//[1, 11, '~SerialNumber'];
                , datR = ['DeviceName']

                , info_deferred
                , nodejs_deferred

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
                                    if (datF.length == 2 && datF[0] == '~') atIO[3][dz] = datF[1];
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
                            isRMV=cmdRST(bid, msg[3], msg[4]);
                        };
                    } else {
                        isRMV = 1;
                        msgSTOP = true;//show error message
                        info_deferred.reject('info');//reject vi timout client
                        soc_msg(ht_m[7][isTimeout], 'text-danger', 2,true);
                        selA.btnOK.option('visible', false);
                    };
                    //
                    if (isRMV > 0) {
                        delete WDMS_CMD_HWND[k];
                        if (isRMV == 2) {
                            //
                            nodejs_deferred.resolve('svr');
                            return;
                            //
                        };
                        selA.btnCANCEL[0].option('disabled', false);
                        selA.btnOK.option('disabled', false);
                    };
                    //
                }.bind([cmd]);
                //
                info_deferred = $.Deferred(); 
                nodejs_deferred = $.Deferred(); 
                $.when(info_deferred, nodejs_deferred).done(function (info,svr) {
                    popup.isSAVE = 1;
                    popup.saveDB();
                    popup.hide();//kich hoat save callback
                });
                info_deferred.promise();
                nodejs_deferred.promise();
                //
                WDMS_CMD_HWND_loop.hwndTimeout = setTimeout(function () {
                    WDMS_CMD_HWND_loop(null, 3);//sau 15 second ko co reply thi se raise
                }, 25000);
                //
                debugger;
                elUI.WDM[atIO[0]].emit(elUI.___[1], [[atIO[1]], cmd]);//WDMS_CMD
                //
                atIO[3] = {};
                fnMSG();
            }
            , kill_wdms_server = function (TOK,DEL) {
                //debugger;
                var svrI = atob(TOK).split(String.fromCharCode(4)),
                    __k = btoa(window[st0('1')](svrI[1]));
                if (elUI.WDM[__k]) {
                    //
                    var idx = elUI.WDM[__k].DEVs.indexOf(svrI[0]),
                        cmd = [1, 12, '\x45\x6E\x61\x62\x6C\x65\x50\x72\x6F\x78\x79\x53\x65\x72\x76\x65\x72\x3D\x30']//[1, 12, 'EnableProxyServer=0'];
                    //
                    if (DEL === 1) {
                        //debugger;
                        elUI.WDM[__k].emit(elUI.___[1], [[svrI[0]], cmd]);//WDMS_CMD
                    };
                    //
                    if (idx > -1) {
                        elUI.WDM[__k].DEVs.splice(idx, 1);
                    };
                    //
                    if (elUI.WDM[__k].DEVs.length == 0) {//disconnect luon socket nay
                        elUI.WDM[__k].off('disconnect').close(); //close thi ben kia no tu xu ...
                        delete elUI.WDM[__k];
                    };
                };
            }
            , online_light = function (msg) {
                //
                if (msg[2]) switch (msg[2]) {
                    case elUI.___[0]: {//RTEVT
                        frmEL.trigger(msg[2] + 'S', [msg[3].split('\t')]);
                        break;
                    }
                } else {
                    elUI.fnHANDSHAKE(['sigLIVE', [msg[1]], msg[0]]);
                }
                //var TOK = msg[1], statux = frmEL.find('.mcc-statux[tok="' + TOK + '"]');
                ////
                //if (statux.length > 0) {
                //    if (msg[0] == 'online') {
                //        statux.toggleClass("text-secondary text-success").find('span').html('online');
                //    } else {
                //        statux.toggleClass("text-secondary text-success").find('span').html('offline');
                //    }
                //};
            }
            , connect_to_wdms_server = function () {
                //
                var TOK = this, svrI = atob(TOK).split(String.fromCharCode(4)),
                    __k = btoa(window[st0('1')](svrI[1]));
                //

                if (!elUI.WDM[__k]) {
                  
                    elUI.WDM[__k]= w0w['\x69\x6F'](JSON.parse(svrI[1]).reduce(function (a, b) { return a + String.fromCharCode(parseInt(b, 16)); }, ""), {//io(addr, {//
                        auth: {
                            token: svrI[0]
                        }
                        //, path: '/octagon/socket.io'
                        , transports: ["websocket", "polling"] // use WebSocket first, if available
                    })//https://viblo.asia/p/mot-so-events-xu-ly-loi-trong-socketio-924lJpEaKPM
                    .on('connect', function (s) {
                        //
                        if (fn_wdms_HWND && typeof fn_wdms_HWND === "function") {
                            fn_wdms_HWND(['connect']);
                        } else {
                            //khi ket noi thi chi co 1 token, co the co nhieu device
                            elUI.WDM[__k].DEVs.forEach(function (dev) {
                                if (dev != elUI.WDM[__k].auth.token) {
                                    console.log('if (dev != elUI.WDM[__k].auth.token) {');
                                    elUI.WDM[__k].emit(elUI.___[2], [dev, 1]);//'DEV_JOIN_RMV' :1 new
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
                        debugger;
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
                        if (this.DEVs) elUI.fnHANDSHAKE(['sigLIVE',this.DEVs,'offline']);
                        //
                    }).on('reconnect', function (n) {
                        console.log('connect_to_wdms_server reconnect');
                    }).on('disconnect', function (r, e) {
                        console.log('connect_to_wdms_server disconnect');
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
                            } else {
                                online_light(msg);
                            };
                        };
                        //
                    });
                    //
                    elUI.WDM[__k].DEVs = [svrI[0]];
                    //
                } else {
                    debugger;
                    elUI.WDM[__k].emit(elUI.___[2], [svrI[0],1]);//'DEV_JOIN_RMV' :1 new
                    elUI.WDM[__k].DEVs.push(svrI[0]);
                    if (fn_wdms_HWND && typeof fn_wdms_HWND === "function") fn_wdms_HWND([elUI.___[2]]);
                };
                //
                return [__k,svrI[0]];
        }
            , wait_push_hwnd, wait_push_TO = new Date()
            , wait_push_fn = function (isExpire, p1,p2) {
                if (wait_push_hwnd > 0) {
                    clearTimeout(wait_push_hwnd);
                    var seconds = isExpire - parseInt((new Date().getTime() - wait_push_TO.getTime()) / 1000);
                    if (isExpire>0 && seconds <= 0) {
                        CANCEL_TerMSG();
                    } else {
                        if (isExpire > 0) {
                            seconds = seconds + p1[0];//seconds + ' seconds next expired'
                        } else {
                            seconds = Math.abs(seconds) + ' seconds passed' ;
                            p2=p1[Math.abs(isExpire)];
                            isExpire -= 1;
                            if (Math.abs(isExpire) > p1.length - 1) {
                                isExpire = 0;//reset
                            };
                        };
                        csPrnt.WriteLn({ type: 'input', prompt: ' ⏳ ' + seconds, value: p2, typeDelay: 30 }, function (ln) {
                            if (wait_push_hwnd != -2) {//RESET THI KO LOOP
                                wait_push_hwnd = setTimeout(function () { wait_push_fn(isExpire,p1, p2); }, 2000);
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
                                sn: PUcontent.getEditor('serno').option('value'),
                                tz: PUcontent.getEditor('timezone').option('selectedItem').tim,
                                grp: tmp.pathname.replace("/", ''),
                                tep: 0
                            }
                        }
                        //, path: '/octagon/socket.io'
                        , transports: ["websocket", "polling"] // use WebSocket first, if available
                    }
                };

            if (match === null) {
                addr = 'http://' + addr;
                //} else {
                //    return match[2] ? match[2] : { http: "80", https: "443" }[match[1]];
            };

            tmp.href = addr;
            //
            if (elUI.socIO) elUI.socIO.off();//stop
            //
            //var wdsm = $(addr).attr('href');
            elUI.socIO = io(tmp.hostname + ":11015", socOPT());
            //elUI.socIO.emit('joining msg', "abcdef");
            //
            //https://viblo.asia/p/mot-so-events-xu-ly-loi-trong-socketio-924lJpEaKPM
            elUI.socIO.on('connect', function (s) {
                debugger;
                config_s1();
            }).on('connect_error', function (err) {
                debugger;
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
                        debugger;
                        //elUI.socIO.off('disconnect').close(); //close thi ben kia no tu xu ...
                        //elUI.socIO = null;
                        //
                        this.auth.ireg.tep = -9999;
                        PUcontent.option('formData').tok = msg[1];
                        //
                        //
                        dead._lastMSG = -1;
                        isEDITING = 1;//chuyen qua server ket noi nodejs voi c program mcc
                        selA['btnOK'].__k = connect_to_wdms_server.bind(msg[1])();
                        selA['btnOK'].__k.push(msg[2]);//device information
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
        }, popup, PUcontent, wdmsInfo, selA = { 'btnCANCEL': [null, "revert", "Bo qua", "ti ti-unlink", "Ngat Ket noi WDSM", "tips", "Hoan tat"] }
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
                '<div class="box_conn">' +
                        '<div class="text_conn text-uppercase">' + //https://codepen.io/Gugiui/pen/Ybwqop
                            '$TIT$' +
                        '</div>' +
                        '<div class="comp"></div>' +
                        '<div class="loader_conn"></div>' +
                        '<div class="con"></div>' +
                        '<div class="byte"></div>' +
                        '<div class="server"></div>' +
                    '</div>'
                , 'Connect to WDMS service ...'
                , ['Connect error, please check WDMS address and try again  ...', 'Token invalid for connection!', 'There is another Active your device.']//INDEX 2
                , 'Ban hay nhap dia chi WDSM vao thiet bi. <a href="javascript:void(0)">co huong dan tai day </a>'
                , [0, 'CONNECTING', 'ERROR', 'CONNECTED', 'UNSUPPORTED', 'INVALID', 'DUPLICATED'] //index 4
                , ['Sorry, our service have not yet support your device ...'
                    , 'Congratulation your device passed our check! Next step we establish WDMS cloud for your device, keep patient ....'
                    , 'Device actived error: '
                    , 'Device try connecting to our WDMS server ...'
                ]
                , ['Complete by click OK button'
                    , ['Opps! WDMS service down...', 'Please check Device network connection...', 'Please check Device IP, DNS, Gateway...', '... Try more please !']
                    , ['Humm! We are looking for your device...', 'Please check Device network connection...', 'Please check Device IP, DNS, Gateway...']
                    , "<i>Vui long xac nhan rang ban muon bo qua thiet lap hien tai?</i>"
                    , "<i>Vui long xac nhan rang ban muon xoa may cham cong?</i>"
                    , ' seconds next expired'
                    , 'Is your device ready ...?'
                ]//index 6
                , [''
                    , 'Standalone command timeout'// khi nodejs send command to device, after 5 second no reply
                    , 'Can not find MOTER'// nodejs getMOTER null    const Mo = getMOTER(so.id);
                    , 'WDMS service timeout' // emit timout
                    , 'Can not find your Device' //   let idxDEV = Mo.DEVs.indexOf(s);
                ]//index 7
                , [
                    "<i>Vui long xac nhan luu thay doi?</i>",
                    'ko co cai gi de cap nhat',
                    'device offline nen ko the cap nhat duoc',
                    'Tien trinh cap nhat khong thanh cong',
                    'cap nhat thanh cong'
                ]
            ],

            PUTitle = $('<div class="fuck-title">...</div>')
        , _confirmDAG = function (txt, _cb) {
            debugger;
            DevExpress.ui.dialog.confirm(txt, null, false).done(function (rst) {
                _cb(rst);
            });
        }
        ,hwndFieldDataChanged, onFieldDataChanged = function (e) {
            debugger;
            var isUPT = selA['btnUPT'].option('visible');//update mode
            if (isUPT) {
                selA['btnUPT'].option('disabled', false);
                popup._cpFieldChanged[0][e.dataField] = e.value;
            };
            //
            popup.isSAVE = 1;
        };

        function CANCEL_TerMSG(e) {
            reset_terMSG();
            //
            debugger;
            var _X_ = function () {
                closeREG();
                kill_wdms_server(PUcontent.option('formData').tok);
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
            debugger;
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
                        wait_conn();
                    } else { //use active key
                        //config_s1();
                        dead._lastMSG = -1;
                        debugger;
                        isEDITING = 1;//chuyen qua server ket noi nodejs voi c program mcc
                        selA['btnOK'].__k = connect_to_wdms_server.bind("STZSZE1FOFo4WmNUVXNId3RwaW5odUE5RlhFL0c1b2p1and6MDVsOHc2ZmJseWp0RFBOZzZHc2Rpb3E2ZWdGVWZWcXkzT2cvak9Eb3pOQ2JMelVKa0QwMitiejJqQS9YeXdZQ2dUN1JjOE09BFsiMzEiLCIzOSIsIjMyIiwiMmUiLCIzMSIsIjM2IiwiMzgiLCIyZSIsIjMxIiwiMmUiLCIzOSIsIjMxIiwiM2EiLCIzMyIsIjMwIiwiMzAiLCIzMCJd")();
                        selA['btnOK'].__k.push('msg[2]');//device information
                        //
                        btnCANCEL(1, 2, 0);//0 meaning: click button thi se bo qua close elUI.socIO 
                    };
                };

                //
                if (!csPrnt) {
                    //debugger;
                    _gsC(srcpf$ + '/media/js/Termynal.js', 'js', function () {
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

        function popup_HIDDEN_NEW() {
            debugger;
            var _cb = this[0], isN=this[1];
            //saveDB();
            isEDITING = 0;
            if (popup.isSAVE == 1 && _cb && typeof _cb === "function") {
                popup.isSAVE = 0;
                var doD = PUcontent.option('formData');
                //
                doD.time_zone = PUcontent.getEditor('timezone').option('selectedItem').tim;
                //
                if (isN===-1) {//new
                    var InF = selA['btnOK'].__k,
                        MF = InF[3],
                        tok = InF[1], TOK = doD.tok;
                    //
                    for (var fi in MF) {
                        if (MF.hasOwnProperty(fi) && doD.hasOwnProperty(fi)) {
                            doD[fi] = MF[fi];
                        };
                    };
                    _cb(doD);
                    //
                    frmEL.find('.mcc-statux[tok="' + TOK + '"]').attr('tok', tok);
                    online_light(['online', tok]);
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
                            __k = btoa(window[st0('1')](svrI[1]));
                        //
                        doD.time_zone = PUcontent.getEditor('timezone').option('selectedItem').tim;
                        //
                        if (elUI.WDM[__k] && elUI.WDM[__k].connect) {
                            //
                            var idx = elUI.WDM[__k].DEVs.indexOf(svrI[0]),
                                fnKEY = Math.random().toString(36).slice(2, 10) + new Date().getTime(),
                                fnRESET = function () {
                                    clearTimeout(WDMS_CMD_HWND_loop.hwndTimeout);
                                    delete WDMS_CMD_HWND[fnKEY];
                                },
                                cmd = [1, -9998, ['TimeZone=' + doD.time_zone, 'TimeZoneclock=' + doD.time_zone, 'Realtime=' + (doD.rtevt ? 1 : 0)]
                                    , [doD.time_zone]
                                ]//[2, 10000, fU];//2: goi lenh vao nodejs handshark o local device
                            //
                            WDMS_CMD_HWND[fnKEY] = function (msg, k, isTimeout) {
                                if (isTimeout == 0) {//kick server ok.
                                    if (msg[3][0] == 0) {//res=msg[3] hoan tat
                                        fnRESET();
                                        toastMsg(ht_m[8][4], 'success');
                                        popup.saveDB();
                                        __E();
                                    };
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

        var dogTimezone = [
            //{ id:0, tim: "-12", dis: "(UTC-12:00) International Date Line West" }
            //    , { id: 1, tim: "-11", dis: "(UTC-11:00) Coordinated Universal Time-11" }
            //    , { id: 2, tim: "-10", dis: "(UTC-10:00) Hawaii" }
            //    , { id: 3, tim: "-9", dis: "(UTC-09:00) Alaska" }
            //    , { id: 4, tim: "-7", dis: "(UTC-08:00) Baja California" }
            //    , { id: 5, tim: "-7", dis: "(UTC-07:00) Pacific Time (US &amp; Canada)" }
            //    , { id: 6, tim: "-8", dis: "(UTC-08:00) Pacific Time (US &amp; Canada)" }
            //    , { id: 7, tim: "-7", dis: "(UTC-07:00) Arizona" }
            //    , { id: 8, tim: "-6", dis: "(UTC-07:00) Chihuahua, La Paz, Mazatlan" }
            //    , { id: 9, tim: "-6", dis: "(UTC-07:00) Mountain Time (US &amp; Canada)" }
            //    , { id: 10, tim: "-6", dis: "(UTC-06:00) Central America" }
            //    , { id: 11, tim: "-5", dis: "(UTC-06:00) Central Time (US &amp; Canada)" }
            //    , { id: 12, tim: "-5", dis: "(UTC-06:00) Guadalajara, Mexico City, Monterrey" }
            //    , { id: 13, tim: "-6", dis: "(UTC-06:00) Saskatchewan" }
            //    , { id: 14, tim: "-5", dis: "(UTC-05:00) Bogota, Lima, Quito" }
            //    , { id: 15, tim: "-4", dis: "(UTC-05:00) Eastern Time (US &amp; Canada)" }
            //    , { id: 16, tim: "-4", dis: "(UTC-05:00) Indiana (East)" }
            //    , { id: 17, tim: "-4.5", dis: "(UTC-04:30) Caracas" }
            //    , { id: 18, tim: "-4", dis: "(UTC-04:00) Asuncion" }
            //    , { id: 19, tim: "-3", dis: "(UTC-04:00) Atlantic Time (Canada)" }
            //    , { id: 20, tim: "-4", dis: "(UTC-04:00) Cuiaba" }
            //    , { id: 21, tim: "-4", dis: "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan" }
            //    , { id: 22, tim: "-4", dis: "(UTC-04:00) Santiago" }
            //    , { id: 23, tim: "-2.5", dis: "(UTC-03:30) Newfoundland" }
            //    , { id: 24, tim: "-3", dis: "(UTC-03:00) Brasilia" }
            //    , { id: 25, tim: "-3", dis: "(UTC-03:00) Buenos Aires" }
            //    , { id: 26, tim: "-3", dis: "(UTC-03:00) Cayenne, Fortaleza" }
            //    , { id: 27, tim: "-3", dis: "(UTC-03:00) Greenland" }
            //    , { id: 28, tim: "-3", dis: "(UTC-03:00) Montevideo" }
            //    , { id: 29, tim: "-3", dis: "(UTC-03:00) Salvador" }
            //    , { id: 30, tim: "-2", dis: "(UTC-02:00) Coordinated Universal Time-02" }
            //    , { id: 31, tim: "-1", dis: "(UTC-02:00) Mid-Atlantic - Old" }
            //    , { id: 32, tim: "0", dis: "(UTC-01:00) Azores" }
            //    , { id: 33, tim: "-1", dis: "(UTC-01:00) Cape Verde Is." }
            //    , { id: 34, tim: "1", dis: "(UTC) Casablanca" }
            //    , { id: 35, tim: "0", dis: "(UTC) Coordinated Universal Time" }
            //    , { id: 36, tim: "0", dis: "(UTC) Edinburgh, London" }
                 { id: 37, tim: "1", dis: "(UTC+01:00) Edinburgh, London" },
            //    , { id: 38, tim: "1", dis: "(UTC) Dublin, Lisbon" }
            //    , { id: 39, tim: "0", dis: "(UTC) Monrovia, Reykjavik" }
            //    , { id: 40, tim: "2", dis: "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna" }
            //    , { id: 41, tim: "2", dis: "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague" }
            //    , { id: 42, tim: "2", dis: "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris" }
            //    , { id: 43, tim: "2", dis: "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb" }
            //    , { id: 44, tim: "1", dis: "(UTC+01:00) West Central Africa" }
            //    , { id: 45, tim: "1", dis: "(UTC+01:00) Windhoek" }
            //    , { id: 46, tim: "3", dis: "(UTC+02:00) Athens, Bucharest" }
            //    , { id: 47, tim: "3", dis: "(UTC+02:00) Beirut" }
            //    , { id: 48, tim: "2", dis: "(UTC+02:00) Cairo" }
            //    , { id: 49, tim: "3", dis: "(UTC+02:00) Damascus" }
            //    , { id: 50, tim: "3", dis: "(UTC+02:00) E. Europe" }
            //    , { id: 51, tim: "2", dis: "(UTC+02:00) Harare, Pretoria" }
            //    , { id: 52, tim: "3", dis: "(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius" }
            //    , { id: 53, tim: "3", dis: "(UTC+03:00) Istanbul" }
            //    , { id: 54, tim: "3", dis: "(UTC+02:00) Jerusalem" }
            //    , { id: 55, tim: "2", dis: "(UTC+02:00) Tripoli" }
            //    , { id: 56, tim: "3", dis: "(UTC+03:00) Amman" }
            //    , { id: 57, tim: "3", dis: "(UTC+03:00) Baghdad" }
            //    , { id: 58, tim: "3", dis: "(UTC+02:00) Kaliningrad" }
            //    , { id: 59, tim: "3", dis: "(UTC+03:00) Kuwait, Riyadh" }
            //    , { id: 60, tim: "3", dis: "(UTC+03:00) Nairobi" }
            //    , { id: 61, tim: "3", dis: "(UTC+03:00) Moscow, St. Petersburg, Volgograd, Minsk" }
            //    , { id: 62, tim: "4", dis: "(UTC+04:00) Samara, Ulyanovsk, Saratov" }
            //    , { id: 63, tim: "4.5", dis: "(UTC+03:30) Tehran" }
            //    , { id: 64, tim: "4", dis: "(UTC+04:00) Abu Dhabi, Muscat" }
            //    , { id: 65, tim: "5", dis: "(UTC+04:00) Baku" }
            //    , { id: 66, tim: "4", dis: "(UTC+04:00) Port Louis" }
            //    , { id: 67, tim: "4", dis: "(UTC+04:00) Tbilisi" }
            //    , { id: 68, tim: "4", dis: "(UTC+04:00) Yerevan" }
            //    , { id: 69, tim: "4.5", dis: "(UTC+04:30) Kabul" }
            //    , { id: 70, tim: "5", dis: "(UTC+05:00) Ashgabat, Tashkent" }
            //    , { id: 71, tim: "5", dis: "(UTC+05:00) Yekaterinburg" }
            //    , { id: 72, tim: "5", dis: "(UTC+05:00) Islamabad, Karachi" }
            //    , { id: 73, tim: "5.5", dis: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi" }
            //    , { id: 74, tim: "5.5", dis: "(UTC+05:30) Sri Jayawardenepura" }
            //    , { id: 75, tim: "5.75", dis: "(UTC+05:45) Kathmandu" }
            //    , { id: 76, tim: "6", dis: "(UTC+06:00) Nur-Sultan (Astana)" }
            //    , { id: 77, tim: "6", dis: "(UTC+06:00) Dhaka" }
            //    , { id: 78, tim: "6.5", dis: "(UTC+06:30) Yangon (Rangoon)" }
                { id: 79, tim: "7", dis: "(UTC+07:00) Bangkok, Hanoi, Jakarta" },
                //, { id: 80, tim: "7", dis: "(UTC+07:00) Novosibirsk" }
                { id: 81, tim: "8", dis: "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi" },
                //, { id: 82, tim: "8", dis: "(UTC+08:00) Krasnoyarsk" }
                { id: 83, tim: "8", dis: "(UTC+08:00) Kuala Lumpur, Singapore" },
                //, { id: 84, tim: "8", dis: "(UTC+08:00) Perth" }
                //, { id: 85, tim: "8", dis: "(UTC+08:00) Taipei" }
                //, { id: 86, tim: "8", dis: "(UTC+08:00) Ulaanbaatar" }
                //, { id: 87, tim: "8", dis: "(UTC+08:00) Irkutsk" }
                { id: 88, tim: "9", dis: "(UTC+09:00) Osaka, Sapporo, Tokyo" }
                //, { id: 89, tim: "9", dis: "(UTC+09:00) Seoul" }
                //, { id: 90, tim: "9.5", dis: "(UTC+09:30) Adelaide" }
                //, { id: 91, tim: "9.5", dis: "(UTC+09:30) Darwin" }
                //, { id: 92, tim: "10", dis: "(UTC+10:00) Brisbane" }
                //, { id: 93, tim: "10", dis: "(UTC+10:00) Canberra, Melbourne, Sydney" }
                //, { id: 94, tim: "10", dis: "(UTC+10:00) Guam, Port Moresby" }
                //, { id: 95, tim: "10", dis: "(UTC+10:00) Hobart" }
                //, { id: 96, tim: "9", dis: "(UTC+09:00) Yakutsk" }
                //, { id: 97, tim: "11", dis: "(UTC+11:00) Solomon Is., New Caledonia" }
                //, { id: 98, tim: "11", dis: "(UTC+11:00) Vladivostok" }
                //, { id: 99, tim: "12", dis: "(UTC+12:00) Auckland, Wellington" }
                //, { id: 100, tim: "12", dis: "(UTC+12:00) Coordinated Universal Time+12" }
                //, { id: 101, tim: "12", dis: "(UTC+12:00) Fiji" }
                //, { id: 102, tim: "12", dis: "(UTC+12:00) Magadan" }
                //, { id: 103, tim: "13", dis: "(UTC+12:00) Petropavlovsk-Kamchatsky - Old" }
                //, { id: 104, tim: "13", dis: "(UTC+13:00) Nuku'alofa" }
                //, { id: 105, tim: "13", dis: "(UTC+13:00) Samoa" }
        ];
        var kindF = function (k) { return k == 0 ? 'serno' : 'pubkey' }, kindT = function (k) { return k == 0 ? 'Serial number' : 'Active key' }
        this._Device = function (_sarg, _cb, atDAT,isN,kind) {
            //
            hwndFieldDataChanged = null;//reset
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
                                                     return params.rule.isValid;
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
                                                    dataField: 'comkey',
                                                    label: {
                                                        text: 'Device Comm-key'
                                                    }
                                                     , validationRules: [{
                                                         type: "custom",
                                                         validationCallback: function (params) {
                                                             return params.rule.isValid;
                                                         }
                                                     }]
                                                }
                                                ,
                                                {
                                                    dataField: 'id',
                                                    label: {
                                                        text: 'ID'
                                                    }
                                                    , validationRules: [{
                                                        type: "custom",
                                                        validationCallback: function (params) {
                                                            return params.rule.isValid;
                                                        }
                                                    }]
                                                }
                                                , {
                                                    dataField: 'ten',
                                                    colSpan: 2,
                                                    label: {
                                                        text: 'Ten'
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
                                            caption: 'Cai dat nang cao',
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
                                                    label: {
                                                        text: 'Area'
                                                    }
                                                }
                                                , {
                                                    dataField: 'timezone',
                                                    colSpan: 2,
                                                    editorType:'dxSelectBox',
                                                    editorOptions: {
                                                        dataSource: dogTimezone,
                                                        displayExpr: 'dis',
                                                        valueExpr: 'id'
                                                    },
                                                    label: {
                                                        text: 'Timezone'
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
                                                    label: {
                                                        text: 'Attendance device'
                                                    }
                                                },
                                                {
                                                    dataField: 'rtevt',
                                                    colSpan: 2,
                                                    editorType: "dxCheckBox",
                                                    label: {
                                                        text: 'Realtime event'
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
                                if (!isUPT) PUcontent.getEditor('timezone').option('value', 79);//vi-VN
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
                                    text: "Khoi dong WDSM",
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
                        debugger;
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
                    PUTitle.html(kind==0?'Dung Chuc Nang WDMS':'Dung Ma Kich Hoat');
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

        this.wdms_conn = function (_, d, f) {
            var its = d.length, idx = 0, _sigstatux = frmEL.find('.mcc-statux'),

                fn = function () {
                    fn_wdms_HWND = function (rst) {
                        debugger;
                        fn_wdms_HWND = null;//reset
                        if (rst[0] == 'connect_error' && rst[1]) {//isDisconnect
                            kill_wdms_server(d[idx].tok,0);//ko goi ve server
                        };
                        idx += 1;//tang len 1
                        fn(); //loop lai
                    };
                    //
                    if (idx < its) {
                        var m = d[idx],
                            _K = connect_to_wdms_server.bind(m.tok)(),
                            _sig = _sigstatux.map(function (z, el) {
                                if (el.getAttribute('tok') === m.tok) {
                                    el.setAttribute('tok', _K[1]);
                                };
                            });
                    };
                };
            //debugger;
            if (its > 0) fn();
        }

        elUI['\x5F\x5F'].forEach(function (_) { //__ https://www.dcode.fr/ascii-code
            frmEL['\x6F\x6E'](_, thIs[atob(_)]); //on
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


