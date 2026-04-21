// ============================================================================
// 1. МОБИЛЬНОЕ МЕНЮ (БУРГЕР)
// ============================================================================
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

// ============================================================================
// 2. АКТИВНАЯ ССЫЛКА ПРИ СКРОЛЛЕ
// ============================================================================
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

// ============================================================================
// 3. ПЛАВНАЯ ПРОКРУТКА ПО ЯКОРЯМ
// ============================================================================
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

// ============================================================================
// 4. МОДАЛЬНОЕ ОКНО ОПЛАТЫ
// ============================================================================
const modal = document.getElementById('payment-modal');

function showPaymentModal() {
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

const closeModalBtn = document.querySelector('.close-modal');
const closeModalBtn2 = document.querySelector('.close-modal-btn');

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (closeModalBtn2) closeModalBtn2.addEventListener('click', closeModal);

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// ============================================================================
// 5. ТАБЫ МЕНЮ ПИТАНИЯ
// ============================================================================
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

// ============================================================================
// 6. ПАРАЛЛАКС ЭФФЕКТ
// ============================================================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.backgroundPositionY = window.pageYOffset * 0.5 + 'px';
    }
});

// ============================================================================
// 7. АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ
// ============================================================================
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

const elementsToAnimate = document.querySelectorAll(
    '.content-card, .rule-category, .ticket-card, .transport-item, .menu-day, .fair-rules div, .parking-spot'
);
elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ============================================================================
// 8. ЗВУКИ (С ВОЗМОЖНОСТЬЮ ДЛИТЕЛЬНОГО ВОСПРОИЗВЕДЕНИЯ)
// ============================================================================
const portalSound = document.getElementById('portalSound');
const hoverSound = document.getElementById('hoverSound');
const clickSound = document.getElementById('clickSound');

// Настройка длительности звука портала (3-5 секунд)
// Звук НЕ обрывается, играет до конца (если файл длинный, играет свою длину)
// Чтобы ограничить 3-5 секундами, нужно либо обрезать аудиофайл, либо использовать таймер

let currentPortalTimeout = null;

function playPortalSound() {
    if (portalSound) {
        // Останавливаем предыдущее воспроизведение
        portalSound.pause();
        portalSound.currentTime = 0;

        // Воспроизводим
        portalSound.volume = 0.5;
        portalSound.play().catch(e => console.log('Portal sound error:', e));

        // Если нужно ограничить длительность 5 секундами (раскомментировать при необходимости)
        if (currentPortalTimeout) clearTimeout(currentPortalTimeout);
        currentPortalTimeout = setTimeout(() => {
            if (portalSound && !portalSound.paused) {
                portalSound.pause();
                portalSound.currentTime = 0;
            }
        }, 5000); // Останавливаем через 5 секунд
    }
}

// Звук при наведении (короткий)
function playHoverSound() {
    if (hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.volume = 0.3;
        hoverSound.play().catch(e => console.log('Hover sound error:', e));
    }
}

// Звук при клике (короткий)
function playClickSound() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.volume = 0.4;
        clickSound.play().catch(e => console.log('Click sound error:', e));
    }
}

// Навешиваем звук наведения на интерактивные элементы
const interactiveElements = document.querySelectorAll(
    'button, a, .buy-btn, .cta-btn, .tab-btn, .map-link, .nav-link, .ticket-card, .rule-category'
);
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', playHoverSound);
});

// Навешиваем звук клика на все кликабельные элементы
const clickableElements = document.querySelectorAll(
    'button, .buy-btn, .cta-btn, .tab-btn, .map-link, .close-modal, .close-modal-btn, .nav-link'
);
clickableElements.forEach(el => {
    el.addEventListener('click', playClickSound);
});

// ============================================================================
// 9. ЛОГОТИПЫ С МЕРЦАНИЕМ И ЗВУКОМ ПОРТАЛА
// ============================================================================
const navLogo = document.getElementById('nav-logo');
const heroLogo = document.getElementById('hero-logo');
const footerLogo = document.getElementById('footer-logo');

function animateLogo(logoElement) {
    if (!logoElement) return;

    logoElement.classList.remove('logo-glow-animation');
    void logoElement.offsetWidth;
    logoElement.classList.add('logo-glow-animation');

    // Воспроизводим длинный звук портала (3-5 секунд)
    playPortalSound();

    setTimeout(() => {
        logoElement.classList.remove('logo-glow-animation');
    }, 2000);
}

if (navLogo) {
    navLogo.addEventListener('click', (e) => {
        e.stopPropagation();
        animateLogo(navLogo);
    });
}

if (heroLogo) {
    heroLogo.addEventListener('click', (e) => {
        e.stopPropagation();
        animateLogo(heroLogo);
    });
}

if (footerLogo) {
    footerLogo.addEventListener('click', (e) => {
        e.stopPropagation();
        animateLogo(footerLogo);
    });
}

// ============================================================================
// 10. МАСКОТ (ЖИВОЙ КАБАН)
// ============================================================================
const boar = document.getElementById('boar');
const speech = document.getElementById('speech');

const phrases = [
    "Псс... тут портал вообще-то 😏",
    "Билет взял? Я проверяю 👀",
    "Не тупи, жми дальше!",
    "Там дальше интереснее 🌀",
    "Я тут главный вообще-то",
    "Хрю! Магия повсюду ✨",
    "Эй, ты куда нажал?",
    "ФанФест сила! 🐗",
    "Скоро портал откроется...",
    "Покорми меня, я расскажу секрет 🍎"
];

