const cartItems = [
    { id: 1, name: 'Teclado Mecânico RGB', price: 350.00, quantity: 1, category: 'Eletrônicos' },
    { id: 2, name: 'Mousepad Extra Grande', price: 45.90, quantity: 2, category: 'Acessórios' },
    { id: 3, name: 'Monitor IPS 24"', price: 890.00, quantity: 1, category: 'Eletrônicos' },
    { id: 4, name: 'Suporte para Headset', price: 29.90, quantity: 1, category: 'Acessórios' }
];

const activeDiscounts = [0.10, 0.05]; 

const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
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

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('subtotal');
    const discountEl = document.getElementById('discount');
    const totalEl = document.getElementById('total');


    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        
        const itemHTML = `
            <div class="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div>
                    <h3 class="font-semibold text-slate-700">${item.name}</h3>
                    <p class="text-xs text-slate-500">Qtd: ${item.quantity} x ${formatCurrency(item.price)}</p>
                </div>
                <span class="font-medium text-slate-900">${formatCurrency(itemTotal)}</span>
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