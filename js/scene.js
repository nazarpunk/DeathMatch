"use strict";
function log(){Function.prototype.apply.apply(console.log, [console, arguments]);}

(function($){
  
  var o = $({});
  
  $.subscribe = function() {
    o.bind.apply( o, arguments );
  };
  
  $.unsubscribe = function() {
    o.unbind.apply( o, arguments );
  };
  
  $.publish = function() {
    o.trigger.apply( o, arguments );
  };
  
})(jQuery);

window.pageX = 0;
window.pageY = 0;
$(document).bind("mousemove",function(e){
	pageX = e.pageX;
	pageY = e.pageY;
});

function scene(id,opt){
	var idArr = id.replace("#","").split(".");	
	this.id = idArr[0];
	this.namespace = idArr[1] || false;
	
	var opt = opt || {};

	this.container = $("#"+this.id).css("position","relative").empty();
	if (this.container.length == 0) console.log("#"+this.id+" not find");
	
	this._default = {
		widthHex : 50,
		widthHexVisible : 50,
		heightHex : 50,
		heightHexVisible : 50,
		hexRadius: 25,
		offsetLeft: 0,
		offsetTop : 0,
		offsetRight : 0,
		offsetBottom: 0
	};
	this._layers = {};
	
	this._param = $.extend({},this._default,opt);
	if (this.namespace) $.publish("init."+this.namespace);
	return this;
}

