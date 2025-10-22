// Animation au défilement
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Appliquer l'animation aux éléments
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.info-card, .contact-form-wrapper, .map-container');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Effet de header au scroll
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(11, 28, 44, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'linear-gradient(180deg, rgba(11, 28, 44, 0.95) 0%, rgba(11, 28, 44, 0.8) 100%)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Récupération des données du formulaire
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        vehicle: document.getElementById('vehicle').value,
        message: document.getElementById('message').value,
        privacy: document.getElementById('privacy').checked
    };
    
    // Validation
    if (!validateForm(formData)) {
        return;
    }
    
    // Animation du bouton
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Envoi en cours...</span>';
    submitBtn.disabled = true;
    
    // Simulation d'envoi (remplacer par votre logique d'envoi réelle)
    try {
        await simulateFormSubmission(formData);
        
        // Afficher le message de succès
        showSuccessMessage();
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Scroll vers le haut du formulaire
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    } catch (error) {
        showErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
        // Restaurer le bouton
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1000);
    }
});

// Validation du formulaire
function validateForm(data) {
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showErrorMessage('Veuillez entrer une adresse email valide.');
        return false;
    }
    
    // Validation du téléphone
    const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/;
    if (!phoneRegex.test(data.phone)) {
        showErrorMessage('Veuillez entrer un numéro de téléphone valide.');
        return false;
    }
    
    // Validation du message
    if (data.message.trim().length < 10) {
        showErrorMessage('Votre message doit contenir au moins 10 caractères.');
        return false;
    }
    
    // Validation de la case confidentialité
    if (!data.privacy) {
        showErrorMessage('Vous devez accepter les conditions d\'utilisation et la politique de confidentialité.');
        return false;
    }
    
    return true;
}

// Simulation d'envoi de formulaire
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        // Ici, vous devriez implémenter l'envoi réel vers votre backend
        console.log('Données du formulaire:', data);
        
        // Simulation d'un délai d'envoi
        setTimeout(() => {
            resolve();
        }, 1500);
    });
}

// Afficher le message de succès
function showSuccessMessage() {
    // Supprimer les anciens messages
    const oldMessages = document.querySelectorAll('.success-message, .error-message');
    oldMessages.forEach(msg => msg.remove());
    
    // Créer le message de succès
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <h3>✓ Message envoyé avec succès !</h3>
        <p>Merci pour votre message. Notre équipe vous contactera dans les 24 heures.</p>
    `;
    
    // Insérer avant le formulaire
    const formWrapper = document.querySelector('.contact-form-wrapper');
    formWrapper.insertBefore(successDiv, contactForm);
    
    // Animation d'apparition
    setTimeout(() => {
        successDiv.classList.add('show');
    }, 100);
    
    // Masquer après 8 secondes
    setTimeout(() => {
        successDiv.style.opacity = '0';
        setTimeout(() => successDiv.remove(), 500);
    }, 8000);
}

// Afficher le message d'erreur
function showErrorMessage(message) {
    // Supprimer les anciens messages
    const oldMessages = document.querySelectorAll('.success-message, .error-message');
    oldMessages.forEach(msg => msg.remove());
    
    // Créer le message d'erreur
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        background: linear-gradient(135deg, rgba(220, 53, 69, 0.2), rgba(200, 35, 51, 0.2));
        border: 2px solid #DC3545;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        text-align: center;
    `;
    errorDiv.innerHTML = `
        <h3 style="color: #DC3545; font-size: 20px; margin-bottom: 10px;">⚠ Erreur</h3>
        <p style="color: #fff; font-size: 16px;">${message}</p>
    `;
    
    // Insérer avant le formulaire
    const formWrapper = document.querySelector('.contact-form-wrapper');
    formWrapper.insertBefore(errorDiv, contactForm);
    
    // Animation d'apparition
    setTimeout(() => {
        errorDiv.style.opacity = '1';
    }, 100);
    
    // Masquer après 5 secondes
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        setTimeout(() => errorDiv.remove(), 500);
    }, 5000);
}

// Animation des icônes sociales
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0)';
    });
});

// Animation des cartes d'info au survol
document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.info-icon');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.info-icon');
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// Effet de particules pour le fond (optionnel)
function createParticles() {
    const heroSection = document.querySelector('.hero-contact');
    if (!heroSection) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(212, 175, 55, 0.5);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s infinite ease-in-out;
        `;
        heroSection.appendChild(particle);
    }
}

// Ajouter l'animation CSS pour les particules
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            transform: translateY(-50px) translateX(20px);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialiser les particules
createParticles();

// Validation en temps réel des champs
document.getElementById('email').addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
        this.style.borderColor = '#DC3545';
        showFieldError(this, 'Email invalide');
    } else {
        this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        removeFieldError(this);
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/;
    if (this.value && !phoneRegex.test(this.value)) {
        this.style.borderColor = '#DC3545';
        showFieldError(this, 'Numéro de téléphone invalide');
    } else {
        this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        removeFieldError(this);
    }
});

function showFieldError(field, message) {
    removeFieldError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: #DC3545;
        font-size: 12px;
        margin-top: 5px;
    `;
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
}

function removeFieldError(field) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Smooth scroll pour les liens
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Console log de bienvenue
console.log('%c🚗 CarBoost - L\'excellence automobile à votre portée', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cDéveloppé avec passion pour l\'automobile de luxe', 'color: #2C2F33; font-size: 14px;');