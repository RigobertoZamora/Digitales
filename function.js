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
    
}

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
  let contaCeros = 0;
  for (let i = 0; i < bits.length; i++) {
    const bit = bits[i];

    // Mostrar etiqueta de bit en la parte superior
    drawBitLabel(currentX, bit, bitWidth);

    if (bit === "1") {
      currentY = canvas.height / 2 - (bitHeight * lastPolarity);
      lastPolarity *= -1;
    } else {
      currentY = canvas.height / 2;
      contaCeros += 1;
      for(let j=0; j<=8; j++)
      {
        if(bits[i])
        if(contaCeros==8)
        {
          contaCeros=0; 
          if(lastPolarity == 1)
          {

          }else{

          }
        }
        contaCeros += 1;
      }
      
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
}

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
}

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
}

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
}

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
  let ban = false;
  for (let i = 0; i < bits.length; i++) {
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
      contaCeros = 0;
    } else {
      currentY = canvas.height / 2;
      ctx.lineTo(currentX, currentY);
      contaCeros += 1;
      for(let j=0; j<=8; j++)
      {
        if(bits[i+j]==1)
        {
          ban = true;
        }
      }
      if(ban)
      {
        currentX += bitWidth;
        ctx.lineTo(currentX, currentY);
      }else{
        //LAS SIGUIENTES 8 SON 0, DIBUJAR LAS VIOLACIONES DE ACUERDO A LA POLARIDAD
        if(lastPolarity==1)
        {

        }else{
          
        }
      }





    }

    
  }

  // Dibujar línea final
  ctx.strokeStyle = "#007bff";
  ctx.lineWidth = 2;
  ctx.stroke();
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
