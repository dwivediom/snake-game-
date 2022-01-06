let inputDir = { x: 0, y: 0 };
const bgmusic = new Audio("../res/bgmusic.mp3");
const gameover = new Audio("../res/gameover.wav");
const turn = new Audio("res/turn.wav");
//const turn = new Audio("https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3");
const food = new Audio("../res/food.wav");
let second = 5;
let score = 0 ; 
let lastPaintTime = 0;
let snakearry = [
    { x: 13, y: 15 }
]
let snakefood = { x: 7, y: 8 };



// game function 
function main(ctime) {
    window.requestAnimationFrame(main)

    if ((ctime - lastPaintTime) / 1000 < 1 / second) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    
    function gameEngine() {
        
        // part1 : update the snake and food arry 
        function iscolide(snake){
            //if you bump on yourslef 
            for(i = 1 ; i<snakearry.length; i++){ 
                if(snake[i].x ===snake[0].x && snake[i].y===snake[0].y){
                    return true ;

                }
            }

            //if you bump into wall 
            if( snake[0].x >18 || snake[0].x < 0 || snake[0].y<0|| snake[0].y>18){
                return true; 
            }
           
        }


        if(iscolide(snakearry)){
            //  bgmusic.pause();
            gameover.play();

           
            alert(" game over ")
            inputDir = { x: 0, y: 0 };
            snakearry = { x: 13, y: 15 };
    
            score = 0 ;
            // bgmusic.play();
            
        }

        // when snake eat the the food 
               // if you eaten the food the food 

        if ( snakearry[0].x === snakefood.x && snakearry[0].y=== snakefood.y){
            food.play();
            score += 1 ; 
            second = second+0.2;
            scoreB.innerHTML= " Score:"+score; 
            // this if statement is for high score
            // if(score >= hiScoreval){
            //     hiScoreval = score; 
            //     localStorage.setItem("hiScore",JSON.stringify(hiScoreval));
            //     hiscorebox.innerHTML= `High Score: ${hiScoreval}`;

            // }

            snakearry.unshift({x:snakearry[0].x + inputDir.x, y:
                snakearry[0].y+ inputDir.y})
             let a = 2 ; 
             let b = 16 ;
             snakefood= { x: Math.round(a+ (b-a)*Math.random()), y: Math.round(a+ (b-a)*Math.random() )}
             
         }
        // moving the snake 
        for (let i  = snakearry.length-2; i  >=0 ; i--){
            // const element = array[i];
            snakearry[i+1]= {...snakearry[i]}   
            

        }
        snakearry[0].x += inputDir.x;
        snakearry[0].y += inputDir.y;

        // part2 : disply the snake and food arry 
        // display the snake
        board.innerHTML = "";
        snakearry.forEach((e, index) => {
            sankeElement = document.createElement('div');
            sankeElement.style.gridRowStart = e.y;
            sankeElement.style.gridColumnStart = e.x;

            if (index === 0) {
                sankeElement.classList.add("head");
            }
             else{
                sankeElement.classList.add("snake");
             }
            board.appendChild(sankeElement)
        })

        //disply the food 

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = snakefood.y;
        foodElement.style.gridColumnStart = snakefood.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);


    }





}

//game logic 

// let hiScore = localStorage.getItem("hiScore");
// if ( hiScore===null){
//   hiScoreval= 2; 
//  localStorage.setItem("hiScore",JSON.stringify(hiScoreval));
// }
// else{
  
//  hiScoreval= JSON.parse(hiScore);                  // high score error in this line 
//     hiscorebox.innerHTML=" High Score:" +hiScoreval;
     
// }

window.requestAnimationFrame(main)

window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 } // start the game 
    turn.play();

    switch (e.key) {
        case "ArrowUp":
            console.log(" arrowup ")
            inputDir.x = 0 ; 
            inputDir.y = -1;


            break;
        case "ArrowDown":
            console.log(" arrowdown  ")
            inputDir.x = 0 ; 
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log(" arrow left ")
            inputDir.x = -1; 
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log(" arrowr ")
            inputDir.x = 1; 
            inputDir.y = 0;
            break;






    }
})
