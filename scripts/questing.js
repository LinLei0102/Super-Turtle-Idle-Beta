


var quests = {} 

function itemData(id,data){

  const item = new id()

if (data==="img") return '<img style="border-color: '+returnQualityColor(item.quality)+' " src="img/src/items/I'+item.img+'.jpg">'
if (data==="name") return '<span style="color: '+returnQualityColor(item.quality)+' " >'+item.name+'</span>'

return '<img style="border-color: '+returnQualityColor(item.quality)+' " src="img/src/items/I'+item.img+'.jpg">' + '<span style="color: '+returnQualityColor(item.quality)+' " >'+item.name+'</span>'





}

quests.A1QN1 = {
    name: 'Important Notice',
    difficulty: 1,
    icon: `img/src/items/I8.jpg`,
    description: `To all the turtles that venture into the wildlife, remember that <span style="color:orange;font-weight:600; font-size:1.2rem">clicking on enemies damages them!</span> While not very reliable, it will suffice if you are not armed!`,
    objective: function() { return `Defeat a bunch of slugs by clicking on them <span class="questProgress">${beautify(enemies.E1.killCount)}/5</span>`},
    logic : function() {return enemies.E1.killCount>4},
    effect: function() {
        spawnItem(WoodenSword);
        tipPopUp("About Gear!","<br>You just recieved a piece of gear!<br>Search it on your inventory on the left tab and equip it<br><br>Gear can come with different modifiers and flavors, so pay attention!<br><br>With a weapon equipped, the game will automatically defeat enemies while you\'re away, even offline")
    },
    reward: `${itemData(WoodenSword)} x1`
}

quests.A1QN2 = {
    name: 'Slug Infestation',
    difficulty: 1,
    icon: `img/src/enemies/E1M.png`,
    description: `We are in DIRE need of a stick-like-weapon-wielding prince to help us with the caulislug problem! Oh, if only they knew that <span style="color:orange;font-weight:600; font-size:1.2rem"> their game runs normally even if the browser tab is not active</span>, I bet it would appear right now!`,
    objective: function() { return `Defeat another bunch of slugs with your mighty weapon <span class="questProgress">${beautify(enemies.E1.killCount)}/30</span>`},
    logic : function() {return enemies.E1.killCount>29},
    effect: function() {
        spawnItem(ClothHead);
    },
    reward: `${itemData(ClothHead)} x1`
}

quests.A1QN3 = {
    name: 'Those who croak',
    difficulty: 1,
    icon: `img/src/items/I51.jpg`,
    description: `Those damn frogs need to be taken care of, we already have enough green-colored fellas arround here! If you want to find them, you will have to <span style="color:orange;font-weight:600; font-size:1.2rem">switch encounter by clicking the buttons above the screen!</span>`,
    objective: function() { return `Defeat 20 Ribulls <span class="questProgress">${beautify(enemies.E3.killCount)}/20</span>`},
    logic : function() {return enemies.E3.killCount>19},
    effect: function() {
        spawnItem(ClothChest);
        spawnItem(VendorTrash)

    },
    reward: `${itemData(ClothChest)} x1`
}

quests.A1QN4 = {
  name: 'POKO!',
  difficulty: 1,
  icon: `img/src/icons/coin.png`,
  description: `Poko-Poko Poko Poko Poko-Poko!<br><span style="color:orange;font-weight:600; font-size:1.2rem">Poko Poko-Poko Poko Poko!!!!!1!</span><br><br><br><br>Poko.`,
  objective: function() { return `Lend 5000 Shells to Pokomuni to set up her shop <span class="questProgress">${beautify(rpgPlayer.coins)}/5000</span><br><span style="color:gray">(You can get shells by defeating enemies or by selling items from the inventory)</span>`},
  logic : function() {return rpgPlayer.coins>=5000},
  effect: function() {
    rpgPlayer.coins-=5000;
    unlocks.shop = true;
    did("shopInteractable").style.animation = "gelatineHigh 0.5s 1, flashNoScale 1s 1"
    unlockAnimation("Shops Unlocked!", "Pokomuni has set up shop in different areas!<br>You can also tip her to expand her inventory further", "img/src/icons/coin.png")
  },
  reward: `${itemIcon("I499")} Unlock Shops`
}

quests.A1QN6 = {
  name: 'Shady Delivery',
  difficulty: 1,
  icon: `img/src/items/I0.jpg`,
  description: `I am looking for a you-know-what in a you-know-where. No questions allowed.`,
  objective: function() { return `Hand over the you-know-what`},
  logic : function() {return MysteriousPackage.count>0},
  effect: function() {
    MysteriousPackage.count--
    spawnItem(WoodenSword,2);
    tipPopUp("About Aligns!","<br>Every weapon can come in three different aligns; Nature, Occult and Elemental, and so does all foes<br><br>Using an advantageous align on an enemy will cause it to deal x1.5 extra damage, indicated by a [▲] next to the damage number<br><br>There is no penalty for not using aligns correctly, but they can help you farm faster!<br><br>If you need a reminder of the align hierarchy, hover over your Power stat at any time")

  },
  reward: `${itemData(WoodenSword)} x2`
}

quests.A1QN5 = {
  name: 'Natural Remedy',
  difficulty: 2,
  icon: `img/src/items/I49.jpg`,
  description: `I\'m feeling kinda drowzy lately and I need something to wake me up!`,
  objective: function() { return `Hand over 3 White Stingers <span class="questProgress">${beautify(WhiteStinger.count)}/3</span>`},
  logic : function() {return WhiteStinger.count>2},
  effect: function() {
    WhiteStinger.count=-3
      spawnItem(FoodLizard,3);
  },
  reward: `${itemData(FoodLizard)} x3`
}

quests.A1QN7 = {
  name: 'Have You Seen It?',
  difficulty: 3,
  icon: `img/src/enemies/E4M.png`,
  description: `My pet Hoopperoona has gone missing. You will recognise her for her eight legs, rocky skin, and the ability to melt steel beams with her saliva. She usually hangs arround <span style="color:orange;font-weight:600; font-size:1.2rem">at the top of the screen as the boss of the area</span>`,
  objective: function() { return `Defeat Hoopperoona<br><span style="color:gray">(Tip: Healing items, such as food sold in the shops, will appear on your pocket next to your name for ease of access)</span>`},
  logic : function() {return enemies.E4.killCount>0},
  effect: function() {
      spawnItem(SilverRing,2);
      tipPopUp("About Shellshock!","<br>After you beat the area boss, you can increase the difficulty of the area by pressing the widget on the top left of the screen<br><br>By increasing the difficulty of the area, the levels of the enemies will rise, but so will the chances of getting their loot, alongside the ones of getting stronger tiers of them!<br><br>Beware! With each difficulty increase, bosses in the area will evolve, and gain new and perilous skills!")

  },
  reward: `${itemData(SilverRing)} x2`
}

quests.A1QN8 = {
  name: 'Strange Request',
  difficulty: 1,
  icon: `img/src/items/I554.jpg`,
  description: `I never saw an upgraded piece of equipment, and neither did you apparently. You would think that I have nothing to gain with this request and that it blatantly feels like some sort of introduction to a mechanic, and you would be partially right `,
  objective: function() { return `Upgrade 4 pieces of equipment <span class="questProgress">${beautify(stats.upgradedItems)}/4</span><br><span style="color:gray">(Tip: The upgrading option on the inventory will only appear once you met the material requirements. Only equipment can be upgraded)</span>`},
  logic : function() {return stats.upgradedItems>3},
  effect: function() {
      spawnItem(UpgradeMaterial1,10);
  },
  reward: `${itemData(UpgradeMaterial1)} x10`
}

quests.A1QN9 = {
  name: 'Those who croak II',
  difficulty: 2,
  icon: `img/src/items/I51.jpg`,
  description: `I can still hear them, ya know? Not a very clean job you did. Give me proof that you got them good this time`,
  objective: function() { return `Hand over 5 Frog Legs <span class="questProgress">${beautify(FrogLeg.count)}/5</span><br><span style="color:gray">(Tip: Some items, specially from quests, will only drop on certain difficulty levels. Watch out for yellow-colored items on enemy loot)</span>`},
  logic : function() {return FrogLeg.count>4},
  effect: function() {
      FrogLeg.count=-5
      spawnItem(RanaHat);

  },
  reward: `${itemData(RanaHat)} x1`
}

quests.A1QN10 = {
  name: 'Remarkable Achievement',
  difficulty: 1,
  icon: `img/src/items/I543.jpg`,
  description: `Hello, Duck here! Hope you have been enjoying your adventure! Did you knew you can gain <span style="color:cyan;font-weight:600;">Prism Scutes</span> by completing quests and achievements? And did you knew you can spend said scutes on the <span style="color:cyan;font-weight:600;">Achievement Shop?</span> Yeah? Well ain\'t you smart?`,
  objective: function() { return `Obtain 5 Achievements <span class="questProgress">${stats.logsGot}/5</span> <span style="color:gray"><br>(Tip: You will unlock new items in the achievement shop for every new level that you get!)</span>`},
  logic : function() {return stats.logsGot>4},
  effect: function() {
      spawnItem(ScutePile2);
  },
  reward: `${itemData(ScutePile2)} x1`
}

