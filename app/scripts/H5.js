var H5 = function(){
    this.id  = ( "h5_"+ Math.random()).replace(".", "_");
    this.el = $('<div class="h5" id="' + this.id + '"></div>').hide();
    this.page = [];
    $("body").append( this.el );

    this.addPage  = function( name, text ) {
        var page = $('<div class = "h5_page section"></div>');
        if ( name != undefined ){
            page.addClass("h5_page_" + name);
        }
        text && page.text(text);

        this.el.append(page);
        this.page.push( page );
        // debugger
        if ( typeof this.whenAddPage === "function") {
            return this.whenAddPage();
        }

        return this;
    }
    this.addComponent = function( name, cfg ) {
        var cfg = cfg || {};

        cfg = $.extend({
            type: "base"
        }, cfg);

        var component;
        var page = this.page.slice(-1)[0];
   
        switch( cfg.type ) {
            case "base":
                component = new Base(name, cfg);
                break;
            case "polyline":
                component = new Polyline(name, cfg);
                break;
            case "pie":
                component = new Pie(name, cfg);
                break;
            case "bar":
                component = new Bar(name, cfg);
                break;
            case "rada":
                component = new Rada(name, cfg);
                break;
            case "point":
                component = new Point(name, cfg);
                break;
        }
        page.append(component);
        return this;

    }

    // H5对象初始化呈现
    this.loader = function(firstPage) {
        this.el.fullpage({
            // "sectionsColor": ["#cc3399", "#00cc99", "#cccc99"],
            onLeave: function(index, nextIndex, dir){
                $(this).find(".h5_component").trigger("onLeave")
            },
            afterLoad: function(anchorLink, index){
                $(this).find(".h5_component").trigger("onLoad")
            }
        })
        this.page[0].find(".h5_component").trigger("onLoad")//载入时触发
        this.el.show();
        if (firstPage) {
            $.fn.fullpage.moveTo( firstPage );
        }
    }
    this.loader = typeof H5_loading == "function" ? H5_loading : this.loader;
    return this;
}