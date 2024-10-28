function loadContent(page) {
    const contentDiv = document.getElementById('content');

    if (page === 'relatorios') {
        contentDiv.innerHTML = '<h1>Oi, você está nos Relatórios!</h1>';
    } else if (page === 'agenda') {
        contentDiv.innerHTML = `
            <h1>Agenda de Consultas</h1>
            <div id="consultation-list" class="consultation-list"></div>
        `;

        fetch('/get-list')
            .then(response => response.json())
            .then(data => {
                const consultationList = document.getElementById('consultation-list');
                if (data.length > 0) {
                    consultationList.innerHTML = data.map(consulta => `
                        <div class="consultation-item">
                            <p><strong>Horário e Data:</strong> ${consulta.data_atendimento}</p>
                            <p><strong>Paciente:</strong> ${consulta.nome_paciente}</p>
                            <p><strong>Médico:</strong> ${consulta.nome_dentista_selecionado}</p>
                        </div>
                    `).join('');
                    document.querySelectorAll('.delete-btn').forEach(button => {
                        button.addEventListener('click', function() {
                            const consultaId = this.getAttribute('data-id');
                            deleteConsulta(consultaId);
                        });
                    });

                    document.querySelectorAll('.edit-btn').forEach(button => {
                        button.addEventListener('click', function() {
                            const consultaId = this.getAttribute('data-id');
                            editConsulta(consultaId);
                        });
                    });
                } else {
                    consultationList.innerHTML = '<p>Sem consultas agendadas.</p>';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar a lista de consultas:', error);
                document.getElementById('consultation-list').innerHTML = '<p>Erro ao carregar a lista de consultas.</p>';
            });
    } else {
        contentDiv.innerHTML = `
            <h1>Escolha uma Data e Hora</h1>
            <input type="text" id="datetimepicker" class="date-input">
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
};

window.onhashchange = function() {
    const currentHash = window.location.hash.substring(1);
    loadContent(currentHash);
};
