


function returnEnemyHp(level){
    //return Math.floor(1000 * Math.pow(1.5, (level-1)))

    if (stats.rogue.active) return Math.floor(300 * (level* (1.1 * (1+stats.rogue.areaDifficulty/10) ) ))

      let baseHp = 6
      if (level>=6) baseHp = 10
      if (level>=16) baseHp = 20
      if (level>=21) baseHp = 30 //start a2
      if (level>=23) baseHp = 50 
      if (level>=26) baseHp = 60




      return Math.floor(baseHp * (level*gearscoreMod))


}

function returnEnemyAttack(level){
  //return Math.floor(1000 * Math.pow(1.5, (level-1)))

  if (stats.rogue.active) return Math.floor(3 * (level * (1 * (1+stats.rogue.areaDifficulty/10) ) ))

    let baseAtk = 1
    if (level>=23) baseAtk = 2 //start a2
    if (level>=26) baseAtk = 2.3
    if (level>=31) baseAtk = 2.4
    if (level>=36) baseAtk = 2.8


    return Math.floor(baseAtk * (level*gearscoreMod))
    

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
    if (count>1) countNumber = "x"+beautify(count)


    if (context === "drop" && item.constructor.timesGot===0) return `<span style="color:${returnQualityColor(item.quality)}">★ <img src="img/src/items/I${item.img}.jpg"> ????? ${countNumber}</span>  <span style="color:gray">[1/${chance}]</span>`

    return `<span style="color:${returnQualityColor(item.quality)}">★ <img src="img/src/items/I${item.img}.jpg"> ${item.name} ${countNumber}</span>  <span style="color:gray">[1/${chance}] ${checkmark}</span>`


}







let currentBreakBar = 0


enemies.E1 = {
    name: 'Caulislug',
    initialLevel: function() { return 1},
    description: 'A slug so passionate about vegetables that he raised one on its shell. Scientists are in absolute awe.',
    area: 'A1',
    difficulty: 'easy',
    lootTable: function() { return { CaesarSalad : { c : chances.enemies.h1, a : 1, l : function(){return (areas[stats.currentArea].heat>3 && quests.A1QN13.state!=="completed")}}, SlimyResidue : { c : chances.enemies.h1, a : 1}, WoodenSword : { c : chances.enemies.h1, a : 1}, ClothHead : { c : chances.enemies.h1, a : 1},  CabbageBoots : { c : chances.enemies.h3, a : 1} } },
    align: 'nature',
    passive: true,
    ai: function () {
      if (areas[stats.currentArea].heat===1) return;
      playSound("audio/enemyAttack.mp3")
      var damageDealt = rng(enemies[stats.currentEnemy].attack(), (enemies[stats.currentEnemy].attack()*1.05))*enemyDamageMultiplier //damage variance
      if (enemies[stats.currentEnemy].align==='nature') playerNatureDamage(damageDealt)
      voidAnimation("playerAnimation", "gelatine 0.3s 1")
      voidAnimation("enemyAnimation", "enemyAttack 0.5s 1")
      playerUpdate()
     },
    card1 : { description:"x1.05 Nature Bonus", effect: function() {stat.NatureBonus*=1.05} },
    card2 : { description:"x1.1 Nature Bonus", effect: function() {stat.NatureBonus*=1.1}},
    card3 : { description:"x1.15 Nature Bonus", effect: function() {stat.NatureBonus*=1.15} },
    
}


enemies.E3 = {
  name: 'Ribull',
  initialLevel: function() { return 3},
  description: 'Recognized for their loud croaking sound, numerous noise complaints have been filled wherever they reside. But they never listen...',
  area: 'A1',
  difficulty: 'medium',
  lootTable: function() { return { FrogLeg : { c : chances.enemies.h0, a : 1, l : function(){return (areas[stats.currentArea].heat>1 && quests.A1QN9.state!=="completed")}}, ClothLegs : { c : chances.enemies.h1, a : 1},  ClothChest : { c : chances.enemies.h1, a : 1},  SilverRing : { c : chances.enemies.h2, a : 1},  RanaHat : { c : chances.enemies.h4, a : 1}, } },
  align: 'nature',
  card1 : { description:"x1.05 Gathering Power", effect: function() {stat.GatheringPower*=1.05} },
  card2 : { description:"x1.1 Gathering Power", effect: function() {stat.GatheringPower*=1.1}},
  card3 : { description:"x1.15 Gathering Power", effect: function() {stat.GatheringPower*=1.15} },
}

