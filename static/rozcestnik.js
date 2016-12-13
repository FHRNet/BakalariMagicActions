/*
Script to load the respective script
*/
jQuery(document).ready(function() {
	if (jQuery('#cphmain_roundzames').length) {
		jQuery.getScript("/static/bakalarizamesk.js")
	}
	if (jQuery('#cphmain_roundprub').length) {
		jQuery.getScript("/static/bakalariprumer.js")
	}
});
