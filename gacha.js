
let gacha = {}

gacha.general = {};
gacha.general.uncommon = ["I499"]
gacha.general.rare = ["I500"]
gacha.general.epic = ["I501"]
gacha.general.mythic = ["I502"]
//gacha.general.featured = ["I502","I506","I510","I514","I518","I522","I526"]
gacha.general.featured = ["I502"]


stats.gachaMythicPity = 0
stats.gachaEpicPity = 0


function openGacha(mode){

if (mode==="close"){

    playSound("audio/button5.mp3","all")
    playSound("audio/close.mp3","all")
    stopSong(400)


    did("gachaMenu").style.height = "0%";

setTimeout(() => {
    did("gachaMenu").style.display = "none";
}, 800);


return





}


playSound("audio/button5.mp3")
playSound("audio/retro2.mp3")
playSong("audio/gachaOst.mp3")


did("gachaMenu").style.display = "flex";

setTimeout(() => {
    did("gachaMenu").style.height = "100%";
}, 1);



did("sheddingsCounter").innerHTML = '<img src="img/src/icons/sheddings.jpg">'+beautify(rpgPlayer.sheddings)








}

function rollGacha(pulls, pool){ 

    let pullCount = pulls

    for (let i = 0; i < pulls; i++) { setTimeout(gamba, 150 * i);}

    function gamba() {

        setTimeout(() => { playSound("audio/touchCloth.mp3", "all") }, 1000);

            
        

    
    let itemWon = ""
    let pullType = "common"
    itemWon = gacha[pool].uncommon[rng(0,(gacha[pool].uncommon.length-1))]
    if (rng(1,4)===1) {itemWon = gacha[pool].rare[rng(0,(gacha[pool].rare.length-1))];  pullType = "rare"}

    if (rng(1,20)===1) {stats.gachaEpicPity=0; itemWon = gacha[pool].epic[rng(0,(gacha[pool].epic.length-1))];  pullType = "epic"}
    if (stats.gachaEpicPity>=9) {stats.gachaEpicPity=0; itemWon = gacha[pool].epic[rng(0,(gacha[pool].epic.length-1))];  pullType = "epic"}

    if (rng(1,100)===1) {stats.gachaMythicPity=0; itemWon = gacha[pool].mythic[rng(0,(gacha[pool].mythic.length-1))];  pullType = "mythic"}
    if (stats.gachaMythicPity>=150) {stats.gachaMythicPity=0; itemWon = gacha[pool].mythic[rng(0,(gacha[pool].mythic.length-1))];  pullType = "mythic"}

    const div = document.createElement("div");
    div.id = itemWon + "gachaItem" + pullCount;
    div.className = "gachaItem"
    div.innerHTML = '<div id="'+itemWon+'gachaShedding"></div><img src="img/src/items/'+itemWon+'.jpg">';

    if (pullType === "rare"){
        div.innerHTML = '<img src="img/src/icons/gachaFlare.png" class="gachaFlare"> <img src="img/src/items/'+itemWon+'.jpg">';
    }

    if (pullType === "epic"){
        div.innerHTML = '<img src="img/src/icons/gachaFlare.png" class="gachaFlare" style="filter:hue-rotate(50deg)"> <img src="img/src/items/'+itemWon+'.jpg">';
    }

    if (pullType === "mythic"){
        div.innerHTML = '<img src="img/src/icons/gachaFlare.png" class="gachaFlare" style="filter:hue-rotate(100deg)"> <img src="img/src/items/'+itemWon+'.jpg">';
    }

    div.style.outlineColor = returnQualityColor(items[itemWon].quality)
    did("gachaSummons").appendChild(div);


    stats.totalPulls++
    stats.gachaMythicPity++
    stats.gachaEpicPity++

    if (items[itemWon].CELevel===rCELvl(itemWon, "cap")) {

        div.innerHTML = '<div style="display:flex"></div><img src="img/src/items/'+itemWon+'.jpg">';
        rpgPlayer.sheddings += 1
        stats.totalSheddings +=1
        items[itemWon].CELevel = rCELvl(itemWon, "cap")
        did("sheddingsCounter").innerHTML = '<img src="img/src/icons/sheddings.jpg">'+beautify(rpgPlayer.sheddings)


    }

    if (items[itemWon].count>0 && items[itemWon].CELevel<rCELvl(itemWon, "cap")) items[itemWon].CELevel++

    

    rareItemDrop(itemWon,1)














    VanillaTilt.init(document.querySelector("#" + itemWon + "gachaItem" + pullCount), {
        max: 20,
        speed: 2000,
        scale: 1.3,
        reverse: true,
        perspective: 200,
      });



      pullCount--


    }



    }



    document.addEventListener('mousemove', function(event) {
        if (event.target.id && event.target.id.includes("gachaItem")) {
            let itemTarget =  event.target.id.replace(/gachaItem\d+/, '');
            did("tooltip").style.display = "flex";
            did("tooltip").style.display = "flex";
            did("tooltipName").textContent = items[itemTarget].name;
            did("tooltipRarity").textContent = items[itemTarget].quality;
            did("tooltipRarity").style.color = returnQualityColor(items[itemTarget].quality);
            did("tooltipName").style.color = returnQualityColor(items[itemTarget].quality);

            did("tooltipFlavor").textContent = items[itemTarget].flavor;
            did("tooltipImage").src = "img/src/items/" + items[itemTarget].img + ".jpg";
            did("tooltipDescription").innerHTML = eval(items[itemTarget].description)+"<br>"+eval(items[itemTarget].skills);

            did("tooltipPrice").innerHTML = "";
            var movingDiv = did("tooltip");
            var referenceDiv = did(event.target.id);
            var referenceRect = referenceDiv.getBoundingClientRect();
            var newLeft = referenceRect.left;
            var newTop = referenceRect.top - movingDiv.offsetHeight;
            movingDiv.style.left = newLeft - 0+ "px";
            movingDiv.style.top = newTop - 15+ "px";
        }
      });
    
      document.addEventListener('mouseout', function(event) {
        if (event.target.id && event.target.id.includes("gachaItem")) {
            resetTooltip();
        }
      });



      VanillaTilt.init(document.querySelector(".featuredGachaItem"), {
        max: 20,
        speed: 2000,
        scale: 1.3,
        reverse: true,
        perspective: 200,
      });


      const gachaBG = new Image();
      gachaBG.src = 'img/src/icons/gachaBanner2.png';

      let canRoll = true

      settings.selectedBanner = "general"

      function bannerPull(pulls, type){



        playSound("audio/gacha1.mp3", "all")


        let resourceType = "scutes"
        let rollCost = 150


        if (type==="scute"){
            if (pulls === 10) rollCost = 1350
        }
        

        if (canRoll && rpgPlayer[resourceType] >= rollCost){
        canRoll = false



        rpgPlayer[resourceType]-= rollCost;
        did(resourceType+"Counter").innerHTML = '<img src="img/src/icons/scutes.jpg">'+beautify(rpgPlayer[resourceType])


        did(resourceType+"Counter").style.animation = "";
        void did(resourceType+"Counter").offsetWidth;
        did(resourceType+"Counter").style.animation = "gachaCurrencyDown 1s 1 ease-out";


        if (type==="scute"){
        did("sheddingsCounter").style.animation = "";
        void did("sheddingsCounter").offsetWidth;
        did("sheddingsCounter").style.animation = "gachaCurrencyUp 1s 1 ease-out";


        rpgPlayer.sheddings+= pulls*10;
        stats.totalSheddings+= pulls*10;
        did("sheddingsCounter").innerHTML = '<img src="img/src/icons/sheddings.jpg">'+beautify(rpgPlayer.sheddings)

        }












        document.querySelectorAll('.gachaPull').forEach(e => e.style.filter = "brightness(0.5)");

        did("currentBanner").style.animation = "";
        void did("currentBanner").offsetWidth;
        did("currentBanner").style.animation = "gachaBanner 1s 1 ease-out";
        did("currentBanner").style.filter = "brightness(0)"

        setTimeout(() => {
            did("currentBanner").style.backgroundImage = `url(${gachaBG.src})`;
            did("bannerInfo").style.display = "none"
            did("featuredGacha").style.display = "none"
            did("currentBanner").style.filter = "brightness(0)";
            did("gachaSummons").innerHTML = ""
        }, 700);

        setTimeout(() => {
            did("currentBanner").style.filter = "brightness(1)"
        }, 1000);

        setTimeout(() => {
            rollGacha(pulls,settings.selectedBanner)
        }, 2000);

        setTimeout(() => {
            canRoll = true;
            document.querySelectorAll('.gachaPull').forEach(e => e.style.filter = "brightness(1)");
        }, 5000);

        }

      }





