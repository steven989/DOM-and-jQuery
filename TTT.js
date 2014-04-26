
var choiceX_1 = [];
var choiceY_1 = [];

var choiceX_2 = [];
var choiceY_2 = [];




var available_choice = ["1|1","1|2","1|3","2|1","2|2","2|3","3|1","3|2","3|3"]

$(document).ready(

    function() {

        $('.game_board').children().each(function(){

            $(this).on('click', slotClicked);

        })
    }
)



function slotClicked() {

    var x = $(this).attr('x');
    var y = $(this).attr('y');

    logPlayerChoice(x,y);

    removeAvailable(x,y);

    changeDivColor($(this),"player1");

    createResponse();

}



function logPlayerChoice(x,y) {

    choiceX_1.push(x);
    choiceY_1.push(y);

}

function logPlayer2Choice(x,y) {

    choiceX_2.push(x);
    choiceY_2.push(y);

}


function removeAvailable(x,y){

    var selected = x+"|"+y;

    var indexToRemove = available_choice.indexOf(selected)

    available_choice.splice(indexToRemove,1)

}


function changeDivColor(slot,player) {

    if (player == "player1") {slot.css({"background-color":"red"});}
    else {slot.css({"background-color":"blue"});}
    
}



function createResponse() {

    var defense_x = [];
    var defense_y = [];

    var sec_defense_x = [];
    var sec_defense_y = [];

    var offense_x = 0;
    var offense_y = 0;

    defense_check();

    if (defense_x.length > 0) {

        logPlayer2Choice(defense_x[0],defense_y[0]);

        removeAvailable(defense_x[0],defense_y[0]);

        changeDivColor($("[x="+defense_x[0]+"][y="+defense_y[0]+"]"),"player2");

    }

    else if (sec_defense_x.length > 0) {

        logPlayer2Choice(sec_defense_x[0],sec_defense_y[0]);

        removeAvailable(sec_defense_x[0],sec_defense_y[0]);

        changeDivColor($("[x="+sec_defense_x[0]+"][y="+sec_defense_y[0]+"]"),"player2");

    }

    else {

        logPlayer2Choice(offense_x[0],offense_y[0]);

        removeAvailable(offense_x[0],offense_y[0]);

        changeDivColor($("[x="+offense_x[0]+"][y="+offense_y[0]+"]"),"player2");


    }


    function defense_check() {

        var x = [0,0,0]
        var y = [0,0,0]

        var d_1 = 0;
        var d_2 = 0;

        var d_o_1 = 0;
        var d_o_2 = 0;

        var d_m_1 = 0;
        var d_m_2 = 0;



        // horizontal and vertical check

        choiceX_1.forEach(function(x_value) {

            if (x_value == 1) {x[0] += 1;}
            else if (x_value == 2) {x[1] += 1;}
            else {x[2] += 1;};

        });

        choiceY_1.forEach(function(y_value) {

            if (y_value == 1) {y[0] += 1;}
            else if (y_value == 2) {y[1] += 1;}
            else {y[2] += 1;};

        });

        choiceX_2.forEach(function(x_value) {

            if (x_value == 1) {x[0] -= 1;}
            else if (x_value == 2) {x[1] -= 1;}
            else {x[2] -= 1;};

        });

        choiceY_2.forEach(function(y_value) {

            if (y_value == 1) {y[0] -= 1;}
            else if (y_value == 2) {y[1] -= 1;}
            else {y[2] -= 1;};

        });


        // diagonals check; both diagonals

        for(i=1;i<=choiceX_1.length;i++) {

            var diag_x = choiceX_1[i-1];
            var diag_y = choiceY_1[i-1];

            if ((diag_x == 1 && diag_y == 1) || (diag_x == 2 && diag_y == 2) || (diag_x == 3 && diag_y == 3)) {

                d_1 += 1;
                d_o_1 += 1;

            };

            if ((diag_x == 1 && diag_y == 3) || (diag_x == 2 && diag_y == 2) || (diag_x == 3 && diag_y == 1)) {

                d_2 += 1;
                d_o_2 += 1;

            }

        }

        for(i=1;i<=choiceX_2.length;i++) {

            var diag_x = choiceX_2[i-1];
            var diag_y = choiceY_2[i-1];

            if ((diag_x == 1 && diag_y == 1) || (diag_x == 2 && diag_y == 2) || (diag_x == 3 && diag_y == 3)) {

                d_1 -= 1;
                d_m_1 += 1;


            };

            if ((diag_x == 1 && diag_y == 3) || (diag_x == 2 && diag_y == 2) || (diag_x == 3 && diag_y == 1)) {

                d_2 -= 1;
                d_m_2 += 1;

            }

        }

        // generate defensive coordinates for vertical and horizontal


        for(i=0;i<=2;i++) {

            y_taken = [];

            if (x[i]== 2) {

                for(j=0;j<choiceX_1.length;j++){

                    if(choiceX_1[j] == i+1) {y_taken.push(Number(choiceY_1[j]))};

                }

                result_x = [1,2,3].filter(function(num){return y_taken.indexOf(num) == -1 });

                defense_x.push(i+1);

                defense_y.push(result_x[0]);

            };


            x_taken = [];

            if (y[i]== 2) {

                for(k=0;k<choiceY_1.length;k++){

                    if(choiceY_1[k] == i+1) {x_taken.push(Number(choiceX_1[k]))};

                }

                result_y = [1,2,3].filter(function(num){return x_taken.indexOf(num) == -1 });

                defense_y.push(i+1);

                defense_x.push(result_y[0]);

            }


        }


        // generate defensive coordinates for diagonal (left top to right bottom)

        if (d_1 == 2) {

            xy_taken_1 = [];

             for(i=1;i<=choiceX_1.length;i++) {

                var diag_x = choiceX_1[i-1];
                var diag_y = choiceY_1[i-1];

                if ((diag_x == 1 && diag_y == 1) || (diag_x == 2 && diag_y == 2) || (diag_x == 3 && diag_y == 3)) {

                    xy_taken_1.push(diag_x+"|"+diag_y)

                };

             }


             result_diag_1 = ["1|1","2|2","3|3"].filter(function(combo) {return xy_taken_1.indexOf(combo) == -1})[0];



             defense_x.push(Number(result_diag_1[0]));
             defense_y.push(Number(result_diag_1[2]));

        };


        // generate defensive coordinates for diagonal (left bottom to right top)

        if (d_2 == 2) {

            xy_taken_2 = [];

             for(i=1;i<=choiceX_1.length;i++) {

                var diag_x = choiceX_1[i-1];
                var diag_y = choiceY_1[i-1];

                if ((diag_x == 1 && diag_y == 3) || (diag_x == 2 && diag_y == 2) || (diag_x == 3 && diag_y == 1)) {

                    xy_taken_2.push(diag_x+"|"+diag_y)

                };

             }


             result_diag_2 = ["1|3","2|2","3|1"].filter(function(combo) {return xy_taken_2.indexOf(combo) == -1})[0];



             defense_x.push(Number(result_diag_2[0]));
             defense_y.push(Number(result_diag_2[2]));

        };

        // Next move defensive check (to prevent the formation of checkmates in the next move by opponent)

        function nextMove(coordinates,customCoordinates){

            var coordiatesToFlag = [];

            available_choice.forEach(function(coordinates) {

                var score_array = [];

                score_array.push(
                    1 

                    + choiceX_1.filter(function(element) {
                        return element == Number(coordinates[0])
                    }).length 

                    - choiceX_2.filter(function(element) {
                        return element == Number(coordinates[0])
                    }).length 

                    - (function(){

                        if (Number(customCoordinates[0]) == Number(coordinates[0])) { return 1 }
                            else {return 0};

                    })()
                );

                score_array.push(
                    1 

                    + choiceY_1.filter(function(element) {
                        return element == Number(coordinates[2])
                    }).length 

                    - choiceY_2.filter(function(element) {
                        return element == Number(coordinates[2])
                    }).length

                    - (function(){

                        if (Number(customCoordinates[2]) == Number(coordinates[2])) { return 1 }
                            else {return 0};

                    })()

                );

                if (["1|1","2|2","3|3"].indexOf(coordinates) > -1) {

                    score_array.push(1 + d_1)

                } else {score_array.push(0) };


                if (["1|3","2|2","3|1"].indexOf(coordinates) > -1) {

                    score_array.push(1 + d_2)

                } else {score_array.push(0)};

                if (score_array.filter(function(score){return score >= 2}).length >= 2) {

                    coordiatesToFlag.push(coordinates);

                } 

            });
        
        return coordiatesToFlag;

        }

        // check the length of the array being returned; this array represents all the choices where the opponent can make that will cause checkmate
   
            var potential_spots = nextMove(available_choice,"0|0");

         if(potential_spots.length > 1) {

            var num_choice = [];
            var coor_num_choice = [];

            function simulate(choices,coordinate) {

                var chunk = choices.splice(choices.indexOf(coordinate),1);

                var whatif = nextMove(choices,coordinate);


                choices.push(chunk[0])

                return whatif.length

            }

            potential_spots.forEach(function(coordinate){
                
                num_choice.push(simulate(available_choice,coordinate));
                coor_num_choice.push([coordinate,simulate(available_choice,coordinate)]);
            });


            var min_option = Math.min.apply(Math,num_choice);

            var possible_options = coor_num_choice.filter(function(option){return option[1] == min_option})

            var pick = possible_options[Math.floor(Math.random()*(possible_options.length))][0]

            sec_defense_x = Number(pick[0]);

            sec_defense_y = Number(pick[2]);

         };

         offensive_pick(d_o_1,d_o_2,d_m_1,d_m_2);

    }


    function offensive_pick(d_o_1,d_o_2,d_m_1,d_m_2) {

        var option_benefits_3 = [];
        var option_benefits_2 = [];
        var option_benefits_1 = [];
        var options_array=[];

        //assining ranks to all available options

        available_choice.forEach(function(coordinates){

                var score_array = [];

                // x score 
                score_array.push(
                    (function(){
                        if(
                        choiceX_1.filter(function(element) {
                            return element == Number(coordinates[0])
                        }).length > 0) {return 0;}
                        else {

                            return 1+ (choiceX_2.filter(function(element) {
                                return element == Number(coordinates[0])
                                 }).length)
                        }
                    })()
                );

                // y score
                score_array.push(
                    (function(){
                        if(
                        choiceY_1.filter(function(element) {
                            return element == Number(coordinates[2])
                        }).length > 0) {return 0;}
                        else {

                            return 1+ (choiceY_2.filter(function(element) {
                                return element == Number(coordinates[2])
                                 }).length)
                        }
                    })()
                );

                // d1 score

                score_array.push(
                    (function(){
                        if(["1|1","2|2","3|3"].indexOf(coordinates) > -1) {
                            if(d_o_1 > 0) { return 0;}
                            else {return 1+d_m_1;};
                        }
                        else { return 0;}
                    })()
                );

                // d2 score

                score_array.push(
                    (function(){
                        if(["1|3","2|2","3|1"].indexOf(coordinates) > -1) {
                            if(d_o_2 > 0) { return 0;}
                            else {return 1+d_m_2;};
                        }
                        else { return 0;}
                    })()
                );

                var count_of_3 = score_array.filter(function(score){return score == 3}).length;
                var count_of_2 = score_array.filter(function(score){return score == 2}).length;
                var count_of_1 = score_array.filter(function(score){return score == 1}).length;

                option_benefits_3.push(count_of_3);
                option_benefits_2.push(count_of_2);
                option_benefits_1.push(count_of_1);

                options_array.push(coordinates+"||"+count_of_3+"||"+count_of_2+"||"+count_of_1);

        });


        // use a tiered logic to pick among the options

        var max3 = Math.max.apply(Math,option_benefits_3)
        var max2 = Math.max.apply(Math,option_benefits_2)
        var max1 = Math.max.apply(Math,option_benefits_1)


        function pick() {

            if (max3 > 0) {

                return options_array.filter(function(option){return option[5]==max3})[Math.floor(Math.random()*(options_array.filter(function(option){return option[5]==max3}).length))].substring(0,3) }

            else if (max2 > 0) {return options_array.filter(function(option){return option[8]==max2})[Math.floor(Math.random()*(options_array.filter(function(option){return option[8]==max2}).length))].substring(0,3)}

            else {return options_array.filter(function(option){return option[11]==max1})[Math.floor(Math.random()*(options_array.filter(function(option){return option[11]==max1}).length))].substring(0,3)}

        }

        var show_pick = pick();

        offense_x = show_pick[0];
        offense_y = show_pick[2];

    }



}



// $('div').children().each(function(index,element){console.log($(this).attr('x'))})