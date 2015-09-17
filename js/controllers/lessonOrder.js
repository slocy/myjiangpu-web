

var lessonOrder;
$(document).on("pageinit",function(){



    lessonOrder = new LessonOrder();
    lessonOrder.getData();
    lessonOrder.bindEvent();


});

function LessonOrder (){}
LessonOrder.prototype = {
    getData: function () {

        $.ajax({
            url: "http://wx-api.slocy.cn/lessonOrder/get/409",
            cache: false,
            success: function (data) {
                if (data != "") {
                    //bind data to page
                    lessonOrder.bindTemplate(data);
                }
            },
            error: function () {

            }
        })

    },

    bindTemplate: function(data){
        var template = $.templates("#lessonOrderTmpl");
        var htmlOutput = template.render(data);
        $("#lessonOrderResult").html(htmlOutput);
    },

    bindEvent: function(){



    }
};