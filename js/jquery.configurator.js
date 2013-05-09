/*
    jQuery Configurator
    The jQuery plugin for injecting url parameter options into webpages and JSRender templates
    by @johnpolacek
    
    Plays nice with jsrender.js because it is awesome - https://github.com/BorisMoore/jsrender
    
    To just get a data object from url parameters of current page, do:
    $.Configurator().getConfig(); // returns data object

    To use JSRender templates, pass in a default data object for when there are no url params,
    and an array of objects with targets and templates

    $.Configurator(
        { boy:'Jack', girl:'Jill', direction:'up', place:'hill' }, [
            { '#rhyme-form','#rhyme-form-tpl' },
            { '#rhyme-blockquote','#rhyme-blockquote-tpl' }]
    );

    
    Dual licensed under MIT and GPL.
*/

;(function($) {

    $.Configurator = function(configDefaults, configRenders) {

        // Get config data from url parameters that overwrite the defaults
        // Thanks guy on StackOverflow! - http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
        var configDataParams = {};
        if (decodeURI((location.search).substr(1)) !== '') {
            configDataParams = JSON.parse('{"' + decodeURI((location.search).substr(1).replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
            $.each(configDataParams, function(key,val){
                if (val.indexOf(',') !== -1) {
                    configDataParams[key] = val.split(',');
                }
            });
        }

        configRenders = configRenders || [];
        configDefaults = configDefaults || {};
        var configData = $.extend({}, configDefaults, configDataParams);

        var render = function() {

            for (var i=0; i < configRenders.length; i++) {

                var $target = $(configRenders[i].target);
                var $template = $(configRenders[i].template);
                if ($template.length && $target.length){
                    $target.html( $template.render( configData ) );
                } else {
                    var errorMsg = '';
                    if (!$target.length) errorMsg += 'No target found at '+configRenders[i].target+'. Check your selector';
                    if (!$template.length) errorMsg += 'No template found at '+configRenders[i].template+'. Check your selector';
                    throw new Error(errorMsg);
                }
            }

        };

        this.getConfig = function() {
            return configData;
        };

        this.updateData = function(newConfigData) {
            configData = $.extend({}, configData, newConfigData);
            render();
        };

        if (configRenders.length) render();

        return this;

    };

})(jQuery);