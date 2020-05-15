var canvas = document.getElementById("canvas");
var context= canvas.getContext("2d");

function Circle( x, y, dx, dy, radius ) {

	this.x 	= x;
	this.y 	= y;
	this.dx = dx;
	this.dy = dy;

	this.radius = radius;

	this.draw = function() {

		context.beginPath();

		context.arc( this.x, this.y,  this.radius, 0, Math.PI * 2, false  );

		context.strokeStyle = "blue";

		context.stroke();

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

for( var i = 0; i < 15; i++ )  {

	var x = Math.random() * ( canvas.width - radius * 2 ) + radius;
	var y = Math.random() * ( canvas.height - radius * 2) + radius;


  	var dx = ( Math.random() - 0.5 ) * 2;
  	var dy = ( Math.random() - 0.5 ) * 2;

	circles.push( new Circle( x, y, dx, dy, radius ) );
}

function getDistance(x2,y2,x3,y3){

   let xDistance = (x2-300) - (x3-300);
   let yDistance = (y2-50) - (y3-50);
  return Math.sqrt(Math.pow(xDistance,2)+ Math.pow(yDistance,2));
}
var canvas=document.getElementById('canvas');
let sel={
  x: undefined,
  y: undefined};




function animation() {

  context.clearRect( 0, 0, canvas.width,canvas.height );
  for( var r = 0; r < 15; r++ ) {

    circles[ r ].update();}

    window.addEventListener('click',function(e){
      sel.x = e.clientX;
      sel.y = e.clientY;
      console.log("hello1");
    for(i=0; i<circles.length; i++){

    if(getDistance(e.clientX,e.clientY, this.x,this.y) < this.r){

      console.log(e.clientX);
      circles.splice(i,1);
      break;

     }


}});}


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

}




function stop(){

clearTimeout(t);

}

function resume(){
startTime();
}

function restart(){
 location.reload();
}

setTimeout(circles.draw,2000);
