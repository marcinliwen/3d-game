window.onload = () =>{
        /**
     * 
     * 
     * register service worker
     */

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
                .register('./sw.js')
                .then(function() { console.log('Service Worker Registered'); });
    }
    let deferredPrompt;

	const addButton = document.getElementById('pwa-button');


	window.addEventListener('beforeinstallprompt', (e) => {
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault();
		// Stash the event so it can be triggered later.
		deferredPrompt = e;

		addButton.classList.add('show');
	});

	addButton.addEventListener('click', (e) => {
		// hide our user interface that shows our A2HS button
		addButton.classList.remove('show');
		addButton.style.display = "none"
		// Show the prompt
		deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice
		  .then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
			  console.log('User accepted the A2HS prompt');
			} else {
			  console.log('User dismissed the A2HS prompt');
			}
			deferredPrompt = null;
		  });
      });
      

    /**
     * main functions
     */


    /*
    const afterLoad = document.querySelector('.after-load')
    const loader = document.querySelector('.loader-container');
    setTimeout(function(){
        afterLoad.style.opacity =  1;
        loader.style.display = " none";

    }, 4000)
    */


    const keys = document.getElementsByClassName('key');    
    const counterContener = document.querySelector('.__counter');
    const correctDigits = document.querySelector('.__digits');
    const correctPlaces = document.querySelector('.__places');
    const headerTitle = document.querySelector('.header--title');
    const description = document.querySelector('.descritption');
    const correctness = document.querySelector('.correct--container');
    const svgPlay  = document.querySelector('.svg-play');
    const playNode = svgPlay.cloneNode(true);
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

    
    
    /**
     * start game
     */
    counterContener.addEventListener('click', function(){
        
        userOutput.style.color = "#fff";
        countRounds = 0;
        var headerhight = headerTitle.offsetHeight;
        userOutput.innerHTML = "XXX";
        correctDigits.innerHTML ="";
        correctPlaces.innerHTML = "";
        secretNumber = drawNumber();
        console.log(secretNumber);
        setTimeout(function(){
            userInputs.innerHTML = "";
            description.style.transitionDuration = ".55s";
            description.style.opacity = "0";
            counterContener.style.transitionDuration = ".55s";
            counterContener.style.transform = "scale(1)";
            header.style.transitionDuration = ".55s";
            header.style.height = "40%";
            setTimeout(function(){
                main.style.transform = "translate(0px, 0px)";
                main.style.transitionDuration = ".55s"
                counterContener.innerHTML = "";
                correctDigits.style.transitionDuration = ".55s";
                correctDigits.style.transform = "translate(-16px, 0px)";
                correctPlaces.style.transform = "translate(16px, 0px)";                
                headerTitle.style.marginTop = "-"+headerhight+"px";                
                display.style.opacity = "1";
                correctness.style.opacity = "1";
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
        if(currentRound < 15){
            displayCurrentRound(currentRound);
            if(checkInput(userInput, secretNumber, currentRound)){
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

    
    function checkInput(userInput, secretNumber, currentRound){
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
            youWin(currentRound);
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

    function youWin(currentRound){
        //userOutput.innerHTML = userInput;
        userOutput.style.color = "green";
        userInputs.innerHTML = "you found the secret number in "+ currentRound +" moves";
        setTimeout(function(){
            main.style.transform = "translate(0px, -330px)";
            counterContener.style.transform = "scale(1.5)";
            counterContener.innerHTML = "";
            counterContener.appendChild(playNode);
            header.style.height = "50%";
            correctDigits.style.transform = "translate(53px, 0px)";
            correctPlaces.style.transform = "translate(-52px, 0px)";
            correctness.style.opacity = "0";
            
        }, 550)
        j = 1;
        
        newValue = "";
        userInput = [];
    }
}



   