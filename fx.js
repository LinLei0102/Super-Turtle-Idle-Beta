let canvas1 = document.getElementById('rpgParticles');
let canvas2 = document.getElementById('globalParticles');
let canvas3 = document.getElementById('rpgParticlesBehind');
let ctx = document.getElementById('rpgParticles').getContext('2d');

const player = document.getElementById('playerAnimation');
let enemy = document.getElementById('enemyAnimation');
enemy = document.getElementById('npcPanel');


function rngD(min, max) {
    return Math.random() * (max - min) + min;
}

let lastAttackX = 0
let lastAttackY = 0

// Ajustar el tamaño del canvas al tamaño del contenedor
let containerRect = document.getElementById('mainScreen').getBoundingClientRect();
let ScreenCenterX = containerRect.left + containerRect.width / 2; //reajustar al mover porfai
let ScreenCenterY = containerRect.top + containerRect.height / 2;
canvas1.width = containerRect.width;
canvas1.height = containerRect.height;
canvas2.width = containerRect.width;
canvas2.height = containerRect.height;
canvas3.width = containerRect.width;
canvas3.height = containerRect.height;

let playerRect = player.getBoundingClientRect();
let enemyRect = enemy.getBoundingClientRect();

const enemyRectX = enemyRect.left - containerRect.left + enemyRect.width / 2
const enemyRectY = enemyRect.top - containerRect.top + enemyRect.height / 1.4

const playerRectX = playerRect.left - containerRect.left + playerRect.width / 2
const playerRectY = playerRect.top - containerRect.top + playerRect.height / 1.4









let inventoryBagRect = document.getElementById('inventoryMainPageSquare').getBoundingClientRect();

window.addEventListener('resize', function() {
    inventoryBagRect = document.getElementById('inventoryMainPageSquare').getBoundingClientRect();
    containerRect = document.getElementById('mainScreen').getBoundingClientRect();
    canvas1.width = containerRect.width;
    canvas1.height = containerRect.height;
    canvas2.width = containerRect.width;
    canvas2.height = containerRect.height;
    canvas3.width = containerRect.width;
    canvas3.height = containerRect.height;
    playerRect = player.getBoundingClientRect();
    enemyRect = enemy.getBoundingClientRect();



});



const playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2;
const playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2;
const enemyCenterX = enemyRect.left - containerRect.left + enemyRect.width / 2;
const enemyCenterY = enemyRect.top - containerRect.top + enemyRect.height / 2;


let particleTrackers = []; 

class ParticleTracker {
    constructor(x,y) {
        this.t = 0; // Start
        this.tSpeed = 0.03; // Track Speed
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / rngD(1.5,2);
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / rngD(1.3,2);
        this.enemyCenterX = enemyRect.left - containerRect.left + enemyRect.width / rngD(1.5,2);
        this.enemyCenterY = enemyRect.top - containerRect.top + enemyRect.height / rngD(1.5,2);
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2; //2 default
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - rngD(200, 300);
        this.fixedX = x
        this.fixedY = y
        this.speedY = 0;
        this.speedX = 0;
        this.alpha = 1;
        this.size = 15;
        this.color = "transparent";
        this.wobbleY = 22; 
        this.wobbleX = 0; 
        this.wobbleFrequency = 0; 
        //this.trailParticle = Particle;
        //this.trailParticle2 = Particle;
        //this.endParticle = ParticleSimplePulse;
        //this.endParticleTracker = ParticleTracker;
        //this.freeflow = true;
        this.particles = [];
        this.particleDensity = 1;
        this.particle2Density = 1;
        this.image = new Image();
        //this.image.src = "img/turtle.png"; 
        this.behind = true; // Zindex of particles
        this.pulseAmplitude = 0; 
        this.pulseSpeed = 0.01; 
        this.rotationSpeed = 0 ; 
        this.rotation = 0; 
        this.trailFinished = false; 
        this.targetCanvas = 'rpgParticles'
        this.isMainAttack = false
    }

    update() {

        // Create new particle

        if (this.t < 1) {
            this.t += this.tSpeed;
            this.rotation += this.rotationSpeed;
            const ballPosition = this.getBallPosition();
            if (rngD(0,1)<this.particleDensity && this.trailParticle!==undefined) this.particles.push(new this.trailParticle(ballPosition.x, ballPosition.y));
            if (rngD(0,1)<this.particle2Density && this.trailParticle2!==undefined) this.particles.push(new this.trailParticle2(ballPosition.x, ballPosition.y));
        }

        if (this.fixedX !== undefined){
            this.fixedY += this.speedY;
            this.fixedX += this.speedX;
        }



        if (this.t>=1 && !this.trailFinished ){
            this.trailFinished = true
            const ballPosition = this.getBallPosition();

            if (typeof this.end === 'function') this.end()
                
            if (this.endParticle != undefined) this.particles.push(new this.endParticle(ballPosition.x, ballPosition.y))
            
            if (this.endParticleTracker != undefined) particleTrackers.push(new ParticleTracker(ballPosition.x, ballPosition.y));

            if (this.isMainAttack) //used for prefix spells and whatnot
            lastAttackX = ballPosition.x
            lastAttackY = ballPosition.y
            }

        // Actualizar partículas


        //this.size = 15 + Math.sin(Date.now() * this.pulseSpeed) * this.pulseAmplitude; // Tamaño pulsante


        
            for (let i = this.particles.length - 1; i >= 0; i--) {

                this.particles[i].update();
                

                if (this.particles[i].alpha <= 0.01 || this.particles[i].size <= 0.01) {
                    this.particles.splice(i, 1);
                } //automatically kill invisible particles

                if (this.particles.length<=0) this.alpha = 0
            
        }






    }

    getBallPosition() {
        const t = this.t; // Usar el 't' de esta bola de fuego??
        var wobbleX = Math.sin(t * this.wobbleFrequency * Math.PI) * this.wobbleX;
        var wobbleY = Math.sin(t * this.wobbleFrequency * Math.PI) * this.wobbleY;
        let x = Math.pow(1 - t, 2) * this.playerCenterX + 2 * (1 - t) * t * this.controlPointX + Math.pow(t, 2) * this.enemyCenterX + wobbleX;
        let y = Math.pow(1 - t, 2) * this.playerCenterY + 2 * (1 - t) * t * this.controlPointY + Math.pow(t, 2) * this.enemyCenterY + wobbleY;
        if (this.fixedX !=undefined) x = this.fixedX
        if (this.fixedY !=undefined) y = this.fixedY

        return { x, y };
    }

