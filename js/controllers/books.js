

var books;

$(document).on("pageinit",function(){

    var code = $.query.get('code');

    $("#userinfo").html(code);

    if(code!=null && code !="") {

        books = new Books();
        books.getData();
        books.bindEvent();

        window.localStorage.setItem("code",code);

//        $.ajax({
//            url: "http://wx.slocy.cn/auth/fetchuser/"+ code,
//            success: function (data) {
//
//                alert('in success function');
//                if (data != "") {
//                    alert('in data');
//                    /* the result by code
//                     {
//                     "access_token":"ACCESS_TOKEN",
//                     "expires_in":7200,
//                     "refresh_token":"REFRESH_TOKEN",
//                     "openid":"OPENID",
//                     "scope":"SCOPE",
//                     "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
//                     }
//                     * */
//                    $("#userinfo").html("<p>token - "+data.token + "  openid:" +data.userinfo.openId+"</p>");
///*
//                    var tokenjson = $.parseJSON(data);
//                    window.localStorage.setItem("access_token", tokenjson.access_token);
//                    window.localStorage.setItem("openid", tokenjson.openid);
//
//                    $.ajax({
//                        url: "https://api.weixin.qq.com/sns/userinfo?access_token=" + tokenjson.access_token + "&openid=" + tokenjson.openid + "&lang=zh_CN",
//                        cache: false,
//                        success: function (data) {
//                            if (data != "") {
//                                alert(data);
//
//                                //var userinfo = $.parseJSON(data);
//                                //
//                                //alert(userinfo.openid + userinfo.nickname + userinfo.sex + userinfo.unionid);
//
//                                /!*  user info by access_token and openid
//                                 {
//                                 "openid":" OPENID",
//                                 "nickname": NICKNAME,
//                                 "sex":"1",
//                                 "province":"PROVINCE"
//                                 "city":"CITY",
//                                 "country":"COUNTRY",
//                                 "headimgurl":    "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
//                                 "privilege":[
//                                 "PRIVILEGE1"
//                                 "PRIVILEGE2"
//                                 ],
//                                 "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
//                                 }
//
//                                 * *!/
//
//                            }
//                        },
//                        error: function () {
//
//                        }
//
//                    }).fail(function(jqXHR, textStatus) {
//                        alert( "get user info Request failed: " + textStatus );
//                    });
//*/
//
//                    /*  user info by access_token and openid
//                     {
//                     "openid":" OPENID",
//                     "nickname": NICKNAME,
//                     "sex":"1",
//                     "province":"PROVINCE"
//                     "city":"CITY",
//                     "country":"COUNTRY",
//                     "headimgurl":    "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
//                     "privilege":[
//                     "PRIVILEGE1"
//                     "PRIVILEGE2"
//                     ],
//                     "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
//                     }
//
//                     * */
//
//                }
//            }
//
//        }).fail(function(jqXHR, textStatus) {
//            $("#userinfo").html("get user id Request failed: " + textStatus +code);
//        });





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

            var code =  window.localStorage.getItem("code");

            window.location.href = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxdebf3e2511cf03f7&secret=73cea8e8e906b72c86ce00ba47ab625a&code=" + code + "&grant_type=authorization_code";

        });

        $("#getInfoBySlocy").tap(function(){

            var code =  window.localStorage.getItem("code");

            window.location.href = "http://wx.slocy.cn/auth/fetchuser/" + code;

            //
            //$.ajax({
            //    url: "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxdebf3e2511cf03f7&secret=73cea8e8e906b72c86ce00ba47ab625a&code=" + code + "&grant_type=authorization_code",
            //    type:"json",
            //    success: function (json) {
            //        $("#userinfo").html(JSON.stringify(json));
            //        //window.localStorage.setItem("access_token", json.access_token);
            //        //window.localStorage.setItem("openid", json.openid);
            //
            //    }
            //}).fail(function(jqXHR, textStatus) {
            //    $("#userinfo").html("get user id Request failed: " + textStatus +code);
            //});

           /* $.getJSON("https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxdebf3e2511cf03f7&secret=73cea8e8e906b72c86ce00ba47ab625a&code=" + window.localStorage.getItem("code") + "&grant_type=authorization_code",
                function(json) {
                    $("#userinfo").html(json);
                    var tokenjson = $.parseJSON(json);
                    window.localStorage.setItem("access_token", tokenjson.access_token);
                    window.localStorage.setItem("openid", tokenjson.openid);
                    //
                    //var token= window.localStorage.getItem("access_token");
                    //var openid = window.localStorage.getItem("openid");
                    //
                    //$.getJSON("https://api.weixin.qq.com/sns/userinfo?access_token="+token+"&openid="+openid+"&lang=zh_CN",
                    //    function(json) {
                    //        $("#userinfo").appendTo(json);
                    //    });
            });*/


        });
    }
};