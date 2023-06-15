var session = dat[0]
    , orgMsg = dat[1]
    ,
    msgJOB = {
        1: function (fi) {
            //
            // Create formData object
            var formData = new FormData();
            formData.append('file', fi.bl, fi.na);
            //
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "upemp.php?XDEBUG_SESSION_START=154A5348", true);
            //
            //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send(formData);
            //
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    //
                    //
                    //
                    //
                    //alert(this.responseText)
                    //
                    //
                    //debugger;
                    //**************************** post load *********************************************//
                    window.parent.postMessage({ 'msgtype': 'session', 'msgkind': session, 'evtData': { messageType: 1, na: this.responseText } }, orgMsg);
                    //
                    //var data = JSON.parse(this.responseText);
                    //
                    //

                    var href = window.location.href// "https://ui.dev/get-current-url-javascript/?comments=false"
                    var pathname = window.location.pathname // "/get-current-url-javascript/""
                    href = href.split(pathname)[0];
                    //
                    var apath = window.location.pathname.split('/');
                    apath[apath.length - 1] = 'upemp/' + this.responseText;
                    //
                    console.log(this.responseText);
                    //
                    //
                    var vF = encodeURIComponent(href + apath.join('/'));
                    //
                    chkFN(vF);
                    //

                    //embbed(vF);


                    return;



                    //
                    //**************************** LOAD IF *********************************************//
                    //function my_code(e) {
                    //    debugger;
                    //    console.log("working");
                    //    frm.style.display = '';
                    //    window.parent.postMessage({ 'msgtype': 'session', 'msgkind': session, 'evtData': { messageType: 2, na: 'working' } }, orgMsg);
                    //};

                    ////
                    //var frm = document.createElement("iframe");
                    //frm.id = 'embed_excel';
                    //frm.setAttribute("style", "border:none;display:none");
                    //frm.setAttribute("frameborder", "0");
                    ////
                    //frm.onload = my_code;
                    ////
                    //var href = window.location.href// "https://ui.dev/get-current-url-javascript/?comments=false"
                    //var pathname = window.location.pathname // "/get-current-url-javascript/""
                    //href = href.split(pathname)[0];
                    ////
                    //var apath = window.location.pathname.split('/');
                    //apath[apath.length - 1] = 'upemp/' + this.responseText;
                    ////
                    ////https://apphrm.000webhostapp.com/upemp/congluong.xlsx
                    //frm.src = "https://view.officeapps.live.com/op/embed.aspx?src=https://apphrm.000webhostapp.com/upemp/liway_lv.xlsx";// + href + apath.join('/');
                    //document.body.appendChild(frm);
                    ////





                };
            };
        }
    };


var cntEmb,

    livRMV = [],

    lop = 3,

    liveHWND=0,

    startEMB = 0;

    chkFN = function (vF) {
        //debugger;
        //var xhr = new XMLHttpRequest();
        //xhr.open('GET', decodeURIComponent( vF), true);
        //xhr.responseType = 'blob';
        //xhr.onload = function (e) {

        //    if (this.readyState == 4) {
        //        if (this.status == 200) {

        //            debugger;


        //            if (!cntEmb) {

        //                cntEmb = embbed.bind({ fi: encodeURIComponent(vF), na: '_file' });

        //            } else {
        //                //cntEmb='_self'
        //                setTimeout(function () {
        //                    //
        //                    embbed._bklive = { fi: encodeURIComponent(vF), na: '_file' };
        //                    embbed.bind(embbed._bklive)();
        //                    //
        //                }, 100);
        //            };


        //        } else {
        //            debugger;
        //            lop--;
        //            if (lop > 0) chkFN(vF);
        //        };
        //    };
        //};
        //xhr.onerror = function () { // only triggers if the request couldn't be made at all
        //    debugger;
        //    lop--;
        //    if (lop > 0) chkFN(vF);
        //};

        //xhr.send();





        if (!cntEmb) {

            cntEmb = embbed.bind({ fi: encodeURIComponent(vF), na: '_file' });

        } else {
            //cntEmb='_self'
            setTimeout(function () {
                //
                embbed._bklive = { fi: encodeURIComponent(vF), na: '_file' };
                embbed.bind(embbed._bklive)();
                //
            }, 100);
        };



    };