enemies.E2 = {
  name: 'Stinglet',
  initialLevel: function() { return 5},
  description: 'It is said that the poison of these scorpids is more lethal the whiter their tails are. It is also said that they kinda look like a baguette.',
  area: 'A1',
  difficulty: 'hard',
  lootTable: function() { return  { WhiteStinger : { c : chances.enemies.h1, a : 1}, ClothFeet : { c : chances.enemies.h1, a : 1}, AncientChestplate : { c : chances.enemies.h3, a : 1}, ScorpionRing : { c : chances.enemies.h4, a : 1}, } },
  align: 'occult',
  card1 : { description:"+ 1 Income", effect: function() {stat.Income+=1} },
  card2 : { description:"+ 2 Income", effect: function() {stat.Income+=2} },
  card3 : { description:"+ 3 Income", effect: function() {stat.Income+=3} },
}


function heatDesc(desc, heat){

  if (areas[stats.currentArea].heat >= heat) return desc
  return `<span style="color:gray"> ${desc} </span>`

}


enemies.E4 = {
  name: 'Hoopperoona',
  initialLevel: function() { return 5},
  description: 'An overgrown arachnid that doesn\'t seem too up for conversation.',
  area: 'A1',
  difficulty: 'boss',
  tag: 'areaBoss',
  hp: function() {return returnEnemyHp(this.level)*8},
  attack : function() {return returnEnemyAttack(this.level) / 2},
  ai: function () { castHoopperoona() },
  lootTable: function() { return { UpgradeMaterial1 : { c : 1, a : Math.pow(4,areas[stats.currentArea].heat)*nofarmToggleBonus }, WebthreadedPromise : { c : chances.boss.h1, a : 1},  HopperoonaPhylactery : { c : chances.boss.h2, a : 1}, ChrysalisRecurver : { c : chances.boss.h4, a : 1, l : function(){return (areas[stats.currentArea].heat>2)} }, PoisonScroll2 : { c : chances.boss.h5, a : 1}, } },
  align: 'occult',
  bestiarySkills : function() { return `❖${buffIcon("B57")}Ravenous Bite: Inflicts 2 ${heatDesc(`(4 in${colorTag("🔥3","orange")})`,3)} stacks of${buffIcon("B1")}Poison<br>
  ${heatDesc(`❖${buffIcon("B58")}Web Shot${colorTag("🔥2","orange")}: Inflicts 2 ${heatDesc(`(4 in${colorTag("🔥4","orange")})`,4)}  stacks of${buffIcon("B36")}Slow`,2)}` },
  contextTooltip: function() { return [ contextTooltipPlayerPoison(), contextTooltipPlayerSlow()] },


  variance: {Hue2:-40, Hue3:-30, Hue4:-70, Alt:true},
  card1 : { description:"x1.05 Occult Bonus", effect: function() {stat.OccultBonus*=1.05} },
  card2 : { description:"x1.1 Occult Bonus", effect: function() {stat.OccultBonus*=1.1}},
  card3 : { description:"x1.15 Occult Bonus", effect: function() {stat.OccultBonus*=1.15} },
  breakBar: function () { 
      //if (areas[stats.currentArea].heat<2) return 0
      //if (areas[stats.currentArea].heat===4) return 2
      return 0
  },
  onDeath: function () {
      
    
    if (areas[stats.currentArea].heat>1 && !enemies[stats.currentEnemy].heatBeaten.heat2) {     setTimeout(() => { createPopup('<img src="img/src/icons/goldmedal.png"> New items are available on the shop', 'savePopUp'); updateItemShop(); }, 100);
   } 
    if (areas[stats.currentArea].heat>2) sendMail("Shellshine");
  }
}


/*
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
*/

statHidden.extraCopperOre = 0

enemies.E13 = {
  name: 'Copper Vein',
  initialLevel: function() { return 1},
  description: 'A rich mineral deposit containing soft metals.',
  area: 'A1',
  hp: function() {return 100},
  difficulty: 'ore',
  lootTable: function() { return { CopperOre : { c : 1, a : 1*nofarmToggleBonus }, GemRuby : { c : chances.oregem.common, a : 1}, GemSapphire : { c : chances.oregem.uncommon, a : 1}, GemTopaz : { c : chances.oregem.rare, a : 1}, } },
  align: 'nature',
  passive: true,
  resource: "ore",
  card1 : { description:"+ 5% Chance of gathering +1 Copper Ore from this node", effect: function() {statHidden.extraCopperOre+=0.05} },
  card2 : { description:"+ 10% Chance of gathering +1 Copper Ore from this node", effect: function() {statHidden.extraCopperOre+=0.1}},
  card3 : { description:"+ 15% Chance of gathering +1 Copper Ore from this node", effect: function() {statHidden.extraCopperOre+=0.15} },
  onDeath : function () { if (chance(statHidden.extraCopperOre)) spawnItem(CopperOre,1,"noPopup")},
}

