
$( document ).ready(function() {
    gameSetup();
});



var playerOne=true;


function gameSetup(){
	var clicked="";
	var turn=9;

	while(turn>=0){
	if(playerOne){
		$(".square").click(function(){
			console.log("you clicked me");
		clicked=$(this).attr("id");
		console.log(playerOne);
		$("#"+clicked).css("background", "black")
		playerOne=false;
					});
		
	}
	else{
		$(".square").click(function(){
			console.log("you clicked me");
		clicked=$(this).attr("id");
		console.log(typeof clicked);
		$("#"+clicked).css("background", "orange")
					});
		playerOne=true;
	}
	}
}


gameSetup();