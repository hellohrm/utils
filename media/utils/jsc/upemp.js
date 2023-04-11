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
            xhttp.open("POST", "upemp.php", true);
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
                    //
                    setTimeout(function () {
                        //
                        if (!cntEmb) {

                            cntEmb = embbed.bind({ fi: encodeURIComponent(vF), na: '_file' });

                        } else {
                            //cntEmb='_self'
                            embbed.bind({ fi: encodeURIComponent(vF), na: '_file' })();
                        };
                        //embbed(vF);
                        //
                    },100);



                    return;



                    //
                    //**************************** LOAD IF *********************************************//
                    function my_code(e) {
                        debugger;
                        console.log("working");
                        frm.style.display = '';
                        window.parent.postMessage({ 'msgtype': 'session', 'msgkind': session, 'evtData': { messageType: 2, na: 'working' } }, orgMsg);
                    };

                    //
                    var frm = document.createElement("iframe");
                    frm.id = 'embed_excel';
                    frm.setAttribute("style", "border:none;display:none");
                    frm.setAttribute("frameborder", "0");
                    //
                    frm.onload = my_code;
                    //
                    var href = window.location.href// "https://ui.dev/get-current-url-javascript/?comments=false"
                    var pathname = window.location.pathname // "/get-current-url-javascript/""
                    href = href.split(pathname)[0];
                    //
                    var apath = window.location.pathname.split('/');
                    apath[apath.length - 1] = 'upemp/' + this.responseText;
                    //
                    //https://apphrm.000webhostapp.com/upemp/congluong.xlsx
                    frm.src = "https://view.officeapps.live.com/op/embed.aspx?src=https://apphrm.000webhostapp.com/upemp/liway_lv.xlsx";// + href + apath.join('/');
                    document.body.appendChild(frm);
                    //





                };
            };
        }
    };


var cntEmb;

function embbed() {
    //
    debugger;
    cntEmb = null;//reset
    //
    var vF = this.fi,
        na = this.na;


    _iframeUrl = decodeURIComponent('https:\u002f\u002fPSG3-excel.officeapps.live.com\u002fx\u002f_layouts\u002fxlembed.aspx?ui=en\u00252DUS\u0026rs=en\u00252DUS\u0026WOPISrc=http\u00253A\u00252F\u00252Fpsg3\u00252Dview\u00252Dwopi\u00252Ewopi\u00252Eonline\u00252Eoffice\u00252Enet\u00253A808\u00252Foh\u00252Fwopi\u00252Ffiles\u00252F\u002540\u00252FwFileId\u00253FwFileId\u00253D' +
        vF +
    //'https\u0025253A\u0025252F\u0025252Fapphrm\u0025252E000webhostapp\u0025252Ecom\u0025253A443\u0025252Fupemp\u0025252Fliway\u0025255Flv\u0025252Exlsx' +
    //'https%3A%2F%2Fapphrm.000webhostapp.com%3A443%2Fupemp%2Fliway_lv.xlsx%3Fname%3D%3Cscript%3Ealert%28%22HERE%22%29%3C%2Fscript%3E' +
    '\u0026access_token_ttl=0\u0026hid=3fc0b1e4-03a8-4207-b1a9-acf9c76373d5');

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

        console.log("working");
        frmLIVE.style.display = '';
        //
        if (this == '_blank') {
            debugger;
            var dog = frmLIVE.parentNode;
            dog.removeChild(frmLIVE);
            dog.removeChild(form2);
            if (cntEmb) {
                cntEmb();
            } else {
                cntEmb='_self'
            };
        } else {
            window.parent.postMessage({ 'msgtype': 'session', 'msgkind': session, 'evtData': { messageType: 2, na: 'working' } }, orgMsg);
        };
        //
    };
    //
    frmLIVE.onload = my_code.bind(na);
    //
    //
    var form2 = document.createElement('form');
    form2.action = _iframeUrl;
    form2.method = 'post';
    form2.target = 'wacframe' + na;
    form2.id = 'form2' + na;
    //
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'access_token';
    input.value = _accessToken;
    form2.appendChild(input);
    document.body.appendChild(form2);
    //
    //
    form2.submit();
    //
    //
}
//
function hwndMsg(evt) {
    //
    //debugger;

    if (evt.data.k == 1) {
        //debugger;
        msgJOB[evt.data.k] && msgJOB[evt.data.k](evt.data.dat);
        //
        setTimeout(function () {
            //load _blank.xlsx github.ultils
            embbed.bind({ fi: encodeURIComponent("https://hellohrm.github.io/utils/media/utils/tmplexcel/conkhikho.xlsx"), na: '_blank' })();
            //
        }, 100);
        //
    };

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
window.parent.postMessage({ 'msgtype': 'session', 'msgkind': session, 'evtData': { messageType: 0 } }, orgMsg);