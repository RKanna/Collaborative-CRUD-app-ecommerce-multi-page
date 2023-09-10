"use strict";

const products = [
  {
    id: 1,
    name: "Google Pixel - Black",
    imageSrc: "./images/product-1.png",
    developer: "GOOGLE",
    price: 10,
    quantity: 1,
  },
  {
    id: 2,
    name: "Samsung S7",
    imageSrc: "./images/product-2.png",
    developer: "SAMSUNG",
    price: 16,
    quantity: 1,
  },
  {
    id: 3,
    name: "HTC 10 - Black",
    imageSrc: "./images/product-3.png",
    developer: "HTC",
    price: 8,
    quantity: 1,
  },
  {
    id: 4,
    name: "HTC 10 - White",
    imageSrc: "./images/product-4.png",
    developer: "HTC",
    price: 18,
    quantity: 1,
  },
  {
    id: 5,
    name: "HTC Desire 626s",
    imageSrc: "./images/product-5.png",
    developer: "HTC",
    price: 24,
    quantity: 1,
  },
  {
    id: 6,
    name: "Vintage Iphone",
    imageSrc: "./images/product-6.png",
    developer: "APPLE",
    price: 17,
    quantity: 1,
  },
  {
    id: 7,
    name: "Iphone 7",
    imageSrc: "./images/product-7.png",
    developer: "APPLE",
    price: 30,
    quantity: 1,
  },
  {
    id: 8,
    name: "Smashed Iphone",
    imageSrc: "./images/product-8.png",
    developer: "APPLE",
    price: 2,
    quantity: 1,
  },
];

function populateProductDetails() {
  const productContainers = document.querySelectorAll(".product-container");
  const titleRows = document.querySelectorAll(".title-row");

  productContainers.forEach((productContainer, index) => {
    const productImageElement =
      productContainer.querySelector(".product-image");
    const addToCartButton = productContainer.querySelector(".add-to-cart");

    const product = products[index];

    productImageElement.src = product.imageSrc;
    addToCartButton.dataset.productId = product.id;
  });

  titleRows.forEach((titleRow, index) => {
    const productNameElement = titleRow.querySelector(".product-name");
    const productPriceElement = titleRow.querySelector(".product-price");

    // Get the corresponding product data
    const product = products[index];

    // Update the content of the HTML elements for each product
    productNameElement.textContent = product.name;
    productPriceElement.textContent = `${product.price}`;
  });
}

window.onload = populateProductDetails;

//populate on description Page............................................
//reference....
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

const product = products.find((item) => item.id === parseInt(productId));
const addToCartButton = document.querySelector(".cart");
//populating elements inside the description page
if (product) {
  document.querySelector(".title").textContent = product.name;
  console.log(product.name);
  document.querySelector(".left-container img").src = product.imageSrc;
  document.querySelector(".model").textContent = `Model: ${product.name}`;
  document.querySelector(
    ".developer"
  ).textContent = `MADE BY: ${product.developer}`;
  document.querySelector(".price").textContent = `Price: $${product.price}`;
  addToCartButton.setAttribute("data-product-id", product.id);
  console.log(product.id);
  // Add more details as needed
}

function getCartItems() {
  const cartItemsJSON = localStorage.getItem("cartItems");
  return cartItemsJSON ? JSON.parse(cartItemsJSON) : [];
}

// Function to save cart items to local storage
function saveCartItems(cartItems) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// for getting the product id from both buttons...................................
//not useful but want this.
const gettingIdBtnSmall = document.querySelectorAll("button.btn-small");
gettingIdBtnSmall.forEach((button) => {
  button.addEventListener("click", function () {
    const productId = button.getAttribute("data-product-id");
    console.log(productId);
  });
});

const gettingAddBtnId = document.querySelectorAll("button.cart");
gettingAddBtnId.forEach((button) => {
  button.addEventListener("click", function () {
    const productId = button.getAttribute("data-product-id");
    console.log(productId);
  });
});
//....................................................................................

const cartItems = getCartItems();

function addToCart(productId) {
  const product = products.find((item) => item.id === parseInt(productId));

  if (product) {
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        imageSrc: product.imageSrc,
        price: product.price,
        quantity: 1,
      });
      // disableButtons(product.id);
      disableButton(productId);
    }

    // Save the updated cart items to local storage
    saveCartItems(cartItems);
    updateCartUI();
  }
}

