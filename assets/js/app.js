const body = document.querySelector('body');
const bonusButtons = document.querySelectorAll('.button[data-bonus]');
let currentBonus = parseInt(localStorage.getItem('currentBonus'));


if (!currentBonus) {
    currentBonus = 0;
}

if (body.classList.contains('homepage')) {
    currentBonus = 0;
    localStorage.setItem('currentBonus', currentBonus);
}


bonusButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const bonus = button.getAttribute('data-bonus');
        currentBonus += parseInt(bonus);
        localStorage.setItem('currentBonus', currentBonus);
    })
})
