// ESTANDAR de dimensiones y escalado de las gráficas
const originalWidth = 50; // Ancho original de cada bit
const maxBitsToFit = 20; // Máximo de bits antes de reducir tamaño
const canvasHeight = 400; // Altura fija
const bitHeight = 100; // Altura del bit
const topMargin = 50; // Espacio superior para etiquetas

//VARIABLES PARA CONTROLAR EL CANVAS DE LA GRAFICA, LA CUADRICULA Y EL CONTEXTO 2D
const canvas = document.getElementById("grafica");
canvas.height = canvasHeight;
const ctx = canvas.getContext("2d");

//VARIABLES PARA CONTROLAR INPUTS Y TEXTOS
const input = document.getElementById('inputBit');
const combobox = document.getElementById('banCuadros');
const mensajeError = document.getElementById('mensajeError');
const progressBar = document.getElementById('progress');


//VARIABLES PARA CONTROLAR LA CUADRICULA
var UltimoTamaño = 0;
var UltimoBitWidth = originalWidth;
var Tipo="";

input.addEventListener('input', function() {
  const valor = input.value;
  // Verificamos si el último carácter no es '0' ni '1'
  if (valor.slice(-1) !== '0' && valor.slice(-1) !== '1') {
      mensajeError.textContent = 'Solo se permiten los valores 0 o 1.';
      // Usamos slice para eliminar el último carácter no válido
      input.value = valor.slice(0, -1);
  } else {
      mensajeError.textContent = '';  // Limpiamos el mensaje de error si el valor es válido
  }
});

combobox.addEventListener('input', function() {
  if (combobox.checked) {
    drawGrid(UltimoTamaño, UltimoBitWidth);
  } else {
    borrarGrid(UltimoTamaño, UltimoBitWidth);
  }
});

function IngresarBits(tipo) {
  let bits = document.getElementById("inputBit").value;
  console.log("Valor del input:", bits); // Añadido para depurar
  let trimmedInput = bits.trim();

  if (trimmedInput.length === 0) {
    alert("El campo no puede estar vacío. Ingrese una secuencia de bits (0 y 1).");
    return;
  }
  Tipo = tipo;
  escala(bits);
}

// Función para generar datos aleatorios
function generarRandom(tipo) {
  const length = Math.floor(Math.random() * 64) + 8; // Longitud aleatoria entre 8 y 32
  let randomBits = "";
  for (let i = 0; i < length; i++) {
    randomBits += Math.random() > 0.5 ? "1" : "0";
  }
  document.getElementById("inputBit").value = randomBits;
  Tipo = tipo;
  escala(randomBits);
}

function escala(bits)
{
  const tamaño = bits.length;
  let bitWidth = originalWidth;
  let scale = 1;

  // Reducir escala si hay muchos bits
  if (tamaño > maxBitsToFit) {
    scale = Math.max(1 / 3, maxBitsToFit / tamaño);
    bitWidth *= scale;
  }
  const canvasWidth = tamaño * bitWidth + 100;
  UltimoTamaño = tamaño;
  UltimoBitWidth = bitWidth;
  if(Tipo == "man")
  {
    //generarMan(bits, tamaño, bitWidth, canvasWidth);
  }
  if(Tipo == "manDif")
  {
    generarManDif(bits, tamaño, bitWidth, canvasWidth);
  }
  if(Tipo == "ami")
  {
    generarAMI(bits, tamaño, bitWidth, canvasWidth);
  }
  if(Tipo=="uni")
  {
    generarUnipolar(bits, tamaño, bitWidth, canvasWidth)
  }
  if(Tipo=="rz")
  {
    generarRZ(bits, tamaño, bitWidth, canvasWidth)
  }
  if(Tipo=="nrz-l")
  {
    generarNRZl(bits, tamaño, bitWidth, canvasWidth)
  }
  if(Tipo=="nrz-i")
  {
    generarNRZi(bits, tamaño, bitWidth, canvasWidth)
  }
  if(Tipo=="b8zs")
  {
    generarB8ZS(bits, tamaño, bitWidth, canvasWidth)
  }
  if(Tipo=="man")
  {
    generarMan(bits, tamaño, bitWidth, canvasWidth)
  }
  if(Tipo=="HDB3")
    {
      generarHDB3(bits, tamaño, bitWidth, canvasWidth)
    }    
}