const btnSmallButtons = document.querySelectorAll(
  "button.btn-small, button.cart"
);
btnSmallButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const productId = button.getAttribute("data-product-id");
    addToCart(productId);
  });
});

function updateCartUI() {
  const cartContainer = document.querySelector(".dynamic-html-structure");

  if (cartContainer) {
    // clearing cart ui for before update
    while (cartContainer.firstChild) {
      cartContainer.removeChild(cartContainer.firstChild);
    }

    cartItems.forEach((cartItem) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");

      cartItemElement.innerHTML = `
      

        <img src="${cartItem.imageSrc}" alt="${cartItem.name}" />
        <div class="title-span"><span class="span-title">${
          cartItem.name
        }</span></div>
        
        <div class="cart-price">${cartItem.price}</div>
        <div class="cart-quantity">
          <button class="decrease-btn" data-product-id="${
            cartItem.id
          }">-</button>
          <div class="square">${cartItem.quantity}</div>
          <button class="increase-btn" data-product-id="${
            cartItem.id
          }">+</button>
        </div>
        <div class="cart-remove">
          <i class="remove-btn fas fa-trash" data-product="${
            cartItem.name
          }"></i>
        </div>
        <div class="cart-total">$${cartItem.price * cartItem.quantity}</div>
        <div class="cart-total-value">Item Total :$${
          cartItem.price * cartItem.quantity
        }</div>
      `;

      cartContainer.appendChild(cartItemElement);
    });
  } else {
    console.error("Cart container not found in the DOM.");
  }
}

updateCartUI();

function removeCartItem(productName) {
  const itemIndex = cartItems.findIndex((item) => item.name === productName);

  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);

    saveCartItems(cartItems);

    updateSubtotals();
    updateCartUI();

    if (cartItems.length === 0) {
      // if cart empty then redirect
      window.location.href = "./mycart.html";
    }

    const removedProduct = products.find(
      (product) => product.name === productName
    );
    if (removedProduct) {
      enableButton(removedProduct.id);
    }
  }
}

const cartContainer = document.querySelector(".dynamic-html-structure");
cartContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-btn")) {
    const productName = event.target.getAttribute("data-product");
    removeCartItem(productName);
  }

  if (event.target.classList.contains("decrease-btn")) {
    // for decrement
    const productId = event.target.getAttribute("data-product-id");
    decrementCartItem(productId);
  } else if (event.target.classList.contains("increase-btn")) {
    // for increment
    const productId = event.target.getAttribute("data-product-id");
    incrementCartItem(productId);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.querySelector(".dynamic-html-structure");
});

function decrementCartItem(productId) {
  const cartItem = cartItems.find((item) => item.id === parseInt(productId));

  if (cartItem && cartItem.quantity > 1) {
    cartItem.quantity--;
    updateCartUI();
    updateSubtotals();
    saveCartItems(cartItems);
  } else if (cartItem && cartItem.quantity === 1) {
    const productName = cartItem.name;
    removeCartItem(productName);
  }
  if (cartItems.length === 0) {
    // cart redirection
    window.location.href = "./mycart.html";
  }
}

function incrementCartItem(productId) {
  const cartItem = cartItems.find((item) => item.id === parseInt(productId));

  if (cartItem) {
    cartItem.quantity++;
    updateCartUI();
    updateSubtotals();
    saveCartItems(cartItems);
  }
}

// window.onload = onPageLoad;
function disableButton(productId) {
  const button = document.querySelector(
    `button[data-product-id="${productId}"]`
  );
  if (button) {
    button.disabled = true;
    button.textContent = "In Cart";
    console.log("success");
  }
}
function enableButton(productId) {
  const button = document.querySelector(
    `button[data-product-id="${productId}"]`
  );
  if (!button) {
    button.disabled = false;
  }
}
function createDynamicHTMLStructure() {
  const dynamicHtmlTwo = document.querySelector(".dynamic-html-two");

  // for creating clear cart btn
  const clearCartButton = document.createElement("button");
  clearCartButton.classList.add("clearCart");
  clearCartButton.textContent = "CLEAR CART";

  const subtotalOneSpan = document.createElement("span");
  subtotalOneSpan.classList.add("subtotalOne");
  subtotalOneSpan.textContent = "SUBTOTAL: $0.00";

  const subtotalTwoSpan = document.createElement("span");
  subtotalTwoSpan.classList.add("subtotalTwo");
  subtotalTwoSpan.textContent = "DISCOUNT (10%): $0.00";

  const subtotalThreeSpan = document.createElement("span");
  subtotalThreeSpan.classList.add("subtotalThree");
  subtotalThreeSpan.textContent = "TOTAL: $0.00";

  dynamicHtmlTwo.appendChild(clearCartButton);
  dynamicHtmlTwo.appendChild(subtotalOneSpan);
  dynamicHtmlTwo.appendChild(subtotalTwoSpan);
  dynamicHtmlTwo.appendChild(subtotalThreeSpan);
}

