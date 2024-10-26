function loadContent(page) {
    const contentDiv = document.getElementById('content');

    if (page === 'relatorios') {
        contentDiv.innerHTML = '<h1>Oi, você está nos Relatórios!</h1>';
    } else if (page === 'agenda') {
        contentDiv.innerHTML = '<h1>Oi, você está na Agenda!</h1>';
    } else {
        contentDiv.innerHTML = `
            <h1>Escolha uma Data e Hora</h1>
            <input type="text" id="datetimepicker">
            <button id="submitBtn">Enviar</button>
        `;

        flatpickr("#datetimepicker", {
            enableTime: true,
            dateFormat: "d-m-Y H:i",
            time_24hr: true,
            locale: "pt"
        });

        document.getElementById('submitBtn').addEventListener('click', function() {
            const selectedDateTime = document.getElementById('datetimepicker').value;
            fetch('/cadastro-teste', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ dateTime: selectedDateTime })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = data.redirectUrl;
                } else {
                    console.error('Erro:', data.message);
                }
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
