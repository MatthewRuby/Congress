function ajax(url, data, callback) {
    
    try {
        xhrobj = new XMLHttpRequest();
    } catch (e) {

	    try {
	        xhrobj=new ActiveXObject("Msxml2.XMLHTTP");
	    } catch (e) {
	        xhrobj=new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
  
    xhrobj.open("GET", url);
    xhrobj.setRequestHeader("X-Requested-With", "XMLHttpRequest"); 
  
    xhrobj.onreadystatechange = function() {
        if (xhrobj.readyState == 4 && xhrobj.status == 200) {
            callback(xhrobj.responseText);
        }
    };

    xhrobj.send(data);
    
}

function stringToXml(text) {
	if (window.DOMParser) {
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(text,"text/xml");
	} else {
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
		xmlDoc.loadXML(text); 
	}
	return xmlDoc;
};