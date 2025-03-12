

rpgPlayer.relicInventory = []

stats.rogue = {}

stats.rogue.stageEnemy = 1

function rogueStageHandler(){

//if (stats.rogue.stageName === "Sparkly")

if (stats.rogue.stage === 0) dealRogueAreaCards()
if (stats.rogue.stage === 1) dealRogueEquipCards()
if (stats.rogue.stage === 2) dealRogueRelicCards()
if (stats.rogue.stage === 3) spawnRogueEnemy()



}

function spawnRogueEnemy(){
  did('rogueCardSelect').innerHTML = "";

  resetEncounter()

          did("enemyPanel").style.display="flex"
          for (let i in enemies) {
          if (did(i + "enemy")) {
          did(i + "enemy").remove();
          currentHP = 0;
          }}

          playSound("audio/arena.mp3");
          repositionQuickAccessMenu()


          
          if (stats.rogue.stageEnemy === 5) spawnEnemy("E52");
          else spawnEnemy("R1");
}



function dealRogueRelicCards() {
  did('rogueCardSelect').innerHTML = "";
  


let relicKeys = Object.keys(relic).filter(i => relic[i].tag !== "Equip" || relic[i].tag !== "Area");

const uncommonRelics = relicKeys.filter(key => relic[key].quality === "Uncommon");
const rareRelics = relicKeys.filter(key => relic[key].quality === "Rare");
const epicRelics = relicKeys.filter(key => relic[key].quality === "Epic");

let selectedRelics = [];


if (chance(0.70) && rareRelics.length > 0 && selectedRelics.length < 3) {
    let relic = rareRelics[rng(0, rareRelics.length - 1)];
    if (!selectedRelics.includes(relic)) selectedRelics.push(relic);
}

if (chance(1/7) && epicRelics.length > 0 && selectedRelics.length < 3) {
    let relic = epicRelics[rng(0, epicRelics.length - 1)];
    if (!selectedRelics.includes(relic)) selectedRelics.push(relic);
}

// Si el número de reliquias es menor que 3, rellenar con "Uncommon" asegurando que no se repitan
while (selectedRelics.length < 3) {
    let relic = uncommonRelics[rng(0, uncommonRelics.length - 1)];
    if (!selectedRelics.includes(relic)) selectedRelics.push(relic);
}


  
  selectedRelics = selectedRelics.sort(() => 0.5 - Math.random()).slice(0, Math.min(5,3+statHidden.extraRelicChoice));

  selectedRelics.forEach(i => {
      if (!did(i + "relic")) {
          const div = document.createElement("div");
          div.className = "rogueCard";
          div.style.borderColor = returnQualityColor(relic[i].quality);
          div.innerHTML = `
              <img src="img/src/relics/${relic[i].img}.png">
              <strong style="color:${returnQualityColor(relic[i].quality)}">${relic[i].name}</strong>
              <span>${relic[i].description()}</span>
          `;

          
          did('rogueCardSelect').appendChild(div);

          setTimeout(() => { div.style.pointerEvents = "initial" }, 600);


          let data = undefined;


          if (chance(1/20)) {

            div.innerHTML = `
              <img src="img/src/relics/${relic[i].img}.png" style="animation:rainbowFilter 5s infinite linear">
              <strong style="animation:colorRainbow 5s infinite linear">${relic[i].name}</strong>
              <span>${relic[i].description()}</span>
              <span style="height:1.5rem; background:teal; color:white;font-weight:500; animation:backgroundRainbow 5s infinite linear; flex-shrink:0">Effects Doubled!</span>
          `;

          data = "rainbow"

          } 

          
          div.addEventListener("click", function() { 


            div.style.pointerEvents = "none"
            const divs = document.querySelectorAll('.rogueCard')
            divs.forEach(div => {
              div.style.opacity = "0"
              div.style.pointerEvents = "none"
            });


            setTimeout(() => {

            rpgPlayer.relicInventory.push({ ...relic[i], itemData: data });
            updateRogueRelics();
            statsUpdate()
            updateStatsUI()
            stats.rogue.stage+=1
            rogueStageHandler()
            }, 400);

          });
      }
  });
}

