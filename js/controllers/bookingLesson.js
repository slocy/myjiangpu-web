

var lesson;
$(document).on("pageinit",function(){

        lesson = new Lesson();
        lesson.getData();
        lesson.bindEvent();

});

function Lesson (){}
Lesson.prototype = {
    getData: function () {

        $.ajax({
            url: "http://wx-api.slocy.cn/lesson/get/409",
            cache: false,
            success: function (data) {
                if (data != "") {
                    //bind data to page
                    lesson.bindTemplate(data);
                }
            },
            error: function () {

            }
        })

    },

    bindTemplate: function(data){
        var template = $.templates("#lessonTmpl");
        var htmlOutput = template.render(data);
        $("#lessonResult").html(htmlOutput);
    },

    bindEvent: function(){

        $("#leavemessage").textinput();

        //stepper
        var qty = 1;
        var price = $("#labelPrice").html();

        $(document).on("tap","#minus", function(){

            $("#qty").blur();
            if(qty==2)
            {
                $("#minus").addClass("minus_disabled");
            }
            if(qty>1)
            {
                qty --;
                $("#qty").val(qty);
                $("#labelPrice").text(price * qty);
            }
        });

        $(document).on("tap","#plus", function(){
            $("#qty").blur();
            qty ++;

            if(qty==2)
            {
                price = $("#labelPrice").html();
                $("#minus").removeClass("minus_disabled");
            }

            $("#qty").val(qty);
            $("#labelPrice").text(price * qty);
        });


    }
};