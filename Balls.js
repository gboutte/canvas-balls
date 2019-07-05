class Balls{

    constructor(params){
        var self = this;
        if(typeof params !== "undefined" && typeof params.selector !== "undefined"){
            var ballsContainer = document.querySelectorAll(params.selector);
            this.selector = params.selector;
            this.ballsContainer = ballsContainer;

            if(typeof params.height !== "undefined"){
                this.height = params.height;
            }else{
                this.height = null;
            }
            if(typeof params.width !== "undefined"){
                this.width = params.width;
            }else{
                this.width = null;
            }
            
            if(typeof params.nbBalls !== "undefined"){
                this.nbBalls = params.nbBalls;
            }else{
                this.nbBalls = 5;
            }
            if(typeof params.speed !== "undefined"){
                this.speed = params.speed;
            }else{
                this.speed = null;
            }
            if(typeof params.addOnClick === "boolean"){
                this.addOnClick = params.addOnClick;
            }else{
                this.addOnClick = false;
            }
            if(typeof params.background !== "undefined"){
                this.background = params.background;
            }else{
                this.background = "black";
            }
            if(typeof params.borderSize !== "undefined"){
                this.borderSize = params.borderSize;
            }else{
                this.borderSize = 2;
            }
            if(typeof params.backgroundBalls !== "undefined"){
                this.backgroundBalls = params.backgroundBalls;
            }else{
                this.backgroundBalls = "white";
            }
            if(typeof params.backgroundImageBalls !== "undefined"){
                this.backgroundImageBalls = params.backgroundImageBalls;
               
            }else{
                this.backgroundImageBalls = null;
            }
            this.ballsArray = new Array();
            self.init();

        }else{
            alert('Parameters error.');

        }


    }

    get canvasStyle(){
        return "box-sizing: border-box;";
    }

    init(){
      
        var self = this; 
        for(var i = 0;i < this.ballsContainer.length;i++){
            this.ballsContainer[i].innerHTML = '<canvas style="'+this.canvasStyle+'" id="canvas-'+this.selector+'-'+i+'"></canvas>';
            var canvas = document.getElementById('canvas-'+this.selector+'-'+i);
            if(this.addOnClick){
                canvas.addEventListener('click',function(evt){
                    self.eventAddOnClick(evt,this);
                });
            }
            if(this.width == null){
                canvas.width = this.ballsContainer[i].offsetWidth;
            }else{
                canvas.width = this.width;
            }
            if(this.height == null){
                canvas.height = window.innerHeight;
            }else{
                canvas.height = this.height;
            }

        }
        var canvas = document.getElementById('canvas-'+this.selector+'-0');
        for(var i = 0;i < this.nbBalls;i++){
            this.ballsArray.push(this.getNewBall(canvas));
        }
        this.makeItMove();   

        window.addEventListener('resize',function(evt){
            self.resize();
            this.setTimeout(function(){
                self.resize();
            },1)
        });

    }
    resize(){
        for(var i = 0;i < this.ballsContainer.length;i++){
            var canvas = document.getElementById('canvas-'+this.selector+'-'+i);
            
            if(this.width == null){
                canvas.width = this.ballsContainer[i].offsetWidth;
            }else{
                canvas.width = this.width;
            }
            if(this.height == null){
                canvas.height = window.innerHeight;
            }else{
                canvas.height = this.height;
            }
        }

    }

    getNewBall(canvas){
		let bg;
		if(typeof this.backgroundImageBalls == "object" && this.backgroundImageBalls  != null){
			let nb = Math.floor(Math.random() * this.backgroundImageBalls.length);
			bg = this.backgroundImageBalls[nb];
		}else{
			bg = this.backgroundImageBalls;
		}
		
        return new Ball(canvas,this.speed,this.backgroundBalls,bg,this.borderSize);
    }
    eventAddOnClick(evt,canvas){
        var pos = this.getMousePos(canvas,evt);
        var newBall = this.getNewBall(canvas);
        newBall.setPosition(pos);
        this.ballsArray.push(newBall);
    }
    addBalls(number = 1){
        var canvas = document.getElementById('canvas-'+this.selector+'-0');
        for(var i = 0;i<number;i++){
            var newBall = this.getNewBall(canvas);
            this.ballsArray.push(newBall);
        }
    }
    addBall(ball){
        var canvas = document.getElementById('canvas-'+this.selector+'-0');
        ball.setCanvas(canvas);
        this.ballsArray.push(ball); 
    }
    getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    }
    makeItMove(){
        var self = this;
        for(var i = 0;i < this.ballsArray.length;i++){
            this.ballsArray[i].move();
        }
        this.renderCanvas();
       
        window.requestAnimationFrame(function(){self.makeItMove()});
    }

    renderCanvas(){
        for(var i = 0;i < this.ballsContainer.length;i++){
            var canvas = document.getElementById('canvas-'+this.selector+'-'+i);
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //On fait le background
            ctx.fillStyle = this.background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            this.ballsArray.forEach(ball => {
                
                
                    ctx.fillStyle = ball.background;
                
                ctx.beginPath();
                ctx.arc(
                    ball.posX + (ball.width ),
                    ball.posY + (ball.width ), 
                    ball.width, 
                    0, 
                    Math.PI*2);
               
                ctx.fill();
                ctx.closePath();
                if(ball.backgroundImageLoaded != null){
                   
                    var lBorder = ball.border;
                    
                   
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc( ball.posX + (ball.width ) ,  ball.posY + (ball.width ) , ball.width - (lBorder*2), 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.clip();
                
                    ctx.drawImage(ball.backgroundImageLoaded, ball.posX,  ball.posY, (ball.width * 2) , (ball.width*2));
                
                    ctx.beginPath();
                    ctx.arc(lBorder, lBorder, ball.width, 0, Math.PI * 2, true);
                    ctx.clip();
                    ctx.closePath();
                    ctx.restore();
                }
                                
                ctx.closePath();
            });
        }

    }

}



