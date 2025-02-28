

stats.leftUi = "contracted";



/*

let canOpenLeftUi = true

did("mainUILeftDetection").addEventListener('mouseenter', function() {

    if (canOpenLeftUi){


    did("mainUILeft").style.animation = "";
    void did("mainUILeft").offsetWidth;
    did("mainUILeft").style.animation = "UILeftExpand 0.3s ease-out"
    did("mainUILeft").style.animationFillMode = "forwards"
    did("mainUILeftDetection").style.display = "none"
    canOpenLeftUi = false;
    setTimeout(() => {  canOpenLeftUi = true; inventoryBagRect = document.getElementById('mainUILeftSquare').getBoundingClientRect(); }, 310);
        
    

}
  });

  
  did("mainUILeft").addEventListener('mouseleave', function() {

    if (stats.leftUi != "expanded" && canOpenLeftUi && did("itemContextMenuScreensaver").style.display != "flex"){

        did("mainUILeft").style.animation = "";
        void did("mainUILeft").offsetWidth;
        did("mainUILeft").style.animation = "UILeftExpand 0.3s ease-out reverse"
        did("mainUILeft").style.animationFillMode = "forwards"
        
        setTimeout(() => {
            did("mainUILeftDetection").style.display = "inline";
            inventoryBagRect = document.getElementById('mainUILeftSquare').getBoundingClientRect();
        }, 600);
    
    }

    

});

*/


let currentInventoryTab = "inventoryMainPage"

did("inventoryMainPageSquare").addEventListener('click', function() {


    playSound("audio/throw.mp3")


    did("inventoryMainPageSquare").style.animation = "";
    void did("inventoryMainPageSquare").offsetWidth;
    did("inventoryMainPageSquare").style.animation = "faintStrike 0.3s"


  if (    currentInventoryTab === "inventoryMainPage"  ) {

    if (stats.leftUi === "expanded"){
      stats.leftUi = "contracted";
      mainUIUpdate()
      return
  }
 

  }

   
  if (stats.leftUi === "contracted"){
    stats.leftUi = "expanded";
    mainUIUpdate()

}



    currentInventoryTab = "inventoryMainPage"
    mainUIUpdate()

    
});


did("inventoryCraftingPageSquare").addEventListener('click', function() {

  playSound("audio/throw.mp3")


  did("inventoryCraftingPageSquare").style.animation = "";
  void did("inventoryCraftingPageSquare").offsetWidth;
  did("inventoryCraftingPageSquare").style.animation = "faintStrike 0.3s"



if (  currentInventoryTab === "inventoryCraftingPage") {

  if (stats.leftUi === "expanded"){
    stats.leftUi = "contracted";
    mainUIUpdate()
    return
}






}


if (stats.leftUi === "contracted"){
  stats.leftUi = "expanded";
  mainUIUpdate()

}


  currentInventoryTab = "inventoryCraftingPage"
  mainUIUpdate()




});









  function mainUIUpdate(){

    if (currentInventoryTab === "inventoryCraftingPage") did("mainUILeft").style.minWidth = "45rem"
    if (currentInventoryTab === "inventoryMainPage") did("mainUILeft").style.minWidth = "30rem"


    did("inventoryCraftingPage").style.display = "none"
    did("inventoryMainPage").style.display = "none"
    did(currentInventoryTab).style.display = "flex"

    if (stats.leftUi === "expanded") {

        did("inventoryMainPageSquare").style.border = "dashed rgb(83, 45, 27) 3px"
        did("inventoryMainPageSquare").style.backgroundColor = ""
        did("inventoryCraftingPageSquare").style.border = "dashed rgb(83, 45, 27) 3px"
        did("inventoryCraftingPageSquare").style.backgroundColor = ""

        did(currentInventoryTab+"Square").style.border = "solid rgb(83, 45, 27) 3px"
        did(currentInventoryTab+"Square").style.backgroundColor = "rgb(124, 72, 47)"

        if (did("inventoryListing")) did("inventoryListing").style.display = "flex"


        did("mainUILeft").style.animation = "";
    void did("mainUILeft").offsetWidth;
    did("mainUILeft").style.animation = "UILeftExpand 0.3s ease-out"
    did("mainUILeft").style.animationFillMode = "forwards"

    }
    else if (stats.leftUi === "contracted") {


      did("inventoryMainPageSquare").style.border = "dashed rgb(83, 45, 27) 3px"
      did("inventoryMainPageSquare").style.backgroundColor = ""
      did("inventoryCraftingPageSquare").style.border = "dashed rgb(83, 45, 27) 3px"
      did("inventoryCraftingPageSquare").style.backgroundColor = ""

        did(currentInventoryTab+"Square").style.border = "dashed rgb(83, 45, 27) 3px"
        did(currentInventoryTab+"Square").style.backgroundColor = ""

        if (did("inventoryListing")) {
          setTimeout(() => {
            did("inventoryListing").style.display = "none"
          }, 300);
        }


        did("mainUILeft").style.animation = "";
        void did("mainUILeft").offsetWidth;
        did("mainUILeft").style.animation = "UILeftExpand 0.3s ease-out reverse"
        did("mainUILeft").style.animationFillMode = "forwards"
        
    }

    endSelectionMode()

    setTimeout(() => {
      inventoryBagRect = document.getElementById('inventoryMainPageSquare').getBoundingClientRect();
    }, 400);

  }

  setTimeout(() => {
    inventoryBagRect = document.getElementById('inventoryMainPageSquare').getBoundingClientRect();
  }, 3000);










const weaponPrefix1 = [`Light`,`Powerful`,`Echoing`,`Masterful`, `Technical`,`Recursive`]
const weaponPrefix2 = [`Runic`, `Kingslaying`, `Double`, `Accelerating`, `Chancemaking`, `Titanic`]
const weaponPrefix3 = [`THE`, `Ultimate`, `Final`, `Polychrome`, `Godslaying`]
const weaponPrefix4 = [`Voidsent`,`Corrupted`, `Malevolent`, `Warped`,]
const weaponPrefix5 = [`01100100`,`74 75 74 6C 65`,`⩖⺜⨥⊂⑆⨓▟⭰⋹`,`ERROR`,`TurTLE`]


// hp up - vital
// thief up - sneaky

// every x seconds generate +x shield - 

// elemental SOS over 80% hp - /infused/blacken
// auto health - aiding

// stronger effect - Heirloom
// more chance - mystic
// a lot stronger, less chance - voodoo
// a lot more common, less strong - 





// thorns - spiked
// offlinebonus - sleepy
// lumapower - heartfelt
// sp up - enchanted



// exp up - widsithing
// healing up - medicinal


// luck up - lucky
// lifesteal - vampiric
// auto revive - lazaro


//elemental dots en weapons


const armorPrefix1 = [`Resonant`,`Feral`,`Veiled`,`Flameproof`,`Brambled`,`Warded`]
const armorPrefix2 = [`Bound`,`Infused`,`Somber`,`Aligned`,`Shamanistic`,`Sneaky`]
const armorPrefix3 = [`Arch`,`Primal`,`Lunar`,`Primordial`,`Primeval`,`Radiant`]

const trinketPrefix1 = [`Heirloom`,`Mystic`,`Voodoo`,`Hexed`]

//used for rings and trinkets
const miscPrefix1 = [`Jagged`,`Drowsy`,`Heartfelt`]
const miscPrefix2 = [`Widsithing`,`Medical`,`Spiked`,`Sleepy`,`Hopeful`]
const miscPrefix3 = [`Lucky`,`Critical`,`Lazaro`,`Radioactive`,`Clicky`,`Dreamy`]


function returnArrayPick(array) {
  const indiceAleatorio = Math.floor(Math.random() * array.length);
  return array[indiceAleatorio];
}

function chance(number) { //thanks otpoke!
  return Math.random() <= number;
}




function spawnItem(id,amount,source){

  let toAdd = 1
  if (amount != undefined) toAdd = amount
  const item = new id()


  let notification = true
  if (source?.startsWith("craft") && settings.disableCraftPopup) notification = false
  if (source==="noPopup") notification = false
  if (source==="offline") notification = false


  if (item.img===103) item.init() //hack for recipes. i hate this
  if (!itemInventoryMemory.some(existingItem => existingItem.img === item.img) || ( item.img===103 && !itemInventoryMemory.some(existingItem => existingItem.savedInfo === item.savedInfo) ) ) {
    itemInventoryMemory.push(item);
    //console.log(item.name+" Added to the memory")
  }


  if (chance(1/77777)) spawnItem(GoldenClover)

  if (item.isStackable) {
    
    if (item.constructor.count === 0) itemInventory.push(item)
    

    if (amount === undefined) item.constructor.count++
    else item.constructor.count += amount

    item.constructor.timesGot += toAdd

    if (item.init) item.init(source)

    if (notification) createPopup(`<span style="color:${returnQualityColor(item.quality)}; display:flex; justify-content:center; align-items:center;background:transparent;"><img src="img/src/items/I${item.img}.jpg" style="height:1.3rem; width:1.3rem;margin-right:0.6rem;border-radius:0.2rem"> ${item.name} x${beautify(toAdd)} got!</span>`)


  } else {


    for (let i = 0; i < toAdd; i++) { loop() * i;}

    function loop(){

      const iteminstance = new id()
      if (item.init && source==="container") iteminstance.init(source)
      else if (item.init) iteminstance.init(source)


        let prefixName = ""
        if (iteminstance.prefix1!==undefined || iteminstance.prefix2!==undefined || iteminstance.prefix3!==undefined || iteminstance.prefix4!==undefined || iteminstance.prefix5!==undefined) prefixName = returnPrefixName(iteminstance)+"&nbsp;"

        
      
      // autoscrapping
      if (iteminstance.prefix5 === undefined && itemInventory.some(existingItem => areItemsEqual(existingItem, iteminstance))) {

        if (source==="offline" && !iteminstance.noScrap) {
          spawnItem(returnScrapMaterial(iteminstance),1,"offline")
          item.constructor.timesGot ++
          return;
         } 

        if (notification && !settings.disableScrapPopup) createPopup(`<span style="color:${returnQualityColor(iteminstance.quality)}; display:flex; justify-content:center; align-items:center;background:transparent;"><img src="img/src/items/I${iteminstance.img}.jpg" style="height:1.3rem; width:1.3rem;margin-right:0.6rem;border-radius:0.2rem">${prefixName} ${iteminstance.name} <span style="color:lawngreen;background:transparent; margin-left:0.3rem">scrapped! </span></span>`)
         if (!iteminstance.noScrap) spawnItem(returnScrapMaterial(iteminstance),1,"noPopup")
         item.constructor.timesGot ++
          return;
      }


      // unique filtering
      //if (item.unique && itemInventory.some(existingItem => areItemsExact(existingItem, iteminstance))) {console.log("u"); return } //check for unique tag



      if (notification) createPopup(`<span style="color:${returnQualityColor(iteminstance.quality)}; display:flex; justify-content:center; align-items:center;background:transparent;"><img src="img/src/items/I${iteminstance.img}.jpg" style="height:1.3rem; width:1.3rem;margin-right:0.6rem;border-radius:0.2rem"> ${prefixName} ${iteminstance.name} got!</span>`)
      
      itemInventory.push(iteminstance)
      item.constructor.timesGot ++

      if (source!=="offline" && item.sort!=currentSort && item.sort!="Hat"){ // got inventory notification
        setTimeout(() => {
          if (item.sort!=currentSort){
          did(`inventory${item.sort}Indicator`).style.display = "flex"
          did(`inventory${item.sort}Indicator`).innerHTML = parseInt(did(`inventory${item.sort}Indicator`).innerHTML) + toAdd
          voidAnimation(`inventory${item.sort}Indicator`, 'areaClick 0.5s 1')   
          }
        }, 1000);
       }

    }




    
  } 









  //if (item.init) item.init()



   if (source!=="offline" && item.sort!=currentSort && item.sort!="Hat" && item.isStackable){ // got inventory notification
    setTimeout(() => {
      if (item.sort!=currentSort){
      did(`inventory${item.sort}Indicator`).style.display = "flex"
      did(`inventory${item.sort}Indicator`).innerHTML = beautify(parseInt(did(`inventory${item.sort}Indicator`).innerHTML) + (toAdd) )
      voidAnimation(`inventory${item.sort}Indicator`, 'areaClick 0.5s 1')   
      }
    }, 1000);
   }






  if (item.sort==="Hat") updateHatInventory()
  if (source!=="offline") updateInventory()
}




function purgeItems(){ //failsafe handler

  itemInventory.forEach((item, index) => {

    if (item.isStackable && item.constructor.count <= 0)
      {
        item.constructor.count = 0;
        itemInventory.splice(index, 1);
      }

  })

}



function areItemsEqual(item1, item2) {
  return item1.canReforge !== undefined &&
         item1.slot !== "Offhand" &&
         item1.img === item2.img &&
         item1.prefix1 === item2.prefix1 &&
         item1.prefix2 === item2.prefix2 &&
         item1.prefix3 === item2.prefix3 &&
         item1.prefix5 === item2.prefix5 &&
         item1.align === item2.align;
}

function areItemsExact (item1, item2) { //check for unique tag 
  return  item1.name === item2.name;
}

