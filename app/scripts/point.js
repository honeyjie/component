var Point = function(name, cfg) {
    var component = new Base(name, cfg);
    $(".iphone").append(component);
    var base = cfg.data[0][1];
    $.each( cfg.data, function(index, item){//!!!遍历非元素
        var point = $('<div class="point point_'+ index +'"></div>');
        // point.text( item[0] + "-" + item[1]);
        var name = $('<div class="name">' + item[0] + '</div>');
        var rate = $('<div class="per">' + item[1]*100 + '%</div>');
        point.append( name );
        name.append( rate )
        var per = (item[1]/base*100) + "%"
        point.width(per).height(per);
        component.append( point );
        if (item[2]) {
            point.css("backgroundColor", item[2]);
        };
        if (item[3] !== undefined && item[4]) {
            point.css({"left": item[3], "top": item[4]});
        };

        point.css("transition", "all 1s "+ index*.5 + "s");
    })
    return component;
}