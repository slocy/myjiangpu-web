

var books;

$(document).on("pageinit",function() {

    books = new Books();
    books.getData();
    books.bindEvent();

    var code = $.query.get('code');
    $("#userinfo").html(code);

    $.totalStorage("code", code);

    //var global= new Global();


    //var hasuser = global.hasUser();

    /** 以下代码在手机真实访问时需取消注释 */
    if(code!=null && code !="") {


    //$.getJSON("user.json", //"http://wx-api.slocy.cn/auth/fetchuser/" + code,
    //    function (json) {
    //        var user = $.totalStorage("user", json.userinfo);
    //        $("#userinfo").html("get user form remote: <img src='" + user.headimgurl + "' style='width:50px;height:50px;' />" + user.nickname + user.city );
    //    });

    }
    else
    {
        //redirect to wx login
        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdebf3e2511cf03f7&redirect_uri=http://wx.slocy.cn&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect";
    }


});

function Books (){}
Books.prototype = {
    getData: function () {

        $.ajax({
            url: "http://wx-api.slocy.cn/book/get",
            method:"GET",
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
        $("#getInfoByWeixin").tap(function(){

            var code =  $.totalStorage("code");

            window.location.href = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxdebf3e2511cf03f7&secret=73cea8e8e906b72c86ce00ba47ab625a&code=" + code + "&grant_type=authorization_code";

        });

        $("#getInfoBySlocy").tap(function(){

            var code =  $.totalStorage("code");

            $.getJSON("http://wx-api.slocy.cn/auth/fetchuser/" + $.totalStorage("code"),
                function(json) {
                    $("#userinfo").html("<p>"+JSON.stringify(json)+"</p>");

                });

        });

        $("#clearlocal").tap(function(){
            localStorage.clear();
        });
    }


};