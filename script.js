let cart = [];

const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

// OPEN CART
openCart.addEventListener("click", () => {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
});

// CLOSE CART
closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");
});

// ADD TO CART
document.querySelectorAll(".cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price);

        cart.push({ name, price });

        updateCart();
    });
});

// UPDATE CART
function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>₱${item.price}</span>
            </div>
        `;
    });

    cartTotal.textContent = total;
    cartCount.textContent = cart.length;
}