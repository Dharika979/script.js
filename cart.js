document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
function getCart() { return JSON.parse(localStorage.getItem("ecoCart")) || []; }
function saveCart(cart) {
  localStorage.setItem("ecoCart", JSON.stringify(cart));
  const badge = document.getElementById("navCartBadge");
  if (badge) badge.textContent = cart.reduce((s, i) => s + i.quantity, 0);
}
function renderCart() {
  const badge = document.getElementById("navCartBadge");
  const cart = getCart();
  if (badge) badge.textContent = cart.reduce((s, i) => s + i.quantity, 0);
  const container = document.getElementById("cartContent");
  if (!cart.length) {
    container.innerHTML = `<div class="empty-state">
      <div class="empty-icon">🛒</div>
      <h2>Your cart is empty</h2>
      <p style="margin-bottom:1.5rem;">Add some eco-friendly products first!</p>
      <a href="/products.html" class="btn btn-primary">Start Shopping</a>
    </div>`;
    return;
  }
  let total = 0;
  const rows = cart.map((item, i) => {
    const sub = item.price * item.quantity;
    total += sub;
    return `<tr>
      <td>
        <div style="display:flex;align-items:center;gap:1rem;">
          <img src="${item.imageUrl}" alt="${esc(item.name)}" class="cart-item-img"
            onerror="this.src='https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200'">
          <strong>${esc(item.name)}</strong>
        </div>
      </td>
      <td>₹${item.price.toFixed(2)}</td>
      <td>
        <div class="quantity-control" style="margin-bottom:0;">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">-</button>
          <span style="font-weight:bold;padding:0 0.5rem;">${item.quantity}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
      </td>
      <td><strong>₹${sub.toFixed(2)}</strong></td>
      <td><button class="btn btn-danger" onclick="removeItem(${item.id})">Remove</button></td>
    </tr>`;
  }).join("");
  container.innerHTML = `
    <div class="cart-table-wrapper">
      <table class="table">
        <thead><tr>
          <th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th>Action</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="cart-summary">
      <h3 style="margin-bottom:1rem;color:var(--primary-dark);">Cart Summary</h3>
      <div class="summary-row"><span>Items (${cart.reduce((s,i)=>s+i.quantity,0)})</span><span>₹${total.toFixed(2)}</span></div>
      <div class="summary-row"><span>Eco Shipping</span><span style="color:var(--primary);font-weight:600;">FREE</span></div>
      <div class="summary-row summary-total"><span>Total</span><span>₹${total.toFixed(2)}</span></div>
      <div style="margin-top:1.5rem;">
        <a href="/checkout.html" class="btn btn-primary btn-block" style="padding:0.85rem;font-size:1rem;">
          Proceed to Checkout →
        </a>
      </div>
    </div>`;
}
function changeQty(id, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}
function removeItem(id) {
  saveCart(getCart().filter(i => i.id !== id));
  renderCart();
}
function esc(str) {
  return str ? str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;") : "";
}
