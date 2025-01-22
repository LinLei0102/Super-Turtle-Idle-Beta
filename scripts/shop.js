
let areaShop = {}


areaShop.A1I1 = {
    item: new FoodLizard(),
    price: 200,
    //effect : function() {},
  };

areaShop.A1I2 = {
  item: new FlowerGarland(),
  price: 2000,
   //condition : function() { if (areas[stats.currentArea].shopLevel>=3) return true },
};

areaShop.A1I3 = {
  item: new MysteriousPackage(),
  price: 600,
  stock: 1,
};

areaShop.A1I4 = {
  item: new ChanceDie1(),
  price: 500,
  stock: 5,
};

areaShop.A1I5 = {
  item: new WoodenBow(),
  price: 2000,
};

areaShop.A1I10 = {
  item: new AreaChest1Key(),
  price: 1000,
  stock: 10,
};

areaShop.A1I11 = {
  item: new WoodenShield(),
  price: 2000,
};

areaShop.A1I6 = {
  item: new MedicatedBandaid(),
  price: 2500,
  condition : function() { if (areas[stats.currentArea].shopLevel>=2) return true },
};

areaShop.A1I7 = {
  item: new FoodCheese(),
  price: 1900,
  condition : function() { if (areas[stats.currentArea].shopLevel>=4) return true },
};

areaShop.A1I8 = {
  item: new SkullRing(),
  price: 50000,
  condition : function() { if (areas[stats.currentArea].shopLevel>=6) return true },
};

areaShop.A1I9 = {
  item: new MoonNecklace(),
  price: 15000,
  condition : function() { if (stats.currentWeather === 'night') return true },
};

//12 is pickaxe






