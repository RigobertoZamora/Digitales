function IngresarBits() {
  let input = document.getElementById("inputBit").value;
  console.log("Valor del input:", input); // Añadido para depurar
  let trimmedInput = input.trim();

  if (trimmedInput.length === 0) {
    alert("El campo no puede estar vacío. Ingrese una secuencia de bits (0 y 1).");
    return;
  }

  for (let i = 0; i < trimmedInput.length; i++) {
    if (trimmedInput[i] !== '0' && trimmedInput[i] !== '1') {
      alert("Entrada inválida. Solo se permiten los caracteres '0' y '1'.");
      return;
    }
  }

  let bits = trimmedInput.split('').map(Number);
  //generarGrafica(bits);
}

/*function generarGraficaTIPO(bits){

}*/