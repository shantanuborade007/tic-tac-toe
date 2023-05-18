  const boxes=document.querySelectorAll(".box");
  const gameInfo=document.querySelector(".game-info");
  const newGameBtn=document.querySelector(".btn");

  let currentPlayer;
  let gameGrid;

  const winningPositions=[
    [0,1,2],
    [3,4,5],                             
    [6,7,8],
    [0,3,6],
    [1,4,7],   
    [2,5,8],
    [0,4,8],
    [6,4,2]
  ];

  //lets create a finction to start the game 

  function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    //UI empty nahi ahe
    boxes.forEach((box,index)=>{
        box.innerText="";
        
    });
    boxes.forEach((box,index)=>{
        box.classList.remove("win");
        box.style.pointerEvents="all"
    });
    /* box.style.pointerEvents="pointer"; */
    gameInfo.innerText=`current Player -${currentPlayer}`;
  };

  initGame();

  function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }

    //UI update
    gameInfo.innerText=`current Player -${currentPlayer}`;
  }


function checkGameOver(){
    newGameBtn.classList.add("active");
    let answer="";

    winningPositions.forEach((position)=>{

        //all  3 boxes should be non empty and exactly same in value
        if( (gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="")
           && (gameGrid[position[0]]===gameGrid[position[1]])  && (gameGrid[position[1]]===gameGrid[position[2]] )){

            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }

            //disable pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            });
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
           }



           if(answer!==""){
                gameInfo.innerText=`Player -${answer} wins`;
                newGameBtn.classList.add("active");
                return ;
           }

           //when there is no winner
           let fillCount=0;
           gameGrid.forEach((box)=>{
                if(box!==""){
                    fillCount++;
                }
           });

           //board is filled
           if(fillCount===9){
            gameInfo.innerText="It's a Draw";
            newGameBtn.classList.add("active");
           }

    });   
}

  function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;
        //swap turns
        swapTurn();
        //check for win
        checkGameOver();

    }
  }

  boxes.forEach((box,index) => {
    box.addEventListener("click",()=>{
        handleClick(index);
   })
  });

  newGameBtn.addEventListener("click",initGame);