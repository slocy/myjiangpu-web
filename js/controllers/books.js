

var books;

$(document).on("pageinit",function() {

    var global = new Global();
    if (!global.hasUser()) {

        var code = $.query.get('code');
        /** 以下代码在手机真实访问时需取消注释 */
        if(code!=null && code !="") {

            var user = global.getAndCacheUser(code);

            $("#userinfo").html("get user form remote: <img src='" + user.headimgurl + "' />" + user.nickname + user.city );


        }
        else
        {
            //redirect to wx login
            window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdebf3e2511cf03f7&redirect_uri=http://wx.slocy.cn&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
        }
    }
    else {

        var user = global.getUser();

        $("#userinfo").html("get user form local storage: <img src='" + user.headimgurl + "' />" + user.nickname + user.city );

    }

    books = new Books();
    books.getData();
    books.bindEvent();

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

            $.getJSON("user.json", //"http://wx-api.slocy.cn/auth/fetchuser/" + window.localStorage.getItem("code"),
                function(json) {
                    $("#userinfo").html("<p>"+JSON.stringify(json)+"</p>");
                    $.
                    //window.localStorage.setItem("access_token", user.token.access_token);
                    //window.localStorage.setItem("openid", user.token.openid);
                    //
                    //var accessToken = window.localStorage.getItem("access_token");
                    //var openid = window.localStorage.getItem("openid");

                    $("#userinfo").html(json.token.access_token + json.token.openid + json.userinfo.nickname);
                });




        });
    }


};