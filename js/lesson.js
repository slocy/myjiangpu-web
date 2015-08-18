

var lesson;
$(document).ready(function () {
    lesson = new Lesson();
    lesson.getData();
    lesson.bindEvent();

});

function Lesson (){}
Lesson.prototype = {
    getData: function () {

        $.ajax({
            url: "/lessonModel.json",
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
        $("#result").html(htmlOutput);

    },

    bindEvent: function(){


        //stepper
        var qty = 1;
        var price = $("#lablePrice").html();

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
                $("#lablePrice").text(price * qty);
            }
        });

        $(document).on("tap","#plus", function(){
            $("#qty").blur();
            qty ++;

            if(qty==2)
            {
                price = $("#lablePrice").html();
                $("#minus").removeClass("minus_disabled");
            }

            $("#qty").val(qty);
            $("#lablePrice").text(price * qty);
        });


    }
};