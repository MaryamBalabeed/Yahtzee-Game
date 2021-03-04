
var min = 1;
var max = 24;
let arr = [];
let arr2 = [];
// The values of the dice when rolling player 1
let cubeArr = { one :0, two:0, three:0, four:0, five:0, six:0};

// The count of values when rolling the dice   player 1
let cubeCount = {one: 0, two:0, three:0, four:0, five:0, six:0};

// The values of the dice when rolling  player 2
let cubeArr2 = {one: 0, two:0, three:0, four:0, five:0, six:0};

// The count of values when rolling the dice   player 2
let cubeCount2 = {one: 0, two:0, three:0, four:0, five:0, six:0};

// Get the modal with ID
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// when the page load the modal show
$(window).on('load',function(){
    modal.style.display = "visible";
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

//When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//when click the button (roll the dice) for player 1
$('#roll').click(function(){
    var cubes = $('#player1:not(.save)');
    cubes.each(function(){
        roll($(this));
        console.log($(this));
        
    });

    
//when click the dices and hold them for player 1
    var cubeupdate = $('#player1.save')
    cubeupdate.each(function(){
        $(this)
        console.log(this);
        const x=parseInt(this.style.transform.split(' ')[0].split('(')[1].split('d')[0])
        const y=parseInt(this.style.transform.split(' ')[1].split('(')[1].split('d')[0])
        //console.log('HHHHH',Resultplayer1(x,y));
        Resultplayer1(x,y);
        display();
    });
    
     console.log(cubeArr);
     console.log(arr);
     cubeArr = {one: 0, two:0, three:0, four:0, five:0, six:0};
     cubeCount = {one: 0, two:0, three:0, four:0, five:0, six:0};
     arr = [];
});


//when click the button (roll the dice) for player 2
$('#roll2').click(function(){
    var cubes = $('#player2:not(.save)');
    cubes.each(function(){
      roll2($(this));
    });

    //when click the dices and hold them for player 2
    var cubeupdate2 = $('#player2.save')
    cubeupdate2.each(function(){
        $(this)
        console.log(this);
        const x=parseInt(this.style.transform.split(' ')[0].split('(')[1].split('d')[0])
        const y=parseInt(this.style.transform.split(' ')[1].split('(')[1].split('d')[0])
        //console.log('HHHHH',Resultplayer1(x,y));
        Resultplayer2(x,y);
        display2();
    });

    cubeArr2 = {one: 0, two:0, three:0, four:0, five:0, six:0};
    cubeCount2 = {one: 0, two:0, three:0, four:0, five:0, six:0};
    arr2 = [];
});

//when click the dices and hold them
$('.cube').click(function(){
    if($(this).hasClass("save")){
        $(this).removeClass("save");
    }else{
        $(this).addClass("save");
        //$(this).display();
    }
    console.log($(this));
    

});


let only3Rolls = 1;
let only3Rolls2 = 1;

// After 3 rolls the button is disabled for player 1
    $('#roll').click(function(){
        $('#roll2').prop('disabled', false);
        $('#roll2').text("Click to roll the dice");
    if((only3Rolls % 3) === 0){
        $('#roll').prop('disabled', true);
        $('#roll').text("You only have three rolls !"); 
    }
    only3Rolls++;
    //console.log("Number of Rolls:");
    //console.log(only3Rolls);
    });
    
// After 3 rolls the button is disabled for player 2
    $('#roll2').click(function(){
        $('#roll').prop('disabled', false);
        $('#roll').text("Click to roll the dice");
        only3Rolls = 1;
        if((only3Rolls2 % 3) === 0){
             $('#roll2').prop('disabled', true);
             $('#roll2').text("You only have three rolls !");  
        }
    only3Rolls2++;
    console.log("Number of Rolls:");
    console.log(only3Rolls);
    });

// Random values for the dice 
function getRandom(max, min){
    return (Math.floor(Math.random() * (max-min)) + min) * 90;
}

function rotation(n , m ) {
    return ((n % m)+ m) % m;
}

// Rotate the cubes based on random values for player 1
function roll(dice) {
    let xValue = getRandom(max,min);
    let yValue = getRandom(max,min);
    
    dice.css('-webkit-transform', 'rotateX('+xValue+'deg) rotateY('+yValue+'deg)');
    
    Resultplayer1(xValue,yValue);
    display();

}


// The result for rolling the dice player 1
function Resultplayer1(xValue, yValue) {
    console.log("result function");
    let countX = rotation(xValue / 90, 4);
    if (countX === 1) {
        // Bottom face
        cubeArr.six += 1*6;
        cubeCount.six +=1;
        arr.push(6);
        return 6;
       
    } if (countX === 3) {
        // Top face
        cubeArr.five += 1*5;
        cubeCount.five +=1;
        arr.push(5);
        return 5;
    }

    //console.log(count);
    // It can be 0 (no rotation) or 2 (180 degrees) so We add countX
    let countY = rotation(yValue / 90 + countX, 4);
    // Front face
    if(countY === 0){
        cubeArr.one += 1*1;
        cubeCount.one +=1;
        arr.push(1);
    } // Left face
    if(countY === 1){
        cubeArr.four += 1*4;
        cubeCount.four +=1;
        arr.push(4);
    } // Back face
    if(countY === 2){
        cubeArr.two += 1*2;
        cubeCount.two +=1;
        arr.push(2);
    } // Right face
    if(countY === 3){
        cubeArr.three += 1*3; 
        cubeCount.three +=1; 
        arr.push(3); 
    }
    return [1, 4, 2, 3][countY];
    
    
}



// Display the result on the table for player 1
function display(){
    console.log("display function");
    
    let one = cubeArr.one;
    if(!($("#ones").hasClass("avoid-clicks"))){
    $("#ones").text(one);
    }
    //console.log(cubeArr.two);
    let two = cubeArr.two;
    if(!($("#twos").hasClass("avoid-clicks"))){
    $("#twos").text(two);
    }

    let three = cubeArr.three;
     if(!($("#threes").hasClass("avoid-clicks"))){
    $("#threes").text(three);
     }
    let four = cubeArr.four;
    if(!($("#fours").hasClass("avoid-clicks"))){
    $("#fours").text(four);
    }
    let five = cubeArr.five;
    if(!($("#fives").hasClass("avoid-clicks"))){
    $("#fives").text(five);
    }
    //console.log(cubeArr.six);
    let six = cubeArr.six;
    //cubeArr.six = 0;
    if(!($("#sixes").hasClass("avoid-clicks"))){
    $("#sixes").text(six);
    }
    if(!($("#ThreeKind").hasClass("avoid-clicks"))){
    $("#ThreeKind").text(0);}
    if(!($("#FourKind").hasClass("avoid-clicks"))){
    $("#FourKind").text(0);}
    if(!($("#yahtzee").hasClass("avoid-clicks"))){
    $("#yahtzee").text(0);}
    if(!($("#FullHouse").hasClass("avoid-clicks"))){
    $("#FullHouse").text(0);}
    if(!($("#smallST").hasClass("avoid-clicks"))){
        $("#smallST").text(0);}
    if(!($("#largST").hasClass("avoid-clicks"))){
        $("#largST").text(0);}

   for(key in cubeCount){
       if(cubeCount[key] === 3){
        if(!($("#ThreeKind").hasClass("avoid-clicks"))){
        $("#ThreeKind").text(cubeArr[key]);
       }}
       if(cubeCount[key] === 4){
        if(!($("#FourKind").hasClass("avoid-clicks"))){
        $("#FourKind").text(cubeArr[key]);
       }}
       if(cubeCount[key] === 5){
        if(!($("#yahtzee").hasClass("avoid-clicks"))){
        $("#yahtzee").text(cubeArr[key]);
       }}
       if(cubeCount[key] === 3 ){
        for(key in cubeArr){
           if(cubeCount[key] === 2){
            if(!($("#FullHouse").hasClass("avoid-clicks"))){
            $("#FullHouse").text("25");
           }}
        }
       }
   } 

   let chance = 0;
   for( key in cubeArr){
       chance += cubeArr[key];
   }
   if(!($("#chance").hasClass("avoid-clicks"))){
   $("#chance").text(chance);
   }
   //arr = [2,3,4,5];
   console.log(arr);
   arr.sort();
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] === arr[i+1]){
            arr.splice(arr[i]);
        }
        if (arr[i] === arr[i + 1]-1 && arr[i + 1] === arr[i + 2]-1 && arr[i + 2] === arr[i + 3]-1) {
            console.log("small 1 detected");
            if(!($("#smallST").hasClass("avoid-clicks"))){
                $("#smallST").text(30);
             }
         
        }
        if (arr[i] === arr[i + 1]-1 && arr[i + 1] === arr[i + 2]-1 && arr[i + 2] === arr[i + 3]-1 && arr[i + 3] === arr[i + 4]-1 ) {
            if(!($("#largST").hasClass("avoid-clicks"))){
                $("#largST").text(40);
            }
        }
 
      }


}


