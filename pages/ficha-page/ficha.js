import { systemcards, spellcards, skillcards } from './cartas.js'

let imgPath = "assets/base_ficha/"
let file = "random.png"
let propicFile;
let nome = "Fulano"
let regiao = "Gensou Arena / GE"

let cartas = []

let textFillColor = "white"
let textStrokeColor = "black"

var imageLoader = document.getElementById('imageLoader');
var nomeInput = document.getElementById("nome");
var regiaoInput = document.getElementById("regiao");
var textFillColorInput = document.getElementById("textFill");
var textStrokeColorInput = document.getElementById("textStroke");

const setListeners = () => {
    imageLoader.addEventListener('change', uploadFotoPerfil, false);
    nomeInput.addEventListener('input', atualizaNome, false);
    textFillColorInput.addEventListener('input', atualizaFill, false);
    textStrokeColorInput.addEventListener('input', atualizaStroke, false);
    regiaoInput.addEventListener('input', atualizaRegiao, false);
    document.getElementById("reload").addEventListener('click', draw, false);

    document.getElementById("removeOne").addEventListener('click', RemoveOneCard, false);
    document.getElementById("removeAll").addEventListener('click', RemoveAllCards, false);
}

const personagemEscolhida = (e) => {
    var personagem = e.target.value;
    file = personagem + ".png";
    draw();
}

const showSelectableCards = (e) => {
    var select = e.target.value;
    var cardListToUse = select == "system" ? systemcards : skillcards.concat(spellcards);
    
    ClearCards();
    for (var i = 0; i < cardListToUse.length; i++) {
        var img = document.createElement('img');
        var route = `assets/card/${select}/${cardListToUse[i]}`;
        img.id = route;
        img.src = route;
        img.className = "carta"
        img.addEventListener("click", AppendCardClicked, false);

        if(UrlExists(img.src))
            document.getElementById('cartasGroup').appendChild(img);
    }

    function UrlExists(url) {
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        return http.status != 404;
    }

    function AppendCardClicked(e){
        cartas.push(e.target.id);
        draw();
    }

    function ClearCards() {
        document.getElementById('cartasGroup').innerHTML = '';
    }
}

const RemoveAllCards = () => {
    cartas = [];
    draw();
}
const RemoveOneCard = () => {
    cartas.pop();
    draw();
}

const atualizaNome = (e) => {
    nome = e.target.value;
    draw();
}

const atualizaRegiao = (e) => {
    regiao = e.target.value;
    draw();
}

const atualizaFill = (e) => {
    textFillColor = e.target.value;
    draw();
}

const atualizaStroke = (e) => {
    textStrokeColor = e.target.value;
    draw();
}

const uploadFotoPerfil = (e) => {
    var reader = new FileReader();
    reader.onload = function (event) {
        propicFile = event.target.result;
        draw();
    }

    if (e.target.files[0] != undefined)
        reader.readAsDataURL(e.target.files[0]);
}

const draw = () => {
    const ficha = document.getElementById("ficha");
    const ctx = ficha.getContext("2d");
    const img = new Image();
    const imgPP = new Image();
    img.src = imgPath + file
    if (propicFile)
        imgPP.src = propicFile;

    ctx.fillStyle = textFillColor;
    ctx.font = "bold 2.2rem verdana";

    img.onload = () => {
        ctx.clearRect(0, 0, ficha.width, ficha.height)
        ctx.drawImage(img, 0, 0);

        imgPP.onload = () => {
            ctx.drawImage(imgPP, 21, 31, 62, 62);
        }

        drawNome(ctx);
        drawRegiao(ctx);
        drawSignatureCards(ctx);
    };

    const drawNome = (ctx) => {
        const textProps = ctx.measureText(nome);
        var centralize = 210 - (textProps.width) / 2;
        // ctx.strokeText(nome, centralize, 32);
        ctx.shadowBlur = 5;
        ctx.shadowColor = textStrokeColor;
        ctx.fillText(nome, centralize, 32);
    };

    const drawRegiao = (ctx) => {
        var x = 20; var y = 112;
        let f = new FontFace("gothic", "url(assets/fonts/OPTIFranklinGothic-Medium.otf)");

        f.load().then(() => {
            ctx.font = "bold 1rem Gothic Medium";
            ctx.shadowBlur = 5;
            ctx.strokeText(regiao, x, y);
            ctx.fillText(regiao, x, y);
            ctx.shadowBlur = 0;
        });
    };

    const drawSignatureCards = (ctx) => {
        var x = 88; var y = 50;
        ctx.font = "bold 1rem verdana";
        ctx.shadowBlur = 5;
        ctx.strokeText("Signature", x, y);
        ctx.fillText("Signature", x, y);

        cartas.forEach((value, i) => {
            const novaCarta = new Image();
            novaCarta.src = value;
            novaCarta.onload = () => {
                ctx.drawImage(novaCarta, x + 24 * i, 58, 21, 33)
            }
        });

        ctx.shadowBlur = 0;
    }
}

document.getElementById("categoryCards").onchange = showSelectableCards;
document.getElementById("personagem").onchange = personagemEscolhida;

setListeners();
draw();