statHidden.extraDayleaf = 0

enemies.E14 = {
  name: 'Dayleaf Shrub',
  initialLevel: function() { return 1},
  description: 'A lush and bountiful briar containing many kinds of rare herbs with many applications.',
  area: 'A2',
  hp: function() {return 100},
  difficulty: 'herb',
  lootTable: function() { return { Dayleaf : { c : 1, a : 1*nofarmToggleBonus } , GemshellBeetle : { c : chances.oregem.common, a : 1},  BrightBug : { c : 1000/nofarmToggleBonus, a : 1}, } },
  align: 'nature',
  passive: true,
  resource: "herb",
  card1 : { description:"+ 5% Chance of gathering +1 Dayleaf from this node", effect: function() {statHidden.extraDayleaf+=0.05} },
  card2 : { description:"+ 10% Chance of gathering +1 Dayleaf from this node", effect: function() {statHidden.extraDayleaf+=0.1}},
  card3 : { description:"+ 15% Chance of gathering +1 Dayleaf from this node", effect: function() {statHidden.extraDayleaf+=0.15} },
  onDeath : function () { if (chance(statHidden.extraDayleaf)) spawnItem(Dayleaf,1,"noPopup")},
}




enemies.E5 = {
  name: 'Jabbit',
  initialLevel: function() { return 21},
  description: 'Although it lacks poison or claws, does it really look like it couldn\'t hurt you?',
  area: 'A2',
  difficulty: 'easy',
  lootTable: function() { return { RabbitHide : { c : chances.enemies.h1, a : 1, l : function(){return (areas[stats.currentArea].heat>1 && quests.A2Q5.state!=="completed")}}, TinyLifeMote : { c : chances.enemies.h0, a : 1}, BoxingGloves : { c : chances.enemies.h3, a : 1}, MonkHead : { c : chances.enemies.h5, a : 1}, } },
  align: 'nature',
  card1 : { description:"x1.05 Max Health", effect: function() {stat.MaxHealth*=1.05} },
  card2 : { description:"x1.08 Max Health", effect: function() {stat.MaxHealth*=1.08}},
  card3 : { description:"x1.1 Max Health", effect: function() {stat.MaxHealth*=1.1} },
}

enemies.E6 = {
  name: 'Karateil',
  initialLevel: function() { return 23},
  description: 'A common red squirrel that has found its ways into martial arts. Not so common anymore.',
  area: 'A2',
  difficulty: 'medium',
  lootTable: function() { return { Acorn : { c : chances.enemies.h1, a : 1, l : function(){return (areas[stats.currentArea].heat>2 && quests.A2Q7.state!=="completed")}}, LumaSquirrel : { c : chances.enemies.h1, a : 1}, BlackBelt : { c : chances.enemies.h2, a : 1},  ShinigamiChest : { c : chances.enemies.h3, a : 1}, RecipeShurikenFan : { c : chances.enemies.h4, a : 1, l: function(){  return (RecipeShurikenFan.timesGot===0)  }},  } },
  align: 'nature',
  card1 : { description:"x1.05 Crit Damage", effect: function() {stat.CritDamage*=1.05} },
  card2 : { description:"x1.1 Crit Damage", effect: function() {stat.CritDamage*=1.1}},
  card3 : { description:"x1.15 Crit Damage", effect: function() {stat.CritDamage*=1.15} },
}

enemies.E7 = {
  name: 'Roostrika',
  initialLevel: function() { return 25},
  description: 'A hen proficient in full body combat. This one doesn\'t even want to cross the road.',
  area: 'A2',
  difficulty: 'hard',
  lootTable: function() { return { SashHead : { c : chances.enemies.h1, a : 1}, BushidoMedallion : { c : chances.enemies.h4, a : 1}, MonkFeet : { c : chances.enemies.h5, a : 1},  } },
  align: 'nature',
  card1 : { description:"x1.05 Clicking Power", effect: function() {stat.LumaPower*=1.05} },
  card2 : { description:"x1.1 Clicking Power", effect: function() {stat.LumaPower*=1.1}},
  card3 : { description:"x1.15 Clicking Power", effect: function() {stat.LumaPower*=1.15} },
}


