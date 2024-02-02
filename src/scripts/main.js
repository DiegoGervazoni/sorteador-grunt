document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("form-sorteador")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      let numeroMaximo = document.getElementById("numero-maximo").value;
      numeroMaximo = parseInt(numeroMaximo);

      let numeroAleatorio = Math.random() * numeroMaximo;
      numeroAleatorio = Math.floor(numeroAleatorio + 1);

      document.getElementById("numero-sorteado").innerText =
       numeroAleatorio;
    });
});
