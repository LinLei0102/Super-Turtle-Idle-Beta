//#region Thats hell youre walking in


var rightClickX = 0;
var rightClickY = 0;

var leftClickX = 0;
var leftClickY = 0;

window.addEventListener("contextmenu", function (e) { //disables web right click
    e.preventDefault();
    rightClickX = e.clientX;
    rightClickY = e.clientY;
}); 




document.addEventListener("keydown", (event) => {
    if (event.code === "KeyC") {
      
        if (!rpgPlayer.alive) return
        animatedSplash("player", "T"+rng(1,4),"taunt",0)
        playSound("audio/taunt.mp3");
    }
  });

/* upcoming secreto

window.addEventListener('resize', checkResolution);

function checkResolution() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var columns1 = document.querySelectorAll('.categoryContent');
    var windows1 = document.querySelectorAll('.categoryContentColumn');

    var columns2 = document.querySelectorAll('.categoryContentMobile');
    var windows2 = document.querySelectorAll('.categoryContentColumnMobile');

    if (height >= 1.2 * width) {
        columns1.forEach(function(element) {
            element.classList.replace('categoryContent', 'categoryContentMobile');
        });

        windows1.forEach(function(element) {
            element.classList.replace('categoryContentColumn', 'categoryContentColumnMobile');
        });

        document.querySelector('.bLateral').classList.replace('bLateral', 'bLateralMobile');


       
    } else{

        columns2.forEach(function(element) {
            element.classList.replace('categoryContentMobile', 'categoryContent');
        });

        windows2.forEach(function(element) {
            element.classList.replace('categoryContentColumnMobile', 'categoryContentColumn');
        });

        document.querySelector('.bLateralMobile').classList.replace('bLateralMobile', 'bLateral');


    }
}

*/



document.addEventListener('keydown', function (event) { //disables spacebar
    if (event.key === ' ' && (did("skillMenu").style.display === "flex" || did("turtleRename").style.display === "flex")) {
      event.preventDefault();
    } });

window.addEventListener('keydown', function (event) { //disables alt key
    if (event.keyCode === 18) { event.preventDefault(); return false; }
});






document.addEventListener('dragstart', function(event) { //thanks firefox very cool
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});


/*document.addEventListener("click", function() {

    let cursorIdleImg = "cursorHand"
    let cursorClickImg = "cursorHandClick"

    if (settings.wubblyCursorToggle){
        cursorIdleImg = "cursorHandAlt"
        cursorClickImg = "cursorHandClickAlt"
    } 

    if (!settings.disableCustomCursor){

    document.body.style.cursor = "url('img/sys/"+cursorClickImg+".png'), auto";

    setTimeout(function() {
        document.body.style.cursor = "url('img/sys/"+cursorIdleImg+".png'), auto";
    }, 100);
}
});

*/




function updateCounters() { //DO NOT PUT HERE ANYTHING THATS NOT UI
    did("contadorMonedas").textContent = beautify(rpgPlayer.coins);
    did("prismCounter").innerHTML = beautify(rpgPlayer.scutes);
    did("prismCounter3").innerHTML = beautify(rpgPlayer.scutes);
    did("estadisticaClicks").textContent = beautify(stats.clickCount);
    did("totalCoins").textContent = beautify(stats.totalCoins);
    did("totalScutes").textContent = beautify(stats.totalScutes);
    did("totalSheddings").textContent = beautify(stats.totalSheddings);
    did("totalPulls").textContent = beautify(stats.hatsGot);
    //did("totalCoinClicks").textContent = beautify(stats.totalCoinsClick);

    did("statCrafted").textContent = beautify(stats.craftedItems);
    did("statSold").textContent = beautify(stats.soldItems);
    did("statQuestCompleted").textContent = beautify(stats.questsCompleted);
    did("statKills").textContent = beautify(stats.totalKills);
    did("statBossKills").textContent = beautify(stats.areaBossKills);
    did("statDeaths").textContent = beautify(stats.timesDied);
    did("statDungeons").textContent = beautify(stats.dungeonsCleared);

    did("statThief").textContent = beautify(stats.timesStolen);
    did("statJester").textContent = beautify(stats.jesterTurtleClicks);
    did("statPresents").textContent = beautify(stats.mysteryPresentsOpened);
    did("statPlants").textContent = beautify(stats.plantsHarvested);
    did("statResearch").textContent = beautify(stats.researchedBuildings);
    
    //did("statCoinsClick").textContent = beautify(playerCoinsPerClick);
    //did("statCoinsClickMultiplier").textContent = "x"+multiplicativeCoinsPerClick.toFixed(1);

    //did("statOfflineMultiplier").textContent = "x"+multiplicativePenguinPower.toFixed(1);

    //did("statHealthMultiplier").textContent = "x"+multiplicativeMaxHp.toFixed(1);
    //did("statStrengthMultiplier").textContent = "x"+multiplicativeStrength.toFixed(1);
    //did("statSpellpowerMultiplier").textContent = "x"+multiplicativeSpellpower.toFixed(1);
    //did("statExpMultiplier").textContent = "x"+multiplicativeEXPGain.toFixed(1);

    //did("statNatureMultiplier").textContent = "x"+natureDamageMultiplicative.toFixed(1);
    //did("statMightMultiplier").textContent ="x"+mightDamageMultiplicative.toFixed(1);
    //did("statElementalMultiplier").textContent ="x"+elementalDamageMultiplicative.toFixed(1);
    //did("statDeificMultiplier").textContent ="x"+deificDamageMultiplicative.toFixed(1);
    //did("statOccultMultiplier").textContent ="x"+occultDamageMultiplicative.toFixed(1);


    };
//#endregion
//----------------------==========================-----------------------
//----------------------=======ON TURTLE CLICK====-----------------------
//----------------------==========================-----------------------
//#region Click
let clickCooldown = false;
let clickAnimCooldown = false

unlocks.present = false;

stats.recievedPresents = 0;

unlocks.wobblyCursor = false;

did("tortugaClick").onclick = manualClick;
let manualClicks = 0


did("tortugaClick").addEventListener("mouseenter", function () {
    did("turtleCosmetic").style.scale = "1.4"

  });

  did("tortugaClick").addEventListener("mouseleave", function () {
    did("turtleCosmetic").style.scale = "1.3"
  });

function manualClick(){
    manualClicks++;
    turtleClick()
    if (manualClicks>1000 && !unlocks.wobblyCursor) {unlocks.wobblyCursor=true; settings.wubblyCursorToggle = true; setCursor(); unlocksReveal()}
}


function turtleClick(alt){

    if (!clickCooldown) {
    
        rpgPlayer.coins += playerCoinsPerClick;
        stats.clickCount++
        stats.totalCoinsClick += playerCoinsPerClick
        stats.totalCoins += playerCoinsPerClick
        playSound("audio/throw.mp3")
        //turtle image shift
        if (stats.clickCount % 40 === 0) {
                const randomImageIndex = Math.floor(Math.random() * 5) + 1;
                const imagePath = "img/src/tortugasdefault/img" + randomImageIndex + ".png";
                did("tortugaClick").src = imagePath;
                let rnglet = rng(1,4)
                if (rnglet===1)playSound("audio/lily2.mp3");
                else playSound("audio/lily.mp3");
    
                if (unlocks.present && cd.presentCooldown<=0){
                    cd.presentCooldown = 43200;
                    items.I119.count += 1;
                    stats.recievedPresents++;
                    addItem();
                    logPrint("<span style='color:pink'>"+stats.turtleName+" left a present...!</span>")
                }
            };
        
        //counter animation
        let animText = did("contadorMonedas")
        animText.style.padding = "1%"
        animText.style.fontSize = "1.2vw"
        animText.style.transition = "0.05s"
        setTimeout(function () {
            animText.style.fontSize = "0.98vw"
            animText.style.padding = "0%";
        }, 100);
    
        //turtle animation

        did("tortugaClick").style.animation = "";
        void did("tortugaClick").offsetWidth;
        did("tortugaClick").style.animation = "gelatine 0.3s 1 ease";

        did("turtleCosmetic").style.animation = "";
        void did("turtleCosmetic").offsetWidth;
        did("turtleCosmetic").style.animation = "gelatine 0.3s 1 ease";
        
        
        //floating value div
        if (!settings.disableClickText) {
            if (alt==="spacebar") { createFloatingText('<p>+' + (beautify(playerCoinsPerClick)) + '<img src="img/sys/coin.png" />', "spacebar") }
            else createFloatingText('<p>+' + (beautify(playerCoinsPerClick)) + '<img src="img/sys/coin.png" />')
            
            
            }
        
        updateCounters();
        
    clickCooldown = true;
    setTimeout(function () {clickCooldown = false;}, playerClickRate);
    }
}








function createFloatingText(text, alt){

    
    var textoClick1 = document.createElement('div');
        textoClick1.className = 'textoClick';

        if (alt === "spacebar") {

            const referenceDiv = did("tortugaClick");
const referenceRect = referenceDiv.getBoundingClientRect();
const newLeft = referenceRect.left + (referenceRect.width - textoClick1.offsetWidth) / 2;
const newTop = referenceRect.top + (referenceRect.height - textoClick1.offsetHeight) / 2;
textoClick1.style.left = newLeft + "px";
textoClick1.style.top = newTop + "px";

        }
        else {
        textoClick1.style.left = (event.clientX + (window.scrollX || window.pageXOffset) - 10) + 'px';
        textoClick1.style.top = (event.clientY + (window.scrollY || window.pageYOffset) - 40) + 'px';

        }

        document.body.appendChild(textoClick1);

        textoClick1.innerHTML = text; 
        
        setTimeout(function () { textoClick1.remove(); }, 480); 
}

var autoclicker = false

did("tortugaClick").addEventListener('mousedown', function (event) {  if (event.button === 2 && unlocks.autoclicker) { autoclicker=true } })
did("tortugaClick").addEventListener('mouseup', function (event) { if (event.button === 2) { autoclicker=false } })
did("tortugaClick").addEventListener('mouseleave', function () { autoclicker=false })  
did("tortugaClick").addEventListener('mousemove', function () { if (autoclicker) turtleClick() })


//#endregion
//----------------------==========================-----------------------
//----------------------=======EVERY SECOND=======-----------------------
//----------------------==========================-----------------------
//#region Second

cd.jesterCooldown = 1200;

cd.itemOfTheDay = 28800

cd.shopRestock = 259200

var itemOfTheDay = {}
itemOfTheDay.item = 'I93';
itemOfTheDay.price = 'Math.min(stats.totalCoins*0.015,500000)';
itemOfTheDay.bought = false;

function clickIOTD(){
did("IOTD").addEventListener("click", function () {
    if (rpgPlayer.coins >= eval(itemOfTheDay.price) && itemOfTheDay.bought===false && items[itemOfTheDay.item].count!==items[itemOfTheDay.item].max) {

        itemOfTheDay.bought = true;
      
        playSound("audio/button3.mp3"); 
        rpgPlayer.coins -= eval(itemOfTheDay.price);
        items[itemOfTheDay.item].count++;
        stats.boughtItems++;
        did("itemOfTheDay").style.animation = "";
        void did("itemOfTheDay").offsetWidth;
        did("itemOfTheDay").style.animation = "useSkill 0.8s 1";
        refreshItemOfTheDay()
        addItem();
        createItemOfTheDay();

    } else {
        playSound("audio/thud.mp3"); 

    }
  });

}


setInterval(oneSecond, 1000);
function oneSecond() {


if (stats.cddailyPresent1>0) stats.cddailyPresent1--
if (stats.cddailyPresent2>0) stats.cddailyPresent2--
if (stats.cddailyPresent3>0) stats.cddailyPresent3--
if (stats.cddailyPresent4>0) stats.cddailyPresent4--
if (stats.cddailyPresent5>0) stats.cddailyPresent5--
if (stats.cddailyPresent6>0) stats.cddailyPresent6--


 if (!stats.rogue.active && cd.jesterCooldown <= 0 && document.hasFocus() && chance(1/4)) {
    spawnJesterTurtle();
    cd.jesterCooldown = 60;
 }


 if (!stats.rogue.active && cd.presentCanSpawn <= 0 && document.hasFocus() && chance(1/20)) {
    spawnBalloonPresent();
    cd.presentCanSpawn = 60;
 }

 if (cd.itemOfTheDay <= 0) {

    itemOfTheDay.bought = false;

    cd.itemOfTheDay = 28800
    itemOfTheDay.item = rareItems[rng(0,(rareItems.length-1))]
    if (rng(1,2)===1) itemOfTheDay.item = rareItems2[rng(0,(rareItems2.length-1))]
    if (rng(1,10)===1) itemOfTheDay.item = rareItems3[rng(0,(rareItems3.length-1))]
    refreshItemOfTheDay();
 }

did('shopRestock').innerHTML = "Shop restocks in ⏱️ "+convertSecondsToDHM(cd.shopRestock)
did("priceOfTheDay").innerHTML = beautify(eval(itemOfTheDay.price))+" Shells";

 if (cd.shopRestock <= 0) {

    cd.shopRestock = 259200


    for (i in shopItems){
        if ("restock" in shopItems[i]){
            shopItems[i].stock = shopItems[i].restock

            if (did(i+ "shopItem")){

            did(i+ "shopItem").style.animation = "";
            void did(i+ "shopItem").offsetWidth;
            did(i+ "shopItem").style.animation = "levelUp 0.5s 1";

        }

            updateItemShop()
        }
    }

 }

 if (cd.BossCharge<=0 && rpgPlayer.BossCharges<10){
    rpgPlayer.BossCharges++
    cd.BossCharge = 300
    if (rpgPlayer.BossCharges>5) cd.BossCharge = 900
    encounterButtonPress()
 }


    };

const jesterEffects = ['exp','exp','click','click','superClick','pat','pat','superPat']

const jesterEffectsMagic = ['magic','magic','supermagic','exp','click','superClick','pat','superPat']

var itemsOfTheDay = ['I14', 'I26', 'I93', 'I96', 'I97', 'I174', 'I177', 'I178', 'I207', 'I210', 'I219', 'I222']

function refreshItemOfTheDay(){

    if (did("IOTDitemTag") && did("IOTDdisplayItem")){

    if (!itemOfTheDay.bought) {
        did("itemOfTheDayFlair").style.display = "inline";
        did("IOTDitemTag").style.display = "none";
    }else {
        did("itemOfTheDayFlair").style.display = "none";
        did("IOTDitemTag").style.display = "flex";
}
    
    
    
    did("IOTDdisplayItem").src = "img/src/items/"+itemOfTheDay.item+".jpg";
    did("nameOfTheDay").innerHTML = items[itemOfTheDay.item].name;
    did("nameOfTheDay").style.background = returnQualityColor(items[itemOfTheDay.item].quality);

}
    
}

stats.jesterTurtleClicks = 0;

/*var jesterCollectibles = { 
    I294:{P:100,A:1, R:"medium"}, 
    I295:{P:100,A:1, R:"medium"},
  }*/


function createItemOfTheDay(){
        if (!did("IOTD") && unlocks.itemOfTheDay) {
          itemOfTheDay.price = 'Math.min(stats.totalCoins*0.015,500000)';
          const areadiv = document.createElement("div");
          areadiv.id = "IOTD";
          areadiv.innerHTML = '<img id="itemOfTheDayFlair" src="img/src/projectiles/sunray.png"><div class=soldOut id="IOTDitemTag">SOLD OUT</div><img id="IOTDdisplayItem" src="img/src/items/' + items[itemOfTheDay.item].img + '.jpg">';
          did("shopListing").appendChild(areadiv);
          areadiv.className = "shopBox IOTD";
    
    
    
          did("IOTDdisplayItem").style.outline = returnQualityColor(items[itemOfTheDay.item].quality) +" solid 0.15rem";
          tooltipIOTD()
          clickIOTD()
          //tooltip here
        }
    
    
    
    
        if ( did("IOTD") && itemOfTheDay.bought === true ) {
          did("IOTDitemTag").style.display = "flex";
          did("IOTDitemTag").innerHTML = "SOLD OUT";
        } else if (did("IOTD")) {did("IOTDitemTag").style.display = "none";}
    
        

}

function tooltipIOTD(){
if (did("IOTD")){
did("IOTD").addEventListener("mouseenter", function () {

    did("tooltip").style.display = "flex";

    did("tooltip").style.background = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='%23140808' fill-opacity='0.82' d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z'%3E%3C/path%3E%3C/svg%3E"),#231111`;


    did("tooltipName").textContent = items[itemOfTheDay.item].name;
    did("tooltipPrice").innerHTML = "";
    did("tooltipRarity").textContent = items[itemOfTheDay.item].quality;

    did("tooltipRarity").style.color = returnQualityColor(items[itemOfTheDay.item].quality);
    did("tooltipName").style.color = returnQualityColor(items[itemOfTheDay.item].quality);

    did("tooltipDescription").innerHTML = bestiaryTag("❖ Item Of The Day ❖", "#723B63")+'<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(itemOfTheDay.price)) + coinIcon+'Shells<br></div><div class="separador"></div><FONT COLOR="white">' +  items[itemOfTheDay.item].description + '<br><div class="separador"></div>';
    if (items[itemOfTheDay.item].dynamic) did("tooltipDescription").innerHTML = bestiaryTag("❖ Item Of The Day ❖", "#723B63")+'<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(itemOfTheDay.price)) + coinIcon+'Shells<br></div><div class="separador"></div><FONT COLOR="white">' +  eval(items[itemOfTheDay.item].description) + '<br><div class="separador"></div>';
    did("tooltipFlavor").textContent = items[itemOfTheDay.item].flavor;
    did("tooltipImage").src = "img/src/items/" + items[itemOfTheDay.item].img + ".jpg";
    var movingDiv = did("tooltip");
    var referenceDiv = did("IOTD");
    var referenceRect = referenceDiv.getBoundingClientRect();
    var referenceLeft = referenceRect.left;
    var referenceTop = referenceRect.top - 45;
    var newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    var newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });
  did("IOTD").addEventListener("mouseleave", function () {
    resetTooltip();
  });
}
}

