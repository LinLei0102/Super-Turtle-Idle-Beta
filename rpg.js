
//#region Variable Hell

var playerAttackInterval = setInterval(playerAttack, 2000*playerHaste);


const enemyAttackMS = 2500000;
var enemyAttackInterval = setInterval(enemyAttack, enemyAttackMS);
var dungeonTime = false;
var showdownTime = false;
var skirmishTime = false;
var skirmishWave = 1;
var godmode = false;

const gatherDifficulty = ["ore", "herb", "cache", "pond"];

stats.currentDifficulty = 'easy';
stats.currentArea = 'A1';
stats.currentEnemy = 'E1';

var currentHP = 0;

const fuse = new Fuse(Object.values(items), {
  keys: ['name', 'description', 'skills'],
  threshold: 0.1,
  ignoreLocation: true, 
})


let resultIds = "";
let emptySearchBar = true;

did("inventorySearch").addEventListener('input', function() {


  let searchResult = fuse.search(inventorySearch.value);

  resultIds = searchResult
  .map(({ item }) => Object.keys(items).find(key => items[key].name === item.name));


  if (inventorySearch.value.length < 2){
    emptySearchBar = true;
  }else emptySearchBar = false


  if (inventorySearch.value.length > 2){
  did("inventory").innerHTML = ""
  addItem();
  }
  


});

//#endregion
//----------------------==========================-----------------------
//----------------------==========COMBAT==========-----------------------
//----------------------==========================-----------------------
//#region Combat


function simulateTime(hits, minutes){ //hits = how many hits it takes to kill an enemy

  let kills = ((minutes*60) / hits) / 1.8 

  for (let i = 0; i < kills; i++) { setTimeout(loop, 5 * i);}


  function loop() {
    currentHP=0; enemyUpdate()
  }
    
  stats.totalSeconds += minutes*60
  stats.activeSeconds += minutes*60




}

function spawnEnemy(enemy) { //spawns enemy based on current difficulty and area, to spawn custom enemy, use deleteEnemy


  if (enemyAdd1OnDeath!==undefined) enemyAdd1OnDeath=undefined
  if (enemyAdd2OnDeath!==undefined) enemyAdd2OnDeath=undefined


  enemyIsDefeated = false
  enemyCanSpawn = false


  enemyDamageMultiplier = 1;
  enemyDefenseMultiplier = 1;
  enemyPhase = 1;
  enemyTurn = 0;
  
  let currentEnemy = undefined

  for (let i in enemies){

    if (enemies[i].difficulty===stats.currentDifficulty&&enemies[i].area===stats.currentArea) {
      currentEnemy=i;
    }
  }  

  if (enemy!==undefined) currentEnemy=enemy

  if (currentEnemy===undefined || currentEnemy===NaN) currentEnemy="E1"; //failsafe to prevent error enemies


  if (bossTime) currentEnemy=areas[stats.currentArea].boss

  if (stats.currentDifficulty==="boss") bossTime = true;

  if (enemies[currentEnemy].breakBar!==undefined) {currentBreakBar = enemies[currentEnemy].breakBar()}
  else currentBreakBar = 0
  setBreakBarColor()

  // present if (!bossTime && document.hasFocus() && !settings.randomEventToggle && rng(1,50) === 1 && !gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty) && !skirmishTime && !showdownTime && !dungeonTime && cd.presentCanSpawn<=0) {currentEnemy="E15"; }


  if (skirmishTime!==false) currentEnemy = skirmish[skirmishTime]["wave" + skirmishWave]


  enemies[currentEnemy].sawOnce = true;

  const div = document.createElement("div");
  div.id = currentEnemy + "enemy";
  div.className = "enemy";
  did("enemyAnimation").appendChild(div);
  div.innerHTML = '<img src="img/src/enemies/' + currentEnemy + '.png">';

   enemies[currentEnemy].level = enemies[currentEnemy].initialLevel() + (1*areas[stats.currentArea].heat-1) + ((areas[stats.currentArea].heat-1)*4)

   if (enemies[currentEnemy].resource)  enemies[currentEnemy].level = 1

  if (document.hasFocus() && !settings.disableAnimations && stats.currentCategory === "rpgContainer"){if (!gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) div.style.animation= "enemySpawn 0.5s 1";}

  if (stats.currentEnemy==="E15") div.style.animation= "enemySpawn 0.5s 1";

  let nameFlair = ""
  //if (settings.proudToggle && enemies[stats.currentEnemy].killCount===0 && (bossTime || dungeonTime)) nameFlair = " 🔰"

  did("enemyName").innerHTML = enemies[currentEnemy].name+nameFlair;
  did("enemyLevel").innerHTML = `lvl ${enemies[currentEnemy].level}`;


  setTimeout(() => {
    if (returnEnemyLevelGap()==="red") did("enemyLevel").style.backgroundColor = "#E15261"
    if (returnEnemyLevelGap()==="orange") did("enemyLevel").style.backgroundColor = "#DD7A42"
    if (returnEnemyLevelGap()==="green") did("enemyLevel").style.backgroundColor = "#62BD6D"
    if (returnEnemyLevelGap()==="gray") did("enemyLevel").style.backgroundColor = "gray"
  }, 1);







  currentHP = enemies[currentEnemy].hp();
  stats.currentEnemy = currentEnemy;

  //if (enemies[stats.currentEnemy].dynamic){
  //  currentHP = eval(enemies[stats.currentEnemy].hp);
  //} 

  if (enemies[stats.currentEnemy].killCount>=100 && stats.currentArea!=="A7"){ farmable = true} else {farmable = false};
    if (farmable) {did('penguinIndicatorButton').style.outline = "lawngreen 2px solid"}
    else {did('penguinIndicatorButton').style.outline = "coral 2px solid"}

    if (enemies[currentEnemy].variance){
      if (enemies[currentEnemy].variance.Hue2!==undefined && areas[stats.currentArea].heat===2) div.style.filter = `hue-rotate(${enemies[currentEnemy].variance.Hue2}deg)`
      if (enemies[currentEnemy].variance.Hue3!==undefined && areas[stats.currentArea].heat===3) div.style.filter = `hue-rotate(${enemies[currentEnemy].variance.Hue3}deg)`
      if (enemies[currentEnemy].variance.Hue4!==undefined && areas[stats.currentArea].heat===4) div.style.filter = `hue-rotate(${enemies[currentEnemy].variance.Hue4}deg)`
      if (enemies[currentEnemy].variance.Alt===true && areas[stats.currentArea].heat>2) div.innerHTML = '<img src="img/src/enemies/' + currentEnemy + 'V.png">';
    }
 

  

/*
  if (document.hasFocus() && farmable && stats.currentDifficulty!=="boss" && cd.gildedCooldown<=0 && !settings.randomEventToggle && !gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)  && !skirmishTime && !showdownTime && !dungeonTime && !bossTime && stats.currentArea!=="A7" && rng(1,50)===1){ //gilding
    cd.gildedCooldown=1200;
    div.className = "enemy gilded";
    did("enemyLevel").textContent = "[lvl "+rpgClass[stats.currentClass].level +"]";
    buffs.B83.time=2;
    currentHP = 15000
  }
*/

  if (stats.currentEnemy==="E43") buffs.B83.time=2; //present mimic


  if (buffs.B67.time>0 && currentEnemy!=="E15"){ //caltrops
    //currentHP -= Math.min((currentHP-1), (playerWeaponDamage*0.2)*playerSpellpower);
    enemyBasicDamage(Math.min(playerWeaponDamage*0.2*playerSpellpower /* *Math.pow(1.005, playerMastery) */ , currentHP-1),"zeroScale")
    
  }

  if (enemies[stats.currentEnemy].start) enemies[stats.currentEnemy].start()


  enemyUpdate();


    


}

rpgPlayer.BossCharges = 5
stats.totalKills = 0
stats.totalBossKills = 0
var dungeonPoints = 0;
var skirmishPoints = 0;
var dungeonStage = 0;
var farmable = false
stats.dungeonsCleared = 0;
stats.purifiedMorgatosDefeated = 0;

var dungeonCollectibles = { 
  I448:{P:100, A:1}, 
  I450:{P:100, A:1}, 

  I452:{P:200, A:1}, 
  I453:{P:200, A:1}, 

  I454:{P:400, A:1}, 
  I449:{P:400, A:1},

  I451:{P:600, A:1},

  I447:{P:700, A:1}, 
}



let enemyCanSpawn = true
let enemyIsDefeated = false

setInterval(() => {



  enemyCanSpawn = true



  if (enemyIsDefeated && enemyCanSpawn){
    spawnEnemy();


  }


}, 1000);

let enemyAdd1MaxHp = 10000/2
let enemyAdd2MaxHp = 10000/2
let enemyAdd1CurrentHp = 10000/2
let enemyAdd2CurrentHp = 10000/2
let enemyAdd1Alive = false
let enemyAdd2Alive = false
let enemyAdd1OnDeath = undefined
let enemyAdd2OnDeath = undefined

function enemyUpdate() { //updates enemy HP and checks if enemy is dead

 
  if (currentHP <= 0 && currentBreakBar===0) { //on enemy kill

      did("enemyHpBar").style.transition = "none";
      did("enemyHpBar").style.width = percentageHP+"%";

      if (enemies[stats.currentEnemy].onDeath !== undefined) enemies[stats.currentEnemy].onDeath()


      //if (currentSet==="nightmare"){buffs.B88.time=6; if (buffs.B88.stacks<50) buffs.B88.stacks++;}
      //if (rpgPlayer.trinketSlot==="I11") rpgPlayer.coins+= items.I11.statUp

      //if (stats.currentArea==="A9" && rng(1,10)===1) {castArea9Explosion()}


        


      //  if (gardenDragonGoldPower>0){
      //rpgPlayer.coins += gardenDragonGoldPower
      //stats.totalCoins += gardenDragonGoldPower
      //  } 

        //if (battleData) dataEnemiesKilled ++

        //if (talent.TA1D1.active && rpgPlayer.mana<playerMaxMana) rpgPlayer.mana += playerMaxMana*0.005


        //const loottable = window[stats.currentArea + 'Loot']; if (loottable) {rollTable(eval(stats.currentArea+"Loot"), 1) }

        

       


          /*
          let smallCrystalDropChance = 500
          if (enemies[stats.currentEnemy].align==="nature") rareItemDrop("I434", smallCrystalDropChance)
          if (enemies[stats.currentEnemy].align==="might") rareItemDrop("I435", smallCrystalDropChance)
          if (enemies[stats.currentEnemy].align==="elemental") rareItemDrop("I436", smallCrystalDropChance)
          if (enemies[stats.currentEnemy].align==="occult") rareItemDrop("I437", smallCrystalDropChance)
          if (enemies[stats.currentEnemy].align==="deific") rareItemDrop("I438", smallCrystalDropChance)
          */

          rpgClass[stats.currentClass].currentExp += returnEnemyExp()

          giveShells(returnEnemyShells())


          if (chance(1/1000)) {spawnItem(VendorTrash,1,"noPopup"); flyingLoot()}
          
          if (unlocks.bestiary && chance(1/ (1000/nofarmToggleBonus) )) {dropMonsterCard()}

          lootTable(areas[stats.currentArea].lootTable(),"enemy")

          combatActions = 3+stat.ExtraActions
          extraLivesUsed = stat.ExtraLives
          updateCombatActions()
          /*
          let extraExp = 1
          if (settings.nofarmToggle) extraExp = 2

          var totalEXP = Math.round(enemies[stats.currentEnemy].exp * playerEXPGain * extraExp);
          if (talent.TI3C2.active && (enemies[stats.currentEnemy].medal==="gold" || enemies[stats.currentEnemy].medal==="platinum")) totalEXP *= 1.5
          rpgClass[stats.currentClass].currentExp += totalEXP;
          stats.totalExp += totalEXP;
          if (!settings.disableExpLog) logPrint("<FONT COLOR='#ae77f7'>" + enemies[stats.currentEnemy].name + " gets defeated! You gain " + beautify(totalEXP) + " EXP!" );

          if (battleData) dataExpGained += totalEXP

          */


            for (let i in enemies){ if (did(i+"enemy")){
              if (document.hasFocus()  && !settings.disableAnimations && stats.currentCategory === "rpgContainer"){
                if (!gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) { setTimeout(() => {
                  voidAnimation(i+"enemy","enemyDefeat 0.2s 1 ease");
                }, 10);    }
              }
              setTimeout(function () { if (did(i+"enemy")){ did(i + "enemy").remove(); } }, 110);
              }}
          


        

        trinketEnemyKill(); //trinket effect
        expBar();
        dropLoot(stats.currentEnemy)

    if (enemies[stats.currentEnemy].tag==="areaBoss"){
      if (areas[stats.currentArea].heat===areas[stats.currentArea].heatMax && areas[stats.currentArea].heatMax<4) {
        areas[stats.currentArea].heatMax++;
        createPopup('🔥 Shellshock cap increased!')
        playSound("audio/startup.mp3","noPitch");
      }
      rpgPlayer.BossCharges--
      stats.areaBossKills++
      if (unlocks.bestiary && chance(1/ (20/nofarmToggleBonus) )) {dropMonsterCard()}
      stats.areaBossKillsLog++
      stats.currentDifficulty="easy"
      encounterButtonPress(); 
      deleteEnemy();
      voidAnimation("bossTimer", "gelatine 0.2s 1")
      resetEncounter()

    }
    
    bossTime = false;



    if (enemies[stats.currentEnemy].firstTimeReward && enemies[stats.currentEnemy].killCount===0) improbabilityDrive("guaranteed")

      
    if (dungeonTime) {
      dungeonPoints++;
      updateDungeonPoints()
    }

    if (enemies[stats.currentEnemy].tag==="finalBoss"){ //dungeon ender
      playSound("audio/startup.mp3");
      dungeonTime=false;
      rollTable(dungeonCollectibles, 1)
      did("rpgCanvas").style.animation = "";
      void did("rpgCanvas").offsetWidth;
      did("rpgCanvas").style.animation = "rpgFade 1s 1";
      if (rpgClass[stats.currentClass].level > areas[stats.currentArea].level) {stats.currentArea = previousArea;} else {stats.currentArea = "A1";}
      if (areas[previousArea].dungeon) stats.currentArea = "A1";
      stats.currentDifficulty = previousDifficulty;
      dungeonPoints = 0;
      dungeonStage=0
      stats.dungeonsCleared++;
      if (rng(1,5)===1) rareItemDrop(rareItems[rng(0,(rareItems.length-1))],1)
      if (rng(1,15)===1) rareItemDrop(rareItems2[rng(0,(rareItems2.length-1))],1)
      updateDungeonPoints();
      switchArea();
      updateBGColor();
      specialButtonUi();
      createAreaPanel();
    }

    if (enemies[stats.currentEnemy].tag==="arena"){
      voidAnimation("areaTransition","areaTransition 0.4s 1 linear")

      did("enemyPanel").style.display = "none";
      playSound("audio/startup.mp3");
      repositionQuickAccessMenu()

    }

    if (enemies[stats.currentEnemy].tag==="stageBoss1"){
      dungeonStage=1;
      playSound("audio/startup.mp3");
      dungeonPoints = 0;
      updateDungeonPoints();
      did("dungeonBox2").style.animation = "";
      void did("dungeonBox2").offsetWidth;
      createAreaPanel();
    }

    if (enemies[stats.currentEnemy].tag==="stageBoss2"){
      dungeonStage=2;
      playSound("audio/startup.mp3");
      dungeonPoints = 0;
      updateDungeonPoints();
      did("dungeonBox2").style.animation = "";
      void did("dungeonBox2").offsetWidth;
      createAreaPanel();
    }

    if (enemies[stats.currentEnemy].tag==="showdownBoss"){
      showdown[enemies[stats.currentEnemy].showdown].bestTime = showdownTimer;
      playSound("audio/startup.mp3");
      did(enemies[stats.currentEnemy].showdown+"showdown").style.animation = "levelUp 1s 1";
      endShowdown()

    }

    if (skirmishTime) {
      skirmishPoints++;
      updateSkirmishPoints()
    }

    if (stats.currentEnemy === "E18" && enemyPhase===2) stats.purifiedMorgatosDefeated++
  
    enemies[stats.currentEnemy].killCount++;
    if (unlocks.bestiary) enemies[stats.currentEnemy].medalProgress++
    stats.totalKills++;
    if (bossTime) {stats.totalBossKills++;};


    /*
    if (settings.nofarmToggle) {

      enemies[stats.currentEnemy].killCount++;
      stats.totalKills++;
      if (bossTime) {stats.totalBossKills++;};
      eval(enemies[stats.currentEnemy].drop);




    }*/


    //if (enemies[stats.currentEnemy].killCount===1 && stats.currentEnemy===areas[stats.currentArea].boss) {
    //  createPopup('💠 Mastery cap released!', '#6FB1EE')
    //  statsUpdate()
    //  updateStatsUI()
    //  did("areaLevel").style.display = "none"
    //}
    
    
    removeBuffs("clear");
    playerBuffs();

    


    if (rpgPlayer.debug)console.log("defeated")


    enemyIsDefeated = true

    if (enemyCanSpawn || rpgPlayer.debug){
      spawnEnemy();

      return
    }

    enemyCanSpawn = false






  //else {
  //  enemyIsDefeated = true
  //  enemyCanSpawn = false
  //}

  


    

    

    //else if (enemyCanSpawn){
    //  spawnEnemy();
    //  enemyIsDefeated = false
    //  enemyCanSpawn = false
    //} 



    

  }

 


  if ((currentHP <= 0 && currentBreakBar>0)) {

    currentBreakBar--
    currentHP = enemies[stats.currentEnemy].hp()
    voidAnimation("enemyHpBg","attackMediumHit 1 0.2s")
    voidAnimation("enemyBreakDiamond","attackMediumHit 1 0.5s")
    playSound("audio/explosion.mp3");
    did("enemyHpBarLoss").style.width = "100%";
    let diamondRect = did("enemyBreakDiamond").getBoundingClientRect();
    let centerX = diamondRect.left - containerRect.left + diamondRect.width / 2;
    let centerY = diamondRect.top - containerRect.top + diamondRect.height / 2;


    selectedItemRect = did("enemyBreakDiamond").getBoundingClientRect();


    particleTrackers.push(new ParticleSellPulse());

    particleTrackers.push(new ParticleSparks(centerX, centerY))
    particleTrackers.push(new ParticleSparks(centerX, centerY))
    particleTrackers.push(new ParticleSparks(centerX, centerY))

    setBreakBarColor()
  }




  

  if (enemyAdd1CurrentHp>0){
    var percentageHP = (enemyAdd1CurrentHp / enemyAdd1MaxHp) * 100;
    did("addHealthBar1").style.background = "linear-gradient(90deg, #90EE6F " + percentageHP + "%, #FF7777 " + percentageHP + "%)";
  }

  if (enemyAdd2CurrentHp>0){
    var percentageHP = (enemyAdd2CurrentHp / enemyAdd2MaxHp) * 100;
    did("addHealthBar2").style.background = "linear-gradient(90deg, #90EE6F " + percentageHP + "%, #FF7777 " + percentageHP + "%)";
  }

  if ((enemyAdd1CurrentHp<=0 || currentHP<=0 ) && enemyAdd1Alive){
    enemyAdd1Alive = false
    did("enemyAdd1Anim").style.animation = "enemyDefeat 0.2s 1 ease";
    setTimeout(() => {
      did("addPanel1").style.display = "none";
      clickTarget("Enemy")
      if (enemyAdd1OnDeath!==undefined) enemyAdd1OnDeath();

    }, 150);
  }

  if ((enemyAdd2CurrentHp<=0 || currentHP<=0 ) && enemyAdd2Alive){
    enemyAdd2Alive = false
    did("enemyAdd2Anim").style.animation = "enemyDefeat 0.2s 1 ease";
    setTimeout(() => {
      did("addPanel2").style.display = "none";
      clickTarget("Enemy")
      if (enemyAdd2OnDeath!==undefined) enemyAdd2OnDeath();
    }, 150);
  }



  var percentageHP = (currentHP / enemies[stats.currentEnemy].hp()) * 100;
  if (did(stats.currentEnemy+"enemy") && did(stats.currentEnemy+"enemy").classList.contains('gilded')) percentageHP = (currentHP / 15000) * 100;
  did("enemyHpBar").style.width = percentageHP+"%";
  did("enemyHpBarLoss").style.width = percentageHP+"%";





}


function setBreakBarColor(){

  if (currentBreakBar===0) {did("enemyHpBar").style.background = '#90EE6F'; did("enemyHpBg").style.background = '#FF7777'; did("enemyBreakDiamond").style.background = `gray`}
  if (currentBreakBar===1) {did("enemyHpBar").style.background = '#CA79E5'; did("enemyHpBg").style.background = '#90EE6F'; did("enemyBreakDiamond").style.background = `linear-gradient(45deg, #C264E2 50%, #DD8BE5 50%)`  }
  if (currentBreakBar===2) {did("enemyHpBar").style.background = '#F9D668'; did("enemyHpBg").style.background = '#CA79E5'; did("enemyBreakDiamond").style.background = `linear-gradient(45deg, rgba(255,167,46,1) 50%, rgba(255,217,106,1) 50%)`  }
  if (currentBreakBar===3) {did("enemyHpBar").style.background = '#3B8EF8'; did("enemyHpBg").style.background = '#F9D668'; did("enemyBreakDiamond").style.background = `linear-gradient(45deg, #398BFC 50%, #7295FD 50%)`  }





}



function dropLoot(enemy){


  if (enemies[enemy].lootTable != undefined){

    if (enemies[enemy].resource) {lootTable(enemies[enemy].lootTable(), "hidden"); return}

    lootTable(enemies[enemy].lootTable(), "enemy")

  }

}

function giveShells(amount){
  rpgPlayer.coins+=amount;
  stats.totalCoins+=amount;
  did("contadorMonedas").textContent = beautify(rpgPlayer.coins);

}



function playerAttack() { 
      if (rpgPlayer.alive && rpgPlayer.weaponSlot!=="none" && !(stats.currentArea === "A7" && !skirmishTime && !showdownTime) && !(stats.currentEnemy==='E20' && items[rpgPlayer.weaponSlot].tag!=="rod") && !(gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty) && enemies[stats.currentEnemy].gatheringLevel>playerGatheringLevel) && buffs.B74.time<=0  && buffs.B85.time<=0) {

        if (!settings.disableCombatAudio) playSound("audio/playerAttack.mp3")        

        if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) { //if its a gathering node
          

          var damageDealt = 5;
          if (rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].tag==="mattock" && (enemies[stats.currentEnemy].difficulty==="ore" || enemies[stats.currentEnemy].difficulty==="herb")) {
          damageDealt = 25
          if  (talent.TA32A.active && enemies[stats.currentEnemy].difficulty==="ore" && rng(1,10)===1) damageDealt = 50 //enchant pickaxe
          if  (talent.TG2D3.active && enemies[stats.currentEnemy].difficulty==="herb" && rng(1,10)===1) damageDealt = 50
        } 
          enemyBasicDamage(damageDealt)

          if (currentSet==="explorer" && stats.currentEnemy==="E14"){
            if( rng(1,500)===1) {logPrint("<FONT COLOR='#edd585'>"+enemies[stats.currentEnemy].name + ": oooo yeah that hits the spot");}
            if( rng(1,500)===1) {logPrint("<FONT COLOR='#edd585'>"+enemies[stats.currentEnemy].name + ": get yer hands off me leaves");}
            if( rng(1,500)===1) {logPrint("<FONT COLOR='#edd585'>"+enemies[stats.currentEnemy].name + ": why are you looking at me like that");}
            if( rng(1,500)===1) {logPrint("<FONT COLOR='#edd585'>"+enemies[stats.currentEnemy].name + ": can we resolve this peacefully");}
          }


          if (equipCheck("I328")) eval(items[rpgPlayer.weaponSlot].attackChance)
          
          
        } else  {

          playerAttackCheck();
          
          if ( rpgPlayer.weaponSlot==="none" || items[rpgPlayer.weaponSlot].animation === undefined) {
            playerAttackHit()
          }


      }

      if (document.hasFocus()  && !settings.disableAnimations && stats.currentCategory === "rpgContainer"){

      if (rpgPlayer.weaponSlot!=="none" && items[rpgPlayer.weaponSlot].animation === "ranged"){

        did("playerWeapon").style.animation = "";
        void did("playerWeapon").offsetWidth;
        did("playerWeapon").style.animation = "gelatineHigh " + (2000*playerHaste / 400) / 6 + "s 1 ease";

        did("playerAnimation").style.animation = "";
        void did("playerAnimation").offsetWidth;
        did("playerAnimation").style.animation = "gelatine " + (2000*playerHaste / 400) / 6 + "s 1 ease";


      }

      if ( rpgPlayer.weaponSlot==="none" || items[rpgPlayer.weaponSlot].animation === undefined) {
        did("playerAnimation").style.animation = "";
        void did("playerAnimation").offsetWidth;
        did("playerAnimation").style.animation = "playerAttack " + (2000*playerHaste / 1000) / 2 + "s 1 ease";
      }

      did("npcPanel").style.animation = "";
      void did("npcPanel").offsetWidth;
      did("npcPanel").style.animation = "gelatine 0.3s 1 ease";
    
    
    }
  
  enemyUpdate();
}


  
}

function playerAttackHit(){ //a regular player attack

  if (rpgPlayer.weaponSlot !== "none") {

  let damage = weaponMightDamage + weaponNatureDamage + weaponElementalDamage + weaponDeificDamage + weaponOccultDamage
  
  if (items[rpgPlayer.weaponSlot].align==="nature") enemyNatureDamage(damage, "str")
  else if (items[rpgPlayer.weaponSlot].align==="might") enemyMightDamage(damage, "str")
  else if (items[rpgPlayer.weaponSlot].align==="elemental") enemyElementalDamage(damage, "str")
  else if (items[rpgPlayer.weaponSlot].align==="occult") enemyOccultDamage(damage, "str")
  else if (items[rpgPlayer.weaponSlot].align==="deific") enemyDeificDamage(damage, "str")

  } else enemyBasicDamage(10)

}

function playerAttackCheck(){


//if ('defenseChance' in enemies[stats.currentEnemy]) eval(enemies[stats.currentEnemy].defenseChance)

//if (rpgPlayer.trinketSlot!=='none' && items[rpgPlayer.trinketSlot].attackChance) eval(items[rpgPlayer.trinketSlot].attackChance)
//if (rpgPlayer.weaponSlot!=='none' && items[rpgPlayer.weaponSlot].attackChance) eval(items[rpgPlayer.weaponSlot].attackChance)

//for (i in buffs) if (buffs[i].time>0) eval(buffs[i].attackChance)

  if (currentSet==="explorer" && chance(1/2)){
    particleTrackers.push(new ParticleExplorerSet1(playerCenterX*rngD(0.9,1.1),playerCenterY*rngD(0.9,1.1)))
    setTimeout(() => {
        enemyDamageAnimation("low")
        enemyNatureDamage(stat.Power)
    }, 2000);
  }


  if (currentSet==="tiger" && chance(1/20)){

    for (let i = 0; i < 5; i++) { setTimeout(loop, 100 * i);}
    function loop() { particleTrackers.push(new ParticleTigerRoar()); voidAnimation("playerAnimation","gelatineHigh 0.3s 1"); playSound("audio/pet3.mp3") }
    buffs.TigerSet.time=10;
    playerBuffs()
    
  }



//if (buffs.B100.time>0) castShadowBolt();

}



function playerHealthCheck() {

if (rpgPlayer.trinketSlot !== 'none' && 'healthChance' in items[rpgPlayer.trinketSlot]) eval(items[rpgPlayer.trinketSlot].healthChance)



}


function clearNegativeBuffs(){
  removeBuffs("clear");

for (i in buffs){
  if (buffs[i].time>0 && buffs[i].player && !buffs[i].buff){
    buffs[i].time = 0;
  }
}




}





setInterval(hpRegen, 1000);
function hpRegen() { //additionally manages death
  if (rpgPlayer.alive) {
    //if player alive
    if (rpgPlayer.hp < stat.MaxHealth && (!bossTime && !dungeonTime && !showdownTime && !skirmishTime )) {

    rpgPlayer.hp += stat.MaxHealth/20;

    } else if (talent.TG2C2.active) rpgPlayer.hp += stat.MaxHealth/100;
    playerUpdate()
    //if (bossTime && rpgPlayer.hp<=stat.MaxHealth*0.01) logs.L1P22A.unlocked=true
    
  } else {
    //if player dead


    if (stats.timesDied===0 && did("playerAnimation").style.transform != "rotateX(180deg) translateY(-35%)") tipPopUp("💀 Defeated! 💀","<img src=img/sys/nerd.png><br>If your turtle is defeated, click on it to revive.<br><br>Do not worry, there are zero demerits to being defeated!")


    extraLivesUsed = stat.ExtraLives
    combatActions = 3+stat.ExtraActions
    updateCombatActions()



    if (rpgPlayer.hp < 0) rpgPlayer.hp=0;
    playerUpdate()
    did("playerAnimation").style.animation = "playerDeath 1s 1";
    setTimeout(function () { did("playerAnimation").style.transform = "rotateX(180deg) translateY(-35%)"; }, 800);
    did("rpgPlayerImg").src = "img/src/armor/dead.png";

    if (rpgPlayer.hp >= stat.MaxHealth) {
      rpgPlayer.alive = true;
      playSound("audio/lily.mp3");
      animParticleBurst(4 , "particleHeart", "playerPanel", 0);
      animParticleBurst(4 , "particleLight", "playerPanel", 0);
      
      stats.timesDied++; //prevents the player from reloading and getting points

      did("playerAnimation").style.animation = "playerRevive 1s 1";
      setTimeout(function () { did("playerAnimation").style.transform = ""; }, 800);
      tierCheck()

    }
  }


  if (rpgPlayer.hp > stat.MaxHealth) rpgPlayer.hp = stat.MaxHealth //prevents overhealing


}

var bossTime = false;
function enemyAttack() {
  if (
    gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty) || !rpgPlayer.alive || (stats.currentArea === "A7" && !skirmishTime && !showdownTime) || (buffs.B6.time>0 || buffs.B44.time>0)) { //conditions to not attack
  } else {
    if (!settings.disableCombatAudio) playSound("audio/enemyAttack.mp3")
        var damageDealt = enemies[stats.currentEnemy].attack() //damage variance
        //if (enemies[stats.currentEnemy].dynamic) damageDealt = rng(eval(enemies[stats.currentEnemy].attack), (eval(enemies[stats.currentEnemy].attack)*1.05))*enemyDamageMultiplier //damage variance

        let dodged = false;

        if (buffs.B49.time>0 && rng(1,3)===1) dodged = true
        if (clothTier && rng(1,10)===1) dodged = true

        if (!dodged){

        if (did(stats.currentEnemy+"enemy") && did(stats.currentEnemy+"enemy").classList.contains('gilded')) damageDealt = eval(playerMaxHp/6)

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

    if(enemies[stats.currentEnemy].animation === "ranged"){
      did("enemyAnimation").style.animation = "";
      void did("enemyAnimation").offsetWidth;
      did("enemyAnimation").style.animation = "gelatine 0.4s 1";

    }else{
      did("enemyAnimation").style.animation = "";
      void did("enemyAnimation").offsetWidth;
      did("enemyAnimation").style.animation = "enemyAttack 0.5s 1";

    }
    

    did("playerAnimation").style.animation = "";
    void did("playerAnimation").offsetWidth;
    did("playerAnimation").style.animation = "gelatine 0.3s 1 ease";

    

      }

    enemyAttackCheck(damageDealt)
}
}

function enemyAttackCheck(damage){

  //if (rpgPlayer.trinketSlot!=='none' && items[rpgPlayer.trinketSlot].defenseChance) eval(items[rpgPlayer.trinketSlot].defenseChance)
  //if (rpgPlayer.weaponSlot!=='none' && items[rpgPlayer.weaponSlot].defenseChance) eval(items[rpgPlayer.weaponSlot].defenseChance)
  //if (rpgPlayer.ringSlot!=='none' && items[rpgPlayer.ringSlot].defenseChance) eval(items[rpgPlayer.ringSlot].defenseChance)


  if ('attackChance' in enemies[stats.currentEnemy]) {
    enemyTurn++
    eval(enemies[stats.currentEnemy].attackChance)
  }


  //if (buffs.B48.time>0) enemyOccultDamage(Math.min(damage*0.5, expectedPlayerDamage), "zeroScale")
  //if (gardenReflectPower>0) enemyNatureDamage(   Math.min( damage*gardenReflectPower/100, expectedPlayerDamage )         , "zeroScale");



  if (stat.Thorns>0){
    if (enemies[stats.currentEnemy].align==="elemental") enemyElementalDamage( Math.min(damage*(stat.Thorns/100),stat.Power*2) ,"zeroScale")
    if (enemies[stats.currentEnemy].align==="nature") enemyNatureDamage( Math.min(damage*(stat.Thorns/100),stat.Power*2) ,"zeroScale")
    if (enemies[stats.currentEnemy].align==="occult") enemyOccultDamage( Math.min(damage*(stat.Thorns/100),stat.Power*2) ,"zeroScale")
    } 






}




function deleteEnemy(enemy) {  //deletes without loot, used in dungeons, bosses and switching area
  
  for (let i in enemies) {
    if (did(i + "enemy")) {
      
  did(i + "enemy").remove();
  currentHP = 0;
  
    }}


    if (areas[stats.currentArea].empty===true ) return
    spawnEnemy(enemy);
    voidAnimation(stats.currentEnemy + "enemy","enemySpawn 0.5s 1")





}

function logPrint(print) {
  let hitLog = document.createElement("div");
  did("combatLog").prepend(hitLog);
  hitLog.className = "logMessage";
  hitLog.innerHTML = print;
  
  if (did("combatLog").children.length >= 100) {did("combatLog").lastChild.remove();}
  
}


function tipPopUp(title, desc){

  did("tipPanel").style.display = "flex"
  did("tipPanelName").innerHTML = title
  did("tipPanelDesc").innerHTML = desc
  playSound("audio/button3.mp3");
  did("bodyCover").style.display = "flex";
  
}

document.getElementById("combatLog").addEventListener('scroll', function() {
  var combatLog = document.getElementById("combatLog");
  
  var isAtBottom = combatLog.scrollHeight - combatLog.scrollTop <= combatLog.clientHeight + 30; // margen de 5 píxeles
  
  if (isAtBottom) {
    combatLog.scrollTop = combatLog.scrollHeight - combatLog.clientHeight;
  }
});







function returnEnemyLevelGap(mode,value){

  let playerLevel = rpgClass[stats.currentClass].level;
  let enemyLevel = enemies[stats.currentEnemy].level;


  if (mode==="difference") return rpgClass[stats.currentClass].level - enemies[stats.currentEnemy].level;
  if (mode==="compare"){
    enemyLevel = value
  }

  if (enemyLevel >= playerLevel + 3) {
    return "red";
}
if (enemyLevel >= playerLevel - 1) {
    return "orange";
}
if (enemyLevel >= playerLevel - 3) {
    return "green";
}
return "gray";
}


function returnEnemyExp(){


const expRate = (10 * (1+stat.ExpBonus/100)) * nofarmToggleBonus


let givenExp = 0

if (returnEnemyLevelGap()==="red") givenExp = expRate * 1.5
if (returnEnemyLevelGap()==="orange") givenExp = expRate
if (returnEnemyLevelGap()==="green") givenExp = expRate * 0.2
if (returnEnemyLevelGap()==="gray") givenExp = 0

return givenExp
}

function returnEnemyShells(){


let givenExp = stat.Income

//if (returnEnemyLevelGap()==="red") givenExp = stat.Income * 1.5
//if (returnEnemyLevelGap()==="orange") givenExp = stat.Income
//if (returnEnemyLevelGap()==="green") givenExp = stat.Income * 0.5
if (returnEnemyLevelGap()==="gray") givenExp = stat.Income * 0.1

return givenExp
}




function expBar() { //updates exp bar and checks level up

  if (rpgClass[stats.currentClass].level>=rpgClass[stats.currentClass].maxLevel){ rpgClass[stats.currentClass].currentExp = 0 }





  if (rpgClass[stats.currentClass].currentExp >= 1000) { //on level up
    playSound("audio/levelup.mp3")
    rpgClass[stats.currentClass].currentExp -= 1000;
    rpgClass[stats.currentClass].level += 1;

    voidAnimation("expPanel", "levelUp 1s 1")
    voidAnimation("playerAnimation", "gelatineHigh 0.4s 1")


    //animState("playerAnimation", "gelatineHigh 0.3s 1");animParticleBurst(15 , "particleExp", "playerPanel", 0)
    did("turtleLevel2").innerHTML = rpgClass[stats.currentClass].level

    //if (rpgClass.noClass.level>29) rpgPlayer.talentProgress++;
    //if (rpgPlayer.talentProgress===6){rpgPlayer.talentProgress=0; rpgPlayer.talentPoints++; rpgPlayer.totalTalentPoints++}


    particleTrackers.push(new ParticleRiseup());

    createPopup('💠 Level Up!', '#6FB1EE')


    updateClass()
    unlocksReveal();
    updateTalentUI();
    statsUpdate();
    updateStatsUI();
    createAreaPanel();
  }

  let percentageEXP = (rpgClass[stats.currentClass].currentExp / 1000) * 100;
  did("expBar").style.background = "linear-gradient(90deg, #6FB1EE " + percentageEXP + "%, #521413 " + percentageEXP + "%)";
  did("currentExp").textContent = beautify(rpgClass[stats.currentClass].currentExp) + "/" + beautify(1000);




}


function resetTalentPoints() {

  for (var i in talent) { talent[i].active = false;}
  talent.T0.active = true;
  talent.noClass.active = true;

  playSound('audio/talent2.mp3');

  did("myCanvas").width = did("myCanvas").width

  for (let i in talent) {

      if ("statUp" in talent[i]) talent[i].statUp = 0;

      if ("parent" in talent[i]) {
        var parent = talent[i].parent
  
        const [startX, startY] = talent[i].position.split(' ');
        const [endX, endY] = talent[parent].position.split(' ');
  
        drawLine(parseInt(startX, 10), parseInt(startY, 10), parseInt(endX, 10),parseInt(endY, 10));
  
        }
  
        if ("parent2" in talent[i]) {
          var parent = talent[i].parent2
    
          const [startX, startY] = talent[i].position.split(' ');
          const [endX, endY] = talent[parent].position.split(' ');
    
          drawLine(parseInt(startX, 10), parseInt(startY, 10), parseInt(endX, 10),parseInt(endY, 10));
    
          }

      
    }

    unlocksReveal()

    stats.currentClass = "noClass";
    rpgPlayer.skill0 = "none";
    rpgPlayer.skill1 = "none";
    rpgPlayer.skill2 = "none";
    rpgPlayer.skill3 = "none";
    rpgPlayer.skill4 = "none";

    did("skillWrapper").innerHTML=""
    did("classWrapper").innerHTML=""

    
    rpgPlayer.talentPoints = rpgPlayer.totalTalentPoints;


  updateSkills();
  updateClass();
  updateTalentUI();
  createTalent();


 
  

}