function resetInventory(){
  itemInventory.forEach((item, index) => { item.constructor.count=0; item.constructor.timesGot=0; })
  itemInventory = []
  updateInventory()

}

function changeSort(sort){


  playSound("audio/page.mp3")




voidAnimation(`inventory${sort}Target`, "areaClick 0.5s 1")


const divs = document.querySelectorAll('div.inventoryTab');
divs.forEach(div => {
  div.className = 'inventoryTab';
});


did(`inventory${sort}Target`).className = "inventoryTab inventoryTabActive"




  endSelectionMode()
  currentSort=sort;
  updateInventory();
  setTimeout(() => {
    sortInventory()
    updateInventory();
  }, 1);
  did(`inventory${sort}Indicator`).style.display = "none"
  did(`inventory${sort}Indicator`).innerHTML = 0

  inventoryCulling()

}


function updateInventory(mode) {


  itemInventory.forEach((item, index) => {
    if (did(item.img+"Count") && item.isStackable && item.constructor.count > 0){
      did(item.img+"Count").innerHTML = beautify(item.constructor.count)
    }
  })

  if (did("itemContextMenu").style.display === "flex") return //my precious hack
  if (quickSelectMode===true) return 

  purgeItems()
  //sortInventory()
  did("inventoryListing").innerHTML = "";

  itemInventory.forEach((item, index) => {


    if (item.loadouts==undefined && item.sort!==currentSort) return // if it doesnt belong on that category
    if (item.sort!==currentSort && item.loadouts!==undefined && !item.loadouts.includes(rpgPlayer.currentLoadout)) return //prevents equipped items from disapearing

    //if (item.sort!==currentSort) return
    //if (item.loadouts!==undefined && item.loadouts.includes(rpgPlayer.currentLoadout)) return

    const itemDiv = document.createElement("div");
    
    if (item.invInit && item.isInvInit === undefined) {item.invInit(); item.isInvInit = true; }
    
 
    let itemCDScreen = ""
    if (item.constructor.cd){

      const percentage = (((item.constructor.cd-1) / 10) * 100);


      const resultado = item.constructor.cd < 60 ? item.constructor.cd : Math.floor(item.constructor.cd / 60) + "m";
      itemCDScreen = `<div class="itemCooldownTimerText">${resultado}</div> <div class="itemCooldownTimer" style="height:${percentage}"></div>`
    } 

    let itemCount = "";
    if (item.isStackable && item.constructor.count > 0) itemCount = `<div id="${item.img}Count" class="inventoryItemCount">${ beautify(item.constructor.count,"mini") }</div>`
    if (item.slot==="Offhand"){

      let percentageEXP = (item.uses / item.initialUses) * 100;
      itemCount = `<div id="${index}usebar" class="offhandUses" style="background: linear-gradient(90deg, lawngreen ${percentageEXP}%, rgba(55,42,60,1) ${percentageEXP}%)"></div>`  
      
    } 


    let itemLock = ""
    if (item.locked) itemLock = `<div class="itemLock">🔒</div>`

    let gemIndicator = ""
    if (item.gemSlot && (item.gemSlot.red!==null || item.gemSlot.yellow!==null || item.gemSlot.blue!==null)) gemIndicator = `<div style="left:60%; background:transparent !important" class="itemAlign">💠</div>`
    
    
    itemDiv.innerHTML = `${itemLock} ${gemIndicator} <div class="itemSelect"></div> ${itemCDScreen} ${itemCount} ${returnAlign()} ${returnPrefixAura(item.prefix)} <img src="img/src/items/I${item.img}.jpg">`;
    itemDiv.className = "inventoryItem";
    itemDiv.item = item; 
    itemDiv.item.index = index; 
    itemDiv.tag = "inventory"; 
    item.div = itemDiv
    item.index = index

    itemDiv.style.outline = `0.2rem solid ${returnQualityColor(item.quality)}`; 

    
    did("inventoryListing").appendChild(itemDiv);



    





    if (item.loadouts!==undefined && item.loadouts.includes(rpgPlayer.currentLoadout)) { //moves equiped items to the gear slots

      did(`rpg${item.slot}Slot`).innerHTML = ""
      did(`rpg${item.slot}Slot`).appendChild(itemDiv);

    }

    function returnAlign(){
      if (item.align === `Elemental`) return `<span class="itemAlign">🔥</span>`;
      if (item.align === `Nature`) return `<span class="itemAlign">🍃</span>`;
      if (item.align === `Occult`) return `<span class="itemAlign">🌙</span>`;
      return ""
    }

    function returnPrefixAura(){

      if (weaponPrefix5.includes(item.prefix5) ) return `<span class="prefixAuraT5">👾</span>`
      if (weaponPrefix4.includes(item.prefix4) ) return `<span class="prefixAuraT4">🌌</span>`
      if (weaponPrefix3.includes(item.prefix3) || armorPrefix3.includes(item.prefix3) || miscPrefix3.includes(item.prefix3)) return `<span class="prefixAuraT3">🌠</span>`
      if (weaponPrefix2.includes(item.prefix2) || armorPrefix2.includes(item.prefix2) || miscPrefix2.includes(item.prefix2)) return `<span class="prefixAuraT2">✨</span>`
      if (weaponPrefix1.includes(item.prefix1) || armorPrefix1.includes(item.prefix1) || trinketPrefix1.includes(item.prefix1) || miscPrefix1.includes(item.prefix1)) return `<span class="prefixAuraT1">⭐</span>`


      return ""
      //if (reforges4.includes(prefix)) return `<span class="prefixAuraT4">🌌</span>`
      //if (reforges5.includes(prefix)) return `<span class="prefixAuraT5">👾</span>`
    
    }


  });


  for (let i = 0; i < 50; i++) { loop() }

  function loop(){
  const emptySlot = document.createElement("div");
  emptySlot.className = "emptyInventoryItem";
  did("inventoryListing").appendChild(emptySlot);
  }


  updateQuickItemAcessMenu()


  fadeInventoryTabs()


}

function fadeInventoryTabs(){

  if (currentInventoryTab !== "inventoryMainPage" || stats.leftUi === "contracted"){ return}

  document.querySelectorAll('.inventoryTab').forEach(div => { div.style.opacity = '0.3'; });

  
  itemInventory.forEach((item, index) => {

    if (equippedItems.some(equippedItem => equippedItem === item)) return //skip equipped items

    if ( did(`inventory${item.sort}Target`) && did(`inventory${item.sort}Target`).style.opacity != 1) did(`inventory${item.sort}Target`).style.opacity = 1


  })

    


}





function equippedTriggers(){



}


function sortInventory() {
  itemInventory.sort((a, b) => {


    /*const quality1 = returnQualityNumber(a.quality) !== undefined ? returnQualityNumber(a.quality) : '';
    const quality2 = returnQualityNumber(b.quality) !== undefined ? returnQualityNumber(b.quality) : '';

    if (quality1 > quality2) {
      return -1; 
    }
    if (quality1 < quality2) {
      return 1; 
    }
    */

    //lock
    const lock1 = a.locked !== undefined ? a.locked : '';
    const lock2 = b.locked !== undefined ? b.locked : '';
    if (lock1 > lock2) {return -1;}
    if (lock1 < lock2) {return 1;}


    //quality
    const quality1 = returnQualityNumber(a.quality) !== undefined ? returnQualityNumber(a.quality) : '';
    const quality2 = returnQualityNumber(b.quality) !== undefined ? returnQualityNumber(b.quality) : '';
    if (quality1 > quality2) {return -1;}
    if (quality1 < quality2) {return 1;}

    //hp
    const hp1 = a.baseHp !== undefined ? a.baseHp : '';
    const hp2 = b.baseHp !== undefined ? b.baseHp : '';
    if (hp1 > hp2) {return -1;}
    if (hp1 < hp2) {return 1;}

    //atk
    const atk1 = a.baseDamage !== undefined ? a.baseDamage : '';
    const atk2 = b.baseDamage !== undefined ? b.baseDamage : '';
    if (atk1 > atk2) {return -1;}
    if (atk1 < atk2) {return 1;}


    //image
    const img1 = a.img !== undefined ? a.img : '';
    const img2 = b.img !== undefined ? b.img : '';
    if (img1 > img2) {return -1;}
    if (img1 < img2) {return 1;}


    //glimmer
    const glimmer1 = a.glimmer !== undefined ? a.glimmer : '';
    const glimmer2 = b.glimmer !== undefined ? b.glimmer : '';
    if (glimmer1 > glimmer2) {return -1;}
    if (glimmer1 < glimmer2) {return 1;}

    //prefix
    const prefix1 = a.prefixTier !== undefined ? a.prefixTier : '';
    const prefix2 = b.prefixTier !== undefined ? b.prefixTier : '';
    if (prefix1 > prefix2) {return -1;}
    if (prefix1 < prefix2) {return 1;}

    //align
    const align1 = returnAlignNumber(a.align) !== undefined ? returnAlignNumber(a.align) : '';
    const align2 = returnAlignNumber(b.align) !== undefined ? returnAlignNumber(b.align) : '';
    if (align1 > align2) {return -1;}
    if (align1 < align2) {return 1;}


    
    //const prefixA = a.prefixTier !== undefined ? a.prefixTier : -Infinity;
    //const prefixB = b.prefixTier !== undefined ? b.prefixTier : -Infinity;
    //return prefixB - prefixA; 
  });

}

function returnQualityNumber(quality){
  if (quality === "Poor") return 0
  if (quality === "Common") return 1
  if (quality === "Uncommon") return 2
  if (quality === "Rare") return 3
  if (quality === "Epic") return 4
  if (quality === "Mythic") return 5
  if (quality === "Legendary") return 6
  return undefined
}


function returnAlignNumber(quality){
  if (quality === "Elemental") return 1
  if (quality === "Nature") return 2
  if (quality === "Occult") return 3
  return undefined
}








let contextSelectedItem = did("inventoryTopButtonQuickSelect");



function quickSelectItem(itemDiv, mode){

  let item = itemDiv.item
  const itemSelect = itemDiv.querySelector('.itemSelect');


  if (itemDiv.item.loadouts && itemDiv.item.loadouts.includes(rpgPlayer.currentLoadout)) return


  if (itemSelect && itemSelect.style.display === 'flex' && mode!=="swipe"){

    playSound("audio/thud.mp3")

    itemSelect.style.display = 'none'; 
    item.selected = false
    return
  }

  if (itemSelect && itemSelect.style.display !== 'flex'){

    playSound("audio/thud.mp3")

    
    itemSelect.style.display = 'flex'; 
    item.selected = true
    return
    
  }



}




document.addEventListener('mousemove', function(event) {

  const itemDiv = event.target.closest('.inventoryItem'); 

  if (itemDiv && event.buttons === 1 && quickSelectMode===true) {
    quickSelectItem(itemDiv, "swipe")
  }

});

