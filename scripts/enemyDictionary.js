


function returnEnemyHp(level){
    //return Math.floor(1000 * Math.pow(1.5, (level-1)))
    return Math.floor(100 * (level*1.5))
}

function returnEnemyAttack(level){
  //return Math.floor(1000 * Math.pow(1.5, (level-1)))


  let baseAtk = 5
  if (level>=6) baseAtk = 6
  if (level>=14) baseAtk = 9

  return Math.floor(baseAtk * (level*1))
}


function dropInfo(id, tag, alt, alt2){

    if (tag==="container" && items[id].gotOnce && alt2!==undefined)  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>❖ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+alt+" ✔️ <FONT COLOR=gray>[1/"+alt2+"]<br>" 
   else if (tag==="container" && alt2!==undefined)  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>❖ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+alt+" <FONT COLOR=gray>[1/"+alt2+"]<br>" 
   
   
   if (tag==="container" && items[id].gotOnce)  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>❖ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+items[id].name+" ✔️ <FONT COLOR=gray> [1/"+alt+"]<br>";
   else if (tag==="container" )  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>❖ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+items[id].name+"<FONT COLOR=gray> [1/"+alt+"]<br>" 
    
   
   if (alt===undefined){
     if (tag==="drop" && items[id].gotOnce)  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>★ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+items[id].name+" ✔️<br>";
     else if (tag==="drop")  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>★ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">?????<br>'
   } else{
     if (tag==="drop" && items[id].gotOnce)  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>★ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+items[id].name+" ✔️ <FONT COLOR=gray>[1/"+alt+"]<br>";
     else if (tag==="drop")  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>★ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">????? <FONT COLOR=gray>[1/'+alt+']<br>'
   }
   
   
   if (tag==="steal" && items[id].gotOnce)  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>✱ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+items[id].name+" ✔️ <FONT COLOR=gray>[Steal]<img src='img/src/talents/TG1B.jpg'><FONT COLOR=gray>["+alt+"]<br>";
   else if (tag==="steal")  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>✱ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">????? <FONT COLOR=gray>[Steal]<img src="img/src/talents/TG1B.jpg"><FONT COLOR=gray>['+alt+']<br>'
   
   return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>★ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+items[id].name;
   
   }


function dropInfo(name,chance,count,context){


    const item = new name()


    let checkmark = ""
    if (item.constructor.timesGot>0)  checkmark = `✔️`

    let countNumber = "";
    if (count>1) countNumber = "x"+count


    if (context === "drop" && item.constructor.timesGot===0) return `<span style="color:${returnQualityColor(item.quality)}">★ <img src="img/src/items/I${item.img}.jpg"> ????? ${countNumber}</span>  <span style="color:gray">[1/${chance}]</span>`

    return `<span style="color:${returnQualityColor(item.quality)}">★ <img src="img/src/items/I${item.img}.jpg"> ${item.name} ${countNumber}</span>  <span style="color:gray">[1/${chance}] ${checkmark}</span>`


}







let currentBreakBar = 0


enemies.E1 = {
    name: 'Caulislug',
    initialLevel: 1,
    description: 'A slug so passionate about vegetables that he raised one on its shell. Scientists are in absolute awe.',
    area: 'A1',
    difficulty: 'easy',
    lootTable: function() { return { CaesarSalad : { c : 100, a : 1, l : function(){return (areas[stats.currentArea].heat>3 && quests.A1QN13.state!=="completed")}}, SlimyResidue : { c : chances.enemies.poor, a : 1}, WoodenSword : { c : chances.enemies.poor, a : 1}, ClothHead : { c : chances.enemies.poor, a : 1},  CabbageBoots : { c : chances.enemies.uncommon, a : 1} } },
    align: 'nature',
    passive: true,
    attack : function() {return 0},
    card1 : { description:"x1.05 Nature Bonus", effect: function() {stat.NatureBonus*=1.05} },
    card2 : { description:"x1.1 Nature Bonus", effect: function() {stat.NatureBonus*=1.1}},
    card3 : { description:"x1.15 Nature Bonus", effect: function() {stat.NatureBonus*=1.15} },
    
}


enemies.E3 = {
  name: 'Ribull',
  initialLevel: 3,
  description: 'Recognized for their loud croaking sound, numerous noise complaints have been filled wherever they reside. But they never listen...',
  area: 'A1',
  difficulty: 'medium',
  lootTable: function() { return { FrogLeg : { c : 100, a : 1, l : function(){return (areas[stats.currentArea].heat>1 && quests.A1QN9.state!=="completed")}}, ClothLegs : { c : chances.enemies.poor, a : 1},  ClothChest : { c : chances.enemies.poor, a : 1},  SilverRing : { c : chances.enemies.poor, a : 1},  RanaHat : { c : chances.enemies.uncommon, a : 1}, } },
  align: 'nature',
  card1 : { description:"x1.05 Nature Resist", effect: function() {stat.NatureResist+=0.05} },
  card2 : { description:"x1.1 Nature Resist", effect: function() {stat.NatureResist+=0.1} },
  card3 : { description:"x1.15 Nature Resist", effect: function() {stat.NatureResist+=0.15}},
}