function updateClass(){

  /*
  rpgPlayer.baseStrength = 4 + (rpgClass[stats.currentClass].level * 9);
  rpgPlayer.baseMaxHp = 33 + (rpgClass[stats.currentClass].level * 67);
  rpgPlayer.baseHpRegen = 3.3 + (rpgClass[stats.currentClass].level * 6.7);
*/
  did("turtleLevel").innerHTML = `lvl ${rpgClass[stats.currentClass].level}`;
  did("turtleLevel2").innerHTML = rpgClass[stats.currentClass].level;
  did("classIcon").src = "img/src/talents/"+stats.currentClass+".jpg";
  did("expPanelClass").innerHTML = `[ lvl  ${rpgClass[stats.currentClass].level} ] < ${rpgClass[stats.currentClass].name} >`;
  did("expPanelClass").style.color = rpgClass[stats.currentClass].color;
  //did("expPanelClass").style.background = rpgClass[stats.currentClass].color;

  expBar();
  statsUpdate();
  updateStatsUI();
}


function updateDungeonPoints(){

  let percentageEXP =  (dungeonPoints/areas[stats.currentArea].dungeonPoints)*100;   
  did('dungeonMeter').style.width = percentageEXP+"%";

  if (dungeonPoints >= areas[stats.currentArea].dungeonPoints){
    dungeonPoints = 0;
  if (dungeonStage===0){
  playSound("audio/levelup.mp3");
  did("dungeonBox2").style.animation = "levelUp 1s 1";
  did("dungeonBox2").style.animation = "dungeonBoss 3s infinite";
  setTimeout(() => {  deleteEnemy(areas[stats.currentArea].boss1) }, 200);
  }

  if (dungeonStage===1){
  playSound("audio/levelup.mp3");
  did("dungeonBox2").style.animation = "levelUp 1s 1";
  did("dungeonBox2").style.animation = "dungeonBoss 3s infinite";
  setTimeout(() => {  deleteEnemy(areas[stats.currentArea].boss2) }, 200);
  }

  if (dungeonStage===2){
    playSound("audio/levelup.mp3");
    did("dungeonBox2").style.animation = "levelUp 1s 1";
    did("dungeonBox2").style.animation = "dungeonBoss 3s infinite";
    setTimeout(() => {  deleteEnemy(areas[stats.currentArea].boss3) }, 200);
    }

  }
  
}


function trinketEnemyKill() {}

const typestrength = 1.5;
const typeResist = 0.2;



function enemyDamage(damage, align, icon, type){


  if (buffs.EnemyInvulnerable.time>0 && currentTarget === "Enemy"){
    damageText("Immune", 'damageText', "#808080", undefined, "enemyPanel");
    return
  }
  if (enemyIsDefeated) return
  if (enemies[stats.currentEnemy].resource!==undefined && (align=="Nature" || align=="Elemental" || align=="Occult")) return


  let critMark = "";
  let crit = 1;

  if (stat.CritChance>0 && rng(1,100)<=stat.CritChance) {
    critMark = " !"
    crit = 1.5*1+stat.CritDamage/100
    stats.criticalHitsDealt++;
    if (talent.TA1C.active && rpgPlayer.mana<playerMaxMana) rpgPlayer.mana += playerMaxMana*0.02
    playSound("audio/hit2.mp3")

  }

  damageDealt = damage /* * Math.pow(1.005, playerMastery) */ * enemyDefenseMultiplier * crit
  if (type==="zeroScale") damageDealt = damage * enemyDefenseMultiplier * crit

  //if (returnEnemyLevelGap()==="red") damageDealt *= 0.3

  if (returnEnemyLevelGap("difference")>0) damageDealt *= 1 + (    Math.min(3,returnEnemyLevelGap("difference"))  *0.2)

  //if (returnEnemyLevelGap()==="red") damageDealt *= Math.max(0.1, 1 + (returnEnemyLevelGap("difference")+2) *0.2 )


  //if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) damageDealt = 0

  ///dynamic enemies///
  if ( did(stats.currentEnemy+"enemy") && (enemies[stats.currentEnemy].dynamic || did(stats.currentEnemy+"enemy").classList.contains('gilded'))) {
  let dynamicCalc = 1;
  let weaponDamage = playerWeaponDamage * (1+eval(items[rpgPlayer.weaponSlot].align+"DamageBonus")) * (playerStrength) /* * Math.pow(1.005, playerMastery) */ + flatWeaponDamage

  if (type!=="str") {
    dynamicCalc =  1-Math.abs(((damageDealt - weaponDamage) / weaponDamage));
    if (dynamicCalc < 0) dynamicCalc = Math.abs(dynamicCalc);
      
    //console.log(dynamicCalc)
  }

  if (enemies[stats.currentEnemy].dynamic || did(stats.currentEnemy+"enemy").classList.contains('gilded')) damageDealt = 1000 * dynamicCalc * enemyDefenseMultiplier * crit;
  if (icon==="weak" && (enemies[stats.currentEnemy].dynamic || did(stats.currentEnemy+"enemy").classList.contains('gilded')) ) damageDealt = 1000 * dynamicCalc * typeResist * enemyDefenseMultiplier * crit;
  if (icon==="strong" && (enemies[stats.currentEnemy].dynamic || did(stats.currentEnemy+"enemy").classList.contains('gilded')) ) damageDealt = 1000 * dynamicCalc * typestrength * enemyDefenseMultiplier * crit;

  }

  let finalDamage = rng(damageDealt*0.95, damageDealt*1.05)


  if (stat.Lifesteal>0) setTimeout(() => {
    playerHealingDamage( (finalDamage * (1+stat.Lifesteal/100)) - finalDamage)
  }, 200); 


  if (buffs.B113.time>0) finalDamage = 999999

  if (buffs.B83.time>0) finalDamage = 0; //invul buff

  if (buffs.B79.time>0 && type==="sp"){ //mirror buff
    playerDeificDamage(finalDamage/5)
  }


  //if (settings.proudToggle && enemies[stats.currentEnemy].killCount===0 && (bossTime || dungeonTime)) finalDamage *= 0.7

  //if (stats.heatLevel>0) finalDamage /= Math.pow(4, stats.heatLevel)

  if (currentTarget==="Add1") enemyAdd1CurrentHp -= finalDamage;
  else if (currentTarget==="Add2") enemyAdd2CurrentHp -= finalDamage;
  else currentHP -= finalDamage;
  

  enemyUpdate();

  let damageColor;
  if (align==="Nature") damageColor = "#21b42d"
  if (align==="Might") damageColor = "#217eb4"
  if (align==="Elemental") damageColor = "#f35933"
  if (align==="Deific") damageColor = "#ec9900"
  if (align==="Occult") damageColor = "#a936d6"

  damageText(beautify(finalDamage)+critMark, 'damageText', damageColor, icon, "enemyPanel");
  //if (!settings.disableDamageLog) logPrint( enemies[stats.currentEnemy].name + " receives <FONT COLOR='#e8643c'>" + beautify(finalDamage) +" "+ align+" Damage");


  if (finalDamage.toFixed(0) == 69) logs.L1P4.unlocked = true;
  //if (finalDamage.toFixed(0) == 0) logs.L1P4A1.unlocked = true;
  if (finalDamage > 999) logs.P35.unlocked = true;
  if (finalDamage > 9999) logs.P35A.unlocked = true;
  //if (finalDamage > 999999) logs.P35B.unlocked = true;
  //if (finalDamage > 9999999) logs.P35BA.unlocked = true;
  //if (finalDamage > 99999999) logs.P35BB.unlocked = true;
  //if (finalDamage > 99999999999) logs.P35BC.unlocked = true;
 // if (finalDamage > 99999999999999) logs.P35BD.unlocked = true;


  if (battleData) dataDamageDealt += finalDamage


  if (equipCheck("I378") && type==="sp" && items.I378.level>69 && rng(1,15)===1) {buffs.B109.time+=5;  playerBuffs();}
 




}

function enemyNatureDamage(damage, type){

  let damageDealt = (damage) * (1+stat.NatureBonus/100);
  if (type==="str") damageDealt = damage * (1+natureDamageBonus) * (playerStrength)
  if (type==="sp") damageDealt = damage * (1+natureDamageBonus) * (playerSpellpower)
  if (type==="noScale" || type==="zeroScale") damageDealt = damage
  let icon;
  if (stats.currentWeather === 'vortex'){
    //if (enemies[stats.currentEnemy].align === 'elemental') {damageDealt *= typestrength; icon='strong';}
    //if (enemies[stats.currentEnemy].align === 'might') {damageDealt *= typeResist; icon='weak';}
  } else {
    //if (enemies[stats.currentEnemy].align === 'elemental') {damageDealt *= typeResist; icon='weak';}
    if (enemies[stats.currentEnemy].align === 'occult') {damageDealt *= typestrength; icon='strong';}
  }


  enemyDamage(damageDealt, "Nature", icon, type)

  //if(stats.currentEnemy==="E55" && buffs.B97.time>0){ buffs.B97.stacks++} //terragosa
  if(stats.currentEnemy==="E12" && buffs.B87.time>0){ buffs.B87.stacks++} //terragosa

}


function enemyMightDamage(damage, type){
  
  let damageDealt = (damage) * (1+mightDamageBonus);
  if (type==="str") damageDealt = damage * (1+mightDamageBonus) * (playerStrength)
  if (type==="sp") damageDealt = damage * (1+mightDamageBonus) * (playerSpellpower)
  if (type==="noScale" || type==="zeroScale") damageDealt = damage
  let icon;
  if (stats.currentWeather === 'vortex'){
    if (enemies[stats.currentEnemy].align === 'nature') {damageDealt *= typestrength; icon='strong';}
    if (enemies[stats.currentEnemy].align === 'occult') {damageDealt *= typeResist; icon='weak';}
  } else {
    if (enemies[stats.currentEnemy].align === 'nature') {damageDealt *= typeResist; icon='weak';}
    if (enemies[stats.currentEnemy].align === 'occult') {damageDealt *= typestrength; icon='strong';}
  }


  enemyDamage(damageDealt, "Might", icon, type)

}

function enemyElementalDamage(damage, type){
  
  let damageDealt = (damage) * (1+stat.ElementalBonus/100);
  if (type==="str") damageDealt = damage * (1+elementalDamageBonus) * (playerStrength)
  if (type==="sp") damageDealt = damage * (1+elementalDamageBonus) * (playerSpellpower)
  if (type==="noScale" || type==="zeroScale") damageDealt = damage
  let icon;
  if (stats.currentWeather === 'vortex'){
    if (enemies[stats.currentEnemy].align === 'deific') {damageDealt *= typestrength; icon='strong';}
    if (enemies[stats.currentEnemy].align === 'nature') {damageDealt *= typeResist; icon='weak';}
  } else {
    if (enemies[stats.currentEnemy].align === 'deific') {damageDealt *= typeResist; icon='weak';}
  if (enemies[stats.currentEnemy].align === 'nature') {damageDealt *= typestrength; icon='strong';}
  }

  enemyDamage(damageDealt, "Elemental", icon, type)


  if(stats.currentEnemy==="E10"){ castCubomite()}
  //if(stats.currentEnemy==="E55" && buffs.B97.time>0){ buffs.B97.stacks++} //terragosa


  

}

function enemyOccultDamage(damage, type){
  
  let damageDealt = (damage) * (1+stat.OccultBonus/100);
  if (type==="str") damageDealt = damage * (1+occultDamageBonus) * (playerStrength)
  if (type==="sp") damageDealt = damage * (1+occultDamageBonus) * (playerSpellpower)
  if (type==="noScale" || type==="zeroScale") damageDealt = damage
  let icon;
  if (stats.currentWeather === 'vortex'){
    //if (enemies[stats.currentEnemy].align === 'might') {damageDealt *= typestrength; icon='strong';} 
    //if (enemies[stats.currentEnemy].align === 'deific') {damageDealt *= typeResist; icon='weak';}
  } else {
    //if (enemies[stats.currentEnemy].align === 'might') {damageDealt *= typeResist; icon='weak';}
    if (enemies[stats.currentEnemy].align === 'elemental') {damageDealt *= typestrength; icon='strong';} 
  }

  enemyDamage(damageDealt, "Occult", icon, type)

  //if(stats.currentEnemy==="E55" && buffs.B97.time>0){ buffs.B97.stacks++} //terragosa
  if(stats.currentEnemy==="E52"){ buffs.B76.stacks-=3} //principality

}

function enemyDeificDamage(damage, type){

  let damageDealt = (damage) * (1+deificDamageBonus);
  if (type==="str") damageDealt = damage * (1+deificDamageBonus) * (playerStrength)
  if (type==="sp") damageDealt = damage * (1+deificDamageBonus) * (playerSpellpower)
  if (type==="noScale" || type==="zeroScale") damageDealt = damage
  let icon;
  if (stats.currentWeather === 'vortex'){
    if (enemies[stats.currentEnemy].align === 'occult') {damageDealt *= typestrength; icon='strong';}
    if (enemies[stats.currentEnemy].align === 'elemental') {damageDealt *= typeResist; icon='weak';}
  } else {
    if (enemies[stats.currentEnemy].align === 'occult') {damageDealt *= typeResist; icon='weak';}
    if (enemies[stats.currentEnemy].align === 'elemental') {damageDealt *= typestrength; icon='strong';}
   
  }
  enemyDamage(damageDealt, "Deific", icon, type)

  if (buffs.B93.time>0) buffs.B93.time = 0 //yog kulth
  //if(stats.currentEnemy==="E55" && buffs.B97.time>0){ buffs.B97.stacks++} //terragosa


}

function enemyBasicDamage(damage){
  let damageDealt = damage
  let icon;
  currentHP -= damageDealt;
  enemyUpdate();
  damageText(beautify(damageDealt), 'damageText', '#818181', icon, "enemyPanel");
  if (!settings.disableDamageLog) logPrint( enemies[stats.currentEnemy].name + " receives <FONT COLOR='#e8643c'>" + beautify(damageDealt) + " Damage");
}

function enemyHealingDamage(healing){
  playSound("audio/heal.mp3")
  let healingDealt = healing
  currentHP += healingDealt;
  if (currentHP > enemies[stats.currentEnemy].hp()) currentHP = enemies[stats.currentEnemy].hp() //prevents overhealing
  enemyUpdate();
  damageText(beautify(healingDealt), 'damageText', '#61b600', 'heal', "enemyPanel");
  if (!settings.disableDamageLog) logPrint( enemies[stats.currentEnemy].name + " heals for <FONT COLOR='#e8643c'>" + beautify(healingDealt) + " HP");
}


function playerBasicDamage(damage){
  let damageDealt = damage;
  rpgPlayer.hp -= damageDealt;
  playerUpdate();
  damageText(beautify(damageDealt), 'damageText', '#818181', undefined, "playerPanel");
  if (!settings.disableDamageLog) logPrint( stats.turtleName + " receives <FONT COLOR='#e8643c'>" +beautify(damageDealt) + " Damage");
}


let proudIncreasedDamage = 1.3



function finalPlayerDamage(damageDealt){


  //if (returnEnemyLevelGap()==="red") return damageDealt*3

  //if (enemies[stats.currentEnemy].killCount===0 && settings.proudToggle && (bossTime || dungeonTime)) damageDealt *= 1.15

  //if (stats.heatLevel>0) damageDealt *= Math.pow(7, stats.heatLevel)
  


  return damageDealt


}


function playerNatureDamage(damage,type){
  let icon;
  let damageDealt = damage - (damage * stat.NatureResist/100);
  if (natureResist>0.49) {icon='weak';}
  if (natureResist<-0.49) {icon='strong';}
  if (buffs.B89.time>0 && buffs.B89.stacks>0) { damageDealt=0; buffs.B89.stacks--; playerBuffs();}
  if (type!=="dot") damageDealt = finalPlayerDamage(damageDealt)
  if (playerShield<=0) rpgPlayer.hp -= damageDealt;
  else { 
    playerShield-=damageDealt
    icon='shield';
  }
  //playerUpdate();
  damageText(beautify(damageDealt), 'damageText', '#21b42d', icon, "playerPanel");
  if (!settings.disableDamageLog) logPrint( stats.turtleName + " receives <FONT COLOR='#e8643c'>" +beautify(damageDealt) + " Nature Damage");



}

function playerMightDamage(damage,type){
  let icon;

  let damageDealt = damage - (damage * mightResist);
  if (mightResist>0.49) {icon='weak';}
  if (mightResist<-0.49) {icon='strong';}
  if (rpgPlayer.align === 'nature') {damageDealt *= typeResist; icon='weak';}
  if (buffs.B89.time>0 && buffs.B89.stacks>0) { damageDealt=0; buffs.B89.stacks--; playerBuffs();}
  if (type!=="dot") damageDealt = finalPlayerDamage(damageDealt)
  if (playerShield<=0) rpgPlayer.hp -= damageDealt;
  else { 
    playerShield-=damageDealt
    icon='shield';
  }
  playerUpdate();
  damageText(beautify(damageDealt), 'damageText', '#217eb4', icon, "playerPanel");
  if (!settings.disableDamageLog) logPrint( stats.turtleName + " receives <FONT COLOR='#e8643c'>" + beautify(damageDealt) + " Might Damage");
}

function playerElementalDamage(damage,type){
  let icon;

  let damageDealt = damage - (damage * stat.ElementalResist/100);
  if (elementalResist>0.49) {icon='weak';}
  if (elementalResist<-0.49) {icon='strong';}
  if (rpgPlayer.align === 'might') {damageDealt *= typeResist; icon='weak';}
  if (buffs.B89.time>0 && buffs.B89.stacks>0) { damageDealt=0; buffs.B89.stacks--; playerBuffs();}
  if (type!=="dot") damageDealt = finalPlayerDamage(damageDealt)
  if (playerShield<=0) rpgPlayer.hp -= damageDealt;
  else { 
    playerShield-=damageDealt
    icon='shield';
  }
  playerUpdate();
  damageText(beautify(damageDealt), 'damageText', '#f35933', icon, "playerPanel");
  if (!settings.disableDamageLog) logPrint( stats.turtleName + " receives <FONT COLOR='#e8643c'>" + beautify(damageDealt) + " Elemental Damage");
}

function playerOccultDamage(damage,type){
  let icon;

  let damageDealt = damage - (damage * stat.OccultResist/100);
  if (occultResist>0.49) {icon='weak';}
  if (occultResist<-0.49) {icon='strong';}
  if (rpgPlayer.align ===  'occult') {damageDealt *= typeResist; icon='weak';}
  if (buffs.B89.time>0 && buffs.B89.stacks>0) { damageDealt=0; buffs.B89.stacks--; playerBuffs();}
  if (type!=="dot") damageDealt = finalPlayerDamage(damageDealt)
  if (playerShield<=0) rpgPlayer.hp -= damageDealt;
  else { 
    playerShield-=damageDealt
    icon='shield';
  }
  playerUpdate();
  damageText(beautify(damageDealt), 'damageText', '#a936d6', icon, "playerPanel");
  if (!settings.disableDamageLog) logPrint( stats.turtleName + " receives <FONT COLOR='#e8643c'>" + beautify(damageDealt) + " Occult Damage");
}

function playerDeificDamage(damage,type){
  let icon;

  let damageDealt = damage - (damage * deificResist);
  if (deificResist>0.49) {icon='weak';}
  if (deificResist<-0.49) {icon='strong';}
  if (rpgPlayer.align ===  'deific') {damageDealt *= typeResist; icon='weak';}
  if (buffs.B89.time>0 && buffs.B89.stacks>0) { damageDealt=0; buffs.B89.stacks--; playerBuffs();}
  if (type!=="dot") damageDealt = finalPlayerDamage(damageDealt)
  if (playerShield<=0) rpgPlayer.hp -= damageDealt;
  else { 
    playerShield-=damageDealt
    icon='shield';
  }
  playerUpdate();
  damageText(beautify(damageDealt), 'damageText', '#ec9900', icon, "playerPanel");
  if (!settings.disableDamageLog) logPrint( stats.turtleName + " receives <FONT COLOR='#e8643c'>" + beautify(damageDealt) + " Deific Damage");
}

function playerHealingDamage(healing){
  playSound("audio/heal.mp3")
  let healingDealt = healing * (1+stat.HealingBonus/100);
  //console.log(healing + " - " + playerHealingBonus + " - " + healingDealt)
  if (buffs.B82.time>0 || buffs.B80.time>0) healingDealt = 0;
  if (buffs.B80.time>0) playerOccultDamage(healing);
  rpgPlayer.hp += healingDealt;
  if (rpgPlayer.hp > stat.MaxHealth) rpgPlayer.hp = stat.MaxHealth //prevents overhealing
  playerUpdate();
  damageText(beautify(healingDealt)+" 🞧", 'damageText', '#FE3946', 'heal', "playerPanel");
  if (!settings.disableDamageLog) logPrint( stats.turtleName + " heals for <FONT COLOR='#e8643c'>" + beautify(healingDealt) + " HP");

  if (currentSet==="lightbringer") castLightbringerSet(healingDealt)

}

//#endregion
//----------------------==========================-----------------------
//----------------------==========ANIMATIONS======-----------------------
//----------------------==========================-----------------------
//#region Animations


function animParticleProjectile(img, throwAnimation, particleCount, particleType, huerotation) { //projectile with following particles
  if (document.hasFocus()  && !settings.disableAnimations && stats.currentCategory === "rpgContainer"){
  //create projectile
  const projectile = document.createElement("div");
  projectile.id = "projectile";
  projectile.className = "itemThrow";
  did("playerPanel").appendChild(projectile);
  projectile.style.backgroundImage = "url(img/src/projectiles/" + img + ".png)";

  let type = throwAnimation;
  if (type === "throw") { projectile.style.animation = "sexyY 0.8s infinite ease-in-out, sexyX 0.8s infinite ease-in-out, itemThrowRotate 0.8s infinite ease-out";   setTimeout(function () { projectile.remove(); }, 800);}
  if (type === "reverseThrow") { projectile.style.animation = "sexyY 0.8s infinite ease-in-out, sexyX 0.8s infinite ease-in-out, itemThrowRotate 0.8s infinite ease-out"; projectile.style.animationDirection = "reverse";   setTimeout(function () { projectile.remove(); }, 800);}
  if (type === "throwArrow") { projectile.style.animation = "sexyY 0.6s infinite ease-in-out, sexyX 0.6s infinite ease-in-out, itemThrowArrow 0.6s infinite ease-out";   setTimeout(function () { projectile.remove(); }, 600);}
  if (type === "reverseArrow") { projectile.style.animation = "sexyY 0.6s infinite ease-in-out, sexyX 0.6s infinite ease-in-out, itemThrowArrow 0.6s infinite ease-out";  projectile.style.animationDirection = "reverse";   setTimeout(function () { projectile.remove(); }, 600);}
  if (type === "rain") { projectile.style.animation = "itemRain 0.8s 1 ease-in-out"; projectile.style.margin = rng(30,90)+"%" ; setTimeout(function () { projectile.remove(); }, 750);}
  if (type === "slow") { projectile.style.animation = "slowProjectile 2s 1 linear";   setTimeout(function () { projectile.remove(); }, 2000);}
  if (type === "fast") { projectile.style.animation = "slowProjectile 1s 1 linear";   setTimeout(function () { projectile.remove(); }, 1000);}
  if (type === "spinningThrow") { projectile.style.animation = "spinningThrow 3s 1 ease-in-out";   setTimeout(function () { projectile.remove(); }, 2900);}


  if(img==="fallingFeather"){ projectile.style.filter = "hue-rotate("+rng(0,365)+"deg)"; }




//projectile.style.translate = "0 "+rng(-80,300)+"%"
  //particle count
  let delaypart = 70;
  if (throwAnimation === "slow" || throwAnimation === "fast"){
    delaypart = 200
  }
  
  if (stats.currentCategory === "rpgContainer" && !settings.disableParticles) {
  for (let i = 0; i < particleCount; i++) {
    setTimeout(particle, delaypart * i);
  }

  
  }
  //spawn particle
  function particle() {
    const particle = document.createElement("div");
    particle.className = "throwParticle";
    particle.style.filter = "hue-rotate("+huerotation+"deg)"
    did("playerPanel").appendChild(particle);
    particle.style.animation = particleType + " 2s 1 ease";
    setTimeout(function () {
      particle.remove();
    }, 1000);


    //sets the particle position to the projectile with some randomness
    const projectileLeft = projectile.offsetLeft;
    const projectileTop = projectile.offsetTop;
    const randomOffsetX = Math.random() * 50 - 0;
    const randomOffsetY = Math.random() * 50 - 0;
    const particleLeft = projectileLeft + randomOffsetX;
    const particleTop = projectileTop + randomOffsetY;
    particle.style.left = particleLeft + "px";
    particle.style.top = particleTop + "px";

    if (particleType === "particleElectric"){
      particle.style.rotate = rng(0,365)+"deg";
      particle.style.top = particleTop + -60 + "px";
    }

    



  }

}
}

function animState(target, animation){ //animation of either player or enemy
  if (document.hasFocus()  && !settings.disableAnimations && stats.currentCategory === "rpgContainer" && target){
  did(target).style.animation = "";
  void did(target).offsetWidth;
  did(target).style.animation = animation;
  }
}

function animParticleBurst(particleCount, particleType, target, huerotation, isBoss) { //burst of particles on player
  //particle count
  if (!settings.disableParticles && document.hasFocus()) {
  for (let i = 0; i < particleCount; i++) {
    setTimeout(particle, 50 * i);
  }
  }
  //spawn particle
  function particle() {
    const particle = document.createElement("div");
    particle.className = "throwParticle";
    if (isBoss==='priority') {particle.style.zIndex = "100 !important"}


    if (target!=="cursor2" && target!=="cursor") {

      did(target).appendChild(particle);

    //sets the particle position to the projectile with some randomness
    const div2 = did(target);
    const maxWidthPercentage = 100 - (20 / div2.clientWidth) * 100; // 20 es el ancho del div1
    const maxHeightPercentage = 100 - (20 / div2.clientHeight) * 100; // 20 es el alto del div1
    let randomXPercentage = Math.random() * maxWidthPercentage;
    const randomYPercentage = Math.random() * maxHeightPercentage;
    if (isBoss==='boss') {randomXPercentage += 60;}
    particle.style.left = randomXPercentage + "%";
    particle.style.top = randomYPercentage + "%";
    }
     
    if (target==="cursor"){
      document.body.appendChild(particle);
      particle.style.left = (rightClickX) +-20+ rng(-40,40) + 'px';
      particle.style.top = (rightClickY ) +-20+ rng(-40,40) +  'px';
      
    }

    if (target==="cursor2"){
      document.body.appendChild(particle);
      particle.style.left = (leftClickX)  +-20+ rng(-20,20) + 'px';
      particle.style.top = (leftClickY )  +-20+ rng(-20,20) +  'px';
    }



    particle.style.filter = "hue-rotate("+huerotation+"deg)"
    particle.style.animation = particleType + " 2s 1 ease";
    setTimeout(function () {
      particle.remove();
    }, 1000);



  }
}

function animImageSplash(image, target, animation, huerotation, seconds, isBoss){ //image on top of a target
  if (document.hasFocus()  && !settings.disableAnimations && stats.currentCategory === "rpgContainer"){
  const projectile = document.createElement("img");
  projectile.id = projectile + "projectile";
  projectile.className = "imageSplash";

  if (isBoss==='boss') projectile.style.left += '40%'

  did(target).appendChild(projectile);
  projectile.src = "img/src/projectiles/" + image + ".png";
  
    
  if (animation === "impact") { projectile.style.animation = "gelatineImpact 1.1s 1"; setTimeout(function () { projectile.remove(); }, 1000); }
  if (animation === "downwards") { projectile.style.animation = "gelatineDownwards 1.1s 1"; setTimeout(function () { projectile.remove(); }, 1000); }
  if (animation === "explosion") { projectile.style.animation = "gelatineImpact 400ms 1"; setTimeout(function () { projectile.remove(); }, 300); }
  if (animation === "hold") { projectile.style.animation = "gelatineHold 6s infinite"; setTimeout(function () { projectile.remove(); }, seconds*1000); }
  if (animation === "spin") { projectile.style.animation = "skillSpin 2.5s ease-out"; setTimeout(function () { projectile.remove(); }, 2400); }
  if (animation === "sway") { projectile.style.animation = "skillSway 1.9s 1"; setTimeout(function () { projectile.remove(); }, 1800); }
  if (animation === "float") { projectile.style.animation = "skillFloat 1.5s 1"; setTimeout(function () { projectile.remove(); }, 1400); }
  if (animation === "holdFloat") { projectile.style.animation = "gelatineHoldFloat 6s infinite"; setTimeout(function () { projectile.remove(); }, seconds*1000);  if(isBoss!==undefined) projectile.id = isBoss     }
  if (animation === "wave") { projectile.style.animation = "skillWave 0.7s 1"; setTimeout(function () { projectile.remove(); }, 600); }
  if (animation === "reverseWave") { projectile.style.animation = "skillWave 0.7s 1 reverse"; setTimeout(function () { projectile.remove(); }, 600); }
  if (animation === "rotate") { projectile.style.animation = "gelatineRotate 1.6s ease-out 1"; setTimeout(function () { projectile.remove(); }, 1500); }
  if (animation === "holdRotate") { projectile.style.animation = "holdRotate 6s infinite linear"; setTimeout(function () { projectile.remove(); }, seconds*1000); }

  projectile.style.filter += " hue-rotate("+huerotation+"deg)"

  }

}

function damageText(number, type, color, icon, target) {

/*
  if (stats.currentCategory === "rpgContainer" && !settings.disableDamageNumbers && document.hasFocus()) {

  const damageT = document.createElement("div");
  damageT.className = type;
  did(target).appendChild(damageT);
  let iconvar = icon
  if (iconvar !== undefined) damageT.innerHTML = number+'</div><img class="damageText'+icon+'" src=img/src/icons/'+icon+'.png>';
  else damageT.innerHTML = number;
  damageT.style.color = color
  setTimeout(function () { damageT.remove();}, 1400);
  //sets the particle position to the projectile with some randomness
  const div2 = did(target);
  const maxWidthPercentage = 100 - 20 / div2.clientWidth;
  const maxHeightPercentage = 100 - 20 / div2.clientHeight;
  const randomXPercentage = Math.random() * maxWidthPercentage;
  const randomYPercentage = Math.random() * maxHeightPercentage;
  damageT.style.left = randomXPercentage + "%";
  damageT.style.top = randomYPercentage + "%";
  

  }

*/

  let posX = enemyRect.left - containerRect.left + enemyRect.width / 2;
  let posY = enemyRect.top - containerRect.top + enemyRect.height / 2;

  if (target==='playerPanel') {

    posX = playerRect.left - containerRect.left + playerRect.width / 2
    posY = playerRect.top - containerRect.top + playerRect.height / 2

  } 

  const bigint = parseInt(color.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  let mark = ""
  if (icon==="strong") mark = " ▲"


 if (!settings.disableDamageNumbers)  particleTrackers.push(new ParticleDamageText(posX, posY, {text: number+mark, finalColor : { r: r, g: g, b: b } }));


}

function statusParticle(particleType,huerotation, target) { //spawns one particle, used for status Particle Check below
  if (document.hasFocus() && stats.currentCategory === "rpgContainer"){
  //spawn particle
  function particle() {
    const particle = document.createElement("div");
    particle.className = "throwParticle";
    particle.style.filter = "hue-rotate("+huerotation+"deg)"
    let targetLet = target;
    if (targetLet === "player") {
      did("playerPanel").appendChild(particle);
    } else did("enemyPanel").appendChild(particle);
    particle.style.animation = particleType + " 2s 1 ease";
    setTimeout(function () {
      particle.remove();
    }, 1000);
    //sets the particle position to the projectile with some randomness
    let div2 = did("enemyAnimation");
    if (targetLet === "player") {
      div2 = did("rpgPlayerImg");
    }

    
    const maxWidthPercentage = 100 - (20 / div2.clientWidth) * 100; // 20 es el ancho del div1
    const maxHeightPercentage = 100 - (20 / div2.clientHeight) * 100; // 20 es el alto del div1
    const randomXPercentage = Math.random() * maxWidthPercentage;
    const randomYPercentage = Math.random() * maxHeightPercentage;
    particle.style.left = randomXPercentage + "%";
    particle.style.top = randomYPercentage + "%";

    if (particleType === "particleElectric"){
      particle.style.rotate = rng(0,365)+"deg";
      //particle.style.top = particleTop + -60 + "px";
    }

    if (targetLet !== "player" && enemies[stats.currentEnemy].bigEnemy) {
      particle.style.left = randomXPercentage + 70 + "%";
    }

  }
  particle();
}
}

setInterval(function () { if (stats.currentCategory === "rpgContainer") { statusParticleCheck(); } }, 800);
function statusParticleCheck() { //checks if buffs is active, and asigns status Particle
  //if (buffs.B1.active===1) {statusParticle('particleHealth');}
  if (!settings.disableParticles){
  if (stats.currentEnemy==="E18" && enemyPhase===2){ statusParticle("particleGlow2",130); setTimeout(() => {statusParticle("particleGlow2",130)}, 400); };
  if (buffs.B65.time>0){ statusParticle("particleElectric",130); setTimeout(() => {statusParticle("particleElectric",130)}, 300); setTimeout(() => {statusParticle("particleElectric",130)}, 500);};
  if (did(stats.currentEnemy+"enemy") && did(stats.currentEnemy+"enemy").classList.contains('gilded')) {statusParticle("particleSpark",70); setTimeout(() => {statusParticle("particleSpark",70);}, 300);  setTimeout(() => {statusParticle("particleSpark",70);}, 600); }



  //debuffs
  if (buffs.B3.time>0) statusParticle("particlePoison",0, "player"); 
  if (buffs.B57.time>0) statusParticle("particlePoison",200, "player"); 
  if (buffs.B59.time>0) statusParticle("particleFire",0, "player");
  if (buffs.B73.time>0) statusParticle("particlePoison",150, "player");
  if (buffs.B74.time>0) statusParticle("particleElectric",100, "player");
  if (buffs.B77.time>0) statusParticle("particleElectric",0, "player");
  if (buffs.B76.time>0) { statusParticle("particleFire",330); setTimeout(() => {statusParticle("particleFire",330)}, 400); };
  if (buffs.B83.time>0) { statusParticle("particleGlow2",270); setTimeout(() => {statusParticle("particleGlow2",270)}, 400); };
  if (buffs.B80.time>0) statusParticle("particleLight",100, "player");
  if (buffs.B81.time>0) statusParticle("particleGear",0, "player");
  if (buffs.B82.time>0) statusParticle("particleWaterGarden",120, "player");
  if (buffs.B78.time>0) statusParticle("particleWaterGarden",30, "player");

  //enemy
  if (buffs.B110.time>0) { statusParticle("particleFire",0)};
  if (buffs.B54.time>0) statusParticle("particlePoison",0); 
  if (buffs.B109.time>0) statusParticle("particlePoison",150); 





}
}
//#endregion
//----------------------==========================-----------------------
//----------------------===========ITEMS==========-----------------------
//----------------------==========================-----------------------
//#region Items

stats.gildedKilled = 0;

function dropItem(ID) { //dedicated drop rolls
//this code manages the extra percentage of drop chance and adds it to how many drop you can get
  let itemdrop = 0 
  /*
  const integerPart = Math.floor(multiplicativeDropChance);
  let extraValue = integerPart + (Math.random() < (multiplicativeDropChance - integerPart) ? 1 : 0);





  itemdrop += extraValue;
  
 
  if  ((enemies[stats.currentEnemy].difficulty==="ore" || enemies[stats.currentEnemy].difficulty==="herb")){
    itemdrop += playerGatheringLevel - enemies[stats.currentEnemy].gatheringLevel
  } 

  

  if (talent.TA1D1.active) {//magikill

    let magikill = enemies[stats.currentEnemy].hp === 0 ? Infinity : Math.max(0, Math.floor(Math.log10(expectedPlayerDamage / enemies[stats.currentEnemy].hp)));
    itemdrop += magikill
    //console.log("magikill gave you"+magikill+items[ID].name) magikill tester

  }

  */

  itemdrop = 1;

  
  //if (talent.TI3C2.active && enemies[stats.currentEnemy].medal==="platinum" && rng(1,3)===1) itemdrop += 1; //platinum awards








  if (did(stats.currentEnemy+"enemy") && did(stats.currentEnemy+"enemy").classList.contains('gilded')) {
    itemdrop = 300;
    if (talent.TG1E1.active) itemdrop = 450;
    stats.gildedKilled++;
    if (enemies[stats.currentEnemy].align==="nature") rareItemDrop("I434",1)
    if (enemies[stats.currentEnemy].align==="might") rareItemDrop("I435",1)
    if (enemies[stats.currentEnemy].align==="elemental") rareItemDrop("I436",1)
    if (enemies[stats.currentEnemy].align==="occult") rareItemDrop("I437",1)
    if (enemies[stats.currentEnemy].align==="deific") rareItemDrop("I438",1)
  
  }



  if (talent.TG1E1.active) if (did(stats.currentEnemy+"enemy") && did(stats.currentEnemy+"enemy").classList.contains('gilded')) {itemdrop = 400;}
  
  
  
  
  
    







  items[ID].count += itemdrop;
  items[ID].timesGot += itemdrop;
  //addItem()
}

function rollTable(table, rolls, offline) { //droptable rolls


  for (let i = 0; i < rolls; i++) {
    for (let dt in table) {

      let dieRoll = table[dt].P

      if (offline!==undefined) dieRoll = Math.max(dieRoll - offline,1)

      if (rng(1,dieRoll)===1) {
        //because the die can land on 0, substract 1 to make for it
        let rollcount = eval(table[dt].A)
        items[dt].count += rollcount;
        items[dt].timesGot += rollcount;
        addItem();

       if (did(dt + "ItemOverlay")){
        did(dt + "ItemOverlay").style.animation = "";
        void did(dt + "ItemOverlay").offsetWidth;
        did(dt + "ItemOverlay").style.animation = "newItemGot 50s 1, useSkill 0.5s 1";
      }

      


        

        if (!settings.disableDropsLog) logPrint("<FONT COLOR='#8fba77'>You obtain <FONT COLOR="+returnQualityColor(items[dt].quality)+">" + itemIcon(dt) + items[dt].name + " x"+rollcount+"!");
      }


      if ("R" in table[dt]){ //collectibles

        
        if (offline!==undefined){

          if (items[dt].rarity===1) rareItemDrop(dt, Math.max(4000/Math.ceil(offline,1)));
          if (items[dt].rarity===2) rareItemDrop(dt, Math.max(8000/Math.ceil(offline,1)));
          if (items[dt].rarity===3) rareItemDrop(dt, Math.max(16000/Math.ceil(offline,1)));
          if (items[dt].rarity===4) rareItemDrop(dt, Math.max(32000/Math.ceil(offline,1)));
          if (items[dt].rarity===5) rareItemDrop(dt, Math.max(64000/Math.ceil(offline,1)));

          console.log(Math.max(4000/Math.ceil(offline,1)))


        } else {

          if (items[dt].rarity===1) if (rng(1,4000)===1) items[dt].count += 1;
          if (items[dt].rarity===2) if (rng(1,8000)===1) items[dt].count += 1;
          if (items[dt].rarity===3) if (rng(1,16000)===1) items[dt].count += 1;
          if (items[dt].rarity===4) if (rng(1,28000)===1) items[dt].count += 1;
          if (items[dt].rarity===5) if (rng(1,32000)===1) items[dt].count += 1;

        }


        
      }



    }
  }

  if (rng(1,777777)===1) {
    items.I102.count++
    addItem()
  }

  
}



function pityDrop(id){

  const regex = /rareItemDrop\(['"]([^'"]+)['"],\s*(rareDrop|uncommonDrop|uncommonDungeon|rareDungeon|epicDrop|epicDungeon)(?:\s*,\s*[^)]+)*\s*\)/g;
  let match;
const rareDropIds = [];
const uncommonDropIds = [];
const epicDropIds = [];

while ((match = regex.exec(enemies[stats.currentEnemy].drop)) !== null) {
    const id = match[1];
    const dropType = match[2];
    if ((dropType === 'rareDrop' || dropType === 'rareDungeon') && items[id].count===0) {
        rareDropIds.push(id);
    }
    
    if ((dropType === 'uncommonDrop' || dropType === 'uncommonDungeon') && items[id].count===0) {
        uncommonDropIds.push(id);
    }

    if ((dropType === 'epicDrop' || dropType === 'epicDungeon') && items[id].count===0) {
      epicDropIds.push(id);
  }

}


  /*
  console.log('Rare Drop IDs:', rareDropIds);
  console.log('Uncommon Drop IDs:', uncommonDropIds);
  console.log('Epic Drop IDs:', epicDropIds);
  */


  itemGot = "none";

  if (uncommonDropIds.length>0 && items[id].quality === "Uncommon") itemGot = uncommonDropIds[rng(0,(uncommonDropIds.length-1))]
  if (rareDropIds.length>0 && items[id].quality === "Rare") itemGot = rareDropIds[rng(0,(rareDropIds.length-1))]
  if (epicDropIds.length>0 && items[id].quality === "Epic") itemGot = epicDropIds[rng(0,(epicDropIds.length-1))]


  if (itemGot !== "none") {



    rareItemDrop(itemGot,1)

    if (did(itemGot + "ItemOverlay")){
      did(itemGot + "ItemOverlay").style.animation = "";
      void did(itemGot + "ItemOverlay").offsetWidth;
      did(itemGot + "ItemOverlay").style.animation = "newItemGot 50s 1, useSkill 0.5s 1";
    }

    console.log('PITY TRIGGERED! YOU WOULD HAD GOTTEN '+items[id].name+' BUT GOT INSTEAD '+items[itemGot].name)


  } 



}



