

var books;
$(document).ready(function () {
    books = new Books();
    books.getData();

});

function Books (){}
Books.prototype = {
    getData: function () {

        $.ajax({
            url: "/books.json",
            cache: false,
            success: function (data) {
                if (data != "") {
                    //bind data to page
                    books.bindTemplate(data);
                }
            },
            error: function () {

            }
        })

    },

    bindTemplate: function(data){
            var template = $.templates("#tmpl");
            var htmlOutput = template.render(data);
            $("#result").html(htmlOutput);
    }
};