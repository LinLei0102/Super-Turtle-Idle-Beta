let basePlayerTurnSpeed = 1800;
let playerTurnSpeed = 1800;
let requestPlayerAttackTime = 0;
let accumulatedPlayerAttackTime = 0;

function playerTurnTimer() {
  const currentTime = Date.now(); 

  if (!requestPlayerAttackTime) {
    requestPlayerAttackTime = currentTime;
  }

  const deltaTime = currentTime - requestPlayerAttackTime;
  accumulatedPlayerAttackTime += deltaTime;

  if (accumulatedPlayerAttackTime >= playerTurnSpeed) {
    accumulatedPlayerAttackTime = 0;
    playerTurn();
  }

  requestPlayerAttackTime = currentTime;
  setTimeout(playerTurnTimer, 200);
}





playerTurnTimer();

function playerTurn() {

  if (!rpgPlayer.alive) return
  if (buffs.PlayerPetrify.time>0) return
  if (did("enemyPanel").style.display === "none") return


  let currentEquippedItems = equippedItems
  if (stats.rogue.active) currentEquippedItems = equippedRogueItems 


  currentEquippedItems.forEach((item) => {
  
      if (item===undefined) return 

        if (item.slot === `Weapon`) { //if a weapon is equipped
        
        playSound("audio/playerAttack.mp3") 
        if (item.weaponMod) item.weaponMod()
        item.attack() 
      
      } 

      if (typeof item.dealDamage === 'function') {
        item.dealDamage();
       }

        
    });


    playerAttackCheck()
  }



  function resetEncounter(){

    enemyTurn = 0;
    bossTime = false
    removeBuffs("clear");
    playerBuffs();
    enemyAdd1CurrentHp = 0
    enemyAdd2CurrentHp = 0
    enemyUpdate()
    contractEnemyInfobar()


  }

let extraLivesUsed = stat.ExtraLives

function playerUpdate(){ //updates player HP and checks if its dead


  if (godmode) return;

  if (rpgPlayer.hp <= 0 && rpgPlayer.alive) { // on player death



    did("enemyAttackBox").style.display = "none";
    resetEncounter()

    setTimeout(() => {
      updateOfflineIndicator()
    }, 1);



    if (bossTime===true && stat.ExtraLives>0 && extraLivesUsed>0){

      extraLivesUsed--

      rpgPlayer.hp = stat.MaxHealth*0.3
      playSound("audio/levelup.mp3")
      playSound("audio/ding2.mp3")

      voidAnimation("playerAnimation", "gelatineHigh 0.4s 1")
  
      particleTrackers.push(new ParticleRiseup());
  

      return


    }




    rpgPlayer.hp = 0;

    if ((stats.currentDifficulty==="boss" || enemies[stats.currentEnemy].tag === "areaBoss") && buffs.B64.time<=0) { //if a boss kills the turtle
      bossTime = false;
      stats.currentDifficulty="easy"
      encounterButtonPress() 
      deleteEnemy();
      resetEncounter()
      did("rpgCanvas").style.animation = "";
      void did("rpgCanvas").offsetWidth;
      did("rpgCanvas").style.animation = "rpgFade 1s 1";
    }

    if ((enemies[stats.currentEnemy].tag === "arena")) { //if an arena boss kills the turtle
      bossTime = false;
      //deleteEnemy();
      resetEncounter();
      did("enemyPanel").style.display = "none";

    }
    
    if (dungeonTime && buffs.B64.time<=0){ //dies on a dungeon
      dungeonTime=false;
      did("rpgCanvas").style.animation = "";
      void did("rpgCanvas").offsetWidth;
      did("rpgCanvas").style.animation = "rpgFade 1s 1";
      if (rpgClass[stats.currentClass].level > areas[stats.currentArea].level) {stats.currentArea = previousArea;} else {stats.currentArea = "A1";}
      if (areas[previousArea].dungeon) stats.currentArea = "A1";
      stats.currentDifficulty = previousDifficulty;
      dungeonPoints = 0;
      dungeonStage=0
      updateDungeonPoints()
      switchArea();
      specialButtonUi();
      deleteEnemy();
      updateBGColor()
    }


    if ((showdownTime || skirmishTime) && buffs.B64.time<=0){
      endShowdown();
      deleteEnemy();
      
      revive();
    }


    clearNegativeBuffs()
    playerBuffs();
    rpgPlayer.alive = false;
    logPrint(stats.turtleName + " perishes :c");
    playSound("audio/death.mp3");
    hpRegen();

  


  }

  playerHealthCheck();

  var percentageplayerHP = (rpgPlayer.hp / stat.MaxHealth) * 100;
  
  if (playerShield>0) did("playerHpBar").style.width = percentageplayerHP+"%";
  else did("playerHpBar").style.width = percentageplayerHP+"%";

  


}

