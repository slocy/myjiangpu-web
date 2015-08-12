

var books;
$(document).ready(function () {
    books = new Books();
    books.getData();
    books.bindEvent();
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
            var template = $.templates("#booksTmpl");
            var htmlOutput = template.render(data);
            $("#booksResult").html(htmlOutput);
    },

    bindEvent:function() {

    }
};