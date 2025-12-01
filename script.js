(function initCursorTrail() {
  // Check if reduced motion is preferred or if mobile
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
      window.innerWidth < 768) {
    return;
  }

  const trailContainer = document.getElementById('cursor-trail');
  const numDots = 12;
  const dots = [];
  
  // Create trail dots
  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.opacity = 1 - (i / numDots) * 0.8;
    trailContainer.appendChild(dot);
    
    dots.push({
      element: dot,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    });
  }

  let mouseX = 0;
  let mouseY = 0;

  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animation loop
  function animateTrail() {
    // Update first dot to follow mouse directly
    dots[0].targetX = mouseX;
    dots[0].targetY = mouseY;

    // Each dot follows the previous one with delay
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      
      if (i > 0) {
        // Follow previous dot
        const prevDot = dots[i - 1];
        dot.targetX = prevDot.x;
        dot.targetY = prevDot.y;
      }

      // Smooth easing
      const easing = 0.15;
      dot.x += (dot.targetX - dot.x) * easing;
      dot.y += (dot.targetY - dot.y) * easing;

      // Update DOM position
      dot.element.style.left = `${dot.x}px`;
      dot.element.style.top = `${dot.y}px`;
    }

    requestAnimationFrame(animateTrail);
  }

  animateTrail();
})();

// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === MOBILE MENU TOGGLE ===
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');

mobileToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// === TYPING EFFECT ===
const typingText = document.getElementById('typing-text');
const phrases = [
  'Frontend Developer',
  'Backend Engineer',
  'Creative Problem Solver',
  'Loves Clean UI',
  'Coffee Enthusiast ☕',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typingText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500; // Pause before next phrase
  }

  setTimeout(typeEffect, typeSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);

// === PARALLAX TILT ON CODE CARD ===
const codeCard = document.getElementById('code-card');

if (codeCard && window.innerWidth > 768) {
  codeCard.addEventListener('mousemove', (e) => {
    const rect = codeCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 5; // Max 5deg
    const rotateY = ((x - centerX) / centerX) * -5;

    codeCard.style.transform = `rotate(2deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  codeCard.addEventListener('mouseleave', () => {
    codeCard.style.transform = 'rotate(2deg) rotateX(0) rotateY(0)';
  });
}

// === PROJECT FILTERS ===
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    // Filter projects
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// === PROJECT MODAL ===
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalBody = document.getElementById('modal-body');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    const icon = card.querySelector('.project-icon').textContent;
    const title = card.querySelector('.project-title').textContent;
    const desc = card.querySelector('.project-desc').textContent;
    const techTags = Array.from(card.querySelectorAll('.tech-tags span'))
      .map(tag => `<span>${tag.textContent}</span>`)
      .join('');

    modalBody.innerHTML = `
      <div style="text-align: center; font-size: 5rem; margin-bottom: 1.5rem;">${icon}</div>
      <h2 style="font-size: 2.5rem; color: var(--neon-cyan); margin-bottom: 1rem;">${title}</h2>
      <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1.125rem;">${desc}</p>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; justify-content: center;">
        ${techTags}
      </div>
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <a href="#" class="btn btn-primary">🔗 View Live</a>
        <a href="#" class="btn btn-secondary">💻 View Code</a>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
modalClose.addEventListener('click', closeModal);
document.querySelector('.modal-overlay').addEventListener('click', closeModal);

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// === SKILL BARS ANIMATION ===
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      const skillFill = entry.target.querySelector('.skill-fill');
      const skillValue = skillFill.getAttribute('data-skill');
      
      setTimeout(() => {
        skillFill.style.width = `${skillValue}%`;
      }, 200);
      
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillItems.forEach(item => {
  skillObserver.observe(item);
});

// === ACCORDION (RESUME) ===
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const accordionItem = header.parentElement;
    const isActive = accordionItem.classList.contains('active');

    // Close all accordions
    document.querySelectorAll('.accordion-item').forEach(item => {
      item.classList.remove('active');
    });

    // Open clicked accordion if it wasn't active
    if (!isActive) {
      accordionItem.classList.add('active');
    }
  });
});

// === BLOG SEARCH ===
const blogSearch = document.getElementById('blog-search');
const blogCards = document.querySelectorAll('.blog-card');

blogSearch.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();

  blogCards.forEach(card => {
    const title = card.getAttribute('data-title').toLowerCase();
    const category = card.getAttribute('data-category').toLowerCase();
    const text = card.textContent.toLowerCase();

    if (title.includes(searchTerm) || category.includes(searchTerm) || text.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// === CONTACT FORM ===
const contactForm = document.getElementById('contact-form');
const captchaQuestion = document.getElementById('captcha-question');
const successPopup = document.getElementById('success-popup');

// Generate random CAPTCHA
const num1 = Math.floor(Math.random() * 10) + 1;
const num2 = Math.floor(Math.random() * 10) + 1;
const correctAnswer = num1 + num2;

captchaQuestion.textContent = `${num1} + ${num2} = ?`;

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const captchaAnswer = parseInt(document.getElementById('captcha').value);

  // Validate fields
  if (!name || !email || !message) {
    alert('❌ Please fill in all fields.');
    return;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('❌ Please enter a valid email address.');
    return;
  }

  // Validate CAPTCHA
  if (captchaAnswer !== correctAnswer) {
    alert('❌ CAPTCHA answer is incorrect. Please try again.');
    return;
  }

  // Show success popup
  successPopup.classList.add('show');

  // Reset form
  contactForm.reset();

  // Generate new CAPTCHA
  const newNum1 = Math.floor(Math.random() * 10) + 1;
  const newNum2 = Math.floor(Math.random() * 10) + 1;
  captchaQuestion.textContent = `${newNum1} + ${newNum2} = ?`;

  // Hide popup after 3 seconds
  setTimeout(() => {
    successPopup.classList.remove('show');
  }, 3000);
});

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// === SCROLL ANIMATIONS ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  fadeObserver.observe(section);
});

// === CONSOLE EASTER EGG ===
console.log('%c🚀 Welcome to my portfolio!', 'color: #00e5ff; font-size: 24px; font-weight: bold;');
console.log('%cInterested in the code? Check out the source on GitHub!', 'color: #a0aec0; font-size: 14px;');
console.log('%cBuilt with vanilla HTML, CSS, and JavaScript ⚡', 'color: #00e5ff; font-size: 12px;');
