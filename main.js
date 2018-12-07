window.onload = () =>{
    const keys =document.getElementsByClassName('key');
    
    var userOutput = document.querySelector('.user__input');
    userOutput.innerHTML = "XXX";
    var j = 1;
    var newValue = "";
    for(var i = 0; i < keys.length; i++){
        keys[i].addEventListener('click', function(){               
            if( j < 4){                    
                newValue += this.value;  
                var newOutput = userOutput.innerHTML;                 
                var tempStr = newOutput.slice(j,);
                userOutput.innerHTML = newValue + tempStr;    
                j++;                    
            }
        })
        
    }
       
    var reste = document.querySelector('.reset');
    
    reste.addEventListener('click', function(){
        userOutput.innerHTML = "XXX";
        j = 1;
        newValue = "";
    })
}


   