enemies.E57 = {
  name: 'Training Dummy',
  initialLevel: function() { return rpgClass[stats.currentClass].level},
  description: 'A fearsome construct of wood and hay.',
  hp: function() {return returnEnemyHp(this.level)*3},
  difficulty: 'hard',
  align: 'nature',
  tag: "arena",
  noMedal:true,
  passive: true,
  ai: function () { castTrainingDummy() },
  start: function () { buffs.EnemyInvulnerable.time = 10*60; playerBuffs() },
  bestiarySkills : function() { return `❖ Briefly stop being ${buffIcon("B33")}Invulnerable after its summon gets defeated. Click on the summon to switch targets` },
}






/*
enemies.E51 = {
  name: 'Litavela',
  initialLevel: function() { return rpgClass[stats.currentClass].level},
  description: 'A haunted wax creature with very bright ideas.',
  hp: function() {return returnEnemyHp(this.level)*6},
  attack : function() {return returnEnemyAttack(this.level) / 2},
  align: 'elemental',
  tag: "arena",
  ai: function () { castLitavela() },
  bestiarySkills : function() { return `
     ❖${buffIcon("B57")}Flamethrower: Deal x2 enemy attack as Elemental Damage and inflicts 2 stacks of Burning
     <br>
     ❖${buffIcon("B57")}Firefly Dance: Summons two fire spirits. Defeating the orange spirit will apply 20 stacks of Burning, defeating the blue spirit will remove Burning from yourself
     <br>
     ❖${buffIcon("B42")}Carnival of the Living Fire: If any summoned fire spirits are present, deal extreme Elemental Damage
    ` },
  contextTooltip: function() { return [ contextTooltipPlayerBurning()] },
}
*/



/*
enemies.E5 = {};
enemies.E5.name = 'Jabbit';
enemies.E5.level = '[lvl 11]';
enemies.E5.hp = 5000;
enemies.E5.description = 'Although it lacks poison or claws, does it really look like it couldn\'t hurt you?'
enemies.E5.area = 'A2';
enemies.E5.attack = 140;
enemies.E5.exp = returnExp(11)/300;
enemies.E5.difficulty = 'easy';
enemies.E5.drop =  "dropItem('I114'); rareItemDrop('I69', uncommonDrop,1,'drop')";
enemies.E5.align = 'might';
enemies.E5.bestiaryItem = 'bestiaryItem("I114","drop")+bestiaryItem("I69","drop",uncommonDrop)';

enemies.E6 = {};
enemies.E6.name = 'Karateil';
enemies.E6.level = '[lvl 14]';
enemies.E6.hp = 7000;
enemies.E6.description = 'A common red squirrel that has found its ways into martial arts. Not so common anymore.'
enemies.E6.area = 'A2';
enemies.E6.attack = 600;
enemies.E6.exp = returnExp(14)/300;
enemies.E6.difficulty = 'medium';
enemies.E6.align = 'nature';
enemies.E6.drop =  "dropItem('I115');";
enemies.E6.bestiaryItem = 'bestiaryItem("I115","drop")+bestiaryItem("I127","steal", "1/150 up to 1/"+rareThief)';

enemies.E7 = {};
enemies.E7.name = 'Roostrika';
enemies.E7.level = '[lvl 17]';
enemies.E7.hp = 30000;
enemies.E7.description = 'A hen proficient in full body combat. This one doesn\'t even want to cross the road.'
enemies.E7.area = 'A2';
enemies.E7.attack = 2500;
enemies.E7.exp = returnExp(17)/300;
enemies.E7.difficulty = 'hard';
enemies.E7.align = 'nature';
enemies.E7.drop =  "dropItem('I25');";
enemies.E7.bestiaryItem = 'bestiaryItem("I25","drop")';
*/








