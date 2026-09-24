// Local storage keys keep the browser-only application data separated by purpose.
const STORAGE_KEY = 'grocery_users';
const SESSION_KEY = 'grocery_logged_in_user';
const CART_KEY = 'grocery_cart';
const INVENTORY_KEY = 'grocery_inventory';
const ORDERS_KEY = 'grocery_orders';
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'grocery@team3?';
// Categories are displayed in this business-friendly order instead of alphabetically.
const CATEGORY_ORDER = [
  'Fruits & Vegetables',
  'Rice & Staples',
  'Personal Care',
  'Household Essentials',
  'Refrigerated Items',
  'Bakery',
  'Beverages',
  'Chocolates',
];

// Starter products used when no inventory has been saved in this browser yet.
const DEFAULT_INVENTORY = [
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

// Load saved inventory or clone the starter list so it can be modified safely.
const loadInventory = () => {
  const inventory = JSON.parse(localStorage.getItem(INVENTORY_KEY) || 'null');
  return Array.isArray(inventory) ? inventory : DEFAULT_INVENTORY.map((item) => ({ ...item }));
};

// This in-memory array is the source used by product cards, cart totals, and admin tools.
let INVENTORY = loadInventory();

// Persist the current inventory after an admin edit or completed purchase.
const saveInventory = () => {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(INVENTORY));
};

// Read customer accounts from browser storage and guard against malformed data.
const getUsers = () => {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return Array.isArray(users) ? users : [];
};

// Save the complete customer account list.
const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Return the session user that controls access to protected pages.
const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  return user || null;
};

// Start or refresh the current browser session.
const setCurrentUser = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

// End the current browser session.
const clearCurrentUser = () => {
  localStorage.removeItem(SESSION_KEY);
};

// Read the cart, which stores product IDs and quantities rather than copied prices.
const getCart = () => {
  const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  return Array.isArray(cart) ? cart : [];
};

// Persist cart changes so the dashboard and cart page share the same contents.
const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Read completed invoices used by the customer's order-history view.
const getOrders = () => {
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  return Array.isArray(orders) ? orders : [];
};

// Persist completed orders in the browser.
const saveOrders = (orders) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

// Escape dynamic values before inserting them into generated HTML strings.
const escapeHtml = (value) => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Keep user notifications consistent across all page handlers.
const showAlert = (message) => {
  alert(message);
};

// Enforce the password policy used during registration and profile changes.
const validatePassword = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  return password.length >= 16 && hasUppercase && hasLowercase && hasNumber && hasSpecial;
};

// Allow letters separated by spaces while rejecting digits and punctuation.
const validateName = (name) => /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name);

// Give immediate feedback and remove unsupported name characters as they are entered.
const handleNameInput = (event) => {
  const input = event.target;
  const error = document.getElementById(`${input.id}Error`);
  const hasUnsupportedCharacters = /[^A-Za-z ]/.test(input.value);

  input.value = input.value.replace(/[^A-Za-z ]/g, '');
  input.setCustomValidity('');

  if (error) {
    error.textContent = hasUnsupportedCharacters ? 'Use letters and spaces only.' : '';
  }
};

// Show immediate feedback when a non-empty email does not have a valid format.
const handleEmailInput = (event) => {
  const input = event.target;
  const error = document.getElementById('emailError');
  const email = input.value.trim();
  const isInvalidEmail = email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  input.setCustomValidity('');

  if (error) {
    error.textContent = isInvalidEmail ? 'Enter a valid email address, such as name@example.com.' : '';
  }
};

const setFieldError = (inputId, message) => {
  const error = document.getElementById(`${inputId}Error`);
  if (error) {
    error.textContent = message;
  }
};

// Keep payment names consistent with registration names while typing.
const handlePaymentNameInput = (event) => {
  handleNameInput(event);
};

