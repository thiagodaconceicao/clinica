const dentistCards = document.querySelectorAll('.dentist-card');
const confirmationDiv = document.getElementById('confirmation');
const selectedDentist = document.getElementById('selected-dentist');
let chosenCard = null;

dentistCards.forEach(card => {
    card.querySelector('.choose-button').addEventListener('click', () => {
        if (chosenCard) {
            chosenCard.classList.remove('selected');
        }
        card.classList.add('selected');
        chosenCard = card;
        selectedDentist.textContent = card.getAttribute('data-dentist');
        confirmationDiv.style.display = 'block';
    });
});

document.getElementById('confirm-button').addEventListener('click', () => {
    alert(`Dentista ${selectedDentist.textContent} confirmado!`);
    confirmationDiv.style.display = 'none';
    if (chosenCard) {
        chosenCard.classList.remove('selected');
    }
    chosenCard = null;
});