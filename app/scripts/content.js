
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'open_dialog_box') {

        var modal = document.createElement('div');
        modal.innerHTML =msg.html;

        var tree = $(modal);

        tree.appendTo($("body"));

        $('#MyModal1').modal('show');

        //setTimeout(function () {
        //    $('#MyModal1').modal('show');
        //    alert("OK");
        //}, 3000);
    }
});

