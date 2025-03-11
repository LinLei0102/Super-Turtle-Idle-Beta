

const stampIcon = '<img src="img/src/icons/stamp.png">';
const mightIcon = '<img src="img/src/icons/might.png">';
const natureIcon = '<img src="img/src/icons/nature.png">';
const elementalIcon = '<img src="img/src/icons/elemental.png">';
const occultIcon = '<img src="img/src/icons/occult.png">';
const deificIcon = '<img src="img/src/icons/deific.png">';
const thiefIcon = '<img src="img/src/talents/TG1B.jpg">';
const coinIcon = '<img src="img/src/icons/coin.png">';
const expIcon = '<img src="img/src/icons/xp.png">';
const repIcon = '<img src="img/src/icons/insight.png">';
const scuteIcon = '<img src="img/src/icons/scutes.jpg">';
const sheddingIcon = '<img src="img/src/icons/sheddings.jpg">';
const scalingIcon = '<img style="border-color: red" src="img/src/icons/scaling.jpg">';
const honorIcon = '<img src="img/src/icons/honor.jpg">';
const spIcon = '<img src="img/src/icons/spellpower.jpg">';
const strIcon = '<img src="img/src/icons/strength.jpg">';


const collectibleChance1 = 1000;
const collectibleChance2 = 7000;
const collectibleChance3 = 30000;

let plantCompletionProgress = 0
let plantCompletionProgressTotal = 0

let uncommonDrop = 5000 //15K (95%)
let rareDrop = 15000 //50k (96%)
let epicDrop = 45000 //150k (96%)
let mythicDrop = 450000 //500k (67%)

let relicDrop = 30000 //relics do not have pity
let relicDungeon = 60

let uncommonChest = 30 //chest do not have pity
let rareChest = 90
let epicChest = 270
let mythicChest = 2777

let uncommonDungeon = 30 //90 (95%)
let rareDungeon = 50 //150 (95%)
let epicDungeon = 90 //200 (89%)
let mythicDungeon = 170 //200 (69%) 

let commonThief = 3 //thief does not have pity
let uncommonThief = 10
let rareThief = 20
let epicThief = 60
let mythicThief = 70

function returnQualityColor(quality){

  if (quality === "Poor") return "gray"
  if (quality === "Common") return "white"
  if (quality === "Uncommon") return "#1eff00"
  if (quality === "Rare") return "#0070dd"
  if (quality === "Epic") return "#a335ee" 
  if (quality === "Mythic") return "#E44661"
  if (quality === "Legendary") return "#ff8000"

  if (quality === "Collectible") return "#e6cc80"
  if (quality === "Quest") return "yellow"
  if (quality === "Upgrade") return "#00FFCA"
  if (quality === "Soulbound") return "#B5DD7B"

  if (quality.startsWith("TA")) return rpgClass.TA0.color;
  if (quality.startsWith("TG")) return rpgClass.TG0.color;
  if (quality.startsWith("TI")) return rpgClass.TI0.color;

  if (quality === "Very Easy") return "#579DA6"
  if (quality === "Easy") return "#539D62"
  if (quality === "Medium") return "#A78E50"
  if (quality === "Hard") return "#AB525A"
  if (quality === "Very Hard") return "#A04674"
  if (quality === "Nightmare") return "#8B569F"
  if (quality === "Impossible") return "#38293E"

  if (quality === '0') return ""
  if (quality === '1') return " <span class='itemLevel'>I</span>"
  if (quality === '2') return " <span class='itemLevel' style='color: #abffbd'>II</span>"
  if (quality === '3') return " <span class='itemLevel' style='color: #9cd9ff'>III</span>"
  if (quality === '4') return " <span class='itemLevel' style='color: #EED490'>IV</span>"
  if (quality === '5') return " <span class='itemLevel' style='color: #3486F1'>V</span>"
  if (quality === '6') return " <span class='itemLevel' style='color: #5BDBBD'>VI</span>"
  if (quality === '7') return " <span class='itemLevel' style='color: #FF6536'>VII</span>"
  if (quality === '8') return " <span class='itemLevel' style='color: #FF21DE'>VIII</span>"
  if (quality === '9') return " <span class='itemLevel' style='color: #AC37FF'>IX</span>"
  if (quality === '10') return " <span class='itemLevel' style='color: #FF2121'>X</span>"
  if (quality === '11') return " <span class='itemLevel' style='color: #FF2121'>X</span>" //some annoying bugs like description of job item

  if (quality === "heirloom")  return '<div style=" text-align: center;background:#6D6D6D; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Heirloom Series</div>'
  if (quality === "masterwork")  return '<div style=" text-align: center;background:#957256; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Masterwork Series</div>'
  if (quality === "forgotten")  return '<div style=" text-align: center;background:#886386; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Forgotten Series</div>'
  if (quality === "millionaire")  return '<div style=" text-align: center;background:#9E8244; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Millionaire Series</div>'
  if (quality === "beastfallen")  return '<div style=" text-align: center;background:#8E4D60; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Beastfallen Series</div>'
  if (quality === "revered")  return '<div style=" text-align: center;background:#5A8C98; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Revered Series</div>'
  if (quality === "solstice")  return '<div style=" text-align: center;background:linear-gradient(90deg, rgba(240, 71, 5, 1) 0%, rgba(240, 169, 10, 1)  100%); padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Solstice Series</div>'
  
  if (quality === "ancient")  return '<div style=" text-align: center;background:linear-gradient(90deg, rgba(193,121,17,1) 0%, rgba(56,126,53,1) 100%); padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Ancient Series</div>'
  if (quality === "malevolent")  return '<div style=" text-align: center;background:linear-gradient(90deg, rgba(54,55,77,1) 0%, rgba(126,53,117,1) 100%); padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Malevolent Series</div>'
  if (quality === "chosen")  return '<div style=" text-align: center;background:linear-gradient(90deg, rgba(210,171,17,1) 0%, rgba(41,159,112,1) 100%); padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Chosen Series</div>'
  if (quality === "toybox")  return '<div style=" text-align: center;background:linear-gradient(90deg, rgba(255,151,19,1) 0%, rgba(187,154,48,1) 19%, rgba(41,159,112,1) 19%); padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Toybox Series</div>'
  if (quality === "runic")  return '<div style=" text-align: center;background:linear-gradient(90deg, rgba(77,54,128,1) 0%, rgba(187,48,159,1) 52%, rgba(77,54,128,1) 100%); padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Runic Series</div>'
  if (quality === "omega")  return '<div style=" text-align: center;background-image: url(img/sys/omegaBg.jpg); background-size:cover; outline:#215de0 solid 0.1rem; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Gachapon Series</div>'



  if (quality === "difficulty1") return "#579DA6"

  return "white"

}

function returnQualityName(quality) {
  
  if (quality === "Quest") return "Quest"
  if (quality === "Poor") return "Poor"
  if (quality === "Common") return "Common"
  if (quality === "Uncommon") return "Uncommon ✦"
  if (quality === "Rare") return "Rare ✦✦"
  if (quality === "Epic") return "Epic ✦✦✦"
  if (quality === "Mythic") return "Mythic ✦✦✦✦"
  if (quality === "Legendary") return "Legendary ✦✦✦✦✦"
}


function returnGearPrice(i){

  let mod = 1

  if (items[i].quality === "Uncommon") return 30000 * mod
  if (items[i].quality === "Rare") return 100000 * mod
  if (items[i].quality === "Epic") return 400000 * mod
  if (items[i].quality === "Mythic") return 1000000 * mod
  if (items[i].quality === "Legendary") return 10000000 * mod

}

function itemIcon(id){
  return '<img style="border-color: '+returnQualityColor(items[id].quality)+' " src="img/src/items/'+items[id].img+'.jpg">'
}

function buffIcon(id){
  return '<img src="img/src/buffs/'+id+'.jpg">'
}

function miniIcon(id){
  return `<img src="img/src/${id}">`
}

function rUpgLvl(id){
  let weaponTier = 1
  if (items[id].tier!==undefined) weaponTier = items[id].tier
  return '<FONT COLOR="gray">Level '+ items[id].level +' - Tier '+returnRoman(weaponTier)
}

function rCELvl(i, type){
  let levelCap = 100
  if (items[i].quality === "Rare") levelCap = 50
  if (items[i].quality === "Epic") levelCap = 25
  if (items[i].quality === "Mythic") levelCap = 5


  if (type==="cap") return levelCap
  return '<FONT COLOR="gray">Rank: '+ items[i].CELevel +'/'+levelCap
}

function rCEDmg(i,power, mod){

  return power * Math.pow(mod, items[i].CELevel);
  //1.005

}


function rUpgSkill(id,text,type,cap){

  if (items[id].level<cap && !items[id].revealed) return '<FONT COLOR="gray">⯁<img src="img/src/icons/lock.jpg">Upgrade this item to level '+cap+' to unlock this skill'

  let upgImg = '<img src="img/src/icons/xp.png">';
  if (type==="passive") upgImg = '<img src="img/src/icons/scaling2.jpg">';
  if (type==="active") upgImg = '<img src="img/src/icons/active.jpg">';

  if (items[id].level<cap && items[id].revealed) return '<FONT COLOR="gray">⯁'+upgImg+text+" ["+cap+"]"
  
  return '<FONT COLOR="#1EFF0C">⯁'+upgImg+text
}

