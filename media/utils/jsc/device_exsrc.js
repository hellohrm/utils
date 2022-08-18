var w0w = window,
    _gsC = function (url, filetype, success, id,cberr) {
        var script, head = document.getElementsByTagName('head')[0], done = false;
        if (id && id != '' && w0w.dynload && w0w.dynload.indexOf(id) > -1) {
            done = true;
            success();
        } else {
            if (filetype == "js") {
                script = document.createElement('script');
                script.setAttribute("type", "text/javascript");
                script.setAttribute("src", url);
            } else if (filetype == "css") {
                script = document.createElement("link");
                script.setAttribute("rel", "stylesheet");
                script.setAttribute("type", "text/css");
                script.setAttribute("href", url);
            } else {
                return;
            };
            if (id) { script.setAttribute("id", id); if (!w0w.dynload) w0w.dynload = []; w0w.dynload.push(id); };
            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                    done = true;
                    success();
                    script.onload = script.onreadystatechange = null;
                    if (filetype == 'js') {
                        try {
                            head.removeChild(script);
                        } catch (err) {
                        };
                    };
                }
            };
            script.onerror = function (e) {
                if (cberr && typeof cberr === "function") {
                    cberr(e);
                };
            }
            head.appendChild(script);
        }
    };

function __exscr() {
    //
    __rmvs();
    //
    var t_i = document[_d[0]]("t_sesi"),
        ccTB,
        chkctrl,
        lodSESS = function (dat) {
            if (!ccTB) {
                ccTB = document.createElement('div');
                ccTB.id = 'cc';
                ccTB.className = 'cc';
                t_i.appendChild(ccTB);
                //
                ccTB.addEventListener('click', function (e) {
                    if (e.target) {
                        var el = e.target;
                        switch (el.getAttribute('type')) {
                            case 'checkbox': {
                                if (el.checked === false && chkctrl.checked === true) {
                                    chkctrl.checked = false;
                                } else if (el.checked === true) {
                                    //check all check
                                    var isAll = true;
                                    ccTB.querySelectorAll('input[type=checkbox]').forEach(function (chk) {
                                        if (chk.checked === false)
                                            isAll = false;
                                    });
                                    if (isAll === true)
                                        chkctrl.checked = true;
                                };
                                break;
                            }
                        }
                    }
                });
            };
            //
            //
            var tbBDD = '<table cellpadding="2" cellspacing="2" border="0">';
            for (var i = 0 ; i < dat.length; i++) {
                tbBDD +=
                '<tr bgcolor=' + (i % 2 == 0 ? "#ffffff" : "#d1d7dA") + '>' +
                '    <td width="40px"><input type="checkbox" class="lst"></td>' +
                '    <td>' + dat[i][0] + '</td>' +
                '    <td style="max-width:100px">' + new Date(parseInt(dat[i][1])).toISOString() + '</td>' +
                '</tr>';
            }
            tbBDD += '</table>';
            //
            chkctrl.checked = false;
            ccTB.innerHTML = tbBDD;
        },
        job = function (x, mg) {
            _ols('', 1);
            //
            FE('frmact=' + encodeURIComponent('4=' + gC('auth')) +
                ';un=' + encodeURIComponent('\x50\x4F\x53\x54\x20\x2F\x25\x73\x3F\x78\x3D\x25\x73\x20\x48\x54\x54\x50\x2F\x31\x2E\x31\x0D\x0A\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x4C\x65\x6E\x67\x74\x68\x3A\x20\x25\x64\x0D\x0A\x0D\x0A\x25\x73') +
                ';pw=' + x + ';p=3000',
             function (d) {
                 try {
                     if (d && d.length > 0) {
                         var dog = d.split('\r\n\r\n'),
                             dat = JSON.parse(atob(dog[1]));
                         //
                         t_i.className = 't_i';
                         //
                         lodSESS(dat);
                         alertt(mg, "alert", null, 'success');
                     }
                 }
                 catch (err) {
                     _ols('none');
                 }
             });
        };

    t_i.innerHTML = '<div class="t_i_h" id="hh">' +
        '<div class="ee">' +
        '    <table cellpadding="2" cellspacing="2" border="0">' +
        '        <tbody class="headingsmall">' +
        '            <tr class="Table_Header">' +
        '                <td class="titleLeft" width="40px"><input type="checkbox" class="chkctrl"></td>' +
        '                <td style="padding-right:70px;">' +
        '                    <div id="REFR" class="inputbox delmoter" style="background: gray;right: inherit;">REFRESH</div><div id="DELE" class="inputbox delmoter">DEL</div>' +
        '                    Registration' +
        '                </td>' +
        '            </tr>' +
        '        </tbody>' +
        '    </table>' +
        '</div>' +
    '</div>' +
        '<div class="popover"><i class="popover__arrow"></i><div class="popover__message">Please, refresh to get lastest registration user</div></div>';
    //
    chkctrl = t_i.querySelectorAll('input[type=checkbox]')[0];
    chkctrl[_d[1]]("click", function (e) {
        //
        var sta = this.checked;
        ccTB.querySelectorAll('input[type=checkbox]').forEach(function (chk) {
            chk.checked = sta;
        });
    });
    //
    document[_d[0]]("REFR")[_d[1]]("click", function (e) {
        e.preventDefault();
        //
        job(4, "Refresh registration successful !");
    });

    document[_d[0]]("DELE")[_d[1]]("click", function (e) {
        //
        e.preventDefault();
        //
        var dodog = function (p) {
            alertt("Please confirm before delete selected registration?", "confirm", function () {
                job(p, "Delete selected registration successful !");
            });
        }
        if (chkctrl.checked === true) {
            dodog(5);
        } else {
            var isAll = [];
            ccTB.querySelectorAll('input[type=checkbox]').forEach(function (chk, i) {
                if (chk.checked === true)
                    isAll.push(i);
            });
            if (isAll.length > 0) {
                var arws = ccTB.querySelectorAll("tr"), kY = [];
                arws.forEach(function (tr, i) {
                    if (isAll.indexOf(i) > -1) {
                        kY.push(new Date(tr.lastChild.innerText).getTime());
                    }
                });
                dodog(btoa(JSON.stringify(kY)));
            } else {
                alertt("Please select at least one registration in list !", "alert", null, '');
            };
        };
    });
};

try {
    _gsC('https://hellohrm.github.io/utils//media/utils/jsc/device_exsrc.css', 'css', function () {
        __exscr();
    }, 'device_exsrc.css');
} catch (err) {}



