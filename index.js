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

/*var button_send = document.getElementById('button-send');
var button_price = document.getElementById('button-price');
button_send.onmouseover = function() {
    $('.price-button').toggle(false);
}
button_send.onmouseleave = function() {
    $('.price-button').toggle(true);
}
button_price.onmouseover = function() {
    $('.help-button').toggle(false);
}
button_price.onmouseleave = function() {
    $('.help-button').toggle(true);
}*/



if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    document.documentElement.dataset["theme"] = "dark";
}
else {
    document.documentElement.dataset["theme"] = "light";
}

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
        document.documentElement.dataset["theme"] = event.matches
            ? "dark" : "light";
    }
)

function toggleTheme() {
    if (document.documentElement.dataset["theme"] === "light") {
        document.documentElement.dataset["theme"] = "dark";
        return;
    }

    document.documentElement.dataset["theme"] = "light";
}



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

    const address =
        'https://api.telegram.org/bot8713072557:AAEIgoxtpZtm-8DmdsYCVO9zaaf7HxwyNUs/' +
        'sendMessage?chat_id=1104899353&parse_mode=html&text=' + 
        '<b>Новая заявка на обслуживание</b>%0A%0A' +
        '  - Имя: ' + name + '%0A' +
        '  - Телефон: ' + phone + '%0A' +
        '  - Сломалось: ' + device + '%0A' +
        '  - Проблема: ' + problem

    postData(address, { answer: 42 })
        .then((data) => {
            console.log(data)
    })
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