let speechTimeout = null;

if (boar) {
    boar.addEventListener('click', () => {
        if (speechTimeout) clearTimeout(speechTimeout);

        const randomText = phrases[Math.floor(Math.random() * phrases.length)];
        speech.textContent = randomText;
        speech.style.display = 'block';

        // Звук кабана при клике (опционально, используем clickSound)
        playClickSound();

        speechTimeout = setTimeout(() => {
            speech.style.display = 'none';
        }, 3000);
    });
}

// ============================================================================
// 11. ПЛАВАЮЩИЕ МАГИЧЕСКИЕ ОБЪЕКТЫ
// ============================================================================
// Проверяем, нет ли уже контейнера
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
        el.onerror = () => el.remove();

        el.style.position = 'absolute';
        el.style.width = size + 'px';
        el.style.height = 'auto';
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.opacity = 0.1 + Math.random() * 0.15;
        el.style.animation = `floatObj ${10 + Math.random() * 20}s infinite ease-in-out`;
        el.style.animationDelay = Math.random() * 10 + 's';

        floatingContainer.appendChild(el);
    }
}

// ============================================================================
// 12. ЗВЁЗДЫ НА ФОНЕ
// ============================================================================
if (!document.querySelector('.stars-container')) {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    starsContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0';
    document.body.prepend(starsContainer);

    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3;
        const duration = 5 + Math.random() * 15;
        const delay = Math.random() * 10;

        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(139, 43, 226, ${0.2 + Math.random() * 0.6});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${duration}s infinite linear;
            animation-delay: ${delay}s;
        `;
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

// ============================================================================
// 13. КНОПКА "НАВЕРХ"
// ============================================================================
if (!document.querySelector('#scroll-top-btn')) {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '⬆';
    scrollTopBtn.setAttribute('aria-label', 'Наверх');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #8a2be2, #b388ff);
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
        box-shadow: 0 0 15px #8a2be2;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
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
        playClickSound(); // Звук клика
    });
}

// ============================================================================
// 14. МАГИЧЕСКИЙ КУРСОР
// ============================================================================
if (!document.querySelector('#magic-cursor')) {
    const magicCursor = document.createElement('div');
    magicCursor.id = 'magic-cursor';
    magicCursor.style.cssText = `
        position: fixed;
        width: 24px;
        height: 24px;
        border: 2px solid #b388ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 10px #8a2be2, 0 0 5px #b388ff;
        backdrop-filter: blur(2px);
    `;
    document.body.appendChild(magicCursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        magicCursor.style.left = cursorX + 'px';
        magicCursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mouseleave', () => {
        magicCursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        magicCursor.style.opacity = '1';
    });

    const cursorTargets = document.querySelectorAll('button, a, .buy-btn, .cta-btn, .ticket-card, #boar');
    cursorTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            magicCursor.style.width = '40px';
            magicCursor.style.height = '40px';
            magicCursor.style.borderColor = '#ffffff';
            magicCursor.style.boxShadow = '0 0 20px #b388ff';
        });
        el.addEventListener('mouseleave', () => {
            magicCursor.style.width = '24px';
            magicCursor.style.height = '24px';
            magicCursor.style.borderColor = '#b388ff';
            magicCursor.style.boxShadow = '0 0 10px #8a2be2';
        });
    });
}

// ============================================================================
// 15. АКТИВАЦИЯ ЗВУКОВ ПОСЛЕ ПЕРВОГО КЛИКА
// ============================================================================
let soundsEnabled = false;

function enableAllSounds() {
    if (!soundsEnabled) {
        soundsEnabled = true;
        // Предварительно загружаем звуки
        if (portalSound) {
            portalSound.volume = 0.5;
            portalSound.load();
        }
        if (hoverSound) {
            hoverSound.volume = 0.3;
            hoverSound.load();
        }
        if (clickSound) {
            clickSound.volume = 0.4;
            clickSound.load();
        }
        console.log('🔊 Звуки активированы!');
    }
}

document.body.addEventListener('click', enableAllSounds, { once: true });

// ============================================================================
// 16. ЗАГРУЗКА СТРАНИЦЫ
// ============================================================================
window.addEventListener('load', () => {
    console.log('%c✨ ФанФест ПОРТАЛ | Магия активирована! ✨', 'color: #b388ff; font-size: 16px; font-family: monospace;');
    console.log('%c📅 31 июля — 2 августа 2026 | Среднеуральск', 'color: #8a2be2; font-size: 12px;');
    console.log('%c🐗 Кликни на кабана — он говорит!', 'color: #b388ff; font-size: 12px;');
    console.log('%c🔊 Кликни на логотип — портал оживёт!', 'color: #b388ff; font-size: 12px;');

    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease';
            hero.style.opacity = '1';
        }, 100);
    }
});

// ============================================================================
// 17. ФОРМА ЗАЯВКИ (если есть)
// ============================================================================
const applicationForm = document.getElementById('application-form');
if (applicationForm) {
    applicationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        playClickSound();
        alert('✨ Заявка отправлена! Портальный администратор свяжется с вами. ✨');
        applicationForm.reset();
    });
}