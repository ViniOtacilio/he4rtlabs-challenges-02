let feature = [];
let ValorTotal = 0;
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
    modal.style.display = "none";
    adicionarFuncionalidades(nameFunc,developHours,testHours);
});

function adicionarFuncionalidades(nameFunc,DevelopHours,TestHours) {

  feature.push({
    feature: nameFunc,
    devHours: DevelopHours,
    testHours: TestHours
  });

  let DevelopHoursToNumber = parseInt(DevelopHours,10);
  let TestHoursToNumber = parseInt(TestHours,10);

  let featureValueHour = valueHoursCost * (DevelopHoursToNumber + TestHoursToNumber); 
  ValorTotal = ValorTotal + featureValueHour;
  let div = document.createElement('DIV');
  div.classList.add('functionalities-input');
  div.id = 'functionalities-input';
  let functionalityName = document.createElement('P');
  let textFunctionality = document.createTextNode(nameFunc);
  let HourDevelopeds = document.createElement('P');
  let textDevel = document.createTextNode(DevelopHours);
  let HourText = document.createElement('P');
  let testHour = document.createTextNode(TestHours);
  let ValueText = document.createElement('P');
  let ValueFunctionality = document.createTextNode(featureValueHour);

  functionalityName.appendChild(textFunctionality);
  HourDevelopeds.appendChild(textDevel);
  HourText.appendChild(testHour);
  ValueText.appendChild(ValueFunctionality);

  div.appendChild(functionalityName);
  div.appendChild(HourDevelopeds);
  div.appendChild(HourText);
  div.appendChild(ValueText);

  document.getElementById('functionalities-box').appendChild(div);
  resumo();
};
// Fim da implementação de inputs em variáveis;

// Remover features

const deleteInput = document.getElementById('delete-input');

function removeInput (e) {
  let removeFromObject;
  e = e || window.event;
  let target = e.target || e.srcElement;
  let divInput = target.parentNode;
  if(divInput.id === 'functionalities-input') {
    removeFromObject = divInput.innerText.replace(/(\r\n|\n|\r)/gm," ").split(/ (.*)/);
    for (let i = 0; i < feature.length; i++){
      if(feature[i].feature == removeFromObject[0]){
        feature.splice(i,1);
        break;
      }
      else {
        alert('Algo deu errado');
      }
    };
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

document.getElementById('fileid').addEventListener('change',handleFile);

function handleFile(e) {
    let objectJson;
    let files = e.target.files;
    f = files[0];
    let reader = new FileReader();

    reader.onload = (function(file) {
        return function(e) {
          const necessaryProperties = ["feature","devHours","testHours"];
          let elements = document.getElementsByClassName('functionalities-input');

          JsonObj = JSON.parse(e.target.result);
          objectJson = JsonObj;

          while(elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
          }

          objectJson.forEach(function(object) {
          let hasAll = necessaryProperties.every(necessaryProperties => object.hasOwnProperty(necessaryProperties));
            if(hasAll == false){
              alert('Insira um JSON válido');
            }
            else {
              adicionarFuncionalidades(object.feature, object.devHours, object.testHours);
            }
          })

        };
      })(f);
      reader.readAsText(f);
};

// Fim da importação de arquivo Jason

// Inicio da exportaçao de JSON;

let exportFile = document.getElementById('export-file');
exportFile.addEventListener('click', ExportarFuncionalidades);

function ExportarFuncionalidades () {
  let data = JSON.stringify(feature, undefined, 4);
  let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(data);
  let exportFileDefaultName = 'data.json';

  let link = document.getElementById('export-file-download');
  link.setAttribute('href', dataUri);
  link.setAttribute('download', exportFileDefaultName);
  link.click();
};

// Fim de exportação de JSON;

// Barra de Resumo (todas as funções)

function resumo () {
  let totalFuncionalidades = feature.length;
  let totalHorasDesenvolvimento = 0;
  let totalHorasTeste = 0;
  // Loop para descobrir as quantidades de horas de desenvolvimento e de teste.
  for(let i = 0; i < feature.length; i++){
    let toNumber = parseInt(feature[i].devHours);
    let toNumberTest = parseInt(feature[i].testHours);
    totalHorasTeste = totalHorasTeste + toNumberTest;
    totalHorasDesenvolvimento = totalHorasDesenvolvimento + toNumber;
  }
  console.log(totalHorasTeste,totalHorasDesenvolvimento,ValorTotal);
}


// BUG - Se o usuário não escrever nada na hora de adicionar funcionalidade, o campo é criado todo em branco. (Não resolvido)