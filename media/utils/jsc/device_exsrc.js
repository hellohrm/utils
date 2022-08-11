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

try {
    _gsC('https://hellohrm.github.io/utils//media/utils/jsc/device_exsrc.css', 'css', function () {
        alert('device_exsrc.css');
    }, 'device_exsrc.css');
} catch (err) {}