function rareItemDrop(dt, chance, amount, mod){


  let toAdd = 1
  if (amount!==undefined) toAdd = amount
  

if (rng(1,chance)===1){


  

 

  if (items[dt].max==1 && items[dt].count>0 && (chance===uncommonDrop || chance===uncommonDungeon || chance===rareDrop || chance===uncommonDungeon || chance===epicDrop || chance===epicDungeon)){
    pityDrop(dt)


  } else {
  items[dt].count += toAdd;
  items[dt].timesGot += toAdd;
  if (!settings.disableDropsLog) logPrint("<FONT COLOR='#8fba77'>You obtain <FONT COLOR="+returnQualityColor(items[dt].quality)+">" + itemIcon(dt) + items[dt].name + " x " + toAdd +"!");

  }

  addItem();



  if (did(dt + "ItemOverlay")){
    did(dt + "ItemOverlay").style.animation = "";
    void did(dt + "ItemOverlay").offsetWidth;
    did(dt + "ItemOverlay").style.animation = "newItemGot 50s 1, useSkill 0.5s 1";
  }

 





}



if (mod==="drop" && !items[dt].gotOnce){

  let fastBonus = 1

  if (settings.nofarmToggle) fastBonus = 0.5


  if ( (chance === uncommonDrop && enemies[stats.currentEnemy].killCount>(15000*fastBonus)) || 
  (chance === rareDrop && enemies[stats.currentEnemy].killCount>(50000*fastBonus)) || 
  (chance === epicDrop && enemies[stats.currentEnemy].killCount>(150000*fastBonus)) || 
  (chance === mythicDrop && enemies[stats.currentEnemy].killCount>(500000*fastBonus)) ||

  (chance === uncommonDungeon && enemies[stats.currentEnemy].killCount>(90*fastBonus)) ||
  (chance === rareDungeon && enemies[stats.currentEnemy].killCount>(150*fastBonus)) ||
  (chance === epicDungeon && enemies[stats.currentEnemy].killCount>(200*fastBonus)) ||
  (chance === mythicDungeon && enemies[stats.currentEnemy].killCount>(200*fastBonus)) ) {


    items[dt].count += toAdd;
    items[dt].timesGot += toAdd;
    addItem()
    if (did(dt + "ItemOverlay")){
      did(dt + "ItemOverlay").style.animation = "";
      void did(dt + "ItemOverlay").offsetWidth;
      did(dt + "ItemOverlay").style.animation = "newItemGot 50s 1, useSkill 0.5s 1";
    }



  }


}








}


setInterval(itemCooldownTick, 1000);
/*function itemCooldownTick(ID, time) { //removes one second from the cd of every single item
  for (let i in items) {
    if ("cd" in items[i]){
    if (items[i].cd > 0) { //if its on CD
      items[i].cd--;


      if (did(items[i].id + "item")){

        did(items[i].id + "item").style.filter = "brightness(0.7)";

      let resultado = items[i].cd < 60 ? items[i].cd : Math.floor(items[i].cd / 60) + "m";
      if (items[i].cd < 1) resultado = ""

      did(items[i].id + "itemCooldownText").innerHTML = resultado;

    }
    }
    if (items[i].cd === 0 && did(items[i].id + "item")) { //if its not anymore
      did(items[i].id + "item").style.filter = "brightness(1)";
    }

    if (did(i+'itemCooldown')){

    let percentage = ((items[i].cd / items[i].visualCd) * 100);
    did(i+'itemCooldown').style.height = percentage+"%";
    
    
  }
  }
  }
}*/


function itemCooldownTick(){





  itemInventory.forEach((item, index) => {





    if (item.constructor.cd>0) item.constructor.cd--

    if (item.constructor.cd>0 && (item.sort===currentSort || item.quickAccess)){

      const itemDiv = item.div
      const itemCDText = itemDiv.querySelector('.itemCooldownTimerText');
      const itemCDBar = itemDiv.querySelector('.itemCooldownTimer');

      if (itemCDText) {
      const resultado = item.constructor.cd < 60 ? item.constructor.cd : Math.floor(item.constructor.cd / 60) + "m";
      itemCDText.innerHTML = resultado; 
      }

      if (itemCDBar) {
      const percentage = (((item.constructor.cd-1) / 10) * 100);
      itemCDBar.style.height = percentage+"%";

      }

      if (item.constructor.cd===1 && (item.sort===currentSort || item.quickAccess)) setTimeout(() => {
        updateInventory()
      }, 1100); 

    }







  })






}


  
  



stats.recipesLearnt = 0;
let itemReuseInterval;

setInterval(() => {
  addItem();
}, 2000);

function addItem() { //updates inventory items
  for (let i in items) {
    if (items[i].count >= 1) {
      if (!did(items[i].id + "item") &&
      !items[i].vaulted && (resultIds.includes(i) || emptySearchBar) && currentSort==="all" || !did(items[i].id + "item")
      && (((items[i].sort===currentSort && !items[i].vaulted) & (resultIds.includes(i) || emptySearchBar) || (rpgPlayer.headSlot == i || rpgPlayer.chestSlot == i || rpgPlayer.handsSlot == i || rpgPlayer.feetSlot == i || rpgPlayer.legsSlot == i || rpgPlayer.weaponSlot == i || rpgPlayer.ringSlot == i || rpgPlayer.ceSlot == i || rpgPlayer.trinketSlot == i )) || (currentSort==="vault" && items[i].vaulted)
      && currentSort==="vault" && (resultIds.includes(i) || emptySearchBar) || (currentSort==='favorites'
      && items[i].favorited && (resultIds.includes(i) || emptySearchBar)) || (currentSort==='vault'
      && items[i].vaulted && (resultIds.includes(i) || emptySearchBar)))) { 
        const itemdiv = document.createElement("div");
        itemdiv.id = items[i].id + "item";


        itemCDScreen = ""
        if ("cd" in items[i]) itemCDScreen = '<div class="itemCooldownTimerText" id="'+i+'itemCooldownText"></div> <div class="itemCooldownTimer" id="'+i+'itemCooldown"></div>'

        itemCounter  = ""
        if (items[i].max != 1) itemCounter  = '<div class="itemCount" id="' + items[i].id + "itemCount" + '">'

        itemdiv.innerHTML = itemCDScreen + '<span id="'+i+'ItemOverlay" class="itemOverlay"></span> <img id="'+i+'ItemImage" src = "img/src/items/' + items[i].img + '.jpg">' + itemCounter  + items[i].count + '</div><span id="'+i+'ItemLock" style="display:none" class="itemLock">🔒</span><span id="'+i+'ItemFavorite" style="display:none" class="itemFavorite">⭐</span><span id="'+i+'ItemCondition" style="display:none" class="itemCondition">💎</span>';
          
        itemdiv.className = "itemSlot";

        did("inventory").appendChild(itemdiv);

        itemdiv.style.outline = returnQualityColor(items[i].quality) + " solid 0.15rem";


        if (items[i].quality==="Mythic" && logs.P71.unlocked===false) logs.P71.unlocked= true


         if ("collectible" in items[i]){
          if (items[i].statUp!=="got") {
            did(items[i].id + "ItemCondition").style.display = "inline";
          } else items[i].count=0;
         }


        if (!items[i].gotOnce) items[i].gotOnce = true;

        
      }
    }

    if (did(items[i].id + "ItemLock") && items[i].locked){ did(items[i].id + "ItemLock").style.display = "inline"; } else if (did(items[i].id + "ItemLock") && !items[i].locked) { did(items[i].id + "ItemLock").style.display = "none";}

    if (did(items[i].id + "ItemFavorite") && items[i].favorited){ did(items[i].id + "ItemFavorite").style.display = "inline"; } else if (did(items[i].id + "ItemFavorite") && !items[i].favorited) { did(items[i].id + "ItemFavorite").style.display = "none";}

    if (did(items[i].id + "item")) {  //if it exists limit and update ammount
      if (items[i].max < items[i].count) items[i].count = items[i].max;

      if (items[i].upgradeable && did(items[i].id + "itemCount")) did(items[i].id + "itemCount").innerHTML = returnQualityColor(items[i].count.toString())

      if ((items[i].max !== 1 && !items[i].upgradeable) || i === "I281") did(items[i].id + "itemCount").innerHTML = beautify(items[i].count);

      if ((items[i].max !== 1 && !items[i].upgradeable) && items[i].count===items[i].max) did(items[i].id + "itemCount").innerHTML = '<FONT COLOR="yellow">'+beautify(items[i].count);


    }

    if (items[i].count < 0) items[i].count = 0; //failsafe for negative items

    if (did(items[i].id + "item") && items[i].count <= 0) { //remove if count 0 and exists
      did(items[i].id + "item").remove();
    }

    
   

    


  }
}













function voidAnimation(id, animation) {

  if (settings.quality === "Very Low") return
  if (!document.hasFocus()) return

  
  const element = did(id);
element.style.animation = "none";
requestAnimationFrame(() => {
    element.style.animation = animation;
});


}














did(`lumaArea`).addEventListener('click', function() {
  

  if (equippedLuma != undefined) setTimeout(() => { equippedLuma.luma() }, 10);

    
      
    

});

let mousePositionX = 0
let mousePositionY = 0


document.addEventListener('mousemove', function(event) {
  

  mousePositionX = event.x
  mousePositionY = event.y

    
      
    

});

document.addEventListener('mousemove', function(event) {
  

  if (equippedLuma != undefined && equippedLuma.cd >= 0){
    did("lumaCharge").style.top = mousePositionY + -15+ 'px';
    did("lumaCharge").style.left = mousePositionX + 30+ 'px';
  }


    
      
    

});






































document.addEventListener('mouseover', function(event) {

  if (event.target.id && event.target.id.endsWith('ItemImage')) {
  let itemID = event.target.id.replace('ItemImage', '');

  did(itemID + "ItemOverlay").style.animation = "none";

  did("tooltip").style.display = "flex";
  did("tooltipArrow").style.right = "23%";

  let itemLevel = ""

  if (items[itemID].upgradeable && itemID !== "I281") itemLevel = returnQualityColor(items[itemID].count.toString())


  did("tooltipName").innerHTML = items[itemID].name;
  did("tooltipPrice").innerHTML = "";
  did("tooltipPrice").innerHTML = "("+items[itemID].count+")";
  if (items[itemID].max !== playerMaxStack) did("tooltipPrice").innerHTML = "(Max " + items[itemID].max + ")";
  if (items[itemID].max === 1 || items[itemID].upgradeable) did("tooltipPrice").innerHTML = "(Unique)";

  if ("align" in items[itemID])  did("tooltipRarity").innerHTML = items[itemID].quality + '<br><img class="alignTooltipIcon" src="img/src/icons/'+items[itemID].align+'.png"></img>'; 
  else did("tooltipRarity").innerHTML = items[itemID].quality;

  did("tooltipRarity").style.color = returnQualityColor(items[itemID].quality);
  did("tooltipName").style.color = returnQualityColor(items[itemID].quality);
  
  var separadorDesc = '<br><div class="separador"></div>'

  var sellText = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">' + beautify(eval(items[itemID].sell)*multiplicativeSellValue) + " (" + beautify((eval(items[itemID].sell)*multiplicativeSellValue) * items[itemID].count) + ")"+coinIcon+"Shells<br></div>";
  if (items[itemID].count === 1 && items[itemID].sell>0) sellText = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">' + beautify(eval(items[itemID].sell)*multiplicativeSellValue) + ""+coinIcon+"Shells<br></div>";
  if (items[itemID].upgradeable) sellText = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">' + beautify((eval(items[itemID].sell)*multiplicativeSellValue)*items[itemID].count) + ""+coinIcon+"Shells<br></div>";
  if (eval(items[itemID].sell) === 0) sellText = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ed4e4e"> Non Sellable<br></div>'


  var stamp1 = "";
  var stamp2 = "";
  var stamp3 = "";

  if ("stamp1" in items[itemID]) stamp1 = '<br><br><FONT COLOR=#42a7f5>[Stamps]<FONT COLOR="white"><br>'+ stampIcon + '<span class="logStat"> '+returnStampName(items[itemID].stamp1)+'</span>'
  if ("stamp2" in items[itemID]) stamp2 = '<br>' + stampIcon + '<span class="logStat"> '+returnStampName(items[itemID].stamp2)+'</span>'
  if ("stamp3" in items[itemID]) stamp3 = '<br>' + stampIcon + '<span class="logStat"> '+returnStampName(items[itemID].stamp3)+'</span>'


  var tierArmorBonus = ""
  var tierDesc1 = ""
  var tierDesc2 = ""
  var tierDesc3 = ""
  var tierDesc4 = ""
  var tierDesc5 = ""
  var tierDesc6 = ""
  var tierDescTotal = ""

  if ("tierArmorBonus" in items[itemID]) {

    let totalPieces = 0;
    let equipedPieces = 0;
    
  if ("tierDesc1" in  items[itemID] && rpgPlayer.headSlot === items[itemID].tierDesc1) { tierDesc1 = '<FONT COLOR="#1EFF0C">❖ '+ items[items[itemID].tierDesc1].name+"<br>"; equipedPieces++; totalPieces++  } else if ("tierDesc1" in  items[itemID]) { tierDesc1 = '<FONT COLOR="gray">❖ '+ items[items[itemID].tierDesc1].name+"<br>"; totalPieces++ }
  if ("tierDesc2" in  items[itemID] && rpgPlayer.chestSlot === items[itemID].tierDesc2) { tierDesc2 = '<FONT COLOR="#1EFF0C">❖ '+ items[items[itemID].tierDesc2].name+"<br>"; equipedPieces++; totalPieces++ } else if ("tierDesc2" in  items[itemID]) { tierDesc2 = '<FONT COLOR="gray">❖ '+ items[items[itemID].tierDesc2].name+"<br>"; totalPieces++ }
  if ("tierDesc3" in  items[itemID] && rpgPlayer.handsSlot === items[itemID].tierDesc3) { tierDesc3 = '<FONT COLOR="#1EFF0C">❖ '+ items[items[itemID].tierDesc3].name+"<br>"; equipedPieces++; totalPieces++ } else if ("tierDesc3" in  items[itemID]) { tierDesc3 = '<FONT COLOR="gray">❖ '+ items[items[itemID].tierDesc3].name+"<br>"; totalPieces++ }
  if ("tierDesc4" in  items[itemID] && rpgPlayer.legsSlot === items[itemID].tierDesc4) { tierDesc4 = '<FONT COLOR="#1EFF0C">❖ '+ items[items[itemID].tierDesc4].name+"<br>"; equipedPieces++; totalPieces++ } else if ("tierDesc4" in  items[itemID]) { tierDesc4 = '<FONT COLOR="gray">❖ '+ items[items[itemID].tierDesc4].name+"<br>"; totalPieces++ }
  if ("tierDesc5" in  items[itemID] && rpgPlayer.feetSlot === items[itemID].tierDesc5) { tierDesc5 = '<FONT COLOR="#1EFF0C">❖ '+ items[items[itemID].tierDesc5].name+"<br>"; equipedPieces++; totalPieces++ } else if ("tierDesc5" in  items[itemID]) { tierDesc5 = '<FONT COLOR="gray">❖ '+ items[items[itemID].tierDesc5].name+"<br>"; totalPieces++ } 
  if ("tierDesc6" in  items[itemID] && rpgPlayer.ringSlot === items[itemID].tierDesc6) { tierDesc6 = '<FONT COLOR="#1EFF0C">❖ '+ items[items[itemID].tierDesc6].name+"<br>"; equipedPieces++; totalPieces++ } else if ("tierDesc6" in  items[itemID]) { tierDesc6 = '<FONT COLOR="gray">❖ '+ items[items[itemID].tierDesc6].name+"<br>"; totalPieces++ } 

  if (equipedPieces === totalPieces){
    tierArmorBonus = '<FONT COLOR="#b983f7">'+items[itemID].tierArmorBonus
  } else tierArmorBonus = '<FONT COLOR="gray">'+items[itemID].tierArmorBonus

  let tiername = items[itemID].armorTier

  var tierDescTotal = '<FONT COLOR="#b983f7"><br>✦── '+tiername+" ──✦<br>"+tierDesc1+tierDesc2+tierDesc3+tierDesc4+tierDesc5+tierDesc6+tierArmorBonus

  }

  var collectibleDesc = ""

  if ("collectible" in items[itemID]) { 
    collectibleDesc = '<br><FONT COLOR="orange">❖ Right Click to add to your collection'
  }

  var seriesDesc = ""

  if ("series" in items[itemID]) { 
    seriesDesc = returnQualityColor(items[itemID].series)
  }

  var itemSkills = ""

  if ("skills" in items[itemID]) { 
    itemSkills = "<br>"+eval(items[itemID].skills)
  }

  let itemDesc = items[itemID].description
  if (items[itemID].dynamic) itemDesc = eval(items[itemID].description)


  let moreInfo = ""
  if ("altskills" in items[itemID] || "altdescription" in items[itemID]) {
     moreInfo = '<br><br><FONT COLOR="gray">Press'+colorTag("⇧ Shift","gray")+'to see more details'
  }



    document.addEventListener('keydown', function(e) {
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {


          
        if ("altskills" in items[itemID]) itemSkills = "<br>"+eval(items[itemID].altskills)
        if ("altdescription" in items[itemID]) itemSkills = "<br>"+eval(items[itemID].altdescription)
        did("tooltipDescription").innerHTML = itemDesc + collectibleDesc + itemSkills + tierDescTotal + stamp1 + stamp2 + stamp3 + separadorDesc + seriesDesc + sellText


      }
  });
  
  document.addEventListener('keyup', function(e) {
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {

      itemSkills = "<br>"+eval(items[itemID].skills)
      did("tooltipDescription").innerHTML = itemDesc + collectibleDesc + itemSkills + moreInfo + tierDescTotal + stamp1 + stamp2 + stamp3 + separadorDesc + seriesDesc + sellText



    }
});


  


  did("tooltipDescription").innerHTML = itemDesc + collectibleDesc + itemSkills + moreInfo + tierDescTotal + stamp1 + stamp2 + stamp3 + separadorDesc + seriesDesc + sellText

  did("tooltipFlavor").innerHTML = items[itemID].flavor;
  did("tooltipImage").src = "img/src/items/" + items[itemID].img + ".jpg";
  //position related code

  var movingDiv = did("tooltip");
  var referenceDiv = did(items[itemID].id + "item");
  var referenceRect = referenceDiv.getBoundingClientRect();

  if (did("gearFlex").contains(did(items[itemID].id + "item"))) {
    // if the item is equipped
    var referenceLeft = referenceRect.left - movingDiv.offsetWidth - 15; // Cambiar aquí para posicionar la parte superior derecha del tooltip en la parte superior izquierda del item
    var referenceTop = referenceRect.top - 5;
    var newLeft = referenceLeft;
    var newTop = referenceTop;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  } else {
    var newLeft = referenceRect.left;
var newTop = referenceRect.top - movingDiv.offsetHeight;

// Establecer las coordenadas del tooltip
movingDiv.style.left = newLeft - 8+ "px";
movingDiv.style.top = newTop - 13+ "px";
  }

  if ("use" in items[itemID] && items[itemID].use.includes("stampWeapon") && rpgPlayer.weaponSlot !== "none") {
    setTimeout(() => {

      did("stampMenuRarity").innerHTML ="Weapon Stamping"

      const hoveredElement = event.target;
      const elementRect = hoveredElement.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const seventyPercentWidth = windowWidth * 0.5;
    
      if (elementRect.left < seventyPercentWidth) {


        movingDiv = did("stampMenu");
  referenceDiv = did("tooltip");
  referenceRect = referenceDiv.getBoundingClientRect();
  var newLeft = referenceRect.right + 10;
  var newTop = referenceRect.top - 0;
  
  movingDiv.style.left = newLeft + "px";
  movingDiv.style.top = newTop + "px";
  did("stampMenu").style.display="flex" 


      } else {


        movingDiv = did("stampMenu");
referenceDiv = did("tooltip");
referenceRect = referenceDiv.getBoundingClientRect();

var stampMenuStyle = window.getComputedStyle(movingDiv);
var stampMenuWidth = parseFloat(stampMenuStyle.width);

var newLeft = referenceRect.left - stampMenuWidth - 10; // Restar el ancho de stampMenu y 10 píxeles para ajuste
var newTop = referenceRect.top;

movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop + "px";

did("stampMenu").style.display = "flex";


      }


  




  }, 0);

  did("stampMenuImg").src = "img/src/items/"+items[rpgPlayer.weaponSlot].img+".jpg" 
  did("stampMenuName").innerHTML = items[rpgPlayer.weaponSlot].name
  updateStampMenu();

  }

 
  if ("use" in items[itemID] && items[itemID].use.includes("gearSwap")) {

    const matchGear = items[itemID].use.match(/"rpg\w+Slot", "(\w+)"/);
    const getGearSlot = matchGear[1];
    const currentGear = getGearSlot + "Slot"

    if (rpgPlayer[currentGear]!=="none" && items[itemID].name!==items[rpgPlayer[currentGear]].name){



    




    setTimeout(() => {



      const hoveredElement = event.target;
      const elementRect = hoveredElement.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const seventyPercentWidth = windowWidth * 0.5;
    
      if (elementRect.left < seventyPercentWidth) {


        movingDiv = did("stampMenu");
  referenceDiv = did("tooltip");
  referenceRect = referenceDiv.getBoundingClientRect();
  var newLeft = referenceRect.right + 10;
  var newTop = referenceRect.top - 0;
  
  movingDiv.style.left = newLeft + "px";
  movingDiv.style.top = newTop + "px";
  did("stampMenu").style.display="flex" 


      } else {


        movingDiv = did("stampMenu");
referenceDiv = did("tooltip");
referenceRect = referenceDiv.getBoundingClientRect();

var stampMenuStyle = window.getComputedStyle(movingDiv);
var stampMenuWidth = parseFloat(stampMenuStyle.width);

var newLeft = referenceRect.left - stampMenuWidth - 10; // Restar el ancho de stampMenu y 10 píxeles para ajuste
var newTop = referenceRect.top;

movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop + "px";

did("stampMenu").style.display = "flex";


      }


  




  }, 0);

  did("stampMenuImg").src = "img/src/items/"+items[rpgPlayer[currentGear]].img+".jpg" 
  did("stampMenuName").innerHTML = items[rpgPlayer[currentGear]].name

  let gearSetbonus = ""
  if ("tierArmorBonus" in items[rpgPlayer[currentGear]]) gearSetbonus = items[rpgPlayer[currentGear]].tierArmorBonus

  var itemSkills = ""
  if ("skills" in items[rpgPlayer[currentGear]]) { 
    itemSkills = "<br>"+eval(items[rpgPlayer[currentGear]].skills)
  }

  var stamp1 = "";
  var stamp2 = "";
  var stamp3 = "";

  if ("stamp1" in items[rpgPlayer[currentGear]]) stamp1 = '<br><FONT COLOR=#42a7f5>[Stamps]<FONT COLOR="white"><br>'+ stampIcon + '<span class="logStat"> '+returnStampName(items[rpgPlayer[currentGear]].stamp1)+'</span>'
  if ("stamp2" in items[rpgPlayer[currentGear]]) stamp2 = '<br>' + stampIcon + '<span class="logStat"> '+returnStampName(items[rpgPlayer[currentGear]].stamp2)+'</span>'
  if ("stamp3" in items[rpgPlayer[currentGear]]) stamp3 = '<br>' + stampIcon + '<span class="logStat"> '+returnStampName(items[rpgPlayer[currentGear]].stamp3)+'</span>'

  did("stampMenuDescription").innerHTML = items[rpgPlayer[currentGear]].description+gearSetbonus+stamp1+stamp2+stamp3+"<br><br>"
  if (items[rpgPlayer[currentGear]].upgradeable || items[rpgPlayer[currentGear]].dynamic) did("stampMenuDescription").innerHTML = eval(items[rpgPlayer[currentGear]].description)+itemSkills+"<br>"+gearSetbonus+stamp1+stamp2+stamp3+"<br><br>"
  did("stampMenuRarity").innerHTML ="Gear Compare"

}

  }


  if (items[itemID].id === "I220"){  did("tortugaClick").src = "img/src/tortugasdefault/imgpog.png"; }
  

  }

});


document.addEventListener('mouseout', function(event) {

  if (event.target.id && event.target.id.endsWith('ItemImage')) {
    let itemID = event.target.id.replace('ItemImage', '');

  resetTooltip();
  setTimeout(() => { did("stampMenu").style.display="none"}, 0);
  if (items[itemID].id === "I220"){  did("tortugaClick").src = "img/src/tortugasdefault/img1.png"; }
  }

})



//right click item funcionality

let currentlyOpening = 0;


