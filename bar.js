function Bar(g, x, y, w, h, id){

	this.id = id;
	var posX = x;
	var posY = y;
		
	this.width = 0;
	var max = w;
	var height = h;
	
	this.bOver = false;

	var name = "";
	var label = "";
	var goal = 0;
	var value = 0;
	
	var r = 0;
	var endR = 0;
	var b = 0;
	var endB = 0;
	var alpha = 0.65;
	var color = "rgba(0,0,0,0.65)";
	
	this.set = function(value, raw_value, color, n){
		name = n;
		label = raw_value;
		goal = value;
		
		if(color == 'r'){
			endR = 255;
			endB = 0;
		} else {
			endR = 0;
			endB = 255;
		}
		
	};

	this.update = function(){

		if(Math.abs(value - goal) > 1.0){
			value = ease(value, goal, 0.1);
		}

		this.width = value * (max / 200);
		if(this.width > max){
			this.width = max;
		}

		if(Math.abs(r - endR) > 1.0){
			r = Math.floor(ease(r, endR, 0.1));
		}
		
		if(Math.abs(b - endB) > 1.0){
			b = Math.floor(ease(b, endB, 0.1));
		}
		
		if(this.bOver == true){
			alpha = ease(alpha, 0.35, 0.25);
		} else {
			alpha = ease(alpha, 0.65, 0.25);
		}
		
		color = "rgba("+ r +",0,"+ b +"," + alpha + ")";		
		
	};
			
	this.draw = function(){

		g.fillStyle = color;
		g.fillRect(posX, posY, this.width, height);

	};

	this.drawText = function(){

		g.font = height/2 + "px helvetica";
		g.fillStyle = "rgba(0,0,0," + alpha + ")";
		g.fillText(name, posX + this.width + 5, posY + (height/2) - 4);
		g.fillText(label, posX + this.width + 5, posY + height - 4);
	
	};
	
	this.mouseOver = function(x, y, d) {

		var mousePressed = d;
			
		if (x > posX &&
			x < posX + this.width + 80 &&
			y > posY &&
			y < posY + height) {

			this.bOver = true;
		
		} else {

			this.bOver = false;
		
		}
		
    };
	
}