    draw() {


        const ballPosition = this.getBallPosition();




        if (this.targetCanvas !== undefined) ctx = document.getElementById(this.targetCanvas).getContext('2d');


        if (this.behind){
            for (const particle of this.particles) {
                particle.draw();
            }
        }        
        



        if (this.t<1){

       if (this.image.src != undefined) {  // Asegurarse de que la imagen esté cargada
           const imageSize = this.size * 5;
           ctx.save();
                ctx.translate(ballPosition.x, ballPosition.y); // Mover el contexto al centro de la bola
                ctx.rotate(this.rotation); // Rotar el contexto

                // Dibujar la imagen centrada en el nuevo contexto rotado
                ctx.drawImage(this.image, -imageSize / 2, -imageSize / 2, imageSize, imageSize);
                ctx.restore(); // Restaurar el contexto a su estado original
                } 

        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(ballPosition.x, ballPosition.y, this.size, 0, Math.PI * 2);
        ctx.fill();

    }


    if (!this.behind){
        for (const particle of this.particles) {
            particle.draw();
        }
    } 


    }
}








class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.age = 0; // Initial Age
        this.t = 0; // Initial Age
        this.life = 1000;
        this.sizeDecay = 0.5;
        this.speedY = 0;
        this.speedX = 0;
        this.alpha = 1;
        this.alphaDecay = 0.02;
        this.simpleColor = undefined;
        this.initialColor = { r: 102, g: 255, b: 255 };
        this.finalColor = { r: 255, g: 102, b: 255 };
        this.colorLife = 10; // Only affects color
        this.strokeColor = "green"
        this.strokeSize = 0
        this.wobbleX = 1; 
        this.wobbleY = 1; 
        this.wobbleFrequency = 0;
        this.image = new Image();
        //this.image.src = "img/turtle.png"; 
        this.offsetX = 1;
        this.offsetY = 1;
        this.pulseAmplitude = 0; 
        this.pulseSpeed = 0.02; 
        this.angle = 0; 
        this.angleSpeed = 0;
        this.glowStrength = 0;
        this.savedAccelerationY = 0
        //this.accelerationY = 0.3;
        //this.text = text;
        //this.targetCanvas = 'globalParticles'
        //this.metaimage = new Image();
        //this.metaimage.src = "img/sys/talentBG.png";


    }

    update() {



        if (this.age >= this.life) {
            this.alpha = 0;
            return; 
        }

        if (this.alpha<0) this.t = 1
        



        const angleSpeedX = Math.cos(this.angle) * this.angleSpeed;
        const angleSpeedY = Math.sin(this.angle) * this.angleSpeed;
        this.y += angleSpeedY;
        this.x += angleSpeedX;

        if (this.accelerationY !==undefined) {
            this.savedAccelerationY += this.accelerationY
            this.y += this.savedAccelerationY;

        }

        this.y += this.speedY;
        this.x += this.speedX;

        


        this.x += Math.sin(this.age * this.wobbleFrequency) * this.wobbleX;
        this.y += Math.cos(this.age * this.wobbleFrequency) * this.wobbleY;
        this.alpha -= this.alphaDecay;
        this.size -= this.sizeDecay;

        const pulseSize = 1 + Math.sin(Date.now() * this.pulseSpeed) * this.pulseAmplitude; // Multiplicador de pulso
        this.size *= pulseSize; // Ajustar el tamaño actual

        this.age++;


        // Color
        const ratio = this.age / this.colorLife;
            this.color = {
                r: Math.round(this.initialColor.r + (this.finalColor.r - this.initialColor.r) * ratio),
                g: Math.round(this.initialColor.g + (this.finalColor.g - this.initialColor.g) * ratio),
                b: Math.round(this.initialColor.b + (this.finalColor.b - this.initialColor.b) * ratio)
        }

    }

    draw() {

        if (!document.hasFocus()) return

        
        if (this.targetCanvas !== undefined) ctx = document.getElementById(this.targetCanvas).getContext('2d');
        ctx.save();
        ctx.globalAlpha = this.alpha;

        if(this.glowStrength != undefined){
            ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.5)`;
            ctx.shadowBlur = this.glowStrength; 
            ctx.shadowOffsetX = 0; 
            ctx.shadowOffsetY = 0; 
        }
        
        if (this.text === undefined){

        if (this.strokeSize>0){
            ctx.strokeStyle = this.strokeColor; 
            ctx.lineWidth = this.strokeSize; 
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size + 2, 0, Math.PI * 2);
            ctx.stroke();
        }

        if (this.image.src != undefined) {  // Asegurarse de que la imagen esté cargada
            const imageSize = this.size * 5;
            ctx.save();
                 ctx.translate(this.x*this.offsetX, this.y*this.offsetY); // Mover el contexto al centro de la bola
                 ctx.rotate(this.rotation); // Rotar el contexto
 
                 // Dibujar la imagen centrada en el nuevo contexto rotado
                 ctx.drawImage(this.image, -imageSize / 2, -imageSize / 2, imageSize, imageSize);
                 ctx.restore(); // Restaurar el contexto a su estado original
                 } 


        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
        if (this.simpleColor != undefined) ctx.fillStyle = this.simpleColor;
        ctx.beginPath();
        ctx.arc(
            this.x * this.offsetX, 
            this.y * this.offsetY, 
            Math.max(0, this.size),  // Asegurarte de que el radio no sea negativo
            0, 
            Math.PI * 2
        );
        if (this.metaimage !==undefined ){
            const pattern = ctx.createPattern(this.metaimage, "repeat");
            ctx.fillStyle = pattern;
        }

        
        ctx.fill();

        } else {

            ctx.font = `${this.size}px lilita`;


            if (this.strokeSize > 0) {
                ctx.strokeStyle = `rgba(${this.strokeColor.r}, ${this.strokeColor.g}, ${this.strokeColor.b}, ${this.alpha})`;
                ctx.lineWidth = this.strokeSize;
                ctx.strokeText(this.text, this.x * this.offsetX, this.y * this.offsetY); // Dibuja el borde del texto
            }
    
            // Establecer el color de relleno del texto
            ctx.fillStyle = `rgba(${this.finalColor.r}, ${this.finalColor.g}, ${this.finalColor.b}, ${this.alpha})`;
            if (this.simpleColor != undefined) ctx.fillStyle = this.simpleColor;
    
            ctx.fillText(this.text, this.x * this.offsetX, this.y * this.offsetY); // Dibuja el texto
            ctx.restore();


        }


        ctx.restore();
    }
}



class NewParticle {
    constructor(x,y) {
        this.t = 0;
        this.tSpeed = 0.02;
        this.freeflow = true
        // tracking behaviour
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2;
        this.enemyCenterX = enemyRect.left - containerRect.left + enemyRect.width / 2;
        this.enemyCenterY = enemyRect.top - containerRect.top + enemyRect.height / 2;
        //this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2; //optional
        //this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - rngD(200, 300); //optional
        // free-flow behaviour
        this.speedY = 0;
        this.speedX = 0;
        //this.friction = 0.99 //optional
        this.accelerationY = 0;
        this.accelerationX = 0;
        this.x = playerRect.left - containerRect.left + playerRect.width / 2
        this.y = playerRect.top - containerRect.top + playerRect.height / 2
        this.offsetX = 1;
        this.offsetY = 1;
        //this.mouseForce = -5; //optional
        // particle styling 
        //this.spawnStyle = "increase" //"increase", "fade", optional
        //this.despawnStyle = "fade" // optional
        //this.ease = "inout" //"inout", "in", "out", optional
        this.size = 20;
        //this.sizeImg = 20 //optional;
        this.sizeDecay = 0
        //this.width = this.size //optional
        //this.widthDecay = 0 //optional
        this.alpha = 1;
        this.alphaDecay = 0
        this.rotationSpeed = 0; 
        this.rotation = 0; 
        //this.rotationLock = true //optional
        this.simpleColor = "red"; //optional
        //this.initialColor = { r: 102, g: 255, b: 255 }; //optional
        //this.finalColor = { r: 255, g: 102, b: 255 }; //optional
        //this.colorLife = 1; // optional
        //this.rainbow = true; // optional
        //this.metaimage = new Image(); //optional
        //this.metaimage.src = "img/sys/talentBG.png"; //optional
        //this.strokeColor = "white"
        //this.strokeSize = 10
        this.wobbleY = 0; 
        this.wobbleX = 0; 
        this.wobbleFrequency = 0; 
        this.pulseAmplitude = 0; 
        this.pulseSpeed = 0; 
        //this.image = new Image(); //optional
        //this.image.src = "img/src/emoji/coin.png"; //optional
        //this.imageHue = 200
        // particle emissions
        //this.trailParticle = ParticleTesto; //optional
        //this.particleDensity = 1; //optional
        //this.particleConfig = {simpleColor:"green"}; //optional
        //this.trailParticle2 = Particle; //optional
        //this.particleDensity2 = 1; //optional
        //this.particleConfig2 = {simpleColor:"green"}; //optional
        // particle behaviour
        this.targetCanvas = 'rpgParticles';
        this.behind = true;
        // ignore data
        this.savedAccelerationY = 0;
        this.savedAccelerationX = 0;
        this.trailFinished = false; 
        this.maxSize = this.size
        this.maxAlpha = this.alpha
        this.initialSpeed = this.tSpeed
        this.startX = x;
        this.startY = y;
        this.ballPosition = 0

    }

    update() {

  

        if (this.t >= 1) return; 



        if (this.ease==="inout"){
            this.tSpeed = this.initialSpeed
            if (this.t<0) this.tSpeed = this.initialSpeed/3
            if (this.t<0.1) this.tSpeed = this.initialSpeed/2
            if (this.t<0.2) this.tSpeed = this.initialSpeed/1.5
    
            if (this.t>0.85) this.tSpeed = this.initialSpeed/1.5
            if (this.t>0.9) this.tSpeed = this.initialSpeed/2
            if (this.t>0.95) this.tSpeed = this.initialSpeed/3
        }

        if (this.ease==="in"){
            this.tSpeed = this.initialSpeed
            if (this.t<0) this.tSpeed = this.initialSpeed/3
            if (this.t<0.1) this.tSpeed = this.initialSpeed/2
            if (this.t<0.2) this.tSpeed = this.initialSpeed/1.5
        }

        if (this.ease==="out"){
            this.tSpeed = this.initialSpeed
            if (this.t>0.85) this.tSpeed = this.initialSpeed/1.5
            if (this.t>0.9) this.tSpeed = this.initialSpeed/2
            if (this.t>0.95) this.tSpeed = this.initialSpeed/3
        }

        if (this.despawnStyle!==undefined) {
            if (this.despawnStyle==="fade") {
                if (this.t>0.8) this.alpha -= 0.05
            }

        }
        
        

        this.ballPosition = this.getBallPosition();




        if (this.t < 1) { //position related code
            this.t += this.tSpeed;
            if (this.rotationSpeed!==undefined) this.rotation += this.rotationSpeed;

            if (this.width!==undefined) this.width -= this.widthDecay

            if (this.rotationLock!==undefined) this.rotation = Math.atan2(this.startY - this.ballPosition.y, this.startX - this.ballPosition.x);



            if (this.spawnStyle==="increase"){
                const sizeIncrease = Math.min( ((this.t+0.1)*50), this.maxSize )
                if (this.t<0.3){
                    this.size = sizeIncrease
                }
            }

            if (this.spawnStyle==="fade"){
                const alphaIncrease = Math.min( (this.t*4), this.maxAlpha )
                if (this.t<0.3){
                    this.alpha = alphaIncrease
                }
            }

            if (this.alphaDecay!==undefined) this.alpha -= this.alphaDecay;
            const pulseSize = 1 + Math.sin(Date.now() * this.pulseSpeed) * this.pulseAmplitude;
            this.size *= pulseSize;
            this.size -= this.sizeDecay;

            let renderBehind = false;
            if (this.behind) renderBehind = true

            const combinedOptions = {
                isChild: renderBehind,
                ...this.particleConfig,
            };

            const combinedOptions2 = {
                isChild: renderBehind,
                ...this.particleConfig2,
            };

            if (this.trailParticle!==undefined && rngD(0,1)< Math.min(qualityMaxParticleDensity, this.particleDensity)  ) particleTrackers.push(new this.trailParticle(this.ballPosition.x, this.ballPosition.y, combinedOptions));
            if (this.trailParticle2!==undefined && rngD(0,1)< Math.min(qualityMaxParticleDensity, this.particleDensity2)  ) particleTrackers.push(new this.trailParticle2(this.ballPosition.x, this.ballPosition.y, combinedOptions2));

        }

        
        if (this.t>=1 && !this.trailFinished ){ //on expiration
            this.trailFinished = true
            if (typeof this.end === 'function') this.end()
        }


        if (this.simpleColor===undefined) { //color related code

            if (this.initialColor!==undefined){
                const ratio = this.t / this.colorLife;
                this.color = {
                    r: Math.round(this.initialColor.r + (this.finalColor.r - this.initialColor.r) * ratio),
                    g: Math.round(this.initialColor.g + (this.finalColor.g - this.initialColor.g) * ratio),
                    b: Math.round(this.initialColor.b + (this.finalColor.b - this.initialColor.b) * ratio)
                }
            }

        
        if (this.rainbow){
            const time = Date.now() / 1000; 
            const frequency = 2 * Math.PI / 2; 
            this.color = {
                r: Math.round(127.5 * (1 + Math.sin(frequency * time))),
                g: Math.round(127.5 * (1 + Math.sin(frequency * time + 2 * Math.PI / 3))),
                b: Math.round(127.5 * (1 + Math.sin(frequency * time + 4 * Math.PI / 3)))
            };
        }

        this.color = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`
     }

        if (this.simpleColor!==undefined) this.color = this.simpleColor

        


        if (this.alpha <= 0 || this.size <= 0) {
            this.t=1 // expire early
            return
        } 





    }

    getBallPosition() {

        if (!this.freeflow){

        const t = this.t; 
        var wobbleX = Math.sin(t * this.wobbleFrequency * Math.PI) * this.wobbleX;
        var wobbleY = Math.sin(t * this.wobbleFrequency * Math.PI) * this.wobbleY;
        if (this.controlPointX != undefined){
            this.x = Math.pow(1 - t, 2) * this.playerCenterX + 2 * (1 - t) * t * this.controlPointX + Math.pow(t, 2) * this.enemyCenterX + wobbleX;
            this.y = Math.pow(1 - t, 2) * this.playerCenterY + 2 * (1 - t) * t * this.controlPointY + Math.pow(t, 2) * this.enemyCenterY + wobbleY;
        } else{
            this.x = (1 - t) * this.playerCenterX + t * this.enemyCenterX + wobbleX;
            this.y = (1 - t) * this.playerCenterY + t * this.enemyCenterY + wobbleY;
        }


        } else {
            this.y += this.speedY;
            this.x += this.speedX;
            this.x += Math.sin(this.t * this.wobbleFrequency) * this.wobbleX;
            this.y += Math.cos(this.t * this.wobbleFrequency) * this.wobbleY;

            this.savedAccelerationY += this.accelerationY
            this.y += this.savedAccelerationY;

            this.savedAccelerationX += this.accelerationX
            this.x += this.savedAccelerationX;
        }



        if (this.friction!==undefined){
            this.speedX *= this.friction; 
            this.speedY *= this.friction;
        }



        if (this.mouseForce !== undefined) {
            const dx = mousePositionX - this.x;
            const dy = mousePositionY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const proximityThreshold = 100;
        
            if (distance < proximityThreshold) {
                // Aplicar una fuerza que disminuye más suavemente al alejarse del mouse
                const force = (1 - distance / proximityThreshold) * this.mouseForce;
                this.x += dx / distance * force;
                this.y += dy / distance * force;
            }
        }


        let x = this.x+(this.offsetX)
        let y = this.y+(this.offsetY)

        return { x, y };
    }

    draw(ctx) {

        if (!document.hasFocus()) return
        if (this.t>=1) return




    

        if (this.t<1){
            ctx.save();
            if (this.alpha!==1) ctx.globalAlpha = this.alpha;

            
       if (this.image != undefined) {  
           let imageSize = this.size * 5;
            if (this.sizeImg) imageSize = this.sizeImg
                ctx.translate(this.ballPosition.x, this.ballPosition.y); 
                ctx.rotate(this.rotation); 
                ctx.filter = `hue-rotate(${this.imageHue}deg)`;
                ctx.drawImage(this.image, -imageSize / 2, -imageSize / 2, imageSize, imageSize);
                ctx.filter = `none`;

                if (this.image!==undefined) ctx.restore(); 
            } 





     





            

        ctx.fillStyle = this.color;
        ctx.beginPath();

        if (this.width!==undefined){

            ctx.ellipse(
                this.ballPosition.x,   
                this.ballPosition.y,   
                Math.max(this.width, 0),  
                Math.max(this.size, 0),   
                this.rotation,                        
                0,                        
                Math.PI * 2               
            );


        } else {

            ctx.ellipse(
                this.ballPosition.x,   
                this.ballPosition.y,   
                Math.max(this.size, 0),  
                Math.max(this.size, 0),   
                0,                        
                0,                        
                Math.PI * 2               
            );

        }


        
        if (this.metaimage !==undefined ){
            const pattern = ctx.createPattern(this.metaimage, "repeat");
            ctx.fillStyle = pattern;
        }





      


        

        ctx.fill();




        if (this.strokeSize!==undefined) ctx.globalCompositeOperation = "destination-over";

        if (this.strokeSize > 0) {
            ctx.beginPath();
            ctx.arc(this.ballPosition.x, this.ballPosition.y, Math.max(this.size, 0) + this.strokeSize / 2, 0, Math.PI * 2);
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.strokeSize;
            ctx.stroke();
        }




        ctx.restore(); 

    }




  


    }
}