document.addEventListener('contextmenu', function(event) {

  let itemID = event.target.id.replace('ItemImage', '');

  if (items[itemID]){ //check if item


  //USEITEM-------------------------------------------------------------------------------------------
 if ("use" in items[itemID] && buffs.B81.time<=0) {
  if (rpgClass[stats.currentClass].level>=items[itemID].levelRequirement) {

    if ("cd" in items[itemID]) { //if cd
      if (items[itemID].cd > 0 && !sellMode) { //on cd
        playSound("audio/thud.mp3")
        did(itemID + "item").style.animation = "";
        void did(itemID + "item").offsetWidth;
        did(itemID + "item").style.animation = "noBuyAnimation 0.2s 1";
        
      }
      if (items[itemID].cd === 0 && !sellMode) { //off cd
        playSound("audio/use.mp3")
        did(itemID + "item").style.animation = "";
        void did(itemID + "item").offsetWidth;
        did(itemID + "item").style.animation = "levelUp 0.15s 1";
        eval(items[itemID].use)
        if(items[itemID].count<1) resetTooltip()
        items[itemID].visualCd = items[itemID].cd
        itemCooldownTick();
        if (did(itemID+'itemCooldown')) setTimeout(() => {  if (did(itemID+'itemCooldown')) { did(itemID+'itemCooldown').style.transition = "1s all" } }, 100);
        
      }

    } else if (!sellMode) { //if no cd
      playSound("audio/use.mp3")
      did(itemID + "item").style.animation = "";
      void did(itemID + "item").offsetWidth;
      did(itemID + "item").style.animation = "levelUp 0.15s 1";

      eval(items[itemID].use);
      
      if(items[itemID].count<1) resetTooltip()

      if (!settings.disableAutoOpen && "autoOpenLocked" in items[itemID]){ //if a container

        if (currentlyOpening===0 && items[itemID].count>9) autoOpenLocked()

        function delay(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function autoOpenLocked() {
          while (items[itemID].count > 1 && items[items[itemID].autoOpenLocked].count > 0) {
            currentlyOpening = 1;
            eval(items[itemID].use);
            playSound("audio/thud.mp3");
            addItem();
            await delay(50);
          }
          currentlyOpening = 0;
        }

        /*


      if ("autoOpenLocked" in items[itemID] && items[itemID].count>9 && currentlyOpening === 0){
      for (let i = 0; i < Math.min(items[items[itemID].autoOpenLocked].count-1, items[itemID].count-1); i++) {
        setTimeout(function() {
          eval(items[itemID].use)
          playSound("audio/thud.mp3")
          addItem()
          currentlyOpening = 1;
          if (items[items[itemID].autoOpenLocked].count<=2) {currentlyOpening = 0;}
            
          
        }, i * 50); 
      } } else if ("autoOpen" in items[itemID] && items[itemID].count>9 && currentlyOpening === 0){
        for (let i = 0; i < items[itemID].count-1; i++) {
          setTimeout(function() {
        eval(items[itemID].use)
            playSound("audio/thud.mp3")
            addItem()
            currentlyOpening = 1;
          if (items[itemID].count<=2) {currentlyOpening = 0;}
          }, i * 50); 
        }  
      }


*/



    }

    }

  } else {
    playSound("audio/thud.mp3")
    did(itemID + "item").style.animation = "";
    void did(itemID + "item").offsetWidth;
    did(itemID + "item").style.animation = "noBuyAnimation 0.2s 1";
  }

  upgradesReveal();
  addItem()

}
  //COLLECTIBLES----------------------------------------------------

if ("collectible" in items[itemID] && items[itemID].statUp!=="got") {
  playSound("audio/retro2.mp3");
  animParticleBurst(5 , "particleSpark", "cursor", 0);
  createFloatingText("<p>Collected!")
  items[itemID].statUp="got";
  eval("collectibles" + items[itemID].collectible + "Got += 1")
  createCatalogue();
  statsUpdate();
  updateStatsUI();
  items[itemID].count--;
  addItem();
}

//RECIPE----------------------------------

if (itemID.startsWith("R")) { //recipe behaviour
  let recipe = itemID.slice(1)
  playSound("audio/page.mp3");
  stats.recipesLearnt++;
  animParticleBurst(5 , "particleSpark", "cursor", 0);
  createFloatingText("<p>Learned!");
  recipes[recipe].unlocked = true;
  items[itemID].count--;
  addItem();
 }











}
});


//DEBUGGER

rpgPlayer.debug = false;

function debug(state){

if (state!==undefined) rpgPlayer.debug = state 

if (rpgPlayer.debug) {
  console.log("surely youre just trying to debug the game :^)")
  for (i in logs) logs[i].revealed=true


} 

if (!rpgPlayer.debug) did("debugPanel").style.display = "none"; else did("debugPanel").style.display = "flex"; 




}



document.addEventListener('keydown', function(event) { 


  if (did("debugPanel").style.display === "flex") {
   
let selectedItem = "none"


for (let i in items) { //bullshit gpt code but hey as long as it works
  let nameWithSpaces = ' ' + items[i].name + ' ';
  let tooltipText = ' ' + did("tooltipName").innerHTML + ' ';
  if (tooltipText.includes(nameWithSpaces)) {
    selectedItem = i;
    break;
  }
}



      if (selectedItem !== "none"){
  
    if (event.key === 'o')  items[selectedItem].count--;
    if (event.key === 'p')  items[selectedItem].count++;
    if (event.key === 'i')  {console.log(items[selectedItem].name+" - "+selectedItem); console.log(items[selectedItem]);}
    if (event.key === 'r')  {items[selectedRelic].count++}
    if (event.key === 'k')  {currentHP=0; enemyUpdate()}
    if (event.key === 'n')  {items[selectedItem].level--;did("tooltipDescription").innerHTML = items[selectedItem].level};
    if (event.key === 'm')  {items[selectedItem].level++; did("tooltipDescription").innerHTML = items[selectedItem].level};
    if (event.key === 'c')  {

      items[recipes[currentRecipe].item].count+=recipes[currentRecipe].craftingQueue
      stats.craftedItems+=recipes[currentRecipe].craftingQueue

      while (recipes[currentRecipe].craftingQueue>0) {




        if(recipes[currentRecipe].level > (jobs[rpgPlayer.currentJob].level - 10)) {

          if (currentRecipe.startsWith("S")) jobs.blacksmith.exp += recipes[currentRecipe].exp;
          if (currentRecipe.startsWith("C")) jobs.cooking.exp += recipes[currentRecipe].exp;
          if (currentRecipe.startsWith("A")) jobs.alchemy.exp += recipes[currentRecipe].exp;
          if (currentRecipe.startsWith("E")) jobs.engineering.exp += recipes[currentRecipe].exp;
          }
        
          recipes[currentRecipe].craftingQueue--
          jobExp();


      }

      

      recipes[currentRecipe].crafting = 'false';
      recipes[currentRecipe].time = recipes[currentRecipe].timer;
      
      
      craftingBarUi();
      createRecipe();
    }

      addItem();
  
    }

    

      

}

}) 

//left click item funcionality

document.addEventListener('click', function(event) {

  let itemID = event.target.id.replace('ItemImage', '');

  if (items[itemID]){ //check if item

    //TOUCH--------------------------------------------
    if ("touch" in items[itemID]){
        eval(items[itemID].touch)
    }

    //UPGRADE--------------------------------------------
    if (upgradeMode && "skills" in items[itemID] && (items[itemID].tag!=="mattock" && items[itemID].tag!=="rod") && !items[itemID].noUpgrade){
      upgradeItem = itemID;
      upgradeMenu()
  }


  if (!vaultMode && !sellMode && !favoriteMode && !lockMode && settings.disableFastUpgrade && "skills" in items[itemID] && (items[itemID].tag!=="mattock" && items[itemID].tag!=="rod") && !items[itemID].noUpgrade ){
    upgradeItem = itemID;
    upgradeMenu()
  } 

    //INVENTORY MANAGEMENT------------------------------------
    if (lockMode) {
            
      if (!items[itemID].locked) items[itemID].locked=true;
      else items[itemID].locked=false;
      
      playSound("audio/button4.mp3");
      
      
      addItem();
    }

    if (favoriteMode){

      playSound("audio/button4.mp3");
      if (!items[itemID].favorited) items[itemID].favorited=true;
      else items[itemID].favorited=false;
      
      addItem();

    }


    if (vaultMode){

      playSound("audio/button4.mp3");
      if (!items[itemID].vaulted) items[itemID].vaulted=true;
      else items[itemID].vaulted=false;
      did("inventory").innerHTML = ""
      addItem();

    }






}
});













function artisanBonus(recipe){

  let totalPrice = 0;

  
  let priceMult = 1.3;
  if (items[recipes[recipe].item].max<11) priceMult = 4

  totalPrice += (eval(items[recipes[recipe].reagent1].sell)*priceMult) * recipes[recipe].amount1
  if ("reagent2" in recipes[recipe]) totalPrice += (eval(items[recipes[recipe].reagent2].sell)*priceMult) * recipes[recipe].amount2
  if ("reagent3" in recipes[recipe]) totalPrice += (eval(items[recipes[recipe].reagent3].sell)*priceMult) * recipes[recipe].amount3
  if ("reagent4" in recipes[recipe]) totalPrice += (eval(items[recipes[recipe].reagent4].sell)*priceMult) * recipes[recipe].amount4

  

  return Math.ceil(totalPrice / 10) * 10;
}





function removeTableItem() {

 


  //if (items.I286.gotOnce) fishingEeriePond2.I286.P = -1;

  //if (quests.A4Q3.state==="completed" && items.I286.count>0) items.I286.count=0; //wip, remove after some time


}

function itemUse(id, effect) { //right click functionality of items
  did(id + "item").addEventListener("contextmenu", function () {


    if (rpgClass[stats.currentClass].level>=items[id].levelRequirement) {

    if ("cd" in items[id]) {
      if (items[id].cd > 0 && !sellMode) {
        playSound("audio/thud.mp3")
        did(id + "item").style.animation = "";
        void did(id + "item").offsetWidth;
        did(id + "item").style.animation = "noBuyAnimation 0.2s 1";
        
      }
      if (items[id].cd === 0 && !sellMode) {
        playSound("audio/use.mp3")
        did(id + "item").style.animation = "";
        void did(id + "item").offsetWidth;
        did(id + "item").style.animation = "levelUp 0.1s 1";
        effect();
        if(items[id].count<1) resetTooltip()
        items[id].visualCd = items[id].cd
        itemCooldownTick();
        if (did(id+'itemCooldown')) setTimeout(() => {  if (did(id+'itemCooldown')) { did(id+'itemCooldown').style.transition = "1s all" } }, 100);
        
      }

    } else if (!sellMode) { //if no cd
      playSound("audio/use.mp3")
      did(id + "item").style.animation = "";
      void did(id + "item").offsetWidth;
      did(id + "item").style.animation = "levelUp 0.1s 1";
      effect();
      if(items[id].count<1) resetTooltip()

      if (!settings.disableAutoOpen){

      if ("autoOpenLocked" in items[id] && items[id].count>9){
      for (let i = 0; i < Math.min(items[items[id].autoOpenLocked].count-1, items[id].count-1); i++) {
        setTimeout(function() {
          effect()
          playSound("audio/thud.mp3")
          addItem()
        }, i * 50); 
      } } else if ("autoOpen" in items[id] && items[id].count>9){
        for (let i = 0; i < items[id].count-1; i++) {
          setTimeout(function() {
            effect()
            playSound("audio/thud.mp3")
            addItem()
          }, i * 50); 
        }  
      }

    }

    }

  } else {
    playSound("audio/thud.mp3")
    did(id + "item").style.animation = "";
    void did(id + "item").offsetWidth;
    did(id + "item").style.animation = "noBuyAnimation 0.2s 1";
  }


  upgradesReveal();
  addItem()

  });
}

lockMode = false;

function toggleSell(){


  playSound("audio/button2.mp3")

    if (!sellMode){


      toggleText("toggleSellButton")
      did("inventory").style.boxShadow = "#FF4545 0px 0px 30px 0px inset";
      
      sellMode = true;

      lockMode = false;
      favoriteMode = false;
      vaultMode = false;
      upgradeMode = false;


    }
    else{


      did("tooltip2").style.display = "none"
      did("inventory").style.boxShadow = "none"
      sellMode = false;
    } 

}

var upgradeMode = false;

function toggleUpgrade(){


  playSound("audio/button2.mp3")

    if (!upgradeMode){


      toggleText("toggleUpgradeButton")
      did("inventory").style.boxShadow = "#D06209 0px 0px 30px 0px inset";
      
      upgradeMode = true;

      lockMode = false;
      favoriteMode = false;
      vaultMode = false;
      sellMode = false;
      

    }
    else{


      did("tooltip2").style.display = "none"
      did("inventory").style.boxShadow = "none"
      upgradeMode = false;
    } 

}

function toggleLock(){


  playSound("audio/button2.mp3")

    if (!lockMode){
      toggleText("toggleLockButton")
      did("inventory").style.boxShadow = "#6F709B 0px 0px 30px 0px inset";
      lockMode = true;

      sellMode = false;
      favoriteMode = false;
      vaultMode = false;
      upgradeMode = false;

    }
    else{
      lockMode = false;
      did("inventory").style.boxShadow = "none"
      did("tooltip2").style.display = "none"

    } 

}

favoriteMode = false

function toggleFavorite(){


  playSound("audio/button2.mp3")

    if (!favoriteMode){
      toggleText("addFavoriteButton")
      did("inventory").style.boxShadow = "#e0903f 0px 0px 30px 0px inset";
      favoriteMode = true;

      sellMode = false;
      lockMode = false;
      vaultMode = false;
      upgradeMode = false;


    }
    else{
      favoriteMode = false;
      did("inventory").style.boxShadow = "none"
      did("tooltip2").style.display = "none"
    } 

}

vaultMode = false

function toggleVault(){


  playSound("audio/button2.mp3")

    if (!vaultMode){
      toggleText("addVaultButton")
      did("inventory").style.boxShadow = "#89BBBB 0px 0px 30px 0px inset";
      vaultMode = true;

      sellMode = false;
      lockMode = false;
      favoriteMode = false;
      upgradeMode = false;

    }
    else{
      vaultMode = false;
      did("inventory").style.boxShadow = "none"
      did("tooltip2").style.display = "none"
    } 

}


let upgradeItem = 0;


document.addEventListener('mousemove', function(event) {

  if (event.target.id && event.target.id==="manaBox") {
  


    did("tooltipMagic").style.display = "flex"

    did("tooltipMagic").innerHTML = bestiaryTag("&nbsp;&nbsp;"+beautify(rpgPlayer.mana)+" / "+beautify(playerMaxMana)+" ("+playerManaRegen.toFixed(1)+" Magic/s)&nbsp;&nbsp;", "transparent")
    
    const movingDiv = document.getElementById("tooltipMagic");
    
    // Obtén las coordenadas del ratón y ajusta la posición del div
    const newLeft = event.clientX + (window.scrollX || window.pageXOffset) - 10;
    const newTop = event.clientY + (window.scrollY || window.pageYOffset) - 40;
    
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';

  } 

});


document.getElementById("manaBox").addEventListener('mouseleave', function() {
  did("tooltipMagic").style.display = "none";
});


















function toggleText(id){


  did("tooltip2").style.display = "flex"

  if (id==="toggleSellButton"){  did("tooltip2").innerHTML = bestiaryTag("SELL MODE", "#FF4545")+ 'Click to sell an item once<br>Right Click to sell all the items at the same time<br>The shop will sell items ten at a time while this is active<br>You can also press CTRL to toggle sell mode' }
  if (id==="toggleLockButton"){  did("tooltip2").innerHTML = bestiaryTag("LOCK MODE", "#6F709B")+ 'Click to lock an item<br>Locking items prevents them from being sold or stamped' }
  if (id==="addFavoriteButton"){  did("tooltip2").innerHTML = bestiaryTag("FAVORITE MODE", "#e0903f")+ 'Click to favorite an item<br>Favorited items will automatically go to the Favorites tab' }
  if (id==="addVaultButton"){  did("tooltip2").innerHTML = bestiaryTag("VAULT MODE", "#89BBBB")+ 'Click to vault an item<br>Click them again to unvault them<br>Vaulted items wont show in other tabs' }
  if (id==="toggleUpgradeButton"){  did("tooltip2").innerHTML = bestiaryTag("UPGRADE MODE", "#D06209")+ 'Click on an upgradeable item to open the upgrade menu' }



  const movingDiv = did("tooltip2");
  const referenceDiv = did(id);
  const referenceRect = referenceDiv.getBoundingClientRect();

  if (id==="toggleUpgradeButton"){
    var newLeft = referenceRect.left;
    var newTop = referenceRect.top - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft - 0+ "px";
    movingDiv.style.top = newTop - 5+ "px";

  }

  else{
  
  const referenceLeft = referenceRect.left + 5;
  const referenceTop = referenceRect.top - 5;
  const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
  const newTop = referenceTop - movingDiv.offsetHeight;
  movingDiv.style.left = newLeft + -3 +  "px";
  movingDiv.style.top = newTop + "px";

  }

}

stats.soldItems = 0;


document.addEventListener("contextmenu", function (event) { //sell all

  if (sellMode && event.target.id && event.target.id.endsWith('ItemImage')) {
    let itemID = event.target.id.replace('ItemImage', '');

    if (equipCheck(itemID)===false) sellItem(itemID, items[itemID].count)

  }
});




  document.addEventListener('mousedown', function (event) {

    if (event.button===0 && sellMode && event.target.id && event.target.id.endsWith('ItemImage')) {
      let itemID = event.target.id.replace('ItemImage', '');

      let isMouseDown = true;
      let messageInterval = 100; // Tiempo en ms entre mensajes
      let messageMultiplier = 1;
      let startTime = Date.now();
  
      function sendMessage() {
          if (!isMouseDown) return;
  


          if (!items[itemID].cap) { sellItem(itemID, messageMultiplier) }



          
  
          let elapsedTime = Date.now() - startTime;
          if (elapsedTime >= 1000) {
              messageMultiplier *= 10;
              startTime = Date.now(); // Reiniciar el tiempo para la siguiente multiplicación
          }
  
          setTimeout(sendMessage, messageInterval);
      }
  
      sendMessage();
  
      document.addEventListener('mouseup', function() {
          isMouseDown = false;
      }, { once: true });



    }

    
});



function sellItem(id, amount){

  if (eval(items[id].sell) !== 0 && amount<items[id].count && !items[id].locked && !items[id].upgradeable) { //sell specific

  playSound("audio/heal.mp3"); 

  rpgPlayer.coins += (eval(items[id].sell)*multiplicativeSellValue) * amount ;
  if (!("collectible" in items[id])) stats.totalCoins += (eval(items[id].sell)*multiplicativeSellValue) * amount ;
  stats.soldItems += amount;

  items[id].count -= amount;

  if (id==="I119") logs.P26.unlocked=true

  removeStamps(id)
  updateCounters();
  addItem();
  resetTooltip();

  } else if (eval(items[id].sell) !== 0 && !items[id].locked && (items[id].count>0 || items[id].upgradeable && items[id].count>0 )) { //sell remaining or upgradeable

    playSound("audio/heal.mp3"); 

    rpgPlayer.coins += (eval(items[id].sell)*multiplicativeSellValue) * items[id].count ;
    if (!("collectible" in items[id])) stats.totalCoins += (eval(items[id].sell)*multiplicativeSellValue) * items[id].count ;
    stats.soldItems += items[id].count;

    items[id].count -= items[id].count;
  
    if (id==="I119") logs.P26.unlocked=true
  
    removeStamps(id)
    updateCounters();
    addItem();
    resetTooltip();

  }



}


function improbabilityDrive(mode){

  const regex = /rareItemDrop\(['"]([^'"]+)['"],\s*(rareDrop|uncommonDrop|uncommonDungeon|rareDungeon)(?:\s*,\s*[^)]+)*\s*\)/g;
  let match;
const rareDropIds = [];
const uncommonDropIds = [];

while ((match = regex.exec(enemies[stats.currentEnemy].drop)) !== null) {
    const id = match[1];
    const dropType = match[2];
    if ((dropType === 'rareDrop' || dropType === 'rareDungeon') && !items[id].gotOnce) {
        rareDropIds.push(id);
    }
    
    if ((dropType === 'uncommonDrop' || dropType === 'uncommonDungeon') && !items[id].gotOnce) {
        uncommonDropIds.push(id);
    }
}


  //console.log('Rare Drop IDs:', rareDropIds);
  //console.log('Uncommon Drop IDs:', uncommonDropIds);

  itemGot = "none"

  if (uncommonDropIds.length>0) itemGot = uncommonDropIds[rng(0,(uncommonDropIds.length-1))]
  if (rng(1,4)===1 && rareDropIds.length>0 || rareDropIds.length>0 && uncommonDropIds.length===0) itemGot = rareDropIds[rng(0,(rareDropIds.length-1))]

  if (uncommonDropIds.length===0 && rareDropIds.length===0) invalid()
  if (itemGot!=="none") valid()

  function invalid(){

    if (!did('popupmaterialiser')) createPopup('&#10060; Invalid Target!', '#913c3c', "popupmaterialiser");

  }


  function valid (){

  if (mode==="guaranteed"){
    if (items[itemGot].quality==="Uncommon") {createPopup('💠 First time reward: '+items[itemGot].name+' !', '#994687'); items[itemGot].count++}
    else if (items[itemGot].quality==="Rare") {createPopup('💠 First time reward: '+items[itemGot].name+' !', '#994687'); items[itemGot].count++}

  } else {
    if (items[itemGot].quality==="Uncommon" && rng(1,5)===1) {createPopup('💠 '+items[itemGot].name+' has materialised!', '#994687'); items[itemGot].count++}
    else if (items[itemGot].quality==="Rare" && rng(1,10)===1) {createPopup('💠 '+items[itemGot].name+' has materialised!', '#994687'); items[itemGot].count++}
    else createPopup('&#10060; Failed to materialise '+items[itemGot].name, '#913c3c');
    items.I219.count--
    addItem();
  }
  
  playSound("audio/button9.mp3");
  



  }









}


function removeStamps(id){

if ("stamp1" in items[id]) delete items[id].stamp1;
if ("stamp2" in items[id]) delete items[id].stamp2;
if ("stamp3" in items[id]) delete items[id].stamp3;


}












//#endregion
//----------------------==========================-----------------------
//----------------------===========DEBUG==========-----------------------
//----------------------==========================-----------------------
//#region Debug
function levelUp(amount) { //gives levels
  for (let i = 0; i < amount; i++) {
    rpgClass[stats.currentClass].currentExp = rpgClass[stats.currentClass].nextExp;
    expBar();
    statsUpdate();
    updateStatsUI();
  }
}

function revive() { //used for debug
  rpgPlayer.hp = stat.MaxHealth;
  hpRegen();
}

function unlockAll(){
  for (i in recipes) recipes[i].unlocked = true;
  for (i in jobs) jobs[i].level = 999;
  for (i in unlocks) unlocks[i] = true;
  for (i in areas) {
    if ('unlockedOre' in  areas[i]) areas[i].unlockedOre = 1;
    if ('unlockedHerb' in  areas[i]) areas[i].unlockedHerb = 1;
    if ('unlockedPond' in  areas[i]) areas[i].unlockedPond = 1;
  }
  for (i in items) items[i].count = 10000000;
  for (var i in buildings) { buildings[i].unlocked = true;}

}
  


var woodenStamps = ["nature1", "nature2", "might1", "might2", "elemental1", "elemental2", "occult1", "occult2", "deific1", "deific2","titan1"]
var ironStamps = ["nature1", "nature2", "nature3", "might1", "might2", "might3", "elemental1", "elemental2", "elemental3", "occult1", "occult2", "occult3", "deific1", "deific2", "deific3","titan1", "titan2"]
var goldStamps = ["nature2", "nature3", "might2", "might3", "elemental2", "elemental3","occult2", "occult3", "deific2", "deific3", "titan2", "titan3"]
var eternalStamps = ["nature4", "might4", "elemental4", "occult4", "deific4", "titan3", "naturedown", "mightdown", "elementaldown", "deificdown", "occultdown", "naturedown", "mightdown", "elementaldown", "deificdown", "occultdown"]
var gardenStamps = ["dynamo1", "dynamo1", "dynamo1", "dynamo1", "dynamo2", "dynamo3"]

function stampWeapon(tier){

  if (tier === "wood") {
  items[rpgPlayer.weaponSlot].stamp1 = woodenStamps[rng(0,(woodenStamps.length-1))]
  delete items[rpgPlayer.weaponSlot].stamp2
  delete items[rpgPlayer.weaponSlot].stamp3
  if (rng(1,15) === 1) { items[rpgPlayer.weaponSlot].stamp2 = woodenStamps[rng(0,(woodenStamps.length-1))]
  if (rng(1,15) === 1) items[rpgPlayer.weaponSlot].stamp3 = woodenStamps[rng(0,(woodenStamps.length-1))] }
  animParticleBurst(4 , "particleExp", "stampMenuDescription", 0)
  }

  if (tier === "iron") {
  items[rpgPlayer.weaponSlot].stamp1 = ironStamps[rng(0,(ironStamps.length-1))]
  items[rpgPlayer.weaponSlot].stamp2 = ironStamps[rng(0,(ironStamps.length-1))]
  delete items[rpgPlayer.weaponSlot].stamp3
  if (rng(1,15) === 1) items[rpgPlayer.weaponSlot].stamp3 = ironStamps[rng(0,(ironStamps.length-1))]
  animParticleBurst(4 , "particleExp", "stampMenuDescription", 0)
  }

  if (tier === "gold") {
  items[rpgPlayer.weaponSlot].stamp1 = goldStamps[rng(0,(goldStamps.length-1))]
  items[rpgPlayer.weaponSlot].stamp2 = goldStamps[rng(0,(goldStamps.length-1))]
  items[rpgPlayer.weaponSlot].stamp3 = goldStamps[rng(0,(goldStamps.length-1))]
  animParticleBurst(4 , "particleExp", "stampMenuDescription", 0)
  } 

  if (tier === "gardener") {
    items[rpgPlayer.weaponSlot].stamp1 = gardenStamps[rng(0,(gardenStamps.length-1))]
    delete items[rpgPlayer.weaponSlot].stamp2
    delete items[rpgPlayer.weaponSlot].stamp3
    if (rng(1,2) === 1) { items[rpgPlayer.weaponSlot].stamp2 = gardenStamps[rng(0,(gardenStamps.length-1))]
    if (rng(1,2) === 1) items[rpgPlayer.weaponSlot].stamp3 = gardenStamps[rng(0,(gardenStamps.length-1))] }
    stampStatUp()
    animParticleBurst(4 , "particleExp", "stampMenuDescription", 0)
    clearInterval(playerAttackInterval);
    playerAttackInterval = setInterval(playerAttack, 2000*playerHaste);
    }

  if (tier === "eternal") {
    
      items[rpgPlayer.weaponSlot].stamp1 = eternalStamps[rng(0,(eternalStamps.length-1))]
      items[rpgPlayer.weaponSlot].stamp2 = eternalStamps[rng(0,(eternalStamps.length-1))]
      items[rpgPlayer.weaponSlot].stamp3 = eternalStamps[rng(0,(eternalStamps.length-1))]
      animParticleBurst(4 , "particleExp", "stampMenuDescription", 0)
    
    
    } 

  playSound("audio/stamp.mp3");
  stampStatUp()
  gametipUnlock("gt4")

}



function stampStatUp(){

  natureStampStatUp = 0;
  mightStampStatUp = 0;
  elementalStampStatUp = 0;
  occultStampStatUp = 0;
  deificStampStatUp = 0;
  multihitStampStatUp = 0;
  strengthStampStatUp = 0;

  natureDownStampStatUp = 0;
  mightDownStampStatUp = 0;
  elementalDownStampStatUp = 0;
  occultDownStampStatUp = 0;
  deificDownStampStatUp = 0;

  omniStampStatUp = 0
  hasteStampStatUp = 0
  luckStampStatUp = 0
  weakAlignStampStatUp = 1
  strongAlignStampStatUp = 1

  const natureValues = { "nature1": 0.1, "nature2": 0.2, "nature3": 0.3, "nature4": 0.4 };
  const mightValues = { "might1": 0.1, "might2": 0.2, "might3": 0.3 , "might4": 0.4 };
  const elementalValues = { "elemental1": 0.1, "elemental2": 0.2, "elemental3": 0.3 , "elemental4": 0.4 };
  const occultValues = { "occult1": 0.1, "occult2": 0.2, "occult3": 0.3 , "occult4": 0.4};
  const deificValues = { "deific1": 0.1, "deific2": 0.2, "deific3": 0.3 , "deific4": 0.4};

  const natureDownValues = { "naturedown": 0.4};
  const mightDownValues = { "mightdown": 0.4};
  const elementalDownValues = { "elementaldown": 0.4};
  const occultDownValues = { "occultdown": 0.4};
  const deificDownValues = { "deificdown": 0.4};

  const strengthValues = { "titan1": 0.1, "titan2": 0.2, "titan3": 0.3};
  const omniValues = { "omni1": 0.1, "omni2": 0.2, "omni3": 0.3};
  const hasteValues = { "dynamo1": 0.05, "dynamo2": 0.1, "dynamo3": 0.15};
  const luckValues = { "luck1": 0.1, "luck2": 0.2, "luck3": 0.3};


  if (rpgPlayer.weaponSlot!=="none") {
  
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; natureStampStatUp += natureValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; mightStampStatUp += mightValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; elementalStampStatUp += elementalValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; occultStampStatUp += occultValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; deificStampStatUp += deificValues[stamp] || 0; }


  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; natureDownStampStatUp += natureDownValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; mightDownStampStatUp += mightDownValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; elementalDownStampStatUp += elementalDownValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; occultDownStampStatUp += occultDownValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; deificDownStampStatUp += deificDownValues[stamp] || 0; }



  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; strengthStampStatUp += strengthValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; omniStampStatUp += omniValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; hasteStampStatUp += hasteValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; luckStampStatUp += luckValues[stamp] || 0; }



}



  statsUpdate()
  updateStatsUI()
}

//#endregion
//----------------------==========================-----------------------
//----------------------===========AREAS==========-----------------------
//----------------------==========================-----------------------
//#region Areas




did("areaArrow1").onclick = cycleAreas(+1); 
did("areaArrow2").onclick = cycleAreas(-1); 


const areaOrder = ["A1","A2"]

function cycleAreas(direction) {
  return function () {
      let currentArea = stats.currentArea;
      let index = areaOrder.indexOf(currentArea);
      if (index !== -1) {
          currentIndex = (index + direction + areaOrder.length) % areaOrder.length;

      }

      let newArea = areaOrder[currentIndex]

        playSound("audio/button3.mp3");
        playSound("audio/pop3.mp3");
        playSound("audio/woosh2.mp3");
        stats.currentArea = newArea;
        resetAreaButtonClass();
        stats.currentDifficulty = "easy";
        switchArea();
        encounterButtonPress();
        bossTime = false;
        specialButtonUi();
        deleteEnemy();
        updateHeat();
        tipJarUpdate()
      
  };
}




did("areaName").onclick = openAreas

let isAreaPanelOpen = false

function openAreas(){

  playSound("audio/button5.mp3");


  if (isAreaPanelOpen) isAreaPanelOpen = false
  else isAreaPanelOpen = true


  if (isAreaPanelOpen){
    did("areaWidget").style.height = "24rem"
    did("areaWidget").style.width = "50rem"
    did("areaListing").style.marginTop = "2rem"

    did("areaSelect").style.opacity = "1"

  }

  else {
    did("areaSelect").style.opacity = "0"
    
    did("areaWidget").style.height = "2.7rem"
    did("areaWidget").style.width = "25rem"
    did("areaListing").style.marginTop = "0rem"

  }




}



























function createAreaPanel() {


  did("areaList").innerHTML = ""
  did("dungeonList").innerHTML = ""
  did("landmarkList").innerHTML = ""

  for (let a in areas) {
    if (!did(a + "area")) {
      const areadiv = document.createElement("div");
      areadiv.id = a + "area";
      //areadiv.innerHTML = '<div class="areaPanel2"> <p class="areaPanelName" id="' + a + 'areaName">' + areas[a].name + '</p> <p class="areaPanelLevel" id="' + a + 'areal">lvl ' + areas[a].level + '</p></div>';
      let areaLevelColor = ""
      let areaLevelRange = ""

      if (areas[a].levelRange!==undefined) {

        if (returnEnemyLevelGap("compare",areas[a].levelRange[0])==="red") areaLevelColor = "#E15261"
        if (returnEnemyLevelGap("compare",areas[a].levelRange[0])==="orange") areaLevelColor = "#DD7A42"
        if (returnEnemyLevelGap("compare",areas[a].levelRange[0])==="green") areaLevelColor = "#62BD6D"  
        areaLevelRange = `<strong style="margin-left:auto; background:${areaLevelColor}"> LVL ${areas[a].levelRange[0]} - ${areas[a].levelRange[1]} </strong>`
      } 


      if (areas[a].locked!==false) areaLevelRange = `<strong style="margin-left:auto;"> 🔒 </strong>`



      areadiv.innerHTML = `<div class="areaPreviewSlider" style="background:#8F684C;"></div><img src="img/src/areas/${a}.png" class="areaPreview"><img src="img/src/areas/${a}M.png"><strong style="background:#6F4B3C">${areas[a].name}</strong>${areaLevelRange}`;
      if (areas[a].category==="landmark") areadiv.innerHTML = `<div class="areaPreviewSlider" style="background:#625B60;"></div><img src="img/src/areas/${a}.png" class="areaPreview"><img src="img/src/areas/${a}M.png"><strong style="background:#5A5048">${areas[a].name}</strong>${areaLevelRange}`;
      //if (a === "A7") areadiv.innerHTML = '<img src="img/src/areas/'+a+'M.png"><strong style="background:#957A4B">' + areas[a].name + '</strong><strong id="' + a + 'areal">LVL ' + areas[a].level + '</strong><strong id="' + a + 'aream">' + repIcon + areas[a].mastery + '</strong>';
      areadiv.className = "areaSlider";
      if (areas[a].locked!==false) areadiv.style.filter = "brightness(0.6)"

      //areadiv.style.background = ' linear-gradient(130deg, #1A1A1B 60%, rgba(255,255,255,0) 100%), url(img/src/areas/'+a+'.png), #1A1A1B '


      did(areas[a].category+"List").appendChild(areadiv);
      //if (rpgClass[stats.currentClass].level >= areas[a].level){ did(a + "areal").style.background = "#579457"; }else { did(a + "areal").style.background = "#945758"}
     

      //if (areas[a].dungeon) {
      //  areadiv.innerHTML = '<img src="img/src/areas/'+a+'M.png"><strong>' + areas[a].name + '</strong><strong id="' + a + 'areaCharges" style="background:#125D5D">3 Left</strong><strong id="' + a + 'areaTimer" style="background:#65476F">⏱️</strong>';
      //  did("dungeonTab").appendChild(areadiv);
      //}

      
      areaButton(a);
      tooltipAreas(a);
    }

    //if (!areas[a].dungeon) {
    //  if (rpgClass[stats.currentClass].level >= areas[a].level){ did(a + "areal").style.background = "#579457"; }else { did(a + "areal").style.background = "#945758"}
    //}




    //if (areas[a].dungeon && areas[a].dungeonTimer>0) {did(a + "areaName").innerHTML = areas[a].name + " ⏱️"} else did(a + "areaName").innerHTML = areas[a].name




  }
};



did("travelSelectAreas").addEventListener("click", function () { changeAreaCategory("area") })
did("travelSelectLandmarks").addEventListener("click", function () { changeAreaCategory("landmark") })
did("travelSelectDungeons").addEventListener("click", function () { changeAreaCategory("dungeon") })

function changeAreaCategory(category){

  playSound("audio/button3.mp3");


  did("areaList").style.display = "none"
  did("landmarkList").style.display = "none"
  did("dungeonList").style.display = "none"

did(category+"List").style.display = "flex"
voidAnimation(category+"List","growFadeIn 0.2s 1")



}



let previousArea = "A1";
let previousDifficulty = "easy";







function areaButton(id) {
  if (did(id + "area")) {

    did(id + "area").addEventListener("mouseover", function () {
      playSound("audio/rockSlide.mp3")
    })

    did(id + "area").addEventListener("click", function () {



      if (areas[id].locked!==false) {playSound("audio/close.mp3"); return}

      if (stats.currentArea !== id) { // if its not already on the area

       resetEncounter()

     


        playSound("audio/button3.mp3");
        playSound("audio/pop3.mp3");
        playSound("audio/woosh2.mp3");
        stats.currentArea = id;
        if (!areas[id].dungeon) previousArea = id; 
        resetAreaButtonClass();
        stats.currentDifficulty = "easy";
        switchArea();
        encounterButtonPress();
        did("rpgCanvas").style.animation = "";
        void did("rpgCanvas").offsetWidth;
        did("rpgCanvas").style.animation = "rpgFade 1s 1";

        did(id + "area").style.animation = "";
        void did(id + "area").offsetWidth;
        did(id + "area").style.animation = "areaClick 0.5s 1";

        bossTime = false;
        specialButtonUi();
        deleteEnemy();
        updateHeat();
        tipJarUpdate()

      if (id==="A8") gametipUnlock("gt19")

      if (areas[id].dungeon && (areas[id].charges>0 || items.I174.count>0)){ //dungeon voucher

        if (areas[id].charges<1) items.I174.count--;

        if (areas[id].charges>0) {
            if (areas[id].charges===1 && areas[id].dungeonTimer > 1800) areas[id].dungeonTimer = 1800
            if (areas[id].charges===3) areas[id].dungeonTimer = 3600
            areas[id].charges--;

        }

        did(id + "areaCharges").innerHTML = areas[id].charges+" Left"
        addItem();
        playSound("audio/button3.mp3");
        previousDifficulty = stats.currentDifficulty;
        stats.currentArea = id;
        resetAreaButtonClass();
        stats.currentDifficulty = "easy";
        switchArea();
        encounterButtonPress();
        did("rpgCanvas").style.animation = "";
        void did("rpgCanvas").offsetWidth;
        did("rpgCanvas").style.animation = "rpgFade 1s 1";
        bossTime = false;
        specialButtonUi();
        deleteEnemy();
        updateBGColor()


      }

      statsUpdate()
      updateStatsUI()
      }
    });
  }

}


function updateBGColor(){

  document.documentElement.style.setProperty('--bgColor1', areas[stats.currentArea].color1);
  document.documentElement.style.setProperty('--bgColor2', areas[stats.currentArea].color2);

}

function resetAreaButtonClass() { //visual select of area button

  for (let a in areas) {
    did(a + "area").classList.replace(
      "areaSliderActive",
      "areaSlider"
    );
  }
}

function areaDictionary(area){

 if(area==="A8") return "🌫️ Esoteric Brume"
 if(area==="A8D") return "-15% All Resistances"

 if(area==="A9") return "💥 Unstable Cores"
 if(area==="A9D") return "Enemies have a small chance to explode on defeat" 

 if(area==="A10") return "🌙 Darkmoon Seal"
 if(area==="A10D") return "Constant"+occultIcon+"Occult Damage for the sinners"

 if(area==="A11") return "☀️ Holybringer Seal"
 if(area==="A11D") return "Constant"+deificIcon+"Deific Damage for the wicked"


}

function areaEffect(){
if (areas[stats.currentArea].areaEffect) { did("areaEffect").style.display = "flex"; did("areaEffect").innerHTML = areaDictionary(stats.currentArea); }
else did("areaEffect").style.display = "none";
}

did("areaEffect").addEventListener("mouseenter", function () {
  did("tooltip").style.display = "flex";
  did("upperTooltip").style.display = "none";
  did("tooltipDescription").innerHTML = bestiaryTag(areaDictionary(stats.currentArea), "#997151") + bestiaryTag(areaDictionary(stats.currentArea+"D"), "transparent");
  did("tooltipFlavor").textContent = "";
  did("tooltipDescription").style.textAlign = "center";
  did("tooltipImage").style.display = "none";
  const movingDiv = did('tooltip');
const referenceDiv = did('areaEffect');
const referenceRect = referenceDiv.getBoundingClientRect();
const newLeft = referenceRect.left;
const newTop = referenceRect.top + 35;
movingDiv.style.left = newLeft + 'px';
movingDiv.style.top = newTop + 'px';
  movingDiv.style.left = newLeft + "px";
  movingDiv.style.top = newTop + "px";
});
did("areaEffect").addEventListener("mouseleave", function () {
  resetTooltip();
});


function switchArea() {
  did("rpgCanvas").style.backgroundImage = "url(img/src/areas/" + stats.currentArea + ".png)";
  did(stats.currentArea + "area").classList.replace( "areaSlider", "areaSliderActive");

      statsUpdate()

      dungeonPoints = 0;
      dungeonStage=0;
      updateDungeonPoints();

      
      did("areaImage").src = "img/src/areas/"+stats.currentArea+"M.png"

      did("areaName").innerHTML = areas[stats.currentArea].name;
      //did("areaLevel").innerHTML = "MASTERY: " + areas[stats.currentArea].masteryCap;
      did("areaLevel").style.display = "flex"
      //if (restrainedMastery===0 || settings.overpoweredToggle) did("areaLevel").style.display = "none"
      did("areaLevel").style.display = "none"


      specialWeather = false
      removeParticle("ambience")



      voidAnimation("areaTransition","areaTransition 0.4s 1 linear")

      setTimeout(() => {
        
      did("areaBg").style.backgroundImage = `url(img/src/areas/${stats.currentArea}Bg.png)`
      did("areaFloor2").style.backgroundImage = `url(img/src/areas/${stats.currentArea}Floor.png)`

      did("areaFloor1").style.backgroundImage = `url(img/src/projectiles/none.png)`
      did("areaFloor3").style.backgroundImage = `url(img/src/projectiles/none.png)`

      did("areaFloor1").style.backgroundImage = `url(img/src/areas/${stats.currentArea}FloorFX1.png)`
      did("areaFloor3").style.backgroundImage = `url(img/src/areas/${stats.currentArea}FloorFX2.png)`
      }, 100);


      areaAnimations(stats.currentArea);

      areaEffect();
      did('questTab').innerHTML = "";
      did('shopListing').innerHTML = '';
      updateItemShop();
      createItemOfTheDay();
      refreshItemOfTheDay();
      createQuest()


        setTimeout(() => {  repositionQuickAccessMenu() }, 1);
        repositionQuestMenu()

       
}




function areaAnimations(area){

  did("areaFloor3").style.animation = "none"
  did("areaFloor1").style.animation = "none"

if (area==="A1"){
  did("areaFloor1").style.animation = "subtleWind1 3s ease-in-out infinite"
  did("areaFloor3").style.animation = "subtleWind1 3s ease-in-out infinite"
}









}
  
function specialButtonUi() { //shows or hides special buttons depending on zone

      if (areas[stats.currentArea].unlockedOre!==undefined) { did("miningNode").style.display = "flex";
      } else did("miningNode").style.display = "none";
      
      if (areas[stats.currentArea].unlockedHerb!==undefined) { did("herbNode").style.display = "flex";
      } else did("herbNode").style.display = "none";

      if (areas[stats.currentArea].unlockedPond!==undefined) { did("pondNode").style.display = "flex";
      } else did("pondNode").style.display = "none";

      if (!areas[stats.currentArea].dungeon) {
        did("encounterWrapper").style.visibility = "visible";
        dungeonTime = false;
        did("dungeonUI").style.display = "none";
        document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(1)");

      } else {
        did("encounterWrapper").style.visibility = "hidden";
        did("dungeonUI").style.display = "flex";
        dungeonTime = true;
        document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(0.5)");
      }


      did("enemyPanel").style.display = "flex";
      did("areaEncounters").style.display = "flex";
      did("turtleBot").style.display = "flex";
      did("heatIcon").style.display = "flex";
      if (unlocks.shop) did("shopInteractable").style.display = "flex";

      if (stats.currentArea === "L1"){
        did("enemyPanel").style.display = "none";
        did("areaEncounters").style.display = "none";
        did("turtleBot").style.display = "none";
        did("heatIcon").style.display = "none";
        did("shopInteractable").style.display = "none";

      }

      /*

      if (stats.currentArea === "A7") {
        did("encounterWrapper").style.visibility = "hidden";
        did("enemyPanel").style.display = "none";
        //did('shopButton').innerHTML = '<img src="img/src/icons/honor.jpg" style="margin-right: 0.3rem;">Trials';
        did('shopButton').innerHTML = '<img src="img/src/items/I0.jpg" style="margin-right: 0.3rem;">?????';
        did('questButton').innerHTML = '<img src="img/src/icons/arenaCoin.png" style="margin-right: 0.3rem;">Clash';
        did("honorSign").style.display = "flex";
        did("honorPilar").style.display = "flex";



      } else {
        did("honorSign").style.display = "none";
        did("honorPilar").style.display = "none";
        skirmishTime = false;
        showdownTime = false;
        showdownTimer=0;
        did("enemyPanel").style.display = "flex";
        if (unlocks.shop) did('shopButton').innerHTML = '<img src="img/sys/coin.png" style="margin-right: 0.3rem;">Shop';
        did('questButton').innerHTML = '<img src="img/src/items/quest.jpg" style="margin-right: 0.3rem;">Quest';
        did("showdownUI").style.display = "none";
        did("skirmishUI").style.display = "none";
      }

      */
}



unlocks.autoBoss = false;
var togleAutoBoss = false

/*

did("bossButton").addEventListener("contextmenu", function () { //right click to togle boss autokill
  if (unlocks.autoBoss) {

    playSound("audio/button2.mp3")


    if (togleAutoBoss) did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Press to summon the boss of this area<span style="background:black; padding: 0 2%; border-radius: 0.6vh"><br><FONT COLOR="coral">Auto-summon is turned OFF</span><br><FONT COLOR="white">(Right Click to activate)';
    else did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Press to summon the boss of this area<span style="background:black; padding: 0 2%; border-radius: 0.6vh"><br><FONT COLOR="#44bd6c">Auto-summon is turned ON</span><br><FONT COLOR="white">(Right Click to deactivate)';

    if (!togleAutoBoss) togleAutoBoss = true;
    else togleAutoBoss = false;


      }});

*/

function difficultyButton(div, difficulty){
  did(div).addEventListener("click", function () {

    playSound("audio/button4.mp3")

    did("enemyAttackBox").style.display = "none";
    resetEncounter()


    if (difficulty === "boss" && rpgPlayer.BossCharges<1) {playSound("audio/thud.mp3"); return}

    stats.currentDifficulty = difficulty;

    
    combatActions = 3+stat.ExtraActions
    updateCombatActions()

    bossTime = false;
    deleteEnemy();
    enemyUpdate();
    encounterButtonPress();

    setTimeout(() => {
      updateOfflineIndicator()
      statsUpdate();
      updateStatsUI();
    }, 1);
    
  });
}

difficultyButton("encounterEasy", "easy")
difficultyButton("encounterMedium", "medium")
difficultyButton("encounterHard", "hard")
difficultyButton("bossButton", "boss")
difficultyButton("miningNode", "ore")
difficultyButton("herbNode", "herb")
difficultyButton("pondNode", "pond")

