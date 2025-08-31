 document.addEventListener('DOMContentLoaded', function () {
            const holes = document.querySelectorAll('.hole');

            const startBtn = document.getElementById('startBtn');
            const stopBtn = document.getElementById('stopBtn');

            const scoreBoard = document.getElementById('score');
            const timerBoard = document.getElementById('timer');

            let score = 0;
            let timer;
            //stop button click ha nler
            stopBtn.addEventListener('click', () => stopHandler());
            //start btn click
            startBtn.addEventListener('click', () => startHandler());


            // Start Button click Handler
            function startHandler() {
                startBtn.disabled = true;
                stopBtn.disabled = false;
                score = 0;
                scoreBoard.innerText = `Score :${score}`
                timer = 30;
                timerBoard.innerText = `Timer :${timer}`;
                assignThief();
                beginTimer();
            }

            // holes click handler
            holes.forEach((hole, index) => hole.addEventListener('click', () => {
                console.log(index);
                if(hole.classList.contains('bg-img')){
                    hole.classList.remove('bg-img');
                    score++;
                    assignThief();
                }else if(startBtn.disabled) {score--;}
                scoreBoard.innerText = `Score : ${score}`;
            }));


            //Assign thief
            let prevIndex = -1;
            function assignThief(){
                let moleIndex;
                do{
                    moleIndex = Math.floor(Math.random() * 9);
                }
                while(prevIndex == moleIndex);

                prevIndex = moleIndex;
                holes.forEach((hole,index) => {
                    hole.classList.remove('bg-img')
                    if(index === moleIndex){
                        hole.classList.add('bg-img')
                    }
                })
            }

            //begin timer
            let intervalId;
            const beginTimer = () => {
                clearInterval(intervalId);
                intervalId = setInterval(showTimer, 1000);
            }

            //show timer
            function showTimer(){
               timer--;
                if(timer <= 0){ 
                    startBtn.disabled = false;
                    stopBtn.disabled = true;
                    clearInterval(intervalId)
                    stopHandler();
                    timerBoard.innerText = `Timeout`;
                    return;
                }
            
                timerBoard.innerText = `Timer :${timer}`;
               
            }

            //stop button handler
            function stopHandler(){
                holes.forEach((hole,index) => hole.classList.remove('bg-img'));
                clearInterval(intervalId);
                timer = 0;
                startBtn.disabled = false;
                stopBtn.disabled = true;
                timerBoard.innerText = "Stopped"
            }
        });