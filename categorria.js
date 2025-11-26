// CONFIGURAÇÃO DAS CATEGORIAS
const categorias = [
    { nome: "smartphones", titulo: "Smartphones", icone: "smartphone" },
    { nome: "laptops", titulo: "Laptops", icone: "laptop_mac" },
    { nome: "tablets", titulo: "Tablets", icone: "tablet" },
    { nome: "mobile-accessories", titulo: "Mobile Accessories", icone: "mobile" }
];

// INICIALIZAR O CARREGAMENTO
inicializarLoja();

function inicializarLoja() {
    const containerPrincipal = document.getElementById("container-principal");

    // Criar uma seção para cada categoria
    categorias.forEach(categoria => {
        // Criar HTML da seção
        const secaoHTML = `
            <section class="secao-categoria" id="secao-${categoria.nome}">
                <div class="cabecalho-categoria">
                    <span class="material-symbols-outlined">${categoria.icone}</span>
                    <h2>${categoria.titulo}</h2>
                </div>
                
                <div class="container-cards" id="container-${categoria.nome}">
                    <div class="loading">Carregando ${categoria.titulo}...</div>
                </div>
            </section>
        `;

        containerPrincipal.innerHTML += secaoHTML;

        // Carregar produtos da categoria
        carregarCategoria(categoria.nome, categoria.titulo);
    });
}

function carregarCategoria(nomeCategoria, tituloCategoria) {
    fetch(`https://dummyjson.com/products/category/${nomeCategoria}`)
        .then(res => res.json())
        .then(data => {
            // Selecionar o container ESPECÍFICO desta categoria
            const container = document.getElementById(`container-${nomeCategoria}`);
            const produtos = data.products;

            // Limpar mensagem de loading
            container.innerHTML = '';

            // Verificar se há produtos
            if (produtos.length === 0) {
                container.innerHTML = '<p class="sem-produtos">Nenhum produto disponível</p>';
                return;
            }

            // Criar cards dos produtos
            for (let i = 0; i < produtos.length; i++) {
                const item = produtos[i];
                const idUnico = `${nomeCategoria}-${i}`; // ID único por categoria

                container.innerHTML += `
                    <div class="card">
                        <div class="card-header">
                            <span class="badge-categoria">${tituloCategoria}</span>
                            <button class="carrinho" data-id="${item.id}">
                                <span class="material-symbols-outlined">shopping_cart</span>
                            </button>
                        </div>

                        <div class="card-img">
                            <img src="${item.thumbnail}" alt="${item.title}">
                        </div>

                        <section class="avaliacao">
                            <span class="material-symbols-outlined">star</span>
                            <div class="rating">${item.rating}</div>
                        </section>

                        <section class="card-conteudo">
                            <h4>${item.title}</h4>
                            <p>${item.description}</p>
                        </section>

                        <div class="card-footer">
                            <div class="price">$ ${item.price}</div>
                            <button class="btn-comprar" data-modal="modal-${idUnico}">Comprar</button>
                        </div>

                        <!-- Modal -->
                        <dialog id="modal-${idUnico}" class="modal">
                            <div class="close-modal">
                                <button class="close-modal" data-modal="modal-${idUnico}">
                                    <span class="material-symbols-outlined">close</span>
                                </button>
                            </div>
                            <div class="qrcode">
                                <img src="${item.meta.qrCode}" alt="${item.title}">
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                                <div class="price">$ ${item.price}</div>
                            </div>
                        </dialog>
                    </div>
                `;
            }
            /* Botoes - Modal*/
            const openButtons = document.querySelectorAll(".btn-comprar");
            openButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const modalId = button.getAttribute('data-modal');
                    const modal = document.getElementById(modalId)
                    modal.showModal();
                });
            });

            // Botoes - Fecha o Modal
            const closeBtn = document.querySelectorAll('.close-modal');
            closeBtn.forEach(button => {
                button.addEventListener('click', () => {
                    const modalId = button.getAttribute('data-modal');
                    const modal = document.getElementById(modalId)
                    modal.close();
                })
            })
            const carrinhoBtns = document.querySelectorAll(".carrinho");

            carrinhoBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    const idProduto = btn.getAttribute("data-id");

                    const produto = produtos.find(p => p.id == idProduto);

                    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

                    // Criar item seguro para o carrinho
                    const itemCarrinho = {
                        id: produto.id,
                        title: produto.title,
                        price: produto.price,
                        thumbnail: produto.thumbnail,
                        category: produto.category,
                        quantidade: 1
                    };

                    // Adiciona
                    carrinho.push(itemCarrinho);

                    // Salva
                    localStorage.setItem("carrinho", JSON.stringify(carrinho));

                    // Redireciona
                    window.location.href = "/Senai - Front End/Ecommerce/carrinho/index.html";
                });
            });


        })
        .catch(err => {
            console.error(`Erro ao carregar ${tituloCategoria}:`, err);
            const container = document.getElementById(`container-${nomeCategoria}`);
            container.innerHTML = `<p class="erro">Erro ao carregar produtos de ${tituloCategoria}</p>`;


        });

}


// FUNCIONALIDADE DE FILTRO (OPCIONAL)
function filtrarCategoria(nomeCategoria) {
    const secoes = document.querySelectorAll('.secao-categoria');

    secoes.forEach(secao => {
        if (nomeCategoria === 'todas') {
            secao.style.display = 'block';
        } else {
            if (secao.id === `secao-${nomeCategoria}`) {
                secao.style.display = 'block';
            } else {
                secao.style.display = 'none';
            }
        }
    });
}