document.addEventListener('click', function(event) { //context menus




  const itemDiv = event.target.parentElement; 
  const itemDivNoParent = event.target 



  if (itemDiv && itemDiv.item && itemDiv.tag === "quickUse") {
   contextSelectedItem = itemDiv
   useSelectedItem(1,"quick")
  }

  if (itemDiv && itemDiv.item && itemDiv.tag==="hat") {  
    playSound("audio/pop1.mp3")

    const item = itemDiv.item;       
    contextSelectedItem = itemDiv


    did("itemContextMenuButtonHatEquip").style.display = "flex"
    if (itemDiv.item.img!==0) did("itemContextMenuButtonHatFavorite").style.display = "flex"
    if (itemDiv.item.img!==0) did("itemContextMenuButtonHatSell").style.display = "flex"

      

    did("itemContextMenu").style.display = "flex";
    did("itemContextMenuScreensaver").style.display = "flex";



    const movingDiv = did('itemContextMenu');
    const referenceDiv = itemDiv;
    const referenceRect = referenceDiv.getBoundingClientRect();
    const tooltipRect = movingDiv.getBoundingClientRect();
    const newLeft = referenceRect.left/(stats.zoomLevel/100) + (referenceRect.width / 2) - (tooltipRect.width / 2);
    const newTop = (referenceRect.top - tooltipRect.height)/ (stats.zoomLevel/100);
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + -10 + 'px';

    

  voidAnimation("itemContextMenu", "interactableTooltipIdleHigh 3s infinite, interactableTooltip 0.3s 1")
  itemDiv.style.animation = "";
  void itemDiv.offsetWidth;
  itemDiv.style.animation = "gelatine 0.4s 1";

  resetTooltip()



  }





  //if (itemDiv && itemDiv.item && itemDiv.item.loadouts.includes(rpgPlayer.currentLoadout)) { //equipped items context
    
    
    
    
    
  //}





  if (itemDiv && itemDiv.tag==="shop" && itemDiv.item) {  
    playSound("audio/pop1.mp3","all")

    const item = itemDiv.item;       
    contextSelectedItem = itemDiv
    //console.log(contextSelectedItem.item.constructor)
    //item.selected = true;


    did("itemContextMenuButtonBuyMenu").style.display = "flex"

      

    did("itemContextMenu").style.display = "flex";
    did("itemContextMenuScreensaver").style.display = "flex";



    const movingDiv = did('itemContextMenu');
    const referenceDiv = itemDiv;
    const referenceRect = referenceDiv.getBoundingClientRect();
    const tooltipRect = movingDiv.getBoundingClientRect();
    const newLeft = referenceRect.left/(stats.zoomLevel/100) + (referenceRect.width / 2) - (tooltipRect.width / 2);
    const newTop = (referenceRect.top - tooltipRect.height)/ (stats.zoomLevel/100);
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + -20 + 'px';

    

  voidAnimation("itemContextMenu", "interactableTooltipIdleHigh 3s infinite, interactableTooltip 0.3s 1")
  itemDiv.style.animation = "";
  void itemDiv.offsetWidth;
  itemDiv.style.animation = "gelatine 0.4s 1";



  }












  if (itemDiv && itemDiv.tag==="inventory" && itemDiv.item && quickSelectMode===true){ //quick select behaviour
    quickSelectItem(itemDiv)
  }

  if (itemDiv && itemDiv.tag==="inventory" && itemDiv.item && quickSelectMode === false) { //regular click behaviour

    resetTooltip()


    const item = itemDiv.item; 

    //if (item.loadouts!==undefined && item.loadouts.includes(rpgPlayer.currentLoadout)) return //context menu wont open on equipped items
      
      
      contextSelectedItem = itemDiv
      item.selected = true;
      playSound("audio/button8.mp3")



      if (itemDiv.item.loadouts && itemDiv.item.loadouts.includes(rpgPlayer.currentLoadout)) { //equipped item 

         did("itemContextMenuButtonUnequip").style.display = "flex"
         if (itemDiv.item.constructor.upgrade!==undefined) did("itemContextMenuButtonUpgrade").style.display = "flex"




      } 


    else if (item.slot!=undefined) { //if its equipable
      did("itemContextMenuButtonEquip").style.display = "flex"
      if (item.slot!=="Offhand" && item.noScrap !== true) did("itemContextMenuButtonScrap").style.display = "flex"
      if (itemDiv.item.constructor.upgrade!==undefined) did("itemContextMenuButtonUpgrade").style.display = "flex"
      if ( item.prefixTier && item.prefixTier<4 && returnStamper(item.prefixTier).constructor.count >= 1 ) did("itemContextMenuButtonReforge").style.display = "flex"
      did("itemContextMenuButtonSell").style.display = "flex"
    } else if (item.isStackable && item.constructor.count>1){
      did("itemContextMenuButtonSellMenu").style.display = "flex"
      did("itemContextMenuButtonSellAll").style.display = "flex"
    } else {
      did("itemContextMenuButtonSell").style.display = "flex"
    }

    if (typeof item.use === 'function' && item.canMultiuse) did("itemContextMenuButtonUseMenu").style.display = "flex"
    else if (typeof item.use === 'function') did("itemContextMenuButtonUse").style.display = "flex"

    if (item.mergeStack<=item.constructor.count) did("itemContextMenuButtonMerge").style.display = "flex"


    


    did("itemContextMenu").style.display = "flex";
    did("itemContextMenuScreensaver").style.display = "flex";



    const movingDiv = did('itemContextMenu');
    const referenceDiv = itemDiv;
    const referenceRect = referenceDiv.getBoundingClientRect();
    const tooltipRect = movingDiv.getBoundingClientRect();
    const newLeft = referenceRect.left/ (stats.zoomLevel/100) + (referenceRect.width / 2) - (tooltipRect.width / 2) ;
    const newTop = referenceRect.top/ (stats.zoomLevel/100) - tooltipRect.height/ (stats.zoomLevel/100);
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + -20 + 'px';

    

  voidAnimation("itemContextMenu", "interactableTooltipIdleHigh 3s infinite, interactableTooltip 0.3s 1")
  itemDiv.style.animation = "";
  void itemDiv.offsetWidth;
  itemDiv.style.animation = "gelatine 0.4s 1";



  const itemSelect = itemDiv.querySelector('.itemSelect');
    if (itemSelect) {
      itemSelect.style.display = 'flex'; 
    }

  


  }



})



function returnWeaponUpgradeDamage(item, level){
//return item.finalDamage()*item.constructor.upgrade
return Math.floor(item.finalDamage() * Math.pow(1.5, (level)))
}


function returnUpgradeMaterial(quality){
  if (quality==="Common") return new UpgradeMaterial1();
  if (quality==="Uncommon") return new UpgradeMaterial2();
  if (quality==="Rare") return new UpgradeMaterial3();
  if (quality==="Epic") return new UpgradeMaterial4();
  if (quality==="Mythic") return new UpgradeMaterial5();
}

function returnStamper(tier){
  if (tier===1) return new Stamp1();
  if (tier===2) return new Stamp2();
  if (tier===3) return new Stamp3();
}

function returnUpgradeMaterialAmount(currentLevel){
  if (currentLevel===0) return 10;
  if (currentLevel===1) return 50;
  if (currentLevel===2) return 250;
  if (currentLevel===3) return 6250;
  if (currentLevel===4) return 31250;
  if (currentLevel===5) return 156250;
  }


did("itemContextMenuButtonUpgrade").addEventListener("mouseenter", function () { //upgrade upgrading menu
  upgradeMenuTooltip()
});


function upgradeMenuTooltip(){

  const item = contextSelectedItem.item; 

  let arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="#70d4ff" stroke-dasharray="12" stroke-dashoffset="12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M22 12l-7 -7M22 12l-7 7" stroke-dashoffset="0"/><path d="M16 12l-7 -7M16 12l-7 7" stroke-dashoffset="0"/><path d="M10 12l-7 -7M10 12l-7 7" stroke-dashoffset="0"/></g></svg>`
  let arrowIcon2 = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#70ff7a" d="M10.586 3L4 9.586a2 2 0 0 0-.434 2.18l.068.145A2 2 0 0 0 5.414 13H8v7a2 2 0 0 0 2 2h4l.15-.005A2 2 0 0 0 16 20l-.001-7h2.587A2 2 0 0 0 20 9.586L13.414 3a2 2 0 0 0-2.828 0"/></svg>`

  let swordIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M19.071 3.929a1 1 0 0 1 1 1v5.657a1 1 0 0 1-.405.804l-7.198 5.32l.946.947a1 1 0 0 1 0 1.414L12 20.485a1 1 0 0 1-1.154.187l-2.184-1.091l-1.612 1.611a1 1 0 0 1-1.414 0l-2.828-2.828a1 1 0 0 1 0-1.414l1.611-1.612l-1.091-2.184A1 1 0 0 1 3.515 12l1.414-1.414a1 1 0 0 1 1.414 0l.947.946l5.32-7.198a1 1 0 0 1 .804-.405z"/></g></svg>`
  if (item.hp !== undefined) swordIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501C7.5.825 2 4.274 2 9.137"/></svg>`

  let materialToUseName = `&nbsp;<span style="color:${returnQualityColor(returnUpgradeMaterial(item.quality).quality)}">${returnUpgradeMaterial(item.quality).name}</span>&nbsp;`
  let materialToUseImg = returnUpgradeMaterial(item.quality).img
  let materialToUseCount = returnUpgradeMaterial(item.quality).constructor.count

  let dmgorhp = "";
  if (item.hp !== undefined) dmgorhp =   Math.floor( ( (item.baseHp * item.hp) * Math.pow(prefixTierMod, item.prefixTier)  ) * (  Math.pow(upgradeMod, item.constructor.upgrade+1) ) );
  else dmgorhp = Math.floor(  ( (item.baseDamage * item.damage) * Math.pow(prefixTierMod, item.prefixTier) ) * ( Math.pow(upgradeMod, item.constructor.upgrade+1) )  );

  const dmgorhpnext = dmgorhp

  if ( UpgradeMaterial0.count>=returnUpgradeMaterialAmount(item.constructor.upgrade) &&  returnUpgradeMaterial(item.quality).constructor.count < returnUpgradeMaterialAmount(item.constructor.upgrade) ) {

    let universalupgradeitem = new UpgradeMaterial0()
    materialToUseName = `&nbsp;<span style="color:${returnQualityColor(universalupgradeitem.quality)}">${universalupgradeitem.name}</span>&nbsp;`
    materialToUseImg = universalupgradeitem.img
    materialToUseCount = universalupgradeitem.constructor.count

  }


  did("tooltipDescription").innerHTML = `
  <div class="upgradeTooltipWidget">${returnUpgradeLevelStars(item.constructor.upgrade)} ${arrowIcon} ${returnUpgradeLevelStars(item.constructor.upgrade+1)}</div>
  
  
  
  <div class="upgradeTooltipWidget2">${beautify(dmgorhpnext)}${swordIcon}${arrowIcon2}</div>

  <div class="separator"></div>
  <div class="upgradeTooltipWidget3" style="outline:none;color:gray"><strong>✨</strong>Upgrade the base stats of all items of the same type by using same-quality materials</span></div>
  <div class="upgradeTooltipWidget3"><img src="img/src/items/I${materialToUseImg}.jpg"><span>Will use${materialToUseName}x${beautify(returnUpgradeMaterialAmount(item.constructor.upgrade))}  &nbsp;<span style="color:gray">(${beautify(materialToUseCount)} in bag)</span></span></div>
  `;

  if (item.constructor.upgrade===6) did("tooltipDescription").innerHTML = `
  <div class="upgradeTooltipWidget">${returnUpgradeLevelStars(item.constructor.upgrade)}</div>
  <div class="upgradeTooltipWidget2">Max upgrade level reached</div>
  `;


  did("tooltip").style.display = "flex";
  did("tooltipName").innerHTML = `${item.name}`; 
  did("tooltipFlavor").innerHTML = "";
  did("tooltipImage").src = `img/src/items/I${item.img}.jpg`;
  if (item.align !== undefined) did("tooltipAlign").src = `img/src/icons/${item.align}.jpg`;
  did("tooltipRarity").innerHTML = returnRarity(item);
  did("tooltipRarity").style.color = returnQualityColor(item.quality);
  did("tooltipName").style.color = returnQualityColor(item.quality);
  did("tooltip").style.outline = `${returnQualityColor(item.quality)} solid 2px`;
  did("tooltipPrice").innerHTML = "";



const referenceDiv = did("itemContextMenuButtonUpgrade");
const movingDiv = did('tooltip');
const referenceRect = referenceDiv.getBoundingClientRect();
const tooltipRect = movingDiv.getBoundingClientRect();
const newLeft = referenceRect.right/(stats.zoomLevel/100);
const newTop = (referenceRect.top + (referenceRect.height / 2) - (tooltipRect.height / 2))/(stats.zoomLevel/100);
movingDiv.style.left = newLeft + 20 +'px';
movingDiv.style.top = newTop + 'px';

}

did("itemContextMenuButtonUpgrade").addEventListener("mouseleave", function () {
  resetTooltip();
});


stats.upgradedItems = 0


function upgradeSelectedItem(){

  const item = contextSelectedItem.item; 

  if (item.constructor.upgrade>5) return 

  if ( returnUpgradeMaterial(item.quality).constructor.count >= returnUpgradeMaterialAmount(item.constructor.upgrade) ){

    returnUpgradeMaterial(item.quality).constructor.count -= returnUpgradeMaterialAmount(item.constructor.upgrade);
    upgradeItem()


  } else if ( UpgradeMaterial0.count >= returnUpgradeMaterialAmount(item.constructor.upgrade) ){

    UpgradeMaterial0.count -= returnUpgradeMaterialAmount(item.constructor.upgrade);
    upgradeItem()

  } else playSound("audio/thud.mp3")


  function upgradeItem(){


    stats.upgradedItems++
    stats.upgradedItemsLog++
    item.constructor.upgrade++;
    voidAnimation("tooltip", "areaClick 0.4s ease 1, interactableTooltipIdle 3s infinite");
    upgradeMenuTooltip();
    updateInventory();


    
    let itemDiv = contextSelectedItem

    selectedItemRect = itemDiv.getBoundingClientRect();

    itemDiv.style.animation = "";
    void itemDiv.offsetWidth;
    itemDiv.style.animation = "gelatineHigh 0.3s 1, flashNoScale 0.5s 1";
    particleTrackers.push(new ParticleSellPulse());

    playSound("audio/talent.mp3")
    playSound("audio/pop2.mp3")

    equipGear()
    statsUpdate()
    updateStatsUI()


  }






}





did("itemContextMenuButtonReforge").addEventListener("mouseenter", function () { //upgrade upgrading menu
  reforgeMenuTooltip()
});


