var session = dat[0]
    , orgMsg = dat[1],

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


                    embbed(this.responseText);



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

function embbed(responseText) {
    //
    debugger;

    var href = window.location.href// "https://ui.dev/get-current-url-javascript/?comments=false"
    var pathname = window.location.pathname // "/get-current-url-javascript/""
    href = href.split(pathname)[0];
    //
    var apath = window.location.pathname.split('/');
    apath[apath.length - 1] = 'upemp/' + responseText;
    //
    console.log(responseText);
    //
    //
    var vF = encodeURIComponent(href + apath.join('/')),

    _iframeUrl = decodeURIComponent('https:\u002f\u002fPSG3-excel.officeapps.live.com\u002fx\u002f_layouts\u002fxlembed.aspx?ui=en\u00252DUS\u0026rs=en\u00252DUS\u0026WOPISrc=http\u00253A\u00252F\u00252Fpsg3\u00252Dview\u00252Dwopi\u00252Ewopi\u00252Eonline\u00252Eoffice\u00252Enet\u00253A808\u00252Foh\u00252Fwopi\u00252Ffiles\u00252F\u002540\u00252FwFileId\u00253FwFileId\u00253D' +
    //'https\u0025253A\u0025252F\u0025252Fapphrm\u0025252E000webhostapp\u0025252Ecom\u0025253A443\u0025252Fupemp\u0025252Fliway\u0025255Flv\u0025252Exlsx' +
    //'https%3A%2F%2Fapphrm.000webhostapp.com%3A443%2Fupemp%2Fliway_lv.xlsx%3Fname%3D%3Cscript%3Ealert%28%22HERE%22%29%3C%2Fscript%3E' +
    '\u0026access_token_ttl=0\u0026hid=3fc0b1e4-03a8-4207-b1a9-acf9c76373d5');
    console.log(_iframeUrl);

    var _windowTitle = 'liway_lv.xlsx';
    var _favIconUrl = 'https://c1-view-15.cdn.office.net:443/op/s/161632841002_Resources/FavIcon_Excel.ico';
    var _shouldDoRedirect = false;
    var _failureRedirectUrl = '';
    var _accessToken = '1';


    if (_shouldDoRedirect) {
        window.location = _failureRedirectUrl;
        return;
    }
    document.title = _windowTitle;
    var link = document.createElement("link");
    link.type = "image/vnd.microsoft.icon";
    link.rel = "icon";
    link.href = _favIconUrl;
    document.getElementsByTagName('head')[0].appendChild(link);

    var img = document.getElementById('load_img');
    if (img)
        img.style.display = 'none';


    var frmLIVE = document.createElement('iframe');
    frmLIVE.src = '';
    frmLIVE.frameBorder = 0;
    frmLIVE.id = 'wacframe';
    frmLIVE.name = 'wacframe';
    frmLIVE.title = 'Office on the web Frame';
    frmLIVE.setAttribute('allowfullscreen', 'true');
    //frmLIVE.setAttribute('sandbox', "allow-scripts");
    document.body.appendChild(frmLIVE);




    document.getElementById('test_msg').addEventListener('click', function () {
        debugger;
        //var dog = 'https:\u002f\u002fPSG3-excel.officeapps.live.com\u002fx\u002f_layouts\u002fxlembed.aspx?ui=en\u00252DUS\u0026rs=en\u00252DUS\u0026WOPISrc=http\u00253A\u00252F\u00252Fpsg3\u00252Dview\u00252Dwopi\u00252Ewopi\u00252Eonline\u00252Eoffice\u00252Enet\u00253A808\u00252Foh\u00252Fwopi\u00252Ffiles\u00252F\u002540\u00252FwFileId\u00253FwFileId\u00253Dhttps\u0025253A\u0025252F\u0025252Fapphrm\u0025252E000webhostapp\u0025252Ecom\u0025253A443\u0025252Fupemp\u0025252FliwayXXX\u0025255Flv\u0025252Exlsx\u0026access_token_ttl=0\u0026hid=3fc0b1e4-03a8-4207-b1a9-acf9c76373d5'
        frmLIVE.contentWindow.postMessage('dume', "*");

        var dume = frmLIVE.contentWindow.top.location;

    });
    //




    function my_code(e) {
        debugger;
        console.log("working");
        frmLIVE.style.display = '';
        window.parent.postMessage({ 'msgtype': 'session', 'msgkind': session, 'evtData': { messageType: 2, na: 'working' } }, orgMsg);
    };
    frmLIVE.onload = my_code;


    var form2 = document.createElement('form');
    form2.action = _iframeUrl;
    form2.method = 'post';
    form2.target = 'wacframe';
    form2.id = 'form2';
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'access_token';
    input.value = _accessToken;
    form2.appendChild(input);
    document.body.appendChild(form2);



    form2.submit();

   
}
//
function hwndMsg(evt) {
    //
    debugger;

    if (evt.data.k == 1) {
        //debugger;
        msgJOB[evt.data.k] && msgJOB[evt.data.k](evt.data.dat);
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






//var l_ErrorImageAlt_Text = "The service is unavailable";
//var l_ErrorHeader_Text = "Service Unavailable";
//var l_ErrorLine1_Text = "We are currently experiencing technical difficulties.";
//var l_ErrorLine2_Text = "Please try again later.";
//var l_ErrorHeaderStyle_Text = "font-family: calibri, tahoma, verdana, arial, sans serif; font-size: 18pt; color: #444444; line-height: 150%";
//var l_ErrorTextStyle_Text = "font-family: calibri, tahoma, verdana, arial, sans serif; font-size: 10pt; color: #444444";
//var language = "en-us";

//function writeLocalizedErrorMessage() {
//    getBrowserLanguage();
//    loadScript();
//} function getBrowserLanguage() {
//    if (navigator.userLanguage) language = navigator.userLanguage.toLowerCase();
//    else if (navigator.language) language = navigator.language.toLowerCase();
//}
//function getXmlHttpRequestObject() {
//    if (window.XMLHttpRequest) return new XMLHttpRequest();
//    else if (window.ActiveXObject) return new ActiveXObject("MsXml2.XmlHttp");
//}

//function loadScript() {
//    var xhrRequest = getXmlHttpRequestObject();
//    xhrRequest.open("GET", "" + escape(language) + "/strings.js", false);
//    xhrRequest.send(null); if (xhrRequest.status == 200 || xhrRequest.status == 304) {
//        addScriptToPage(xhrRequest.responseText);
//    } else {
//        if (language.length > 2) {

//            language = language.substr(0, 2);
//            loadScript();

//        } else { setLocalizableElements(); }
//    }
//}

//function addScriptToPage(source) {
//    if (source != null) eval(source.replace(/^var /gm, "")); setLocalizableElements();
//} function setText(elementText, text) {
//    var textNode = document.createTextNode(text);
//    elementText.innerHTML = ''; elementText.appendChild(textNode);
//} function setLocalizableElements() {
//    document.title = l_ErrorHeader_Text; var imageElement = document.getElementById("WACErrorImage");
//    var errorHeader = document.getElementById("WACErrorHeader");
//    var errorText1 = document.getElementById("WACErrorText1");
//    var errorText2 = document.getElementById("WACErrorText2");
//    var imgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKvSURBVFhH7ZdBaxNRFIXzSwqFbrvqDyhIEUEQlbpx40JERERcuHEhuiq4FbvrShQ3XRVduGlMNIpWrWBxmrahBmpom9ZoTdJpJo7nvNxJZt68FydNIZse+ODl3nPvnXTmvUxTx+pFzuWJUXAXZMEC8ASuGWNuVOxHJzQ9BxzgJ4TeSSk/vNBkCOSk6WFg7ZC0600oHAc70qgf2GNc2iYTC4ArDY4C9kp2ETAOgy0pbLNy8/yuHrNh8bLnsIyxCyY+zZHi6tLHtN9slgp3LhX1nA499LLGkM/KGLNgmNQK/KqzmPZFf71Gce32xZLuCWCOHrGrCzf47LsDydhW23h07xN61VotcRGNg8LqrQtl3ccYc2KjaqzVfcCRcVEhwQdPNytKMw/eo6Hb6ouLcPfz4fvMNWOSplzWhHtoxB9IBKc0U4TNJw/forHX6u/7zXr1a/7G2V/562f+cC1hyqPX1CPElIztCEHT/YqwPTvzWoYoeXuVRSIflegx1WqkZWxHCMa2nony86cZmRUTc6YaA1sytiMEEx88P+fn2jsjEGMmrwVXxnbEoGaysl9cy8rcthgzeS0YLyDRLaitLr2SmTHVC9/6ugX/"; imgSrc += "/ROqEzGk+no+Q+SjkuXw0TE+hF234e+FzLzMUHJ/fH/jXDnpEa4lrESvqUcI4za0HkSVzIvINz/YLr1TwwMP1oxJWok14R4aJ2RsVEjEjuLdl7ORe96o7HxYvnoq9sAyxpzYlFir+4D5KKaQjP0Yyb5XJyAPneVrp2u6J4C50MHklecemx7K7q9qMMS20+az6Rwb89jVczr0eNW9L6wx5HMyxi6YRkCiLdkj7DkiY7oLxsG9kgViARjMS2kgFA7utTwsNOHuWJGmSaC3/39MdKHpGLgP+M0+g2Ag14wxNyb2YyVQKvUPFefPUJql73sAAAAASUVORK5CYII=";
//    imageElement.alt = l_ErrorImageAlt_Text;
//    imageElement.src = imgSrc;
//    setText(errorHeader, l_ErrorHeader_Text);
//    errorHeader.style.cssText = l_ErrorHeaderStyle_Text; setText(errorText1, l_ErrorLine1_Text);
//    errorText1.style.cssText = l_ErrorTextStyle_Text;
//    setText(errorText2, l_ErrorLine2_Text);
//    errorText2.style.cssText = l_ErrorTextStyle_Text;
//}

