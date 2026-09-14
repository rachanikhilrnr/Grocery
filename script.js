const STORAGE_KEY = 'grocery_users';
const SESSION_KEY = 'grocery_logged_in_user';
const CART_KEY = 'grocery_cart';

const INVENTORY = [
  { id: 'dairy-milk-silk', name: 'Dairy Milk Silk', category: 'Chocolates', quantity: '50 g', price: 120, stock: 25, emoji: '🍫' },
  { id: 'kitkat', name: 'KitKat', category: 'Chocolates', quantity: '36 g', price: 55, stock: 30, emoji: '🍫' },
  { id: 'perk', name: 'Perk', category: 'Chocolates', quantity: '15 g', price: 15, stock: 40, emoji: '🍫' },
  { id: 'amul-butter', name: 'Amul Butter', category: 'Refrigerated Items', quantity: '200 g', price: 58, stock: 18, emoji: '🧈' },
  { id: 'curd', name: 'Curd', category: 'Refrigerated Items', quantity: '500 g', price: 42, stock: 20, emoji: '🥛' },
  { id: 'cheese-slices', name: 'Cheese Slices', category: 'Refrigerated Items', quantity: '200 g', price: 120, stock: 12, emoji: '🧀' },
  { id: 'ice-cream', name: 'Ice Cream', category: 'Refrigerated Items', quantity: '1 L', price: 150, stock: 15, emoji: '🍦' },
  { id: 'mango', name: 'Mango', category: 'Fruits & Vegetables', quantity: '1 kg', price: 90, stock: 22, emoji: '🥭' },
  { id: 'bananas', name: 'Bananas', category: 'Fruits & Vegetables', quantity: '1 bunch', price: 52, stock: 35, emoji: '🍌' },
  { id: 'onion', name: 'Onion', category: 'Fruits & Vegetables', quantity: '1 kg', price: 44, stock: 40, emoji: '🧅' },
  { id: 'potato', name: 'Potato', category: 'Fruits & Vegetables', quantity: '1 kg', price: 35, stock: 42, emoji: '🥔' },
  { id: 'bread', name: 'Bread', category: 'Bakery', quantity: '1 loaf', price: 45, stock: 24, emoji: '🥖' },
  { id: 'biscuits', name: 'Biscuits', category: 'Bakery', quantity: '200 g', price: 40, stock: 28, emoji: '🍪' },
  { id: 'cake', name: 'Cake', category: 'Bakery', quantity: '500 g', price: 150, stock: 10, emoji: '🎂' },
  { id: 'basmati-rice', name: 'Basmati Rice', category: 'Rice & Staples', quantity: '1 kg', price: 120, stock: 18, emoji: '🍚' },
  { id: 'wheat-flour', name: 'Wheat Flour', category: 'Rice & Staples', quantity: '1 kg', price: 55, stock: 25, emoji: '🌾' },
  { id: 'sugar', name: 'Sugar', category: 'Rice & Staples', quantity: '1 kg', price: 60, stock: 20, emoji: '🍬' },
  { id: 'salt', name: 'Salt', category: 'Rice & Staples', quantity: '500 g', price: 32, stock: 30, emoji: '🧂' },
  { id: 'coke', name: 'Coca-Cola', category: 'Beverages', quantity: '250 ml', price: 70, stock: 17, emoji: '🥤' },
  { id: 'juice', name: 'Fruit Juice', category: 'Beverages', quantity: '1 L', price: 80, stock: 14, emoji: '🧃' },
  { id: 'soap', name: 'Soap', category: 'Personal Care', quantity: '100 g', price: 48, stock: 26, emoji: '🧼' },
  { id: 'shampoo', name: 'Shampoo', category: 'Personal Care', quantity: '200 ml', price: 120, stock: 16, emoji: '💇' },
  { id: 'detergent', name: 'Detergent', category: 'Household Essentials', quantity: '1 kg', price: 180, stock: 12, emoji: '🧺' },
  { id: 'toilet-cleaner', name: 'Toilet Cleaner', category: 'Household Essentials', quantity: '500 ml', price: 140, stock: 10, emoji: '🧽' },
];

