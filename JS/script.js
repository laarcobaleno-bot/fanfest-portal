// ===== МОБИЛЬНОЕ МЕНЮ =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = hamburger?.querySelectorAll('span');
            if (spans) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
});

// ===== АКТИВНАЯ ССЫЛКА ПРИ СКРОЛЛЕ =====
function setActiveLink() {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
            const id = section.getAttribute('id');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// ===== ПЛАВНАЯ ПРОКРУТКА =====
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        if (targetId && targetId !== '') {
            scrollToSection(targetId);
        }
    });
});

// ===== ТАБЫ МЕНЮ =====
function showTab(tab) {
    const commonMenu = document.getElementById('common-menu');
    const veggieMenu = document.getElementById('veggie-menu');
    const tabs = document.querySelectorAll('.tab-btn');
    if (tab === 'common') {
        if (commonMenu) commonMenu.classList.add('active');
        if (veggieMenu) veggieMenu.classList.remove('active');
        tabs.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.includes('Основное') || btn.textContent.includes('🍖')) {
                btn.classList.add('active');
            }
        });
    } else if (tab === 'veggie') {
        if (commonMenu) commonMenu.classList.remove('active');
        if (veggieMenu) veggieMenu.classList.add('active');
        tabs.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent.includes('Вегетарианское') || btn.textContent.includes('🥬')) {
                btn.classList.add('active');
            }
        });
    }
}

// ===== ЗВУКИ =====
const portalSound = document.getElementById('portalSound');
const hoverSound = document.getElementById('hoverSound');
const clickSound = document.getElementById('clickSound');

let currentPortalTimeout = null;

function playPortalSound() {
    if (portalSound) {
        portalSound.pause();
        portalSound.currentTime = 0;
        portalSound.volume = 0.5;
        portalSound.play().catch(e => console.log('Portal sound error:', e));
        if (currentPortalTimeout) clearTimeout(currentPortalTimeout);
        currentPortalTimeout = setTimeout(() => {
            if (portalSound && !portalSound.paused) {
                portalSound.pause();
                portalSound.currentTime = 0;
            }
        }, 5000);
    }
}

function playHoverSound() {
    if (hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.volume = 0.3;
        hoverSound.play().catch(e => console.log('Hover sound error:', e));
    }
}

function playClickSound() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.volume = 0.4;
        clickSound.play().catch(e => console.log('Click sound error:', e));
    }
}

const interactiveElements = document.querySelectorAll('button, a, .buy-btn, .cta-btn, .tab-btn, .map-link, .nav-link, .ticket-card, .rule-category');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', playHoverSound);
});

const clickableElements = document.querySelectorAll('button, .buy-btn, .cta-btn, .tab-btn, .map-link, .nav-link');
clickableElements.forEach(el => {
    el.addEventListener('click', playClickSound);
});

// ===== ЛОГОТИПЫ С МЕРЦАНИЕМ =====
const navLogo = document.getElementById('nav-logo');
const heroLogo = document.getElementById('hero-logo');
const footerLogo = document.getElementById('footer-logo');

function animateLogo(logoElement) {
    if (!logoElement) return;
    logoElement.classList.remove('logo-glow-animation');
    void logoElement.offsetWidth;
    logoElement.classList.add('logo-glow-animation');
    playPortalSound();
    setTimeout(() => {
        logoElement.classList.remove('logo-glow-animation');
    }, 2000);
}

if (navLogo) navLogo.addEventListener('click', (e) => { e.stopPropagation(); animateLogo(navLogo); });
if (heroLogo) heroLogo.addEventListener('click', (e) => { e.stopPropagation(); animateLogo(heroLogo); });
if (footerLogo) footerLogo.addEventListener('click', (e) => { e.stopPropagation(); animateLogo(footerLogo); });

// ===== КАБАН =====
const boar = document.getElementById('boar');
const speech = document.getElementById('speech');
const phrases = ["Псс... тут портал вообще-то 😏", "Билет взял? 👀", "Не тупи, жми дальше!", "Я тут главный 🐗", "Хрю! Магия повсюду ✨", "Скоро портал откроется...", "ФанФест сила! 🐗"];

let speechTimeout = null;
if (boar) {
    boar.addEventListener('click', () => {
        if (speechTimeout) clearTimeout(speechTimeout);
        speech.textContent = phrases[Math.floor(Math.random() * phrases.length)];
        speech.style.display = 'block';
        playClickSound();
        speechTimeout = setTimeout(() => { speech.style.display = 'none'; }, 3000);
    });
}

// ===== ПЛАВАЮЩИЕ ОБЪЕКТЫ =====
if (!document.querySelector('.floating-objects')) {
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-objects';
    document.body.appendChild(floatingContainer);
    const magicImages = ['img/portal.png', 'img/star.png', 'img/symbol.png'];
    for (let i = 0; i < 20; i++) {
        const el = document.createElement('img');
        const randomImg = magicImages[Math.floor(Math.random() * magicImages.length)];
        el.src = randomImg;
        const size = 30 + Math.random() * 60;
        el.style.width = size + 'px';
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.opacity = 0.1 + Math.random() * 0.15;
        el.style.animation = `floatObj ${10 + Math.random() * 20}s infinite ease-in-out`;
        el.style.animationDelay = Math.random() * 10 + 's';
        floatingContainer.appendChild(el);
    }
}

// ===== ЗВЁЗДЫ =====
if (!document.querySelector('.stars-container')) {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    starsContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0';
    document.body.prepend(starsContainer);
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3;
        star.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:rgba(139,43,226,${0.2 + Math.random() * 0.6});border-radius:50%;left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation:floatParticle ${5 + Math.random() * 15}s infinite linear;animation-delay:${Math.random() * 10}s`;
        starsContainer.appendChild(star);
    }
}

// Добавляем стили для анимаций
if (!document.querySelector('#dynamic-styles')) {
    const dynamicStyles = document.createElement('style');
    dynamicStyles.id = 'dynamic-styles';
    dynamicStyles.textContent = `
        @keyframes floatParticle {
            from { transform: translateY(100vh); opacity: 0; }
            50% { opacity: 0.8; }
            to { transform: translateY(-20vh); opacity: 0; }
        }
        @keyframes floatObj {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-40px) rotate(180deg); }
            100% { transform: translateY(0) rotate(360deg); }
        }
    `;
    document.head.appendChild(dynamicStyles);
}

// ===== КНОПКА НАВЕРХ =====
if (!document.querySelector('#scroll-top-btn')) {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '⬆';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playClickSound();
    });
}

// ===== АКТИВАЦИЯ ЗВУКОВ ПОСЛЕ ПЕРВОГО КЛИКА =====
let soundsEnabled = false;
function enableAllSounds() {
    if (!soundsEnabled) {
        soundsEnabled = true;
        if (portalSound) portalSound.load();
        if (hoverSound) hoverSound.load();
        if (clickSound) clickSound.load();
        console.log('🔊 Звуки активированы!');
    }
}
document.body.addEventListener('click', enableAllSounds, { once: true });

// ===== ЗАГРУЗКА СТРАНИЦЫ =====
window.addEventListener('load', () => {
    console.log('%c✨ ФанФест ПОРТАЛ | Магия активирована! ✨', 'color: #b388ff; font-size: 16px;');
    console.log('%c📅 31 июля — 2 августа 2026 | Среднеуральск', 'color: #8a2be2; font-size: 12px;');
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease';
            hero.style.opacity = '1';
        }, 100);
    }
});