function encounterButtonPress() { //Ui states of special Buttons
  did("encounterEasy").style.boxShadow = "";
  did("encounterMedium").style.boxShadow = "";
  did("encounterHard").style.boxShadow = "";
  did("bossButton").style.boxShadow = "";
  did("miningNode").style.boxShadow = "";
  did("herbNode").style.boxShadow = "";
  did("pondNode").style.boxShadow = "";

  if (stats.currentDifficulty === "easy") {
    did("encounterEasy").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (stats.currentDifficulty === "medium") {
    did("encounterMedium").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (stats.currentDifficulty === "hard") {
    did("encounterHard").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (stats.currentDifficulty === "boss") {
    did("bossButton").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (stats.currentDifficulty === "ore") {
    did("miningNode").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (stats.currentDifficulty === "herb") {
    did("herbNode").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (stats.currentDifficulty === "pond") {
    did("pondNode").style.boxShadow = "inset white 0px 0px 5px 1px";
  }

  did("bossTimer").innerHTML = `<img src="img/sys/triangulo.png">`+rpgPlayer.BossCharges

}


did("bossButton").onclick = function() {

  if (rpgPlayer.BossCharges<1) return

  playSound("audio/arena.mp3")
  if (rpgPlayer.BossCharges<6 && cd.BossCharge>300) cd.BossCharge = 300
  if (rpgPlayer.BossCharges===10) cd.BossCharge = 900







}







//#endregion
//----------------------==========================-----------------------
//----------------------===========QUESTS=========-----------------------
//----------------------==========================-----------------------
//#region Quests


//#endregion
//----------------------==========================-----------------------
//----------------------============SHOP==========-----------------------
//----------------------==========================-----------------------
//#region Shop


//#endregion
//----------------------==========================-----------------------
//----------------------============UI============-----------------------
//----------------------==========================-----------------------
//#region UI


var sellMode = false;

/*

document.addEventListener("keyup", (event) => {
  if (!settings.disableHoldSell){
  if (did("bodyCover").style.display === "none"){
  if (settings.switchContextKey) {
    if (event.code === 'AltLeft' || event.code === 'AltRight' ) {
      toggleSell();
    }
  } else{
  if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
    toggleSell();
  }
}
}
}

if (settings.disableHoldSell && sellMode){

  if (settings.switchContextKey) {
    if (event.code === 'AltLeft' || event.code === 'AltRight' ) {
      toggleSell();
    }
  } else{
  if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
    toggleSell();
  }
  }


}




});



document.addEventListener("keydown", (event) => {
  if (settings.disableHoldSell && !sellMode){
  if (did("bodyCover").style.display === "none"){
  if (settings.switchContextKey) {
    if (event.code === 'AltLeft' || event.code === 'AltRight' ) {
      toggleSell();
    }
  } else{
  if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
    toggleSell();
  }
}
}
}
});


window.addEventListener("blur", function() {
  if (sellMode) toggleSell();
});


*/

function changeRPGTab(button, tab) { //change menu tabs
  did(button).addEventListener("click", function () {
    if (!did(button).classList.contains("gearButtonLocked") && (!dungeonTime || (tab==="areaTab" || tab==="dungeonTab")) && (stats.currentArea!=="A7" || button!=="shopButton")){
    playSound("audio/button1.mp3")
    did("questTab").style.display = "none";
    did("areaTab").style.display = "none";
    did("shopTab").style.display = "none";
    did("dungeonTab").style.display = "none";

    did(button).style.animation = "none"


    did(tab).style.display = "flex";

    /*if (stats.currentArea==="A7" && button==="shopButton"){
      did("skirmishTab").style.display = "flex";
      did("shopTab").style.display = "none";
    } else did("skirmishTab").style.display = "none";*/

    if (stats.currentArea==="A7" && button==="questButton"){
      did("showdownTab").style.display = "flex";
      did("questTab").style.display = "none";
    } else did("showdownTab").style.display = "none";



    }

    else playSound("audio/thud.mp3")
  });
}

changeRPGTab("questButton", "questTab");
changeRPGTab("areaButton", "areaTab");
changeRPGTab("shopButton", "shopTab");
changeRPGTab("dungeonButton", "dungeonTab");




rpgPlayer.contractedLog = false;

did("combatLogArrow").addEventListener("click", function () { 
  playSound("audio/button2.mp3")
  if (rpgPlayer.contractedLog) {
    rpgPlayer.contractedLog = false;
  } else {
    rpgPlayer.contractedLog = true;
  }
  contractLog();
});

function contractLog() {
  if (rpgPlayer.contractedLog === false) {
    did("combatLog").style.height = "0rem";
    //did("inventory").style.minHeight = "53%";
    did("combatLogArrow").style.transform = "rotateX(0deg)";
  } else {
    did("combatLog").style.height = "70rem";
    did("combatLogArrow").style.transform = "rotateX(180deg)";
    //did("inventory").style.minHeight = "31.3%";
  }
}


rpgPlayer.contractedMenu = true;

did("hideMenu").addEventListener("click", function () { 
  playSound("audio/button2.mp3")
  if (rpgPlayer.contractedMenu) {
    rpgPlayer.contractedMenu = false;
  } else {
    rpgPlayer.contractedMenu = true;
  }
  contractMenu();
});

function contractMenu() {
  if (rpgPlayer.contractedMenu === false) {
    did("lateralMenu").style.width = "3%";
    did("hideMenu").style.transform = "rotateX(180deg)";
    did("tortulogo").style.backgroundImage = "url(img/src/projectiles/none.png)";

    did("botonChangelog").innerHTML = '<img src="img/src/icons/menuHistory.png">';
    did("botonSupport").innerHTML = '<img src="img/src/icons/menuSupport.png">';
    did("botonOpciones").innerHTML = '<img src="img/src/icons/menuSettings.png">';
    did("botonEstadisticas").innerHTML = '<img src="img/src/icons/menuStats.png">';
    did("botonGameGuide").innerHTML = '<img src="img/src/icons/menuGuide.png">';


    did("rpgTab").innerHTML = '<img src="img/src/icons/expedition.png" class="botonLateralMini">';
    did("achievementsTab").innerHTML = '<img src="img/src/icons/achievement.png" class="botonLateralMini">';
    did("jobTab").innerHTML = '<img src="img/src/icons/job.png" class="botonLateralMini">';
    did("campTab").innerHTML = '<img src="img/src/icons/garrison.jpg" class="botonLateralMini">';

    did("panelRecursos").style.opacity = '0';



  } else {

    did("panelRecursos").style.opacity = '1';

    did("botonChangelog").innerHTML = '<p>v '+stats.currentVersion.toFixed(2)+' <strong style="background: transparent; color: orange; font-weight: 900;">(Version History)</strong></p>';
    did("botonSupport").innerHTML = '<p>Support the game ❤️</p>';
    did("botonOpciones").innerHTML = '<p>Settings</p>';
    did("botonEstadisticas").innerHTML = '<p>Statistics</p>';
    did("botonGameGuide").innerHTML = '<p>Game Guide</p>';

    did("rpgTab").innerHTML = '<img src="img/src/icons/expedition.png"><p>Exploration</p>';
    did("achievementsTab").innerHTML = '<img src="img/src/icons/achievement.png"><p>Grand Archive</p>';
    did("jobTab").innerHTML = '<img src="img/src/icons/job.png"><p>Guildwork</p>';
    did("campTab").innerHTML = '<img src="img/src/icons/garrison.jpg"><p>Garrison</p>';

    did("tortulogo").style.backgroundImage = "url(img/src/icons/tortulogo.png)";
    did("lateralMenu").style.width = "14%";
    did("hideMenu").style.transform = "rotateX(0deg)";
  }
}





function returnStampName(stamp){
  if (stamp === "nature1") return "Nature Force I";
  if (stamp === "nature2") return "Nature Force II";
  if (stamp === "nature3") return "Nature Force III";
  if (stamp === "nature4") return "Nature Force IV";
  if (stamp === "might1") return "Might Force I";
  if (stamp === "might2") return "Might Force II";
  if (stamp === "might3") return "Might Force III";
  if (stamp === "might4") return "Might Force IV";
  if (stamp === "elemental1") return "Elemental Force I";
  if (stamp === "elemental2") return "Elemental Force II";
  if (stamp === "elemental3") return "Elemental Force III";
  if (stamp === "elemental4") return "Elemental Force IV";
  if (stamp === "occult1") return "Occult Force I";
  if (stamp === "occult2") return "Occult Force II";
  if (stamp === "occult3") return "Occult Force III";
  if (stamp === "occult4") return "Occult Force IV";
  if (stamp === "deific1") return "Deific Force I";
  if (stamp === "deific2") return "Deific Force II";
  if (stamp === "deific3") return "Deific Force III";
  if (stamp === "deific4") return "Deific Force IV";
  if (stamp === "titan1") return "Titanic Grip I";
  if (stamp === "titan2") return "Titanic Grip II";
  if (stamp === "titan3") return "Titanic Grip III";
  if (stamp === "calibration1") return "Calibration Point I";
  if (stamp === "calibration2") return "Calibration Point II";
  if (stamp === "calibration3") return "Calibration Point III";
  if (stamp === "compensation1") return "Compensation Point I";
  if (stamp === "compensation2") return "Compensation Point II";
  if (stamp === "compensation3") return "Compensation Point III";
  if (stamp === "omni1") return "Omnipotence I";
  if (stamp === "omni2") return "Omnipotence II";
  if (stamp === "omni3") return "Omnipotence III";
  if (stamp === "luck1") return "Serendipity I";
  if (stamp === "luck2") return "Serendipity II";
  if (stamp === "luck3") return "Serendipity III";
  if (stamp === "dynamo1") return "Dynamo I";
  if (stamp === "dynamo2") return "Dynamo II";
  if (stamp === "dynamo3") return "Dynamo III";
  if (stamp === "naturedown") return "<FONT COLOR='#E37CFA'>Nature Affliction 💀";
  if (stamp === "mightdown") return "<FONT COLOR='#E37CFA'>Might Affliction 💀";
  if (stamp === "elementaldown") return "<FONT COLOR='#E37CFA'>Elemental Affliction 💀";
  if (stamp === "deificdown") return "<FONT COLOR='#E37CFA'>Deific Affliction 💀";
  if (stamp === "occultdown") return "<FONT COLOR='#E37CFA'>Occult Affliction 💀";


}

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);



function rUpgBaseMat(id, mode){

  if(mode==="item"){

    if (items[id].level<=3) return "I1"
    else if (items[id].level<=6) return "I51"
    else if (items[id].level<=9) return "I37"
    else if (items[id].level<=10) return "I57"
    else if (items[id].level<=13) return "I114"
    else if (items[id].level<=16) return "I115"
    else if (items[id].level<=19) return "I25"
    else if (items[id].level<=20) return "I165"
    else if (items[id].level<=23) return "I16"
    else if (items[id].level<=26) return "I29"
    else if (items[id].level<=29) return "I17"
    else if (items[id].level<=30) return "I71"
    else if (items[id].level<=33) return "I40"
    else if (items[id].level<=36) return "I58"
    else if (items[id].level<=39) return "I18"
    else if (items[id].level<=40) return "I100"
    else if (items[id].level<=43) return "I346"
    else if (items[id].level<=46) return "I347"
    else if (items[id].level<=49) return "I348"
    else if (items[id].level<=50) return "I350"
    else if (items[id].level<=53) return "I351"
    else if (items[id].level<=56) return "I352"
    else if (items[id].level<=59) return "I353"
    else if (items[id].level<=60) return "I354"


  } else if (mode==="display") {
    return '<FONT COLOR='+returnQualityColor(items[rUpgBaseMat(id, "item")].quality)+'>▪ '+beautify(rUpgBaseMat(id))+'<img src="img/src/items/'+items[rUpgBaseMat(id, "item")].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[rUpgBaseMat(id, "item")].quality)+'">'+items[rUpgBaseMat(id, "item")].name+" <FONT COLOR='gray'>("+beautify(items[rUpgBaseMat(id, "item")].count)+")<br>"

  } else {

    let numString = items[id].level.toString();
    let longitud = numString.length;

    let first;
    let ender;

    if (longitud === 1) {
        first = 0;
        ender = parseInt(numString);
    } else {

      first = parseInt(numString.slice(0, longitud - 1));
      ender = parseInt(numString.slice(longitud - 1));

    }

    let multiplier = 1
    /*
     if (items[id].quality==="Uncommon") multiplier = 3;
    if (items[id].quality==="Rare") multiplier = 6;
    if (items[id].quality==="Epic") multiplier = 9;
    if (items[id].quality==="Mythic") multiplier = 20;
    */
    if (items[id].quality==="Poor") multiplier = 0.5;
    if (items[id].quality==="Uncommon") multiplier = 2;
    if (items[id].quality==="Rare") multiplier = 3;
    if (items[id].quality==="Epic") multiplier = 4;
    if (items[id].quality==="Mythic") multiplier = 5;

    if (ender===0) return 1;
    if (ender===1 || ender===4 || ender===7) return 20 * multiplier;
    if (ender===2 || ender===5 || ender===8) return 30 * multiplier;
    if (ender===3 || ender===6 || ender===9) return 40 * multiplier;

  }

}

function rUpgCapMat(id, mode){

  if(mode==="item"){

    if (items[id].align==="nature") return "I434"
    else if (items[id].align==="might") return "I435"
    else if (items[id].align==="elemental") return "I436"
    else if (items[id].align==="occult") return "I437"
    else if (items[id].align==="deific") return "I438"


  } else if (mode==="display") {
    if (rUpgCapMat(id)!==undefined){
      return '<FONT COLOR='+returnQualityColor(items[rUpgCapMat(id, "item")].quality)+'>▪ '+beautify(rUpgCapMat(id))+'<img src="img/src/items/'+items[rUpgCapMat(id, "item")].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[rUpgCapMat(id, "item")].quality)+'">'+items[rUpgCapMat(id, "item")].name+" <FONT COLOR='gray'>("+beautify(items[rUpgCapMat(id, "item")].count)+")<br>"
    } else return ""

  } 

  else if (mode==="check") { //this checks if players have the cap mat

    if (!("align" in items[id])) return true //rules out armor, doesnt need cap mat

    if (items[upgradeItem].level !== 0 && items[id].level % 10 === 0){ //if its on a cap point check for mats+

      if (items[rUpgCapMat(id, "item")].count>=rUpgCapMat(id)) { //enough mat
        items[rUpgCapMat(id, "item")].count-=rUpgCapMat(id) //discounts it too here why not
        return true 
      } 
      else return false
    } 
    
    return true
  }

  else {

    let multiplier = 1


    if (items[id].level===10) return 1 * multiplier
    else if (items[id].level===20) return 3 * multiplier
    else if (items[id].level===30) return 5 * multiplier
    else if (items[id].level===40) return 8 * multiplier
    else if (items[id].level===50) return 10 * multiplier
    else if (items[id].level===60) return 15 * multiplier

  }

}

function rUpgShells(id, mode){

  /*
  let multiplier = 1
  if (items[id].quality==="Uncommon") multiplier = 6;
  if (items[id].quality==="Rare") multiplier = 12;
  if (items[id].quality==="Epic") multiplier = 18;
  if (items[id].quality==="Mythic") multiplier = 24;
  */

  let multiplier = 3
  if (items[id].quality==="Poor") multiplier = 1;
  if (items[id].quality==="Uncommon") multiplier = 4;
  if (items[id].quality==="Rare") multiplier = 5;
  if (items[id].quality==="Epic") multiplier = 6;
  if (items[id].quality==="Mythic") multiplier = 7;

  if (mode==="display"){
    return '<FONT COLOR=White>▪ '+beautify(rUpgShells(id))+'<img src="img/src/icons/coin.png" style="border: solid 1px white">Shells <FONT COLOR=gray>('+beautify(rpgPlayer.coins)+')<br>'
  } else{
    return (500 * Math.pow(1.05, items[id].level)) * multiplier;

  }
}

let itemCap = 61

did("revealWeaponSkills").addEventListener('click', function() { 
  if (items.I222.count>0 && !items[upgradeItem].revealed && items[upgradeItem].level<items[upgradeItem].cap){
    items.I222.count--;
    addItem();
    items[upgradeItem].revealed=true;
    playSound("audio/button8.mp3");
    upgradeMenu()
    did("tooltipDescription").innerHTML = bestiaryTag("Spend a Golden Magnifying Glass to reveal hidden skills ("+items.I222.count+" available)", "transparent");

   
  } else playSound("audio/thud.mp3");
});


did("revealWeaponSkills").addEventListener("mouseenter", function () {
  did("tooltip").style.display = "flex";
  did("upperTooltip").style.display = "none";
  did("tooltipDescription").innerHTML = bestiaryTag("Spend a Golden Magnifying Glass to reveal hidden skills ("+items.I222.count+" available)", "transparent");
  did("tooltipFlavor").textContent = "";
  did("tooltipDescription").style.textAlign = "center";
  did("tooltipImage").style.display = "none";
  const movingDiv = did("tooltip");
  const referenceDiv = did("revealWeaponSkills");
  const referenceRect = referenceDiv.getBoundingClientRect();
  var newLeft = referenceRect.left;
var newTop = referenceRect.top - movingDiv.offsetHeight;

// Establecer las coordenadas del tooltip
movingDiv.style.left = newLeft - 8+ "px";
movingDiv.style.top = newTop - 13+ "px";
});
did("revealWeaponSkills").addEventListener("mouseleave", function () {
  resetTooltip();
});


function upgradeMenu(){

   playSound("audio/button3.mp3");
   did("upgradeMenu").style.display = "flex";
   did("bodyCover").style.display = "flex";


  if (!("align" in items[upgradeItem])) {
    did("upgradeName").innerHTML = '<img src="img/src/items/'+upgradeItem+'.jpg" style="left:1rem;">'+items[upgradeItem].name+'<br><strong>'+capitalizeFirstLetter(items[upgradeItem].series)+' Series</strong>'
    did("upgradeItem").src = 'img/src/projectiles/none.png'  
    did("upgradeItem").style.display = "none"


  } else {
    did("upgradeItem").style.display = "flex"
    did("upgradeName").innerHTML = '<img src="img/src/items/'+upgradeItem+'.jpg" style="left:1rem;"><img src="img/src/icons/'+items[upgradeItem].align+'.png" style="right:1rem;">'+items[upgradeItem].name+'<br><strong>'+capitalizeFirstLetter(items[upgradeItem].series)+' Series</strong>'
    did("upgradeItem").src = 'img/src/weaponModels/'+upgradeItem+'.png'  
}
    
  did("upgradeName").style.color = returnQualityColor(items[upgradeItem].quality)
    

  did("upgradeItemDescription2").innerHTML = eval(items[upgradeItem].description)+"<br>"+eval(items[upgradeItem].skills)

  did("upgradeLevel").innerHTML = "Upgrade Item"

  did("upgradeButtons").style.display = "flex"
  if (items[upgradeItem].level==itemCap){
    did("upgradeRequired").innerHTML = '<FONT COLOR="gray">Maximum level reached'
    did("upgradeButtons").style.display = "none"
  }
  else if ("align" in items[upgradeItem]){
    did("upgradeRequired").innerHTML = '<FONT COLOR="gray">Required materials to level up:<br><FONT COLOR="white">'+rUpgBaseMat(upgradeItem, "display")+rUpgCapMat(upgradeItem, "display")+rUpgShells(upgradeItem, "display")
  } else {
    did("upgradeRequired").innerHTML = '<FONT COLOR="gray">Required materials to level up:<br><FONT COLOR="white">'+rUpgBaseMat(upgradeItem, "display")+rUpgShells(upgradeItem, "display")
  }

}

function equipCheck(item){

  if (rpgPlayer.chestSlot===item) return true
  if (rpgPlayer.headSlot===item) return true
  if (rpgPlayer.legsSlot===item) return true
  if (rpgPlayer.handsSlot===item) return true
  if (rpgPlayer.feetSlot===item) return true
  if (rpgPlayer.ringSlot===item) return true
  if (rpgPlayer.ceSlot===item) return true
  if (rpgPlayer.weaponSlot===item) return true
  if (rpgPlayer.trinketSlot===item) return true
  return false

}

function upgradeOnce(event){

if (items[upgradeItem].level<itemCap && items[rUpgBaseMat(upgradeItem, "item")].count>=rUpgBaseMat(upgradeItem) && rpgPlayer.coins>=rUpgShells(upgradeItem) && rUpgCapMat(upgradeItem, "check")){


  items[rUpgBaseMat(upgradeItem, "item")].count-=rUpgBaseMat(upgradeItem);
  rpgPlayer.coins-=rUpgShells(upgradeItem);
  addItem();

  items[upgradeItem].level++;

  if (equipCheck(upgradeItem)) eval(items[upgradeItem].stats);
  statsUpdate();
  updateStatsUI();


  did("upgradeButtons").style.display = "flex"
  if (items[upgradeItem].level==itemCap){
    did("upgradeRequired").innerHTML = '<FONT COLOR="gray">Maximum level reached'
    did("upgradeButtons").style.display = "none"
  }
  else if ("align" in items[upgradeItem]){
    did("upgradeRequired").innerHTML = '<FONT COLOR="gray">Required materials to level up:<br><FONT COLOR="white">'+rUpgBaseMat(upgradeItem, "display")+rUpgCapMat(upgradeItem, "display")+rUpgShells(upgradeItem, "display")
  } else {
    did("upgradeRequired").innerHTML = '<FONT COLOR="gray">Required materials to level up:<br><FONT COLOR="white">'+rUpgBaseMat(upgradeItem, "display")+rUpgShells(upgradeItem, "display")
  }

  did("upgradeItemDescription2").innerHTML = eval(items[upgradeItem].description)+"<br>"+eval(items[upgradeItem].skills)


  did("upgradeItem").style.animation = "";
  void did("upgradeItem").offsetWidth;
  did("upgradeItem").style.animation = "useSkill 1s 1";


  event.currentTarget.style.animation = "";
  void event.currentTarget.offsetWidth;
  event.currentTarget.style.animation = "useSkill 1s 1";

  animParticleBurst(7 , "particleSpark", "upgradeItem", 100, "priority");


  playSound("audio/button6.mp3")


} else {
  playSound("audio/thud.mp3")
}
}


function upgradeMax(event){




  if ( items[upgradeItem].level<itemCap && items[rUpgBaseMat(upgradeItem, "item")].count>=rUpgBaseMat(upgradeItem) && rpgPlayer.coins>=rUpgShells(upgradeItem)){
    did("upgradeItem").style.animation = "";
    void did("upgradeItem").offsetWidth;
    did("upgradeItem").style.animation = "useSkill 1s 1";
  
  
    event.currentTarget.style.animation = "";
    void event.currentTarget.offsetWidth;
    event.currentTarget.style.animation = "useSkill 1s 1";
  
    animParticleBurst(7 , "particleSpark", "upgradeItem", 100, "priority");
    playSound("audio/button6.mp3")
  } else  playSound("audio/thud.mp3")


while ( items[upgradeItem].level<itemCap && items[rUpgBaseMat(upgradeItem, "item")].count>=rUpgBaseMat(upgradeItem) && rpgPlayer.coins>=rUpgShells(upgradeItem) && rUpgCapMat(upgradeItem, "check")){
  items[rUpgBaseMat(upgradeItem, "item")].count-=rUpgBaseMat(upgradeItem);
  rpgPlayer.coins-=rUpgShells(upgradeItem);
  items[upgradeItem].level++;
}

  addItem();
  if (equipCheck(upgradeItem)) eval(items[upgradeItem].stats);
  statsUpdate();
  updateStatsUI();

  
  did("upgradeButtons").style.display = "flex"
  if (items[upgradeItem].level==itemCap){
    did("upgradeRequired").innerHTML = '<FONT COLOR="gray">Maximum level reached'
    did("upgradeButtons").style.display = "none"
  }
  else if ("align" in items[upgradeItem]){
    did("upgradeRequired").innerHTML = '<FONT COLOR="gray">Required materials to level up:<br><FONT COLOR="white">'+rUpgBaseMat(upgradeItem, "display")+rUpgCapMat(upgradeItem, "display")+rUpgShells(upgradeItem, "display")
  } else {
    did("upgradeRequired").innerHTML = '<FONT COLOR="gray">Required materials to level up:<br><FONT COLOR="white">'+rUpgBaseMat(upgradeItem, "display")+rUpgShells(upgradeItem, "display")
  }

  did("upgradeItemDescription2").innerHTML = eval(items[upgradeItem].description)+"<br>"+eval(items[upgradeItem].skills)


  





}



//#endregion
//----------------------==========================-----------------------
//----------------------===========MAIL===========-----------------------
//----------------------==========================-----------------------
//#region Mail
settingsPanel ("mailButton", "mailMenu");

function shortenText(text,chars) {
  return text.length > chars ? text.slice(0, chars) + '...' : text;
}

let currentMail = "M1"

function  createMail() {
  for (let i in mail) {
    if (!did(i + "mail") && mail[i].recieved && !mail[i].deleted) {
      const div = document.createElement("div");
      div.className = "mailElement";
      div.id = i + "mail";
      //div.innerHTML = '<div class="mailElement1"><img src="img/src/items/'+mail[i].cover+'.jpg"></div><div class="mailElement2"></div>';
      div.innerHTML = '<div class="mailElement1"><img src="img/src/items/'+mail[i].cover+'.jpg"></div><div class="mailElement2">'+shortenText(mail[i].title,30)+'<br>👤 '+mail[i].sender+'</div><div class="deleteMail" id="'+i+'mailD">❌</div>';
      did("mailList").insertBefore(div, did("mailList").firstChild);
      mailButton(i);

    }

    if (did(i + "mail") && mail[i].read) did(i + "mail").style.filter = "brightness(0.3)";

    
  }
}

function mailButton(id) {
  if (did(id + "mail")) {
    did(id + "mail").addEventListener("click", function () {
      playSound("audio/page.mp3")
      playSound("audio/button4.mp3")
        currentMail = id;
        did("mailLeft").style.visibility = "visible"
        did("mailLeft").innerHTML = '<div class="mailTitle">'+mail[currentMail].title+'</div><div class="mailDescription">'+mail[currentMail].body+'</div>'
        
        
        
        if ("item" in mail[id]){

          const item = new mail[id].item()


          did("mailLeft").innerHTML = '<div class="mailTitle">'+mail[currentMail].title+'</div><div class="mailDescription">'+mail[currentMail].body+'</div><div class="separator" style="margin:2rem 0; background:gray;flex-shrink: 0;"></div><div id="'+item.img+'Mail" class="inventoryItem" style="flex-shrink: 0;border-radius:0.5rem; height:4rem; width:4rem"><img src="img/src/items/I'+item.img+'.jpg"></div>'

          did(item.img+'Mail').item = item

        } 
        
        
        for (let i in mail) { if (did(i + "mail")) {did(i + "mail").classList =  "mailElement"; did(i+"mailD").style.display = "none"}}
        did(id + "mail").classList.add("mailActive");
        if (!mail[id].read) {mail[id].effect()}
        did(id+"mailD").style.display = "flex"
        mail[id].read = true;
        createMail()
        did(id + "mail").style.filter = "brightness(1)"
        
    });
  }}



  document.addEventListener('mousemove', function(event) {
    if (event.target.id && event.target.id.includes("mailItem")) {
        let itemTarget =  event.target.id.replace("mailItem", '');
        did("tooltip").style.display = "flex";
        did("tooltip").style.display = "flex";
        did("tooltipName").textContent = items[itemTarget].name;
        did("tooltipRarity").textContent = items[itemTarget].quality;
        did("tooltipRarity").style.color = returnQualityColor(items[itemTarget].quality);
        did("tooltipName").style.color = returnQualityColor(items[itemTarget].quality);

        did("tooltipFlavor").textContent = items[itemTarget].flavor;
        did("tooltipImage").src = "img/src/items/" + items[itemTarget].img + ".jpg";
        did("tooltipDescription").innerHTML = items[itemTarget].description;
        if (items[itemTarget].dynamic) did("tooltipDescription").innerHTML = eval(items[itemTarget].description);

        did("tooltipPrice").innerHTML = "";
        var movingDiv = did("tooltip");
        var referenceDiv = did(event.target.id);
        var referenceRect = referenceDiv.getBoundingClientRect();
        var newLeft = referenceRect.left;
        var newTop = referenceRect.top - movingDiv.offsetHeight;
        movingDiv.style.left = newLeft - 0+ "px";
        movingDiv.style.top = newTop - 8+ "px";
    }
  });

  document.addEventListener('mouseout', function(event) {
    if (event.target.id && event.target.id.includes("mailItem")) {
        resetTooltip();
    }
  });






  

  document.addEventListener('mousemove', function(event) {
    if (event.target.id && event.target.id.endsWith("mailD")) {
      did("tooltipMagic").style.display = "flex"
      did("tooltipMagic").innerHTML = colorTag("Delete Mail","transparent")
      const movingDiv = document.getElementById("tooltipMagic");
      const newLeft = event.clientX + (window.scrollX || window.pageXOffset) - 10;
      const newTop = event.clientY + (window.scrollY || window.pageYOffset) - 40;
      movingDiv.style.left = newLeft + 'px';
      movingDiv.style.top = newTop + 'px';
    }
  });

  document.addEventListener('mouseout', function(event) {
    if (event.target.id && event.target.id.endsWith("mailD")) {
      did("tooltipMagic").style.display = "none";
    }
  });

  document.addEventListener('click', function(event) {
    if (event.target.id && event.target.id.endsWith("mailD")) {
      did(currentMail + "mail").style.display = "none";
      playSound("audio/close.mp3")
      mail[currentMail].deleted = true;
    }
  });








  did("closeMail").addEventListener("click", function () {  did("mailLetter").style.display = "none"; playSound("audio/page.mp3")  })
  did("mailButton").addEventListener("click", function () {  stats.mailUnread=false; unreadMail()  })

  function unreadMail(){
    if (stats.mailUnread) {
      did('mailButton').src = "img/src/icons/mailUnread.png"
      did('mailButton').style.animation= 'mailShake 9s infinite ease-in-out'
    } else {
      did('mailButton').style.animation= ''
      did('mailButton').src = "img/src/icons/mail.png"
    }

  }

  function sendMail(id){
    if (!mail[id].recieved){
      if (unlocks.mail) createPopup('&#128231; You got Mail!');
      playSound("audio/ring.mp3");
      mail[id].recieved=true;
      createMail();
      did("mailWidget").style.animation = "widgetAlert 2s infinite"
      //stats.mailUnread=true;
      //unreadMail();
    }
    
  }

  function unlockAllMail(){
    for (i in mail) sendMail(i)
  }


  stats.cddailyPresent1 = 5*60
  stats.cddailyPresent2 = 10*60
  stats.cddailyPresent3 = 15*60
  stats.cddailyPresent4 = 20*60
  stats.cddailyPresent5 = 25*60
  stats.cddailyPresent6 = 30*60



  stats.dailyPresent1Claimed = false
  stats.dailyPresent2Claimed = false
  stats.dailyPresent3Claimed = false
  stats.dailyPresent4Claimed = false
  stats.dailyPresent5Claimed = false

setInterval(() => {

dailyPresentTimers()
  
}, 10000);


function dailyPresentTimers(){
  if (did("itemContextMenuDailyPresents").style.display === "flex"){
    stats.cddailyPresent1>0 ? did("dailyPresent1").innerHTML = convertSecondsToHMS( stats.cddailyPresent1, "micro") :  did("dailyPresent1").innerHTML = ""
    stats.cddailyPresent2>0 ? did("dailyPresent2").innerHTML = convertSecondsToHMS( stats.cddailyPresent2, "micro") :  did("dailyPresent2").innerHTML = ""
    stats.cddailyPresent3>0 ? did("dailyPresent3").innerHTML = convertSecondsToHMS( stats.cddailyPresent3, "micro") :  did("dailyPresent3").innerHTML = ""
    stats.cddailyPresent4>0 ? did("dailyPresent4").innerHTML = convertSecondsToHMS( stats.cddailyPresent4, "micro") :  did("dailyPresent4").innerHTML = ""
    stats.cddailyPresent5>0 ? did("dailyPresent5").innerHTML = convertSecondsToHMS( stats.cddailyPresent5, "micro") :  did("dailyPresent5").innerHTML = ""
    stats.cddailyPresent6>0 ? did("dailyPresent6").innerHTML = convertSecondsToHMS( stats.cddailyPresent6, "micro") :  did("dailyPresent6").innerHTML = ""


    stats.cddailyPresent1>0 ? did("dailyPresent1").style.filter = "brightness(0.6)" : did("dailyPresent1").style.filter = "brightness(1)"
    stats.cddailyPresent2>0 ? did("dailyPresent2").style.filter = "brightness(0.6)" : did("dailyPresent2").style.filter = "brightness(1)"
    stats.cddailyPresent3>0 ? did("dailyPresent3").style.filter = "brightness(0.6)" : did("dailyPresent3").style.filter = "brightness(1)"
    stats.cddailyPresent4>0 ? did("dailyPresent4").style.filter = "brightness(0.6)" : did("dailyPresent4").style.filter = "brightness(1)"
    stats.cddailyPresent5>0 ? did("dailyPresent5").style.filter = "brightness(0.6)" : did("dailyPresent5").style.filter = "brightness(1)"
    stats.cddailyPresent6>0 ? did("dailyPresent6").style.filter = "brightness(0.6)" : did("dailyPresent6").style.filter = "brightness(1)"

    
    


    if (did("dailyPresentEmpty").style.display === "flex") {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></g></svg>`

      did("dailyPresentEmpty").innerHTML =`${svg} Come again in ${convertSecondsToHMS( dailyLocalReset())}!`
    }

  }

  if ( (!stats.dailyPresent1Claimed && stats.cddailyPresent1===0 ) || (!stats.dailyPresent2Claimed && stats.cddailyPresent2===0 ) || (!stats.dailyPresent3Claimed && stats.cddailyPresent3===0 ) || (!stats.dailyPresent4Claimed && stats.cddailyPresent4===0 ) || (!stats.dailyPresent5Claimed && stats.cddailyPresent5===0 ) || (!stats.dailyPresent6Claimed && stats.cddailyPresent6===0 )) did("dailyPresentImg").style.animation = "widgetAlert 2s infinite"
  else did("dailyPresentImg").style.animation = "none"
}


  function dailyPresentMenu(){
    
    updateDailyPresents()

    playSound("audio/pop1.mp3")

    did("itemContextMenu").style.display = "flex";
    did("itemContextMenuScreensaver").style.display = "flex";

    did("itemContextMenuDailyPresents").style.display = "flex";

    did("itemContextMenu").style.display = "flex";
    did("itemcontextMenuArrow").style.display = "none";


    const movingDiv = did('itemContextMenu');
    const referenceDiv = did("dailyPresent");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const tooltipWidth = movingDiv.offsetWidth;
    const newLeft = referenceRect.left/ (stats.zoomLevel/100) + referenceRect.width / 2 - tooltipWidth / 2;
    const newTop = referenceRect.bottom/ (stats.zoomLevel/100); 
    
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 20 + 'px';

    

  voidAnimation("itemContextMenu", "interactableTooltipIdleHigh 3s infinite, interactableTooltip 0.3s 1")
  voidAnimation("dailyPresent","gelatine 0.4s 1")

  resetTooltip()
  dailyPresentTimers()

}

function updateDailyPresents(){
  if (  stats.dailyPresent1Claimed && did("dailyPresent1").style.display === "flex") did("dailyPresent1").style.display = "none";
  if (  stats.dailyPresent2Claimed && did("dailyPresent2").style.display === "flex") did("dailyPresent2").style.display = "none";
  if (  stats.dailyPresent3Claimed && did("dailyPresent3").style.display === "flex") did("dailyPresent3").style.display = "none";
  if (  stats.dailyPresent4Claimed && did("dailyPresent4").style.display === "flex") did("dailyPresent4").style.display = "none";
  if (  stats.dailyPresent5Claimed && did("dailyPresent5").style.display === "flex") did("dailyPresent5").style.display = "none";
  if (  stats.dailyPresent6Claimed && did("dailyPresent6").style.display === "flex") did("dailyPresent6").style.display = "none";

    stats.dailyPresent1Claimed && stats.dailyPresent2Claimed && stats.dailyPresent3Claimed && stats.dailyPresent4Claimed && stats.dailyPresent5Claimed && stats.dailyPresent6Claimed ? did("dailyPresentEmpty").style.display = "flex" : did("dailyPresentEmpty").style.display = "none" 

  }

document.querySelectorAll('.dailyPresent').forEach(element => {
  element.onclick = function() {

    console.log(eval("stats.cd"+element.id))
    if (eval("stats.cd"+element.id)>0) return
    particleTrackers.push(new ParticleSellPulse(mousePositionX, mousePositionY,{x:mousePositionX,y:mousePositionY}));
    eval("stats."+element.id+"Claimed = true")
    updateDailyPresents()
    playSound("audio/scrap.mp3");
    playSound("audio/retro2.mp3");

    //spawnItem(returnArrayPick(rareLootTable1))


    if (element.id === "dailyPresent4" || element.id === "dailyPresent5"){
      if (chance(1/2)) spawnItem(returnArrayPick(rareLootTable2))
      else spawnItem(returnArrayPick(rareLootTable1))
    }

    else if (element.id === "dailyPresent6" ) {
      if (chance(1/2)) spawnItem(returnArrayPick(rareLootTable3))
      else spawnItem(returnArrayPick(rareLootTable2))
    }

    else spawnItem(returnArrayPick(rareLootTable1))

    dailyPresentTimers()
    
  };
});


let rareLootTable1 = [Stamp1,CoinPile1,ScutePile1,ChanceDie1]
let rareLootTable2 = [Stamp2,DungeonKey1,UpgradeMaterial0,MonsterSoul,Geode1]
let rareLootTable3 = [ScutePile2,CoinPile2,DungeonKey3,ChanceDie2,Stamp3,DungeonKey2]




setInterval(() => {
  dailyLocalReset()
  biWeeklyReset()
}, 60000);

stats.lastDailyReset = undefined;

function dailyLocalReset() {
  const lastReset = stats.lastDailyReset
  const now = new Date();
  const today = now.toLocaleDateString();

  if (lastReset !== today) {
    stats.lastDailyReset = today
    dailyLocalCooldowns(); 
  }

  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0); 
  const secondsRemaining = (midnight.getTime() - now.getTime()) / 1000;

  return Math.floor(secondsRemaining);
}

function dailyLocalCooldowns(){
  stats.cddailyPresent1 = 5*60
  stats.cddailyPresent2 = 10*60
  stats.cddailyPresent3 = 15*60
  stats.cddailyPresent4 = 20*60
  stats.cddailyPresent5 = 25*60
  stats.cddailyPresent6 = 30*60
  stats.dailyPresent1Claimed = false
  stats.dailyPresent2Claimed = false
  stats.dailyPresent3Claimed = false
  stats.dailyPresent4Claimed = false
  stats.dailyPresent5Claimed = false
  stats.dailyPresent6Claimed = false
  did("dailyPresent1").style.display = "flex"
  did("dailyPresent2").style.display = "flex"
  did("dailyPresent3").style.display = "flex"
  did("dailyPresent4").style.display = "flex"
  did("dailyPresent5").style.display = "flex"
  did("dailyPresent6").style.display = "flex"
}

stats.lastBiWeeklyReset = undefined


function biWeeklyReset() {
  const lastReset = stats.lastBiWeeklyReset
  const now = new Date();
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString().split('T')[0];

  if (!lastReset || Math.floor((new Date(todayUTC) - new Date(lastReset)) / (1000 * 60 * 60 * 24)) >= 3) {
      stats.lastBiWeeklyReset = todayUTC
      biWeeklyCooldowns(); 
  }

  const nextReset = new Date(stats.lastBiWeeklyReset);
  nextReset.setUTCDate(nextReset.getUTCDate() + 3);

  return Math.floor((nextReset - now) / 1000);
}

biWeeklyReset()
dailyLocalReset()


function biWeeklyCooldowns(){
  lotteryCheck()
}







function lotteryCheck(){


  itemInventory.forEach((item, index) => {

     if (item.img === 579 && !item.savedInfo.expired) {

      const prize = lottoMatch(item.savedInfo.number, generateTodaySeed(3))

      item.savedInfo.expired = true
      item.savedInfo.prize = prize
      item.savedInfo.winNumber = generateTodaySeed(3)


      item.invInit()

     }


  })







}



function lottoMatch(num1, num2){
    let str1 = String(num1);
    let str2 = String(num2);
    let count = 0;

    for (let i = 1; i <= Math.min(str1.length, str2.length); i++) {
        if (str1.at(-i) === str2.at(-i)) {
            count++;
        } else {
            break;
        }
    }

    return count;
}


function generateTodaySeed(digits) {
  const seed = new Date().setHours(0, 0, 0, 0);
  let number = "";
  for (let i = 1; i <= digits; i++) {
      number += Math.abs(Math.floor(Math.sin(seed * i) * 10)) % 10;
  }
  return parseInt(number, 10);
}
    



  settingsPanel ("rankButton", "rankMenu");


  function createARank() {
    for (let i in aRank) {
      if (!did(i + "aRank")) {
        const div = document.createElement("div");
        div.id = i + "aRank";
        div.className = "rankSphere";
        div.innerHTML = i.replace('AR', '');

        did("rankList").appendChild(div);

        tooltipARank(i);
      }

      let lastRank = 0;

      if (stats.questsCompleted>=aRank[i].required) {
        did(i + "aRank").classList.add("rankCompleted");
        lastRank = i + "aRank"
      
      }


        const container = document.getElementById('rankList');
        const element = document.getElementById(lastRank);
    setTimeout(() => {
      if (container && element) {
        container.scrollLeft = element.offsetLeft - container.offsetLeft - 40;
    }
    }, 1);
        
    
      
    }
  }


  function tooltipARank(id) {
    did(id+"aRank").addEventListener("mouseenter", function () {
      playSound("audio/button4.mp3")
      did("tooltip").style.display = "flex";
      did("upperTooltip").style.display = "none";
      did("tooltipDescription").innerHTML = bestiaryTag("Super Turtle Rank "+id.replace('AR', ''), "darkorange")+'<FONT COLOR="gray">'+stats.questsCompleted+'/'+aRank[id].required+" Quests Completed Required"
      +bestiaryTag('Rewards', "#435872")+'<FONT COLOR="white">'+eval(aRank[id].reward);
      did("tooltipFlavor").textContent = "";
      did("tooltipDescription").style.textAlign = "center";
      did("tooltipImage").style.display = "none";
      const movingDiv = document.getElementById('tooltip');
const referenceDiv = document.getElementById(id + "aRank");

const movingRect = movingDiv.getBoundingClientRect();
const referenceRect = referenceDiv.getBoundingClientRect();

const newLeft = referenceRect.left + (referenceRect.width / 2) - (movingRect.width / 2);
const newTop = referenceRect.top - movingRect.height;

movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop - 15 + "px";
    });
    did(id+"aRank").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }

 

//#endregion
//----------------------==========================-----------------------
//----------------------===========ARENA==========-----------------------
//----------------------==========================-----------------------
//#region Arena

  did("honorRank").addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipDescription").innerHTML = bestiaryTag("Turtle Gladiator Rank "+(goldenMedalsGot+1), "darkorange")+bestiaryTag("Achieve 1 more Gold Medal to rank up!", "transparent");
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    var movingDiv = did("tooltip");
  var referenceDiv = did("honorRank");
  var referenceRect = referenceDiv.getBoundingClientRect();
  var newLeft = referenceRect.left;
  var newTop = referenceRect.top - movingDiv.offsetHeight;
  
  // Establecer las coordenadas del tooltip
  movingDiv.style.left = newLeft - 8+ "px";
  movingDiv.style.top = newTop - 13+ "px";
  });
  did("honorRank").addEventListener("mouseleave", function () {
    resetTooltip();
  });


settingsPanel ("honorSign", "honorShop");

const returnMinutes = seconds => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
var showdownTimer = 0;
var skirmishTimer = 0;

let goldenMedalsGot = 0;

function createShowdown() {

  for (let i in showdown) {
    if (!did(i + "showdown")) {
      const div = document.createElement("div");
      div.id = i + "showdown";
      div.className = "showdownPanel";
      div.innerHTML = '<img src="img/src/enemies/'+showdown[i].enemy+'M.png"><div class="showdownText"><span>'+enemies[showdown[i].enemy].name+'</span><span class="showdownDifficulty" id="'+i+'showdownDifficulty" >Easy</span><br><span id="'+i+'showdownBestTime">Last Time: None</span><span>0:40</span><span>0:50</span><span>1:00</span></div><div class="showdownMedal"><img id="'+i+'showdownMedal" src="img/src/projectiles/none.png"></div>';
      did("showdownTab").appendChild(div);

      did(i + "showdown").addEventListener("click", function () {
        if (!showdownTime && skirmishTime===false) {
          stats.currentEnemy = showdown[i].enemy; //failsafe
          playSound("audio/arena.mp3")
          deleteEnemy(showdown[i].enemy);
          showdownTime=true;
          did("enemyPanel").style.display = "flex";
          did("showdownUI").style.display = "flex";
          did("honorSign").style.display = "none";
          did("honorPilar").style.display = "none";
          document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(0.5)");
        }
      });

  }

  did(i + "showdownDifficulty").innerHTML = returnDifficulty(showdown[i].difficulty);

  if (showdown[i].bestTime<=60) {did(i + "showdownMedal").src = "img/src/icons/bronzemedal.png";}
  if (showdown[i].bestTime<=50) did(i + "showdownMedal").src = "img/src/icons/silvermedal.png"
  if (showdown[i].bestTime<=40) {did(i + "showdownMedal").src = "img/src/icons/goldmedal.png";}

  if (showdown[i].bestTime<=40 && !showdown[i].once) { showdown[i].once = true; goldenMedalsGot++}

  if (showdown[i].bestTime!=="Undefeated") did(i + "showdownBestTime").innerHTML = 'Last Time: '+returnMinutes(showdown[i].bestTime)

if (goldenMedalsGot>0){
  for (let i = 1; i <= goldenMedalsGot; i++) {
    did("honorShopListing" + i + "Cover").style.display = "none";
}
let img = parseInt(goldenMedalsGot) + 1
for (let i = 1; i <= goldenMedalsGot; i++) { did("honorRank").src = "img/src/icons/gladr"+img+".jpg" }
}


  
  }
}

function endShowdown(){


  updateCounters();
  createShowdown();
  
 
  
  did("enemyPanel").style.display = "none";
  did("showdownUI").style.display = "none";
  did("honorSign").style.display = "flex";
  did("honorPilar").style.display = "flex";
  did("rpgCanvas").style.animation = "";
  void did("rpgCanvas").offsetWidth;
  did("rpgCanvas").style.animation = "rpgFade 1s 1";
  
  void did("expPanel").offsetWidth;
  document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(1)");

  if (showdownTime){

    did(enemies[stats.currentEnemy].showdown+"showdown").style.animation = "";
    showdownTimer=0;
    showdownTime=false;
  }

  if (skirmishTime!==false){
    did("skirmishUI").style.display = "none";
    skirmish[skirmishTime].bestScore = skirmishWave
    skirmishTime=false;
    skirmishPoints=0
    createSkirmish()
  }
  
  showdownCounter();
  createShowdown()

}

function createSkirmish() {
  for (let i in skirmish) {
    if (!did(i + "skirmish")) {
      const div = document.createElement("div");
      div.id = i + "skirmish";
      div.className = "showdownPanel";
      div.innerHTML = '<img src="img/src/enemies/'+i+'.png"><div class="showdownText"><span>'+skirmish[i].name+'</span><span class="showdownDifficulty" id="'+i+'skirmishDifficulty" >Easy</span><br><span id="'+i+'skirmishbestScore">Last Wave: None</span><span>7</span><span>5</span><span>3</span></div><div class="showdownMedal"><img id="'+i+'skirmishMedal" src="img/src/projectiles/none.png"></div>';
      did("skirmishTab").appendChild(div);

      did(i + "skirmish").addEventListener("click", function () {
        if (!showdownTime && skirmishTime===false) {
          playSound("audio/arena.mp3")
          skirmishTimer=90
          stats.currentEnemy = skirmish[i].wave1;
          deleteEnemy(skirmish[i].wave1);
          skirmishTime=i;
          skirmishWave=1;
          did("enemyPanel").style.display = "flex";
          did("skirmishUI").style.display = "flex";
          did("honorSign").style.display = "none";
          did("honorPilar").style.display = "none";
          document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(0.5)");

        }
      });

  }

  did(i + "skirmishDifficulty").innerHTML = returnDifficulty(skirmish[i].difficulty);

  if (skirmish[i].bestScore===7) did(i + "skirmishMedal").src = "img/src/icons/goldmedal.png"
  if (skirmish[i].bestScore<7) did(i + "skirmishMedal").src = "img/src/icons/silvermedal.png"
  if (skirmish[i].bestScore<=4) did(i + "skirmishMedal").src = "img/src/icons/bronzemedal.png"
  if (skirmish[i].bestScore<3) did(i + "skirmishMedal").src = "img/src/projectiles/none.png" //aqui meter un none por si el jugador no llega a oleada 4

  if (skirmish[i].bestScore===7 && !skirmish[i].once) { skirmish[i].once = true; goldenMedalsGot++}



  if (skirmish[i].bestScore!=="Undefeated") did(i + "skirmishbestScore").innerHTML = 'Last Wave: '+skirmish[i].bestScore


}
}


setInterval(() => { showdownCounter() }, 1000);

function showdownCounter(){

if (stats.currentArea === "A7" && showdownTime) {
  showdownTimer++;
  did("showdownUI").innerHTML = returnMinutes(showdownTimer)
}

if (stats.currentArea === "A7" && skirmishTime) {
  skirmishTimer--;
  did("skirmishTimer").innerHTML = 'Wave '+ skirmishWave +" - "+returnMinutes(skirmishTimer)

  if (skirmishTimer<0){
  skirmish[skirmishTime].bestScore = skirmishWave-1;
  skirmishWave=1;
  playSound("audio/startup.mp3");

  did(skirmishTime+"skirmish").style.animation = "";
  void did("expPanel").offsetWidth;
  did(skirmishTime+"skirmish").style.animation = "levelUp 1s 1";

  skirmishTime=false;
  did("enemyPanel").style.display = "none";
  did("skirmishUI").style.display = "none";
  did("rpgCanvas").style.animation = "";
  void did("rpgCanvas").offsetWidth;
  did("rpgCanvas").style.animation = "rpgFade 1s 1";
  createSkirmish()
  document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(1)");
  did("honorSign").style.display = "flex";
  did("honorPilar").style.display = "flex";
  createShowdown()
  }
}

}

function updateSkirmishPoints(){

  let percentageEXP =  (skirmishPoints/10)*100;   
  did('skirmishMeter').style.width = percentageEXP+"%";

  if (skirmishPoints >= 10){

    playSound("audio/heal.mp3");
    skirmishWave++
    skirmishPoints=0
    updateSkirmishPoints();
    did("skirmishUI").style.animation = "";
    void did("expPanel").offsetWidth;
    did("skirmishUI").style.animation = "levelUp 1s 1";

    if (skirmishWave>7) {
      
      skirmish[skirmishTime].bestScore=7
      skirmishWave=1;
      playSound("audio/startup.mp3");

      did(skirmishTime+"skirmish").style.animation = "";
      void did("expPanel").offsetWidth;
      did(skirmishTime+"skirmish").style.animation = "levelUp 1s 1";

      did("honorSign").style.display = "flex";
      did("honorPilar").style.display = "flex";

      skirmishTime=false;
      did("enemyPanel").style.display = "none";
      did("skirmishUI").style.display = "none";
      did("rpgCanvas").style.animation = "";
      void did("rpgCanvas").offsetWidth;
      did("rpgCanvas").style.animation = "rpgFade 1s 1";
      createSkirmish()
      createShowdown()
      document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(1)");

    }

  }
  
}

function createShopHonor() {
  for (let si in shopHonor) {
    if (!did(si + "shopHonor")) {
      const div = document.createElement("div");
      div.id = si + "shopHonor";


      div.innerHTML = '<div class=soldOut id="' + si + 'itemTag">LOCKED</div><div class="itemSlot" id="' + si + 'displayItem"><img id="' + si + 'image" src="img/src/items/' + items[shopHonor[si].item].img + '.jpg"></div>';
      did(shopHonor[si].parent).appendChild(div);
      div.className = "shopItemCasingNoHover";

      did(si + "displayItem").style.outline = returnQualityColor(items[shopHonor[si].item].quality) +" solid 0.15rem";
      honorItemButton(si);
      tooltipShopHonor(si);
    }

    if (shopHonor[si].stock < 1) {
      did(si + "itemTag").style.display = "flex";
      did(si + "itemTag").innerHTML = "SOLD OUT";
    }

  }
} createShopHonor();

function tooltipShopHonor(id) {
  if (did(id + "shopHonor")) {
    did(id + "shopHonor").addEventListener("mouseenter", function () {
      did("tooltip").style.display = "flex";
      did("tooltipName").textContent = items[shopHonor[id].item].name;
      did("tooltipPrice").innerHTML = "Stock: " + shopHonor[id].stock;
      did("tooltipRarity").textContent = items[shopHonor[id].item].quality;

      did("tooltipRarity").style.color = returnQualityColor(items[shopHonor[id].item].quality);
      did("tooltipName").style.color = returnQualityColor(items[shopHonor[id].item].quality);

      did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(shopHonor[id].price) +coinIcon+'Shells<br></div><div class="separador"></div><FONT COLOR="white">' + items[shopHonor[id].item].description;
      if (items[shopHonor[id].item].dynamic) did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(shopHonor[id].price)+coinIcon+'Shells<br></div><div class="separador"></div><FONT COLOR="white">' + eval(items[shopHonor[id].item].description);

      did("tooltipFlavor").textContent = "";
      did("tooltipImage").src = "img/src/items/" + items[shopHonor[id].item].img + ".jpg";

      var movingDiv = did("tooltip");
      var referenceDiv = did(id + "shopHonor");
      var referenceRect = referenceDiv.getBoundingClientRect();
      var referenceLeft = referenceRect.left + 26;
      var referenceTop = referenceRect.top - 15;
      var newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
      var newTop = referenceTop - movingDiv.offsetHeight;
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";
    });
    did(id + "shopHonor").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }



  
}


function honorItemButton(id) {
  if (did(id+ "shopHonor")) {
    did(id + "shopHonor").addEventListener("click", function () {
      if (shopHonor[id].stock && rpgPlayer.coins>=shopHonor[id].price && items[shopHonor[id].item].count!==items[shopHonor[id].item].max ) {
        playSound("audio/button3.mp3");
        rpgPlayer.coins-=shopHonor[id].price
        if (shopHonor[id].stock != "∞") shopHonor[id].stock--;
        items[shopHonor[id].item].count++;
        did(id + "shopHonor").style.animation = "";
        void did(id + "shopHonor").offsetWidth;
        did(id + "shopHonor").style.animation = "useSkill 0.5s 1";
        updateCounters();
        createShopHonor();
        addItem();
      } else {
        playSound("audio/thud.mp3"); 
        did(id + "shopHonor").style.animation = "";
        void did(id + "shopHonor").offsetWidth;
        did(id + "shopHonor").style.animation = "noBuyAnimation 0.2s 1";
      }
    });
  }
}


//#endregion
//----------------------==========================-----------------------
//----------------------===========SKILLS=========-----------------------
//----------------------==========================-----------------------
//#region Skills

did("planetariumButton").addEventListener("click", function (event) {
  //var divAMover = document.getElementById('planetariumNewPos');
  //did("planetariumButton").appendChild(divAMover)

  playSound("audio/button3.mp3");
  playSound("audio/planetarium.mp3");

  /*
  did("planetariumButton").style.height = "200%";
  did("planetariumButton").style.width = "200%";
  */
  did("planetariumButton").style.transition = "2s ease";
  did("planetariumButton").style.borderRadius = "100rem";
  did("planetariumButton").style.height = "100rem";
  did("planetariumButton").style.width = "100rem";

did("planetariumButton").style.scale = "10";
did("planetariumButton").innerHTML = "";
did("planetariumButton").style.filter = "brightness(0)";

did("skillMenu").style.display = "flex";




setTimeout(() => {
  did("skillMenu").style.opacity = "1";

}, 1000);

setTimeout(() => {
  did("bInferior").style.display = "none";

}, 1300);
  /*
  did("skillMenu").style.display = "flex";
  did("bodyCover").style.display = "flex";
  */
  event.stopPropagation();

});


did("exitSkillMenu").addEventListener("click", function (event) {

  playSound("audio/button5.mp3");
  /*
  did("planetariumButton").style.height = "200%";
  did("planetariumButton").style.width = "200%";
  */
  did("planetariumButton").style.transition = "0.3s ease";
  did("planetariumButton").style.borderRadius = "0.3rem";
  did("planetariumButton").style.height = "3.7rem";
  did("planetariumButton").style.width = "3.7rem";
  did("planetariumButton").style.scale = "1";

did("planetariumButton").innerHTML = "🔮";
did("planetariumButton").style.filter = "brightness(1)";

did("bInferior").style.display = "flex";


  did("skillMenu").style.height = "0rem";

setTimeout(() => {
  did("skillMenu").style.display = "none";
  did("skillMenu").style.opacity = "0";
did("skillMenu").style.height = "100%";

}, 500);

  /*
  did("skillMenu").style.display = "flex";
  did("bodyCover").style.display = "flex";
  */
  event.stopPropagation();

});




var zoomelement = document.querySelector('#skillContainer')
panzoom(zoomelement, {
  maxZoom: 1.5,
  minZoom: 0.5,
  zoomDoubleClickSpeed: 1,
});

function createTalent() {
  for (let i in talent) {
    if (!did(i + "talent")) {
      const star = document.createElement("img");
      star.src = "img/src/icons/talentStar.png";
      if (talent[i].category === "Class") star.src = "img/src/icons/talentStarClass.png";
      if (talent[i].category === "Skill") star.src = "img/src/icons/talentStarSkill.png";

      star.id = i + "talent";
      star.className = "talentStar";
      star.style.translate = talent[i].position;
      star.style.filter = "hue-rotate("+talent[i].hue+")"
      did("skillContainer").appendChild(star);
      if ("parent" in talent[i]) {
      var parent = talent[i].parent

      const [startX, startY] = talent[i].position.split(' ');
      const [endX, endY] = talent[parent].position.split(' ');

      drawLine(parseInt(startX, 10), parseInt(startY, 10), parseInt(endX, 10),parseInt(endY, 10));

      }

      if ("parent2" in talent[i]) {
        var parent = talent[i].parent2
  
        const [startX, startY] = talent[i].position.split(' ');
        const [endX, endY] = talent[parent].position.split(' ');
  
        drawLine(parseInt(startX, 10), parseInt(startY, 10), parseInt(endX, 10),parseInt(endY, 10));
  
        }


      tooltipTalents(i)
      talentClick(i)
      

    }


    if (eval(talent[i].lockedLogic)) {
      
      talent[i].locked = false;

      if (talent[i].permanent===false) talent[i].permanent=true
    
    
    } else if (eval(talent[i].lockedLogic)==false) {talent[i].locked = true;}

    if (talent[i].locked===true && talent[i].permanent!==true) did(i + "talent").src = "img/src/icons/talentStarLocked.png";

    else if (talent[i].category === "Class") did(i + "talent").src = "img/src/icons/talentStarClass.png";
    else if (talent[i].category === "Skill") did(i + "talent").src = "img/src/icons/talentStarSkill.png";
    else if (talent[i].category === "Passive") did(i + "talent").src = "img/src/icons/talentStar.png";

    

    if ("parent" in talent[i] && talent[i].active && talent[talent[i].parent].active) {
      var parent = talent[i].parent
      const [startX, startY] = talent[i].position.split(' ');
      const [endX, endY] = talent[parent].position.split(' ');
      drawLine(parseInt(startX, 10), parseInt(startY, 10), parseInt(endX, 10),parseInt(endY, 10), "active");

      did(i + "talent").style.opacity = "1"
      }

    if ("parent2" in talent[i] && talent[i].active  && talent[talent[i].parent2].active) {
      var parent = talent[i].parent2
      const [startX, startY] = talent[i].position.split(' ');
      const [endX, endY] = talent[parent].position.split(' ');
      drawLine(parseInt(startX, 10), parseInt(startY, 10), parseInt(endX, 10),parseInt(endY, 10), "active");

      did(i + "talent").style.opacity = "1"
      }


    
  }
}

function drawLine(x1, y1, x2, y2, state) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext('2d');

  if(state === "active"){
    ctx.lineWidth = 2; 
    ctx.strokeStyle = "rgb(103, 100, 204)";

  } else {
  ctx.lineWidth = 2; 
  ctx.strokeStyle = " rgb(26,24,51)";
  }

  ctx.beginPath();
  ctx.moveTo(x1 + canvas.width / 2, y1 + canvas.height / 2);
  ctx.lineTo(x2 + canvas.width / 2, y2 + canvas.height / 2);
  ctx.stroke();
}

function talentClick(id) {
  if (did(id + "talent")) {
    did(id + "talent").addEventListener("click", function () {
      if (rpgPlayer.debug || 
        ( ((!talent[id].active && id==="T0") || (!talent[id].active && (talent[talent[id].parent].active || talent[talent[id].parent2].active) ) ) && rpgPlayer.talentPoints>0 && (!talent[id].locked || talent[id].permanent===true) )){
      playSound("audio/talent.mp3");
      talent[id].active=true;
      eval(talent[id].effect);
      statsUpdate();
      updateStatsUI();
      createTalent();
      unlocksReveal();

    did(id + "talent").style.animation = "";
    void did(id + "talent").offsetWidth;
    did(id + "talent").style.animation = "talentFlash 0.4s 1 ease";
    did(id + "talent").style.filter = "brightness(10)"
    setTimeout(() => { did(id + "talent").style.filter = "brightness(1) hue-rotate("+talent[id].hue+")" }, 100);

    rpgPlayer.talentPoints--
    updateTalentUI()
  

}

    });
  }
}


function updateTalentUI(){

did("talentCounter").innerHTML = "You have <strong>"+rpgPlayer.talentPoints+"</strong> unspent Wishes"
did("unspentTalent2").innerHTML = rpgPlayer.talentPoints
did("nextTalent").innerHTML = 6-rpgPlayer.talentProgress


let percentageEXP = (rpgPlayer.talentProgress / 6) * 100;
  did("talentPointBar").style.background = "linear-gradient(90deg, #6FB1EE " + percentageEXP + "%, #23232D " + percentageEXP + "%)";

for (let i in talent) {
  if (!did(i + "skill") && talent[i].category==="Skill" && talent[i].active && !i.includes("BASE")) {
    const skilldiv = document.createElement("div");
    skilldiv.id = i + "skill";
    skilldiv.innerHTML = '<img src="img/src/talents/'+i+'.jpg">';
    did("skillWrapper").appendChild(skilldiv);
    skilldiv.className = "skillSlot";
    skilldiv.style.border = "solid 2px " + returnQualityColor(i)


    /*
    VanillaTilt.init(document.querySelector("#" + i + "skill"), {
      max: 20,
      speed: 2000,
      reverse: true,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      perspective: 100,
    });
    */

    tooltipSkill(i, i + "skill")
    getHoveredSkill(i)
    
  }

  if (!did(i + "class") && talent[i].category==="Class" && talent[i].active) {
    const classdiv = document.createElement("div");
    classdiv.id = i + "class";
    classdiv.innerHTML = '<img src="img/src/talents/'+i+'.jpg">';
    did("classWrapper").appendChild(classdiv);
    classdiv.className = "classSlot";
    classdiv.style.border = "solid 2px " + returnQualityColor(i)

    tooltipSkill(i, i + "class")

    classdiv.addEventListener("click", function () { //class change


      if (!dungeonTime) {

      playSound("audio/retro1.mp3");

      if (stats.currentArea === "A7"){
      did("showdownTab").style.display = "none";
      did("skirmishTab").style.display = "none";
      did("areaTab").style.display = "none";
      did("dungeonTab").style.display = "none";
      did("questTab").style.display = "flex";
    }

    

    

      resetAreaButtonClass();
      dungeonPoints = 0;
      dungeonStage=0;
      updateDungeonPoints()
      deleteEnemy();
      
      stats.currentClass = i

      rpgPlayer.skill0 = i+"BASE"
      if (i === 'noClass')  rpgPlayer.skill0 = 'none'

      updateSkills();
      updateClass();


      if (rpgClass[stats.currentClass].level < areas[stats.currentArea].level){
        did("rpgCanvas").style.animation = "";
          void did("rpgCanvas").offsetWidth;
          did("rpgCanvas").style.animation = "rpgFade 1s 1";
        stats.currentArea = "A1";
        switchArea();
        deleteEnemy();

        specialButtonUi();
        updateBGColor()

      }

      did(i + "class").style.animation = "";
      void did(i + "class").offsetWidth;
      did(i + "class").style.animation = "gelatine 0.3s 1";

      animParticleBurst(7 , "particleSpark", "playerPanel", 100);
      animState("rpgPlayerImg", "flash 0.4s 1");
    animImageSplash("soundWave", "playerPanel", "wave", 100);

    createAreaPanel();

    }
  }
    
    );
  


  }

}

}

function learnAllTalents() { for (let i in talent) { talent[i].active = true; updateTalentUI() } }



function changeSkillTab(button, tab) { //change menu tabs
  did(button).addEventListener("click", function () {
    if (unlocks.skills) {
    playSound("audio/button1.mp3")
    did("equipmentTab").style.display = "none";
    did("skillsTab").style.display = "none";
    did(button).style.animation = "none"


    did(tab).style.display = "flex";
    } else playSound("audio/thud.mp3")
  });
}

changeSkillTab("equipmentButton", "equipmentTab")
changeSkillTab("skillsButton", "skillsTab")

const scrollContainer = did("classWrapper");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

let skillHover = "none"

function getHoveredSkill(id) { //assign skills
  document.getElementById(id + "skill").addEventListener('mouseover', function() { skillHover = id });
  document.getElementById(id + "skill").addEventListener('mouseout', function() { skillHover = "none" }); 
}



document.addEventListener('keydown', function (event) {
  if (event.key === '2' && skillHover !== "none" && rpgPlayer.skill2 !== skillHover && rpgPlayer.skill3 !== skillHover && rpgPlayer.skill4 !== skillHover) { rpgPlayer.skill1 = skillHover }
  if (event.key === '3' && skillHover !== "none" && rpgPlayer.skill1 !== skillHover && rpgPlayer.skill3 !== skillHover && rpgPlayer.skill4 !== skillHover) { rpgPlayer.skill2 = skillHover }
  if (event.key === '4' && skillHover !== "none" && rpgPlayer.skill2 !== skillHover && rpgPlayer.skill1 !== skillHover && rpgPlayer.skill4 !== skillHover) { rpgPlayer.skill3 = skillHover }
  if (event.key === '5' && skillHover !== "none" && rpgPlayer.skill2 !== skillHover && rpgPlayer.skill3 !== skillHover && rpgPlayer.skill1 !== skillHover) { rpgPlayer.skill4 = skillHover }

  if (stats.currentCategory === "rpgContainer"){
  if (event.key === '1' && skillHover === "none") castSkill("0")
  if (event.key === '2' && skillHover === "none") castSkill("1")
  if (event.key === '3' && skillHover === "none") castSkill("2")
  if (event.key === '4' && skillHover === "none") castSkill("3")
  if (event.key === '5' && skillHover === "none") castSkill("4")

}

  updateSkills()
});



did("skillSlot0").addEventListener('click', function () { castSkill("0") });
did("skillSlot1").addEventListener('click', function () { castSkill("1") });
did("skillSlot2").addEventListener('click', function () { castSkill("2") });
did("skillSlot3").addEventListener('click', function () { castSkill("3") });
did("skillSlot4").addEventListener('click', function () { castSkill("4") });

function castSkill(number) {

  if (rpgPlayer["skill"+number] !== "none" && eval(talent[rpgPlayer["skill"+number]].cost)<=rpgPlayer.mana && talent[rpgPlayer["skill"+number]].currentCd<=0 && !(stats.currentArea === "A7" && !skirmishTime && !showdownTime) && buffs.B60.time<=0 && buffs.B85.time<=0 && rpgPlayer.alive) {

    if (buffs.B77.time<=0 || (buffs.B77.time>0 && rng(1,3)===1)) { //spell fizz

    playSound("audio/throw.mp3");

  eval(talent[rpgPlayer["skill"+number]].cast);
  did("skillButton"+number).style.animation = "";
  void did("skillButton"+number).offsetWidth;
  did("skillButton"+number).style.animation = "useSkill 0.4s 1 ease";
  if (!settings.disableSkillLog) logPrint(`<FONT COLOR="#18ccba"> You cast ` + talent[rpgPlayer["skill"+number]].name);

  talent[rpgPlayer["skill"+number]].currentCd = talent[rpgPlayer["skill"+number]].cd

  if (talent[rpgPlayer["skill"+number]].currentCd !== 0) did("skillSlot"+number+"CD").style.height = "100%";
  did("skillSlot"+number+"CD").style.transition = "none"
  setTimeout(() => { did("skillSlot"+number+"CD").style.transition = "1s all linear" }, 100);

  rpgPlayer.mana -= eval(talent[rpgPlayer["skill"+number]].cost)
  manaUpdate()
  did("magicBar").style.transition = "none"
  setTimeout(() => { did("magicBar").style.transition = "1s all linear" }, 100);

  if (currentSet==="fossil") castFossilSet()


} else{ //fizz backfire

  did("rpgPlayerImg").style.animation = "";
  void did("rpgPlayerImg").offsetWidth;
  did("rpgPlayerImg").style.animation = "shakeFlash 0.4s 1 ease";

rpgPlayer.mana -= eval(talent[rpgPlayer["skill"+number]].cost)
  manaUpdate()
  did("magicBar").style.transition = "none"
  setTimeout(() => { did("magicBar").style.transition = "1s all linear" }, 100);

  talent[rpgPlayer["skill"+number]].currentCd = talent[rpgPlayer["skill"+number]].cd

  if (talent[rpgPlayer["skill"+number]].currentCd !== 0) did("skillSlot"+number+"CD").style.height = "100%";
  did("skillSlot"+number+"CD").style.transition = "none"
  setTimeout(() => { did("skillSlot"+number+"CD").style.transition = "1s all linear" }, 100);


}

} else {
  did("skillButton"+number).style.animation = "";
  void did("skillButton"+number).offsetWidth;
  did("skillButton"+number).style.animation = "shake 0.4s 1 ease";
}



}
    
    


function exportStars(){


  playSound("audio/talent.mp3")
  createPopup('&#128203 Stars copied to the clipboard!', '#593D5E')

  let talentData;

  talentData = {}; for (const i in talent) { if (talent[i].active && i!=="noClass" && i!=="T0") talentData[i] = talent[i].active;}
  navigator.clipboard.writeText("x0e8pp"+btoa(JSON.stringify(talentData))) //x0e8pp is random bullshit as failsafe


}


function importStars(code){


if (!(code.startsWith("x0e8pp"))) {createPopup('&#10060; Not a valid code!', '#913c3c'); return} 

let starFailsafe = code.substring(6);


let decodedTalents = JSON.parse(atob(starFailsafe))

for (const i in decodedTalents) { if (talent[i].locked && talent[i].permanent!==true) {createPopup('&#10060; Some stars are locked!', '#913c3c'); return} }

  
resetTalentPoints();
items.I26.count--;
did('importStarsMenu').style.display = 'none';
  

for (const i in decodedTalents) {



  

  
  if ((!talent[i].locked || talent[i].permanent===true) && rpgPlayer.talentPoints>0){ //primer failsafe, tienes puntos y no esta bloqueado

    
    talent[i].active = decodedTalents[i];
    rpgPlayer.talentPoints--

  }
  
  


}  

updateTalentUI()
createTalent()



}

function updateSkills() {

  if ( rpgPlayer.skill0 !== "none" ) {
    did("skillSlot0").src = "img/src/talents/" + rpgPlayer.skill0 + ".jpg";
    did("skillButton0").style.border = "2px solid " + returnQualityColor(rpgPlayer.skill0)
  } else removeSkill(0)

  if ( rpgPlayer.skill1 !== "none" ) {
    did("skillSlot1").src = "img/src/talents/" + rpgPlayer.skill1 + ".jpg";
    did("skillButton1").style.border = "2px solid " + returnQualityColor(rpgPlayer.skill1)
  } else removeSkill(1)

  if ( rpgPlayer.skill2 !== "none" ) {
    did("skillSlot2").src = "img/src/talents/" + rpgPlayer.skill2 + ".jpg";
    did("skillButton2").style.border = "2px solid " + returnQualityColor(rpgPlayer.skill2)
  } else removeSkill(2)

  if ( rpgPlayer.skill3 !== "none" ) {
    did("skillSlot3").src = "img/src/talents/" + rpgPlayer.skill3 + ".jpg";
    did("skillButton3").style.border = "2px solid " + returnQualityColor(rpgPlayer.skill3)
  } else removeSkill(3)

  if ( rpgPlayer.skill4 !== "none" ) {
    did("skillSlot4").src = "img/src/talents/" + rpgPlayer.skill4 + ".jpg";
    did("skillButton4").style.border = "2px solid " + returnQualityColor(rpgPlayer.skill4)
  } else removeSkill(4)


  function removeSkill(number){
    did("skillSlot"+number).src = "img/src/icons/skill"+number+"Slot.png";
    did("skillButton"+number).style.border = "none"
  }

}

setInterval(manaRegen, 1000); 
setInterval(manaUpdate, 1000); 

function manaUpdate(){ //purely visual




 //if (rpgPlayer.mana > playerMaxMana ) did('magicBar').style.boxShadow = "inset red 0 0 3px !important"


 let percentageEXP =  (rpgPlayer.mana/playerMaxMana)*100;  
 did('magicBar').style.width = percentageEXP+"%";

 did('magicBar').style.background = rpgClass[stats.currentClass].color

 if (rpgPlayer.mana < playerMaxMana) {

 if (rpgPlayer.skill0!== "none" && eval(talent[rpgPlayer.skill0].cost)>=rpgPlayer.mana) {did("skillSlot0").style.filter = "brightness(0.6)"} else {did("skillSlot0").style.filter = "brightness(1)"}
 if (rpgPlayer.skill1!== "none" && eval(talent[rpgPlayer.skill1].cost)>=rpgPlayer.mana) {did("skillSlot1").style.filter = "brightness(0.6)"} else {did("skillSlot1").style.filter = "brightness(1)"}
 if (rpgPlayer.skill2!== "none" && eval(talent[rpgPlayer.skill2].cost)>=rpgPlayer.mana) {did("skillSlot2").style.filter = "brightness(0.6)"} else {did("skillSlot2").style.filter = "brightness(1)"}
 if (rpgPlayer.skill3!== "none" && eval(talent[rpgPlayer.skill3].cost)>=rpgPlayer.mana) {did("skillSlot3").style.filter = "brightness(0.6)"} else {did("skillSlot3").style.filter = "brightness(1)"}
 if (rpgPlayer.skill4!== "none" && eval(talent[rpgPlayer.skill4].cost)>=rpgPlayer.mana) {did("skillSlot4").style.filter = "brightness(0.6)"} else {did("skillSlot4").style.filter = "brightness(1)"}

}

 if (rpgPlayer.mana-10 > playerMaxMana ) {did('magicBar').style.border = "#FF6600 inset 0.2rem"} else {did('magicBar').style.border = "rgb(119, 119, 129) inset 0.2rem"}


}


function manaRegen(){



  if (rpgPlayer.mana < playerMaxMana ) rpgPlayer.mana += playerManaRegen





}


setInterval(updateSkillCD, 1000); 
function updateSkillCD(){

  for (i in talent) { if ("cast" in talent[i] && talent[i].currentCd>0) talent[i].currentCd-- }
    
  

  if (rpgPlayer.skill0!== "none"){ let percentage = ((talent[rpgPlayer.skill0].currentCd / talent[rpgPlayer.skill0].cd) * 100); did("skillSlot0CD").style.height = percentage+"%";}
  if (rpgPlayer.skill1!== "none"){ let percentage = ((talent[rpgPlayer.skill1].currentCd / talent[rpgPlayer.skill1].cd) * 100); did("skillSlot1CD").style.height = percentage+"%";}
  if (rpgPlayer.skill2!== "none"){ let percentage = ((talent[rpgPlayer.skill2].currentCd / talent[rpgPlayer.skill2].cd) * 100); did("skillSlot2CD").style.height = percentage+"%";}
  if (rpgPlayer.skill3!== "none"){ let percentage = ((talent[rpgPlayer.skill3].currentCd / talent[rpgPlayer.skill3].cd) * 100); did("skillSlot3CD").style.height = percentage+"%";}
  if (rpgPlayer.skill4!== "none"){ let percentage = ((talent[rpgPlayer.skill4].currentCd / talent[rpgPlayer.skill4].cd) * 100); did("skillSlot4CD").style.height = percentage+"%";}
    
 
}




//#endregion
//----------------------==========================-----------------------
//----------------------========GEAR SLOTS========-----------------------
//----------------------==========================-----------------------
//#region Gear

//warning scuffed ass code ahead
function initGear(slot, div) { //Assign individual piece to individual slot
  //initialisation of the gear
  if (slot !== "none") {
    //if something is on the slot variable
    let ID = slot; //id becomes the value of rpgPlayyer.slot
    did(div).innerHTML = ""; //removes the default slot
    if (did(ID + "item")) {
      did(div).appendChild(did(ID + "item"));
    }
    eval(items[ID].stats);
    setBonus();
    statsUpdate();
    updateStatsUI();
  }
}

function initGearAll() { //Assign all pieces to all slots, also resets Haste
  initGear(rpgPlayer.feetSlot, "rpgFeetSlot");
  initGear(rpgPlayer.headSlot, "rpgHeadSlot");
  initGear(rpgPlayer.chestSlot, "rpgChestSlot");
  initGear(rpgPlayer.legsSlot, "rpgLegsSlot");
  initGear(rpgPlayer.handsSlot, "rpgHandsSlot");
  initGear(rpgPlayer.ringSlot, "rpgRingSlot");
  initGear(rpgPlayer.ceSlot, "rpgCeSlot");
  initGear(rpgPlayer.trinketSlot, "rpgTrinketSlot");
  initGear(rpgPlayer.weaponSlot, "rpgWeaponSlot");
  clearInterval(playerAttackInterval);
  playerAttackInterval = setInterval(playerAttack, 2000*playerHaste);

  if (rpgPlayer.weaponSlot!='none') weaponSwap(rpgPlayer.weaponSlot)
}


currentLoadout = 1;
stats.lastLoadout = 1

function updateLoadout(number){

  


  playSound("audio/button1.mp3")

  
  removeGearLoadout("weaponSlot");weaponSwap('W0');
  removeGearLoadout("headSlot");
  removeGearLoadout("chestSlot");
  removeGearLoadout("legsSlot");
  removeGearLoadout("feetSlot");
  removeGearLoadout("handsSlot");
  removeGearLoadout("ringSlot");
  removeGearLoadout("ceSlot");
  removeGearLoadout("trinketSlot");

  currentLoadout = number

  stats.lastLoadout = number


  if (rpgPlayer["L" + currentLoadout + "weaponSlot"] !== "none" && items[rpgPlayer["L" + currentLoadout + "weaponSlot"]].count>0) {
    if (!did(items[rpgPlayer["L" + currentLoadout + "weaponSlot"]].id+"ItemImage")){createItem(items[rpgPlayer["L" + currentLoadout + "weaponSlot"]].id)}; //this checks if the item is present, and if it isnt, creates it on the spot
    gearSwap(items[rpgPlayer["L" + currentLoadout + "weaponSlot"]].id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon") 
  }

  if (rpgPlayer["L" + currentLoadout + "headSlot"] !== "none" && items[rpgPlayer["L" + currentLoadout + "headSlot"]].count>0) { 
    if (!did(items[rpgPlayer["L" + currentLoadout + "headSlot"]].id+"ItemImage")){createItem(items[rpgPlayer["L" + currentLoadout + "headSlot"]].id)}; 
    gearSwap(items[rpgPlayer["L" + currentLoadout + "headSlot"]].id, rpgPlayer.headSlot, "rpgHeadSlot", "head") }
    
  if (rpgPlayer["L" + currentLoadout + "chestSlot"] !== "none" && items[rpgPlayer["L" + currentLoadout + "chestSlot"]].count>0) {
    if (!did(items[rpgPlayer["L" + currentLoadout + "chestSlot"]].id+"ItemImage")){createItem(items[rpgPlayer["L" + currentLoadout + "chestSlot"]].id)};
    gearSwap(items[rpgPlayer["L" + currentLoadout + "chestSlot"]].id, rpgPlayer.chestSlot, "rpgChestSlot", "chest") }

  if (rpgPlayer["L" + currentLoadout + "legsSlot"] !== "none" && items[rpgPlayer["L" + currentLoadout + "legsSlot"]].count>0) {
    if (!did(items[rpgPlayer["L" + currentLoadout + "legsSlot"]].id+"ItemImage")){createItem(items[rpgPlayer["L" + currentLoadout + "legsSlot"]].id)};
    gearSwap(items[rpgPlayer["L" + currentLoadout + "legsSlot"]].id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs") }

  if (rpgPlayer["L" + currentLoadout + "feetSlot"] !== "none" && items[rpgPlayer["L" + currentLoadout + "feetSlot"]].count>0) {
    if (!did(items[rpgPlayer["L" + currentLoadout + "feetSlot"]].id+"ItemImage")){createItem(items[rpgPlayer["L" + currentLoadout + "feetSlot"]].id)};
    gearSwap(items[rpgPlayer["L" + currentLoadout + "feetSlot"]].id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet") }

  if (rpgPlayer["L" + currentLoadout + "handsSlot"] !== "none" && items[rpgPlayer["L" + currentLoadout + "handsSlot"]].count>0) {
    if (!did(items[rpgPlayer["L" + currentLoadout + "handsSlot"]].id+"ItemImage")){createItem(items[rpgPlayer["L" + currentLoadout + "handsSlot"]].id)};
    gearSwap(items[rpgPlayer["L" + currentLoadout + "handsSlot"]].id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands") }

  if (rpgPlayer["L" + currentLoadout + "ringSlot"] !== "none" && items[rpgPlayer["L" + currentLoadout + "ringSlot"]].count>0) {
    if (!did(items[rpgPlayer["L" + currentLoadout + "ringSlot"]].id+"ItemImage")){createItem(items[rpgPlayer["L" + currentLoadout + "ringSlot"]].id)};
    gearSwap(items[rpgPlayer["L" + currentLoadout + "ringSlot"]].id, rpgPlayer.ringSlot, "rpgRingSlot", "ring") }

  if (rpgPlayer["L" + currentLoadout + "trinketSlot"] !== "none" && items[rpgPlayer["L" + currentLoadout + "trinketSlot"]].count>0) {
    if (!did(items[rpgPlayer["L" + currentLoadout + "trinketSlot"]].id+"ItemImage")){createItem(items[rpgPlayer["L" + currentLoadout + "trinketSlot"]].id)};
    gearSwap(items[rpgPlayer["L" + currentLoadout + "trinketSlot"]].id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket") }
    
  if (rpgPlayer["L" + currentLoadout + "ceSlot"] !== "none" && items[rpgPlayer["L" + currentLoadout + "ceSlot"]].count>0) {
    if (!did(items[rpgPlayer["L" + currentLoadout + "ceSlot"]].id+"ItemImage")){createItem(items[rpgPlayer["L" + currentLoadout + "ceSlot"]].id)};
    gearSwap(items[rpgPlayer["L" + currentLoadout + "ceSlot"]].id, rpgPlayer.ceSlot, "rpgCeSlot", "ce") }
  

  did("loadout1").style.outline = "none";
  did("loadout2").style.outline = "none";
  did("loadout3").style.outline = "none";
  did("loadout4").style.outline = "none";
  did("loadout5").style.outline = "none";
  did("loadout6").style.outline = "none";
  did("loadout7").style.outline = "none";
  did("loadout"+currentLoadout).style.outline = "solid 0.13rem white"

    stampStatUp()
    setBonus();
    statsUpdate();
    updateStatsUI();
    addItem();
    resetTooltip();
}


function createItem(i){ //used for loadouts, makes an item appear into your inventory if its not there
  const itemdiv = document.createElement("div");
  itemdiv.id = items[i].id + "item";
  itemCDScreen = ""
  if ("cd" in items[i]) itemCDScreen = '<div class="itemCooldownTimerText" id="'+i+'itemCooldownText"></div> <div class="itemCooldownTimer" id="'+i+'itemCooldown"></div>'
  itemCounter  = ""
  if (items[i].max != 1) itemCounter  = '<div class="itemCount" id="' + items[i].id + "itemCount" + '">'
  itemdiv.innerHTML = itemCDScreen + '<span id="'+i+'ItemOverlay" class="itemOverlay"></span> <img id="'+i+'ItemImage" src = "img/src/items/' + items[i].img + '.jpg">' + itemCounter  + items[i].count + '</div><span id="'+i+'ItemLock" style="display:none" class="itemLock">🔒</span><span id="'+i+'ItemFavorite" style="display:none" class="itemFavorite">⭐</span><span id="'+i+'ItemCondition" style="display:none" class="itemCondition">💎</span>';
  itemdiv.className = "itemSlot";
  did("inventory").appendChild(itemdiv);
  itemdiv.classList.add(items[i].quality)
}

function removeGearLoadout(slot){

  //if (rpgPlayer["L" + currentLoadout + slot] !== "none") {
  if (rpgPlayer["L" + currentLoadout + slot] !== "none") { did("inventory").appendChild(did("rpg"+slot.charAt(0).toUpperCase() + slot.slice(1)).firstChild) ; }

  did("rpg"+slot.charAt(0).toUpperCase() + slot.slice(1)).innerHTML = '<div class="equipmentSlot"><img src="img/sys/'+slot+'.png"></div>';

  if (rpgPlayer["L" + currentLoadout + slot] !== "none") eval(items[rpgPlayer["L" + currentLoadout + slot]].remove);
  
  rpgPlayer[slot] = "none";
  //}
  

}

function gearSwap(ID, slot, div, category) {
  if (did(ID + "item")) {
    if (slot !== "none") {
      eval(items[slot].remove);
    }

  if (did(ID + "item").style.visibility === "hidden")did(ID + "item").style.visibility = "visible"


    if (category === "feet") {
      rpgPlayer.feetSlot = ID;
      rpgPlayer["L" + currentLoadout + "feetSlot"] = ID
    }
    if (category === "head"){
      rpgPlayer.headSlot = ID;
      rpgPlayer["L" + currentLoadout + "headSlot"] = ID
    } 
    if (category === "hands"){
      rpgPlayer.handsSlot = ID;
      rpgPlayer["L" + currentLoadout + "handsSlot"] = ID
    } 
    if (category === "chest"){
      rpgPlayer.chestSlot = ID;
      rpgPlayer["L" + currentLoadout + "chestSlot"] = ID
    } 
    if (category === "legs"){
      rpgPlayer.legsSlot = ID;
      rpgPlayer["L" + currentLoadout + "legsSlot"] = ID
    } 
    if (category === "ring"){
      rpgPlayer.ringSlot = ID;
      rpgPlayer["L" + currentLoadout + "ringSlot"] = ID
    } 
    if (category === "ce"){
      rpgPlayer.ceSlot = ID;
      rpgPlayer["L" + currentLoadout + "ceSlot"] = ID
    } 
    if (category === "trinket"){
      rpgPlayer.trinketSlot = ID;
      rpgPlayer["L" + currentLoadout + "trinketSlot"] = ID
    } 
    if (category === "weapon"){
      rpgPlayer.weaponSlot = ID;
      rpgPlayer["L" + currentLoadout + "weaponSlot"] = ID

    } 





    did(div).innerHTML = "";
    if (did(ID + "item")) {
      did(div).appendChild(did(ID + "item"));
    }
    eval(items[ID].stats);
    if (rpgPlayer.weaponSlot!='none') weaponSwap(rpgPlayer.weaponSlot)
    setBonus();
    stampStatUp();
    statsUpdate();
    updateStatsUI();
    addItem();
    clearInterval(playerAttackInterval);
    playerAttackInterval = setInterval(playerAttack, 2000*playerHaste);;
  }
}

function removeGear(div, slot, path, category) { //right click functionality
  //on right click the piece
  did(div).addEventListener("contextmenu", function () {
    setTimeout(() => {
      
    
    if (slot !== "none") {
      while (did(div).firstChild) {
        did("inventory").appendChild(did(div).firstChild);
      }
    }
    did(div).innerHTML = path;
    let armor = category;
    if (armor === "feet" && rpgPlayer.feetSlot !== "none") {
      eval(items[rpgPlayer.feetSlot].remove);
      rpgPlayer.feetSlot = "none";
      rpgPlayer["L" + currentLoadout + "feetSlot"] = "none"
    }
    if (armor === "head" && rpgPlayer.headSlot !== "none") {
      eval(items[rpgPlayer.headSlot].remove);
      rpgPlayer.headSlot = "none";
      rpgPlayer["L" + currentLoadout + "headSlot"] = "none"
    }
    if (armor === "hands" && rpgPlayer.handsSlot !== "none") {
      eval(items[rpgPlayer.handsSlot].remove);
      rpgPlayer.handsSlot = "none";
      rpgPlayer["L" + currentLoadout + "handsSlot"] = "none"

    }
    if (armor === "chest" && rpgPlayer.chestSlot !== "none") {
      eval(items[rpgPlayer.chestSlot].remove);
      rpgPlayer.chestSlot = "none";
      rpgPlayer["L" + currentLoadout + "chestSlot"] = "none"

    }
    if (armor === "legs" && rpgPlayer.legsSlot !== "none") {
      eval(items[rpgPlayer.legsSlot].remove);
      rpgPlayer.legsSlot = "none";
      rpgPlayer["L" + currentLoadout + "legsSlot"] = "none"

    }
    if (armor === "ring" && rpgPlayer.ringSlot !== "none") {
      eval(items[rpgPlayer.ringSlot].remove);
      rpgPlayer.ringSlot = "none";
      rpgPlayer["L" + currentLoadout + "ringSlot"] = "none"

    }
    if (armor === "ce" && rpgPlayer.ceSlot !== "none") {
      eval(items[rpgPlayer.ceSlot].remove);
      rpgPlayer.ceSlot = "none";
      rpgPlayer["L" + currentLoadout + "ceSlot"] = "none"

    }
    if (armor === "trinket" && rpgPlayer.trinketSlot !== "none") {
      eval(items[rpgPlayer.trinketSlot].remove);
      rpgPlayer.trinketSlot = "none";
      rpgPlayer["L" + currentLoadout + "trinketSlot"] = "none"

    }
    if (armor === "weapon" && rpgPlayer.weaponSlot !== "none") {
      eval(items[rpgPlayer.weaponSlot].remove);
      rpgPlayer.weaponSlot = "none";
      rpgPlayer["L" + currentLoadout + "weaponSlot"] = "none"

      weaponSwap('W0')
    }
    setBonus();
    stampStatUp();
    statsUpdate();
    updateStatsUI();
    addItem();
    resetTooltip();
    clearInterval(playerAttackInterval);
    playerAttackInterval = setInterval(playerAttack, 2000*playerHaste);;
  }, 1);
  });
}

//#region removeGear //All the handlers of the function above

/*
removeGear(
  "rpgFeetSlot",
  rpgPlayer.feetSlot,
  '<div class="equipmentSlot"><img src="img/sys/feetSlot.png"></div>',
  "feet"
);
removeGear(
  "rpgHeadSlot",
  rpgPlayer.headSlot,
  '<div class="equipmentSlot"><img src="img/sys/headSlot.png"></div>',
  "head"
);
removeGear(
  "rpgHandsSlot",
  rpgPlayer.handsSlot,
  '<div class="equipmentSlot"><img src="img/sys/handsSlot.png"></div>',
  "hands"
);
removeGear(
  "rpgChestSlot",
  rpgPlayer.feetSlot,
  '<div class="equipmentSlot"><img src="img/sys/chestSlot.png"></div>',
  "chest"
);
removeGear(
  "rpgLegsSlot",
  rpgPlayer.legsSlot,
  '<div class="equipmentSlot"><img src="img/sys/legsSlot.png"></div>',
  "legs"
);
removeGear(
  "rpgRingSlot",
  rpgPlayer.ringSlot,
  '<div class="equipmentSlot"><img src="img/sys/ringSlot.png"></div>',
  "ring"
);
removeGear(
  "rpgCeSlot",
  rpgPlayer.ceSlot,
  '<div class="equipmentSlot"><img src="img/sys/ceSlot.png"></div>',
  "ce"
);
removeGear(
  "rpgTrinketSlot",
  rpgPlayer.trinketSlot,
  '<div class="equipmentSlot"><img src="img/sys/trinketSlot.png"></div>',
  "trinket"
);
removeGear(
  "rpgWeaponSlot",
  rpgPlayer.weaponSlot,
  '<div class="equipmentSlot"><img src="img/sys/weaponSlot.png"></div>',
  "weapon"
);

*/
//#endregion

function weaponSwap(ID) { //Ui of the weaponmodel 
  did("playerWeapon").src = "img/src/weaponModels/" + ID + ".png";
  if (rpgPlayer.weaponSlot!=="none" && "paint" in items[rpgPlayer.weaponSlot]) {
    did("playerWeapon").style.filter = "hue-rotate("+items[rpgPlayer.weaponSlot].paint+"deg)"
  } else did("playerWeapon").style.filter = ""
}

var currentSet = "none"

function setBonus() {
  let h = rpgPlayer.headSlot;
  let c = rpgPlayer.chestSlot;
  let l = rpgPlayer.legsSlot;
  let f = rpgPlayer.feetSlot;
  let d = rpgPlayer.handsSlot;
  let w = rpgPlayer.weaponSlot;
  let t = rpgPlayer.trinketSlot;
  let r = rpgPlayer.ringSlot;

  if (h === "I3" && c === "I5" && l === "I6" && f === "I2" && d === "I4") { //cloth
    did("rpgPlayerImg").src = "img/src/armor/A1.png";
    currentSet = "cloth";
    logs.L1P21.unlocked=true;
  } 
  else if (h === "I133" && c === "I135" && l === "I136" && f === "I132" && d === "I134") { //jungle king
    did("rpgPlayerImg").src = "img/src/armor/A4.png";
    currentSet="tiger";
    logs.L1P21.unlocked=true;
    updateAlignUi();
  }
  else if ( f === "I138" &&  h === "I139" && d === "I140" && c === "I141" && l === "I142") { //pringu
    did("rpgPlayerImg").src = "img/src/armor/A7.png";
    currentSet="pringu";
    logs.L1P21.unlocked=true;
  }
  else if ( f === "I143" &&  h === "I144" && d === "I145" && c === "I146" && l === "I147") { //captain
    did("rpgPlayerImg").src = "img/src/armor/A8.png";
    currentSet="captain";
    logs.L1P21.unlocked=true;
    did("rpgPlayerImg").style.opacity = 0.8
  } 
  else if ( h === "I74" && c === "I76" && l === "I77" && f === "I73" && d === "I75" ) { //explorer
    did("rpgPlayerImg").src = "img/src/armor/A3.png";
    currentSet="explorer";
    logs.L1P21.unlocked=true;
    updateAlignUi();
  }
  else if ( f === "I329" &&  h === "I330" && d === "I331" && c === "I332" && l === "I333") { //nightmare
    did("rpgPlayerImg").src = "img/src/armor/A6.png";
    did("armorFlair").src = "img/src/armor/A6F.png";
    did("armorFlair").style.animation = "nightmareFlair 13s infinite";
    currentSet="nightmare";
  }
  else if ( f === "I334" &&  h === "I335" && d === "I336" && c === "I337" && l === "I338") { //fossil
    did("rpgPlayerImg").src = "img/src/armor/A10.png";
    currentSet="fossil";
  }
  else if ( f === "I339" &&  h === "I340" && d === "I341" && c === "I342" && l === "I343") { //lightbringer
    did("rpgPlayerImg").src = "img/src/armor/A11.png";
    did("armorFlair").src = "img/src/armor/A11F.png";
    did("armorFlair").style.animation = "lightbringerFlair 4s infinite";
    currentSet="lightbringer";
  }
  else if ( h === "I59" ) { //frog hat
    did("rpgPlayerImg").src = "img/src/armor/A5.png";
    resetTierAppearance()
  } 
  else if ( h === "I385" ) { //alien head
    did("rpgPlayerImg").src = "img/src/armor/A13.png";
    resetTierAppearance()
  } 
  else if ( h === "I384" && r === "I383") { //grandad set
    did("rpgPlayerImg").src = "img/src/armor/A12.png";
    animState("rpgPlayerImg", "flash 0.3s 1");
    
    
    resetTierAppearance()
  } 
  else if ( h === "I384" ) { //grandad
    did("rpgPlayerImg").src = "img/src/armor/A12.png";
    resetTierAppearance()
  } 
  else if ( h === "I344" ) { //mudkip hat
    did("rpgPlayerImg").src = "img/src/armor/A2.png";
    resetTierAppearance()
  } 
  else { //no tier
    did("rpgPlayerImg").src = "img/src/armor/A0.png";
    did("armorFlair").src = "img/src/projectiles/none.png";
    currentSet = "none";
    did("rpgPlayerImg").style.opacity = 1;
  }

  function resetTierAppearance(){
    currentSet = "none";
    did("rpgPlayerImg").style.opacity = 1;
    did("armorFlair").src = "img/src/projectiles/none.png";

  }

  if ( h !== "none" && c !== "none" && l !== "none" && f !== "none" && d !== "none" && w !== "none" && t !== "none" && r !== "none" ) logTrackFullSlots = true;


  if (items.I389.statUp!=="none") did("rpgPlayerImg").src = "img/src/armor/"+items.I389.statUp+".png";
  


}

function updateAlignUi(){

  if (rpgPlayer.align === 'none') did('turtleAlign').style.display = "none"
  else did('turtleAlign').style.display = "inline";

  if (rpgPlayer.align === 'nature') did('turtleAlign').src='img/src/icons/nature.png'
  if (rpgPlayer.align === 'might') did('turtleAlign').src='img/src/icons/might.png'
  if (rpgPlayer.align === 'elemental') did('turtleAlign').src='img/src/icons/elemental.png'
  if (rpgPlayer.align === 'deific') did('turtleAlign').src='img/src/icons/deific.png'
  if (rpgPlayer.align === 'occult') did('turtleAlign').src='img/src/icons/occult.png'



}updateAlignUi()
















































//#endregion
//----------------------==========================-----------------------
//----------------------=========TOOLTIPS=========-----------------------
//----------------------==========================-----------------------
//#region Tooltips


function updateStampMenu(){

  var stamp1 = "";
  var stamp2 = "";
  var stamp3 = "";

  if ("stamp1" in items[rpgPlayer.weaponSlot]) stamp1 = '<FONT COLOR=#42a7f5>[Stamps]<FONT COLOR="white"><br>'+ stampIcon + '<span class="logStat"> '+returnStampName(items[rpgPlayer.weaponSlot].stamp1)+'</span>'
  if ("stamp2" in items[rpgPlayer.weaponSlot]) stamp2 = '<br>' + stampIcon + '<span class="logStat"> '+returnStampName(items[rpgPlayer.weaponSlot].stamp2)+'</span>'
  if ("stamp3" in items[rpgPlayer.weaponSlot]) stamp3 = '<br>' + stampIcon + '<span class="logStat"> '+returnStampName(items[rpgPlayer.weaponSlot].stamp3)+'</span>'

  did("stampMenuDescription").innerHTML = stamp1+stamp2+stamp3+"<br><br>"

}

statTips = [

'<FONT COLOR="#edd585">Be sure to pay attention to alignments!<br><br><img id="chartImage" src="img/src/icons/alignChart.png">',

]

function tooltipStatsHelpingDuck() {
  let tipNumber = 0;

  

    did('statsHelpingDuck').addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";

    did("tooltipArrowRight").style.top = "30%";
    did("tooltipDescription").innerHTML = statTips[tipNumber];
    if (tipNumber===1)did("tooltipArrowRight").style.top = "10%";

      

      var movingDiv = did("tooltip");
      var referenceDiv = did('statsHelpingDuck');
      var referenceRect = referenceDiv.getBoundingClientRect();
      var referenceLeft = referenceRect.left - movingDiv.offsetWidth - 10; // Cambiar aquí para posicionar la parte superior derecha del tooltip en la parte superior izquierda del item
      var referenceTop = referenceRect.top ;
      var newLeft = referenceLeft;
      var newTop = referenceTop;
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";
      did("tooltipArrow").style.display = "none";
      did("tooltipArrowRight").style.display = "flex";
      
    });
    did('statsHelpingDuck').addEventListener("mouseleave", function () {
      resetTooltip();
    });
}tooltipStatsHelpingDuck()

inventoryTips = [

  '<FONT COLOR="#edd585">There is no limit of how many items you can have on the inventory (at least i didnt code one...!)<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Hold Control to sell your items.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Gear marked as "Unique" will level up with multiple copies of itself, but only if they have a roman numeral at the side of their name.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Drops marked with a ★ are rare and wont be increased by the Drop Bonus stat.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Is the enemy too hard? Be sure to check its description and skills to fight accordingly.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Complete missions to receive useful rewards in the mail.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">You can buy multiple items at once in the shop by pressing Control.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Defeating low-level enemies can yield more materials and money at the expense of experience.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Area bosses are a great source of experience.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Attributes marked with '+scalingIcon+'have unusually high upgrade scaling.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">The materials found in chests scale with your progress, so be sure to always open them for easy drops.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',



]

function tooltipInventoryHelpingDuck() {
  let tipNumber = 0;
  did('inventoryHelpingDuck').addEventListener("click", function () {
    tipNumber++
    if (tipNumber>inventoryTips.length-1) tipNumber = 0

    playSound("audio/button3.mp3")

    did("tooltipArrowRight").style.top = "30%";
    did("tooltipDescription").innerHTML = inventoryTips[tipNumber];


    const movingDiv = did("tooltip");
    const referenceDiv = did("inventoryHelpingDuck");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 40;
    const referenceTop = referenceRect.top - 18;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";

  })

    did('inventoryHelpingDuck').addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";

    did("tooltipDescription").innerHTML = inventoryTips[tipNumber];

    const movingDiv = did("tooltip");
    const referenceDiv = did("inventoryHelpingDuck");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 40;
    const referenceTop = referenceRect.top - 18;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
      
    });
    did('inventoryHelpingDuck').addEventListener("mouseleave", function () {
      resetTooltip();
    });
}tooltipInventoryHelpingDuck()

let tooltipHover = "nothing"

function tooltipShopItem(outcome, shop) {
  if (did(outcome.id + "shopItem")) {
    did(outcome.id + "shopItem").addEventListener("mouseenter", function () {

      let currency = '<img src="img/src/icons/coin.png"> Shells'
      if ("currency" in shopItems[shop]) currency = '<img src="img/src/items/'+shopItems[shop].currency+'.jpg"> ' + items[shopItems[shop].currency].name

      if ( outcome.unlocked !== false){

      tooltipHover = "shopItem"

      

     

    }

    var itemSkills = ""

    if ("skills" in items[outcome.item]) { 
      itemSkills = "<br>"+eval(items[outcome.item].skills)
    }


      did("tooltip").style.display = "flex";
      did("tooltipName").textContent = items[outcome.item].name;
      if (sellMode) did("tooltipName").textContent = items[outcome.item].name+" x10";
      did("tooltipPrice").innerHTML = "Stock: " + outcome.stock;
      did("tooltipRarity").textContent = items[outcome.item].quality;

      did("tooltipRarity").style.color = returnQualityColor(items[outcome.item].quality);
      did("tooltipName").style.color = returnQualityColor(items[outcome.item].quality);

      let unlockCondition = ""
      if (outcome.unlocked===false) unlockCondition = outcome.unlockDescription

      did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(shopItems[shop].price)) + ' '+currency+'<br></div><div class="separador"></div><FONT COLOR="white">' + unlockCondition +  items[outcome.item].description + itemSkills + '<br><div class="separador"></div>';
      if (items[outcome.item].upgradeable || items[outcome.item].dynamic) did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(shopItems[shop].price)) + ' '+currency+'<br></div><div class="separador"></div><FONT COLOR="white">' + unlockCondition +  eval(items[outcome.item].description) +  itemSkills +'<br><div class="separador"></div>';

      if (sellMode) did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(shopItems[shop].price)*10) + ' '+currency+'<br></div><div class="separador"></div><FONT COLOR="white">' + unlockCondition +  items[outcome.item].description + '<br><div class="separador"></div>';
      if (sellMode && items[outcome.item].upgradeable || sellMode && items[outcome.item].dynamic) did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(shopItems[shop].price)*10) + ' '+currency+'<br></div><div class="separador"></div><FONT COLOR="white">' + unlockCondition +  eval(items[outcome.item].description) + '<br><div class="separador"></div>';
      did("tooltipFlavor").textContent = items[outcome.item].flavor;
      did("tooltipImage").src = "img/src/items/" + items[outcome.item].img + ".jpg";
      var movingDiv = did("tooltip");
      var referenceDiv = did(outcome.id + "shopItem");
      var referenceRect = referenceDiv.getBoundingClientRect();
      var referenceLeft = referenceRect.left;
      var referenceTop = referenceRect.top - 45;
      var newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
      var newTop = referenceTop - movingDiv.offsetHeight;
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";
    });
    did(outcome.id + "shopItem").addEventListener("mouseleave", function () {
      resetTooltip();
      tooltipHover = "nothing"
    });
  }
}

function tooltipEnemies() {
  did("enemyInfo").addEventListener("mouseenter", function () {

    if (buffs.B51.time<1){
    //on mouseenter
    did("tooltip").style.display = "flex";

    did('tooltip').style.minWidth = "50rem"; 

    did("tooltipName").innerHTML = enemies[stats.currentEnemy].name;

    if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty))
      did("tooltipPrice").innerHTML = "Gathered:" + beautify(enemies[stats.currentEnemy].killCount);
    else {

      const atkIcon = `<svg style="background:transparent;translate:0 0.2rem" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M19.071 3.929a1 1 0 0 1 1 1v5.657a1 1 0 0 1-.405.804l-7.198 5.32l.946.947a1 1 0 0 1 0 1.414L12 20.485a1 1 0 0 1-1.154.187l-2.184-1.091l-1.612 1.611a1 1 0 0 1-1.414 0l-2.828-2.828a1 1 0 0 1 0-1.414l1.611-1.612l-1.091-2.184A1 1 0 0 1 3.515 12l1.414-1.414a1 1 0 0 1 1.414 0l.947.946l5.32-7.198a1 1 0 0 1 .804-.405z"/></g></svg>`
      const hpIcon = `<svg style="background:transparent;translate:0 0.2rem" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501C7.5.825 2 4.274 2 9.137"/></svg>`


      did("tooltipPrice").innerHTML = `Defeated: ${beautify(enemies[stats.currentEnemy].killCount)}<br>
      <span style="color:gray;font-size:1.6rem;background:transparent">${beautify(enemies[stats.currentEnemy].hp())+hpIcon}<br>${beautify(enemies[stats.currentEnemy].attack())+atkIcon}</span>`;



    }

    if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) did("tooltipRarity").textContent = "Resource";
    else if ("align" in enemies[stats.currentEnemy]) did("tooltipRarity").innerHTML = "Enemy"+ '<br><img class="alignTooltipIcon" src="img/src/icons/'+enemies[stats.currentEnemy].align+'.png"></img>'; 
    else did("tooltipRarity").innerHTML = "Enemy";

    did("tooltipRarity").style.color = "white";
    did("tooltipName").style.color = "white";
    did("tooltipArrow").style.display = "none";

    let dropDesc = ""

    //if ("bestiaryItem" in enemies[stats.currentEnemy]) dropDesc = ''+bestiaryTag("Dedicated Drops", "#997151")+eval(enemies[stats.currentEnemy].bestiaryItem) ;
    //if ("bestiaryItemAlt" in enemies[stats.currentEnemy]) dropDesc = '<br><br><FONT COLOR="#edd585">Dedicated Drops:<br>'+eval(enemies[stats.currentEnemy].bestiaryItemAlt) ;

    if ("lootTable" in enemies[stats.currentEnemy]){
      const returnedOdds = enemies[stats.currentEnemy].lootTable()
      dropDesc = bestiaryTag("Dedicated Drops", "#997151");
      for (i in returnedOdds) {
        if (returnedOdds[i].l !== undefined && !returnedOdds[i].l()) continue //condition for dropping
        dropDesc += dropInfo(eval(i), returnedOdds[i].c, returnedOdds[i].a,"drop")+"<br>"
      }
    }



    if (enemies[stats.currentEnemy].contextTooltip!==undefined) {
    did("contextList").innerHTML = ""
    const lista = enemies[stats.currentEnemy].contextTooltip()
    lista.forEach(i => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "tooltipContext"
      itemDiv.innerHTML = i
      did("contextList").appendChild(itemDiv);
    });
  }

    


    let skilldesc = ""
    if ("bestiarySkills" in enemies[stats.currentEnemy]) skilldesc = ''+bestiaryTag("🌠 Skills 🌠", "#7B6890")+'<FONT COLOR="#edd585">'+enemies[stats.currentEnemy].bestiarySkills()
    
    did("tooltipDescription").innerHTML =  "<span>"+enemies[stats.currentEnemy].description+skilldesc+dropDesc+"</span>"

    did("tooltipFlavor").textContent = "";
    did("tooltipImage").src = "img/src/enemies/" + stats.currentEnemy + "M.png";

    if (stats.currentEnemy.startsWith("R")){ //overwrites everything if its a skirmish monster)
      did("tooltipImage").src = "img/src/enemies/S1.png";
      did("tooltipDescription").innerHTML = "A powerful contender from the monster arena. Defeat as many as you can to advance the waves and dont drop your guard down!"
    }
    //position related code
    const movingDiv = did("tooltip");
    const referenceDiv = did("enemyInfo");
    const referenceRect = referenceDiv.getBoundingClientRect();
    
    // Calcula las nuevas coordenadas
    var referenceRight = referenceRect.right / (stats.zoomLevel/100); 
    var referenceTop = referenceRect.top / (stats.zoomLevel/100);   
    
    // Ajusta para que la esquina inferior derecha del tooltip coincida
    var newLeft = referenceRight - movingDiv.offsetWidth;
    var newTop = referenceTop - movingDiv.offsetHeight;
    
    movingDiv.style.left = newLeft + 2 + "px";
    movingDiv.style.top = newTop + -25 + "px";

  }
  
  });

  did("enemyInfo").addEventListener("mouseleave", function () {
    resetTooltip();
  });
} tooltipEnemies();

