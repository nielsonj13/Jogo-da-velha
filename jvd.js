const jogador1 = "X";
const jogador2 = "O";
var tempoJogo = jogador1;
var fimJogo = false;

atualizaMostrador();
inicializarEspacos();

function atualizaMostrador() {
    if (fimJogo) { return; }

    var jogador = document.querySelectorAll("div#mostardor img")[0];
    jogador.setAttribute("src", "imagens/" + tempoJogo + ".png");
}

function inicializarEspacos() {
    var espacos = document.getElementsByClassName("espaco");
    for (var i = 0; i < espacos.length; i++) {
        espacos[i].addEventListener("click", function () {
            if (fimJogo) { return; }
            if (this.getElementsByTagName("img").length == 0) {
                this.innerHTML = "<img src='imagens/" + tempoJogo + ".png'>";
                this.setAttribute("jogada", tempoJogo);
                tempoJogo = (tempoJogo == jogador1) ? jogador2 : jogador1;
                atualizaMostrador();
                verificarVencedor();
            }
        });
    }
}

async function verificarVencedor() {
    var a1 = document.getElementById("a1").getAttribute("jogada");
    var a2 = document.getElementById("a2").getAttribute("jogada");
    var a3 = document.getElementById("a3").getAttribute("jogada");

    var b1 = document.getElementById("b1").getAttribute("jogada");
    var b2 = document.getElementById("b2").getAttribute("jogada");
    var b3 = document.getElementById("b3").getAttribute("jogada");

    var c1 = document.getElementById("c1").getAttribute("jogada");
    var c2 = document.getElementById("c2").getAttribute("jogada");
    var c3 = document.getElementById("c3").getAttribute("jogada");

    var vencedor = "";

    if ((a1 && a1 == b1 && a1 == c1) ||
        (a1 && a1 == a2 && a1 == a3) ||
        (a1 && a1 == b2 && a1 == c3)) {
        vencedor = a1;
    } else if ((b2 && b2 == b1 && b2 == b3) ||
        (b2 && b2 == a2 && b2 == c2) ||
        (b2 && b2 == a3 && b2 == c1)) {
        vencedor = b2;
    } else if ((c3 && c3 == a3 && c3 == b3) ||
        (c3 && c3 == c1 && c3 == c2)) {
        vencedor = c3;
    } else if (a1 && a2 && a3 && b1 && b2 && b3 && c1 && c2 && c3) {
        vencedor = "Empate";
    }

    if (vencedor) {
        fimJogo = true;
        await sleep(50);
        if (vencedor == "Empate") {
            alert("Esse jogo não teve ganhador");
        } else {
            alert("O ganhador foi: '" + vencedor + "'");
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