/*
function createShopItem() {
    for (let si in shopItems) {
      if (si.startsWith(stats.currentArea)){
      if (!did(shopItems[si].id + "shopItem")) {
        const areadiv = document.createElement("div");
        areadiv.id = shopItems[si].id + "shopItem";
        areadiv.innerHTML = '<div class=restockIcon id="' + si + 'restock" style="display:none">🔄</div> <div class=soldOut id="' + shopItems[si].id + 'itemTag">SOLD OUT</div><img id="' + si + 'displayItem" src="img/src/items/' + items[shopItems[si].item].img + '.jpg">';
        did("shopTooltip").appendChild(areadiv);
        areadiv.className = "shopBox";
  
  
        if ("restock" in shopItems[si]) did(si + 'restock').style.display = "inline"
  
        did(shopItems[si].id + "displayItem").style.outline = returnQualityColor(items[shopItems[si].item].quality) +" solid 0.15rem";
        //tooltip here
        shopItemButton(shopItems[si]);
        tooltipShopItem(shopItems[si], si);
      }
  
  
  
  
      if (shopItems[si].unlocked === false) {
        did(shopItems[si].id + "itemTag").style.display = "flex";
        did(shopItems[si].id + "itemTag").innerHTML = "SOON";
        did(shopItems[si].id + "displayItem").style.filter = "grayscale(0.8)";
      } else { did(shopItems[si].id + "itemTag").style.display = "none"; } 
  
      if (shopItems[si].stock < 1 && shopItems[si].unlocked !== false) {
        did(shopItems[si].id + "itemTag").style.display = "flex";
        did(shopItems[si].id + "itemTag").innerHTML = "SOLD OUT";
      } else if (shopItems[si].unlocked !== false) {did(shopItems[si].id + "itemTag").style.display = "none";}
  
      
  
      did(shopItems[si].id + "displayItem").style.filter = "grayscale(0)"
      
      
        
      }
  
  
      
    }
  } 

  */

  function updateItemShop() {

    repositionShopWindow()

    did("shopTooltip").innerHTML = ""

    for (let i in areaShop) {
      if (i.startsWith(stats.currentArea)){
      if (!did(i + "shopItem")) {

        if (areaShop[i].condition!==undefined) if (!areaShop[i].condition()) continue
        if (areaShop[i].stock<=0) continue

        const div = document.createElement("div");
        div.id = i + "shopItem";
        div.innerHTML = '<div class=restockIcon id="' + i + 'restock" style="display:none">🔄</div> <div class=soldOut id="' + i + 'itemTag">SOLD OUT</div><img id="' + i + 'displayItem" src="img/src/items/I' + areaShop[i].item.img + '.jpg">';
        did("shopTooltip").appendChild(div);
        div.className = "shopBox";
        div.item = areaShop[i].item
        div.tag = "shop"
        div.tag2 = "shopArea"
        div.shopID = i

  
        //if ("restock" in shopItems[si]) did(si + 'restock').style.display = "inline"
  
        did(i + "displayItem").style.outline = returnQualityColor(areaShop[i].item.quality) +" solid 0.15rem";
        //tooltip here
        //shopItemButton(shopItems[si]);
        //tooltipShopItem(shopItems[si], si);
      }
  
  
  /*
  
      if (shopItems[si].unlocked === false) {
        did(shopItems[si].id + "itemTag").style.display = "flex";
        did(shopItems[si].id + "itemTag").innerHTML = "SOON";
        did(shopItems[si].id + "displayItem").style.filter = "grayscale(0.8)";
      } else { did(shopItems[si].id + "itemTag").style.display = "none"; } 
  
      if (shopItems[si].stock < 1 && shopItems[si].unlocked !== false) {
        did(shopItems[si].id + "itemTag").style.display = "flex";
        did(shopItems[si].id + "itemTag").innerHTML = "SOLD OUT";
      } else if (shopItems[si].unlocked !== false) {did(shopItems[si].id + "itemTag").style.display = "none";}
  
      
  
      did(shopItems[si].id + "displayItem").style.filter = "grayscale(0)"

      */
      
      
        
      }
  
  
      
    }
  } 













  updateItemShop();


  function buySelectedItem(){


    const itemDiv = contextSelectedItem
    const item = contextSelectedItem.item
    let toBuy = Math.max(1,itemContextBuyInput.value)



  
    if (contextSelectedItem.tag2==="shopArea"){

      let finalPrice = areaShop[contextSelectedItem.shopID].price
      if (areas[stats.currentArea].shopLevel>=3) finalPrice = areaShop[contextSelectedItem.shopID].price * 0.75
      if (areas[stats.currentArea].shopLevel>=5) finalPrice = areaShop[contextSelectedItem.shopID].price * 0.5
  
    
      if (toBuy>areaShop[contextSelectedItem.shopID].stock) {playSound("audio/thud.mp3"); return}






      




  
      if (rpgPlayer.coins>=finalPrice*toBuy) {
        rpgPlayer.coins-=finalPrice*toBuy
        successSell()

        if (areaShop[contextSelectedItem.shopID].stock) areaShop[contextSelectedItem.shopID].stock-=toBuy
        

        updateItemShop()
        if (areaShop[contextSelectedItem.shopID].stock===0)  itemContextMenuBegone();

        if (item.constructor.count===0)  itemContextMenuBegone();
  
    
      let pokomuni = document.getElementById('pokomuni');
      let pokorect = pokomuni.getBoundingClientRect();
  
        particleTrackers.push(new ParticleItemGot(undefined, undefined, { 
          playerCenterX :  pokorect.left - containerRect.left + pokorect.width / 2,
          playerCenterY :  pokorect.top - containerRect.top + pokorect.height / 2,
         }))
      
         if (toBuy>9){
          particleTrackers.push(new ParticleItemGot(undefined, undefined, { 
            playerCenterX :  pokorect.left - containerRect.left + pokorect.width / 2,
            playerCenterY :  pokorect.top - containerRect.top + pokorect.height / 2,
           }))
           particleTrackers.push(new ParticleItemGot(undefined, undefined, { 
            playerCenterX :  pokorect.left - containerRect.left + pokorect.width / 2,
            playerCenterY :  pokorect.top - containerRect.top + pokorect.height / 2,
           }))
         }
  
  
         voidAnimation("pokomuni", "gelatineHigh 0.6s 1")
  
         setTimeout(() => {
           voidAnimation(`inventoryMainPageSquare`, `gelatine 0.3s 1`)
           voidAnimation("pokomuni", "breathingHigh 5s infinite ease-out")
         }, 1200);
  
  
      } else {playSound("audio/thud.mp3");}
      
    }
  
    if (contextSelectedItem.tag2==="shopAchievement"){
  
      if (rpgPlayer.scutes>=achievementShop[contextSelectedItem.shopID].price*toBuy) {

        rpgPlayer.scutes-=achievementShop[contextSelectedItem.shopID].price*toBuy
        rpgPlayer.sheddings+=achievementShop[contextSelectedItem.shopID].price*toBuy

        successSell("achievementShop")
  
  
        selectedItemRect = itemDiv.getBoundingClientRect();
  
        itemDiv.style.animation = "";
        void itemDiv.offsetWidth;
        itemDiv.style.animation = "gelatineHigh 0.3s 1, flashNoScale 0.5s 1";
        particleTrackers.push(new ParticleSellPulse());
      } else {playSound("audio/thud.mp3","all");}
      
    }
  
  
  
  
    function successSell(source){

      playSound("audio/coins.mp3","all")
      playSound("audio/throw.mp3","all")
      stats.boughtItems+=toBuy
  
      updateCounters()



      if (source==="achievementShop") {spawnItem(item.constructor, toBuy, "container"); return}
      spawnItem(item.constructor, toBuy, "noPopup")
      
  
  
    }
  
  
  
  
  }




  
  stats.boughtItems = 0;
  
  function shopItemButton(area) {
    if (did(area.id + "shopItem")) {
      did(area.id + "shopItem").addEventListener("click", function () {
  
        if("currency" in area){
  
          if ( sellMode && items[area.currency].count >= eval(area.price)*10 && (area.stock > 9 || area.stock==="∞") && area.unlocked !== false && items[area.item].count!==items[area.item].max ) {
  
            playSound("audio/button3.mp3"); 
            items[area.currency].count -= eval(area.price)*10;
            if (area.stock !=="∞") {area.stock-=10;}
            items[area.item].count+=10;
            stats.boughtItems+=10;
            did(area.id + "shopItem").style.animation = "";
            void did(area.id + "shopItem").offsetWidth;
            did(area.id + "shopItem").style.animation = "buyAnimation 0.2s 1";
            updateCounters();
            createShopItem();
            did("tooltipPrice").innerHTML = "Stock: " + shopItems[area.id].stock;
    
          } else if ( items[area.currency].count >= eval(area.price) && (area.stock > 0 || area.stock==="∞") && area.unlocked !== false && items[area.item].count!==items[area.item].max) {
            
            playSound("audio/button3.mp3"); 
            items[area.currency].count -= eval(area.price);
            if (area.stock !=="∞") {area.stock--;}
            items[area.item].count++;
            stats.boughtItems++;
            did(area.id + "shopItem").style.animation = "";
            void did(area.id + "shopItem").offsetWidth;
            did(area.id + "shopItem").style.animation = "buyAnimation 0.2s 1";
            updateCounters();
            createShopItem();
            did("tooltipPrice").innerHTML = "Stock: " + shopItems[area.id].stock;
    
    
          } else {
            
            playSound("audio/thud.mp3"); 
            did(area.id + "shopItem").style.animation = "";
            void did(area.id + "shopItem").offsetWidth;
            did(area.id + "shopItem").style.animation = "noBuyAnimation 0.2s 1";
          }
  
          
  
        } else { //if its just coins
  
        if ( sellMode && rpgPlayer.coins >= eval(area.price)*10 && (area.stock > 9 || area.stock==="∞") && area.unlocked !== false && items[area.item].count!==items[area.item].max ) {
  
          playSound("audio/button3.mp3"); 
          rpgPlayer.coins -= eval(area.price)*10;
          if (area.stock !=="∞") {area.stock-=10;}
          items[area.item].count+=10;
          stats.boughtItems+=10;
          did(area.id + "shopItem").style.animation = "";
          void did(area.id + "shopItem").offsetWidth;
          did(area.id + "shopItem").style.animation = "areaClick 0.4s 1";
          updateCounters();
          createShopItem();
          did("tooltipPrice").innerHTML = "Stock: " + shopItems[area.id].stock;
  
        } else if ( rpgPlayer.coins >= eval(area.price) && (area.stock > 0 || area.stock==="∞") && area.unlocked !== false && items[area.item].count!==items[area.item].max) {
          
          playSound("audio/button3.mp3"); 
          rpgPlayer.coins -= eval(area.price);
          if (area.stock !=="∞") {area.stock--;}
          items[area.item].count++;
          stats.boughtItems++;
          did(area.id + "shopItem").style.animation = "";
          void did(area.id + "shopItem").offsetWidth;
          did(area.id + "shopItem").style.animation = "areaClick 0.4s 1";
          updateCounters();
          createShopItem();
          did("tooltipPrice").innerHTML = "Stock: " + shopItems[area.id].stock;
  
  
        } else {
          
          playSound("audio/thud.mp3"); 
          did(area.id + "shopItem").style.animation = "";
          void did(area.id + "shopItem").offsetWidth;
          did(area.id + "shopItem").style.animation = "noBuyAnimation 0.2s 1";
        }
  
      }
  
  
  addItem()
  
      }
      
      
      
      );
    }
  }

  
