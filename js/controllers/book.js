

var book;
$(document).on("pageinit",function(){

    book = new Book();
    book.getData();

});

function Book (){}
Book.prototype = {
    getData: function () {

        $.ajax({
            url: "/book.json",
            cache: false,
            success: function (data) {
                if (data != "") {
                    //bind data to page
                    book.bindTemplate(data);
                }
            },
            error: function () {

            }
        })

    },

    bindTemplate: function(data){
        var template = $.templates("#bookTmpl");
        var htmlOutput = template.render(data);
        $("#bookResult").html(htmlOutput);
    }
};