var Rada
 = function(name, cfg) {
    var component = new Base(name, cfg);

    var w = cfg.width;
    var h = cfg.height;

    var cns = document.createElement("canvas");
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;

    var n = cfg.data.length;
    var a = 2*Math.PI/n
    var rotate = -Math.PI/2;
    //画蜘蛛网
    function spider(r, n) {
        ctx.beginPath();
        for (var i = 0; i < n; i++) {
            ctx.moveTo( w/2, h/2 );
            var x = r*Math.cos(a*i + rotate) + w/2;
            var y = r*Math.sin(a*i + rotate) + h/2;
            ctx.lineTo( x, y);
        }
        ctx.strokeStyle = "#e0e0e0";
        ctx.stroke();
        ctx.closePath();
    }
    //画一个七边形
    function polygon(r, n, color ) {
            ctx.beginPath();
            for (var i = 0; i < n; i++) {
                var x = r*Math.cos(a*i + rotate) + w/2;
                var y = r*Math.sin(a*i + rotate) + h/2;
                ctx.lineTo( x, y);
            }
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();
        }

    function draw( per ) {
        ctx.clearRect(0, 0, w, h);
        if( per < 1 ) {
            component.find(".text_name").css("opacity", 0);
        }
        if (per >= 1) {
            component.find(".text_name").css("opacity", 1);
        }
        for (var i = 5; i > 0; i--) {
            var r = 40*i;
            var color = i % 2 === 0 ? "#ffffff" : "#99c0ff" ;
            polygon(r, n, color);
        }

        spider(r*5, n);

        //绘制圆点
        ctx.beginPath();
        ctx.fillStyle = "#ff7676";
        $.each(cfg.data, function(i, el){
            var len = cfg.data[i][1].slice(0, -1)/100;
            var x = 2*200*per*len*Math.cos(a*i + rotate) + w/2;
            var y = 2*200*per*len*Math.sin(a*i + rotate) + h/2;
            ctx.moveTo(x,y)
            ctx.arc(x, y, 3, 0, 2*Math.PI);
        });
        ctx.fill();

        //连接圆点
        ctx.beginPath();
        ctx.strokeStyle = "#ff7676";
        $.each(cfg.data, function(i, el){
            var len = cfg.data[i][1].slice(0, -1)/100;
            var x = w*len*per*Math.cos(a*i + rotate) + w/2;
            var y = w*len*per*Math.sin(a*i + rotate) + h/2;
            ctx.lineTo(x,y)
        });
        ctx.closePath();
        ctx.stroke();

        //添加name
        $.each( cfg.data, function( i, el) {
            var num = cfg.data[i][1]
            var len = num.slice(0, -1)/100;
            var text_num = $('<div class="text_num">'+ num +'</div>');

            var x = 200*Math.cos(a*i + rotate) + w/2;
            var y = 200*Math.sin(a*i + rotate) + h/2;

            var text_name = $('<div class="text_name">'+ cfg.data[i][0] +'</div>');
            text_name.css({"-webkit-transition": "all .1s "+ .1*i + "s"});
 
            if (x > w/2) {
                text_name.css({"left": x/2 + 5 });
            } else {
                text_name.css({"left": x/2 - 20 });
            }

            if (y > h/2) {
                text_name.css({"top": y/2 + 5 });
            } else {
                text_name.css({"top": y/2 - 20 });
            }

            var x_num = w*len*Math.cos(a*i + rotate) + w/2;
            var y_num = w*len*Math.sin(a*i + rotate) + h/2;

            if (x_num > w/2) {
                text_num.css({"left": x_num/2 + 5 });
            } else {
                text_num.css({"left": x_num/2 - 20 });
            }

            if (y_num > h/2) {
                text_num.css({"top": y_num/2 + 5 });
            } else {
                 text_num.css({"top": y_num/2 - 20 });
            }
            component.append( text_name )
        })

    }


    component.append( cns );

    component.on("onLoad", function() {
        var s = 0;
        for (var i = 0; i < 100; i++) {
            setTimeout(function(){
                s += 0.01;
                draw( s );
            }, i*10 + 500);
        }
    })
    component.on("onLeave", function() {
        var s = 1;
        for (var i = 0; i < 100; i++) {
            setTimeout(function(){
                s -= 0.01;
                draw( s );
            }, i*10 + 500);
        }
    })
    return component;
}