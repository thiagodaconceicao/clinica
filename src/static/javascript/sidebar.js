var picker = new Pikaday({
    field: document.getElementById('datepicker'),
    format: 'DD-MM-YYYY'
});

function loadContent(page) {
    const contentDiv = document.getElementById('content');


    if (page === 'relatorios') {
        contentDiv.innerHTML = '<h1>Oi, você está nos Relatórios!</h1>';
    } else if (page === 'agenda') {
        contentDiv.innerHTML = '<h1>Oi, você está na Agenda!</h1>';
    } else {
        contentDiv.innerHTML = `
            <h1>Escolha uma Data</h1>
            <input type="text" id="datepicker">
        `;

        picker = new Pikaday({
            field: document.getElementById('datepicker'),
            format: 'DD-MM-YYYY'
        });
    }
}


window.onload = function() {
    const currentHash = window.location.hash.substring(1);
    loadContent(currentHash); 
}

window.onhashchange = function() {
    const currentHash = window.location.hash.substring(1);
    loadContent(currentHash);
}
