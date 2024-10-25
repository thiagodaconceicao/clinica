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
            <button id="submitBtn">Enviar</button>
        `;

        const picker = new Pikaday({
            field: document.getElementById('datepicker'),
            format: 'DD-MM-YYYY',
            i18n: {
            previousMonth: 'Mês Anterior',
            nextMonth: 'Próximo Mês',
            months: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            weekdays: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
            weekdaysShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
            }
        });

        document.getElementById('submitBtn').addEventListener('click', function() {
            const selectedDate = document.getElementById('datepicker').value;
            fetch('/cadastro-teste', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date: selectedDate })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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
