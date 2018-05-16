async function handler () {

    try { await function1(); } catch(err) {;}
    
    async function function1(){ 
        console.log("stap 1")
        try { await function2(); } catch(err) {;}
    };

    async function function2(){
        
        setTimeout(function(){someTimedFunction(); }, 3000);

        async function someTimedFunction(){
          console.log("stap 2");
          try { await function3(); } catch(err) {;}
        };
    };

    function function3(){ 
      console.log("stap 3")
    };  


}


handler();