quests.A1QN11 = {
  name: 'Postmail Service',
  difficulty: 1,
  icon: `img/src/items/I16.jpg`,
  description: `Postman here! I got a new shift on these lands and to my surprise, you don\'t have a mail installed arround these parts! I would build it myself, but I didn\'t brought materials on me`,
  objective: function() { return `Hand over 30 Wood Bundles <span class="questProgress">${ScrapMaterial1.count}/30</span> <span style="color:gray"><br>(Tip: Items will automatically scrap if an exact copy is adquired)</span>`},
  logic : function() {return ScrapMaterial1.count>29},
  effect: function() {
      ScrapMaterial1.count-=30
      unlocks.mail = true
      sendMail("BETA")
      unlockAnimation("Mail Unlocked!", "Recieve letters from time to time<br>Sometimes they might send you items attached!", "img/src/items/I16.jpg")
  },
  reward: `${itemIcon("I16")} Unlock Mail Services`
}

quests.A1QN12 = {
  name: 'The Ultimatea',
  difficulty: 3,
  icon: `img/src/items/I382.jpg`,
  description: `My beverage doesn\'t give me enough energy! I need to remedy this!`,
  objective: function() { return `Hand over 150 Spirit Ginseng <span class="questProgress">${UpgradeMaterial1.count}/150</span> <span style="color:gray"><br>(Tip: Bosses will often drop more Upgrading Materials on higher shellshock levels)</span>`},
  logic : function() {return UpgradeMaterial1.count>149},
  effect: function() {
      UpgradeMaterial1.count-=150
      spawnItem(ChanceDie1,2);
  },
  reward: `${itemData(ChanceDie1)} x2`
}

quests.A1QN13 = {
  name: 'Feeling Peckish',
  difficulty: 2,
  icon: `img/src/buffs/B56.jpg`,
  description: `Lately I have been carving salad. Although I\'d assume asking for some kind of creature who just happens to be made out of salad would be too far-fetched`,
  objective: function() { return `Hand over 5 Salads <span class="questProgress">${CaesarSalad.count}/5</span>`},
  logic : function() {return CaesarSalad.count>4},
  effect: function() {
      CaesarSalad.count-=5
      spawnItem(Stamp2,5);
  },
  reward: `${itemData(Stamp2)} x5`
}





/*
quests.A1QN3 = {
    name: 'Money Issues?',
    difficulty: 1,
    icon: `img/src/icons/coin.png`,
    description: `Money solutions! We will buy anything from your inventory! Of course, you will also get Shells from defeating foes, but some turtles just want the easy way out`,
    objective: function() { return `Defeat another bunch of slugs with your mighty weapon <span class="questProgress">${beautify(stats.soldItems)}/10</span>`},
    logic : function() {return enemies.E1.killCount>9},
    effect: function() {
        spawnItem(WoodenSword);
        tipPopUp("About Gear!","<br>You just recieved a piece of gear!<br>Search it on your inventory on the left tab and equip it<br><br>Gear can come with different modifiers and flavors, so pay attention!")
    },
    reward: `${itemIcon("I8")} Wooden Sword x1`
}
*/








