(function (window) {
    "use strict";

    function injectFunction(func) {
        var ele = document.createElement('script');
      　var s = document.getElementsByTagName('script')[0];

        ele.type = 'text/javascript';
        ele.textContent = '(' + func + ')();';

        s.parentNode.insertBefore(ele, s);
    }

    function disableURLRewrite() {
        function inject_init() {
            Object.defineProperty(window, 'rwt', {
                value: function() { return true; },
                writable: false,
                configurable: false
            });
        }

        injectFunction(inject_init);
    }

    function cleanTheLink(a) {
        if (a.dataset['cleaned'] == 1) 
            return;
      
        var need_clean = false;

        var result = /\/(?:url|imgres).*[&?](?:url|q|imgurl)=([^&]+)/i.exec(a.href);

        if (result) {
            need_clean = true;
            a.href = result[1];
        }

        var val = a.getAttribute('onmousedown') || '';

        if (val.indexOf('return rwt(') != -1) {
            need_clean = true;
            a.removeAttribute('onmousedown');
        }

        var cls = a.className || '';

        if (cls.indexOf('irc_') != -1) need_clean = true;

        if (need_clean) {
            var clone = a.cloneNode(true);
            a.parentNode.replaceChild(clone, a);
            clone.dataset['cleaned'] = 1;
        }
    }

    function main()
    {
        disableURLRewrite();
        
        document.addEventListener('mouseover', function (event) {
            var a = event.target, depth = 1;

            while (a && a.tagName != 'A' && depth-- > 0)
                a = a.parentNode;

            if (a && a.tagName == 'A')
                cleanTheLink(a);
        }, true);
    }

    main();
})(window);