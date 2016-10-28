chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action === "notification") {
        $.notify("Nothing!", {
            className: 'warn',
            position: 't c',
            autoHideDelay: 3 * 1000,
            clickToHide: true
        });
    } else {
        var modal = document.createElement('div');
        modal.innerHTML = msg.html;

        var popup = $(modal);
        popup.appendTo($("body"));

        if (msg.action === "dialog_companyInfo") {
            $('#ModalCompanyInfo').modal('show');
        } else if (msg.action === 'dialog_searchResult') {
            $('#ModalSearchResult').modal('show');
        }
    }
});

$(document).ready(function () {
    $("body").on("click", "#btn-open-tellus", function () {
        chrome.extension.sendMessage({action: 'open_new_tab'});
    })
});