function tooltipBuffs() {
  for (let b in buffs) {
    if (did(b + "buff")) {
      did(b + "buff").addEventListener("mouseenter", function () {
        //on mouseenter
        did("tooltip").style.display = "flex";
        did("tooltipName").textContent = buffs[b].name;
        did("tooltipPrice").innerHTML = convertSecondsToHMS(buffs[b].time);
        did("tooltipRarity").textContent = "Buff";
        did("tooltipRarity").style.color = "#83e781";
        if (buffs[b].food) did("tooltipRarity").textContent = "Food Buff";
        if (buffs[b].potion) did("tooltipRarity").textContent = "Potion Buff";
        if (buffs[b].food) did("tooltipRarity").textContent = "Food Buff";
        if (buffs[b].debuff) {did("tooltipRarity").textContent = "Debuff"; did("tooltipRarity").style.color = "#bf3b32";}


        did("tooltipName").style.color = "white";


        let buffremove = ""

        if (!buffs[b].debuff && buffs[b].position==="player") buffremove = `<div class="separador"></div><span style="display:flex;justify-content:center;align-items:center;color:gray">Click to remove this buff</span>`


        did("tooltipDescription").innerHTML = buffs[b].description+buffremove;
        did("tooltipFlavor").textContent = "";
        did("tooltipImage").src = buffs[b].img;

        //position related code
        const movingDiv = did("tooltip");
        const referenceDiv = did(b + "buff");
        const referenceRect = referenceDiv.getBoundingClientRect();

        var newLeft = referenceRect.left/(stats.zoomLevel/100);
        var newTop = (referenceRect.top - movingDiv.offsetHeight)/(stats.zoomLevel/100);

        movingDiv.style.left = newLeft - 3+ "px";
        movingDiv.style.top = newTop - 10+ "px";

        if (buffs[b].position==="global") {
        const newLeft = referenceRect.left;
        const newTop = referenceRect.bottom;

        movingDiv.style.left = newLeft + "px";
        movingDiv.style.top = newTop + 10 + "px";
        }

      });
      did(b + "buff").addEventListener("mouseleave", function () {
        resetTooltip();
      });
    }
  }
}



