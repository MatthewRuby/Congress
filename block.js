function Block(g, x, y, width, text){

	this.pos_x = x;
	this.pos_y = y;
	
	this.width = width;
	this.bOver = false;
	
	var position = text.position;
	this.title = text.title;
	this.bMultiLine = false;
	
	var titleWords = this.title.split(" ");
	this.lines = [];
	
	if(titleWords.length > 12){
		
		this.bMultiLine = true;
		
		for(var i = 0; i < Math.ceil(titleWords.length / 8); i++){
			
			this.lines[i] = "";
			
			for(var j = 0; j < 8; j++){
				
				if(i * 8 + j < titleWords.length){
					
					this.lines[i] += titleWords[i * 8 + j] + " ";
					
				}
				
			}
			
		}
		
	} else {
		this.bMultiLine = false;
	}
	
	var alpha = 0.85;
	var color = "rgba(100,100,100,0.85)";
	
	if(position.toUpperCase() == "YES"){
		color = "rgba(0,255,0,0.85)";
	} else {
		color = "rgba(255,127,0,0.85)";
	}
	
	this.update = function(x, y){
		this.pos_x = x
		this.pos_y = y;
		
		if(this.bOver == true){
			alpha = ease(alpha, 0.25, 0.25);
		} else {
			alpha = ease(alpha, 0.85, 0.25);
		}
		
		if(position.toUpperCase() == "YES"){
			color = "rgba(0,255,0," + alpha + ")";
		} else {
			color = "rgba(255,127,0," + alpha + ")";
		}

	};
	
	this.draw = function(){
		
		g.font = "12px helvetica-bold";
		var y_n = position.toUpperCase()
		
		var m = g.measureText(y_n);
		var fontsize = 8 * (1 + (this.width / m.width));
		
		g.fillStyle = color;
		g.font = fontsize + "px helvetica-bold";
		g.fillText(position.toUpperCase(), this.pos_x, this.pos_y + (this.width/2) + (fontsize/2) );
	};
	
	this.mouseOver = function(mouseX, mouseY, down) {

		if (mouseX > this.pos_x &&
			mouseX < this.pos_x + this.width &&
			mouseY > this.pos_y &&
			mouseY < this.pos_y + this.width) {

			this.bOver = true;

		} else {

			this.bOver = false;
		
		}
		
    };

};