// Rotate the cubes based on random values for player 2
function roll2(dice) {
    let xValue = getRandom(max,min);
    let yValue = getRandom(max,min);
    
    dice.css('-webkit-transform', 'rotateX('+xValue+'deg) rotateY('+yValue+'deg)');
    console.log(Resultplayer2(xValue,yValue));
    display2();
}

// The result for rolling the dice player 2
function Resultplayer2(xValue, yValue) {
    console.log("Result2");
    let countX = rotation(xValue / 90, 4);
    
        if (countX === 1) {
            // Bottom face
            cubeArr2.six += 1*6;
            cubeCount2.six +=1;
            arr2.push(6);
            return 6;
        }
    
    if (countX === 3) {
        // Top face
        cubeArr2.five += 1*5;
        cubeCount2.five +=1;
        arr2.push(5);
        return 5;
    }
    //console.log(count);
    // It can be 0 (no rotation) or 2 (180 degrees) so We add countX
    let countY = rotation(yValue / 90 + countX, 4);
    // Front face
    if(countY === 0){
        cubeArr2.one += 1*1;
        cubeCount2.one +=1;
        arr2.push(1);
    } // Left face
    if(countY === 1){
        cubeArr2.four += 1*4;
        cubeCount2.four +=1;
        arr2.push(4);
    } // Back face
    if(countY === 2){
        cubeArr2.two += 1*2;
        cubeCount2.two +=1;
        arr2.push(2);
    } // Right face
    if(countY === 3){
        cubeArr2.three += 1*3;
        cubeCount2.three +=1;
        arr2.push(3);
    }
    return [1, 4, 2, 3][countY];
}


