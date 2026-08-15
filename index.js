$(document).scroll(function() {
    if($(document).scrollTop() >= 100) {
        $('.topbar').addClass('no-after');
        $('.topbar').addClass('no-before');
        $('.topbar').addClass('scroll');
        $('.logo').toggle(false);
    } else {
        $('.topbar').removeClass('no-after');
        $('.topbar').removeClass('no-before');
        $('.topbar').removeClass('scroll');
        $('.logo').toggle(true);
    }
});

$(document).ready(function(){
    let images = [
        "images/pic-1.jpg",
        "images/pic-2.jpg",
        "images/pic-3.png",
    ];
    var i = 0;
    window.setInterval(function(){
        $('.home-img'). attr("src", images[i]);
        i = (i==images.length-1) ? 0 : i+1;
    }, 5000);
});



// theme initialization with persistence
(function(){
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
        document.documentElement.dataset["theme"] = saved;
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.dataset["theme"] = "dark";
    } else {
        document.documentElement.dataset["theme"] = "light";
    }

    function setTheme(t, save = true) {
        document.documentElement.dataset["theme"] = t;
        if (save) localStorage.setItem('theme', t);
        updateThemeIcon();
    }

    // follow system only if user hasn't chosen explicitly
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
        if (!localStorage.getItem('theme')) {
            setTheme(event.matches ? "dark" : "light", false);
        }
    });

    // expose helper so toggleTheme can use it
    window.setTheme = setTheme;
})();

function updateThemeIcon() {
    const sun = document.getElementById('icon-sun');
    const moon = document.getElementById('icon-moon');
    if (!sun || !moon) return;
    if (document.documentElement.dataset["theme"] === "dark") {
        moon.style.display = 'inline-block';
        sun.style.display = 'none';
    } else {
        sun.style.display = 'inline-block';
        moon.style.display = 'none';
    }
}

function toggleTheme() {
    const next = (document.documentElement.dataset["theme"] === "light") ? "dark" : "light";
    if (typeof window.setTheme === 'function') window.setTheme(next, true);
    else {
        document.documentElement.dataset["theme"] = next;
        localStorage.setItem('theme', next);
        updateThemeIcon();
    }
}

// mobile hamburger menu
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const links = document.getElementById('topbar-links');
    if (menuToggle && links) {
        menuToggle.addEventListener('click', function() {
            const isOpen = links.classList.toggle('mobile-open');
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // close the menu after tapping a link
        links.querySelectorAll('a').forEach(function(a) {
            a.addEventListener('click', function() {
                links.classList.remove('mobile-open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // close the menu if the viewport is resized back to desktop width
        window.addEventListener('resize', function() {
            if (window.innerWidth > 900) {
                links.classList.remove('mobile-open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

// ensure icon matches initial theme and attach hover handlers after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    updateThemeIcon();

    const container = document.querySelector('.form-row-buttons');
    if (!container) return;
    const help = container.querySelector('.help-button');
    const price = container.querySelector('.price-button');
    if (!help || !price) return;
    function expand(el, other) {
        el.classList.add('expanded');
        other.classList.add('collapsed');
    }
    function reset(el, other) {
        el.classList.remove('expanded');
        other.classList.remove('collapsed');
    }
    [help, price].forEach(btn => {
        btn.addEventListener('mouseenter', () => expand(btn, btn === help ? price : help));
        btn.addEventListener('focus', () => expand(btn, btn === help ? price : help));
        btn.addEventListener('mouseleave', () => reset(btn, btn === help ? price : help));
        btn.addEventListener('blur', () => reset(btn, btn === help ? price : help));
    });
});



const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {},
        body: JSON.stringify(data)
    });   
    return response.json();
}

function sendTelegramMessage() {
    let name = document.getElementById('name').value;
    let phone = document.getElementById('number').value;
    let device = document.getElementById('device').value;
    let problem = document.getElementById('problem').value;

    const text =
        '<b>Новая заявка на обслуживание</b>\n\n' +
        '  - Имя: ' + name + '\n' +
        '  - Телефон: ' + phone + '\n' +
        '  - Сломалось: ' + device + '\n' +
        '  - Проблема: ' + problem;

    fetch('https://tg-proxy.awergiony.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text, chat_id: 1104899353, parse_mode: 'html' })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
}



$(function() {
    const navLinks = Array.from(document.querySelectorAll('.topbar a[href^="#"]'));
    if (!navLinks.length) return;

    function clearHighlights() {
        navLinks.forEach(a => a.classList.remove('highlighted'));
    }

    function setHighlighted(hash) {
        clearHighlights();
        if (!hash) return;
        const selector = `.topbar a[href="${hash}"]`;
        const el = document.querySelector(selector);
        if (el) el.classList.add('highlighted');
    }

    navLinks.forEach(a => {
        a.addEventListener('click', function() {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) setHighlighted(href);
        });
    });

    const sections = navLinks
        .map(a => a.getAttribute('href'))
        .filter(h => h && h.startsWith('#'))
        .map(h => document.querySelector(h))
        .filter(Boolean);

    if (sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id ? `#${entry.target.id}` : null;
                    if (id) setHighlighted(id);
                }
            });
        }, { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 });

        sections.forEach(s => observer.observe(s));
    }

    const initial = window.location.hash || (sections[0] && `#${sections[0].id}`);
    if (initial) setHighlighted(initial);
});

function showError(elem, msg) {
    if (!elem) return;
    elem.classList.add('invalid');
    let e = elem.nextElementSibling;
    if (!e || !e.classList.contains('error-text')) {
        e = document.createElement('div');
        e.className = 'error-text';
        elem.parentNode.insertBefore(e, elem.nextSibling);
    }
    e.textContent = msg;
}

function clearError(elem) {
    if (!elem) return;
    elem.classList.remove('invalid');
    let e = elem.nextElementSibling;
    if (e && e.classList.contains('error-text')) e.textContent = '';
}

$(function() {
    ['name','number','device','problem'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input', () => clearError(el));
        el.addEventListener('change', () => clearError(el));
    });

    const sendBtn = document.getElementById('button-send');
    if (sendBtn) {
        sendBtn.addEventListener('click', function(event) {
            return true;
        });
    }
});