stats.hatsGot = 0

      function rollGacha(amount){



        if (amount===1 && rpgPlayer.sheddings>=800) {
            rpgPlayer.sheddings-=800
            stats.hatsGot += 1
            stats.hatsGotLog += 1
        } else if (amount===10 && rpgPlayer.sheddings>=7200) {
            rpgPlayer.sheddings-=7200
            stats.hatsGot += 10
            stats.hatsGotLog += 10
        } else {
            playSound("audio/thud.mp3","all");
            return
        }

        did("sheddingsCounter").innerHTML = '<img src="img/src/icons/sheddings.jpg">'+beautify(rpgPlayer.sheddings)



            did("gachaOpenDarken").style.display = "flex"
            did("gachaOpenMenu").style.display = "flex"

            playSound("audio/pop4.mp3","all")
            playSound("audio/gacha1.mp3","all")


        let toRoll = amount

        did("gachaOpenMenu").innerHTML = `<span id="gachaBoxSpan" style="transition:3s">Click anywhere to open!</span>`

    
        for (let i = 0; i < toRoll; i++) { loop() * i;}

        function loop(){


            const div = document.createElement("div");

            div.innerHTML = `<img src="img/src/icons/gachaBox.png">`
            did("gachaOpenMenu").appendChild(div);
            div.className = "gachaBox"

            if (chance(1/20)) {
                div.glimmer = true
                setTimeout(() => {
                    const gachaBoxRect = div.getBoundingClientRect();
                    const gachaBoxRectX = gachaBoxRect.left - containerRect.left + gachaBoxRect.width / 2;
                    const gachaBoxRectY = gachaBoxRect.top - containerRect.top + gachaBoxRect.height / 2;
                    particleTrackers.push(new ParticleGachaBox(gachaBoxRectX,gachaBoxRectY));
                }, 100);
            }

        }


      }



 
