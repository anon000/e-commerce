let cart = [];

const openCart = document.getElementById("openCart");
const miniCart = document.getElementById("miniCart");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

/* =========================
   OPEN CART
========================= */

openCart.addEventListener("click", () => {
    miniCart.classList.toggle("active");
});

/* =========================
   ADD TO CART
========================= */

document.querySelectorAll(".cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        const name = btn.dataset.name;
        const price = parseInt(btn.dataset.price);

        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({
                name,
                price,
                qty: 1
            });
        }

        updateCart();

        btn.innerText = "Added ✓";
        setTimeout(() => {
            btn.innerText = "Add to Cart";
        }, 900);
    });
});

/* =========================
   REMOVE ITEM
========================= */

function removeItem(name) {

    const item = cart.find(i => i.name === name);

    if (!item) return;

    item.qty -= 1;

    if (item.qty <= 0) {
        cart = cart.filter(i => i.name !== name);
    }

    updateCart();
}

/* =========================
   UPDATE CART UI
========================= */

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p style="opacity:0.6; text-align:center;">Empty cart</p>`;
        cartTotal.textContent = 0;
        cartCount.textContent = 0;
        return;
    }

    cart.forEach(item => {

        total += item.price * item.qty;
        count += item.qty;

        cartItems.innerHTML += `
            <div class="mini-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>₱${item.price} x ${item.qty}</small>
                </div>

                <div style="display:flex; gap:8px; align-items:center;">
                    <button onclick="removeItem('${item.name}')" 
                        style="
                            background:#ef4444;
                            border:none;
                            color:white;
                            padding:5px 10px;
                            border-radius:6px;
                            cursor:pointer;
                        ">
                        -
                    </button>

                    <span>${item.qty}</span>
                </div>
            </div>
        `;
    });

    cartTotal.textContent = total;
    cartCount.textContent = count;
}