/*// Dibujar gráfica AMI
function generarAMI(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = canvas.height / 2;
  let lastPolarity = 1;

  ctx.beginPath();
  ctx.moveTo(currentX, currentY);

  for (let i = 0; i < bits.length; i++) {
    const bit = bits[i];

    // Mostrar etiqueta de bit en la parte superior
    drawBitLabel(currentX, bit, bitWidth);

    if (bit === "1") {
      currentY = canvas.height / 2 - (bitHeight * lastPolarity);
      lastPolarity *= -1;
    } else {
      currentY = canvas.height / 2;
    }

    // Línea vertical
    ctx.lineTo(currentX, currentY);
    currentX += bitWidth;

    // Línea horizontal
    ctx.lineTo(currentX, currentY);
  }

  // Dibujar línea final
  ctx.strokeStyle = "#007bff";
  ctx.lineWidth = 2;
  ctx.stroke();
}
*/
// Dibujar gráfica AMI
function generarAMI(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = canvas.height / 2;
  let lastPolarity = 1;

  ctx.beginPath();
  ctx.moveTo(currentX, currentY);

  animateAMI(bits, currentX, currentY, bitWidth, bitHeight, progressBar);
}

function animateAMI(bits, currentX, currentY, bitWidth, bitHeight, progressBar)
{
  let i = 0;
  let lastPolarity = 1;
  function step6() {
    if (i >= bits.length) {
      return;
    }
    
    const bit = bits[i];
    drawBitLabel(currentX, bit, bitWidth);
    if (bit === "1") {
      currentY = canvas.height / 2 - (bitHeight * lastPolarity);
      lastPolarity *= -1;
    } else {
      currentY = canvas.height / 2;
    }

    // Línea vertical
    ctx.lineTo(currentX, currentY);
    currentX += bitWidth;

    // Línea horizontal
    ctx.lineTo(currentX, currentY);
    progressBar.style.width = ((i + 1) / bits.length) * 100 + '%';
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke(); // Se pinta el segmento en cada paso

    i++;
    setTimeout(step6, 60);
  }

  step6();
}

/*//Generar gráfica NRZ-L
function generarNRZl(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = (canvas.height / 2);
  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  
  for(let i=0;i<bits.length;i++)
  {
    const bit = bits[i];
    // Mostrar etiqueta de bit en la parte superior
    drawBitLabel(currentX, bit, bitWidth);
    if (bit === "0") {
      currentY = canvas.height/2 - bitHeight;
      ctx.lineTo(currentX, currentY);
    }else{
      currentY = canvas.height/2 + bitHeight;
      ctx.lineTo(currentX, currentY);
    }
    currentX += bitWidth;
    ctx.lineTo(currentX, currentY);
  }
    // Dibujar línea final
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke();
}*/

//Generar gráfica NRZ-L
function generarNRZl(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = (canvas.height / 2);
  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  
  animateNRZl(bits, currentX, currentY, bitWidth, bitHeight, progressBar);
}

function animateNRZl(bits, currentX, currentY, bitWidth, bitHeight, progressBar)
{
  let i = 0;

  function step5() {
    if (i >= bits.length) {
      return;
    }

    const bit = bits[i];
    drawBitLabel(currentX, bit, bitWidth);
    progressBar.style.width = ((i + 1) / bits.length) * 100 + '%';
    if (bit === "0") {
      currentY = canvas.height/2 - bitHeight;
      ctx.lineTo(currentX, currentY);
    }else{
      currentY = canvas.height/2 + bitHeight;
      ctx.lineTo(currentX, currentY);
    }
    currentX += bitWidth;
    ctx.lineTo(currentX, currentY);
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke(); // Se pinta el segmento en cada paso

    i++;
    setTimeout(step5, 60);
  }

  step5();
}

