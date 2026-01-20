// ============================================
// SHOPPING CART SYSTEM
// ============================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count on page load
updateCartCount();

// Add to Cart Functionality
document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const productName = document.querySelector('.product-title').textContent;
    const price = 450.00;
    
    // Add to cart
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: quantity
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success notification
    showNotification('Added to cart successfully!', 'success');
    
    // Animate button
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
});

// Update Cart Count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartIcon = document.querySelector('.cart-icon');
    
    // Remove existing badge if any
    const existingBadge = cartIcon.querySelector('.cart-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // Add badge if items exist
    if (totalItems > 0) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = totalItems;
        cartIcon.appendChild(badge);
    }
}

// Show Notification
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// IMAGE GALLERY
// ============================================
function changeImage(imageSrc) {
    const mainImg = document.getElementById('mainImg');
    
    // Add fade effect
    mainImg.style.opacity = '0';
    
    setTimeout(() => {
        mainImg.src = imageSrc;
        mainImg.style.opacity = '1';
    }, 200);
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    event.target.classList.add('active');
}

// Image Zoom on Hover
const mainImage = document.querySelector('.main-image');
const mainImg = document.getElementById('mainImg');

mainImage.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    mainImg.style.transformOrigin = `${x}% ${y}%`;
});

mainImage.addEventListener('mouseenter', function() {
    mainImg.style.transform = 'scale(1.3)';
});

mainImage.addEventListener('mouseleave', function() {
    mainImg.style.transform = 'scale(1)';
    mainImg.style.transformOrigin = 'center';
});

// ============================================
// QUANTITY CONTROLS
// ============================================
function increaseQty() {
    const qtyInput = document.getElementById('quantity');
    qtyInput.value = parseInt(qtyInput.value) + 1;
    animateQuantity(qtyInput);
}

function decreaseQty() {
    const qtyInput = document.getElementById('quantity');
    if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
        animateQuantity(qtyInput);
    }
}

// Animate quantity change
function animateQuantity(input) {
    input.style.transform = 'scale(1.2)';
    input.style.color = '#d2691e';
    setTimeout(() => {
        input.style.transform = 'scale(1)';
        input.style.color = '#2c2c2c';
    }, 200);
}

// Manual quantity input validation
document.getElementById('quantity').addEventListener('change', function() {
    if (this.value < 1 || isNaN(this.value)) {
        this.value = 1;
    }
});

// ============================================
// TAB SWITCHING
// ============================================
function showTab(tabName) {
    // Hide all tabs
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
        pane.style.opacity = '0';
    });
    
    // Remove active from all buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab with animation
    const selectedTab = document.getElementById(tabName);
    selectedTab.classList.add('active');
    setTimeout(() => {
        selectedTab.style.opacity = '1';
    }, 50);
    
    event.target.classList.add('active');
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-box, .review-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// PRICE ANIMATION ON LOAD
// ============================================
window.addEventListener('load', function() {
    const price = document.querySelector('.price');
    const targetPrice = 450;
    let currentPrice = 0;
    
    const priceInterval = setInterval(() => {
        currentPrice += 15;
        if (currentPrice >= targetPrice) {
            currentPrice = targetPrice;
            clearInterval(priceInterval);
        }
        price.textContent = `R ${currentPrice.toFixed(2)}`;
    }, 30);
});

// ============================================
// RATING STARS ANIMATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.rating i');
    stars.forEach((star, index) => {
        setTimeout(() => {
            star.style.transform = 'scale(1.3)';
            setTimeout(() => {
                star.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
});

// ============================================
// CART ICON CLICK (View Cart)
// ============================================
document.querySelector('.cart-icon').addEventListener('click', function(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'info');
        return;
    }
    
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartItems = cart.map(item => 
        `${item.name} x${item.quantity} - R ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
    
    alert(`YOUR CART:\n\n${cartItems}\n\nTotal: R ${cartTotal.toFixed(2)}`);
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', function(e) {
    // Press + to increase quantity
    if (e.key === '+') {
        increaseQty();
    }
    // Press - to decrease quantity
    if (e.key === '-') {
        decreaseQty();
    }
    // Press Enter on Add to Cart
    if (e.key === 'Enter' && e.target.id !== 'quantity') {
        document.querySelector('.add-to-cart-btn').click();
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🌿 Shefa Flows - Handcrafted with Love 🌿', 
    'color: #8b4513; font-size: 16px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 
    'color: #32cd32; font-size: 12px;');
