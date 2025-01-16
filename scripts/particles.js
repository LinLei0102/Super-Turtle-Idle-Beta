



setTimeout(() => {

    //particleTrackers.push(new ParticleGlimmerVortex())
    //animatedSplash("player","magicCircle","magicCircle",250)
    //particleTrackers.push(new ParticleFirework())

}, 1000);


setInterval(() => {

    if (specialWeather){
        particleTrackers.push(new ParticleAmbienceLeaf())
        setTimeout(() => { particleTrackers.push(new ParticleAmbienceLeaf()) }, 400);
        setTimeout(() => { particleTrackers.push(new ParticleAmbienceLeaf()) }, 800);
        setTimeout(() => { particleTrackers.push(new ParticleAmbienceLeaf()) }, 1200);
        setTimeout(() => { particleTrackers.push(new ParticleAmbienceLeaf()) }, 1600);
    } 
    
}, 2000);


settings.quality = "High"

const qualities = ["High","Medium", "Low","Very Low"];
let currentQualityIndex = 0;


function switchQuality(){
    playSound("audio/button1.mp3");
    currentQualityIndex = (currentQualityIndex + 1) % qualities.length;
    settings.quality = qualities[currentQualityIndex];
    did("qualityToggle").innerHTML = qualities[currentQualityIndex];
    setParticleQuality();
}

let qualityMaxParticles = 50
let qualityMaxParticleDensity = 1

function setParticleQuality(){
    if (settings.quality === "High"){
        qualityMaxParticles = 80
        qualityMaxParticleDensity = 1
    }
    if (settings.quality === "Medium"){
        qualityMaxParticles = 50
        qualityMaxParticleDensity = 0.8
    }
    if (settings.quality === "Low"){
        qualityMaxParticles = 40
        qualityMaxParticleDensity = 0.6
    }
    if (settings.quality === "Very Low"){
        qualityMaxParticles = 30
        qualityMaxParticleDensity = 0.3
    }
}


class ParticleFloatingHeart extends NewParticle {
    constructor(x,y,options = {}) {
        super(x, y);

        this.simpleColor = "transparent"
        this.tSpeed = 0.01;
        this.speedY = rngD(-2,-2.5);
        this.x = x;
        this.y = y;
        this.size = 10;
        this.offsetX = rngD(-60,60);
        this.offsetY = rngD(-60,60);
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/heartfx.png"; //optional
        this.imageHue = 300
        this.wobbleX = rngD(-2,2); 
        this.wobbleFrequency = rngD(-2,2); 
        this.rotationSpeed = rngD(-0.01,0.01); 
        this.sizeDecay = 0.05
        this.alphaDecay = 0.01
        this.spawnStyle = "increase" //"increase", "fade", optional
        this.maxSize = this.size
        this.pulseAmplitude = 0; 
        this.pulseSpeed = 0; 
        Object.assign(this, options);

    }
}



class ParticleGlimmerVortex extends NewParticle {
    constructor(x,y,options = {}) {
        super(x, y);

        this.freeflow = true
        this.tSpeed = 0;
        this.size = 10;
        this.trailParticle = ParticleGlimmerVortexHalo1; //optional
        this.y = playerRect.top - containerRect.top + playerRect.height / 1.4
        this.particleDensity = 0.05; //optional
        this.simpleColor ="transparent"
        this.eternal = true;
        this.tag = "glimmer"

        Object.assign(this, options);

    }
}

class ParticleGlimmerVortexHalo1 extends NewParticle { //green
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.tSpeed = 0.005
        this.size = 70; //m
        this.speedY = 0;
        this.speedX = 0;
        this.alpha = 0.7
        this.alphaDecay = 0.01
        this.sizeDecay = 0.4;
        this.simpleColor = "transparent"
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/vortexSpace1.png"; //optional
        this.spawnStyle = "fade" //"increase", "fade", optional
        this.rotationSpeed = rngD(0.008,0.015); 
        this.rotation = rngD(0,5); 
        this.maxAlpha = this.alpha
        this.targetCanvas = 'rpgParticlesBehind'
        Object.assign(this, options);
    }
}


class ParticleGlimmerVortexHalo2 extends ParticleGlimmerVortexHalo1 { //green
    constructor(x, y, options = {}) {
        super(x, y);
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/vortexSpace2.png"; //optional
        Object.assign(this, options);
    }
}

class ParticleGlimmerVortexHalo3 extends ParticleGlimmerVortexHalo1 { //green
    constructor(x, y, options = {}) {
        super(x, y);
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/vortexSpace3.png"; //optional
        Object.assign(this, options);
    }
}




class ParticleGlimmerHeart extends NewParticle {
    constructor(x,y,options = {}) {
        super(x, y);

        this.freeflow = false
        this.tSpeed = 0.02;
        this.wobbleY = 3; 
        this.wobbleFrequency = 2; 
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/heartfx.png"; //optional
        this.size = 8;
        this.trailParticle = ParticleGlimmerHeartTrail; //optional
        this.particleDensity = 1; //optional
        this.simpleColor ="transparent"
        this.ease = "inout" 
        this.eternal = true;
        this.initialSpeed = this.tSpeed
        this.tag = "glimmer"
        this.pulseAmplitude = 0.02; 
        this.pulseSpeed = 0.02; 
        this.imageHue = -100
        Object.assign(this, options);

    }
}


class ParticleGlimmerHeartTrail extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.speedY = 0;
        this.size = 13; //m
        this.sizeDecay = 0.5
        this.alphaDecay = 0.05
        this.simpleColor = undefined
        this.initialColor = { r: 238, g: 139, b: 253 }; //optional
        this.finalColor = { r: 255, g: 181, b: 225 }; //optional
        this.colorLife = 0.2; // optional


        Object.assign(this, options);

    }
}


