var Base = function( name, cfg ) {
    var cfg = cfg || {};
    var id = ( "h5_" + Math.random() ).replace(".", "_");
    var cls = ' h5_component_' + cfg.type;
    var component = $('<div class="h5_component component_name_' + name + cls + '" id="'+ id + '"></div>');
    // cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width);
    cfg.height && component.height(cfg.height);
    cfg.bg && component.css("backgroundImage", "url("+ cfg.bg + ")");
    //图文在组件内部居中
    cfg.css && component.css(cfg.css);
    if (cfg.center == true) {
        component.css({
            marginLeft: - cfg.width/2,
            left: "50%"//需用字符串表示
        });//居中表示法：left:50%, marginleft: w/2
    }
    // if (cfg.toRelative == true) {
    //     component.style.offsetTop = 50px;
    //     component.style.offsetLeft = 10px;
    //     // component.css({
            
            
    //     // });//居中表示法：left:50%, marginleft: w/2
    // }

    component.on("onLoad", function(){
        component.addClass(cls + '_load').removeClass(cls + '_leave');
        cfg.animateIn && component.animate( cfg.animateIn );
        console.log("1");
        return false;
    });
    component.on("onLeave", function(){
        component.addClass(cls + '_leave').removeClass(cls + '_load');
        cfg.animateOut && component.animate( cfg.animateOut );
        
        console.log("2");
        return false;
    });

    return component;
}