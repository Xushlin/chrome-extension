var clickHandler = function(e) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        getTemplate(tabs);
    });
};

chrome.contextMenus.create({
    "title": "Sök i Tellus",
    "contexts": ["page", "selection", "image", "link"],
    //"onclick" : clickHandler
    "onclick" : clickHandler
});

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.action==="open_new_tab"){
            var newUrl="http://www.google.com"
            chrome.tabs.create({url:newUrl})
        }
    }
);

function getTemplate(tabs){

    $.ajax({
        url:"app/views/test.html",
        type:"get",
        success:function(result){
            console.log(result);
            chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box",html:result}, function(response) {});

        },
        error:function(res){
            console.log(res);
        }
    })
}

//"contexts": ["page", "selection", "image", "link"],