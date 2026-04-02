/* ─────────────────────────────────────────
   Bloom & Petal Haven — script.js
   Handles: Add to Cart, cart count badge,
            toast notification, button state
───────────────────────────────────────── */

// Track cart item count
let cartTotal = 0;

// DOM references (wait for DOM to be ready)
document.addEventListener('DOMContentLoaded', () => {
  const cartCountEl = document.getElementById('cartCount');
  const toastEl     = document.getElementById('toast');
  const addButtons  = document.querySelectorAll('.btn-add');

  let toastTimer = null;

  /**
   * showToast — displays a brief notification at the bottom of the screen
   * @param {string} message - text to display inside the toast
   */
  function showToast(message) {
    // Clear any existing timer so overlapping toasts reset cleanly
    clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add('show');

    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2500);
  }

  /**
   * bumpCartBadge — briefly scales the cart count badge to draw attention
   */
  function bumpCartBadge() {
    cartCountEl.classList.remove('bump');
    // Force reflow so the animation restarts even on consecutive clicks
    void cartCountEl.offsetWidth;
    cartCountEl.classList.add('bump');

    setTimeout(() => cartCountEl.classList.remove('bump'), 300);
  }

  /**
   * handleAddToCart — main click handler for every "Add to Cart" button
   * Reads the plant name and price from data-* attributes on the button
   */
  function handleAddToCart(event) {
    const btn   = event.currentTarget;
    const name  = btn.dataset.name;
    const price = btn.dataset.price;

    // Increment cart count and update the badge
    cartTotal++;
    cartCountEl.textContent = cartTotal;

    // Animate the badge
    bumpCartBadge();

    // Show toast confirmation
    showToast(`${name} ($${price}) added to cart 🌿`);

    // Temporarily change button appearance to confirm the action
    const originalHTML = btn.innerHTML;
    btn.classList.add('added');
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Added!
    `;

    // Restore button to original state after 1.5s
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = originalHTML;
    }, 1500);
  }

  // Attach click listener to every "Add to Cart" button on the page
  addButtons.forEach(btn => {
    btn.addEventListener('click', handleAddToCart);
  });
});
