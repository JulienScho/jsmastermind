const sendColorsButton = document.querySelector('.sendColors');
const gameContainer = document.querySelector('.game');

//vérifier que la proposition est complète
const proposalLine = document.querySelector('.propositionCode');

//récupération des couleurs cachées
const codeLineBoxes = document.querySelectorAll('.game .hc');
let codeColorTab = [];
for (let i = 0; i < codeLineBoxes.length; i++) {
    codeColorTab[i] = codeLineBoxes[i].style.backgroundColor;
}



//Ajout de la proposition de couleur dans le bloc game
sendColorsButton.addEventListener('click', () => {
    countTurn++;
    //Affichage de la ligne proposée
    const newLineProposal = proposalLine.cloneNode(true);
    const proposalTemplateContent = document.querySelector('#proposition').cloneNode(true).content;
    const lineTobeinserted = proposalTemplateContent.querySelector('.billesTemplate.lineContainer');
    lineTobeinserted.append(newLineProposal);

    // gameContainer.append(proposalTemplateContent);

    //récupération des couleurs cachées
    //Se trouve maintenant dans variable secretColorCode

    // const codeLineBoxes = document.querySelectorAll('.game .hc');
    // let codeColorTab = [];
    // for (let i = 0; i < codeLineBoxes.length; i++) {
    //     codeColorTab[i] = codeLineBoxes[i].style.backgroundColor;
    // }

    //récupération des couleurs cachées
    //Attention JS vrai copie de tableau
    let codeColorTab = [...secretColorCode];


    //récupération des couleurs proposées
    const proposalLineBoxes = document.querySelectorAll('.user .colored');
    let colorTab = [];
    for (let i = 0; i < proposalLineBoxes.length; i++) {
        colorTab[i] = proposalLineBoxes[i].style.backgroundColor;
    }

    //**comparaison de la réponse   
    //initialisation des points à afficher
    let goodColorPawn = 0;
    let goodPlaceAndColorPawn = 0;

    //Bons et bien placés
    for (let i = 0; i < colorTab.length; i++) {
        if (colorTab[i] == codeColorTab[i]) {
            colorTab[i] = "CHECKED";
            codeColorTab[i] = "checked";
            goodPlaceAndColorPawn++;
        }
    }



    //Bons mais mal placés
    for (let i = 0; i < colorTab.length; i++) {

        if (codeColorTab.includes(colorTab[i])) {
            let indexToRemove = codeColorTab.indexOf(colorTab[i]);
            colorTab[i] = "CHECKED";
            codeColorTab[indexToRemove] = "checked";
            goodColorPawn++;
        }
    }

    //**Affichage des pions de placements
    //selection des cases à remplir
    const goodColorCheckBoxes = proposalTemplateContent.querySelectorAll('.gcresultround');
    const goodColorAndPlaceCheckBoxes = proposalTemplateContent.querySelectorAll('.gpresultround');
    //coloration
    for (let i = 0; i < goodPlaceAndColorPawn; i++) {
        goodColorAndPlaceCheckBoxes[i].style.backgroundColor = "#F0F";
    }

    //coloration
    for (let i = 0; i < goodColorPawn; i++) {
        goodColorCheckBoxes[i].style.backgroundColor = "black";
    }

    gameContainer.append(proposalTemplateContent);
    let numberOfTurnSentence = "";

    //Application du scrollHeigt 0 en cas de scroll pour responsive :
    const propostionContainer = document.querySelector('.game');
    propostionContainer.scrollTo(0, propostionContainer.scrollHeight);

    //Sentence en fonction du nombre du tour
    if (countTurn === 1) {
        numberOfTurnSentence = '1er'
    } else if (countTurn > 1) {
        numberOfTurnSentence = `${countTurn}ème`
    }

    //affichage des résultats dans .info
    infos.innerHTML = `
    ${numberOfTurnSentence} tour<br>
    ${goodColorPawn} couleurs mal placées. 
    ${goodPlaceAndColorPawn} couleur bien placées.
    `;

    //!\ TODO alert() s'affiche avant la ligne proposée. A changer
    if (goodPlaceAndColorPawn === 5) {
        infos.textContent = `VICTOIRE !! en ${countTurn} coups.`;
        userBloc.classList.remove('ingame'); //griser proposition de couleur et 'envoyer'
    } else if (countTurn === 12) {
        userBloc.classList.remove('ingame');
        infos.textContent = `Oups, c'est perdu !!`
        sendColorsButton.disabled = "disabled";
        const secretLine = document.querySelector('.hiddenCode');
        // Affichage du code secret
        for (let i = 0; i < secretLine.children.length; i++) {
            secretLine.children[i].style.backgroundColor = secretColorCode[i];
        }

    }

})