const getUsers = () => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return Array.isArray(users) ? users : [];
};

const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  return user || null;
};

const setCurrentUser = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

const clearCurrentUser = () => {
  localStorage.removeItem(SESSION_KEY);
};

const getCart = () => {
  const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  return Array.isArray(cart) ? cart : [];
};

const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const escapeHtml = (value) => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const showAlert = (message) => {
  alert(message);
};

const validatePassword = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  return password.length >= 16 && hasUppercase && hasLowercase && hasNumber && hasSpecial;
};

const normalizeEmail = (email) => (email || '').trim().toLowerCase();

const addToCart = (itemId, quantity = 1) => {
  const item = INVENTORY.find((inventoryItem) => inventoryItem.id === itemId);

  if (!item) {
    showAlert('Item not found.');
    return;
  }

  const requestedQty = Math.max(1, Number(quantity) || 1);

  if (requestedQty > item.stock) {
    showAlert(`Only ${item.stock} ${item.name} available in stock.`);
    return;
  }

  const cart = getCart();
  const existingItem = cart.find((cartItem) => cartItem.id === itemId);

  if (existingItem) {
    const newQty = existingItem.quantity + requestedQty;

    if (newQty > item.stock) {
      showAlert(`You cannot add more than ${item.stock} units of ${item.name}.`);
      return;
    }

    existingItem.quantity = newQty;
  } else {
    cart.push({ id: itemId, quantity: requestedQty });
  }

  saveCart(cart);
  showAlert(`${item.name} added to cart.`);
};

const getCartTotal = () => {
  return getCart().reduce((total, cartItem) => {
    const item = INVENTORY.find((inventoryItem) => inventoryItem.id === cartItem.id);
    return total + (item ? item.price * cartItem.quantity : 0);
  }, 0);
};

const formatCurrency = (amount) => `₹${Number(amount).toFixed(2)}`;
const formatPdfCurrency = (amount) => `Rs. ${Number(amount).toFixed(2)}`;

const renderDashboardCart = (currentUser) => {
  const cartSidebar = document.getElementById('cartSidebar');

  if (!cartSidebar) {
    return;
  }

  if (currentUser.useractive === false) {
    cartSidebar.innerHTML = `
      <h3>Cart</h3>
      <p class="inactive-message">Activate your profile to use the cart.</p>
    `;
    return;
  }

  const cart = getCart();

  if (!cart.length) {
    cartSidebar.innerHTML = `
      <h3>Cart</h3>
      <div class="empty-cart">
        <h4>Your cart is empty</h4>
        <p>Add grocery items from the left to begin.</p>
      </div>
    `;
    return;
  }

  const itemsWithDetails = cart
    .map((cartItem) => {
      const item = INVENTORY.find((inventoryItem) => inventoryItem.id === cartItem.id);

      if (!item) {
        return null;
      }

      return {
        ...item,
        quantity: cartItem.quantity,
        total: item.price * cartItem.quantity,
      };
    })
    .filter(Boolean);

  const subtotal = itemsWithDetails.reduce((total, item) => total + item.total, 0);
  const deliveryFee = subtotal > 0 ? 35 : 0;
  const total = subtotal + deliveryFee;

  cartSidebar.innerHTML = `
    <h3>Cart</h3>
    <div class="cart-sidebar-items">
      ${itemsWithDetails
        .map(
          (item) => `
            <div class="cart-sidebar-item">
              <div class="cart-sidebar-item-header">
                <h4>${escapeHtml(item.name)}</h4>
                <button class="warning-btn remove-item-btn" data-item-id="${item.id}">Remove</button>
              </div>
              <p>${escapeHtml(item.quantity)} • ${formatCurrency(item.price)} each</p>
              <strong>${formatCurrency(item.total)}</strong>
            </div>
          `
        )
        .join('')}
    </div>

    <div class="cart-sidebar-total">
      <div class="total-line"><span>Subtotal</span><strong>${formatCurrency(subtotal)}</strong></div>
      <div class="total-line"><span>Delivery Fee</span><strong>${formatCurrency(deliveryFee)}</strong></div>
      <div class="total-line total-amount"><span>Total</span><strong>${formatCurrency(total)}</strong></div>
      <a href="cart.html" class="checkout-btn" style="width: 100%; margin-top: 1rem;">Checkout</a>
    </div>
  `;

  document.querySelectorAll('.remove-item-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const itemId = button.dataset.itemId;
      const updatedCart = getCart().filter((cartItem) => cartItem.id !== itemId);
      saveCart(updatedCart);
      renderDashboard();
    });
  });
};