/*
function spawnJesterTurtle(){

    const div = document.createElement("div");
    div.id = 'jesterTurtle';
    div.innerHTML = '<img id="jesterImage" src="img/sys/jesterturtle.png">';
    div.style.top= rng(10,80)+'%'
    did("jesterWrapper").appendChild(div);
    setTimeout(() => {div.remove();}, 12000);
    cd.jesterCooldown = 60;

    div.addEventListener("click", function clickHandler() {
        playSound("audio/button9.mp3"); 
        stats.jesterTurtleClicks++;
        //rollTable(jesterCollectibles, 1);
        cd.jesterCooldown = 1200;
        setTimeout(() => {did("jesterImage").style.opacity = 0;}, 100);
        setTimeout(() => {div.remove()}, 1000);
        div.removeEventListener('click', clickHandler);
        animParticleBurst(10 , "particleSpark", "jesterTurtle", 0);
    
        let randomEffect = jesterEffects[rng(0,(jesterEffects.length-1))]
        if (talent.TA1.active) randomEffect = jesterEffectsMagic[rng(0,(jesterEffects.length-1))]
    
        if (randomEffect === 'exp'){
            createFloatingText('<p>EXP BOOST!')
            buffs.B23.time=120; playerBuffs();
        }
        
        if (randomEffect === 'drop'){
            createFloatingText('<p>DROP BOOST!')
            buffs.B24.time=120; playerBuffs();
        }

        if (randomEffect === 'click'){
            createFloatingText('<p>CLICK BOOST!')
            buffs.B25.time=20; playerBuffs();
        }

        if (randomEffect === 'superClick'){
            createFloatingText('<p>CLICK SUPERBOOST!')
            buffs.B26.time=20; playerBuffs();
        }

        if (randomEffect === 'pat'){
            createFloatingText('<p>PAT BOOST!')
            buffs.B27.time=30; playerBuffs();
        }

        if (randomEffect === 'superPat'){
            createFloatingText('<p>PAT SUPERBOOST!')
            buffs.B28.time=20; playerBuffs();
        }

        if (randomEffect === 'magic'){
            createFloatingText('<p>MAGIC OVERCHARGE!')
            rpgPlayer.mana += playerMaxMana
            manaUpdate()
        }

        if (randomEffect === 'supermagic'){
            createFloatingText('<p>MAGIC MEGACHARGE!')
            rpgPlayer.mana += playerMaxMana*2
            manaUpdate()
        }

    
    });
}
*/



async function spawnJesterTurtle(){

    const div = document.createElement("img");

    div.id = 'jesterTurtle1';
    div.src = "img/sys/bloonturtle1.png"

    if (stats.jesterTurtleClicks>19 && chance(1/4)){
        div.id = 'jesterTurtle2';
        div.src = "img/sys/bloonturtle2.png"
    }

    if (stats.jesterTurtleClicks>49 && chance(1/7)){
        div.id = 'jesterTurtle3';
        div.src = "img/sys/bloonturtle3.png"
    }  

    did("jesterTurtleWrapper").appendChild(div);
    setTimeout(() => {div.remove();}, 29000);



    div.addEventListener('click', function(event) { 
        stats.jesterTurtleClicks++;
        stats.jesterTurtleClicksLog++;
        cd.jesterCooldown = 600;
        div.style.scale = "1.5"
        div.style.opacity = "0"
        div.style.pointerEvents = "none"
        setTimeout(() => {div.remove();}, 500);

        if (div.id==="jesterTurtle1") { blooneffects1[rng(0,(blooneffects1.length-1))].time = 600 }
        if (div.id==="jesterTurtle2") { blooneffects2[rng(0,(blooneffects2.length-1))].time = 300 }
        if (div.id==="jesterTurtle3") { blooneffects3[rng(0,(blooneffects3.length-1))].time = 60 }


        playerBuffs()

        playSound("audio/pop4.mp3")
        playSound("audio/ding2.mp3")


    })


    if (div.id==="jesterTurtle2" || div.id==="jesterTurtle3") {
        while (document.body.contains(div)) {
            await delay(100)
            let bloonrect = div.getBoundingClientRect();
            const bloonX = bloonrect.left - containerRect.left + bloonrect.width / 2;
            const bloonY = bloonrect.top - containerRect.top + bloonrect.height / 2;
            particleTrackers.push(new ParticleShinyStar(bloonX,bloonY,{offsetY:rngD(20,100),offsetX:rngD(-40,70), rotationSpeed : rngD(-0.1,0.1) }));
        }
    }
    

}




const blooneffects1 = [buffs.Bloon1Luck,buffs.Bloon1Exp,buffs.Bloon1Luma,buffs.Bloon1Income,buffs.Bloon1Speed,]
const blooneffects2 = [buffs.Bloon2Luck,buffs.Bloon2Exp,buffs.Bloon2Luma,buffs.Bloon2Income,buffs.Bloon2Speed,]
const blooneffects3 = [buffs.Bloon3Luck,buffs.Bloon3Exp,buffs.Bloon3Luma,buffs.Bloon3Income,buffs.Bloon3Speed,]




async function spawnBalloonPresent(){

    const div = document.createElement("img");

    div.id = 'balloonPresent';
    div.src = "img/sys/bloonPresent.png"

    did("jesterTurtleWrapper").appendChild(div);
    setTimeout(() => {div.remove();}, 29000);
    //cd.jesterCooldown = 60;



    div.addEventListener('click', function(event) { 

        
        div.style.scale = "1.5"
        div.style.opacity = "0"
        div.style.pointerEvents = "none"
        setTimeout(() => {div.remove();}, 500);


        cd.presentCanSpawn = 900 

        startMysteryMinigame()


        playSound("audio/pop4.mp3")
        playSound("audio/ding2.mp3")


    })


        while (document.body.contains(div)) {
            await delay(100)
            let bloonrect = div.getBoundingClientRect();
            const bloonX = bloonrect.left - containerRect.left + bloonrect.width / 2;
            const bloonY = bloonrect.top - containerRect.top + bloonrect.height / 2;
            particleTrackers.push(new ParticleShinyStar(bloonX,bloonY,{offsetY:rngD(20,100),offsetX:rngD(-40,70), rotationSpeed : rngD(-0.1,0.1) }));
        }
    
    

}





  //#endregion
//----------------------==========================-----------------------
//----------------------==========SOUNDS==========-----------------------
//----------------------==========================-----------------------
//#region Sounds

let savedSound;

function changeVolume(){

    savedSound = volumeSlider.value*2/1000;


}



/*function playSound(filename, type){




    if (!settings.disableAudio && document.hasFocus()){

    const visibleShops = document.querySelector('.dedicatedShop[style*="display: flex"]');
    if (visibleShops && type!=="all") return

    if (type === "all" || ( did("gachaMenu").style.display !== "flex" && did("introPanel").style.display !== "flex" ) ) {

    var audio = new Audio(filename);
    if (savedSound !== undefined){
    volumeSlider.value = savedSound/2*1000
        audio.volume = savedSound;
    }
    else {audio.volume = 0.06;}
    
    audio.play();

}

}
}*/



// Crear un AudioContext global
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(filename, type) {

    if (!document.hasFocus()) return

    
    if (!settings.disableAudio && document.hasFocus()) {

        const visibleShops = document.querySelector('.dedicatedShop[style*="display: flex"]');
        if (visibleShops && type !== "all") return;
        if (did("characterPanel").style.display === "flex" && type !== "all") return


        if (type === "all" || (did("gachaMenu").style.display !== "flex" && did("introPanel").style.display !== "flex")) {

            // Reactivar el AudioContext si está suspendido
            if (audioContext.state === "suspended") {
                audioContext.resume();
            }

            // Crear un nodo de ganancia para el volumen
            const gainNode = audioContext.createGain();
            gainNode.gain.value = savedSound !== undefined ? savedSound : 0.06;

            // Cargar el archivo de audio
            fetch(filename)
                .then(response => response.arrayBuffer())
                .then(data => audioContext.decodeAudioData(data))
                .then(buffer => {
                    const source = audioContext.createBufferSource();
                    source.buffer = buffer;

                    // Aplicar cambio de pitch
                    if (type!=="noPitch"){
                    const randomDetune = rngD(-300,300); // Rango entre -200 y 200 cents (~2 semitonos)
                    source.detune.value = randomDetune;
                    }

                    // Conectar nodos y reproducir
                    source.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    source.start(0);

                    // Opcional: Liberar recursos cuando termine de reproducir
                    source.onended = () => {
                        source.disconnect();
                        gainNode.disconnect();
                    };
                })
                .catch(error => console.error("Error al cargar el sonido:", error));
        }
    }
}




let currentAudio = null;

function playSong(filename) {
    // Si hay una canción sonando, detenerla antes de iniciar una nueva
    if (currentAudio) {
        stopSong(); 
    }

    if (!settings.disableAudio) {
        currentAudio = new Audio(filename);

        if (savedSound !== undefined) {
            volumeSlider.value = savedSound / 2 * 1000;
            currentAudio.volume = savedSound/10;
        } else {
            currentAudio.volume = 0.005; // Volumen predeterminado
        }

        currentAudio.play();
    }
}

function stopSong(fadeDuration = 2000) {
    if (currentAudio!==null) {
        const startVolume = currentAudio.volume;
        const fadeStep = 50; // Tiempo entre cada paso en ms

        const fadeOut = () => {
            const volumeDecrease = startVolume * (fadeStep / fadeDuration);

            if (currentAudio.volume > volumeDecrease) {
                currentAudio.volume -= volumeDecrease; // Reducir volumen gradualmente
                setTimeout(fadeOut, fadeStep); // Llamar de nuevo hasta completar el fade out
            } else {
                currentAudio.volume = 0;
                currentAudio.pause(); // Pausar cuando el volumen llegue a 0
                currentAudio = null;
            }
        };

        fadeOut(); // Iniciar el proceso de fade out
    }
}



  //#endregion
//----------------------==========================-----------------------
//----------------------======WEATHER SYSTEM======-----------------------
//----------------------==========================-----------------------
//#region Weather
stats.rpgTime = 0;
stats.currentWeather = 'day';
var bluemoonExpUp = 0;
var bluemoonDmgUp = 0;
var sakuraDropUp = 0;
var rainFishingUp = 0;

const weatherTick = 10000 //10000

setInterval(weatherCheck, weatherTick); 

function weatherStartup(){

    setTimeout(() => {
        did("dayNightCycle").style.transition = `${weatherTick}ms linear`
        did("dayNightCycleTint").style.transition = `${weatherTick}ms linear`
        did("mainScreen").style.transition = `${weatherTick}ms linear`    
    }, 100);

    if (stats.currentWeather === 'day'){
        did("mainScreen").style.backgroundColor = "#9EE9EF"
        did("dayNightCycleTint").style.background = "transparent"
    }

    if (stats.currentWeather === 'night'){
        did("mainScreen").style.backgroundColor = "#232D44"
        did("dayNightCycleTint").style.background = "#232D44"
    }

}

let specialWeather = false


function weatherCheck() {
    stats.rpgTime++;
    if (stats.rpgTime>60) stats.rpgTime = 0;

    if (stats.rpgTime===0){
       dayTime()
    }
 
    if (stats.rpgTime===25 || stats.rpgTime===57){

        if ( stats.currentArea !== "L2" ) {
        did("mainScreen").style.backgroundColor = "#D4A379"
        did("dayNightCycleTint").style.background = "#D4A379"
        }
    }

    if (stats.rpgTime===30){
        nightTime()
    }


    function dayTime(){
        stats.currentWeather = 'day'
        //resets the position of the sun directly to avoid weird rotations
        did("dayNightCycle").style.transition = `none`
        did("dayNightCycle").style.rotate = `${0}deg`
        setTimeout(() => { did("dayNightCycle").style.transition = `${weatherTick}ms linear` }, 100);

        did("mainScreen").style.backgroundColor = "#9EE9EF"
        did("dayNightCycleTint").style.background = "transparent"

        if ( stats.currentArea === "L2" ) {
            did("dayNightCycleTint").style.background = "#232D44"
            did("mainScreen").style.backgroundColor = "#232D44"

        }


        specialWeather = false
        if ( stats.currentArea!=="A2" && chance(1/10)) specialWeather = true

        updateItemShop()
    }


    function nightTime(){
        stats.currentWeather = 'night'

        did("mainScreen").style.backgroundColor = "#232D44"
        did("dayNightCycleTint").style.background = "#232D44"

        if ( stats.currentArea==="A2" && chance(1/10)) specialWeather = true

        updateItemShop()
    }

    did("dayNightCycle").style.rotate = `${((stats.rpgTime-10) / 60) * 360}deg`

    

    /*

    
    if (stats.rpgTime===480){
        stats.currentWeather='day' 
        if(rng(1,15)===1) stats.currentWeather='rain'
        if(rng(1,30)===1) stats.currentWeather='sakura'
    }

    if (stats.rpgTime===1200){
        stats.currentWeather='night'
        if(rng(1,20)===1) stats.currentWeather='bluemoon'
        if(rng(1,20)===1) stats.currentWeather='snow'
        if(rng(1,50)===1) stats.currentWeather='vortex'
    }

    //este codigo se repite multiples veces pese a que claramente no deberia y no se que hacer con esto
    if (stats.currentWeather === 'day' && !(document.getElementById('currentWeather').src.endsWith("day.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/day.png"; did('weatherOverlay').style.opacity = 0; did('weatherEffectOverlay').style.opacity = 0; statsUpdate(); updateStatsUI();}
    if (stats.currentWeather === 'night' && !(document.getElementById('currentWeather').src.endsWith("night.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/night.png"; did('weatherOverlay').style.opacity = 0.5; did('weatherEffectOverlay').style.opacity = 0; statsUpdate(); updateStatsUI();}
    if (stats.currentWeather === 'bluemoon' && !(document.getElementById('currentWeather').src.endsWith("bluemoon.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/bluemoon.png"; did('weatherOverlay').style.opacity = 0.5; did('weatherOverlay').style.background = "#010028"; did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/bluemoon.gif)"; did('weatherEffectOverlay').style.opacity = "0.5"; bluemoonExpUp = 1; bluemoonDmgUp = 0.2; statsUpdate(); updateStatsUI(); }
    if (stats.currentWeather === 'vortex' && !(document.getElementById('currentWeather').src.endsWith("vortex.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/vortex.png"; did('weatherOverlay').style.opacity = 0.5; did('weatherOverlay').style.background = "#18011F" ;did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/vortex.gif)";  did('weatherEffectOverlay').style.opacity = "1";  did('weatherEffectOverlay').style.backgroundSize = "150%"; did('weatherEffectOverlay').style.backgroundPosition = "150% 60%"; statsUpdate(); updateStatsUI();}
    if (stats.currentWeather === 'rain' && !(document.getElementById('currentWeather').src.endsWith("rain.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/rain.png"; did('weatherOverlay').style.opacity = 0; did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/rain.gif)";  did('weatherEffectOverlay').style.opacity = "1"; rainFishingUp = 1; statsUpdate(); updateStatsUI();}
    if (stats.currentWeather === 'sakura' && !(document.getElementById('currentWeather').src.endsWith("sakura.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/sakura.png"; did('weatherOverlay').style.opacity = 0.2; did('weatherOverlay').style.background = "#512551" ;did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/sakura.gif)";  did('weatherEffectOverlay').style.opacity = "1"; sakuraDropUp = 50; statsUpdate(); updateStatsUI();}
    if (stats.currentWeather === 'snow' && !(document.getElementById('currentWeather').src.endsWith("snow.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/snow.png"; did('weatherOverlay').style.opacity = 0.35; did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/snow.gif)";  did('weatherEffectOverlay').style.opacity = "1"; statsUpdate(); updateStatsUI();}
    
*/

};

    function resetOverlay(){

        did('weatherOverlay').style.background = "#030222";
        did('weatherEffectOverlay').style.backgroundSize = "50%";
        did('weatherEffectOverlay').style.backgroundPosition = "100%";
        bluemoonExpUp = 0;
        bluemoonDmgUp = 0;
        sakuraDropUp = 0;
        rainFishingUp = 0;
    }

  //#endregion
//----------------------==========================-----------------------
//----------------------==========TOOLTIPS========-----------------------
//----------------------==========================-----------------------
//#region Tooltips










function tooltipTopWidget(id,text) {
    did(id).addEventListener('mouseenter', function () { //on mouseenter

    did('tooltip').style.display = "flex";
    did("upperTooltip").style.display = 'none';
    did('tooltip').style.width = "auto";

    did("tooltipFlavor").textContent = '';
    did("tooltipDescription").style.textAlign = "center";

    did("tooltipDescription").innerHTML = `<span style="white-space: nowrap; padding:1rem">${text}</span><br><div class="separator" style="margin:0; margin-bottom:0.5rem"></div>`;

    const movingDiv = did('tooltip');
    const referenceDiv = did(id);
    const referenceRect = referenceDiv.getBoundingClientRect();
    const tooltipWidth = movingDiv.offsetWidth;
    const newLeft = referenceRect.left/ (stats.zoomLevel/100) + referenceRect.width / 2 - tooltipWidth / 2;
    const newTop = referenceRect.bottom/ (stats.zoomLevel/100); 
    
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 20 + 'px';
        
  });
    did(id).addEventListener('mouseleave', function () {
    resetTooltip();
    });
  
}

