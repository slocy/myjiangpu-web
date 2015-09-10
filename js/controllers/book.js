

var book;
var bookId;
var artisanId;
$(document).on("pageinit",function(){

    bookId = $.query.get("bookid");

    book = new Book();
    book.getData(bookId);

});

function Book (){}
Book.prototype = {
    getData: function (bookId) {

        $.ajax({
            url: "http://wx-api.slocy.cn/book/get/"+bookId,
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
    bindEvent:function(){

    },

    bindTemplate: function(data){
        var template = $.templates("#bookTmpl");
        var htmlOutput = template.render(data);
        $("#bookResult").html(htmlOutput);
    }
};