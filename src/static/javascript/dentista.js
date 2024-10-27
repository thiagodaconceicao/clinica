const dentistCards = document.querySelectorAll('.dentist-card');
const confirmationDiv = document.getElementById('confirmation');
const selectedDentist = document.getElementById('selected-dentist');
let chosenDentist = null;

dentistCards.forEach(card => {
    card.querySelector('.choose-button').addEventListener('click', () => {
        if (chosenDentist) {
            chosenDentist.classList.remove('selected');
        }
        card.classList.add('selected');
        chosenDentist = card;
        selectedDentist.textContent = card.getAttribute('data-dentist');
        confirmationDiv.style.display = 'block';
    });
});

document.getElementById('confirm-button').addEventListener('click', () => {
    if (chosenDentist) {
        const dentistName = { name: chosenDentist.getAttribute('data-dentist') };

        fetch('/dentista-selecao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dentistName)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/inicio#agenda';
            } else {
                alert("Erro ao enviar dados. Tente novamente.");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao enviar dados. Tente novamente.");
        });
    }
});