// Accept exactly 16 digits for both credit and debit card numbers.
const handleCardNumberInput = (event) => {
  const input = event.target;
  const hadUnsupportedCharacters = /[^\d\s]/.test(input.value);
  input.value = input.value.replace(/\D/g, '').slice(0, 16);

  setFieldError(
    input.id,
    hadUnsupportedCharacters || (input.value && input.value.length !== 16) ? 'Card number must contain exactly 16 digits.' : ''
  );
};

// Format expiry as MM/YY and reject months before the current month.
const handleExpiryInput = (event) => {
  const input = event.target;
  const hadUnsupportedCharacters = /[^\d/\s]/.test(input.value);
  const digits = input.value.replace(/\D/g, '').slice(0, 4);
  input.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;

  let message = '';
  if (hadUnsupportedCharacters || (input.value && !/^\d{2}\/\d{2}$/.test(input.value))) {
    message = 'Enter expiry in MM/YY format.';
  } else if (input.value) {
    const [month, year] = input.value.split('/').map(Number);
    const now = new Date();
    const currentMonth = now.getFullYear() * 12 + now.getMonth();
    const expiryMonth = (2000 + year) * 12 + month - 1;
    if (month < 1 || month > 12 || expiryMonth < currentMonth) {
      message = 'Expiry date cannot be in the past.';
    }
  }

  setFieldError(input.id, message);
};

// Accept exactly 3 digits for card CVV values.
const handleCvvInput = (event) => {
  const input = event.target;
  const hadUnsupportedCharacters = /[^\d]/.test(input.value);
  input.value = input.value.replace(/\D/g, '').slice(0, 3);
  setFieldError(input.id, hadUnsupportedCharacters || (input.value && input.value.length !== 3) ? 'CVV must contain exactly 3 digits.' : '');
};

// Validate common UPI IDs such as nikhil@paytm or nikhil@gpay.
const handleUpiInput = (event) => {
  const input = event.target;
  const value = input.value.trim();
  const isInvalid = value.length > 0 && !/^[A-Za-z0-9][A-Za-z0-9._-]*@[A-Za-z0-9][A-Za-z0-9.-]*$/.test(value);
  setFieldError(input.id, isInvalid ? 'Enter a valid UPI ID, such as nikhil@paytm.' : '');
};

// Email comparisons are case-insensitive and ignore accidental surrounding spaces.
const normalizeEmail = (email) => (email || '').trim().toLowerCase();

// Add a requested quantity while preventing nonexistent products and overselling.
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

// Calculate the merchandise total from current inventory prices.
const getCartTotal = () => {
  return getCart().reduce((total, cartItem) => {
    const item = INVENTORY.find((inventoryItem) => inventoryItem.id === cartItem.id);
    return total + (item ? item.price * cartItem.quantity : 0);
  }, 0);
};

// Use separate display formats because the browser and generated PDF use different fonts.
const formatCurrency = (amount) => `₹${Number(amount).toFixed(2)}`;
const formatPdfCurrency = (amount) => `Rs. ${Number(amount).toFixed(2)}`;
const calculateGst = (amount) => amount * 0.07;

// Show only orders belonging to the signed-in customer.
const renderOrderHistory = (currentUser) => {
  const orderHistory = document.getElementById('orderHistory');

  if (!orderHistory || !currentUser) {
    return;
  }

  const orders = getOrders().filter((order) => normalizeEmail(order.emailid) === normalizeEmail(currentUser.emailid));

  orderHistory.innerHTML = orders.length
    ? orders
        .slice()
        .reverse()
        .map(
          (order) => `
            <article class="order-row">
              <div>
                <strong>${escapeHtml(order.invoiceNo)}</strong>
                <span>${escapeHtml(order.date)} • ${escapeHtml(order.paymentMethod)}</span>
              </div>
              <strong>${formatCurrency(order.total)}</strong>
            </article>
          `
        )
        .join('')
    : '<p class="inactive-message">No completed orders yet.</p>';
};

