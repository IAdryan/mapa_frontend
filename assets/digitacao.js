// Texto que será digitado //
const texto = "Giorgian Daniel De Arrascaeta Benedetti";
// Elemento selecionado pelo id que será animado //
const elemento = document.getElementById("digitacao");
let indice = 0;

// Função que fará o efeito de digitação do texto //
function digitar() {
    if (indice < texto.length) {
        elemento.textContent += texto.charAt(indice);
        indice++;
        setTimeout(digitar, 80);
    }
}
// Adicionando o evento a janela do navegador //
window.addEventListener("DOMContentLoaded", digitar);