function tooltipAreas(id) {
  if (did(id + "area")) {
    did(id + "area").addEventListener("mouseenter", function () {
      //on mouseenter
      did("tooltip").style.display = "flex";
      did("tooltipName").textContent = areas[id].name;
      did("tooltipPrice").innerHTML = "";
      did("tooltipRarity").textContent = "Area";
      did("tooltipRarity").style.color = "white";
      did("tooltipName").style.color = "white";

      if (areas[id].dungeon) did("tooltipRarity").textContent = "Dungeon"



      let description1 = "<FONT COLOR='white'>Select this area to travel to " + areas[id].name + "<br>"
      if (areas[id].locked!==false) description1 = `<FONT COLOR='coral'>${areas[id].locked}<br>`

      let description2 = ""

      if (areas[id].charges===0) { description2 = 'You need to wait '+colorTag(convertSecondsToHMS(areas[id].dungeonTimer, "mini"), "#e03841")+' to enter this Dungeon again or use a '+colorTag("Dungeon Voucher", "#4065c2")+'<br><div class="separador"></div>';}
      else if (areas[id].charges!==3 && areas[id].dungeon) { description2 = 'You can enter this dungeon '+colorTag(areas[id].charges, "#e03841")+' more times<br><div class="separador"></div>';}
      else description2 = ""       

      did("tooltipDescription").innerHTML = description1 + description2



      did("tooltipFlavor").textContent = areas[id].description;
      did("tooltipImage").src = "img/src/areas/" + id + "M.png";
      //position related code
      const movingDiv = did("tooltip");
const referenceDiv = did(id + "area");
const referenceRect = referenceDiv.getBoundingClientRect();

// Calcula la nueva posición del tooltip
const newLeft = referenceRect.left/(stats.zoomLevel/100); // Izquierda igual que la referencia
const newTop = referenceRect.bottom/(stats.zoomLevel/100); // Fondo de la referencia

// Aplica las nuevas posiciones al tooltip
movingDiv.style.left = `${newLeft}px`;
movingDiv.style.top = `${newTop+15}px`;
    });
    did(id + "area").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }
}

