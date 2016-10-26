var Pie = function(name, cfg) {
    var component = new Base(name, cfg);
    var w = cfg.width;
    var h = cfg.height;
    var R = w/2;
    var n = cfg.data.length;
    var width = document.documentElement.ClientWidth;
    var Height = document.documentElement.ClientH

    var cns = document.createElement("canvas");
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css({"z-index": 1});
    component.append( cns );

    draw = function ( s ){
        var A = -Math.PI/2;
        for (var i = 0; i < n; i++) {
            ctx.beginPath();
            ctx.fillStyle = cfg.data[i][2];

            var B = A + cfg.data[i][1]*2*Math.PI;
            var x = R*Math.cos(A);
            ctx.moveTo(R, R);
            ctx.lineTo(R + R*Math.cos(A), R + R*Math.sin(A));
            ctx.arc(R, R, R, A, B);
            ctx.closePath();

            ctx.fill();
            A = B;
         };

        ctx.beginPath();
        ctx.fillStyle = "#eee";
        ctx.moveTo(R, R);
        ctx.arc(R, R, R, -Math.PI/2, -Math.PI/2 - 2*Math.PI*s, true);
        ctx.closePath();
        ctx.fill();
    };

    draw(1);

    var A = Math.PI/2;
    for (var i = 0; i < n; i++) { 
        var B = A - cfg.data[i][1]*2*Math.PI;
        var name = $('<div class = "name" style = "color:' + cfg.data[i][2] + '">' + cfg.data[i][0] + '</div>');
        var per = $('<div class = "per" style = "color:' + cfg.data[i][2] + '">'+ cfg.data[i][1]*100 + '%</div>');
        var x = R + Math.cos(B)*R;
        var y = R - Math.sin(B)*R;
        
        if ( x > R) {
            name.css({"left": x/2})
        } else {
            name.css({"right": (w - x)/2});
        }
         if ( y > R) {
            name.css({"top": y/2})
        } else {
            name.css({"bottom": (h - y)/2})
        }
        name.css({"transition": "all 0.5" + .2*i + "s"});
        component.append( name );
        name.append( per );
         A = B;
    }
 


    component.on("onLoad", function() {
        var s = 1;
        for (var i = 0; i < 100; i++) {
             
            setTimeout(function(){
                 s = s - 0.01;
                 // console.log(s.toFixed(2))
                 draw( s );
            }, i*10 + 100);

        }
    })
    component.on("onLeave", function() {
        var s = 0;
        for (var i = 0; i < 100; i++) {
             
            setTimeout(function(){
                s = s + 0.01;  
                draw( s );
            }, i*10 + 100);
        };
    })
    return component;

};
