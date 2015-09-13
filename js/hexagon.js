// Hex math defined here: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html

function HexagonGrid(canvasId, radius) {
	this.radius = radius;
	this.height = Math.sqrt(3) * radius;
	this.width = 2 * radius;
    this.side = (3 / 2) * radius;
    
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');

    this.canvasOriginX = 0;
    this.canvasOriginY = 0;
    
    this.canvas.addEventListener("mousedown", this.clickEvent.bind(this), false);
    this.canvas.addEventListener("mousemove", this.moveEvent.bind(this), false);
};

HexagonGrid.prototype.set_radius = function(radius){
	this.radius = radius;
	this.height = Math.sqrt(3) * radius;
	this.width = 2 * radius;
    this.side = (3 / 2) * radius;
};

HexagonGrid.prototype.drawHexGrid = function (rows, cols, originX, originY, isDebug) {
    this.canvasOriginX = originX;
    this.canvasOriginY = originY;
    
    this.grid_width = this.side * cols + this.radius/2 + originX*2;
    this.grid_height =  this.height*rows + originY*2;
    
    this.grid_rows = rows;
    this.grid_cols = cols;


    if (cols > 1) this.grid_height+=this.height/2;
    
 	this.canvas.width = this.grid_width;
    this.canvas.height = this.grid_height;
    $("#scene_wrap").css({width:this.grid_width,height:this.grid_height});
    
    
    
    var currentHexX;
    var currentHexY;
    var debugText = "";

    var offsetColumn = false;

    for (var col = 0; col < cols; col++) {
        for (var row = 0; row < rows; row++) {

            if (!offsetColumn) {
                currentHexX = (col * this.side) + originX;
                currentHexY = (row * this.height) + originY;
            } else {
                currentHexX = col * this.side + originX;
                currentHexY = (row * this.height) + originY + (this.height * 0.5);
            }

            if (isDebug) {
                debugText = col + "," + row;
            }

            this.drawHex(currentHexX, currentHexY, "rgba(0,0,0,0)", debugText);
        }
        offsetColumn = !offsetColumn;
    }
};

HexagonGrid.prototype.drawHexAtColRow = function(column, row, color) {
    var drawy = column % 2 == 0 ? (row * this.height) + this.canvasOriginY : (row * this.height) + this.canvasOriginY + (this.height / 2);
    var drawx = (column * this.side) + this.canvasOriginX;

    this.drawHex(drawx, drawy, color, "");
};

HexagonGrid.prototype.drawHex = function(x0, y0, fillColor, debugText) {
    this.context.strokeStyle = "#000";
    this.context.beginPath();
    this.context.moveTo(x0 + this.width - this.side, y0);
    this.context.lineTo(x0 + this.side, y0);
    this.context.lineTo(x0 + this.width, y0 + (this.height / 2));
    this.context.lineTo(x0 + this.side, y0 + this.height);
    this.context.lineTo(x0 + this.width - this.side, y0 + this.height);
    this.context.lineTo(x0, y0 + (this.height / 2));

    if (fillColor) {
        this.context.fillStyle = fillColor;
        this.context.fill();
    }

    this.context.closePath();
    this.context.stroke();

    if (debugText) {
        this.context.font = "8px";
        this.context.fillStyle = "#000";
        this.context.fillText(debugText, x0 + (this.width / 2) - (this.width/4), y0 + (this.height - 5));
    }
};