did("interactableShopButton").onclick = openShop

var isShopOpen = false

function openShop(){

  playSound("audio/button8.mp3")


  const referenceDiv = did("interactableShopButton");
  const movingDiv = did("shopTooltip");
  const referenceRect = referenceDiv.getBoundingClientRect();

  referenceDiv.style.animation = "";
  void referenceDiv.offsetWidth;
  referenceDiv.style.animation = "gelatine 0.3s 1 ease";

  if (!isShopOpen) {

  movingDiv.style.display = "flex";
  movingDiv.style.animation = "";
  void movingDiv.offsetWidth;
  movingDiv.style.animation = "interactableTooltip 0.3s 1 ease,interactableTooltipIdle 7s infinite ease";

  function miau(){
    const newLeft = referenceRect.left/(stats.zoomLevel/100) + (referenceRect.width - movingDiv.offsetWidth) / 2;
    const newTop = referenceRect.top/(stats.zoomLevel/100) - movingDiv.offsetHeight;
    movingDiv.style.left = `${newLeft - 0}px`;
    movingDiv.style.top = `${newTop - 30}px`;
  }

  miau()
  miau()
  miau()

isShopOpen = true

  } else {

      movingDiv.style.animation = "";
      void movingDiv.offsetWidth;
      movingDiv.style.animation = "interactableTooltip 0.2s 1 ease reverse";
      movingDiv.style.animationFillMode = "forwards";
      isShopOpen = false

  }

}


