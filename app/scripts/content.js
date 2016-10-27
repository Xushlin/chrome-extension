function popup() {
    var modal = document.createElement('div');
    modal.innerHTML =
        '<script src="//cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>'+
        '<script src="//cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>'+
        '<link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" rel="stylesheet">'+
        '<link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">'+
        '<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
        '<div class="modal-dialog modal-sm" role="document">'+
        '<div class="modal-content">'+
        '...'+
        '</div>'+
        '</div>'+
        '</div>';

    console.log(modal);
    var tree = $(modal);

    tree.appendTo($("body"));

    setTimeout(function () {
        $('#MyModal').modal('show');
        alert("OK");
    }, 3000);
}

//chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
//    console.log("haha");
//    console.log(request);
//    if(request =="hello") {
//        console.log("OK");
//        //sendResponse({farewell:"goodbye"});
//        popup();
//    }
//});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.action == 'open_dialog_box') {
        alert("Message recieved!");

        var modal = document.createElement('div');
        modal.innerHTML =
            '<script src="//cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>'+
            '<script src="//cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>'+
            '<link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" rel="stylesheet">'+
            '<link href="//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">'+

            '<div id="MyModal" class="modal fade" tabindex="-1" role="dialog">'+
            '<div class="modal-dialog" role="document">'+
            '<div class="modal-content">'+
            '<div class="modal-header">'+
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
            '</button>'+
            '<h4 class="modal-title">Modal title</h4>'+
            '</div>'+
            '<div class="modal-body">'+
            '<p>One fine body&hellip;</p>'+
            '</div>'+
            '<div class="modal-footer">'+
            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
            '<button type="button" class="btn btn-primary">Save changes</button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';

        console.log(modal);
        var tree = $(modal);

        tree.appendTo($("body"));

        setTimeout(function () {
            $('#MyModal').modal('show');
            alert("OK");
        }, 3000);
    }
});
