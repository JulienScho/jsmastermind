//**propositions des couleurs
//Appariton des couleurs au click sur une choosing box
//Selection de l'ensemble des boxes de choix
const choiceBoxContainer = document.querySelector('.propositionCode');
//selection des box de choix
const choosingBoxes = document.querySelectorAll('.bille.pc');

//Aplication de l'affichege des choix au click
for (const choosingBox of choosingBoxes) {
    choosingBox.addEventListener('click', (e) => {

        //création du contenu de template et affichage
        const chooseBoxesTemplate = document.querySelector('#choiceOfColor');
        const chooseBoxesTemplateContent = chooseBoxesTemplate.cloneNode(true).content;
        selectedElement = e.target;
        choiceBoxContainer.insertBefore(chooseBoxesTemplateContent, selectedElement.nextSibling);
        selectedElement.classList.add('invisible');



        const chooseBoxes = document.querySelectorAll('.colorchoose .bille.ec');

        for (const chooseBox of chooseBoxes) {

            //changement du centre au hover
            chooseBox.addEventListener('mouseover', (e) => {
                const chooseBoxCenter = document.querySelector('.colorchoose .bille.ec.zero');
                chooseBoxCenter.style.backgroundColor = getComputedStyle(e.target).backgroundColor;
            })

            //Affichage de la couleur au centre au survol
            chooseBox.addEventListener('mouseover', (e) => {
                const chooseBoxCenter = document.querySelector('.colorchoose .bille.ec.zero');
                chooseBoxCenter.style.backgroundColor = getComputedStyle(e.target).backgroundColor;
            })

            //validation de la couleur et fermeture du choix au click
            chooseBox.addEventListener('click', (e) => {
                const invisibleElement = document.querySelector('.invisible');
                const colorWheel = document.querySelector('.colorchoose');
                invisibleElement.classList.remove('invisible', 'colored');
                invisibleElement.style.backgroundColor = getComputedStyle(e.target).backgroundColor;
                if(getComputedStyle(e.target).backgroundColor !=='rgba(0, 0, 0, 0)'){
                invisibleElement.classList.add('colored');}

                //Vérification que toutes les boxes ont une couleur pour griser ou non le bouton envoyer
                let coloredBoxesNumber = document.querySelectorAll('.user .bille.pc.colored').length;
                const sendColorsButton = document.querySelector('.sendColors');
                if (coloredBoxesNumber!==5 || gameIsReady==false){
                    sendColorsButton.disabled="disabled";
                } else {sendColorsButton.disabled="";}
                choiceBoxContainer.removeChild(colorWheel);
            })
        }
    })
}