function repositionShopWindow(){ //this function gets called when a new item gets added or removed from the window



  if (!isShopOpen) return

  setTimeout(() => {
    const referenceDiv = did("interactableShopButton");
    const movingDiv = did("shopTooltip");
    const referenceRect = referenceDiv.getBoundingClientRect();
  
  
    const newLeft = referenceRect.left/(stats.zoomLevel/100) + (referenceRect.width - movingDiv.offsetWidth) / 2;
    const newTop = referenceRect.top/(stats.zoomLevel/100) - movingDiv.offsetHeight;
    movingDiv.style.left = `${newLeft - 0}px`;
    movingDiv.style.top = `${newTop - 30}px`;
  }, 1);

 

}



did("tipJar").addEventListener('click', function() { //context menus

  playSound("audio/button8.mp3")


  if (areas[stats.currentArea].shopLevel<6) did("itemContextMenuButtonTipMenu").style.display = "flex"

    did("tipJarInfo").style.display = "flex"
      
    did("itemContextMenu").style.display = "flex";
    did("itemContextMenu").style.display = "flex";
    did("itemContextMenuScreensaver").style.display = "flex";

    

    const referenceDiv = did("tipJar");
    const movingDiv = did('itemContextMenu');
    const referenceRect = referenceDiv.getBoundingClientRect();
    const tooltipRect = movingDiv.getBoundingClientRect();
    const newLeft = referenceRect.left/ (stats.zoomLevel/100) + (referenceRect.width / 2) - (tooltipRect.width / 2);
    const newTop = (referenceRect.top - tooltipRect.height) / (stats.zoomLevel/100);
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + -10 + 'px';

    

  voidAnimation("tipJar", "gelatine 0.3s 1")
  voidAnimation("itemContextMenu", "interactableTooltipIdleHigh 3s infinite, interactableTooltip 0.3s 1")
  

})