class ParticleGlimmerHeart1A extends ParticleGlimmerHeart {
    constructor(x,y,options = {}) {
        super(x, y);
        this.imageHue = -100
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3  ;
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerHeart1B())
    }
}
class ParticleGlimmerHeart1B extends ParticleGlimmerHeart {
    constructor(x,y,options = {}) {
        super(x, y);
        this.imageHue = -100
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.targetCanvas = 'rpgParticlesBehind'
        this.particleConfig = {targetCanvas:"rpgParticlesBehind"}; //optional
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerHeart1A())
    }
}



class ParticleGlimmerHeart2A extends ParticleGlimmerHeart {
    constructor(x,y,options = {}) {
        super(x, y);
        this.imageHue = 0
        this.particleConfig = {
            initialColor : { r: 255, g: 222, b: 88 }, //optional
            finalColor : { r: 133, g: 255, b: 88 }, //optional
        }; //optional
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3  ;
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerHeart2B())
    }
}
class ParticleGlimmerHeart2B extends ParticleGlimmerHeart {
    constructor(x,y,options = {}) {
        super(x, y);
        this.imageHue = 0
        this.particleConfig = {
            initialColor : { r: 255, g: 222, b: 88 }, //optional
            finalColor : { r: 133, g: 255, b: 88 }, //optional
            targetCanvas:"rpgParticlesBehind",
        }; //optional
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.targetCanvas = 'rpgParticlesBehind'
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerHeart2A())
    }
}

class ParticleGlimmerHeart3A extends ParticleGlimmerHeart {
    constructor(x,y,options = {}) {
        super(x, y);
        this.imageHue = 200
        this.particleConfig = {
            initialColor : { r: 255, g: 255, b: 255 }, //optional
            finalColor : { r: 0, g: 0, b: 0 }, //optional
            colorLife : 0.3,
        }; //optional
        
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3  ;
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerHeart3B())
    }
}
class ParticleGlimmerHeart3B extends ParticleGlimmerHeart {
    constructor(x,y,options = {}) {
        super(x, y);
        this.imageHue = 200
        this.particleConfig = {
            initialColor : { r: 255, g: 255, b: 255 }, //optional
            finalColor : { r: 0, g: 0, b: 0 }, //optional
            targetCanvas:"rpgParticlesBehind",
            colorLife : 0.3,

        }; //optional
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.targetCanvas = 'rpgParticlesBehind'
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerHeart3A())
    }
}

class ParticleGlimmerHeart4A extends ParticleGlimmerHeart {
    constructor(x,y,options = {}) {
        super(x, y);
        this.imageHue = 400
        this.particleConfig = {
            rainbow : true,
            simpleColor : undefined,
        }; //optional
        
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3  ;
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerHeart4B())
    }
}
class ParticleGlimmerHeart4B extends ParticleGlimmerHeart {
    constructor(x,y,options = {}) {
        super(x, y);
        this.imageHue = 400
        this.particleConfig = {
            rainbow : true,
            simpleColor : undefined,
            targetCanvas:"rpgParticlesBehind",

        }; //optional
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.targetCanvas = 'rpgParticlesBehind'
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerHeart4A())
    }
}




class ParticleGachaBox extends NewParticle {
    constructor(x,y,options = {}) {
        super(x, y);

        this.freeflow = true
        this.tSpeed = 0;
        this.size = 10;
        this.trailParticle = ParticleGachaBoxEpic; //optional
        this.particleDensity = 0.2; //optional
        this.trailParticle2 = ParticleGachaBoxSparkles; //optional
        this.particleDensity2 = 0.2; //optional
        this.x = x
        this.y = y
        this.simpleColor ="transparent"
        this.eternal = true;
        this.tag = "gachaBox";
        this.targetCanvas = 'globalParticles'


        Object.assign(this, options);

    }
}

class ParticleGachaBoxEpic extends NewParticle { //green
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.tSpeed = 0.005
        this.size = 50; //m
        this.speedY = -2;
        this.alphaDecay = 0.01
        this.alpha = 0.2
        this.sizeDecay = 0.8;
        this.simpleColor = "transparent"
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/aura.png"; //optional
        this.spawnStyle = "fade" //"increase", "fade", optional
        this.rotationSpeed = rngD(0.003,-0.003); 
        this.rotation = rngD(0,5); 
        this.wobbleY = rngD(-1,1); 
        this.wobbleX = rngD(-1,1); 
        this.wobbleFrequency = rngD(-1,1); 
        this.targetCanvas = "globalParticles"
        this.imageHue = 200; //optional
        this.maxAlpha = this.alpha

        Object.assign(this, options);
    }
}


class ParticleGachaBoxFlash extends NewParticle { //green
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.tSpeed = 0.005
        this.size = 150; //m
        this.alphaDecay = 0.01
        this.sizeDecay = 1;
        this.alpha = 0.3
        this.simpleColor = "transparent"
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/flare2.png"; //optional
        this.targetCanvas = "globalParticles"
        this.imageHue = 200

        //this.maxAlpha = this.alpha

        Object.assign(this, options);
    }
}

class ParticleGachaBoxPulse extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.simpleColor = "transparent"; //optional
        this.tSpeed = 0.01;
        this.x = x;
        this.y = y;
        this.size = 1;
        this.alphaDecay = 0.05
        this.sizeDecay = -5
        this.strokeColor = "white"
        this.strokeSize = 4
        this.targetCanvas = "globalParticles"

        Object.assign(this, options);

    }
}

class ParticleGachaBoxFlash2 extends NewParticle { //green
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.tSpeed = 0.005
        this.size = 150; //m
        this.alphaDecay = 0.01
        this.sizeDecay = 1;
        this.alpha = 0.3
        this.simpleColor = "transparent"
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/glow2.png"; //optional
        this.targetCanvas = "globalParticles"
        this.imageHue = 200

        //this.maxAlpha = this.alpha

        Object.assign(this, options);
    }
}







class ParticleGachaBoxSparkles extends NewParticle { //green
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.tSpeed = 0.005
        this.size = 20; //m
        this.speedY = -2;
        this.sizeDecay = 0.5;
        
