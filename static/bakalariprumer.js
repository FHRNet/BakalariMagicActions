"use strict";

/*
Name: Bakalari Actions
Author: FHR; fhrnet.eu
Version: 1.3
Licence: GPL v3

This version works with "Next"
*/


var znamka	= 0;
var vaha	= 0;
var lastid	= 0;


function calculateWeightedAvg() {
	if(jQuery('.prumer').length) {
		jQuery('.prumer').remove();
	}

	jQuery(".bx-viewport").children(".znamky").each(function() {
		let znamky 	= [];
		let vahy 	= [];
		let sumznamky 	= 0;
		let sumvahy	= 0;
		let sum		= 0;
		let wavg	= 0;


		jQuery(this).find(".znamka-v").each(function() {
			let znamka = jQuery(this).data("clasif");

			vahy.push(znamka.vaha);
			sumvahy += (znamka.vaha);

			znamka = Number(znamka.MarkText.replace(/X/g,0).replace(/\?/g,0).replace(/U/g,0).replace(/N/g,0).replace(/A/g,0).replace(/1-/g,1.5).replace(/2-/g,2.5).replace(/3-/g,3.5).replace(/4-/g,4.5).replace(/-/g,0).replace(/!$/,''));
			znamky.push(znamka);
			sumznamky += znamka;
		});


		jQuery.each(znamky, function(id, zn) {
			zn = Number(zn);
			if(zn !== 0) {
				sum += (zn * vahy[id]);
			} else {
				sumvahy -= vahy[id];
			}
		});
		wavg = (Math.round(sum/sumvahy*100)/100).toFixed(2);
		if (isNaN(wavg)) {
			wavg = 0;
		}

		jQuery(this).parent().parent().parent().find(".obal").append(jQuery('<h2 title="Vazeny prumer" style="color: blueviolet;" class="prumer">' + wavg + '</h2>'));
	});

	console.log("Recalculated averages");
}
function addMark (znamka,vaha,element) {
	znamka = Math.round(znamka);
	vaha = Math.round(vaha);
	if (znamka > 5) {znamka = 5;}
	if (znamka < 1) {znamka = 1;}
	if (vaha > 10) {vaha = 10;}
	if (vaha < 1) {vaha = 1;}
	jQuery(element).append('<div onclick="this.parentElement.removeChild(this); calculateWeightedAvg();" class="znamka-v" data-clasif="{&quot;vaha&quot;:' + vaha + ',&quot;MarkText&quot;:&quot;' + znamka + '&quot;}" style="background-color: #dfd; float: left; list-style: none; position: relative; width: 56px;"> <div class="cislovka stredni"> <div class="ob">' + znamka + '</div> </div> <div class="bod"></div> <div class="dodatek"> <span>' + vaha + '</span><br>Právě teď </div> </div>');
	calculateWeightedAvg();
}
function addMarkAdders () {
	jQuery(".znamky").prepend('<div class="znamka-v" data-clasif="{&quot;vaha&quot;:0,&quot;MarkText&quot;:&quot;0&quot;}" style=" float: left; list-style: none; position: relative; width: 56px;"> <div class="cislovka stredni"> <div class="ob"> <input class="nova-znamka" type="number" min="1" max="5" maxlength="1" style="font-size: 17px; width: 2em;"> </div> </div> <div class="bod"><input type="button" onclick="addMark(jQuery(this).parents(&quot;.znamka-v&quot;).find(&quot;.nova-znamka&quot;)[0].value,jQuery(this).parents(&quot;.znamka-v&quot;).find(&quot;.nova-vaha&quot;)[0].value,jQuery(this).parents(&quot;.znamky&quot;));jQuery(this).parents(&quot;.znamka-v&quot;).find(&quot;.nova-znamka&quot;)[0].value=&quot;&quot;;jQuery(this).parents(&quot;.znamka-v&quot;).find(&quot;.nova-vaha&quot;)[0].value = &quot;&quot;;" value="+"></div> <div class="dodatek"> <span> <input type="number" class="nova-vaha" min="1" max="10" maxlength="1" style="font-size: 15px; width: 2em;"> </span><br></div> </div>');
}
jQuery(document).ready(function() {
	if(window.location.href.indexOf("prubzna.aspx") > -1) {
		calculateWeightedAvg();
		addMarkAdders();
	}
});
