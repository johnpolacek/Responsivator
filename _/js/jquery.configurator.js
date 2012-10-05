/*
    jQuery Configurator
    The jQuery plugin for injecting url parameter options into webpages and JSRender templates
    by @johnpolacek
    
    Plays nice with jsrender.js because it is awesome - https://github.com/BorisMoore/jsrender
    
    To just get a data object from url parameters of current page, do:
    $.Configurator().getConfig(); // returns data object

    
    Dual licensed under MIT and GPL.
*/

;(function($) {

    $.Configurator = function(configDefaults, configs) {

        // Get config data from url parameters that overwrite the defaults
        // Thanks guy on StackOverflow! - http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
        var configDataParams = {};
        if (decodeURI((location.search).substr(1)) !== '') {
            configDataParams = JSON.parse('{"' + decodeURI((location.search).substr(1).replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
        }

        configs = configs || [];
        configDefaults = configDefaults || {};
        var configData = $.extend({}, configDefaults, configDataParams);

        var init = function() {
            
            for (var i=0; i < configs.length; i++) {

                var $target = $(configs[i].target).length ? $(configs[i].target) : $('#'+configs[i].target);
                var $template = $(configs[i].template).length ? $(configs[i].template) : $('#'+configs[i].template);
                $target.html( $template.render( configData ) );
            }

        };

        this.getConfig = function() {
            return configData;
        };

        init();

        return this;

    };

})(jQuery);