function reforgeMenuTooltip(){

  const item = contextSelectedItem.item; 

  let materialToUseName = `&nbsp;<span style="color:${returnQualityColor(returnStamper(item.prefixTier).quality)}">${returnStamper(item.prefixTier).name}</span>&nbsp;`
  let materialToUseImg = returnStamper(item.prefixTier).img
  let materialToUseCount = beautify(returnStamper(item.prefixTier).constructor.count)


  did("tooltipDescription").innerHTML = `
  ${returnWeaponDescription(item)} ${returnPrefixSkills(item)}
  <div class="separator"></div>
  <div class="upgradeTooltipWidget3" style="outline:none;color:gray"><strong>🎲</strong>Reroll reforge effects by using stampers of the corresponding reforge tier</span></div>
  <div class="upgradeTooltipWidget3"><img src="img/src/items/I${materialToUseImg}.jpg">Will use ${materialToUseName} x${1}  &nbsp;<span style="color:gray">(${materialToUseCount} in bag)</span></div>
  `;


  did("tooltip").style.display = "flex";
  did("tooltipName").innerHTML = `${returnPrefixName(item)} ${item.name}`; 
  did("tooltipFlavor").innerHTML = "";
  did("tooltipImage").src = `img/src/items/I${item.img}.jpg`;
  if (item.align !== undefined) did("tooltipAlign").src = `img/src/icons/${item.align}.jpg`;
  did("tooltipRarity").innerHTML = returnRarity(item);
  did("tooltipRarity").style.color = returnQualityColor(item.quality);
  did("tooltipName").style.color = returnQualityColor(item.quality);
  did("tooltip").style.outline = `${returnQualityColor(item.quality)} solid 2px`;
  did("tooltipPrice").innerHTML = "";



const referenceDiv = did("itemContextMenuButtonReforge");
const movingDiv = did('tooltip');
const referenceRect = referenceDiv.getBoundingClientRect();
const tooltipRect = movingDiv.getBoundingClientRect();
const newLeft = referenceRect.right;
const newTop = referenceRect.top + (referenceRect.height / 2) - (tooltipRect.height / 2);
movingDiv.style.left = newLeft + 20 +'px';
movingDiv.style.top = newTop + 'px';

}

did("itemContextMenuButtonReforge").addEventListener("mouseleave", function () {
  resetTooltip();
});


function reforgeSelectedItem(){

  const item = contextSelectedItem.item; 

  if ( returnStamper(item.prefixTier).constructor.count >= 1 ){

    returnStamper(item.prefixTier).constructor.count --;
    reforgeItem()


  } else playSound("audio/thud.mp3")


  function reforgeItem(){


    playSound("audio/stamp.mp3")


    stats.stampsUsed++
    stats.stampsUsedLog++

    const invItem = contextSelectedItem.item

    if (invItem.slot==="Weapon"){
      if (invItem.prefixTier===1) {invItem.prefix1 = returnArrayPick(weaponPrefix1); }
      if (invItem.prefixTier===2) {invItem.prefix1 = returnArrayPick(weaponPrefix1); invItem.prefix2 = returnArrayPick(weaponPrefix2);}
      if (invItem.prefixTier===3) {invItem.prefix1 = returnArrayPick(weaponPrefix1); invItem.prefix2 = returnArrayPick(weaponPrefix2); invItem.prefix3 = returnArrayPick(weaponPrefix3);}
    }

    else if (invItem.slot==="Trinket"){
      if (invItem.prefixTier===1) {invItem.prefix1 = returnArrayPick(trinketPrefix1); }
      if (invItem.prefixTier===2) {invItem.prefix1 = returnArrayPick(trinketPrefix1); invItem.prefix2 = returnArrayPick(miscPrefix2);}
      if (invItem.prefixTier===3) {invItem.prefix1 = returnArrayPick(trinketPrefix1); invItem.prefix2 = returnArrayPick(miscPrefix2); invItem.prefix3 = returnArrayPick(miscPrefix3);}
    }

    else if (invItem.slot==="Ring"){
      if (invItem.prefixTier===1) {invItem.prefix1 = returnArrayPick(miscPrefix1); }
      if (invItem.prefixTier===2) {invItem.prefix1 = returnArrayPick(miscPrefix1); invItem.prefix2 = returnArrayPick(miscPrefix2);}
      if (invItem.prefixTier===3) {invItem.prefix1 = returnArrayPick(miscPrefix1); invItem.prefix2 = returnArrayPick(miscPrefix2); invItem.prefix3 = returnArrayPick(miscPrefix3);}
    }

    else {
      if (invItem.prefixTier===1) {invItem.prefix1 = returnArrayPick(armorPrefix1); }
      if (invItem.prefixTier===2) {invItem.prefix1 = returnArrayPick(armorPrefix1); invItem.prefix2 = returnArrayPick(armorPrefix2);}
      if (invItem.prefixTier===3) {invItem.prefix1 = returnArrayPick(armorPrefix1); invItem.prefix2 = returnArrayPick(armorPrefix2); invItem.prefix3 = returnArrayPick(armorPrefix3);}
    }



    

    invItem.invInit()



    voidAnimation("tooltip", "areaClick 0.4s ease 1, interactableTooltipIdle 3s infinite");
    reforgeMenuTooltip();
    updateInventory();

    let itemDiv = contextSelectedItem

    selectedItemRect = itemDiv.getBoundingClientRect();

    itemDiv.style.animation = "";
    void itemDiv.offsetWidth;
    itemDiv.style.animation = "gelatineHigh 0.3s 1, flashNoScale 0.5s 1";
    particleTrackers.push(new ParticleSellPulse());

  }

}

function sellSelectedItem(mode){

  let itemDiv = contextSelectedItem



  playSound("audio/coins.mp3")
  playSound("audio/pop2.mp3")





  //let item = contextSelectedItem.item


  if (mode==="amount"){

    let item = contextSelectedItem.item


    if (item.value()===0) {playSound("audio/thud.mp3"); return}


    let toSell = 1
    if (itemContextSellInput.value !== "" && itemContextSellInput.value<=item.constructor.count) toSell = itemContextSellInput.value

  
          divRect = item.div;
          selectedItemRect = divRect.getBoundingClientRect();
  
          if (toSell > 9) particleTrackers.push(new ParticleSellCoins());
          if (toSell > 99) particleTrackers.push(new ParticleSellCoins());
          if (toSell > 999) particleTrackers.push(new ParticleSellCoins());

          //if (item.constructor.count===0) toSell = 1 //non stackable items
  
          rpgPlayer.coins += toSell * item.value();
          stats.totalCoins += toSell * item.value();
          item.constructor.count -= toSell;
          stats.soldItems += toSell;

          if (item.constructor.count<1) itemContextMenuBegone();
  
          // Eliminar el item
          //itemInventory.splice(i, 1);
          successSell();
          updateInventory();

          if (itemContextSellInput.value>1){
            itemContextSellInput.value = ""
            itemContextMenuBegone()
          }
      
  


  }

  

  if (mode==="all"){

    for (let i = itemInventory.length - 1; i >= 0; i--) {
      let item = itemInventory[i];
  
      if (item.selected === true && item.locked!==true) {



        if (item.value()===0) {playSound("audio/thud.mp3"); continue}


          divRect = item.div;
          selectedItemRect = divRect.getBoundingClientRect();
  
          if (item.constructor.count > 9) particleTrackers.push(new ParticleSellCoins());
          if (item.constructor.count > 99) particleTrackers.push(new ParticleSellCoins());
          if (item.constructor.count > 999) particleTrackers.push(new ParticleSellCoins());

          let toSell = item.constructor.count
          if (item.constructor.count===0) toSell = 1 //non stackable items
  
          rpgPlayer.coins += toSell * item.value();
          item.constructor.count = 0;
  
          // Eliminar el item
          itemInventory.splice(i, 1);
          successSell();
      }
  }

    quickSelectMode = false
    itemContextMenuBegone();
    if (did("selectionContextMenu").style.display === "flex"){
      setTimeout(() => { //this bullshit is required for the inventory to update. idk, needs a rewrite
        quickSelectMode = true
      }, 10);
    }


  } 


  function successSell(){

    itemDiv.style.animation = "";
    void itemDiv.offsetWidth;
    itemDiv.style.animation = "gelatineHigh 0.3s 1";
  
    particleTrackers.push(new ParticleSellCoins());
    particleTrackers.push(new ParticleSellPulse());

    
    

    setTimeout(() => {
      voidAnimation("contadorMonedas","gelatine 0.3s 1")
      updateCounters()
    }, 700);


  }





}


function scrapSelectedItem(){

  playSound("audio/pop2.mp3")
  playSound("audio/scrap.mp3")



  const goalRect = did("inventoryMaterialTarget").getBoundingClientRect();
  const goalCenterX = goalRect.left - containerRect.left + goalRect.width / 2;
  const goalCenterY = goalRect.top - containerRect.top + goalRect.height / 2;

  let image = new Image();
  image.src = "img/src/icons/drop_loot.png";




  for (let i = itemInventory.length - 1; i >= 0; i--) {
    let item = itemInventory[i];

    if (item.selected === true && item.locked!==true && item.slot!==undefined) {
        divRect = item.div;
        selectedItemRect = divRect.getBoundingClientRect();


        


      

        let toSell = item.constructor.count
        if (item.constructor.count===0) toSell = 1 //non stackable items
        item.constructor.count = 0;
        itemInventory.splice(i, 1);

        particleTrackers.push(new ParticleSellCoins(undefined, undefined, { image, enemyCenterX:goalCenterX, enemyCenterY: goalCenterY, tSpeed: 0.018 }));
        particleTrackers.push(new ParticleSellPulse());


       
        spawnItem(returnScrapMaterial(item),1,"noPopup")


    }
}

  quickSelectMode = false
  itemContextMenuBegone();
  if (did("selectionContextMenu").style.display === "flex"){
    setTimeout(() => { //this bullshit is required for the inventory to update. idk, needs a rewrite
      quickSelectMode = true
    }, 10);
  }
}


function returnScrapMaterial(item){

  if (item.quality === 'Uncommon') return ScrapMaterial2
  if (item.quality === 'Rare') return ScrapMaterial3
  if (item.quality === 'Epic') return ScrapMaterial4


  return ScrapMaterial1

}



function selectAllItems(){

  playSound("audio/button5.mp3")



  itemInventory.forEach((item, index) => {




    if (item.loadouts==undefined && item.sort!==currentSort) return // if it doesnt belong on that category
    if (item.sort!==currentSort && item.loadouts!==undefined && !item.loadouts.includes(rpgPlayer.currentLoadout)) return //prevents equipped items from disapearing
    if (item.loadouts!==undefined && item.loadouts.includes(rpgPlayer.currentLoadout)) return

    const itemdiv = item.div
    const itemSelect = itemdiv.querySelector('.itemSelect');


    item.selected = true
    if (itemSelect) itemSelect.style.display = 'flex'; 


  })









}


function lockSelectedItem(){

  playSound("audio/thud.mp3")


  for (let i = itemInventory.length - 1; i >= 0; i--) {
    let item = itemInventory[i];

    if (item.selected === true) {
        
      
      if (item.locked===true){
        item.locked=undefined

      } else{

        item.locked = true

      }
    



    }
}


quickSelectMode = false
itemContextMenuBegone()
if (did("selectionContextMenu").style.display === "flex"){
  setTimeout(() => { //this bullshit is required for the inventory to update. idk, needs a rewrite
    quickSelectMode = true
  }, 10);
}



}

function useSelectedItem(amount,tag){

  let item = contextSelectedItem.item

  
  if(tag==="quick"){
    particleTrackers.push(new ParticleSellPulse(mousePositionX, mousePositionY,{x:mousePositionX,y:mousePositionY}));
  }

  if (tag===undefined){
    let divRect = item.div;
  selectedItemRect = divRect.getBoundingClientRect();

  divRect.style.animation = "";
  void divRect.offsetWidth;
  divRect.style.animation = "gelatineHigh 0.3s 1";

  selectedItemRect = divRect.getBoundingClientRect();
  particleTrackers.push(new ParticleSellPulse());

  playSound("audio/pop3.mp3")
  playSound("audio/use.mp3")
  }



  let times = 1
  if (amount!==undefined && amount!=="" && amount<=item.constructor.count) times = amount

  for (let i = 0; i < times; i++) { loop() ;}

  function loop() { item.use();}

  if (item.constructor.count<1) {itemContextMenuBegone(); resetTooltip()}

  updateInventory();









}

function mergeSelectedItem(){

  let item = contextSelectedItem.item
  let divRect = item.div;
  selectedItemRect = divRect.getBoundingClientRect();

  divRect.style.animation = "";
  void divRect.offsetWidth;
  divRect.style.animation = "gelatineHigh 0.3s 1";

  selectedItemRect = divRect.getBoundingClientRect();
  particleTrackers.push(new ParticleSellPulse());

  playSound("audio/pop4.mp3")
  playSound("audio/use.mp3")

  item.merge();

  if (item.mergeStack>item.constructor.count) itemContextMenuBegone(); 
  
  updateInventory();
}


let quickSelectMode = false

function inventoryQuickSelect(){


  playSound("audio/button2.mp3")



  if (quickSelectMode===true){

    endSelectionMode()
    voidAnimation("inventoryTopButtonQuickSelect","gelatine 0.3s 1")

    return
  }
  quickSelectMode = true;
  voidAnimation("inventoryTopButtonQuickSelect","gelatine 0.3s 1,inventoryTopButtonActive 3s infinite linear")

  did("selectionContextMenu").style.display = "flex";

  var movingDiv = did("selectionContextMenu");
  var referenceDiv = did("inventoryTopButtonQuickSelect");
  var referenceRect = referenceDiv.getBoundingClientRect();
  
  // Calcula el centro del lado derecho de referenceDiv
  const newLeft = referenceRect.right;
  const newTop = referenceRect.top + (referenceRect.height - movingDiv.offsetHeight) / 2;
  
  // Aplica la posición a movingDiv
  movingDiv.style.left = `${newLeft + 25}px`;
  movingDiv.style.top = `${newTop}px`;
  
}

