

var lesson;
$(document).ready(function () {
    lesson = new Lesson();
    lesson.getData();

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
    }
};