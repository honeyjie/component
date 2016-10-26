var Polyline = function(name, cfg) {
    var component = new Base(name, cfg);

    var w = cfg.width;
    var h = cfg.height;

    var cns = document.createElement("canvas");
    var ctx = cns.getContext("2d");
    
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
  
    component.append( cns );
    var step_y = 10;
    var step_x = cfg.data.length + 1;
    var w1 = w/step_x;
    var h1 = h/step_y;
    

    // function draw( s ) {  

        ctx.clearRect(0, 0, w, h);
         // 画蓝白背景
        ctx.beginPath();
        for (var i = step_y; i >= step_y/2; i--) {
            ctx.fillStyle = (i+1)%2 === 0 ? "#d2e2ff" : "#ffffff";
            ctx.fillRect(w1, i*h1, w-2*w1, h1);
        }
        ctx.closePath();

        //画背景格子
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#ebebeb";

        for (var i = step_y; i >= step_y/2; i--) {
            var y = (h/step_y)*i;
            ctx.moveTo(w1, y);
            ctx.lineTo(w-w1, y);
        }
      
        for (var i = step_x -1; i >0; i--) {
            var x = (w/step_x)*i;
            ctx.moveTo(x, h);
            ctx.lineTo(x, h/2);
        }
        ctx.stroke(); 
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#AAA";

        ctx.stroke();



    var cns = document.createElement("canvas");
    var ctx = cns.getContext("2d");
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append( cns );

    var draw = function( s ){
        ctx.clearRect(0,0,w,h);
        //画阴影
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 178, 178, 0.7)";
        ctx.moveTo(w1, h);
        $.each( cfg.data, function(i, el){
             var x = (i+1)*w1;
             var y = h - cfg.data[i][1]*h*s;
             ctx.lineTo(x, y)
        })
        ctx.lineTo( w - w1, h);
        ctx.fill(); 
        //连线圆
        ctx.beginPath();
        ctx.strokeStyle = "#ff8878";

        $.each( cfg.data, function(i, el){
             var x = (i+1)*w1;
             var y = h - cfg.data[i][1]*h*s;
             ctx.lineTo(x, y);
        })
        ctx.stroke();
        //写百分比文字
        ctx.beginPath();
        ctx.fillStyle = "#595959";
        $.each( cfg.data, function(i, el){
             var x = (i+1)*w1;
             var string = cfg.data[i][1]*100 + "%";
             var y = h - cfg.data[i][1]*h*s;
             ctx.font = "normal 9px";
             ctx.textAlign = "center";
             ctx.fillText( string, x, y - 9);
        })
        ctx.fill();

        //绘制圆点
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#ff8878";
        ctx.fillStyle = "#ffffff";

        $.each( cfg.data, function(i, el){
            var x = (i+1)*w1;
            var y = h - cfg.data[i][1]*h*s;
            ctx.moveTo(x,y);
             ctx.arc(x, y, 3, 0, 2*Math.PI);
        })
        ctx.stroke();
        ctx.fill();
    };

    $.each( cfg.data, function( i, el) {
        var text = $('<div class="text"></div>');
        text.text( cfg.data[i][0] );
        text.css({"width": w1/2, "left": w1/2*i + w1/4, "bottom": -20});
        component.append( text );
    })

   

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
            }, i*10);
        }
    })
    return component;
}