chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === "injectListener") {
		chrome.scripting.executeScript({
			target: { tabId: sender.tab.id },
			function: injectedFunction
		});
		sendResponse({
			done: "done"
		});
	} else if (request.action === "injectCss") {
		chrome.scripting.insertCSS({
			target: { tabId: sender.tab.id },
			files: ["styles.css"]
		});
		sendResponse({
			done: "done"
		});
	}
	return true;
});

//Listener to extends/minimize objects and arrays
function injectedFunction() {
	var as = document.getElementsByTagName("a");
	for(var a of as) {
		a.addEventListener("click", function(e) {
			var values = this.parentNode.getElementsByClassName("values")[0];
			var brackets = this.parentNode.getElementsByClassName("p");
			var bracket = brackets[brackets.length - 1];
			if(values.style.display == "none") {
				values.style.display = "unset";
				bracket.style.whiteSpace = "pre";
				this.innerText = "-";
			} else {
				values.style.display = "none";
				bracket.style.whiteSpace = "normal";
				this.innerText = "+";
			}
		});
	}
}