/*


quests.A1QN1.name = 'Important Notice';
quests.A1QN1.difficulty = 1;
quests.A1QN1.description = 'To complete the registation of the Super Turtle Adventure program, please terrorise the local wildlife. '+colorTag("Click on the enemy to deal damage to it","#E57D08");
quests.A1QN1.objective = `'Defeat a bunch of slugs by clicking on them <span class="questProgress">'+beautify(enemies.E1.killCount)+'/5</span>'`;
quests.A1QN1.logic = 'enemies.E1.killCount>4';
quests.A1QN1.effect = 'items.I8.count++; tipPopUp("Quick Tips!","<br>The game progresses while offline, you will get rare items this way too<br><br>Hold down spacebar to quickly click the turtle<br><br>If you are ever lost, check the Game Guide<br><br>Upgrade your weapons as soon as possible to farm faster<br><br>Use the right weapon agains the right enemy, pay attention to alignments<br><br>Check your mail on the top left as soon as you get a new one<br><br>Check out the settings for alternate game modifiers")';
quests.A1QN1.reward = `itemIcon("I8")+'Wooden Sword x1'`;
quests.A1QN1.icon = "img/src/items/I9.jpg";
quests.A1QN1.effect = function ()
//quests.A1Q1.effect = 'sendMail("M1"); unlockAnimation("Turtlebot Unlocked!", "Once you defeated an enemy 100 times, recolect materials, gear and experience from it while youre offline.", "img/src/icons/afk.jpg")'






unlocks.shop = false

quests.A1Q7 = {};
quests.A1Q7.name = 'Fateful Companion';
quests.A1Q7.difficulty = 1;
quests.A1Q7.description = 'Fun fact! Did you know turtles LIKE to be pet? And did you know you should do it NOW?'+bestiaryTag("Tip: Spacebar also clicks the turtle","#E57D08");
quests.A1Q7.objective = `'Click the turtle on the bottom left 50 times <span class="questProgress">'+beautify(stats.clickCount)+'/50</span>'`;
quests.A1Q7.logic = 'stats.clickCount>=50';
quests.A1Q7.effect = 'items.I1.count+=100';
quests.A1Q7.exp = returnExp(1)/2;
quests.A1Q7.reward = `itemIcon("I1")+' Slug Meat x100'`;
quests.A1Q7.icon = "img/src/items/I79.jpg";
quests.A1Q7.effect = 'items.I1.count+=100; tipPopUp("Quick Tips!","<br>Check the mail (📬) on the top left as soon as you recieve a new letter, you never know what it might be!<br><br>Quests are important! Recieve rewards by completing them, check out the compass (🧭) at the side of the mail too!")';


quests.A1Q2 = {};
quests.A1Q2.name = 'My Beloved Friend';
quests.A1Q2.difficulty = 1;
quests.A1Q2.description = 'I am a prince from Nigeria and a giant idiot spider destroyed shop, give me your money please.'+bestiaryTag('Tip: Sell items by pressing <img src="img/src/icons/shopButton.png"> on the inventory',"#E57D08");
quests.A1Q2.objective = `'Hand over 2500 Shells <span class="questProgress">'+beautify(rpgPlayer.coins)+'/2500</span>'`;
quests.A1Q2.logic = 'rpgPlayer.coins>=2500';
quests.A1Q2.effect = 'rpgPlayer.coins-=2500; items.I1.count+=300; unlocks.shop = true; did("shopButton").style.animation = "newGameTip 1s infinite linear"';
quests.A1Q2.money = 0;
quests.A1Q2.reward = `itemIcon("I218")+'Access to the Shop'+'<br>★ '+itemIcon("I1")+' Slug Meat x300'`;
quests.A1Q2.icon = "img/src/items/I94.jpg";
quests.A1Q2.effect = 'rpgPlayer.coins-=2500; items.I1.count+=300; unlocks.shop = true; did("shopButton").style.animation = "newGameTip 1s infinite linear"; unlockAnimation("Shop Unlocked!", "Use your shells to buy different items on it! Restocks every three real-time days. Some items might be initially locked.", "img/sys/coin.png")';


quests.A1Q3 = {};
quests.A1Q3.name = 'Greenhorn No More';
quests.A1Q3.difficulty = 1;
quests.A1Q3.description = 'We are screwed over here if you are our best bet exploring these lands. Could you at the very least not be totally naked?'+bestiaryTag('Tip: Upgrade gear by pressing the Upgrade button',"#E57D08");
quests.A1Q3.objective = `'Upgrade a full set of'+colorTag("Cloth Armor", "#516385")+'from the shop to level 4'`;
quests.A1Q3.logic = 'items.I2.level>3 && items.I3.level>3 && items.I4.level>3 && items.I5.level>3 && items.I6.level>3';
quests.A1Q3.effect = 'items.I10.count+=3';
quests.A1Q3.reward = `itemIcon("I10")+'Small Wooden Lockbox x3'`;
quests.A1Q3.icon = "img/src/items/I5.jpg";
quests.A1Q3.effect = 'items.I10.count+=3; tipPopUp("Quick Tips!","<br>Your mastery allows you to unlock different areas of the game. Increase mastery by interacting with the different game systems.<br><br>Check out the mastery guide at the top left of the screen to see your current mastery sources and your completion towards it.")';

quests.A1Q3A = {};
quests.A1Q3A.name = 'Request From a Toad';
quests.A1Q3A.difficulty = 2;
quests.A1Q3A.description = 'Ribbit Ribbit. Ribbit Ribbit Ribbit Ribbit Ribbit Ribbit Ribbit.  Ribbit Ribbit.';
quests.A1Q3A.objective = `'Defeat 300 Ribulls <span class="questProgress">'+beautify(enemies.E3.killCount)+'/300</span>'`;
quests.A1Q3A.logic = 'enemies.E3.killCount>299';
quests.A1Q3A.effect = 'items.I51.count+=300';
quests.A1Q3A.reward = `itemIcon("I51")+' Frog Leg x300'`;
quests.A1Q3A.icon = "img/src/items/I59.jpg";
quests.A1Q3A.effect = 'items.I51.count+=300; tipPopUp("Quick Tips!","<br>Pay attention to alignments! Both of your weapon, and the enemy. Using the correct alignment can be the key for defeating an enemy quickly.<br><br>Check out the alignment table by hovering over the duck on your stats panel.")';

quests.A1Q4 = {};
quests.A1Q4.name = 'Miner\'s Request';
quests.A1Q4.difficulty = 3;
quests.A1Q4.description = 'These scorpions keep blocking the road to our sweet, sweet rocks. Clear the road and well show you our rocky goodness.';
quests.A1Q4.objective = `'Defeat 150 Stinglets <span class="questProgress">'+beautify(enemies.E2.killCount)+'/150</span>'`;
quests.A1Q4.logic = 'enemies.E2.killCount>149';
quests.A1Q4.effect = 'areas.A1.unlockedOre = 1;items.I37.count+=300; tipPopUp("Mastery","<br>Mastery is the most important stat of your turtle. It increases exponentially your health and damage, and allows you to progress the game<br><br>Gain mastery by interacting with the game systems.<br><br>Check out the mastery guide at the top of the screen for more details<br><br>Each area has a Mastery limit shown next to their name, and will unlock once the boss of the area has been defeated")';
quests.A1Q4.reward = `itemIcon("I32")+'Unlock Mining Node'+'<br>★ '+itemIcon("I37")+' White Stinger x300'`;
quests.A1Q4.icon = "img/src/items/I84.jpg";
quests.A1Q4.effect = 'areas.A1.unlockedOre = 1;items.I37.count+=300; unlockAnimation("Gathering Unlocked!", "Switch to the gathering node as if it were an enemy, and equip a mattock to gather its resources. Some gathering nodes require gathering level to be able to be collected.", "img/src/items/I85.jpg") ';

quests.A1Q5 = {};
quests.A1Q5.name = 'Have You Seen My Pet';
quests.A1Q5.difficulty = 4;
quests.A1Q5.description = 'My pet Hoopperoona has gone missing. You will recognise her for her eight legs, rocky skin, and the ability to melt steel beams with her saliva.';
quests.A1Q5.objective = `'Defeat Hoopperoona'`;
quests.A1Q5.logic = 'enemies.E4.killCount>0';
quests.A1Q5.effect = 'items.I213.count++';
quests.A1Q5.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A1Q5.icon = "img/src/items/I0.jpg";
quests.A1Q5.effect = 'items.I213.count++; tipPopUp("Quick Tips!","<br>Check out the Settings to adjust the game to your liking! You can change the difficulty, the pacing of the game, or your key preferences there.<br><br>Be sure to export your save regularly from there too!<br><br>If you have any further doubts, check out the game guide. Have fun!")';

unlocks.areas = false;

quests.A1Q6 = {};
quests.A1Q6.name = 'Nature\'s Blessing';
quests.A1Q6.difficulty = 1;
quests.A1Q6.description = 'I am missing a key ingredient in my potion. I wouldnt mind sharing the recipe with you if you help me.';
quests.A1Q6.objective = `'Show an unusual herb blend'`;
quests.A1Q6.logic = 'items.I111.count>0';
quests.A1Q6.effect = 'items.I436.count++; items.I111.count = 0; recipes.AN2A.unlocked=false; createRecipe()';
quests.A1Q6.reward = `itemIcon("I436")+'Elemental Glitterstone'`;
quests.A1Q6.icon = "img/src/items/I38.jpg";


quests.A1Q7 = {};
quests.A1Q7.name = 'Impending Doom';
quests.A1Q7.difficulty = 7;
quests.A1Q7.description = 'I heard strange noises on the forest but it says here that my level is too low. Go check it for me, will ya? <br><br> <span style="color:#FFD100"> [Note: This effect will be permanent]';
quests.A1Q7.objective = 'Reach Level 30';
quests.A1Q7.logic = 'rpgClass.noClass.level>29';
quests.A1Q7.effect = 'areas.A1.boss = "E31";';
quests.A1Q7.reward = 'Area Boss Evolution';
quests.A1Q7.rewardIcon = 'itemIcon("I34")';


//area 2

quests.A2Q2 = {};
quests.A2Q2.name = 'Help! Missing Feline';
quests.A2Q2.difficulty = 1;
quests.A2Q2.description = 'My cat Whiskers is missing. He likes dark closed spaces. I have nothing to offer but Whiskers grattitude.';
quests.A2Q2.objective = `'Find Whiskers'`;
quests.A2Q2.reward = `itemIcon("I120")+'Whiskers Gratitude'`;
quests.A2Q2.logic = 'items.I123.count>0';
quests.A2Q2.effect = 'items.I123.count--; items.I120.count++;';
quests.A2Q2.icon = "img/src/items/I123.jpg";

quests.A2Q1 = {};
quests.A2Q1.name = 'Craft Guild Request';
quests.A2Q1.difficulty = 2;
quests.A2Q1.description = 'The animals punched the heck out of our workshops. We will let anyone who help us repair them into the Crafters Guild.';
quests.A2Q1.objective = `'Hand over 50 copper ore <span class="questProgress">'+beautify(items.I32.count)+'/50</span><br>❖ Hand over 100 rabbit hide <span class="questProgress">'+beautify(items.I114.count)+'/100</span>'`;
quests.A2Q1.logic = 'items.I32.count>49 && items.I114.count>99';
quests.A2Q1.effect = 'items.I32.count-=50; items.I114.count-=100; unlocks.jobs = true; gametipUnlock("gt5")';
quests.A2Q1.reward = `itemIcon("I86")+'Access to the Guildwork Tab'`;
quests.A2Q1.icon = "img/src/items/I69.jpg";

quests.A2Q1A = {};
quests.A2Q1A.name = 'Blacksmithing Trial';
quests.A2Q1A.difficulty = 1;
quests.A2Q1A.description = 'You might have entered the crafters guild, but I will never be convinced until you show me your craftmanship.';
quests.A2Q1A.objective = `'Show 30 Copper Bars <span class="questProgress">'+beautify(items.I31.count)+'/30</span>'`;
quests.A2Q1A.reward = `itemIcon("I114")+'Rabbit Hide x400'`;
quests.A2Q1A.logic = 'items.I31.count>29';
quests.A2Q1A.effect = 'items.I114.count+=400';
quests.A2Q1A.icon = "img/src/items/I86.jpg";

quests.A2Q3 = {};
quests.A2Q3.name = 'A very corny request';
quests.A2Q3.difficulty = 3;
quests.A2Q3.description = 'To beat a squirrel I need to become a squirrel. Help me achieve my dream.';
quests.A2Q3.objective = `'Defeat 240 Karateil <span class="questProgress">'+beautify(enemies.E6.killCount)+'/240</span>'`;
quests.A2Q3.reward = `itemIcon("I38")+'Unlock Foraging Node'`;
quests.A2Q3.logic = 'enemies.E6.killCount>239';
quests.A2Q3.effect = 'areas.A2.unlockedHerb = 1;';
quests.A2Q3.icon = "img/src/items/I115.jpg";

quests.A2Q4 = {};
quests.A2Q4.name = 'Husbandry Issues';
quests.A2Q4.difficulty = 1;
quests.A2Q4.description = 'My chickens escaped from my coop and learnt full body combat. Help me bring them back.';
quests.A2Q4.objective = `'Capture 10 Roostrikas <span class="questProgress">'+beautify(items.I122.count)+'/10</span>'`;
quests.A2Q4.reward = `itemIcon("I93")+'Ornate Stamper x3'`;
quests.A2Q4.logic = 'items.I122.count>9';
quests.A2Q4.effect = 'items.I122.count=0; items.I93.count+=3;';
quests.A2Q4.icon = "img/src/items/I121.jpg";

quests.A2Q4A = {};
quests.A2Q4A.name = 'Pharmacist Assistance';
quests.A2Q4A.difficulty = 1;
quests.A2Q4A.description = 'I tried to get cocky with a giant world-champion cat and broke five bones. If I was a level 2 Alchemist I could turn the tables against him.';
quests.A2Q4A.objective = `'Hand over 5 Healing Flasks <span class="questProgress">'+beautify(items.I19.count)+'/5</span>'`;
quests.A2Q4A.reward = `itemIcon("I209")+'Ephemeral Time Egg'`;
quests.A2Q4A.logic = 'items.I19.count>4';
quests.A2Q4A.effect = 'items.I19.count-=5; items.I209.count+=1;';
quests.A2Q4A.icon = "img/src/items/I19.jpg";
quests.A2Q4A.warning1 = "I209";
quests.A2Q4A.warning2 = 1;

quests.A2Q5 = {};
quests.A2Q5.name = 'Sovereign Affairs';
quests.A2Q5.difficulty = 4;
quests.A2Q5.description = 'Teach him a lesson on my behalf. I would do it if it wasnt a 3 meter tiger proficient in breaking bones.';
quests.A2Q5.objective = `'Defeat King-Kat'`;
quests.A2Q5.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A2Q5.logic = 'enemies.E8.killCount>0';
quests.A2Q5.effect = 'items.I213.count++';
quests.A2Q5.icon = "img/src/items/I15.jpg";

quests.A2Q6 = {};
quests.A2Q6.name = 'The Way Of Karate';
quests.A2Q6.difficulty = 1;
quests.A2Q6.description = 'These animals got hands. I need something to make them learn a lesson or two about martial arts.';
quests.A2Q6.objective = `'Hand over 10 Light Dynamites <span class="questProgress">'+beautify(items.I30.count)+'/10</span>'`;
quests.A2Q6.reward = `itemIcon("I174")+'Dungeon Voucher x3'`; 
quests.A2Q6.logic = 'items.I30.count>9';
quests.A2Q6.effect = 'items.I30.count-=10; items.I174.count+=3';
quests.A2Q6.icon = "img/src/items/I30.jpg";


quests.A2Q7 = {};
quests.A2Q7.name = 'The Masked Return';
quests.A2Q7.difficulty = 7;
quests.A2Q7.description = 'Its a shame to see King-Kat underperforming like this. He used to be much stronger, but it seems he lost its passion for lucha.';
quests.A2Q7.objective = 'Hand over the Luchador Mask';
quests.A2Q7.reward = 'Area Boss Evolution';
quests.A2Q7.rewardIcon = 'itemIcon("I34")';
quests.A2Q7.logic = 'items.I223.count>0';
quests.A2Q7.effect = 'areas.A2.boss = "E32"; items.I223.count=0';
quests.A2Q7.money = 37000;
quests.A2Q7.exp = 80000000;


//area3

quests.A3Q1 = {};
quests.A3Q1.name = 'Herbology Research';
quests.A3Q1.difficulty = 1;
quests.A3Q1.description = 'I need Nature Potions for totally legal reasons. Supply me and do not ask further questions.';
quests.A3Q1.objective = `'Reluctantly hand over 20 Nature Flasks <span class="questProgress">'+beautify(items.I49.count)+'/20</span>'`;
quests.A3Q1.reward = `itemIcon("I16")+'Yellow Cube x500'`;
quests.A3Q1.logic = 'items.I49.count>19';
quests.A3Q1.effect = 'items.I49.count-=20; items.I16.count +=500';
quests.A3Q1.icon = "img/src/items/I49.jpg";

quests.A3Q2 = {};
quests.A3Q2.name = 'Unfortunate Subsidence';
quests.A3Q2.difficulty = 1;
quests.A3Q2.description = 'The cargo we were transporting got destroyed when a cave collapsed. Can you help us make up for it?';
quests.A3Q2.objective = `'Hand over 2500 White Stingers <span class="questProgress">'+beautify(items.I37.count)+'/2500</span>'`;
quests.A3Q2.reward = `itemIcon("I298")+'Armament War Paint x20'`;
quests.A3Q2.logic = 'items.I37.count>2499';
quests.A3Q2.effect = 'items.I37.count-=2500; items.I298.count+=20';
quests.A3Q2.icon = "img/src/items/I107.jpg";

quests.A3Q3 = {};
quests.A3Q3.name = 'Pressing Matters';
quests.A3Q3.difficulty = 2;
quests.A3Q3.description = 'I was playing with my building blocks and realised I\'m missing yellow ones.';
quests.A3Q3.objective = `'Hand over 1500 Yellow Cubes <span class="questProgress">'+beautify(items.I16.count)+'/1500</span>'`;
quests.A3Q3.reward = `itemIcon("I437")+'Occult Glitterstone x10'`;
quests.A3Q3.logic = 'items.I16.count>1499';
quests.A3Q3.effect = 'items.I16.count-=1500; items.I437.count+=10';
quests.A3Q3.icon = "img/src/items/I16.jpg";

quests.A3Q4 = {};
quests.A3Q4.name = 'Carefully Away';
quests.A3Q4.difficulty = 3;
quests.A3Q4.description = 'These darn TNT fellas will pose a serious danger to the miners if left unchecked.';
quests.A3Q4.objective = `'Defeat 600 Cubomites <span class="questProgress">'+beautify(enemies.E10.killCount)+'/600</span>'`;
quests.A3Q4.reward = `itemIcon("I36")+'Unlock Mining Node'`;
quests.A3Q4.logic = 'enemies.E10.killCount>599';
quests.A3Q4.effect = 'areas.A3.unlockedOre = 1';
quests.A3Q4.icon = "img/src/items/I29.jpg";


quests.A3Q6 = {};
quests.A3Q6.name = 'Harder Than Rock';
quests.A3Q6.difficulty = 4;
quests.A3Q6.description = 'The recent extraction of granite has caused a rise in the population of elementals.';
quests.A3Q6.objective = `'Defeat 300 Granite Elementals <span class="questProgress">'+beautify(enemies.E11.killCount)+'/300</span>'`;
quests.A3Q6.reward = `itemIcon("I85")+'Reinforced Mattock'`; 
quests.A3Q6.logic = 'enemies.E11.killCount>299';
quests.A3Q6.effect = ' items.I85.count++; shopItems.A3S16.unlocked = true; createShopItem()';
quests.A3Q6.icon = "img/src/items/I17.jpg";

quests.A3Q5 = {};
quests.A3Q5.name = 'Poor Lodging Choices';
quests.A3Q5.difficulty = 1;
quests.A3Q5.description = 'There\'s rare ore on this cave. And I\'m going to make a house out of it.';
quests.A3Q5.objective = `'Hand over 150 Arcanite Bar??? <span class="questProgress">'+beautify(items.I35.count)+'/150???</span>'`;
quests.A3Q5.reward = `itemIcon("I209")+'Ephemeral Time Egg'`;
quests.A3Q5.logic = 'items.I35.count>149';
quests.A3Q5.effect = 'items.I35.count-=150; items.I209.count+=1';
quests.A3Q5.icon = "img/src/items/I35.jpg";
quests.A3Q5.warning1 = "I209";
quests.A3Q5.warning2 = 1;

quests.A3Q5A = {};
quests.A3Q5A.name = 'Victorious Bout';
quests.A3Q5A.difficulty = 5;
quests.A3Q5A.description = 'I see a star on the rise? Prove your might and I will spread the word about your deeds worldwide.<br>'+colorTag("Dont forget to check the exchange shop!", "darkorange");
quests.A3Q5A.objective = `'Acquire one Gold Medal in the Monster Arena'`;
quests.A3Q5A.reward = `itemIcon("I438")+'Deific Glitterstone x15'`; 
quests.A3Q5A.logic = 'goldenMedalsGot>0';
quests.A3Q5A.effect = ' items.I438.count+=15;';
quests.A3Q5A.icon = "img/src/icons/gladr1.jpg";

quests.A3Q6A = {};
quests.A3Q6A.name = 'Cool, Cool Island';
quests.A3Q6A.difficulty = 5;
quests.A3Q6A.description = 'I\'m just more of a summer person, ya know?';
quests.A3Q6A.objective = `'Clear the Penguin Glacier'`;
quests.A3Q6A.reward = `itemIcon("I174")+'Dungeon Voucher x5'`; 
quests.A3Q6A.logic = 'enemies.E23.killCount>0';
quests.A3Q6A.effect = 'items.I174.count+=5';
quests.A3Q6A.icon = "img/src/upgrades/P4.jpg";
quests.A3Q6A.warning1 = "I174";
quests.A3Q6A.warning2 = 5;

quests.A3Q6B = {};
quests.A3Q6B.name = 'Big Bad, Bad Dragon';
quests.A3Q6B.difficulty = 6;
quests.A3Q6B.description = 'Until that drake is out of commission we cant dwell further into the mines. Be sure to avoid using '+natureIcon+'Nature Damage or shell get very pissy!';
quests.A3Q6B.objective = `'Defeat Terragosa'`;
quests.A3Q6B.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A3Q6B.logic = 'enemies.E12.killCount>0';
quests.A3Q6B.effect = 'items.I213.count++';
quests.A3Q6B.icon = "img/src/items/I84.jpg";

quests.A3Q7 = {};
quests.A3Q7.name = 'Lost In The Blue';
quests.A3Q7.difficulty = 1;
quests.A3Q7.description = 'Ive never left the caves, I want to see jellyfish.';
quests.A3Q7.objective = `'Hand over 10 Ghost Jellyfish <span class="questProgress">'+beautify(items.I159.count)+'/10</span>'`;
quests.A3Q7.reward = `itemIcon("I219")+'Busted Improbability Drive x5'`;
quests.A3Q7.logic = 'items.I159.count>9';
quests.A3Q7.effect = 'items.I159.count-=10; items.I219.count += 5';
quests.A3Q7.icon = "img/src/items/I162.jpg";
quests.A3Q7.warning1 = "I219";
quests.A3Q7.warning2 = 5;

//area 4
quests.A4Q1 = {};
quests.A4Q1.name = 'Blacksmith Request';
quests.A4Q1.difficulty = 1;
quests.A4Q1.description = 'I\'m going to make the finest of armors and I need the finest of materials.';
quests.A4Q1.objective = `'Hand over 1.5k Agate Crystal Scales <span class="questProgress">'+beautify(items.I71.count)+'/1.5K</span>'`;
quests.A4Q1.logic = 'items.I71.count>1499';
quests.A4Q1.effect = 'items.I71.count-=1500; items.I174.count+=5';
quests.A4Q1.reward = `itemIcon("I174")+'Dungeon Voucher x5'`;
quests.A4Q1.icon = "img/src/items/I86.jpg";

quests.A4Q2 = {};
quests.A4Q2.name = 'Spineless Tourist';
quests.A4Q2.difficulty = 2;
quests.A4Q2.description = 'This depressing scenary is tooootaly making me unconfortable. Bring me something to drink.';
quests.A4Q2.objective = `'Hand over 10 Occult Flasks <span class="questProgress">'+beautify(items.I156.count)+'/10</span>'`;
quests.A4Q2.reward = `itemIcon("I162")+'Unlock Fishing Node'`;
quests.A4Q2.logic = 'items.I156.count>9';
quests.A4Q2.effect = 'items.I156.count-=10; areas.A4.unlockedPond = 1; gametipUnlock("gt18")';
quests.A4Q2.icon = "img/src/areas/A4M.png";

quests.A4Q2A = {};
quests.A4Q2A.name = 'Olympic Adventure';
quests.A4Q2A.difficulty = 1;
quests.A4Q2A.description = 'Achieve what no other turtle has achieved ever before, make me proud. You will need a Medal Case for this one.';
quests.A4Q2A.objective = `'Achieve 6 Gold Medals on the Bestiary <span class="questProgress">'+beautify(medalsGot)+'/6</span>'`;
quests.A4Q2A.reward = `itemIcon("I291")+'Threnody for 999999'`;
quests.A4Q2A.logic = 'medalsGot>5';
quests.A4Q2A.effect = 'items.I291.count++';
quests.A4Q2A.icon = "img/src/items/I315.jpg";

quests.A4Q2B = {};
quests.A4Q2B.name = 'Illegally Blind';
quests.A4Q2B.difficulty = 1;
quests.A4Q2B.description = 'I\'ve lost my glasses! They are so lost that, in fact, they are probably not even on this whole area!';
quests.A4Q2B.objective = `'Hand over the Lost Glasses'`;
quests.A4Q2B.reward = `itemIcon("I211")+'Timeless Time Egg'`;
quests.A4Q2B.logic = 'items.I423.count>0';
quests.A4Q2B.effect = 'items.I423.count=0;items.I211.count++';
quests.A4Q2B.icon = "img/src/items/I423.jpg";
quests.A4Q2B.warning1 = "I211";
quests.A4Q2B.warning2 = 1;

quests.A4Q4 = {};
quests.A4Q4.name = 'Begone Dark Presences';
quests.A4Q4.difficulty = 4;
quests.A4Q4.description = 'You feel the powerful aura, yes? I need a powerful exorciser to aid me on this Job.';
quests.A4Q4.objective = `'Exorcise 3 Morgatos with salt <span class="questProgress">'+beautify(stats.purifiedMorgatosDefeated)+'/3</span>'`;
quests.A4Q4.reward = `itemIcon("I209")+'Ephemeral Time Egg'`;
quests.A4Q4.logic = 'stats.purifiedMorgatosDefeated>2'; 
quests.A4Q4.effect = 'items.I209.count+=1';
quests.A4Q4.icon = "img/src/items/I18.jpg";
quests.A4Q4.warning1 = "I209";
quests.A4Q4.warning2 = 1;

quests.A4Q3 = {};
quests.A4Q3.name = 'Always A Catch';
quests.A4Q3.difficulty = 1;
quests.A4Q3.description = 'Lately I\'m getting pretty restless over what I lost playing near the pond, can you get it for me?';
quests.A4Q3.objective = `'Hand over the lost item on the pond'`;
quests.A4Q3.reward = `itemIcon("I18")+'Ruinous Soul x500'`;
quests.A4Q3.logic = 'items.I286.count>0';
quests.A4Q3.effect = 'items.I286.count=0; items.I18.count+=500';
quests.A4Q3.icon = "img/src/items/I162.jpg";

quests.A4Q4A = {};
quests.A4Q4A.name = 'Monster Hunt Request';
quests.A4Q4A.difficulty = 5;
quests.A4Q4A.description = 'The adventurer\'s guild has reported sightings of a fiery monster several times more powerful than the rest.';
quests.A4Q4A.objective = `'Defeat Infernalus'`;
quests.A4Q4A.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A4Q4A.logic = 'enemies.E27.killCount>0';
quests.A4Q4A.effect = 'items.I213.count++';
quests.A4Q4A.icon = "img/src/items/I13.jpg";

quests.A4Q6 = {};
quests.A4Q6.name = 'Exorcism Aboard';
quests.A4Q6.difficulty = 6;
quests.A4Q6.description = 'Well this is fantastic. Now the ghosts are throwing their own floating party.';
quests.A4Q6.objective = `'Clear the Pirate Galleon'`;
quests.A4Q6.reward = `itemIcon("I174")+'Dungeon Voucher x5'`;
quests.A4Q6.logic = 'enemies.E26.killCount>0';
quests.A4Q6.effect = 'items.I174.count+=5';
quests.A4Q6.icon = "img/src/items/I126.jpg";

quests.A4Q7 = {};
quests.A4Q7.name = 'Relatable Situation';
quests.A4Q7.difficulty = 1;
quests.A4Q7.description = 'The lord of hell fire stole my grill. I think his reign over fiery goods has gone too far.';
quests.A4Q7.objective = `'Steal back the grill from Infernalus'`;
quests.A4Q7.reward = `itemIcon("I219")+'Busted Improbability Drive x5'`;
quests.A4Q7.logic = 'items.I90.count>0';
quests.A4Q7.effect = 'items.I90.count=0; items.I219.count += 5 ';
quests.A4Q7.icon = "img/src/items/I100.jpg";

quests.A4Q5 = {};
quests.A4Q5.name = 'Red Hooded Behest';
quests.A4Q5.difficulty = 6;
quests.A4Q5.description = 'That... Thing... Hand it over... I can make something useful... For you...';
quests.A4Q5.objective = `'Hand over 200 Nightmare Fuel <span class="questProgress">'+beautify(items.I100.count)+'/200</span>'`;
quests.A4Q5.reward = `itemIcon("I157")+'Anima Anvil'`;
quests.A4Q5.logic = 'items.I100.count>199'; 
quests.A4Q5.effect = 'items.I100.count-=200; items.I157.count++';
quests.A4Q5.icon = "img/src/items/I335.jpg";
quests.A4Q5.unlocked = false
//area 5

quests.A8Q1 = {};
quests.A8Q1.name = 'Prehistoric Research';
quests.A8Q1.difficulty = 2;
quests.A8Q1.description = 'This place is a compelete gold mine for science! I will need samples to bring them to the laboratory.';
quests.A8Q1.objective = `'Hand over 1000 Ancient Brick <span class="questProgress">'+beautify(items.I346.count)+'/1000</span>'`;
quests.A8Q1.logic = 'items.I346.count>999';
quests.A8Q1.effect = 'items.I346.count-=1000; items.I177.count++';
quests.A8Q1.reward = `itemIcon("I177")+'EXP Voucher'`;
quests.A8Q1.icon = "img/src/items/I52.jpg";
quests.A8Q1.warning1 = "I177";
quests.A8Q1.warning2 = 1;

quests.A8Q1A = {};
quests.A8Q1A.name = 'Wilderness Gourmand';
quests.A8Q1A.difficulty = 1;
quests.A8Q1A.description = 'All these mushrooms growing arround here... And we dont even have fire to roast them? Who\'s going to held accountable for this now?';
quests.A8Q1A.objective = `'Hand over 25 Firetank Pyrocombulators <span class="questProgress">'+beautify(items.I187.count)+'/25</span>'`;
quests.A8Q1A.logic = 'items.I187.count>24';
quests.A8Q1A.effect = 'items.I187.count-=25; items.I312.count+=10';
quests.A8Q1A.reward = `itemIcon("I312")+"Gardener\'s Stamper x10"`;
quests.A8Q1A.icon = "img/src/items/I90.jpg";

quests.A8Q2 = {};
quests.A8Q2.name = 'Scientific Method';
quests.A8Q2.difficulty = 1;
quests.A8Q2.description = 'See all those mushrooms lyin\' arround here? God knows what they do, but you will.';
quests.A8Q2.objective = `'Discover all the effects of Suspicious Mushrooms <span class="questProgress">'+shroomEffectsDiscovered+'/8</span>'`;
quests.A8Q2.logic = 'shroomEffectsDiscovered>7';
quests.A8Q2.effect = 'items.I387.count++; shopItems.A8S2A.unlocked = true; createShopItem()';
quests.A8Q2.reward = `itemIcon("I387")+'Ebonforge Gauntlets'`;
quests.A8Q2.icon = "img/src/items/I380.jpg";

quests.A8Q2A = {};
quests.A8Q2A.name = 'Evolution Theory I';
quests.A8Q2A.difficulty = 1;
quests.A8Q2A.description = 'Little is known about monster evolution, but if my calculations are correct, the beast at Cradle Hills could be the key to this research. Take a sampler from the shop and report back to me.';
quests.A8Q2A.objective = `'Hand over a Monster Sample from Hoopperoona'`;
quests.A8Q2A.logic = 'items.I396.statUp==="Sample Taken!"';
quests.A8Q2A.effect = 'items.I396.count=0; items.REM1.count++; jobPanels.EM.unlocked = true; createRecipeListing(); quests.A8Q2A.unlocked=false; quests.A8Q2B.unlocked = true; createQuest()';
quests.A8Q2A.reward = `itemIcon("I397")+'Recipe: Spider Dream Shard'`;
quests.A8Q2A.icon = "img/src/enemies/E4M.png";
quests.A8Q2A.unlocked = false;

quests.A8Q2B = {};
quests.A8Q2B.name = 'Evolution Theory II';
quests.A8Q2B.difficulty = 3;
quests.A8Q2B.description = 'As it turns out, powerful monsters are able to undergo further evolution. Would you mind testing it for me?';
quests.A8Q2B.objective = `'Defeat Evolved Hoopperoona'`;
quests.A8Q2B.logic = 'enemies.E31.killCount>0';
quests.A8Q2B.effect = 'areas.A8.unlockedOre = 0;';
quests.A8Q2B.reward = `itemIcon("I349")+'Unlock Ore Node'`;
quests.A8Q2B.icon = "img/src/items/I397.jpg";
quests.A8Q2B.unlocked = false;

quests.A8Q3 = {};
quests.A8Q3.name = 'Dire Rescue';
quests.A8Q3.difficulty = 3;
quests.A8Q3.description = 'Help! My exploration team is surrounded by those fanged beasts!';
quests.A8Q3.objective = `'Defeat 700 Dragoraros <span class="questProgress">'+beautify(enemies.E34.killCount)+'/700</span>'`;
quests.A8Q3.logic = 'enemies.E34.killCount>699';
quests.A8Q3.effect = 'areas.A8.unlockedOre = 1;';
quests.A8Q3.reward = `itemIcon("I349")+'Unlock Ore Node'`;
quests.A8Q3.icon = "img/src/items/I78.jpg";

quests.A8Q4 = {};
quests.A8Q4.name = 'Careful Procedures';
quests.A8Q4.difficulty = 3;
quests.A8Q4.description = 'See those wicked four legged beasts? Turns out, their teeth is something else! But we cannot get them through regular means, you know? You need to be delicate with it.';
quests.A8Q4.objective = `'Hand over 600 Pristine Dragoraro Tusks <span class="questProgress">'+beautify(items.I398.count)+'/600</span>'`;
quests.A8Q4.logic = 'items.I398.count>599';
quests.A8Q4.effect = 'items.I398.count-=600; items.I174.count+=5';
quests.A8Q4.reward = `itemIcon("I174")+'Dungeon Voucher x5'`;
quests.A8Q4.icon = "img/src/items/I347.jpg";
quests.A8Q4.warning1 = "I174";
quests.A8Q4.warning2 = 5;

quests.A8Q5 = {};
quests.A8Q5.name = 'Turtle My Dear I';
quests.A8Q5.difficulty = 1;
quests.A8Q5.description = 'Oh what a sweet child you are, are you interested in gardening? Grandma would love some help';
quests.A8Q5.objective = `'Reach Gardening level 3 <span class="questProgress">'+rpgPlayer.gardenLevel+'/3</span>'`;
quests.A8Q5.logic = 'rpgPlayer.gardenLevel>2';
quests.A8Q5.effect = 'plants.g10.count++; plants.g10.harvested++; quests.A8Q5A.unlocked = true; quests.A8Q5.unlocked = false; createQuest(); createPlants()';
quests.A8Q5.reward = `itemIcon("I309")+'Chocobloom Seeds x1'`;
quests.A8Q5.icon = "img/src/upgrades/grandma1.jpg";

quests.A8Q5A = {};
quests.A8Q5A.name = 'Turtle My Dear II';
quests.A8Q5A.difficulty = 1;
quests.A8Q5A.description = 'Beautiful gardening my dear, can you help grandma planting some cookies?';
quests.A8Q5A.objective = `'Hand over 30 Chocolate Chip Cookies <span class="questProgress">'+beautify(items.I14.count)+'/30</span>'`;
quests.A8Q5A.logic = 'items.I14.count>29';
quests.A8Q5A.effect = 'items.I14.count-=30;quests.A8Q5A.unlocked = false; quests.A8Q5B.unlocked = true; createQuest();';
quests.A8Q5A.reward = `"Nanny will appreciate"`;
quests.A8Q5A.icon = "img/src/upgrades/grandma2.jpg";
quests.A8Q5A.unlocked = false;

quests.A8Q5B = {};
quests.A8Q5B.name = 'Turtle My Dear III';
quests.A8Q5B.difficulty = 1;
quests.A8Q5B.description = 'Those are some lovely smelling cookies my dear, but they are not enough';
quests.A8Q5B.objective = `'Hand over 100 Chocolate Chip Cookies <span class="questProgress">'+beautify(items.I14.count)+'/100</span>'`;
quests.A8Q5B.logic = 'items.I14.count>99';
quests.A8Q5B.effect = 'items.I14.count-=100;quests.A8Q5B.unlocked = false; quests.A8Q5C.unlocked = true; createQuest();';
quests.A8Q5B.reward = `"Nanny will appreciate"`;
quests.A8Q5B.icon = "img/src/upgrades/grandma4.jpg";
quests.A8Q5B.unlocked = false;

quests.A8Q5C = {};
quests.A8Q5C.name = 'Turtle My Dear IV';
quests.A8Q5C.difficulty = 1;
quests.A8Q5C.description = 'Grandma will need a few more cookies than that sonny';
quests.A8Q5C.objective = `'Hand over 200 Chocolate Chip Cookies <span class="questProgress">'+beautify(items.I14.count)+'/200</span>'`;
quests.A8Q5C.logic = 'items.I14.count>199';
quests.A8Q5C.effect = 'items.I14.count-=200;quests.A8Q5C.unlocked = false; quests.A8Q5D.unlocked = true; createQuest();';
quests.A8Q5C.reward = `"Nanny will appreciate"`;
quests.A8Q5C.icon = "img/src/upgrades/grandma5.jpg";
quests.A8Q5C.unlocked = false;

quests.A8Q5D = {};
quests.A8Q5D.name = 'Turtle My Dear V';
quests.A8Q5D.difficulty = 1;
quests.A8Q5D.description = 'more';
quests.A8Q5D.objective = `'Hand over 300 Chocolate Chip Cookies <span class="questProgress">'+beautify(items.I14.count)+'/300</span>'`;
quests.A8Q5D.logic = 'items.I14.count>299';
quests.A8Q5D.effect = 'items.I14.count-=300;quests.A8Q5D.unlocked = false; quests.A8Q5E.unlocked = true; createQuest();';
quests.A8Q5D.reward = `"Nanny will appreciate"`;
quests.A8Q5D.icon = "img/src/upgrades/grandma6.jpg";
quests.A8Q5D.unlocked = false;

quests.A8Q5E = {};
quests.A8Q5E.name = 'Turtle My Dear VI';
quests.A8Q5E.difficulty = 1;
quests.A8Q5E.description = 'bake more cookies bake more cookies bake more cookies bake more cookies bake more cookies bake more cookies bake more cookies ';
quests.A8Q5E.objective = `'Hand over 400 Chocolate Chip Cookies <span class="questProgress">'+beautify(items.I14.count)+'/400</span>'`;
quests.A8Q5E.logic = 'items.I14.count>399';
quests.A8Q5E.effect = 'items.I14.count-=400;quests.A8Q5E.unlocked = false; quests.A8Q5F.unlocked = true; createQuest();';
quests.A8Q5E.reward = `"Nanny will appreciate"`;
quests.A8Q5E.icon = "img/src/upgrades/grandma7.jpg";
quests.A8Q5E.unlocked = false;

quests.A8Q5F = {};
quests.A8Q5F.name = 'Turtle My Dear VII';
quests.A8Q5F.difficulty = 1;
quests.A8Q5F.description = 'one last cookie sacrifice';
quests.A8Q5F.objective = `'Hand over 500 Chocolate Chip Cookies <span class="questProgress">'+beautify(items.I14.count)+'/500</span>'`;
quests.A8Q5F.logic = 'items.I14.count>499';
quests.A8Q5F.effect = 'items.I14.count-=500; items.I213.count++; logs.P62.unlocked=true';
quests.A8Q5F.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A8Q5F.icon = "img/src/upgrades/grandma8.jpg";
quests.A8Q5F.unlocked = false;

quests.A8Q6 = {};
quests.A8Q6.name = 'Primal Bones';
quests.A8Q6.difficulty = 1;
quests.A8Q6.description = 'The world of paleontology is wonderful! Discover 5 fossils from these lands.';
quests.A8Q6.objective = `'Discover 5 different fossil collectibles <span class="questProgress">'+collectibles5Got+'/5</span>'`;
quests.A8Q6.logic = 'collectibles5Got>4';
quests.A8Q6.effect = 'items.I358.count++, shopItems.A8S19.unlocked = true; createShopItem()';
quests.A8Q6.reward = `itemIcon("I358")+'Ancient Fossil'`;
quests.A8Q6.icon = "img/src/items/I358.jpg";

quests.A8Q7 = {};
quests.A8Q7.name = 'Lost and Found';
quests.A8Q7.difficulty = 1;
quests.A8Q7.description = 'I\'ve lost my glasses! They are so lost that, in fact, they are probably not even on this whole area!';
quests.A8Q7.objective = `'Hand over the Lost Glasses'`;
quests.A8Q7.logic = 'items.I423.count>0';
quests.A8Q7.effect = 'items.I423.count=0; items.RAN11.count++';
quests.A8Q7.reward = `itemIcon("I349")+'Unlock Ore Node'`;
quests.A8Q7.icon = "img/src/items/I222.jpg";
quests.A8Q7.unlocked = false;

quests.A8Q9 = {};
quests.A8Q9.name = 'Voodoo Request';
quests.A8Q9.difficulty = 4;
quests.A8Q9.description = 'Im missing various cursed items to perform a ritual. Do not worry, the target will not suffer.';
quests.A8Q9.objective = `'Hand over 1K Eerie Mural <span class="questProgress">'+beautify(items.I348.count)+'/1K</span><br>❖ Hand over 5K Ruinous Souls <span class="questProgress">'+beautify(items.I18.count)+'/5K</span><br>❖ Hand over 5K Frog Legs <span class="questProgress">'+beautify(items.I51.count)+'/5K</span>'`;
quests.A8Q9.logic = 'items.I348.count>999 && items.I18.count>4999 && items.I51.count>4999';
quests.A8Q9.effect = 'items.I348.count-=1000; items.I18.count-=5000; items.I51.count-=5000;  items.I389.count++';
quests.A8Q9.reward = `itemIcon("I389")+'Flask of Aspects'`;
quests.A8Q9.icon = "img/src/items/I356.jpg";

quests.A8Q10 = {};
quests.A8Q10.name = 'Tamers of the Guardian';
quests.A8Q10.difficulty = 5;
quests.A8Q10.description = 'Our spirit deity has gone mad after a millenia of slumber. We need a brave turtle to tame it.';
quests.A8Q10.objective = `'Defeat Eis Zeith'`;
quests.A8Q10.logic = 'enemies.E36.killCount>0';
quests.A8Q10.effect = 'items.I213.count++';
quests.A8Q10.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A8Q10.icon = "img/src/items/I357.jpg";

quests.A8Q11 = {};
quests.A8Q11.name = 'Salesman of the Dark';
quests.A8Q11.difficulty = 6;
quests.A8Q11.description = 'Howdy fellow turtle! We are a cult of sinners worshipping a forgotten deity, come visit us soon! Be sure to properly greet our lord!';
quests.A8Q11.objective = `'Clear the Temple of Dusk'`;
quests.A8Q11.logic = 'items.I71.count>599';
quests.A8Q11.effect = 'items.I71.count-=600; items.RAN11.count++';
quests.A8Q11.reward = `itemIcon("I349")+'Unlock Ore Node'`;
quests.A8Q11.icon = "img/src/items/I335.jpg";
quests.A8Q11.unlocked = false;

//area 6

quests.A9Q1 = {};
quests.A9Q1.name = 'Clockwork Troubles';
quests.A9Q1.difficulty = 2;
quests.A9Q1.description = 'Whoever built these robots, they are centuries ahead from a technological perspective! We need to disassemble them.';
quests.A9Q1.objective = `'Hand over 900 Wonder Cogs <span class="questProgress">'+beautify(items.I351.count)+'/900</span>'`;
quests.A9Q1.logic = 'items.I351.count>899';
quests.A9Q1.effect = 'items.I351.count-=900; items.I483.count+=3';
quests.A9Q1.reward = `itemIcon("I483")+'Nature-Infused Tech x3'`;
quests.A9Q1.icon = "img/src/items/I351.jpg";

quests.A9Q2 = {};
quests.A9Q2.name = 'Known Acquaintance';
quests.A9Q2.difficulty = 1;
quests.A9Q2.description = 'If it isnt my favorite turtle! Remember your friend the prince of Nigeria? How about you lend me some more money?';
quests.A9Q2.objective = `'Lend 5M Shells to your friend'`;
quests.A9Q2.logic = 'rpgPlayer.coins>4999999';
quests.A9Q2.effect = 'rpgPlayer.coins-=5000000; items.BR2.count++';
quests.A9Q2.reward = `itemIcon("I180")+'Blueprint: Lumberjack Post'`;
quests.A9Q2.money = 0;
quests.A9Q2.icon = "img/src/icons/coin.png";

quests.A9Q4 = {};
quests.A9Q4.name = 'Golem Mayhem';
quests.A9Q4.difficulty = 3;
quests.A9Q4.description = 'Whatever treasure they are keeping up on this place, they sure are guarding it tight.';
quests.A9Q4.objective = `'Defeat 600 Maholems <span class="questProgress">'+beautify(enemies.E39.killCount)+'/600</span>'`;
quests.A9Q4.logic = 'enemies.E39.killCount>599';
quests.A9Q4.effect = 'areas.A9.unlockedHerb = 1;';
quests.A9Q4.reward = `itemIcon("I355")+'Unlock Foraging Node'`;
quests.A9Q4.icon = "img/src/items/I226.jpg";

quests.A9Q3 = {};
quests.A9Q3.name = 'Turtle Expansion';
quests.A9Q3.difficulty = 1;
quests.A9Q3.description = 'There are enough resources in here to set up structures down the road.';
quests.A9Q3.objective = `'Upgrade the Lumberjack Post in your Garrison to level 5 <span class="questProgress">'+buildings.B1.level+'/5</span>'`;
quests.A9Q3.logic = 'buildings.B1.level>4';
quests.A9Q3.effect = 'items.I486.count+=3;';
quests.A9Q3.reward = `itemIcon("I486")+'Occult-Infused Tech x3'`;
quests.A9Q3.icon = "img/src/icons/garrison.jpg";
if (items.BR2.gotOnce && !buildings.B1.unlocked) {items.BR2.count=1; addItem()}
quests.A9Q5 = {};
quests.A9Q5.name = 'What is in the box?';
quests.A9Q5.difficulty = 1;
quests.A9Q5.description = 'I just need to know';
quests.A9Q5.objective = `'Research what is in the box'`;
quests.A9Q5.logic = 'stats.thebox';
quests.A9Q5.effect = 'items.I171.count++';
quests.A9Q5.reward =  `itemIcon("I171")+'Good Fishing Rod'`;
quests.A9Q5.icon = "img/src/items/I0.jpg";

quests.A9Q6 = {};
quests.A9Q6.name = 'Lab Rat';
quests.A9Q6.difficulty = 4;
quests.A9Q6.description = 'I came up with a device to harness the incredible energy that these magic towers produce. I just need some help.';
quests.A9Q6.objective = `'Hand over a fully charged Magicrilium Recalibrator'`;
quests.A9Q6.logic = 'items.I382.statUp>=100';
quests.A9Q6.effect = 'items.I209.count++; items.I382.count=0';
quests.A9Q6.reward = `itemIcon("I209")+'Ephemeral Time Egg'`;
quests.A9Q6.icon = "img/src/items/I382.jpg";
quests.A9Q6.warning1 = "I209";
quests.A9Q6.warning2 = 1;

quests.A9Q7 = {};
quests.A9Q7.name = 'Peering into the Abyss';
quests.A9Q7.difficulty = 5;
quests.A9Q7.description = 'Oh god what did we awoken.';
quests.A9Q7.objective = `'Defeat Xezdeth'`;
quests.A9Q7.logic = 'enemies.E41.killCount>0';
quests.A9Q7.effect = 'items.I213.count++';
quests.A9Q7.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A9Q7.icon = "img/src/items/I354.jpg";

quests.A9Q8 = {};
quests.A9Q8.name = 'Angelic Invitation';
quests.A9Q8.difficulty = 5;
quests.A9Q8.description = 'FEEL FREE TO BE INVITED TO OUR TEMPLE OF REDEMPTION, WICKED TURTLE, FOR SINNERS LIKE YOU ARE ALWAYS ALLURED TO SALVATION.';
quests.A9Q8.objective = `'Hand over a fully charged Magicrilium Recalibrator <span class="questProgress">'+beautify(items.I71.count)+'/600</span>'`;
quests.A9Q8.logic = 'items.I71.count>599';
quests.A9Q8.effect = 'items.I71.count-=600; items.RAN11.count++';
quests.A9Q8.reward = ``;
quests.A9Q8.icon = "img/src/items/I204.jpg";
quests.A9Q8.unlocked = false;

quests.A9Q11 = {};
quests.A9Q11.name = 'Salesman of the Dark';
quests.A9Q11.difficulty = 6;
quests.A9Q11.description = 'Howdy fellow turtle! We are a cult of sinners worshipping a forgotten deity, come visit us soon! Be sure to properly greet our lord!';
quests.A9Q11.objective = `'Clear the Temple of Dusk'`;
quests.A9Q11.logic = 'enemies.E49.killCount>0';
quests.A9Q11.effect = 'items.I210.count++';
quests.A9Q11.reward = `itemIcon("I210")+'Perennial Time Egg'`;
quests.A9Q11.icon = "img/src/items/I335.jpg";
quests.A9Q11.warning1 = "I210";
quests.A9Q11.warning2 = 1;

quests.A9Q9 = {};
quests.A9Q9.name = 'Legendary Blade I';
quests.A9Q9.difficulty = 7;
quests.A9Q9.description = 'There are rumors of a legendary blade. Its the dream of all blacksmiths to forge it, but no one knows a clue if it even exists.';
quests.A9Q9.objective = `'Find a clue about the legendary blade'`;
quests.A9Q9.logic = '';
quests.A9Q9.effect = 'items.I71.count-=600; items.RAN11.count++';
quests.A9Q9.reward = `itemIcon("I0")+'Insight about the legendary blade'`;
quests.A9Q9.icon = "img/src/items/I381.jpg";

*/

