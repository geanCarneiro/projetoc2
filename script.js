jQuery(function (){
        
    for(var i = 0; i < qtCoresEscolhidas; i++) {
        novaCor();
    }

    corEscolhidaIndex = Math.floor(Math.random() * qtCoresEscolhidas);

    updateTentativas()

    coresEscolhidas.forEach((value, index) => {
        let novoElemento = jQuery('<div>');
        novoElemento.attr("index", index)
        novoElemento.attr("role", "button")
        novoElemento.attr("aria-label", value)
        novoElemento.attr("tabIndex", 0)
        novoElemento.on("click", function (){
            if (fimDeJogo) return;
            i = novoElemento.attr("index");
            if(i == corEscolhidaIndex){
                showEndGame("PARABENS, VOCÊ VENCEU!!")
                $("body").css("background-color", value);
                fimDeJogo = true;
            } else {
                tentativas++;
                updateTentativas()
                if(tentativas >= maxTentativas) {
                    showEndGame("VOCÊ PERDEU, A COR ERA " + value.toUpperCase() + "!!")
                    fimDeJogo = true;
                }
            }
        })
        novoElemento.css('background-color', value);
        novoElemento.appendTo('#tabelaCores');

        let p = jQuery('<div>', {
            class: 'nomeCor'
        });
        p.css('background-color', 'white');
        p.css('border', '0.1rem solid black');
        p.css('display', 'block');
        p.text(value);
        p.appendTo(novoElemento);
    });
    
    

});

let fimDeJogo = false;
let qtCoresEscolhidas = 10;
let coresEscolhidas = [];
let corEscolhidaIndex;
let tentativas = 0;
let maxTentativas = 3;

const novaCor = function() {
    if(coresEscolhidas.length == cores.length) return null;
    let novaCor;
    do {
        novaCor = cores[Math.floor(Math.random() * 148)]
    } while (coresEscolhidas.includes(novaCor));
    coresEscolhidas.push(novaCor);
};

async function getJSON(caminho) {
    let resposta = await fetch(caminho);

    if(resposta.ok) {
        return await resposta.json();
    }
    
    return []
}

function showEndGame(msg) {
    $("#dialog h2").text(msg);
    $("#dialogScreen").css("display", "flex");
    $("#dialogScreen").css("width", "calc(" + $("#app").css("width") + " + 2rem)");
    $("#dialogScreen").css("height", "calc(" + $("#app").css("height") + " + 2rem)");
}


function updateTentativas(){
    $("span#tentativas").text(tentativas + "/" + maxTentativas);
}