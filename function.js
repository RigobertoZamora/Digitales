// ESTANDAR de dimensiones y escalado de las gráficas
const originalWidth = 50; // Ancho original de cada bit
const maxBitsToFit = 20; // Máximo de bits antes de reducir tamaño
const canvasHeight = 400; // Altura fija
const bitHeight = 100; // Altura de la onda
const topMargin = 50; // Espacio superior para etiquetas

const canvas = document.getElementById("grafica");
canvas.height = canvasHeight;
const ctx = canvas.getContext("2d");

const input = document.getElementById('inputBit');
const mensajeError = document.getElementById('mensajeError');

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

function IngresarBits(tipo) {
  let bits = document.getElementById("inputBit").value;
  console.log("Valor del input:", bits); // Añadido para depurar
  let trimmedInput = bits.trim();

  if (trimmedInput.length === 0) {
    alert("El campo no puede estar vacío. Ingrese una secuencia de bits (0 y 1).");
    return;
  }
  escala(bits, tipo);
}

// Función para generar datos aleatorios
function generarRandom(tipo) {
  const length = Math.floor(Math.random() * 32) + 8; // Longitud aleatoria entre 8 y 32
  let randomBits = "";
  for (let i = 0; i < length; i++) {
    randomBits += Math.random() > 0.5 ? "1" : "0";
  }
  document.getElementById("inputBit").value = randomBits;
  escala(randomBits, tipo);
}

function escala(bits, tipo)
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
  if(tipo == "man")
  {
    //generarMan(bits, tamaño, bitWidth, canvasWidth);
  }
  if(tipo == "manDif")
  {
    generarManDif(bits, tamaño, bitWidth, canvasWidth);
  }
  if(tipo == "ami")
  {
    generarAMI(bits, tamaño, bitWidth, canvasWidth);
  }
}

function generarManDif(bits) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;
  // Limpiamos la gráfica
  ctx.clearRect(0, 0, canvas.width, canvas.height); 

  ctx.beginPath();
  ctx.moveTo(x, y_actual); // Inicia la gráfica en el primer punto

  for (let i = 0; i < bits.length; i++) {
      let bit = bits[i];

      // Transición Manchester Diferencial
      let nuevo_y = (bit === 1) ? y_baja : y_alta; // Invertir en cada transición

      // Dibuja la línea vertical para indicar el cambio de nivel
      ctx.lineTo(x, nuevo_y);
      
      // Dibuja la línea horizontal que representa el bit
      x += ancho;
      ctx.lineTo(x, nuevo_y);

      // Guarda el nivel actual para la siguiente iteración
      y_actual = nuevo_y;
  }

  ctx.strokeStyle = "cyan";
  ctx.lineWidth = 2;
  ctx.stroke();
}
/* Todo de aquí en adelante hasta que se indique de que termino el scrip, pertenece al html AMI */

// Dibujar gráfica AMI
function generarAMI(bits, tamaño, bitWidth, canvasWidth) {
  canvas.width = canvasWidth > 800 ? canvasWidth : 800;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid(tamaño, bitWidth);
  drawAxis(canvasWidth);

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

// Dibujar etiquetas de bits
function drawBitLabel(x, bit, bitWidth) {
  ctx.font = "14px Arial";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.fillText(bit, x + bitWidth / 2, topMargin - 10);
}

// Dibujar cuadrícula para la gráfica
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

// Dibujar eje horizontal
function drawAxis(canvasWidth) {
  ctx.beginPath();
  ctx.moveTo(50, canvas.height / 2);
  ctx.lineTo(canvasWidth - 50, canvas.height / 2);
  ctx.strokeStyle = "#999";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

/* Ya terminó las funciones de AMI */
