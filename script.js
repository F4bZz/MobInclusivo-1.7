const formulario = document.getElementById("registroForm");
const campoNome = document.getElementById("nome");
const campoCategoria = document.getElementById("categoria");
const campoRelato = document.getElementById("relato");
const cardsContainer = document.getElementById("cardsContainer");
const contador = document.getElementById("contador");
const mensagem = document.getElementById("mensagem");
const emptyState = document.getElementById("emptyState");
const tabs = document.getElementsByClassName("window")
let totalRegistros = 0;

function showTab(tab){
    [...tabs].forEach((obj) => {obj.style.display = "none"})
    tabs[tab-1].style.display = "block"
}

function browseRoutes(text){
    
}

function atualizarContador() {

    contador.textContent =
        totalRegistros === 1
            ? "1 registro"
            : `${totalRegistros} registros`;

}

function obterDataAtual() {

    const agora = new Date();

    return agora.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
    });

}


function criarCard(nome, categoria, relato) {
    const card = document.createElement("article");
    card.classList.add("card");
    const titulo = document.createElement("h3");
    titulo.textContent = "Registro de Acessibilidade";
    const nomeElemento = document.createElement("p");
    nomeElemento.classList.add("card-info");
    const nomeLabel = document.createElement("strong");
    nomeLabel.textContent = "Nome: ";
    nomeElemento.append(nomeLabel, document.createTextNode(nome));
    const categoriaElemento = document.createElement("p");
    categoriaElemento.classList.add("card-info");
    const categoriaLabel = document.createElement("strong");
    categoriaLabel.textContent = "Categoria: ";
    categoriaElemento.append(categoriaLabel, document.createTextNode(categoria));
    const relatoContainer = document.createElement("div");
    relatoContainer.classList.add("card-relato");
    const relatoLabel = document.createElement("strong");
    relatoLabel.textContent = "Relato: ";
    const relatoTexto = document.createElement("p");
    relatoTexto.textContent = relato;
    relatoContainer.append(relatoLabel, relatoTexto);
    const dataElemento = document.createElement("p");
    dataElemento.classList.add("card-data");
    dataElemento.textContent = `Data: ${obterDataAtual()}`;
    const statusElemento = document.createElement("span");
    statusElemento.classList.add("status");
    statusElemento.textContent = "Recebido";
    card.append(
        titulo,
        nomeElemento,
        categoriaElemento,
        relatoContainer,
        dataElemento,
        statusElemento
    );

    if (emptyState) {
        emptyState.remove();
    }
    totalRegistros+=1
    atualizarContador()

    return card;

}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = campoNome.value.trim();
    const categoria = campoCategoria.value;
    const relato = campoRelato.value.trim();

    if (!nome || !categoria || !relato) {
        mensagem.textContent =
            "Por favor, preencha todos os campos.";
        return;
    }

    

    const novoCard = criarCard(
        nome,
        categoria,
        relato
    );
    cardsContainer.prepend(novoCard);
    totalRegistros++;

    mensagem.textContent =
        "Registro salvo com sucesso!";
    
    formulario.reset();
    campoNome.focus();

    let storage_json
    if (localStorage.getItem("cards")){
        storage_json = JSON.parse(localStorage.getItem("cards"))
    } else {
        storage_json = []
    }
    storage_json.push({"name": nome, "category": categoria, "report": relato})
    console.log(`ARMAZENADO ${JSON.stringify(storage_json)}`)
    localStorage.setItem("cards", JSON.stringify(storage_json))
});

let card_storage = JSON.parse(localStorage.getItem("cards"))

if (card_storage){
    console.log(card_storage)
    card_storage.forEach((value) => {
        nome = value["name"]
        categoria = value["category"]
        relato = value["report"]
    
        cardsContainer.appendChild(criarCard(nome, categoria, relato))
    });
}
