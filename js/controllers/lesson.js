

var lesson;
$(document).on("pageinit",function(){


    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdebf3e2511cf03f7&redirect_uri=http%3A%2F%2Fwx.slocy.cn%2Flesson.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";

    var code = $.query.get('code');
    var openid = $.query.get('openid');

    alert(code + openid);

    lesson = new Lesson();
    lesson.getData();
    lesson.bindEvent();

});

function Lesson (){}
Lesson.prototype = {
    getData: function () {

        $.ajax({
            url: "http://wx-api.slocy.cn/lesson/get/375",
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