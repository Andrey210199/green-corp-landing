const  COLORS=["255,108,80", "5,117,18", "29,39,57", "67,189,81"];
const BUBBLE_DENSITY = 100;

function generateDecimalBetween(left=0, right=0){
    return (Math.random()*(left-right)+right).toFixed(2);
}

class Bubble{
    constructor(canvas){
        this.canvas =canvas;
        this.getCanvasSize();
        this.init();
    }

    getCanvasSize(){
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
    }

    init(){
        //Параметры
        this.color =COLORS[Math.floor(Math.random()*COLORS.length)];
        this.alpha = generateDecimalBetween(5,10)/10;
        this.size = generateDecimalBetween(1,3);
        //Координаты
        this.translateX = generateDecimalBetween(0,this.canvasWidth);
        this.translateY = generateDecimalBetween(0,this.canvasHeight);
        //Перемещение
        this.velocity = generateDecimalBetween(20,40);
        this.movementX = generateDecimalBetween(-2,2)/this.velocity;
        this.movementY = generateDecimalBetween(1,20)/this.velocity;
    }
    //Движение
    move(){
        this.translateX-=this.movementX;
        this.translateY-=this.movementY;

        //Выход с холста
        if(this.translateY < this.size || this.translateX < this.size || this.translateX > this.canvasWidth)
        {
            this.init();
            this.translateY = this.canvasHeight;
        }
    }
}


class CanvasBackground{
    constructor(id)
    {
        this.canvas =document.getElementById(id);
        this.ctx = this.canvas.getContext("2d");
        this.dpr = window.devicePixelRatio;
    }

    start(){
        this.canvasSize();
        this.generateBubbles();
        this.animate();
    }

    canvasSize(){
        this.canvas.width = this.canvas.offsetWidth * this.dpr;
        this.canvas.height = this.canvas.offsetHeight * this.dpr;
        this.ctx.scale(this.dpr, this.dpr);
    }

    generateBubbles(){
        this.bubleList =[];
       for(let i=0; i<BUBBLE_DENSITY; i++)
       {
        this.bubleList.push(new Bubble(this.canvas));
       }
    }

    animate(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.bubleList.forEach(bubble =>{
            bubble.move();
            this.ctx.translate(bubble.translateX, bubble.translateY);
            this.ctx.beginPath();
            this.ctx.arc(0,0, bubble.size, 0 , 2* Math.PI);
            this.ctx.fillStyle= `rgba(${bubble.color}, ${bubble.alpha})`;
            this.ctx.fill();
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0); 

        });
        requestAnimationFrame(this.animate.bind(this));
    }
}

let canvas =new CanvasBackground("orb-canvas");
canvas.start();
//Перезагрузка функции в случае изменения размера окна браузера
addEventListener("resize", canvas.start());