const renderDashboard = () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = 'index.html';
    return;
  }

  const dashboardActions = document.getElementById('dashboardActions');
  const inventoryContainer = document.getElementById('inventoryContainer');
  const userWelcome = document.getElementById('userWelcome');
  const pageTitle = document.getElementById('pageTitle');

  if (!dashboardActions || !inventoryContainer || !userWelcome || !pageTitle) {
    return;
  }

  pageTitle.textContent = `Welcome, ${escapeHtml(currentUser.firstname)}`;
  userWelcome.textContent = `Welcome, ${escapeHtml(currentUser.firstname)} ${escapeHtml(currentUser.lastname)}`;

  if (currentUser.useractive === false) {
    dashboardActions.innerHTML = `
      <div class="dashboard-toolbar">
        <button class="action-btn" id="activateProfileBtn">Active your profile</button>
        <button class="warning-btn" id="exitInactiveBtn">Exit</button>
      </div>
    `;

    inventoryContainer.innerHTML = '<p class="inactive-message">Activate your profile to browse grocery items.</p>';

    document.getElementById('activateProfileBtn')?.addEventListener('click', () => {
      const users = getUsers();
      const index = users.findIndex((user) => normalizeEmail(user.emailid) === normalizeEmail(currentUser.emailid));

      if (index !== -1) {
        users[index].useractive = true;
        saveUsers(users);
        const updatedUser = { ...users[index] };
        setCurrentUser(updatedUser);
        renderDashboard();
      }
    });

    document.getElementById('exitInactiveBtn')?.addEventListener('click', () => {
      clearCurrentUser();
      window.location.href = 'index.html';
    });

    renderDashboardCart(currentUser);
    return;
  }

  dashboardActions.innerHTML = `
    <div class="dashboard-toolbar">
      <a class="profile-link" href="profile.html">My Profile</a>
      <a class="secondary-link" href="cart.html">Open Cart</a>
      <button class="secondary-btn" id="toggleActiveBtn">Set profile inactive</button>
      <button class="warning-btn" id="logoutBtn">Exit</button>
    </div>
  `;

  const categories = [...new Set(INVENTORY.map((item) => item.category))];

  inventoryContainer.innerHTML = categories
    .map((category) => {
      const items = INVENTORY.filter((item) => item.category === category);

      return `
        <section class="category-section">
          <h3>${escapeHtml(category)}</h3>
          <div class="items-grid">
            ${items
              .map(
                (item) => `
                  <div class="item-card">
                    <div class="item-emoji">${item.emoji}</div>
                    <h4>${escapeHtml(item.name)}</h4>
                    <p>${escapeHtml(item.category)} • ${escapeHtml(item.quantity)}</p>
                    <div class="item-meta">
                      <span>${formatCurrency(item.price)}</span>
                      <span>Stock: ${item.stock}</span>
                    </div>
                    <div class="item-controls">
                      <input
                        type="number"
                        min="1"
                        max="${item.stock}"
                        value="1"
                        class="qty-input"
                        data-quantity-for="${item.id}"
                      />
                      <button class="add-cart-btn" data-item-id="${item.id}">Add to Cart</button>
                    </div>
                  </div>
                `
              )
              .join('')}
          </div>
        </section>
      `;
    })
    .join('');

  document.getElementById('toggleActiveBtn')?.addEventListener('click', () => {
    const users = getUsers();
    const index = users.findIndex((user) => normalizeEmail(user.emailid) === normalizeEmail(currentUser.emailid));

    if (index !== -1) {
      users[index].useractive = false;
      saveUsers(users);
      const updatedUser = { ...users[index] };
      setCurrentUser(updatedUser);
      renderDashboard();
    }
  });

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    clearCurrentUser();
    window.location.href = 'index.html';
  });

  document.querySelectorAll('.add-cart-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const itemId = button.dataset.itemId;
      const quantityInput = document.querySelector(`[data-quantity-for="${itemId}"]`);
      const quantity = Number(quantityInput?.value || 1);

      addToCart(itemId, quantity);
      renderDashboard();
    });
  });

  renderDashboardCart(currentUser);
};