function dealRogueEquipCards() {
  did('rogueCardSelect').innerHTML = "";
  
  let relicKeys = Object.keys(relic).filter(i => relic[i].tag == "Equip"); // Filtra las reliquias con tag "equip"
  
  let selectedRelics = relicKeys.sort(() => 0.5 - Math.random()).slice(0, Math.min(5,3+statHidden.extraGearChoice) ); // Selecciona 3 aleatorias
  
  selectedRelics.forEach(i => {
      if (!did(i + "relic")) {
          const div = document.createElement("div");
          div.className = "rogueCard";
          div.style.borderColor = returnQualityColor(relic[i].quality);
          div.innerHTML = `
              ${relic[i].svg}
              <strong style="color:${returnQualityColor(relic[i].quality)}">${relic[i].name}</strong>
              <span>${relic[i].description()}</span>
          `;
          
          did('rogueCardSelect').appendChild(div);

          setTimeout(() => { div.style.pointerEvents = "initial" }, 600);

          
          div.addEventListener("click", function() { 

            div.style.pointerEvents = "none"
            const divs = document.querySelectorAll('.rogueCard')
            divs.forEach(div => {
              div.style.opacity = "0"
              div.style.pointerEvents = "none"
            });

            setTimeout(() => {
              relic[i].effect()
              stats.rogue.stage+=1
              rogueStageHandler()
            }, 400);

          });
      }
  });
}



function dealRogueAreaCards() {
  did('rogueCardSelect').innerHTML = "";


  let relicKeys = Object.keys(relic).filter(i => relic[i].tag == "Area" && relic[i].act === stats.rogue.act); 



  relicKeys.forEach(i => {
      if (!did(i + "relic")) {


        let zoneAlign = "Nature"
        let zoneColor = "#62B26A"
        if (chance(1/3)) {zoneAlign = "Elemental"; zoneColor = "#DD794E"}
        else if ((chance(1/3))) {zoneAlign = "Occult"; zoneColor = "#9758DF"}


        


          const div = document.createElement("div");
          div.className = "rogueCard";
          div.innerHTML = `
              <strong style="color:white; font-size:1.2rem; font-weight:400; height:auto; flex-shrink:0" >${relic[i].name}</strong>
              <span style="background:transparent; color:gray; height:auto; flex-shrink:0; margin-top: -0.5rem">${relic[i].description()}</span>
              <span style="display:inline; height:auto; flex-shrink:0; background:${zoneColor}; font-weight:500;">${zoneAlign} Aligned</span>
              <span style="display:inline; height:auto">Area difficulty ${  returnDifficulty(relic[i].difficulty,"rogue")  }</span>
              <span style="display:inline; height:auto; flex-shrink:0;">No Modifiers</span>

          `;
          
          did('rogueCardSelect').appendChild(div);

          setTimeout(() => { div.style.pointerEvents = "initial" }, 600);

          
          div.addEventListener("click", function() { 

            div.style.pointerEvents = "none"
            const divs = document.querySelectorAll('.rogueCard')
            divs.forEach(div => {
              div.style.opacity = "0"
              div.style.pointerEvents = "none"
            });

            setTimeout(() => {
              relic[i].effect()
              stats.rogue.stage+=1
              stats.rogue.areaAlign = zoneAlign
              rogueStageHandler()
            }, 400);

          });
      }
  });
}




function updateRogueRelics(){

    did('rogueRelicList').innerHTML = ""

    rpgPlayer.relicInventory.forEach((item, index) => {

        const img = document.createElement("img");

        img.src = `img/src/relics/${item.img}.png`

        did('rogueRelicList').appendChild(img);

        if (item.itemData==="rainbow") img.style.animation = "rainbowFilter 5s infinite linear"

    })


}



function purgeRogueItems(){



  for (let i = itemInventory.length - 1; i >= 0; i--) {
    let item = itemInventory[i];
      if (item.rogue) itemInventory.splice(i, 1);
    }


  equipGear()
  updateInventory()
  changeLoadout()

}




function rogueEndBattle(){


if (stats.rogue.stageEnemy % 3 === 0) for (let i = 0; i < 0+statHidden.ancientPrinter; i++) { relicPrinter();}

function relicPrinter(){
  rpgPlayer.relicInventory.splice((i = Math.floor(Math.random() * rpgPlayer.relicInventory.length)), 0, rpgPlayer.relicInventory[i]);  
  updateRogueRelics()
}


console.log(stats.rogue.stageEnemy)
if (stats.rogue.stageEnemy % 6 === 0) {
  stats.rogue.act++
  stats.rogue.stage = 0
  rogueStageHandler()
}




}







document.addEventListener('DOMContentLoaded', rogueInitialization);

function rogueInitialization(){
  rpgClass.Dreamer.level = 5
  stats.rogue.areaDifficulty = 0
  stats.rogue.act = 1
  updateClass()
  //purgeRogueItems()
  //spawnItem(WoodenSword)
  stats.rogue.stage = 0
  stats.rogue.stageEnemy = 1
  //rogueStageHandler()
  rpgPlayer.relicInventory = []
}


