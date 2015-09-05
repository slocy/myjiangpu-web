

var lesson;
$(document).on("pageinit",function(){

    //if we got the authorization by user, we can get the code param from the redirect url.
    var code = $.query.get('code');

    if(code!=null && code !="")
    {

        $.ajax({
            url: "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxdebf3e2511cf03f7&secret=73cea8e8e906b72c86ce00ba47ab625a&code="+code+"&grant_type=authorization_code",
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

                    window.localStorage.setItem("access_token", data.access_token);
                    window.localStorage.setItem("openid", data.openid);

                    $.ajax({
                        url: "https://api.weixin.qq.com/sns/userinfo?access_token="+data.access_token+"&openid="+data.openid+"&lang=zh_CN",
                        cache: false,
                        success: function (data) {
                            if (data != "") {

                                alert(data.openid +'\n'+ data.nickname +'\n'+ data.sex +'\n'+ data.unionid );

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

        lesson = new Lesson();
        lesson.getData();
        lesson.bindEvent();
    }
    else
    {
        //redirect to wx login
        window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdebf3e2511cf03f7&redirect_uri=http%3A%2F%2Fwx.slocy.cn%2Flesson.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    }

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