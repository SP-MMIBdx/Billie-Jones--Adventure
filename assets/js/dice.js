// Valeurs de rotation pour chaque dé
let allVal1 = { x: 0, y: 0, z: 0 };
let allVal2 = { x: 0, y: 0, z: 0 };
let allVal3 = { x: 0, y: 0, z: 0 };

// Rotations pour chaque face
const perFace = [
    [-0.1, 0.3, -1],
    [-0.1, 0.6, -0.4],
    [-0.85, -0.42, 0.73],
    [-0.8, 0.3, -0.75],
    [0.3, 0.45, 0.9],
    [-0.16, 0.6, 0.18]
];

const dice1 = document.querySelector('.diceWrap .dice');
const dice2 = document.querySelector('.diceWrap2 .dice');
const dice3 = document.querySelector('.diceWrap3 .dice');
const diceValSpan = document.getElementById('diceVal');

// Récupérer les valeurs pour le dé 1
const getVal1 = () => {
    ['x', 'y', 'z'].forEach(axis => {
        const slider = document.getElementById(`r${axis}`);
        const display = document.getElementById(`n${axis}`);
        const val = Math.cos((slider.value / 100) * 3.142).toFixed(3);
        display.textContent = val;
        allVal1[axis] = val;
    });
};

// Définir la valeur d'un dé spécifique
const setVal = (dice, num) => {
    const face = perFace[num - 1];
    dice.style.transform = `rotate3d(${face[0]}, ${face[1]}, ${face[2]}, 180deg)`;
};

// Définir le dé 1 avec les sliders
const setDice1 = () => {
    getVal1();
    dice1.style.transform = `rotate3d(${allVal1.x}, ${allVal1.y}, ${allVal1.z}, 180deg)`;
};

// Initialisation
setDice1();

// Event listeners pour les sliders (contrôlent le dé 1)
document.querySelectorAll('.controller input[type=range]').forEach(slider => {
    slider.addEventListener('input', setDice1);
});

// Toggle rolling animation pour les deux dés
document.getElementById('rolling').addEventListener('click', () => {
    dice1.classList.remove('throw');
    dice1.classList.toggle('rolling');
    dice2.classList.remove('throw');
    dice2.classList.toggle('rolling');
    dice3.classList.remove('throw');
    dice3.classList.toggle('rolling');
});

// Lancer les deux dés
document.getElementById('throw').addEventListener('click', () => {
    // Dé 1
    const diceVal1 = Math.floor(Math.random() * 6) + 1;
    dice1.classList.remove('throw', 'rolling');
    setVal(dice1, diceVal1);
    
    // Dé 2
    const diceVal2 = Math.floor(Math.random() * 6) + 1;
    dice2.classList.remove('throw', 'rolling');
    setVal(dice2, diceVal2);

    const diceVal3 = Math.floor(Math.random() * 6) + 1;
    dice3.classList.remove('throw', 'rolling');
    setVal(dice3, diceVal3);
    
    diceValSpan.textContent = '';
    
    setTimeout(() => {
        dice1.classList.add('throw');
        dice2.classList.add('throw');
        dice3.classList.add('throw');
    }, 50);
    
    setTimeout(() => {
        const total = diceVal1 + diceVal2 + diceVal3 + currentBonus;
        diceValSpan.textContent = `${diceVal1} + ${diceVal2} + ${diceVal3} + ${currentBonus} = ${total}`;
    }, 700);
});

// Changer le type de dé (appliqué aux deux dés)
document.getElementById('diceType').addEventListener('change', (e) => {
    dice1.className = 'dice';
    dice2.className = 'dice';
    dice3.className = 'dice';
    if (e.target.value) {
        dice1.classList.add(e.target.value);
        dice2.classList.add(e.target.value);
        dice3.classList.add(e.target.value);    
    }
});