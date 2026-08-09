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