class Ball{

    constructor(canvas,speed,background,backgroundImage,border){
        var self = this;
        this.canvas = canvas;
        this.width = 60;
        this.background = "white";
        this.posY = 0;
        this.directionX = null;
        this.directionY = null;
        this.rotation = 0;
        this.border = border;
        if(speed == null){
            this.speed = Math.floor(Math.random() * 10) +1;
        }else{
            this.speed = speed;
        }

        if(background == null){
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            this.background = "rgb("+r+","+g+","+b+")";
        }else{
            this.background = background;
        }


        this.backgroundImage = backgroundImage;
        if(backgroundImage != null){
            var background = new Image();
            background.src = backgroundImage;
            background.onload = function() {
                self.backgroundImageLoaded = background;
            };
        }else{

            this.backgroundImageLoaded = backgroundImage;
        }
        if(this.canvas != null){
            this.posX = Math.floor(Math.random() * this.canvas.width - this.width) + this.width;
            this.posY = Math.floor(Math.random() * this.canvas.height - this.width) + this.width;
        }
        
    }
    setSpeed(speed){
        this.speed = speed;
    }
    setCanvas(canvas){
        this.canvas = canvas;
        if(this.canvas != null){
            this.posX = Math.floor(Math.random() * this.canvas.width - this.width) + this.width;
            this.posY = Math.floor(Math.random() * this.canvas.height - this.width) + this.width;
        }
    }
    
    setPosition(pos){
        this.posX = pos.x - (this.width );
        this.posY = pos.y - (this.width );
    }
    move(){
        this.verifDirection();

        if(this.directionX != null){
            if(this.directionX){
                this.posX+=this.speed;
            }else{
                this.posX-= this.speed;
            }
        }
        if(this.directionY != null){
            if(this.directionY){
                this.posY += this.speed;
            }else{
                this.posY-= this.speed;
            }
        }



    }

    verifDirection(){
        while(this.directionX == null && this.directionY == null){
            var random = Math.random();
            if( random > 0.66){
                this.directionX = true;
            }else if(random > 0.33){
                this.directionX = false;
            }else{
                this.directionX = null;
            }
            random = Math.random();
            if( random > 0.66){
                this.directionY = true;
            }else if(random > 0.33){
                this.directionY = false;
            }else{
                this.directionY = null;
            }
        }

        
        if(this.posX <= 0){
            var random = Math.random();
            if( random > 0.5){
                this.directionX = null;
            }else{
                this.directionX = true;
            }
        }
        if(this.posX >= this.canvas.width - this.width * 2){
            var random = Math.random();
            if( random > 0.5){
                this.directionX = false;
            }else{
                this.directionX = null;
            }
        }
        if(this.posY <= 0){
            var random = Math.random();
            if( random > 0.5){
                this.directionY = true;
            }else{
                this.directionY = null;
            }
        }
        if(this.posY >= this.canvas.height - this.width * 2){
            var random = Math.random();
            if( random > 0.5){
                this.directionY = false;
            }else{
                this.directionY = null;
            }
        }



    }

}