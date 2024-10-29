// Inicialização do carrinho
let cart = [];

// Função para adicionar um produto ao carrinho
function addToCart(product) {
    const foundProduct = cart.find(item => item.name === product.name);

    if (foundProduct) {
        foundProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Função para remover um produto do carrinho
function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

// Função para atualizar a visualização do carrinho
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)} (x${item.quantity})`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromCart(index);

        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById('cart-total').textContent = 'Total: R$ ' + total.toFixed(2);
}

// Função para finalizar o pedido
function finalizeOrder() {
    if (cart.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }

    // Calcula o valor total do pedido
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Gera um número de protocolo único
    const protocolNumber = Date.now(); // Pode usar UUID ou outro método para um número exclusivo

    // Armazena o valor total e os produtos no localStorage
    localStorage.setItem('totalPedido', total.toFixed(2));
    localStorage.setItem('protocolNumber', protocolNumber);
    localStorage.setItem('orderedProducts', JSON.stringify(cart)); // Armazena a lista de produtos

    // Redireciona para a página de pagamento
    window.location.href = 'pagamento.html';
}