//Recusivly step up to the body to calculate canvas offset.
HexagonGrid.prototype.getRelativeCanvasOffset = function() {
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
HexagonGrid.prototype.getSelectedTile = function(mouseX, mouseY) {

	var offSet = this.getRelativeCanvasOffset();

    mouseX -= offSet.x;
    mouseY -= offSet.y;

    var column = Math.floor((mouseX) / this.side);
    var row = Math.floor(
        column % 2 == 0
            ? Math.floor((mouseY) / this.height)
            : Math.floor(((mouseY + (this.height * 0.5)) / this.height)) - 1);


    //Test if on left side of frame            
    if (mouseX > (column * this.side) && mouseX < (column * this.side) + this.width - this.side) {


        //Now test which of the two triangles we are in 
        //Top left triangle points
        var p1 = new Object();
        p1.x = column * this.side;
        p1.y = column % 2 == 0
            ? row * this.height
            : (row * this.height) + (this.height / 2);

        var p2 = new Object();
        p2.x = p1.x;
        p2.y = p1.y + (this.height / 2);

        var p3 = new Object();
        p3.x = p1.x + this.width - this.side;
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
        p5.y = p4.y + (this.height / 2);

        var p6 = new Object();
        p6.x = p5.x + (this.width - this.side);
        p6.y = p5.y;

        if (this.isPointInTriangle(mousePoint, p4, p5, p6)) {
            column--;

            if (column % 2 == 0) {
                row++;
            }
        }
    }

    return  { row: row, column: column };
};


HexagonGrid.prototype.sign = function(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
};


HexagonGrid.prototype.isPointInTriangle = function isPointInTriangle(pt, v1, v2, v3) {
    var b1, b2, b3;

    b1 = this.sign(pt, v1, v2) < 0.0;
    b2 = this.sign(pt, v2, v3) < 0.0;
    b3 = this.sign(pt, v3, v1) < 0.0;

    return ((b1 == b2) && (b2 == b3));
};

HexagonGrid.prototype.clickEvent = function (e) {
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    var localX = mouseX - this.canvasOriginX;
    var localY = mouseY - this.canvasOriginY;

    var tile = this.getSelectedTile(localX, localY);
    
    if (tile.column < 0 || tile.row < 0 || tile.column >= this.grid_cols || tile.row >= this.grid_rows) return false;
    
	var drawy = tile.column % 2 == 0 ? (tile.row * this.height) + this.canvasOriginY + 6 : (tile.row * this.height) + this.canvasOriginY + 6 + (this.height / 2);
	var drawx = (tile.column * this.side) + this.canvasOriginX;

	this.drawHex(drawx, drawy - 6, "rgba(110,110,70,0.3)", "");

    console.log(tile);
};

HexagonGrid.prototype.moveEvent = function (e) {
	var mouseX = e.pageX;
    var mouseY = e.pageY;

    var localX = mouseX - this.canvasOriginX;
    var localY = mouseY - this.canvasOriginY;

    var tile = this.getSelectedTile(localX, localY);
};


function hex_menu(){
	this.radius_input = $("#hex_radius_input");
	this.grid_width_input = $("#hex_grid_width_input");
	this.grid_height_input = $("#hex_grid_height_input");
	this.grid = new HexagonGrid("canvas", 25);
}
//hex_menu.prototype

hex_menu.prototype.get_radius = function(){
	var val = this.radius_input.val();
	val = parseInt(val);
	if (isNaN(val)) val = 25;
	if(val < 5) val = 5; 

	this.radius_input.val(val);
	return val;	
};
hex_menu.prototype.get_grid_width = function(){
	var val = this.grid_width_input.val();
	val = parseInt(val);
	if (isNaN(val)) val = 1;
	if(val < 1) val = 1; 

	this.grid_width_input.val(val);
	return val;		
};
hex_menu.prototype.get_grid_height = function(){
	var val = this.grid_height_input.val();
	val = parseInt(val);
	if (isNaN(val)) val = 1;
	if(val < 1) val = 1; 

	this.grid_height_input.val(val);
	return val;		
};

hex_menu.prototype.draw = function(){
		$("#scene_wrap").show();

		
		this.grid.set_radius( this.get_radius() );
        this.grid.drawHexGrid(this.get_grid_height(), this.get_grid_width(), 10, 10);
        //rows, cols, originX, originY, isDebug

};


$(function(){
	var menu = new hex_menu();

	$("#hex_draw_button").bind("click",function(){ menu.draw();});


//make accordion
	$("dt",".accordion").click(function(){
		$(this).closest(".accordion").find("dd:visible").slideUp();
		$("#menu_tip").empty()
		if( $(this).data("tip")) $("#menu_tip").html( $(this).data("tip") )
		var next = $(this).next("dd").stop(true);
		
		
		next.filter(":visible").slideUp();
		next.filter(":hidden").slideDown();
	});

});