/*//Generar gráfica NRZ-I
function generarNRZi(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = (canvas.height / 2);
  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  let lastPolarity = 1;
  
  for(let i=0;i<bits.length;i++)
  {
    const bit = bits[i];
    // Mostrar etiqueta de bit en la parte superior
    drawBitLabel(currentX, bit, bitWidth);
    if (bit === "1") {
      lastPolarity *= -1;
    }
    currentY = canvas.height/2 - (bitHeight*lastPolarity);
    ctx.lineTo(currentX, currentY);
    currentX += bitWidth;
    ctx.lineTo(currentX, currentY);
  }
    // Dibujar línea final
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke();
}*/

//Generar gráfica NRZ-I
function generarNRZi(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = (canvas.height / 2);
  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  
  animateNRZi(bits, currentX, currentY, bitWidth, bitHeight, progressBar);
}

function animateNRZi(bits, currentX, currentY, bitWidth, bitHeight, progressBar)
{
  let i = 0;
  let lastPolarity = 1;
  function step4() {
    if (i >= bits.length) {
      return;
    }
    
    const bit = bits[i];
    drawBitLabel(currentX, bit, bitWidth);
    if (bit === "1") {
      lastPolarity *= -1;
    }
    currentY = canvas.height/2 - (bitHeight*lastPolarity);
    ctx.lineTo(currentX, currentY);
    currentX += bitWidth;
    ctx.lineTo(currentX, currentY);
  
    progressBar.style.width = ((i + 1) / bits.length) * 100 + '%';
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke(); // Se pinta el segmento en cada paso

    i++;
    setTimeout(step4, 60);
  }

  step4();
}

/*//Dibuja la gráfica RZ
function generarRZ(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = (canvas.height / 2);
  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  
  for(let i=0;i<bits.length;i++)
  {
    const bit = bits[i];
    // Mostrar etiqueta de bit en la parte superior
    drawBitLabel(currentX, bit, bitWidth);
    if (bit === "1") {
      currentY = canvas.height/2 - bitHeight;
      ctx.lineTo(currentX, currentY);
      currentX += bitWidth/2;
      ctx.lineTo(currentX, currentY);
      currentY += bitHeight;
      ctx.lineTo(currentX, currentY);
    }else{
      currentY = canvas.height/2 + bitHeight;
      ctx.lineTo(currentX, currentY);
      currentX += bitWidth/2;
      ctx.lineTo(currentX, currentY);
      currentY -= bitHeight;
      ctx.lineTo(currentX, currentY);
    }
    currentX += bitWidth/2;
    ctx.lineTo(currentX, currentY);
  }
    // Dibujar línea final
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke();
}*/
//Dibuja la gráfica RZ
function generarRZ(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = (canvas.height / 2);
  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  
  animateRZ(bits, currentX, currentY, bitWidth, bitHeight, progressBar);
}

function animateRZ(bits, currentX, currentY, bitWidth, bitHeight, progressBar)
{
  let i = 0;

  function step3() {
    if (i >= bits.length) {
      return;
    }

    const bit = bits[i];
    drawBitLabel(currentX, bit, bitWidth);
    if (bit === "1") {
      currentY = canvas.height/2 - bitHeight;
      ctx.lineTo(currentX, currentY);
      currentX += bitWidth/2;
      ctx.lineTo(currentX, currentY);
      currentY += bitHeight;
      ctx.lineTo(currentX, currentY);
    }else{
      currentY = canvas.height/2 + bitHeight;
      ctx.lineTo(currentX, currentY);
      currentX += bitWidth/2;
      ctx.lineTo(currentX, currentY);
      currentY -= bitHeight;
      ctx.lineTo(currentX, currentY);
    }
    currentX += bitWidth/2;
    ctx.lineTo(currentX, currentY);
      
    progressBar.style.width = ((i + 1) / bits.length) * 100 + '%';
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke(); // Se pinta el segmento en cada paso

    i++;
    setTimeout(step3, 500);
  }

  step3();
}

//Dibuja la gráfica Manchester Diferencial
function generarManDif(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  //configurar si inicia como caida o como subida en ambas variables, 1 caida
  let lastPolarity = 1;
  let currentY = (canvas.height / 2) + (bitHeight * lastPolarity);

  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  
  animateManchesterDif(bits, currentX, currentY, bitWidth, bitHeight, progressBar);
}

