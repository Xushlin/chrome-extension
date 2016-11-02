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
        var bind=$("#tellus");
        if(bind.html()===undefined) {
            var modal = document.createElement('div');
            modal.id = "tellus";


            if ($("#tellus").length == 0) {
                modal.innerHTML = "<script src='http://maps.googleapis.com/maps/api/js?key=AIzaSyChclkHzG_gqZCKEILnfPbI_HFIrZV47hc'></script>" + msg.html;
            } else {
                modal.innerHTML = msg.html;
            }
            var popup = $(modal);

            popup.appendTo($("body"));
        }
        data = msg.data;
        if (msg.action === 'dialog_searchResult' && data.length > 1) {
            var list = "";
            for (var i = 0; i < data.length; i++) {
                var x="<div  id='" + i + "' class='list-container'>"+
                        "<label class='tellus-search-result-item'>" + data[i]["M1"] + "</label>"+
                        "<label class='tellus-open-detail'>Öppna</label>"+
                        "</div>";
                list += x;
            }
            $(".content").children().remove();
            $(".content").append($(list));
            $("#ModalSearchResult").show();
        } else {
            bindModal(data[0]);
            showModal();
        }
    }
});

function bindModal(companyInfo){
    $("#M1").text(companyInfo.M1);
    $("#M2").text(companyInfo.M2);
    $("#M3").text(companyInfo.M3);
    $("#M4").text(companyInfo.M4);
    $("#M5").text(companyInfo.M5);
    $("#M6").text(companyInfo.M6);
    $("#M7").text(companyInfo.M7);
    $("#M8").text(companyInfo.M8);
    $("#M9").text(companyInfo.M9);
    $("#M10").text(companyInfo.M10);

    $("#A1").text(companyInfo.A1);
    $("#A2").text(companyInfo.A2);
    $("#A3").text(companyInfo.A3);
    $("#A4").text(companyInfo.A4);
    $("#A5").text(companyInfo.A5);
    $("#A6").text(companyInfo.A6);
    $("#A7").text(companyInfo.A7);

    $("#P1").val(companyInfo.P1);
    $("#P2").val(companyInfo.P2);
}

function showModal(){
    $("#tellus-refresh-flag").val(true)
    $("#ModalCompanyInfo").show();
}

$(document).ready(function () {
    $("body").on("click", "#open-tellus", function () {
        chrome.extension.sendMessage({action: 'open_new_tab'});
    })

    $("body").on("click", ".list-container", function () {
     var id=$(this).attr("id");
        $('#ModalSearchResult').hide();
        bindModal(data[id]);
        showModal();
    })
});