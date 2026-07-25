const model = [
    {type: 'title', value: "Hello World from JS"},
    {type: 'text', value: 'here we go with some text'},
    {type: 'columns', value: [
        '111111',
        '222222',
        '333333'
    ]}
]

const site = document.querySelector('#site')

model.forEach ( block => {
    let html = ''

    if (block.type === 'title') {
        html = title(block)
    } else if (block.type === 'text') {
        html = text(block)
    } else if (block.type === 'columns') {
        html = columns(block)
    }

    site.insertAdjacentHTML('beforeend', html)
})

function title(block) {
    return `
        <div class="row">
            <div class="col-sm">
                <h1>Hello World!</h1>
            </div>
        </div>
    `
}

function text(block) {
    return `
        <div class="col-sm">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti ab molestias debitis saepe molestiae atque.</p>
        </div>
    `
}

function columns(block) {
    const html = block.value.map(item => `<div class="col-sm"><p>${item}</p></div>`)

    return `
        <div class="row">
            ${html.join('')}
        </div>
    `
}