const handleLoginSubmit = (event) => {
  event.preventDefault();

  const email = normalizeEmail(document.getElementById('loginEmail').value);
  const password = document.getElementById('loginPassword').value;

  const users = getUsers();
  const foundUser = users.find((user) => normalizeEmail(user.emailid) === email);

  if (!foundUser) {
    showAlert('User not found. Please register first.');
    return;
  }

  if (foundUser.password !== password) {
    showAlert('Invalid password.');
    return;
  }

  setCurrentUser(foundUser);
  window.location.href = 'dashboard.html';
};

const handleRegisterSubmit = (event) => {
  event.preventDefault();

  const firstname = document.getElementById('firstName').value.trim();
  const lastname = document.getElementById('lastName').value.trim();
  const emailid = normalizeEmail(document.getElementById('email').value);
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!firstname || !lastname || !emailid || !password || !confirmPassword) {
    showAlert('Please fill in all fields.');
    return;
  }

  if (!emailid.includes('@')) {
    showAlert('Please enter a valid email ID.');
    return;
  }

  if (!validatePassword(password)) {
    showAlert('Password must be at least 16 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.');
    return;
  }

  if (password !== confirmPassword) {
    showAlert('Passwords do not match.');
    return;
  }

  const users = getUsers();
  const alreadyExists = users.some((user) => normalizeEmail(user.emailid) === emailid);

  if (alreadyExists) {
    showAlert('Email ID already exists.');
    return;
  }

  const newUser = {
    firstname,
    lastname,
    emailid,
    password,
    useractive: true,
  };

  users.push(newUser);
  saveUsers(users);
  clearCurrentUser();
  showAlert('Registration successful. You can now login.');
  window.location.href = 'index.html';
};

const setProfileEditingState = (isEditing) => {
  const fields = [
    'profileFirstName',
    'profileLastName',
    'profileEmail',
    'profilePassword',
    'profileConfirmPassword',
    'profileActive',
  ];

  fields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.disabled = !isEditing;
    }
  });

  const updateButton = document.getElementById('enableEditBtn');
  const saveButton = document.getElementById('saveProfileBtn');

  if (updateButton) {
    updateButton.classList.toggle('hidden', isEditing);
  }

  if (saveButton) {
    saveButton.classList.toggle('hidden', !isEditing);
  }
};

const populateProfileForm = () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = 'index.html';
    return;
  }

  const profileForm = document.getElementById('profileForm');
  if (!profileForm) {
    return;
  }

  document.getElementById('profileFirstName').value = currentUser.firstname || '';
  document.getElementById('profileLastName').value = currentUser.lastname || '';
  document.getElementById('profileEmail').value = currentUser.emailid || '';
  document.getElementById('profileActive').checked = currentUser.useractive !== false;
  document.getElementById('profilePassword').value = '';
  document.getElementById('profileConfirmPassword').value = '';

  setProfileEditingState(false);
};

