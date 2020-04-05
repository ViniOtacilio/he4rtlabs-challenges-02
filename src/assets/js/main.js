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
// Dica: faça o layout e depois pense em como vai funcionar o script.
