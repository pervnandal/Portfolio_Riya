// Preloader
window.addEventListener('load', () => {
    const pl = document.getElementById('preloader');
    setTimeout(() => pl.classList.add('hide'), 400);
});

// Scroll progress + header shadow + back-to-top
const progress = document.getElementById('scroll-progress');
const header = document.getElementById('site-header');
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
    header.classList.toggle('scrolled', h.scrollTop > 10);
    backToTop.classList.toggle('show', h.scrollTop > 500);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Mobile nav toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navA = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navA.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Animated counters
const counters = document.querySelectorAll('.num');
const cio = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            let cur = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const timer = setInterval(() => {
                cur += step;
                if (cur >= target) { cur = target; clearInterval(timer); }
                el.textContent = cur;
            }, 30);
            cio.unobserve(el);
        }
    });
}, { threshold: 0.4 });
counters.forEach(c => cio.observe(c));

// Animated skill bars
const bars = document.querySelectorAll('.bar-fill');
const bio = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            el.style.width = el.getAttribute('data-width') + '%';
            bio.unobserve(el);
        }
    });
}, { threshold: 0.3 });
bars.forEach(b => bio.observe(b));

// Button ripple effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Contact form 
const form = document.getElementById("contact-form");
const statusMessage = document.getElementById("status");

form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevents the default page redirect

    const data = new FormData(event.target);

    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            statusMessage.innerHTML = "Thanks for your message! I'll get back to you soon.";
            statusMessage.style.color = "green";
            form.reset(); // Clears the form fields
        } else {
            statusMessage.innerHTML = "Oops! There was a problem submitting your form.";
            statusMessage.style.color = "red";
        }
    } catch (error) {
        statusMessage.innerHTML = "Oops! There was a problem submitting your form.";
        statusMessage.style.color = "red";
    }
});

document.getElementById('year').textContent = new Date().getFullYear();