Object.keys(quests).forEach(function(key) {
  quests[key].once = false;
  quests[key].state = "pending";
});



did("interactableQuestButton").onclick = openQuest

isQuestOpen = false

function openQuest(){

  playSound("audio/button8.mp3")


  did("interactableQuestButton").style.animation = "";
  void did("interactableQuestButton").offsetWidth;
  did("interactableQuestButton").style.animation = "gelatine 0.3s 1 ease";


  if (!isQuestOpen) {

  did("questTooltip").style.display = "flex";


  did("questTooltip").style.animation = "";
  void did("questTooltip").offsetWidth;
  did("questTooltip").style.animation = "interactableTooltip 0.3s 1 ease,interactableTooltipIdle 7s infinite ease";

  


  var movingDiv = did("questTooltip");
var referenceDiv = did("interactableQuestButton");
var referenceRect = referenceDiv.getBoundingClientRect();




function miau(){
const newLeft = referenceRect.left + (referenceRect.width - movingDiv.offsetWidth) / 2;
const newTop = referenceRect.top - movingDiv.offsetHeight;

movingDiv.style.left = `${newLeft}px`;
movingDiv.style.top = `${newTop - 30}px`;
  }

  miau()
  miau()
  miau()
  

  isQuestOpen = true

  } else {

      did("questTooltip").style.animation = "";
      void did("questTooltip").offsetWidth;
      did("questTooltip").style.animation = "interactableTooltip 0.2s 1 ease reverse";
      did("questTooltip").style.animationFillMode = "forwards";


      isQuestOpen = false

  }

}