// Display the result on the table for player 2
function display2(){

    console.log("display2");
    let one = cubeArr2.one;
    if(!($("#ones2").hasClass("avoid-clicks2"))){
    $("#ones2").text(one);
    }
    //console.log(cubeArr.two);
    let two = cubeArr2.two;
    if(!($("#twos2").hasClass("avoid-clicks2"))){
    $("#twos2").text(two);
    }
    let three = cubeArr2.three;
     if(!($("#threes2").hasClass("avoid-clicks2"))){
    $("#threes2").text(three);
     }
    let four = cubeArr2.four;
    if(!($("#fours2").hasClass("avoid-clicks2"))){
    $("#fours2").text(four);
    }
    let five = cubeArr2.five;
    if(!($("#fives2").hasClass("avoid-clicks2"))){
    $("#fives2").text(five);
    }
    //console.log(cubeArr.six);
    let six = cubeArr2.six;
    //cubeArr.six = 0;
    if(!($("#sixes2").hasClass("avoid-clicks2"))){
    $("#sixes2").text(six);
    }
    if(!($("#ThreeKind2").hasClass("avoid-clicks2"))){
    $("#ThreeKind2").text(0);}
    if(!($("#FourKind2").hasClass("avoid-clicks2"))){
    $("#FourKind2").text(0);}
    if(!($("#yahtzee2").hasClass("avoid-clicks2"))){
    $("#yahtzee2").text(0);}
    if(!($("#FullHouse2").hasClass("avoid-clicks2"))){
    $("#FullHouse2").text(0);}
    if(!($("#smallST2").hasClass("avoid-clicks2"))){
        $("#smallST2").text(0);}
    if(!($("#largST2").hasClass("avoid-clicks2"))){
        $("#largST2").text(0);}

   for(key in cubeCount2){
       if(cubeCount2[key] === 3){
        if(!($("#ThreeKind2").hasClass("avoid-clicks2"))){
        $("#ThreeKind2").text(cubeArr2[key]);
       }}
       if(cubeCount2[key] === 4){
        if(!($("#FourKind2").hasClass("avoid-clicks2"))){
        $("#FourKind2").text(cubeArr2[key]);
       }}
       if(cubeCount2[key] === 5){
        if(!($("#yahtzee2").hasClass("avoid-clicks2"))){
        $("#yahtzee2").text(cubeArr2[key]);
       }}
       if(cubeCount2[key] === 3 ){
        for(key in cubeArr2){
           if(cubeCount2[key] === 2){
            if(!($("#FullHouse2").hasClass("avoid-clicks2"))){
            $("#FullHouse2").text("25");
           }}
        }
       }
   } 

   let chance = 0;
   for( key in cubeArr2){
       chance += cubeArr2[key];
   }
   if(!($("#chance2").hasClass("avoid-clicks2"))){
   $("#chance2").text(chance);
   }
   let counter = 1;
   //arr = [2,3,4,5];
   console.log(arr2);
   arr2.sort();
    for (let i = 0; i < arr2.length; i++) {
        
        if (arr2[i] === arr2[i + 1]-1 && arr2[i + 1] === arr2[i + 2]-1 && arr2[i + 2] === arr2[i + 3]-1) {
             console.log("small 1 detected");
            if(!($("#smallST2").hasClass("avoid-clicks2"))){
            $("#smallST2").text(30);
         }
        }
        if (arr2[i] === arr2[i + 1]-1 && arr2[i + 1] === arr2[i + 2]-1 && arr2[i + 2] === arr2[i + 3]-1 &&arr2[i + 3] === arr2[i + 4]-1) {
            if(!($("#largST2").hasClass("avoid-clicks2"))){
                $("#largST2").text(40);
            }
        }
 
      }
   
}

