/**
* Template Name: Appland - v4.10.0
* Template URL: https://bootstrapmade.com/free-bootstrap-app-landing-page-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
//https://skalman.github.io/UglifyJS-online/
//https://javascriptobfuscator.com/Javascript-Obfuscator.aspx
//https://obfuscator.io/
//https://codebeautify.org/minify-html


var w0w = window, isST = w0w.localStorage,st = function (a, k, p) {
    if (!isST) return;
    if (!p) {
        return isST[a](k);
    } else {
        isST[a](k, p);
    };
};
String.prototype.utoa = function () {
    return window.btoa(unescape(encodeURIComponent(this)));
};
// base64 encoded ascii to ucs-2 string
String.prototype.atou = function () {
    return decodeURIComponent(escape(window.atob(this)));
};
//
//
(function () {
    "use strict";

    var helloguy,
        _stateGUY = function (m, act) {
            helloguy.css('display', m);
        }
        ,
        _gsC = function (url, filetype, success, id) {
            var spt,
                atr = 'setAttribute',
                head = document.getElementsByTagName('head')[0],
                done = false;

            if (id && id != '' && w0w.dynload && w0w.dynload.indexOf(id) > -1) {
                done = true;
                success();
            } else {
                if (filetype == "js") {
                    spt = document.createElement('script');
                    spt[atr]("type", "text/javascript");
                    spt[atr]("src", url);
                } else if (filetype == "css") {
                    spt = document.createElement("link");
                    spt[atr]("rel", "stylesheet");
                    spt[atr]("type", "text/css");
                    spt[atr]("href", url);
                } else {
                    return;
                };
                if (id) { spt[atr]("id", id); if (!w0w.dynload) w0w.dynload = []; w0w.dynload.push(id); };
                spt.onload = spt.onreadystatechange = function () {
                    if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                        done = true;
                        success();
                        spt.onload = spt.onreadystatechange = null;
                        if (filetype == 'js') {
                            try {
                                head.removeChild(spt);
                            } catch (err) {
                            };
                        };
                    }
                };
                spt.onerror = function (e) {
                    // w0w.location.replace( '//' + ((w0w.location.hostname.indexOf('www.') > -1) ? 'www.' : '') + 'hrpro.cf/unluckyday');
                };
                //
                head.appendChild(spt);
            }
        }
        , cok = function (a, b, u) {
            u = u || 'Date';
            st.hn = w0w.location.hostname;
            var exdate = new Date(); exdate['set' + u](exdate['get' + u]() + b);
            document.cookie = a + '; domain=' + (/^((\d){1,3}\.){3}(\d){1,3}$/.test(st.hn) ? '' : '.') + st.hn.replace('www.', '') + (w0w.location.protocol.indexOf('https:') >= 0 ? '; SameSite=None; Secure' : '') + ';path=/ ; expires=' + exdate.toUTCString();
        }
        , gcok = function (name, chk) {
            var cookieArr = document.cookie.split(";");
            for (var i = 0; i < cookieArr.length; i++) {
                var cookiePair = cookieArr[i].split("=");
                if (name == cookiePair[0].trim()) {
                    return !chk ? decodeURIComponent(cookiePair[1]) : 1;
                }
            }
            return null;
        }
        , gQRY = function (url) {
            var rst = {};
            var ps = decodeURIComponent(url).split(/\?|\&/);
            ps.forEach(function (it) {
                if (it) {
                    var p = it.split("=");
                    rst[apisvr.a$.trim(p[0])] = apisvr.a$.trim(p[1]);
                }
            });
            return rst;
        }

        , lan = 'vi'

        , switchLAN = function ($ul, $cb) {

            var flag = $ul.find('i.lang-' + lan),
                li = flag.closest('li');
            if (li.index() == 0) return;
            //
            $cb && $cb();
            //
            //doi li[0] xuong.
            flag = li.siblings(':first').insertAfter(li).find('.bi-check');
            li.prependTo(li.parent()).find('a').append(flag);
            //
            $ul.prev().find('i.sel-flag').attr('class', function (i, c) {
                return c.replace(/(^|\s)lang-\S+/g, '');
            }).addClass('lang-' + lan);
            //
        }

        , about_LAN = function () {

            var
                dropTog = $('.dropdown-toggle').on('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    dropHWD(this);
                })
                ,
                dropHWD = function (el) {
                    el.classList.toggle('show');
                    el.nextElementSibling.classList.toggle('show');
                }
                , cleanEVT = function () {
                    dropTog.each(function (I, e) {
                        if (e.classList.contains('show')) {
                            dropHWD(e);
                        }
                    });
                };

            $(document).on('scroll click dumeswiper', cleanEVT);//

            switchLAN.fn = function (e) {
                var li = $(e.currentTarget),
                    lig = li.find('i.flag').attr('class').split(/\s+/);

                lig.some(function (zz) {
                    if (zz.trim().indexOf('lang-') > -1) {
                        lan = zz.trim().split('-')[1];
                        return true;
                    };
                });
                //
                switchLAN($(li).parent(), function () {
                    cok("selected_language=" + lan, 365);
                    window.location.replace(location.href.split('#')[0]);
                });
                //
            };
            switchLAN(
                $('.lang-lst').on('click', 'li', switchLAN.fn)
            );
            //
            //detect window focuse if it change language from demo
            window.addEventListener('focus', function () {//https://gist.github.com/RunnerRick/7645270
                var newlan = gcok("selected_language");
                if (newlan && lan != newlan) {
                    cok("selected_language=" + newlan, 365);
                    window.location.replace(location.href.split('#')[0]);
                };
            });
        }

        ,

        INIT = function () {
            //
            //
            /**
           * Easy selector helper function
           */
            var select = function (el, all) {
                //
                el = el.trim();
                //
                if (el == '#') return;
                //
                if (all === true) {
                    //debugger;
                    return /*Array.prototype*/[].slice.call(document.querySelectorAll(el), 0);// [/*...*/]
                } else {
                    return document.querySelector(el)
                }
            };

            /**
             * Easy event listener function
             */
            var on = function (type, el, listener, all) {

                var selectEl = select(el, all)

                if (selectEl) {
                    if (all) {
                        selectEl.forEach(function (e) {
                            e.addEventListener(type, listener);
                        })
                    } else {
                        selectEl.addEventListener(type, listener)
                    }

                };

                return selectEl;

            }

            /**
             * Easy on scroll event listener 
             */
            var onscroll = function (el, listener) {
                el.addEventListener('scroll', listener)
            }
            //
            //

            //
            /**
             * Navbar links active state on scroll
             */
            var navbarlinks = select('#navbar .scrollto', true)
            var navbarlinksActive = function () {
                var position = (window.scrollY || window.pageYOffset) + 200
                navbarlinks.forEach(function (navbarlink) {
                    if (!navbarlink.hash) return
                    var section = select(navbarlink.hash)
                    if (!section) return
                    if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                        navbarlink.classList.add('active')
                    } else {
                        navbarlink.classList.remove('active')
                    }
                })
            }
            window.addEventListener('load', navbarlinksActive)
            onscroll(document, navbarlinksActive)

            /**
             * Scrolls to an element with header offset
             */
            var scrollto = function (el) {
                var header = select('#header')
                var offset = header.offsetHeight
                var elementPos = select(el).offsetTop
                window.scrollTo({
                    top: elementPos - offset,
                    behavior: 'smooth'
                })
            }

            /**
             * Toggle .header-scrolled class to #header when page is scrolled
             */
            var selectHeader = select('#header')
            if (selectHeader) {
                var headerScrolled = function () {
                    if ((window.scrollY || window.pageYOffset) > 60) {
                        selectHeader.classList.add('header-scrolled')
                    } else {
                        selectHeader.classList.remove('header-scrolled')
                    }
                }
                window.addEventListener('load', headerScrolled)
                onscroll(document, headerScrolled)
            }

            /**
             * Back to top button
             */
            var backtotop = select('.back-to-top')
            if (backtotop) {
                var toggleBacktotop = function () {
                    if ((window.scrollY || window.pageYOffset) > 100) {
                        backtotop.classList.add('active')
                    } else {
                        backtotop.classList.remove('active')
                    }
                }
                window.addEventListener('load', toggleBacktotop)
                onscroll(document, toggleBacktotop)
            }

            /**
             * Mobile nav toggle
             */
            on('click', '.mobile-nav-toggle', function (e) {
                select('#navbar').classList.toggle('navbar-mobile')
                this.classList.toggle('bi-list')
                this.classList.toggle('bi-x')
            })

            /**
             * Mobile nav dropdowns activate
             */
            on('click', '.navbar .dropdown > a', function (e) {
                if (select('#navbar').classList.contains('navbar-mobile')) {
                    e.preventDefault()
                    this.nextElementSibling.classList.toggle('dropdown-active')
                }
            }, true)


            //
            on('click', '.getstarted', function (e) {
                //
                //
                //st('setItem', 'ZGVtb2FyZ3M', JSON.stringify({ 'mnu': 'JS_payrollonline', 'arg': { "f": "1", "s": 2, "demo": "1" } }));//demoargs
                //
                
                st('setItem', 'ZGVtb2FyZ3M', JSON.stringify({ 'mnu': 'JS_nhapxuat', 'arg': { } }));//demoargs
                window.open('ol.html', '_blank').focus();//?sf=eyJmIjoiMSIsInMiOjIsImRlbW8iOiIxIn0gIA


                
                //
                //
                //// Create new script element
                //const script = document.createElement('script');
                //script.src = '/codepen/exhihrs_login.js';
                //// Append to the `head` element
                //document.head.appendChild(script);

                //script.addEventListener('load', function () {
                //    alert('ere');
                //});

            }, false);



            /**
             * Scrool with ofset on links with a class name .scrollto
             */
            on('click', '.scrollto', function (e) {
                if (select(this.hash)) {
                    e.preventDefault()

                    var navbar = select('#navbar')
                    if (navbar.classList.contains('navbar-mobile')) {
                        navbar.classList.remove('navbar-mobile')
                        var navbarToggle = select('.mobile-nav-toggle')
                        navbarToggle.classList.toggle('bi-list')
                        navbarToggle.classList.toggle('bi-x')
                    }
                    scrollto(this.hash)
                }
            }, true)



            /**
             * Testimonials slider
             */
            new Swiper('.testimonials-slider', {
                speed: 600,
                loop: true,
                //autoplay: {
                //    delay: 5000,
                //    disableOnInteraction: false
                //},
                slidesPerView: 'auto',
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 40
                    },

                    1200: {
                        slidesPerView: 2,
                        spaceBetween: 40
                    }
                }
            }).on('click', function (e) {//slideChange
                this.$el.trigger('dumeswiper');
            });
            //
            /**
             * Gallery Slider
             */
            function dume_lag(gal, tio) {

                var dox = $(gal.$el);
                setTimeout(function () {
                    dume_lag.lastH = dox.height();
                    dox.parent().height(dume_lag.lastH);
                }, tio);

            }

            new Swiper('.gallery-slider', {
                speed: 400,
                loop: true,
                centeredSlides: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                slidesPerView: 'auto',
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 30
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    992: {
                        slidesPerView: 5,
                        spaceBetween: 30
                    },
                    1200: {
                        slidesPerView: 7,
                        spaceBetween: 30
                    }
                },
                on: {
                    init: function (e) {
                        dume_lag(this, 1000);
                    }
                }
            }).on('click', function (e) {//slideChange
                this.$el.trigger('dumeswiper');
            }).on('breakpoint', function (e) {
                dume_lag(this, 300);
                dume_lag(this, 500);
            }).on('resize', function () {
                dume_lag(this, 300);
                dume_lag(this, 500);
            }).on('beforeTransitionStart', function (e) {

            }).on('slideChangeTransitionEnd', function (e) {

            });


            const MAX_UID = 1000000,
                MILLISECONDS_MULTIPLIER = 1000,
                TRANSITION_END = 'transitionend', // Shout-out Angus Croll (https://goo.gl/pxwQGp)

                getTransitionDurationFromElement = function (element) {

                    if (!element) {
                        return 0;
                    } // Get transition-duration of the element


                    var fuk = window.getComputedStyle(element),
                        transitionDuration = fuk.transitionDuration,
                        transitionDelay = fuk.transitionDelay;


                    const floatTransitionDuration = parseFloat(transitionDuration);
                    const floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

                    if (!floatTransitionDuration && !floatTransitionDelay) {
                        return 0;
                    } // If multiple durations are defined, take the first


                    transitionDuration = transitionDuration.split(',')[0];
                    transitionDelay = transitionDelay.split(',')[0];
                    return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;

                }
                ,

                execute = function (callback) {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }

                ,

                executeAfterTransition = function (callback, transitionElement, waitForTransition) {

                    if (!waitForTransition) {
                        execute(callback);
                        return;
                    }

                    const durationPadding = 5;
                    const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
                    var called = false;

                    const handler = function (evt) {

                        if (evt.target !== transitionElement) {
                            return;
                        }

                        called = true;

                        transitionElement.removeEventListener(TRANSITION_END, handler);
                        execute(callback);
                    };

                    transitionElement.addEventListener(TRANSITION_END, handler);
                    setTimeout(function () {
                        if (!called) {
                            triggerTransitionEnd(transitionElement);
                        }
                    }, emulatedDuration);

                }
                ,

                triggerTransitionEnd = function (element) {
                    try {
                        element.dispatchEvent(new Event(TRANSITION_END));
                    } catch (err) {
                        var event;
                        event = document.createEvent('CustomEvent');
                        event.initCustomEvent(TRANSITION_END, false, false, {});
                        //};
                        element.dispatchEvent(event);
                    };
                };


            on('click', '[data-bs-toggle="collapse"]', function (e) {
                //
                var dog = select(e.currentTarget.getAttribute('data-bs-target'));
                //
                if (dog) {

                    e.preventDefault();

                    var A = e.currentTarget;


                    if (A.classList.contains('collapsed')) {
                        //tag a
                        $(A).removeClass('collapsed').addClass('collapse');

                        //body
                        dog.classList.remove('collapse');
                        dog.classList.add('collapsing');
                        dog.style.height = dog.scrollHeight + 'px';
                        //
                        //
                        executeAfterTransition(function (a, b, c) {
                            //
                            dog.classList.remove('collapsing');
                            //
                            dog.classList.add('show');
                            dog.classList.add('collapse');
                            //
                            dog.style.height = '';
                            //
                        }, dog, true);
                    } else {
                        //tag a
                        $(A).removeClass('collapse').addClass('collapsed');
                        //body
                        //1. neo height
                        dog.style.height= dog.getBoundingClientRect().height + "px";
                        //2. setup condition
                        $(dog).addClass('collapsing').removeClass('collapse').removeClass('show');
                        //
                        executeAfterTransition(function (a, b, c) {
                            //
                            dog.classList.add('collapse');
                            //
                            dog.classList.remove('collapsing');
                        }, dog, true);
                        //
                        //3. start release height
                        dog.style.height = '';
                        //
                    };
                };

            }, true);



            st.hero_SWIPER = function () {

                //1. serialize hero raw swiper
                //
                var swipO,

                    render = function (re) {
                        //
                        if (swipO) {
                            swipO.destroy();
                        };
                        //
                        ////2. remove all raw hero-swiper
                        //hero_swiper.find('.swiper-slide').remove();

                        //3. panel hero swiper with viewport
                        var hero_W = hero_swiper.innerWidth(),
                            hero_H = hero_swiper.innerHeight(),
                            totalH = 0,
                            nSLIDE = function (z) {
                                totalH = 0;
                                //append lai tung slide, va tinh toan nhay qua slide moi ,neu over height
                                return $(wr$p[z].htm).appendTo(hero_swiper).find('.slide-here');
                                //
                            };

                        //
                        console.log('W: ', hero_W, 'H: ', hero_H);
                        //
                        for (var z = 0; z < wr$p.length; z++) {
                            //
                            var newSL, reSwip = 0;
                            //
                            if (wr$p[z].htm instanceof jQuery) {
                                newSL = wr$p[z].htm;
                                //
                                //gan lai bang html
                                wr$p[z].htm = newSL.clone();
                                wr$p[z].htm.find('.slide-here').empty();
                                wr$p[z].htm = wr$p[z].htm[0].outerHTML;
                                //
                            } else {
                                newSL = nSLIDE(z);
                                reSwip = 1;
                            };
                            //
                            wr$p[z].el.map(function (k, sl) {
                                //
                                if (k > 0 && (totalH + sl.sz[1]) > hero_H) {

                                    newSL = nSLIDE(z);

                                    reSwip = 1;


                                };
                                //
                                totalH += sl.sz[1];
                                //
                                if (reSwip == 1) {
                                    $(sl.htm).appendTo(newSL);
                                };
                                //
                                if (sl.htm instanceof jQuery) {
                                    sl.htm = sl.htm[0].outerHTML;
                                };
                                //
                            });
                            //
                        };
                        //
                        //
                        //adjust xong thi bo class absolute ...
                        hero_swiper.find('.slide-here').removeClass('position-absolute');
                        //
                        //

                        ////finish -show...
                        //
                        swipO = new Swiper(hero_swiper.removeClass('invisible').parent(), {
                            loop: true,
                            spaceBetween: 30,
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            },
                            pagination: {
                                el: ".swiper-pagination",
                                clickable: true,
                            }
                        }).on('click slideChange', function (e) {
                            this.$el.trigger('dumeswiper');
                        });

                    }
                    ,

                    wr$p = hero_swiper.find('.swiper-slide').map(function (ix, si) {
                        //
                        si = $(si)
                        //
                        var noidng = si.find('.noidung'),
                            raw = {
                                //
                                sz: [si.innerWidth(), si.innerHeight()]
                                ,
                                el: noidng.map(function (zz, nd) {
                                    //
                                    nd = $(nd);
                                    //
                                    console.log('W: ', nd.outerWidth(), 'H: ', nd.outerHeight());
                                    //
                                    return {
                                        sz: [nd.outerWidth(), nd.outerHeight()]
                                        ,
                                        htm: nd
                                    };
                                })
                            };
                        //
                        noidng.parent().addClass('slide-here position-absolute');
                        //
                        //
                        raw.htm = si;
                        //
                        return raw;
                        //
                    });



                render();

                return render;



            }();




            //st.hero_SWIPER();


            AOS.init({
                duration: 1000,
                easing: "ease-in-out",
                once: true,
                mirror: false
            });

        }
        ,
        bg = ['//hrm.dnd.vn/media/images/excel_bangcong.jpg',
            '//templatelab.com/wp-content/uploads/2022/11/Health-and-Safety-Dashboard-Template-TemplateLab.com_-scaled.jpg',
            '//templatelab.com/wp-content/uploads/2022/11/KPI-Dashboard-Template-TemplateLab.com_-scaled.jpg',
        '//templatelab.com/wp-content/uploads/2022/11/Supply-Chain-Dashboard-Template-TemplateLab.com_-scaled.jpg']
        ,
        demo = [0,  1,'']
        ,
        feature_btn = function (e) {

            var btn = $(e.currentTarget);

            if (!btn.attr('mnu')) {


            }else if (btn.attr('mnu').indexOf('view_bg') > -1) {


            } else if (btn.attr('mnu').indexOf('demo_') > -1) {

                //window.open('ol.html', '_blank').focus();//?sf=eyJmIjoiMSIsInMiOjIsImRlbW8iOiIxIn0gIA

            };
        }
        ,

        LAZY = function () {

            $('head').append('<style>.dog:before{background-image: url(' + bg[0] + ');' +
                'background-size: cover;' +
                'content: ""; ' +
                'display: block; ' +
                'position: absolute; ' +
                'top: 0; ' +
                'left: 0; ' +
                'width: 100%; ' +
                'height: 100%; ' +
                'z-index: -2; ' +
                'opacity: 0.1; ' +
                '}</style>');
            //
            /**
                * Initiate gallery lightbox 
            */
            var galleryLightbox = GLightbox({
                selector: '.gallery-lightbox'
            });
            //
            //
            $('#features').on('click', '.btn', feature_btn)

        }
        ,

        SanSang = function () {

            if (!w0w['Swiper'] || !w0w['AOS'] || !w0w['GLightbox']) {
                //
                setTimeout(SanSang, 100);
                //
            } else {
                //

                var bdy = $(document.body).removeClass('batdau');
                //
                /**
                * Scroll with ofset on page load with hash links in the url
                */
                if (window.location.hash) {
                    if (select(window.location.hash)) {
                        scrollto(window.location.hash);
                        isSCROLL = 1;
                    }
                };
                //
                bdy.find('script').remove();
                //
                INIT();
                //
                //
                helloguy = bdy.find('#helloguy').fadeOut("slow", function () {
                    setTimeout(function () {
                        // Animation complete.
                        LAZY();
                    }, 1000);
                });
                //
            };
        }
        , hero_div = $('#hero')
            .on('click', '.download-btn', function (e) {
                //
                setTimeout(function () {
                    //
                    if ($(e.currentTarget).find('.trainghiem').length > 0) {

                        st('setItem', 'ZGVtb2FyZ3M', JSON.stringify({ 'mnu': 'JS_nhapxuat', 'arg': {} }));//demoargs

                        window.open('ol.html', '_blank').focus();//?sf=eyJmIjoiMSIsInMiOjIsImRlbW8iOiIxIn0gIA

                    } else {
                        hero_div.find('.swiper-wrapper').empty();
                        st.hero_SWIPER();
                    };
                    //
                }, 100);
            })

        , hero_swiper = hero_div.find('.swiper-wrapper');




    (function () {
        //
        var def = $.Deferred();

        lan = gcok("selected_language") ;

        if (!lan || lan.trim() == '') {
            //
            //https://ourcodeworld.com/articles/read/51/how-to-detect-the-country-of-a-visitor-in-php-or-javascript-for-free-with-the-request-ip
            //https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript
            //
            $.get('https://www.cloudflare.com/cdn-cgi/trace', function (data) {
                // Convert key-value pairs to JSON
                // https://stackoverflow.com/a/39284735/452587
                var data = data.trim().split('\n').reduce(function (obj, pair) {
                    pair = pair.split('=');
                    return obj[pair[0]] = pair[1], obj;
                }, {});
                //
                lan = data.loc.toLowerCase() == 'vn' ? 'vi' : 'en';
                //
                cok("selected_language=" + lan, 365);
                //console.log(data);
                //
                def.resolve(lan);
            });

        } else {

            def.resolve(lan.trim());

        };

        return def.promise();

    })().done(function (va) {
  
        $.get("odat/" + va + "/ini_tmpl.html"
            , { cache: false }
            , function (data) {
                //
                setTimeout(function () {
                    //
                    st.tmpl = $(data);
                    //
                    st.tmpl.find('script').appendTo($(document.body))

                        .ready(function (a, b) {
                            //
                            //
                            about_LAN();
                            //
                            setTimeout(function () {
                                //
                                SanSang();
                                //
                            }, 200);
                            //
                            //
                            $('[data-lang]').each(function (idx, el) {
                                idx = $(el); ;
                                idx.html(st.jsn.lan[idx.attr('data-lang')]);
                            });
                            //
                        });

                }, 100);
            });
    });
    //
    //
    //
    const libs = {
        cdnjs: 'https://cdnjs.cloudflare.com/ajax/libs'//'assets/vendor'//
        ,
        srcpf$: 'https://hrm.dnd.vn'
        ,
        shared: '../media_shared'//'https://apphrm.github.io/media_shared'//
        ,
        src$id: new Date().getTime()
        }
        ,
        lightboxEL = function (jda) {

            const nd = [],
                el = {
                    "0": function (d, z) {
                        return {
                            'id': 'sli_' + z,

                            'href': d[2],

                            'type': 'image', // Type is only required if GLightbox fails to know what kind of content should display
                            //zoomable: false,
                        }
                    }
                    ,
                    "1": function (d, z) {
                        return {
                            'href': d[2],
                            'type': 'video', // Type is only required if GLightbox fails to know what kind of content should display
                            'width': d[3] ? d[3] : '900px'
                        };
                    }
                    ,
                    "2": function (d, z) {
                        return {
                            'content': d[2],
                            'width': d[3] ? d[3] : '900px'
                        }
                    }
                };

            for (var z = 0; z < jda.length; z++) {
                nd.push(el[jda[z][0]](jda[z],z));
            };

            return {
                elements: nd};
        }
        ,
        adash_clk = function (mnu, folder) {
            //
            const jsonH = adash_clk._json;
            //
            switch (mnu) {

                case 'readmore': {
                    //
                    _gsC(libs.srcpf$ + '/media/js/vendors.bundle.min.js', 'js', function () {
                        //
                        const puhwnd = $('#popuphwnd');
                        //
                        puhwnd.find('.modal-dialog').addClass('modal-dialog-centered modal-dialog-zoom pu_fullW my-0')
                            .css({ 'max-width': '800px' });

                        puhwnd.one('shown.bs.modal', function () {

                            puhwnd.off('shown.bs.modal');


                            if (jsonH.hed[0] == 1) {//iframe
                                //
                                var frmpage = libs.shared + '/odat/' + lan + '/' + folder + '/readmore.html?t=' + libs.src$id;
                                $("<div class='iframe-wrapper'><iframe class='h-100' src='" + frmpage + "'></iframe></div>").appendTo(
                                    puhwnd.find('.modal-body').addClass('p-1')
                                );
                                //
                            };
                        }).one('hidden.bs.modal', function () {
                            //
                            $(this).find('.modal-content *').unbind().removeData();
                            puhwnd.find('.modal-body').removeClass('p-1').find('>*').remove();
                            //
                        });

                        puhwnd.modal('show');
                        //
                        //
                        //
                    }, 'vendors.bundle.min.js');

                    break;
                }
                case "slide": {
                    //
                    const lightbox = GLightbox(lightboxEL(jsonH.sli) );
                    //
                    lightbox.open();
                    //
                    break;
                }
                case "ol": {
                    //'https://admina.pages.dev/?$=aHR0cHM6Ly9ocm0uZG5kLnZu&$$=aGVsbG9kYXQucGFnZXMuZGV2'
                    //
                    //
                    //var d = jsonH.ol[0],qry = [];
                    ////
                    //for (var z = 1; z < jsonH.ol.length; z++) {
                    //    if (jsonH.ol[z] != '') {
                    //        if (z == 1) {
                    //            qry.push('$=' + jsonH.ol[z]);
                    //        } else if (z == 2) {
                    //            qry.push('$$=' + jsonH.ol[z]);
                    //        };
                    //    };
                    //};
                    ///
                    //for (var z = 1; z < d.length; z++) {
                    //    qry.push(d[z]);
                    //};
                    ////
                    //window.open(atob(d[0]) + '?' + qry.join('&'), '_blank').focus();//?sf=eyJmIjoiMSIsInMiOjIsImRlbW8iOiIxIn0gIA
                    //
                    //




                    ///'ZGVtb2FyZ3M'  //demoargs
                    window.open(jsonH.ol[0] + '?' + lan + '=' + JSON.stringify(jsonH.ol[1]).utoa() , '_blank').focus();//?sf=eyJmIjoiMSIsInMiOjIsImRlbW8iOiIxIn0gIA

                    break;
                }
            };

    };
    //
    $(document.body).append(

        '<div>' +


        '<link href="' + libs.srcpf$ + '/media/css/vendors.bundle.bootstrap.css" rel="stylesheet"/>' +
        '<link href="assets/css/appland.css" rel="stylesheet">' +



        '<script src="' + libs.cdnjs + '/aos/2.3.4/aos.js"></script>' +//https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js

        '<script src="' + libs.cdnjs + '/Swiper/5.4.5/js/swiper.min.js"></script>' + //https://cdnjs.cloudflare.com/ajax/libs/Swiper/5.4.5/js/swiper.min.js

        '<script src="' + libs.cdnjs + '/glightbox/3.2.0/js/glightbox.min.js"></script>' +//https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.2.0/js/glightbox.min.js


        '<link href="' + libs.cdnjs + '/aos/2.3.4/aos.css" rel="stylesheet">' +//https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css


        '<link href="' + libs.cdnjs + '/glightbox/3.2.0/css/glightbox.min.css" rel="stylesheet">' +//https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.2.0/css/glightbox.min.css


        '<link href="' + libs.cdnjs + '/Swiper/4.5.1/css/swiper.min.css" rel="stylesheet">' +//https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.1/css/swiper.min.css


        '<link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">' +




        '</div>'


    ).on('click', '.adash', function (e) {
        //
       const nut = $(e.currentTarget), adash = nut.closest('.row.content');
        //
        if (!adash_clk._json) {
            $.ajax({
                url: libs.shared + '/odat/' + lan + '/' + adash.attr('mnu') + '/map.json',
                dataType: 'json',
                //data: data,
                success: function (e) {

                    adash_clk._json = e;
       
                    adash_clk(nut.attr('mnu'), adash.attr('mnu'));

                },
                error: function (r) {
                    //loi thi thoi
                }
            });
        } else {
            adash_clk(nut.attr('mnu'), adash.attr('mnu'));
        };
        //
    });



})();