enemies.E8 = {
  name: 'King-Kat',
  initialLevel: function() { return 25},
  description: 'King of the jungle and king of all fighting styles.',
  area: 'A2',
  difficulty: 'boss',
  tag: 'areaBoss',
  hp: function() {return returnEnemyHp(this.level)*8},
  attack : function() {return returnEnemyAttack(this.level) / 2},
  ai: function () { castKingKat() },
  lootTable: function() { return { 
    UpgradeMaterial2 : { c : 1, a : Math.pow(4,areas[stats.currentArea].heat)*nofarmToggleBonus },
    GemGearscore1 : { c : chances.boss.h3, a : 1, l : function(){return (areas[stats.currentArea].heat>2)} },
    StripedPelt : { c : chances.boss.h3, a : 1, l : function(){return (areas[stats.currentArea].heat>2)} }, LumaTiger : { c : chances.boss.h5, a : 1},
    RecipeKingKatDecapitator : { c : chances.boss.h4, a : 1, l : function(){return (areas[stats.currentArea].heat>2 && RecipeKingKatDecapitator.timesGot===0)} },
    }},

  align: 'nature',
   bestiarySkills : function() { return `
    ❖${miniIcon("items/I69.jpg")}King Punch: Deal x2 enemy attack as Occult Damage
    <br>
    ${heatDesc(`❖${miniIcon("items/I15.jpg")}Tag Team${colorTag("🔥2","orange")}: Summon 1 ${heatDesc(`(2 in${colorTag("🔥4","orange")})`,4)} dojo critter to aid in battle`,2)}
    <br>
    ${heatDesc(`❖${buffIcon("B2")}Hot Tag!${colorTag("🔥3","orange")}: If summon hasn\'t been defeated, gain 5 stacks of enrage and heal 30% of HP`,3)}
    ` },
  contextTooltip: function() { return [ contextTooltipEnemyEnrage()] },
  breakBar: function () { if (areas[stats.currentArea].heat===4) {return 1} else return 0 },
  variance: {Hue2:-20, Hue3:-20, Hue4:-40, Alt:true},
  card1 : { description:"x1.05 Luck", effect: function() {stat.Luck*=1.05} },
  card2 : { description:"x1.08 Luck", effect: function() {stat.Luck*=1.08}},
  card3 : { description:"x1.1 Luck", effect: function() {stat.Luck*=1.1} },
  //breakBar: function () { 
  //    //if (areas[stats.currentArea].heat<2) return 0
  //    //if (areas[stats.currentArea].heat===4) return 2
  //    return 0
  //},
  //onDeath: function () { if (areas[stats.currentArea].heat>2) sendMail("Shellshine")},
}





enemies.E29 = {
  name: 'Royal Pudding',
  initialLevel: function() { return Math.max(35,rpgClass[stats.currentClass].level)},
  description: 'A pink round jelly that is as dangerous as it is delicious.',
  hp: function() {return returnEnemyHp(this.level)*10},
  attack : function() {return returnEnemyAttack(this.level) / 2},
  align: 'occult',
  tag: "arena",
  passive: true,
  noMedal:true,
  breakBar: function () { return 1 },
  ai: function () { castRoyalPudding() },
  bestiarySkills : function() { return `
     ❖${buffIcon("B9")}Gunk Shot: Deal x4 enemy attack as Occult Damage and apply 1 stack of Slow
     <br>
     ❖${miniIcon("enemies/E29M.png")}Split & Merge: Splits in two. If this skill is recast and the copy is still alive, heal 100% of Max HP
    ` },
    contextTooltip: function() { return [ contextTooltipPlayerSlow()] },

}

enemies.E28 = {
  name: 'Dai-Goran',
  initialLevel: function() { return Math.max(40,rpgClass[stats.currentClass].level) },
  description: 'A legendary reptile revered as a god of an ancient tribe.',
  hp: function() {return returnEnemyHp(this.level)*10},
  attack : function() {return returnEnemyAttack(this.level) / 2},
  align: 'occult',
  tag: "arena",
  noMedal:true,
  breakBar: function () { return 1 },
  ai: function () { castDaiGoran() },
  bestiarySkills : function() { return `
     ❖${buffIcon("B57")}Inject Toxin: Deal x2 enemy attack as Nature Damage and inflicts 3 stacks of Poisoned
     <br>
     ❖${buffIcon("B42")}Basilisk Stare: If you are Poisoned, inflict Petrify
    ` },
  contextTooltip: function() { return [ contextTooltipPlayerPoison(), contextTooltipPlayerPetrify()] },
}






























enemies.E52 = {
  name: 'Dream Visage',
  initialLevel: function() { return 21},
  description: 'Although it lacks poison or claws, does it really look like it couldn\'t hurt you?',
}



enemies.R1 = {
  name: 'Dream Visage',
  initialLevel: function() { return 21},
  description: 'Although it lacks poison or claws, does it really look like it couldn\'t hurt you?',
}









Object.keys(enemies).forEach(function(key) {

    if (enemies[key].hp===undefined) enemies[key].hp = function() {return returnEnemyHp(this.level)};

    if (enemies[key].attack===undefined) enemies[key].attack = function() {return returnEnemyAttack(this.level)};

    if (enemies[key].card1!==undefined) enemies[key].card1.got = false;
    if (enemies[key].card2!==undefined) enemies[key].card2.got = false;
    if (enemies[key].card3!==undefined) enemies[key].card3.got = false;

    enemies[key].heatBeaten = {heat1:false,heat2:false,heat3:false,heat4:false};  

    enemies[key].killCount = 0;  
    enemies[key].medal = 0;  
    enemies[key].medalProgress = 0;  


  });