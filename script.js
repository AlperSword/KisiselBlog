// Yumuşak Kaydırma
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Mobilde menüyü kapat
        const navLinks = document.querySelector('.nav-links');
        const hamburgerIcon = document.querySelector('.hamburger i');
        navLinks.classList.remove('active');
        hamburgerIcon.classList.replace('fa-times', 'fa-bars');
    });
});

// Kahraman Bölümü için Yazım Animasyonu
const typingElement = document.querySelector('.typing');
const phrases = ['bir Web Geliştirici', 'bir Full-Stack Developer', 'bir Freelancer'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    if (!isDeleting && charIndex <= currentPhrase.length) {
        typingElement.textContent = currentPhrase.substring(0, charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex >= 0) {
        typingElement.textContent = currentPhrase.substring(0, charIndex);
        charIndex--;
        setTimeout(type, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
        setTimeout(type, isDeleting ? 50 : 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    type();
});

// Kaydırma ile Tetiklenen Animasyonlar
const sections = document.querySelectorAll('.section');
const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

timelineItems.forEach(item => {
    observer.observe(item);
});

// Özel İmleç
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Hamburger Menü
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const hamburgerIcon = document.querySelector('.hamburger i');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburgerIcon.classList.toggle('fa-bars');
    hamburgerIcon.classList.toggle('fa-times');
});

// Parçacık Arka Plan
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ['#00ffcc', '#ff00cc'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#00ffcc', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: 'none', random: false, straight: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    }
});

// script.js sonuna ekle
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const formMessage = document.getElementById('form-message');
    formMessage.style.display = 'none';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            formMessage.textContent = 'Mailin gönderildi, en kısa sürede geri dönüş yapıcam. ';
            formMessage.className = 'success';
            formMessage.style.display = 'block';
            form.reset();
        } else {
            throw new Error('Bir şeyler ters gitti.');
        }
    } catch (error) {
        formMessage.textContent = 'Hata oldu, tekrar dene! ';
        formMessage.className = 'error';
        formMessage.style.display = 'block';
    }
});