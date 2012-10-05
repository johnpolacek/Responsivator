/*
    jQuery Framer
    The jQuery Plugin for adding configurations to responsive design test pages
    by @johnpolacek

    Framer is built upon fine work done by others like <a href="http://mattkersley.com/responsive/">Matt Kersley</a>, <a href="http://www.benjaminkeen.com/open-source-projects/smaller-projects/responsive-design-bookmarklet/">Benjamin Keen</a> and <a href="https://gist.github.com/1685127">lensco</a>.

    See it in action on Responsivator!
    http://dfcb.github.com/Responsivator

    
    -----
    USAGE
    -----

    If all you want to do is turn your webpage into a Responsive Design Test Page:
    $.Framer();

    
    You can customize by doing this:
    var framesArray = [
        { width:320, height:480, label:'Phone (portrait)' },
        { width:480, height:320, label:'Phone (landscape)' }),
        { width:480, height:800, label:'Small Tablet (portrait)' }),
        { width:800, height:480, label:'Small Tablet (landscape)' }),
        { width:768, height:1024, label:'Large Tablet (portrait)' }),
        { width:1024, height:768, label:'Large Tablet (landscape)' }),
        { width:1280, height:800, label:'Desktop' }
    ];
    $.Framer({frames:framesArray});

    Dual licensed under MIT and GPL.
*/

;(function($) {

    $.Framer = function(options) {

        // Set defaults
        var defaults = {};
        defaults.target = 'body';
        defaults.frames = [
            { width:320, height:480, label:'Phone (portrait)' },
            { width:480, height:320, label:'Phone (landscape)' },
            { width:480, height:800, label:'Small Tablet (portrait)' },
            { width:800, height:480, label:'Small Tablet (landscape)' },
            { width:768, height:1024, label:'Large Tablet (portrait)' },
            { width:1024, height:768, label:'Large Tablet (landscape)' },
            { width:1280, height:800, label:'Desktop' }
        ];
        
        // by default, get full url of page for iframes
        // we don't use './' because we want to include url parameters
        // will be overwritten by url provided in the options.url
        defaults.url = window.location.protocol + "://" + window.location.host + "/" + window.location.pathname + window.location.search;
        
        // Merge options with defaults
        var settings = $.extend({}, defaults, options);

        // generate new markup for the page
        var markup = '<div class="wrapper">';
        
        // iterate through frames objects to create iframe markup for each
        var frames = settings.frames;
        for (var i=0; i < frames.length; i++) {
            markup += '<div class="frame">';
            markup +=   '<h2>'+frames[i].width+' &times; '+frames[i].height+' <small>'+frames[i].label+'</small></h2>';
            markup +=   '<iframe src="'+settings.url+'" sandbox="allow-same-origin allow-forms allow-scripts" seamless width="'+frames[i].width+'" height="'+frames[i].height+'"></iframe>';
            markup += '</div>';
        }
        markup += '</div>';

        // write iframes onto page
        $(settings.target).html(markup);
        
    };

})(jQuery);