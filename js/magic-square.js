document.addEventListener("DOMContentLoaded", function() {
  var magicSquare = document.getElementById("magic-square"),
      msgAlert = document.getElementById("square-msg"),
      btn = document.getElementById("btn");

  function resultSquare(msg){
  	msgAlert.innerHTML = msg;
  }

  var square = new Array(3);
  for (i = 0; i < 3; i++){
      square[i]=new Array(3);
  }

  magicSquare.addEventListener("keyup", function(ev){
  	var id = ev.target.id,
  	    rowAndColumn = id.split("");
  	if (!saveValue(rowAndColumn[1],rowAndColumn[2],ev.target.value)){
  		ev.target.value = "";
  	}
    
  });

  btn.addEventListener("click", function(ev){
    if (checkSquare()){
      resultSquare("Excelente!!!");
    } else {
      resultSquare("Intentelo nuevamente");
    }
  });

  function saveValue(row,column,value){
          if (value!="") {
              if(isNumber(value)){
                 	 if (validateRange(value)){
                 	 	if(validateRepeated(value)){
                 	 		square[row][column] = value;
                 			//console.log(square[row][column] + " fila: " + row + " columna: " + column);
                 			resultSquare("- -");
                  		return true; 
                 	 	}
                 	 	resultSquare(value + " ya se encuentra ingresado");
                 	 	square[row][column] = 0;   
                      return false; 
                 	 }
                 	 resultSquare("Debe ingresar un número entre 1 y 9");
                 	 square[row][column] = 0;   
                   return false; 
              }
              resultSquare("Debe ingresar un número entero");   
              square[row][column] = 0;   
          	return false;          
          }    
          resultSquare("- -");
          square[row][column] = 0;   
          return false;      
  }

  function printSquare(){
       for (i=0; i<3; i++) {
       	console.log("_______");
          for (e=0; e<3; e++){
              console.log(square[i][e]);
          }
      }
  }

  function validateRepeated(value){
      var result = true;
      for (i=0; i<3; i++) {
          for (e=0; e<3; e++){
             if (value===square[i][e]){
                  //console.log("repetido");
                  result = false;
             }
          }
      }
      return result;
  }

  function isNumber(value){
  	return !(isNaN(value)) && (value % 1 == 0);
  }      

  function validateRange(value){
  	return ((value>0) && (value<=9));
  }

  function checkSquare(){
    var sum = 0;
    var com = 0;
    var check = false;
    for (var j = 0;j< 2; j++) {
      for (i = 0;i < 3;i++) {
        sum = 0;
        for (e = 0;e < 3;e++){
          if (j === 0) {
            sum = sum + parseInt(square[i][e]);
          } else{
            sum = sum + parseInt(square[e][i]);
          }  
        }
        if (sum == 15){
          com++;
        } 
      }
    };
    sum = 0;
    for (var c = 0;c < 3; c++) { 
      sum = sum + parseInt(square[c][c]);
    };
    if (sum == 15){
          com++;
    }
    if ((parseInt(square[0][2]) + parseInt(square[1][1]) + parseInt(square[2][0])) == 15){
      com++;
    }
    if (com===8){
      return true;
    } else{
      return false;
    }
  }
});