// ============================================
// SHEFA FLOWS - MAIN JAVASCRIPT
// ============================================

// ============================================
// INTRO PAGE & VIDEO TRANSITION
// ============================================
function enterGarden() {
    const introPage = document.getElementById('intro-page');
    const videoSection = document.getElementById('video-section');
    const video = document.getElementById('nature-video');
    const mainNav = document.getElementById('main-nav');
    
    // Hide intro page
    introPage.style.opacity = '0';
    setTimeout(() => {
        introPage.style.display = 'none';
        
        // Show and play video
        videoSection.style.display = 'flex';
        setTimeout(() => {
            videoSection.style.opacity = '1';
            video.play();
        }, 100);
    }, 500);
    
    // After 4 seconds, fade to home page
    setTimeout(() => {
        videoSection.style.opacity = '0';
        setTimeout(() => {
            videoSection.style.display = 'none';
            mainNav.style.display = 'block';
            setTimeout(() => {
                mainNav.style.opacity = '1';
            }, 100);
            showScreen('home');
        }, 500);
    }, 4000);
}

// ============================================
// SCREEN NAVIGATION
// ============================================
function showScreen(screenName) {
    // Hide all screens
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.remove('active-screen');
    });
    
    // Remove active class from all nav buttons
    const allNavBtns = document.querySelectorAll('.nav-btn');
    allNavBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected screen
    const targetScreen = document.getElementById('screen-' + screenName);
    if (targetScreen) {
        targetScreen.classList.add('active-screen');
        targetScreen.style.opacity = '0';
        setTimeout(() => {
            targetScreen.style.opacity = '1';
        }, 100);
    }
    
    // Highlight active nav button - find the button that was clicked
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(screenName)) {
            btn.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Handle plant popups for remedies screen
    if (screenName === 'remedies') {
        startPlantPopups();
    } else {
        stopPlantPopups();
    }
}

// ============================================
// PLANT INFO POPUP SYSTEM
// ============================================
const plantInfo = {
    'diatomaceous-earth': {
        name: 'Diatomaceous Earth',
        description: 'A natural detoxifier from fossilized algae. Supports gentle internal cleansing and digestive balance while removing what no longer serves the body\'s flow.'
    },
    'castor-oil': {
        name: 'Castor Oil',
        description: 'Sacred oil known for its ability to soften, soothe, and support lymphatic movement. Helps the body release stored tension and emotional holding patterns.'
    },
    'hydrolyzed-collagen': {
        name: 'Hydrolyzed Collagen',
        description: 'Rebuilds structural integrity from within. Supports joints, skin, and connective tissue while maintaining flexibility and openness in the physical form.'
    },
    'amino-mag': {
        name: 'Amino Mag',
        description: 'Magnesium bound with amino acids for superior absorption. Calms the nervous system, relaxes muscles, and signals to the body that it is safe to rest.'
    },
    'canna-drops': {
        name: 'Canna Drops',
        description: 'Full-spectrum plant medicine that grounds presence and awareness. Supports nervous system regulation and helps the body return to the present moment.'
    },
    'canna-capsules': {
        name: 'Canna Capsules',
        description: 'Consistent, measured support for daily calm. Works with the endocannabinoid system to maintain balance and inner stillness throughout the day.'
    },
    'canna-gummy-bears': {
        name: 'Canna Gummy Bears',
        description: 'Joyful medicine in playful form. Reminds us that healing doesn\'t have to be serious — pleasure and lightness are part of the flow.'
    },
    'canna-balm': {
        name: 'Canna Balm',
        description: 'Topical relief that invites you back into your body gently. Soothes inflammation, tension, and areas holding pain or memory.'
    },
    'canna-body-butter': {
        name: 'Canna Body Butter',
        description: 'Luxurious nourishment for the skin temple. Rich, restorative care that reminds the body it is worthy of tenderness and sacred touch.'
    },
    'canna-night-cream': {
        name: 'Canna Night Cream',
        description: 'Supports cellular repair while you rest. Applied with intention before sleep, it signals to the skin that healing unfolds in the quiet hours.'
    },
    'canna-anti-aging-serum': {
        name: 'Canna Anti-Aging Serum',
        description: 'Celebrates the wisdom of time. Supports skin elasticity and radiance, honoring that beauty deepens with each lived experience.'
    },
    'canna-sex-lube': {
        name: 'Canna Sex Lube',
        description: 'Sacred support for intimacy and pleasure. Enhances sensation and presence, honoring that creation and life force flow through embodied pleasure.'
    }
};

let popupInterval;

// Start popup timer when on remedies page
function startPlantPopups() {
    // Clear any existing interval
    if (popupInterval) {
        clearInterval(popupInterval);
    }
    
    // Show popup every 60 seconds (1 minute)
    popupInterval = setInterval(() => {
        showRandomPlantInfo();
    }, 60000);
}

// Stop popups when leaving remedies page
function stopPlantPopups() {
    if (popupInterval) {
        clearInterval(popupInterval);
    }
}

// Show random plant info popup
function showRandomPlantInfo() {
    const plantKeys = Object.keys(plantInfo);
    const randomKey = plantKeys[Math.floor(Math.random() * plantKeys.length)];
    const plant = plantInfo[randomKey];
    
    const popup = document.querySelector('.plant-popup');
    const title = document.getElementById('popup-title');
    const description = document.getElementById('popup-description');
    
    title.textContent = plant.name;
    description.textContent = plant.description;
    
    popup.classList.add('show');
    
    // Auto close after 10 seconds
    setTimeout(() => {
        closePopup();
    }, 10000);
}

function closePopup() {
    const popup = document.querySelector('.plant-popup');
    popup.classList.remove('show');
}

//============================================
// PAGE LOAD INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Check if intro has been shown before
    const introShown = sessionStorage.getItem('introShown');
    
    if (introShown) {
        // Skip intro, go straight to home
        const introPage = document.getElementById('intro-page');
        const videoSection = document.getElementById('video-section');
        const mainNav = document.getElementById('main-nav');
        
        introPage.style.display = 'none';
        videoSection.style.display = 'none';
        mainNav.style.display = 'block';
        mainNav.style.opacity = '1';
        showScreen('home');
    } else {
        // Mark intro as shown for this session
        sessionStorage.setItem('introShown', 'true');
    }
    
    // Add smooth transitions to all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.style.transition = 'opacity 0.5s ease';
    });
});

// ============================================
// HELPER FUNCTIONS
// ============================================

// Close popup when clicking outside
document.addEventListener('click', function(event) {
    const popup = document.querySelector('.plant-popup');
    const popupContent = document.querySelector('.popup-content');
    
    if (popup && event.target === popup) {
        closePopup();
    }
});

// Smooth scroll for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🌿 Shefa Flows - As Within So Without 🌿', 
    'color: #8b4513; font-size: 16px; font-weight: bold;');
console.log('%cHealing is remembered, not forced', 
    'color: #32cd32; font-size: 12px;');