let currentTarget = ""

function clickTarget(target){


    if (!rpgPlayer.alive) return

    if (target!==currentTarget) voidAnimation("target"+target,"targetTriangle 1s 1, gelatineHigh 0.3s 1")
    
    if (target==="Enemy") enemy = document.getElementById('npcPanel');
    if (target==="Add1") enemy = document.getElementById('enemyAdd1');
    if (target==="Add2") enemy = document.getElementById('enemyAdd2');
    
    enemyRect = enemy.getBoundingClientRect();
    currentTarget = target





    enemyDamageAnimation("low");

    setTimeout(() => {
      particleTrackers.push(new ParticleSparks(mouseClickX, mouseClickY))
      particleTrackers.push(new ParticleSparks(mouseClickX, mouseClickY))
      particleTrackers.push(new ParticleSparks(mouseClickX, mouseClickY))
    }, 10); 
     
    let lumaDamage = (stat.Power/10*lumaCharge)
    if (stat.LumaPower>0) lumaDamage += lumaDamage * (stat.LumaPower/100)
    if (stat.Power<19) lumaDamage = (20/10*lumaCharge)


    if (enemies[stats.currentEnemy].resource==="ore" || enemies[stats.currentEnemy].resource==="herb"){

      playSound("audio/oreHit.mp3")
      lumaDamage = (stat.GatheringPower/2*lumaCharge)
      enemyBasicDamage(lumaDamage);
      lumaCharge = 0.1;
      return
    }

    if (equippedLuma!==undefined) equippedLuma.luma()
    if (equippedLuma!==undefined && equippedLuma.align === "Occult") enemyOccultDamage(lumaDamage);
    else if (equippedLuma!==undefined && equippedLuma.align === "Elemental") enemyElementalDamage(lumaDamage);
    else  enemyNatureDamage(lumaDamage);
   


    lumaCharge = 0.1;


 


    
}



let lumaCharge = 0

setInterval(() => { // weapon damage * lumaCharge (min 0.1)

  if (lumaCharge<10){
    did("clickingPowerMeter").style.height = `${lumaCharge*10}%`
    did("clickingPowerMeter").style.animation = "none"
    did("clickingPowerGauge").style.animation = "none"
    //console.log("a")

  }

  if (lumaCharge>10) {
    if (did("clickingPowerMeter").style.height!="100%"){
      did("clickingPowerMeter").style.height = `100%`
      did("clickingPowerGauge").style.animation = "areaClick 0.3s 1,flash 0.2s 1"
      did("clickingPowerMeter").style.animation = "backgroundRainbow 6s infinite linear"
      playSound("audio/throw.mp3");
      //console.log("e")
    }
 
  }

  if (lumaCharge>10) return
  lumaCharge+= 1

}, 100);


did("playerAnimation").addEventListener("click", function () { //heal click
    if (!rpgPlayer.alive){

      playSound("audio/throw.mp3");
      rpgPlayer.hp += stat.MaxHealth*0.08
      hpRegen()
      playerUpdate();

    }
    
    
    
  });

  
