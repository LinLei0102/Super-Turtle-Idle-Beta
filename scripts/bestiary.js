



let currentBestiaryEntry = "E1"

function updateBestiary() {
    for (let i in enemies) {


      if (enemies[i].medalProgress>=10000){
        enemies[i].claimable = true
      }


    if (!enemies[i].sawOnce) continue
    if (enemies[i].ignoreBestiary) continue





            
      if (!did(i + "bestiary")) {


        

        let medal = ""
        let loot = ""
        let card = ""
        if (enemies[i].difficulty != 'boss' || enemies[i].noMedal) medal = `<span  style="right:0.15rem; left:auto"><svg id="${i}minimedal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 9A7 7 0 1 1 5 9a7 7 0 0 1 14 0"/><path fill="currentColor" d="m7.093 15.941l-.379 1.382c-.628 2.292-.942 3.438-.523 4.065c.147.22.344.396.573.513c.652.332 1.66-.193 3.675-1.243c.67-.35 1.006-.524 1.362-.562a2 2 0 0 1 .398 0c.356.038.691.213 1.362.562c2.015 1.05 3.023 1.575 3.675 1.243c.229-.117.426-.293.573-.513c.42-.627.105-1.773-.523-4.065l-.379-1.382A8.46 8.46 0 0 1 12 17.5a8.46 8.46 0 0 1-4.907-1.559"/></svg></span>`
        if (enemies[i].lootTable) loot = `<span><svg  id="${i}miniloot" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="currentColor" d="M20 9h-5V7H7v2H2V4h1V3h16v1h1m-8 9h-2v-1H9V9h4v3h-1m7 7H3v-1H2v-7h5v2h1v1h1v1h4v-1h1v-1h1v-2h5v7h-1Z"/></svg></span>`
        if (enemies[i].card1) card = `<span style="left:0;right:0; margin:auto" ><svg id="${i}minicard" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17 2a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zm.01 16H17a1 1 0 0 0-.117 1.993l.127.007a1 1 0 0 0 0-2m-4.98-9.5l-.115.005c-.384.04-.724.273-.898.623l-.51 1.027l-1.138.166c-.423.059-.78.357-.914.768l-.033.125a1.13 1.13 0 0 0 .322 1.039l.82.797l-.194 1.127c-.07.432.107.857.454 1.108l.107.068a1.13 1.13 0 0 0 1.078.018l1.022-.536l1.019.535c.377.2.84.168 1.19-.086l.1-.08c.281-.259.416-.645.35-1.028l-.194-1.126l.823-.799c.31-.302.42-.752.287-1.161l-.042-.11a1.13 1.13 0 0 0-.873-.659l-1.138-.166l-.508-1.026a1.13 1.13 0 0 0-1.014-.63M7.01 4H7a1 1 0 0 0-.117 1.993L7.01 6a1 1 0 1 0 0-2"/></svg></span>`

        
        const div = document.createElement("div");
        div.id = i + "bestiary";
        div.innerHTML = `<img id="${i}mini" src="img/src/enemies/${i}M.png">${medal+loot+card}`;
        did("bestiaryListingNew").appendChild(div);
        
        
      }


      if (i === currentBestiaryEntry) {did(i + "bestiary").style.outlineColor = "cyan"} else did(i + "bestiary").style.outlineColor = "white"
      if (enemies[i].claimable) did(i + "bestiary").style.animation = "claimableAchievement 2s infinite"


      //if (!(enemies[i].difficulty != 'boss' || enemies[i].noMedal)) continue

      if (enemies[i].medal==1) { did(i+"minimedal").style.color = "#A87665" }
      if (enemies[i].medal==2) { did(i+"minimedal").style.color = "#E2E1F2"}
      if (enemies[i].medal==3) { did(i+"minimedal").style.color = "#FBD269"}
        
      if (enemies[i].card1){
        let cardCount = 0
      if (enemies[i].card1.got==true) cardCount++
      if (enemies[i].card2.got==true) cardCount++
      if (enemies[i].card3.got==true) cardCount++

      if (cardCount===1) { did(i+"minicard").style.color = "#A87665" }
      if (cardCount===2) { did(i+"minicard").style.color = "#E2E1F2"}
      if (cardCount===3) { did(i+"minicard").style.color = "#FBD269"}
      } 



      if (enemies[i].lootTable !== undefined) {
        const returnedOdds = enemies[i].lootTable();
        let allTimesGotPositive = true; 
    
        for (const e in returnedOdds) {
            const classitem = eval(e);
            if (classitem.timesGot <= 0) {allTimesGotPositive = false; break }
        }    
        if (allTimesGotPositive===true) {
            did(i + "miniloot").style.color = "#FBD269";
        }
    }





  
  
  
      
    }


    //info page update

    did("bestiaryEnemyKillsExp").innerHTML = `${enemies[currentBestiaryEntry].medalProgress}/10000 💀`
    let percentageEXP = (enemies[currentBestiaryEntry].medalProgress / 10000) * 100;
    did("bestiaryEnemyKillsExpBar").style.background = "linear-gradient(90deg, #6FB1EE " + percentageEXP + "%, white " + percentageEXP + "%)";

    did("bestiaryEnemyDesc").innerHTML = enemies[currentBestiaryEntry].description

    let dropDesc = ""

    if ("lootTable" in enemies[currentBestiaryEntry]){
      const returnedOdds = enemies[currentBestiaryEntry].lootTable()
      dropDesc = "";
      for (i in returnedOdds) {
        dropDesc += dropInfo(eval(i), returnedOdds[i].c, returnedOdds[i].a,"drop")+"<br>"
      }

      did("bestiaryEnemyLoot").innerHTML = dropDesc
    }

    did("bestiaryEnemyName").innerHTML = enemies[currentBestiaryEntry].name
    did("bestiaryMonster").src = `img/src/enemies/${currentBestiaryEntry}.png`
    did("bestiaryMedal").src = `img/src/icons/bestiaryBadge1.png`
    if (enemies[currentBestiaryEntry].medal>0) did("bestiaryMedal").src = `img/src/icons/bestiaryBadge${enemies[currentBestiaryEntry].medal+1}.png`


    did("bestiaryCards").innerHTML = ""
    if (enemies[currentBestiaryEntry].card1.got) {
        did("bestiaryCards").innerHTML += `<div class="bestiaryCard" >
                        <div class="bestiaryCardHeader">${enemies[currentBestiaryEntry].name}</div>
                        <div class="bestiaryCardBody">
                            <img class="bestiaryCardBody1" src="img/src/enemies/${currentBestiaryEntry}.png">
                            <img class="bestiaryCardBody2" src="img/src/areas/${enemies[currentBestiaryEntry].area}M.png">
                        </div>
                        <div class="bestiaryCardFooter">
                            <span>${enemies[currentBestiaryEntry].card1.description}</span>
                            <strong>The Super Turtle Idle Company co. ltd. © etc.</strong>
                        </div>
                    </div>`
    } else did("bestiaryCards").innerHTML += `<div class="bestiaryCardNotUnlocked"></div>`

    if (enemies[currentBestiaryEntry].card2.got) {

      did("bestiaryCards").innerHTML += `<div class="bestiaryCard">
                        <div class="bestiaryCardHeader">${enemies[currentBestiaryEntry].name}&nbsp&nbsp✧</div>
                        <div class="bestiaryCardBody">
                            <img class="bestiaryCardBody1" src="img/src/enemies/${currentBestiaryEntry}.png">
                            <img class="bestiaryCardBody2" src="img/src/areas/${enemies[currentBestiaryEntry].area}M.png">
                        </div>
                        <div class="bestiaryCardFooter">
                            <span>${enemies[currentBestiaryEntry].card2.description}</span>
                            <strong>The Super Turtle Idle Company co. ltd. © etc.</strong>
                        </div>

                        <div class="bestiaryCardHeaderBg bgCardT2"></div>
                        <div class="bestiaryCardHeaderBg"></div>
                    </div>`
    } else did("bestiaryCards").innerHTML += `<div class="bestiaryCardNotUnlocked"></div>`

    if (enemies[currentBestiaryEntry].card3.got) {

      did("bestiaryCards").innerHTML += `<div class="bestiaryCard bgCardT3">
                        <div class="bestiaryCardHeader">${enemies[currentBestiaryEntry].name}&nbsp&nbsp☆</div>
                        <div class="bestiaryCardBody">
                        <img class="bestiaryCardBody1" src="img/src/enemies/${currentBestiaryEntry}.png">
                            <img class="bestiaryCardBody2" src="img/src/areas/${enemies[currentBestiaryEntry].area}M.png">
                        </div>
                        <div class="bestiaryCardFooter">
                            <span>${enemies[currentBestiaryEntry].card3.description}</span>
                            <strong>The Super Turtle Idle Company co. ltd. © etc.</strong>
                        </div>

                        <div class="bestiaryCardHeaderBgT3"></div>
                    </div>`

    } else did("bestiaryCards").innerHTML += `<div class="bestiaryCardNotUnlocked"></div>`




    VanillaTilt.init(document.querySelectorAll(".bestiaryCard"), {
      max: 10,
      speed: 3000,
      //reverse: true,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      scale: 3,
    });






  }
  



  did("bestiaryMonster").addEventListener('click', function() { //pet the monsta
    setTimeout(() => {
      voidAnimation("bestiaryMonster", "gelatine 0.3s 1")
      
      particleTrackers.push(new ParticleFloatingHeart(mouseClickX, mouseClickY, { targetCanvas: `globalParticles` }))
        if (chance(1/10)) particleTrackers.push(new ParticleFloatingHeart(mouseClickX, mouseClickY, { targetCanvas: `globalParticles` }))
        if (chance(1/10)) particleTrackers.push(new ParticleFloatingHeart(mouseClickX, mouseClickY, { targetCanvas: `globalParticles` }))
    }, 10); 
    });



  document.addEventListener('click', function(event) {
    
    const div = event.target.parentElement.id; 
    const i = div.replace("bestiary", "");


    if (div && div.id && div.endsWith("bestiary")){
        currentBestiaryEntry = i
        voidAnimation(div,"areaClick 0.3s 1")
        voidAnimation("bestiaryMonster", "gelatine 0.3s 1")
        setTimeout(() => {
          voidAnimation("bestiaryMonster", "breathingHigh 12s infinite ease-out")
        }, 400);



        if (enemies[i].claimable) {

            voidAnimation("bestiaryEnemyKills","gelatine 0.3s 1")


          if (enemies[i].medal<3) {
            rpgPlayer.shop.bestiary.exp+=400;
            enemies[i].medal++;
          }
          enemies[i].medalProgress-=10000

          rpgPlayer.scutes+=200
          updateCounters()



          selectedItemRect = document.getElementById(div).getBoundingClientRect();


          particleTrackers.push(new ParticleSellPulse(mousePositionX, mousePositionY));
          particleTrackers.push(new ParticlePrismScute(mousePositionX, mousePositionY));
          particleTrackers.push(new ParticlePrismScute(mousePositionX, mousePositionY));
          particleTrackers.push(new ParticlePrismScute(mousePositionX, mousePositionY));
          particleTrackers.push(new ParticlePrismScute(mousePositionX, mousePositionY));


          enemies[i].claimable = false;

          bestiaryShopExpUpdate()

        }





        updateBestiary()
    }
    });









