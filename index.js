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

$(document).ready(function() {
    const images = [
        "images/pic-1.jpg",
        "images/pic-2.jpg",
        "images/pic-3.png"
    ];

    let currentIndex = 2;

    const current = document.querySelector('.home-img .slide-current');
    const next = document.querySelector('.home-img .slide-next');

    if (!current || !next) return;

    setInterval(function() {
        const nextIndex = (currentIndex + 1) % images.length;

        // Загружаем следующую картинку во второй слой
        next.src = images[nextIndex];

        // Плавно показываем её
        next.classList.add('is-visible');

        // После завершения анимации делаем её основной
        setTimeout(function() {
            current.src = images[nextIndex];
            next.classList.remove('is-visible');

            currentIndex = nextIndex;
        }, 700);

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

// ensure icon matches initial theme after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    updateThemeIcon();
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
    const nameEl = document.getElementById('name');
    const phoneEl = document.getElementById('number');
    const deviceEl = document.getElementById('device');
    const problemEl = document.getElementById('problem');
    const statusEl = document.getElementById('form-status');
    const sendBtn = document.getElementById('button-send');

    const name = nameEl ? nameEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const device = deviceEl ? deviceEl.value : '';
    const problem = problemEl ? problemEl.value : '';

    let deviceText = "";
    let problemText = "";

    switch (problem) {
        case "repair":
            problemText = "Необходим ремонт техники";
            break;
        case "portals":
            problemText = "Проблема со входом на порталы";
            break;
        case "install":
            problemText = "Установка программ";
            break;
        case "networksetup":
            problemText = "Настройка сети и печати";
            break;
        case "serversetup":
            problemText = "Настройка сервера";
            break;
        default:
            problemText = "undefined";
            break; 
    }
    switch (device) {
        case "printer":
            deviceText = "Принтер";
            break;
        case "network":
            deviceText = "Сеть";
            break;
        case "software":
            deviceText = "ПО";
            break;
        case "pc":
            deviceText = "Компьютер";
            break;
        case "server":
            deviceText = "Сервер";
            break;
        default:
            deviceText = "undefined";
            break; 
    }

    console.log(device, deviceText, problem, problemText);

    const text =
        '<b>Новая заявка на обслуживание</b>\n\n' +
        '  - Имя: ' + name + '\n' +
        '  - Телефон: ' + phone + '\n' +
        '  - Сломалось: ' + deviceNames[device] + '\n' +
        '  - Проблема: ' + problemNames[problem];

    if (statusEl) {
        statusEl.textContent = '';
        statusEl.className = 'form-status';
    }
    if (sendBtn) sendBtn.disabled = true;

    fetch('https://tg-proxy.awergiony.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ text: text, chat_id: 1104899353, parse_mode: 'html' })
    })
        .then((res) => {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.json();
        })
        .then((data) => {
            console.log(data);
            if (statusEl) {
                statusEl.textContent = 'Заявка отправлена, мы скоро свяжемся с вами!';
                statusEl.className = 'form-status success';
            }
        })
        .catch((err) => {
            console.error('Telegram send failed:', err);
            if (statusEl) {
                statusEl.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз или напишите нам напрямую.';
                statusEl.className = 'form-status error';
            }
        })
        .finally(() => {
            if (sendBtn) sendBtn.disabled = false;
        });
}



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