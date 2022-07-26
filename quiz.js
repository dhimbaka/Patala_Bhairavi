    function resetQuiz() {
    document.getElementById("timer").innerHTML = "";    
    document.getElementById("qNo").textContent=localStorage.qNo;

    const collection = document.getElementsByClassName("options");
    for (let i = 0; i < collection.length; i++) {
    collection[i].style.backgroundColor = "aliceblue"
    collection[i].setAttribute("style","cursor: pointer")
    }

    document.getElementById("option1").setAttribute("onclick","option1()")
    document.getElementById("option2").setAttribute("onclick","option2()")
    document.getElementById("option3").setAttribute("onclick","option3()")
    document.getElementById("option4").setAttribute("onclick","option4()")
    document.getElementById("next").style.display="none";

    clearInterval(timerId);
    resetCountdown();
    scoreDisplay();     
    } 

    var timerId = setInterval(countdown, 1000);
    var timeLeft = 10; //time per question = 10 seconds

    function countdown() {
      if (timeLeft == -1) {
        clearInterval(timerId);
        chooseAnswer();
      } else {
        document.getElementById("timer").innerHTML = timeLeft;
        console.log("time left = "+timeLeft);
        timeLeft--;
      }
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
            collection[i].removeAttribute('onclick')
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