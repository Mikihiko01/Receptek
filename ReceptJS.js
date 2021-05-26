var receptTomb = [];
var lepteoIndex = [];
$(function () {
    $.ajax({url: "Receptek.json", success: function (result) {
            receptTomb = result;
            console.log(result);
            tablazatletrehoz();
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
//    $("tr").click(kivalaszt);
}
function kivalaszt() {
    console.log("itt vagyok");
    var id = $(this).attr("id");
    lepteoIndex = id;
    megjelinit(id);
    console.log(id);
    console.log(receptTomb[id]);
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
//var receptek = '[{"nev": "somlói galuska","ido": "60","leiras": "így készül a Somlói Galuska","kep": "kepek/galuska.png","hozzavalok": [{"csoki": "1 tábla"}, {"tojás": "6 db"}, {"liszt": "1,5 kg"}]},{"nev": "Pörkölt","ido": "30","leiras": "így készül a Pörkölt","kep": "kepek/porkolt.png","hozzavalok": [{"hus": "1 kg"}, {"hagyma": "2 fej"}, {"paradicsom": "1 db"},{"paprika": "3 db"}]}, {"nev": "leves","ido": "10","leiras": "így készül a Leves","kep": "kepek/valami.png","hozzavalok": [{"viz": "1 l"}, {"liszt": "1 kanál"}]}]';