rpgPlayer.shop.bestiary = {}
rpgPlayer.shop.bestiary.level = 0
rpgPlayer.shop.bestiary.exp = 0


function bestiaryShopExpUpdate(){

  voidAnimation("bestiaryShopExp","areaClick 0.5s 1")


if (rpgPlayer.shop.bestiary.exp>999) {
  rpgPlayer.shop.bestiary.exp-=1000;
  rpgPlayer.shop.bestiary.level++;
  voidAnimation("bestiaryShopLevelBox","gelatine 0.4s ease")
}

did("bestiaryShopLevel").innerHTML = rpgPlayer.shop.bestiary.level
did("bestiaryShopExp").innerHTML = `${rpgPlayer.shop.bestiary.exp} / 1000 🏆`

let percentage = ((rpgPlayer.shop.bestiary.exp / 1000) * 100);
did('bestiaryShopExpBar').style.width = percentage+"%";

} 






did("bestiaryInfo").addEventListener("mouseenter", function () {

  //on mouseenter
  did("tooltip").style.display = "flex";
  did('tooltip').style.width = "35vw"; 
  did("tooltipName").innerHTML = enemies[currentBestiaryEntry].name;
  if (gatherDifficulty.includes(enemies[currentBestiaryEntry].difficulty))
    did("tooltipPrice").innerHTML = "Gathered: " + beautify(enemies[currentBestiaryEntry].killCount);
  else
    did("tooltipPrice").innerHTML = "Defeated: " + beautify(enemies[currentBestiaryEntry].killCount);

  if (gatherDifficulty.includes(enemies[currentBestiaryEntry].difficulty)) did("tooltipRarity").textContent = "Resource";
  else if ("align" in enemies[currentBestiaryEntry]) did("tooltipRarity").innerHTML = "Enemy"+ '<br><img class="alignTooltipIcon" src="img/src/icons/'+enemies[currentBestiaryEntry].align+'.png"></img>'; 
  else did("tooltipRarity").innerHTML = "Enemy";

  did("tooltipRarity").style.color = "white";
  did("tooltipName").style.color = "white";
  did("tooltipArrow").style.display = "none";

  let dropDesc = ""

  if ("lootTable" in enemies[currentBestiaryEntry]){

    const returnedOdds = enemies[stats.currentEnemy].lootTable()

      dropDesc = bestiaryTag("Dedicated Drops", "#997151");

      for (i in returnedOdds) {


        dropDesc += dropInfo(eval(i), returnedOdds[i].c, returnedOdds[i].a,"drop")+"<br>"
  
  
  
      }


  }


  let skilldesc = ""

  
  //if ("bestiarySkills" in enemies[stats.currentEnemy]) skilldesc = ''+bestiaryTag("🌠 Skills 🌠", "#7B6890")+'<FONT COLOR="#edd585">'+enemies[stats.currentEnemy].bestiarySkills
  
  did("tooltipDescription").innerHTML =  "<br><span>"+enemies[currentBestiaryEntry].description+skilldesc+dropDesc+"</span>"

  did("tooltipFlavor").textContent = "";
  did("tooltipImage").src = "img/src/enemies/" + currentBestiaryEntry + "M.png";


  const movingDiv = did("tooltip");
  const referenceDiv = did("bestiaryInfo");
  const referenceRect = referenceDiv.getBoundingClientRect();
  
  const newLeft = referenceRect.left;
  const newTop = referenceRect.bottom;
  
  movingDiv.style.left = newLeft + "px";
  movingDiv.style.top = newTop + 10 +"px";



});

did("bestiaryInfo").addEventListener("mouseleave", function () {
  resetTooltip();
});









document.addEventListener('DOMContentLoaded', initializationBestiary);

function initializationBestiary() {
    updateBestiary()
    bestiaryShopExpUpdate()


}


 