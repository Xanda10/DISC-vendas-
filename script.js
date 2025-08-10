// Countdown Timer
function initCountdown() {
    // Set countdown for 72 hours from now
    const countdownDate = new Date().getTime() + (72 * 60 * 60 * 1000);
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
        
        // If the countdown is finished
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "OFERTA EXPIRADA";
        }
    }, 1000);
}

// Smooth scroll to offer section
function scrollToOffer() {
    document.getElementById('offer').scrollIntoView({
        behavior: 'smooth'
    });
}

// Purchase function (placeholder)
function purchase() {
    alert('Redirecionando para o checkout seguro...\n\nEm uma implementação real, aqui seria integrado o sistema de pagamento (Stripe, PayPal, PagSeguro, etc.)');
}

// Fade in animation on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Add floating CTA button
function createFloatingCTA() {
    const floatingCTA = document.createElement('div');
    floatingCTA.innerHTML = `
        <button class="floating-cta" onclick="scrollToOffer()">
            <i class="fas fa-rocket"></i>
            Garantir Oferta
        </button>
    `;
    floatingCTA.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        display: none;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .floating-cta {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
            border: none;
            padding: 15px 20px;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: bounce 2s infinite;
        }
        
        .floating-cta:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(255, 107, 107, 0.5);
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
        
        @media (max-width: 768px) {
            .floating-cta {
                bottom: 10px;
                right: 10px;
                padding: 12px 16px;
                font-size: 0.9rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(floatingCTA);
    
    // Show floating CTA after scrolling past hero
    window.addEventListener('scroll', function() {
        const heroHeight = document.querySelector('.hero').offsetHeight;
        const scrolled = window.pageYOffset;
        
        if (scrolled > heroHeight) {
            floatingCTA.style.display = 'block';
        } else {
            floatingCTA.style.display = 'none';
        }
    });
}

// Add exit-intent popup
function initExitIntent() {
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            showExitIntentPopup();
        }
    });
}

function showExitIntentPopup() {
    const popup = document.createElement('div');
    popup.innerHTML = `
        <div class="exit-intent-overlay">
            <div class="exit-intent-popup">
                <button class="close-popup" onclick="this.parentElement.parentElement.remove()">×</button>
                <h3>🚨 Espere! Não Perca Esta Oportunidade!</h3>
                <p>Você está prestes a sair sem descobrir seu perfil comportamental...</p>
                <p><strong>Oferta especial:</strong> Use o cupom <span class="coupon">DESCUBRA10</span> e ganhe 10% de desconto adicional!</p>
                <button class="popup-cta" onclick="scrollToOffer(); this.parentElement.parentElement.remove();">
                    Aproveitar Desconto Agora
                </button>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .exit-intent-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .exit-intent-popup {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            max-width: 500px;
            text-align: center;
            position: relative;
            animation: slideIn 0.3s ease;
        }
        
        .close-popup {
            position: absolute;
            top: 15px;
            right: 20px;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
        }
        
        .exit-intent-popup h3 {
            color: #e74c3c;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .exit-intent-popup p {
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .coupon {
            background: #f39c12;
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 5px;
            font-weight: bold;
        }
        
        .popup-cta {
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            margin-top: 1rem;
            transition: all 0.3s ease;
        }
        
        .popup-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255, 107, 107, 0.3);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(popup);
}

// Add social proof notifications
function initSocialProof() {
    const notifications = [
        "João de São Paulo acabou de adquirir o DISC Completo",
        "Maria do Rio de Janeiro descobriu seu perfil há 2 minutos",
        "Carlos de Belo Horizonte garantiu sua vaga",
        "Ana de Porto Alegre acabou de se transformar",
        "Pedro de Brasília descobriu seu manual comportamental"
    ];
    
    let currentNotification = 0;
    
    function showNotification() {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div class="social-proof-notification">
                <i class="fas fa-user-check"></i>
                <span>${notifications[currentNotification]}</span>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .social-proof-notification {
                position: fixed;
                bottom: 80px;
                left: 20px;
                background: #27ae60;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(39, 174, 96, 0.3);
                z-index: 1000;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideInLeft 0.5s ease, slideOutLeft 0.5s ease 4s;
                max-width: 300px;
                font-size: 0.9rem;
            }
            
            @keyframes slideInLeft {
                from { transform: translateX(-100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutLeft {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(-100%); opacity: 0; }
            }
            
            @media (max-width: 768px) {
                .social-proof-notification {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                    font-size: 0.8rem;
                }
            }
        `;
        
        if (!document.querySelector('style[data-social-proof]')) {
            style.setAttribute('data-social-proof', 'true');
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        currentNotification = (currentNotification + 1) % notifications.length;
    }
    
    // Show first notification after 5 seconds
    setTimeout(showNotification, 5000);
    
    // Show subsequent notifications every 15 seconds
    setInterval(showNotification, 15000);
}

// Add urgency indicators
function addUrgencyIndicators() {
    // Add stock counter
    const stockCounter = Math.floor(Math.random() * 15) + 5; // Random between 5-20
    const stockElements = document.querySelectorAll('.scarcity-item h3');
    if (stockElements.length > 0) {
        stockElements[0].innerHTML = `Apenas ${stockCounter} Vagas Restantes Este Mês`;
    }
    
    // Add viewer counter
    const viewerCount = Math.floor(Math.random() * 50) + 100; // Random between 100-150
    const viewerIndicator = document.createElement('div');
    viewerIndicator.innerHTML = `
        <div class="viewer-indicator">
            <i class="fas fa-eye"></i>
            <span>${viewerCount} pessoas visualizando esta página agora</span>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .viewer-indicator {
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 0.8rem 1.2rem;
            border-radius: 25px;
            font-size: 0.8rem;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: pulse 2s infinite;
        }
        
        @media (max-width: 768px) {
            .viewer-indicator {
                top: 70px;
                right: 10px;
                font-size: 0.7rem;
                padding: 0.6rem 1rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(viewerIndicator);
}

// Initialize all features when page loads
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initScrollAnimations();
    createFloatingCTA();
    initExitIntent();
    initSocialProof();
    addUrgencyIndicators();
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add click tracking for CTAs (for analytics)
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            // In a real implementation, this would send data to analytics
            console.log('CTA clicked:', this.textContent.trim());
        });
    });
});

// Add page visibility tracking
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '🚨 Não Perca Sua Transformação! - DISC Completo';
    } else {
        document.title = 'Perfil Comportamental DISC Completo - Descubra Seu Manual de Instruções';
    }
});

// Add scroll depth tracking
let maxScrollDepth = 0;
window.addEventListener('scroll', function() {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        // In a real implementation, this would send data to analytics
        if (maxScrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
            console.log('Scroll depth:', maxScrollDepth + '%');
        }
    }
});