const handleProfileSubmit = (event) => {
  event.preventDefault();

  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = 'index.html';
    return;
  }

  const users = getUsers();
  const index = users.findIndex((user) => normalizeEmail(user.emailid) === normalizeEmail(currentUser.emailid));

  if (index === -1) {
    showAlert('User not found.');
    return;
  }

  const firstname = document.getElementById('profileFirstName').value.trim();
  const lastname = document.getElementById('profileLastName').value.trim();
  const emailid = normalizeEmail(document.getElementById('profileEmail').value);
  const password = document.getElementById('profilePassword').value;
  const confirmPassword = document.getElementById('profileConfirmPassword').value;
  const useractive = document.getElementById('profileActive').checked;

  if (!firstname || !lastname || !emailid) {
    showAlert('Please fill in first name, last name, and email ID.');
    return;
  }

  if (!emailid.includes('@')) {
    showAlert('Please enter a valid email ID.');
    return;
  }

  const conflictingUser = users.find(
    (user) => normalizeEmail(user.emailid) === emailid && normalizeEmail(user.emailid) !== normalizeEmail(currentUser.emailid)
  );

  if (conflictingUser) {
    showAlert('Email ID already exists.');
    return;
  }

  if (password || confirmPassword) {
    if (!validatePassword(password)) {
      showAlert('New password must be at least 16 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('New passwords do not match.');
      return;
    }
  }

  const updatedUser = {
    ...users[index],
    firstname,
    lastname,
    emailid,
    useractive,
  };

  if (password) {
    updatedUser.password = password;
  }

  users[index] = updatedUser;
  saveUsers(users);
  setCurrentUser(updatedUser);
  showAlert('Profile updated successfully.');
  window.location.href = 'dashboard.html';
};