function repositionQuestMenu(){

  var movingDiv = did("questTooltip");
  var referenceDiv = did("interactableQuestButton");
  var referenceRect = referenceDiv.getBoundingClientRect();
  const newLeft = referenceRect.left + (referenceRect.width - movingDiv.offsetWidth) / 2;
  const newTop = referenceRect.top - movingDiv.offsetHeight;
  
  movingDiv.style.left = `${newLeft}px`;
  movingDiv.style.top = `${newTop - 30}px`;

}



stats.questsCompleted = 0;

setInterval(function () { if (stats.currentCategory === "rpgContainer") { createQuest(); } }, 2000);

function createQuest() {


  did("questTooltip").innerHTML = "";


  for (let q in quests) {
    if (q.startsWith(stats.currentArea)){
    if (!did(q + "quest")) {
        if (questTooltip.children.length > 5) continue
        if (quests[q].state === "completed") continue
      const questdiv = document.createElement("div");
      questdiv.id = q + "quest"; 
      questdiv.innerHTML = ' <div class="questBoardPin"></div> <div class="questBoardBox"> <img src="'+quests[q].icon+'"> <div class="questBoardDetails">'+quests[q].name+'<br><strong id="' + q + 'questl">' + returnDifficulty(quests[q].difficulty) +'</strong></div> </div>'
      did("questTooltip").appendChild(questdiv);
      questdiv.className = "questBoard";
      

      did(q + "quest").addEventListener("click", function () {
        if (quests[q].state === "complete" || rpgPlayer.debug) {
            playSound("audio/startup.mp3","noPitch");
            playSound("audio/button5.mp3");
            stats.questsCompleted++;
            stats.questsCompletedLog++
          did(q + "questl").innerHTML = "Completed";

          quests[q].state = "completed";
          questdiv.remove()
          quests[q].effect();
          questReward(q)
          unlocksReveal();
          specialButtonUi();
          createQuest();
          resetTooltip();
          updateCounters()

          voidAnimation("questTooltip","gelatine 0.3s 1,interactableTooltipIdle 7s infinite ease")

          particleTrackers.push(new ParticleSellPulse(undefined,undefined,{x:mousePositionX,y:mousePositionY}));

          repositionQuestMenu()
        }
      });

      tooltipQuests(q);
    }

    if(quests[q].state==='pending') {
      quests[q].once=false;
      did(q + "questl").style.background = "none";
      did(q + "questl").innerHTML = returnDifficulty(quests[q].difficulty)
    }
    else if(quests[q].state==='complete') {
      if (!quests[q].once) {
        const questsvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#57ff74" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path fill="#57ff74" fill-opacity="0" stroke-dasharray="64" stroke-dashoffset="64" d="M4 12v-7c0 -0.55 0.45 -1 1 -1h14c0.55 0 1 0.45 1 1v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.15s" values="0;0.3"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/></path><path stroke-dasharray="14" stroke-dashoffset="14" d="M8 12l3 3l5 -5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.75s" dur="0.2s" values="14;0"/></path></g></svg>`
        createPopup(questsvg+'Quest Completed: '+quests[q].name)
        playSound("audio/ring.mp3");
        quests[q].once=true}
      did(q + "questl").innerHTML = colorTag("REDEEM", "#51BD4B", "nobr"); 
    }
    else if(quests[q].state==='completed') {
      did(q + "questl").innerHTML = colorTag("COMPLETE", "gray", "nobr"); 
      did(q + "quest").style.filter = "brightness(0.6)"

    }

    if(quests[q].state==='pending' || quests[q].state==='complete'){
    if (quests[q].unlocked!==false && quests[q].logic()) {quests[q].state = "complete"} else {quests[q].state = "pending"}  
    }

    if(quests[q].unlocked===false){ did(q + "quest").style.display = "none"} else did(q + "quest").style.display = "flex"

  }
  }

  if (!document.getElementById('questTooltip')?.children.length) did("questTooltip").innerHTML = `<img src="img/src/icons/emptyQuestboard.png" id="emptyQuestboard">`;


} createQuest();