        this.simpleColor = "transparent"
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/drop_star.png"; //optional
        this.spawnStyle = "fade" //"increase", "fade", optional
        this.rotationSpeed = rngD(0.003,-0.003); 
        this.rotation = rngD(0,5); 
        this.wobbleY = rngD(-1,1); 
        this.wobbleX = rngD(-1,1); 
        this.offsetX = rngD(0.95,1.05);
        this.offsetY = rngD(0.95,1.05);
        this.wobbleFrequency = rngD(-1,1); 
        this.targetCanvas = "globalParticles"
        this.imageHue = 200; //optional

        Object.assign(this, options);
    }
}







class ParticleGlimmerAura extends NewParticle {
    constructor(x,y,options = {}) {
        super(x, y);

        this.freeflow = true
        this.tSpeed = 0;
        this.size = 10;
        this.trailParticle = ParticleGlimmerMagicCircle; //optional
        this.particleDensity = 0.05; //optional
        this.y = playerRect.top - containerRect.top + playerRect.height / 1.4
        this.simpleColor ="transparent"
        this.eternal = true;
        this.tag = "glimmer"

        Object.assign(this, options);

    }
}


class ParticleGlimmerMagicCircle extends NewParticle {
    constructor(x,y,options = {}) {
        super(x, y);

        this.x = x;
        this.y = y;
        this.simpleColor = "#B5FF9A"; //optional
        this.tSpeed = 0.01; // Age Speed
        this.speedY = rngD(-3,-4);
        this.speedX = 0;
        this.friction = 0.98 //optional
        this.size = 3;
        this.width = this.size*8
        this.widthDecay = 2;
        this.rotation = 1.6;
        this.alphaDecay = 0.04
        //this.image = new Image(); //optional
        //this.image.src = "img/src/projectiles/glow2.png"; //optional
        this.offsetX = rngD(-50,50);
        this.offsetY = rngD(-50,50);

        Object.assign(this, options);

    }
}







class ParticleHolyGlimmerAura extends NewParticle {
    constructor(x,y,options = {}) {
        super(x, y);

        this.freeflow = true
        this.tSpeed = 0;
        this.size = 10;
        this.trailParticle = ParticleHolyGlimmerAuraHalo; //optional
        this.y = playerRect.top - containerRect.top + playerRect.height / 1.4
        this.particleDensity = 0.05; //optional
        this.simpleColor ="transparent"
        this.eternal = true;
        this.tag = "glimmer"

        Object.assign(this, options);

    }
}

class ParticleHolyGlimmerAuraHalo extends NewParticle { //green
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.tSpeed = 0.005
        this.size = 50; //m
        this.speedY = 0;
        this.speedX = 0;
        this.alpha = 0.5
        this.alphaDecay = 0.01
        this.sizeDecay = -0.3;
        this.simpleColor = "transparent"
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/halo.png"; //optional
        this.spawnStyle = "fade" //"increase", "fade", optional
        //this.rotationSpeed = rngD(0.0015,-0.0015); 
        this.rotation = rngD(0,5); 
        this.maxAlpha = this.alpha
        this.imageHue = 200

        Object.assign(this, options);
    }
}

class ParticleHolyGlimmerAuraSunrays extends NewParticle { //green
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.tSpeed = 0.005
        this.size = 40; //m
        this.speedY = choice(-0.05,0.05 );
        this.speedX = choice(-0.05,0.05 );
        this.alpha = 1
        this.alphaDecay = 0.01
        this.sizeDecay = -0.05;
        this.simpleColor = "transparent"
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/sunray1.png"; //optional
        this.spawnStyle = "fade" //"increase", "fade", optional
        this.rotationSpeed = rngD(0.01,-0.01); 
        this.rotation = rngD(0,5); 
        this.offsetX = choice( rngD(0.9,0.8),rngD(1.15,1.2) );
        this.offsetY = choice( rngD(0.90,0.95),rngD(1.1,1.15) );
        this.rotationLock = true //optional

        Object.assign(this, options);
    }
}








class ParticleGlimmerGhostAuraParticles1 extends NewParticle { //green
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.tSpeed = 0.005
        this.size = 40; //m
        this.speedY = 0;
        this.alphaDecay = 0.01
        this.sizeDecay = 0.1;
        this.simpleColor = "transparent"
        this.offsetX = rngD(-50,50);
        this.offsetY = rngD(-50,50);
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/aura.png"; //optional
        this.spawnStyle = "fade" //"increase", "fade", optional
        this.rotationSpeed = rngD(0.003,-0.003); 
        this.rotation = rngD(0,5); 
        this.targetCanvas = "rpgParticlesBehind"
        this.imageHue = 40; //optional
        Object.assign(this, options);
    }
}

class ParticleGlimmerGhostAuraParticles2 extends ParticleGlimmerGhostAuraParticles1 { //dark
    constructor(x, y, options = {}) {
        super(x, y);
        this.image.src = "img/src/projectiles/auraDark.png"; //optional
        Object.assign(this, options);
    }
}

class ParticleGlimmerGhostAuraParticles3 extends ParticleGlimmerGhostAuraParticles1 { //yellow
    constructor(x, y, options = {}) {
        super(x, y);
        this.imageHue = undefined; //optional
        Object.assign(this, options);
    }
}







class ParticleGlimmerAuraParticles3 extends NewParticle { //purple
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.tSpeed = 0.01
        this.speedY = -3;
        this.size = 40; //m
        this.sizeDecay = rngD(0.5,0.7)
        this.wobbleX = rngD(-1,1); 
        this.wobbleFrequency = 20; 
        this.simpleColor = undefined;
        this.offsetX = rngD(-50,50);
        this.offsetY = 1.05;
        this.targetCanvas = "rpgParticlesBehind"
        this.initialColor = { r: 102, g: 255, b: 255 }; //optional
        this.finalColor = { r: 255, g: 102, b: 255 }; //optional
        this.colorLife = 0.7; // optional
        this.spawnStyle = "fade" //"increase", "fade", optional
        Object.assign(this, options);
    }
}