function animateManchesterDif(bits, currentX, currentY, bitWidth, bitHeight, progressBar)
{
  let i = 0;
  let lastPolarity = 1;
  function step2() {
    if (i >= bits.length) {
      return;
    }
    
    const bit = bits[i];
    drawBitLabel(currentX, bit, bitWidth);
    if (bit === "1") {
      lastPolarity *= -1; // Invertir polaridad solo al inicio del bit
    }else{
      //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA FUNCIONO
      currentY = (canvas.height / 2) - (bitHeight * lastPolarity);
      ctx.lineTo(currentX, currentY);
    }
    ;
     // Primera mitad del bit (mantiene o cambia según el bit)
    currentX += bitWidth / 2;
    ctx.lineTo(currentX, currentY);
 
     // Transición a la segunda mitad del bit
    currentY = (canvas.height / 2) + (bitHeight * lastPolarity);
    ctx.lineTo(currentX, currentY);
 
     // Segunda mitad del bit (se mantiene)
    currentX += bitWidth / 2;
    ctx.lineTo(currentX, currentY);
    progressBar.style.width = ((i + 1) / bits.length) * 100 + '%';
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke(); // Se pinta el segmento en cada paso

    i++;
    setTimeout(step2, 60);
  }

  step2();
}
/*//Dibuja la gráfica Manchester Diferencial
function generarManDif(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  //configurar si inicia como caida o como subida en ambas variables, 1 caida
  let lastPolarity = 1;
  let currentY = (canvas.height / 2) + (bitHeight * lastPolarity);

  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  
  for(let i=0;i<bits.length;i++)
  {
    const bit = bits[i];
    // Mostrar etiqueta de bit en la parte superior
    drawBitLabel(currentX, bit, bitWidth);
    if (bit === "1") {
      lastPolarity *= -1; // Invertir polaridad solo al inicio del bit
    }else{
      //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA FUNCIONO
      currentY = (canvas.height / 2) - (bitHeight * lastPolarity);
      ctx.lineTo(currentX, currentY);
    }
    ;
     // Primera mitad del bit (mantiene o cambia según el bit)
     currentX += bitWidth / 2;
     ctx.lineTo(currentX, currentY);
 
     // Transición a la segunda mitad del bit
     currentY = (canvas.height / 2) + (bitHeight * lastPolarity);
     ctx.lineTo(currentX, currentY);
 
     // Segunda mitad del bit (se mantiene)
     currentX += bitWidth / 2;
     ctx.lineTo(currentX, currentY);
  }
    // Dibujar línea final
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke();
}*/
//Dibuja la gráfica Manchester
function generarMan(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);

  if (combobox.checked) {
    drawGrid(tamaño, bitWidth);
  }

  let currentX = 50;
  let currentY = canvas.height / 2;
  let progressBar = document.getElementById('progress');

  ctx.beginPath();
  ctx.moveTo(currentX, currentY);

  animateManchester(bits, currentX, currentY, bitWidth, bitHeight, progressBar);
}

function animateManchester(bits, currentX, currentY, bitWidth, bitHeight, progressBar) {
  let i = 0;

  function step() {
    if (i >= bits.length) {
      return;
    }

    const bit = bits[i];
    drawBitLabel(currentX, bit, bitWidth);

    if (bit === "1") {
      currentY = (canvas.height / 2) + bitHeight;
      if (i === 0) {
        ctx.moveTo(currentX, currentY);
      }
      ctx.lineTo(currentX, currentY);
      currentX += bitWidth / 2;
      ctx.lineTo(currentX, currentY);
      currentY = (canvas.height / 2) - bitHeight;
      ctx.lineTo(currentX, currentY);
      currentX += bitWidth / 2;
      ctx.lineTo(currentX, currentY);
    } else {
      currentY = (canvas.height / 2) - bitHeight;
      if (i === 0) {
        ctx.moveTo(currentX, currentY);
      }
      ctx.lineTo(currentX, currentY);
      currentX += bitWidth / 2;
      ctx.lineTo(currentX, currentY);
      currentY = (canvas.height / 2) + bitHeight;
      ctx.lineTo(currentX, currentY);
      currentX += bitWidth / 2;
      ctx.lineTo(currentX, currentY);
    }

    progressBar.style.width = ((i + 1) / bits.length) * 100 + '%';
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke(); // Se pinta el segmento en cada paso

    i++;
    setTimeout(step, 60);
  }

  step();
}

