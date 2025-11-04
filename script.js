
    function submitForm(e) {
      e.preventDefault();
      alert("Thank you! Your message has been sent.");
    }

    const fadeEls = document.querySelectorAll(".fade-in");

    function handleScroll() {
      fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleScroll);

    // Mobile nav toggle
    function toggleMenu() {
      document.querySelector(".nav-links").classList.toggle("show");
    }

  // Order function
  function addToOrder(item) {
    const orderList = document.getElementById("order-list");
    const li = document.createElement("li");
    li.textContent = item;
    orderList.appendChild(li);
  }

  const cart = {};

  // function toggleMenu() {
  //   document.querySelector(".nav-links").classList.toggle("show");
  // }

  function addToOrder(item, price) {
    if (cart[item]) {
      cart[item].qty += 1;
    } else {
      cart[item] = { price: price, qty: 1 };
    }
    updateCart();
  }

  function removeFromOrder(item) {
    if (cart[item]) {
      cart[item].qty -= 1;
      if (cart[item].qty <= 0) {
        delete cart[item];
      }
    }
    updateCart();
  }

  function updateCart() {
    const orderList = document.getElementById("order-list");
    const totalPriceEl = document.getElementById("total-price");
    orderList.innerHTML = "";
    let total = 0;

    for (let item in cart) {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item} (x${cart[item].qty}) - ₹${cart[item].price * cart[item].qty}
        <span class="cart-actions">
          <button class="add-btn" onclick="addToOrder('${item}', ${cart[item].price})">+</button>
          <button class="remove-btn" onclick="removeFromOrder('${item}')">-</button>
        </span>
      `;
      orderList.appendChild(li);
      total += cart[item].price * cart[item].qty;
    }

    totalPriceEl.textContent = total;
  }

 const paymentRadios = document.querySelectorAll('input[name="payment"]');
const onlineBox = document.querySelector('.online-box');
const codBox = document.querySelector('.cod-box');
const orderMessage = document.getElementById("orderMessage");

paymentRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    onlineBox.style.display = radio.value === "online" ? "block" : "none";
    codBox.style.display = radio.value === "cod" ? "block" : "none";
  });
});

document.getElementById("paymentForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Show order confirmed message
  orderMessage.classList.remove("hidden");
  
  // Optional: Clear the form
  this.reset();
  onlineBox.style.display = "block"; 
  codBox.style.display = "none";
});

// Toggle Delivery
  function toggleDeliveryFields() {
    const deliveryType = document.getElementById("delivery-type").value;
    document.getElementById("address-field").style.display = 
      deliveryType === "home" ? "block" : "none";
  }

  // Toggle Payment
  function togglePaymentFields() {
    const method = document.getElementById("payment-method").value;
    document.getElementById("online-fields").style.display = 
      method === "online" ? "block" : "none";
  }

  // Confirm Order
  function confirmOrder() {
    const deliveryType = document.getElementById("delivery-type").value;
    const address = document.getElementById("customer-address")?.value;
    
    let message = "Your order has been placed successfully!";

    if (deliveryType === "home") {
      if (!address) {
        alert("Please enter your delivery address.");
        return;
      }
      message += ` 🚚 It will be delivered to: ${address}`;
    } else {
      message += " ✅ Please collect it from our restaurant.";
    }

    document.getElementById("confirmation").textContent = message;
    cart = {}; // clear cart
    updateCart();
  }


  