function animatedSplash(target, image, animation, hue){ //image on top of a target
  
  const div = document.createElement("div");
  div.innerHTML = `<img src="img/src/projectiles/${image}.png">`
  div.className = "imageSplash";
  div.style.filter = `hue-rotate(${hue}deg)`

  if (animation==="magicCircle"){
    div.className = "imageSplashRune";
    div.getElementsByTagName("img")[0].style.animation = "magicCircle infinite 3s linear";
    div.id = "glimmerRune"
  }

  if (animation==="impact"){
    div.getElementsByTagName("img")[0].style.animation = "gelatineImpact 0.7s";
    setTimeout(() => { div.remove() }, 700);
  }

  if (animation==="downwards"){
    div.getElementsByTagName("img")[0].style.animation = "gelatineDownwards 1.1s";
    setTimeout(() => { div.remove() }, 1000);
  }

  if (animation==="float"){
    div.getElementsByTagName("img")[0].style.animation = "skillFloat 1.5s 1";
    setTimeout(() => { div.remove() }, 1500);
  }

  if (animation==="taunt"){
    div.getElementsByTagName("img")[0].style.animation = "gelatineTaunt 1s";
    div.getElementsByTagName("img")[0].style.scale = 1.4;
    div.getElementsByTagName("img")[0].style.translate = "0 5px";
    setTimeout(() => { div.remove() }, 900);
  }

  if (animation==="spinningThrow"){
    div.getElementsByTagName("img")[0].style.animation = "spinningThrow 3s 1 ease-in-out"; 
    div.getElementsByTagName("img")[0].style.scale = 1;
    setTimeout(() => { div.remove() }, 2900);
  }





  let parent = ""
  if (target==="player") parent = "playerBreathing"
  if (target==="enemy") parent = "enemyAnimation"


  did(parent).appendChild(div);



  
  


}




//---------------------------------------------------------enemy--------------------------------------------------------


let baseEnemyTurnSpeed = 1800;
let enemyTurnSpeed = 1800;
let requestEnemyAttackTime = 0;
let accumulatedEnemyAttackTime = 0;

function enemyTurnTimer() {
  const currentTime = Date.now(); 

  if (!requestEnemyAttackTime) {
    requestEnemyAttackTime = currentTime;
  }

  const deltaTime = currentTime - requestEnemyAttackTime;
  accumulatedEnemyAttackTime += deltaTime;

  if (accumulatedEnemyAttackTime >= enemyTurnSpeed) {
    accumulatedEnemyAttackTime = 0;
    enemyAttackTurn();
  }

  requestEnemyAttackTime = currentTime;

  setTimeout(enemyTurnTimer, 600);
}

enemyTurnTimer()


function enemyAttackTurn() {
    
      //gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty) || !rpgPlayer.alive || (stats.currentArea === "A7" && !skirmishTime && !showdownTime) || (buffs.B6.time>0 || buffs.B44.time>0)) { //conditions to not attack

      if (!rpgPlayer.alive) return
      if (did("enemyPanel").style.display === "none") return


      if (enemies[stats.currentEnemy].ai!==undefined) {enemyTurn++; enemies[stats.currentEnemy].ai();}
      if (enemies[stats.currentEnemy].passive) return


      if (!settings.disableCombatAudio) playSound("audio/enemyAttack.mp3")

      if (document.hasFocus() && !settings.disableCombatAnimations) voidAnimation("enemyAnimation", "enemyAttack 0.5s 1")







      if (stat.DodgeChance>0 && rng(1,100)<=stat.DodgeChance) {
        voidAnimation("playerAnimation","spin 1s linear 1");
        damageText('Miss', 'damageText', '#818181', undefined, "playerPanel");
        return
      }


      var damageDealt = rng(enemies[stats.currentEnemy].attack(), (enemies[stats.currentEnemy].attack()*1.05))*enemyDamageMultiplier //damage variance
      if (enemies[stats.currentEnemy].dynamic) damageDealt = rng(eval(enemies[stats.currentEnemy].attack), (eval(enemies[stats.currentEnemy].attack)*1.05))*enemyDamageMultiplier //damage variance
  
          let dodged = false;
  
          if (buffs.B49.time>0 && rng(1,3)===1) dodged = true
          if (clothTier && rng(1,10)===1) dodged = true
  
          if (!dodged){
  
          //if (did(stats.currentEnemy+"enemy") && did(stats.currentEnemy+"enemy").classList.contains('gilded')) damageDealt = eval(playerMaxHp/6)
  
          if (enemies[stats.currentEnemy].align==='nature') playerNatureDamage(damageDealt)
          if (enemies[stats.currentEnemy].align==='might') playerMightDamage(damageDealt)
          if (enemies[stats.currentEnemy].align==='elemental') playerElementalDamage(damageDealt)
          if (enemies[stats.currentEnemy].align==='occult') playerOccultDamage(damageDealt)
          if (enemies[stats.currentEnemy].align==='deific') playerDeificDamage(damageDealt)
  
        } else {
  
          animState("rpgPlayerImg", "spin 1s linear 1");
          damageText('Miss', 'damageText', '#818181', undefined, "playerPanel");
  
  
        }
  
        if (document.hasFocus()  && !settings.disableAnimations && stats.currentCategory === "rpgContainer"){


      
  
      voidAnimation("playerAnimation", "gelatine 0.3s 1")


      
      
  
        }
  
      enemyAttackCheck(damageDealt)



      equippedItems.forEach((item) => {
  
        if (item===undefined) return 
  
        if (typeof item.receiveDamage === 'function') {
          item.receiveDamage();
         }
          
      });



      playerUpdate()



  
  }



  

  //areas[stats.currentArea].heat = 1


