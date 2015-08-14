

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
        var num = 1;
        var price = $("#lablePrice").html();

        $(document).on("tap","#btnMinus", function(){

            if(num>1)
            {
                num --;
                $("#stepper").val(num);
                $("#lablePrice").text(price * num);
            }

        });

        $(document).on("tap","#btnPlus", function(){
            num ++;

            if(num==2)
            {
                price = $("#lablePrice").html();
            }

            $("#stepper").val(num);
            $("#lablePrice").text(price * num);
        });


    }
};