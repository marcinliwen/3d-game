window.onload = () =>{
    
    const keys = document.getElementsByClassName('key');    
    const counterContener = document.querySelector('.__counter');
   
    var countRounds = 0;


    //set user output
    var userOutput = document.querySelector('.user__input'); 
    userOutput.innerHTML = "XXX";

    var j = 1; //counter for digits
    var newValue = ""; //string for users input

    //handle virtual keboard
    for(var i = 0; i < keys.length; i++){
        keys[i].addEventListener('click', function(){   
            newValue += this.value;
            // alow chose digit 3 time   
            if( j < 4){
                replaceX(newValue, j);
                j++;  
            }  
            if(j > 3){ //if user input 3 digits enable button to check
                document.querySelector('.check').disabled = false;  
            }                 
        })  
    }
    
    
    
    //event listener for checking number - next round
    document.querySelector('.check').addEventListener('click', function(){
        var currentRound = countMyRound();
        //there is only 10 round in Game
        if(currentRound < 11){
            displayCurrentRound(currentRound);
        }else{
            gameOver();
        };
        //disable check button
        this.disabled = true;
        //reset values
        resetValues();
    })

    //replace x with user input
    function replaceX(newValue, j){       
        var newOutput = userOutput.innerHTML; //current output                
        var tempStr = newOutput.slice(j,); //remember string with user input
        userOutput.innerHTML = newValue + tempStr;   //add user digit to new string  
    };
    
    
    var reset = document.querySelector('.reset');
    
    //reset vlues
    reset.addEventListener('click', function(){
        
    })

    function resetValues(){
        userOutput.innerHTML = "XXX";
        j = 1;
        newValue = "";
    }
    //count game
    function countMyRound(){
       return countRounds += 1;
    }

    //display current game round
    function displayCurrentRound(num){        
        
        if (counterContener.hasChildNodes()) {
            counterContener.removeChild(counterContener.childNodes[0]);
        }
        var text = document.createTextNode(num);
        var p = document.createElement("P");
        p.appendChild(text);
        counterContener.appendChild(p);            
    }


    //game over
    function gameOver(){
        alert('game over')
    }
}



   