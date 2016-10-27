var clickHandler = function(e) {
    //var tab=chrome.tabs.getSelected(null, function(tab){
    //    console.log(tab);
    //});
    //chrome.tabs.sendMessage(tab.id,'hello');

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {});
    });
    //chrome.runtime.sendMessage("hello", function(response) {
    //});
    //var url = e.pageUrl;
    //var searchUrl = "https://www.google.com/search?";
    //if (e.selectionText) {
    //    searchUrl += "q=" + encodeURI(e.selectionText);
    //}
    //if (e.mediaType === "image") {
    //    searchUrl += "imageurl=" + encodeURI(e.srcUrl) + "&";
    //}
    //if (e.linkUrl) {
    //    url = e.linkUrl;
    //}
    //chrome.tabs.create(
    //    {"url" : searchUrl });
};

chrome.contextMenus.create({
    "title": "Sök i Tellus",
    "contexts": ["page", "selection", "image", "link"],
    "onclick" : clickHandler
});

//"contexts": ["page", "selection", "image", "link"],