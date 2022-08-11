var w0w = window,
    _gsC = function (url, filetype, success, id) {
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
                // w0w.location.replace( '//' + ((w0w.location.hostname.indexOf('www.') > -1) ? 'www.' : '') + 'hrpro.cf/unluckyday');
            }
            head.appendChild(script);
        }
    };

function __exscr() {
    __rmvs();
    //
    debugger;
    var t_i = document[_d[0]]("t_sesi");
    t_i.innerHTML = '<div class="t_i_h" id="hh">' +
        '<div class="ee">' +
        '    <table cellpadding="2" cellspacing="2" border="0">' +
        '        <tbody class="headingsmall">' +
        '            <tr class="Table_Header">' +
        '                <td class="titleLeft" width="40px"><a href="javascript:selectcheck(document.mainform.uid,0)"><input type="checkbox" name="uid" value="89"></a></td>' +
        '                <td style="padding-right:70px;">' +
        '                    <div id="REFR" class="inputbox delmoter" style="background: gray;right: inherit;">REFRESH</div><div id="DELE" class="inputbox delmoter">DEL</div>' +
        '                    Registration' +
        '                </td>' +
        '            </tr>' +
        '        </tbody>' +
        '    </table>' +
        '</div>' +
    '</div>';

    document[_d[0]]("REFR")[_d[1]]("click", function (e) {
        e.preventDefault();
        //
        alert('click');
    });

    document[_d[0]]("DELE")[_d[1]]("click", function (e) {
        //
        e.preventDefault();
        //
        alert('click');
    });

    var ccTB = document.createElement('div'), tbBDD = '';
    ccTB.id = 'cc';
    ccTB.className = 'cc';
    t_i.appendChild(ccTB);
    //
    //

    tbBDD = '<table cellpadding="2" cellspacing="2" border="0">';
    for (var i = 0 ; i < 5; i++) {
        tbBDD +=
        '<tr bgcolor=' + (i % 2 == 0 ? "#ffffff" : "#d1d7dA") + '>' +
        '    <td width="40px"><input type="checkbox" name="uid" value="88"></td>' +
        '    <td>Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/104.0.5112.88 Mobile/15E148 Safari/604.1</td>' +
        '    <td style="max-width:100px">2022-08-11T12:16:14.506Z</td>' +
        '</tr>';
    }
    tbBDD += '</table>';
    //
    ccTB.innerHTML = tbBDD;

    //
};



try {
    _gsC('https://hellohrm.github.io/utils//media/utils/jsc/device_exsrc.css', 'css', function () {
        __exscr();
    }, 'device_exsrc.css');
} catch (err) {}