// For creating Dynamic HTML Structure
createDynamicHTMLStructure();

// Function to calculate and update subtotal values
function updateSubtotals() {
  const subtotalOneElement = document.querySelector(".subtotalOne");
  const subtotalTwoElement = document.querySelector(".subtotalTwo");
  const subtotalThreeElement = document.querySelector(".subtotalThree");

  // Calculate subtotalOne
  const subtotalOne = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = subtotalOne * 0.1;

  // Calculate total
  const total = subtotalOne + discount;

  subtotalOneElement.textContent = `SUBTOTAL: $${subtotalOne.toFixed(2)}`;
  subtotalTwoElement.textContent = `SUBTOTAL: $${discount.toFixed(2)}`;
  subtotalThreeElement.textContent = `SUBTOTAL: $${total.toFixed(2)}`;

  localStorage.setItem("subtotalOne", subtotalOne.toFixed(2));
  localStorage.setItem("discount", discount.toFixed(2));
  localStorage.setItem("total", total.toFixed(2));
}

function clearCart() {
  cartItems.length = 0;

  updateCartUI();
  updateSubtotals();

  // Remove all rows from local storage
  localStorage.removeItem("cartItems");
  localStorage.removeItem("subtotalOne");
  localStorage.removeItem("discount");
  localStorage.removeItem("total");
  window.location.href = "./index.html";
}

const clearCartButton = document.querySelector(".clearCart");
clearCartButton.addEventListener("click", clearCart);

updateSubtotals();

function redirectToMyCart() {
  window.location.href = "./mycart.html";
}

function updateCartSectionsVisibility() {
  const yourCartSection = document.getElementById("your-cart");
  const emptyCartSection = document.getElementById("empty-cart");
  const subtotalOne = parseFloat(localStorage.getItem("subtotalOne"));

  // Check if subtotalOne is zero or NaN
  if (subtotalOne === 0 || isNaN(subtotalOne)) {
    yourCartSection.style.display = "none";
    emptyCartSection.style.display = "flex";
  } else {
    yourCartSection.style.display = "flex";
    emptyCartSection.style.display = "none";
  }
}

const navBtn = document.querySelector(".nav-btn");
navBtn.addEventListener("click", () => {
  redirectToMyCart();

  updateCartSectionsVisibility();
});

updateCartSectionsVisibility();

/////////////////////////Overlay Section Codes/////////////////////////

function openOverlay(productName, productPrice, productImage) {
  const overlaySection = document.getElementById("overlay-section");
  const overlayTitle = document.getElementById("overlayh2-title");
  const overlayPrice = document.getElementById("overlayprice");
  const overlayImage = document.getElementById("overlayimg");

  overlayTitle.textContent = productName;
  overlayPrice.textContent = `Price: $${productPrice}`;
  overlayImage.src = productImage;

  overlaySection.classList.remove("hidden");
}

document.querySelectorAll(".btn-small").forEach(function (button) {
  button.addEventListener("click", function () {
    const productId = button.getAttribute("data-product-id");
    console.log("Clicked Product ID:", productId);
    const product = products.find((p) => p.id === parseInt(productId));

    if (product) {
      console.log("Product Name:", product.name);
      console.log("Product Price:", product.price);
      console.log("Product Image:", product.imageSrc);

      openOverlay(product.name, product.price, product.imageSrc);
    } else {
      console.log("Product not found for ID:", productId);
    }
  });
});

document.querySelector(".back").addEventListener("click", function () {
  const overlaySection = document.getElementById("overlay-section");
  overlaySection.classList.add("hidden");
});
