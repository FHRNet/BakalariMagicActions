function addColumn() {
	if (jQuery('.zbyvhlav').length) {
		jQuery('.zbyvhlav').remove();
	}
	
	jQuery('.zamhlava').append('<td class="zbyvhlav">Zbývá</td>');
}

function addRemaining() {
	
	if (jQuery('.zbyvdost').length) {
		jQuery('.zbyvdost').remove();
	}
	if (jQuery('.zbyvmalo').length) {
		jQuery('.zbyvmalo').remove();
	}
	
	jQuery('.zamtable').find('tbody').children().not('.zamhlava').each(function() {
		var celkem = jQuery(this).children(':nth-child(2)').text();
		var absence = jQuery(this).children(':nth-child(3)').text();
		var zbyva = Math.floor(celkem/4)-absence;
		
		var cssclass;
		if (zbyva <=0) {
			cssclass='zbyvmalo';
		} else {
			cssclass='zbyvdost';
		}
		
		jQuery(this).append('<td class="'+cssclass+'">'+zbyva+'</td>');
	});
}

function applyStyle() {
	jQuery('.zbyvhlav').css('color', 'blue');
	jQuery('.zbyvdost').css('color', 'blue');
	jQuery('.zbyvmalo').parent().css('color', 'red');
	jQuery('.rozseznampredhi').removeClass('rozseznampredhi').addClass('rozseznampred');
}

jQuery(document).ready(function() {
	addColumn();
	addRemaining();
	applyStyle();
	console.log("Calculated remaining absences");
});
