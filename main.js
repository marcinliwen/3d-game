window.onload = () =>{
    
    const keys = document.getElementsByClassName('key');    
    const counterContener = document.querySelector('.__counter');
    const correctDigits = document.querySelector('.__digits');
    const correctPlaces = document.querySelector('.__places');
    const headerTitle = document.querySelector('.header--title');
    const description = document.querySelector('.descritption');

    var countRounds = 0;
    //set user output
    var userOutput = document.querySelector('.user__input'); 
    userOutput.innerHTML = "XXX";
    var j = 1; //counter for digits
    var newValue = ""; //string for users input
    var userInputStrings = [];
    var userInput = []; //array for user input

    var secretNumber;
    // var secretNumber = [0, 0, 0];
    const main = document.getElementsByTagName('main')[0];
    const header = document.getElementsByTagName('header')[0];
    const display = document.querySelector('.display');

    counterContener.addEventListener('click', function(){
        var headerhight = headerTitle.offsetHeight;
        
        secretNumber = drawNumber();
        console.log(secretNumber);
        setTimeout(function(){
            description.style.opacity = "0";
            counterContener.style.transform = "scale(1)";
            header.style.height = "40%";
            setTimeout(function(){
                main.style.transform = "translate(0px, 0px)";
                counterContener.innerHTML = "";
                correctDigits.style.transform = "translate(-16px, 0px)";
                correctPlaces.style.transform = "translate(16px, 0px)";                
                headerTitle.style.marginTop = "-"+headerhight+"px";                
                display.style.opacity = "1";
                description.style.display = "none";

            }, 550);
            
            
        }, 350);
        
        
    })
/*
    //handle virtual keboard
    for(var i = 0; i < keys.length; i++){   
        keys[i].addEventListener('click', function(){   
            
            userValue = parseInt(this.value);

            if(!userInput.includes(userValue)){
                newValue += this.value;
                // alow chose digit 3 time   
                if( j < 4){
                    replaceX(newValue, j);
                    userInput.push(userValue);
                    j++;  
                }  
                if(j > 3){ //if user input 3 digits enable button to check
                    document.querySelector('.check').disabled = false;  
                }         
            }else{
                alert('you had used this number before')
            }
                    
        })  
    }
    
*/
    /**
     * 
     * for.. of loop
     * handle virtual keyboard
     */
    for(const key of keys){
        key.addEventListener('click', function(){             
            userValue = parseInt(this.value);
            if(!userInput.includes(userValue)){                
                // alow chose digit 3 time   
                if( j < 4){
                    newValue += this.value;
                    replaceX(newValue, j);
                    userInput.push(userValue);
                    j++;  
                }  
                if(j > 3){ //if user input 3 digits enable button to check
                    document.querySelector('.check').disabled = false;  
                }         
            }else{
                alert('you have used this number before')
            }
                    
        })  
    }
    
    //event listener for checking number - next round
    document.querySelector('.check').addEventListener('click', function(){
        var currentRound = countMyRound();
        //there is only 10 round in Game
        if(currentRound < 11){
            displayCurrentRound(currentRound);
            if(checkInput(userInput, secretNumber)){
                return;
            };
        }else{

            gameOver();
        };
        //disable check button
        this.disabled = true;
        //put current user input to array
        userInputStrings.push(newValue);
        //reset values
        resetValues();
        printUserInputs(userInputStrings);
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
        resetValues();
    })

    function resetValues(){
        userOutput.innerHTML = "XXX";
        j = 1;
        
        newValue = "";
        userInput = [];
    }
    //count game rounds
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
        userInputs.innerHTML = "game over";
        resetValues();
    }

    function drawNumber(){
        var secretNumber =[];
        for(var i = 0; i < 3; i++){
            var x = randomDigit();
            while(secretNumber.includes(x)){
                x = randomDigit();
            }
            secretNumber.push(x);
        }
        return secretNumber;
    }

    function randomDigit(){
        return Math.floor((Math.random() * 10) );
    }

    
    function checkInput(userInput, secretNumber){
        console.log(userInput );
        var position = 0;
        var correct = 0;
        for(var i = 0; i < 3; i++){
            if(userInput[i]==secretNumber[i]){
                position += 1;
            };
            if(secretNumber.includes(userInput[i])){
                correct += 1;
            }
        }
        if(position == 3){
            correctDigits.innerHTML = 3;
            correctPlaces.innerHTML = 3;
            console.log('win');
            youWin();
            return true;
        }else{
            correctDigits.innerHTML = correct;
            correctPlaces.innerHTML = position;
            console.log(
                'correct position: '+ position +"\n"+'correct digits: ' + correct
            )
        }
    }

    const userInputs = document.querySelector('.user_inputs');
    function printUserInputs(userInputStrings){
        userInputs.innerHTML = userInputStrings.join(' ');
    }

    function youWin(){
        //userOutput.innerHTML = userInput;
        userOutput.style.color = "green";
        userInputs.innerHTML = "you win!";
        setTimeout(function(){
            main.style.transform = "translate(0px, -330px)";
            counterContener.style.transform = "scale(1.5)";
            header.style.height = "50%";
        }, 550)
        //j = 1;        
        //newValue = "";
        //userInput = [];
    }
}



   