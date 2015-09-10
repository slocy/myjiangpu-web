var artisan;
var artisanId;
$(document).on("pageinit",function(){

    artisanId = $.query.get('artisanid');

    artisan = new Artisan();
    artisan.getData();

});

function Artisan (){}
Artisan.prototype = {
    getData: function () {

        $.ajax({
            url: "http://wx-api.slocy.cn/artisan/get/"+artisanId,
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