class ParticleGlimmerAuraParticles2 extends ParticleGlimmerAuraParticles3 { //fire
    constructor(x, y, options = {}) {
        super(x, y);
        this.initialColor = { r: 252, g: 241, b: 143 }; //optional
        this.finalColor = { r: 255, g: 126, b: 32 }; //optional
        Object.assign(this, options);
    }
}

class ParticleGlimmerAuraParticles1 extends ParticleGlimmerAuraParticles3 { //green
    constructor(x, y, options = {}) {
        super(x, y);
        this.initialColor = { r: 31, g: 255, b: 86 }; //optional
        this.finalColor = { r: 154, g: 240, b: 240 }; //optional
        Object.assign(this, options);
    }
}


class ParticleFirework extends NewParticle {
    constructor(x, y, options = {}) {

        super(x, y);
        this.freeflow = false
        this.tSpeed = 0.005 ; // Track Speed
        this.simpleColor = "transparent"; //optional
        this.playerCenterX = containerRect.width / rngD(1.5,2.5);
        this.playerCenterY = containerRect.height;
        this.enemyCenterX = containerRect.width / rngD(1.5,2.5);
        this.enemyCenterY = containerRect.height / 3;
        this.controlPointX = containerRect.height*0.9;
        this.controlPointY = containerRect.height/3;
        this.trailParticle = ParticleAlignTrail
        this.particleDensity = 1; //optional
        this.particleConfig = {
            size : 7,
        }; 
        //this.trailParticle2 = ParticleStars1;
        this.wobbleY = 0; 
        this.wobbleX = 10; 
        this.wobbleFrequency = 30; 
       
        Object.assign(this, options);

    }

    end() {
        particleTrackers.push(new ParticleFireworkExplosion(this.x, this.y));
        particleTrackers.push(new ParticleFireworkExplosion2(this.x, this.y));
        particleTrackers.push(new ParticleFireworkExplosion2(this.x, this.y));
        particleTrackers.push(new ParticleFireworkExplosion3(this.x, this.y));
        particleTrackers.push(new ParticleFireworkExplosion3(this.x, this.y));
        particleTrackers.push(new ParticleFireworkExplosion3(this.x, this.y));
        playSound("audio/explosion.mp3")
    }
}

class ParticleFireworkExplosion extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.simpleColor = "transparent"; //optional
        this.tSpeed = 0.01;
        this.size = 1;
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/halo3.png"; //optional
        this.sizeDecay = -5
        this.alpha = 0.8
        this.alphaDecay = 0.04
        this.rotation = rngD(0,5)
        this.imageHue = rngD(0,360)
        Object.assign(this, options);
    }
}

class ParticleFireworkExplosion2 extends ParticleFireworkExplosion {
    constructor(x, y, options = {}) {
        super(x, y);
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/halo5.png"; //optional
        this.sizeDecay = -15
        this.alphaDecay = 0.03
        Object.assign(this, options);
    }
}

class ParticleFireworkExplosion3 extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.simpleColor = "transparent"; //optional
        this.speedY = rngD(-30,30);
        this.speedX = rngD(-30,30);
        this.accelerationY = 0;
        this.friction = 0.95 //optional

        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/drop_star.png"; //optional
        this.rotationSpeed = rngD(-0.3,0.3)
        this.sizeDecay = 0.2
        this.size = 10;
        this.trailParticle = ParticleFireworkExplosion4; //optional
        this.particleDensity = 0.3; //optional
        

        Object.assign(this, options);
    }
}

class ParticleFireworkExplosion4 extends NewParticle { //green
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.tSpeed = 0.005
        this.size = 13; //m
        this.speedY = 2;
        this.sizeDecay = 0.4;
        this.offsetX = rngD(-400,400);
        this.offsetY = rngD(-400,400);
        this.simpleColor = "transparent"
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/drop_star.png"; //optional
        this.spawnStyle = "fade" //"increase", "fade", optional
        this.rotationSpeed = rngD(0.1,-0.1); 
        this.rotation = rngD(0,5); 
        this.wobbleY = rngD(-1,1); 
        this.wobbleX = rngD(-1,1); 
        this.wobbleFrequency = rngD(-1,1); 

        Object.assign(this, options);
    }
}




class ParticleGlimmerBrimstone extends NewParticle {
    constructor(x,y,options = {}) {
        super(x, y);

        this.freeflow = false
        this.tSpeed = 0.01;
        this.wobbleY = 10; 
        this.wobbleX = 10; 
        this.wobbleFrequency = 2; 
        this.image = new Image(); //optional
        this.image.src = "img/src/emoji/brim.png"; //optional
        this.size = 10;
        this.trailParticle = ParticleGlimmerBrimstoneTrail; //optional
        this.particleDensity = 1; //optional
        this.simpleColor ="transparent"
        this.ease = "inout" 
        this.eternal = true;
        this.initialSpeed = this.tSpeed
        this.tag = "glimmer"
        Object.assign(this, options);

    }
}

class ParticleGlimmerBrimstone1A extends ParticleGlimmerBrimstone {
    constructor(x,y,options = {}) {
        super(x, y);
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3  ;
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerBrimstone1B())
    }
}
class ParticleGlimmerBrimstone1B extends ParticleGlimmerBrimstone {
    constructor(x,y,options = {}) {
        super(x, y);
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.targetCanvas = 'rpgParticlesBehind'
        this.particleConfig = {targetCanvas:"rpgParticlesBehind"}; //optional
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerBrimstone1A())
    }
}



class ParticleGlimmerBrimstone2A extends ParticleGlimmerBrimstone {
    constructor(x,y,options = {}) {
        super(x, y);
        this.imageHue = 310
        this.particleConfig = {strokeColor: "#DD00D2"}; //optional
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3  ;
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerBrimstone2B())
    }
}
class ParticleGlimmerBrimstone2B extends ParticleGlimmerBrimstone {
    constructor(x,y,options = {}) {
        super(x, y);
        this.imageHue = 310
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.targetCanvas = 'rpgParticlesBehind'
        this.particleConfig = {targetCanvas:"rpgParticlesBehind", strokeColor: "#DD00D2"}; //optional
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerBrimstone2A())
    }
}

