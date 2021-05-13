      const red = document.getElementById('red')
      const blue = document.getElementById('blue')
      const yellow = document.getElementById('yellow')
      const green = document.getElementById('green')
      const btnEmpezar = document.getElementById('btnEmpezar')
      const ULTIMO_NIVEL = 20
      swal ("Hola!!... Este es un simple juego de 'Simon Dice'", "En donde debes seguir la secuencia, el juego consta de "+ULTIMO_NIVEL+" niveles... ¡Buena Suerte!" ,"success")

      class Juego {
        constructor(){
          this.inicializar = this.inicializar.bind(this)
          this.inicializar()
          this.generarSecuencia()
          setTimeout(this.siguienteNivel,200)

        }


        inicializar() {
          this.siguienteNivel = this.siguienteNivel.bind(this)
          this.elegiColor = this.elegiColor.bind(this)
          this.toggleBtnEmpezar()
          this.nivel=1
          this.colores={
            red,
            blue,
            yellow,
            green
          }
        }
        toggleBtnEmpezar(){
          if (btnEmpezar.classList.contains("hide")) {
          btnEmpezar.classList.remove("hide")
        }else{
          btnEmpezar.classList.add("hide")
        }
        }

        generarSecuencia(){
          this.secuencia = new Array (ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() *4))
        }
        siguienteNivel(){
          this.subnivel = 0
          this.nombreAtributo = 'valor'
          this.iluminarSecuencia()
          this.agregarEventosClick()

        }

        transformarNumeroAColor(numero){
          switch (numero) {
            case 0:
              return 'red'
            case 1:
              return 'blue'
            case 2:
              return 'yellow'
            case 3:
              return 'green'
          }
        }
        transformarColorANumero(color){
          switch (color) {
            case 'red':
              return 0
            case 'blue':
              return 1
            case 'yellow':
              return 2
            case 'green':
              return 3
          }
        }

        iluminarSecuencia(){
          for (let i = 0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
             setTimeout(() => this.iluminarColor(color),1000 * i)
          }
        }
        iluminarColor(color){
          //Iluminar los colores
           this.colores[color].classList.add('light')
           //apagar (para que de el efecto del parpadeo)
           setTimeout(() => this.apagarColor(color),300)//300 milisegundos
        }
        apagarColor(color){
          this.colores[color].classList.remove('light')
        }
        agregarEventosClick(){
          this.colores.red.addEventListener('click',this.elegiColor)
          this.colores.green.addEventListener('click',this.elegiColor)
          this.colores.blue.addEventListener('click',this.elegiColor)
          this.colores.yellow.addEventListener('click',this.elegiColor)
        }
        eliminarEventosClick(){
          this.colores.red.removeEventListener('click',this.elegiColor)
          this.colores.green.removeEventListener('click',this.elegiColor)
          this.colores.blue.removeEventListener('click',this.elegiColor)
          this.colores.yellow.removeEventListener('click',this.elegiColor)
        }
        elegiColor(ev){
          const nombreColor = ev.target.dataset.color
          const numeroColor = this.transformarColorANumero(nombreColor)
          this.iluminarColor(nombreColor)
          if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel === this.nivel) {
              this.nivel++
              this.eliminarEventosClick()
              if (this.nivel === (ULTIMO_NIVEL + 1)) {
                this.ganoElJuego()
              }else {
                setTimeout(this.siguienteNivel,1000)
              }
            }
          }else {
          this.perdioElJuego()
          }
        }

        ganoElJuego(){
          swal ("You Won", "Me Impresiona tu capacidad de memorizar, Felicidades :D","success")
          .then(this.inicializar)
        }
        perdioElJuego(){
          swal ("Game Over", "Que mal, perdiste el juego en el nivel "+this.nivel+" :(","error")
          .then(() => {
            this.eliminarEventosClick()
            this.inicializar()

          })
        }
      }

      function empezarJuego() {
        var juego = new Juego()
      }