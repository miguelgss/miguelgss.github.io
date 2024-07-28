let imgPath = "assets/base_ficha/"
let file = "random.png"
let propicFile;
let nome = "Fulano"

let textFillColor = "white"
let textStrokeColor = "black"

const ficha = document.getElementById("ficha");
const ctx = ficha.getContext("2d");

var imageLoader = document.getElementById('imageLoader');
var nomeInput = document.getElementById("nome");
var textFillColorInput = document.getElementById("textFill");
var textStrokeColorInput = document.getElementById("textStroke");


const personagemEscolhida = () => {
    var select = document.getElementById("personagem");
    var personagem = select.options[select.selectedIndex].value;
    file = personagem + ".png";
    draw()
}

const atualizaNome = (e) => {
    nome = e.target.value;
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
    reader.onload = function(event){
        propicFile = event.target.result;
        draw();
    }

    reader.readAsDataURL(e.target.files[0]);     
}


const draw = () => {
    const ficha = document.getElementById("ficha");
    const ctx = ficha.getContext("2d");
    const img = new Image();
    const imgPP = new Image();

    ctx.fillStyle = textFillColor;
    ctx.strokeStyle = textStrokeColor;
    ctx.font = "bold 2rem sans-serif";

    img.onload = () => {
        ctx.clearRect(0, 0, ficha.width, ficha.height)
        ctx.drawImage(img, 0, 0);
        const textProps = ctx.measureText(nome);
        centralize = 210 - (textProps.width) / 2;
        ctx.fillText(nome, centralize, 32);
        ctx.strokeText(nome, centralize, 32);

        imgPP.onload = function(){
            ctx.drawImage(imgPP, 21, 31, 62, 62);
        }
    };

    img.src = imgPath + file
    imgPP.src = propicFile;

}

imageLoader.addEventListener('change', uploadFotoPerfil, false);
nomeInput.addEventListener('input', atualizaNome, false);
textFillColorInput.addEventListener('input', atualizaFill, false)
textStrokeColorInput.addEventListener('input', atualizaStroke, false)

draw();