// Render the compact cart summary shown beside the inventory.
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
  const gst = calculateGst(subtotal);
  const total = subtotal + deliveryFee + gst;

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
              <p>${formatCurrency(item.price)} each</p>
              <div class="cart-sidebar-item-footer">
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
        .join('')}
    </div>

    <div class="cart-sidebar-total">
      <div class="total-line"><span>Subtotal</span><strong>${formatCurrency(subtotal)}</strong></div>
      <div class="total-line"><span>Delivery Fee</span><strong>${formatCurrency(deliveryFee)}</strong></div>
      <div class="total-line"><span>GST (7%)</span><strong>${formatCurrency(gst)}</strong></div>
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

  document.querySelectorAll('.cart-sidebar .qty-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const itemId = button.dataset.itemId;
      const action = button.dataset.action;
      const updatedCart = getCart();
      const foundItem = updatedCart.find((cartItem) => cartItem.id === itemId);

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

      saveCart(updatedCart.filter((cartItem) => cartItem.quantity > 0));
      renderDashboard();
    });
  });
};

// Build the customer dashboard, including account controls, filters, products, and cart.
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
    <div class="inventory-filters">
      <label for="inventorySearch">Search products</label>
      <input type="search" id="inventorySearch" placeholder="Search by product name" />
      <label for="categoryFilter">Category</label>
      <select id="categoryFilter"><option value="all">All categories</option></select>
    </div>
  `;

  const categories = [...new Set(INVENTORY.map((item) => item.category))].sort(
    (firstCategory, secondCategory) => CATEGORY_ORDER.indexOf(firstCategory) - CATEGORY_ORDER.indexOf(secondCategory)
  );

  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML += categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('');

  // Rebuild product cards whenever the search term or category changes.
  const renderInventory = () => {
    const searchTerm = document.getElementById('inventorySearch')?.value.trim().toLowerCase() || '';
    const selectedCategory = categoryFilter?.value || 'all';

    inventoryContainer.innerHTML = categories
    .map((category) => {
      const items = INVENTORY.filter(
        (item) =>
          item.category === category &&
          (selectedCategory === 'all' || item.category === selectedCategory) &&
          (!searchTerm || item.name.toLowerCase().includes(searchTerm))
      );

      if (!items.length) {
        return '';
      }

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
    .join('') || '<p class="inactive-message">No products match your search.</p>';

    document.querySelectorAll('.add-cart-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const itemId = button.dataset.itemId;
        const quantityInput = document.querySelector(`[data-quantity-for="${itemId}"]`);
        const quantity = Number(quantityInput?.value || 1);

        addToCart(itemId, quantity);
        renderDashboard();
      });
    });
  };

  document.getElementById('inventorySearch')?.addEventListener('input', renderInventory);
  categoryFilter?.addEventListener('change', renderInventory);
  renderInventory();

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

  renderDashboardCart(currentUser);
};

// Authenticate either the fixed admin account or a locally registered customer.
const handleLoginSubmit = (event) => {
  event.preventDefault();

  const email = normalizeEmail(document.getElementById('loginEmail').value);
  const password = document.getElementById('loginPassword').value;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    setCurrentUser({ emailid: ADMIN_EMAIL, firstname: 'Admin', lastname: '', role: 'admin' });
    window.location.href = 'admin.html';
    return;
  }

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

// Validate and save a new customer account, then return to login.
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

  if (!validateName(firstname) || !validateName(lastname)) {
    showAlert('First name and last name may contain letters and spaces only.');
    return;
  }

  if (!emailid.includes('@')) {
    showAlert('Please enter a valid email ID.');
    return;
  }

  if (emailid === ADMIN_EMAIL) {
    showAlert('This email is reserved for the administrator.');
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

// Toggle profile fields and buttons between read-only and edit modes.
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

// Fill the profile form from the current session before the page is displayed.
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

// Validate profile changes and update both the account list and active session.
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

// Render cart quantities, totals, payment choices, and checkout fields.
const renderCartPage = () => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = 'index.html';
    return;
  }

  if (currentUser.useractive === false) {
    showAlert('Activate your profile before opening the cart.');
    window.location.href = 'dashboard.html';
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
  const gst = calculateGst(subtotal);
  const total = subtotal + deliveryFee + gst;

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
    <div class="total-line"><span>GST (7%)</span><strong>${formatCurrency(gst)}</strong></div>
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
          <small class="field-error" id="upiIdError" aria-live="polite"></small>
        </div>
      </div>

      <div class="payment-method-section" data-method="Credit Card">
        <div class="field-group">
          <label for="cardHolderName">Card Holder Name</label>
          <input type="text" id="cardHolderName" name="cardHolderName" placeholder="Enter card holder name" />
          <small class="field-error" id="cardHolderNameError" aria-live="polite"></small>
        </div>
        <div class="field-group">
          <label for="cardNumber">Card Number</label>
          <input type="text" id="cardNumber" name="cardNumber" placeholder="16-digit card number" inputmode="numeric" maxlength="16" />
          <small class="field-error" id="cardNumberError" aria-live="polite"></small>
        </div>
        <div class="field-group">
          <label for="expiryDate">Expiry Date</label>
          <input type="text" id="expiryDate" name="expiryDate" placeholder="MM/YY" inputmode="numeric" maxlength="5" />
          <small class="field-error" id="expiryDateError" aria-live="polite"></small>
        </div>
        <div class="field-group">
          <label for="cvv">CVV</label>
          <input type="password" id="cvv" name="cvv" placeholder="3-digit CVV" inputmode="numeric" maxlength="3" />
          <small class="field-error" id="cvvError" aria-live="polite"></small>
        </div>
      </div>

      <div class="payment-method-section" data-method="Debit Card">
        <div class="field-group">
          <label for="debitCardHolderName">Card Holder Name</label>
          <input type="text" id="debitCardHolderName" name="debitCardHolderName" placeholder="Enter card holder name" />
          <small class="field-error" id="debitCardHolderNameError" aria-live="polite"></small>
        </div>
        <div class="field-group">
          <label for="debitCardNumber">Card Number</label>
          <input type="text" id="debitCardNumber" name="debitCardNumber" placeholder="16-digit card number" inputmode="numeric" maxlength="16" />
          <small class="field-error" id="debitCardNumberError" aria-live="polite"></small>
        </div>
        <div class="field-group">
          <label for="debitExpiryDate">Expiry Date</label>
          <input type="text" id="debitExpiryDate" name="debitExpiryDate" placeholder="MM/YY" inputmode="numeric" maxlength="5" />
          <small class="field-error" id="debitExpiryDateError" aria-live="polite"></small>
        </div>
        <div class="field-group">
          <label for="debitCvv">CVV</label>
          <input type="password" id="debitCvv" name="debitCvv" placeholder="3-digit CVV" inputmode="numeric" maxlength="3" />
          <small class="field-error" id="debitCvvError" aria-live="polite"></small>
        </div>
      </div>

      <div class="payment-method-section" data-method="Net Banking">
        <div class="field-group">
          <label for="bankName">Bank Name</label>
          <input type="text" id="bankName" name="bankName" placeholder="Enter bank name" />
          <small class="field-error" id="bankNameError" aria-live="polite"></small>
        </div>
        <div class="field-group">
          <label for="accountHolder">Account Holder Name</label>
          <input type="text" id="accountHolder" name="accountHolder" placeholder="Enter account holder name" />
          <small class="field-error" id="accountHolderError" aria-live="polite"></small>
        </div>
      </div>

      <button type="submit" class="checkout-btn">Pay ${formatCurrency(total)}</button>
    </form>
  `;

  // Quantity buttons update localStorage and then redraw the totals.
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

  ['cardHolderName', 'debitCardHolderName', 'bankName', 'accountHolder'].forEach((inputId) => {
    document.getElementById(inputId)?.addEventListener('input', handlePaymentNameInput);
  });
  ['cardNumber', 'debitCardNumber'].forEach((inputId) => {
    document.getElementById(inputId)?.addEventListener('input', handleCardNumberInput);
  });
  ['expiryDate', 'debitExpiryDate'].forEach((inputId) => {
    document.getElementById(inputId)?.addEventListener('input', handleExpiryInput);
  });
  ['cvv', 'debitCvv'].forEach((inputId) => {
    document.getElementById(inputId)?.addEventListener('input', handleCvvInput);
  });
  document.getElementById('upiId')?.addEventListener('input', handleUpiInput);

  // Show only the input group belonging to the selected payment method.
  document.querySelectorAll('input[name="paymentMethod"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.payment-method-section').forEach((section) => {
        section.classList.toggle('active', section.dataset.method === radio.value);
      });
    });
  });

  document.getElementById('checkoutForm')?.addEventListener('submit', handleCheckoutSubmit);
};

