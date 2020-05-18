var canvas = document.getElementById("canvas");
var context= canvas.getContext("2d");
var score =0;
var p=0;

function delay(){
 p=setInterval(newCircle,800);

 }




function Circle( x, y, dx, dy, radius ) {

	this.x 	= x;
	this.y 	= y;
	this.dx = dx;
	this.dy = dy;

	this.radius = radius;

	this.draw = function() {

		context.beginPath();

		context.arc( this.x, this.y,  this.radius, 0, Math.PI * 2, false  );

		context.strokeStyle = "#15f4ee";
		context.lineWidth = '1';
		context.stroke();
		if(t>6000){
			context.clearRect(0,0,canvas.width,canvas.height);
			clearTimeout(t);
			score += 0;
			context.fillText("GAME OVER",canvas.width/2,canvas.height/2);
			context.textAlign ='center';
			context.font ="50px Arial";
			context.fillStyle ="#FFFF00";
			context.fontSize

		}


	}

	this.update= function() {

		if( this.x + this.radius > canvas.width|| this.x - this.radius < 0 ) {

			this.dx = -this.dx;
		}

		if( this.y + this.radius > canvas.height || this.y - this.radius < 0 ) {

			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

var circles = [];

 var radius= Math.floor((Math.random()*10)+30);

for( var i = 0; i < circles.length; i++ )  {
  var x = Math.random() * ( canvas.width -radius- radius ) + radius;
	var y = Math.random() * ( canvas.height -radius- radius ) + radius;



  	var dx = ( Math.random() - 0.5 ) * 2;
  	var dy = ( Math.random() - 0.5 ) * 2;

	circles.push( new Circle( x, y, dx, dy, radius ) );
}

function getDistance(x2,y2,x3,y3){

   let xDistance = (x2) - (x3);
   let yDistance = (y2) - (y3);
  return Math.sqrt(Math.pow(xDistance,2)+ Math.pow(yDistance,2));
}
var canvas=document.getElementById('canvas');
let sel={
  x: undefined,
  y: undefined};


canvas.addEventListener('click',function(e){
  var rect = canvas.getBoundingClientRect();
  sel.x = e.clientX-rect.left;
  sel.y = e.clientY-rect.top;
   for(i=0; i<circles.length; i++){

  if(getDistance(sel.x,sel.y, circles[i].x,circles[i].y) < circles[i].radius){


    circles.splice(i,1);
		document.getElementById('score').innerHTML= "Score:" + score;
		if(t<=2000){
			score += 5;
			document.getElementById('score').innerHTML= "Score:" + score;
		}
		else if (t<4000) {
			score += 2;
			document.getElementById('score').innerHTML= "Score:" + score;
		}

		else {
			score += 1;
			document.getElementById('score').innerHTML= "Score:" + score;
		}

		if(t>=6000){
		document.getElementById('score').innerHTML= "Score:" + score;
		}
		if(t>3000){
			clearInterval(p);
		p=setInterval(newCircle,400);
		}

    break;}





}});

function animation() {

  context.clearRect( 0, 0, canvas.width,canvas.height );

  for( var r = 0; r < circles.length; r++ ) {

    circles[ r ].update();}

}

function newCircle(){
  var radius= Math.floor((Math.random()*10)+30);
  var x = Math.random() * ( canvas.width -radius- radius +1) + radius;
	var y = Math.random() * ( canvas.height -radius- radius +1) + radius;


  	var dx = ( Math.random() - 0.5 ) * 2;
  	var dy = ( Math.random() - 0.5 ) * 2;

  circles.push( new Circle( x, y, dx, dy, radius ) );
	if(t>6000){
		return;
		context.clearRect(0,0,canvas.width,canvas.height);
	}
  for( var r = 0; r < circles.length; r++ ) {

    circles[ r ].update();

  }
   console.log(circles.length)
}

animation();


var stopWatch;
var s =0;
  var ms =0;
  var t;
  let count = 0;

        function startTime() {
          requestAnimationFrame(animation);

      if(ms>98){
        ms=0
	s++
      }else{
          ms+=1}

  if(ms<10){
    document.getElementById('display').innerHTML=  "Time:" + s + ":" + "0" + ms;}
  else{
    document.getElementById('display').innerHTML=  "Time:"+s+":"+  ms;}

    t = setTimeout(startTime, 7);
		if(t>6000){
			return;
		}
}

function stop(){
	clearInterval(p);
	clearTimeout(t);
}
