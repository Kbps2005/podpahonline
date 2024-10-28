// Inicialização do carrinho
let cart = [];

// Função para adicionar um produto ao carrinho
function addToCart(product) {
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity++;
    } else {
        product.quantity = 1; // Adiciona a quantidade
        cart.push(product);
    }
    updateCart();
}

// Função para remover um produto do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Função para atualizar a visualização do carrinho
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)} (x${item.quantity})`; // Mostra quantidade
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromCart(index);
        
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calcula total com base na quantidade
    document.getElementById('cart-total').textContent = 'Total: R$ ' + total.toFixed(2);
}

// Função para finalizar o pedido
function finalizeOrder() {
    if (cart.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }

    // Redirecionar para o link do Direct do Instagram
    window.location.href = 'https://www.instagram.com/slv.prestes/profilecard/?igsh=MTlqd256eTB4MzdrMA=='; // Substitua pelo link do Direct que você deseja
}