did("gachaOpenDarken").onclick = openGachaBox

let gachaBoxClicks = 0

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let disableGacha = false
    
async function openGachaBox(){

    if (disableGacha) return

    if (gachaBoxClicks>999){


        playSound("audio/close.mp3","all")
        did("gachaOpenDarken").style.opacity = 0
        did("gachaOpenMenu").style.opacity = 0
        removeParticle("gachaBox")


        setTimeout(() => {
            did("gachaOpenDarken").style.display = "none"
            did("gachaOpenMenu").style.display = "none"
            did("gachaOpenDarken").style.opacity = 1
            did("gachaOpenMenu").style.opacity = 1
            gachaBoxClicks = 0
        }, 500);
        return






    }


    if (gachaBoxClicks<6) gachaBoxClicks++

    console.log(gachaBoxClicks)


    const elementos = document.querySelectorAll('.gachaBox');

    for (let i = 0; i < elementos.length; i++) {

    const gachaBoxRect = elementos[i].getBoundingClientRect();

     elementos[i].style.animation = "";
     void elementos[i].offsetWidth;
     elementos[i].style.animation = "boxHit 0.4s 1, boxShake 1s infinite"

     if (gachaBoxClicks===6){

        //gachaBoxClicks=-1000
        disableGacha = true

        await delay(50); 


        
         elementos[i].style.animation = "gelatineHigh 0.4s 1"


        //elementos[i].style.animation = "none"
        elementos[i].className = `openedBoxHat`
        //if (elementos[i].rarity==="Rare") 
        //if (elementos[i].rarity==="Epic") elementos[i].style.outlineColor = returnQualityColor(elementos[i].rarity)
        //elementos[i].item = elementos[i].id


        const gachaBoxRectX = gachaBoxRect.left - containerRect.left + gachaBoxRect.width / 2;
        const gachaBoxRectY = gachaBoxRect.top - containerRect.top + gachaBoxRect.height / 2;
        particleTrackers.push(new ParticleGachaBoxFlash(gachaBoxRectX,gachaBoxRectY));
        particleTrackers.push(new ParticleGachaBoxFlash2(gachaBoxRectX,gachaBoxRectY));

        playSound("audio/gacha2.mp3","all")


        const commonHats = hatList.filter(hatClass => new hatClass().quality === "Common");
        const rareHats = hatList.filter(hatClass => new hatClass().quality === "Rare");
    
        let finalHat = commonHats[rng(0, commonHats.length - 1)];
        if (chance(1/10)) {
            finalHat = rareHats[rng(0, rareHats.length - 1)];
        }

        const hatItem = new finalHat()


        hatItem.paint = rng(0,365);

        if (hatItem.quality === "Rare") {elementos[i].style.outlineColor = returnQualityColor("Rare")} else {elementos[i].style.outlineColor = "White"}



        if (elementos[i].glimmer) {

            hatItem.glimmer = rng(1,totalGlimmerCount)
            hatItem.quality = "Epic"
            elementos[i].style.outlineColor = returnQualityColor("Epic")


        } 



        //if (chance(1/1)) 

        elementos[i].item = hatItem
        elementos[i].innerHTML = `<img style="filter: hue-rotate(${hatItem.paint}deg)" src="img/src/hats/H${hatItem.img}.jpg">`

        finalHat.timesGot ++
        itemInventory.push(hatItem)

        //console.log("i:"+i)
        if (i===elementos.length-1) gachaBoxClicks = 7



     }



  }


  if (gachaBoxClicks<6) {voidAnimation("gachaBoxSpan", "boxHit 0.4s 1");}
  if (gachaBoxClicks<6) {playSound("audio/scrap.mp3","all")}


  if (gachaBoxClicks===7){
    playSound("audio/party.mp3","all")
    voidAnimation("gachaBoxSpan", "boxHit 0.4s 1")
    did("gachaBoxSpan").style.transition = `none`
    did("gachaBoxSpan").style.opacity = `0`
    did("gachaBoxSpan").innerHTML = `Click anywhere to close the menu`

    did("gachaOpenDarken").style.background = "rgba(255,255,255,0.5)"


    setTimeout(() => {
        did("gachaOpenDarken").style.background = "rgba(0,0,0,0.9)"

       

        setTimeout(() => {
             did("gachaBoxSpan").style.transition = `3s all`
            did("gachaBoxSpan").style.opacity = `1`
            gachaBoxClicks=1000
            disableGacha = false


        }, 2000);


    }, 300);

}








}

      
function updateHatInventory() {


    
    did("hatListing").innerHTML = "";

    const item = new HatNone()
    const itemDiv = document.createElement("div");
    let itemFavorite = ""
    let itemSelected = ""
    if (item.locked) itemFavorite = `<div class="itemFavorite">⭐</div>`

      itemDiv.style.outline = `0.2rem solid white`; 

      if (rpgPlayer.hat===undefined){
        itemSelected = `<div class="itemAlign">✔️</div>`
        itemDiv.style.outline = `0.2rem solid cyan`; 
      }
      
      itemDiv.innerHTML = `${itemFavorite} ${itemSelected} <img style="filter:hue-rotate(${item.paint}deg)" src="img/src/hats/H${item.img}.jpg">`;
      itemDiv.className = "inventoryItem";
      itemDiv.id = item.img
      itemDiv.item = item; 
      itemDiv.tag = "hat"; 
      did("hatListing").appendChild(itemDiv);


    itemInventory.forEach((item, index) => {


        if (item.sort!=="Hat") return
  
        item.index = index; 

  
      const itemDiv = document.createElement("div");
      
      
      let itemFavorite = ""
      let itemGlimmer = ""
      let itemSelected = ""
      if (item.locked) itemFavorite = `<div class="itemFavorite">⭐</div>`

      if (item.glimmer!=undefined){
        item.quality = "Epic"
        itemGlimmer = `<div class="itemLock">🎇</div>`
      }

      itemDiv.style.outline = `0.2rem solid ${returnQualityColor(item.quality)}`; 


      if (rpgPlayer.hat===item){
        itemSelected = `<div class="itemAlign">✔️</div>`
        itemDiv.style.outline = `0.2rem solid cyan`; 
      }
      
      itemDiv.innerHTML = `${itemFavorite} ${itemGlimmer} ${itemSelected} <img style="filter:hue-rotate(${item.paint}deg)" src="img/src/hats/H${item.img}.jpg">`;
      itemDiv.className = "inventoryItem";
      itemDiv.id = item.img
      itemDiv.item = item; 
      itemDiv.tag = "hat"; 
      //item.div = itemDiv
      //item.index = index

    
  

      did("hatListing").appendChild(itemDiv);


    })


    }

    setTimeout(() => {
        updateHatInventory()

    }, 1000);