scene.prototype.layer = function(id,method){
	var idArr = id.split(/\s+/);
	var l = idArr.length;
	var obj = {}
	for(var i=0;i<l;i++){

		var layerId = idArr[i].match(/^(\w+)/i)[0];
		var zIndex = idArr[i].match(/#(\d+)/i) ;
		if (zIndex != null) zIndex = zIndex[1];
		
		//if (this._layers[m[0]] == undefined) this._layerCreate(m);
		obj[layerId] = {
			zIndex : zIndex,
		}; 
		
	}
	log(obj)
		
	return new this._layer(this,id,method);
};


scene.prototype.position = function(){
	log(this.canvas,"layer");
	return this;
};

scene.prototype._layer = function(parent,id){
	this.parent = parent;
	this.id = id;
	return this.parent;
};

scene.prototype._layer.prototype.grid = function(){
	
};



scene.prototype.layMath = function(id){
	var container = this.container;
	var layerId = this.id +"_"+id.replace("#","");
	if (typeof this._layer[layerId] !== "undefined"){
		this.canvas = this._layer[layerId].canvas;
		this.context = this._layer[layerId].context;
		//if (zIndex) this.canvas.css("z-index",zIndex);
		return this;
	}
	
	if(!zIndex) zIndex = 1;
	$("<canvas>").attr("id",layerId).appendTo(container).css({"position":"absolute","top":0,"left":0,"z-index":zIndex});
	this.canvas = document.getElementById(layerId);
	this.context = this.canvas.getContext('2d'); 
	
	this._layer[layerId] = {
		canvas : this.canvas,
		context : this.context 
	};
	this.setSize();
	return this;
};


scene.prototype.math = {};
scene.prototype.math.getVal = function(val,min,max){
	var val = parseInt(val,10);
	if (isNaN(val)) return false;
	if (min) if (val <= min) val = min;
	if (max) if (val >= max) val = max;
	return val;
}; 
scene.prototype.setSize = function(id,param){
	var id = "#"+this.id;
	$(id+","+id+" canvas")
		.attr({"width":this._param.widthPx, "height":this._param.heightPx})
		.css({"width":this._param.widthPx, "height":this._param.heightPx});
};


scene.prototype.param = function(opt) {
	var getVal = this.math.getVal;
	if (!opt) var opt = {};

	this._param.widthHex = getVal(opt.widthHex,1) || this._default.widthHex;
	this._param.widthHexVisible =  (this._default.widthHexVisible < this._param.widthHex) 
		? this._default.widthHexVisible : this._param.widthHex;
	this._param.heightHex = getVal(opt.heightHex,1) || this._default.heightHex;
	this._param.heightHexVisible = (this._default.heightHexVisible < this._param.heightHex)
		? this._default.heightHexVisible : this._param.heightHex;
	this._param.hexRadius = getVal(opt.hexRadius,1) || this._default.hexRadius;
	this._param.offsetLeft = getVal(opt.offsetLeft,0) || this._default.offsetLeft;
	this._param.offsetTop = getVal(opt.offsetTop,0) || this._default.offsetTop;
	this._param.offsetRight = getVal(opt.offsetRight,0) || this._default.offsetRight;
	this._param.offsetBottom = getVal(opt.offsetBottom,0) || this._default.offsetBottom;

	this._param.hexHeight = Math.sqrt(3) * this._param.hexRadius;
	this._param.hexWidth = 2 * this._param.hexRadius;
    this._param.hexSide = (3 / 2) * this._param.hexRadius;
    
    this._param.widthPx = this._param.hexSide * this._param.widthHexVisible + this._param.hexRadius/2  + this._param.offsetRight + this._param.offsetLeft; 
    this._param.heightPx = this._param.hexHeight * this._param.heightHexVisible + this._param.offsetTop + this._param.offsetBottom;
    if (this._param.heightHex > 1 || (this._param.heightHex == 1 & this._param.widthHex > 1)) this._param.heightPx += this._param.hexHeight/2;
   
	this.setSize(); 
	return this;	
};


scene.prototype.drawGrid = function (colorHex,colorBorder) {
	if (typeof this.context === "undefined") {
		console.error(this, "no layer selected");
		return this;
	}
	
	
    var currentHexX;
    var currentHexY;
    var debugText = "";
     
    var offsetColumn = false;
    

    for (var col = 0; col < this._param.widthHexVisible; col++) {
        for (var row = 0; row < this._param.heightHexVisible; row++) {

            if (!offsetColumn) {
                currentHexX = (col * this._param.hexSide) + this._param.offsetLeft;
                currentHexY = (row * this._param.hexHeight) + this._param.offsetTop;
            } else {
                currentHexX = col * this._param.hexSide + this._param.offsetLeft;
                currentHexY = (row * this._param.hexHeight) + this._param.offsetTop + (this._param.hexHeight * 0.5);
            }
           
			debugText = row + "," + col;

            this.drawHex(currentHexX, currentHexY, "#ddd","#fff", debugText);
        }
        offsetColumn = !offsetColumn;
    }
	return this;
};

scene.prototype.drawHex = function(x0, y0, colorHex, colorBorder, debugText) {
    this.context.strokeStyle = colorBorder;
    this.context.beginPath();
    this.context.moveTo(x0 + this._param.hexWidth - this._param.hexSide, y0);
    this.context.lineTo(x0 + this._param.hexSide, y0);
    this.context.lineTo(x0 + this._param.hexWidth, y0 + (this._param.hexHeight / 2));
    this.context.lineTo(x0 + this._param.hexSide, y0 + this._param.hexHeight);
    this.context.lineTo(x0 + this._param.hexWidth - this._param.hexSide, y0 + this._param.hexHeight);
    this.context.lineTo(x0, y0 + (this._param.hexHeight / 2));

    if (colorHex) {
        this.context.fillStyle = colorHex;
        this.context.fill();
    }

    this.context.closePath();
    this.context.stroke();

    if (debugText) {
        this.context.font = "8px";
        this.context.fillStyle = "#000";
        this.context.fillText(debugText, x0 + (this._param.hexWidth / 2) - (this._param.hexWidth/4), y0 + (this._param.hexHeight - 5));
    }
};

scene.prototype.drawHexAtColRow = function(x, y, color) {
	var column = y;
	var row = x;
    var drawy = column % 2 == 0 ? (row * this.hexHeight) + this.offsetTop : (row * this.hexHeight) + this.offsetTop + (this.hexHeight / 2);
    var drawx = (column * this.hexSide) + this.offsetLeft;

    this.drawHex(drawx, drawy, color, "");
};

scene.prototype.mouseMoveEvent = function(){
	var sc = this;
    var localX = pageX - sc.offsetLeft;
    var localY = pageY - sc.offsetTop;
    var tile = sc.getSelectedTile(localX, localY);
    //log(tile);
};



//Recusivly step up to the body to calculate canvas offset.
scene.prototype.getRelativeCanvasOffset = function() {
	var x = 0, y = 0;
	var layoutElement = this.canvas;
    if (layoutElement.offsetParent) {
        do {
            x += layoutElement.offsetLeft;
            y += layoutElement.offsetTop;
        } while (layoutElement = layoutElement.offsetParent);
        
        return { x: x, y: y };
    }
};

//Uses a grid overlay algorithm to determine hexagon location
//Left edge of grid has a test to acuratly determin correct hex
scene.prototype.getSelectedTile = function(mouseX, mouseY) {


	var offSet = this.getRelativeCanvasOffset();
	

    mouseX -= offSet.x;
    mouseY -= offSet.y;

    var column = Math.floor((mouseX) / this.hexSide);
    var row = Math.floor(
        column % 2 == 0
            ? Math.floor((mouseY) / this.hexHeight)
            : Math.floor(((mouseY + (this.hexHeight * 0.5)) / this.hexHeight)) - 1);

    //Test if on left side of frame            
    if (mouseX > (column * this.hexSide) && mouseX < (column * this.hexSide) + this.hexWidth - this.hexSide) {


        //Now test which of the two triangles we are in 
        //Top left triangle points
        var p1 = new Object();
        p1.x = column * this.hexSide;
        p1.y = column % 2 == 0
            ? row * this.hexHeight
            : (row * this.hexHeight) + (this.hexHeight / 2);

        var p2 = new Object();
        p2.x = p1.x;
        p2.y = p1.y + (this.hexHeight / 2);

        var p3 = new Object();
        p3.x = p1.x + this.hexWidth - this.hexSide;
        p3.y = p1.y;

        var mousePoint = new Object();
        mousePoint.x = mouseX;
        mousePoint.y = mouseY;

        if (this.isPointInTriangle(mousePoint, p1, p2, p3)) {
            column--;

            if (column % 2 != 0) {
                row--;
            }
        }

        //Bottom left triangle points
        var p4 = new Object();
        p4 = p2;

        var p5 = new Object();
        p5.x = p4.x;
        p5.y = p4.y + (this.hexHeight / 2);

        var p6 = new Object();
        p6.x = p5.x + (this.hexWidth - this.hexSide);
        p6.y = p5.y;

        if (this.isPointInTriangle(mousePoint, p4, p5, p6)) {
            column--;

            if (column % 2 == 0) {
                row++;
            }
        }
    }

    return  { x: row, y: column };
};

scene.prototype.sign = function(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
};

//Replace with optimized barycentric coordinate method
scene.prototype.isPointInTriangle = function isPointInTriangle(pt, v1, v2, v3) {
    var b1, b2, b3;

    b1 = this.sign(pt, v1, v2) < 0.0;
    b2 = this.sign(pt, v2, v3) < 0.0;
    b3 = this.sign(pt, v3, v1) < 0.0;

    return ((b1 == b2) && (b2 == b3));
};

scene.prototype.clickEvent = function (e) {
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    var localX = mouseX - this.canvasOriginX;
    var localY = mouseY - this.canvasOriginY;

    var tile = this.getSelectedTile(localX, localY);
    if (tile.column >= 0 && tile.row >= 0) {
        var drawy = tile.column % 2 == 0 ? (tile.row * this.height) + this.canvasOriginY + 6 : (tile.row * this.height) + this.canvasOriginY + 6 + (this.height / 2);
        var drawx = (tile.column * this.side) + this.canvasOriginX;

        this.drawHex(drawx, drawy - 6, "rgba(110,110,70,0.3)", "");
    }
    //log(this.getSelectedTile(localX, localY))
};

scene.prototype.moveEvent = function (e) {
	var mouseX = e.pageX;
    var mouseY = e.pageY;

    var localX = mouseX - this.canvasOriginX;
    var localY = mouseY - this.canvasOriginY;

    var tile = this.getSelectedTile(localX, localY);
};