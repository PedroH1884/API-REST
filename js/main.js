document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://fakestoreapi.com/products';
    const path = window.location.pathname;

    if (path.includes('index.html') || path === '/') {
        fetchProducts();
    } else if (path.includes('adicionar.html')) {
        const addProductForm = document.getElementById('add-product-form');
        addProductForm.addEventListener('submit', addProduct);
    } else if (path.includes('editar.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            fetchProductForEdit(productId);
            const editProductForm = document.getElementById('edit-product-form');
            editProductForm.addEventListener('submit', (event) => updateProduct(event, productId));
        }
    }

    async function fetchProducts() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Erro na rede: ' + response.statusText);
            }
            const data = await response.json();
            displayProducts(data);
        } catch (error) {
            console.error('Falha ao buscar produtos:', error);
            const productList = document.getElementById('product-list');
            productList.innerHTML = '<p>Não foi possível carregar os produtos. Tente novamente mais tarde.</p>';
        }
    }

    function displayProducts(products) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>R$ ${product.price.toFixed(2)}</p>
                <a href="editar.html?id=${product.id}" class="btn-editar">Editar</a>
            `;
            productList.appendChild(productCard);
        });
    }

    async function addProduct(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const feedbackMessage = document.getElementById('feedback-message');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    price: parseFloat(price),
                    image: 'https://i.pravatar.cc',
                    category: 'electronic'
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar o produto: ' + response.statusText);
            }

            const newProduct = await response.json();
            console.log('Produto adicionado (simulado):', newProduct);
            
            feedbackMessage.textContent = `Produto "${newProduct.title}" foi adicionado com sucesso (ID: ${newProduct.id})!`;
            feedbackMessage.className = 'feedback success';
            event.target.reset();

        } catch (error) {
            console.error('Erro:', error);
            feedbackMessage.textContent = 'Falha ao adicionar o produto. Por favor, tente novamente.';
            feedbackMessage.className = 'feedback error';
        }
    }
    
    async function fetchProductForEdit(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`);
             if (!response.ok) {
                throw new Error('Produto não encontrado: ' + response.statusText);
            }
            const product = await response.json();
            
            document.getElementById('productId').value = product.id;
            document.getElementById('title').value = product.title;
            document.getElementById('description').value = product.description;
            document.getElementById('price').value = product.price;

        } catch (error) {
            console.error('Falha ao buscar produto para edição:', error);
            document.querySelector('main').innerHTML = '<p>Produto não encontrado.</p>';
        }
    }

    async function updateProduct(event, id) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const feedbackMessage = document.getElementById('feedback-message');

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    price: parseFloat(price),
                    image: 'https://i.pravatar.cc',
                    category: 'electronic'
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar o produto: ' + response.statusText);
            }
            
            const updatedProduct = await response.json();
            console.log('Produto atualizado (simulado):', updatedProduct);
            
            feedbackMessage.textContent = 'Produto atualizado com sucesso!';
            feedbackMessage.className = 'feedback success';
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);

        } catch (error) {
            console.error('Erro:', error);
            feedbackMessage.textContent = 'Falha ao atualizar o produto. Tente novamente.';
            feedbackMessage.className = 'feedback error';
        }
    }
});