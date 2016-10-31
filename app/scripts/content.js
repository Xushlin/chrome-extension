var data=null;
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    data=null;
    if (msg.action === "notification") {
        $.notify.addStyle('base', {
            html: "<div><span data-notify-text/></div>",
            classes: {
                base: {
                    "white-space": "nowrap",
                    "color": "#ffffff",
                    "background-color": "#33414e",
                    "padding": "5px"
                }
            }
        });
        $.notify('Inga sökträffar', {
            style: 'base',
            position: 't c',
            autoHideDelay: 3 * 1000,
            clickToHide: true
        });
    } else {
        var modal = document.createElement('div');
        modal.id = "tellus";

        if ($("#tellus").length == 0) {
            modal.innerHTML = "<script src='http://maps.googleapis.com/maps/api/js?key=AIzaSyChclkHzG_gqZCKEILnfPbI_HFIrZV47hc'></script>" + msg.html;
        } else {
            modal.innerHTML = msg.html;
        }

        //modal.innerHTML = msg.html;
        //"<script src='http://maps.googleapis.com/maps/api/js?key=AIzaSyChclkHzG_gqZCKEILnfPbI_HFIrZV47hc'></script>"
        var popup = $(modal);
        //<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyChclkHzG_gqZCKEILnfPbI_HFIrZV47hc"></script>
        popup.appendTo($("body"));

        data = msg.data;
        if (msg.action === 'dialog_searchResult' && data.length > 1) {
            var list = "";
            for (var i = 0; i < data.length; i++) {
                var listRow = "<div id='" + i + "' class='list-group'>" +
                    "<a href='#' class='list-group-item'>" +
                    " <h4 class='list-group-item-heading'>" + data[i]["M1"] + "</h4>" +
                    " <p class='list-group-item-text'>" + data[i]["M2"] + "</p>" +
                    "</a>" +
                    "</div>";
                list += listRow;
            }
            $("#ModalSearchResult-List").children().remove();
            $("#ModalSearchResult-List").append($(list));
            $('#ModalSearchResult').modal('show');
        } else {
            bindModal(data[0]);
            showModal();
        }
    }
});

function bindModal(company){
    $("#M1").text(company.M1);
    $("#M2").text(company.M2);
    $("#M3").text(company.M3);
    $("#M4").text(company.M4);
    $("#M5").text(company.M5);
    $("#M6").text(company.M6);
    $("#M7").text(company.M7);
    $("#M8").text(company.M8);
    $("#M9").text(company.M9);
    $("#M10").text(company.M10);

    $("#A1").text(company.A1);
    $("#A2").text(company.A2);
    $("#A3").text(company.A3);
    $("#A4").text(company.A4);
    $("#A5").text(company.A5);
    $("#A6").text(company.A6);
    $("#A7").text(company.A7);

    $("#P1").val(company.P1);
    $("#P2").val(company.P2);
}

function showModal(){
    $('#ModalCompanyInfo').modal('show');
}

$(document).ready(function () {
    $("body").on("click", "#btn-open-tellus", function () {
        chrome.extension.sendMessage({action: 'open_new_tab'});
    })

    $("body").on("click", ".list-group", function () {
     var id=$(this).attr("id");
        $('#ModalSearchResult').modal('hide');
        bindModal(data[id]);
        showModal();
    })
});