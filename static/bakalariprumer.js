"use strict";

/*
Name: Bakalari Actions
Author: Greenscreener; grnscrnr.tk
Version: 2.0
Licence: GPL v3

This version works with "Next", now a little better.
*/

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".info-text").forEach(e => {
        e.style.width = "20em";
        e.innerHTML = `
            <div class="pridavac-znamek"> 

                <input type="number" min="1" max="5" step="0.5" required class="znamka-input" style="width: 2em; height: 2.5em;">
                <input type="number" min="1" max="10" step="1" required class="vaha-input" style="width: 2em; height: 2.5em;">
                <button data-id="${e.dataset.id}" style="width: 2.5em; height: 2.5em;">+</button>
            </div>               
            `;
    });
    document.querySelectorAll(".pridavac-znamek").forEach(e => e.onclick = (e) => {e.stopPropagation()});
    document.querySelectorAll(".pridavac-znamek button").forEach(e => {
        e.addEventListener("click", (event) => {
            event.preventDefault();
            const radek = document.getElementById(e.dataset.id);
            const znamky = radek.querySelector(".znamky");
            const znamkaDiv = document.createElement("div");
            const znamka = radek.querySelector(".znamka-input").value;
            const vaha = radek.querySelector(".vaha-input").value;
            if (vaha === "") {
                e.parentElement.querySelector("input").focus();
                return;
            }
            znamkaDiv.innerHTML = `
                <div class='cislovka stredni'>
                    <div class='ob'>${znamka.toString().replace(".5","-")}</div>
                </div> 
                <div class='bod'>

                </div> 
                <div class='dodatek'>
                    <p>${vaha}</p>
                    <p>Právě teď </p>
                </div> 
            `;
            znamkaDiv.style.backgroundColor = '#dfd';
            znamkaDiv.style.float = 'left';
            znamkaDiv.style.listStyleType = 'none';
            znamkaDiv.style.position = 'relative';
            znamkaDiv.style.width = '56px';

            znamkaDiv.dataset.clasif = `
            {
                "vaha": ${vaha},
                "MarkText": "${znamka.toString().replace(".5","-")}"
            }
            `;
            znamkaDiv.dataset.vaha = vaha;
            znamkaDiv.dataset.znamka = znamka;

            znamkaDiv.classList.add("znamka-v");

            znamkaDiv.addEventListener("click", (e) => {
                znamkaDiv.parentElement.removeChild(znamkaDiv);
                calculateWeightedAvg();
            });

            znamky.append(znamkaDiv);
            calculateWeightedAvg();
            window.dispatchEvent(new Event('resize'));
        });
    });
});

function calculateWeightedAvg() {
    document.querySelectorAll(".predmet-radek").forEach(e => {
        let znamky = [...e.querySelectorAll(".znamka-v")];
        znamky = znamky.map(e => {
            const json = JSON.parse(e.dataset.clasif);
            return {
                znamka: parseFloat(json.MarkText.replace("-",".5")),
                vaha: json.vaha
            };
        });
        const sumznamky = znamky.reduce((a, v) => (a.hasOwnProperty("znamka") ? (isNaN(a.znamka) ? 0 : (a.znamka * a.vaha)) : a) + (isNaN(v.znamka) ? 0 : (v.znamka * v.vaha)));
        const sumvahy = znamky.reduce((a, v) => (a.hasOwnProperty("vaha") ? (isNaN(a.znamka) ? 0 : (a.vaha)) : a) + (isNaN(v.znamka) ? 0 : (v.vaha)));
        let prumer = sumznamky.hasOwnProperty("znamka") ? sumznamky.znamka : sumznamky / sumvahy;
        prumer = Math.round(prumer * 100)/100;
        e.querySelectorAll(".sim-avg").forEach(e => {e.parentElement.removeChild(e);});
        e.querySelector(".dalsi-dva").innerHTML+=`<div class="sim-avg" style="color: darkred" title="vážený průměr s simulací známek">${prumer.toString().replace(".", ",")}</div>`;
    });
}