const ctx1 = document.getElementById('rpgParticles').getContext('2d');
const ctx2 = document.getElementById('globalParticles').getContext('2d');
const ctx3 = document.getElementById('rpgParticlesBehind').getContext('2d');


function animate() {
    if (particleTrackers.length === 0) {
        requestAnimationFrame(animate);
        return; 
    }

    if (!document.hasFocus()){

        for (let i = particleTrackers.length - 1; i >= 0; i--) {
            if (particleTrackers.length>1 && particleTrackers[i].eternal!==true) particleTrackers.splice(i, 1);
        } 

        requestAnimationFrame(animate);
        return; 
    }

    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
    

    // Lógica de las partículas
    for (const particle of particleTrackers) {
        if (particle.isChild) {
            particle.update(); 
                if (particle.targetCanvas === 'rpgParticles') {
                    particle.draw(ctx1);
                } else if (particle.targetCanvas === 'globalParticles') {
                    particle.draw(ctx2);
                } else {
                    particle.draw(ctx3);
                }
            
        }
    }

    for (const particle of particleTrackers) {
        if (!particle.isChild) {
            particle.update(); 
                if (particle.targetCanvas === 'rpgParticles') {
                    particle.draw(ctx1);
                } else if (particle.targetCanvas === 'globalParticles') {
                    particle.draw(ctx2);
                } else {
                    particle.draw(ctx3);
                }
            
        }
    }

    requestAnimationFrame(animate);
}