function embbed() {
    //
    //debugger;
    cntEmb = null;//reset
    //
    var vF = this.fi,
        na = this.na;


    //vF = 'http%3A%2F%2Fhellohrm2020.ddns.net%3A10996%2F000webhostapp.tep%2Fupemp%2F1686790448.xlsx';

    _iframeUrl = ['https:\u002f\u002fPSG3-excel.officeapps.live.com\u002fx\u002f_layouts\u002fxlembed.aspx?ui=en\u00252DUS\u0026rs=en\u00252DUS\u0026WOPISrc=http\u00253A\u00252F\u00252Fpsg3\u00252Dview\u00252Dwopi\u00252Ewopi\u00252Eonline\u00252Eoffice\u00252Enet\u00253A808\u00252Foh\u00252Fwopi\u00252Ffiles\u00252F\u002540\u00252FwFileId\u00253FwFileId\u00253D',
        vF ,
    //'https\u0025253A\u0025252F\u0025252Fapphrm\u0025252E000webhostapp\u0025252Ecom\u0025253A443\u0025252Fupemp\u0025252Fliway\u0025255Flv\u0025252Exlsx' +
    //'https%3A%2F%2Fapphrm.000webhostapp.com%3A443%2Fupemp%2Fliway_lv.xlsx%3Fname%3D%3Cscript%3Ealert%28%22HERE%22%29%3C%2Fscript%3E' +
    '\u0026access_token_ttl=0\u0026hid=' + new Date().getTime()];//3fc0b1e4-03a8-4207-b1a9-acf9c76373d5

    console.log(_iframeUrl);

    //var _windowTitle = 'liway_lv.xlsx';
    //var _favIconUrl = 'https://c1-view-15.cdn.office.net:443/op/s/161632841002_Resources/FavIcon_Excel.ico';
    var _shouldDoRedirect = false;
    var _failureRedirectUrl = '';
    var _accessToken = '1';


    if (_shouldDoRedirect) {
        window.location = _failureRedirectUrl;
        return;
    }
    //document.title = _windowTitle;
    //var link = document.createElement("link");
    //link.type = "image/vnd.microsoft.icon";
    //link.rel = "icon";
    //link.href = _favIconUrl;
    //document.getElementsByTagName('head')[0].appendChild(link);

    //var img = document.getElementById('load_img');
    //if (img)
    //    img.style.display = 'none';


    var frmLIVE = document.createElement('iframe');
    frmLIVE.src = '';
    frmLIVE.frameBorder = 0;
    frmLIVE.id = 'wacframe' + na;
    frmLIVE.name = 'wacframe'+ na;
    //frmLIVE.title = 'Office on the web Frame';
    frmLIVE.setAttribute('allowfullscreen', 'true');
    //frmLIVE.setAttribute('sandbox', "allow-scripts");
    document.body.appendChild(frmLIVE);




    document.getElementById('test_msg').addEventListener('click', function () {
        debugger;
        //var dog = 'https:\u002f\u002fPSG3-excel.officeapps.live.com\u002fx\u002f_layouts\u002fxlembed.aspx?ui=en\u00252DUS\u0026rs=en\u00252DUS\u0026WOPISrc=http\u00253A\u00252F\u00252Fpsg3\u00252Dview\u00252Dwopi\u00252Ewopi\u00252Eonline\u00252Eoffice\u00252Enet\u00253A808\u00252Foh\u00252Fwopi\u00252Ffiles\u00252F\u002540\u00252FwFileId\u00253FwFileId\u00253Dhttps\u0025253A\u0025252F\u0025252Fapphrm\u0025252E000webhostapp\u0025252Ecom\u0025253A443\u0025252Fupemp\u0025252FliwayXXX\u0025255Flv\u0025252Exlsx\u0026access_token_ttl=0\u0026hid=3fc0b1e4-03a8-4207-b1a9-acf9c76373d5'
        //frmLIVE.contentWindow.postMessage('dume', "*");

        //var dume = frmLIVE.contentWindow.top.location;

    });
    //




    function my_code(e) {
        //
        clearTimeout(liveHWND);
        //
        console.log("working:", new Date().getTime() - startEMB);
        //
        frmLIVE.style.display = '';
        //
        if (this == '_blank') {
            //
            window.parent.postMessage({ 'msgtype': 'session', 'msgkind': session, 'evtData': { messageType: 2, na: 'rawlive' } }, orgMsg);
            //
            livRMV = [frmLIVE, form2];
            //
            if (cntEmb) {
                setTimeout(function () {
                    cntEmb();
                },100);
            } else {
                cntEmb='_self'
            };
        } else {
            //
            window.parent.postMessage({ 'msgtype': 'session', 'msgkind': session, 'evtData': { messageType: 3, na: 'working' } }, orgMsg);
            //
            //debugger;
            //var dog = frmLIVE.parentNode;
            //for (var z = livRMV.length - 1; z > -1; z--) {
            //    dog.removeChild(livRMV[z]);
            //};
            //
        };
        //
    };
    //
    frmLIVE.onload = my_code.bind(na);
    //
    //
    function post(url, _token, _na) {

        var form2 = document.createElement('form');
        form2.action = url;
        form2.method = 'post';
        form2.target = 'wacframe' + _na;
        form2.id = 'form2' + _na;
        //
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'access_token';
        input.value = _token;
        form2.appendChild(input);
        document.body.appendChild(form2);
        //
        startEMB = new Date().getTime();
        //
        post.frmHTML=form2.outerHTML;

        form2.submit();
    };
    //
    //
    post(decodeURIComponent(_iframeUrl.join('')), _accessToken,na);
    //
    //

    function tryEXCEL() {
        //
        clearTimeout(liveHWND);
        //
        window.parent.postMessage({ 'msgtype': 'session', 'msgkind': session, 'evtData': { messageType: 4, na: 'fail' } }, orgMsg);
        //
        lop--;
        if (lop > 0) {
            //
            //reset chuan bi cho viec rewrite load again
            frmLIVE.onload = null;
            //
            frmLIVE.contentWindow.document.open();
            frmLIVE.contentWindow.document.write(post.frmHTML);
            frmLIVE.contentWindow.document.close();
            //
            //bind lại....
            frmLIVE.onload = my_code.bind(na);
            //
            var iniF = frmLIVE.contentWindow.document['getElementsByTagName']('form')[0];
            _iframeUrl[1] = 'https%3A%2F%2Fhellohrm.github.io%2Futils%2Fmedia%2Futils%2Ftmplexcel%2Fmisa_baocao_chamcong.xlsx';
            iniF.setAttribute('action', decodeURIComponent(_iframeUrl.join('')));
            //
            //debugger;
            //reload again .....
            liveHWND = setTimeout(function () {

                tryEXCEL();

            }, 18000);
            //
            //
            document.createElement('form').submit.call(iniF);
            //
        };
    };
    //
    //
    //dau tien call main function
    //set handle 15 seconde neu ko thi se goi massage fail
    liveHWND = setTimeout(function () {

        tryEXCEL();

    }, 18000);
    //
}
//
function clearFRM() {
    var ifr = document.getElementsByTagName("iframe");
    if (ifr.length > 0) {
        ifr = ifr[0];
        ifr.parentNode.removeChild(ifr);
    };
};
//
function hwndMsg(evt) {
    //
    //debugger;

    if (evt.data.k == 1) {
        //debugger;
        msgJOB[evt.data.k] && msgJOB[evt.data.k](evt.data.dat);
        //
        cntEmb = '_self';
        //
        //setTimeout(function () {
        //    //load _blank.xlsx github.ultils
        //    embbed.bind({ fi: encodeURIComponent("https://hellohrm.github.io/utils/media/utils/tmplexcel/view_live_embed.xlsx"), na: '_blank' })();
        //    //
        //}, 100);
        //
        return;
    } if (evt.data.k == 2) {
        //remove 
        clearFRM();
        return;
        //
    } if (evt.data.k == 3) {
        //
        clearFRM();
        //
        if (embbed._bklive) {
            embbed.bind(embbed._bklive)();
        };
        return;
    };
    //
    //
    var message;
    if (evt.origin !== "https://robertnyman.com") {
        message = "You are not worthy";
    }
    else {
        message = "I got " + evt.data + " from " + evt.origin;
    };
    document.getElementById("received-message").innerHTML = message + new Date().getTime();
};

if (window.addEventListener) {
    // For standards-compliant web browsers
    window.addEventListener("message", hwndMsg, false);
}
else {
    window.attachEvent("onmessage", hwndMsg);
};
//


//**************************** post load *********************************************//
setTimeout(function () {
    window.parent.postMessage({ 'msgtype': 'session', 'msgkind': session, 'evtData': { messageType: 0 } }, orgMsg);
}, 100);