function returnDifficulty(level){
  
  if (level === 1) return "<strong style='color:gray; background:transparent'>★★★★★★</strong>";
  if (level === 2) return "<strong style='color:#524741; background:transparent'>★</strong><strong style='color:gray; background:transparent'>★★★★★</strong>";
  if (level === 3) return "<strong style='color:#524741; background:transparent'>★★</strong><strong style='color:gray; background:transparent'>★★★★</strong>";
  if (level === 4) return "<strong style='color:#524741; background:transparent'>★★★</strong><strong style='color:gray; background:transparent'>★★★</strong>";
  if (level === 5) return "<strong style='color:#524741; background:transparent'>★★★★</strong><strong style='color:gray; background:transparent'>★★</strong>";
  if (level === 6) return "<strong style='color:#524741; background:transparent'>★★★★★</strong><strong style='color:gray; background:transparent'>★</strong>";
  if (level === 7) return "<strong style='color:#524741; background:transparent'>★★★★★★</strong>";

  if (level === 8) return "<strong style='color:#A78E50; background:transparent'>★</strong><strong style='color:#579DA6; background:transparent'>★★★★★</strong>";

 
}

function questReward(q) { //generic rewards for quests
  let defaultCoins = areas[stats.currentArea].value
  if ("money" in quests[q]) {stats.coins+=quests[q].money; stats.totalCoins += quests[q].money;}
  else {rpgPlayer.coins+=defaultCoins; stats.totalCoins += defaultCoins}
  rpgClass[stats.currentClass].currentExp += rpgClass[stats.currentClass].nextExp*0.4;

  rpgPlayer.scutes += 300
  stats.totalScutes += 300
    
  
  expBar();
  statsUpdate();
  updateStatsUI();
  
}