function endSelectionMode(){

  quickSelectMode=false;
  did("inventoryTopButtonQuickSelect").style.animation = "none";
  did("selectionContextMenu").style.display = "none";
  itemContextMenuBegone()
  updateInventory()
  
}


function equipSelectedItem(){

  const item = contextSelectedItem.item; 

  if (item.slot != undefined) { //if its equipable

    
    playSound("audio/use.mp3")


    if (item.loadouts!==undefined && !item.loadouts.includes(rpgPlayer.currentLoadout)) { //if its not equipped yet

      
      itemInventory.forEach((i) => { //removes already equiped items
        if (i.slot == item.slot && i.loadouts!==undefined && i.loadouts.includes(rpgPlayer.currentLoadout)) i.loadouts = i.loadouts.filter(num => num !== rpgPlayer.currentLoadout);
      });
      

      item.loadouts.push(rpgPlayer.currentLoadout);

    }

    equipGear()
    resetTooltip()
    itemContextMenuBegone()

  }

}



function UnequipSelectedItem(){


    const item = contextSelectedItem.item; 

    if (item.slot != undefined) { //if its equipable

    if (item.loadouts.includes(rpgPlayer.currentLoadout)) {  //if its already equipped


      playSound("audio/use.mp3")


      item.loadouts = item.loadouts.filter(num => num !== rpgPlayer.currentLoadout);



      did(`rpg${item.slot}Slot`).innerHTML = ""; 
      equipGear()
      resetTooltip()
      updateInventory()
    } 

  }


itemContextMenuBegone()

}


function changeLoadout(number){

      playSound("audio/use.mp3")


  did(`rpgHeadSlot`).innerHTML = ""
  did(`rpgChestSlot`).innerHTML = ""
  did(`rpgLegsSlot`).innerHTML = ""
  did(`rpgFeetSlot`).innerHTML = ""
  did(`rpgWeaponSlot`).innerHTML = ""
  did(`rpgOffhandSlot`).innerHTML = ""
  did(`rpgLumaSlot`).innerHTML = ""
  did(`rpgRingSlot`).innerHTML = ""
  did(`rpgTrinketSlot`).innerHTML = ""



if (number!==undefined) rpgPlayer.currentLoadout = number;

let loadoutIcon = `🔥`;
if (rpgPlayer.currentLoadout===2) loadoutIcon = `🍃`;
if (rpgPlayer.currentLoadout===3) loadoutIcon = `🌙`;
if (rpgPlayer.currentLoadout===4) loadoutIcon = `⛏️`;
if (rpgPlayer.currentLoadout===5) loadoutIcon = `🎣`;
if (rpgPlayer.currentLoadout===6) loadoutIcon = `💎`;
if (rpgPlayer.currentLoadout===7) loadoutIcon = `💕`;
if (rpgPlayer.currentLoadout===8) loadoutIcon = `🌟`;
if (rpgPlayer.currentLoadout===9) loadoutIcon = `🔰`;

did("loadoutButton").innerHTML = loadoutIcon;
if (number!==undefined) voidAnimation("loadoutButton", "gelatine 0.3s 1")


endSelectionMode();
updateInventory();
equipGear();
}

function itemContextMenuBegone(){

  //playSound("audio/throw.mp3")


    did("itemContextMenu").style.display = "none";
    did("itemContextMenu").style.animation = "none";
    did("itemContextMenuButtonEquip").style.display = "none";
    did("itemContextMenuButtonBuyMenu").style.display = "none";
    did("itemContextMenuButtonUse").style.display = "none";
    did("itemContextMenuButtonUseMenu").style.display = "none";
    did("itemContextMenuButtonMerge").style.display = "none";
    did("itemContextMenuButtonScrap").style.display = "none";
    did("itemContextMenuButtonReforge").style.display = "none"
    did("itemContextMenuButtonUpgrade").style.display = "none"
    did("itemContextMenuButtonUnequip").style.display = "none"
    did("itemContextMenuButtonSell").style.display = "none";
    did("itemContextMenuButtonSellMenu").style.display = "none";
    did("itemContextMenuButtonSellAll").style.display = "none";
    did("itemContextMenuScreensaver").style.display = "none";
    did("itemContextMenuButtonTipMenu").style.display = "none";
    did("tipJarInfo").style.display = "none";
    did("itemContextMenuButtonHatSell").style.display = "none";
    did("itemContextMenuButtonHatFavorite").style.display = "none";
    did("itemContextMenuButtonHatEquip").style.display = "none";
    did("itemContextMenuButtonHatEquip").style.display = "none";
    did("itemContextMenuDailyPresents").style.display = "none";
    did("itemcontextMenuArrow").style.display = "flex";

    deselectAllItems()
    updateInventory()

}



did("itemContextMenuScreensaver").addEventListener('click', function(event) {


  itemContextMenuBegone();
  


  
})

function deselectAllItems(){
  itemInventory.forEach((item, index) => { item.selected = false })

  const itemDiv = contextSelectedItem
  const itemSelect = itemDiv.querySelector('.itemSelect');
    if (itemSelect) {
      itemSelect.style.display = 'none'; 
    }
    
}





document.addEventListener('mouseover', function(event) {


    let itemDiv = event.target.parentElement;
    let itemDivNoParent = event.target;

    if (itemDiv.item || itemDivNoParent.item) {
    let item = itemDiv.item; 

    if (itemDivNoParent && itemDivNoParent.item!==undefined) {

      item = itemDivNoParent.item
      itemDiv = event.target

    } 




    let coinValue = 


    did("tooltip").style.display = "flex";
    did("tooltipName").innerHTML = `${returnPrefixName(item)} ${item.name}`; 
    did("tooltipDescription").innerHTML = `${returnUpgradeLevel(item)}  ${returnTierSet(item)} ${returnWeaponDescription(item)} ${returnSourceDescription()} ${returnGemstoneUi(item)} ${returnPrefixSkills(item)}  ${returnItemDescription()}  <div class="separador"></div> ${returnItemPrice(item)}`;
    did("tooltipFlavor").innerHTML = item.flavor;
    if (item.flavor===undefined) did("tooltipFlavor").style.display = "none"
    did("tooltipImage").src = `img/src/items/I${item.img}.jpg`;
    did("tooltipRarity").innerHTML = returnRarity(item);
    did("tooltipRarity").style.color = returnQualityColor(item.quality);
    did("tooltipName").style.color = returnQualityColor(item.quality);
    did("tooltip").style.outline = `${returnQualityColor(item.quality)} solid 2px`;
    did("tooltipPrice").innerHTML = "";


    

    if (item.align !== undefined) {
      did("tooltipAlign").style.height = "2.7rem"
      did("tooltipAlign").style.width = "2.7rem"
      did("tooltipAlign").src = `img/src/icons/${item.align}.jpg`;
    }
    else if (item.slot) {
      did("tooltipAlign").style.height = "3rem"
      did("tooltipAlign").style.width = "3rem"
      did("tooltipAlign").src = returnEquipSlotIcon(item.slot)
    }


    if (itemDiv.tag2 === "shopArea") did("tooltipFlavor").innerHTML = ""

    if (item.contextTooltip!==undefined && itemDiv.tag2 !== "shopArea") {

      did("contextList").innerHTML = ""
      const lista = item.contextTooltip()
      lista.forEach(i => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "tooltipContext"
        itemDiv.innerHTML = i
        did("contextList").appendChild(itemDiv);
      });
    
    }


    if (item.sort==="Hat") {
      did("tooltipDescription").innerHTML = ``;
      if (item.glimmer!==undefined) did("tooltipDescription").innerHTML = colorTag(`🎇 Glimmer : ${glimmerNames(item.glimmer)}`, returnQualityColor("Epic"));
      did("tooltipImage").src = `img/src/hats/H${item.img}.jpg`;
      did("tooltipImage").style.filter = `hue-rotate(${item.paint}deg)`;
    }

    //sets position of tooltip
    const movingDiv = did('tooltip');
    const referenceDiv = itemDiv;
    const referenceRect = referenceDiv.getBoundingClientRect();
    const tooltipRect = movingDiv.getBoundingClientRect(); 

    if (equippedItems.some(equippedItem => equippedItem === item))
    {
      let newLeft = referenceRect.right/ (stats.zoomLevel/100); 
      let newTop = referenceRect.top/ (stats.zoomLevel/100); 
      movingDiv.style.left = newLeft + 12 + 'px'; 
      movingDiv.style.top = newTop + -5 + 'px';
    } else {
      let newLeft = referenceRect.right/ (stats.zoomLevel/100); 
      let newTop = (referenceRect.bottom - tooltipRect.height)/ (stats.zoomLevel/100); 
      movingDiv.style.left = newLeft + 12 + 'px'; 
      movingDiv.style.top = newTop + -5 + 'px'; 
    }


    if (itemDiv.tag2 === "shopArea") {
      const newLeft = (referenceRect.right - tooltipRect.width)/ (stats.zoomLevel/100);
      const newTop = referenceRect.bottom/ (stats.zoomLevel/100);
      movingDiv.style.left = newLeft + 'px';
      movingDiv.style.top = newTop + 'px';
    }


    if ( itemDiv.item?.tag!=="mail" && referenceRect.left > (window.innerWidth * 0.5) ) {
      const newLeft = (referenceRect.right - tooltipRect.width)/ (stats.zoomLevel/100);
      const newTop = referenceRect.bottom/ (stats.zoomLevel/100);
      movingDiv.style.left = newLeft + 'px';
      movingDiv.style.top = newTop + 10 + 'px';
    }








    //if its gear, compare


    if (itemDiv.tag==="inventory" && item.slot!==undefined){ 




      const slotItem = eval('equipped' + item.slot);

      if (slotItem===undefined || slotItem === item) return

      did("stampMenu").style.display = "flex";

      did("stampMenuName").innerHTML = `${returnPrefixName(slotItem)} ${slotItem.name}`; 




      did("stampMenuDescription").innerHTML = `${returnUpgradeLevel(slotItem)} ${returnTierSet(slotItem)} ${returnWeaponDescription(slotItem)} ${returnGemstoneUi(slotItem)} ${returnPrefixSkills(slotItem)}<br><br>`;

      did("stampMenuRarity").innerHTML = returnRarity(slotItem);
      did("stampMenuRarity").style.color = returnQualityColor(slotItem.quality);
      did("stampMenuImg").src = `img/src/items/I${slotItem.img}.jpg`;
      if (slotItem.align) did("stampMenuAlign").src = `img/src/icons/${slotItem.align}.jpg`; else did("stampMenuAlign").src = `img/src/projectiles/none.png`;


        let movingDiv2 = did("stampMenu");
        let referenceDiv2 = did("tooltip");
        let referenceRect2 = referenceDiv2.getBoundingClientRect();
        var newLeft = referenceRect2.right/ (stats.zoomLevel/100) + 10;
        var newTop = referenceRect2.top/ (stats.zoomLevel/100) - 0;

        movingDiv2.style.left = newLeft + "px";
        movingDiv2.style.top = newTop + "px";
        did("stampMenu").style.display="flex" 

    }

        


    
    












    function returnSourceDescription() {      

      if (item.source!=undefined) {
        let infoIcon = `<svg class="tooltipSkillStar" style="height:1.7rem" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipTInfo0"><g fill="none"><path fill="#555" stroke="#fff" stroke-linejoin="round" stroke-width="4" d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"/><path fill="#fff" fill-rule="evenodd" d="M24 11a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5" clip-rule="evenodd"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M24.5 34V20h-2M21 34h7"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTInfo0)"/></svg>`

        //return `<span style="color:#7276B7; font-weight:800;"><span class="tooltipIcon">${infoIcon}</span> ${item.source}</span>`

        return `<span style="color:#7276B7; font-weight:600; display:flex; align-items:center">${infoIcon+item.source}</span>`

      } 
      
      return ``

    }    

    function returnItemDescription() {

      if (item.description!=undefined) {  return `<span>${item.description()}</span>` } 
      return ``

    }    

    

    function returnItemPrice(){


      if (itemDiv.tag2 === "shopArea") {


        let itemprice = areaShop[itemDiv.shopID].price
        if (areas[stats.currentArea].shopLevel>=3) itemprice = areaShop[itemDiv.shopID].price*0.75
        if (areas[stats.currentArea].shopLevel>=5) itemprice = areaShop[itemDiv.shopID].price*0.5

        

        let stocktext = ""

        if (areaShop[itemDiv.shopID].stock) {
          const stockicon = `<svg style="background:transparent; translate: 0 30%" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-dasharray="4" stroke-dashoffset="4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5"><animate id="lineMdMoonFilledAltLoop0" fill="freeze" attributeName="stroke-dashoffset" begin="0.7s;lineMdMoonFilledAltLoop0.begin+6s" dur="0.4s" values="4;0"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonFilledAltLoop0.begin+2s;lineMdMoonFilledAltLoop0.begin+4s" dur="0.4s" values="4;0"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonFilledAltLoop0.begin+1.2s;lineMdMoonFilledAltLoop0.begin+3.2s;lineMdMoonFilledAltLoop0.begin+5.2s" dur="0.4s" values="0;4"/><set fill="freeze" attributeName="d" begin="lineMdMoonFilledAltLoop0.begin+1.8s" to="M12 5h1.5M12 5h-1.5M12 5v1.5M12 5v-1.5"/><set fill="freeze" attributeName="d" begin="lineMdMoonFilledAltLoop0.begin+3.8s" to="M12 4h1.5M12 4h-1.5M12 4v1.5M12 4v-1.5"/><set fill="freeze" attributeName="d" begin="lineMdMoonFilledAltLoop0.begin+5.8s" to="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5"/></path><path d="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5"><animate id="lineMdMoonFilledAltLoop1" fill="freeze" attributeName="stroke-dashoffset" begin="1.1s;lineMdMoonFilledAltLoop1.begin+6s" dur="0.4s" values="4;0"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonFilledAltLoop1.begin+2s;lineMdMoonFilledAltLoop1.begin+4s" dur="0.4s" values="4;0"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonFilledAltLoop1.begin+1.2s;lineMdMoonFilledAltLoop1.begin+3.2s;lineMdMoonFilledAltLoop1.begin+5.2s" dur="0.4s" values="0;4"/><set fill="freeze" attributeName="d" begin="lineMdMoonFilledAltLoop1.begin+1.8s" to="M17 11h1.5M17 11h-1.5M17 11v1.5M17 11v-1.5"/><set fill="freeze" attributeName="d" begin="lineMdMoonFilledAltLoop1.begin+3.8s" to="M18 12h1.5M18 12h-1.5M18 12v1.5M18 12v-1.5"/><set fill="freeze" attributeName="d" begin="lineMdMoonFilledAltLoop1.begin+5.8s" to="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5"/></path><path d="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5"><animate id="lineMdMoonFilledAltLoop2" fill="freeze" attributeName="stroke-dashoffset" begin="2s;lineMdMoonFilledAltLoop2.begin+6s" dur="0.4s" values="4;0"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonFilledAltLoop2.begin+2s" dur="0.4s" values="4;0"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdMoonFilledAltLoop2.begin+1.2s;lineMdMoonFilledAltLoop2.begin+3.2s" dur="0.4s" values="0;4"/><set fill="freeze" attributeName="d" begin="lineMdMoonFilledAltLoop2.begin+1.8s" to="M20 5h1.5M20 5h-1.5M20 5v1.5M20 5v-1.5"/><set fill="freeze" attributeName="d" begin="lineMdMoonFilledAltLoop2.begin+5.8s" to="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5"/></path></g><path fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-dasharray="56" stroke-dashoffset="56" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"><animate fill="freeze" attributeName="fill-opacity" begin="1.5s" dur="0.5s" values="0;1"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0"/></path></svg>`;
          stocktext = `<span style="font-weight:600; color:#ECFF54">${stockicon} This is a stock-limited item and can only be bought ${areaShop[itemDiv.shopID].stock} time/s</span>`;
        }


        return `<div style=" text-align: center;background:transparent;overflow:visible"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">${ beautify(itemprice)}${coinIcon}Shells<br>${stocktext}</div>`;
      }

      if (itemDiv.tag2 === "shopAchievement") {


        let condition = ""
        if (achievementShop[itemDiv.shopID].condition && !achievementShop[itemDiv.shopID].condition()) condition = `<br><span style="display:flex;justify-content:center;align-items:center; border-radius:0.2rem; background:#512922; padding: 0.5rem; outline: coral 2px solid">${achievementShop[itemDiv.shopID].conditionText}</span>`

        let itemprice = achievementShop[itemDiv.shopID].price
        return `<div style=" text-align: center;background:transparent;overflow:visible"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">${ beautify(itemprice)}${scuteIcon}Prism Scutes</div>${condition}`;
      }

      if (itemDiv.tag === "crafting") {


        return `<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Currently Owned: <FONT COLOR="#ffbd54">${ beautify(item.constructor.count)}<br></div>`;
      }



      if (item.value()===0) return `<div style=" text-align: center;background:transparent;font-weight:600;color:#FF7777"> Can not be sold<br></div>`;
      if (item.isStackable) return `<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">${ beautify(item.value())} ( ${beautify(item.value() * item.constructor.count)} )${coinIcon}Shells<br></div>`;
      return `<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">${ beautify(item.value())}${coinIcon}Shells<br></div>`;
    }

  

    





    
  

  }
});