animate();



function removeParticle(tag) {
    for (let i = particleTrackers.length - 1; i >= 0; i--) {
        if (particleTrackers[i].tag==tag) particleTrackers.splice(i, 1);
    }
}

setInterval(() => { //performance reasons, used to go above

    for (let i = particleTrackers.length - 1; i >= 0; i--) {
        if ( particleTrackers[i].t>=1) {
            particleTrackers.splice(i, 1);
        }

        if (particleTrackers.length>qualityMaxParticles && particleTrackers[i].eternal!==true) particleTrackers.splice(i, 1);

    } 

}, 100);




class ParticleSimplePulse extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);

        this.size = 10;
        this.sizeDecay = -3;
        this.speedY = -0.5;
        this.alphaDecay = 0.07;
        this.simpleColor = "transparent";
        this.strokeColor = "white"
        this.strokeSize = 2

        Object.assign(this, options);

    }
}

class ParticleCursorPulse extends ParticleSimplePulse {
    constructor(x, y, options = {}) {
        super(x, y);
        this.size = 3;
        this.sizeDecay = -3;
        this.speedY = -0.8;
        this.alphaDecay = 0.1;
        Object.assign(this, options);
    }
}


class ParticleDamageText extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);

        this.size = 50;
        this.age = 0; // Initial Age
        this.life = 1000;
        this.sizeDecay = 0;
        this.speedY = -2; //m
        this.speedX = 0;
        this.alpha = 1;
        this.alphaDecay = 0.015; //m
        this.simpleColor = undefined;
        this.initialColor = { r: 255, g: 255, b: 255 };
        this.finalColor = { r: 255, g: 102, b: 255 };
        this.colorLife = 10; // Only affects color
        this.strokeColor = { r: 255, g: 255, b: 255 } //m
        this.strokeSize = 3 //m
        this.wobbleX = 1; 
        this.wobbleY = 1; 
        this.wobbleFrequency = 0;
        this.offsetX = 0.96; //m
        this.offsetY = 1;
        this.pulseAmplitude = 0.03; //m
        this.pulseSpeed = 0.02; 
        this.angle = 0; 
        this.angleSpeed = 0;
        this.glowStrength = 0;
        this.text = '1020K';
        this.targetCanvas = 'rpgParticles'

        Object.assign(this, options);

    }
}

