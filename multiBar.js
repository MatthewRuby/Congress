function MultiBar(g, x, y, w, h){

	var posX = x;
	var posY = y;	
	var width = w;
	var height = h;
	
	var name = "";
	
	var section = 0;
	var value = 0;

	var committees = new Array;
	this.num = 0;
	
	var sectX = new Array;
	var sectY = new Array;
	this.bOver = new Array;
	
	this.code = [];
	
	var mx;
	var my;
	
	var r = 0;
	var endR = 0;
	var b = 0;
	var endB = 0;
	var alpha = [];
	var color = [];
	
	for(var i = 0; i < committees.length; i++){
		alpha[i] = 0.65;
		color[i] = "rgba("+ r +",0,"+ b +",0.65)";
	}
	
	this.set = function(value, color, n){
		name = n;
		committees = value;
		section = width / 10;

		this.num = committees.length;

		for(var i = 0; i < committees.length; i++){
			sectX[i] = posX + (i * section);
			sectY[i] = posY;
			this.bOver[i] = false;
			alpha[i] = 0.65;
			
			this.code[i] = committees[i].code;
		}

		if(color == 'r'){
			endR = 255;
			endB = 0;
		} else {
			endR = 0;
			endB = 255;
		}
		
	};

	this.update = function(){
		
		if(Math.abs(r - endR) > 1.0){
			r = Math.floor(ease(r, endR, 0.1));
		}
		
		if(Math.abs(b - endB) > 1.0){
			b = Math.floor(ease(b, endB, 0.1));
		}
		
		for(var i = 0; i < committees.length; i++){
			if(this.bOver[i] == true){
				alpha[i] = ease(alpha[i], 0.35, 0.25);
			} else {
				alpha[i] = ease(alpha[i], 0.65, 0.25);
			}
		}
		
		for(var i = 0; i < committees.length; i++){
		 	color[i] = "rgba("+ r +",0,"+ b +"," + alpha[i] + ")";
		}
		
	};

	this.draw = function(){

		for(var i = 0; i < committees.length; i++){
			g.fillStyle = color[i];
			g.fillRect(sectX[i], sectY[i], section - 4, height);
			
		}
		
		g.fillStyle = "rgba(0,0,0,0.65)";
		g.fillText(name, 10, posY + height + (height/2));

		for(var i = 0; i < committees.length; i++){
			
			if(this.bOver[i] == true){

				var w = committees[i].name.length * (height/5);
				
				var offset;
				
				if(mx < w / 2){
					offset = mx - (w / 2);
				} else {
					offset = 0;
				}
				
				var x = mx - offset;
				var y = my - 10;
				
				g.save();
			    g.translate(x, y);

				g.fillStyle = "rgba( 0, 0, 0, 0.8)";
				g.fontWeight = "bold";
				g.textAlign = "center";
				g.font = height/3 + "px helvetica-bold";
				g.fillText(committees[i].name, 0, 0);
			    g.restore();
			
			}

		}
		
	};
	
	this.mouseOver = function(mouseX, mouseY, down) {

		var mousePressed = down;

		for(var i = 0; i < committees.length; i++){
			
			if (mouseX > sectX[i] &&
				mouseX < sectX[i] + (section - 4) &&
				mouseY > sectY[i] &&
				mouseY < sectY[i] + height) {

				this.bOver[i] = true;
				mx = mouseX;
				my = mouseY;
			
			} else {

				this.bOver[i] = false;
			
			}
			
		}
		
    };
	
}