const renderCartPage = () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = 'index.html';
    return;
  }

  const cartItemsContainer = document.getElementById('cartItems');
  const cartSummary = document.getElementById('cartSummary');

  if (!cartItemsContainer || !cartSummary) {
    return;
  }

  const cart = getCart();

  if (!cart.length) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <h3>Your cart is empty</h3>
        <p>Start shopping from the grocery list.</p>
        <a class="secondary-link" href="dashboard.html">Continue Shopping</a>
      </div>
    `;

    cartSummary.innerHTML = `
      <h3>Checkout</h3>
      <p class="inactive-message">Add products to your cart to continue checkout.</p>
    `;

    return;
  }

  const itemsWithDetails = cart
    .map((cartItem) => {
      const item = INVENTORY.find((inventoryItem) => inventoryItem.id === cartItem.id);

      if (!item) {
        return null;
      }

      return {
        ...item,
        quantity: cartItem.quantity,
        total: item.price * cartItem.quantity,
      };
    })
    .filter(Boolean);

  const subtotal = itemsWithDetails.reduce((total, item) => total + item.total, 0);
  const deliveryFee = subtotal > 0 ? 35 : 0;
  const total = subtotal + deliveryFee;

  cartItemsContainer.innerHTML = itemsWithDetails
    .map(
      (item) => `
        <div class="cart-item">
          <div class="cart-item-details">
            <h4>${escapeHtml(item.name)}</h4>
            <p>${escapeHtml(item.category)} • ${formatCurrency(item.price)} each</p>
          </div>
          <div class="cart-item-actions">
            <div class="qty-controls">
              <button class="qty-btn" data-action="decrease" data-item-id="${item.id}">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" data-action="increase" data-item-id="${item.id}">+</button>
            </div>
            <strong>${formatCurrency(item.total)}</strong>
          </div>
        </div>
      `
    )
    .join('');

  cartSummary.innerHTML = `
    <h3>Checkout</h3>
    <div class="total-line"><span>Subtotal</span><strong>${formatCurrency(subtotal)}</strong></div>
    <div class="total-line"><span>Delivery Fee</span><strong>${formatCurrency(deliveryFee)}</strong></div>
    <div class="total-line total-amount"><span>Total</span><strong>${formatCurrency(total)}</strong></div>

    <div class="payment-options">
      <label class="payment-option">
        <input type="radio" name="paymentMethod" value="UPI" checked />
        <span>UPI</span>
      </label>
      <label class="payment-option">
        <input type="radio" name="paymentMethod" value="Credit Card" />
        <span>Credit Card</span>
      </label>
      <label class="payment-option">
        <input type="radio" name="paymentMethod" value="Debit Card" />
        <span>Debit Card</span>
      </label>
      <label class="payment-option">
        <input type="radio" name="paymentMethod" value="Net Banking" />
        <span>Net Banking</span>
      </label>
    </div>

    <form id="checkoutForm" class="checkout-form">
      <div class="payment-method-section active" data-method="UPI">
        <div class="field-group">
          <label for="upiId">UPI ID</label>
          <input type="text" id="upiId" name="upiId" placeholder="name@upi" />
        </div>
      </div>

      <div class="payment-method-section" data-method="Credit Card">
        <div class="field-group">
          <label for="cardHolderName">Card Holder Name</label>
          <input type="text" id="cardHolderName" name="cardHolderName" placeholder="Enter card holder name" />
        </div>
        <div class="field-group">
          <label for="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" />
        </div>
        <div class="field-group">
          <label for="expiryDate">Expiry Date</label>
          <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" />
        </div>
        <div class="field-group">
          <label for="cvv">CVV</label>
          <input type="password" id="cvv" name="cvv" placeholder="CVV" />
        </div>
      </div>

      <div class="payment-method-section" data-method="Debit Card">
        <div class="field-group">
          <label for="debitCardHolderName">Card Holder Name</label>
          <input type="text" id="debitCardHolderName" name="debitCardHolderName" placeholder="Enter card holder name" />
        </div>
        <div class="field-group">
          <label for="debitCardNumber">Card Number</label>
          <input type="text" id="debitCardNumber" name="debitCardNumber" placeholder="1234 5678 9012 3456" />
        </div>
        <div class="field-group">
          <label for="debitExpiryDate">Expiry Date</label>
          <input type="text" id="debitExpiryDate" name="debitExpiryDate" placeholder="MM/YY" />
        </div>
        <div class="field-group">
          <label for="debitCvv">CVV</label>
          <input type="password" id="debitCvv" name="debitCvv" placeholder="CVV" />
        </div>
      </div>

      <div class="payment-method-section" data-method="Net Banking">
        <div class="field-group">
          <label for="bankName">Bank Name</label>
          <input type="text" id="bankName" name="bankName" placeholder="Enter bank name" />
        </div>
        <div class="field-group">
          <label for="accountHolder">Account Holder Name</label>
          <input type="text" id="accountHolder" name="accountHolder" placeholder="Enter account holder name" />
        </div>
      </div>

      <button type="submit" class="checkout-btn">Pay ${formatCurrency(total)}</button>
    </form>
  `;

  document.querySelectorAll('.qty-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const itemId = button.dataset.itemId;
      const action = button.dataset.action;
      const cart = getCart();
      const foundItem = cart.find((cartItem) => cartItem.id === itemId);

      if (!foundItem) {
        return;
      }

      if (action === 'increase') {
        const inventoryItem = INVENTORY.find((item) => item.id === itemId);
        if (inventoryItem && foundItem.quantity >= inventoryItem.stock) {
          showAlert(`Only ${inventoryItem.stock} units of ${inventoryItem.name} available.`);
          return;
        }
        foundItem.quantity += 1;
      } else {
        foundItem.quantity -= 1;
      }

      if (foundItem.quantity <= 0) {
        const updatedCart = cart.filter((cartItem) => cartItem.id !== itemId);
        saveCart(updatedCart);
      } else {
        saveCart(cart);
      }

      renderCartPage();
    });
  });

  document.querySelectorAll('input[name="paymentMethod"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.payment-method-section').forEach((section) => {
        section.classList.toggle('active', section.dataset.method === radio.value);
      });
    });
  });

  document.getElementById('checkoutForm')?.addEventListener('submit', handleCheckoutSubmit);
};

const handleCheckoutSubmit = (event) => {
  event.preventDefault();

  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = 'index.html';
    return;
  }

  const cart = getCart();

  if (!cart.length) {
    showAlert('Your cart is empty.');
    return;
  }

  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'UPI';
  const items = cart
    .map((cartItem) => {
      const item = INVENTORY.find((inventoryItem) => inventoryItem.id === cartItem.id);
      return item ? { ...item, quantity: cartItem.quantity, total: item.price * cartItem.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const deliveryFee = subtotal > 0 ? 35 : 0;
  const total = subtotal + deliveryFee;

  let valid = true;

  if (paymentMethod === 'UPI') {
    const upiId = document.getElementById('upiId')?.value.trim();
    if (!upiId || !upiId.includes('@')) {
      valid = false;
      showAlert('Please enter a valid UPI ID.');
    }
  }

  if (paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') {
    const cardNumber = (paymentMethod === 'Credit Card'
      ? document.getElementById('cardNumber')
      : document.getElementById('debitCardNumber'))?.value.replace(/\s+/g, '');
    const cardHolder = (paymentMethod === 'Credit Card'
      ? document.getElementById('cardHolderName')
      : document.getElementById('debitCardHolderName'))?.value.trim();
    const expiryDate = (paymentMethod === 'Credit Card'
      ? document.getElementById('expiryDate')
      : document.getElementById('debitExpiryDate'))?.value.trim();
    const cvv = (paymentMethod === 'Credit Card'
      ? document.getElementById('cvv')
      : document.getElementById('debitCvv'))?.value.trim();

    if (!cardHolder || cardNumber.length < 12 || !expiryDate || !cvv) {
      valid = false;
      showAlert('Please fill in all card details correctly.');
    }
  }

  if (paymentMethod === 'Net Banking') {
    const bankName = document.getElementById('bankName')?.value.trim();
    const accountHolder = document.getElementById('accountHolder')?.value.trim();

    if (!bankName || !accountHolder) {
      valid = false;
      showAlert('Please enter your bank name and account holder name.');
    }
  }

  if (!valid) {
    return;
  }

  const invoice = {
    invoiceNo: `INV-${Date.now()}`,
    transactionId: `TXN-${Date.now()}`,
    customer: `${currentUser.firstname} ${currentUser.lastname}`,
    emailid: currentUser.emailid,
    paymentMethod,
    date: new Date().toLocaleString(),
    items,
    subtotal,
    deliveryFee,
    total,
  };

  generateInvoicePdf(invoice);
  saveCart([]);
  showAlert('Payment successful. Invoice downloaded as PDF.');
  window.location.href = 'dashboard.html';
};

const generateInvoicePdf = (invoice) => {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    showAlert('PDF generation is unavailable in this browser.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Grocery Management System Invoice', 14, 20);

  doc.setFontSize(11);
  doc.text(`Invoice No: ${invoice.invoiceNo}`, 14, 30);
  doc.text(`Transaction ID: ${invoice.transactionId}`, 14, 38);
  doc.text(`Customer: ${invoice.customer}`, 14, 46);
  doc.text(`Email: ${invoice.emailid}`, 14, 54);
  doc.text(`Payment Method: ${invoice.paymentMethod}`, 14, 62);
  doc.text(`Date: ${invoice.date}`, 14, 70);

  let y = 88;
  doc.text('Item', 14, y);
  doc.text('Qty', 100, y);
  doc.text('Price', 140, y);
  doc.text('Total', 170, y);

  y += 8;

  invoice.items.forEach((item) => {
    doc.text(item.name, 14, y);
    doc.text(String(item.quantity), 100, y);
    doc.text(formatPdfCurrency(item.price), 140, y);
    doc.text(formatPdfCurrency(item.total), 170, y);
    y += 8;
  });

  y += 6;
  doc.text(`Subtotal: ${formatPdfCurrency(invoice.subtotal)}`, 14, y);
  y += 8;
  doc.text(`Delivery Fee: ${formatPdfCurrency(invoice.deliveryFee)}`, 14, y);
  y += 8;
  doc.text(`Total Amount: ${formatPdfCurrency(invoice.total)}`, 14, y);

  doc.save(`${invoice.invoiceNo}.pdf`);
};

const initializePage = () => {
  const page = document.body.dataset.page;

  if (page === 'login') {
    document.getElementById('loginForm')?.addEventListener('submit', handleLoginSubmit);
  }

  if (page === 'register') {
    document.getElementById('registerForm')?.addEventListener('submit', handleRegisterSubmit);
  }

  if (page === 'dashboard') {
    renderDashboard();
  }

  if (page === 'profile') {
    populateProfileForm();
    document.getElementById('enableEditBtn')?.addEventListener('click', () => {
      setProfileEditingState(true);
    });
    document.getElementById('profileForm')?.addEventListener('submit', handleProfileSubmit);
  }

  if (page === 'cart') {
    renderCartPage();
  }
};

initializePage();