/*
//Dibuja la gráfica Manchester
function generarManS(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = canvas.height / 2;
  const progressBar = document.getElementById('progress');

  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  
  for(let i=0;i<bits.length;i++)
  {
    const bit = bits[i];
    // Mostrar etiqueta de bit en la parte superior
    drawBitLabel(currentX, bit, bitWidth);
    if (bit === "1") {
      
      // Transición a la segunda mitad del bit
      currentY = (canvas.height / 2) + bitHeight;
      if(i==0)
      {
        ctx.moveTo(currentX, currentY);
      }
      ctx.lineTo(currentX, currentY);
      // Primera mitad del bit (mantiene o cambia según el bit)
      currentX += bitWidth / 2;
      ctx.lineTo(currentX, currentY);
  
      // Transición a la segunda mitad del bit
      currentY = (canvas.height / 2) - bitHeight;
      ctx.lineTo(currentX, currentY);
  
      // Segunda mitad del bit (se mantiene)
      currentX += bitWidth / 2;
      ctx.lineTo(currentX, currentY);
    }else{
      // Transición a la segunda mitad del bit
      currentY = (canvas.height / 2) - bitHeight;
      if(i==0)
        {
          ctx.moveTo(currentX, currentY);
        }
      ctx.lineTo(currentX, currentY);
      
      // Primera mitad del bit (mantiene o cambia según el bit)
      currentX += bitWidth / 2;
      ctx.lineTo(currentX, currentY);
  
      // Transición a la segunda mitad del bit
      currentY = (canvas.height / 2) + bitHeight;
      ctx.lineTo(currentX, currentY);
  
      // Segunda mitad del bit (se mantiene)
      currentX += bitWidth / 2;
      ctx.lineTo(currentX, currentY);
    }
    ;
     
  }
    // Dibujar línea final
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke();
}*/

//Dibuja la gráfica Unipolar
/*function generarUnipolar(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = (canvas.height / 2);
  
  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  
  for(let i=0;i<bits.length;i++)
  {
    const bit = bits[i];
    // Mostrar etiqueta de bit en la parte superior
    drawBitLabel(currentX, bit, bitWidth);
    if (bit === "1") {
      currentY = canvas.height/2 - bitHeight;//???????????????? bueno, funciona
      ctx.lineTo(currentX, currentY);
    }else{
      currentY = canvas.height / 2;
      ctx.lineTo(currentX, currentY);
    }
    currentX += bitWidth;
    ctx.lineTo(currentX, currentY);
  }
    // Dibujar línea final
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke();
}*/
//Dibuja la gráfica Unipolar
function generarUnipolar(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = (canvas.height / 2);
  let progressBar = document.getElementById('progress');
  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  
  animateUnipolar(bits, currentX, currentY, bitWidth, bitHeight, progressBar);
}

