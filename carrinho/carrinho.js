// --- 1. DEFINIÇÃO DE VARIÁVEIS DE ELEMENTOS ---

const container = document.getElementById("container-carrinho");

// Resumo do pedido 
const subtotalElement = document.getElementById("subtotal-valor");
const freteElement = document.getElementById("frete-valor");
const descontoElement = document.getElementById("desconto-valor");
const totalFinalElement = document.getElementById("total-final-valor");


// --- 2. LÓGICA DO CARRINHO ---

// Carrega o carrinho
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

carrinho.forEach(item => {
    if (!item.quantidade) {
        item.quantidade = 1;
    }
});

// Função auxiliar para salvar no localStorage e renderizar
function salvarERenderizar() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarCarrinho();
}

function atualizarTotal() {
    // 1. CALCULA O SUBTOTAL (valor total dos itens)
    const subtotal = carrinho.reduce((acc, item) => {
        const precoItem = parseFloat(String(item.price).replace("R$", "").replace(",", ".").trim());
        if (isNaN(precoItem)) return acc; // Previne erros se o preço for inválido
        return acc + (precoItem * item.quantidade);
    }, 0);

    // DEFINE FRETE, DESCONTO E CONDIÇÕES
    let frete = 15.00; // Frete padrão
    let desconto = 0.00; 

    if (subtotal >= 50) {
        frete = 0.00;
    }

    if (subtotal >= 30) {
        desconto = subtotal * 0.10; // 10% de desconto
    }
    
    const totalFinal = subtotal + frete - desconto;

    if (subtotalElement) subtotalElement.textContent = "$ "+subtotal.toFixed(2);
    if (freteElement) freteElement.textContent = "$ "+frete.toFixed(2);
    if (descontoElement) descontoElement.textContent = "$ "+desconto.toFixed(2);
    if (totalFinalElement) totalFinalElement.textContent = "$ "+totalFinal.toFixed(2);
}

// Montagem do Carrinho
function renderizarCarrinho() {
    container.innerHTML = "";

    if (carrinho.length === 0) {//Verifica se o carrinho tem alguma coisa
        container.innerHTML = "<h3>Carrinho vazio!</h3>";
        // Limpa os valores de resumo quando o carrinho está vazio
        if (subtotalElement) subtotalElement.textContent = "0.00";
        if (freteElement) freteElement.textContent = "0.00";
        if (descontoElement) descontoElement.textContent = "0.00";
        if (totalFinalElement) totalFinalElement.textContent = "0.00";
        return;
    }

    carrinho.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card-item");
        const precoUnitarioFormatado = parseFloat(String(item.price).replace("R$", "").replace(",", ".").trim()).toFixed(2);

        card.innerHTML = `
            <div class="card-header">
                <img src="${item.thumbnail}" class="card-img"> 
            </div>
            
            <div class="card-body">
                <h3>${item.title}</h3>
                <p>${item.category}</p>
                <strong>$ ${precoUnitarioFormatado}</strong> 
            </div>

            <div class="card-footer">
            <div class="controles">
                <button class="diminuir" data-index="${index}">-</button>
                <span class="quantidade">${item.quantidade}</span>
                <button class="aumentar" data-index="${index}">+</button>
            </div>
            <button class="remover" data-index="${index}">Remover</button>
            </div>
        `;

        container.appendChild(card);
    });

    atualizarTotal(); // Chama o cálculo e exibição dos totais após renderizar os itens
}


// --- 5. EVENT LISTENERS ---

container.addEventListener("click", (event) => {
    const target = event.target;
    const index = target.getAttribute("data-index");

    if (index === null) return; // Garante que apenas botões com data-index sejam processados

    const itemIndex = parseInt(index);

    // --- Lógica de Aumentar ---
    if (target.classList.contains("aumentar")) {
        carrinho[itemIndex].quantidade++;
        salvarERenderizar();
    }

    // --- Lógica de Diminuir ---
    if (target.classList.contains("diminuir")) {
        if (carrinho[itemIndex].quantidade > 1) {
            carrinho[itemIndex].quantidade--;
            salvarERenderizar();
        } else {
            // Remove o item se a quantidade for 1 e tentar diminuir
            carrinho.splice(itemIndex, 1);
            salvarERenderizar();
        }
    }

    // --- Lógica de Remover ---
    if (target.classList.contains("remover")) {
        carrinho.splice(itemIndex, 1);
        salvarERenderizar();
    }
});

// --- 6. INICIALIZAÇÃO ---

// Renderiza ao abrir a página
renderizarCarrinho();