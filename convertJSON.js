
//Loop through object or array to get a single property
function findWhich(objJSON) {
	indentation++;
	if (objJSON instanceof Array) {
		for(var i = 0; i < objJSON.length; i++) {
			htmlPreStart(objJSON[i]);
			format(objJSON[i], false, lastProperty(i, objJSON.length));
		}
	} else if(objJSON instanceof Object) {
		var count = 0;
		for (var key in objJSON)
			count++;
		var i = 0;
		for(var key in objJSON) {
			htmlPreStart(objJSON[key])
			elements += '<div class="p" style="white-space:pre">' + findIndent() + '<span class="key">"' + key + '"</span>: ';
			format(objJSON[key], true, lastProperty(i, count));
			i++;
		}
	}
	indentation--;
}

//Add the right divs based on the instance of the object
function format(val, hasProp, strEnd) {
	var size = -1;
	if(val instanceof Array) {
		size = val.length;
		htmlStart("array", hasProp, size);
		findWhich(val);
		htmlEnd("array", strEnd, size);
	} else if(val instanceof Object) {
		size = Object.keys(val).length;
		htmlStart("object", hasProp, size);
		findWhich(val);
		htmlEnd("object", strEnd, size);
	} else {
		if(!hasProp)
			elements += '<div class="p" style="white-space:pre">' + findIndent();
    if(typeof val === 'number')
      elements += '<span class="number">' + val + '</span>' + strEnd + '</div>';
    else {
      var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      val = val.replace(urlRegex, function(url) {
          return '<a class="link" href="' + url + '">' + url + '</a>';
      });
      elements += '<span class="value">"' + val + '"</span>' + strEnd + '</div>';
    }
	}
}

function htmlPreStart(val) {
	if(val instanceof Array)
			elements += '<div class="array">';
	else if(val instanceof Object)
		elements += '<div class="object">';
}

function htmlStart(type, hasProp, size) {
	var indent = "";
	for(var i = 0; i < indentation; i++)
		indent += "&emsp;";
	
	if(!hasProp)
		elements += '<div class="p" style="white-space:pre">' + findIndent() + "";
	elements += '<span class="size">' + type + '(' + size + ') </span>' + (type == "object" ? '{ ' : '[ ') + '</div>';
	if(size > 0)
		elements += '<a href="#" onclick="return false;">-</a>';
	elements += '<div class="values">';
}

function htmlEnd(type, strEnd, size) {
	elements += '</div>';
	elements += '<div class="p" style="white-space:pre">' + (size > 0 ? findIndent() : '') + (type == "object" ? '}' : ']') + strEnd + '</div>';
	elements += '</div>';
}

function lastProperty(current, count) {
	return current == count - 1 ? "" : ",";
}

