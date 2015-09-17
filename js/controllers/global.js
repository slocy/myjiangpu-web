/**
 * stop user to pull down the page in wechat.
 * Created by JAMES on 09/17/15.
 */


document.querySelector('body').addEventListener('touchstart', function (ev) {
    ev.preventDefault();
});
