let cartItems = [
    { id: 1, name: 'Teclado Mecânico RGB', price: 350.00, quantity: 1 },
    { id: 2, name: 'Mousepad Extra Grande', price: 45.90, quantity: 2 },
    { id: 3, name: 'Monitor IPS 24"', price: 890.00, quantity: 1 },
    { id: 4, name: 'Suporte para Headset', price: 29.90, quantity: 1 }
];

const activeDiscounts = [0.10, 0.05]; 

const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-PT', { 
        style: 'currency',
        currency: 'BRL' 
    }).format(value);
};

function calculateTotals(items, discounts) {
    const subtotal = items.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);

    const discountAmount = discounts.reduce((acc, discountRate) => {
        return acc + (subtotal * discountRate);
    }, 0);

    const total = subtotal - discountAmount;

    return { subtotal, discountAmount, total };
}

window.updateQuantity = (id, change) => {
    const itemIndex = cartItems.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        const item = cartItems[itemIndex];
        const newQuantity = item.quantity + change;

        if (newQuantity > 0) {
            item.quantity = newQuantity;
        } else {
            if(confirm('Desejas remover este item do carrinho?')) {
                cartItems.splice(itemIndex, 1);
            }
        }
        renderCart();
    }
};

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal');
    const discountEl = document.getElementById('discount');
    const totalEl = document.getElementById('total');

    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p class="text-center text-slate-400 py-4">O teu carrinho está vazio.</p>';
    }

    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        
        const itemHTML = `
            <div class="flex flex-col sm:flex-row justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-100 gap-4 transition-all hover:shadow-md">
                <div class="flex-1 text-center sm:text-left">
                    <h3 class="font-semibold text-slate-700">${item.name}</h3>
                    <p class="text-xs text-slate-500">Preço unitário: ${formatCurrency(item.price)}</p>
                </div>
                
                <div class="flex items-center bg-white rounded-lg border border-slate-200 shadow-sm">
                    <button onclick="updateQuantity(${item.id}, -1)" 
                            class="px-3 py-1 text-slate-600 hover:bg-slate-100 hover:text-red-500 font-bold rounded-l-lg transition-colors">
                        -
                    </button>
                    <span class="px-3 py-1 text-sm font-semibold text-slate-800 w-8 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" 
                            class="px-3 py-1 text-slate-600 hover:bg-slate-100 hover:text-green-600 font-bold rounded-r-lg transition-colors">
                        +
                    </button>
                </div>

                <span class="font-bold text-slate-900 w-24 text-right">${formatCurrency(itemTotal)}</span>
            </div>
        `;
        cartContainer.innerHTML += itemHTML;
    });

    const totals = calculateTotals(cartItems, activeDiscounts);

    subtotalEl.textContent = formatCurrency(totals.subtotal);
    discountEl.textContent = `- ${formatCurrency(totals.discountAmount)}`;
    totalEl.textContent = formatCurrency(totals.total);
}

document.addEventListener('DOMContentLoaded', renderCart);