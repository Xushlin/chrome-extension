var clickHandler = function(e) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        getSearchResult(e,tabs);
    });
};

chrome.contextMenus.create({
    "title": "Sök i Tellus",
    "contexts": ["page", "selection"],
    //"contexts": ["page", "selection", "image", "link"],
    "onclick": clickHandler
});

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "open_new_tab") {
            var newUrl = "http://www.google.com";
            chrome.tabs.create({url: newUrl});
        }
    }
);

function getSearchResult(event,tabs) {
    $.ajax({
        url: "../../mock-result.json",
        contentType:"application/json",
        dataType:"json",
        type: "get",
        success: function (result) {
            if (result === undefined || result === null) {
                chrome.tabs.sendMessage(tabs[0].id, {action: "notification"});
            } else {
                getHTMLTemplate(tabs, "dialog_searchResult", result);
            }
        },
        error: function (err) {
            console.log(err);
            chrome.tabs.sendMessage(tabs[0].id, {action: "notification"});
        }
    })
};

function getHTMLTemplate(tabs,action,result) {
    $.ajax({
        url: "app/views/template.html",
        type: "get",
        success: function (schema) {
            chrome.tabs.sendMessage(tabs[0].id, {action: action, html: schema, data: result});
        },
        error: function (err) {
            console.log(err);
        }
    })
};