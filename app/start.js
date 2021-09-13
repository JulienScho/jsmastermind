//Affichage des règles du jeu et options
const rulesButton = document.querySelector('.linksmenu.howto');
const rulesPage = document.querySelector('.rules');
rulesButton.addEventListener('click', ()=>{
    if (rulesPage.style.display === 'block'){
        rulesPage.style.display = 'none'
    } else {rulesPage.style.display = 'block'}
})
const optionsButton = document.querySelector('.linksmenu.options');
const optionsPage = document.querySelector('.optionsPage');
optionsButton.addEventListener('click', ()=>{
    if (optionsPage.style.display === 'block'){
        optionsPage.style.display = 'none'
    } else {optionsPage.style.display = 'block'}
})


function GetRandomColor(tabColor) {
    return tabColor[Math.floor(Math.random() * tabColor.length)];
}

const colorTab = [
    "rgb(0, 0, 0)", //black
    "rgb(255, 255, 255)", //white
    "rgb(255, 0, 0)", //red
    "rgb(0, 0, 255)", //blue
    "rgb(255, 255, 0)", //yellow
    "rgb(0, 128, 0)" //green
];


//color Bulma
// const colorTab = [
//     "#2F2F2F", //black
//     "#F9F9F9", //white
//     "#F03A5F", //red
//     "#3488CE", //blue
//     "#FFDC7D", //yellow
//     "#3EC487" //green
// ];

let secretColorCode = [];

//bloc user pour affichage
const userBloc = document.querySelector('.user');

//Création du la ligne de code à trouver 
const secretCodeCircles = document.querySelectorAll('.bille.hc');
const playButton = document.querySelector('.play');
const infos = document.querySelector('.infos');
//RAZ du nombre de tour
let countTurn = 0;
let gameIsReady = false;


playButton.addEventListener('click', () => {
    secretColorCode = [];
    playButton.textContent = 'Création du code';
    for (const circle of secretCodeCircles) {
        const randomColor = GetRandomColor(colorTab);
        secretColorCode.push(randomColor);
        //circle.style.backgroundColor = randomColor;
        GoRoulette(circle);
        gameIsReady = true;
    }
    console.log(secretColorCode);
    userBloc.classList.add('ingame');

    //si une partie a déjà été jouée, vider le champ des prospositions de réponse
    const previousGamePropostions = document.querySelectorAll('.game .colorexemple');
    const gameLines = document.querySelector('.game');
    if (previousGamePropostions.length) {
        for (const line of previousGamePropostions) {
            gameLines.removeChild(line);
        }
    }

    //comptage du nombre de couleurs differentes dans secretColorCode pour l'indice
    let differentColorTab = [];
    let countDifferentColor = 0;
    for (let i = 0; i < secretColorCode.length; i++) {
        if (differentColorTab.includes(secretColorCode[i])) {
            differentColorTab.push(secretColorCode[i])
        } else {
            differentColorTab.push(secretColorCode[i])
            countDifferentColor++;
        }
    }
    console.log(countDifferentColor, "couleurs differentes");

    //RAZ du nombre de tour lors du click sur nouvelle partie
    countTurn = 0;
})





//Effet roulette test
//const billeRoulette = document.querySelector('.roulette');

function GoRoulette(circleElement) {
    //durée  de l'effet random count*durée interval
    let count = 12;
    let intervalId = setInterval(displayRandomColor, 150);

    function displayRandomColor() {

        //billeRoulette.style.backgroundColor=GetRandomColor(colorTab);
        circleElement.style.backgroundColor = GetRandomColor(colorTab);
        count--;
        if (count === 0) {
            clearInterval(intervalId);
            circleElement.style.backgroundColor = 'grey';
            //Necessite que play button ait été selectionné dans le DOM
            playButton.textContent = 'Nouvelle Partie';
            infos.textContent = 'A vous de jouer';

        }

    }
}


// const me = {
//     openToWork: true,
//     desireToShareSkillsAndCode: true,
//     learnedLangages : 'Javascript, PHP, SQL',
//     specialty: 'React',
//     qualities: 'Serious. Desire to learn more. Developping projects. Reactivity.',    
// }

// if (company && jobOffer && compatibility){company += me; buildItTogether = 'initiated'}