did("heatIcon").addEventListener('mouseover', () => {
  did("heatLevel").src = "img/src/icons/heat.webp"; 
  did("heatIcon").style.animation = "";
  void did("heatIcon").offsetWidth;
  did("heatIcon").style.animation = "gelatine 0.3s 1";
});

did("heatIcon").addEventListener('mouseout', () => {
  did("heatLevel").src = "img/src/icons/heatStatic.png"; 
  did("heatIcon").style.animation = "";
  void did("heatIcon").offsetWidth;
  did("heatIcon").style.animation = "gelatineHigh 0.3s 1";
});



  did("heatIcon").addEventListener("mouseenter", function () {
    updateHeatUi()
  });

  did("heatIcon").addEventListener("mouseleave", function () {
    resetTooltip();
  });


  function updateHeatUi(){
    
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltip").style.width = "auto";


    let heat1 = bestiaryTag("<FONT COLOR='gray' style='font-family:fredoka; font-weight:500;'>Shellshock 1 🔥", "transparent")
    if (areas[stats.currentArea].heat === 1) heat1 = bestiaryTag("<FONT COLOR='lawngreen' style='font-family:fredoka; font-weight:500;'>Shellshock 1 🔥", "transparent")

    let heat2 = bestiaryTag("<FONT COLOR='gray' style='font-family:fredoka; font-weight:500;'>Shellshock 2 🔥", "transparent")
    if (areas[stats.currentArea].heat === 2) heat2 = bestiaryTag("<FONT COLOR='lawngreen' style='font-family:fredoka; font-weight:500;'>Shellshock 2 🔥", "transparent")
    if (areas[stats.currentArea].heatMax<2) heat2 = bestiaryTag("<FONT COLOR='gray' style='font-family:fredoka; font-weight:500;'>Defeat the area boss on the previous Shellshock level", "transparent")


    let heat3 = bestiaryTag("<FONT COLOR='gray' style='font-family:fredoka; font-weight:500;'>Shellshock 3 🔥", "transparent")
    if (areas[stats.currentArea].heat === 3) heat3 = bestiaryTag("<FONT COLOR='lawngreen' style='font-family:fredoka; font-weight:500;'>Shellshock 3 🔥", "transparent")
    if (areas[stats.currentArea].heatMax<3) heat3 = bestiaryTag("<FONT COLOR='gray' style='font-family:fredoka; font-weight:500;'>Defeat the area boss on the previous Shellshock level", "transparent")


    let heat4 = bestiaryTag("<FONT COLOR='gray' style='font-family:fredoka; font-weight:500;'>Shellshock 4 🔥", "transparent")
    if (areas[stats.currentArea].heat === 4) heat4 = bestiaryTag("<FONT COLOR='lawngreen' style='font-family:fredoka; font-weight:500;'>Shellshock 4 🔥", "transparent")
    if (areas[stats.currentArea].heatMax<4) heat4 = bestiaryTag("<FONT COLOR='gray' style='font-family:fredoka; font-weight:500;'>Defeat the area boss on the previous Shellshock level", "transparent")

   
    did("tooltipDescription").innerHTML =  bestiaryTag("🔥 Shellshock Level 🔥", "darkorange")+"<div style='font-family:fredoka; text-align:center; font-weight:500; background:transparent'>Increase the difficulty of the area to get higher and better drops!</div><div class='separador'></div>"+heat1+heat2+heat3+heat4+"<div class='separador'></div>"+bestiaryTag("<FONT COLOR='gray' style='font-family:fredoka; font-weight:500;'>Click to cycle through Shellshock levels", "transparent")

    did("tooltipFlavor").textContent = "";

    //position related code
    const movingDiv = did('tooltip');
    const referenceDiv = did("heatIcon");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const tooltipWidth = movingDiv.offsetWidth;
    const newLeft = referenceRect.left/(stats.zoomLevel/100) + referenceRect.width / 2 - tooltipWidth / 2;
    const newTop = referenceRect.bottom/(stats.zoomLevel/100); 
    
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 20 + 'px';
  }


  function updateHeat(){


    did("heatTurtle").src = "img/src/icons/heat"+areas[stats.currentArea].heat+".png";
    did("heatNumber").innerHTML = areas[stats.currentArea].heat


    deleteEnemy();
    enemyUpdate();

    updateDroprates();
    updateOfflineIndicator();

  }

