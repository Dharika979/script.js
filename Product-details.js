document.addEventListener("DOMContentLoaded", () => {
  updateBadge();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) { showError("No product ID provided."); return; }
  loadProduct(id);
});
async function loadProduct(id) {
  try {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error("Not found");
    const p = await res.json();
    document.title = `${p.name} - EcoMarket`;
    document.getElementById("detailContainer").innerHTML = `
      <div class="product-detail-card">
        <div>
          <img src="${p.imageUrl}" alt="${esc(p.name)}" class="detail-img"
            onerror="this.src='https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600'">
        </div>
        <div class="detail-meta">
          <div class="detail-category">Category: <strong>${esc(p.category)}</strong></div>
          <h1 class="detail-title">${esc(p.name)}</h1>
          <div class="detail-price">₹${p.price.toFixed(2)}</div>
          <div class="score-box">
            <div>🌱</div>
            <div>
              <div class="score-number">${p.sustainabilityScore} / 100</div>
              <div style="font-size:0.85rem;color:var(--text-muted);">Verified Sustainability Score</div>
            </div>
          </div>
          <p class="detail-description">${esc(p.description)}</p>
          <div class="${p.stock > 0 ? 'stock-in' : 'stock-out'}" style="margin-bottom:1.5rem;font-size:1rem;">
            ${p.stock > 0 ? `✓ In Stock (${p.stock} units available)` : '✗ Currently Out of Stock'}
          </div>
          <div class="quantity-control">
            <label style="font-weight:600;margin-right:0.5rem;">Qty:</label>
            <button class="qty-btn" onclick="changeQty(-1)">-</button>
            <input type="number" id="qtyInput" class="qty-input" value="1" min="1" max="${p.stock}">
            <button class="qty-btn" onclick="changeQty(1,${p.stock})">+</button>
          </div>
          <button class="btn btn-primary" style="padding:0.9rem 2rem;font-size:1rem;width:100%;"
            ${p.stock <= 0 ? 'disabled' : ''}
            onclick="addToCart(${p.id},'${escJs(p.name)}',${p.price},'${escJs(p.imageUrl)}')">
            🛒 Add to Cart
          </button>
        </div>
      </div>`;
  } catch (e) {
    showError("Product not found or unavailable.");
  }
}
function changeQty(delta, max) {
  const inp = document.getElementById("qtyInput");
  let v = parseInt(inp.value) || 1;
  v = Math.max(1, Math.min(max || 9999, v + delta));
  inp.value = v;
}
function addToCart(id, name, price, imageUrl) {
  const qty = parseInt(document.getElementById("qtyInput").value) || 1;
  let cart = JSON.parse(localStorage.getItem("ecoCart")) || [];
  const idx = cart.findIndex(i => i.id === id);
  if (idx > -1) cart[idx].quantity += qty;
  else cart.push({ id, name, price, imageUrl, quantity: qty });
  localStorage.setItem("ecoCart", JSON.stringify(cart));
  updateBadge();
  alert(`Added ${qty} x "${name}" to cart!`);
}
function updateBadge() {
  const cart = JSON.parse(localStorage.getItem("ecoCart")) || [];
  const badge = document.getElementById("navCartBadge");
  if (badge) badge.textContent = cart.reduce((s, i) => s + i.quantity, 0);
}
function showError(msg) {
  document.getElementById("detailContainer").innerHTML = `<div class="alert alert-danger">${msg}</div>`;
}
function esc(str) {
  return str ? str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;") : "";
}
function escJs(str) {
  return str ? str.replace(/'/g,"\\'").replace(/"/g,'\\"') : "";
}
