var Pie = function(name, cfg) {
    var component = new Base(name, cfg);

    var w = cfg.width;
    var h = cfg.height;

    var cns = document.createElement("canvas");

    var ctx = cns.getContext("2d");
    
    // var ratio = getPixelRatio( ctx );
    // ctx.scale(ratio, ratio);

    // cns.style.width = w+ "px";
    // cns.style.height = h + "px";
    // cns.width = w;
    // cns.height = h;
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;

    $(cns).css({"z-index": 1});
    component.append( cns );

    // var n = cfg.data.length;
    var R = w/2;
    var n = cfg.data.length;


   
    //加入底层
    ctx.beginPath();
    ctx.fillStyle = "#eee";
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 1;
    ctx.arc(R, R, R, 0, 2*Math.PI);
    ctx.fill();
    ctx.stroke();

    //绘制数据层
    var cns = document.createElement("canvas");

    var ctx = cns.getContext("2d");
    
    // var ratio = getPixelRatio( ctx );
    // ctx.scale(ratio, ratio);

    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css({"z-index": 2});

    component.append( cns );
    // function polygon(r, n, color ) {

    var A = -Math.PI/2;
    for (var i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.fillStyle = cfg.data[i][2];

        var B = A + cfg.data[i][1]*2*Math.PI;
        var x = R*Math.cos(A);
        ctx.moveTo(R, R);
        ctx.lineTo(R + R*Math.cos(A), R + R*Math.sin(A));
        // ctx.lineTo(w/2 + R*Math.cos(A + B), h/2 + R*Math.sin(A + B))
        ctx.arc(R, R, R, A, B);
        ctx.closePath();

        ctx.fill();
        A = B;

        var text = $('<div class="text">');
        text.text( cfg.data[i][0] );
        var per = $('<div class="per">');
        text.text( cfg.data[i][1]*100 + "%" );

        text.append( per );
        $(cns).append( text ); 

        // var x = r + Math.sin( B )*r;
        // var y = r + Math.cos
    };

    //绘制蒙版层
    // var cns = document.createElement("canvas");
    // $(cns).css({"z-index": 3});
    // component.append( cns );
    // var ctx = cns.getContext("2d");
    
    // var ratio = getPixelRatio( ctx );
    // ctx.scale(ratio, ratio);

    // cns.style.width = w+ "px";
    // cns.style.height = h + "px";
    // cns.width = w*ratio;
    // cns.height = h*ratio;

    // var n = cfg.data.length;
    // var R = 100;
    // ctx.fillStyle = "#eee";
    // ctx.strokeStyle = "#eee";
    // ctx.lineWidth = 1;

    // //生长动画
    // var draw = function(s){
    //     ctx.clearRect(0, 0, w, h)
    //     // var A = 3*Math.PI/2;
    //     // var B = A + 2*Math.PI*s;
    //     ctx.beginPath();

    //     ctx.moveTo(w/2, h/2);
    //     if (s <= 0) {
    //         ctx.arc(w/2, h/2, R, 0, 2*Math.PI);
    //     } else {
    //         ctx.arc(w/2, h/2, R, 0, 2*Math.PI*s, true);
    //     }

    //     ctx.fill();
    //     ctx.stroke();
    // }

    // draw(0);

    component.on("onLoad", function() {
        var s = 0;
        for (var i = 0; i < 100; i++) {
            setTimeout(function(){
                s += .01;
                draw( s );
                 console.log(s)
            }, i*10 + 500);

        }
    })
    component.on("onLeave", function() {
        var s = 1;
        for (var i = 0; i < 100; i++) {
            setTimeout(function(){
                s -= .01;
                draw( s );
            }, i*10 + 500);
        };
    })
    return component;
};