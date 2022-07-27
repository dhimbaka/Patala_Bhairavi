// Common Services - this could be shared in different pages
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

    const SUPABASE_URL = 'https://letehqikkyplgnppugbg.supabase.co'
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxldGVocWlra3lwbGducHB1Z2JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU0MTU1MTMsImV4cCI6MTk3MDk5MTUxM30.uZ2whAkxVRv0Raub5dLLFJO1S-9ude6ljezpzKzkC8w'    
    const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    async function setNo(){
            const { data, error } = await _supabase
            .from('public_quiz')
            .select('set_no')
            .limit(1)
            .order('set_no', { ascending: false })
           
            if(!error) {
            data.forEach(function(item){
            localStorage.onlineSet=item.set_no})
            } 
            console.log("set no = "+localStorage.onlineSet);

            function startButton(){

                if(localStorage.lang==null){
                    document.getElementById("startQ").style.display="none";
                    document.getElementById("message").style.display="none";  
                    return    
                }   
            
                if(localStorage.lastSet == localStorage.onlineSet) {
                    document.getElementById("startQ").style.display="none";
                    document.getElementById("message").style.display="block";  
                    return    
                    } 
                
                document.getElementById("startQ").style.display="block";
                document.getElementById("message").style.display="none";    
            }      
            
            function tel() {
                localStorage.lang = 'tel';
                document.getElementById("logo").src="./resources/images/tel_logo1.png";
                document.getElementById('tel').style.color="#FFC107";
                document.getElementById('eng').style.color="white";
                document.getElementById("message").textContent="రేపు రా ఢింబక";
                document.getElementById("startQ").textContent="సాహసం చేయరా ఢింబక!"
                startButton();
                }
            
            function eng() {
                localStorage.lang = 'eng';
                document.getElementById("logo").src="./resources/images/eng_logo1.png";
                document.getElementById('tel').style.color="white";
                document.getElementById('eng').style.color="#FFC107";
                document.getElementById("message").textContent="No more quizzes today"
                document.getElementById("startQ").textContent="Go forth!";
                startButton();    
                }
                
            startButton();
            if(localStorage.lang=='tel'){tel()};
            if(localStorage.lang=='eng'){eng()};
            
            document.getElementById('tel').addEventListener('click',tel);
            document.getElementById('eng').addEventListener('click',eng);

            }

    async function currentquiz(){

        if (localStorage.qNo>9){ //reset all stats at the end of each set
            if (localStorage.totalScore==null||isNaN(localStorage.totalScore)){
                localStorage.totalScore=0;
                localStorage.percent=0;
            } 
            localStorage.totalScore = localStorage.totalScore + localStorage.quizScore;
            localStorage.lastSet = localStorage.lastSet+1;
            localStorage.percent = (localStorage.totalScore*100)/(localStorage.lastSet*10);
            localStorage.removeItem("qNo");
            localStorage.removeItem("quizScore");
            localStorage.removeItem("localStorage.answer");
            location.href = 'scores.html';
            return;
        }
    
        if (localStorage.lastSet==null||isNaN(localStorage.lastSet)){
            localStorage.lastSet=0;
            }

    if (localStorage.qNo==null||isNaN(localStorage.qNo)){
    localStorage.qNo=1;
    } else {localStorage.qNo++}

        const {data, error} = await _supabase
        .from('public_quiz')
        .select('*')
        .eq('set_no', localStorage.lastSet+1)
        .eq('q_no', localStorage.qNo);
        
        if (error){
        // TODO: handle it
        location.href = 'index.html';
        localStorage.qNo--; 
        console.log('error',error);
        }
        console.log("running set #"+(localStorage.lastSet));
        return data[0];
    }

export {setNo,currentquiz}