const heatLevels = [1,2,3,4];
let currentHIndex = 0;

function switchHeat(){



    playSound("audio/button3.mp3");

    did("heatIcon").style.animation = "";
    void did("heatIcon").offsetWidth;
    did("heatIcon").style.animation = "gelatineHigh 0.3s 1";



    if (areas[stats.currentArea].heat===areas[stats.currentArea].heatMax) { playSound("audio/gas.mp3"); areas[stats.currentArea].heat = 1; updateHeat(); updateHeatUi(); return }
    if (areas[stats.currentArea].heat===3 && areas[stats.currentArea].heatMax>=4) {playSound("audio/gas.mp3"); areas[stats.currentArea].heat++;updateHeat(); updateHeatUi(); return } 
    if (areas[stats.currentArea].heat===2 && areas[stats.currentArea].heatMax>=3) {playSound("audio/gas.mp3"); areas[stats.currentArea].heat++;updateHeat(); updateHeatUi(); return } 
    if (areas[stats.currentArea].heat===1 && areas[stats.currentArea].heatMax>=2) {playSound("audio/gas.mp3"); areas[stats.currentArea].heat++;updateHeat(); updateHeatUi(); return } 


    

  

  

}







setInterval(playerBuffsDecay, 1000);


function playerBuffsDecay() { 
  for (let b in buffs) {
    if (buffs[b].time > 0){buffs[b].time--; playerBuffs()}


  }


   

    for (i in areas){
      if (areas[i].dungeon){


        if (areas[i].dungeonTimer > 0){

          areas[i].dungeonTimer--;
        } 

        if (areas[i].dungeonTimer === 0 && areas[i].charges!==3){

          areas[i].dungeonTimer = 3600
          if (areas[i].charges===0) areas[i].dungeonTimer = 1800
          areas[i].charges++;
          did(i + "areaCharges").innerHTML = areas[i].charges + " Left";

        }





        if (did("dungeonTab").style.display==="flex"){

        var minutes = Math.floor(areas[i].dungeonTimer / 60); 
        var seconds = areas[i].dungeonTimer % 60;
        did(i + "areaTimer").innerHTML = "⏱️ "+ minutes+"m "+seconds+"s";


        if(areas[i].charges===3) did(i + "areaTimer").innerHTML = "⏱️ MAX"


      }


      }
    }




    if (buffs.B75.time>0) {did("playerNpcPanel").style.filter = "brightness(0)"} else if (did("playerNpcPanel").style.filter === "brightness(0)" && buffs.B75.time<=0) did("playerNpcPanel").style.filter = "none";
  
    if (buffs.PlayerPetrify.time>0) {did("playerAnimation").style.filter = "grayscale(1)"}
    else if (did("playerAnimation").style.filter === "grayscale(1)" && buffs.PlayerPetrify.time<=0) did("playerAnimation").style.filter = "none";


    if (stats.currentArea==="A10") buffs.B91.time = 3;
    if (stats.currentArea==="A11") buffs.B96.time = 3;



}