class ParticleGlimmerBrimstone3A extends ParticleGlimmerBrimstone {
    constructor(x,y,options = {}) {
        super(x, y);
        this.imageHue = 250
        this.particleConfig = {strokeColor: "blue"}; //optional
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3  ;
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerBrimstone3B())
    }
}
class ParticleGlimmerBrimstone3B extends ParticleGlimmerBrimstone {
    constructor(x,y,options = {}) {
        super(x, y);
        this.imageHue = 250
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *0;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2 *2;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 2 * 1.3 ;
        this.targetCanvas = 'rpgParticlesBehind'
        this.particleConfig = {targetCanvas:"rpgParticlesBehind", strokeColor: "blue"}; //optional
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleGlimmerBrimstone3A())
    }
}

class ParticleGlimmerBrimstoneTrail extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.speedY = -1;
        this.size = 15; //m
        this.sizeDecay = 0.7
        this.wobbleX = rngD(-1,1); 
        this.wobbleY = rngD(-1,1); 
        this.wobbleFrequency = 10; 
        this.simpleColor= "black";
        this.strokeColor = "red"
        this.strokeSize = 3

        Object.assign(this, options);

    }
}


class ParticlePulse extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.simpleColor = "transparent"; //optional
        this.tSpeed = 0.01;
        this.x = x;
        this.y = y;
        this.size = 1;
        this.alphaDecay = 0.1
        this.sizeDecay = -3
        this.strokeColor = "white"
        this.strokeSize = 4
        Object.assign(this, options);

    }
}

class ParticleSlash extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.simpleColor = "transparent"; //optional
        this.tSpeed = 0.02;
        this.size = 80;
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/slash.png"; //optional
        this.sizeDecay = 6
        this.alphaDecay = 0.05
        this.rotation = rngD(-1.8,-2.2)
        this.x = enemyRect.left - containerRect.left + enemyRect.width / 2 * rngD(0.8,1.2);
        this.y = enemyRect.top - containerRect.top + enemyRect.height / 2 *1.4 * rngD(0.9,1.1);
        Object.assign(this, options);

    }
}

class ParticleShockwave extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.simpleColor = "transparent"; //optional
        this.tSpeed = 0.06;
        this.size = 1;
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/aura.png"; //optional
        this.sizeDecay = -8
        this.alpha = 0.9
        this.alphaDecay = 0.06
        this.x = enemyRect.left - containerRect.left + enemyRect.width / 2  ;
        this.y = enemyRect.top - containerRect.top + enemyRect.height / 2 *1.4 
        this.rotation = rngD(0,2)
        Object.assign(this, options);
    }
}

class ParticleShockwave2 extends ParticleShockwave {
    constructor(x, y, options = {}) {
        super(x, y);
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/halo2.png"; //optional
        this.sizeDecay = -3
        this.alpha = 0.7

        Object.assign(this, options);
    }
}

class ParticleBubble extends NewParticle {
    constructor(x,y,options = {}) {
        super(x, y);

        this.simpleColor = "transparent"
        this.tSpeed = 0.01;
        this.speedX = rngD(-1,1);
        this.speedY = rngD(-2,2);
        this.accelerationY = -0.03;
        this.x = x;
        this.y = y;
        this.size = 7;
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/bubble.png"; //optional
        this.imageHue = 300
        this.wobbleX = rngD(-2,2); 
        this.wobbleFrequency = rngD(-10,10); 
        this.sizeDecay = 0.05
        this.alphaDecay = 0.01
        this.spawnStyle = "fade" //"increase", "fade", optional
        this.maxSize = this.size
        this.pulseAmplitude = 0; 
        this.pulseSpeed = 0; 
        Object.assign(this, options);

    }
}




class ParticlePoisonBolt extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.freeflow = false
        this.tSpeed = 0.02;
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2 - rngD(600, 200); //optional
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - rngD(300, 200); //optional
        this.simpleColor = "transparent"; //optional
        this.trailParticle = ParticleAlignTrail; //optional

        this.particleDensity = 1; //optional
        this.particleConfig = {
            initialColor : { r: 81, g: 215, b: 126 },
            finalColor : { r: 25, g: 141, b: 21 },
            size : 6,
            sizeDecay : 0,
            alphaDecay : 0.05,
        }; 

        this.pulseAmplitude = 0.1; 
        this.pulseSpeed = 4; 

        this.image = new Image(); 
        this.image.src = "img/src/projectiles/halo4.png"; 
        this.imageHue = 100;
        this.size = 10;
        this.rotationSpeed = 0.1 ; 
         this.alpha = 0.5

        
    
        //optional

        Object.assign(this, options);

    }


    end(){
        particleTrackers.push(new ParticleShockwave2(this.x,this.y,{x:this.x,y:this.y,imageHue:50}));
        particleTrackers.push(new ParticleBubble(this.x,this.y,{x:this.x,y:this.y,imageHue:50}));
        particleTrackers.push(new ParticleBubble(this.x,this.y,{x:this.x,y:this.y,imageHue:50}));
        particleTrackers.push(new ParticleBubble(this.x,this.y,{x:this.x,y:this.y,imageHue:50}));

    }
}

class ParticleShockwaveHeal extends ParticleShockwave {
    constructor(x, y, options = {}) {
        super(x, y);
        this.image.src = "img/src/projectiles/shockwave.png"; //optional
        this.x = playerRect.left - containerRect.left + playerRect.width / 2
        this.y = playerRect.top - containerRect.top + playerRect.height / 1.4
        this.imageHue = 50
        this.sizeDecay = -5

        Object.assign(this, options);

    }
}



class ParticleSparks extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.simpleColor = "white"; //optional
        this.tSpeed = 0.01; // Age Speed
        this.speedY = rngD(-20,20);
        this.speedX = rngD(-20,20);
        this.friction = 0.85 //optional
        this.size = 3;
        this.width = this.size*8
        this.widthDecay = 3;
        this.rotationLock = true;
        this.alphaDecay = 0.1
        Object.assign(this, options);

    }
}


