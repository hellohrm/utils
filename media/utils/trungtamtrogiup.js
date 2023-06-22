"use strict";

(function (factory) {
    "use strict";
    if (!window['trungtamtrogiup']) window.trungtamtrogiup = factory(null);//pass pubArgs later if need
})(function (pubArgs) {

    const hlp = {
        'JS_payrollonline': function (o) {
            var oitroi = o;
            const myGallery = GLightbox({
                elements: [
                    {
                        'href': 'https://picsum.photos/1200/800',
                        'type': 'image',
                        'title': 'My Title',
                        'description': 'Example',
                    },
                    {
                        'href': 'https://picsum.photos/1200/800',
                        'type': 'image',
                        'alt': 'image text alternatives'
                    },
                    {
                        'href': 'https://www.youtube.com/watch?v=Ga6RYejo6Hk',
                        'type': 'video',
                        'source': 'youtube', //vimeo, youtube or local
                        'width': 900,
                    },
                    {
                        'content': '<p>This will append some html inside the slide</p>' // read more in the API section
                    }
                    //,
                    //{
                    //    'content': document.getElementById('inline-example') // this will append a node inside the slide
                    //}
                ],
                autoplayVideos: true,
            });
            myGallery.open();
        }
    };

    return {
        createHELP: function (o) {

            _gsC('https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.2.0/js/glightbox.min.js', 'js', function (data) {

                _gsC('https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.2.0/css/glightbox.min.css', 'css', function (data) {
                    //
                    //
                    if (hlp.hasOwnProperty(o[0])) hlp[o[0]](o);
                    //
                    srclocked(false);
                    //
                }, 'glightbox.min.css');

            }, 'glightbox.min.js');

 
        }
    };

});