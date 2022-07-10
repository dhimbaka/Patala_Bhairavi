// Common Services - this could be shared in different pages
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

    const SUPABASE_URL = 'https://letehqikkyplgnppugbg.supabase.co'
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxldGVocWlra3lwbGducHB1Z2JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU0MTU1MTMsImV4cCI6MTk3MDk5MTUxM30.uZ2whAkxVRv0Raub5dLLFJO1S-9ude6ljezpzKzkC8w'    
    const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    async function setNo(){

            const { data, error } = await _supabase
            .from('public_quiz')
            .select('*')
            .limit(1)
           
            if(!error) {
            data.forEach(function(item){
            localStorage.onlineSet=item.set_no})
            } 

            console.log("running function 1");

            }


    async function quiz(){
        const {data, error} = await _supabase
        .from('public_quiz')
        .select('*')
        .eq('q_no', localStorage.qNo);
        
        if (error){
            // TODO: handle it
            location.href = 'index.html';
            localStorage.qNo--; 
            console.log('error',error);
        }
        console.log("running function 2");

        return data[0];
    }

export {setNo,quiz}