class ParticleTesto extends NewParticle {
    constructor(x,y,options = {}) {
        super(x, y);
        this.x = x
        this.y = y
        this.speedY = 0;
        this.speedX = 0;
        this.tSpeed = 0.05; // Age Speed
        this.sizeDecay = 1
        this.trailParticle = undefined; //optional

        this.simpleColor = "transparent"; //optional
        //this.strokeColor = "white"
        //this.strokeSize = 2

        this.image.src = "img/src/projectiles/exp.png"; //optional
        this.imageHue = 100
        this.offsetX = rngD(0.98,1.02);
        this.offsetY = rngD(0.98,1.02);

        this.rotation = rngD(0,365); 

        this.spawnStyle = "fade" //"increase", "fade", optional




        this.freeflow = true

        this.playerCenterX = x;
        this.playerCenterY = y;




        Object.assign(this, options);

    }
}


class ParticleSimplePulseElemental extends ParticleSimplePulse {
    constructor(x, y, options = {}) {
        super(x, y);
        this.strokeColor = "orange"
        Object.assign(this, options);
    }
}

class ParticleSimplePulseNature extends ParticleSimplePulse {
    constructor(x, y, options = {}) {
        super(x, y);
        this.strokeColor = "lime"
        Object.assign(this, options);
    }
}

class ParticleSimplePulseOccult extends ParticleSimplePulse {
    constructor(x, y, options = {}) {
        super(x, y);
        this.strokeColor = "Purple"
        Object.assign(this, options);
    }
}







class ParticleSimplePulse2 extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);

        this.size = 10;
        this.sizeDecay = -2;
        this.speedY = -0.5;
        this.alphaDecay = 0.07;
        this.simpleColor = "white";
        this.strokeColor = "white"
        this.strokeSize = 2

        Object.assign(this, options);


    }
}

class ParticleSimpleSparks extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);
        Object.assign(this, options);

        
        this.size = 8;
        this.sizeDecay = 0.5;
        this.alphaDecay = 0.02;
        this.simpleColor = "white";
        this.angle = rngD(0,10); 
        this.angleSpeed = 10; 

    }
}


class TrackerSimpleLuma extends ParticleTracker {
    constructor(x, y, options = {}) {
        super(x, y);
        this.tSpeed = 0.5;
        this.trailParticle = ParticleSimpleSparks;
        Object.assign(this, options);
    }
}







class TrackerSimpleArrow extends ParticleTracker {
    constructor(x, y, options = {}) {

        super(x, y);

        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 1.5;
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - rngD(80,150); //m
        this.endParticle = ParticleSimplePulse;
        this.image = new Image(); //m
        this.image.src = "img/src/projectiles/arrow.png"; //m
        this.rotationSpeed = 0.03 ; //m
        this.rotation = -0.5 ; //m
        Object.assign(this, options);

    }
}


class TrackerSimpleSlash extends ParticleTracker {
    constructor(x, y, options = {}) {

        super(x, y);

        this.tSpeed = 0.1; // Track Speed

        this.playerCenterX = enemyRect.left - containerRect.left + enemyRect.width / 2 - rngD(50,120);
        this.playerCenterY = enemyRect.top - containerRect.top + enemyRect.height / 2 - rngD(50,120);
        this.enemyCenterX = enemyRect.left - containerRect.left + enemyRect.width / 2 + rngD(50,120);
        this.enemyCenterY = enemyRect.top - containerRect.top + enemyRect.height / 2 + rngD(50,120);
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2;  //2 default
        this.controlPointY = containerRect.height/1.25  ;


        this.trailParticle = ParticleSimpleSlash;





        
        Object.assign(this, options);

    }
}

class ParticleSimpleSlash extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);

        this.sizeDecay = 0.4;
        this.alphaDecay = 0.02;
        this.alpha = 1;

        this.speedY = -0.5;

        this.initialColor = { r: 255, g: 255, b: 255 };
        this.finalColor = { r: 199, g: 199, b: 199 };
        this.colorLife = 4; // Only affects color

        this.size = 7;
        this.wobbleX = 6; 
        this.wobbleY = 6; 
        this.wobbleFrequency = 4;


        Object.assign(this, options);

    }
}