function playerBuffs() { //only UI

  for (let b in buffs) {
    if (buffs[b].time > 0) { //if time more than 0
      
      if (!did(b + "buff")) {  //if it doesnt exist
       
        if (buffs[b].hidden===true) continue
        const bufdiv = document.createElement("div");
        bufdiv.id = b + "buff";

        bufdiv.innerHTML = '<div class="playerBuffTimer" id="' + b + 'timer"></div><img src='+buffs[b].img+'></div>';

        if ('stacks' in buffs[b] && b !== 'FoodRegen') bufdiv.innerHTML = '<div class="playerBuffTimer" id="' + b + 'timer"></div><img src='+buffs[b].img+'>  <div class="inventoryItemCount" id="'+b+ "stacks" + '">' + buffs[b].stacks + "</div>";


        bufdiv.className = "playerBuffIcon";

        if (buffs[b].invisible===true){bufdiv.style.display="none"}

        bufdiv.addEventListener("click", function () { //right click to remove buff functionality
          if (!buffs[b].debuff && buffs[b].position != "enemy") {
            buffs[b].time = 0;
            playerBuffs();
            resetTooltip();
            playSound("audio/close.mp3") 

          }});

        if (buffs[b].debuff) {
          bufdiv.style.border = "#F55A5C solid 2px";

        } else {
          bufdiv.style.border = "#74F04B solid 2px";

        }


        if (buffs[b].position==="enemy") did("enemyBuffWrapper").appendChild(bufdiv);
        if (buffs[b].position==="player") did("playerBuffWrapper").appendChild(bufdiv);
        if (buffs[b].position==="global") did("globalBuffWrapper").appendChild(bufdiv);

        //if (buffs[b].player) { did("playerBuffWrapper").appendChild(bufdiv);
        //} else if (buffs[b].turtle) { did("turtleBuffWrapper").appendChild(bufdiv); }
        //else { did("enemyBuffWrapper").appendChild(bufdiv); 
      


        statsUpdate();
        updateStatsUI();
        tooltipBuffs();
        buffs[b].visualTime = buffs[b].time;

      }

      if (did(b + "buff")) { //if it does
        eval(buffs[b].effect);
        let percentage = 100 - (((buffs[b].time-1) / buffs[b].visualTime) * 100);
        did(b + "timer").style.transform = 'scaleY('+percentage+"%)";

        if ('stacks' in buffs[b] && b !== 'FoodRegen') did(b + "stacks").innerHTML = beautify(buffs[b].stacks)

        if (buffs[b].stacks<=0)buffs[b].time=0;

      } 
    }

    if (buffs[b].time < 0.99 && did(b + "buff")) {
      did(b + "buff").remove();
      buffs[b].time = 0
      if ('stacks' in buffs[b]) buffs[b].stacks = 0;
      statsUpdate();
      updateStatsUI();
    }


    
  }

  //for (let i in items) if (items[i].trinketCD>0) items[i].trinketCD--
}

function removeBuffs(category) { //Removes all buffs pertaining to a specific tag
  for (let i in buffs) {
    if (buffs[i].tag === category) {
      buffs[i].time = 0;
      buffs[i].stacks = 0;
    } }  
  playerBuffs() 
}


