function Pulldown(g, parent, data, id){
	that = this;
	var parent = parent;
	var id = id;
	var branch = data[0].branch;

	var select = document.createElement('select');
	select.setAttribute('id', id);
	select.setAttribute('onChange', "query(value," + id + ");");
	
	for(var i = 0; i < data.length; i++){
		
		var optA = document.createElement('option');
		optA.setAttribute('value', data[i].value);
		optA.text = data[i].name;
		select.appendChild(optA);
		
	}
	
	this.addToDOM = function(){
		parent.appendChild(select);
	};
	
	this.removeFromDOM = function(){
		parent.removeChild(select);
	};	

}