function animateUnipolar(bits, currentX, currentY, bitWidth, bitHeight, progressBar)
{
  let i = 0;

  function step1() {
    if (i >= bits.length) {
      return;
    }

    const bit = bits[i];
    // Mostrar etiqueta de bit en la parte superior
    drawBitLabel(currentX, bit, bitWidth);
    if (bit === "1") {
      currentY = canvas.height/2 - bitHeight;//???????????????? bueno, funciona
      ctx.lineTo(currentX, currentY);
    }else{
      currentY = canvas.height / 2;
      ctx.lineTo(currentX, currentY);
    }
      if (bit === "1") {
        currentY = canvas.height / 2 - bitHeight;
    } else {
        currentY = canvas.height / 2;
    }
    ctx.lineTo(currentX, currentY);
    currentX += bitWidth;
    ctx.lineTo(currentX, currentY);
    progressBar.style.width = ((i + 1) / bits.length) * 100 + '%';
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke(); // Se pinta el segmento en cada paso

    i++;
    setTimeout(step1, 60);
  }
  step1();
}
/*
// Dibujar gráfica B8ZS
function generarB8ZS(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = canvas.height / 2;
  let lastPolarity = 1;

  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  let ban = false;
  let i = 0;
  let canvasHeight = canvas.height;
  while(i < bits.length) {
    const bit = bits[i];

    // Mostrar etiqueta de bit en la parte superior
    drawBitLabel(currentX, bit, bitWidth);

    if (bit === "1") {
      currentY = canvas.height / 2 - (bitHeight * lastPolarity);
      lastPolarity *= -1;
      // Línea vertical
      ctx.lineTo(currentX, currentY);
      currentX += bitWidth;
      
      // Línea horizontal
      ctx.lineTo(currentX, currentY);
    } else {
      currentY = canvas.height / 2;
      ctx.lineTo(currentX, currentY);
      // Verificar si hay exactamente ocho ceros consecutivos
      if (i + 7 < bits.length) {
        ban = false;
        for(j=0;j<8;j++)
        {
          if(bits[i+j]==1||bits[i+j]=="1")
          {
            ban = true;
            break;
          }
        }
      } else {
          ban = true; // Si no hay suficientes bits, no aplicar B8ZS
      }
      if(ban)
      {
        currentX += bitWidth;
        ctx.lineTo(currentX, currentY);
      }else{
        //LAS SIGUIENTES 8 SON 0, DIBUJAR LAS VIOLACIONES DE ACUERDO A LA POLARIDAD
        currentX += bitWidth;
        ctx.lineTo(currentX, currentY);
        drawBitLabel(currentX, bits[i+1], bitWidth);
        currentX += bitWidth;
        ctx.lineTo(currentX, currentY);
        drawBitLabel(currentX, bits[i+2], bitWidth);
        currentX += bitWidth;
        ctx.lineTo(currentX, currentY);
        if(lastPolarity==1)
        {  
          drawBitLabel(currentX, bits[i+3], bitWidth);//inicia violación
          currentY = (canvasHeight/2)+bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+4], bitWidth);
          currentY = (canvasHeight/2)-bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+5], bitWidth);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+6], bitWidth);
          currentY = (canvasHeight/2)-bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+7], bitWidth);
          currentY = (canvasHeight/2)+bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
        }else{
          drawBitLabel(currentX, bits[i+3], bitWidth);//inicia violación
          currentY = (canvasHeight/2)-bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+4], bitWidth);
          currentY = (canvasHeight/2)+bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+5], bitWidth);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+6], bitWidth);
          currentY = (canvasHeight/2)+bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+7], bitWidth);
          currentY = (canvasHeight/2)-bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
        }
        i+=6;
      }
    }
    i+=1;
  }*/

  // Dibujar gráfica B8ZS
function generarB8ZS(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = canvas.height / 2;

  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  animateB8ZS(bits, currentX, currentY, bitWidth, bitHeight, progressBar);
}

