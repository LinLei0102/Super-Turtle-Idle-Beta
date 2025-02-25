// bunch of functions and stuff used through all the scripts

const did = (id) => document.getElementById(id); 


let mouseClickX = 0
let mouseClickY = 0

document.addEventListener('click', function(event) {


    mouseClickX = event.x
    mouseClickY = event.y


    if (!patCursor){
      particleTrackers.push(new ParticlePulse(mouseClickX, mouseClickY, { targetCanvas: `globalParticles` }))

    }




    


});

function choice(A,B){
   if( chance(1/2) ) {return A} else return B
}




window.addEventListener("blur", function() {


did("afkDarken").style.display = "flex"



  });

  window.addEventListener("focus", function() {

did("afkDarken").style.display = "none";


const popupListing = document.getElementById('popupListing');
    if (popupListing && popupListing.children.length > 0) {
        const childDivs = popupListing.querySelectorAll('div');

        setTimeout(() => {
          childDivs.forEach(div =>div.style.animation =  "popupSlideOut 0.5s");
        }, 8000);

        setTimeout(() => {
          childDivs.forEach(div => div.remove() );
        }, 8500);

    }

    
    
    
  });


  function limitText(texto, longitudMaxima) {
    return texto.length > longitudMaxima 
      ? texto.slice(0, longitudMaxima) + "..." 
      : texto;
  }

  function setCursor() {

    let cursorIdleImg = "cursorHand"
    if (settings.wubblyCursorToggle) cursorIdleImg = "cursorHandAlt"

    var estilo = document.createElement('style');

    if (!settings.disableCustomCursor) {
        document.body.style.cursor = "url('img/sys/"+cursorIdleImg+".png'), auto";
        estilo.innerHTML = ` button:hover { cursor: url('img/sys/`+cursorIdleImg+`.png'), auto; } input:hover { cursor: url('img/sys/`+cursorIdleImg+`.png'), auto; } `;
        document.head.appendChild(estilo);
        
    } else {
        document.body.style.cursor = "default";
        estilo.innerHTML = ` button:hover { cursor: default; } input:hover { cursor: default; } `;
        document.head.appendChild(estilo);
    }

    if (settings.disableAnimatedBg) {
        document.documentElement.style.setProperty('--performance100', "0%");
        document.documentElement.style.setProperty('--performance90', "0%");

        
    } else {
        document.documentElement.style.setProperty('--performance100', "100%");
        document.documentElement.style.setProperty('--performance90', "90%");
    }

}

let patCursor = false

did("playerAnimation").addEventListener("mouseenter", function () {
  patCursor = true
  document.body.style.cursor = "url('img/sys/cursorPat.png'), auto";
});
did("playerAnimation").addEventListener("mouseleave", function () {
  patCursor = false
  setCursor();
});

did("playerAnimation").addEventListener("click", function () {
  document.body.style.cursor = "url('img/sys/cursorPat2.png'), auto";
  setTimeout(() => {
    document.body.style.cursor = "url('img/sys/cursorPat.png'), auto";
  }, 100);

  stats.clickCount++

  voidAnimation("rpgPlayerImg", "gelatine 0.3s 1")

  if (chance(1/10)){
    if (chance(1/10))playSound("audio/lily2.mp3");
    if (chance(1/10))playSound("audio/lily2.mp3");
    playSound("audio/pet3.mp3")
  }
  playSound("audio/throw.mp3")

  setTimeout(() => {
    if (chance(1/3)) particleTrackers.push(new ParticleFloatingHeart(mouseClickX, mouseClickY, { targetCanvas: `globalParticles` }))
  }, 10); 
});


did("pokomuni").addEventListener("mouseenter", function () {
  patCursor = true
  document.body.style.cursor = "url('img/sys/cursorPat.png'), auto";
});
did("pokomuni").addEventListener("mouseleave", function () {
  patCursor = false
  setCursor();
});

did("pokomuni").addEventListener("click", function () {
  document.body.style.cursor = "url('img/sys/cursorPat2.png'), auto";
  setTimeout(() => {
    document.body.style.cursor = "url('img/sys/cursorPat.png'), auto";
  }, 100);

  voidAnimation("pokomuni", "gelatine 0.3s 1")


  if (chance(1/10)){
    if (chance(1/10))playSound("audio/pet1.mp3");
    playSound("audio/pet3.mp3")
  }
  playSound("audio/throw.mp3")

  

  setTimeout(() => {
    if (chance(1/3)) particleTrackers.push(new ParticleFloatingHeart(mouseClickX, mouseClickY, { targetCanvas: `globalParticles` }))
  }, 10); 
});


did("bestiaryMonster").addEventListener("mouseenter", function () {
  if (enemies[currentBestiaryEntry].resource)return
  patCursor = true
  document.body.style.cursor = "url('img/sys/cursorPat.png'), auto";
});
did("bestiaryMonster").addEventListener("mouseleave", function () {
  patCursor = false
  setCursor();
});

did("bestiaryMonster").addEventListener("click", function () {
  if (enemies[currentBestiaryEntry].resource)return

  document.body.style.cursor = "url('img/sys/cursorPat2.png'), auto";
  setTimeout(() => {
    document.body.style.cursor = "url('img/sys/cursorPat.png'), auto";
  }, 100);

  voidAnimation("bestiaryMonster", "gelatine 0.3s 1")


  if (chance(1/10)){
    if (chance(1/10))playSound("audio/pet2.mp3","all");
    playSound("audio/pet3.mp3","all")
  }
  playSound("audio/throw.mp3")

  

  setTimeout(() => {
    if (chance(1/3)) particleTrackers.push(new ParticleFloatingHeart(mouseClickX, mouseClickY, { targetCanvas: `globalParticles` }))
  }, 10); 
});






