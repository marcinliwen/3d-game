window.onload = () =>{
    
    const keys =document.getElementsByClassName('key');    

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
        })
        
    }
    
    //replace x with user input
    function replaceX(newValue, j){       
        var newOutput = userOutput.innerHTML; //current output                
        var tempStr = newOutput.slice(j,); //remember string with user input
        userOutput.innerHTML = newValue + tempStr;   //add user digit to new string  
    };
    
    
    var reste = document.querySelector('.reset');
    
    //reset vlues
    reste.addEventListener('click', function(){
        userOutput.innerHTML = "XXX";
        j = 1;
        newValue = "";
    })
}


   