function animateB8ZS(bits, currentX, currentY, bitWidth, bitHeight, progressBar)
{
  let i = 0;
  let ban = false;
  let canvasHeight = canvas.height;
  let lastPolarity = 1;
  function step7() {
    if (i >= bits.length) {
      return;
    }

    const bit = bits[i];
    drawBitLabel(currentX, bit, bitWidth);
    if (bit === "1") {
      currentY = canvas.height / 2 - (bitHeight * lastPolarity);
      lastPolarity *= -1;
      // Línea vertical
      ctx.lineTo(currentX, currentY);
      currentX += bitWidth;
      
      // Línea horizontal
      ctx.lineTo(currentX, currentY);
    } else {
      currentY = canvas.height / 2;
      ctx.lineTo(currentX, currentY);
      // Verificar si hay exactamente ocho ceros consecutivos
      if (i + 7 < bits.length) {
        ban = false;
        for(j=0;j<8;j++)
        {
          if(bits[i+j]==1||bits[i+j]=="1")
          {
            ban = true;
            break;
          }
        }
      } else {
          ban = true; // Si no hay suficientes bits, no aplicar B8ZS
      }
      if(ban)
      {
        currentX += bitWidth;
        ctx.lineTo(currentX, currentY);
      }else{
        //LAS SIGUIENTES 8 SON 0, DIBUJAR LAS VIOLACIONES DE ACUERDO A LA POLARIDAD
        currentX += bitWidth;
        ctx.lineTo(currentX, currentY);
        drawBitLabel(currentX, bits[i+1], bitWidth);
        currentX += bitWidth;
        ctx.lineTo(currentX, currentY);
        drawBitLabel(currentX, bits[i+2], bitWidth);
        currentX += bitWidth;
        ctx.lineTo(currentX, currentY);
        if(lastPolarity==1)
        {  
          drawBitLabel(currentX, bits[i+3], bitWidth);//inicia violación
          currentY = (canvasHeight/2)+bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+4], bitWidth);
          currentY = (canvasHeight/2)-bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+5], bitWidth);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+6], bitWidth);
          currentY = (canvasHeight/2)-bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+7], bitWidth);
          currentY = (canvasHeight/2)+bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
        }else{
          drawBitLabel(currentX, bits[i+3], bitWidth);//inicia violación
          currentY = (canvasHeight/2)-bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+4], bitWidth);
          currentY = (canvasHeight/2)+bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+5], bitWidth);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+6], bitWidth);
          currentY = (canvasHeight/2)+bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
          drawBitLabel(currentX, bits[i+7], bitWidth);
          currentY = (canvasHeight/2)-bitHeight;
          ctx.lineTo(currentX, currentY);
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight/2;
          ctx.lineTo(currentX, currentY);
        }
        lastPolarity *= -1;
        i+=6;
      }
    }
    progressBar.style.width = ((i + 1) / bits.length) * 100 + '%';
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke(); // Se pinta el segmento en cada paso
    i++;
    setTimeout(step7, 60);
  }

  step7();
}
let lastPolarity = 1;
// Dibujar gráfica B8ZS
function generarHDB3(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(canvasWidth);
  //grid = cuadricula
  if(combobox.checked)
  {
    drawGrid(tamaño, bitWidth);
  }
  //inicializamos los valores de la grafica
  let currentX = 50;
  let currentY = canvas.height / 2;

  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  animateHDB3(bits, currentX, currentY, bitWidth, bitHeight, progressBar);
}

function animateHDB3(bits, currentX, currentY, bitWidth, bitHeight, progressBar)
{
  let i = 0;
  let ban = false;
  let canvasHeight = canvas.height;
 
  let nUnos = 0;
  function step8() {
    if (i >= bits.length) {
      return;
    }

    const bit = bits[i];
    drawBitLabel(currentX, bit, bitWidth);
    if (bit === "1") {
      currentY = canvas.height / 2 + (bitHeight * lastPolarity);
      
      nUnos++;
      // Línea vertical
      ctx.lineTo(currentX, currentY);
      currentX += bitWidth;
      
      // Línea horizontal
      ctx.lineTo(currentX, currentY);
      lastPolarity *= -1;
    } else {
      currentY = canvas.height / 2;
      ctx.lineTo(currentX, currentY);
      // Verificar si hay exactamente ocho ceros consecutivos
      if (i + 3 < bits.length) {
        ban = false;
        for(j=0;j<4;j++)
        {
          if(bits[i+j]==1||bits[i+j]=="1")
          {
            ban = true;
            break;
          }
        }
      } else {
          ban = true; // Si no hay suficientes bits, no aplicar B8ZS
      }
      if(ban)
      {
        currentX += bitWidth;
        ctx.lineTo(currentX, currentY);
      }else{
        //LAS SIGUIENTES 4 SON 0, DIBUJAR LAS VIOLACIONES DE ACUERDO A LA POLARIDAD
        if(nUnos%2 !== 0)
        {
          //es impar
          for(i=0;i<3;i++)
          {
            drawBitLabel(currentX, bit, bitWidth);
            currentX += bitWidth;
            ctx.lineTo(currentX, currentY);
          }
          //viene de positivo o no
          if(lastPolarity==1)
          {
            drawBitLabel(currentX, bit, bitWidth);
            currentY = (canvasHeight / 2) + bitHeight;
            ctx.lineTo(currentX, currentY);
          }else{
            drawBitLabel(currentX, bit, bitWidth);
            currentY = (canvasHeight / 2) - bitHeight;
            ctx.lineTo(currentX, currentY);
          }
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight / 2;
          ctx.lineTo(currentX, currentY);
          nUnos++;
        }else{
          //numero par
          if(lastPolarity == 1)
          {
            drawBitLabel(currentX, bit, bitWidth);
            currentY = (canvasHeight / 2) + bitHeight;
            ctx.lineTo(currentX, currentY);
          }else{
            drawBitLabel(currentX, bit, bitWidth);
            currentY = (canvasHeight / 2) - bitHeight;
            ctx.lineTo(currentX, currentY);
          }
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight / 2;
          ctx.lineTo(currentX, currentY);
          for(i=0;i<2;i++)
          {
            drawBitLabel(currentX, bit, bitWidth);
            currentX += bitWidth;
            ctx.lineTo(currentX, currentY);
          }
          if(lastPolarity == 1)
          {
            drawBitLabel(currentX, bit, bitWidth);
            currentY = (canvasHeight / 2) + bitHeight;
            ctx.lineTo(currentX, currentY);
          }else{
            drawBitLabel(currentX, bit, bitWidth);
            currentY = (canvasHeight / 2) - bitHeight;
            ctx.lineTo(currentX, currentY);
          }
          currentX += bitWidth;
          ctx.lineTo(currentX, currentY);
          currentY = canvasHeight / 2;
          ctx.lineTo(currentX, currentY);
          nUnos+=2;
        }
        lastPolarity *= -1;
        i+=2;
      }
    }
    progressBar.style.width = ((i + 1) / bits.length) * 100 + '%';
    ctx.strokeStyle = "#007bff";
    ctx.lineWidth = 2;
    ctx.stroke(); // Se pinta el segmento en cada paso
    i++;
    setTimeout(step8, 60);
  }

  step8();
}