rpgPlayer.hat = undefined



function contextEquipHat(){ //called w context menu

    if (contextSelectedItem.item.img === 0) {
        rpgPlayer.hat = undefined
    } else rpgPlayer.hat = contextSelectedItem.item

    playSound("audio/use.mp3")

    equipHat()
    voidAnimation("playerAnimation", "flash 0.3s 1")
    itemContextMenuBegone()
    updateHatInventory()

}



function sellSelectedHat(){ //called w context menu

 
    playSound("audio/use.mp3")
    playSound("audio/coins.mp3")

    if (rpgPlayer.hat.paint === contextSelectedItem.item.paint && rpgPlayer.hat.img === contextSelectedItem.item.img) rpgPlayer.hat = undefined
    contextSelectedItem.item.locked = false


    if (contextSelectedItem.item.quality==="Rare"){
        rpgPlayer.sheddings += 400
        createPopup('💎 Cosmetic sold for 400 Sheddings')
    }
    
    else if (contextSelectedItem.item.quality==="Epic"){
        rpgPlayer.sheddings += 700
        createPopup('💎 Cosmetic sold for 700 Sheddings')
    }

    else{
        rpgPlayer.sheddings += 150
        createPopup('💎 Cosmetic sold for 150 Sheddings')
    }

    itemInventory.splice(contextSelectedItem.item.index, 1);



    const itemDiv = contextSelectedItem
    selectedItemRect = itemDiv.getBoundingClientRect();
    particleTrackers.push(new ParticleSellPulse());



    equipHat()
    itemContextMenuBegone()
    updateHatInventory()

}