/*
function rUpgDmg(id, mod){

  let weaponTier = 0
  if (items[id].tier!==undefined) weaponTier = items[id].tier-1

  if (items[id].quality==="Common") return (25 * Math.pow(1.15, items[id].level) * (1+weaponTier) * mod);
  if (items[id].quality==="Uncommon") return (25 * Math.pow(1.15, items[id].level) * (2+weaponTier) * mod);
  if (items[id].quality==="Rare") return (25 * Math.pow(1.15, items[id].level) * (3+weaponTier) * mod);
  if (items[id].quality==="Epic") return (25 * Math.pow(1.15, items[id].level) * (4+weaponTier) * mod);
  if (items[id].quality==="Mythic") return (25 * Math.pow(1.15, items[id].level) * (5+weaponTier) * mod);

}*/


function rUpgDmg(id, mod){

  let rarityPower = 1;
  if (items[id].quality==="Poor") rarityPower = 0;
  if (items[id].quality==="Uncommon") rarityPower = 2;
  if (items[id].quality==="Rare") rarityPower = 3;
  if (items[id].quality==="Epic") rarityPower = 4;
  if (items[id].quality==="Mythic") rarityPower = 5;


  let weaponTier = 1
  if (items[id].tier!==undefined) weaponTier = items[id].tier+1


  weaponPower = rarityPower + weaponTier - 2

  return (25 * Math.pow(1.3, items[id].level) * Math.pow(1.6,weaponPower) * mod);

}



function beautify(number) { 


  if (number >= 1000000000000000000) {
    let truncatedNumber = Math.floor(number / 10000000000000000) / 10; 
    if (truncatedNumber % 1 === 0) {
        return truncatedNumber.toExponential(1).replace('e+', '★').replace('e-', '★-');
    } else {
        return truncatedNumber.toExponential(1).replace('e+', '★').replace('e-', '★-');
    }
  }

  else if (number >= 1000000000000000) {
    let truncatedNumber = Math.floor(number / 100000000000000) / 10; 
    if (truncatedNumber % 1 === 0) {
        return truncatedNumber + "Q";
    } else {
        return truncatedNumber.toFixed(1) + "Q";
    }
  }

  else if (number >= 1000000000000) {
    let truncatedNumber = Math.floor(number / 100000000000) / 10; 
    if (truncatedNumber % 1 === 0) {
        return truncatedNumber + "T";
    } else {
        return truncatedNumber.toFixed(1) + "T";
    }
  }
  
  else if (number >= 1000000000) {
    let truncatedNumber = Math.floor(number / 100000000) / 10; 
    if (truncatedNumber % 1 === 0) {
        return truncatedNumber + "B";
    } else {
        return truncatedNumber.toFixed(1) + "B";
    }
  }

  else if (number >= 1000000) {
    let truncatedNumber = Math.floor(number / 100000) / 10; 
    if (truncatedNumber % 1 === 0) {
        return truncatedNumber + "M";
    } else {
        return truncatedNumber.toFixed(1) + "M";
    }
}
    
    else if (number >= 1000) {
      let truncatedNumber = Math.floor(number / 100) / 10;
      if (truncatedNumber % 1 === 0) {
          return truncatedNumber + "K";
      } else {
          return truncatedNumber.toFixed(1) + "K";
      }
  }
  
  else {
      return Math.floor(number).toString();
    }
  };



  function beautify(number,mode) { //incredible work by local legend otpoke, thanks a lot!
    if (number < 1_000) return Math.floor(number).toString();
  
    const suffix = ["", "K", "M", "B", "T", "Q"];
    const cleanedNumber = Math.floor(Math.floor(number)/100)*100; // This is essential to avoid Math.log rounding errors
    const kilologarithm = Math.floor(Math.log10(cleanedNumber) / Math.log10(1_000));

    if (mode==="mini" && number > 99_999){ //will only ever display max 4 digits
      if (kilologarithm >= suffix.length) {
        return (cleanedNumber / (1_000**suffix.length)*10).toExponential(1).replace('e+', '♾️');
      } else {
        const truncatedNumber = (Math.floor(cleanedNumber/(1_000**kilologarithm) *10)/10).toFixed(0);
        return `${truncatedNumber}${suffix[kilologarithm]}`;
      }
    }
  
    if (kilologarithm >= suffix.length) {
      return (cleanedNumber / (1_000**suffix.length)*10).toExponential(1).replace('e+', '♾️');
    } else {
      const truncatedNumber = Math.floor(cleanedNumber/(1_000**kilologarithm) *10)/10;
      return `${truncatedNumber}${suffix[kilologarithm]}`;
    }
  }