setInterval(damageTicks, 1000);
function damageTicks() {

  let enemyTick = false


  if (rpgPlayer.alive && statHidden.playerNatureDot > 0) { playerNatureDamage(statHidden.playerNatureDot,"dot");}
  if (rpgPlayer.alive && statHidden.playerElementalDot > 0) { playerElementalDamage(statHidden.playerElementalDot,"dot");}
  if (rpgPlayer.alive && statHidden.playerOccultDot > 0) { playerOccultDamage(statHidden.playerOccultDot,"dot");}
  if (rpgPlayer.alive && statHidden.playerHealingDot > 0) { playerHealingDamage(statHidden.playerHealingDot,"dot");}
  
  if (statHidden.enemyNatureDot > 0) { enemyNatureDamage(statHidden.enemyNatureDot); enemyTick=true}
  if (statHidden.enemyElementalDot > 0) { enemyElementalDamage(statHidden.enemyElementalDot); enemyTick=true}
  if (statHidden.enemyOccultDot > 0) { enemyOccultDamage(statHidden.enemyOccultDot); enemyTick=true}
  if (statHidden.enemyHealingDot > 0) { enemyHealingDamage(statHidden.enemyHealingDot); enemyTick=true}


  if (enemyTick) enemyDamageAnimation("low")

  //if (playerNatureDot+playerMightDot+playerElementalDot+playerDeificDot+playerOccultDot>0) enemyAttackCheck(playerNatureDot+playerMightDot+playerElementalDot+playerDeificDot+playerOccultDot) scary!

}

setInterval(() => {
  visualBuffs()
}, 400);



function visualBuffs(){

const enemyRectXRNG = enemyRect.left - containerRect.left + enemyRect.width / rngD(1,3)
const enemyRectYRNG = enemyRect.top - containerRect.top + enemyRect.height / rngD(1,2)

const playerRectXRNG = playerRect.left - containerRect.left + playerRect.width / 2 * rngD(0.7,1.6)
const playerRectYRNG = playerRect.top - containerRect.top + playerRect.height / 2 * rngD(0.9,1.3)


  if (buffs.EnemyPoison.time>0) particleTrackers.push(new ParticleBubble(enemyRectXRNG,enemyRectYRNG,{imageHue:50}));
  if (buffs.PlayerPoison.time>0) particleTrackers.push(new ParticleBubble(playerRectXRNG,playerRectYRNG,{imageHue:50}));


  if (buffs.EnemyBurning.time>0) particleTrackers.push(new ParticleEmber(enemyRectXRNG,enemyRectYRNG));
  if (buffs.EnemyEnrage.time>0) particleTrackers.push(new ParticleBuffEnrage(enemyRectXRNG,enemyRectYRNG));


  if (buffs.BossAura1.time>0) {

    particleTrackers.push(new ParticleGlimmerGhostAuraParticlesBoss())
    if (chance(1/5)) particleTrackers.push(new ParticleBossAngry1())
    else if ((chance(1/5))) particleTrackers.push(new ParticleBossAngry2())
    else if ((chance(1/5))) particleTrackers.push(new ParticleBossAngry3())
    else if ((chance(1/5))) particleTrackers.push(new ParticleBossAngry4())

  }


  if (stats.rogue.active && did("enemyPanel").style.display==="flex") particleTrackers.push(new ParticleBuffEnrage(enemyRectXRNG,enemyRectYRNG, {imageHue: 150, speedY: rngD(-0.2,-0.5), rotationSpeed: rngD(-0.005,0.005), alpha: 0.2, maxAlpha: 0.2, tSpeed: 0.005, alphaDecay: 0.003  }));



  if (buffs.Sparkler1.time>0) {
    particleTrackers.push(new ParticleCursorSparkler(mousePositionX,mousePositionY)); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler(mousePositionX,mousePositionY)); }, 100); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler(mousePositionX,mousePositionY)); }, 200); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler(mousePositionX,mousePositionY)); }, 300);
    particleTrackers.push(new ParticleCursorSparkler(mousePositionX,mousePositionY)); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler(mousePositionX,mousePositionY)); }, 140); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler(mousePositionX,mousePositionY)); }, 240); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler(mousePositionX,mousePositionY)); }, 340);
    particleTrackers.push(new ParticleCursorSparkler(mousePositionX,mousePositionY)); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler(mousePositionX,mousePositionY)); }, 180); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler(mousePositionX,mousePositionY)); }, 280); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler(mousePositionX,mousePositionY)); }, 380);
  }
  
  if (buffs.Sparkler2.time>0) {
    particleTrackers.push(new ParticleCursorSparkler2(mousePositionX,mousePositionY)); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler2(mousePositionX,mousePositionY)); }, 100); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler2(mousePositionX,mousePositionY)); }, 200); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler2(mousePositionX,mousePositionY)); }, 300);
    particleTrackers.push(new ParticleCursorSparkler2(mousePositionX,mousePositionY)); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler2(mousePositionX,mousePositionY)); }, 140); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler2(mousePositionX,mousePositionY)); }, 240); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler2(mousePositionX,mousePositionY)); }, 340);
    particleTrackers.push(new ParticleCursorSparkler2(mousePositionX,mousePositionY)); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler2(mousePositionX,mousePositionY)); }, 180); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler2(mousePositionX,mousePositionY)); }, 280); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler2(mousePositionX,mousePositionY)); }, 380);
  }

  if (buffs.Sparkler3.time>0) {
    particleTrackers.push(new ParticleCursorSparkler3(mousePositionX,mousePositionY)); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler3(mousePositionX,mousePositionY)); }, 100); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler3(mousePositionX,mousePositionY)); }, 200); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler3(mousePositionX,mousePositionY)); }, 300);
    particleTrackers.push(new ParticleCursorSparkler3(mousePositionX,mousePositionY)); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler3(mousePositionX,mousePositionY)); }, 140); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler3(mousePositionX,mousePositionY)); }, 240); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler3(mousePositionX,mousePositionY)); }, 340);
    particleTrackers.push(new ParticleCursorSparkler3(mousePositionX,mousePositionY)); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler3(mousePositionX,mousePositionY)); }, 180); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler3(mousePositionX,mousePositionY)); }, 280); setTimeout(() => { particleTrackers.push(new ParticleCursorSparkler3(mousePositionX,mousePositionY)); }, 380);
  }
  



}






