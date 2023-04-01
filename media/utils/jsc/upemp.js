var dat = atob(window.location.search.split('?seson=')[1]).split('|')
    , session = dat[0]
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
                    ///
                    //
                    //**************************** LOAD IF *********************************************//
                    function my_code(e) {
                        //debugger;
                        console.log(" working");
                        frm.style.display = '';
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
                    //https://apphrm.000webhostapp.com/
                    frm.src = "https://view.officeapps.live.com/op/embed.aspx?src=" + href + apath.join('/');
                    document.body.appendChild(frm);
                    //
                };
            };
        }
    };
//
function hwndMsg(evt) {
    //
    //debugger;

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

