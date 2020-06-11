import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  nroColumnas: number;
  tabla: number[][];
  mostrarTabla: boolean;

  constructor(){
    this.mostrarTabla = false;
  }

  generarTabla(){
    this.tabla = [];
    this.tabla[0] = [];

    // asignacion primera fila
    let num = 1;
    for( let i = 0; i < this.nroColumnas; i++ ){
      this.tabla[0][i] = num;
      num = num*2;
    }
    
    // inicializacion filas
    let nroFilas = Math.pow(2, this.nroColumnas-1);
    for (let i = 1; i < nroFilas; i++){
      this.tabla[i] = [];
    }

    // generacion de tabla
    for (let col = 0; col < this.nroColumnas; col++){
      let contador = 1;
      for (let row = 1; row < nroFilas; row++){
        if(contador == this.tabla[0][col]){
          contador = 1;
          this.tabla[row][col] = this.tabla[row-1][col] + this.tabla[0][col] + 1;
        }
        else {
          this.tabla[row][col] = this.tabla[row-1][col] + 1;
          contador++;
        }
      }
    }

    this.mostrarTabla = true;
  }

  descifrarNumero(){
    let resultado = 0;
    for( let col = 0; col < this.nroColumnas; col++ ){
      let estaEnColumna = prompt(`¿El número que piensas se encuentra en la columna ${col+1}? \n1: Si \n2: No`)

      // si el usuario cancela
      if ( estaEnColumna == null ){
        break;
      }
      // si el usuario no cancela
      else if ( estaEnColumna == '1' || estaEnColumna == 'Si' || estaEnColumna == 'si' ){
        resultado = resultado + this.tabla[0][col];
      }
    }

    // si el usuario no cancela x2
    if ( resultado != 0 ){
      alert(`Tu número es: ${resultado}`);
    }
  }

}
