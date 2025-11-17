/* Busca os dados da API*/
fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
        const conteiner = (document.getElementById("produtos-container"));
        var produtos = data.products;
        for (let i = 0; i < produtos.length; i++) {
            const item = produtos[i];
            conteiner.innerHTML += `
                <div class="card">
                    <div class="avaliacao">
                        <span class="material-symbols-outlined">shopping_cart</span>
                    </div>

                    <div class="card-img">
                        <img src="${item.thumbnail}" alt="${item.title}" id="propaganda">
                    </div>

                    <section class="avaliacao">
                        <span class="material-symbols-outlined">star</span>
                        <div class="rating">${item.rating}</div>
                    </section>

                    <section class="card-conteudo">
                       <h3>${item.title}</h3>
                       <p>${item.description}</p>
                    </section>

                    <div class="card-footer">
                        <div class="price">$ ${item.price}</div>
                        <button class="btn-comprar" data-modal="modal-${i}">Comprar</button>
                    </div>

                    <!-- Modal --> 
                    <dialog id="modal-${i}" class="modal"
                    <button class="close-modal" data-modal="modal-${i}">X</button>
                    <div class="qrcode">
                            <img src="${item.meta.qrCode}" alt="${item.title}">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <div class="price">R$${item.price}</div>
                        </div>
                    </dialog>

                </div>
            `
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

    })

    /** Tratamento de exceções **/
    .catch(error => {
        console.error("erro ao carregar produto", error);
        document.getElementById("produtos-container").innerHTML = '<p>Erro ao carregar o produto</p>';
    }
    )









