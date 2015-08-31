

var usercenter;
$(document).on("pageinit",function(){

    usercenter = new UserCenter();
    usercenter.getData();

});

function UserCenter (){}
UserCenter.prototype = {
    getData: function () {

        $.ajax({
            url: "http://wx-api.slocy.cn/artisan/get/1",
            cache: false,
            success: function (data) {
                if (data != "") {
                    //bind data to page
                    usercenter.bindTemplate(data);
                }
            },
            error: function () {

            }
        })

    },

    bindTemplate: function(data){
        var template = $.templates("#usercenterTmpl");
        var htmlOutput = template.render(data);
        $("#result").html(htmlOutput);
    }
};