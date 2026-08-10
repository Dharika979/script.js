// ========================================
// SUSTAINABLE PRODUCTS
// ========================================
const products = [
    {
        id: 1,
        name: "Bamboo Toothbrush",
        price: 99,
        icon: "🪥",
        desc: "Natural bamboo handle and recyclable packaging."
    },
    {
        id: 2,
        name: "Reusable Water Bottle",
        price: 499,
        icon: "🥤",
        desc: "Durable bottle designed to replace plastic bottles."
    },
    {
        id: 3,
        name: "Organic Cotton Bag",
        price: 249,
        icon: "👜",
        desc: "Reusable cotton shopping bag for everyday use."
    },
    {
        id: 4,
        name: "Solar Power Bank",
        price: 1299,
        icon: "🔋",
        desc: "Portable charging with renewable solar energy."
    },
    {
        id: 5,
        name: "Eco Notebook",
        price: 179,
        icon: "📓",
        desc: "Recycled-paper notebook for school and work."
    },
    {
        id: 6,
        name: "Bamboo Kitchen Set",
        price: 699,
        icon: "🍴",
        desc: "Reusable bamboo utensils for a plastic-free kitchen."
    },
    {
        id: 7,
        name: "Reusable Coffee Cup",
        price: 349,
        icon: "☕",
        desc: "Reusable cup that helps reduce disposable waste."
    },
    {
        id: 8,
        name: "Plantable Seed Pencil",
        price: 149,
        icon: "✏️",
        desc: "Eco-friendly pencil that can be planted after use."
    }
];
// ========================================
// CART
// ========================================
let cart = [];
// ========================================
// DISPLAY PRODUCTS
// ========================================
function renderProducts() {
    const searchBox =
        document.getElementById("searchBox");
    const search =
        searchBox.value.toLowerCase();
    const grid =
        document.getElementById("productsGrid");
    const filteredProducts =
        products.filter(function(product) {
            return product.name
                .toLowerCase()
                .includes(search);
        });
    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <p>
                No products found.
            </p>
        `;
        return;
    }
    grid.innerHTML =
        filteredProducts.map(function(product) {
            return `
                <div class="product">
                    <div class="product-img">
                        ${product.icon}
                    </div>
                    <div class="product-info">
                        <h3>
                            ${product.name}
                        </h3>
                        <p>
                            ${product.desc}
                        </p>
                        <div class="price">
                            ₹${product.price}
                        </div>
                        <button
                            class="add-btn"
                            onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
        }).join("");
}
// ========================================
// ADD TO CART
// ========================================
function addToCart(id) {
    const product =
        products.find(function(product) {
            return product.id === id;
        });
    cart.push(product);
    updateCartCount();
    alert(
        product.name +
        " added to cart! 🌱"
    );
}
// ========================================
// UPDATE CART COUNT
// ========================================
function updateCartCount() {
    document.getElementById(
        "cartCount"
    ).textContent = cart.length;

}
// ========================================
// SHOW CART
// ========================================
function showCart() {
    const modal =
        document.getElementById(
            "cartModal"
        );
    const items =
        document.getElementById(
            "cartItems"
        );
    const total =
        cart.reduce(
            function(sum, item) {
                return sum + item.price;
            },
            0
        );
    if (cart.length === 0) {
        items.innerHTML = `
            <p>
                Your cart is empty.
            </p>
        `;
    }
    else {
        items.innerHTML =
            cart.map(
                function(item, index) {
                    return `
                        <div class="cart-row">
                            <span>
                                ${item.name}
                            </span>
                            <span>
                                ₹${item.price}
                                <button
                                    onclick="removeFromCart(${index})">
                                    ✕
                                </button>
                            </span>
                        </div>
                    `;
                }
            ).join("");
    }
    document.getElementById(
        "cartTotal"
    ).textContent =
        "Total: ₹" + total;
    modal.style.display = "flex";
}
// ========================================
// REMOVE FROM CART
// ========================================
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    showCart();
}
// ========================================
// CLOSE CART
// ========================================
function closeCart() {
    document.getElementById(
        "cartModal"
    ).style.display = "none";

}
// ========================================
// CHECKOUT
// ========================================
function checkout() {
    if (cart.length === 0) {
        alert(
            "Your cart is empty."
        );
        return;
    }
    alert(
        "Demo order placed successfully! 🌱\n\n" +
        "Thank you for choosing sustainable products."
    );
    cart = [];
    updateCartCount();
    closeCart();
}
// ========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ========================================
window.onclick =
    function(event) {
        const modal =
            document.getElementById(
                "cartModal"
            );
        if (event.target === modal) {
            closeCart();
        }
    };
// ========================================
// INITIALIZE WEBSITE
// ========================================
renderProducts();
