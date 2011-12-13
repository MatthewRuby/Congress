function DetailBox(g, x, y, w){

	this.posX = x;
	this.posY = y;
	
	this.width = 0;
	this.height = 0;
	var fullWidth = w;
	var fullHeight = 0;
	
	var bShow = false;
	var prevBShow = false;
	var bIn = true;

	var data = null;
	
	var textBox = [];
	var block = [];
	var layout = 0;
	var style = "line";
	this.label = "label";
	
	var mouseX = 0;
	var mouseY = 0;

	this.set = function(x, y, d, show, type){
		bShow = show;
		if(bShow == true){
			this.posX = x;
			this.posY = y;
		}
		data = d;
		
		fullHeight = 0;

		style = type;
		if(style == "box"){
			
			layout = Math.ceil(Math.sqrt(data.length));
			
			var size = fullWidth / layout;
			fullHeight = size * layout;
			
			for(var y = 0; y < layout; y++){
				for(var x = 0; x < layout; x++){
					if(y * layout + x < data.length){
						block[y * layout + x] = new Block(g, x * size, y * size, size, data[y * layout + x]);
					}
				}
			}
			
		} else {
			for(var i = 0; i < data.length; i++){
				textBox[i] = new TextBlock(g, this.posX, this.posY, fullWidth, data[i]);
				fullHeight += textBox[i].height + 5;
			}
			fullHeight += 20;
		}
				

	};
	

	this.update = function(){
		
		if(bShow == true && prevBShow == false){
			bIn = true;
		}
		if(bShow == false){
			bIn = false;
		}

		if(bIn == true){
			this.width = ease(this.width, fullWidth, 0.1);
			this.height = ease(this.height, fullHeight, 0.1);			
		}
		if(bIn == false){
			this.width = ease(this.width, 0, 0.5);
			this.height = ease(this.height, 0, 0.5);
		}
		
		if(style == "box"){
			this.posX = ease(this.posX, 1024 - fullWidth/2, 0.1);
			this.posY = ease(this.posY, fullHeight/2, 0.1);
		} else {
			this.posX = ease(this.posX, 1024 - fullWidth/2, 0.1);
			this.posY = ease(this.posY, 768/2, 0.1);
		}
	
		
		if(data != null){
			
			if(style == "box"){

				for(var y = 0; y < layout; y++){
					for(var x = 0; x < layout; x++){
						
						var _x = (this.posX - this.width / 2) + (x * (fullWidth / layout));
						var _y = (this.posY - this.height / 2) + (y * (fullWidth / layout));
						
						if(y * layout + x < data.length){
							block[y * layout + x].update(_x, _y);
						}
					}
				}

			} else {
					
				var lineHeight  = 0;
				for(var i = 0; i < data.length; i++){

					lineHeight += textBox[i].height + 5;
					textBox[i].update(this.posX - this.width / 2 , this.posY - this.height / 2 + lineHeight + 10);

				}
				
			}

		}

		prevBShow = bShow;

	};
	
	
	this.draw = function(){
		if(this.width > 2 || this.height > 2){
			g.fillStyle = "rgba(0,0,0,0.85)";
			g.fillRect(this.posX - this.width/2, this.posY - this.height/2, this.width, this.height);

			g.fillStyle = "rgba(0,0,0,0.85)";
			g.font = "18px helvetica-bold";
			g.fillText(this.label, this.posX - this.width/2, this.posY + this.height/2 + 20);
			
			if(data != 0){
				
				if(style == "box"){

					for(var i = 0; i < block.length; i++){
						block[i].draw();						
					}
					
					for(var i = 0; i < block.length; i++){
						
						if(block[i].bOver == true){
							
							var text_x = mouseX;
							var text_y = mouseY;
							
							g.fillStyle = "rgba(255,255,255,1.0)";
							g.font = "14px helvetica-bold";
							
							if(block[i].bMultiLine == true){
								var textwidth = g.measureText(block[i].lines[0]);

								if(mouseX + textwidth.width > 1024){
									text_x = 1024 - textwidth.width
								} else {
									text_x = mouseX;
								}
								
								var numLines = block[i].lines.length;
								
								if(mouseY - (48 + (numLines * 16) + 5) < 0){
									text_y = (48 + (numLines * 16) + 5);
								} else {
									text_y = mouseY;
								}

								g.fillStyle = "rgba(0,0,0,0.65)";
								g.fillRect( text_x - 5, text_y + 5, textwidth.width + 10, -(48 + (numLines * 16) + 5) );
								
								for(var l = 0; l < numLines; l ++){
									g.fillStyle = "rgba(255,255,255,1.0)";
									g.fillText(block[i].lines[l], text_x, (text_y - (32 + (numLines * 16))) + (l * 16));
								}
								
							} else {
								var textwidth = g.measureText(data[i].title);
								
								if(mouseX + textwidth.width > 1024){
									text_x = 1024 - textwidth.width
								} else {
									text_x = mouseX;
								}
								
								if(mouseY - 48 < 0){
									text_y = 48;
								} else {
									text_y = mouseY;
								}
								
								
								g.fillStyle = "rgba(0,0,0,0.65)";
								g.fillRect( text_x - 5, text_y + 5, textwidth.width + 10, -48 - 5);
								
								g.fillStyle = "rgba(255,255,255,1.0)";
								g.fillText(block[i].title, text_x, text_y - 32);
							}

							g.fillText(data[i].position, text_x, text_y - 16);
							g.fillText(data[i].date, text_x, text_y);
						}
						
					}
					
				} else {
					
					for(var i = 0; i < textBox.length; i++){
						textBox[i].draw();
					}
					
				}
				
			}	
			
		}
	};
	
	this.mouseOver = function(x, y, d){

		mouseX = x;
		mouseY = y;
		
		if(style == "box"){
		
			for(var i = 0; i < block.length; i++){
				block[i].mouseOver(x, y, d);
			}
			
		}
		
	};
	
}