class ParticleSlashFire extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);

        this.sizeDecay = 0.5;
        this.speedY = -1;
        this.size = 10; 
        this.initialColor = { r: 255, g: 171, b: 0 }; 
        this.finalColor = { r: 100, g: 100, b: 100 }; 
        this.colorLife = 10; // Only affects color 
        this.angle = rngD(0.4,1); 
        this.angleSpeed = 10;

        Object.assign(this, options);

    }
}




class TrackerLumaFrostBolt extends ParticleTracker {
    constructor(x, y, options = {}) {

        super(x, y);

        this.tSpeed = 0.01 ; // Track Speed
        this.playerCenterX = mouseClickX;
        this.playerCenterY = mouseClickY;
        this.enemyCenterX = enemyRect.left - containerRect.left + enemyRect.width / rngD(1.5,2);
        this.enemyCenterY = enemyRect.top - containerRect.top + enemyRect.height / rngD(1.5,2);
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2 - rngD(-1000, 1000);

        this.trailParticle = ParticleFrostBolt
        this.trailParticle2 = ParticleFlakes1
        this.particle2Density = 0.2
        this.endParticle = TrackerExplosionBit;
        this.wobbleY = 10; 
        this.wobbleX = 0; 
        this.wobbleFrequency = 8; 
       
        Object.assign(this, options);

    }
}

class TrackerScreenFirework extends ParticleTracker {
    constructor(x, y, options = {}) {

        super(x, y);

        this.tSpeed = 0.005 ; // Track Speed
        this.playerCenterX = containerRect.width / rngD(1.5,2.5);
        this.playerCenterY = containerRect.height;
        this.enemyCenterX = containerRect.width / rngD(1.5,2.5);
        this.enemyCenterY = containerRect.height / 3;
        this.controlPointX = containerRect.height*0.9;
        this.controlPointY = containerRect.height/3;

        this.trailParticle = ParticleFirework
        this.trailParticle2 = ParticleStars1;
        this.particle2Density = 0.2
        this.endParticle = ParticleExplosionPulse;
        this.wobbleY = 0; 
        this.wobbleX = 10; 
        this.wobbleFrequency = 30; 
       
        Object.assign(this, options);

    }

    end() {

        const ballPosition = this.getBallPosition();

        particleTrackers.push(new TrackerScreenFireworkBit(ballPosition.x, ballPosition.y));
        particleTrackers.push(new TrackerScreenFireworkBit(ballPosition.x, ballPosition.y));
        particleTrackers.push(new TrackerScreenFireworkBit(ballPosition.x, ballPosition.y));
        particleTrackers.push(new TrackerScreenFireworkBit(ballPosition.x, ballPosition.y));
        particleTrackers.push(new TrackerScreenFireworkBit(ballPosition.x, ballPosition.y));
        particleTrackers.push(new TrackerScreenFireworkBit(ballPosition.x, ballPosition.y));
        particleTrackers.push(new TrackerScreenFireworkBit(ballPosition.x, ballPosition.y));
        particleTrackers.push(new TrackerScreenFireworkBit(ballPosition.x, ballPosition.y));
        particleTrackers.push(new TrackerScreenFireworkBit(ballPosition.x, ballPosition.y));
        particleTrackers.push(new TrackerScreenFireworkBit(ballPosition.x, ballPosition.y));
        particleTrackers.push(new TrackerScreenFireworkBit(ballPosition.x, ballPosition.y));
        particleTrackers.push(new TrackerScreenFireworkBit(ballPosition.x, ballPosition.y));
        particleTrackers.push(new TrackerScreenFireworkBit(ballPosition.x, ballPosition.y));
        playSound("audio/explosion.mp3")
    }
}

class TrackerScreenFireworkBit extends ParticleTracker {
    constructor(x, y, options = {}) {

        super(x, y);

        this.tSpeed = 0.07; // Track Speed
        this.speedY = rngD(-30,30);
        this.speedX = rngD(-30,30);
        this.trailParticle = ParticleFirework
       
        Object.assign(this, options);

    }
}



class ParticleFrostBolt extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);


        this.size = 12; //m
        this.initialColor = { r: 83, g: 167, b: 252 }; //m
        this.finalColor = { r: 193, g: 222, b: 252 }; //m
        this.colorLife = 20; // Only affects color //m
        this.glowStrength = 10;
        Object.assign(this, options);

    }
}




class TrackerExplosionBit extends ParticleTracker {
    constructor(x, y, options = {}) {

        super(x, y);

        this.tSpeed = 0.05 ; // Track Speed
        this.enemyCenterX = enemyRect.left - containerRect.left + enemyRect.width / rngD(1.5,2);
        this.enemyCenterY = enemyRect.top - containerRect.top + enemyRect.height / rngD(1.5,2);
        this.trailParticle = ParticleExplosionSmoke
        this.particleDensity = 0.3
        this.trailParticle2 = ParticleExplosionBit
        this.particle2Density = 0.2
        this.endParticle = ParticleExplosionPulse;
        this.wobbleY = 10; 
        this.wobbleX = 0; 
        this.wobbleFrequency = 8; 
       
        Object.assign(this, options);

    }
}

class ParticleExplosionPulse extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);

        this.size = 10;
        this.sizeDecay = -20;
        this.speedY = -0.5;
        this.alphaDecay = 0.07;
        this.simpleColor = "transparent";
        this.strokeColor = "white"
        this.strokeSize = 20

        Object.assign(this, options);

    }
}


class ParticleExplosionBit extends ParticleTracker {
    constructor(x, y, options = {}) {

        super(x, y);

        this.tSpeed = 0.07; // Track Speed
        this.speedY = rngD(-30,30);
        this.speedX = rngD(-30,30);
        this.trailParticle = Particle
       
        Object.assign(this, options);

    }
}

class ParticleExplosionSmoke extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);


        this.size = 20;
        this.sizeDecay = 0.5;
        this.alphaDecay = 0.02;
        this.speedY = -1;
        this.initialColor = { r: 102, g: 255, b: 255 };
        this.finalColor = { r: 255, g: 102, b: 255 };
        this.offsetX = rngD(0.9,1.1);
        this.offsetY = rngD(0.9,1.1);
        this.pulseAmplitude = 0.5; 
        this.pulseSpeed = 0.03; 

        Object.assign(this, options);

    }
}