function tooltipTalents(id) {
  if (did(id + "talent")) {
    did(id + "talent").addEventListener("mouseenter", function () {

      did("tooltip").style.display = "flex"; 
      did("tooltip").style.backgroundImage = "url(img/sys/space.gif)";
      did("tooltipName").textContent = talent[id].name;
      did("tooltipRarity").textContent = talent[id].category;

      did("tooltipArrow").style.display = "none";
      did("tooltipArrowRight").style.display = "flex";
      did("tooltipArrowRight").style.top = "54%";

      did("tooltipName").style.color = returnQualityColor(id);
      did("tooltipRarity").style.color = returnQualityColor(id);

      let description2 = "";
      if (!talent[id].active) description2 = '<br><br><div class="separador"></div>'+bestiaryTag("Click to wish on this star", "#0972C1")

      let description1 = "";

      if ("parent" in talent[id]) description1 = colorTag("Requires "+talent[talent[id].parent].name, "#de5757", "nobr")+ '<br><br>';
      if ("parent" in talent[id] && talent[talent[id].parent].active) description1 =  colorTag("Requires "+talent[talent[id].parent].name, "#279B4F", "nobr")+ '<br><br>';
      if ("parent2" in talent[id]) description1 = colorTag("Requires "+talent[talent[id].parent].name+ ' or ' + talent[talent[id].parent2].name , "#de5757", "nobr")+ '<br><br>';
      if ("parent2" in talent[id] && (talent[talent[id].parent].active || talent[talent[id].parent2].active)) description1 = colorTag("Requires "+talent[talent[id].parent].name+ ' or ' + talent[talent[id].parent2].name , "#279B4F", "nobr")+ '<br><br>';

      let descriptionLock = ""
      if ("locked" in talent[id]) descriptionLock = colorTag("🔒 "+talent[id].lockedCondition, "#735494")+ '<br><br>';

      let classDescription = "";
      if (talent[id].category==='Class') classDescription = '<span class="questProgress">Current Level: '+ rpgClass[id].level + '/'+ rpgClass[id].maxLevel+'</span><br><br>';

      let castDescription = ""
      if ("cast" in talent[id]) castDescription = "<span style='color:gray'>Uses "+eval(talent[id].cost)+" Magic<br>"+talent[id].cd+"s Cooldown</span><br><br>"

      let bonusDescription = ""
      if (talent[id].category === "Class" && id!=="noClass") bonusDescription = "<br><br>"+ bestiaryTag("Innate Skill: "+talent[id+"BASE"].name, "#9C4BB9") + "<span style='color:gray'>Uses "+eval(talent[id+"BASE"].cost)+" Magic<br>"+talent[id+"BASE"].cd+"s Cooldown</span><br><br>"+ eval(talent[id+"BASE"].description) + '<br><br>';

      
      did("tooltipDescription").innerHTML = description1 + descriptionLock + classDescription + castDescription + '<FONT COLOR="lightgray">'+ eval(talent[id].description) + bonusDescription + description2

      did("tooltipFlavor").textContent = "";
      did("tooltipImage").src = "img/src/talents/" + id + ".jpg";

      did("tooltipPrice").innerHTML = '<FONT COLOR="#ff1f1f">Inactive';
      if (talent[id].active) did("tooltipPrice").innerHTML ='Active'

      const movingDiv = document.getElementById("tooltip");
      const referenceDiv = document.getElementById(id + "talent");
      
      const referenceRect = referenceDiv.getBoundingClientRect();
      const referenceCenterX = referenceRect.left + referenceRect.width / 2;
      const referenceCenterY = referenceRect.top + referenceRect.height / 2;
      
      const newLeft = referenceCenterX - movingDiv.offsetWidth -30;
      const newTop = referenceCenterY - movingDiv.offsetHeight / 2;
      
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";

    });
    did(id + "talent").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }
}




function tooltipSkill(id, full) {
  if (did(full)) {
    did(full).addEventListener("mouseenter", function () {
        did("tooltip").style.display = "flex";
        did("tooltipName").innerHTML = talent[id].name;
        did("tooltipPrice").innerHTML = "";
        did("tooltipRarity").textContent = talent[id].category;
        did("tooltipRarity").style.color = returnQualityColor(id);
        did("tooltipName").style.color = returnQualityColor(id);
        did("tooltipArrow").style.display = "none";
        did("tooltipArrowRight").style.display = "flex";
        did("tooltipArrowRight").style.top = "20%";

        let assigndesc = '<br><br><div style=" text-align: center; background:transparent" ><div class="separador"></div><span style="color:gray">Press <FONT COLOR="orange">[2], [3] , [4]<FONT COLOR="gray"> or <FONT COLOR="orange">[5]<FONT COLOR="gray"> to assign this skill to the hotbar</span></div>'

        let castDescription = ""
        if ("cast" in talent[id]) castDescription = "<span style='color:gray'>Uses "+eval(talent[id].cost)+" Magic<br>"+talent[id].cd+"s Cooldown</span><br><br>"

        did("tooltipDescription").innerHTML = castDescription + eval(talent[id].description) + assigndesc;

        if (talent[id].category === "Class" && id!=="noClass") did("tooltipDescription").innerHTML = '<span class="questProgress">Current Level: '+ rpgClass[id].level + '/'+ rpgClass[id].maxLevel+'</span><br><br><FONT COLOR="white">'+ castDescription + eval(talent[id].description) + "<br><br>"+ bestiaryTag("Innate Skill: "+talent[id+"BASE"].name, "#9C4BB9") + "<span style='color:gray'>Uses "+eval(talent[id+"BASE"].cost)+" Magic<br>"+talent[id+"BASE"].cd+"s Cooldown</span><br><br>"+ eval(talent[id+"BASE"].description) + '<br><br><div style=" text-align: center; background:transparent" ><div class="separador"></div>'+bestiaryTag("Click to swap to this class", "darkorange")+'</div>';
        if (id==="noClass") did("tooltipDescription").innerHTML = '<span class="questProgress">Current Level: '+ rpgClass[id].level + '/'+ rpgClass[id].maxLevel+'</span><br><br><FONT COLOR="white">'+ castDescription + eval(talent[id].description) + '<div class="separador"></div>'+bestiaryTag("Click to swap to this class", "darkorange");

        did("tooltipFlavor").textContent = "";
        did("tooltipImage").src = "img/src/talents/" + id + ".jpg";

        var movingDiv = did("tooltip");
        var referenceDiv = did(full);
        var referenceRect = referenceDiv.getBoundingClientRect();
        var referenceLeft = referenceRect.left - movingDiv.offsetWidth - 10; // Cambiar aquí para posicionar la parte superior derecha del tooltip en la parte superior izquierda del item
        var referenceTop = referenceRect.top - 5;
        var newLeft = referenceLeft;
        var newTop = referenceTop;
        movingDiv.style.left = newLeft + "px";
        movingDiv.style.top = newTop + "px";
          
    });
    did(full).addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }
}



function tooltipAlign() {
  did("turtleAlign").addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";

    if (rpgPlayer.align==="nature") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Increased damage reduction against '+mightIcon+' Might.';
    if (rpgPlayer.align==="might") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Increased damage reduction against '+elementalIcon+' Elemental.';
    if (rpgPlayer.align==="elemental") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Increased damage reduction against '+natureIcon+' Nature.';
    if (rpgPlayer.align==="occult") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Increased damage reduction against '+occultIcon+' Occult.';
    if (rpgPlayer.align==="deific") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Increased damage reduction against '+deificIcon+' Deific.';

    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    const movingDiv = did("tooltip");
    const referenceDiv = did("turtleAlign");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 5;
    const referenceTop = referenceRect.top - 5;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });
  did("turtleAlign").addEventListener("mouseleave", function () {
    resetTooltip();
  });
} tooltipAlign();


function tooltipCoins() {
  did("currencyShells").addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("tooltipDescription").innerHTML = "";
    did("tooltipRarity").innerHTML = 'Basic Currency';
    did("tooltipRarity").style.color = "white"
    did("tooltipName").style.color = "white"
    did("tooltipImage").src = "img/sys/coin.png"
    did("tooltipName").innerHTML = "Shells";
    did("tooltipFlavor").textContent = `"Some turtles will do anything for a pile of these."`;
    did("tooltipPrice").innerHTML = "";
    var movingDiv = did("tooltip");
var referenceDiv = did("currencyShells");
var referenceRect = referenceDiv.getBoundingClientRect();
var newLeft = referenceRect.left/(stats.zoomLevel/100);
var newTop = referenceRect.bottom/(stats.zoomLevel/100);

movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop + 13+ "px";

  });
  did("currencyShells").addEventListener("mouseleave", function () {
    resetTooltip();
  });
} tooltipCoins();

function tooltipPrism() {
  did("currencyScutes").addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";


    let infoIcon = `<svg class="tooltipSkillStar" style="height:1.7rem" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipTInfo0"><g fill="none"><path fill="#555" stroke="#fff" stroke-linejoin="round" stroke-width="4" d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"/><path fill="#fff" fill-rule="evenodd" d="M24 11a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5" clip-rule="evenodd"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M24.5 34V20h-2M21 34h7"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTInfo0)"/></svg>`

    //return `<span style="color:#7276B7; font-weight:800;"><span class="tooltipIcon">${infoIcon}</span> ${item.source}</span>`



    did("tooltipDescription").innerHTML = `<span style="color:#7276B7; font-weight:600; display:flex; align-items:center">${infoIcon}<span>Obtained from Quests, Achievements and other rare sources. You will obtain${sheddingIcon}Sheddings for every${scuteIcon}Prism Scute that you spend on the achievement shop</span></span>
    ${bestiaryTag(`You have ${beautify(rpgPlayer.sheddings)} Sheddings`,"#7276B7")}
    <div class="separador"></div>`;


    did("tooltipRarity").innerHTML = 'Rare Currency';
    did("tooltipRarity").style.color = returnQualityColor("Upgrade")
    did("tooltipName").style.color = returnQualityColor("Upgrade")
    did("tooltipImage").src = "img/src/icons/scutes.jpg"
    did("tooltipName").innerHTML = "Prism Scutes";
    did("tooltipFlavor").textContent = `"Shedded from the primordial turtle long ago, these scutes hold untold potential."`;
    did("tooltipPrice").innerHTML = "";
    var movingDiv = did("tooltip");
var referenceDiv = did("currencyScutes");
var referenceRect = referenceDiv.getBoundingClientRect();
var newLeft = referenceRect.left/(stats.zoomLevel/100);
var newTop = referenceRect.bottom/(stats.zoomLevel/100);

movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop + 13+ "px";

  });
  did("currencyScutes").addEventListener("mouseleave", function () {
    resetTooltip();
  });
} tooltipPrism();


did("sheddingsCounter").addEventListener("mouseenter", function () {
  did("tooltip").style.display = "flex";


  let infoIcon = `<svg class="tooltipSkillStar" style="height:1.7rem" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipTInfo0"><g fill="none"><path fill="#555" stroke="#fff" stroke-linejoin="round" stroke-width="4" d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"/><path fill="#fff" fill-rule="evenodd" d="M24 11a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5" clip-rule="evenodd"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M24.5 34V20h-2M21 34h7"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTInfo0)"/></svg>`

  //return `<span style="color:#7276B7; font-weight:800;"><span class="tooltipIcon">${infoIcon}</span> ${item.source}</span>`



  did("tooltipDescription").innerHTML = `<span style="color:#7276B7; font-weight:600; display:flex; align-items:center">${infoIcon}<span>Obtained from spending Prism Scutes in the Achievement Shop</span></span>
  <div class="separador"></div>`;


  did("tooltipRarity").innerHTML = 'Cosmetic Currency';
  did("tooltipRarity").style.color = returnQualityColor("Rare")
  did("tooltipName").style.color = returnQualityColor("Rare")
  did("tooltipImage").src = "img/src/icons/sheddings.jpg"
  did("tooltipName").innerHTML = "Sheddings";
  did("tooltipFlavor").textContent = `"Valuable to some, completely useless to others."`;
  did("tooltipPrice").innerHTML = "";
  var movingDiv = did("tooltip");
var referenceDiv = did("sheddingsCounter");
var referenceRect = referenceDiv.getBoundingClientRect();
var newLeft = referenceRect.right - movingDiv.offsetWidth;
var newTop = referenceRect.bottom;

movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop + 13 + "px";

});
did("sheddingsCounter").addEventListener("mouseleave", function () {
  resetTooltip();
});






//#endregion
//----------------------==========================-----------------------
//----------------------===========BUFFS==========-----------------------
//----------------------==========================-----------------------
//#region Buffs

/*
function playerBuffsDecay() { 
  for (let b in buffs) {
    if (buffs[b].time > 0){buffs[b].time--; playerBuffs()}
    if (buffs.B84.time > 0) gametipUnlock("gt15")
    if (buffs.B90.time > 0) gametipUnlock("gt16")


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
  
    console.log("e")
    if (buffs.PlayerPetrify.time>0) {did("playerAnimation").style.filter = "grayscale(1)"}
    else if (did("playerAnimation").style.filter === "grayscale(1)" && buffs.PlayerPetrify.time<=0) did("playerAnimation").style.filter = "none";

    if (stats.currentArea==="A10") buffs.B91.time = 3;
    if (stats.currentArea==="A11") buffs.B96.time = 3;



}


*/

/*

function playerBuffs() { //only UI

  for (let b in buffs) {
    if (buffs[b].time > 0) { //if time more than 0
      
      if (!did(b + "buff")) {  //if it doesnt exist
       
        const bufdiv = document.createElement("div");
        bufdiv.id = b + "buff";

        bufdiv.innerHTML = '<div class="playerBuffTimer" id="' + b + 'timer"></div><img src='+buffs[b].img+'></div>';

        if ('stacks' in buffs[b]) bufdiv.innerHTML = '<div class="playerBuffTimer" id="' + b + 'timer"></div><img src='+buffs[b].img+'>  <div class="itemCount" id="'+b+ "stacks" + '">' + buffs[b].stacks + "</div>";


        bufdiv.className = "playerBuffIcon";

        if (buffs[b].invisible===true){bufdiv.style.display="none"}

        bufdiv.addEventListener("contextmenu", function () { //right click to remove buff functionality
          if (buffs[b].buff && buffs[b].player) {
            buffs[b].time = 0;
            playerBuffs();
            resetTooltip();
          }});

        if (buffs[b].buff) {
          bufdiv.style.border = "#83e781 solid 1px";
        } else {
          bufdiv.style.border = "#bf3b32 solid 1px";
        }

        if (buffs[b].player) { did("playerBuffWrapper").appendChild(bufdiv);
        } else if (buffs[b].turtle) { did("turtleBuffWrapper").appendChild(bufdiv); }
        else { did("enemyBuffWrapper").appendChild(bufdiv); 
      }
        tooltipBuffs();
        buffs[b].visualTime = buffs[b].time;

        if (buffs[b].haste) setTimeout(() => {
          {clearInterval(playerAttackInterval); playerAttackInterval = setInterval(playerAttack, 2000*playerHaste);}
        }, 300);

      }

      if (did(b + "buff")) { //if it does
        eval(buffs[b].effect);
        let percentage = 100 - ((buffs[b].time / buffs[b].visualTime) * 100);
        did(b + "timer").style.transform = 'scaleY('+percentage+"%)";

        if ('stacks' in buffs[b]) did(b + "stacks").innerHTML = beautify(buffs[b].stacks)

        if (buffs[b].stacks<=0)buffs[b].time=0;

      } 
    }

    if (buffs[b].time < 1 && did(b + "buff")) {
      did(b + "buff").remove();
      buffs[b].statUp = 0;
      if ('stacks' in buffs[b]) buffs[b].stacks = 0;
      statsUpdate();
      updateStatsUI();
      if (buffs[b].haste) {clearInterval(playerAttackInterval); playerAttackInterval = setInterval(playerAttack, 2000*playerHaste);}
    }


    
  }

  for (let i in items) if (items[i].trinketCD>0) items[i].trinketCD--
}

*/

function buffEffect(strength, id) {
  if (buffs[id].time>0) { buffs[id].statUp = strength; statsUpdate(); updateStatsUI();}

  if (rpgPlayer.ringSlot === "I176" && items.I176.level>9) buffs.B3.statUp = 0; //poison
  if (rpgPlayer.ringSlot === "I282" && items.I282.level>29) buffs.B59.statUp = 0; //burning
  if (rpgPlayer.ringSlot === "I373") buffs.B91.statUp = 0; //darkmoon
  if (rpgPlayer.legsSlot === "I338" && items.I338.level>59) buffs.B73.statUp /= 2; //hex



}


function removeBuffs(category) { //Removes all buffs pertaining to a specific tag
  for (let i in buffs) { if (buffs[i].tag === category) buffs[i].time = 0; }   
}

//#endregion
//----------------------==========================-----------------------
//----------------------======MYSTERY PRESENT=====-----------------------
//----------------------==========================-----------------------
//#region Present

var presentsList = ["coin","coin","coin","scute", "scute","exp","exp", "commonitem","commonitem", "rareitem"];

stats.mysteryPresentsOpened = 0;


document.addEventListener("contextmenu", function(event) { if (event.target && event.target.closest("#E15Enemy img")) { 


  if (rng(1,20)===1){ //mimic 
    logs.P32A.unlocked=true;
    deleteEnemy("E43");
    animParticleBurst(10 , "particleSmoke", "enemyPanel", 0);
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
    animImageSplash("circle", "enemyPanel", "explosion", 0);
    playSound("audio/explosion.mp3");
    cd.presentCanSpawn = playerPresentMinigameTimer;


  } else {


  cd.presentCanSpawn = playerPresentMinigameTimer;
  deleteEnemy();
  playSound("audio/button3.mp3")
setTimeout(() => {
  startMysteryMinigame(); resetTooltip();enemyUpdate(); 
}, 300);

}


 } });




 /*var presentCollectibles = { 
  I291:{P:100,A:1, R:"medium"}, 
  I292:{P:100,A:1, R:"medium"},
}*/


//let rareItems = ["I91","I92","I93" /*stampers*/,"I298" /*paint*/,"I222" /*magnifying*/, "I118" /*gamba*/]
//let rareItems2 = ["I311","I312" /*stampers2*/, "I209" /*egg1*/, "I200" /*phoenix*/, "I96" /*gold gamba*/, "I174" /*dungeon voucher*/, "I208" /*jackinabox*/, "I177" /*expVoucher*/, "I219" /*improv drive*/, "I205" /*kidsmeal*/, "I483","I484","I485","I486","I487","I496" /*glitterchips*/]
//let rareItems3 = ["I210" /*egg2*/]

rareItems = ["I91","I92", /*t1,t2 stamper*/"I298" /*paint*/,"I222" /*magnifying glass*/, "I118" /*gamba*/, "I209" /*egg1*/] //uncommon
rareItems2 = ["I92","I311","I312" /*stampers2*/, "I210" /*egg2*/, "I200" /*phoenix*/, "I96" /*gold gamba*/, "I174" /*dungeon voucher*/, "I208" /*jackinabox*/, "I177" /*expVoucher*/, "I219" /*improv drive*/, "I483","I484","I485","I486","I487","I496" /*glitterchips*/]
rareItems3 = ["I211",/*egg3*/  "I205" /*kidsmeal*/, "I527" /*scratch card*/ ] //epic

let firewallPresent = false
let presentsOpenedNow = 0

function startMysteryMinigame(){


  //rollTable(presentCollectibles, 1);

firewallPresent = false
presentsOpenedNow = 0
stats.mysteryPresentsOpened++;
stats.mysteryPresentsOpenedLog++;

did("blackScreen").style.display = "flex";
setTimeout(() => { did("blackScreen").style.opacity = "0.9" }, 0);
did("presentMinigame").style.display = "flex";
voidAnimation("presentMinigame", "growFadeIn 0.5s 1,bgPatternDiagonal 300s infinite linear")
did("mysteryCloth").style.display = "flex";
did("mysteryRewardPanel").style.display = "flex";

presentCount = playerPresentsMinigame - 1;
let present = 0;

for (let i = 0; i < 14; i++) {
present++
const div = document.createElement("div");

if (rng(1,1)===1) div.id = "MpresentNormal" + (present);

if (rng(1,14)===1 && stats.mysteryPresentsOpened>5) {
 div.id = "MpresentGold" + (present);
 div.style.backgroundImage = "url('img/src/icons/present2.png')";
}

if (rng(1,10)===1 && stats.mysteryPresentsOpened>10) {
  div.id = "MpresentStone" + (present);
  div.style.backgroundImage = "url('img/src/icons/present4.png')";
 }

if (rng(1,17)===1 && stats.mysteryPresentsOpened>25) {
  div.id = "MpresentCursed" + (present);
  div.style.backgroundImage = "url('img/src/icons/present6.png')";
}

if (rng(1,17)===1 && stats.mysteryPresentsOpened>40) {
  div.id = "MpresentChain" + (present);
  div.style.backgroundImage = "url('img/src/icons/present3.png')";
}

if (rng(1,22)===1 && stats.mysteryPresentsOpened>65) {
  div.id = "MpresentFirewall" + (present);
  div.style.backgroundImage = "url('img/src/icons/present7.png')";
}

if (rng(1,25)===1 && stats.mysteryPresentsOpened>85) {
  div.id = "MpresentViral" + (present);
  div.style.backgroundImage = "url('img/src/icons/present9.png')";
}

if (rng(1,30)===1 && stats.mysteryPresentsOpened>100) {
  div.id = "MpresentDice" + (present);
  div.style.backgroundImage = "url('img/src/icons/present8.png')";
}



div.className = "mysteryPresent";



did("mysteryList").appendChild(div);
}

}


document.addEventListener('click', function(event) {
  if (event.target.id && event.target.id.includes("Mpresent") && event.target.classList.contains("mysteryPresent")) {
    
    const present = event.target.id

    /*if (present.startsWith("enchanted")) {
      let itemGot = rareItems[rng(0,(rareItems.length-1))]
      if ((itemGot==="I209"&&items.I209.count>0)||(itemGot==="I210"&&items.I210.count>0)) itemGot = rareItems[rng(0,(rareItems.length-1))] //prevents duplicate time eggs
      div.innerHTML = '<img src="img/src/items/'+itemGot+'.jpg">x1 '+ items[itemGot].name;
      rareItemDrop(itemGot,1)
      animParticleBurst(5 , "particlePoison", present, 200)
    }*/


      if (present.startsWith("MpresentNormal")) {
        if (chance(0.20)) {endGame(present); return}

        if (chance(0.10)) spawnItem(returnArrayPick(rareLootTable2))
        else spawnItem(returnArrayPick(rareLootTable1))
        rewardTable(present)
      }

      if (present.startsWith("MpresentGold")) {
        if (chance(0.20)) {endGame(present); return} 
          
        if (chance(0.30)) spawnItem(returnArrayPick(rareLootTable2))
        else spawnItem(returnArrayPick(rareLootTable1))
        rewardTable(present)
      }      
      
      if (present.startsWith("MpresentCursed")) {
        if (chance(0.50)) {endGame(present); return} 
          
        if (chance(0.20)) spawnItem(returnArrayPick(rareLootTable3))
        else spawnItem(returnArrayPick(rareLootTable2))
        rewardTable(present)
      } 

      if (present.startsWith("MpresentStone")) {          
        spawnItem(returnArrayPick(rareLootTable1))
        rewardTable(present)
      }

      if (present.startsWith("MpresentChain") && presentsOpenedNow>4) {

        if (chance(0.30)) spawnItem(returnArrayPick(rareLootTable2))
        else spawnItem(returnArrayPick(rareLootTable1))
        rewardTable(present)
      }

      if (present.startsWith("MpresentViral")) {

        if (chance(0.35)) {endGame(present); return} 
          
        if (chance(0.30)) spawnItem(returnArrayPick(rareLootTable2))
        else spawnItem(returnArrayPick(rareLootTable1))
        rewardTable(present)
          
        let elementos = document.querySelectorAll('.mysteryPresent');
        if (elementos.length && presentsOpenedNow<13) {
          let elbicho;
          do {
              elbicho = elementos[Math.floor(Math.random() * elementos.length)];
          } while (elbicho.id.startsWith('MpresentViral'));
      
          elbicho.id = 'MpresentViral' + elbicho.id.replace(/\D/g, '');
          elbicho.style.backgroundImage = "url('img/src/icons/present9.png')";
      }

 
      }


      if (present.startsWith("MpresentFirewall")) {

        if (chance(0.20)) {endGame(present); return}

        if (chance(0.10)) spawnItem(returnArrayPick(rareLootTable2))
        else spawnItem(returnArrayPick(rareLootTable1))
        rewardTable(present)
        firewallPresent = true

      }


      if (present.startsWith("MpresentDice")) {


        if (chance(0.20)) {endGame(present); return}


                
        if (chance(0.10)) spawnItem(returnArrayPick(rareLootTable2))
          else spawnItem(returnArrayPick(rareLootTable1))
          rewardTable(present)



        let elementos = document.querySelectorAll('.mysteryPresent');
        for (let i = 0; i < elementos.length; i++) {

          elementos[i].id = 'MpresentNormal'+ elementos[i].id.replace(/\D/g, '');
          did(elementos[i].id).style.backgroundImage = "url('img/src/icons/present1.png')";

            if (rng(1,14)===1) {
              elementos[i].id = 'MpresentGold'+ elementos[i].id.replace(/\D/g, '');
              did(elementos[i].id).style.backgroundImage = "url('img/src/icons/present2.png')"; }

            if (rng(1,10)===1) {
              elementos[i].id = 'MpresentStone'+ elementos[i].id.replace(/\D/g, '');
              did(elementos[i].id).style.backgroundImage = "url('img/src/icons/present4.png')"; }

            if (rng(1,17)===1) {
              elementos[i].id = 'MpresentCursed'+ elementos[i].id.replace(/\D/g, '');
              did(elementos[i].id).style.backgroundImage = "url('img/src/icons/present6.png')"; }            

            if (rng(1,17)===1) {
              elementos[i].id = 'MpresentChain'+ elementos[i].id.replace(/\D/g, '');
              did(elementos[i].id).style.backgroundImage = "url('img/src/icons/present3.png')"; }            

            if (rng(1,22)===1) {
              elementos[i].id = 'MpresentFirewall'+ elementos[i].id.replace(/\D/g, '');
              did(elementos[i].id).style.backgroundImage = "url('img/src/icons/present7.png')"; }            

            if (rng(1,25)===1) {
              elementos[i].id = 'MpresentViral'+ elementos[i].id.replace(/\D/g, '');
              did(elementos[i].id).style.backgroundImage = "url('img/src/icons/present9.png')"; }            
            


        }





      }


      

  }})



  function rewardTable(present, rewardType, type){
    firewallPresent = false


    const div = document.createElement("div");

    did(present).classList.replace("mysteryPresent",'mysteryPresentOpened');
    did(present).style.backgroundImage = "url('img/src/icons/presentOpen.png')";
    presentsOpenedNow++


    animParticleBurst(5 , "particleSpark", present, 0);
    playSound("audio/button3.mp3")


    if (presentsOpenedNow>13) endGame(present, "good")




  }

  function endGame(present,type) {




    if (firewallPresent && type===undefined) {
      playSound("audio/gacha1.mp3")
      playSound("audio/explosion.mp3")
      animParticleBurst(15 , "particleGlow2", present, 0);
      firewallPresent = false
      return
    } 

    if (type===undefined){

      createPopup(`&#10060; Game End`)

      animParticleBurst(15 , "particleSmoke", present, 0);

      playSound("audio/explosion.mp3")
    }

    if (type==="good"){
      createPopup('🎉 Winner! Obtained an extra reward!')
      logs.P32.unlocked=true;
      spawnItem(returnArrayPick(rareLootTable3))
      animParticleBurst(10 , "particleConfetti", present, 100);
      animParticleBurst(10 , "particleConfetti", present, 200);
      animParticleBurst(10 , "particleConfetti", present, 400);
      playSound("audio/startup.mp3")
    }


    playSound("audio/close.mp3")

    

    did("presentBlocker").style.display = "flex"


    did(present).style.backgroundImage = "url('img/src/icons/presentOpen.png')";

    setTimeout(() => {


      did("presentMinigame").style.animation = "shrinkFadeOut 0.5s 1";
      did("presentMinigame").style.animation = "mysteryRewardPanel 0.5s 1";
      setTimeout(() => { 
        did("presentMinigame").style.display = "none"; 
        did("mysteryRewardPanel").style.display = "none"; 
        did("mysteryCloth").style.display = "none"; 
        setTimeout(() => { did("blackScreen").style.opacity = "0"; }, 100);
        setTimeout(() => { did("blackScreen").style.display = "none"; }, 200);
        did("mysteryRewardPanel").innerHTML = "";
        did("mysteryList").innerHTML = "";
        did("presentBlocker").style.display = "none"
      }, 100);
      
      
    }, 1500);
    
    
    setTimeout(() => {
      checkMysteryProgress()
    }, 1500);

}


function checkMysteryProgress(){

if (stats.mysteryPresentsOpened===5) {unlockAnimation("Golden Presents Unlocked!", "New types of presents can appear from now on", "img/src/icons/newPresents.jpg")}
if (stats.mysteryPresentsOpened===10) {unlockAnimation("Stone Presents Unlocked!", "New types of presents can appear from now on", "img/src/icons/newPresents.jpg")}
if (stats.mysteryPresentsOpened===25) {unlockAnimation("Cursed Presents Unlocked!", "New types of presents can appear from now on", "img/src/icons/newPresents.jpg")}
if (stats.mysteryPresentsOpened===40) {unlockAnimation("Chained Presents Unlocked!", "New types of presents can appear from now on", "img/src/icons/newPresents.jpg")}
if (stats.mysteryPresentsOpened===65) {unlockAnimation("Firewall Presents Unlocked!", "New types of presents can appear from now on", "img/src/icons/newPresents.jpg")}
if (stats.mysteryPresentsOpened===85) {unlockAnimation("Viral Presents Unlocked!", "New types of presents can appear from now on", "img/src/icons/newPresents.jpg")}
if (stats.mysteryPresentsOpened===100) {unlockAnimation("Dice Presents Unlocked!", "New types of presents can appear from now on", "img/src/icons/newPresents.jpg")}



}





document.addEventListener('mousemove', function(event) {
  if (event.target.id && event.target.id.includes("Mpresent")) {
    did("tooltip").style.display = "flex";
    did("tooltip").style.width = "18%"; 
    did("tooltip").style.background = "rgb(34, 18, 18)"; 
    did("tooltip").style.outline = "white solid 1px";
    did("upperTooltip").style.display = "none";
    if (event.target.id.includes("MpresentNormal")){ did("tooltipDescription").innerHTML = bestiaryTag("Mystery Present")+'<FONT COLOR="#edd585">Contains rewards<div class="separador"></div>'+bestiaryTag("Failure Chance: 20%", "purple"); }
    if (event.target.id.includes("MpresentChain")){ did("tooltipDescription").innerHTML = bestiaryTag("Chained Present")+'<FONT COLOR="#edd585">Contains greater rewards, can\'t be opened until 5 other presents have been opened<div class="separador"></div>'+bestiaryTag("Failure Chance: 0%", "purple"); }
    if (event.target.id.includes("MpresentGold")){ did("tooltipDescription").innerHTML = bestiaryTag("Golden Present")+'<FONT COLOR="#edd585">Contains greater rewards<div class="separador"></div>'+bestiaryTag("Failure Chance: 20%", "purple"); }
    if (event.target.id.includes("MpresentCursed")){ did("tooltipDescription").innerHTML = bestiaryTag("Cursed Present")+'<FONT COLOR="#edd585">Contains even greater rewards, but has even greater failure chance<div class="separador"></div>'+bestiaryTag("Failure Chance: 50%", "purple"); }
    if (event.target.id.includes("MpresentStone")){ did("tooltipDescription").innerHTML = bestiaryTag("Stone Present")+'<FONT COLOR="#edd585">Contains lesser rewards, but cannot fail<div class="separador"></div>'+bestiaryTag("Failure Chance: 0%", "purple"); }
    if (event.target.id.includes("MpresentDice")){ did("tooltipDescription").innerHTML = bestiaryTag("Dice Present")+'<FONT COLOR="#edd585">Contains rewards. Rerolls all unopened presents<div class="separador"></div>'+bestiaryTag("Failure Chance: 20%", "purple"); }
    if (event.target.id.includes("MpresentFirewall")){ did("tooltipDescription").innerHTML = bestiaryTag("Firewall Present")+'<FONT COLOR="#edd585">Contains rewards. Prevents the next present to fail<div class="separador"></div>'+bestiaryTag("Failure Chance: 20%", "purple"); }
    if (event.target.id.includes("MpresentViral")){ did("tooltipDescription").innerHTML = bestiaryTag("Viral Present")+'<FONT COLOR="#edd585">Contains greater rewards. Converts a random unopened present into a Viral Present<div class="separador"></div>'+bestiaryTag("Failure Chance: 35%", "purple"); }

    
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    const movingDiv = did("tooltip");
    const referenceDiv = did("presentMinigame");
    const referenceRect = referenceDiv.getBoundingClientRect();
    var referenceLeft = referenceRect.left - movingDiv.offsetWidth - 10; // Cambiar aquí para posicionar la parte superior derecha del tooltip en la parte superior izquierda del item
    var referenceTop = referenceRect.top ;
    var newLeft = referenceLeft;
    var newTop = referenceTop;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  }
});

document.addEventListener('mouseout', function(event) {
  if (event.target.id && event.target.id.includes("Mpresent")) {
      resetTooltip();
  }
});




let scratcherGains = 0
let scratcherMoves = 0

function startScratchMinigame() {

  did("scratcherMenu").style.display = "flex";

  voidAnimation("scratcherMenu","scratcherFly 1s 1")
  did("blackScreen").style.display = "flex";
  setTimeout(() => { did("blackScreen").style.opacity = "0.7" }, 1);
  playSound("audio/book.mp3")


  scratcherGains = 0
  scratcherMoves = 10
  did("scratcherGains").innerHTML = scratcherGains+'<img src="img/src/icons/scutes.jpg">'
  did("scratcherMoves").innerHTML = 'Scratches Left : '+scratcherMoves
  did("scratcherList").innerHTML = ""


  for (let i = 0; i < 30; i++) { createScratch(i) }



function createScratch(number){



  const div = document.createElement("div");

  
  if (rng(1,1)===1) div.id = "scratcherCircleP" + (number+1);
  if (rng(1,10)===1) div.id = "scratcherCircleX2" + (number+1);

  div.className = "scratcherCircle";
  div.innerHTML = "<div id='scratcherScratch"+(number+1)+"'></div>"
  did("scratcherList").appendChild(div);



  div.addEventListener("click", function() {
    revealScratch(div.id, number + 1);
  });

  div.addEventListener('mousemove', function(event) {
    if (event.buttons === 1) {
      revealScratch(div.id, number + 1);
    }
});



}



function revealScratch(i,SNumber){

     

    if (scratcherMoves>0 && did("scratcherScratch"+(SNumber)).style.display != "none") {

      scratcherMoves--
      playSound("audio/page.mp3")
      playSound("audio/heal.mp3")

    if (did(i).id.startsWith("scratcherCircleX2")){
      did(i).innerHTML = "<div id='scratcherScratch"+(SNumber)+"'></div>X2"
      scratcherGains*=2

    }


    if (did(i).id.startsWith("scratcherCircleP")){

      let reward = 50
      if (rng(1,5)===1) reward = 80
      if (rng(1,10)===1) reward = 150


      did(i).innerHTML = "<div id='scratcherScratch"+(SNumber)+"'></div>"+reward


        scratcherGains+=reward


    }



    did("scratcherMoves").innerHTML = 'Scratches Left : '+scratcherMoves
    did("scratcherGains").innerHTML = scratcherGains+'<img src="img/src/icons/scutes.jpg">'

    did("scratcherScratch"+(SNumber)).style.display = "none";

    did("scratcherGains").style.animation = "";
    void did("scratcherGains").offsetWidth;
    did("scratcherGains").style.animation = "scratcherText 0.3s 1";



    if (scratcherMoves===0){ //game end

      rpgPlayer.scutes+=scratcherGains
      stats.totalScutes += scratcherGains
      updateCounters()


      for (let i = 0; i < 4; i++) { setTimeout(loop, 300 * i);}


      function loop(){

        did("scratcherGains").style.animation = "";
        void did("scratcherGains").offsetWidth;
        did("scratcherGains").style.animation = "scratcherText 0.5s 1";
        playSound("audio/touchGlass.mp3")


      }


      


      setTimeout(() => {



        setTimeout(() => { did("blackScreen").style.opacity = "0"; }, 100);
        setTimeout(() => { did("blackScreen").style.display = "none"; }, 700);   
        

        playSound("audio/book.mp3")

      did("scratcherMenu").style.animation = "none";
      void did("scratcherMenu").offsetWidth;
      did("scratcherMenu").style.animation = "scratcherFly 1s 1 reverse";
      setTimeout(() => {
        did("scratcherMenu").style.display = "none"
      }, 990);


    }, 1500);


    }
      

    
    


}



}














}



//#endregion
//----------------------==========================-----------------------
//----------------------======INITIALIZATION======-----------------------
//----------------------==========================-----------------------
//#region Initialization


document.addEventListener("DOMContentLoaded", rpgInitialization);

function rpgInitialization() {

if (areas[stats.currentArea].dungeon) stats.currentArea = "A1"; //prevents loading into dungeons, duh
  


  updateInventory();
  
  setTimeout(() => {
  equipGear();
  }, 1);

  createAreaPanel();
  expBar();
  encounterButtonPress();
  hpRegen();
  //initGearAll();
  //createPlantCatalogue()
  retroactiveUpdate();
  switchArea();
  setTimeout(() => {
    unlocksReveal();
    specialButtonUi();
  }, 50);
  contractLog();
  contractMenu();
  //armorycheck();
  //createArmory();
  //createCatalogue();
  //armorycheck();
  //calculateGardenStats();
  statsUpdate();
  updateStatsUI();
  spawnEnemy();
  updateClass();
  //removeTableItem();
  createMail();
  unreadMail();
  //stampStatUp();
  //updateSkills();
  //createSkirmish();
  //createShowdown();
  //createTalent();
  //updateTalentUI();
  //createShopHonor();
  //createARank();
  debug();

  inventoryCulling();

  createAreaPanel();
  clickTarget("Enemy")

  //updateLoadout(stats.lastLoadout);

  if (stats.currentArea==="A7"){ //if the player loads in arena, dont show the quest tab
      did("showdownTab").style.display = "flex";
      did("questTab").style.display = "none";
  }


  for (i in areas) if (did(i + "areaCharges")) {did(i + "areaCharges").innerHTML = areas[i].charges+" Left"}


  document.documentElement.style.setProperty('--bgColor1', areas[stats.currentArea].color1);
  document.documentElement.style.setProperty('--bgColor2', areas[stats.currentArea].color2);



  shroomEffectsDiscovered = stats.shroom1discovered + stats.shroom2discovered + stats.shroom3discovered + stats.shroom4discovered + stats.shroom5discovered + stats.shroom6discovered + stats.shroom7discovered + stats.shroom8discovered;

  updateHeat()

  extraLivesUsed = stat.ExtraLives

  calculateInactiveTime();


  dailyLocalReset()
  biWeeklyReset()
  dailyPresentTimers()

}
//#endregion