function tooltipQuests(id) {
    if (did(id + "quest")) {
      did(id + "quest").addEventListener("mouseenter", function () {
        //on mouseenter
          did("tooltip").style.display = "flex";
          did("tooltipName").innerHTML = quests[id].name;
          did("tooltipPrice").innerHTML = "";
          did("tooltipRarity").textContent = "Quest";
          did("tooltipRarity").style.color = "#FFD100";
          did("tooltipName").style.color = "#FFD100";
          let questMoney = areas[stats.currentArea].value;
          if ("money" in quests[id]) questMoney=quests[id].money;
          let excessWarning = ""
          if ("warning1" in quests[id] && (items[quests[id].warning1].count+quests[id].warning2)>items[quests[id].warning1].max) excessWarning = "⚠️"
          did("tooltipDescription").innerHTML = '<span style="font-weight:400">“ '+quests[id].description+' ”</span><br><br><span style="color:#FFD100; font-size:1vw"> Objective:</span><br><span style="color:#deaf6a">❖ '+quests[id].objective()+'</span><br><br><span style="color:#FFD100; font-size:1vw"> Rewards:</span></span><br><span style="color:#79ed8b">★ '+quests[id].reward+excessWarning+'</span><br><span style="color:#ffbd54">★ '+beautify(questMoney)+coinIcon+'Shells</span><br><span style="color:#ae77f7">★ '+beautify(rpgClass[stats.currentClass].nextExp*0.4)+expIcon+'Experience</span><br><span style="color:#00FFCA">★ 300'+scuteIcon+'Prism Scutes</span>'
          did("tooltipFlavor").textContent = "";
          did("tooltipImage").src = "img/src/items/quest.jpg";
          //position related code
          const movingDiv = did("tooltip");
  const referenceDiv = did(id + "quest");
  const referenceRect = referenceDiv.getBoundingClientRect();
  
  // Posicionar la esquina superior izquierda de "tooltip" (movingDiv) con la esquina superior derecha de "referenceDiv"
  const newLeft = referenceRect.right;  // Esquina derecha de "referenceDiv"
  const newTop = referenceRect.top;     // Esquina superior de "referenceDiv"
  
  movingDiv.style.left = newLeft + 20 + "px";
  movingDiv.style.top = newTop + -15 + "px";
        
      });
      did(id + "quest").addEventListener("mouseleave", function () {
        resetTooltip();
      });
    }
  }

