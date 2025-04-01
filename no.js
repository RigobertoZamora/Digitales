document.getElementById('toggle-dark-mode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
function changeImage() {
  var image = document.getElementById('imagen-tema');
  // Aplica un desvanecimiento
  image.style.opacity = 0; // Desvanece la imagen

  // Cambia la imagen después de un breve retraso
  setTimeout(function() {
      // Verifica la imagen actual y cambia a la otra
      if (image.src.endsWith("212827.png")) {
          image.src = "img/blanca.png"; // Cambia a blanca.png
          image.style.width = "450px";
          image.style.height = "754px";
      } else {
          image.src = "img/Captura de pantalla 2025-03-26 212827.png"; // Cambia a la imagen original
      }
      image.style.opacity = .9; // Vuelve a mostrar la imagen
  }, 235); // Espera 500 ms (el mismo tiempo que la transición)
}    