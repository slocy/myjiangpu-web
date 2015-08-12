

var artisan;
$(document).ready(function () {
    artisan = new Artisan();
    artisan.getData();

});

function Artisan (){}
Artisan.prototype = {
    getData: function () {

        $.ajax({
            url: "/artisan.json",
            cache: false,
            success: function (data) {
                if (data != "") {
                    //bind data to page
                    artisan.bindTemplate(data);
                }
            },
            error: function () {

            }
        })

    },

    bindTemplate: function(data){
        var template = $.templates("#artisanTmpl");
        var htmlOutput = template.render(data);
        $("#result").html(htmlOutput);
    }
};