enemies.E2 = {
  name: 'Stinglet',
  initialLevel: 5,
  description: 'It is said that the poison of these scorpids is more lethal the whiter their tails are. It is also said that they kinda look like a baguette.',
  area: 'A1',
  difficulty: 'hard',
  lootTable: function() { return  { WhiteStinger : { c : chances.enemies.poor, a : 1}, ClothFeet : { c : chances.enemies.poor, a : 1}, AncientChestplate : { c : chances.enemies.uncommon, a : 1}, ScorpionRing : { c : chances.enemies.rare, a : 1}, } },
  align: 'occult',
  card1 : { description:"x1.05 Occult Resist", effect: function() {stat.OccultResist+=0.05} },
  card2 : { description:"x1.1 Occult Resist", effect: function() {stat.OccultResist+=0.1},  },
  card3 : { description:"x1.15 Occult Resist", effect: function() {stat.OccultResist+=0.15}},
}


function heatDesc(desc, heat){

  if (areas[stats.currentArea].heat >= heat) return desc
  return `<span style="color:gray"> ${desc} </span>`

}


enemies.E4 = {
  name: 'Hoopperoona',
  initialLevel: 7,
  description: 'An overgrown arachnid that doesn\'t seem too up for conversation.',
  area: 'A1',
  difficulty: 'boss',
  tag: 'areaBoss',
  hp: function() {return returnEnemyHp(this.level)*3.5},
  attack : function() {return returnEnemyAttack(this.level) / 2},
  ai: function () { castHoopperoona() },
  lootTable: function() { return { UpgradeMaterial1 : { c : 1, a : chances.boss.upgradeMaterial},  HopperoonaPhylactery : { c : chances.boss.uncommon, a : 1},  WebthreadedPromise : { c : chances.boss.uncommon, a : 1}, PoisonScroll : { c : chances.boss.rare, a : 1}, ChrysalisRecurver : { c : chances.boss.rare, a : 1}, PoisonScroll2 : { c : chances.boss.epic, a : 1}, } },
  align: 'occult',
  bestiarySkills : function() { return `❖${buffIcon("B57")}Ravenous Bite: Inflicts 2 ${heatDesc(`(5 in${colorTag("🔥3","orange")})`,3)} stacks of${buffIcon("B1")}Poison<br>
  ${heatDesc(`❖${buffIcon("B58")}Web Shot${colorTag("🔥2","orange")}: Inflicts 2 ${heatDesc(`(5 in${colorTag("🔥4","orange")})`,4)}  stacks of${buffIcon("B36")}Slow`,2)}` },
  contextTooltip: [`<img src="img/src/buffs/B1.jpg"> <span style="color:lawngreen">Poison</span> takes 1/100 of your Max Health as Nature Damage per second per stack`,
    `<img src="img/src/buffs/B36.jpg"> <span style="color:lawngreen">Slow</span> reduces your Attack Speed by 5% per stack`,
  ],

  variance: {Hue2:-40, Hue3:-30, Hue4:-70, Alt:true},
  //card1 : { description:"x1.05 Occult Damage", effect: function() {stat.OccultResist+=3}, got:true },
  //card2 : { description:"x1.1 Occult Damage", effect: function() {stat.OccultResist+=2}, got:true },
  //card3 : { description:"x1.15 Occult Damage", effect: function() {stat.OccultResist+=1}, got:true },
  breakBar: function () { return areas[stats.currentArea].heat>1 ? 1 : 0},
  onDeath: function () { if (areas[stats.currentArea].heat>2) sendMail("Shellshine")},

}










enemies.E13 = {};
enemies.E13.name = 'Copper Vein';
enemies.E13.level = 1;
enemies.E13.difficulty = 'ore';
enemies.E13.area = 'A1';
enemies.E13.description = 'A rich mineral deposit containing soft metals.'
enemies.E13.exp = returnExp(4)/200;
enemies.E13.drop = "dropItem('I32'); rollTable(copperCollectibles, 1)";
//enemies.E13.tag = "ore"
enemies.E13.passive = true
enemies.E13.gatheringLevel = 1;
enemies.E13.bestiaryItem = 'bestiaryTag("Requires: ⛏️ Gathering Level 1")+bestiaryItem("I32", "drop")';


/*

enemies.E4 = {};
enemies.E4.name = 'Hoopperoona';
enemies.E4.initialLevel = 7;
enemies.E4.breakBar = 3;
enemies.E4.area = 'A1';
enemies.E4.description = 'An overgrown arachnid that doesn\'t seem too up for conversation.';
enemies.E4.exp = returnExp(10)/200;
enemies.E4.attackChance = 'castHoopperoona()';
enemies.E4.drop = 'rareItemDrop("I83",uncommonDrop,1,"drop")+rareItemDrop("I192",uncommonDrop,1,"drop")+rareItemDrop("I47",uncommonDrop,1,"drop")+dropItem("I57")'; 
enemies.E4.align = 'occult';
enemies.E4.tag = 'areaBoss';
enemies.E4.difficulty = 'boss';
enemies.E4.bigEnemy = true;
enemies.E4.bestiarySkills = "❖ Fleming Bite: Inflicts"+buffIcon("B1")+"Poison.";
enemies.E4.bestiaryItem = 'bestiaryItem("I83", "drop", uncommonDrop)+bestiaryItem("I192", "drop", uncommonDrop)+bestiaryItem("I47", "drop", uncommonDrop)+bestiaryItem("I57", "drop")';
enemies.E4.firstTimeReward = true;

*/


Object.keys(enemies).forEach(function(key) {

    if (enemies[key].hp===undefined) enemies[key].hp = function() {return returnEnemyHp(this.level)};

    if (enemies[key].attack===undefined) enemies[key].attack = function() {return returnEnemyAttack(this.level)};


    enemies[key].killCount = 0;  
    enemies[key].medal = 0;  
    enemies[key].medalProgress = 0;  


  });