"use strict";
function log(){Function.prototype.apply.apply(console.log, [console, arguments]);}

window.game = {
	hexSet : function(radius){
		this.hexRadius = radius;
		this.hexRadiusHalf = this.hexRadius/2; 
		this.hexWidth = this.hexRadius*2;
		this.hexSide = this.hexRadius*1.5;
		this.hexHeight = Math.sqrt(3)*this.hexRadius;
		this.hexHeightHalf = this.hexHeight/2;
	},
	hexDraw: function(arg){
		var ctx = this.context[arg.context];
		var x = arg.x;
		var y = arg.y;
		var border = arg.border || [true,true,true,true,true,true];
		var draw = arg.draw || false;
		var text = arg.text || false;
		
		ctx.moveTo(x-this.hexRadiusHalf,y+this.hexHeightHalf); //BL
		
		if (border[0]) ctx.lineTo(x-this.hexRadius,y); //CL
		else ctx.moveTo(x-this.hexRadius,y); //CL
		if (border[1]) ctx.lineTo(x-this.hexRadiusHalf,y-this.hexHeightHalf); //TL
		else ctx.moveTo(x-this.hexRadiusHalf,y-this.hexHeightHalf); //TL
		if (border[2]) ctx.lineTo(x+this.hexRadiusHalf,y-this.hexHeightHalf); //TR
		else ctx.moveTo(x+this.hexRadiusHalf,y-this.hexHeightHalf); //TR
		if (border[3]) ctx.lineTo(x+this.hexRadius,y); //CR
		else ctx.moveTo(x+this.hexRadius,y); //CR
		if (border[4]) ctx.lineTo(x+this.hexRadiusHalf,y+this.hexHeightHalf); //BR
		else ctx.moveTo(x+this.hexRadiusHalf,y+this.hexHeightHalf); //BR
		if (border[5]) ctx.lineTo(x-this.hexRadiusHalf,y+this.hexHeightHalf); //BL
		
		if (text) ctx.fillText(text, x, y);
	},
	hexGetIndexByPoint: function (x,y){
		var ci = Math.floor(x/this.hexSide);
		var cx = x - this.hexSide*ci;
		var ty = y - (ci % 2) * this.hexHeight / 2;
		var cj = Math.floor(ty/this.hexHeight);
		var cy = ty - this.hexHeight*cj;

		if (cx > Math.abs(this.hexRadius / 2 - this.hexRadius * cy / this.hexHeight)) {
			var hexX = ci+1;
			var hexY = cj+1;
        } else {
			var hexX = ci;
			var hexY = 1+ cj + (ci % 2) - ((cy < this.hexHeight / 2) ? 1 : 0);
		}
		if (hexX < 1 || hexX > this.gridWidth) hexX = 0;
		if (hexY < 1 || hexY > this.gridHeight) hexY = 0;
		var obj = (hexX == 0 || hexY == 0 ) ? false : {x:hexX,y:hexY};
		
		return obj;		
	},
	gridDraw: function(context,align){
		var x = this.hexRadius;
		var xStart = x;
		var y = this.hexHeightHalf;
		var ctx = this.context[context];
		var margin = 0;

		for (var row=1;row<=this.gridHeight;row++){
			for (var col=1;col<=this.gridWidth;col++){
				this.hexDraw({
					context: context,
					x: x,
					y: (col%2) ? y : y+ this.hexHeightHalf,
					text: col+"-"+row,
					border: [
						col == 1 || (row == this.gridHeight && col%2 != 1),
						col == 1 || (col%2 && row == 1 ),
						row == 1,
						true,
						true,
						true
					]
				});
				x+=this.hexSide+margin;
			}
			x=xStart;
			y+=this.hexHeight+margin;
			
		}
		ctx.stroke();
	},
	init: function(obj){
		this.hexSet(obj.hexRadius || 20);
		this.gridWidth = obj.gridWidth || 10;
		this.gridHeight = obj.gridHeight || 10;
		
		this.wrap = (document.getElementById(obj.wrap) != null)
			? document.getElementById(obj.wrap)
			:document.body.appendChild(document.createElement('div'));
		this.wrap.width = obj.fieldWidth || 1000;
		this.wrap.height = obj.fieldHeight || 900;
		this.wrap.style.width = this.wrap.width+'px';
		this.wrap.style.height = this.wrap.height+'px';
		
		this.canvas = {
			grid : (document.getElementById(obj.canvasGrid) != null)
			? document.getElementById(obj.canvasGrid)
			: this.wrap.appendChild(document.createElement('canvas')),
		};
		this.canvas.grid.width = this.wrap.width;
		this.canvas.grid.height = this.wrap.height;	
		
		this.context = {
			grid : this.canvas.grid.getContext('2d')
		};
		this.context.grid.fillStyle = "#00F";
		this.context.grid.strokeStyle = "rgba(0,0,0,0.5)";
		this.context.grid.font = "italic 12px Arial";
		this.context.grid.textBaseline = 'middle';
		this.context.grid.textAlign = "center";

		this.gridDraw('grid');
	}
};


$(function(){
	game.init({
		wrap  : 'hexWrap',
		canvasGrid : 'hexGrid',
		hexRadius: 30,
		gridWidth: 15,
		gridHeight: 15,
		fieldWidth: 1500,
		fieldHeight: 1000,
	});
	
	$('#hexWrap').bind('click',function(e){
		var obj = game.hexGetIndexByPoint(e.offsetX,e.offsetY);
		if (obj) {
			var x = obj.x;
			var y = obj.y;
			var html = 'X: '+x+'<br>Y: '+y;
		} else var html = 'За пределами!';
		
		$('#info').html(html);
		
	});
	
	$(window).bind('keydown',function(e){
		log(e)
		if (e.keycode == 37) {
			var ctx = game.context.grid;
			ctx.translate(120,0);
			
		}
	});

});
