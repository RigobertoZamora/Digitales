const frecuenciasEdad = [], frecuenciaEstatura=[], frecuenciaGasto=[], Nedades=[], Nestaturas=[], Ngastos=[], NMedades=[], NMestaturas=[], NMgastos=[];
const promedioEdad = [], promedioEstatura=[], promedioGasto=[], frecuenciasMEdad = [], frecuenciasMGasto = [], frecuenciasMEstatura = [];
//Código para importar los datos de el archivo fijo de texto
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const lines = e.target.result.split('\n'); // Divide el contenido del archivo en líneas
            processLines(lines);
        };
        reader.readAsText(file);
        //processFrecuence();
    }
});

function processLines(lines) {
    const tableBody = document.getElementById('tabla-principal').querySelector('tbody');
    const clases = ['edad', 'estatura', 'gasto']; // Clases para las columnas específicas
    tableBody.innerHTML='';
    lines.forEach((line, lineIndex) => {
        if (line.trim()) { // Ignorar líneas vacías
            const columns = line.split(','); // Separar por comas (ajusta si el delimitador es diferente)
            const row = document.createElement('tr');

            columns.forEach((column, colIndex) => {
                const cell = document.createElement('td');
                cell.textContent = column.trim(); // Eliminar espacios extra

                // Asignar clases solo si el índice es válido
                if (colIndex > 0 && colIndex <= clases.length) {
                    cell.classList.add(clases[colIndex - 1]); // Asignar clase basada en el índice
                }

                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        }
    });
    
    /*const tableBody = document.getElementById('tabla-principal').querySelector('tbody');
    lines.forEach(line => {
        if (line.trim()) { // Ignorar líneas vacías
            const columns = line.split(','); // Separar por comas (puedes ajustar al delimitador de tu archivo)
            const row = document.createElement('tr');
            columns.forEach(column => {
                const cell = document.createElement('td');
                cell.textContent = column.trim(); // Eliminar espacios extra
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        }
    });*/
}
const edad = [];
//CODIGO DE PRUEBA PARA CREAR UN HISTOGRAMA
function expand(tipo){
    // Datos para el histograma
    // Crear un array vacío para almacenar los valores
    const estatura=[], gastos = [];
    const clases = ['edad', 'estatura', 'gasto'];
    // Seleccionar todos los elementos con la clase "edad"
        const elementos = document.querySelectorAll('.' + clases[tipo]);
        // Recorrer cada elemento y agregar su contenido al array
        elementos.forEach((elemento) => {
        const valor = parseFloat(elemento.textContent); // Convertir el texto a número decimal
        switch(tipo)
        {
            case 0:
                edad.push(valor); // Agregar al array
                generarTablaFrecuencias(edad, 'tabla-frecuencia-edad');
                generarHistograma(frecuenciasEdad, 'histograma-edad');
                break;
            case 1:
                estatura.push(valor); // Agregar al array
                generarTablaFrecuencias(estatura, 'tabla-frecuencia-estatura');
                generarHistograma(frecuenciaEstatura, 'histograma-estatura');
                break;
            case 2:
                gastos.push(valor); // Agregar al array
                generarTablaFrecuencias(gastos, 'tabla-frecuencia-gastos');
                generarHistograma(frecuenciaGasto, 'histograma-gasto');
                break;
        }
    }); 
}

function generarTablaFrecuencias(datos, table) {
    const usados = [];
    let frecuencia = 0;
    const frecuencias = [], datosUnicos = [];
    const tabla = document.getElementById(table).querySelector('tbody');
    tabla.innerHTML = ''; // Limpiar la tabla antes de llenarla

    // Procesar los datos y calcular frecuencias
    for (var i = 0; i < datos.length; i++) {
        var numData = datos[i];
        let ban = false;

        // Verificar si el dato ya fue procesado
        for (var k = 0; k < usados.length; k++) {
            if (numData === usados[k]) {
                ban = true;
                break;
            }
        }

        if (!ban) {
            frecuencia = 0;
            for (var j = 0; j < datos.length; j++) {
                if (numData === datos[j]) {
                    frecuencia++;
                }
            }
            usados.push(numData);
            datosUnicos.push(numData);
            frecuencias.push(frecuencia);
        }
    }

    // Ordenar los datos y frecuencias
    const datosOrdenados = datosUnicos.map((dato, i) => ({
        dato: dato,
        frecuencia: frecuencias[i]
    }));

    datosOrdenados.sort((a, b) => a.dato - b.dato);

    // Extraer los valores ordenados
    datosUnicos.length = 0;
    frecuencias.length = 0;
    datosOrdenados.forEach(item => {
        datosUnicos.push(item.dato);
        frecuencias.push(item.frecuencia);
    });

    // Insertar los datos ordenados en la tabla y actualizar las variables globales
    for (let i = 0; i < datosUnicos.length; i++) {
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
            <td class="id">${datosUnicos[i]}</td>
            <td class="frecuencia">${frecuencias[i]}</td>
        `;
        tabla.appendChild(nuevaFila);

        if (table == 'tabla-frecuencia-edad') {
            frecuenciasEdad.length = 0; // Limpiar frecuenciasEdad
            Nedades.length = 0; // Limpiar Nedades
        
            // Agregar todos los valores únicos y sus frecuencias
            for (let k = 0; k < datosUnicos.length; k++) {
                frecuenciasEdad.push(frecuencias[k]);
                Nedades.push(datosUnicos[k]);
            }
        } else if (table == 'tabla-frecuencia-estatura') {
            frecuenciaEstatura.length = 0;
            Nestaturas.length = 0;
            for (let k = 0; k < datosUnicos.length; k++) {
                frecuenciaEstatura.push(frecuencias[k]);
                Nestaturas.push(datosUnicos[k]);
            }
        } else if (table == 'tabla-frecuencia-gastos') {
            frecuenciaGasto.length = 0;
            Ngastos.length = 0;
            for (let k = 0; k < datosUnicos.length; k++) {
                frecuenciaGasto.push(frecuencias[k]);
                Ngastos.push(datosUnicos[k]);
            }
        } else if (table == 'tabla-frecuencia-muestra-edad') {
            frecuenciasMEdad.length = 0;
            NMedades.length = 0;
            for (let k = 0; k < datosUnicos.length; k++) {
                frecuenciasMEdad.push(frecuencias[k]);
                NMedades.push(datosUnicos[k]);
            }
        } else if (table == 'tabla-frecuencia-muestra-estatura') {
            frecuenciasMEstatura.length = 0;
            NMestaturas.length = 0;
            for (let k = 0; k < datosUnicos.length; k++) {
                frecuenciasMEstatura.push(frecuencias[k]);
                NMestaturas.push(datosUnicos[k]);
            }
        } else if (table == 'tabla-frecuencia-muestra-gasto') {
            frecuenciasMGasto.length = 0;
            NMgastos.length = 0;
            for (let k = 0; k < datosUnicos.length; k++) {
                frecuenciasMGasto.push(frecuencias[k]);
                NMgastos.push(datosUnicos[k]);
            }
        }
    }

    // Depuración final
    console.log("Datos únicos finales: ", datosUnicos);
    console.log("Frecuencias finales: ", frecuencias);
}

    function agregarFila() {
      const col2 = document.getElementById('col2').value.trim();
      const col3 = document.getElementById('col3').value.trim();
      const col4 = document.getElementById('col4').value.trim();
      const error = document.getElementById('error');

      if (!col2 || !col3 || !col4) {
        error.textContent = "Por favor, llena los tres campos antes de agregar una fila.";
        return;
      }

      error.textContent = '';
      const tabla = document.getElementById('tabla-principal').querySelector('tbody');
      const nuevaFila = document.createElement('tr');
      var contadorId = edad.length;
      nuevaFila.innerHTML = `
        <th scope="row" class="row">${contadorId}</th>
        <td class="edad">${col2}</td>
        <td class="estatura">${col3}</td>
        <td class="gasto">${col4}</td>
      `;

      tabla.appendChild(nuevaFila);
      contadorId++;
      document.getElementById('col2').value = '';
      document.getElementById('col3').value = '';
      document.getElementById('col4').value = '';
    }

function generarHistograma(datos, contenedorId)
{
    // Limpiar el contenedor antes de agregar nuevas barras
    const histogramContainer = document.getElementById(contenedorId);
    histogramContainer.innerHTML = "";
    histogramContainer.style.margin = "5px";
    histogramContainer.style.gap = `${Math.max(0, 100 / datos.length)}px`;
    // Sin márgenes
    // Generar barras para el conjunto de datos

    // Generar barras para el conjunto de datos
    datos.forEach(data => {
        const bar = document.createElement('div');
        bar.classList.add('bar');

        bar.style.height = `${data *25}px`; // Escalamos el valor para mejor visualización
        
        bar.textContent = data;
        histogramContainer.appendChild(bar);
        histogramContainer.style.borderLeftWidth=`${Math.max(0, 200 / datos.length)}px`;
        bar.style.width = `${Math.max(1.6, 200 / datos.length)}px`;
        
    });
}

function muestreo(tipo) {
    console.log("Estado inicial de Nedades:", Nedades); // <-- Agregado para depurar
    if (Nedades.length < 2) {
        console.log("Estado de Nedades antes del alert: ", Nedades);
        alert("Aún no se han cargado datos poblacionales.");
        //return;
    }
    switch (tipo) {
        case 0:
            const tabla = document.getElementById('tabla-muestra-edad').querySelector('tbody');
            if (Nedades.length < 2) {
                alert("Aun no se han cargado datos poblacionales.");
                return;
            }
            tabla.innerHTML = '';
            for (var i = 0; i < Nedades.length; i++) {
                for (var j = (i+1); j < Nedades.length; j++) {
                    var promedio = (Nedades[i] + Nedades[j]) / 2; // Corregido pura riata de corregido
                    const nuevaFila = document.createElement('tr');
                    nuevaFila.innerHTML = `
                    <td class="muestraa">${Nedades[i]},${Nedades[j]}</td>
                    <td class="promedio">${promedio}</td>
                    `;
                    tabla.appendChild(nuevaFila);
                    promedioEdad.push(promedio);
                }
            }
            console.log("Datos enviados a generarTablaFrecuencias:", promedioEdad);
            generarTablaFrecuencias(promedioEdad, 'tabla-frecuencia-muestra-edad');
            generarHistograma(frecuenciasMEdad, 'histograma-muestra-edad');
            break;
        case 1:
            const tabla2 = document.getElementById('tabla-muestra-estatura').querySelector('tbody');
            if (Nestaturas.length < 2) {
                alert("Aun no se han cargado datos poblacionales.");
                return;
            }
            tabla2.innerHTML = '';
            for (let i = 0; i < Nestaturas.length; i++) {
                for (let j = i + 1; j < Nestaturas.length; j++) {
                    var promedio = (Nestaturas[i] + Nestaturas[j]) / 2; // Corregido
                    const nuevaFila = document.createElement('tr');
                    nuevaFila.innerHTML = `
                    <td class="muestraa">${Nestaturas[i]},${Nestaturas[j]}</td>
                    <td class="promedio">${promedio}</td>
                    `;
                    tabla2.appendChild(nuevaFila);
                    promedioEstatura.push(promedio);
                }
            }
            console.log("Datos enviados a generarTablaFrecuencias:", promedioEstatura);
            generarTablaFrecuencias(promedioEstatura, 'tabla-frecuencia-muestra-estatura');
            generarHistograma(frecuenciasMEstatura, 'histograma-muestra-estatura');
            break;
        case 2:
            const tabla3 = document.getElementById('tabla-muestra-gasto').querySelector('tbody');
            if (Ngastos.length < 2) {
                alert("Aun no se han cargado datos poblacionales.");
                return;
            }
            tabla3.innerHTML = '';
            for (let i = 0; i < Ngastos.length; i++) {
                for (let j = i + 1; j < Ngastos.length; j++) {
                    var promedio = (Ngastos[i] + Ngastos[j]) / 2; // Corregido
                    const nuevaFila = document.createElement('tr');
                    nuevaFila.innerHTML = `
                    <td class="muestraa">${Ngastos[i]},${Ngastos[j]}</td>
                    <td class="promedio">${promedio}</td>
                    `;
                    tabla3.appendChild(nuevaFila);
                    promedioGasto.push(promedio);
                }
            }
            generarTablaFrecuencias(promedioGasto, 'tabla-frecuencia-muestra-gasto');
            generarHistograma(frecuenciasMGasto, 'histograma-muestra-gasto');
            break;
    }
}



function mostrarPromedio() {
    const filas = document.getElementById('tabla-principal').querySelectorAll('tbody tr');
    let suma = 0;
    let total = 0;
  
    filas.forEach(fila => {
      const edadCelda = fila.querySelector('.edad');
      if (edadCelda) {
        const edad = parseInt(edadCelda.textContent);
        if (!isNaN(edad)) {
          suma += edad;
          total++;
        }
      }
    });
  
    var promedio = total > 0 ? (suma / total).toFixed(2) : 0;
    suma = 0;
    total = 0;
    document.getElementById('valorPromedio').textContent = promedio;
    document.getElementById('tablaPromedio').style.display = "table";
  }
  
  function mostrarPromedioestatura() {
    const filas = document.getElementById('tabla-principal').querySelectorAll('tbody tr');
    let suma = 0;
    let total = 0;
  
    filas.forEach(fila => {
      const estaturaCelda = fila.querySelector('.estatura'); 
      if (estaturaCelda) {
        const estatura = parseInt(estaturaCelda.textContent);
        if (!isNaN(estatura)) {
          suma += estatura;
          total++;
        }
      }
    });
  
    var promedio = total > 0 ? (suma / total).toFixed(2) : 0;
    suma = 0;
    total = 0;
    document.getElementById('valorPromedioesta').textContent = promedio;
    document.getElementById('tablita').style.display = "table";
  }



  function mostrarPromediogasto() {
    const filas = document.getElementById('tabla-principal').querySelectorAll('tbody tr');
    let suma = 0;
    let total = 0;
  
    filas.forEach(fila => {
      const gastoCelda = fila.querySelector('.gasto'); 
      if (gastoCelda) {
        const gasto = parseInt(gastoCelda.textContent);
        if (!isNaN(gasto)) {
          suma += gasto;
          total++;
        }
      }
    });
  
    var promedio = total > 0 ? (suma / total).toFixed(2) : 0;
    suma = 0;
    total = 0;
    document.getElementById('valorPromediogasto').textContent = promedio;
    document.getElementById('tablita2').style.display = "table";
  }

  function mostrarDesviacionEstandar() {
    const filas = document.getElementById('tabla-principal').querySelectorAll('tbody tr');
    let suma = 0;
    let total = 0;
    const valores = [];
    
    filas.forEach(fila => {
      const edadCelda = fila.querySelector('.edad');
      if (edadCelda) {
        const edad = parseInt(edadCelda.textContent);
        if (!isNaN(edad)) {
          valores.push(edad);
          suma += edad;
          total++;
        }
      }
    });
    const promedio = total > 0 ? (suma / total).toFixed(2) : 0;
  
    // Calcular la desviación estándar
    const varianza = valores.reduce((acc, val) => acc + (val - promedio) ** 2, 0) / (total > 1 ? total - 1 : 1);
    const desviacionEstandar = Math.sqrt(varianza).toFixed(2);
    console.log(desviacionEstandar);
    // Mostrar resultado
    document.getElementById('valorDesviacionEstandar').textContent = desviacionEstandar;
    document.getElementById('tabladesvi').style.display = "table";
    //aqui es la orta tabla------------------------------------------------------------------------------------------------
    
    
    function mostrarPromedio2() {
        const filas = document.getElementById('tabla-frecuencia-muestra-edad').querySelectorAll('tbody tr');
        let suma = 0;
        let total = 0;
      
        filas.forEach(fila => {
          const edadCelda = fila.querySelector('.edad');
          if (edadCelda) {
            const edad = parseInt(edadCelda.textContent);
            if (!isNaN(edad)) {
              suma += edad;
              total++;
            }
          }
        });
      
        var promedio = total > 0 ? (suma / total).toFixed(2) : 0;
        suma = 0;
        total = 0;
        document.getElementById('valorPromedio').textContent = promedio;
        document.getElementById('tablaPromedio').style.display = "table";
      }
      
      function mostrarPromedioestatura2() {
        const filas = document.getElementById('tabla-frecuencia-muestra-edad').querySelectorAll('tbody tr');
        let suma = 0;
        let total = 0;
      
        filas.forEach(fila => {
          const estaturaCelda = fila.querySelector('.estatura'); 
          if (estaturaCelda) {
            const estatura = parseInt(estaturaCelda.textContent);
            if (!isNaN(estatura)) {
              suma += estatura;
              total++;
            }
          }
        });
      
        var promedio = total > 0 ? (suma / total).toFixed(2) : 0;
        suma = 0;
        total = 0;
        document.getElementById('valorPromedioesta').textContent = promedio;
        document.getElementById('tablita').style.display = "table";
      }
    
    
    
      function mostrarPromediogasto2() {
        const filas = document.getElementById('tabla-frecuencia-muestra-edad').querySelectorAll('tbody tr');
        let suma = 0;
        let total = 0;
      
        filas.forEach(fila => {
          const gastoCelda = fila.querySelector('.gasto'); 
          if (gastoCelda) {
            const gasto = parseInt(gastoCelda.textContent);
            if (!isNaN(gasto)) {
              suma += gasto;
              total++;
            }
          }
        });
      
        var promedio = total > 0 ? (suma / total).toFixed(2) : 0;
        suma = 0;
        total = 0;
        document.getElementById('valorPromediogasto').textContent = promedio;
        document.getElementById('tablita2').style.display = "table";
      }
  }