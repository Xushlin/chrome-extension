var clickHandler = function(e) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        getTemplate(tabs);
    });
};

chrome.contextMenus.create({
    "title": "Sök i Tellus",
    "contexts": ["page", "selection", "image", "link"],
    "onclick": clickHandler
});

function getTemplate(tabs) {
    $.ajax({
        url: "app/views/test.html",
        type: "get",
        success: function (result) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog", html: result}, function (response) {
            });
        },
        error: function (res) {
            console.log(res);
        }
    })
}