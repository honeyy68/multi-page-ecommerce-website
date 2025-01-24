// Select necessary DOM elements
const CartItems = document.querySelector(".cart-items");
const cartBadge = document.querySelector(".cart_badge");
const mobileCartBadge = document.querySelector(".mobile_cart_badge");
const addToCartButtons = document.querySelectorAll(".add_to_cart");

// Function to update the cart counter in the navbar
function updateCartCounter() {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = items.length;

  if (cartCount > 0) {
    cartBadge.textContent = cartCount;
    cartBadge.style.display = "inline-block";

    if (mobileCartBadge) {
      mobileCartBadge.textContent = cartCount; // Update mobile badge
      mobileCartBadge.style.display = "inline-block";
    }
  } else {
    cartBadge.style.display = "none";
    if (mobileCartBadge) mobileCartBadge.style.display = "none";
  }
}

// Function to display cart items (if needed)
function displayCartItems() {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  if (!CartItems) return; // Ensure the CartItems element exists in the DOM

  CartItems.innerHTML = ""; // Clear existing items

  if (items.length === 0) {
    CartItems.innerHTML = "<p>Your cart is empty!</p>";
    updateCartCounter(); // Ensure badge updates
    return;
  }

  items.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart_item";
    cartItem.innerHTML = `
      <p class="cart_id">${item.id}</p>
      <p class="cart_title">${item.title}</p>
      <img src="${item.image}" alt="${item.title}" class="cart_img" />
      <p class="cart_price">$${item.price}</p>
      <button class="cart_delete" data-index="${index}" style="background-color: #dc4345; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
        Delete
      </button>
    `;

    // Add delete functionality
    cartItem.querySelector(".cart_delete").addEventListener("click", () => {
      deleteCartItem(index);
    });

    CartItems.appendChild(cartItem);
  });

  updateCartCounter(); // Update badge when cart items are displayed
}

// Function to delete a cart item
function deleteCartItem(index) {
  let items = JSON.parse(localStorage.getItem("cart")) || [];
  items.splice(index, 1); // Remove item at the specified index
  localStorage.setItem("cart", JSON.stringify(items)); // Update localStorage
  displayCartItems(); // Re-render the cart
}

// Add to cart functionality
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.getAttribute("data-id");
    const title = button.getAttribute("data-title");
    const image = button.getAttribute("data-image");
    const price = button.getAttribute("data-price");

    const cartItem = { id, title, image, price };
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCounter(); // Update badge immediately after adding
  });
});

// Initial render
displayCartItems();
updateCartCounter();
