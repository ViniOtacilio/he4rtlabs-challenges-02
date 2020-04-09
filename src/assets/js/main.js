// Este será o objeto principal no qual você irá se basear para as funções do desafio!
// Caso haja dúvidas de como prosseguir, favor consultar a sala #js no nosso discord!
let features = [
  {
    feature: "Authentication",
    devHours: 10,
    testHours: 2
  }
];

// Implementação do modal aparecendo/desaparecendo

let modal = document.getElementById("insert-modal");

let openModal = document.getElementById("open-insert-modal");

let closeModal = document.getElementById("close-modal");

openModal.onclick = function () {
  modal.style.display = "flex";
}

closeModal.onclick = function (event) {
    modal.style.display = "none";
  
}
// Fim da implementação do modal aparecendo/desaparecendo

//Salvando inputs do inserir em variáveis

let valueHour = document.getElementById('hour-value');
let valueHoursCost = 0;

valueHour.addEventListener("change", (event) => {
  event.preventDefault();
  valueHoursCost = valueHour.value;
})

const inputFunc = document.getElementById('insert-functionalities');

inputFunc.addEventListener("click", (event) => {
    event.preventDefault();
    let nameFunc = document.getElementById('name-functionalities').value;
    let developHours = document.getElementById('develop-hours').value;
    let testHours = document.getElementById('test-hours').value;
    modal.style.display=  "none";

    //Criando DIV com os valores
    let div = document.createElement('DIV');
    div.classList.add('functionalities-input');
    div.id = 'functionalities-input';
    let functionalityName = document.createElement('P');
    let textFunctionality = document.createTextNode(nameFunc);
    let HourDevelopeds = document.createElement('P');
    let textDevel = document.createTextNode(developHours);
    let HourText = document.createElement('P');
    let testHour = document.createTextNode(testHours);
    let ValueText = document.createElement('P');
    let ValueFunctionality = document.createTextNode(valueHoursCost);

    functionalityName.appendChild(textFunctionality);
    HourDevelopeds.appendChild(textDevel);
    HourText.appendChild(testHour);
    ValueText.appendChild(ValueFunctionality);

    div.appendChild(functionalityName);
    div.appendChild(HourDevelopeds);
    div.appendChild(HourText);
    div.appendChild(ValueText);

    document.getElementById('functionalities-box').appendChild(div);
});

// Fim da implementação de inputs em variáveis;

// Remover features

const deleteInput = document.getElementById('delete-input');

function removeInput (e) {
  e = e || window.event;
  let target = e.target || e.srcElement;
  let divInput = target.parentNode;
  if(divInput.id === 'functionalities-input') {
    divInput.remove(0);
    document.removeEventListener('click', removeInput);
  }
}

deleteInput.addEventListener("click", (event )=> {
  document.addEventListener('click', removeInput);
});


// Importar arquivo jason

document.getElementById('import-file').addEventListener('click', sendFile);

function sendFile () {
  document.getElementById('fileid').click();
}

// BUG - Se o usuário não escrever nada na hora de adicionar funcionalidade, o campo é criado todo em branco. (Não resolvido)