tooltipTopWidget("settingsWidget","Game Settings")
tooltipTopWidget("dailyPresent","Whiskers Gratitude")
tooltipTopWidget("mailWidget","Mail")
tooltipTopWidget("gachaWidget","Shellshine Co. Delivery")
tooltipTopWidget("achievementShopWidget","Achievements")
tooltipTopWidget("exportWidget","Export your data and get a reward!")
tooltipTopWidget("bestiaryShopWidget","Bestiary")
tooltipTopWidget("encounterEasy","Fight a meddlesome foe")
tooltipTopWidget("encounterMedium","Fight a troublesome foe")
tooltipTopWidget("encounterHard","Fight a frightsome foe")
tooltipTopWidget("bossButton",`Fight the boss of the area<br><br>Can only be fought ${rpgPlayer.BossCharges} more times`)
tooltipTopWidget("miningNode","Area Resource")
tooltipTopWidget("herbNode","Area Resource")
tooltipTopWidget("pondNode","Area Resource")
tooltipTopWidget("exitWidget","Character Selection")




tooltipTopWidget("randomHat","Random Favorited Cosmetic")

cd.BossCharge = 300
    did("bossButton").addEventListener('mouseenter', function () { //on mouseenter

    did('tooltip').style.display = "flex";
    did("upperTooltip").style.display = 'none';
    did('tooltip').style.width = "auto";

    did("tooltipFlavor").textContent = '';
    did("tooltipDescription").style.textAlign = "center";

    let rechargeText= ""
    if (rpgPlayer.BossCharges<10) rechargeText= `and will gain another chance in ${ convertSecondsToHMS(cd.BossCharge,"mini")}`

    did("tooltipDescription").innerHTML = `<span style="white-space: nowrap; display:inline-block;justify-content:center;align-items:center;">
    Fight the boss of the area
    <br>
    <div class="separator" style="margin:0; margin-bottom:0.5rem"></div>
    
    <span style="color:gray">
    Can only be defeated${colorTag( rpgPlayer.BossCharges+"/10", "orange")}more times
    <br>
    ${rechargeText}
    

    </span>
    </span><br>`;

    const movingDiv = did('tooltip');
    const referenceDiv = did("bossButton");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const tooltipWidth = movingDiv.offsetWidth;
    const newLeft = referenceRect.left/(stats.zoomLevel/100) + referenceRect.width / 2 - tooltipWidth / 2;
    const newTop = referenceRect.bottom/(stats.zoomLevel/100); 
    
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 20 + 'px';
        
  });
    did("bossButton").addEventListener('mouseleave', function () {
    resetTooltip();
    });
  

















function resetTooltip(){
    
   did('tooltip').style.display = "none"; 
   did('tooltip').style.width = "35rem"; 
   did('tooltip').style.minWidth = "0"; 
   did("tooltipArrowUp").style.display = 'none';
   did("tooltipArrow").style.display = 'flex';      
   did("upperTooltip").style.display = 'flex'; 
   did('tooltipImage').style.display = "flex"; 
   did("tooltipFlavor").style.display = "flex"
   did('tooltipAlign').src = "img/src/projectiles/none.png"; 
   did('tooltipDescription').style.textAlign = '';    
   did("tooltipArrow").style.right = '10%';
   did("tooltipArrowRight").style.display = "none";
   did("tooltipArrowRight").style.top = ""; 
   did('tooltip').style.top = '';
   did('tooltip').style.left = ''; 
   did('tooltip').style.right = ''; 
   did('tooltip').style.bottom = '';
   did('tooltipImage').style.filter = "none"
   did("tooltip").style.backgroundImage = "url(img/sys/fondotooltip.png)";
   did("tooltip").style.background = ""
   did("tooltipArrowUp").style.right = '2%'
   did("tooltip").style.outline = `white solid 2px`;
   did("tooltip").style.animation = `interactableTooltipIdle 3s infinite`;
   did("contextList").innerHTML = ""

   
}

function tooltipWeather() {
    did("weatherButton").addEventListener("mouseenter", function () {
    
      did("tooltip").style.display = "flex";
      if (stats.currentWeather==="day"){
         did("tooltipName").textContent = "Sunny Day";
         did("tooltipFlavor").textContent = '"The birds are singing, flowers are blooming, on days like these, turtles like you, should have a good day."';
         did("tooltipDescription").innerHTML = '<span style="color:gray">No special weather bonuses.</span>';
      }

      if (stats.currentWeather==="night"){
        did("tooltipName").textContent = "Calm Night";
        did("tooltipFlavor").textContent = '"Its oddly calm tonight."';
        did("tooltipDescription").innerHTML = '<span style="color:gray">No special weather bonuses.</span>';
     }

      if (stats.currentWeather==="bluemoon"){
        did("tooltipName").textContent = "Blue Moon";
        did("tooltipFlavor").textContent = '"The stars seem aligned today..."';
        did("tooltipDescription").innerHTML = '<span style="color:#1EFF0C">❖ Increased EXP gain by 100%<br>❖ Increased '+occultIcon+' Occult damage by 20%</span>';
     }

      if (stats.currentWeather==="rain"){
         did("tooltipName").textContent = "Rainy Day";
         did("tooltipFlavor").textContent = '"The sky is specially wet today."';
         did("tooltipDescription").innerHTML = '<span style="color:#1EFF0C">❖ +1 Fishing Level<br>❖ Garden feels refreshed</span>';
      }

      if (stats.currentWeather==="snow"){
         did("tooltipName").textContent = "Snowy Night";
         did("tooltipFlavor").textContent = '"Beware of the yellow snow."';
         did("tooltipDescription").innerHTML = '<span style="color:gray">No special weather bonuses.</span>';
      }

      if (stats.currentWeather==="sakura"){
        did("tooltipName").textContent = "Sakura Fall";
        did("tooltipFlavor").textContent = '"Sakura petals drift, Whispering the springtimes end, Beautys gentle fall."';
        did("tooltipDescription").innerHTML = '<span style="color:#1EFF0C">❖ +50% Flower Power</span>';
     }

     if (stats.currentWeather==="vortex"){
        did("tooltipName").textContent = "Reality Shift";
        did("tooltipFlavor").textContent = '"Well that doesnt look good at all."';
        did("tooltipDescription").innerHTML = '<span style="color:#1EFF0C">❖ Alignment weakness and strengths switched!</span>';
     }



      
      did("tooltipPrice").innerHTML = "";
      did("tooltipRarity").innerHTML = "Weather";
      did("tooltipRarity").style.color = "white";
      did("tooltipName").style.color = "white";
      did("tooltipImage").src = "img/src/icons/" + stats.currentWeather + ".png";
      did("tooltipArrowUp").style.display = 'flex'
      did("tooltipArrow").style.display = 'none'
      


      const movingDiv = did("tooltip");
const referenceDiv = did("weatherButton");
const referenceRect = referenceDiv.getBoundingClientRect();
const referenceRight = referenceRect.right; // Derecha de currentWeather
const referenceBottom = referenceRect.bottom -1; // Abajo de currentWeather
const newLeft = referenceRight - movingDiv.offsetWidth;
const newTop = referenceBottom;
movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop + "px";

    });
    did("weatherButton").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  } tooltipWeather();

//#endregion
//----------------------==========================-----------------------
//----------------------==========SETTINGS========-----------------------
//----------------------==========================-----------------------
//#region Settings
//-----pannel buttons-----

function closeDedicatedShop(id){
    playSound("audio/close.mp3","all")
    stopSong(1000)
        did(id).style.height = "0%";
        did("body").style.display = "inline"

        setTimeout(() => {
            did(id).style.display = "none";
        }, 500);
}

function openDedicatedShop(id){
    playSound("audio/button5.mp3")
    playSound("audio/pop4.mp3")
    playSong("audio/dedicatedShopOst.mp3")

    did(id).style.display = "flex";
    //did(id+"Widget").style.animation = "none";
    setTimeout(() => {
        did(id).style.height = "100%";
    }, 1);

    setTimeout(() => {
        did("body").style.display = "none"
    }, 500);
}


function openSettings() {

    playSound("audio/button5.mp3")
    playSound("audio/pop3.mp3")

    did("settingsDarken").style.display = "flex"
    did("settingsMenu").style.display = "flex"










}












var settings = {
    disableClickText:false, disableAutosave:false, disablePenguinRecap: false, disableDamageNumbers: false, disableParticles: false,
};

function toggleSettings(i) {
    playSound("audio/button1.mp3");
    if (!settings[i]) {settings[i]=true}
    else if (settings[i]) {settings[i]=false}
    toggleSettingsUI()
}

function toggleSettingsUI(){
    for (let i in settings) {
        if (did(i)) {
    if (settings[i]) {
        did(i).innerHTML = 'ON';
        did(i).style.background = '#6BB23E';
    }
    else if (!settings[i]) {
        did(i).innerHTML = 'OFF';
        did(i).style.background = '#373737';
    }

    }
}


settings.nofarmToggle ? did("fastModeInfo").style.display = "flex" : did("fastModeInfo").style.display = "none"
settings.hardmodeToggle ? did("hardModeInfo").style.display = "flex" : did("hardModeInfo").style.display = "none"


}

//-----category button on the left----- (weird placement but oh well)

const tabs = ["campTab","achievementsTab","townshipTab", "rpgTab", "jobTab"];
const containers = ["achievementContainer","campContainer", "townshipContainer", "rpgContainer", "jobContainer"]
const titles =["campTitle", "achievementsTitle", "townshipTitle", "rpgTitle", "jobTitle"];


function tabSwitch(x,y,z) {
did(x).addEventListener("click", function () {


    

    if (!dungeonTime && !showdownTime && skirmishTime===false){

        did("tooltip2").style.display = "none"
    
    if (!did(x).classList.contains("botonLateralActivo")){

        playSound("audio/button2.mp3");

containers.forEach(function(id) {
    setTimeout(function () { did(id).style.display = "none" }, 150);
    did(id).style.animation = "desvanecerPanel 0.3s";
})
        
titles.forEach(function(id) {
    setTimeout(function () { did(id).style.display = "none" }, 150);
    did(id).style.animation = "desvanecerPanel 0.3s";
})        
    
setTimeout(function () { did(y).style.display = "flex"; did(z).style.display = "flex"; }, 150);
did(y).style.animation = "aparecerPanel 0.3s"; did(z).style.animation = "aparecerPanel 0.3s";
    
tabs.forEach(function(id) { did(id).classList.remove("botonLateralActivo"); })

did(x).classList.add("botonLateralActivo");
    
stats.currentCategory = y;

if(unlocks.garden)plantGrow()

setTimeout(() => {
    inventoryCulling()
}, 300); 
    
}   

createRecipe()

} else {

    playSound("audio/thud.mp3");

}
    
})};

tabSwitch ("campTab", "campContainer", "campTitle");
tabSwitch ("achievementsTab", "achievementContainer", "achievementsTitle");
tabSwitch ("townshipTab", "townshipContainer", "townshipTitle");
tabSwitch ("rpgTab", "rpgContainer", "rpgTitle");
tabSwitch ("jobTab", "jobContainer", "jobTitle");


function rememberCategory(){
    
   did(stats.currentCategory).style.display = "flex"
    
   if (stats.currentCategory === "campContainer") {did("campTab").classList.add("botonLateralActivo"); did("campTitle").style.display = "flex"; }
   if (stats.currentCategory === "achievementContainer") {did("achievementsTab").classList.add("botonLateralActivo"); did("achievementsTitle").style.display = "flex";}
   if (stats.currentCategory === "townshipContainer") {did("townshipTab").classList.add("botonLateralActivo"); did("townshipTitle").style.display = "flex";}
   if (stats.currentCategory === "rpgContainer") {did("rpgTab").classList.add("botonLateralActivo"); did("rpgTitle").style.display = "flex";}
   if (stats.currentCategory === "jobContainer") {did("jobTab").classList.add("botonLateralActivo"); did("jobTitle").style.display = "flex";}
    
}


function settingsPanel (x,y){

did(x).addEventListener("click", function (event) {
    playSound("audio/button3.mp3");
    did(y).style.display = "flex";
    did("bodyCover").style.display = "flex";
    //did("body").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    //event.stopPropagation();






});
}

settingsPanel ("settingsCard", "opciones");





did("bodyCover").addEventListener("click", function () { closePanels() })

function closePanels(){
    playSound("audio/close.mp3")
    did("opciones").style.display = "none";
    did("estadisticas").style.display = "none";
    did("changelog").style.display = "none";
    did("deleteData").style.display = "none";
    did("mailLetter").style.display = "none";
    did("catalogue").style.display = "none";
    did("armory").style.display = "none";
    did("bestiary").style.display = "none";
    did("support").style.display = "none";
    did("skillMenu").style.display = "none";
    did("upgradeMenu").style.display = "none";
    did("mailMenu").style.display = "none";
    did("rankMenu").style.display = "none";
    did("gardenShop").style.display = "none";
    did("turtleRename").style.display = "none";
    did("tipPanel").style.display = "none";
    did("masteryGuide").style.display = "none";
    did("gameGuide").style.display = "none";
    did("plantCatalogue").style.display = "none";
    did("boughtUpgradesPanel").style.display = "none";
    did("bodyCover").style.display = "none";
    did("fertiliserMenu").style.display = "none";
    did("honorShop").style.display = "none";
    did("body").style.backgroundColor = "transparent";
    did("body").style.filter = "none";

    did("outdatedData").style.display = "none";

    if (returnToArmory){
        returnToArmory=false;
        did("armory").style.display = "flex";
        did("bodyCover").style.display = "flex";

    }
}

let saveToDelete = undefined
 
function deleteSavePrompt(){
    playSound("audio/button3.mp3","all")
    did("opciones").style.display = "none";
    did("deleteData").style.display = "flex";


    let slot = saveToDelete
    if (saveToDelete===1) slot = ""

    const character = localStorage.getItem('saveData'+slot);
    const parsedData = JSON.parse(character);
            
    did("deleteDataCharacter").innerHTML = `
            ${parsedData.savedStatsData.turtleName} (Slot ${saveToDelete})
            <br>
            Started on ${parsedData.savedStatsData.startedSince}
            `


}

//-----statistics-------

settingsPanel ("supportCard", "support");

setInterval(() => { if (did("support").style.display != "none") { patreonShine() } }, 2000);

function patreonShine(){
    for (let i = 0; i < patreonTier2.length; i++) {
    if (rng(1,3)===1) animParticleBurst(rng(1,3) , "particleSpark", patreonTier2[i] + "patreonTier2", 0);
}

for (let i = 0; i < patreonTier1.length; i++) {
    if (rng(1,3)===1) animParticleBurst(rng(1,3) , "particleSpark", patreonTier1[i] + "patreonTier1", 0);
}

}


for (let i = 0; i < patreonTier1.length; i++) {
    if (!did(patreonTier1[i] + "patreonTier1")) {
        const div = document.createElement("span");
        div.id = patreonTier1[i] + "patreonTier1";
        div.innerHTML = patreonTier1[i];
        did('patreonList1').appendChild(div);
    }
}

for (let i = 0; i < patreonTier2.length; i++) {
    if (!did(patreonTier2[i] + "patreonTier2")) {
        const div = document.createElement("span");
        div.id = patreonTier2[i] + "patreonTier2";
        div.innerHTML = patreonTier2[i];
        did('patreonList2').appendChild(div);
    }
}

for (let i = 0; i < patreonTier3.length; i++) {
    if (!did(patreonTier3[i] + "patreonTier3")) {
        const div = document.createElement("span");
        div.id = patreonTier3[i] + "patreonTier3";
        div.innerHTML = patreonTier3[i];
        did('patreonList3').appendChild(div);
    }
}








settingsPanel ("statsCard", "estadisticas");

settingsPanel ("guideCard", "gameGuide");

rpgPlayer.playerSeed = 0


window.addEventListener('load', function () { //gets date started
    if (stats.startedSince === 0) {
        stats.startedSince = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
        did('botonGameGuide').style.animation = "newGameTip 1.5s infinite linear"
    }
    did('estadisticaStartDate').textContent = stats.startedSince;
    if (rpgPlayer.playerSeed === 0) rpgPlayer.playerSeed = rng(10000,99999)
});


cd.presentCooldown = 0;
cd.presentCanSpawn = 2000;
cd.gildedCooldown = 10000;

function timeCounters() {

    stats.activeSeconds++;
    stats.activeSecondsLog++;
    stats.totalSeconds++;

    for (let i in cd) if (cd[i]>0) {cd[i]--}

    if (cd.exportReminder<=0){

        //if (!settings.disableExportReminder) {
            did('exportWidget').style.display = "flex"
            did('exportSave').style.animation = "newGameTip2 3s infinite linear"
    //}

}

    did("estadisticaPlaytime").textContent = convertSecondsToHMS(stats.activeSeconds);
    did("statTotalPlaytime").textContent = convertSecondsToHMS(stats.totalSeconds);


    

}setInterval(timeCounters, 1000);

//----turtle naming----

settingsPanel ("editName", "turtleRename");

var logTrackName = 'base';

