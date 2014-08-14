$(document).ready(function(e) {

var num = generateNum();	
var tries = 9;
	
$('#cow').animate(
	{ right: 95 }, 
	'slow', 
	'swing', 
	function() { 
		$('#bubble').animate(
			{ opacity: 1 }, 
			'slow', 
			'swing'
	);
});
$("#rules-btn").click( function(){
	
	$('#rules').animate(
		{ top: 0 }, 
		'slow', 
		'swing', 
		function() { 
			cowMessage("<h2><a id=\"play\" href=\"index.html\" title=\"Play Bulls &amp; Cows\">Start game</a></h2>");
	});

	var num = generateNum();
	
});
$("#play").click( function(){
	
	$('#board').animate(
		{ top: 0 }, 
		'slow', 
		'swing', 
		function() { 
			cowMessage("<h2>I came up with a number. <br /> Can you guess it?</h2>");
	});

	var num = generateNum();
	
});

	
function generateNum(){
	var numArr = [1,2,3,4,5,6,7,8,9];
	var num = "";
	var tries=1;
	for(i=0;i<4;i++){
		var randomIndex = Math.floor(Math.random()*numArr.length);
		var randomNum = numArr[randomIndex];
		numArr.splice(randomIndex,1);
		num = num+""+randomNum;
	}
	return num;
}

function dublicateNums(number){
	var x=1; 
	for( var k=0; k<4; k++){
		for( var l=x;l<4;l++){
			if(number[k]==number[l]){
				return true;
			}
		}
		x++;
	}
	return false;
}

function cowMessage(message){
	$('#play_instructions').html(message);
}
$("#restart").click(function(e) {
    window.location.reload();
});
$("#check").click( function(){
		
		var guess = $("#guess").val();
		var patt=new RegExp("^[1-9]{4}$");
		
		var ifDub = dublicateNums(guess);
		
		if(guess.length!=4){		
			cowMessage("<h2>Sorry! Your number must <br />contain 4 digits</h2>");
		
		}
		else if(!patt.test(guess)){
			cowMessage("<h2>Nope ! Only digits between <br />1-9 are allowed</h2>");
		}
		else if(ifDub){
			cowMessage("<h2>Ahh, no! You can't <br /> dublicate digits</h2>");
		}
		else{
			
			guess = guess.toString();
			
			var bulls = 0;
			var cows = 0;
			
			for(j=0;j<4;j++){
				for(m=0;m<4;m++){
					if(j==m){
						if(num[j]==guess[m]){
							bulls++;
						}
					}
					else{
						if(num[j]==guess[m]){
							cows++;
						}
					}
				}
			}

			
			if(bulls==4){
				if(tries<=5){
					cowMessage("<h2>Damn, you're good!</h2>");
				}
				else{
					cowMessage("<h2>Congrats! You won!</h2>");
				}
				
				$("#check").hide();
				$("#restart").css("display","inline-block");
			}
			alert(num);
			$("#results").append("<tr><td>"+guess+"</td><td>"+bulls+"</td><td>"+cows+"</td></tr>");
			$("#tries span").text(tries);
			$("#guess").val("");
			
			if( tries<=0){
				if(bulls==4){
					cowMessage("<h2>Congrats! You won!</h2>");
				}
				else{
					cowMessage("<h2>Sorry! You failed <br /> My number was <span>"+num+"</span></h2>");
				}
				$("#check").hide();
				$("#restart").css("display","inline-block");
			}
			tries--;
		}
	
});	

});