//when click the table values and save them player 1
let sumArray = [];
var Total = 0;
let finalScores = {one: 0, two:0, three:0, four:0, five:0, six:0};
$("#scorTable").on("click", "td:nth-child(2)", function() {
    $('#roll').prop('disabled', true);
    $('#roll').text("Your turn is over");
    var item = $(this)
    console.log(item);
    sumArray.push(parseInt($(this).text()));

    if($(this).is("#ones")){
        finalScores.one = parseInt($("#ones").text());
    }
    if($(this).is("#twos")){
        finalScores.twos = parseInt($("#twos").text());
    }
    if($(this).is("#threes")){
        finalScores.threes = parseInt($("#threes").text());
    }
    if($(this).is("#fours")){
        finalScores.fours = parseInt($("#fours").text());
    }
    if($(this).is("#fives")){
        finalScores.fives = parseInt($("#fives").text());
    }
    if($(this).is("#sixes")){
        finalScores.sixes = parseInt($("#sixes").text());
    }
    let sum = 0;
    for(key in finalScores){
        sum += finalScores[key];
        $("#sum").text(sum);
    }
    let bonus = parseInt($("#sum").text());
    if( bonus >= 100){
        $("#bonus").text(100);
    }
    
    console.log(finalScores);
      var Total = sumArray.reduce(function(a, b){
        return a + b;
    }, 0)
      $("#totalSC").text(Total);
     
    $(this).addClass("avoid-clicks");

});

//when click the table values and save them player 2
let sumArray2 = [];
var Total2 = 0;
let finalScores2 = {one: 0, two:0, three:0, four:0, five:0, six:0};
$("#scorTable").on("click", "td:nth-child(3)", function() {
    $('#roll2').prop('disabled', true);
    $('#roll2').text("Your turn is over");
    var item = $(this)
    console.log(item);
    sumArray2.push(parseInt($(this).text()));

    if($(this).is("#ones2")){
        finalScores2.one = parseInt($("#ones2").text());
    }
    if($(this).is("#twos2")){
        finalScores2.twos = parseInt($("#twos2").text());
    }
    if($(this).is("#threes2")){
        finalScores2.threes = parseInt($("#threes2").text());
    }
    if($(this).is("#fours2")){
        finalScores2.fours = parseInt($("#fours2").text());
    }
    if($(this).is("#fives2")){
        finalScores2.fives = parseInt($("#fives2").text());
    }
    if($(this).is("#sixes2")){
        finalScores2.sixes = parseInt($("#sixes2").text());
    }
    let sum = 0;
    for(key in finalScores2){
        sum += finalScores2[key];
        $("#sum2").text(sum);
    }
    let bonus = parseInt($("#sum2").text());
    if( bonus >= 100){
        $("#bonus2").text(100);
    }
    
    console.log(finalScores2);
      var Total2 = sumArray2.reduce(function(a, b){
        return a + b;
    }, 0)
      $("#totalSC2").text(Total2);
      
    $(this).addClass("avoid-clicks2");


});

// Display result of the game using (finish button)
$('#finishedGame').click(function(){
    let Player1total = parseInt($("#totalSC").text());
    let Player2total = parseInt($("#totalSC2").text());
    $("#winnerText").show();
    if(Player1total > Player2total){
        console.log("Player 1 is winner");
        $("#winner").text("Player 1 ")
    }
    else{
        console.log("Player 2 is winner");
        $("#winner").text("Player 2 ")
    }
});