class TrackerCursorClick extends ParticleTracker {
    constructor(x, y, options = {}) {
        super(x, y);
        this.tSpeed = 1;
        this.endParticle = ParticleCursorPulse;
        Object.assign(this, options);
    }
}

class TrackerWoodenBowSkill extends TrackerSimpleArrow {
    constructor(x, y, options = {}) {

        
        super(x, y);

        this.enemyCenterX = enemyRect.left - containerRect.left + rngD(0,300)+ enemyRect.width / rngD(1.5,3);
        this.enemyCenterY = enemyRect.top - containerRect.top + enemyRect.height / 1.5;
        Object.assign(this, options);

    }
}

class TrackerItemGot extends ParticleTracker {
    constructor(x, y, options = {}) {
        super(x, y);

        this.tSpeed = 0.013; // Track Speed
        this.playerCenterX = enemyRect.left - containerRect.left + enemyRect.width / rngD(1.5,2);
        this.playerCenterY = enemyRect.top - containerRect.top + enemyRect.height / rngD(1.3,2);
        this.enemyCenterX = inventoryBagRect.left - containerRect.left + inventoryBagRect.width / 2;
        this.enemyCenterY = inventoryBagRect.top - containerRect.top + inventoryBagRect.height / 2;
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2 + 1300; //2 default
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - rngD(200, -1000);
        this.trailParticle = ParticleItemGot1;
        this.trailParticle2 = ParticleStars1;
        this.particles = [];
        this.particleDensity = 1;
        this.particle2Density = 0.2;
        this.image = new Image();
        this.image.src = "img/src/icons/drop_loot.png"; 
        this.size = 10;


        Object.assign(this, options);

    }
}




const coinTrackerImg = document.getElementById('currencyCoinImg');
const coinTrackerRect = coinTrackerImg.getBoundingClientRect();

let selectedItemRect = contextSelectedItem.getBoundingClientRect();


class TrackerSellCoins extends ParticleTracker {
    constructor(x, y, options = {}) {
        super(x, y);

        this.tSpeed = 0.025; // Track Speed
        this.playerCenterX = selectedItemRect.left - containerRect.left + selectedItemRect.width / 2;
        this.playerCenterY = selectedItemRect.top - containerRect.top + selectedItemRect.height / 2;
        this.enemyCenterX = coinTrackerRect.left - containerRect.left + coinTrackerRect.width / 2;
        this.enemyCenterY = coinTrackerRect.top - containerRect.top + coinTrackerRect.height / 2;
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2 - rngD(-300,100); //2 default
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - -1000;
        this.trailParticle = ParticleItemGot1;
        this.particles = [];
        this.particleDensity = 1;
        this.image = new Image();
        this.image.src = "img/src/icons/goldMedal.png"; 
        this.size = 6;
        this.targetCanvas = 'globalParticles'


        Object.assign(this, options);

    }
}


class TrackerSellPulse extends ParticleTracker {
    constructor(x, y, options = {}) {
        super(x, y);
        this.tSpeed = 1; // Track Speed
        this.fixedX = selectedItemRect.left - containerRect.left + selectedItemRect.width / 2;
        this.fixedY = selectedItemRect.top - containerRect.top + selectedItemRect.height / 2;
        this.trailParticle2 = ParticleStars1;

        this.endParticle = ParticleSimplePulse;
        this.targetCanvas = 'globalParticles'

        Object.assign(this, options);
    }
}

class TrackerUpgradePulse extends ParticleTracker {
    constructor(x, y, options = {}) {
        super(x, y);
        this.tSpeed = 0.1; // Track Speed
        this.fixedX = selectedItemRect.left - containerRect.left + selectedItemRect.width / 2;
        this.fixedY = selectedItemRect.top - containerRect.top + selectedItemRect.height / 2;
        this.trailParticle = ParticleStars1;
        this.particleDensity = 0.3;
        this.endParticle = ParticleSimplePulse;
        this.targetCanvas = 'globalParticles'

        Object.assign(this, options);
    }
}

class TrackerPrismScutesSplash extends ParticleTracker {
    constructor(x, y, options = {}) {
        super(x, y);
        this.tSpeed = 0.1; // Track Speed
        this.fixedX = selectedItemRect.left - containerRect.left + selectedItemRect.width / 2;
        this.fixedY = selectedItemRect.top - containerRect.top + selectedItemRect.height / 2;
        this.trailParticle = ParticleScuteSplash;
        this.particleDensity = 0.3;
        this.endParticle = ParticleSimplePulse;
        this.targetCanvas = 'globalParticles'

        Object.assign(this, options);
    }
}




class ParticleItemGot1 extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);

        this.simpleColor = "white"
        this.size = 12; //m
        this.alpha = 0.6
        this.alphaDecay = 0.07
        this.sizeDecay = 1
        Object.assign(this, options);

    }
}

class ParticleItemGot2 extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);
        
        this.simpleColor = "lawngreen"
        this.size = 12; //m
        this.colorLife = 20; // Only affects color //m
        this.alpha = 0.6
        Object.assign(this, options);

    }
}

class ParticleItemGot3 extends ParticleItemGot2 {
    constructor(x, y, options = {}) {
        super(x, y);
        this.simpleColor = "blue"
        Object.assign(this, options);
    }
}



class ParticleStars1 extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);


        this.size = 10;
        this.sizeDecay = 0.5;
        this.alphaDecay = 0.02;
        this.simpleColor = "transparent";
        this.image.src = "img/src/icons/drop_star.png"; 
        this.offsetX = rngD(0.95,1.05);
        this.offsetY = rngD(0.95,1.05);


        Object.assign(this, options);

    }
}

class ParticleScuteSplash extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);


        this.size = 5;
        this.sizeDecay = 0;
        this.alphaDecay = 0.02;
        this.simpleColor = "transparent";
        this.image.src = "img/src/emoji/scute.png"; 
        this.angle = rngD(0,20); 
        this.angleSpeed = rngD(1,3); 
        this.pulseAmplitude = 0.05; 
        this.pulseSpeed = 0.01; 

        Object.assign(this, options);

    }
}

class ParticleFlakes1 extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);


        this.size = 7;
        this.sizeDecay = 0.2;
        this.alphaDecay = 0.02;
        this.simpleColor = "transparent";
        this.image.src = "img/src/projectiles/flake.png"; 
        this.offsetX = rngD(0.98,1.02);
        this.offsetY = rngD(0.98,1.02);

        Object.assign(this, options);

    }
}