// Validate payment details, create an invoice, reduce stock, and save the order.
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
  const gst = calculateGst(subtotal);
  const total = subtotal + deliveryFee + gst;

  let valid = true;

  if (paymentMethod === 'UPI') {
    const upiId = document.getElementById('upiId')?.value.trim();
    if (!upiId || !/^[A-Za-z0-9][A-Za-z0-9._-]*@[A-Za-z0-9][A-Za-z0-9.-]*$/.test(upiId)) {
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

    const [expiryMonth, expiryYear] = (expiryDate || '').split('/').map(Number);
    const now = new Date();
    const currentMonth = now.getFullYear() * 12 + now.getMonth();
    const expiryMonthValue = (2000 + expiryYear) * 12 + expiryMonth - 1;

    if (
      !validateName(cardHolder || '') ||
      !/^\d{16}$/.test(cardNumber || '') ||
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate || '') ||
      expiryMonthValue < currentMonth ||
      !/^\d{3}$/.test(cvv || '')
    ) {
      valid = false;
      showAlert('Please fill in all card details correctly.');
    }
  }

  if (paymentMethod === 'Net Banking') {
    const bankName = document.getElementById('bankName')?.value.trim();
    const accountHolder = document.getElementById('accountHolder')?.value.trim();

    if (!validateName(bankName || '') || !validateName(accountHolder || '')) {
      valid = false;
      showAlert('Please enter your bank name and account holder name using letters and spaces only.');
    }
  }

  if (!valid) {
    return;
  }

  const unavailableItem = items.find((item) => item.quantity > item.stock);
  if (unavailableItem) {
    showAlert(`Only ${unavailableItem.stock} units of ${unavailableItem.name} are available.`);
    renderCartPage();
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
    gst,
    total,
  };

  INVENTORY = INVENTORY.map((inventoryItem) => {
    const purchasedItem = items.find((item) => item.id === inventoryItem.id);
    return purchasedItem ? { ...inventoryItem, stock: inventoryItem.stock - purchasedItem.quantity } : inventoryItem;
  });
  saveInventory();

  const orders = getOrders();
  orders.push(invoice);
  saveOrders(orders);

  const pdfGenerated = generateInvoicePdf(invoice);
  saveCart([]);
  showAlert(pdfGenerated ? 'Payment successful. Invoice downloaded as PDF.' : 'Payment successful. Your order was saved, but the invoice PDF could not be generated.');
  window.location.href = 'dashboard.html';
};