class ParticleCursorSparkler extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.simpleColor = "#FFFBC6"; //optional
        this.tSpeed = 0.02; // Age Speed
        this.speedY = rngD(  rngD(-20,-15), rngD(15,20) );
        this.speedX = rngD(  rngD(-20,-15), rngD(15,20) );
        this.friction = 0.85 //optional
        this.size = 3;
        this.sizeImg = 40;
        this.alpha = 0.8;
        this.width = this.size*8
        this.widthDecay = 4;
        this.rotationLock = true;
        this.alphaDecay = 0.1
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/drop_star.png"; //optional
        Object.assign(this, options);
    }
}

class ParticleCursorSparkler2 extends ParticleCursorSparkler {
    constructor(x, y, options = {}) {
        super(x, y);
        this.simpleColor = "#C5D5FE"; //optional
        Object.assign(this, options);
    }
}

class ParticleCursorSparkler3 extends ParticleCursorSparkler {
    constructor(x, y, options = {}) {
        super(x, y);
        this.simpleColor = "#C6FDDB"; //optional
        Object.assign(this, options);
    }
}


class ParticleArrow extends NewParticle {
    constructor(x, y, options = {}) {

        super(x, y);

        this.simpleColor = "transparent"
        this.freeflow = false
        this.tSpeed = 0.03;
        this.size = 15;
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 1.5;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 1.5;
        this.enemyCenterX = enemyRect.left - containerRect.left + enemyRect.width / 2 + rngD(-50,50);
        this.enemyCenterY = enemyRect.top - containerRect.top + enemyRect.height / 2 + rngD(10,-10);
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2; //optional
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - rngD(80,150); 
        this.image = new Image(); 
        this.image.src = "img/src/projectiles/arrow.png"; 
        this.rotationSpeed = 0.03 ; 
        this.trailParticle = ParticleSimpleTrail; //optional
        this.particleDensity = 1; //optional
        //this.trailParticle2 = ParticleAlignTrail; //optional
        //this.particleDensity2 = 0.5; //optional
        this.rotation = -0.5 ; 
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticlePulse(this.x,this.y));
    }
}

class ParticleEnemyShot extends NewParticle {
    constructor(x, y, options = {}) {

        super(x, y);

        this.simpleColor = "transparent"
        this.freeflow = false
        this.tSpeed = 0.03;
        this.size = 15;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 1.5;
        this.playerCenterX = enemyRect.left - containerRect.left + enemyRect.width / 2 + rngD(-50,50);
        this.playerCenterY = enemyRect.top - containerRect.top + enemyRect.height / 2 + rngD(10,-10);
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2; //optional
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - rngD(200,300); 
        this.rotationSpeed = 0.03 ; 
        //this.trailParticle = ParticleSimpleTrail; //optional
        //this.particleDensity = 1; //optional
        //this.trailParticle2 = ParticleAlignTrail; //optional
        //this.particleDensity2 = 0.5; //optional
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticlePulse(this.x,this.y));
    }
}


class ParticleWebShot extends ParticleEnemyShot {
    constructor(x, y, options = {}) {
        super(x, y);

        this.trailParticle = ParticleAlignTrail; //optional
        this.particleDensity = 1; //optional
        this.particleConfig = {
            simpleColor : "white"
        }

        Object.assign(this, options);
    }
}





class ParticleHooperonaBow extends ParticleArrow {
    constructor(x, y, options = {}) {

        super(x, y);
        this.size = 10;
        this.image = new Image(); 
        this.image.src = "img/src/projectiles/spike.png"; 
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticlePulse(this.x,this.y));
    }
}

class ParticleHooperonaBowSkill extends ParticleArrow {
    constructor(x, y, options = {}) {

        super(x, y);
        this.size = 10;
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2 - rngD(900, 300); //optional
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - rngD(-300, 300); //optional
        this.enemyCenterX = enemyRect.left - containerRect.left + enemyRect.width / 2 - rngD(-100, 100);
        this.enemyCenterY = enemyRect.top - containerRect.top + enemyRect.height / 1.4 - rngD(-20, 20);
        this.trailParticle = ParticleAlignTrail; //optional
        this.particleDensity = 0.5; //optional

        /*this.particleConfig = {
            initialColor : { r: 232, g: 222, b: 86 },
            finalColor : { r: 175, g: 106, b: 178 },
        }; occult*/

        /*this.particleConfig = {
            initialColor : { r: 92, g: 255, b: 240 },
            finalColor : { r: 113, g: 125, b: 186 },
        }; elemental*/

        this.particleConfig = {
            initialColor : { r: 132, g: 255, b: 182 },
            finalColor : { r: 97, g: 171, b: 24 },
        }; 


        this.image = new Image(); 
        this.image.src = "img/src/projectiles/spike.png"; 
        this.rotationSpeed = 0 ; 
        this.rotation = 0 ; 

        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticlePulse(this.x,this.y));
        particleTrackers.push(new ParticleSparks(this.x,this.y, {
            speedX : rngD(0,40),
            speedY : rngD(-10,10),
        }));

    }
}

class ParticleSimpleTrail extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.simpleColor = "white";
        this.tSpeed = 0;
        this.x = x;
        this.y = y;
        this.size = 8;
        this.alpha = 0.3
        this.sizeDecay = 0.5
        Object.assign(this, options);
    }
}

class ParticleAlignTrail extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x;
        this.y = y;
        this.speedY = -1;
        this.size = 20; //m
        this.sizeDecay = 1
        this.wobbleX = rngD(-1,1); 
        this.wobbleY = 0; 
        this.wobbleFrequency = 10; 
        this.simpleColor= undefined
        this.initialColor = { r: 255, g: 171, b: 0 }; 
        this.finalColor = { r: 100, g: 100, b: 100 }; 
        //this.initialColor = { r: 118, g: 73, b: 196 }; 
        //this.finalColor = { r: 247, g: 126, b: 203 }; 
        //this.initialColor = { r: 74, g: 145, b: 66 }; 
        //this.finalColor = { r: 98, g: 235, b: 166 }; 
        this.colorLife = 0.5;
        Object.assign(this, options);
    }
}