class ParticleFire extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);


        this.size = 12; //m
        this.initialColor = { r: 255, g: 171, b: 0 }; //m
        this.finalColor = { r: 100, g: 100, b: 100 }; //m
        this.colorLife = 20; // Only affects color //m
        this.glowStrength = 10;
        Object.assign(this, options);

    }
}





class ParticleNature extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);


        this.size = 10; //m
        this.sizeDecay = 0; //m
        this.initialColor = { r: 85, g: 240, b: 101 };
        this.finalColor = { r: 240, g: 178, b: 85 };
        this.colorLife = 20; // Only affects color /m
        this.alpha = 0.7; //m



        Object.assign(this, options);

    }
}

class ParticleShadow extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);


        this.size = 10; //m
        this.sizeDecay = 0.2; //m

        Object.assign(this, options);

    }
}



class TrackerLifesteal extends ParticleTracker {
    constructor(x, y, options = {}) {
        super(x, y);
        this.tSpeed = 0.05; // Track Speed
        this.playerCenterX = lastAttackX;
        this.playerCenterY = lastAttackY;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / rngD(1.5,1.8);
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / rngD(1.4,1.5);
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2; //2 default
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - 0;
        this.wobbleFrequency = 3; 
        this.trailParticle = ParticleLifesteal;
        Object.assign(this, options);
    }
}

class ParticleLifesteal extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.size = 6;
        this.sizeDecay = 0.3;
        this.alphaDecay = 0.02;
        this.initialColor = { r: 213, g: 19, b: 19 };
        this.finalColor = { r: 255, g: 102, b: 255 };
        Object.assign(this, options);
    }
}


class TrackerFulgurant extends ParticleTracker {
    constructor(x, y, options = {}) {
        super(x, y);
        this.tSpeed = 0.04; // Track Speed
        this.playerCenterX = lastAttackX;
        this.playerCenterY = lastAttackY;
        this.enemyCenterX = enemyRect.left - containerRect.left + enemyRect.width / rngD(1.5,2);
        this.enemyCenterY = enemyRect.top - containerRect.top + enemyRect.height / rngD(1.5,2);
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2 - rngD(-500,500); //2 default
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - rngD(-500,500);
        this.wobbleY = 5; 
        this.wobbleX = 0; 
        this.wobbleFrequency = 20;
        this.trailParticle = ParticleFulgur;
        this.endParticle = ParticleSimplePulse;
        Object.assign(this, options);
    }
}

class ParticleFulgur extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.size = 6;
        this.speedY = 0;
        this.sizeDecay = 0;
        this.alphaDecay = 0.02;
        this.initialColor = { r: 186, g: 230, b: 255 };
        this.finalColor = { r: 73, g: 196, b: 249 };
        this.wobbleX = 1; 
        this.wobbleY = 1; 
        this.wobbleFrequency = 5;
        Object.assign(this, options);
    }
}


class TrackerShackled extends ParticleTracker {
    constructor(x, y, options = {}) {
        super(x, y);
        this.tSpeed = 0.02; // Track Speed
        this.playerCenterX = enemyRect.left - containerRect.left + enemyRect.width / 2 - rngD(-200,200);
        this.playerCenterY = enemyRect.top - containerRect.top + enemyRect.height / 2 - rngD(-200,200);
        this.enemyCenterX = enemyRect.left - containerRect.left + enemyRect.width / rngD(1.5,2);
        this.enemyCenterY = enemyRect.top - containerRect.top + enemyRect.height / rngD(1.5,2);
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2 ; //2 default
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - rngD(-100,100) ;
        this.trailParticle = ParticleShackled;
        this.wobbleY = 10; 
        this.wobbleX = 0; 
        this.wobbleFrequency = 3; 
        Object.assign(this, options);
    }
}

class ParticleShackled extends Particle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.size = 6;
        this.speedY = 0;
        this.alpha = 0.8
        this.sizeDecay = 0;
        this.alphaDecay = 0.02;
        this.wobbleX = 5; 
        this.wobbleY = 5; 
        this.wobbleFrequency = 10;
        Object.assign(this, options);
    }
}






class WoodenSwordSlash_O extends ParticleSimpleSlash {
    constructor(x, y, options = {}) {
        super(x, y);
        this.initialColor = { r: 255, g: 171, b: 0 }; 
        this.finalColor = { r: 100, g: 100, b: 100 }; 
        Object.assign(this, options);
    }
}

class WoodenSwordParticle_O extends ParticleSlashFire {
    constructor(x, y, options = {}) {
        super(x, y);
        Object.assign(this, options);
    }
}

class WoodenSwordSlash_E extends ParticleSimpleSlash {
    constructor(x, y, options = {}) {
        super(x, y);
        this.initialColor = { r: 122, g: 204, b: 252 }; 
        this.finalColor = { r: 190, g: 225, b: 245 }; 
        this.colorLife = 12; 
        Object.assign(this, options);
    }
}

class WoodenSwordParticle_E extends ParticleSlashFire {
    constructor(x, y, options = {}) {
        super(x, y);
        this.initialColor = { r: 122, g: 204, b: 252 }; 
        this.finalColor = { r: 190, g: 225, b: 245 }; 
        this.colorLife = 12; 
        Object.assign(this, options);
    }
}

class WoodenSwordSlash_N extends ParticleSimpleSlash {
    constructor(x, y, options = {}) {
        super(x, y);
        this.initialColor = { r: 245, g: 190, b: 237 }; 
        this.finalColor = { r: 159, g: 98, b: 149 }; 
        this.colorLife = 15; 
        Object.assign(this, options);
    }
}

class WoodenSwordParticle_N extends ParticleSlashFire {
    constructor(x, y, options = {}) {
        super(x, y);
        this.initialColor = { r: 245, g: 190, b: 237 }; 
        this.finalColor = { r: 190, g: 245, b: 221 }; 
        this.colorLife = 5; 
        Object.assign(this, options);
    }
}





/*

//const controlPointX = (playerCenterX + enemyCenterX) / rng(-50,50); // Punto medio en X
//const controlPointY = Math.min(playerCenterY, enemyCenterY) - rng(100,200)  ; 

//const controlPointX = (playerCenterX + enemyCenterX) / 2; // Punto medio en X
//const controlPointY = Math.min(playerCenterY, enemyCenterY) - Math.max(100, Math.random()*300)  ; // 50 píxeles arriba del punto medio en Y



function rng(min, max) { //gives a random number between the two
return Math.floor(Math.random() * (max - min + 1)) + min;
}*/