function updateCombatActions(){
    const fullAction = '<div></div>'
    let emtpyActionList = ""


    function returnEmptyActionList(number){

        const emptyAction = '<div style="background:#4B4B4B"></div>'
    
        let gang = ""
            
        
            for (let i = 0; i < number; i++) { loop();}
        
            function loop() {
                gang+=emptyAction
            }
            
        
            return gang
        }

    

    if (combatActions===8) did("playerActionsWrapper").innerHTML = fullAction+fullAction+fullAction+fullAction+fullAction+fullAction+fullAction+fullAction+returnEmptyActionList(stat.ExtraActions-5)
    if (combatActions===7) did("playerActionsWrapper").innerHTML = fullAction+fullAction+fullAction+fullAction+fullAction+fullAction+fullAction+returnEmptyActionList(stat.ExtraActions-4)
    if (combatActions===6) did("playerActionsWrapper").innerHTML = fullAction+fullAction+fullAction+fullAction+fullAction+fullAction+returnEmptyActionList(stat.ExtraActions-3)
    if (combatActions===5) did("playerActionsWrapper").innerHTML = fullAction+fullAction+fullAction+fullAction+fullAction+returnEmptyActionList(stat.ExtraActions-2)
    if (combatActions===4) did("playerActionsWrapper").innerHTML = fullAction+fullAction+fullAction+fullAction+returnEmptyActionList(stat.ExtraActions-1)
    if (combatActions===3) did("playerActionsWrapper").innerHTML = fullAction+fullAction+fullAction+returnEmptyActionList(stat.ExtraActions)
    if (combatActions===2) did("playerActionsWrapper").innerHTML = fullAction+fullAction+returnEmptyActionList(stat.ExtraActions+1)
    if (combatActions===1) did("playerActionsWrapper").innerHTML = fullAction+returnEmptyActionList(stat.ExtraActions+2)
    if (combatActions===0) did("playerActionsWrapper").innerHTML = returnEmptyActionList(stat.ExtraActions+3)
}


document.addEventListener('DOMContentLoaded', initializationCombat);

function initializationCombat() {
  updateCombatActions()

    
}