function contextFavoriteHat(){ //called w context menu

    playSound("audio/pop2.mp3")


    if (contextSelectedItem.item.locked === true){
        contextSelectedItem.item.locked = false
        itemContextMenuBegone()
        updateHatInventory()
        return

    }  



    contextSelectedItem.item.locked = true
    itemContextMenuBegone()
    updateHatInventory()


}

function equipHat(){

    removeParticle("glimmer")
    if (did("glimmerRune"))did("glimmerRune").remove()


    if (rpgPlayer.hat != undefined && rpgPlayer.hat != "random") {

        did("playerHat").src = `img/src/hats/${rpgPlayer.hat.img}.png`
        did("playerHat").style.filter = `hue-rotate(${rpgPlayer.hat.paint}deg)`
        if (rpgPlayer.hat.glimmer !== undefined) glimmerEffects(rpgPlayer.hat.glimmer)

    }

    if (rpgPlayer.hat === "random") {


        const randomHat = itemInventory.filter(i => i.locked === true, i.sort === "Hat");

        if (randomHat.length === 0) return
    
        let finalHat = randomHat[rng(0, randomHat.length - 1)];



        did("playerHat").src = `img/src/hats/${finalHat.img}.png`
        did("playerHat").style.filter = `hue-rotate(${finalHat.paint}deg)`
        if (finalHat.glimmer !== undefined) glimmerEffects(finalHat.glimmer)

    }

    if (rpgPlayer.hat === undefined){
        did("playerHat").src = "img/src/projectiles/none.png"

    }

}





const totalGlimmerCount = 22

