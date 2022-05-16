var botones = document.getElementById("botones")  /* Creo una variable con la div botones del html */

CrearBotones()

var input = ''   /* String con la palabra incognita */
var array = []   /* Array  con la palabra incognita */
var vacio = ''   /* String con guiones bajos del largo de la incognita */
var vidas = 7
var ContinuaElJuego = false

function enviarTexto() {													 /* Esta funcion se va a correr al tocar el boton enviar */
	input = document.getElementById('input').value.toLowerCase()             /* Leo la palabra escrita en el input */
	Modifico_array_y_vacio ()    		                                     /* Creo mis variables array, vacio e input */
	vidas = 7
	ContinuaElJuego = true
	document.getElementById("input").value = ""                           /* Vacio el input */
	CrearBotones()		
	CrearIncognita (vacio)                                                /* Muestro en pantalla los guiones bajos */
																		  /* correspondientes a la ingognita */	
	for (let renglon of letras) {
		for (let letra of renglon) {
			let boton  = document.getElementById("boton" + letra)
			boton.onclick = function() {
				AdivinarUnaLetra (letra)  /* Hago que se pueda adivinar letras tocando los botones*/
			}
		}
	}
}

window.onkeydown = presionar_tecla

function presionar_tecla() {
	let tecla = event.key
	if (tecla == 'Enter') {
		enviarTexto()            /* Seteo como incognita la palabra enviada como input */
	}
	
	let abecedario = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']
	
	if (ContinuaElJuego) {
		for (letra of abecedario) {
			if (tecla.toLowerCase() == letra) {
				AdivinarUnaLetra (letra)  /* Hago que se pueda adivinar letras presionando el teclado */
			}
		}
	}
}

function AdivinarUnaLetra (letra) {
    let i = 0															/* Creo un indice de la posicion que estoy viendo */
    let letra_correcta = false
	for (let lugar of array) {
        if (letra == lugar) {
            vacio = remplazar (vacio, i, letra)							/* Agrego la letra correcta al string que muestro en pantalla */
            CrearIncognita (vacio)
            let intro = document.getElementById('boton' + letra)
			intro.style.backgroundColor = '#108010'						/* Pinto el boton de verde */
			letra_correcta = true
        }
        i++
    }
    if (!letra_correcta) {
        vidas -= 1
	    let intro = document.getElementById('boton' + letra)
		intro.style.backgroundColor = '#a00402'							/* Pinto el boton de rojo */
        if (vidas == 0) {
          	ContinuaElJuego = false
            CrearIncognita (input)										/* Muestro en pantalla la palabra correcta */
            alert ('perdiste')
        }
    }
    if (CompararListas (array, vacio)) {
    	ContinuaElJuego = false
        alert ('ganaste')
    }
}


/* Funciones Auxiliares */

function CrearBotones () {
	let letras = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
				  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
				  ['z', 'x', 'c', 'v', 'b' ,'n', 'm']]
	botones.innerHTML = ''
	for (let renglon of letras) {                     /* Creo un boton para cada letra del teclado */
		for (let letra of renglon) {
			botones.innerHTML += `
			<button class="botones" id="boton${letra}"> ${letra} </button>
			`
		}
		botones.innerHTML += `<br>`
	}
}

function Modifico_array_y_vacio () {
	array = input.split('')
	vacio = ''.padEnd(input.length,'_')
}

function CrearIncognita (vacio) {
	var incognita = document.getElementById("incognita")
	incognita.innerHTML = `
	<h1>${vacio}</h1>
	`
}

function CompararListas (list1, list2) {
	if (list1.length != list2.length) {
		return false
	}
	for (let i = 0; i < list1.length; i++) {
		if (list1[i] != list2[i])
			return false
	}
	return true
}

function remplazar (string, index, letra) {
    return string.substr(0, index) + letra + string.substr(index + 1)
}