function returnTierSet(item){ 

  if (item.set !== undefined) {


  let tierMark = `<svg class="tooltipSkillStar" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><rect width="9" height="9" x="1.5" y="1.5" fill="currentColor" rx="1"/><rect width="9" height="9" x="13.5" y="1.5" fill="currentColor" rx="1"/><rect width="9" height="9" x="13.5" y="13.5" fill="currentColor" rx="1"/><rect width="9" height="9" x="1.5" y="13.5" fill="currentColor" rx="1"/></svg>`
  let tierMarkActive = `<svg class="tooltipSkillStar" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><rect width="9" height="9" x="1.5" y="1.5" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksScale0" attributeName="x" begin="0;svgSpinnersBlocksScale1.end+0.15s" dur="0.6s" keyTimes="0;.2;1" values="1.5;.5;1.5"/><animate attributeName="y" begin="0;svgSpinnersBlocksScale1.end+0.15s" dur="0.6s" keyTimes="0;.2;1" values="1.5;.5;1.5"/><animate attributeName="width" begin="0;svgSpinnersBlocksScale1.end+0.15s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/><animate attributeName="height" begin="0;svgSpinnersBlocksScale1.end+0.15s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/></rect><rect width="9" height="9" x="13.5" y="1.5" fill="currentColor" rx="1"><animate attributeName="x" begin="svgSpinnersBlocksScale0.begin+0.15s" dur="0.6s" keyTimes="0;.2;1" values="13.5;12.5;13.5"/><animate attributeName="y" begin="svgSpinnersBlocksScale0.begin+0.15s" dur="0.6s" keyTimes="0;.2;1" values="1.5;.5;1.5"/><animate attributeName="width" begin="svgSpinnersBlocksScale0.begin+0.15s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/><animate attributeName="height" begin="svgSpinnersBlocksScale0.begin+0.15s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/></rect><rect width="9" height="9" x="13.5" y="13.5" fill="currentColor" rx="1"><animate attributeName="x" begin="svgSpinnersBlocksScale0.begin+0.3s" dur="0.6s" keyTimes="0;.2;1" values="13.5;12.5;13.5"/><animate attributeName="y" begin="svgSpinnersBlocksScale0.begin+0.3s" dur="0.6s" keyTimes="0;.2;1" values="13.5;12.5;13.5"/><animate attributeName="width" begin="svgSpinnersBlocksScale0.begin+0.3s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/><animate attributeName="height" begin="svgSpinnersBlocksScale0.begin+0.3s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/></rect><rect width="9" height="9" x="1.5" y="13.5" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksScale1" attributeName="x" begin="svgSpinnersBlocksScale0.begin+0.45s" dur="0.6s" keyTimes="0;.2;1" values="1.5;.5;1.5"/><animate attributeName="y" begin="svgSpinnersBlocksScale0.begin+0.45s" dur="0.6s" keyTimes="0;.2;1" values="13.5;12.5;13.5"/><animate attributeName="width" begin="svgSpinnersBlocksScale0.begin+0.45s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/><animate attributeName="height" begin="svgSpinnersBlocksScale0.begin+0.45s" dur="0.6s" keyTimes="0;.2;1" values="9;11;9"/></rect></svg>`


  let setDescription = eval('tier' + item.set + 'Description'); 
  let setItems = eval('tier' + item.set + 'Items'); 

  if (tierMatch(equippedItems,setItems,item.setMin))
  {
    return `<span style="color:#AFE972; display:flex; align-items:center">${tierMarkActive}  ${item.set} Set (${tierCount(equippedItems,setItems,item.setMin)}) :  ${setDescription}</span>`
  } else

  return `<span style="color:gray; display:flex; align-items:center">${tierMark}  ${item.set} Set (${tierCount(equippedItems,setItems,item.setMin)}) :  ${setDescription}</span>`


  } else return ""

  
  

}


function returnGemstoneUi(item){

  if (item.gemSlot===undefined) return ""
  
  
  let redSlot = ""
  if (item.gemSlot.red!==null){
    const gemclass = eval(item.gemSlot.red)
    const gem = new gemclass()
    redSlot = `<div class="tooltipGemContainer">
    <div class="tooltipGemImage" style="border: solid 1px red"> <img src="img/src/items/I${gem.img}.jpg"> </div>
    <span style="color:gray"> <span style="color:${returnQualityColor(gem.quality)};font-weight:700;margin-right:0.5rem">${gem.name}:</span>${gem.skillDescription()}</span>
    </div>`
  }
  
  let blueSlot = ""
  if (item.gemSlot.blue!==null){
    const gemclass = eval(item.gemSlot.blue)
    const gem = new gemclass()
    blueSlot = `<div class="tooltipGemContainer">
    <div class="tooltipGemImage" style="border: solid 1px cyan"> <img src="img/src/items/I${gem.img}.jpg"> </div>
    <span style="color:gray"> <span style="color:${returnQualityColor(gem.quality)};font-weight:700;margin-right:0.5rem">${gem.name}:</span>${gem.skillDescription()}</span>
    </div>`
  }
  
  let yellowSlot = ""
  if (item.gemSlot.yellow!==null){
    const gemclass = eval(item.gemSlot.yellow)
    const gem = new gemclass()
    yellowSlot = `<div class="tooltipGemContainer">
    <div class="tooltipGemImage" style="border: solid 1px yellow"> <img src="img/src/items/I${gem.img}.jpg"> </div>
    <span style="color:gray"> <span style="color:${returnQualityColor(gem.quality)};font-weight:700;margin-right:0.5rem">${gem.name}:</span>${gem.skillDescription()}</span>
    </div>`
  }
  
  
  return `<div class="tooltipGem"> ${redSlot} ${blueSlot} ${yellowSlot} </div>`
  }


function returnUpgradeLevel(item){ 

  if (item.constructor.upgrade===undefined) return ""

  return `<div class="tooltipUpgradeLevel">${returnUpgradeLevelStars(item.constructor.upgrade)}</div>`

  //return ""
}

function returnWeaponDescription(item){

  let star = `<svg class="tooltipSkillStar" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="36" stroke-dashoffset="36" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3L9.65 8.76L3.44 9.22L8.2 13.24L6.71 19.28L12 16M12 3L14.35 8.76L20.56 9.22L15.8 13.24L17.29 19.28L12 16"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.75s" values="36;0"/><animate attributeName="d" dur="2.25s" repeatCount="indefinite" values="M12 3L9.65 8.76L3.44 9.22L8.2 13.24L6.71 19.28L12 16M12 3L14.35 8.76L20.56 9.22L15.8 13.24L17.29 19.28L12 16;M12 7L10.82 10.38L7.24 10.45L10.1 12.62L9.06 16.05L12 14M12 7L13.18 10.38L16.76 10.45L13.9 12.62L14.94 16.05L12 14;M12 3L9.65 8.76L3.44 9.22L8.2 13.24L6.71 19.28L12 16M12 3L14.35 8.76L20.56 9.22L15.8 13.24L17.29 19.28L12 16"/></path></svg>`
  

  let skillDesc = ""
  if (typeof item.skillDescription === 'function') skillDesc = `<span style="color:#69DBAD; display:flex; align-items:center">${star+item.skillDescription()}</span>`

  // old if (item.slot===`Weapon`) return `${bestiaryTag("⚔️ Stats ⚔️", "transparent")}<div class="separador"></div><span style="color:#1eff00">Level 20<br>${item.baseDamage+" Base Damage"}</span><br><span style="color:#69DBAD; display:flex; align-items:center">${star+item.skillDescription()}</span>${returnPrefixSkills()}`
  return skillDesc
}

