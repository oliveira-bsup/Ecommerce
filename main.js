/* Busca os dados da API*/
fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
        var produtos = data.products;
        for (let i = 1; i < 30; i++) {
            const item = produtos[i];

            const conteiner = (document.getElementById("container"));
            conteiner.innerHTML += `
            <div class="card">
            <div class="rating">Avaliação: ${produtos[i].rating}</div>
            <img src="${produtos[i].thumbnail}" alt="${produtos[i].title}">
            <h3>${produtos[i].title}</h3>
            <p>${produtos[i].description}</p>
            <div class="prince">Preço:R$ ${produtos[i].price}</div>
            <button class="btn-comprar">Comprar</button>
            <button class="btn-carrinho" id="adicionar">Carrinho</button>
            </div>`
        }
        
    })

    /** Tratamento de exceções **/
    .catch(error => {
        console.error("erro ao carregar produto", error);
        document.getElementById("produto-card").innerHTML = '<p>Erro ao carregar o produto</p>';
    })








