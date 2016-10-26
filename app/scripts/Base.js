var Base = function( name, cfg ) {
    var cfg = cfg || {};
    var id = ( "h5_" + Math.random() ).replace(".", "_");
    var cls = ' h5_component_' + cfg.type;
    var component = $('<div class="h5_component component_name_' + name + cls + '" id="'+ id + '"></div>');
    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
    cfg.bg && component.css("backgroundImage", "url("+ cfg.bg + ")");
    //图文在组件内部居中
    cfg.css && component.css(cfg.css);
    if (cfg.center == true) {
        component.css({
            marginLeft: - cfg.width/4,
            left: "50%"//需用字符串表示
        });//居中表示法：left:50%, marginleft: w/2
    }

    if( typeof cfg.onclick === "function" ) {
        component.on("click", cfg.onclick);
    }
    component.on("onLoad", function(){
        setTimeout(function(){
                component.addClass(cls + '_load').removeClass(cls + '_leave');
                cfg.animateIn && component.animate( cfg.animateIn );  
        }, cfg.delay || 0);

        return false;
    })

    component.on("onLeave", function(){
        setTimeout(function(){
                component.addClass(cls + '_leave').removeClass(cls + '_load');
                cfg.animateOut && component.animate( cfg.animateOut );  
        }, cfg.delay || 0);

        return false;
    })
       



    return component;
}