class ParticleWoodenBowN extends ParticleArrow {
    constructor(x, y, options = {}) {
        super(x, y);
        this.trailParticle = ParticleAlignTrail; //optional
        this.particleDensity = 0.5; //optional
        this.particleConfig = {
            initialColor : { r: 74, g: 145, b: 66 },
            finalColor : { r: 98, g: 235, b: 166 },
        }; //optional

        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleShockwave(this.x,this.y,{x:this.x,y:this.y,imageHue:50}));
        particleTrackers.push(new ParticleSparks(this.x,this.y,{x:this.x,y:this.y}));
        particleTrackers.push(new ParticleSparks(this.x,this.y,{x:this.x,y:this.y}));
        particleTrackers.push(new ParticleSparks(this.x,this.y,{x:this.x,y:this.y}));
    }
}

class ParticleWoodenBowO extends ParticleArrow {
    constructor(x, y, options = {}) {
        super(x, y);
        this.trailParticle = ParticleAlignTrail; //optional
        this.particleDensity = 0.5; //optional
        this.particleConfig = {
            initialColor : { r: 118, g: 73, b: 196 },
            finalColor : { r: 247, g: 126, b: 203 },
        }; //optional

        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleShockwave(this.x,this.y,{x:this.x,y:this.y,imageHue:230}));
        particleTrackers.push(new ParticleSparks(this.x,this.y,{x:this.x,y:this.y}));
        particleTrackers.push(new ParticleSparks(this.x,this.y,{x:this.x,y:this.y}));
        particleTrackers.push(new ParticleSparks(this.x,this.y,{x:this.x,y:this.y}));
    }
}

class ParticleWoodenBowE extends ParticleArrow {
    constructor(x, y, options = {}) {
        super(x, y);
        this.trailParticle = ParticleAlignTrail; //optional
        this.particleDensity = 0.5; //optional
        this.particleConfig = {
            initialColor : { r: 255, g: 171, b: 0 },
            finalColor : { r: 100, g: 100, b: 100 },
        }; //optional

        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleShockwave(this.x,this.y,{x:this.x,y:this.y,imageHue:320}));
        particleTrackers.push(new ParticleSparks(this.x,this.y,{x:this.x,y:this.y}));
        particleTrackers.push(new ParticleSparks(this.x,this.y,{x:this.x,y:this.y}));
        particleTrackers.push(new ParticleSparks(this.x,this.y,{x:this.x,y:this.y}));
    }
}

class ParticleLeaf extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.simpleColor = "transparent"; //optional
        this.tSpeed = 0.02; // Age Speed
        //this.friction = 0.99 //optional
        this.freeflow = false
        this.playerCenterX = enemyRect.left - containerRect.left + enemyRect.width / 2;
        this.playerCenterY = enemyRect.top - containerRect.top + enemyRect.height / 2;
        this.enemyCenterX = enemyRect.left - containerRect.left + enemyRect.width / 2 - rngD(-100, 100);
        this.enemyCenterY = enemyRect.top - containerRect.top + enemyRect.height / 1.4 - rngD(-50, 100);
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2 - rngD(-500, 500); //optional
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - rngD(-500, 500); //optional
        this.wobbleY = 0; 
        this.wobbleX = 50; 
        this.wobbleFrequency = 2; 
        //this.trailParticle = ParticleSparksTrail; //optional
        //this.particleDensity = 1; //optional
        this.size = 10;
        this.rotationSpeed = 0.6; 
        this.imageHue = 50;
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/leaf.png"; //optional
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticlePulse(this.x,this.y));
    }

}

class ParticleThrowUp extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.simpleColor = "transparent"; //optional
        this.tSpeed = 0.01; // Age Speed
        this.freeflow = false
        this.playerCenterX = playerRect.left - containerRect.left + playerRect.width / 2;
        this.playerCenterY = playerRect.top - containerRect.top + playerRect.height / 2;
        this.enemyCenterX = playerRect.left - containerRect.left + playerRect.width / 2;
        this.enemyCenterY = playerRect.top - containerRect.top + playerRect.height / 1.4;
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2 ; //optional
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - 300; //optional
        this.ease = "in" //"inout", "in", "out", optional
        this.trailParticle = ParticleSimpleTrail; //optional
        this.particleDensity = 1; //optional
        this.size = 10;
        this.rotationSpeed = 0.2; 
        this.imageHue = 250;
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/poison.png"; //optional
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticlePulse(this.x,this.y));
        particleTrackers.push(new ParticleRiseup());

    }

}

class ParticleRiseup extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.simpleColor = "transparent"; //optional
        this.tSpeed = 0.02; // Age Speed
        this.speedY = -4;
        this.x = playerRect.left - containerRect.left + playerRect.width / 15
        this.y = playerRect.top - containerRect.top + playerRect.height / 1.15
        this.wobbleX = 20; 
        this.wobbleFrequency = 10; 
        //this.ease = "in" //"inout", "in", "out", optional
        this.trailParticle = ParticleRiseupStars; //optional
        this.particleDensity = 1; //optional
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticlePulse(this.x,this.y));
    }
}

class ParticleRiseupStars extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.simpleColor = "transparent"; //optional
        this.tSpeed = 0.01; // Age Speed
        this.x = x
        this.y = y
        this.speedY = 2
        this.size = 6;
        this.sizeDecay = 0.2; 
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/drop_star.png"; //optional
        this.offsetX = rngD(-5,5);
        this.offsetY = rngD(-5,5);
        this.rotationSpeed = 0.1
        Object.assign(this, options);
    }
}

class ParticleShinyStar extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.simpleColor = "transparent"; //optional
        this.tSpeed = 0.01; // Age Speed
        this.x = x
        this.y = y
        this.size = 10;
        this.sizeDecay = 0.3; 
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/drop_star.png"; //optional
        this.offsetX = rngD(-20,20);
        this.offsetY = rngD(-20,20);
        Object.assign(this, options);
    }
}



