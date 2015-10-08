

/**
 * Cache userinfo
 * Created by JAMES on 10/07/15.
 */


function Global (){}
Global.prototype = {

    ///get userinfo from weixin and save it to localStorage.
    getAndCacheUser:function(code) {

        var user;
        /* 手机访问时需改为远程获取 */
        $.getJSON("http://wx-api.slocy.cn/auth/fetchuser/" + code, //"user.json",
            function (json) {
                user = $.totalStorage("user", json.userinfo);
                return user;
            });
    },

    getUser:function(){
        return this.hasUser() ? $.totalStorage("user") : null;
    },

    hasUser:function(){
        var user = $.totalStorage("user");
        return user.openid != null;
    }


}



/**
 * stop user to pull down the page in wechat.
 * Created by JAMES on 09/17/15.
 */


/* solution 2 */
//document.querySelector('body').addEventListener('touchstart', function (ev) {
//    ev.preventDefault();
//});
//



/* solution 1 */
//$(document).ready(function(){
//
//    var overscroll = function(el) {
//        el.addEventListener('touchstart', function() {
//            var top = el.scrollTop
//                , totalScroll = el.scrollHeight
//                , currentScroll = top + el.offsetHeight
//            //If we're at the top or the bottom of the containers
//            //scroll, push up or down one pixel.
//            //
//            //this prevents the scroll from "passing through" to
//            //the body.
//            if(top === 0) {
//                el.scrollTop = 1
//            } else if(currentScroll === totalScroll) {
//                el.scrollTop = top - 1
//            }
//        })
//        el.addEventListener('touchmove', function(evt) {
//            //if the content is actually scrollable, i.e. the content is long enough
//            //that scrolling can occur
//            if(el.offsetHeight < el.scrollHeight)
//                evt._isScroller = true
//        })
//    }
//    overscroll(document.querySelector('#booksResult'));
//    document.body.addEventListener('touchmove', function(evt) {
//        //In this case, the default behavior is scrolling the body, which
//        //would result in an overflow.  Since we don't want that, we preventDefault.
//        if(!evt._isScroller) {
//            evt.preventDefault()
//        }
//    })
//});