// Pone los numeros de los bits
function drawBitLabel(x, bit, bitWidth) {
  ctx.font = "14px Arial";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.fillText(bit, x + bitWidth / 2, topMargin - 10);
}

// Dibuja cuadrículas para la gráfica
function drawGrid(bitCount, bitWidth) {
  ctx.strokeStyle = "#ddd";
  ctx.lineWidth = 1;
  for (let i = 0; i <= bitCount; i++) {
    const x = 50 + i * bitWidth;
    ctx.beginPath();
    ctx.moveTo(x, topMargin);
    ctx.lineTo(x, canvas.height - 50);
    ctx.stroke();
  }
}

// Borrar solo la cuadrícula
function borrarGrid(bitCount, bitWidth) {
  ctx.clearRect(0, topMargin, canvas.width, canvas.height - topMargin - 50);
  if(Tipo=="ami")
  {
    generarAMI(input.value, UltimoTamaño, UltimoBitWidth, canvas.width);
  }
  if(Tipo=="manDif")
  {
    generarManDif(input.value, UltimoTamaño, UltimoBitWidth, canvas.width);
  }
  if(Tipo=="uni")
  {
    generarUnipolar(input.value, UltimoTamaño, UltimoBitWidth, canvas.width);
  }
  if(Tipo=="rz")
  {
    generarRZ(input.value, UltimoTamaño, UltimoBitWidth, canvas.width);
  }  
  if(Tipo=="nrz-l")
  {
    generarNRZl(input.value, UltimoTamaño, UltimoBitWidth, canvas.width);
  }  
  if(Tipo=="nrz-i")
  {
    generarNRZi(input.value, UltimoTamaño, UltimoBitWidth, canvas.width);
  }
  if(Tipo=="b8zs")
  {
    generarB8ZS(input.value, UltimoTamaño, UltimoBitWidth, canvas.width);
  }  
  if(Tipo=="man")
  {
    generarMan(input.value, UltimoTamaño, UltimoBitWidth, canvas.width);
  }  
  if(Tipo=="HDB3")
    {
      generarHDB3(input.value, UltimoTamaño, UltimoBitWidth, canvas.width);
    }  
}

// Dibuja el eje horizontal
function drawAxis(canvasWidth) {
  ctx.beginPath();
  ctx.moveTo(50, canvas.height / 2);
  ctx.lineTo(canvasWidth - 50, canvas.height / 2);
  ctx.strokeStyle = "#999";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

//MUSIC
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("musica");

  // Intenta reproducir el audio
  audio.play().then(() => {
      console.log("Música reproduciéndose automáticamente.");
  }).catch(error => {
      console.log("La reproducción automática fue bloqueada. Se necesita interacción del usuario.");
  });
});