// Generate a downloadable invoice when the external jsPDF library is available.
const generateInvoicePdf = (invoice) => {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    return false;
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
  doc.text(`GST (7%): ${formatPdfCurrency(invoice.gst)}`, 14, y);
  y += 8;
  doc.text(`Total Amount: ${formatPdfCurrency(invoice.total)}`, 14, y);

  doc.save(`${invoice.invoiceNo}.pdf`);
  return true;
};

// Build the admin console and attach user and inventory management actions.
const renderAdminPage = () => {
  const currentUser = getCurrentUser();

  if (!currentUser || currentUser.role !== 'admin') {
    window.location.href = 'index.html';
    return;
  }

  const usersContainer = document.getElementById('adminUsers');
  const inventoryContainer = document.getElementById('adminInventory');
  const categorySelect = document.getElementById('productCategory');
  const logoutButton = document.getElementById('adminLogoutBtn');

  if (!usersContainer || !inventoryContainer || !categorySelect) {
    return;
  }

  // Render customers and let the admin activate or deactivate each account.
  const renderUsers = () => {
    const users = getUsers();
    usersContainer.innerHTML = users.length
      ? users
          .map(
            (user) => `
              <div class="admin-row">
                <div>
                  <strong>${escapeHtml(`${user.firstname} ${user.lastname}`.trim())}</strong>
                  <span>${escapeHtml(user.emailid)}</span>
                </div>
                <div class="admin-row-actions">
                  <span class="status-badge ${user.useractive === false ? 'inactive' : 'active'}">${user.useractive === false ? 'Inactive' : 'Active'}</span>
                  <button class="secondary-btn admin-user-toggle" data-email="${escapeHtml(user.emailid)}">${user.useractive === false ? 'Activate' : 'Deactivate'}</button>
                </div>
              </div>
            `
          )
          .join('')
      : '<p class="inactive-message">No registered users yet.</p>';

    document.querySelectorAll('.admin-user-toggle').forEach((button) => {
      button.addEventListener('click', () => {
        const users = getUsers();
        const user = users.find((entry) => normalizeEmail(entry.emailid) === normalizeEmail(button.dataset.email));

        if (user) {
          user.useractive = user.useractive === false;
          saveUsers(users);
          renderUsers();
        }
      });
    });
  };

  // Render editable product controls grouped by category.
  const renderInventory = () => {
    const categories = [...new Set([...INVENTORY.map((item) => item.category), ...Array.from(categorySelect.options).map((option) => option.value)])].sort(
      (firstCategory, secondCategory) => CATEGORY_ORDER.indexOf(firstCategory) - CATEGORY_ORDER.indexOf(secondCategory)
    );
    categorySelect.innerHTML = categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('');

    inventoryContainer.innerHTML = categories
      .map((category) => {
        const items = INVENTORY.filter((item) => item.category === category);

        return `
          <section class="category-section">
            <h3>${escapeHtml(category)}</h3>
            ${items.length ? items.map((item) => `
              <div class="admin-row inventory-admin-row">
                <div class="admin-product-info"><span class="item-emoji">${item.emoji}</span><div><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.quantity)} • ${formatCurrency(item.price)}</span></div></div>
                <div class="admin-product-controls">
                  <label>Name <input type="text" class="admin-name-input" data-item-id="${item.id}" value="${escapeHtml(item.name)}" /></label>
                  <label>Category <select class="admin-category-input" data-item-id="${item.id}">${categories
                    .map((availableCategory) => `<option value="${escapeHtml(availableCategory)}" ${availableCategory === item.category ? 'selected' : ''}>${escapeHtml(availableCategory)}</option>`)
                    .join('')}</select></label>
                  <label>Quantity <input type="text" class="admin-quantity-input" data-item-id="${item.id}" value="${escapeHtml(item.quantity)}" /></label>
                  <label>Price <input type="number" min="0" step="0.01" class="admin-price-input" data-item-id="${item.id}" value="${item.price}" /></label>
                  <label>Stock <input type="number" min="0" class="admin-stock-input" data-item-id="${item.id}" value="${item.stock}" /></label>
                  <label>Icon <input type="text" maxlength="4" class="admin-emoji-input" data-item-id="${item.id}" value="${escapeHtml(item.emoji)}" /></label>
                  <button class="primary-btn admin-save-product" data-item-id="${item.id}">Save</button>
                  <button class="warning-btn admin-delete-item" data-item-id="${item.id}">Delete</button>
                </div>
              </div>
            `).join('') : '<p class="inactive-message">No products in this section.</p>'}
          </section>
        `;
      })
      .join('');

    document.querySelectorAll('.admin-save-product').forEach((button) => {
      button.addEventListener('click', () => {
        const item = INVENTORY.find((entry) => entry.id === button.dataset.itemId);
        const itemId = button.dataset.itemId;
        const nameInput = document.querySelector(`[data-item-id="${itemId}"].admin-name-input`);
        const categoryInput = document.querySelector(`[data-item-id="${itemId}"].admin-category-input`);
        const quantityInput = document.querySelector(`[data-item-id="${itemId}"].admin-quantity-input`);
        const priceInput = document.querySelector(`[data-item-id="${itemId}"].admin-price-input`);
        const stockInput = document.querySelector(`[data-item-id="${itemId}"].admin-stock-input`);
        const emojiInput = document.querySelector(`[data-item-id="${itemId}"].admin-emoji-input`);
        const price = Number(priceInput?.value);
        const stock = Number(stockInput?.value);

        if (item && nameInput?.value.trim() && categoryInput?.value && quantityInput?.value.trim() && price >= 0 && Number.isInteger(stock) && stock >= 0) {
          item.name = nameInput.value.trim();
          item.category = categoryInput.value;
          item.quantity = quantityInput.value.trim();
          item.price = price;
          item.stock = stock;
          item.emoji = emojiInput?.value.trim() || '🛒';
          saveInventory();
          showAlert(`${item.name} updated.`);
          renderInventory();
        } else {
          showAlert('Enter valid product details, price, and whole-number stock.');
        }
      });
    });

    document.querySelectorAll('.admin-delete-item').forEach((button) => {
      button.addEventListener('click', () => {
        const item = INVENTORY.find((entry) => entry.id === button.dataset.itemId);
        if (item && confirm(`Delete ${item.name}?`)) {
          INVENTORY = INVENTORY.filter((entry) => entry.id !== item.id);
          saveInventory();
          renderInventory();
        }
      });
    });
  };

  // Add a new product after validating its required fields and numeric values.
  document.getElementById('addProductForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const category = String(formData.get('category') || '').trim();
    const quantity = String(formData.get('quantity') || '').trim();
    const price = Number(formData.get('price'));
    const stock = Number(formData.get('stock'));
    const emoji = String(formData.get('emoji') || '🛒').trim() || '🛒';

    if (!name || !category || !quantity || price < 0 || stock < 0 || !Number.isInteger(stock)) {
      showAlert('Enter valid product details, price, and whole-number stock.');
      return;
    }

    INVENTORY.push({ id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`, name, category, quantity, price, stock, emoji });
    saveInventory();
    form.reset();
    renderInventory();
    showAlert(`${name} added to inventory.`);
  });

  logoutButton?.addEventListener('click', () => {
    clearCurrentUser();
    window.location.href = 'index.html';
  });

  renderUsers();
  renderInventory();
};

// Attach only the handlers needed by the page identified in body[data-page].
const initializePage = () => {
  const page = document.body.dataset.page;

  if (page === 'login') {
    document.getElementById('loginForm')?.addEventListener('submit', handleLoginSubmit);
    document.getElementById('adminLoginBtn')?.addEventListener('click', () => {
      const heading = document.getElementById('loginHeading');
      const emailInput = document.getElementById('loginEmail');
      const passwordInput = document.getElementById('loginPassword');
      const adminLoginButton = document.getElementById('adminLoginBtn');

      heading.textContent = 'Admin Login';
      emailInput.placeholder = 'Enter admin email';
      passwordInput.placeholder = 'Enter admin password';
      adminLoginButton.textContent = 'Admin Mode Selected';
      adminLoginButton.disabled = true;
      emailInput.focus();
    });
  }

  if (page === 'register') {
    document.getElementById('registerForm')?.addEventListener('submit', handleRegisterSubmit);
    document.getElementById('firstName')?.addEventListener('input', handleNameInput);
    document.getElementById('lastName')?.addEventListener('input', handleNameInput);
    document.getElementById('email')?.addEventListener('input', handleEmailInput);
  }

  if (page === 'dashboard') {
    renderDashboard();
  }

  if (page === 'profile') {
    populateProfileForm();
    renderOrderHistory(getCurrentUser());
    document.getElementById('enableEditBtn')?.addEventListener('click', () => {
      setProfileEditingState(true);
    });
    document.getElementById('profileForm')?.addEventListener('submit', handleProfileSubmit);
  }

  if (page === 'cart') {
    renderCartPage();
  }

  if (page === 'admin') {
    renderAdminPage();
  }
};

initializePage();
