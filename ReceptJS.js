var receptTomb = [];
var lepteoIndex = [];
$(function () {
    $.ajax({url: "Receptek.json", success: function (result) {
            receptTomb = result;
            console.log(result);
            tablazatletrehoz();
            kategoriaKivalaszt();

        }});
    $("#OK").click(ment);
    $("#bal").click(balraleptet);
    $("#jobb").click(jobbraleptet);
    $("article").on("click", "tr", kivalaszt);
});
function tablazatletrehoz() {
    $("article").empty();
    $("article").append("<table>");
    $("article table").append("<tr><th>Név</th><th>elkészités</th><th>leírás</th><th>kép</th><th>Kategoriák</th><th>Hozzávalok</th></tr>");
    for (var i = 0; i < receptTomb.length; i++) {
        $("article table").append("<tr id=' " + i + " '>");
        for (var item in receptTomb[i]) {
            $("article table tr").eq(i + 1).append("<td>" + receptTomb[i][item] + "</td>");
        }

    }

//    $("tr").click(kivalaszt);
}

//Kategoria Kiválasztás
function kategoriaKivalaszt() {
    $("nav").append("<div class='kategoria style='width:200px;'>");
    $("nav div").append("<select>");
    $("select").append("<option >Válasz rendezési pontott");
    $("select").append('<option >nev');
    $("select").append('<option >leiras');
    $("select").append('<option >kategoria');

    
        $("select").change(rendez);
        

    
    


}
function tablazatbarak() {
    $("table").append(tablazatletrehoz());
}
//Kategoria Rendezés
var kategoriaRendezes = true;
function rendez() {
    console.log("rendez");
    var id = $("select").val();

    if (kategoriaRendezes) {
        
        receptTomb.sort(function (a, b) {
            return Number(a[id] > b[id]) - 0.5;
        });
        kategoriaRendezes = false;
    } else {
        receptTomb.sort(function (a, b) {
            return Number(a[id] < b[id]) - 0.5;
        });
        kategoriaRendezes = true;
    }
    tablazatletrehoz();


}


function kivalaszt() {
    console.log("itt vagyok");
    var id = Number($(this).attr("id"));
    lepteoIndex = id;
    console.log(id);
    console.log(receptTomb[id]);

    megjelinit(id);
}
function megjelinit(id) {
    $("#recept").empty();
    $("#recept").append("<img src='" + receptTomb[id].kep + "'alt='" + receptTomb[id].nev + "'>");
    $("#recept").append("<h2>");
    $("#recept h2").append(receptTomb[id].nev);
    $("#recept").append("<p>");
    $("#recept p").append(receptTomb[id].leiras);
    $("#recept").append("<p>");
    $("#recept p").eq(1).append("Elkészitési idő: " + receptTomb[id].ido + "perc");
    $("#recept").append("<h3>");
    $("#recept h3").append("Hozzávalok");
    $("#recept").append("<ul>");
    var hozzavalok = receptTomb[id].hozzavalok;
    console.log(hozzavalok);
    for (var i = 0; i < hozzavalok.length; i++) {
        for (var item in hozzavalok[i]) {
            $("#recept ul").append("<li>" + item + " " + hozzavalok[i][item] + "</li>");
        }
    }

}
//  új receptett
function ment() {
    var ujRecept = {};
    ujRecept.nev = $("#nev").val();
    ujRecept.ido = $("#elkeszites").val();
    ujRecept.kategoria = ".receptkategoria";
    receptTomb.push(ujRecept);
    tablazatbarak();

}
function balraleptet() {

    lepteoIndex--;
    if (lepteoIndex < 0) {
        lepteoIndex = receptTomb.length - 1;
    }
    megjelinit(lepteoIndex);
    console.log(lepteoIndex);
}

function jobbraleptet() {
    lepteoIndex++;
    if (lepteoIndex > receptTomb.length - 1) {
        lepteoIndex = 0;
    }
    megjelinit(lepteoIndex);
}
