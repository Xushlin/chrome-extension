var data=null;
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    data=null;
    if (msg.action === "notification") {
        sendNotification('Inga sökträffar');
    } else {
        poppupModal(msg);
    }
});
function poppupModal(msg){
    var bind=$("#tellus");
    if(bind.html()===undefined) {
        var modal = document.createElement('div');
        modal.id = "tellus";
        if ($("#tellus").length == 0) {
            //modal.innerHTML="<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyB0OJ6iAlKgFFghRemcZwSPsz28QstBqr4'></script>"+msg.html; //SV
            modal.innerHTML = "<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyChclkHzG_gqZCKEILnfPbI_HFIrZV47hc'></script>" + msg.html;//CN
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
            var x="<div  id='" + i + "' class='tellus-list-container'>"+
                "<span class='tellus-search-result-item'>" + data[i].JuridisktNamn[0]._text + "</span>"+
                "<span class='tellus-open-detail'>Öppna</span>"+
                "</div>";
            list += x;
        }
        $("#ModalSearchResult .tellus-content").children().remove();
        $("#ModalSearchResult .tellus-content").append($(list));
        $("#ModalSearchResult").show();
    } else {
        bindModal(data[0]);
        showModal();
    }
}
function sendNotification(message){
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
    $.notify(message, {
        style: 'base',
        position: 't c',
        autoHideDelay: 3 * 1000,
        clickToHide: true
    });
}
function bindModal(company){
    $("#M1").text(company.JuridisktNamn[0]._text);
    $("#M2").text(company.M2);
    $("#M3").text(company.M3);
    $("#M4").text(company.M4);
    $("#M5").text(company.M5);
    $("#M6").text(company.M6);
    $("#M7").text(company.M7);
    $("#M8").text(company.M8);
    $("#M9").text(company.M9);
    $("#M10").text(company.M10);

    $("#A1").text(company.Utdelningsadress[0].Gatuadress[0]._text + " " + company.Utdelningsadress[0].Postnummer[0]._text + " " + company.Utdelningsadress[0].Postort[0]._text);
    $("#A2").text(company.A2);
    $("#A3").text(company.Epost[0]._text);
    $("#A4").text(company.TelefonVaxel[0]._text);
    $("#A5").text(company.A5);
    $("#A6").text(company.EpostPDFfaktura[0]._text);
    $("#A7").text(company.A7);

    $("#tellus-address").val(company.Utdelningsadress[0].Gatuadress[0]._text + " " + company.Utdelningsadress[0].Postort[0]._text);
}
function showModal(){
    $("#tellus-refresh-flag").val(true)
    $("#ModalCompanyInfo").show();
}
$(document).ready(function () {
    $("body").on("click", "#open-tellus", function () {
        var query = $("#M1").text();
        chrome.extension.sendMessage({action: 'open_new_tab', data: query});
    })

    $("body").on("click", ".tellus-list-container", function () {
     var id=$(this).attr("id");
        $('#ModalSearchResult').hide();
        bindModal(data[id]);
        showModal();
    })

    $('body').on('click','#open-dialog',function(){
        $("#ModalCompanyInfo").show();
    });
    $('body').on('click','#close-container',function(){
        $("#ModalCompanyInfo").hide();
    });

    $('body').on('click','#open-list-dialog',function(){
        $("#ModalSearchResult").show();
    });
    $('body').on('click','#close-list-container',function(){
        $("#ModalSearchResult").hide();
    })
    $(document).bind("keydown", "esc", function (ev){
        if(ev.keyCode===27) {
             $("#ModalSearchResult").hide();
             $("#ModalCompanyInfo").hide();
        }
    })
});