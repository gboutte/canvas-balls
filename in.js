window.onload = function(){
    var imported = document.createElement('script');
    imported.src = './Balls.js';
    imported.onload = function(){
        console.log('ici');
        var ballBg = document.createElement('div');
        ballBg.style.position = "fixed";
        ballBg.style.top = 0;
        ballBg.style.left=0;
        ballBg.style.width='100%';
        ballBg.style.height='100%';
        ballBg.style.zIndex = '-1';
        ballBg.id = "background";
        document.body.appendChild(ballBg);
        var balls = new Balls({
            selector:"#background",
            nbBalls:20,
            speed:null,
            backgroundBalls:null,
            backgroundImageBalls:"https://i.ytimg.com/vi/aeHSlEQ6Cpo/hqdefault.jpg"
        });
    }
    document.head.appendChild(imported);
   
    
};