function enterName(event) {
    if (event.key === "Enter" && did("namingBox").value.length >= 1) {stats.turtleName = did("namingBox").value; logTrackName = did("namingBox").value; displayTurtleName(); closePanels(); if (did("namingBox").value==="squeaky" || did("namingBox").value==="Squeaky") {rareItemDrop("I172",1)}}
}
function displayTurtleName(){



    did("turtleName").textContent = stats.turtleName; did('turtleName2').textContent = stats.turtleName;
    if (patreonTier1.includes(stats.turtleName) || patreonTier1Alt.includes(stats.turtleName)) did("turtleName").style.color = "#C672FA";
    else if (patreonTier2.includes(stats.turtleName) || patreonTier2Alt.includes(stats.turtleName)) did("turtleName").style.color = "#FF6B43";
    else if (patreonTier3.includes(stats.turtleName) || patreonTier3Alt.includes(stats.turtleName)) did("turtleName").style.color = "#92DB76";
    else did("turtleName").style.color = "white"

}


did("randomiseName").onclick = function() {

    playSound("audio/button1.mp3");


    voidAnimation("namingBox","gelatine 0.3s 1")

    const randomNames = [`Jeffrey`, `Cutie`, `Kio`, `Pickle`, `Peanuts`, `Nibbles`, `Waddlie`, `Kiwi`, `Scooter`, `Carl`, `Bean`, `Jeremy The Second VII`, `Mango`,
        `Pip`, `Boots`, `Rufus`, `Stinker`, `Winston`, `Rufus`, `Cookie`, `Frank`, `Tummy`, `Stumpy`, `Bob`, `Olive`, `Shelly`, `Coco`, `Sprout`, `Chip`, `Monch`
        ,`Binky`, `Pocky`, `Flowey`, `Quib`, `Peach`, `Robert`, `Lui`, `Luigi`, `Mikey`, `Pizza`, `QT`, `John Turtleidle`, `Marco`, `Polo`, `Asparagus`, `Pea`, `Lime`, `Mint`, `Lettuce`, `Pistachio`, `Lillium`]
    
    namingBox.value = randomNames[rng(0,(randomNames.length-1))]



};


//----bought upgrades---

settingsPanel ("boughtUpgradesButton", "boughtUpgradesPanel");

//------changelog-------

settingsPanel ("changelogCard", "changelog");

//------unlock animation-------
function unlockAnimation(title, description, image){

    resetTooltip();

    playSound("audio/ding2.mp3");


    did("unlockPanel").style.opacity = "1"
    did("unlockPanel").style.display = "flex"
    did("unlockedItem").src = image
    did("unlockedName").innerHTML = title
    did("unlockedDescription").innerHTML = description
    did("unlockBall").src = ""
    did("unlockBall").src = "img/sys/unlockAnimation.gif"

    setTimeout(() => {
        did("unlockedAura").style.display = "flex"
        did("unlockedItem").style.display = "flex"
        playSound("audio/hit4.mp3");
        playSound("audio/pop3.mp3");

    }, 1000);

    setTimeout(() => {
        did("unlockedName").style.opacity = "1"
    }, 2000);

    setTimeout(() => {
        did("unlockedDescription").style.opacity = "1"
    }, 3000);
    
    setTimeout(() => {
        did("unlockedClose").style.opacity = "1"
    }, 7000);
}

function closeUnlockAnimation(){

    if (did("unlockedClose").style.opacity === "1") {

    did("unlockPanel").style.opacity = "0"

setTimeout(() => {
    did("unlockedClose").style.opacity = "0"
    did("unlockedDescription").style.opacity = "0"
    did("unlockedName").style.opacity = "0"
    did("unlockPanel").style.display = "none"
    did("unlockedAura").style.display = "none"
    did("unlockedItem").style.display = "none"
}, 2000);

}

}




did('botonGameGuide').addEventListener('mouseenter', function () {  did('botonGameGuide').style.animation = "none" });
   
        
  
document.addEventListener('click', function(event) {
    if (event.target.id && event.target.id.endsWith('gametip')) {
        let itemID = event.target.id.replace('gametip', '');
        let imgID = itemID.replace('gt', '');

        playSound("audio/button3.mp3");

        for (i in gametip){
            if (did(i+"gametip")){
               did(i+"gametip").className = "gametip"
            }
        }

        did("gameGuideImage").src = 'img/src/gametips/'+imgID+'.png'
        did("gameGuideDescription").innerHTML = gametip[itemID].description

        did("gameGuideLeft").style.display = "inline"

        did("gameGuideImage").style.animation = "";
        void did("gameGuideImage").offsetWidth;
        did("gameGuideImage").style.animation = "faintStrike 0.3s 1";

        did("gameGuideDescription").style.animation = "";
        void did("gameGuideDescription").offsetWidth;
        did("gameGuideDescription").style.animation = "faintStrike 0.3s 1";

        did(event.target.id).className = "gametipActive"
    }
});

function createGametip() {
    for (let i in gametip) {
    
    if (!did(i+"gametip")) {

        if (gametip[i].unlocked){
  
      const div = document.createElement("div");
      div.innerHTML = gametip[i].name;
      div.id = i+"gametip";
      div.className = "gametip";
      did("gameGuideListing").appendChild(div)

    }

    }
  
  
  }
  }
  createGametip()



  
















//#endregion
//----------------------==========================-----------------------
//----------------------===========IDLING=========-----------------------
//----------------------==========================-----------------------
//#region Idling

function convertSecondsToHMS(seconds, size) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;




    if (size==="mini") {
        if (hours>0) return `${hours}h ${minutes}m`; 
        return `${minutes}m ${remainingSeconds.toFixed(0)}s`;
    } 
    else if (size==="micro") return seconds < 60 ? seconds : Math.floor(seconds / 60) + "m"
    else return `${hours}h ${minutes}m ${remainingSeconds.toFixed(0)}s`;
}


