var Bar = function(name, cfg) {
    var component = new Base(name, cfg);
    $.each( cfg.data, function(index, item){//!!!遍历非元素
        var line = $('<div class="line"></div>');
        var name = $('<div class="name"></div>');
        var rate = $('<div class="rate"></div>');
        var per = $('<div class="per"></div>');

        // var rate_parent =  $('<div class="rate_parent"></div>');
        // rate_parent.append( rate );
        // rate_parent.append( per );
        
        var bg = $('<div class="bg" style="background-color: '+ item[2] +'"></div>');
        rate.append( bg );
        var width = item[1]*100 + "%";                     
        // var top = 10 + 20*index;
        // var left = 20;
        // line.css({"top": top, "height": cfg.height})
        // name.css({"height": cfg.height, "width": 70});
        rate.css({"width": width});
        // per.css({"left": cfg.width*item[1] + 85});
        // $(".bg").css({"width": width});
        name.text( item[0] );
        per.text( width );
        line.append( name ).append( rate ).append( per );
        component.append( line );
    })
    return component;
}