function rng(min, max) { //gives a random number between the two
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rngW(min, max, weight) {
  const random = Math.random();
  const skewed = Math.pow(random, weight);
  const result = Math.floor(min + (skewed * (max - min)));
  return result;
}

var stats = {
    startedSince: 0, totalBuildings: 0, totalUpgrades: 0, activeSeconds: 0, totalSeconds: 0, clickCount: 0, totalCoins: 0, totalResources: 0, totalSupplies: 0, totalEnergy: 0, turtleName: 'Jeffrey', totalCoinsClick: 0, currentClickCoin: 0, logsGot: 0, timesDied:0, currentCategory: "rpgContainer", totalExp: 0,mailUnread : false, totalScutes : 0, totalSheddings : 0,totalPulls : 0,
    };

var unlocks ={ 
    penguins:0, journal:false, jobs:false, book2: false, autoclicker:false, skills:false, magic:false, dungeons: false, garrison: false,
}

var rpgPlayer = {
    hp: 100,
    baseHaste:2000, 
    alive:true,
    feetSlot: 'none', 
    headSlot: 'none',
    legsSlot: 'none',
    handsSlot: 'none',
    chestSlot: 'none',
    ringSlot: 'none',
    ceSlot: 'none',
    weaponSlot: 'none',
    trinketSlot: 'none',
    L1feetSlot: 'none', 
    L1headSlot: 'none',
    L1legsSlot: 'none',
    L1handsSlot: 'none',
    L1chestSlot: 'none',
    L1ringSlot: 'none',
    L1ceSlot: 'none',
    L1weaponSlot: 'none',
    L1trinketSlot: 'none',
    L2feetSlot: 'none', 
    L2headSlot: 'none',
    L2legsSlot: 'none',
    L2handsSlot: 'none',
    L2chestSlot: 'none',
    L2ringSlot: 'none',
    L2ceSlot: 'none',
    L2weaponSlot: 'none',
    L2trinketSlot: 'none',
    L3feetSlot: 'none', 
    L3headSlot: 'none',
    L3legsSlot: 'none',
    L3handsSlot: 'none',
    L3chestSlot: 'none',
    L3ringSlot: 'none',
    L3ceSlot: 'none',
    L3weaponSlot: 'none',
    L3trinketSlot: 'none',
    L4feetSlot: 'none', 
    L4headSlot: 'none',
    L4legsSlot: 'none',
    L4handsSlot: 'none',
    L4chestSlot: 'none',
    L4ringSlot: 'none',
    L4ceSlot: 'none',
    L4weaponSlot: 'none',
    L4trinketSlot: 'none',
    L5feetSlot: 'none', 
    L5headSlot: 'none',
    L5legsSlot: 'none',
    L5handsSlot: 'none',
    L5chestSlot: 'none',
    L5ringSlot: 'none',
    L5ceSlot: 'none',
    L5weaponSlot: 'none',
    L5trinketSlot: 'none',
    L6feetSlot: 'none', 
    L6headSlot: 'none',
    L6legsSlot: 'none',
    L6handsSlot: 'none',
    L6chestSlot: 'none',
    L6ringSlot: 'none',
    L6ceSlot: 'none',
    L6weaponSlot: 'none',
    L6trinketSlot: 'none',
    L7feetSlot: 'none', 
    L7headSlot: 'none',
    L7legsSlot: 'none',
    L7handsSlot: 'none',
    L7chestSlot: 'none',
    L7ringSlot: 'none',
    L7ceSlot: 'none',
    L7weaponSlot: 'none',
    L7trinketSlot: 'none',
    area: 'A1',
    currentJob: 'blacksmith',
    coins:0,
    baseStrength: 13,
    baseMaxHp: 100,
    baseHpRegen: 10,
    align: 'none',
    skill0: "none",
    skill1: "none",
    skill2: "none",
    skill3: "none",
    skill4: "none",
    mana: 100,
    talentProgress : 0,
    talentPoints: 1,
    totalTalentPoints: 1,
    honor: 0,
    gladiatorRank: 1,
    gardenTokens:0,
    gardenExp:0,
    gardenLevel:1,
    scutes:0,
    sheddings:0,

}

var currentSort="Material";

//#region variable hell

var weaponNatureDamage = 0;
var weaponMightDamage = 0;
var weaponElementalDamage = 0;
var weaponDeificDamage = 0;
var weaponOccultDamage = 0;


var additiveRegen = 0;
var armorAdditiveRegen = 0;

var headAdditiveRegen = 0;
var chestAdditiveRegen = 0;
var feetAdditiveRegen = 0;
var legsAdditiveRegen = 0;
var handsAdditiveRegen = 0;
var ringAdditiveRegen = 0;

var headAdditiveMightDamage = 0;
var chestAdditiveMightDamage = 0;
var feetAdditiveMightDamage = 0;
var legsAdditiveMightDamage = 0;
var handsAdditiveMightDamage = 0;
var ringAdditiveMightDamage = 0;

var headAdditiveNatureDamage = 0;
var chestAdditiveNatureDamage = 0;
var feetAdditiveNatureDamage = 0;
var legsAdditiveNatureDamage = 0;
var handsAdditiveNatureDamage = 0;
var ringAdditiveNatureDamage = 0;

var headAdditiveOccultDamage = 0;
var chestAdditiveOccultDamage = 0;
var feetAdditiveOccultDamage = 0;
var legsAdditiveOccultDamage = 0;
var handsAdditiveOccultDamage = 0;
var ringAdditiveOccultDamage = 0;

var multiplicativeRegen = 1;
var playerHpRegen = 0;

var additiveNatureDamage = 0;
var multiplicativeNatureDamage = 1;
var playerTotalNatureDamage = 0

var additiveMightDamage = 0;
var multiplicativeMightDamage = 1;
var playerTotalMightDamage = 0

var additiveElementalDamage = 0;
var multiplicativeElementalDamage = 1;
var playerTotalElementalDamage = 0

var additiveOccultDamage = 0;
var multiplicativeOccultDamage = 1;
var playerTotalOccultDamage = 0

var additiveDeificDamage = 0;
var multiplicativeDeificDamage = 1;
var playerTotalDeificDamage = 0

var additiveCoinsPerClick = 0;
var multiplicativeCoinsPerClick = 0;
var playerCoinsPerClick = 0;

var additiveMaxHp = 0;

var headAdditiveMaxHp = 0;
var chestAdditiveMaxHp = 0;
var feetAdditiveMaxHp = 0;
var legsAdditiveMaxHp = 0;
var handsAdditiveMaxHp = 0;
var ringAdditiveMaxHp = 0;
var trinketAdditiveMaxHp = 0;

var armorAdditiveMaxHp = 0;
var multiplicativeMaxHp = 1
var playerMaxHp = 0;

var multiplicativeStrength = 1;
var playerStrength = 0;
var playerSteal = 0;

var multiplicativeSpellpower = 1;
var playerSpellpower = 1;
let additiveSpellpower = 0;

var multiplicativeOmni = 1;
var playerOmni = 1;

var additiveHaste = 0;
var multiplicativeHaste = 0;
var playerHaste = 2000;
var weaponHaste = 0;

var playerHealingBonus = 1;

var additiveMiningDamage= 0;
var multiplicativeMiningDamage= 1;
var playerMiningDamage = 0;

var baseFishingLevel= 0;
var additiveFishingLevel= 0;
var playerFishingLevel = 0;

var playerMaxStack = 2147483647;

var multiplicativeDropChance = 1;
var multiplicativeEXPGain = 1;
var additiveEXPGain = 1;
var playerEXPGain = 1;

//stamps apply multiplicative bonuses
var natureStampStatUp = 1
var mightStampStatUp = 1
var elementalStampStatUp = 1
var occultStampStatUp = 1
var deificStampStatUp = 1

var natureDownStampStatUp = 0
var mightDownStampStatUp = 0
var elementalDownStampStatUp = 0
var occultDownStampStatUp = 0
var deificDownStampStatUp = 0

var strengthStampStatUp = 1
var omniStampStatUp = 1
var hasteStampStatUp = 0
var luckStampStatUp = 1

var multiplicativeCritChance = 1;
var playerCritChance = 0;

var tierMaxHp = 0;
var additiveMaxMana = 0;
var multiplicativeMaxMana = 1;
var playerMaxMana = 100;
var playerManaRegen = 0.2;

var playerClickRate = 100

var playerPresentsMinigame = 6
var playerPresentMinigameTimer = 1200
let activeDebuffs = 0

var multiplicativePenguinPower = 1
var playerPenguinPower = 100

var weaponPower = 0;

var clothTier = 0
var exlorerTier = 0

var armorMightDamage = 0;
var armorNatureDamage = 0;
var weaponMiningDamage = 0;

let multiplicativeSellValue = 0;

let disableArmory = false;

let multiplicativeHealingItems = 0;

let playerGatheringLevel = 0;
let weaponGatheringLevel = 0;

let expectedPlayerDamage = 0;

let playerWeaponDamage = 0;

let apprenticePoints = 0;
let gamblerPoints = 0;
let instrumentalistPoints = 0;

let flatWeaponDamage = 0

let natureDamageAdditive = 0;
let natureDamageMultiplicative = 0;
let natureDamageBonus = 0;

let elementalDamageAdditive = 0;
let elementalDamageMultiplicative = 0;
let elementalDamageBonus = 0;

let mightDamageAdditive = 0;
let mightDamageMultiplicative = 0;
let mightDamageBonus = 0;

let deificDamageAdditive = 0;
let deificDamageMultiplicative = 0;
let deificDamageBonus = 0;

let occultDamageAdditive = 0;
let occultDamageMultiplicative = 0;
let occultDamageBonus = 0;

let additiveStrength = 0;

let additiveOmni = 0;

let natureResist = 0;
let mightResist = 0;
let elementalResist = 0;
let occultResist = 0;
let deificResist = 0;

let playerMastery = 0;
let restrainedMastery = 0;


rpgPlayer.debugMastery = 0;


stat = {}

stat.MaxHealth = 0
stat.Power = 0

stat.NatureBonus = 0
stat.ElementalBonus = 0
stat.OccultBonus = 0
stat.NatureResist = 0
stat.ElementalResist = 0
stat.OccultResist = 0

stat.ExpBonus = 0
stat.Luck = 0
stat.GatheringPower = 0
stat.FishingLevel = 0
stat.ExpBonus = 0
stat.ExtraLives = 0
stat.HealingBonus = 0
stat.DodgeChance = 0
stat.AttackSpeed = 0
stat.DebuffBonus = 0
stat.Income = 0
stat.CritChance = 0
stat.CritDamage = 0
stat.Thorns = 0
stat.StealLevel = 0
stat.ExtraActions = 0
stat.Lifesteal = 0
stat.OfflineBonus = 0
stat.LumaPower = 0
stat.Gearscore = 0

statHidden = {}

statHidden.enemyNatureDot = 0;
statHidden.enemyElementalDot = 0;
statHidden.enemyOccultDot = 0;
statHidden.enemyHealingDot = 0;

statHidden.playerNatureDot = 0;
statHidden.playerElementalDot = 0;
statHidden.playerOccultDot = 0;
statHidden.playerHealingDot = 0;

statHidden.extraCraftingTime = 0;


let combatActions = 3+stat.ExtraActions


//#endregion

function statsUpdate(){



  did("mainScreen").style.animation = "none"

  for (i in stat) stat[i] = 0
  for (i in statHidden) statHidden[i] = 0

  stat.Income = 10
  stat.MaxHealth = 100
  stat.Power = 0


  let currentEquippedItems = equippedItems
  if (stats.rogue.active) currentEquippedItems = equippedRogueItems 

  currentEquippedItems.forEach((item) => {

    if (item != undefined && item.slot === `Weapon`) {
      stat.AttackSpeed = (100 / (100*item.attackSpeed) * 100) -100
    }

    if (item != undefined && item.gearscore ) {

      stat.Gearscore += item.gearscore

    }

  });

  stat.Gearscore = stat.Gearscore/5


  currentEquippedItems.forEach((item) => {

    if (item !== undefined){

        if (typeof item.statsBase === 'function') {
            item.statsBase();
        }

        if (typeof item.stats === 'function') {
            item.stats();
        }

        if (item.gemSlot && item.gemSlot.red!==null) {
          const gemclass = eval(item.gemSlot.red)
          const gem = new gemclass()
          gem.stats();
      }    

    }

  });




  if (stats.rogue.active) {


    rpgPlayer.relicInventory.forEach((item) => {

      if (item.stats) {
        item.stats();

        if (item.itemData==="rainbow") item.stats();
    }
  
    });




  }


  






  for (i in enemies){
    if (enemies[i].card1){
      if (enemies[i].card1.got) enemies[i].card1.effect()
        if (enemies[i].card2.got) enemies[i].card2.effect()
          if (enemies[i].card3.got) enemies[i].card3.effect()
    }

        }


  for (i in buffs){
        if (buffs[i].time>0 && buffs[i].effect) { buffs[i].effect(); }
    }

 
    tierBonus()











  playerTurnSpeed = basePlayerTurnSpeed * (1 / (1 + stat.AttackSpeed / 100));

  updateDroprates()




  if (returnEnemyLevelGap()==="red") {

    const diff = (returnEnemyLevelGap("difference") * 10) + 20

    stat.NatureResist += diff
    stat.ElementalResist += diff
    stat.OccultResist += diff

  }










































  apprenticePoints = 0;
  gamblerPoints = 0;
  instrumentalistPoints = 0;

  for (i in talent) {
    
    if ('logic' in talent[i] && talent[i].active) talent[i].statUp = eval(talent[i].logic); 
    if (i.startsWith("TA") && talent[i].active) apprenticePoints++
    if (i.startsWith("TG") && talent[i].active) gamblerPoints++
    if (i.startsWith("TI") && talent[i].active) instrumentalistPoints++

  } //keeps updated all the statups of all skills, pretty poggies if you ask me
  
  activeDebuffs = 0
  for (i in buffs) if (buffs[i].time>0 && buffs[i].player) {activeDebuffs++;}

  talent.TI3.statUp = 0;
  if (activeDebuffs>0 && talent.TI3.active) talent.TI3.statUp = 0.5; else talent.TI3.statUp = 0;
  


if (currentSet === "cloth") {clothTier = true} else {clothTier = false}
if (currentSet === "explorer") {exlorerTier = 200} else {exlorerTier = 0}

multiplicativeHealingItems = 1 + items.I282.statUp;

let bestiaryMasteryStats = 0
if (unlocks.bestiary) bestiaryMasteryStats = medalsGot*10

playerMastery = stats.questsCompleted*10 + collectiblesGot*5 + totalArmoryGot*10 + bestiaryMasteryStats + stats.logsGot*5 + plantCompletionProgress*6
if (rpgPlayer.debugMastery!=0) playerMastery = rpgPlayer.debugMastery
if (buffs.B115.time>0 && playerMastery>buffs.B115.stacks)  playerMastery = buffs.B115.stacks

/*
restrainedMastery = 0;
if ("masteryCap" in areas[stats.currentArea] && enemies[areas[stats.currentArea].boss].killCount===0 && !settings.overpoweredToggle){

  restrainedMastery = areas[stats.currentArea].masteryCap

  if (playerMastery>areas[stats.currentArea].masteryCap){
    playerMastery = restrainedMastery
  }
  
}

if (settings.masteryToggle) playerMastery = 0;

*/

multiplicativeSellValue = 1;


//multiplicativeDropChance = ( 1  + buffs.B11.statUp + sakuraDropUp + buffs.B24.statUp + taleSnt.TA1E.statUp + talent.TG3.statUp + buffs.B36.statUp + items.I184.statUp +
//buffs.B55.statUp + collection3StatUp + armoryforgottenStatUp + talent.TG2E.statUp + buffs.B29.statUp + buffs.B63.statUp + talent.TG1E.statUp + items.I385.statUp) * luckStampStatUp * items.I315.statUp * (1+gardenDropChancePower)

//multiplicativeEXPGain = 1 + bluemoonExpUp + buffs.B9.statUp + buffs.B10.statUp + buffs.B23.statUp + items.I172.statUp + buffs.B35.statUp + items.I193.statUp + talent.TI2C.statUp + talent.TI0D.statUp + items.I432.statUp + buffs.B101.statUp + items.I3.statUp + items.I140.statUp2
additiveEXPGain = bluemoonExpUp + buffs.B9.statUp + buffs.B10.statUp + buffs.B23.statUp + items.I172.statUp + buffs.B35.statUp + items.I193.statUp + buffs.B101.statUp + items.I3.statUp + items.I140.statUp2 + items.I55.statUp + items.I337.statUp2
multiplicativeEXPGain =  (1+gardenExpGainPower) * (1+talent.TI0D.statUp) * (1+talent.TI2B3.statUp)
playerEXPGain = 1+ additiveEXPGain * multiplicativeEXPGain

armorAdditiveMaxHp = headAdditiveMaxHp + chestAdditiveMaxHp + legsAdditiveMaxHp + feetAdditiveMaxHp + handsAdditiveMaxHp + ringAdditiveMaxHp + trinketAdditiveMaxHp
additiveMaxHp = armorAdditiveMaxHp + buffs.B1.statUp
//multiplicativeMaxHp = 1 + (talent.TA2.statUp + buffs.B12.statUp + collection2StatUp + armorymasterworkStatUp);
//playerMaxHp = (25 + additiveMaxHp) * (multiplicativeMaxHp)   * (1+buildings.B1.statUp) * (1+armoryrunicStatUp);
multiplicativeMaxHp = 1 * items.I6.statUp * items.I80.statUp * (1+buffs.B12.statUp) * (1+talent.TA2.statUp) * (1+talent.TI1C.statUp) * (1-items.I23.statUp2) * (1+gardenHealthPower);


playerMaxHp = ((25 + additiveMaxHp) * multiplicativeMaxHp) /* * Math.pow(1.005, playerMastery) */


additiveStrength = strengthStampStatUp + items.I132.statUp + items.I135.statUp2 + items.I137.statUp + items.I15.statUp  + buffs.B45.statUp + items.I146.statUp2 + buffs.B61.statUp + items.I127.statUp2 + items.I134.statUp + items.I322.statUp + items.I336.statUp2 + items.I383.statUp2 + buffs.B98.statUp + items.I376.statUp3 + buffs.B20B.statUp
//multiplicativeStrength =  ( 1 + talent.TI1C.statUp + buffs.B45.statUp + buffs.B61.statUp + items.I15.statUp + talent.TI3E.statUp + buffs.B98.statUp )  * items.I317.statUp * (1+gardenStrengthPower) * (1+talent.TI3.statUp) * (1+buildings.B3.statUp) * (1+items.I376.statUp)
multiplicativeStrength =  (1+gardenStrengthPower) * (1+talent.TG1E.statUp) * (1+talent.TG2D1.statUp) * (1+talent.TI3E.statUp) * items.I376.statUp
playerStrength = 1+(additiveStrength * multiplicativeStrength);

playerOmni = 1

playerSteal = items.I136.statUp2 + items.I345.statUp + talent.TG2E1.statUp + buffs.B116.statUp



additiveSpellpower = items.I138.statUp2 + items.I139.statUp + items.I141.statUp + buffs.B46.statUp + buffs.B70.statUp + items.I168.statUp + items.I144.statUp + items.I145.statUp + buffs.B62.statUp + items.I335.statUp2 + items.I360.statUp + items.I383.statUp + buffs.B99.statUp + items.I20.statUp +  items.I378.statUp2 + items.I375.statUp2
//multiplicativeSpellpower = (1 + (items.I375.statUp*0.01) + buffs.B46.statUp + talent.TI0E.statUp + talent.TA1C.statUp + buffs.B70.statUp + buffs.B99.statUp) * items.I318.statUp * ;
multiplicativeSpellpower = (1+gardenSpellpower) * (1+talent.TA1G11.statUp) * (1+talent.TA1E.statUp) * (1+talent.TI3.statUp) * items.I378.statUp;
playerSpellpower = (1+(additiveSpellpower * multiplicativeSpellpower)  )* items.I376.statUp2 ;


multiplicativeCritChance = 1 + buffs.B62.hasteStampStatUp
playerCritChance = multiplicativeCritChance ;

/*
multiplicativeNatureDamage = (1 + buffs.B4.statUp + buffs.B15.statUp + items.I44.statUp + buffs.B19.statUp + talent.TI1B.statUp + talent.TI3.statUp) * natureStampStatUp * (1+gardenNaturePower);
armorNatureDamage = headAdditiveNatureDamage + chestAdditiveNatureDamage + legsAdditiveNatureDamage + feetAdditiveNatureDamage + handsAdditiveNatureDamage + ringAdditiveNatureDamage
additiveNatureDamage = weaponNatureDamage + armorNatureDamage+ exlorerTier
playerTotalNatureDamage = (additiveNatureDamage) * multiplicativeNatureDamage;

multiplicativeMightDamage = (1 + buffs.B5.statUp + buffs.B13.statUp  + buffs.B21.statUp + talent.TG2C.statUp + items.I45.statUp) *
armorMightDamage = headAdditiveMightDamage + chestAdditiveMightDamage + legsAdditiveMightDamage + feetAdditiveMightDamage + handsAdditiveMightDamage + ringAdditiveMightDamage
additiveMightDamage = weaponMightDamage + armorMightDamage
playerTotalMightDamage = (additiveMightDamage) * multiplicativeMightDamage;


multiplicativeElementalDamage = (( 1 ) + talent.TA3.statUp + buffs.B30.statUp + items.I173.statUp + buffs.B40.statUp)* elementalStampStatUp * (1+gardenElementalPower);
multiplicativeElementalDamage = (( 1 ) + talent.TA3.statUp + buffs.B30.statUp + items.I173.statUp + buffs.B40.statUp)* elementalStampStatUp * (1+gardenElementalPower);
additiveElementalDamage = weaponElementalDamage
playerTotalElementalDamage = (additiveElementalDamage) * multiplicativeElementalDamage

multiplicativeOccultDamage = ( 1 + bluemoonDmgUp  + buffs.B20.statUp + buffs.B32.statUp + buffs.B41.statUp + items.I192.statUp + buffs.B51.statUp) * occultStampStatUp * (1+gardenOccultPower);
let armorOccultDamage = headAdditiveOccultDamage + chestAdditiveOccultDamage + legsAdditiveOccultDamage + feetAdditiveOccultDamage + handsAdditiveOccultDamage + ringAdditiveOccultDamage
additiveOccultDamage = weaponOccultDamage + armorOccultDamage
playerTotalOccultDamage = (additiveOccultDamage) * multiplicativeOccultDamage;

multiplicativeDeificDamage = (1  +  ) * 
additiveDeificDamage = weaponDeificDamage
playerTotalDeificDamage = (additiveDeificDamage) * multiplicativeDeificDamage;
*/

natureDamageAdditive =  buffs.B4.statUp + buffs.B15.statUp + items.I44.statUp + buffs.B19.statUp + natureStampStatUp + buffs.B107.statUp + items.I59.statUp + items.I73.statUp + items.I76.statUp + items.I142.statUp + items.I141.statUp2 + items.I140.statUp + items.I321.statUp;
natureDamageMultiplicative =   (1+gardenNaturePower) * (1+talent.TI1B.statUp) * (1+talent.TI3C1.statUp);
natureDamageBonus = natureDamageAdditive * natureDamageMultiplicative

mightDamageAdditive =  items.I8.statUp + buffs.B5.statUp + buffs.B13.statUp  + buffs.B21.statUp + items.I45.statUp + mightStampStatUp + items.I133.statUp + items.I7.statUp  + items.I136.statUp + items.I132.statUp;
mightDamageMultiplicative =  (1+gardenMightPower) * (1+talent.TG2C.statUp) * (1+talent.TG2D4.statUp);
mightDamageBonus = mightDamageAdditive * mightDamageMultiplicative

occultDamageAdditive = bluemoonDmgUp  + buffs.B20.statUp + buffs.B32.statUp + buffs.B41.statUp + items.I192.statUp + occultStampStatUp + items.I167.statUp + items.I143.statUp2 + items.I147.statUp + buffs.B63.statUp + items.I78.statUp + buffs.B94.statUp;
occultDamageMultiplicative =  (1+gardenOccultPower) * (1+talent.TG2E.statUp) * (1+talent.TI2C.statUp);
occultDamageBonus = occultDamageAdditive * occultDamageMultiplicative

deificDamageAdditive = buffs.B31.statUp + items.I175.statUp + buffs.B38.statUp + deificStampStatUp + buffs.B18.statUp + items.I56.statUp + buffs.B114.statUp;
deificDamageMultiplicative =  (1+gardenDeificPower) * (1+talent.TA1G.statUp) * (1+talent.TG3.statUp) * (1+talent.TI0E.statUp);
deificDamageBonus = deificDamageAdditive * deificDamageMultiplicative

elementalDamageAdditive =  buffs.B30.statUp + items.I173.statUp + buffs.B40.statUp + elementalStampStatUp + items.I23.statUp2 + items.I23.statUp2 + items.I288.statUp2 + items.I334.statUp2 + items.I335.statUp + items.I338.statUp + items.I20.statUp2 + items.I27.statUp;
elementalDamageMultiplicative =  (1+gardenElementalPower) * (1+talent.TA3.statUp) * (1+talent.TA31.statUp) * items.I499.statUp * items.I500.statUp * items.I501.statUp * items.I502.statUp;
elementalDamageBonus = elementalDamageAdditive * elementalDamageMultiplicative

armorAdditiveRegen = headAdditiveRegen + chestAdditiveRegen + legsAdditiveRegen + feetAdditiveRegen + handsAdditiveRegen + ringAdditiveRegen
playerHpRegen = (rpgPlayer.baseHpRegen + additiveRegen + armorAdditiveRegen);

let esotericBrume = 0;
if (stats.currentArea==="A8") {esotericBrume = -0.15;} else esotericBrume = 0;


natureResist = items.I4.statUp + items.I74.statUp + items.I75.statUp  + items.I77.statUp + items.I131.statUp + items.I138.statUp + items.I139.statUp2 - natureDownStampStatUp + items.I72.statUp + items.I142.statUp + esotericBrume;
mightResist = items.I5.statUp + items.I134.statUp2 - mightDownStampStatUp + items.I169.statUp + items.I127.statUp + items.I72.statUp + items.I133.statUp2 + items.I135.statUp + esotericBrume;
elementalResist =  - elementalDownStampStatUp + items.I72.statUp + items.I288.statUp + items.I334.statUp + items.I336.statUp + items.I337.statUp + esotericBrume ;
occultResist = 0 - occultDownStampStatUp + items.I143.statUp + items.I144.statUp2 + items.I146.statUp + items.I147.statUp2 + items.I72.statUp + buffs.B20A.statUp + esotericBrume;
deificResist =  - deificDownStampStatUp + items.I72.statUp + esotericBrume;



//multiplicativeHaste = (1 - buffs.B7.statUp - buffs.B47.statUp - weaponHaste - buffs.B71.statUp - buffs.B72.statUp - buffs.B86.statUp - items.I2.statUp) * hasteStampStatUp older haste
//playerHaste = Math.min(1 - items.I2.statUp - items.I81.statUp - hasteStampStatUp + buffs.B86.statUp - buffs.B47.statUp + items.I23.statUp, 4)  old haste
playerHaste = 1/(1 + Math.max( items.I2.statUp + items.I81.statUp + hasteStampStatUp + buffs.B47.statUp + buffs.B86.statUp + items.I23.statUp + items.I320.statUp + items.I82.statUp + buffs.B71.statUp + buffs.B72.statUp + items.I385.statUp + items.I199.statUp + items.I85.statUp + items.I24.statUp + items.I171.statUp2, -0.99) )   

playerHealingBonus = 1 +  items.I206.statUp2 + items.I495.statUp


multiplicativeMiningDamage = 1
additiveMiningDamage = buffs.B37.statUp + weaponMiningDamage ;
playerMiningDamage = additiveMiningDamage * multiplicativeMiningDamage;

playerGatheringLevel = 0 + weaponGatheringLevel + buffs.B37.statUp + items.I117.statUp + buffs.B69.statUp + items.I387.statUp; 

additiveFishingLevel = 0 + items.I182.statUp + buffs.B22.statUp + buffs.B14.statUp + buffs.B69.statUp + buffs.B45.statUp + items.I162.statUp + items.I171.statUp ;
playerFishingLevel = additiveFishingLevel + rainFishingUp + items.I344.statUp + items.I145.statUp2;

additiveCoinsPerClick = items.I113.statUp + items.I124.statUp + items.I128.statUp + items.I202.statUp + items.I426.statUp + items.I401.statUp
//multiplicativeCoinsPerClick = 1 + buffs.B8.statUp + buffs.B25.statUp + buffs.B26.statUp + talent.TA1B.statUp + talent.TG1.statUp * (1+gardenPatPower);
multiplicativeCoinsPerClick = 1 * (1+talent.TG1.statUp) * (1+talent.TA1B.statUp) * (1+talent.TI2B2.statUp) * (1+buffs.B8.statUp) * (1+buffs.B25.statUp) * (1+buffs.B26.statUp) * (1+gardenPatPower)
playerCoinsPerClick = (10 + additiveCoinsPerClick) * multiplicativeCoinsPerClick;

playerClickRate = 100 / ( 1 + ( buffs.B27.statUp + buffs.B28.statUp ))

additiveMaxMana = 100 + talent.TA0C.statUp + items.I375.statUp;
multiplicativeMaxMana = 1
playerMaxMana = additiveMaxMana * multiplicativeMaxMana

playerPresentsMinigame = 6 + talent.TA0B.statUp + talent.TG1D.statUp + talent.TI0B.statUp + items.I217.statUp + items.I184.statUp
playerPresentMinigameTimer = 1200 - talent.TG0B.statUp

//multiplicativePenguinPower = 1 + buildings.B7.statUp * (1+talent.TA1G1.statUp) * (1+talent.TG2C1.statUp)
multiplicativePenguinPower = (1+talent.TA1G1.statUp) * (1+talent.TG2C1.statUp) * (1+items.I166.statUp)
playerPenguinPower = (100) * multiplicativePenguinPower

playerManaRegen = playerMaxMana*0.002+buffs.B66.statUp+gardenMagicRegenPower;

//setTimeout(() => {if (rpgPlayer.hp > playerMaxHp) { rpgPlayer.hp = playerMaxHp }  }, 400); //prevents overhealing
     

totalArmoryGot = armoryheirloomGot+armorymillionaireGot+armoryforgottenGot+armorymasterworkGot+armorybeastfallenGot+armoryreveredGot+armorysolsticeGot+
armoryancientGot+armorymalevolentGot+armorychosenGot+armorytoyboxGot+armoryrunicGot;

totalArmory = armoryheirloomTotal+armorymillionaireTotal+armoryforgottenTotal+armorymasterworkTotal+armorybeastfallenTotal+armoryreveredTotal+armorysolsticeTotal+
+armoryancientTotal+armorymalevolentTotal+armorychosenTotal+armorytoyboxTotal+armoryrunicTotal


playerWeaponDamage = weaponMightDamage + weaponNatureDamage + weaponElementalDamage + weaponDeificDamage + weaponOccultDamage + flatWeaponDamage

expectedPlayerDamage = playerWeaponDamage * (1+natureDamageBonus) * (1+mightDamageBonus) * (1+elementalDamageBonus) * (1+occultDamageBonus) * (1+deificDamageBonus) * playerStrength * playerSpellpower /* * Math.pow(1.005, playerMastery) */
   
flatWeaponDamage = items.I374.statUp





     
}

function updateStatsUI() {

    for (i in stat) {
        if (did("statDisplay"+i)) did("statDisplay"+i).style.display = stat[i] != 0 ? "flex" : "none";
        if (did("stat"+i)) did("stat"+i).innerHTML = beautify(stat[i]);
        if (i === "Gearscore") did("stat"+i).innerHTML = Math.ceil(stat[i]);
    }

}





function damageCalc(mode){


  let currentAlignBonus = 0
  if (equippedWeapon?.align === "Nature"){ currentAlignBonus = stat.NatureBonus }
  if (equippedWeapon?.align === "Occult"){ currentAlignBonus = stat.OccultBonus }
  if (equippedWeapon?.align === "Elemental"){ currentAlignBonus = stat.ElementalBonus }


  let alignEffective = false
  if (equippedWeapon?.align === "Nature" && enemies[stats.currentEnemy].align === 'occult') alignEffective = true
  if (equippedWeapon?.align === "Elemental" && enemies[stats.currentEnemy].align === 'nature') alignEffective = true
  if (equippedWeapon?.align === "Occult" && enemies[stats.currentEnemy].align === 'elemental') alignEffective = true

  //const alignFormula = (stat.Power) * (1+currentAlignBonus/100)
  //if (alignEffective !== "") alignFormula = ( (stat.Power) * (1+currentAlignBonus/100) ) * typestrength
  //const finalDamage = `${beautify((alignFormula*0.95).toFixed(0))}-${beautify((alignFormula*1.05).toFixed(0))}`

  let damagestep = stat.Power  //base factor

  if (currentAlignBonus!==0) { //factor align bonus
    damagestep = (stat.Power) * (1+currentAlignBonus/100)
    if (mode==="align") return  ((stat.Power) * (1+currentAlignBonus/100)) - stat.Power
  }

  if (alignEffective) { //factor effective bonus
    if (mode==="effective") return damagestep * typestrength - damagestep
    damagestep = damagestep * typestrength
  }
  
  if (returnEnemyLevelGap("difference")>0) { //factor level bonus
    if (mode==="level") return damagestep * (1 + (    Math.min(3,returnEnemyLevelGap("difference"))  *0.2)) - damagestep
    damagestep = damagestep * (1 + (    Math.min(3,returnEnemyLevelGap("difference"))  *0.2))
  }

  if (stat.CritChance>0){ //factor crit damage
    let critdmg = 1.5*1+stat.CritDamage/100
    if (mode==="crit") return damagestep*critdmg
  }


  if (mode==="dps"){ //dps
    return (damagestep*(1+statHidden.extraMultishot)) / (playerTurnSpeed/1000)
  }

  if (mode==="kps"){ //dps
    return  Math.min(1, damageCalc("dps") / enemies[stats.currentEnemy].hp()  )
  }

  return damagestep



}

/*
function updateStatsUI() {
  
    did("statsMiningDamage").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].tag==="mattock" ? "inline" : "none";
    did("statsFishingLevel").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].tag==="rod" && playerFishingLevel>0 ? "inline" : "none";
  
    did("statsElementalBonus").style.display = elementalDamageBonus > 0 ? "inline" : "none";
    did("statsNatureBonus").style.display = natureDamageBonus > 0 ? "inline" : "none";
    did("statsMightBonus").style.display = mightDamageBonus > 0 ? "inline" : "none";
    did("statsOccultBonus").style.display = occultDamageBonus > 0 ? "inline" : "none";
    did("statsDeificBonus").style.display = deificDamageBonus > 0 ? "inline" : "none";
  
  
    did("statsElementalResist").style.display = elementalResist !== 0 ? "inline" : "none";
    did("statsNatureResist").style.display = natureResist !== 0 ? "inline" : "none";
    did("statsMightResist").style.display = mightResist !== 0 ? "inline" : "none";
    did("statsOccultResist").style.display = occultResist !== 0 ? "inline" : "none";
    did("statsDeificResist").style.display = deificResist !== 0 ? "inline" : "none";
  
    did("statsHaste").style.display = playerHaste !== 1 ? "inline" : "none";
    did("statsStrength").style.display = playerStrength > 1 ? "inline" : "none";
    did("statsDropChance").style.display = multiplicativeDropChance > 1 ? "inline" : "none";
    did("statsExpMultiplier").style.display = playerEXPGain > 1 ? "inline" : "none";
    did("statsSpellpower").style.display =  playerSpellpower > 1 ? "inline" : "none";
  
    let displayedMastery = playerMastery
    //if (playerMastery===restrainedMastery && !settings.overpoweredToggle) displayedMastery = "<FONT COLOR='cyan'>"+areas[stats.currentArea].masteryCap+" <FONT COLOR='gray'>(max)"
    did("statsOmni").innerHTML = "❖&nbsp;Mastery: " + displayedMastery;
  
  
    did("statsHealth").innerHTML = "❖&nbsp;Max Health: " + beautify(playerMaxHp);
  
    if (rpgPlayer.weaponSlot!=="none" && "align" in items[rpgPlayer.weaponSlot]) did("statsNatureDamage").innerHTML = "❖&nbsp;Weapon Damage: " + beautify(playerWeaponDamage * (1+eval(items[rpgPlayer.weaponSlot].align+"DamageBonus")) * (playerStrength) /* * Math.pow(1.005, playerMastery)  + flatWeaponDamage); //says nature damage but its actually waepon damage
    if (rpgPlayer.weaponSlot!=="none" && "align" in items[rpgPlayer.weaponSlot]) did("statsNatureDamage").style.display="inline"; else did("statsNatureDamage").style.display="none";
    
  
    did("statsNatureBonus").innerHTML = "❖&nbsp;Nature Bonus: " + beautify((natureDamageBonus).toFixed(2) * 100) + "%";
    did("statsElementalBonus").innerHTML = "❖&nbsp;Elemental Bonus: " + beautify((elementalDamageBonus).toFixed(2) * 100) + "%";
    did("statsMightBonus").innerHTML = "❖&nbsp;Might Bonus: " + beautify((mightDamageBonus).toFixed(2) * 100) + "%";
    did("statsDeificBonus").innerHTML = "❖&nbsp;Deific Bonus: " + beautify((deificDamageBonus).toFixed(2) * 100) + "%";
    did("statsOccultBonus").innerHTML = "❖&nbsp;Occult Bonus: " + beautify((occultDamageBonus).toFixed(2) * 100) + "%";
  
  
    did("statsNatureResist").innerHTML = "❖&nbsp;Nature Resistance: " + beautify((natureResist).toFixed(2) * 100) + "%";
    did("statsElementalResist").innerHTML = "❖&nbsp;Elemental Resistance: " + beautify((elementalResist).toFixed(2) * 100) + "%";
    did("statsMightResist").innerHTML = "❖&nbsp;Might Resistance: " + beautify((mightResist).toFixed(2) * 100) + "%";
    did("statsDeificResist").innerHTML = "❖&nbsp;Deific Resistance: " + beautify((deificResist).toFixed(2) * 100) + "%";
    did("statsOccultResist").innerHTML = "❖&nbsp;Occult Resistance: " + beautify((occultResist).toFixed(2) * 100) + "%";
  
    did("statsHaste").innerHTML = "❖&nbsp;Attack Speed: " +beautify((Math.pow(playerHaste, -1) - 1).toFixed(2) * 100) + "%"; 
    did("statsStrength").innerHTML = "❖&nbsp;Strength: " + beautify((playerStrength-1).toFixed(2) * 100) + "%";
    did("statsSpellpower").innerHTML = "❖&nbsp;Spellpower: " + beautify((playerSpellpower-1).toFixed(2)*100) + "%";
    did("turtleName2").innerHTML = stats.turtleName;
    did("turtleLevel").innerHTML = "lvl " + rpgClass[stats.currentClass].level + "";
  
    did("statsMiningDamage").innerHTML = "❖&nbsp;Gathering Level: " + beautify(playerGatheringLevel);
    did("statsMiningBonus").innerHTML = "❖&nbsp;Gathering Bonus: " + beautify(multiplicativeMiningDamage * 100) + "%";
  
    did("statsFishingLevel").innerHTML = "❖&nbsp;Fishing Level: " + beautify(playerFishingLevel);
  
    did("statsDropChance").innerHTML = "❖&nbsp;Drop Bonus: " + beautify((multiplicativeDropChance-1) * 100) + "%";
    did("statsExpMultiplier").innerHTML = "❖&nbsp;EXP Bonus: " + beautify((playerEXPGain-1).toFixed(2) * 100) + "%";
  
  }*/



    for (i in stat) {
      if (did("statDisplay"+i)) statsTooltip("statDisplay"+i)
    }

    function statsTooltip(id){

    
    did(id).addEventListener("mouseenter", function () {
      let statDesc = ``


      if (id==="statDisplayGearscore") statDesc = `Your averaged equipped item level`;

      if (id==="statDisplayMaxHealth") statDesc = `Determines your total HP. Your passive regeneration is 5% of this stat per second (${beautify(stat.MaxHealth/20)})`;


      /*
      let currentAlignBonus = 0

      if (equippedWeapon?.align === "Nature"){ currentAlignBonus = stat.NatureBonus }
      if (equippedWeapon?.align === "Occult"){ currentAlignBonus = stat.OccultBonus }
      if (equippedWeapon?.align === "Elemental"){ currentAlignBonus = stat.ElementalBonus }


      let alignEffective = ""
      if (equippedWeapon?.align === "Nature" && enemies[stats.currentEnemy].align === 'occult') alignEffective = "(Super Effective)"
      if (equippedWeapon?.align === "Elemental" && enemies[stats.currentEnemy].align === 'nature') alignEffective = "(Super Effective)"
      if (equippedWeapon?.align === "Occult" && enemies[stats.currentEnemy].align === 'elemental') alignEffective = "(Super Effective)"

      let formula = (stat.Power) * (1+currentAlignBonus/100)
      if (alignEffective !== "") formula = ( (stat.Power) * (1+currentAlignBonus/100) ) * typestrength

      const finalDamage = `${beautify((formula*0.95).toFixed(0))}-${beautify((formula*1.05).toFixed(0))}`

      let damagestep = 0

      let calcBase = ``
      if (stat.Power!==0) {
        damagestep = stat.Power
        calcBase = `<br>+ ${beautify(stat.Power)} Base Power`}


      let calcAlign = ``
      if (currentAlignBonus!==0) {
        damagestep = (stat.Power) * (1+currentAlignBonus/100)
        calcAlign = `<br>+ ${beautify((    ((stat.Power) * (1+currentAlignBonus/100)) - stat.Power    ).toFixed(0))} Align Bonus (${currentAlignBonus}%)`
        }
      
      let calcEffective = ``
      if (alignEffective!=="") {
        calcEffective = `<br>+ ${beautify(  ( (stat.Power) * (1+currentAlignBonus/100) * typestrength - ((stat.Power) * (1+currentAlignBonus/100)) ).toFixed(0)   ) } ▲ Effective (x${typestrength})`
        damagestep = (stat.Power) * (1+currentAlignBonus/100) * typestrength
      }
      
      let calcLevel = ``
      if (returnEnemyLevelGap("difference")>0) {
        calcLevel = `<br>+ ${  beautify( (( damagestep * (1 + (    Math.min(3,returnEnemyLevelGap("difference"))  *0.2))   ) - damagestep ).toFixed(0) )  } Level Bonus (x${1 + (    Math.min(3,returnEnemyLevelGap("difference"))  *0.2)})`
        damagestep = (damagestep * (1 + (    Math.min(3,returnEnemyLevelGap("difference"))  *0.2))).toFixed(0)
      
      }


      let calcCrit = ""
      if (stat.CritChance>0){ 
        let critdmg = 1.5*1+stat.CritDamage/100
        calcCrit = `<span style="color:gray"> with a ${stat.CritChance}% chance to deal ${beautify(((damagestep*critdmg)*0.95).toFixed(0))} - ${beautify(((damagestep*critdmg)*1.05).toFixed(0))} (x${critdmg})</span>`
      }

      let calcFinalDamage = `<br><span style="color:gray; opacity:0.5">-------------------------</span><br>Final Damage: ${beautify(damagestep*0.95)} - ${beautify(damagestep*1.05)}${calcCrit}`

      let calcDPS = `<br>DPS: ~${beautify( (damagestep*(1+statHidden.extraMultishot)) / (playerTurnSpeed/1000) )}`

      let calcKPS = `<br>Kills /s: ~${beautify( (damagestep*(1+statHidden.extraMultishot)) / (playerTurnSpeed/1000) )}`

      */



      let currentAlignBonus = 0
      if (equippedWeapon?.align === "Nature"){ currentAlignBonus = stat.NatureBonus }
      if (equippedWeapon?.align === "Occult"){ currentAlignBonus = stat.OccultBonus }
      if (equippedWeapon?.align === "Elemental"){ currentAlignBonus = stat.ElementalBonus }
    
    
      let alignEffective = false
      if (equippedWeapon?.align === "Nature" && enemies[stats.currentEnemy].align === 'occult') alignEffective = true
      if (equippedWeapon?.align === "Elemental" && enemies[stats.currentEnemy].align === 'nature') alignEffective = true
      if (equippedWeapon?.align === "Occult" && enemies[stats.currentEnemy].align === 'elemental') alignEffective = true
    


      let calcBase = ``
      if (stat.Power!==0) { calcBase = `<br>+ ${beautify(stat.Power)} Base Power` }
      

      let calcAlign = ``
      if (currentAlignBonus!==0) {
        calcAlign = `<br>+ ${beautify(damageCalc("align"))} Align Bonus (${currentAlignBonus}%)`
      }

      let calcEffective = ``
      if (alignEffective) {
        calcEffective = `<br>+ ${beautify(damageCalc("effective")) } ▲ Effective (x${typestrength})`
      }

      let calcLevel = ``
      if (returnEnemyLevelGap("difference")>0) {
        calcLevel = `<br>+ ${  beautify( damageCalc("level") )  } Level Bonus (x${1 + (    Math.min(3,returnEnemyLevelGap("difference"))  *0.2)})`
      }

      let calcCrit = ""
      if (stat.CritChance>0){ 
        let critdmg = 1.5*1+stat.CritDamage/100
        calcCrit = `<span style="color:gray"> with a ${stat.CritChance}% chance to deal ${beautify(((damageCalc("crit"))*0.95).toFixed(0))} - ${beautify(((damageCalc("crit"))*1.05).toFixed(0))} (x${critdmg} Crit Damage)</span>`
      }

      let calcFinalDamage = `<br><span style="color:gray; opacity:0.5">-------------------------</span><br>❖ Final Damage: ${beautify(damageCalc()*0.95)} - ${beautify(damageCalc()*1.05)}${calcCrit}`

      let calcDPS = `<br><span style="color:#C78D88">◈ DPS: ~${beautify( damageCalc("dps") )}</span>`

      let calcKPS = `<span style="color:#C788A9"><br>⬖ Kills /s: ~${ damageCalc("kps").toFixed(1) }</span>`


      if (id==="statDisplayPower") statDesc = `Determines your raw damage before calculations<br><br>${colorTag("Damage Calculator","#007CA8")}${calcBase}${calcAlign}${calcEffective}${calcLevel}${calcFinalDamage}${calcDPS}${calcKPS}`;
      
      if (id==="statDisplayNatureBonus") statDesc = `Increases damage dealt of all Nature Damage sources`;
      if (id==="statDisplayElementalBonus") statDesc = `Increases damage dealt of all Elemental Damage sources`;
      if (id==="statDisplayOccultBonus") statDesc = `Increases damage dealt of all Occult Damage sources`;
      if (id==="statDisplayNatureResist") statDesc = `Decreases damage received from all Nature Damage sources`;
      if (id==="statDisplayElementalResist") statDesc = `Decreases damage received from all Elemental Damage sources`;
      if (id==="statDisplayOccultResist") statDesc = `Decreases damage received from all Occult Damage sources`;
      if (id==="statDisplayExpBonus") statDesc = `Increases the amount of EXP received from defeated foes`;
      if (id==="statDisplayHealingBonus") statDesc = `Increases the amount of HP received from all healing sources`;
      if (id==="statDisplayLuck") statDesc = `Increases the chance of item drops from defeated foes. Does not affect containers, collectibles or other drop sources, and can not reduce the rate past 1/100 (1/50 in Fast Mode)`;
      if (id==="statDisplayGatheringPower") statDesc = `Increases damage dealt to gathering nodes such as herbs and ores`;
      if (id==="statDisplayFishingLevel") statDesc = `Increases quality of fished loot. Decreases trash fished and might allow for new loot`;
      if (id==="statDisplayExtraLives") statDesc = `Automatically revive a set amount of times during bosses with 30% of your Max Health. Refreshes afterwards`;
      if (id==="statDisplayDodgeChance") statDesc = `Increases the chance to completely negate incoming damage`;
      if (id==="statDisplayAttackSpeed") statDesc = `Determines the speed of your attacks (Currently attacking every ${(( playerTurnSpeed)/1000).toFixed(1)} seconds)`;
      if (id==="statDisplayDebuffBonus") statDesc = `Increases the damage dealt of all debuff sources`;
      if (id==="statDisplayIncome") statDesc = `Determines how many Shells will drop from a defeated foe. Gray-colored-level enemies will drop 90% less shells`; //Red-colored-level enemies drop 1.5x the amount while green ones drop 1.5x less. Gray-colored-level ones do not drop shells
      if (id==="statDisplayCritChance") statDesc = `Increases the chance to deal x${(1.5*1+stat.CritDamage/100).toFixed(2)} damage. Critical hits are marked with a (!)`;
      if (id==="statDisplayCritDamage") statDesc = `Increases damage dealt with Critical Hits (x${(1.5*1+stat.CritDamage/100).toFixed(2)} damage)`;
      if (id==="statDisplayThorns") statDesc = `Determines how much of all damage received gets returned to the foe, capped at 200% of your Power`;
      if (id==="statDisplayStealLevel") statDesc = `Determines how easy the Thief minigame is`;
      if (id==="statDisplayLifesteal") statDesc = `Determines how much of all damage dealt gets converted into HP`;
      if (id==="statDisplayLumaPower") statDesc = `Increases damage dealt by clicking on the enemy`;
      if (id==="statDisplayExtraActions") statDesc = `Increases the amount of Combat Actions you can do`;
      if (id==="statDisplayOfflineBonus") statDesc = `Increases offline production`;

        
        


      let infoIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><defs><mask id="ipTInfo0"><g fill="none"><path fill="#555" stroke="#fff" stroke-linejoin="round" stroke-width="4" d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"/><path fill="#fff" fill-rule="evenodd" d="M24 11a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5" clip-rule="evenodd"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M24.5 34V20h-2M21 34h7"/></g></mask></defs><path fill="#a09eff" d="M0 0h48v48H0z" mask="url(#ipTInfo0)"/></svg>`
      did("tooltipDescription").innerHTML = `<div class="statInfobox">${infoIcon}<span>${statDesc}<span></div>`;

      did("tooltip").style.display = "flex";
      did("tooltip").style.width = "20rem";
      did("upperTooltip").style.display = "none";
      did("tooltipFlavor").textContent = "";
      did("tooltipImage").style.display = "none";
      const referenceDiv = did(id);
const movingDiv = did('tooltip');
const referenceRect = referenceDiv.getBoundingClientRect();
const tooltipRect = movingDiv.getBoundingClientRect();

const newLeft = referenceRect.right / (stats.zoomLevel / 100); 
const newTop = referenceRect.top / (stats.zoomLevel / 100);

movingDiv.style.left = `${newLeft+10}px`;
movingDiv.style.top = `${newTop}px`;

    });

    did(id).addEventListener("mouseleave", function () {
      resetTooltip();
    });

  }



  let chances = {}
  //not actual chances! check actual chances in stats/updateDroprates()!
  chances.enemies = {}
  chances.boss = {}
  chances.reforges = {}
  chances.chest = {}
  chances.oregem = {}

  let nofarmToggleBonus = 1

  function updateDroprates(){


    nofarmToggleBonus = 1
    if (settings.nofarmToggle) nofarmToggleBonus = 2

    let heatMultiplier = 1
    if (areas[stats.currentArea].heat>1) {heatMultiplier = ( Math.pow(3, areas[stats.currentArea].heat-1) )} else heatMultiplier = 1

    heatMultiplier *= nofarmToggleBonus
    if (stat.Luck!==0) heatMultiplier += heatMultiplier * (stat.Luck/100)
  
    chances.enemies.poor =  Math.max( 100/nofarmToggleBonus,   100 / nofarmToggleBonus      ) //quest items,enemy materials, very common h1 gear
    chances.enemies.common =  Math.max( 100/nofarmToggleBonus,   500 / nofarmToggleBonus      ) //rare enemy material
    chances.enemies.uncommon =  Math.max( 100/nofarmToggleBonus,   Math.floor(5000 / heatMultiplier)      ) //Expected at h3
    chances.enemies.rare =  Math.max( 100/nofarmToggleBonus,   Math.floor(15000 / heatMultiplier)      ) //Expected at h4
    chances.enemies.epic =  Math.max( 100/nofarmToggleBonus,   Math.floor(15000*3 / heatMultiplier)      ) //A bit of time investment in h4
    chances.enemies.mythic =  Math.max( 100/nofarmToggleBonus,   Math.floor(40000 / heatMultiplier)      )
    chances.enemies.legendary =  Math.max( 100/nofarmToggleBonus,   Math.floor(80000 / heatMultiplier)      )



    if (areas[stats.currentArea].heat>1) {heatMultiplier = ( Math.pow(4, areas[stats.currentArea].heat-1) )} else heatMultiplier = 1
    heatMultiplier *= nofarmToggleBonus
    if (stat.Luck!==0) heatMultiplier += heatMultiplier * (stat.Luck/100)


    chances.enemies.h0 =  Math.max( 100/nofarmToggleBonus,   500 / nofarmToggleBonus      ) //rare non scaling mat
    chances.enemies.h1 =  Math.max( 100/nofarmToggleBonus,   Math.floor(100 / heatMultiplier)      )
    chances.enemies.h2 =  Math.max( 100/nofarmToggleBonus,   Math.floor(500 / heatMultiplier)      )
    chances.enemies.h3 =  Math.max( 100/nofarmToggleBonus,   Math.floor(2000 / heatMultiplier)      )
    chances.enemies.h4 =  Math.max( 100/nofarmToggleBonus,   Math.floor(10000 / heatMultiplier)      )
    chances.enemies.h5 =  Math.max( 100/nofarmToggleBonus,   Math.floor(50000 / heatMultiplier)      )









    chances.chest.poor = 1
    chances.chest.common = 5 / nofarmToggleBonus
    chances.chest.uncommon = 10 / nofarmToggleBonus
    chances.chest.rare = 30 / nofarmToggleBonus
    chances.chest.epic = 60 / nofarmToggleBonus
    chances.chest.mythic = 200 / nofarmToggleBonus
    chances.chest.legendary = 200 / nofarmToggleBonus




    if (areas[stats.currentArea].heat>1) {heatMultiplier = ( Math.pow(1.5, areas[stats.currentArea].heat-1) )} else heatMultiplier = 1
    heatMultiplier *= nofarmToggleBonus
    if (stat.Luck!==0) heatMultiplier += heatMultiplier * (stat.Luck/100)



    chances.boss.upgradeMaterial = Math.floor(5 * areas[stats.currentArea].heat)
    chances.boss.poor = 50
    chances.boss.common = Math.floor(10 / heatMultiplier)
    chances.boss.uncommon = Math.floor(20 / heatMultiplier)
    chances.boss.rare = Math.floor(50 / heatMultiplier)
    chances.boss.epic = Math.floor(100 / heatMultiplier)
    chances.boss.mythic = Math.floor(300 / heatMultiplier)
    chances.boss.legendary = Math.floor(1000 / heatMultiplier)



    if (areas[stats.currentArea].heat>1) {heatMultiplier = ( Math.pow(2, areas[stats.currentArea].heat-1) )} else heatMultiplier = 1
    heatMultiplier *= nofarmToggleBonus
    if (stat.Luck!==0) heatMultiplier += heatMultiplier * (stat.Luck/100)

      
      chances.boss.h1 = Math.max(Math.ceil(5/nofarmToggleBonus), Math.floor(10 / heatMultiplier) )
      chances.boss.h2 = Math.max(Math.ceil(5/nofarmToggleBonus), Math.floor(20 / heatMultiplier) )
      chances.boss.h3 = Math.max(Math.ceil(5/nofarmToggleBonus), Math.floor(40 / heatMultiplier) )
      chances.boss.h4 = Math.max(Math.ceil(5/nofarmToggleBonus), Math.floor(80 / heatMultiplier) )
      chances.boss.h5 = Math.max(Math.ceil(5/nofarmToggleBonus), Math.floor(160 / heatMultiplier) )


    



    heatMultiplier /= nofarmToggleBonus



    if (areas[stats.currentArea].heat>1) {heatMultiplier = ( Math.pow(1.35, areas[stats.currentArea].heat-1) )} else heatMultiplier = 1 //old formula, applies only for reforges, aparently

    chances.reforges.tier1 = Math.floor(5 / Math.pow(2, heatMultiplier-1))
    chances.reforges.tier2 = Math.floor(50 / Math.pow(4, heatMultiplier-1) )
    chances.reforges.tier3 = Math.floor(800 / Math.pow(10, heatMultiplier-1))
    chances.reforges.tier4 = Math.floor(10000 / Math.pow(20, heatMultiplier-1))

  
  
    chances.enemies.materialCount = 1 + (areas[stats.currentArea].heat-1) * nofarmToggleBonus

    heatMultiplier = 1
    heatMultiplier *= nofarmToggleBonus
    if (stat.Luck!==0) heatMultiplier += heatMultiplier * (stat.Luck/100)

    chances.oregem.common = Math.max( 100/nofarmToggleBonus,    Math.floor(100 / heatMultiplier)     )
    chances.oregem.uncommon = Math.max( 100/nofarmToggleBonus,    Math.floor(200 / heatMultiplier)     )
    chances.oregem.rare = Math.max( 100/nofarmToggleBonus,    Math.floor(300 / heatMultiplier)     )
  
  }


    
document.addEventListener('DOMContentLoaded', statsInitialisation);

function statsInitialisation(){
    equipGear();
    statsUpdate();
    updateStatsUI();
    updateDroprates();
}