function convertSecondsToDHM(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m`;
}

/*

let lastofflinetime = 0


function calculateInactiveTime() { //calculates idle time
    const lastVisitTime = localStorage.getItem('lastVisitTime');
    if (lastVisitTime) {
        const currentTime = new Date().getTime();
        const inactiveTime = currentTime - parseInt(lastVisitTime);
        const secondsInactive = Math.floor(inactiveTime / 1000);
        //const secondsInactive = 40000*3;

        lastofflinetime = secondsInactive

        if (secondsInactive > 60) {
            stats.totalSeconds += secondsInactive; 
            for (let i in cd) if (cd[i]>0) {cd[i]-=secondsInactive};

            if (enemies[stats.currentEnemy].killCount>99 && !dungeonTime){
                offlineRewards((secondsInactive/60));
                if (!settings.disablePenguinRecap) { did("penguinRecap").style.display = "flex"; }
                offlineDrops(secondsInactive/60)

            } 



            setTimeout(() => {
                if (unlocks.garden){ plantTick(secondsInactive/30) }
               }, 1000);
            

            
            
            for (let i in research) { if (research[i].status === "researching" && research[i].timer>1) research[i].timer -= secondsInactive}


            for (let i in buildings) { if (buildings[i].unlocked && buildings[i].progress<8640) {buildings[i].progress += secondsInactive/30; if (buildings[i].progress>8640) buildings[i].progress=8640}}


            for (let i in areas) {

                if ("dungeonTimer" in areas[i] && areas[i].dungeonTimer>0) {

                    areas[i].dungeonTimer -= secondsInactive;
                    if (secondsInactive >= 3600) areas[i].charges++
                    if (secondsInactive >= 7200) areas[i].charges++
                    if (areas[i].charges>3) areas[i].charges = 3;
                
                }



                if (areas[i].dungeonTimer<0) areas[i].dungeonTimer=0;
            
            }

            setTimeout(() => {
                save();
            }, 1500);
            save();
        }

        localStorage.setItem('lastVisitTime', new Date().getTime());
    }
}

*/

//-----penguin recap----

did("closeRecap").onclick = function () { did("penguinRecap").style.animation = "shrinkFadeOut 0.3s"; setTimeout(function () { did("penguinRecap").style.display = "none" }, 200); }


function tooltipPenguin() {
    did('penguinIndicatorButton').addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex";
    did("tooltipName").textContent = "Turtlebot";
    did("tooltipPrice").innerHTML = '';
    
  
    did("tooltipRarity").textContent = 'Offline Gains';
    did("tooltipRarity").style.color = "#5A9AE5";      
    did("tooltipName").style.color = "white";     
    did('tooltipImage').src = "img/src/icons/afk.jpg";
       
    did("tooltipFlavor").textContent = '';
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipDescription").innerHTML = '</div><span id="penguinPowerMeter" style="color:white;font-size:1.6vh; background:#42A24C; padding: 0% 2%; border-radius:0.2vh">Penguin Power: 100 (1 kill per minute)</span><div class="separador"></div><span id="penguinCurrentResource">Currently Gathering: Nothing</span> ';

    let currentDrop = "";

    if (enemies[stats.currentEnemy].drop && enemies[stats.currentEnemy].drop.includes('dropItem')) {
        const regex = /dropItem\(["'](I\d+)["']\)/;
            const match = enemies[stats.currentEnemy].drop.match(regex);
            currentDrop = match[1];
    }
    

    if (did("penguinCurrentResource")){
    if (currentDrop==="") {did("penguinCurrentResource").innerHTML = colorTag('Currently Gathering: Nothing at all',"#2C8A97");}
    else{
        if (enemies[stats.currentEnemy].difficulty !== "pond") did("penguinCurrentResource").innerHTML = colorTag('Currently Gathering: '+bestiaryItem(currentDrop),"#2C8A97");
        if (enemies[stats.currentEnemy].difficulty === "pond") did("penguinCurrentResource").innerHTML = colorTag('Currently Gathering: ... fish?',"#2C8A97");
        if (enemies[stats.currentEnemy].killCount<99) did("penguinCurrentResource").innerHTML = '<FONT COLOR="gray">Defeat the current enemy at least 100 times to autofarm it'
    }

    
    }

    did("penguinPowerMeter").innerHTML = (playerPenguinPower/15).toFixed(1)+' kills per minute';


      const movingDiv = did('tooltip');
const referenceDiv = did('penguinIndicatorButton');
const referenceRect = referenceDiv.getBoundingClientRect();
const newLeft = referenceRect.left;
const newTop = referenceRect.top + 35;
movingDiv.style.left = newLeft + 'px';
movingDiv.style.top = newTop + 'px';
    
        
  });
    did('penguinIndicatorButton').addEventListener('mouseleave', function () {
    resetTooltip();
    });
  
}tooltipPenguin()

rpgPlayer.minipenguin1="none"
rpgPlayer.minipenguin2="none"
rpgPlayer.minipenguin3="none"

activatePenguin("minipenguin1")
activatePenguin("minipenguin2")
activatePenguin("minipenguin3")

afkPenguinTooltip("minipenguin1")
afkPenguinTooltip("minipenguin2")
afkPenguinTooltip("minipenguin3")


function activatePenguin(x){

   setTimeout(() => {
    
   


    did(x).addEventListener("click", function() {


        if (enemies[stats.currentEnemy].killCount>=100){

            playSound("audio/button1.mp3");

        if (enemies[stats.currentEnemy].drop && enemies[stats.currentEnemy].drop.includes('dropItem')) {
            const regex = /dropItem\(["'](I\d+)["']\)/;
            const match = enemies[stats.currentEnemy].drop.match(regex);
            if (enemies[stats.currentEnemy].killCount>=100) rpgPlayer[x] = match[1]
        }

        if (enemies[stats.currentEnemy].difficulty === "pond") rpgPlayer[x]="I316"

        if (rpgPlayer[x]!=="none") {did(x).style.outline = "lawngreen 2px solid"}
        else {did(x).style.outline = "coral 2px solid"}
        
        did("penguinCurrentResource").innerHTML = colorTag('Currently Gathering: '+bestiaryItem(rpgPlayer[x]),"#2C8A97");
        if (rpgPlayer[x]==="I316") did("penguinCurrentResource").innerHTML = colorTag('Currently Gathering: ... fish?',"#2C8A97");


        did(x).style.animation = "";
        void did(x).offsetWidth;
        did(x).style.animation = "levelUp 0.5s 1";

    } else playSound("audio/thud.mp3");





    });


    //console.log (rpgPlayer[x])
    if (rpgPlayer[x]!=="none") {did(x).style.outline = "lawngreen 2px solid"}
    else {did(x).style.outline = "coral 2px solid"}


}, 100);



}


function afkPenguinTooltip(x){
    did(x).addEventListener('mouseenter', function () { 
        did('tooltip').style.display = "flex";
        did("tooltipName").textContent = "Penguin Helper";
        did("tooltipPrice").innerHTML = '';
        did("tooltipRarity").textContent = 'Offline Gains';
        did("tooltipRarity").style.color = "#5A9AE5";      
        did("tooltipName").style.color = "white";     
        did('tooltipImage').src = "img/src/upgrades/P1.jpg";
           
        did("tooltipFlavor").textContent = '';
        did("tooltipDescription").style.textAlign = "center";
        did("tooltipDescription").innerHTML = '</div><span id="penguinPowerMeter" style="color:white;font-size:1.6vh; background:#42A24C; padding: 0% 2%; border-radius:0.2vh">Penguin Power: 100 (1 kill per minute)</span><div class="separador"></div><span id="penguinCurrentResource">Currently Gathering: Nothing</span> ';
    
        let currentDrop = "";
    
        if (enemies[stats.currentEnemy].drop && enemies[stats.currentEnemy].drop.includes('dropItem')) {
            const regex = /dropItem\(["'](I\d+)["']\)/;
                const match = enemies[stats.currentEnemy].drop.match(regex);
                currentDrop = match[1];
        }
        
    
        if (did("penguinCurrentResource")){
        if (rpgPlayer[x]!=="none"){
            did("penguinCurrentResource").innerHTML = colorTag('Currently Gathering: '+bestiaryItem(rpgPlayer[x]),"#2C8A97");
            if (rpgPlayer[x]==="I316") did("penguinCurrentResource").innerHTML = colorTag('Currently Gathering: ... fish?',"#2C8A97");
        } else did("penguinCurrentResource").innerHTML = '<FONT COLOR="gray">Click here to start gathering offline the current enemy'
        if (enemies[stats.currentEnemy].killCount<99 && rpgPlayer[x]==="none") did("penguinCurrentResource").innerHTML = '<FONT COLOR="gray">Defeat the current enemy at least 100 times to autofarm it'

        }
    
        did("penguinPowerMeter").innerHTML = ((playerPenguinPower/15)/4).toFixed(1)+' kills per minute';
    
    
          const movingDiv = did('tooltip');
    const referenceDiv = did(x);
    const referenceRect = referenceDiv.getBoundingClientRect();
    const newLeft = referenceRect.left;
    const newTop = referenceRect.top + 35;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
        
            
      });
        did(x).addEventListener('mouseleave', function () {
        resetTooltip();
        });
}

  





function offlineDrops(kills){

    let killsGot = Math.round((kills*(playerPenguinPower/15)))

    const regex = /rareItemDrop\(['"]([^'"]+)['"],\s*(rareDrop|uncommonDrop|epicDrop|mythicDrop|relicDrop)(?:\s*,\s*[^)]+)*\s*\)/g;

  let match;
const rareDropIds = [];
const uncommonDropIds = [];
const epicDropIds = [];
const mythicDropIds = [];
const relicDropIds = [];

while ((match = regex.exec(enemies[stats.currentEnemy].drop)) !== null) {
    const id = match[1];
    const dropType = match[2];
    if ((dropType === 'rareDrop')) {
        rareDropIds.push(id);
    }
    
    if ((dropType === 'uncommonDrop')) {
        uncommonDropIds.push(id);
    }

    if ((dropType === 'epicDrop')) {
        epicDropIds.push(id);
    }

    if ((dropType === 'mythicDrop')) {
        mythicDropIds.push(id);
    }

    if ((dropType === 'relicDrop')) {
        relicDropIds.push(id);
    }
}


/*
  console.log('Rare Drop IDs:', rareDropIds);
  console.log('Uncommon Drop IDs:', uncommonDropIds);
  console.log('Epic Drop IDs:', epicDropIds);
  console.log('Mythic Drop IDs:', mythicDropIds);
  console.log('Relic Drop IDs:', relicDropIds);
  */




  if (uncommonDropIds.length>0) uncommonDropIds.forEach(id => { rareItemDrop(id, Math.max(uncommonDrop/Math.ceil(killsGot,1)));});
  if (rareDropIds.length>0) rareDropIds.forEach(id => { rareItemDrop(id, Math.max(rareDrop/Math.ceil(killsGot,1)));});
  if (epicDropIds.length>0) epicDropIds.forEach(id => { rareItemDrop(id, Math.max(epicDrop/Math.ceil(killsGot,1)));});
  if (mythicDropIds.length>0) mythicDropIds.forEach(id => { rareItemDrop(id, Math.max(mythicDrop/Math.ceil(killsGot,1)));});
  if (relicDropIds.length>0) relicDropIds.forEach(id => { rareItemDrop(id, Math.max(relicDrop/Math.ceil(killsGot,1)));});

  console.log("uncommon:"+ Math.max(uncommonDrop/Math.ceil(killsGot,1)) +"rare:"+Math.max(rareDrop/Math.ceil(killsGot,1))+"relic :"+Math.max(relicDrop/Math.ceil(killsGot,1))+"epic :"+Math.max(epicDrop/Math.ceil(killsGot,1))+"mythic :"+Math.max(mythicDrop/Math.ceil(killsGot,1)))

    
  killsGot = Math.round((kills*(playerPenguinPower/15))/2)
  
  if (stats.currentEnemy === "E13") rollTable(copperCollectibles, 1, killsGot)
  if (stats.currentEnemy === "E14") rollTable(snapthornCollectibles, 1, killsGot)
  if (stats.currentEnemy === "E19") rollTable(arcaniteCollectibles, 1, killsGot)
  if (stats.currentEnemy === "E20") rollTable(eeriePondCollectibles, 1, killsGot)
  if (stats.currentEnemy === "E37") rollTable(fossilCollectibles, 1, killsGot)
  if (stats.currentEnemy === "E42") rollTable(dataclusterCollectibles, 1, killsGot)



  /*

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


*/



}


/*

function offlineRewards(amount, concept){
if (!dungeonTime) {
    let currentDrop = "";

    if (enemies[stats.currentEnemy].drop && enemies[stats.currentEnemy].drop.includes('dropItem')) {


/*
        const startIndex = enemies[stats.currentEnemy].drop.indexOf("dropItem('") + "dropItem('".length;
        const endIndex = enemies[stats.currentEnemy].drop.indexOf("')", startIndex);
        if (startIndex !== -1 && endIndex !== -1) {

            const regex = /dropItem\(["'](I\d+)["']\)/;
            const match = enemies[stats.currentEnemy].drop.match(regex);

            currentDrop = match[1];
        }
    

    let killsGot = Math.round(amount*(playerPenguinPower/15))

    if (enemies[stats.currentEnemy].difficulty === "pond") {
        currentDrop = "I316";
        killsGot = Math.round(amount*(100/15))

    }


    if (concept==='egg'){
        createPopup('&#9201; Time Skipped and gathered '+beautify(killsGot)+'<img src="img/src/items/'+currentDrop+'.jpg">and '+beautify(enemies[stats.currentEnemy].exp * killsGot)+' EXP', '#4e9690')

    }



    /*
if (stats.currentArea === "A1") rollTable(area1Loot, amount/7)
if (stats.currentArea === "A2") rollTable(area2Loot, amount/7)
if (stats.currentArea === "A3") rollTable(area3Loot, amount/7)
if (stats.currentArea === "A4") rollTable(area4Loot, amount/7)
    

if (unlocks.penguins && concept===undefined){


    if (rpgPlayer.minipenguin1!=="none"){
        items[rpgPlayer.minipenguin1].count += Math.ceil(killsGot/4);
        items[rpgPlayer.minipenguin1].timesGot += Math.ceil(killsGot/4);
        logPrint("<FONT COLOR='#8fba77'>Your penguin gathered " + bestiaryItem(rpgPlayer.minipenguin1) +" x"+Math.ceil(killsGot/4)+"!");
    }
    
    if (rpgPlayer.minipenguin2!=="none"){
        items[rpgPlayer.minipenguin2].count += Math.ceil(killsGot/4);
        items[rpgPlayer.minipenguin2].timesGot += Math.ceil(killsGot/4);
        logPrint("<FONT COLOR='#8fba77'>Your penguin gathered " + bestiaryItem(rpgPlayer.minipenguin2) +" x"+Math.ceil(killsGot/4)+"!");

    }
    
    if (rpgPlayer.minipenguin3!=="none"){
        items[rpgPlayer.minipenguin3].count += Math.ceil(killsGot/4);
        items[rpgPlayer.minipenguin3].timesGot += Math.ceil(killsGot/4);
        logPrint("<FONT COLOR='#8fba77'>Your penguin gathered " + bestiaryItem(rpgPlayer.minipenguin3) +" x"+Math.ceil(killsGot/4)+"!");

    }

    
}


if (concept===undefined) enemies[stats.currentEnemy].killCount += killsGot
    
items[currentDrop].count += killsGot;
items[currentDrop].timesGot += killsGot;

rpgClass[stats.currentClass].currentExp += enemies[stats.currentEnemy].exp * killsGot;


logPrint("<FONT COLOR='#8fba77'>Your Turtlebot gathered " + bestiaryItem(currentDrop) +" x"+Math.ceil(killsGot)+" and "+beautify(enemies[stats.currentEnemy].exp * killsGot)+" EXP!");


/*
did("idleItem").innerHTML = beautify(killsGot);
did("idleItemImg").src = "img/src/items/"+currentDrop+".jpg";
did("idleExp").innerHTML = beautify(enemies[stats.currentEnemy].exp * killsGot);
did('idleTime').innerHTML = convertSecondsToHMS(secondsInactive);


let additionalText = ""

if (unlocks.penguins) {

    did("recapImage").style.display="flex"

    if (rpgPlayer.minipenguin1!=="none" && rpgPlayer.minipenguin2!=="none" && rpgPlayer.minipenguin3!=="none"){


        additionalText = "Additionally, your penguins gathered "+beautify(killsGot/4)+" "+bestiaryItem(rpgPlayer.minipenguin1)+", "+beautify(killsGot/4)+" "+bestiaryItem(rpgPlayer.minipenguin2)+" and "+beautify(killsGot/4)+" "+bestiaryItem(rpgPlayer.minipenguin3)



    }





}

did("recapMsg").innerHTML = "<p>You have been away for "+convertSecondsToHMS(lastofflinetime)+". In that time, you gathered "+beautify(amount*(playerPenguinPower/15))+" "+bestiaryItem(currentDrop)+" and "+beautify(enemies[stats.currentEnemy].exp * killsGot)+" EXP. "+additionalText+"</p>"






expBar();
addItem();

}

}

*/

/*
function createPopup(inner,id) {
    const popupdiv = document.createElement('div');
    popupdiv.innerHTML = inner
    popupdiv.id = id;
    

    did("popupListing").appendChild(popupdiv);
    setTimeout(function () { 
        
        
        //popupdiv.remove() 
        popupdiv.style.animation = "";
        void popupdiv.offsetWidth;
        popupdiv.style.animation =  "popupSlideOut 1s"
    
    
    }, 8000);
}*/


stats.afkTimer = 3600/100
stats.afkMode = false

setInterval(() => {



    if (stats.afkMode) {did("afkDarken").style.display = "flex"}
    

    if (did("afkDarken").style.display === "none") stats.afkTimer = 3600/100

    if (!document.hasFocus() && !settings.disableAfkTimer) stats.afkTimer--
    if (document.hasFocus()) stats.afkMode = false

    if (stats.afkTimer < 0 && did("afkDarken").style.display === "flex") {

        stats.afkTimer = 3600/100
        stats.afkMode = true
        save()
        location.reload();
        
    
    }

}, 1000*100);

let popupQueue = Promise.resolve();

settings.disableTabPopup = false

async function createPopup(inner, id,type) {

    if (settings.disableTabPopup && !document.hasFocus()) return

    if (did("popupListing").childNodes.length>30) return
    
    await (popupQueue = popupQueue.then(async () => {
        const popupdiv = document.createElement('div');
        popupdiv.innerHTML = inner;
        popupdiv.id = id;

        playSound("audio/pop1.mp3")


        did("popupListing").appendChild(popupdiv);


        popupdiv.addEventListener('click', function(event) {
            popupdiv.style.animation =  "popupSlideOut 0.5s"
                setTimeout(() => { popupdiv.remove(); }, 500);  
        })

        if (type==="long"){

            setTimeout(() => { 
                if (!document.hasFocus()) return
                popupdiv.style.animation =  "popupSlideOut 0.5s"
                setTimeout(() => { popupdiv.remove(); }, 500);   
            }, 16000);

        } else {

            setTimeout(() => { 
                if (!document.hasFocus()) return
                popupdiv.style.animation =  "popupSlideOut 0.5s"
                setTimeout(() => { popupdiv.remove(); }, 500);   
            }, 8000);


        }




        
        
        

        await new Promise(resolve => setTimeout(resolve, 100));
    }));
}

//#endregion
//----------------------==========================-----------------------
//----------------------===========DEBUG==========-----------------------
//----------------------==========================-----------------------
//#region Debug
function diablo() {document.getElementById("cheatPanel").style.display = "flex"; console.log('modo diablo activado')}


function masteryGuide(){



let totalQuests = 58
did("MGQuesting").innerHTML = `<img src="img/src/items/quest.jpg"><h1>Questing</h1><h2><strong><img src="img/src/icons/insight.png">`+stats.questsCompleted*10+`/`+(totalQuests*10)+`</strong> `+stats.questsCompleted+`/`+totalQuests+` (`+(stats.questsCompleted/totalQuests*100).toFixed(1)+`%)</h2><div class="masteryGuideProgress"><div style="width:`+(stats.questsCompleted/totalQuests*100).toFixed(1)+`%"></div></div>`

did("MGCollection").innerHTML = `<img src="img/src/icons/collection.jpg"><h1>Collection</h1><h2><strong><img src="img/src/icons/insight.png">`+collectiblesGot*5+`/`+(collectiblesTotal*5)+`</strong> `+collectiblesGot+`/`+collectiblesTotal+` (`+(collectiblesGot/collectiblesTotal*100).toFixed(1)+`%)</h2><div class="masteryGuideProgress"><div style="width:`+(collectiblesGot/collectiblesTotal*100).toFixed(1)+`%"></div></div>`

if (unlocks.journal) did("MGGrandArchive").innerHTML = `<img src="img/src/icons/achievement.png"><h1>Grand Archive</h1><h2><strong><img src="img/src/icons/insight.png">`+stats.logsGot*5+`/`+(totalLogs*5)+`</strong> `+stats.logsGot+`/`+totalLogs+` (`+(stats.logsGot/totalLogs*100).toFixed(1)+`%)</h2><div class="masteryGuideProgress"><div style="width:`+(stats.logsGot/totalLogs*100).toFixed(1)+`%"></div></div>`

if (unlocks.armory) did("MGArmory").innerHTML = `<img src="img/src/icons/armory.jpg"><h1>Armory</h1><h2><strong><img src="img/src/icons/insight.png">`+totalArmoryGot*10+`/`+(totalArmory*10)+`</strong> `+totalArmoryGot+`/`+totalArmory+` (`+(totalArmoryGot/totalArmory*100).toFixed(1)+`%)</h2><div class="masteryGuideProgress"><div style="width:`+(totalArmoryGot/totalArmory*100).toFixed(1)+`%"></div></div>`

if (unlocks.bestiary) did("MGBestiary").innerHTML = `<img src="img/src/items/I290.jpg"><h1>Bestiary Medals</h1><h2><strong><img src="img/src/icons/insight.png">`+medalsGot*10+`/`+((elibileEnemies+medalsGot)*10)+`</strong> `+medalsGot+`/`+(elibileEnemies+medalsGot)+` (`+(medalsGot/(elibileEnemies+medalsGot)*100).toFixed(1)+`%)</h2><div class="masteryGuideProgress"><div style="width:`+(medalsGot/(elibileEnemies+medalsGot)*100).toFixed(1)+`%"></div></div>`

if (unlocks.garden) did("MGGarden").innerHTML = `<img src="img/src/items/I287.jpg"><h1>Garden</h1><h2><strong><img src="img/src/icons/insight.png">`+plantCompletionProgress*6+`/`+(plantCompletionProgressTotal*6)+`</strong> `+plantCompletionProgress+`/`+plantCompletionProgressTotal+` (`+(plantCompletionProgress/plantCompletionProgressTotal*100).toFixed(1)+`%)</h2><div class="masteryGuideProgress"><div style="width:`+(plantCompletionProgress/plantCompletionProgressTotal*100).toFixed(1)+`%"></div></div>`


let currentMastery = (stats.questsCompleted*10+collectiblesGot*5+stats.logsGot*5+totalArmoryGot*10+medalsGot*10+plantCompletionProgress*6)
let totalMastery = ((totalQuests*10)+(collectiblesTotal*5)+(totalLogs*5)+(totalArmory*10)+((elibileEnemies+medalsGot)*10)+(plantCompletionProgressTotal*6))


did("masteryCompletion").innerHTML = `<img src="img/src/icons/insight.png" style="height:1.5rem;width:1.5rem; border-radius:0.3rem; margin-right:0.3rem">`+currentMastery+`/`+totalMastery+` Total Mastery <strong style="color:darkorange">(`+(currentMastery/totalMastery*100).toFixed(1)+` %)</strong>`



}
//#endregion
//----------------------==========================-----------------------
//----------------------===========SAVING=========-----------------------
//----------------------==========================-----------------------
//#region Saving
//------autosave-------

settings.disableAutosavePopup = false

function autosave() {
    if (did("characterPanel").style.display === "flex") return


    if (!did('savePopUp') && !settings.disableAutosavePopup) createPopup('<img src="img/sys/saved.png"> Game Saved', 'savePopUp')

    save();
    
}

setInterval(function() { if (!settings.disableAutosave) { autosave(); } }, 60000);


document.addEventListener("keydown", function (event) {
    if (event.code === "KeyS" && turtleRename.style.display === "none") {
        if (did("characterPanel").style.display === "flex") return
        save()
        if (!did('savePopUp')) createPopup('<img src="img/sys/saved.png"> Game Saved', 'savePopUp')
    } 
});



//----save and load----



stats.beginLoad = false
stats.canOffline = false

function save() {


    if (offlineFarmCheck()===true) stats.canOffline = true
    else stats.canOffline = false

    if (did("characterPanel").style.display === "flex") return

    stats.lastVisitTime = new Date().getTime()
    
  const saveData = {}



  saveData.savedItems = [];
  let soulboundItems = []


  for (const item of itemInventory) {

    const savedItem = {
      className: item.constructor.name,
      upgrade: item.constructor.upgrade,
      timesGot: item.constructor.timesGot,
      count: item.constructor.count,
      prefix1: item.prefix1,
      prefix2: item.prefix2,
      prefix3: item.prefix3,
      prefix4: item.prefix4,
      prefix5: item.prefix5,
      align: item.align,
      paint: item.paint,
      locked: item.locked,
      glimmer: item.glimmer,
      loadouts: item.loadouts,
      armorSkill: item.armorSkill,
      armorSkillExtra: item.armorSkillExtra,
      savedName: item.savedName,
      savedImg: item.savedImg,
      savedQuality: item.savedQuality,
      savedInfo: item.savedInfo,
      uses: item.uses,
      gemSlot: item.gemSlot,
      rogue: item.rogue,
    };

    if (item.quality!=="Soulbound") saveData.savedItems.push(savedItem);

    if (item.quality==="Soulbound") soulboundItems.push(item.constructor.name)
    //soulbound items code is a bit borken, will be fixed when a soulbound item gets added
            
  }

  saveData.savedItemsMemory = [];

  for (const item of itemInventoryMemory) {
    const savedItem = {
      className: item.constructor.name,
      upgrade: item.constructor.upgrade,
      timesGot: item.constructor.timesGot,
      count: item.constructor.count,
      cd: item.constructor.cd,
    };
    saveData.savedItemsMemory.push(savedItem);
  }






  //saveData.savedItemsPrefix = {}; for (const i in item) {  saveData.savedItemsPrefix[i] = item[i].prefix;}

  saveData.savedItemCount = {}; for (const i in items) {  saveData.savedItemCount[i] = items[i].count;}
  saveData.savedItemLevel = {}; for (const i in items) { saveData.savedItemLevel[i] = items[i].level;}
  saveData.savedItemCELevel = {}; for (const i in items) { saveData.savedItemCELevel[i] = items[i].CELevel;}
  saveData.savedItemCD = {}; for (const i in items) { saveData.savedItemCD[i] = items[i].cd;}
  saveData.savedItemStats = {}; for (const i in items) { saveData.savedItemStats[i] = items[i].statUp;}
  saveData.savedItemGot = {}; for (const i in items) { saveData.savedItemGot[i] = items[i].gotOnce;}
  saveData.savedItemStamp1 = {}; for (const i in items) { saveData.savedItemStamp1[i] = items[i].stamp1;}
  saveData.savedItemStamp2 = {}; for (const i in items) { saveData.savedItemStamp2[i] = items[i].stamp2;}
  saveData.savedItemStamp3 = {}; for (const i in items) { saveData.savedItemStamp3[i] = items[i].stamp3;}
  saveData.savedItemTimesGot = {}; for (const i in items) { saveData.savedItemTimesGot[i] = items[i].timesGot;}
  saveData.savedItemRevealed = {}; for (const i in items) { saveData.savedItemRevealed[i] = items[i].revealed;}

  saveData.savedMailGot = {}; for (const i in mail) { saveData.savedMailGot[i] = mail[i].recieved;}
  saveData.savedMailRead = {}; for (const i in mail) { saveData.savedMailRead[i] = mail[i].read;}
  saveData.savedMailDeleted = {}; for (const i in mail) { saveData.savedMailDeleted[i] = mail[i].deleted;}


  saveData.savedBuffTime = {}; for (const i in buffs) { saveData.savedBuffTime[i] = buffs[i].time;}
  saveData.savedBuffStacks = {}; for (const i in buffs) { saveData.savedBuffStacks[i] = buffs[i].stacks;}

  
  saveData.savedEnemyKills = {}; for (const i in enemies) { saveData.savedEnemyKills[i] = enemies[i].killCount;}
  saveData.savedEnemyMedalProgress = {}; for (const i in enemies) { saveData.savedEnemyMedalProgress[i] = enemies[i].medalProgress;}
  saveData.savedEnemyNerf = {}; for (const i in enemies) { saveData.savedEnemyNerf[i] = enemies[i].nerfed;}
  saveData.savedEnemyMedal = {}; for (const i in enemies) { saveData.savedEnemyMedal[i] = enemies[i].medal;}
  saveData.savedheatBeaten = {}; for (const i in enemies) { saveData.savedheatBeaten[i] = enemies[i].heatBeaten;}

  saveData.savedEnemyCard1 = {}; for (const i in enemies) { if (enemies[i].card1) saveData.savedEnemyCard1[i] = enemies[i].card1.got;}
  saveData.savedEnemyCard2 = {}; for (const i in enemies) { if (enemies[i].card2) saveData.savedEnemyCard2[i] = enemies[i].card2.got;}
  saveData.savedEnemyCard3 = {}; for (const i in enemies) { if (enemies[i].card3) saveData.savedEnemyCard3[i] = enemies[i].card3.got;}




  saveData.savedQuestState = {}; for (const i in quests) { saveData.savedQuestState[i] = quests[i].state;}
  saveData.savedQuestUnlocked = {}; for (const i in quests) { saveData.savedQuestUnlocked[i] = quests[i].unlocked;}
  
    
  saveData.savedAreaActive = {}; for (const i in areas) { saveData.savedAreaActive[i] = areas[i].active;} 
  saveData.savedAreaUnlocked = {}; for (const i in areas) { saveData.savedAreaUnlocked[i] = areas[i].locked;}  

   
  saveData.savedAreaBoss = {}; for (const i in areas) { saveData.savedAreaBoss[i] = areas[i].boss;}  
  saveData.savedAreaOre = {}; for (const i in areas) { saveData.savedAreaOre[i] = areas[i].unlockedOre;}
  saveData.savedAreaHerb = {}; for (const i in areas) { saveData.savedAreaHerb[i] = areas[i].unlockedHerb;}
  saveData.savedAreaPond = {}; for (const i in areas) { saveData.savedAreaPond[i] = areas[i].unlockedPond;}
  saveData.savedShopLevel = {}; for (const i in areas) { saveData.savedShopLevel[i] = areas[i].shopLevel;}
  saveData.savedShopProgress = {}; for (const i in areas) { saveData.savedShopProgress[i] = areas[i].shopProgress;}
  saveData.savedCurrentHeat = {}; for (const i in areas) { saveData.savedCurrentHeat[i] = areas[i].heat;}
  saveData.savedMaxHeat = {}; for (const i in areas) { saveData.savedMaxHeat[i] = areas[i].heatMax;}
  saveData.savedDifficulty = {}; for (const i in areas) { saveData.savedDifficulty[i] = areas[i].savedDifficulty;}




  
  saveData.savedRecipeTime = {}; for (const i in craftingRecipes) { saveData.savedRecipeTime[i] = craftingRecipes[i].timeCurrent;}  
  saveData.savedRecipeQue = {}; for (const i in craftingRecipes) { saveData.savedRecipeQue[i] = craftingRecipes[i].que;}  
  saveData.savedRecipeLocked = {}; for (const i in craftingRecipes) { saveData.savedRecipeLocked[i] = craftingRecipes[i].locked;}  


  saveData.savedLogsUnlocked = {}; for (const i in logs) { saveData.savedLogsUnlocked[i] = logs[i].unlocked;}
  saveData.savedLogsOnce = {}; for (const i in logs) { saveData.savedLogsOnce[i] = logs[i].once;}
  saveData.savedLogsRevealed = {}; for (const i in logs) { saveData.savedLogsRevealed[i] = logs[i].revealed;}
  saveData.savedLogsOnceEver = {}; for (const i in logs) { saveData.savedLogsOnceEver[i] = logs[i].onceEver;}
  saveData.savedLogsClaimed = {}; for (const i in logs) { saveData.savedLogsClaimed[i] = logs[i].claimed;}


  saveData.savedJobLevel = {}; for (const i in jobs) { saveData.savedJobLevel[i] = jobs[i].level;}
  saveData.savedJobExp = {}; for (const i in jobs) { saveData.savedJobExp[i] = jobs[i].exp;}  
  saveData.savedJobMaxExp = {}; for (const i in jobs) { saveData.savedJobMaxExp[i] = jobs[i].maxExp;}
    
  saveData.savedJobPanelHidden = {}; for (const i in jobPanels) { saveData.savedJobPanelHidden[i] = jobPanels[i].hidden;}    
  saveData.savedJobPanelUnlock = {}; for (const i in jobPanels) { saveData.savedJobPanelUnlock[i] = jobPanels[i].unlocked;}  
    
  //saveData.savedShopStock = {}; for (const i in shopItems) { saveData.savedShopStock[i] = shopItems[i].stock;}  
  //saveData.savedShopUnlocked = {}; for (const i in shopItems) { saveData.savedShopUnlocked[i] = shopItems[i].unlocked;}  
    
  saveData.savedAreaShopStock = {}; for (const i in areaShop) { saveData.savedAreaShopStock[i] = areaShop[i].stock;}  

  saveData.savedPlayerData = {}; for (const i in rpgPlayer) { saveData.savedPlayerData[i] = rpgPlayer[i];}  
  saveData.savedCdData = {}; for (const i in cd) { saveData.savedCdData[i] = cd[i];}  
  saveData.savedSettingsData = {}; for (const i in settings) { saveData.savedSettingsData[i] = settings[i];}
  saveData.savedStatsData = {}; for (const i in stats) { saveData.savedStatsData[i] = stats[i];}

  saveData.savedUnlocksData = {}; for (const i in unlocks) { saveData.savedUnlocksData[i] = unlocks[i];}

  saveData.savedBuildingLevel = {}; for (const i in buildings) { saveData.savedBuildingLevel[i] = buildings[i].level;}
  saveData.savedBuildingMaxLevel = {}; for (const i in buildings) { saveData.savedBuildingMaxLevel[i] = buildings[i].maxLevel;}
  saveData.savedBuildingUnlock = {}; for (const i in buildings) { saveData.savedBuildingUnlock[i] = buildings[i].unlocked;}
  saveData.savedBuildingTier = {}; for (const i in buildings) { saveData.savedBuildingTier[i] = buildings[i].tier;}
  saveData.savedBuildingProgress = {}; for (const i in buildings) { saveData.savedBuildingProgress[i] = buildings[i].progress;}

  saveData.savedResearchTimer = {}; for (const i in research) { saveData.savedResearchTimer[i] = research[i].timer;}
  saveData.savedResearchStatus = {}; for (const i in research) { saveData.savedResearchStatus[i] = research[i].status;}
  saveData.savedResearchUnlocked = {}; for (const i in research) { saveData.savedResearchUnlocked[i] = research[i].unlocked;}

  saveData.savedJobUnlocked = {}; for (const i in jobPanels) { saveData.savedJobUnlocked[i] = jobPanels[i].unlocked;}

  saveData.savedTalents = {}; for (const i in talent) { saveData.savedTalents[i] = talent[i].active;}
  saveData.savedTalentsStats = {}; for (const i in talent) { saveData.savedTalentsStats[i] = talent[i].statUp;}
  saveData.savedTalentsPermanent = {}; for (const i in talent) { saveData.savedTalentsPermanent[i] = talent[i].permanent;}


  saveData.savedItemOfTheDay = {}; for (const i in itemOfTheDay) { saveData.savedItemOfTheDay[i] = itemOfTheDay[i];}

  saveData.savedRecipePanelUnlocked = {}; for (const i in jobPanels) { saveData.savedRecipePanelUnlocked[i] = jobPanels[i].unlocked;}

  saveData.savedShowdownRecord = {}; for (const i in showdown) { saveData.savedShowdownRecord[i] = showdown[i].bestTime;}

  saveData.savedHonorStock = {}; for (const i in shopHonor) { saveData.savedHonorStock[i] = shopHonor[i].stock;}

  saveData.savedDungeonTimer = {}; for (const i in areas) { if ("dungeonTimer" in areas[i]) { saveData.savedDungeonTimer[i] = areas[i].dungeonTimer;} }

  saveData.savedSkirmishRecord = {}; for (const i in skirmish) { saveData.savedSkirmishRecord[i] = skirmish[i].bestScore;}

  saveData.savedItemArmory = {}; for (const i in items) { saveData.savedItemArmory[i] = items[i].armoryState;}

  saveData.savedItemLocked = {}; for (const i in items) { saveData.savedItemLocked[i] = items[i].locked;}

  saveData.savedItemFavorited = {}; for (const i in items) { saveData.savedItemFavorited[i] = items[i].favorited;}

  saveData.savedItemQueue = {}; for (const i in recipes) { saveData.savedItemQueue[i] = recipes[i].craftingQueue;}

  saveData.savedEnemiesSaw = {}; for (const i in enemies) { saveData.savedEnemiesSaw[i] = enemies[i].sawOnce;}

  saveData.savedTotalSeconds = {}; saveData.savedTotalSeconds = stats.totalSeconds;

  saveData.savedWarPaint = {}; for (const i in items) { if ("paint" in items[i]) { saveData.savedWarPaint[i] = items[i].paint;} }

  saveData.savedSeedCount = {}; for (const i in plants) { { saveData.savedSeedCount[i] = plants[i].count;} }

  saveData.savedSeedPlanted = {}; for (const i in plants) { { saveData.savedSeedPlanted[i] = plants[i].planted;} }

  saveData.savedItemVaulted = {}; for (const i in items) { saveData.savedItemVaulted[i] = items[i].vaulted;}

  saveData.savedSeedHarvested = {}; for (const i in plants) { { saveData.savedSeedHarvested[i] = plants[i].harvested;} }

  saveData.savedGardenShopStock = {}; for (const i in gardenShop) { saveData.savedGardenShopStock[i] = gardenShop[i].stock;}

  saveData.savedPlotSlot = {}; for (const i in plot) { saveData.savedPlotSlot[i] = plot[i].slot;}
  saveData.savedPlotAge = {}; for (const i in plot) { saveData.savedPlotAge[i] = plot[i].age;}
  saveData.savedPlotWater = {}; for (const i in plot) { saveData.savedPlotWater[i] = plot[i].water;}
  saveData.savedPlotMature = {}; for (const i in plot) { saveData.savedPlotMature[i] = plot[i].mature;}
  saveData.savedPlotRenewable = {}; for (const i in plot) { saveData.savedPlotRenewable[i] = plot[i].renewable;}

  saveData.savedSound = {}; saveData.savedSound = savedSound;

  //saveData.savedClassData = {}; for (const i in rpgClass) { saveData.savedClassData[i] = rpgClass[i];}  

  saveData.savedClassLevel = {}; for (const i in rpgClass) { saveData.savedClassLevel[i] = rpgClass[i].level;}  
  saveData.savedClassCurrentExp = {}; for (const i in rpgClass) { saveData.savedClassCurrentExp[i] = rpgClass[i].currentExp;}  
  saveData.savedClassNextExp = {}; for (const i in rpgClass) { saveData.savedClassNextExp[i] = rpgClass[i].nextExp;}  


  saveData.savedFertiliser = {}; for (const i in fertiliser) { saveData.savedFertiliser[i] = fertiliser[i].unlocked;}

  saveData.savedGametips = {}; for (const i in gametip) { saveData.savedGametips[i] = gametip[i].unlocked;}

  saveData.savedDungeonCharges = {}; for (const i in areas) { saveData.savedDungeonCharges[i] = areas[i].charges;}




  let datosGuardados = localStorage.getItem('saveData');
  if (localStorage.getItem('characterSlot')!=="1") datosGuardados = localStorage.getItem('saveData'+localStorage.getItem('characterSlot'));
  const parsedData = JSON.parse(datosGuardados);


  if (datosGuardados && parsedData.savedTotalSeconds){
  if (parsedData.savedTotalSeconds <= stats.totalSeconds){
    

  assignCharacterData()



  }
} else {
    assignCharacterData()
}


function assignCharacterData(){



    const JSONData = JSON.stringify(saveData);
    const saveSlot = localStorage.getItem('characterSlot')

    //console.log("character saved in slot "+saveSlot)

    if (saveSlot==="1") localStorage.setItem('saveData', JSONData); 
    if (saveSlot==="2") localStorage.setItem('saveData2', JSONData); 
    if (saveSlot==="3") localStorage.setItem('saveData3', JSONData); 
    if (saveSlot==="4") localStorage.setItem('saveData4', JSONData); 
    if (saveSlot==="5") localStorage.setItem('saveData5', JSONData); 

    if (soulboundItems.length>0) localStorage.setItem('soulboundItems', soulboundItems); 



}

}

function load(slot) {

  let datosGuardados = localStorage.getItem('saveData');

  const localSaveSlot = localStorage.getItem('characterSlot')

  if (localSaveSlot!=1 && localSaveSlot!==undefined) datosGuardados = localStorage.getItem('saveData'+localSaveSlot);



  if (datosGuardados) { //checks if savedata available
    const parsedData = JSON.parse(datosGuardados);



    //console.log(parsedData.savedItems)
    //itemInventory.push(...parsedData.savedItems);


    if (localStorage.getItem('soulboundItems')!==null) {

        //console.log(localStorage.getItem('soulboundItems'))
        let soulItemArray = localStorage.getItem('soulboundItems').split(',');

        soulItemArray.forEach((item) => {
            const soulItem = eval(item)
            spawnItem(soulItem,1,"offline")
          });

    }
    
    
    
   



    if (parsedData.savedItems){
    for (const savedItem of parsedData.savedItems) {



        let newClass = undefined;
        try {
          if (typeof savedItem.className === 'string' && typeof eval(savedItem.className) !== 'undefined') {
            newClass = eval(savedItem.className);
          }
        } catch (error) {
          console.warn('savedItem.className no longer exists. oopsy!', error);
        }

        if (newClass === undefined) continue;


        if (savedItem.upgrade!=undefined) newClass.upgrade = savedItem.upgrade
        if (savedItem.timesGot!=undefined) newClass.timesGot = savedItem.timesGot
        if (savedItem.count!=undefined) newClass.count = savedItem.count

 

        const newItem = new (eval(savedItem.className))();

        if (savedItem.align!=undefined) newItem.align = savedItem.align
        if (savedItem.glimmer!=undefined) newItem.glimmer = savedItem.glimmer
        if (savedItem.prefix1!=undefined) newItem.prefix1 = savedItem.prefix1
        if (savedItem.prefix2!=undefined) newItem.prefix2 = savedItem.prefix2
        if (savedItem.prefix3!=undefined) newItem.prefix3 = savedItem.prefix3
        if (savedItem.prefix4!=undefined) newItem.prefix4 = savedItem.prefix4
        if (savedItem.prefix5!=undefined) newItem.prefix5 = savedItem.prefix5
        if (savedItem.loadouts!=undefined) newItem.loadouts = savedItem.loadouts
        if (savedItem.paint!=undefined) newItem.paint = savedItem.paint
        if (savedItem.locked!=undefined) newItem.locked = savedItem.locked
        if (savedItem.armorSkill!=undefined) newItem.armorSkill = savedItem.armorSkill
        if (savedItem.armorSkillExtra!=undefined) newItem.armorSkillExtra = savedItem.armorSkillExtra
        if (savedItem.savedName!=undefined) newItem.savedName = savedItem.savedName
        if (savedItem.savedImg!=undefined) newItem.savedImg = savedItem.savedImg
        if (savedItem.savedQuality!=undefined) newItem.savedQuality = savedItem.savedQuality
        if (savedItem.savedInfo!=undefined) newItem.savedInfo = savedItem.savedInfo
        if (savedItem.uses!=undefined) newItem.uses = savedItem.uses
        if (savedItem.gemSlot!=undefined) newItem.gemSlot = savedItem.gemSlot
        if (savedItem.rogue!=undefined) newItem.rogue = savedItem.rogue

        itemInventory.push(newItem);

    }
    }



    if (parsedData.savedItemsMemory){
        for (const savedItem of parsedData.savedItemsMemory) {
    
            let newClass = undefined;
            try {
              if (typeof savedItem.className === 'string' && typeof eval(savedItem.className) !== 'undefined') {
                newClass = eval(savedItem.className);
              }
            } catch (error) {
              console.warn('savedItem.className no longer exists. oopsy!', error);
            }
    
            if (newClass === undefined) continue;
    
    
            if (savedItem.upgrade!=undefined) newClass.upgrade = savedItem.upgrade
            if (savedItem.timesGot!=undefined) newClass.timesGot = savedItem.timesGot
            if (savedItem.count!=undefined) newClass.count = savedItem.count
            if (savedItem.cd!=undefined) newClass.cd = savedItem.cd

            const newItem = new (eval(savedItem.className))();

            itemInventoryMemory.push(newItem);

        }
        }



    for (const i in parsedData.savedDungeonCharges) if (areas[i]) { areas[i].charges = parsedData.savedDungeonCharges[i];}

    for (const i in parsedData.savedGametips)  if (gametip[i]) { gametip[i].unlocked = parsedData.savedGametips[i];}

    for (const i in parsedData.savedFertiliser) { fertiliser[i].unlocked = parsedData.savedFertiliser[i];}

    for (const i in parsedData.savedClassData) { rpgClass[i].level = parsedData.savedClassData[i].level;}
    for (const i in parsedData.savedClassData) { rpgClass[i].currentExp = parsedData.savedClassData[i].currentExp;}
    for (const i in parsedData.savedClassData) { rpgClass[i].nextExp = parsedData.savedClassData[i].nextExp;} 

    for (const i in parsedData.savedClassLevel) { rpgClass[i].level = parsedData.savedClassLevel[i];}
    for (const i in parsedData.savedClassCurrentExp) { rpgClass[i].currentExp = parsedData.savedClassCurrentExp[i];}
    for (const i in parsedData.savedClassNextExp) { rpgClass[i].nextExp = parsedData.savedClassNextExp[i];}



    savedSound = parsedData.savedSound;

    for (const i in parsedData.savedPlotSlot) { plot[i].slot = parsedData.savedPlotSlot[i];}
    for (const i in parsedData.savedPlotAge) { plot[i].age = parsedData.savedPlotAge[i];}
    for (const i in parsedData.savedPlotWater) { plot[i].water = parsedData.savedPlotWater[i];}
    for (const i in parsedData.savedPlotMature) { plot[i].mature = parsedData.savedPlotMature[i];}
    for (const i in parsedData.savedPlotRenewable) { plot[i].renewable = parsedData.savedPlotRenewable[i];}

    for (const i in parsedData.savedGardenShopStock) { gardenShop[i].stock = parsedData.savedGardenShopStock[i];}

    for (const i in parsedData.savedSeedHarvested) { plants[i].harvested = parsedData.savedSeedHarvested[i];}

    for (const i in parsedData.savedItemVaulted) { if (items[i]) items[i].vaulted = parsedData.savedItemVaulted[i];}

    for (const i in parsedData.savedSeedCount) { plants[i].count = parsedData.savedSeedCount[i];}

    for (const i in parsedData.savedSeedPlanted) { plants[i].planted = parsedData.savedSeedPlanted[i];}



    for (const i in parsedData.savedEnemiesSaw) { enemies[i].sawOnce = parsedData.savedEnemiesSaw[i];}

    for (const i in parsedData.savedItemQueue) if (recipes[i]) { recipes[i].craftingQueue = parsedData.savedItemQueue[i];}


    for (const i in parsedData.savedSkirmishRecord) { skirmish[i].bestScore = parsedData.savedSkirmishRecord[i];}

    for (const i in parsedData.savedDungeonTimer) if (areas[i]) { areas[i].dungeonTimer = parsedData.savedDungeonTimer[i];}

    for (const i in parsedData.savedHonorStock) { if (shopHonor[i]) shopHonor[i].stock = parsedData.savedHonorStock[i];}  

    for (const i in parsedData.savedShowdownRecord) { showdown[i].bestTime = parsedData.savedShowdownRecord[i];}  

    for (const i in parsedData.savedRecipePanelUnlocked) if (jobPanels[i]) { jobPanels[i].unlocked = parsedData.savedRecipePanelUnlocked[i];}  

    for (const i in parsedData.savedItemOfTheDay) { itemOfTheDay[i] = parsedData.savedItemOfTheDay[i];}

    for (const i in parsedData.savedResearchUnlocked) { research[i].unlocked = parsedData.savedResearchUnlocked[i];}  
    for (const i in parsedData.savedResearchTimer) { research[i].timer = parsedData.savedResearchTimer[i];}  
    for (const i in parsedData.savedResearchStatus) { research[i].status = parsedData.savedResearchStatus[i];}  

    for (const i in parsedData.savedJobUnlocked) { if (jobPanels[i]) jobPanels[i].unlocked = parsedData.savedJobUnlocked[i];}  

    for (const i in parsedData.savedTalents) { talent[i].active = parsedData.savedTalents[i];}  
    for (const i in parsedData.savedTalentsStats) { talent[i].statUp = parsedData.savedTalentsStats[i];}  
    for (const i in parsedData.savedTalentsPermanent) { talent[i].permanent = parsedData.savedTalentsPermanent[i];}  


    for (const i in parsedData.savedBuildingLevel) { buildings[i].level = parsedData.savedBuildingLevel[i];}  
    for (const i in parsedData.savedBuildingUnlock) { buildings[i].unlocked = parsedData.savedBuildingUnlock[i];}  
    for (const i in parsedData.savedBuildingMaxLevel) { buildings[i].maxLevel = parsedData.savedBuildingMaxLevel[i];}  
    for (const i in parsedData.savedBuildingTier) { buildings[i].tier = parsedData.savedBuildingTier[i];}  
    for (const i in parsedData.savedBuildingProgress) { buildings[i].progress = parsedData.savedBuildingProgress[i];}  

    
    for (const i in parsedData.savedLogsUnlocked) { if (logs[i]) logs[i].unlocked = parsedData.savedLogsUnlocked[i];}  
    for (const i in parsedData.savedLogsOnce) { if (logs[i]) logs[i].once = parsedData.savedLogsOnce[i];}  
    for (const i in parsedData.savedLogsRevealed) { if (logs[i]) logs[i].revealed = parsedData.savedLogsRevealed[i];}  
    for (const i in parsedData.savedLogsOnceEver) { if (logs[i]) logs[i].onceEver = parsedData.savedLogsOnceEver[i];}  
    for (const i in parsedData.savedLogsClaimed) { if (logs[i]) logs[i].claimed = parsedData.savedLogsClaimed[i];}  


    for (const i in parsedData.savedMailGot) { if (mail[i]) mail[i].recieved = parsedData.savedMailGot[i];}  
    for (const i in parsedData.savedMailRead) { if (mail[i]) mail[i].read = parsedData.savedMailRead[i];}  
    for (const i in parsedData.savedMailDeleted) { if (mail[i]) mail[i].deleted = parsedData.savedMailDeleted[i];}  


    for (const i in parsedData.savedJobLevel) { jobs[i].level = parsedData.savedJobLevel[i];}  
    for (const i in parsedData.savedJobExp) { jobs[i].exp = parsedData.savedJobExp[i];}
    for (const i in parsedData.savedJobMaxExp) { jobs[i].maxExp = parsedData.savedJobMaxExp[i];}  
      
    for (const i in parsedData.savedJobPanelHidden) { if (jobPanels[i]) jobPanels[i].hidden = parsedData.savedJobPanelHidden[i];}  
    for (const i in parsedData.savedJobPanelUnlock) { if (jobPanels[i]) jobPanels[i].unlocked = parsedData.savedJobPanelUnlock[i];}  
      
    //for (const i in parsedData.savedShopStock) if (shopItems[i]) { shopItems[i].stock = parsedData.savedShopStock[i];}
    //for (const i in parsedData.savedShopUnlocked) if (shopItems[i]) { shopItems[i].unlocked = parsedData.savedShopUnlocked[i];}  
      
    for (const i in parsedData.savedAreaShopStock) if (areaShop[i]) { areaShop[i].stock = parsedData.savedAreaShopStock[i];}


    for (const i in parsedData.savedAreaActive) { areas[i].active = parsedData.savedAreaActive[i];}  
    for (const i in parsedData.savedAreaUnlocked) { areas[i].locked = parsedData.savedAreaUnlocked[i];}  

    
    for (const i in parsedData.savedAreaBoss) if (areas[i]) { areas[i].boss = parsedData.savedAreaBoss[i];}  
    for (const i in parsedData.savedAreaOre) if (areas[i]) { areas[i].unlockedOre = parsedData.savedAreaOre[i];}  
    for (const i in parsedData.savedAreaHerb) if (areas[i]) { areas[i].unlockedHerb = parsedData.savedAreaHerb[i];}
    for (const i in parsedData.savedAreaPond) if (areas[i]) { areas[i].unlockedPond = parsedData.savedAreaPond[i];}
    for (const i in parsedData.savedShopLevel) if (areas[i]) { areas[i].shopLevel = parsedData.savedShopLevel[i];}
    for (const i in parsedData.savedShopProgress) if (areas[i]) { areas[i].shopProgress = parsedData.savedShopProgress[i];}
    for (const i in parsedData.savedCurrentHeat) if (areas[i]) { areas[i].heat = parsedData.savedCurrentHeat[i];}
    for (const i in parsedData.savedMaxHeat) if (areas[i]) { areas[i].heatMax = parsedData.savedMaxHeat[i];}
    for (const i in parsedData.savedDifficulty) if (areas[i]) { areas[i].savedDifficulty = parsedData.savedDifficulty[i];}


    for (const i in parsedData.savedRecipeTime) { if (craftingRecipes[i]) craftingRecipes[i].timeCurrent = parsedData.savedRecipeTime[i];}
    for (const i in parsedData.savedRecipeQue) { if (craftingRecipes[i]) craftingRecipes[i].que = parsedData.savedRecipeQue[i];}
    for (const i in parsedData.savedRecipeLocked) { if (craftingRecipes[i]) craftingRecipes[i].locked = parsedData.savedRecipeLocked[i];}

  

    for (const i in parsedData.savedItemCount) { if (items[i]) items[i].count = parsedData.savedItemCount[i];}
    for (const i in parsedData.savedItemLevel) { if (items[i]) items[i].level = parsedData.savedItemLevel[i];}
    for (const i in parsedData.savedItemCELevel) { if (items[i]) items[i].CELevel = parsedData.savedItemCELevel[i];}
    for (const i in parsedData.savedItemCD) { if (items[i]) items[i].cd = parsedData.savedItemCD[i];}
    for (const i in parsedData.savedItemStats) { if (items[i]) items[i].statUp = parsedData.savedItemStats[i];}
    for (const i in parsedData.savedItemGot) { if (items[i]) items[i].gotOnce = parsedData.savedItemGot[i];}
    for (const i in parsedData.savedItemTimesGot) { if (items[i]) items[i].timesGot = parsedData.savedItemTimesGot[i];}
    for (const i in parsedData.savedItemRevealed) { if (items[i]) items[i].revealed = parsedData.savedItemRevealed[i];}

    for (const i in parsedData.savedItemStamp1) { if (items[i]) items[i].stamp1 = parsedData.savedItemStamp1[i];}
    for (const i in parsedData.savedItemStamp2) { if (items[i]) items[i].stamp2 = parsedData.savedItemStamp2[i];}
    for (const i in parsedData.savedItemStamp3) { if (items[i]) items[i].stamp3 = parsedData.savedItemStamp3[i];}

    for (const i in parsedData.savedWarPaint) { if (items[i]) items[i].paint = parsedData.savedWarPaint[i];}

    for (const i in parsedData.savedItemFavorited) { if (items[i]) items[i].favorited = parsedData.savedItemFavorited[i];}

    for (const i in parsedData.savedItemLocked) { if (items[i]) items[i].locked = parsedData.savedItemLocked[i];}

    for (const i in parsedData.savedItemArmory) { if (items[i]) items[i].armoryState = parsedData.savedItemArmory[i];}


    for (const i in parsedData.savedBuffTime) { if (buffs[i]) buffs[i].time = parsedData.savedBuffTime[i];}
    for (const i in parsedData.savedBuffStacks) { if (buffs[i]) buffs[i].stacks = parsedData.savedBuffStacks[i];}
    
    for (const i in parsedData.savedEnemyKills) { enemies[i].killCount = parsedData.savedEnemyKills[i];}
    for (const i in parsedData.savedEnemyMedalProgress) { enemies[i].medalProgress = parsedData.savedEnemyMedalProgress[i];}
    for (const i in parsedData.savedEnemyNerf) { enemies[i].nerfed = parsedData.savedEnemyNerf[i];}
    for (const i in parsedData.savedEnemyMedal) { enemies[i].medal = parsedData.savedEnemyMedal[i];}
    for (const i in parsedData.savedheatBeaten) { enemies[i].heatBeaten = parsedData.savedheatBeaten[i];}

    for (const i in parsedData.savedEnemyCard1) { enemies[i].card1.got = parsedData.savedEnemyCard1[i];}
    for (const i in parsedData.savedEnemyCard2) { enemies[i].card2.got = parsedData.savedEnemyCard2[i];}
    for (const i in parsedData.savedEnemyCard3) { enemies[i].card3.got = parsedData.savedEnemyCard3[i];}


    for (const i in parsedData.savedQuestState) { if (quests[i]) quests[i].state = parsedData.savedQuestState[i];}
    for (const i in parsedData.savedQuestUnlocked) { if (quests[i]) quests[i].unlocked = parsedData.savedQuestUnlocked[i];}

    for (const i in parsedData.savedPlayerData) { rpgPlayer[i] = parsedData.savedPlayerData[i];}  
    for (const i in parsedData.savedCdData) { cd[i] = parsedData.savedCdData[i];}  
    for (const i in parsedData.savedSettingsData){ settings[i] = parsedData.savedSettingsData[i];}
    for (const i in parsedData.savedStatsData) { stats[i] = parsedData.savedStatsData[i];}
    for (const i in parsedData.savedUnlocksData) { unlocks[i] = parsedData.savedUnlocksData[i];}  

    

      
  }
}

function deleteSave() {

    localStorage.removeItem('saveData');

    const saveData = {}
    saveData.savedItemCount = {}; for (const i in items) { if (items[i].quality==="Soulbound")  saveData.savedItemCount[i] = items[i].count;}
    const JSONData = JSON.stringify(saveData);
    localStorage.setItem('saveData', JSONData); 


    location.reload();
};


function deleteSaveSlot(){




    if (saveToDelete!==1) localStorage.removeItem('saveData'+saveToDelete);
    else localStorage.removeItem('saveData');
    location.reload();
}




stats.lastVisitTime = new Date().getTime()

function exportJSON() {


    if (cd.exportReminder<=0){
        did('exportWidget').style.display = "none"
        did('exportSave').style.animation = "none"
        playSound("audio/retro2.mp3");
        spawnItem(ScratchCard)
        cd.exportReminder = 43200;
        //unlocksReveal();
    }

    save();

    
    //if (!localStorage.getItem('saveData')){ if (!did('importPopUp')) {createPopup('&#10060; No SaveData Found', '#913c3c', 'importPopUp')} } else {
    
    let datosGuardados = localStorage.getItem('saveData');
    if (localStorage.getItem('characterSlot')!=="1") datosGuardados = localStorage.getItem('saveData'+localStorage.getItem('characterSlot'));
    

    const jsonData = JSON.parse(datosGuardados);
    
    const jsonStr = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `STI[B]${stats.currentVersion}-${stats.turtleName}.json`;

    a.click();
    URL.revokeObjectURL(url);
        
        
    //}
}

function importJSON(slot) {

    
    
    
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const importedData = JSON.parse(e.target.result);
                const JSONData = JSON.stringify(importedData);


                const char1 = JSON.parse(localStorage.getItem('saveData')) || {};
                const char2 = JSON.parse(localStorage.getItem('saveData2')) || {};
                const char3 = JSON.parse(localStorage.getItem('saveData3')) || {};
                const char4 = JSON.parse(localStorage.getItem('saveData4')) || {};
                const char5 = JSON.parse(localStorage.getItem('saveData5')) || {};

                            
                if (
                    !rpgPlayer.debug && importedData.savedPlayerData.playerSeed != undefined && (
                        char1?.savedPlayerData?.playerSeed === importedData.savedPlayerData.playerSeed ||
                        char2?.savedPlayerData?.playerSeed === importedData.savedPlayerData.playerSeed ||
                        char3?.savedPlayerData?.playerSeed === importedData.savedPlayerData.playerSeed ||
                        char4?.savedPlayerData?.playerSeed === importedData.savedPlayerData.playerSeed ||
                        char5?.savedPlayerData?.playerSeed === importedData.savedPlayerData.playerSeed
                    )
                ) {
                    
                    setTimeout(() => {
                        playSound("audio/close.mp3","all");
                    }, 1000);

                    createPopup("❌ This character is already present!")
                    return
                }













                if (slot!==1) localStorage.setItem('saveData'+slot, JSONData);
                else localStorage.setItem('saveData', JSONData);
                
                location.reload();
            };
            reader.readAsText(file);
        }
    });
    input.click();
        
        
}

//#endregion
//----------------------==========================-----------------------
//----------------------==========DOM LOAD========-----------------------
//----------------------==========================-----------------------
//#region Load

function googleTranslateElementInit() {
    new google.translate.TranslateElement({ layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL }, 'google_translate_element');
}




cd.exportReminder = 43200;
unlocks.garden = false;

function unlocksReveal(){

    if (unlocks.shop && stats.currentArea!=="L1") did("shopInteractable").style.display = "flex"
    if (unlocks.crafting) did("inventoryCraftingPageSquare").style.display = "flex"
    if (unlocks.dailyPresent) did("dailyPresent").style.display = "flex"
    if (unlocks.loadouts) did('slotButtonHolderLoadout').style.visibility = "visible";
    if (unlocks.bestiary) did('bestiaryWidget').style.display = "flex";


    if (unlocks.mail) did('mailButton').style.display = "flex";
    if (unlocks.gacha) did('gachaWidget').style.display = "flex";

    if (unlocks.jobs) did('jobTab').style.display = "flex";
    if (unlocks.garrison) did('campTab').style.display = "flex";
    if (unlocks.itemOfTheDay) did('itemOfTheDay').style.display = "flex";
    if (unlocks.journal) did('achievementsTab').style.display = "flex";
    if (unlocks.armory) did('armoryButton').style.display = "flex";
    //if (unlocks.wobblyCursor) did('wubblySettings').style.display = "flex";
    if (unlocks.penguins) {
        

        did("minipenguin1").style.display = "flex"
        did("minipenguin2").style.display = "flex"
        did("minipenguin3").style.display = "flex"

    }
    if (unlocks.inventorySorting) {
        //did('inventorySorters2').style.display = "flex";


        document.querySelectorAll('.extraSorter').forEach(elemento => elemento.style.display = "flex");
        did('addFavoriteButton').style.display = "flex";
        did('addVaultButton').style.display = "flex";
}

    if (unlocks.garden) {did('gardenLockedPanel').style.display = "none"; }
    if (unlocks.gardenUpgrade1) did('gardenRow3').style.display = "flex";
    if (unlocks.gardenUpgrade2) did('gardenRow4').style.display = "flex";
    if (unlocks.gardenUpgrade3) did('gardenRow5').style.display = "flex";




    if (unlocks.seedCompendium) did('gardenShipButton').style.display = "flex";
    if (unlocks.fertiliser) did('gardenFertiliserButton').style.display = "flex";

    //if (unlocks.shop) { if (stats.currentArea !== "A7") did('shopButton').innerHTML = '<img src="img/sys/coin.png" style="margin-right: 0.3rem;">Shop'; did('shopButton').className = "contentHeaderButton" }
    if (unlocks.dungeons) {did('dungeonButton').innerHTML = '<img src="img/src/areas/A3M.png" style="margin-right: 0.3rem;">Dungeon'; did('dungeonButton').className = "contentHeaderButton";}
    if (unlocks.areas) {did('areaButton').innerHTML = '<img src="img/src/icons/expedition.png" style="margin-right: 0.3rem;">Area'; did('areaButton').className = "contentHeaderButton"  }
    //if (quests.A2Q3.state==="completed") {area1Common.I126 = {}; area1Common.I126.D=30; area1Common.I126.C=1; }
    if (unlocks.skills) {
        did("expPanel").className = "expPanelUnlocked"; 
        did('skillsButton').innerHTML = '<img src="img/src/icons/skillsIcon.jpg">Skills'; did('skillsButton').className = "contentHeaderButton"}
    if (unlocks.magic) {
        did('manaBox').style.display = "flex";
        did('skillSlot1').style.display = "flex";
        did('skillSlot2').style.display = "flex";
        did('skillSlot3').style.display = "flex";
        did('skillSlot4').style.display = "flex";
        did('skillSlot0').style.display = "flex";
        did('rpgCanvasUnder').style.background = "#19191C";
    }


    if (stats.questsCompleted>=1) sendMail("FLAVOR1"); //mom
    if (stats.questsCompleted>=13) sendMail("FLAVOR2"); //gem
    if (stats.questsCompleted>=17) sendMail("FLAVOR3"); //mom
    if (stats.questsCompleted>=20) sendMail("FLAVOR4"); //mom


    
}

VanillaTilt.init(document.querySelectorAll(".introCard"), {
    max: 20,
    speed: 2000,
    scale: 1.1,
    reverse: true,
    perspective: 1500,
    gyroscope: false,
  });


function startGameCard(mode){

    if (mode==="nofarm") {toggleSettings('nofarmToggle'); statsUpdate()}
    if (mode==="hard") {toggleSettings('hardmodeToggle');}

    playSound("audio/button5.mp3","all")

did("introPanel").style.height = "0%"

setTimeout(() => {
    did("introPanel").style.display = "none"
}, 1000);

tipPopUp("🐢 Welcome! 🐢","<img src=img/sys/nerd.png><br>Welcome to Super Turtle Idle, an incremental idle RPG. Complete quests, gather materials by idling, and tackle mighty foes!<br><br>Why dont we start by checking the quest board?")
}

settings.currentDifficulty = "Medium"

const difficulties = ["Very Easy","Easy", "Medium", "Hard", "Very Hard"];
let currentDifIndex = 0;

function switchDifficulty(){

    playSound("audio/button1.mp3");

    currentDifIndex = (currentDifIndex + 1) % difficulties.length;
    settings.currentDifficulty = difficulties[currentDifIndex]
    did("difficultyToggle").innerHTML = difficulties[currentDifIndex]


    difficultyUi()


}

function difficultyUi(){

    if (settings.currentDifficulty === "Very Easy") did("difficultyToggle").style.background = "#1DAF00"
    if (settings.currentDifficulty === "Easy") did("difficultyToggle").style.background = "#0098AF"
    if (settings.currentDifficulty === "Medium") did("difficultyToggle").style.background = "#373737"
    if (settings.currentDifficulty === "Hard") did("difficultyToggle").style.background = "#AF5200"
    if (settings.currentDifficulty === "Very Hard") did("difficultyToggle").style.background = "#AF004C"

    


    did("difficultyToggle").innerHTML = settings.currentDifficulty



}













stats.currentVersion = undefined;

function retroactiveUpdate(){

    if (stats.currentVersion === undefined && enemies.E1.killCount>3) { did("outdatedData").style.display = "flex"; did("bodyCover").style.display = "flex"; items.I317.count++}

    if (stats.currentVersion === undefined) {
        did("introPanel").style.display = "flex"
        did("introPanel2").style.display = "flex"
        did("interactableQuestButton").style.animation = "widgetAlert2 1s infinite"
    
        if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
           
            stats.zoomLevel=50
            document.documentElement.style.zoom = stats.zoomLevel+"%";

        }

    }

    if (items.I113.statUp!==0) items.I113.statUp = 25 
    if (items.I124.statUp!==0) items.I124.statUp = 35
    if (items.I128.statUp!==0) items.I128.statUp = 50


    if (stats.currentVersion<0.41){


        strip()

        items.I57.count = Math.ceil(items.I57.count / 55);
        items.I165.count = Math.ceil(items.I165.count / 55);
        items.I71.count = Math.ceil(items.I71.count / 55);
        items.I100.count = Math.ceil(items.I100.count / 55);
        sendMail("MS1")
        
    }

    //if (stats.currentVersion<0.42){ sendMail("MS2"); gametipUnlock("gt18")}

    if (stats.currentVersion<0.43){for (var i in research) { research[i].status = "waiting"; research[i].unlocked = false; }; areas.A9.unlockedHerb = 0;}

    if (stats.currentVersion<0.44){for (var i in research) if (research[i].status === "completed") {research[i].status = "waiting"; research[i].unlocked = false; research[i].timer = research[i].timerMax; } }

    //sanityCheck()

    if (stats.currentVersion<1.04){ Luma.upgrade = undefined }

  
    


    stats.currentVersion = 1.053;
    did("versionNumber").innerHTML = `📃 [BETA] ${stats.currentVersion.toFixed(3)}`
}





function sanityCheck(){
for (i in items){ if (!(equipCheck(i)) && items[i].sort==="equipable") {eval(items[i].remove)} }
}

function upgradesReveal(){
    for (let i in items) {
        if (items[i].quality==="Upgrade" && items[i].gotOnce && !did(i+"upgrades")) {
            const div = document.createElement("img");
            div.id = i+"upgrades";
            did('boughtUpgrades').appendChild(div);
            div.src = "img/src/items/"+i+".jpg";  
            tooltipUpgrades(i)
        }
    }
}


function strip(){
    rpgPlayer.feetSlot = 'none'
rpgPlayer.headSlot = 'none'
rpgPlayer.legsSlot = 'none'
rpgPlayer.handsSlot = 'none'
rpgPlayer.chestSlot = 'none'
rpgPlayer.ringSlot = 'none'
rpgPlayer.weaponSlot = 'none'
rpgPlayer.trinketSlot = 'none'
rpgPlayer.L1feetSlot = 'none'
rpgPlayer.L1headSlot = 'none'
rpgPlayer.L1legsSlot = 'none'
rpgPlayer.L1handsSlot = 'none'
rpgPlayer.L1chestSlot = 'none'
rpgPlayer.L1ringSlot = 'none'
rpgPlayer.L1weaponSlot = 'none'
rpgPlayer.L1trinketSlot = 'none'
rpgPlayer.L2feetSlot = 'none'
rpgPlayer.L2headSlot = 'none'
rpgPlayer.L2legsSlot = 'none'
rpgPlayer.L2handsSlot = 'none'
rpgPlayer.L2chestSlot = 'none'
rpgPlayer.L2ringSlot = 'none'
rpgPlayer.L2weaponSlot = 'none'
rpgPlayer.L2trinketSlot = 'none'
rpgPlayer.L3feetSlot = 'none'
rpgPlayer.L3headSlot = 'none'
rpgPlayer.L3legsSlot = 'none'
rpgPlayer.L3handsSlot = 'none'
rpgPlayer.L3chestSlot = 'none'
rpgPlayer.L3ringSlot = 'none'
rpgPlayer.L3weaponSlot = 'none'
rpgPlayer.L3trinketSlot = 'none'
rpgPlayer.L4feetSlot = 'none'
rpgPlayer.L4headSlot = 'none'
rpgPlayer.L4legsSlot = 'none'
rpgPlayer.L4handsSlot = 'none'
rpgPlayer.L4chestSlot = 'none'
rpgPlayer.L4ringSlot = 'none'
rpgPlayer.L4weaponSlot = 'none'
rpgPlayer.L4trinketSlot = 'none'
rpgPlayer.L5feetSlot = 'none'
rpgPlayer.L5headSlot = 'none'
rpgPlayer.L5legsSlot = 'none'
rpgPlayer.L5handsSlot = 'none'
rpgPlayer.L5chestSlot = 'none'
rpgPlayer.L5ringSlot = 'none'
rpgPlayer.L5weaponSlot = 'none'
rpgPlayer.L5trinketSlot = 'none'
rpgPlayer.L6feetSlot = 'none'
rpgPlayer.L6headSlot = 'none'
rpgPlayer.L6legsSlot = 'none'
rpgPlayer.L6handsSlot = 'none'
rpgPlayer.L6chestSlot = 'none'
rpgPlayer.L6ringSlot = 'none'
rpgPlayer.L6weaponSlot = 'none'
rpgPlayer.L6trinketSlot = 'none'
rpgPlayer.L7feetSlot = 'none'
rpgPlayer.L7headSlot = 'none'
rpgPlayer.L7legsSlot = 'none'
rpgPlayer.L7handsSlot = 'none'
rpgPlayer.L7chestSlot = 'none'
rpgPlayer.L7ringSlot = 'none'
rpgPlayer.L7weaponSlot = 'none'
rpgPlayer.L7trinketSlot = 'none'
}

function tooltipUpgrades(i) {
    if (did(i+"upgrades")) {
    did(i+"upgrades").addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex";
    did("tooltipName").textContent = items[i].name;
    did("tooltipPrice").innerHTML = '';
    did("tooltipRarity").textContent = 'Upgrade';
    did("tooltipRarity").style.color = "#00FFCA";      
    did("tooltipName").style.color = "#00FFCA";     
    did("tooltipDescription").innerHTML = items[i].description+'<br><div class="separador"></div>';
    if (items[i].dynamic) did("tooltipDescription").innerHTML = eval(items[i].description)+'<br><div class="separador"></div>';
    did('tooltipImage').src = "img/src/items/"+i+".jpg";
    did("tooltipFlavor").textContent = items[i].flavor;
  
    
    const movingDiv = did('tooltip');
    const referenceDiv = did(i+"upgrades");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 33;
    const referenceTop = referenceRect.top - 15;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
    
        
  });
    did(i+"upgrades").addEventListener('mouseleave', function () {
    resetTooltip();
    });
  }
}

let randomTab = rng(1,11)

function randomTabName(icon){ //displays a random browser tab name
    let random = randomTab;
    let reminder = ""

    if (icon==="plant") reminder = "[🌱!]";

    if (random===1) document.title = reminder+" Your Turtle Is Working Hard"; 
    if (random===2) document.title = reminder+" Where Is My Day Off?";
    if (random===3) document.title = reminder+" They Shell Rise Again";
    if (random===4) document.title = reminder+" Slaying Beasts";
    if (random===5) document.title = reminder+" Exploring Uncharted Lands";
    if (random===6) document.title = reminder+" Adventuring In Progress";
    if (random===7) document.title = reminder+" Pat Pat Pat Pat Pat Pat Pat Pat";
    if (random===8) document.title = reminder+" Grinding Materials";
    if (random===9) document.title = reminder+" Super Turtle Idle";
    if (random===10) document.title = reminder+" You Can Leave It To Me";
    if (random===11) document.title = reminder+" Have You Seen Whiskers?";


}



stats.zoomLevel = 100

let documentRect = document.body.getBoundingClientRect();

function resolutionIncrease(mod){


if (mod === "more"){
    stats.zoomLevel += 5
}

if (mod === "less"){
    stats.zoomLevel -= 5
}

if (mod!==undefined){

    playSound("audio/button3.mp3","all")




}



document.documentElement.style.zoom = stats.zoomLevel+"%";

did("zoomLevelText").innerHTML = `Zoom Level (${stats.zoomLevel}%)`




}




document.addEventListener('click', function(event) {

    if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        openFullscreen();
    }

})




function openFullscreen() {
    const elem = document.documentElement; // O usa document.body
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}


function returnInactiveTime(lastvisit) {

    const lastVisitTime = lastvisit
    const currentTime = new Date().getTime();
    const inactiveTime = currentTime - parseInt(lastVisitTime);
    const secondsInactive = Math.min(  Math.floor(inactiveTime / 1000) , 259200 ); 
    return convertSecondsToDHM(secondsInactive)

}

function introCharacterData(){

    if (localStorage.getItem('loadIntro')!=="false") did("characterPanel").style.display = "flex"



    saveSlotData("")
    saveSlotData(2)
    saveSlotData(3)
    saveSlotData(4)
    saveSlotData(5)


    function saveSlotData(slot){


        const character = localStorage.getItem('saveData'+slot);
        if (character) {
            const parsedData = JSON.parse(character);
            did("saveSlot"+slot+"Delete").style.display = "flex"
            
            let offlineActivity = `Farming ${enemies[parsedData.savedStatsData.currentEnemy].name}s since ${returnInactiveTime(parsedData.savedStatsData.lastVisitTime)}`
            if (parsedData.savedStatsData.canOffline===false) offlineActivity = `Doing nothing since ${returnInactiveTime(parsedData.savedStatsData.lastVisitTime)}`
    
            let portraitHat = ""
            if (parsedData.savedPlayerData.hat!==undefined) portraitHat = `<img class="characterPortraitHead" src="img/src/hats/${parsedData.savedPlayerData.hat.img}.png" style="filter:hue-rotate(${parsedData.savedPlayerData.hat.paint}deg)">`
    
            did("saveSlot"+slot).innerHTML = `
            <div class="saveSlotBg" style="background-image: url(img/src/areas/${parsedData.savedStatsData.currentArea}.png)"></div>
            <div class="characterPortrait">
            <img class="characterPortraitHead" src="img/src/armor/A0.png">
            ${portraitHat}
            </div>
            <div class="characterInfo">
            ${parsedData.savedStatsData.turtleName}
            <br>
            Started on ${parsedData.savedStatsData.startedSince}
            <br>
            ${offlineActivity}
            </div>
            `
    
        }






    }


    /*

    const character = localStorage.getItem('saveData');
    if (character) {
        const parsedData = JSON.parse(character);
        did("saveSlotDelete").style.display = "flex"
        
        let offlineActivity = `Farming ${enemies[parsedData.savedStatsData.currentEnemy].name}s since ${returnInactiveTime(parsedData.savedStatsData.lastVisitTime)}`
        if (parsedData.savedStatsData.canOffline===false) offlineActivity = `Doing nothing since ${returnInactiveTime(parsedData.savedStatsData.lastVisitTime)}`

        let portraitHat = ""
        if (parsedData.savedPlayerData.hat!==undefined) portraitHat = `<img class="characterPortraitHead" src="img/src/hats/${parsedData.savedPlayerData.hat.img}.png" style="filter:hue-rotate(${parsedData.savedPlayerData.hat.paint}deg)">`

        did("saveSlot").innerHTML = `
        <div class="saveSlotBg" style="background-image: url(img/src/areas/${parsedData.savedStatsData.currentArea}.png)"></div>
        <div class="characterPortrait">
        <img class="characterPortraitHead" src="img/src/armor/A0.png">
        ${portraitHat}
        </div>
        <div class="characterInfo">
        ${parsedData.savedStatsData.turtleName}
        <br>
        Started on ${parsedData.savedStatsData.startedSince}
        <br>
        ${offlineActivity}
        </div>
        `

    }

    const character2 = localStorage.getItem('saveData2');
    if (character2) {
        const parsedData = JSON.parse(character2);
        did("saveSlot2").innerHTML = parsedData.savedStatsData.turtleName
        did("saveSlot2Delete").style.display = "flex"

    }

    const character3 = localStorage.getItem('saveData3');
    if (character3) {
        const parsedData = JSON.parse(character3);
        did("saveSlot3").innerHTML = parsedData.savedStatsData.turtleName
        did("saveSlot3Delete").style.display = "flex"

    }

    const character4 = localStorage.getItem('saveData4');
    if (character4) {
        const parsedData = JSON.parse(character4);
        did("saveSlot4").innerHTML = parsedData.savedStatsData.turtleName
        did("saveSlot4Delete").style.display = "flex"

    }

    const character5 = localStorage.getItem('saveData5');
    if (character5) {
        const parsedData = JSON.parse(character5);
        did("saveSlot5").innerHTML = parsedData.savedStatsData.turtleName
        did("saveSlot5Delete").style.display = "flex"

    }

    */

}



function selectCharacter(slot){




playSound("audio/button3.mp3","all");
playSound("audio/lily.mp3","all");

setTimeout(() => {
localStorage.setItem('characterSlot', slot);
localStorage.setItem('loadIntro', false);
location.reload();
}, 500);






}

function gotoCharacters(){

    save()
    localStorage.setItem('characterSlot', undefined);
    localStorage.setItem('loadIntro', true);
    location.reload();


}






document.addEventListener('DOMContentLoaded', initialization);

function initialization() {
    if (localStorage.getItem('loadIntro')==="false" && localStorage.getItem('characterSlot')!==undefined  ) load(  localStorage.getItem('characterSlot')   )
    toggleSettingsUI();
    displayTurtleName();
    oneSecond();
    rememberCategory(); //remembers tab on the left
    //unlocksReveal();
    randomTabName();
    addItem();
    setCursor();
    upgradesReveal();
    createGametip();
    updateCounters()
    setTimeout(() => {
        unlocksReveal(); //export reminder bullshit
    }, 100);

    mainUIUpdate()

    setParticleQuality()
    //checkResolution()




    weatherCheck();
    weatherStartup();

    resolutionIncrease()
    introCharacterData()
    
}
//#endregion