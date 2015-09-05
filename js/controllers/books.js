

var books;

$(document).on("pageinit",function(){

    alert(window.localStorage.getItem("openid") + "--openid");

    //if we got the authorization by user, we can get the code param from the redirect url.
    var code = $.query.get('code');

    if(code!=null && code !="") {
        alert(code+"code");

        $.ajax({
            dataType: "json",
            url: "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxdebf3e2511cf03f7&secret=73cea8e8e906b72c86ce00ba47ab625a&code=" + code + "&grant_type=authorization_code",
            cache: false,
            success: function (data) {
                if (data != "") {
                    /* the result by code
                     {
                     "access_token":"ACCESS_TOKEN",
                     "expires_in":7200,
                     "refresh_token":"REFRESH_TOKEN",
                     "openid":"OPENID",
                     "scope":"SCOPE",
                     "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
                     }
                     * */
                    var tokenjson = $.parseJSON(data);
                    window.localStorage.setItem("access_token", tokenjson.access_token);
                    window.localStorage.setItem("openid", tokenjson.openid);

                    $.ajax({
                        url: "https://api.weixin.qq.com/sns/userinfo?access_token=" + tokenjson.access_token + "&openid=" + tokenjson.openid + "&lang=zh_CN",
                        cache: false,
                        success: function (data) {
                            if (data != "") {

                                var userinfo = $.parseJSON(data);

                                alert(userinfo.openid + userinfo.nickname + userinfo.sex + userinfo.unionid);

                                /*  user info by access_token and openid
                                 {
                                 "openid":" OPENID",
                                 "nickname": NICKNAME,
                                 "sex":"1",
                                 "province":"PROVINCE"
                                 "city":"CITY",
                                 "country":"COUNTRY",
                                 "headimgurl":    "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
                                 "privilege":[
                                 "PRIVILEGE1"
                                 "PRIVILEGE2"
                                 ],
                                 "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
                                 }

                                 * */

                            }
                        },
                        error: function () {

                        }

                    });

                    /*  user info by access_token and openid
                     {
                     "openid":" OPENID",
                     "nickname": NICKNAME,
                     "sex":"1",
                     "province":"PROVINCE"
                     "city":"CITY",
                     "country":"COUNTRY",
                     "headimgurl":    "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
                     "privilege":[
                     "PRIVILEGE1"
                     "PRIVILEGE2"
                     ],
                     "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
                     }

                     * */

                }
            },
            error: function () {

            }

        });


        books = new Books();
        books.getData();
        books.bindEvent();

        alert(window.localStorage.getItem("access_token")+ "--token");
    }
    else
    {
        //redirect to wx login
        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdebf3e2511cf03f7&redirect_uri=http%3A%2F%2Fwx.slocy.cn&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
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

    }
};