function glimmerEffects(id){



    if (id===1) particleTrackers.push(new ParticleGlimmerBrimstone1A())
    if (id===2) particleTrackers.push(new ParticleGlimmerBrimstone2A())
    if (id===3) particleTrackers.push(new ParticleGlimmerBrimstone3A())
    if (id===4) particleTrackers.push(new ParticleGlimmerAura(undefined,undefined,{trailParticle:ParticleGlimmerAuraParticles1, particleDensity: 0.3}))
    if (id===5) particleTrackers.push(new ParticleGlimmerAura(undefined,undefined,{trailParticle:ParticleGlimmerAuraParticles2, particleDensity: 0.3}))
    if (id===6) particleTrackers.push(new ParticleGlimmerAura(undefined,undefined,{trailParticle:ParticleGlimmerAuraParticles3, particleDensity: 0.3}))
    if (id===7) particleTrackers.push(new ParticleGlimmerAura(undefined,undefined,{trailParticle:ParticleGlimmerGhostAuraParticles1, particleDensity: 0.05}))
    if (id===8) particleTrackers.push(new ParticleGlimmerAura(undefined,undefined,{trailParticle:ParticleGlimmerGhostAuraParticles2, particleDensity: 0.05}))
    if (id===9) particleTrackers.push(new ParticleGlimmerAura(undefined,undefined,{trailParticle:ParticleGlimmerGhostAuraParticles3, particleDensity: 0.05}))
    if (id===10) particleTrackers.push(new ParticleHolyGlimmerAura(undefined,undefined,{trailParticle:ParticleHolyGlimmerAuraHalo, particleDensity: 0.05, particleConfig: {imageHue : 0}}))
    if (id===11) particleTrackers.push(new ParticleHolyGlimmerAura(undefined,undefined,{trailParticle:ParticleHolyGlimmerAuraHalo, particleDensity: 0.05, particleConfig: {imageHue : 100}}))
    if (id===12) particleTrackers.push(new ParticleHolyGlimmerAura(undefined,undefined,{trailParticle:ParticleHolyGlimmerAuraHalo, particleDensity: 0.05, particleConfig: {imageHue : 200}}))
    if (id===13){
        particleTrackers.push(new ParticleGlimmerAura(undefined,undefined,{trailParticle:ParticleGlimmerMagicCircle, particleDensity: 0.05, particleConfig: {simpleColor : "#B5FF9A"}}))
        animatedSplash("player","magicCircle","magicCircle",50)} 
    if (id===14){
        particleTrackers.push(new ParticleGlimmerAura(undefined,undefined,{trailParticle:ParticleGlimmerMagicCircle, particleDensity: 0.05, particleConfig: {simpleColor : "#C2FFF8"}}))
        animatedSplash("player","magicCircle","magicCircle",120)}     
    if (id===15){
        particleTrackers.push(new ParticleGlimmerAura(undefined,undefined,{trailParticle:ParticleGlimmerMagicCircle, particleDensity: 0.05, particleConfig: {simpleColor : "#FFCC9A"}}))
        animatedSplash("player","magicCircle","magicCircle",250)} 
    if (id===16) particleTrackers.push(new ParticleGlimmerHeart1A())
    if (id===17) particleTrackers.push(new ParticleGlimmerHeart2A())
    if (id===18) particleTrackers.push(new ParticleGlimmerHeart3A())
    if (id===19) particleTrackers.push(new ParticleGlimmerHeart4A())
    if (id===20) particleTrackers.push(new ParticleGlimmerVortex(undefined,undefined,{trailParticle:ParticleGlimmerVortexHalo1, particleDensity: 0.05}))
    if (id===21) particleTrackers.push(new ParticleGlimmerVortex(undefined,undefined,{trailParticle:ParticleGlimmerVortexHalo2, particleDensity: 0.05}))
    if (id===22) particleTrackers.push(new ParticleGlimmerVortex(undefined,undefined,{trailParticle:ParticleGlimmerVortexHalo3, particleDensity: 0.05}))

}

function glimmerNames(id){
    if (id===1) return `Mark of the Sinner`
    if (id===2) return `Mark of the Wicked`
    if (id===3) return `Mark of the Tainted`
    if (id===4) return `Fel Inferno`
    if (id===5) return `Pale Inferno`
    if (id===6) return `Soul Inferno`
    if (id===7) return `Gamma Force`
    if (id===8) return `Sinister Force`
    if (id===9) return `Auric Force`
    if (id===10) return `Radiant Body`
    if (id===11) return `Radiant Mind`
    if (id===12) return `Radiant Soul`
    if (id===13) return `Runic Ritual`
    if (id===14) return `Hexxed Ritual`
    if (id===15) return `Witched Ritual`
    if (id===16) return `Circling Heart`
    if (id===17) return `Joyful Heart`
    if (id===18) return `Monochrome Heart`
    if (id===19) return `Hopeful Heart`
    if (id===20) return `Dark Matter`
    if (id===21) return `Azurite Galaxy`
    if (id===22) return `Nebula Vortex`
}


function randomHat(){


    


    const commonHats = hatList.filter(hatClass => new hatClass().quality === "Common");
    const rareHats = hatList.filter(hatClass => new hatClass().quality === "Rare");

    let finalHat = commonHats[rng(0, commonHats.length - 1)];
    if (chance(1/3)) finalHat = rareHats[rng(0, rareHats.length - 1)];

    spawnItem(finalHat)

}



function hatMenu(state){


    

    playSound("audio/button2.mp3")
    playSound("audio/book.mp3")


if (state==="open"){

    did("hatMenu").style.display = "flex"
    did("hatsDarken").style.display = "flex"

    voidAnimation("hatsDarken", "downSlide 0.8s 1")
    voidAnimation("hatMenu", "downSlide 0.5s 1")
}

if (state==="close"){

    voidAnimation("hatsDarken", "downSlide 0.5s 1 reverse")
    voidAnimation("hatMenu", "downSlide 0.5s 1 reverse")
    
    setTimeout(() => {
        did("hatMenu").style.display = "none"
        did("hatsDarken").style.display = "none"
    }, 450);
    
}

}







document.addEventListener('DOMContentLoaded', initializationGacha);

function initializationGacha() {
    //equipHat()


}






      


    
  