/*
Get the JS API ticket, it's temporary access method for single request.
The ticket should be stored at server side.
*/
function getApiTicketTemporary(){

			$.ajax({
				url: "http://wx-api.slocy.cn/wx/getticket",
				crossDomain: true, 
				success: function( data ) {
					console.log(data);

					wxapi_init(data.ticket);
					alert(data.ticket);
				}
			});
}


/*
Fire every button.
*/
$( "#button_init" ).click( function( event ) {
	wxapi_init();
});

$( "#button_shareFriend" ).click( function( event ) {
	shareToFriend();
});

$( "#button_checkBrowser" ).click( function( event ) {
	checkBrowser();
});

$( "#button_chooseImage" ).click( function( event ) {
	chooseImage();
});

$( "#button_getNetworkType" ).click( function( event ) {
	getNetworkType();
});

$( "#button_getLocation" ).click( function( event ) {
	getLocation();
});