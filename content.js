var elements;
var contentNode = document.querySelector("body > pre");
var indentation = 0;

if(contentNode != null) {
	var text = contentNode.innerText;
		var objJSON = JSON.parse(text);
		elements = "<div class='p'>{</div>";
		findWhich(objJSON);
		elements += "<div class='p'>}</div>";
		document.querySelector("body").innerHTML = elements;
		
		chrome.runtime.sendMessage({
			action: "injectListener"
		}, function(res) {
			chrome.runtime.sendMessage({
				action: "injectCss"
			}, function(res2) {
			});
		});
}

function isJSON(str) {
	if (/^\s*$/.test(str))
		return false;
	str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
	str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
	str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
	return (/^[\],:{}\s]*$/).test(str);
}

function findIndent() {
	var indent = "";
	for(var i = 0; i < indentation; i++)
		indent += "&#9;";
	return indent;
}