class ParticleAmbienceLeaf extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        

        //this.freeflow = false
        this.tSpeed = 0.0008 ; // Track Speed
        this.simpleColor = "transparent"; //optional
        this.x = rngD(-(containerRect.width/2),containerRect.width);
        this.y = -10;


        this.speedY = 1;
        this.speedX = 1;
        
        this.image = new Image(); 
        this.image.src = "img/src/projectiles/leaf2.png"; 
        //this.imageHue = 200;
        this.size = 7;
        this.rotationSpeed = rngD(-0.01,0.01) ; 
        this.wobbleY = 0; 
        this.wobbleX = rngD(-1,1); 
        this.wobbleFrequency = 5; 
        this.mouseForce = -2; //optional
        //this.trailParticle = ParticleMoonNecklaceTrail
        //this.particleDensity = 1
        this.alpha = 0.8
        this.despawnStyle = "fade"
        Object.assign(this, options);
    }
    
}




class ParticleSellCoins extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);

        this.tSpeed = 0.025; // Track Speed
        this.freeflow = false
        this.simpleColor = "transparent"
        this.playerCenterX = selectedItemRect.left - containerRect.left + selectedItemRect.width / 2;
        this.playerCenterY = selectedItemRect.top - containerRect.top + selectedItemRect.height / 2;
        this.enemyCenterX = coinTrackerRect.left - containerRect.left + coinTrackerRect.width / 2;
        this.enemyCenterY = coinTrackerRect.top - containerRect.top + coinTrackerRect.height / 2;
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2 - rngD(-300,100); //2 default
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) *25;
        this.trailParticle = ParticleSimpleTrail;
        this.particleConfig = {
            targetCanvas : "globalParticles"
        }
        this.particleDensity = 1;
        this.image = new Image();
        this.image.src = "img/src/icons/goldmedal.png"; 
        this.size = 6;
        this.targetCanvas = 'globalParticles'


        Object.assign(this, options);

    }
}




class ParticleMoonNecklace extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        

        this.freeflow = false
        this.tSpeed = 0.03 ; // Track Speed
        this.simpleColor = "transparent"; //optional
        this.playerCenterX = containerRect.width / rngD(1.5,2.5);
        this.playerCenterY = 0;
        
        this.image = new Image(); 
        this.image.src = "img/src/projectiles/halo3.png"; 
        this.imageHue = 200;
        this.size = 10;
        this.rotationSpeed = 0.1 ; 
        this.trailParticle = ParticleMoonNecklaceTrail
        this.particleDensity = 1
        Object.assign(this, options);
    }
    end(){
        particleTrackers.push(new ParticleShockwave2(this.x,this.y,{x:this.x,y:this.y,imageHue:200}));
    }
}

class ParticleMoonNecklaceTrail extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        

        this.x = x;
        this.y = y;
        this.speedY = -1;
        this.size = 15; //m
        this.sizeDecay = 1
        this.wobbleX = rngD(-1,1); 
        this.wobbleY = 0; 
        this.wobbleFrequency = 10; 
        this.simpleColor= "red"
        this.metaimage = new Image(); //optional
        this.metaimage.src = "img/sys/metaSpace.jpg"; //optional
        


        Object.assign(this, options);
    }
}





class ParticleSellPulse extends ParticlePulse {
    constructor(x, y, options = {}) {
        super(x, y);
        this.sizeDecay = -8; // Age Speed
        this.x = selectedItemRect.left - containerRect.left + selectedItemRect.width / 2;
        this.y = selectedItemRect.top - containerRect.top + selectedItemRect.height / 2;
        this.strokeSize = 8
        this.targetCanvas = 'globalParticles';
        this.trailParticle = ParticleShinyStar
        this.particleDensity = 0.2
        this.particleConfig = {targetCanvas: 'globalParticles'}
        Object.assign(this, options);
    }
}

class ParticlePrismScute extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.x = x
        this.y = y
        this.tSpeed = 0;
        this.size = 7;
        this.simpleColor = "transparent";
        this.speedY = rngD(-2,2);
        this.speedX = rngD(-2,2);
        this.trailParticle = ParticleShinyStar
        this.particleDensity = 0.02
        this.particleConfig = {targetCanvas: 'globalParticles'}
        this.alphaDecay = 0.01
        this.sizeDecay = 0.05
        this.image = new Image(); //optional
        this.image.src = "img/src/projectiles/scute.png"; //optional
        this.friction = 0.97 //optional
        this.targetCanvas = 'globalParticles';
        this.pulseAmplitude = 0.01; 
        this.pulseSpeed = 0.005; 
        this.rotation = rngD(0,2);
        this.rotationSpeed = rngD(-0.01,0.01); 

        Object.assign(this, options);
    }
}

class ParticleItemGot extends NewParticle {
    constructor(x, y, options = {}) {
        super(x, y);
        this.tSpeed = 0.013;
        this.freeflow = false;
        this.simpleColor = "transparent"
        this.playerCenterX = enemyRect.left - containerRect.left + enemyRect.width / rngD(1.5,2);
        this.playerCenterY = enemyRect.top - containerRect.top + enemyRect.height / rngD(1.3,2);
        this.enemyCenterX = inventoryBagRect.left - containerRect.left + inventoryBagRect.width / 2;
        this.enemyCenterY = inventoryBagRect.top - containerRect.top + inventoryBagRect.height / 2;
        this.controlPointX = (this.playerCenterX + this.enemyCenterX) / 2 + 1300; //2 default
        this.controlPointY = Math.min(this.playerCenterY, this.enemyCenterY) - rngD(200, -1000);
        this.trailParticle = ParticleSimpleTrail;
        this.particleDensity = 1;
        //this.trailParticle2 = ParticleStars1;
        //this.particle2Density = 0.2;
        this.image = new Image();
        this.image.src = "img/src/icons/drop_loot.png"; 
        this.size = 10;

        Object.assign(this, options);
    }
}






   










