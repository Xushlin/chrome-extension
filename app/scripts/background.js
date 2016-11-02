var clickHandler = function(e) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        getSearchResult(e,tabs);
        //getCompanyInformation(e,tabs);
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
        url: "../mock/GetKontoListResponse.txt",
        contentType:"text/plain",
        dataType:"text",
        type: "get",
        success: function (result) {
            if (result === undefined || result === null) {
                chrome.tabs.sendMessage(tabs[0].id, {action: "notification"});
            } else {
                var res=(xmlToJSON.parseString(result))["GetKontoList"][0]["MethodParameters"][0]["KontoListResponse"][0]["KontoArray"][0];
                var resArray=new Array();
                for(var propName in res){
                    resArray.push(res[propName][0]);
                }

                getHTMLTemplate(tabs, "dialog_searchResult", resArray);
            }
        },
        error: function (err) {
            console.log(err);
            chrome.tabs.sendMessage(tabs[0].id, {action: "notification"});
        }
    })
};

function getCompanyInformation(event,tabs) {
    $.ajax({
        url: "../mock/GetKontoListResponse.txt",
        contentType:"text/plain",
        dataType:"text",
        type: "get",
        success: function (result) {
            if (result === undefined || result === null) {
                chrome.tabs.sendMessage(tabs[0].id, {action: "notification"});
            } else {
                var res=(xmlToJSON.parseString(result)).GetKontoList[0].MethodParameters[0].KontoListResponse[0].KontoArray[0]
                var resArray=new Array();
                for(var propName in res){
                    resArray.push(res[propName][0]);
                }

                getHTMLTemplate(tabs, "dialog_searchResult", resArray);
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
        url: "app/views/modal.html",
        type: "get",
        success: function (schema) {
            chrome.tabs.sendMessage(tabs[0].id, {action: action, html: schema, data: result});
        },
        error: function (err) {
            console.log(err);
        }
    })
};