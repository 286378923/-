var parts = window.name.split("#");
var download = document.getElementById("download");
if(parts[0] === "free")
{
	download.classList.add("free");
	download.onclick = function(){chrome.tabs.create({'url': decodeURI(parts[1])});};
		
	chrome.runtime.sendMessage({"op":"showFreeMsg"});
	download.setAttribute("title", chrome.i18n.getMessage("freepaperTitle"));
}
else
{
	download.classList.add("pay");
	chrome.runtime.sendMessage({"op":"showNoFreePaperMsg"});
	download.setAttribute("title", chrome.i18n.getMessage("nofreepaperTitle"));
}
