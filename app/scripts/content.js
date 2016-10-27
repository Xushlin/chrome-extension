chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'open_dialog') {
        var modal = document.createElement('div');
        modal.innerHTML = msg.html;

        var popup = $(modal);
        popup.appendTo($("body"));

        $('#MyModal1').modal('show');
    }
});