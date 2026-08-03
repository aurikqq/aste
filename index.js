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