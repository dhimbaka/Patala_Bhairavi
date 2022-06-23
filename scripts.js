    function checkQuiz() {
        if(localStorage.lastSet == 1||localStorage.lang==null){
            document.getElementById("startQ").style.display="none";
        } else{
            document.getElementById("startQ").style.display="block";
        }
    }

    function checkQuiz2() {
        if(localStorage.lang==null){
            location.href = 'index.html';
            return;
            }
        
        if(localStorage.lastSet == 1){
            if(localStorage.qNo>9){
                localStorage.removeItem("quizScore");  
                location.href = 'index.html';
                return;  
                } else{
                loadQuiz();
                }
            } else{
            localStorage.lastSet == 1;
            localStorage.removeItem("qNo");
            loadQuiz();
            }
        }
    
    function langSelect() {
      if (localStorage.lang==null) {
        document.getElementById("telugu").style.color="white";
        document.getElementById("english").style.color="white";
        document.getElementById("startQ").textContent="సాహసం చేయరా ఢింబక!";
      } 
      if(localStorage.lang==1) {
        document.getElementById("telugu").style.color="#FFC107";
        document.getElementById("english").style.color="white";
        document.getElementById("startQ").textContent="సాహసం చేయరా ఢింబక!";
      }
      if(localStorage.lang==2) {
        document.getElementById("telugu").style.color="white";
        document.getElementById("english").style.color="#FFC107";
        document.getElementById("startQ").textContent="Go forth!";
      }
      checkQuiz();
    }

    function tel() {
        localStorage.lang = 1;
        langSelect();
    }

    function eng() {
        localStorage.lang = 2;
        langSelect();
    }
        
    var timeLeft = 10;
    var timerId = setInterval(countdown, 1000);
    function countdown() {
      if (timeLeft == -1) {
        clearInterval(timerId);
        // document.getElementById("timer").style.backgroundColor = "red";
        chooseAnswer();
      } else {
        document.getElementById("timer").innerHTML = timeLeft;
        timeLeft--;
      }
    }

    function loadQuiz() {
    document.getElementById("timer").innerHTML = "";
    const collection = document.getElementsByClassName("options");
    for (let i = 0; i < collection.length; i++) {
    collection[i].style.backgroundColor = "aliceblue"
    collection[i].setAttribute("style","cursor: pointer")
    collection[i].textContent="option"
    }

    localStorage.answer=2;

    document.getElementById("option1").setAttribute("onclick","option1()")
    document.getElementById("option2").setAttribute("onclick","option2()")
    document.getElementById("option3").setAttribute("onclick","option3()")
    document.getElementById("option4").setAttribute("onclick","option4()")
    document.getElementById("next").style.display="none";
    clearInterval(timerId);
    resetCountdown();
    scoreDisplay();  
    if (localStorage.qNo==null||isNaN(localStorage.qNo)){
        localStorage.qNo=1;
    } else {localStorage.qNo++}
    document.getElementById("qNo").textContent=localStorage.qNo;  
    }

    function option1() {
        if(localStorage.answer!=1){
            document.getElementById("option1").style.backgroundColor="red";
        } else{
            localStorage.quizScore++;
            scoreDisplay();
        }
        chooseAnswer();
    }

    function option2() {
        if(localStorage.answer!=2){
            document.getElementById("option2").style.backgroundColor="red";
        } else{
            localStorage.quizScore++;
            scoreDisplay();
        }
        chooseAnswer();
    }

    function option3() {
        if(localStorage.answer!=3){
            document.getElementById("option3").style.backgroundColor="red";
        } else{
            localStorage.quizScore++;
            scoreDisplay();
        }
        chooseAnswer();
    }

    function option4() {
        if(localStorage.answer!=4){
            document.getElementById("option4").style.backgroundColor="red";
        } else{
            localStorage.quizScore++;
            scoreDisplay();
        }
        chooseAnswer();
    }

    function chooseAnswer() {
        const collection = document.getElementsByClassName("options");
        for (let i = 0; i < collection.length; i++) {
            collection[i].removeAttribute('onclick');
            collection[i].style.cursor="default"
            if(localStorage.answer==i+1){
            collection[i].style.backgroundColor="#8BC34A";
            }   
        }       
        document.getElementById("next").style.display="block";
        clearInterval(timerId);
    }

    function scoreDisplay(){
        if (localStorage.quizScore==null||isNaN(localStorage.quizScore)){
            localStorage.quizScore=0;
        }
        document.getElementById("score").textContent=localStorage.quizScore;
    }

    function resetCountdown() {
    timeLeft=10;
    timerId = setInterval(countdown, 1000);
    }