let itemContextTipInputHidden = 0

function tipJar(){

let toAdd = 0
if (itemContextTipInputHidden!=0) toAdd = Math.floor(itemContextTipInputHidden)


//to prevent negative numbers add  && toAdd<=nextShopLevel
if (toAdd != 0 && rpgPlayer.coins>=toAdd){
  areas[stats.currentArea].shopProgress += toAdd;
  rpgPlayer.coins-=toAdd;
  updateCounters()
  playSound("audio/coins.mp3")



  voidAnimation("tipJar", "gelatine 0.3s 1")

  tipJarUpdate();
}

}

let nextShopLevel = areas[stats.currentArea].shopLevel * areas[stats.currentArea].value*6


function tipJarUpdate(){




  if (areas[stats.currentArea].shopProgress>=nextShopLevel){

    areas[stats.currentArea].shopProgress-=nextShopLevel
    areas[stats.currentArea].shopLevel++

    playSound("audio/retro2.mp3")


    voidAnimation("tipJar", "gelatineHigh 0.4s 1")

    divRect = did("tipJar");
    selectedItemRect = divRect.getBoundingClientRect();
    particleTrackers.push(new ParticleSellPulse());

    updateItemShop();



    if (areas[stats.currentArea].shopLevel>5) itemContextMenuBegone()


  }



  nextShopLevel = areas[stats.currentArea].shopLevel * areas[stats.currentArea].value*6

  did("tipJar").innerHTML = `lvl ${areas[stats.currentArea].shopLevel}`

  let levelboon = ""
  if (areas[stats.currentArea].shopLevel===1) levelboon = "Extra Shop Item"
  if (areas[stats.currentArea].shopLevel===2) levelboon = "Better Prices"
  if (areas[stats.currentArea].shopLevel===3) levelboon = "Extra Shop Item"
  if (areas[stats.currentArea].shopLevel===4) levelboon = "Better Prices"
  if (areas[stats.currentArea].shopLevel===5) levelboon = "Extra Shop Item"

  did("tipJarInfo").innerHTML = `<span>${beautify(nextShopLevel-areas[stats.currentArea].shopProgress)} Left</span><div class="separator" style="margin: 0.2rem 0; width: 80%;"></div>${levelboon}`

  if (areas[stats.currentArea].shopLevel>5) did("tipJarInfo").innerHTML = `<span>Max Level<br>Reached</span>`


}tipJarUpdate()


document.addEventListener('DOMContentLoaded', shopInitialisation);

function shopInitialisation(){
  tipJarUpdate()
  
}
