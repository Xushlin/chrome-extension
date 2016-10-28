var clickHandler = function(e) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var result = getSearchResult();
        if (result === undefined || result === null) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "notification"});
        } else if (result.length === 1) {
            getHTMLTemplate(tabs, "dialog_companyInfo");
        } else if (result.length > 1) {
            getHTMLTemplate(tabs, "dialog_searchResult");
        }
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
            var newUrl = "http://www.google.com"
            chrome.tabs.create({url: newUrl})
        }
    }
);

function getSearchResult() {
    //return null;
    return [{"title": "Search Result 1", "details": "1. A quick brown fox jump over the lazy dog."}];
    //return [{"title": "Search Result 1", "details": "1. A quick brown fox jump over the lazy dog."},
    //    {"title": "Search Result 2", "details": "2. A quick brown fox jump over the lazy dog."},
    //    {"title": "Search Result 3", "details": "3. A quick brown fox jump over the lazy dog."},
    //    {"title": "Search Result 4", "details": "4. A quick brown fox jump over the lazy dog."},
    //    {"title": "Search Result 5", "details": "5. A quick brown fox jump over the lazy dog."}];

    //$.ajax({
    //    url: "",
    //    type: "get",
    //    success: function (result) {
    //        //return null;
    //        return [{"title": "Search Result 1", "details": "1. A quick brown fox jump over the lazy dog."}];
    //        //return [{"title": "Search Result 1", "details": "1. A quick brown fox jump over the lazy dog."},
    //        //    {"title": "Search Result 2", "details": "2. A quick brown fox jump over the lazy dog."},
    //        //    {"title": "Search Result 3", "details": "3. A quick brown fox jump over the lazy dog."},
    //        //    {"title": "Search Result 4", "details": "4. A quick brown fox jump over the lazy dog."},
    //        //    {"title": "Search Result 5", "details": "5. A quick brown fox jump over the lazy dog."}];
    //    },
    //    error: function (err) {
    //        console.log(err);
    //    }
    //})
};

function getHTMLTemplate(tabs,action) {
    $.ajax({
        url: "app/views/template.html",
        type: "get",
        success: function (result) {
            chrome.tabs.sendMessage(tabs[0].id, {action: action, html: result});
        },
        error: function (err) {
            console.log(err);
        }
    })
};