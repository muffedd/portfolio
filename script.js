// Pixelated Loading Screen
const loadingScreen = document.getElementById('loadingScreen');

// Hide loading screen after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500); // Reduced from 2s to 1.5s
});

// Simple Custom Cursor - White Outline Circle
const customCursor = document.getElementById('customCursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Track mouse position (passive for better performance)
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}, { passive: true });

// Smooth cursor follow
function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    customCursor.style.left = cursorX + 'px';
    customCursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}

// Expand cursor on hover over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .tab-btn, .gallery-item, .contact-btn');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        customCursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        customCursor.classList.remove('hover');
    });
});

// Start cursor animation
animateCursor();

// Tab Switching Functionality with Flip Animation
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        const currentActiveContent = document.querySelector('.tab-content.active');
        const targetContent = document.getElementById(`${targetTab}-content`);
        
        // Don't do anything if clicking the same tab
        if (currentActiveContent === targetContent) return;
        
        // Add flip-out animation to current tab
        if (currentActiveContent) {
            currentActiveContent.classList.add('flip-out');
            
            setTimeout(() => {
                currentActiveContent.classList.remove('active', 'flip-out');
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                targetContent.classList.add('active');
            }, 300);
        } else {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            targetContent.classList.add('active');
        }
    });
});

// Info Card Collapse on Scroll (throttled for performance)
const infoCard = document.getElementById('infoCard');
const infoChip = document.getElementById('infoChip');
let scrollThreshold = 300;

function handleScroll() {
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > scrollThreshold) {
        infoCard.classList.add('collapsed');
        infoChip.classList.add('visible');
        infoChip.style.display = 'flex';
    } else {
        infoCard.classList.remove('collapsed');
        infoChip.classList.remove('visible');
        setTimeout(() => {
            if (!infoChip.classList.contains('visible')) {
                infoChip.style.display = 'none';
            }
        }, 300);
    }
}

// Throttle scroll events for performance (increased to 50ms for better performance)
let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(handleScroll, 50);
}, { passive: true });

// Initial check
handleScroll();

// Adjust scroll threshold for mobile
function updateScrollThreshold() {
    scrollThreshold = window.innerWidth <= 900 ? 150 : 300;
}

updateScrollThreshold();
window.addEventListener('resize', updateScrollThreshold, { passive: true });

// Gallery item entrance animations only (removed expensive mousemove listeners)
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Staggered entrance animation
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Info chip click to scroll back to top
infoChip.addEventListener('click', () => {
    infoChip.style.transform = 'scale(0.9)';
    setTimeout(() => {
        infoChip.style.transform = 'scale(1)';
    }, 150);
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Interactive tab buttons with ripple effect
tabButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: 100px;
            height: 100px;
            left: ${e.offsetX - 50}px;
            top: ${e.offsetY - 50}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lightbox with Pan & Zoom for Featured Work Images
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

let scale = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

// Open lightbox when clicking collage images
document.addEventListener('DOMContentLoaded', () => {
    const collageImages = document.querySelectorAll('.collage-item img');
    
    collageImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(img.src);
        });
    });
});

function openLightbox(imageSrc) {
    lightboxImage.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Hide custom cursor in lightbox
    customCursor.style.display = 'none';
    
    // Reset transform
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    
    // Show custom cursor again
    customCursor.style.display = 'block';
    
    // Reset transform with delay
    setTimeout(() => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
        lightboxImage.classList.remove('zoomed');
    }, 300);
}

function updateTransform() {
    lightboxImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// Close lightbox events
lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Double-click to zoom
lightboxImage.addEventListener('dblclick', (e) => {
    e.preventDefault();
    if (scale === 1) {
        scale = 2.5;
        lightboxImage.classList.add('zoomed');
    } else {
        scale = 1;
        translateX = 0;
        translateY = 0;
        lightboxImage.classList.remove('zoomed');
    }
    updateTransform();
});

// Mouse wheel zoom
lightboxImage.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(1, scale + delta), 4);
    
    if (newScale > 1) {
        scale = newScale;
        lightboxImage.classList.add('zoomed');
    } else {
        scale = 1;
        translateX = 0;
        translateY = 0;
        lightboxImage.classList.remove('zoomed');
    }
    
    updateTransform();
}, { passive: false });

// Pan functionality
lightboxImage.addEventListener('mousedown', (e) => {
    if (scale > 1) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        lightboxImage.style.cursor = 'grabbing';
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        lightboxImage.style.cursor = scale > 1 ? 'grab' : 'zoom-out';
    }
});

// Touch support for mobile
let initialDistance = 0;
let initialScale = 1;

lightboxImage.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
        initialScale = scale;
    } else if (e.touches.length === 1 && scale > 1) {
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
    }
}, { passive: false });

lightboxImage.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const distance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
        scale = Math.min(Math.max(1, initialScale * (distance / initialDistance)), 4);
        
        if (scale > 1) {
            lightboxImage.classList.add('zoomed');
        } else {
            lightboxImage.classList.remove('zoomed');
            translateX = 0;
            translateY = 0;
        }
        
        updateTransform();
    } else if (e.touches.length === 1 && isDragging) {
        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;
        updateTransform();
    }
}, { passive: false });

lightboxImage.addEventListener('touchend', () => {
    isDragging = false;
    initialDistance = 0;
});
