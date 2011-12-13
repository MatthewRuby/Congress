function TextBlock(g, x, y, width, text){

	this.pos_x = x;
	this.pos_y = y;
	var lines = [];
	
	this.width = width;
	this.height;

	var lineSize = 0;
	
	this.fontSize = 10;
	
	
	g.font = this.fontSize + "px helvetica-bold";
	lineSize = g.measureText(text);
	
	var div = this.width / lineSize.width;
	this.height = div * this.fontSize;
	
	
	
	this.update = function(x, y){
		this.pos_x = x
		this.pos_y = y;
	};
	
	this.draw = function(){
		g.fillStyle = "rgba(255,255,255,0.65)";
		g.font = this.height + "px helvetica-bold";
		g.fillText(text, this.pos_x, this.pos_y);

		
	};

};