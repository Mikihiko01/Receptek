var receptTomb = [];
var lepteoIndex = [];
$(function () {
    $.ajax({url: "Receptek.json", success: function (result) {
            receptTomb = result;
            console.log(result);
            tablazatletrehoz();
             $("#OK").click(ment);

        }});
    $("#bal").click(balraleptet);
    $("#jobb").click(jobbraleptet);
    $("article").on("click", "tr", kivalaszt);
});
function tablazatletrehoz() {
    $("article").append("<table>");
    $("article table").append("<tr><th>Név</th><th>elkészités</th><th>leírás</th><th>kép</th><th>Hozzávalok</th></tr>");
    for (var i = 0; i < receptTomb.length; i++) {
        $("article table").append("<tr id=' " + i + " '>");
        for (var item in receptTomb[i]) {
            $("article table tr").eq(i + 1).append("<td>" + receptTomb[i][item] + "</td>");
        }

    }
    kategoriaKivalaszt();
    
//    $("tr").click(kivalaszt);

     $("article").on("click", "tr", rendez);
}
function kategoriaKivalaszt() {
    $("table").append("<div class='kategoria style='width:200px;'>");
    $("table").append("<select>");
    $("select").append("<option value='0'>Katekoráik");
    $("select").append('<option value="1">Leves');
    $("select").append('<option value="2">Deszert');
    $("select").append('<option value="2">Fő étel');
    
    for (var i = 0; i < receptTomb.length; i++) {
    $("select option").eq(i + 1).click(rendez);
        
    }


}

var kategoriaRendezes = true;
function rendez() {
    
    if (kategoriaRendezes) {
        receptTomb.sort(function (a, b) {
            return Number(a.kategoria > b.kategoria) - 0.5;
        });
        kategoriaRendezes = false;
    } else {
        receptTomb.sort(function (a, b) {
            return Number(a.kategoria < b.kategoria) - 0.5;
        });
        kategoriaRendezes = true;
    }


}


function kivalaszt() {
    console.log("itt vagyok");
    var id = $(this).attr("id");
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
function ment() {
    var ujRecept = {};
    ujRecept.termeknev = $("#nev").val();
    ujRecept.ar = $("#nev").val();
    ujRecept.tipus = "Táblás";
    receptTomb.push(ujRecept);
    tablazatletrehoz();

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