function returnPrefixSkills(item){ 

  let prefix1 = ""
  let prefix2 = ""
  let prefix3 = ""
  let prefix4 = ""
  let prefix5 = ""

  //t1
  if (item.prefix1 === `Light`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x1.25 Attack Speed, x0.8 Weapon Damage</span>`;}
  if (item.prefix1 === `Powerful`) {prefix1 = `<span style="display:flex;align-items:center;white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x0.5 Attack Speed, x3 Weapon Damage</span>`;}
  if (item.prefix1 === `Echoing`) {prefix1 = `<span style="display:flex;align-items:center;white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+1 Extra Attack, x0.5 Weapon Damage</span>`;}
  if (item.prefix1 === `Masterful`) {prefix1 = `<span style="display:flex;align-items:center;white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x2 Weapon Skill Chance, x0.5 Weapon Skill Damage</span>`;}
  if (item.prefix1 === `Technical`) {prefix1 = `<span style="display:flex;align-items:center;white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x2 Weapon Skill Damage, x0.5 Weapon Skill Chance</span>`;}
  if (item.prefix1 === `Recursive`) {prefix1 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x0.3 weapon attack speed, +4 extra attacks</span>`;}

  //t2
  if (item.prefix2 === `Runic`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+1 Extra Weapon Skill Attack</span>`;}
  if (item.prefix2 === `Kingslaying`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x1.2 Weapon Damage</span>`;}
  if (item.prefix2 === `Double`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+1 Extra Attack</span>`;}
  if (item.prefix2 === `Accelerating`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x1.15 Attack Speed</span>`;}
  if (item.prefix2 === `Chancemaking`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x1.5 Weapon Skill Chance</span>`;}
  if (item.prefix2 === `Titanic`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x1.5 Weapon Skill Damage</span>`;}

  //t3
  if (item.prefix3 === `THE`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+2 Extra Weapon Skill Attacks</span>`;}
  if (item.prefix3 === `Ultimate`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+2 Extra Attacks</span>`;}
  if (item.prefix3 === `Final`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x2 Weapon Skill Damage</span>`;}
  if (item.prefix3 === `Polychrome`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+1 Extra Attack, +1 Extra Weapon Skill Attack</span>`;}
  if (item.prefix3 === `Godslaying`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x1.5 Weapon Damage</span>`;}
 
  //if (item.prefix2 === `Vampiric`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">1/2 chance to steal life</span>`;}
  //if (item.prefix2 === `Fulgurant`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">1/2 chance to chain lightning</span>`;}
  //if (item.prefix2 === `Shackled`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">1/2 chance to auric smth</span>`;}

  //t5
  if (weaponPrefix5.includes(item.prefix5)) {
    prefix5 = `<span style="display:flex;align-items:center;white-space: nowrap; color:magenta">👾 ${item.prefix5}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:cyan;"></span>`;
    if (chance(1/7)) {prefix5 = `<span style="display:flex;align-items:center;white-space: nowrap; color:magenta">👾 ${item.prefix5}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:cyan;">while(<DATA>){/^[!#=\/]/&&next;@ghijkl=split/[%\s\d\r\n\</span>`;}
    if (chance(1/7)) {prefix5 = `<span style="display:flex;align-items:center;white-space: nowrap; color:magenta">👾 ${item.prefix5}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:cyan;">@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@</span>`;}
    if (chance(1/7)) {prefix5 = `<span style="display:flex;align-items:center;white-space: nowrap; color:magenta">👾 ${item.prefix5}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:cyan;"> ** IDLE Internal Exception:    File "2.7/lib/python2.7/idlelib/run.py", line 325, in runcode</span>`;}
    if (chance(1/7)) {prefix5 = `<span style="display:flex;align-items:center;white-space: nowrap; color:magenta">👾 ${item.prefix5}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:cyan;">0x80040702, failed to lo<span style="color:coral">ad DLL</span></span>`;}
  }




 

  //armor

  //t1
  if (item.prefix1 === `Resonant`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 5% Elemental Bonus</span>`;}
  if (item.prefix1 === `Feral`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 5% Nature Bonus</span>`;}
  if (item.prefix1 === `Veiled`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 5% Occult Bonus</span>`;}
  if (item.prefix1 === `Flameproof`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 5% Elemental Resist</span>`;}
  if (item.prefix1 === `Brambled`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 5% Nature Resist</span>`;}
  if (item.prefix1 === `Warded`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 5% Occult Resist</span>`;}

  
  //t2
  if (item.prefix2 === `Bound`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 10% Elemental Bonus</span>`;}
  if (item.prefix2 === `Infused`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 10% Nature Bonus</span>`;}
  if (item.prefix2 === `Somber`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 10% Occult Bonus</span>`;}
  if (item.prefix2 === `Aligned`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 10% Elemental Resist</span>`;}
  if (item.prefix2 === `Shamanistic`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 10% Nature Resist</span>`;}
  if (item.prefix2 === `Sneaky`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 10% Occult Resist</span>`;}

  //t3
  //if (item.prefix3 === `Lucky`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+15% Luck</span>`;}
  //if (item.prefix3 === `Lazaro`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+1 revive (can stack)</span>`;}

  if (item.prefix3 === `Arch`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 15% Elemental Bonus</span>`;}
  if (item.prefix3 === `Primal`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 15% Nature Bonus</span>`;}
  if (item.prefix3 === `Lunar`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 15% Occult Bonus</span>`;}
  if (item.prefix3 === `Primordial`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 15% Elemental Resist</span>`;}
  if (item.prefix3 === `Primeval`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 15% Nature Resist</span>`;}
  if (item.prefix3 === `Radiant`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 15% Occult Resist</span>`;}

  //trinket
  //t1
  if (item.prefix1 === `Heirloom`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x2 Trinket Power</span>`;}
  if (item.prefix1 === `Hexed`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x1.5 Trinket Skill Chance</span>`;}
  if (item.prefix1 === `Voodoo`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x2 Trinket Skill Chance, x0.5 Trinket Power</span>`;}
  if (item.prefix1 === `Mystic`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">x3 Trinket Power, x0.5 Trinket Skill Chance</span>`;}


  //misc
  //t1
  if (item.prefix1 === `Jagged`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 10% Thorns</span>`;}
  if (item.prefix1 === `Drowsy`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 5% Offline Bonus</span>`;} 
  if (item.prefix1 === `Heartfelt`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 10% Clicking Power</span>`;}
  //if (item.prefix1 === `Enchanted`) {prefix1 = `<span style="display:flex;align-items:center; white-space: nowrap;">⭐ ${item.prefix1}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 5% Spellpower</span>`;}

  if (item.prefix2 === `Widsithing`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 10% Exp Bonus</span>`;}
  if (item.prefix2 === `Medical`) {prefix2 = `<span style="display:flex;align-items:center;white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 10% Healing Bonus</span>`;}
  if (item.prefix2 === `Spiked`) {prefix2 = `<span style="display:flex;align-items:center; white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 20% Thorns</span>`;}
  if (item.prefix2 === `Sleepy`) {prefix2 = `<span style="display:flex;align-items:center; white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 10% Offline Bonus</span>`;} 
  if (item.prefix2 === `Hopeful`) {prefix2 = `<span style="display:flex;align-items:center; white-space: nowrap;">✨ ${item.prefix2}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 20% Clicking Power</span>`;}
  
  if (item.prefix3 === `Lucky`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 15% Luck</span>`;}
  if (item.prefix3 === `Critical`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 10% Crit Chance</span>`;}
  if (item.prefix3 === `Lazaro`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 1 Extra Life</span>`;}
  if (item.prefix3 === `Radioactive`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 30% Thorns</span>`;}
  if (item.prefix3 === `Dreamy`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 15% Offline Bonus</span>`;} 
  if (item.prefix3 === `Clicky`) {prefix3 = `<span style="display:flex;align-items:center;white-space: nowrap;">🌠 ${item.prefix3}&nbsp;&nbsp;<div class="separator"></div></span><span style="color:#1eff00;">+ 30% Clicking Power</span>`;}
  
  
  
  
  return prefix1+prefix2+prefix3+prefix4+prefix5
}



function returnEquipSlotIcon(slot){

return `img/sys/${slot.toLowerCase()}Slot.png`





}


function returnUpgradeLevelStars(level){


  if (level===0) return `<span style="color:gray">✦✦✦✦✦✦</span>`
  if (level===1) return `<span style="color:#8c7fff">✦</span><span style="color:gray">✦✦✦✦✦</span>`
  if (level===2) return `<span style="color:#D97FFF">✦✦</span><span style="color:gray">✦✦✦✦</span>`
  if (level===3) return `<span style="color:#FF927F">✦✦✦</span><span style="color:gray">✦✦✦</span>`
  if (level===4) return `<span style="color:#C1FF7F">✦✦✦✦</span><span style="color:gray">✦✦</span>`
  if (level===5) return `<span style="color:#3EFFD9">✦✦✦✦✦</span><span style="color:gray">✦</span>`
  if (level===6) return `<span style="animation:colorRainbow 8s infinite">✦✦✦✦✦✦</span>`


}

function returnPrefixName(item){ 
  if (item.prefix5 !== undefined) return `<span class="prefixT5">${item.prefix5}</span>`;
  if (item.prefix4 !== undefined) return `<span class="prefixT4">${item.prefix4}</span>`;
  if (item.prefix3 !== undefined) return `<span class="prefixT3">${item.prefix3}</span>`;
  if (item.prefix2 !== undefined) return `<span class="prefixT2">${item.prefix2}</span>`;
  if (item.prefix1 !== undefined) return `<span class="prefixT1">${item.prefix1}</span>`;


  //if (weaponPrefix5.includes(prefix)) return `<span class="prefixT5">${prefix.split('').map(letra => Math.random() < 0.25 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : letra).join('')}</span>`
  return ""
}

function returnRarity(item) {


  let color = "rgb(155, 155, 155)"
  let itemslot = ""
  if (item.slot!==undefined) itemslot = eval('equipped' + item.slot);

  if (item.slot === `Weapon` && equippedWeapon!==undefined){

    if (equippedWeapon.finalDamage()<item.finalDamage()) color = "#62C347"
    if (equippedWeapon.finalDamage()>item.finalDamage()) color = "#CC444C"
  
  }

  if (item.baseHp !== undefined && itemslot!==undefined){

    if (itemslot.finalHp()<item.finalHp()) color = "#62C347"
    if (itemslot.finalHp()>item.finalHp()) color = "#CC444C"
  
  }


  if (item.slot === "Offhand" && item.div !== undefined) { 
    return `${returnQualityName(item.quality)}<br><span class="tooltipStat" style="color:${color}">${beautify(item.uses)}/${beautify(item.initialUses)}
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" fill-rule="evenodd" d="m261.695 75.809l-5.246-1.142l-171.115 37.281V236.22l.273 11.328c4.7 96.674 69.051 154.562 117.399 184.636l2.571 1.393l71.533-166.91h-95.777zm-18.232 377.68l.859.384l5.725 2.379l6.402 2.415l6.126-2.308l12.415-5.365l8.181-3.936l9.239-4.811l15.418-8.92l11.037-7.124c48.792-32.968 108.311-93.445 107.75-192.113l-.119-22.879l-.05-83.956l.221-15.532l-122.565-26.682L245.593 224h96.223z" clip-rule="evenodd"/></svg>
    </span>`
  }
  

if (item.slot === `Weapon`) return `${returnQualityName(item.quality)}<br><span class="tooltipStat" style="color:${color}">${beautify(item.finalDamage())}
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M19.071 3.929a1 1 0 0 1 1 1v5.657a1 1 0 0 1-.405.804l-7.198 5.32l.946.947a1 1 0 0 1 0 1.414L12 20.485a1 1 0 0 1-1.154.187l-2.184-1.091l-1.612 1.611a1 1 0 0 1-1.414 0l-2.828-2.828a1 1 0 0 1 0-1.414l1.611-1.612l-1.091-2.184A1 1 0 0 1 3.515 12l1.414-1.414a1 1 0 0 1 1.414 0l.947.946l5.32-7.198a1 1 0 0 1 .804-.405z"/></g></svg>
</span>`

if (item.hp !== undefined) return `${returnQualityName(item.quality)}<br><span class="tooltipStat" style="color:${color}">${beautify(item.finalHp())}
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501C7.5.825 2 4.274 2 9.137"/></svg>
</span>`



return `${returnQualityName(item.quality)}`

}


document.addEventListener('mouseout', function(event) {
const itemDiv = event.target.parentElement;
const itemDivNoParent = event.target;

  if (itemDiv.item || itemDivNoParent.item) { 
    resetTooltip() 
    if (itemDiv.item && itemDiv.item.slot!==undefined)   did("stampMenu").style.display="none";
  }
});




let equippedWeapon = undefined
let equippedHead = undefined
let equippedChest = undefined
let equippedLegs = undefined
let equippedFeet = undefined
let equippedRing = undefined
let equippedTrinket = undefined
let equippedLuma = undefined
let equippedOffhand = undefined

let equippedItems = [equippedHead, equippedChest, equippedLegs, equippedFeet];


function equipGear(){


  did("playerWeapon").src = `img/src/projectiles/none.png`;
  did("playerWeaponEnchantT3").style.display = "none"
  did("playerWeaponEnchantT2").style.display = "none"
  did("playerWeaponEnchantGlitch").style.display = "none"

  itemInventory.forEach((item) => {
    eval('equipped' + item.slot + ' = undefined');
  })


  itemInventory.forEach((item) => {

if (item.loadouts!==undefined && item.loadouts.includes(rpgPlayer.currentLoadout)){

  if (item.slot === `Weapon`) { 
    did("playerWeapon").src = `img/src/weaponModels/I${item.img}.png`;
    did("playerWeapon").style.animation = `none`
    did("playerWeapon").style.filter = "none"

    if (item.prefixTier===3) {
      did("playerWeapon").style.animation = `rainbowFilter infinite 10s linear`
      did("playerWeaponEnchantT3").style.display = "flex" 
      did("playerWeaponEnchantT3").style.maskImage = `url(img/src/weaponModels/I${item.img}.png)`
    } 

    if (item.prefixTier===5) {
      did("playerWeaponEnchantGlitch").style.display = "flex" 
      did("playerWeaponEnchantGlitch").style.maskImage = `url(img/src/weaponModels/I${item.img}.png)`
    } 

    if (item.prefixTier===2) {
      did("playerWeaponEnchantT2").style.display = "flex"
      did("playerWeaponEnchantT2").style.maskImage = `url(img/src/weaponModels/I${item.img}.png)`

      document.documentElement.style.setProperty('--weapon-paint', item.paint);
      did("playerWeapon").style.animation = `tier2Paint alternate infinite 10s`
    }
    if (item.prefixTier===1) did("playerWeapon").style.filter = `hue-rotate(${item.paint}deg)`
  }




  eval('equipped' + item.slot + ' = item');



}
  });






  equippedItems = [equippedHead, equippedChest, equippedLegs, equippedFeet, equippedLuma, equippedWeapon, equippedRing, equippedTrinket, equippedOffhand];
  tierCheck();
  statsUpdate();
  updateStatsUI();
  updateOfflineIndicator()


}

let tierBonus = function(){}

function tierCheck(){


  did("rpgPlayerImg").src = "img/src/armor/A0.png";
  did("playerHat").src = "img/src/projectiles/none.png";
  tierBonus = function(){}
  currentSet = "none"


  if (tierMatch(equippedItems, tierClothItems,3)) {
    did("rpgPlayerImg").src = "img/src/armor/A1.png";
    tierBonus = function(){ stat.DodgeChance+=10}
  }


  if (tierMatch(equippedItems, tierExplorerItems,3)) {
    did("rpgPlayerImg").src = "img/src/armor/A3.png";
    currentSet = "explorer"    
  }

  if (tierMatch(equippedItems, tierTigerItems,3)) {
    did("rpgPlayerImg").src = "img/src/armor/A4.png";
    currentSet = "tiger"    
  }

  if (tierMatch(equippedItems, tierMonkItems,2)) {
    tierBonus = function(){ stat.ExtraActions+=1}
    updateCombatActions()
  }



  equipHat()

  
}

function tierMatch(equippedItems, requiredItems, minRequired) {
  // Filtrar los items equipados que no son undefined y obtener sus propiedades img
  const equippedImages = equippedItems
    .filter(item => item !== undefined)
    .map(item => item.img);

  // Contar coincidencias con los items requeridos
  const matches = requiredItems.filter(img => equippedImages.includes(img)).length;

  // Verificar si el número de coincidencias es mayor o igual a minRequired
  return matches >= minRequired;
}

function tierCount(equippedItems, requiredItems, minRequired) {
  // Filtrar items equipados definidos y obtener sus propiedades img
  const equippedImages = equippedItems
    .filter(item => item !== undefined)
    .map(item => item.img);

  // Contar coincidencias con los items requeridos
  const matches = requiredItems.filter(img => equippedImages.includes(img)).length;
  const totalNeeded = minRequired || requiredItems.length;

  return `${matches}/${totalNeeded}`;
}




function flyingLoot(rarity){

    //if (rarity===`uncommon`)
  
    if (rarity===undefined) particleTrackers.push(new ParticleItemGot())
    if (rarity===`Uncommon`) particleTrackers.push(new TrackerItemGot(undefined, undefined, { trailParticle: ParticleItemGot2}))
  
    setTimeout(() => {
      voidAnimation(`inventoryMainPageSquare`, `gelatine 0.3s 1`)
    }, 1000);
  
  }


  isQuickItemAccessOpen = false
function openQuickAccessMenu(){

  playSound("audio/button8.mp3")


  updateQuickItemAcessMenu()

  did("quickItemAccess").style.animation = "";
  void did("quickItemAccess").offsetWidth;
  did("quickItemAccess").style.animation = "gelatine 0.3s 1 ease";


  if (!isQuickItemAccessOpen) {

  did("quickItemTooltip").style.display = "flex";


  did("quickItemTooltip").style.animation = "";
  void did("quickItemTooltip").offsetWidth;
  did("quickItemTooltip").style.animation = "interactableTooltip 0.3s 1 ease,interactableTooltipIdleHigh 7s infinite ease";



repositionQuickAccessMenu()
repositionQuickAccessMenu()
repositionQuickAccessMenu()
  

  isQuickItemAccessOpen = true

  } else {

      did("quickItemTooltip").style.animation = "";
      void did("quickItemTooltip").offsetWidth;
      did("quickItemTooltip").style.animation = "interactableTooltip 0.2s 1 ease reverse";
      did("quickItemTooltip").style.animationFillMode = "forwards";


      isQuickItemAccessOpen = false

  }

}

function repositionQuickAccessMenu(){

  var movingDiv = did("quickItemTooltip");
  var referenceDiv = did("quickItemAccess");
  var referenceRect = referenceDiv.getBoundingClientRect();
  const newLeft = referenceRect.left/(stats.zoomLevel/100) + (referenceRect.width - movingDiv.offsetWidth) / 2;
  const newTop = referenceRect.top/(stats.zoomLevel/100) - movingDiv.offsetHeight;
  movingDiv.style.left = `${newLeft - 0}px`;
  movingDiv.style.top = `${newTop - 30}px`;
}

function updateQuickItemAcessMenu(){


  var movingDiv = did("quickItemTooltip");
  var referenceDiv = did("quickItemAccess");
  var referenceRect = referenceDiv.getBoundingClientRect();
    const newLeft = referenceRect.left/(stats.zoomLevel/100) + (referenceRect.width - movingDiv.offsetWidth) / 2;
    const newTop = referenceRect.top/(stats.zoomLevel/100) - movingDiv.offsetHeight;
    movingDiv.style.left = `${newLeft - 0}px`;
    movingDiv.style.top = `${newTop - 30}px`;



  did("quickItemTooltip").innerHTML = "";

  itemInventory.forEach((item, index) => {


    const itemDiv = document.createElement("div");
    
    
    if (item.quickAccess){

      let itemCount = ""
      if (item.isStackable && item.constructor.count > 0) itemCount = `<div id="${item.img}Count" class="inventoryItemCount">${ item.constructor.count }</div>`
  

      let itemCDScreen = ""
    if (item.constructor.cd){

      const percentage = (((item.constructor.cd-1) / 10) * 100);


      const resultado = item.constructor.cd < 60 ? item.constructor.cd : Math.floor(item.constructor.cd / 60) + "m";
      itemCDScreen = `<div class="itemCooldownTimerText">${resultado}</div> <div class="itemCooldownTimer" style="height:${percentage}"></div>`
    } 
  
      itemDiv.innerHTML = ` ${itemCDScreen} ${itemCount} <img src="img/src/items/I${item.img}.jpg">`;
      itemDiv.className = "inventoryItem";
      itemDiv.item = item; 
      itemDiv.item.index = index; 
      itemDiv.tag = "quickUse"; 
      //item.div = itemDiv
      item.index = index
  
      itemDiv.style.outline = `0.2rem solid ${returnQualityColor(item.quality)}`; 
  
      
      did("quickItemTooltip").appendChild(itemDiv);

      
    }





  })

  if (!document.getElementById('quickItemTooltip')?.children.length) did("quickItemTooltip").innerHTML = `<img src="img/src/icons/emptyPocket.png" id="emptyQuickItemTooltip">`;



}


isLoadoutMenuOpen = false
function toggleLoadoutMenu(){

  playSound("audio/button2.mp3")


  updateQuickItemAcessMenu()

  did("loadoutButton").style.animation = "";
  void did("loadoutButton").offsetWidth;
  did("loadoutButton").style.animation = "gelatine 0.3s 1 ease";


  if (!isLoadoutMenuOpen) {


  did("loadoutBgCover").style.display = "flex";


  did("loadoutMenu").style.display = "flex";
  did("loadoutMenu").style.animation = "";
  void did("loadoutMenu").offsetWidth;
  did("loadoutMenu").style.animation = "interactableTooltip 0.3s 1 ease,interactableTooltipIdleHigh 7s infinite ease";



  var movingDiv = did("loadoutMenu");
  var referenceDiv = did("loadoutButton");
  var referenceRect = referenceDiv.getBoundingClientRect();
  
  // Calcula el centro del lado derecho de referenceDiv
  const newLeft = referenceRect.right;
  const newTop = referenceRect.top + (referenceRect.height - movingDiv.offsetHeight) / 2;
  
  // Aplica la posición a movingDiv
  movingDiv.style.left = `${newLeft + 25}px`;
  movingDiv.style.top = `${newTop}px`;
  

  isLoadoutMenuOpen = true

  } else {



      did("loadoutMenu").style.animation = "";
      void did("loadoutMenu").offsetWidth;
      did("loadoutMenu").style.animation = "shrinkFadeOut 0.2s 1 ease";
      did("loadoutMenu").style.animationFillMode = "forwards";


      isLoadoutMenuOpen = false

  }

}


did("loadoutBgCover").addEventListener('click', function() {

  did("loadoutBgCover").style.display = "none";
  did("loadoutMenu").style.animation = "";
  void did("loadoutMenu").offsetWidth;
  did("loadoutMenu").style.animation = "shrinkFadeOut 0.2s 1 ease";
  did("loadoutMenu").style.animationFillMode = "forwards";


  isLoadoutMenuOpen = false

})

rpgPlayer.currentLoadout = 1



function lootTable(table, source){

  for (i in table) {

    if (chance(1/table[i].c)) {

    if (table[i].l !== undefined && !table[i].l()) continue //condition for dropping

    const id = eval(i)
    const item = new id()

    let isHidden = ""
    if (source==="hidden") isHidden = "noPopup"

    if (source==="container") {spawnItem(eval(i), table[i].a, "container")}
    if (source==="offline") {spawnItem(eval(i), table[i].a, "offline")}
    else spawnItem(eval(i), table[i].a,isHidden)

    
    if (document.hasFocus() && source==="enemy") flyingLoot()

    //if (itemInventory.some(existingItem => areItemsEqual(existingItem, item))) continue

    //if (source!=="hidden") createPopup(`<span style="color:${returnQualityColor(item.quality)}; display:flex; justify-content:center; align-items:center;background:transparent;"><img src="img/src/items/I${item.img}.jpg" style="height:1.3rem; width:1.3rem;margin-right:0.6rem;border-radius:0.2rem"> ${item.name} got!</span>`)


}
}
}



function dropMonsterCard(){

  if (!unlocks.bestiary) return


  const item = new MonsterCard()


  if (enemies[stats.currentEnemy].card1===undefined) return


    if (!enemies[stats.currentEnemy].card1.got){
      item.init()
      if (itemInventory.some(existingItem => areItemsExact(existingItem, item))) { return }
      itemInventory.push(item)
      updateInventory()
      createPopup(`<span style="color:${returnQualityColor(item.quality)}; display:flex; justify-content:center; align-items:center;background:transparent;"><img src="img/src/items/I${item.img}.jpg" style="height:1.3rem; width:1.3rem;margin-right:0.6rem;border-radius:0.2rem">${item.name} <span style="color:lawngreen;background:transparent; margin-left:0.3rem">got! </span></span>`)
      return
    }

    if (!enemies[stats.currentEnemy].card2.got && chance(1/4)){
      item.init(2)
      if (itemInventory.some(existingItem => areItemsExact(existingItem, item))) { return }
      itemInventory.push(item)
      updateInventory()
      createPopup(`<span style="color:${returnQualityColor(item.quality)}; display:flex; justify-content:center; align-items:center;background:transparent;"><img src="img/src/items/I${item.img}.jpg" style="height:1.3rem; width:1.3rem;margin-right:0.6rem;border-radius:0.2rem">${item.name} <span style="color:lawngreen;background:transparent; margin-left:0.3rem">got! </span></span>`)
      return

    }

    if (!enemies[stats.currentEnemy].card3.got && chance(1/7)){
      item.init(3)
      if (itemInventory.some(existingItem => areItemsExact(existingItem, item))) { return }
      itemInventory.push(item)
      updateInventory()
      createPopup(`<span style="color:${returnQualityColor(item.quality)}; display:flex; justify-content:center; align-items:center;background:transparent;"><img src="img/src/items/I${item.img}.jpg" style="height:1.3rem; width:1.3rem;margin-right:0.6rem;border-radius:0.2rem">${item.name} <span style="color:lawngreen;background:transparent; margin-left:0.3rem">got! </span></span>`)
      return

    }








}




document.getElementById('inventoryListing').addEventListener('scroll', () => {inventoryCulling()  });

  function inventoryCulling(){

    if (!settings.disableCulling){

    const alturaContenedor = document.getElementById('inventoryListing').clientHeight;
    const alturaViewport = window.innerHeight;
    const porcentajeVisible = (alturaViewport / alturaContenedor) * 100;

    const items = document.getElementById('inventoryListing').querySelectorAll('.inventoryItem');
    const emtpyitems = document.getElementById('inventoryListing').querySelectorAll('.emptyInventoryItem');
    items.forEach(item => {
      const posicionItem = item.getBoundingClientRect().top;
      if (posicionItem > alturaViewport * 0.95 || posicionItem < -item.clientHeight || posicionItem < alturaViewport * 0.60 || posicionItem < -item.clientHeight) {
        item.style.visibility = "hidden";
      } else {
        item.style.visibility = "visible";
      }
    });


    emtpyitems.forEach(item => {
      const posicionItem = item.getBoundingClientRect().top;
      if (posicionItem > alturaViewport * 0.95 || posicionItem < -item.clientHeight || posicionItem < alturaViewport * 0.60 || posicionItem < -item.clientHeight) {
        item.style.visibility = "hidden";
      } else {
        item.style.visibility = "visible";
      }
    });





  }

  
  }

  



document.addEventListener('DOMContentLoaded', inventoryInitialisation);

function inventoryInitialisation(){
  updateInventory();
  changeLoadout();

}
