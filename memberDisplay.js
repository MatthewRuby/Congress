function MemberDisplay(g, x, y){
	var that = this;
	
	var posX = x;
	var posY = y;
	
	var bHouse = false;
	this.bHide = true;

	this.bOver = [];

	var bar = [];
	for(var i = 0; i < 6; i++){
		bar[i] = new Bar(g, 0, i * 50, 800, 50, i);
	}

	var multi = new MultiBar(g, 0, 310, 800, 50);
	
	this.set = function(data){
		
		var labels = ["age", "years served", "bills sponsored", "bills co-sponsored", "missed vote percent", "votes with party percent", "current committees"];
		
		for(var i = 0; i < 6; i++){
			bar[i].set(data[i], data[i], data[10], labels[i]);
		}
		
		if(data[11] == "house"){
			bHouse = true;
			multi.set(data[6], data[10], labels[6]);
		} else {
			bHouse = false;
			multi.set(0, 0, 0);
		}
		
		for(var i = 0; i < 6 + multi.num; i++){
			this.bOver[i] = false;
		}
		
		name = data[7] + " " + data[8] + " - " + data[9];
	};
	
	this.update = function(){
		for(var i = 0; i < 6; i++){
			bar[i].update();
		}
		
		if(bHouse == true){
			multi.update();
		}
	};
	
	this.draw = function(){
		if(this.bHide == false){
			
			g.save();
			g.translate(posX, posY);
			
			g.font = "25px helvetica";
			g.fillStyle = "rgba(0,0,0,0.65)";
			g.fillText(name, 5, -5);

			for(var i = 0; i < 6; i++){
				bar[i].draw();
				bar[i].drawText();
			}
			
			if(bHouse == true){
				multi.draw();
			}

			g.restore();
		}
	};
	
	this.mouseOver = function(x, y, d){
		
		var conX = x - posX;
		var conY = y - posY;
		multi.mouseOver(conX, conY, d);
		for(var i = 0; i < 6; i++){
			bar[i].mouseOver(conX, conY, d);

			if(bar[i].bOver == true){
				this.bOver[i] = true;
			} else{
				this.bOver[i] = false;
			}
				
		}
		
		for(var i = 0; i < multi.num; i++){
			if(multi.bOver[i] == true){
				this.bOver[i + 6] = true;
				
			} else{
				this.bOver[i + 6] = false;
			}
		}
		
		
	};
	
}