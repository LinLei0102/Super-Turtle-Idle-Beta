
let itemInventory = []

/*
item.I1 = {
    name: 'Conqueror of 0.3 Medal',
    flavor: '"A winner is you!"',
    description : function() { return `miau miau miau ${this.flavor}`; },
    quality: 'Soulbound',
    sell: 1,
    max: 1
};
*/


class Item {
    static timesGot = 0
    static count = 0

    constructor(properties = {}) {
        this.img = 0;
        this.name = `Generic Item`;
        this.quality = `Common`;
        this.sort = `Material`;
        this.value = function() { return 100 }
        Object.assign(this, properties);
    }
}

class Equipable extends Item {

    static upgrade = 0

    constructor(properties = {}) {
        super(properties);
        this.canReforge = true;
        this.loadouts = []
        this.value = function() {return returnItemValue(this)}
        Object.assign(this, properties);
    }

    statsBase(){ //handles automated equip stats

        if (this.baseHp!==undefined) stat.MaxHealth += this.finalHp()
        if (this.damage!==undefined) stat.Power += this.finalDamage()

        //armor
        if (this.prefix1===`Resonant`) stat.ElementalBonus += 5
        if (this.prefix1===`Feral`) stat.NatureBonus += 5
        if (this.prefix1===`Veiled`) stat.OccultBonus += 5
        if (this.prefix1===`Flameproof`) stat.ElementalResist += 5
        if (this.prefix1===`Brambled`) stat.NatureResist += 5
        if (this.prefix1===`Warded`) stat.OccultResist += 5
        //t2
        if (this.prefix2===`Bound`) stat.ElementalBonus += 10
        if (this.prefix2===`Infused`) stat.NatureBonus += 10
        if (this.prefix2===`Somber`) stat.OccultBonus += 10
        if (this.prefix2===`Aligned`) stat.ElementalResist += 10
        if (this.prefix2===`Shamanistic`) stat.NatureResist += 10
        if (this.prefix2===`Sneaky`) stat.OccultResist += 10
        //t3
        if (this.prefix3===`Arch`) stat.ElementalBonus += 15
        if (this.prefix3===`Primal`) stat.NatureBonus += 15
        if (this.prefix3===`Lunar`) stat.OccultBonus += 15
        if (this.prefix3===`Primordial`) stat.ElementalResist += 15
        if (this.prefix3===`Primeval`) stat.NatureResist += 15
        if (this.prefix3===`Radiant`) stat.OccultResist += 15



        //misc

        if (this.prefix1===`Jagged`) stat.Thorns += 10
        if (this.prefix1===`Drowsy`) stat.OfflineBonus += 5
        if (this.prefix1===`Heartfelt`) stat.LumaPower += 10

        if (this.prefix2===`Widsithing`) stat.ExpBonus += 10
        if (this.prefix2===`Medical`) stat.HealingBonus += 10
        if (this.prefix2===`Spiked`) stat.Thorns += 20
        if (this.prefix2===`Sleepy`) stat.OfflineBonus += 10
        if (this.prefix2===`Hopeful`) stat.LumaPower += 20

        if (this.prefix3===`Lazaro`) stat.ExtraLives += 1
        if (this.prefix3===`Vampiric`) stat.Lifesteal += 5
        if (this.prefix3===`Lucky`) stat.Luck += 15

        

    }
}

function returnItemValue(item){
    let multiplier = 1
    if (item.prefixTier != undefined) multiplier = item.prefixTier+1



    
    if (item.quality === `Common`) return 200 * multiplier
    if (item.quality === `Uncommon`) return 500 * multiplier
    if (item.quality === `Rare`) return 800 * multiplier
    if (item.quality === `Epic`) return 1000 * multiplier
}

class Stackable extends Item {
    constructor(properties = {}) {
        super(properties);
        this.isStackable = true;
        Object.assign(this, properties);
    }
}

class Hat extends Item {
    constructor(properties = {}) {
        super(properties);
        this.sort = `Hat`;
        this.img = 543;
        Object.assign(this, properties);
    }

    init(){


        this.paint = rng(0,365);
        if (chance(1/1)) this.glimmer = rng(1,totalGlimmerCount)







    }
}

const hatList = []

class HatNone extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Remove Cosmetics`;
        this.flavor = `"Had a change of hat?"`;
        this.img = 0;
        Object.assign(this, properties);
    }
}

class HatBlush extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Blushy Cheeks`;
        this.flavor = `"Saw yourself in the mirror, cutie pie?"`;
        this.img = 1;
        Object.assign(this, properties);
    }
} hatList.push(HatBlush)

class HatParty extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Party Hat`;
        this.flavor = `"WTB turtle gf"`;
        this.img = 2;
        this.quality = "Rare";
        Object.assign(this, properties);
    }
}

class HatFlower extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Flower Garland`;
        this.noScrap = true
        this.flavor = `"Make turtle, not war."`;
        this.img = 3;
        Object.assign(this, properties);
    }
} hatList.push(HatFlower)

class HatAngry extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Anger Point`;
        this.flavor = `"I've never saw the turtle like this, I promise."`;
        this.img = 4;
        Object.assign(this, properties);
    }
} hatList.push(HatAngry)


class HatTrucker extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Trucker Hat`;
        this.flavor = `"Give me your hat."`;
        this.img = 5
        Object.assign(this, properties);
    }
} hatList.push(HatTrucker)


class HatTeamLeader extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Team Leader`;
        this.flavor = `"Its Tuesday, my dudes."`;
        this.img = 6;
        this.quality = "Rare";
        Object.assign(this, properties);
    }
} hatList.push(HatTeamLeader)

class HatAttorney extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Attorney Wig`;
        this.flavor = `"Stop showing me your badge already."`;
        this.img = 7
        Object.assign(this, properties);
    }
} hatList.push(HatAttorney)

class HatBunny extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Bunny Ears`;
        this.flavor = `"The turtle conquered the moon already."`;
        this.img = 8
        Object.assign(this, properties);
    }
} hatList.push(HatBunny)

class HatKitsune extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Kitsune Mask`;
        this.flavor = `"Fleeing the hunter, dove into a pond. In a flash, it became turtle, its fiery tails replaced by a hard shell. The hunter, puzzled, picked it up—only to find the turtle smiling slyly before slipping from his grasp."`;
        this.img = 9
        this.quality = "Rare";
        Object.assign(this, properties);
    }
} hatList.push(HatKitsune)

class HatScarlet extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Silly Hat`;
        this.flavor = `"Either belongs to a child, or a god, or both."`;
        this.img = 10
        this.quality = "Rare";
        Object.assign(this, properties);
    }
} hatList.push(HatScarlet)

class HatBizarre extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Bizarre Hat`;
        this.flavor = `"Twenty-four before my love and I'll be there."`;
        this.img = 11
        this.quality = "Rare";
        Object.assign(this, properties);
    }
} hatList.push(HatBizarre)

class HatPixelGlasses extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Pixelated Shades`;
        this.flavor = `"A relic of the past."`;
        this.img = 12
        Object.assign(this, properties);
    }
} hatList.push(HatPixelGlasses)

class HatDevil extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Devilish Costume`;
        this.flavor = `"They are just a costume, of course."`;
        this.img = 13
        Object.assign(this, properties);
    }
} hatList.push(HatDevil)

class HatClown extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Clown Wig`;
        this.flavor = `"The fool laughs, the jester understands."`;
        this.img = 14
        Object.assign(this, properties);
    }
} hatList.push(HatClown)

class HatCowboy extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Yeehat`;
        this.flavor = `"You dig."`;
        this.img = 15
        Object.assign(this, properties);
    }
} hatList.push(HatCowboy)

class HatBanana extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Banana Hat`;
        this.flavor = `"Organic waste will never be a fashion statement, they said."`;
        this.img = 16
        this.quality = "Rare";
        Object.assign(this, properties);
    }
} hatList.push(HatBanana)

class HatCrown extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Regal Crown`;
        this.flavor = `"Kneel before your turtleness."`;
        this.img = 17
        Object.assign(this, properties);
    }
} hatList.push(HatCrown)

class HatStrawberry extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Strawberry Sprout`;
        this.flavor = `"Cute, and probably parasitic."`;
        this.img = 18
        Object.assign(this, properties);
    }
} hatList.push(HatStrawberry)

class HatFake extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Identity Theft`;
        this.flavor = `"Your majesty, he loaded my imported data."`;
        this.img = 19
        Object.assign(this, properties);
    }
} hatList.push(HatFake)

class HatGraduation extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Graduation Cap`;
        this.flavor = `"Now draw her getting her diploma."`;
        this.img = 20
        Object.assign(this, properties);
    }
} hatList.push(HatGraduation)

class HatRibbon extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Giant Ribbon`;
        this.flavor = `"Para mi?"`;
        this.img = 21
        Object.assign(this, properties);
    }
} hatList.push(HatRibbon)

class HatChainsaw extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Facial Chainsaw`;
        this.flavor = `"These accesory trends are getting out of hand real quick."`;
        this.img = 22
        Object.assign(this, properties);
    }
} hatList.push(HatChainsaw)

class HatVenom extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Devilish Eyepatch`;
        this.flavor = `"Those are just turtles..."`;
        this.img = 23
        Object.assign(this, properties);
    }
} hatList.push(HatVenom)

class HatSims extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Mind-Controlling Pylon`;
        this.flavor = `"CTRL + SHIFT + C"`;
        this.img = 24;
        this.quality = "Rare";
        Object.assign(this, properties);
    }
} hatList.push(HatSims)

class HatNasal extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Nasal Afro`;
        this.flavor = `"Friendship first."`;
        this.img = 25;
        this.quality = "Rare";
        Object.assign(this, properties);
    }
} hatList.push(HatNasal)

class HatLightning extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Lightning Aura`;
        this.flavor = `"WHAT KIND OF JUICE DID HE DRINK?!"`;
        this.img = 26;
        this.quality = "Rare";
        Object.assign(this, properties);
    }
} hatList.push(HatLightning)

class HatSparkly extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Sparkly Aura`;
        this.flavor = `"We are all turtles in human clothing."`;
        this.img = 27;
        this.quality = "Rare";
        Object.assign(this, properties);
    }
} hatList.push(HatSparkly)

class HatRelax extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Relaxed Hat`;
        this.flavor = `"..."`;
        this.img = 28;
        this.quality = "Rare";
        Object.assign(this, properties);
    }
} hatList.push(HatRelax)

class HatCat extends Hat {
    constructor(properties = {}) {
        super(properties);
        this.name = `Cat Ears`;
        this.flavor = `"Truly a terrifying genetically-modified beast."`;
        this.img = 29;
        Object.assign(this, properties);
    }
} hatList.push(HatCat)

class Material extends Stackable {
    constructor(properties = {}) {
        super(properties);
        Object.assign(this, properties);
    }
}

class Consumable extends Stackable {
    constructor(properties = {}) {
        super(properties);
        this.sort = `Consumable`;
        Object.assign(this, properties);
    }
}

class Key extends Stackable {
    constructor(properties = {}) {
        super(properties);
        this.sort = `Key`;
        Object.assign(this, properties);
    }
}


class CoinPile1 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Shell Bundle`;
        this.flavor = `"A modest, neatly-staked tower of Shells. They say money doesnt bring happiness, but Shells do."`;
        this.source = `Dropped from presents, dungeons and other rare sources. Can be sold for 2000 shells`;
        this.img = 541;
        this.quality = `Uncommon`;
        this.value = function() { return 2000 }

        Object.assign(this, properties);
    }
}

class CoinPile2 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Shell Pile`;
        this.flavor = `"A generous, neatly-staked tower of Shells. They say money doesnt bring happiness, but Shells do."`;
        this.source = `Dropped from presents, dungeons and other rare sources. Can be sold for 20000 shells`;
        this.img = 542;
        this.quality = `Rare`;
        this.value = function() { return 20000 }
        Object.assign(this, properties);
    }
}

class ScutePile1 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Prism Bundle`;
        this.flavor = `"Time is gold, and these are way shinier than gold."`;
        this.description = function() { return `<span style="color:#1eff00">★ Use: Obtain 100 Prism Scutes</span>`}
        this.img = 544;
        this.quality = `Rare`;
        this.canMultiuse = true
        Object.assign(this, properties);
    }

    use(){
        rpgPlayer.scutes+=100;
        this.constructor.count--
        playSound("audio/coins.mp3")
        playSound("audio/retro2.mp3")
        updateCounters()
    }
}

class ScutePile2 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Prism Trove`;
        this.flavor = `"Time is gold, and these are way shinier than gold."`;
        this.description = function() { return `<span style="color:#1eff00">★ Use: Obtain 2000 Prism Scutes</span>`}
        this.img = 543;
        this.quality = `Mythic`;
        this.canMultiuse = true
        this.value = function() { return 5000 }
        Object.assign(this, properties);
    }
    use(){
        rpgPlayer.scutes+=2000;
        this.constructor.count--
        playSound("audio/coins.mp3")
        playSound("audio/retro2.mp3")
        updateCounters()
    }
}

class ExpGummy1 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Experience Gummy`;
        this.flavor = `"A foul-smelling rag for the forehead. Unfortunately, it goes in the head slot."`;
        this.description = function() { return `<span style="color:#1eff00">Use: Increase EXP gain by 20% for 1 hour<br>Merge: Combine 10 into a higher-quality item</span>`}
        this.img = 547;
        this.quality = `Uncommon`;
        Object.assign(this, properties);
    }
    use(){}
}

class ExpGummy2 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Golden Experience Gummy`;
        this.flavor = `"A foul-smelling rag for the forehead. Unfortunately, it goes in the head slot."`;
        this.description = function() { return `<span style="color:#1eff00">Use: Increase EXP gain by 300% for 1 hour<br>Merge: Combine 10 into a higher-quality item</span>`}
        this.img = 548;
        this.quality = `Rare`;
        this.mergeStack = 10;
        Object.assign(this, properties);
    }
    use(){}
    merge(){
        this.constructor.count-=this.mergeStack
        spawnItem(ExpGummy3)
    }
}

class Geode1 extends Stackable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Rough Geode`;
        this.flavor = `"A seemingly-uninteresting looking rock formation. However, your gut tells you there is more than meets the eye."`;
        this.source = `Obtained by opening chests. Can be opened by a blacksmith`;
        this.img = 489;
        this.quality = `Common`;
        this.mergeStack = 10;
        Object.assign(this, properties);
    }
}

class GoldenClover extends Key {
    constructor(properties = {}) {
        super(properties);
        this.name = `Golden Clover`;
        this.flavor = `"Today seems like a good day to buy lottery."`;
        this.source = `Obtained randomly as a 1/777777 chance`;
        this.img = 102;
        this.quality = `Legendary`;
        this.value = function() { return 777 }
        Object.assign(this, properties);
    }
}

class ExpGummy3 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Relic Experience Gummy`;
        this.flavor = `"A foul-smelling rag for the forehead. Unfortunately, it goes in the head slot."`;
        this.description = function() { return `<span style="color:#1eff00">Use: Increase EXP gain by 4000% for 1 hour<br>Merge: Combine 10 into a higher-quality item</span>`}
        this.img = 549;
        this.quality = `Epic`;
        this.value = function() { return 100000 }
        Object.assign(this, properties);
    }
}

class ChanceDie1 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Chance-Making Die`;
        this.flavor = `"A mystic artifact capable of manipulating vectors to create a "virtual die" that peers into alternate realities to look for a more favorable outcome. In other words, it prints loot. Neat!"`;
        this.description = function() { return `
            <span style="color:#1eff00">★ Use: Rolls 10 times to attempt to materialise loot from the current enemy. The current enemy needs to be eligible for offline farming</span>
            <br><span style="color:#2DD8CF">★ Merge: Combine 10 into a higher-quality item</span>`}
        this.img = 550;
        this.mergeStack = 10;
        this.quality = `Uncommon`;
        Object.assign(this, properties);
    }
    use(){
    if (offlineFarmCheck()!==true) {playSound("audio/close.mp3"); return}
    playSound("audio/gacha1.mp3");
    for (let i = 0; i < 10; i++) { loop();}
    function loop() { lootTable(enemies[stats.currentEnemy].lootTable()) }
    this.constructor.count--;
    }
    merge(){
        this.constructor.count-=this.mergeStack
        spawnItem(ChanceDie2)
    }
}

class ChanceDie2 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Fate-Loaded Die`;
        this.flavor = `"A mystic artifact capable of manipulating vectors to create a "virtual die" that peers into alternate realities to look for a more favorable outcome. In other words, it prints loot. Neat!"`;
        this.description = function() { return `
            <span style="color:#1eff00">★ Use: Rolls 150 times to attempt to materialise loot from the current enemy. The current enemy needs to be eligible for offline farming</span>
            <br><span style="color:#2DD8CF">★ Merge: Combine 10 into a higher-quality item</span>`}
        this.img = 551;
        this.mergeStack = 10;
        this.quality = `Rare`;
        Object.assign(this, properties);
    }
    use(){
    if (offlineFarmCheck()!==true) {playSound("audio/close.mp3"); return}
        playSound("audio/gacha1.mp3")
    for (let i = 0; i < 150; i++) { loop();}
    function loop() { lootTable(enemies[stats.currentEnemy].lootTable()) }
    this.constructor.count--;
    }
    merge(){
        this.constructor.count-=this.mergeStack
        spawnItem(ChanceDie3)
    }
}

class ChanceDie3 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Zero-Sum Improbability Die`;
        this.flavor = `"A mystic artifact capable of manipulating vectors to create a "virtual die" that peers into alternate realities to look for a more favorable outcome. In other words, it prints loot. Neat!"`;
        this.description = function() { return `
            <span style="color:#1eff00">★ Use: Rolls 2000 times to attempt to materialise loot from the current enemy. The current enemy needs to be eligible for offline farming</span>`}
        this.img = 552;
        this.quality = `Epic`;
        Object.assign(this, properties);
    }
    use(){
    if (offlineFarmCheck()!==true) {playSound("audio/close.mp3"); return}
        playSound("audio/gacha1.mp3")
    for (let i = 0; i < 2000; i++) { loop();}
    function loop() { lootTable(enemies[stats.currentEnemy].lootTable()) }
    this.constructor.count--;
    }
    
}


class AreaChest1 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Small Wooden Lockbox`;
        this.flavor = `"Life is like a Small Wooden Lockbox."`;
        this.source = `Rarely dropped by foes at Cradle Hills and Lost Dojo`;
        this.description = function() { return `<span style="color:#1eff00">★ Use: Unlock with a${itemIcon("I41")}Copper Key to open</span><FONT COLOR="#edd585"><br>${bestiaryTag("🎲 Possible Contents 🎲", "#815C42")+generateContainerTable(this.lootTable())}`}
        this.img = 10;
        this.quality = `Uncommon`;
        this.lootTable = function() { return { Potara : { c : chances.chest.mythic, a : 1}, FoliarBlade : { c : chances.chest.uncommon, a : 1}, ThornBinding : { c : chances.chest.uncommon, a : 1}, DruidSkirt : { c : chances.chest.uncommon, a : 1},  Geode1 : { c : chances.chest.common, a : 1},  FoodCheese : { c : chances.chest.poor, a : 1} } }; 
        this.canMultiuse = true;
        this.value = function() { return 500 }
        Object.assign(this, properties);
    }

    use(){
        if (AreaChest1Key.count<=0) return

        AreaChest1Key.count--
        lootTable(this.lootTable(),"container")
        this.constructor.count--
    }
}


function generateContainerTable(table){

        const returnedOdds = table
        dropDesc = "";
        for (i in returnedOdds) {
          dropDesc += dropInfo(eval(i), returnedOdds[i].c, returnedOdds[i].a,"chest")+"<br>"
        }
  
        return dropDesc
      
}



class HealPotion extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Healing Flask`;
        this.flavor = `"This potion operates by abruptly shattering your entire internal structure, causing your body to make an immediate effort to rebuild them in order to avert a sudden death. It also has a mild strawberry flavor."`;
        this.description = function() { return `<span style="color:#1eff00">★ Use: Restores ${beautify(returnPotionLevel("I19")*playerMaxHp/100)} Health`}
        this.img = 19;
        this.quality = `Common`;
        this.quickAccess = true;
        this.value = function() { return 100000 }
        Object.assign(this, properties);
    }

    use(){
        HealPotion.count--;
        voidAnimation("playerAnimation", "gelatine 0.5s 1 ease")
        particleTrackers.push(new ParticleThrowUp());
        setTimeout(() => {
            voidAnimation("playerAnimation", "gelatine 0.5s 1 ease, flash 0.5s 1")
            particleTrackers.push(new ParticleShockwaveHeal());
            playerHealingDamage(200)

        }, 800);


    }
}

class ScratchCard extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Scratch Card`;
        this.flavor = `"99% of turtles quit before winning big!"`;
        this.description = function() { return `<span style="color:#1eff00">★ Use: Scratch the card!`}
        this.img = 527;
        this.quality = `Epic`;
        Object.assign(this, properties);
    }

    use(){
        startScratchMinigame();
        this.constructor.count--;
        itemContextMenuBegone();
    }
}

class AreaChest1Key extends Key {
    constructor(properties = {}) {
        super(properties);
        this.name = `Copper Key`;
        this.flavor = `"For the easily-influenced locks."`;
        this.source = "Commonly crafted by blacksmiths. Can open small containers";
        this.img = 41;
        this.quality = `Uncommon`;
        Object.assign(this, properties);
    }
}


class Weapon extends Equipable {

    constructor(properties = {}) {
        super(properties);
        this.baseDamage = 1;
        this.baseAttackSpeed = 1;
        this.baseSkillChance = 1;
        this.baseSkillDamage = 1;
        this.prefixTier = 0

        //these are prefix mods, do not touch please
        this.damage = 1;
        this.attackSpeed = 1;
        this.multishot = 0;
        this.skillMultishot = 0;
        this.skillChance = 1;
        this.skillDamage = 1;

        this.finalDamage = function() {return Math.floor(  ( (this.baseDamage * this.damage) * Math.pow(1.4, this.prefixTier) ) * (  Math.pow(1.8, this.constructor.upgrade)  )  ) }


        this.slot = `Weapon`
        this.sort = `Weapon`



        Object.assign(this, properties);
    }

    init(mod){



        let tier1Chance = chances.reforges.tier1
        let tier2Chance = chances.reforges.tier2
        let tier3Chance = chances.reforges.tier3
        let tier4Chance = chances.reforges.tier4

        if (mod==="container") {
            tier1Chance = 5
            tier2Chance = 15
            tier3Chance = 35
            tier4Chance = 200
        }

            if (chance(1/tier1Chance)) {this.prefix1 = returnArrayPick(weaponPrefix1); }
            if (chance(1/tier2Chance)) {this.prefix1 = returnArrayPick(weaponPrefix1); this.prefix2 = returnArrayPick(weaponPrefix2);}
            if (chance(1/tier3Chance)) {this.prefix1 = returnArrayPick(weaponPrefix1); this.prefix2 = returnArrayPick(weaponPrefix2); this.prefix3 = returnArrayPick(weaponPrefix3);}
            if (chance(1/tier4Chance)) {this.prefix1 = undefined; this.prefix2 = undefined; this.prefix3 = undefined; this.prefix5 = returnArrayPick(weaponPrefix5); logs.AR1.unlocked=true}
        
        let align = rng(1,3)
        if (align===1) this.align = `Elemental`;
        if (align===2) this.align = `Nature`;
        if (align===3) this.align = `Occult`;

        this.paint = rng(-365,365)



        if (this.prefix5 !=undefined) {

        this.savedInfo = {}

        this.savedInfo.damageSaved = rngD(-0.5,3)
        this.savedInfo.attackSpeedSaved = rngD(0.3,3)
        this.savedInfo.multishotSaved = rng(-1,7)
        this.savedInfo.skillMultishotSaved = rngD(-1,5)
        this.savedInfo.skillChanceSaved = rngD(-1,5)
        this.savedInfo.skillDamageSaved = rngD(-1,7)

        }
        
        /*
        {this.skillChance = 0; }
        if (this.prefix5 === "74 75 74 6C 65") {this.multishot = 15; this.skillChance = 28193; this.damage *= 0.2;}
        if (this.prefix5 === "⩖⺜⨥⊂⑆⨓▟⭰⋹") {this.skillMultishot += 15; this.multishot = -100; }
        if (this.prefix5 === "ERROR") {this.skillChance = 0; this.attackSpeed *= 5; this.skillDamage *= 10;}
        if (this.prefix5 === "TurTLE") {this.skillMultishot += 15; this.attackSpeed *= 5; this.skillChance = 0; this.skillDamage *= 0.5;}
        */

    }

    invInit(){

        this.damage = 1;
        this.attackSpeed = 1;
        this.multishot = 0;
        this.skillMultishot = 0;
        this.skillChance = 1;
        this.skillDamage = 1;


        if (this.prefix5 !=undefined && this.savedInfo!==undefined){

            this.damage *= this.savedInfo.damageSaved;
            this.attackSpeed *= this.savedInfo.attackSpeedSaved;
            this.multishot += this.savedInfo.multishotSaved;
            this.skillMultishot +=  this.savedInfo.skillMultishotSaved;
            this.skillChance *= this.savedInfo.skillChanceSaved;
            this.skillDamage *= this.savedInfo.skillDamageSaved;
        }

        if (this.prefix1 === "Light") {this.attackSpeed *= 0.8; this.damage *= 0.8;}
        if (this.prefix1 === "Powerful") {this.attackSpeed *= 2; this.damage *= 3; }
        if (this.prefix1 === "Echoing") {this.multishot += 1; this.damage *= 0.5;}
        if (this.prefix1 === "Masterful") {this.skillChance *= 0.5; this.skillDamage *= 0.5;}
        if (this.prefix1 === "Technical") {this.skillDamage *= 2; this.skillChance *= 1.5;}
        if (this.prefix1 === "Recursive") {this.multishot += 4; this.attackSpeed *= 3.25}

        if (this.prefix2 === "Runic") {this.skillMultishot += 1; }
        if (this.prefix2 === "Kingslaying") {this.damage *= 1.5; }
        if (this.prefix2 === "Double") {this.multishot +=1; }
        if (this.prefix2 === "Accelerating") {this.attackSpeed *= 0.9; }
        if (this.prefix2 === "Chancemaking") {this.skillChance *= 0.8; }
        if (this.prefix2 === "Titanic") {this.skillDamage *= 1.5; }

        if (this.prefix3 === "THE") {this.skillMultishot += 2; }
        if (this.prefix3 === "Ultimate") {this.multishot +=2; }
        if (this.prefix3 === "Final") {this.skillDamage *= 2; }
        if (this.prefix3 === "Polychrome") {this.multishot +=1; this.skillMultishot += 1; }
        if (this.prefix3 === "Godslaying") {this.damage *= 2; }

        //sorting purposes
        if (this.prefix1 !== undefined) this.prefixTier = 1
        if (this.prefix2 !== undefined) this.prefixTier = 2
        if (this.prefix3 !== undefined) this.prefixTier = 3
        if (this.prefix4 !== undefined) this.prefixTier = 4                
        if (this.prefix5 !== undefined) this.prefixTier = 5                

    }
}



class Armor extends Equipable {
    constructor(properties = {}) {
        super(properties);
        this.randomSkills = true;
        this.baseHp = 1;
        this.prefixTier = 0

        //these are multipliers
        this.hp = 1;
        this.finalHp = function() {return ( (this.baseHp * this.hp) * Math.pow(1.4, this.prefixTier)  ) * (  Math.pow(1.8, this.constructor.upgrade) ) }

        Object.assign(this, properties);


    }

    init(mod){



        if (this.sort === `Offhand`) {
            this.uses = this.initialUses;

            return
        } 


        let tier1Chance = chances.reforges.tier1
        let tier2Chance = chances.reforges.tier2
        let tier3Chance = chances.reforges.tier3

        if (mod==="container") {
            tier1Chance = 5
            tier2Chance = 15
            tier3Chance = 35
        }


         
        if (this.sort === `Trinket`) {

            if (chance(1/tier1Chance)) {this.prefix1 = returnArrayPick(trinketPrefix1); }
            if (chance(1/tier2Chance)) {this.prefix1 = returnArrayPick(trinketPrefix1); this.prefix2 = returnArrayPick(miscPrefix2);}
            if (chance(1/tier3Chance)) {this.prefix1 = returnArrayPick(trinketPrefix1); this.prefix2 = returnArrayPick(miscPrefix2); this.prefix3 = returnArrayPick(miscPrefix3);}
               
        } else if (this.sort === `Ring`) {
            
            if (chance(1/tier1Chance)) {this.prefix1 = returnArrayPick(miscPrefix1); }
            if (chance(1/tier2Chance)) {this.prefix1 = returnArrayPick(miscPrefix1); this.prefix2 = returnArrayPick(miscPrefix2);}
            if (chance(1/tier3Chance)) {this.prefix1 = returnArrayPick(miscPrefix1); this.prefix2 = returnArrayPick(miscPrefix2); this.prefix3 = returnArrayPick(miscPrefix3);}
            
        } else {

            if (chance(1/tier1Chance)) {this.prefix1 = returnArrayPick(armorPrefix1); }
            if (chance(1/tier2Chance)) {this.prefix1 = returnArrayPick(armorPrefix1); this.prefix2 = returnArrayPick(armorPrefix2);}
            if (chance(1/tier3Chance)) {this.prefix1 = returnArrayPick(armorPrefix1); this.prefix2 = returnArrayPick(armorPrefix2); this.prefix3 = returnArrayPick(armorPrefix3);}
    
        }
        

    }

    invInit(){

        //if (this.prefix1 === "Light") {this.attackSpeed = 0.5; this.damage = 0.5;}


        //sorting purposes
        if (this.prefix1 !== undefined) this.prefixTier = 1
        if (this.prefix2 !== undefined) this.prefixTier = 2
        if (this.prefix3 !== undefined) this.prefixTier = 3
        if (this.prefix4 !== undefined) this.prefixTier = 4                


        //trinket stuff
        if (this.prefix1 === "Heirloom") {this.skillDamage = 2; }
        if (this.prefix1 === "Hexed") {this.skillChance = 0.8;}
        if (this.prefix1 === "Voodoo") {this.skillChance = 0.5; this.skillDamage = 0.5; }
        if (this.prefix1 === "Mystic") {this.skillChance = 2; this.skillDamage = 3; }
   
    }




}

class ArmorTrinket extends Armor {

    static upgrade = undefined


    constructor(properties = {}) {
        super(properties);
        this.slot = `Trinket`;
        this.sort = `Trinket`;
        this.hp = undefined;
        this.baseHp = undefined
        this.skillChance = 1; //default multipliers
        this.skillDamage = 1; //default multipliers
        Object.assign(this, properties);
    }





}




class HopperoonaPhylactery extends ArmorTrinket {
    constructor(properties = {}) {
        super(properties);
        this.name = `Hopperoona's Phylactery`;
        this.flavor = `"Remains of a forbidden friendship."`;
        this.skillDescription = function() { return `1/${Math.ceil(this.baseSkillChance*this.skillChance)} chance to inflict Poisoned for ${this.baseSkillDamage*3*this.skillDamage} seconds and dealing x${1+this.baseSkillDamage*this.skillDamage} of your Power as Nature Damage` };
        this.img = 47;
        this.baseSkillChance = 10;
        this.baseSkillDamage = 2;
        this.quality = `Uncommon`;
        this.contextTooltip = function() { return [ `<img src="img/src/buffs/B1.jpg"> <span style="color:lawngreen">Poisoned</span> enemies take 1/3 of your Power per second as Nature Damage` ] };
        Object.assign(this, properties);
    }
    dealDamage(){


        if (chance(1/(this.baseSkillChance*this.skillChance))) {
            buffs.EnemyPoison.time=this.baseSkillDamage*3*this.skillDamage;
            playerBuffs()
            enemyNatureDamage(stat.Power*(this.baseSkillDamage*this.skillDamage))
            enemyDamageAnimation("medium")

            animatedSplash("enemy", "bite","impact",0)
            particleTrackers.push(new ParticleShockwave());
            particleTrackers.push(new ParticleBubble(this.x,this.y,{x:enemyRectX, y:enemyRectY,imageHue:50}));
            particleTrackers.push(new ParticleBubble(this.x,this.y,{x:enemyRectX, y:enemyRectY,imageHue:50}));
            particleTrackers.push(new ParticleBubble(this.x,this.y,{x:enemyRectX, y:enemyRectY,imageHue:50}));
        
        }

    }
}


class ArmorHead extends Armor {
    constructor(properties = {}) {
        super(properties);
        this.slot = `Head`;
        this.sort = `Head`;
        Object.assign(this, properties);
    }
}

class ArmorChest extends Armor {
    constructor(properties = {}) {
        super(properties);
        this.slot = `Chest`;
        this.sort = `Chest`;
        Object.assign(this, properties);
    }
}

class ArmorLegs extends Armor {
    constructor(properties = {}) {
        super(properties);
        this.slot = `Legs`;
        this.sort = `Legs`;
        Object.assign(this, properties);
    }
}

class ArmorFeet extends Armor {
    constructor(properties = {}) {
        super(properties);
        this.slot = `Feet`;
        this.sort = `Feet`;
        Object.assign(this, properties);
    }
}

class ArmorOffhand extends Armor {

    static upgrade = undefined

    constructor(properties = {}) {
        super(properties);
        this.slot = `Offhand`;
        this.sort = `Offhand`;
        this.hp = undefined;
        this.baseHp = undefined
        this.initialUses = 1000;

        Object.assign(this, properties);
    }
}

class ArmorRing extends Armor {

    static upgrade = undefined

    constructor(properties = {}) {
        super(properties);
        this.slot = `Ring`;
        this.sort = `Ring`;
        this.hp = undefined;
        this.baseHp = undefined

        Object.assign(this, properties);
    }
}

class Luma extends Equipable {
    constructor(properties = {}) {
        super(properties);
        Object.assign(this, properties);
    }
}

class LumaDefault extends Luma { //this is the default luma behaviour when you dont have any luma equipped
    constructor(properties = {}) {
        super(properties);
        Object.assign(this, properties);
    }

    luma(){

        particleTrackers.push(new TrackerLumaFrostBolt());
        particleTrackers.push(new TrackerExplosionBit(mouseClickX, mouseClickY));
        setTimeout(() => {
            enemyDamageAnimation("high")
            enemyElementalDamage(5345345)
        }, 1500);
        did("lumaCharge").style.visibility = "visible"
        voidAnimation("lumaCharge", "gelatineHigh 0.3s 1")
        did("lumaCharge").style.top = mousePositionY + -15+ 'px';
        did("lumaCharge").style.left = mousePositionX + 30+ 'px';
        this.cd = 10
        
    }

}





class ChillLuma1 extends Luma {
    constructor(properties = {}) {
        super(properties);
        this.name = `Will Of Frost`;
        this.slot = `Luma`;
        this.img = 524;
        this.quality = `Rare`;
        Object.assign(this, properties);
    }

    luma(){
        particleTrackers.push(new TrackerLumaFrostBolt());
        particleTrackers.push(new TrackerExplosionBit(mouseClickX, mouseClickY));
        setTimeout(() => {
            enemyDamageAnimation("high")
            enemyElementalDamage(5345345)
        }, 1500);
        did("lumaCharge").style.visibility = "visible"
        voidAnimation("lumaCharge", "gelatineHigh 0.3s 1")
        did("lumaCharge").style.top = mousePositionY + -15+ 'px';
        did("lumaCharge").style.left = mousePositionX + 30+ 'px';
        this.cd = 10
    }

}



class VendorTrash extends Item {
    constructor(properties = {}) {
        super(properties);
        this.quality = `Poor`
        this.flavor = `"Spoils from a monster. Not a whole lot of uses, but it can fetch a good price"`
        Object.assign(this, properties);
    }

    init() {
        let trash = rng(1,9)

        if (trash === 1){
            this.savedImg = 529
            let rand = rng(1,6)
            if (rand===1) this.savedName = `English Breakfast`
            if (rand===2) this.savedName = `Monster Remains`
            if (rand===3) this.savedName = `Pile O' Goop`
            if (rand===4) this.savedName = `Fetid Leftovers`
            if (rand===5) this.savedName = `Jelly Pudding`
            if (rand===6) this.savedName = `Bone Effigy`
        }

        if (trash === 2){
            this.savedImg = 530
            let rand = rng(1,6)
            if (rand===1) this.savedName = `Vine Knot`
            if (rand===2) this.savedName = `Organic Sample`
            if (rand===3) this.savedName = `Old Rope`
            if (rand===4) this.savedName = `Cat Toy`
            if (rand===5) this.savedName = `Knitted Ball`
            if (rand===6) this.savedName = `Plant Matter`
        }

        if (trash === 3){
            this.savedImg = 531
            let rand = rng(1,6)
            if (rand===1) this.savedName = `Hero's Sword`
            if (rand===2) this.savedName = `Not-So-Pointy Relic`
            if (rand===3) this.savedName = `Sacred Talisman`
            if (rand===4) this.savedName = `Defiled Blade`
            if (rand===5) this.savedName = `Broken Dreams`
            if (rand===6) this.savedName = `Excalipoor`
        }

        if (trash === 4){
            this.savedImg = 532
            let rand = rng(1,6)
            if (rand===1) this.savedName = `Magicless Tome`
            if (rand===2) this.savedName = `The Lusty Argonian Maid II`
            if (rand===3) this.savedName = `Restaurant Menu`
            if (rand===4) this.savedName = `Ancient Coloring Book`
            if (rand===5) this.savedName = `Neutral Particle Oscillation For Kids`
            if (rand===6) this.savedName = `Legendary Wedding Pictures`
        }

        if (trash === 5){
            this.savedImg = 533
            let rand = rng(1,6)
            if (rand===1) this.savedName = `Death Whistle`
            if (rand===2) this.savedName = `Maniac Effigy`
            if (rand===3) this.savedName = `Spooky Fetish`
            if (rand===4) this.savedName = `Ancient Rubik Cube`
            if (rand===5) this.savedName = `Wooden Souvenir`
            if (rand===6) this.savedName = `Miniature Golem`
        }

        if (trash === 6){
            this.savedImg = 534
            let rand = rng(1,6)
            if (rand===1) this.savedName = `Broken Mirror Shard`
            if (rand===2) this.savedName = `Obsidian Splinter`
            if (rand===3) this.savedName = `Flint Chunk`
            if (rand===4) this.savedName = `Impure Iron Ore`
            if (rand===5) this.savedName = `Occult Tablet Piece`
            if (rand===6) this.savedName = `Raw Gem`
        }

        if (trash === 7){
            this.savedImg = 535
            let rand = rng(1,6)
            if (rand===1) this.savedName = `Almost-Holy Grial`
            if (rand===2) this.savedName = `Milk Chalice`
            if (rand===3) this.savedName = `Fancy Tableware`
            if (rand===4) this.savedName = `Stolen Treasure`
            if (rand===5) this.savedName = `Ornamental Grial`
            if (rand===6) this.savedName = `Dusty Cup`
        }

        if (trash === 8){
            this.savedImg = 536
            let rand = rng(1,6)
            if (rand===1) this.savedName = `Feather Pinion`
            if (rand===2) this.savedName = `Pillow Filling`
            if (rand===3) this.savedName = `Soft Feather`
            if (rand===4) this.savedName = `Chickenless Wing`
            if (rand===5) this.savedName = `Good-Luck Memento`
            if (rand===6) this.savedName = `Plucked Feather`
        }

        if (trash === 9){
            this.savedImg = 536
            let rand = rng(1,6)
            if (rand===1) this.savedName = `Feather Pinion`
            if (rand===2) this.savedName = `Pillow Filling`
            if (rand===3) this.savedName = `Soft Feather`
            if (rand===4) this.savedName = `Chickenless Wing`
            if (rand===5) this.savedName = `Good-Luck Memento`
            if (rand===6) this.savedName = `Plucked Feather`
        }

        

        this.savedInfo = areas[stats.currentArea].value * 8


    }


    invInit(){
        this.name = this.savedName
        this.img = this.savedImg
        this.value = function() { return this.savedInfo }

    }


}



class SlimyResidue extends Material {
    constructor(properties = {}) {
        super(properties);
        this.name = `Slimy Residue`;
        this.flavor = `"A thick, viscous substance with a translucent sheen."`;
        this.source = `Dropped by Caulislugs at Cradle Hills. Crafting material`;
        this.img = 528;
        this.quality = `Common`;
        Object.assign(this, properties);
    }
}

class WhiteStinger extends Material {
    constructor(properties = {}) {
        super(properties);
        this.name = `White Stinger`;
        this.flavor = `"The stinger of a scorpid. Small traces of poison can be seen on the tip."`;
        this.source = `Dropped by Stinglets at Cradle Hills. Crafting material`;
        this.img = 37;
        this.quality = `Common`;
        Object.assign(this, properties);
    }
}

class Stamp1 extends Key {
    constructor(properties = {}) {
        super(properties);
        this.name = `Ornated Stamper`;
        this.flavor = `"Pluck."`;
        this.source = `Dropped from presents, dungeons and other rare sources. Can reroll Tier 1 (⭐) modifiers`;
        this.description = function() { return `<span style="color:#2DD8CF">★ Merge: Combine 10 into a higher-quality item</span>`}
        this.mergeStack = 10;
        this.img = 91;
        this.quality = `Rare`;
        Object.assign(this, properties);
    }
    merge(){
        this.constructor.count-=this.mergeStack
        spawnItem(Stamp2)
    }
}

class Stamp2 extends Key {
    constructor(properties = {}) {
        super(properties);
        this.name = `Spirit Stamper`;
        this.flavor = `"Doink."`;
        this.source = `Dropped from presents, dungeons and other rare sources. Can reroll Tier 1 (✨) modifiers`;
        this.description = function() { return `<span style="color:#2DD8CF">★ Merge: Combine 10 into a higher-quality item</span>`}
        this.mergeStack = 10;
        this.img = 92;
        this.quality = `Epic`;
        Object.assign(this, properties);
    }
    merge(){
        this.constructor.count-=this.mergeStack
        spawnItem(Stamp3)
    }
}

class Stamp3 extends Key {
    constructor(properties = {}) {
        super(properties);
        this.name = `Sacred Stamper`;
        this.flavor = `"Tunk."`;
        this.source = `Dropped from presents, dungeons and other rare sources. Can reroll Tier 3 (🌠) modifiers`;
        this.img = 93;
        this.quality = `Mythic`;
        Object.assign(this, properties);
    }
}

class DungeonKey1 extends Key {
    constructor(properties = {}) {
        super(properties);
        this.name = `Skeletal Crypt Key`;
        this.flavor = `"Even adventure has fast pass."`;
        this.source = `Dropped from presents, dungeons and other rare sources. Allows instant access to Normal dungeons`;
        this.description = function() { return `<span style="color:#1eff00">Merge: Combine 10 into a higher-quality item</span>`}
        this.mergeStack = 10;
        this.img = 553;
        this.quality = `Uncommon`;
        Object.assign(this, properties);
    }
    merge(){
        this.constructor.count-=this.mergeStack
        spawnItem(DungeonKey2)
    }
}

class DungeonKey2 extends Key {
    constructor(properties = {}) {
        super(properties);
        this.name = `Crystal Crypt Key`;
        this.flavor = `"Even adventure has fast pass."`;
        this.source = `Dropped from presents, dungeons and other rare sources. Allows instant access to Hard dungeons`;
        this.description = function() { return `<span style="color:#1eff00">★ Merge: Combine 10 into a higher-quality item</span>`}
        this.mergeStack = 10;
        this.img = 545;
        this.quality = `Rare`;
        Object.assign(this, properties);
    }
    merge(){
        this.constructor.count-=this.mergeStack
        spawnItem(DungeonKey3)
    }
}

class DungeonKey3 extends Key {
    constructor(properties = {}) {
        super(properties);
        this.name = `Molten Crypt Key`;
        this.flavor = `"Even adventure has fast pass."`;
        this.source = `Dropped from presents, dungeons and other rare sources. Allows instant access to Extreme dungeons`;
        this.img = 546;
        this.quality = `Epic`;
        Object.assign(this, properties);
    }
}


class ScrapMaterial extends Material {
    constructor(properties = {}) {
        super(properties);
        this.flavor = `"Raw material salvaged from gear."`;
        Object.assign(this, properties);
    }
}

class ScrapMaterial1 extends ScrapMaterial {
    constructor(properties = {}) {
        super(properties);
        this.name = `Wood Bundle`;
        this.img = 537;
        this.source = `Scrapped from Common gear. Crafting material`;
        Object.assign(this, properties);
    }
}

class ScrapMaterial2 extends ScrapMaterial {
    constructor(properties = {}) {
        super(properties);
        this.name = `Supple Fabric`;
        this.img = 538;
        this.source = `Scrapped from Uncommon gear. Crafting material`;
        this.quality = `Uncommon`;
        Object.assign(this, properties);
    }
}

class ScrapMaterial3 extends ScrapMaterial {
    constructor(properties = {}) {
        super(properties);
        this.name = `Bright Essence`;
        this.img = 539;
        this.source = `Scrapped from Rare gear. Crafting material`;
        this.quality = `Rare`;
        Object.assign(this, properties);
    }
}

class ScrapMaterial4 extends ScrapMaterial {
    constructor(properties = {}) {
        super(properties);
        this.name = `Twilight Shard`;
        this.img = 540;
        this.source = `Scrapped from Epic gear. Crafting material`;
        this.quality = `Epic`;
        Object.assign(this, properties);
    }
}

class UpgradeMaterial0  extends Material {
    constructor(properties = {}) {
        super(properties);
        this.name = `Perfectly Generic Data`;
        this.img = 559;
        this.quality = `Rare`;
        this.flavor = `"Perfectly ordinary. Hence, disturbingly wrong."`;
        this.source = `Dropped from presents, dungeons and other rare sources. Universal upgrading material`;
        Object.assign(this, properties);
    }
}

class UpgradeMaterial1 extends Material {
    constructor(properties = {}) {
        super(properties);
        this.name = `Spirit Ginseng`;
        this.img = 554;
        this.quality = `Common`;
        this.flavor = `"A dense, knotted root with a vibrant, glowing core, known for its potent spiritual energy."`;
        this.source = `Commonly dropped by bosses on Cradle Hills and Lost Dojo. Common upgrading material`;
        this.value = function() { return 50 }
        Object.assign(this, properties);
    }
}

class UpgradeMaterial2 extends Material {
    constructor(properties = {}) {
        super(properties);
        this.name = `Coalescent Slime`;
        this.img = 555;
        this.quality = `Uncommon`;
        this.flavor = `"Raw material salvaged from gear."`;
        this.source = `Miau. Uncommon upgrading material`;
        this.value = function() { return 50 }

        Object.assign(this, properties);
    }
}

class UpgradeMaterial3 extends Material {
    constructor(properties = {}) {
        super(properties);
        this.name = `Primal Horn`;
        this.img = 556;
        this.quality = `Rare`;
        this.flavor = `"Raw material salvaged from gear."`;
        this.source = `Miau. Rare upgrading material`;
        this.value = function() { return 50 }

        Object.assign(this, properties);
    }
}

class UpgradeMaterial4 extends Material {
    constructor(properties = {}) {
        super(properties);
        this.name = `Regal Blackstone`;
        this.img = 557;
        this.quality = `Epic`;
        this.flavor = `"Raw material salvaged from gear."`;
        this.source = `Miau. Epic upgrading material`;
        this.value = function() { return 50 }

        Object.assign(this, properties);
    }
}

class UpgradeMaterial5 extends Material {
    constructor(properties = {}) {
        super(properties);
        this.name = `Dragonwood Branch`;
        this.img = 558;
        this.quality = `Mythic`;
        this.flavor = `"Raw material salvaged from gear."`;
        this.source = `Miau. Mythic upgrading material`;
        this.value = function() { return 50 }

        Object.assign(this, properties);
    }
}

class WebthreadedPromise extends ArmorRing {
    constructor(properties = {}) {
        super(properties);
        this.name = `Web-Threaded Promise`;
        this.flavor = `"Hardened, sharp cobweb in the shape of a ring."`;
        this.skillDescription = function() { return `+ 40% Occult Bonus` };
        this.img = 192;
        this.quality = `Uncommon`;
        Object.assign(this, properties);
    }
    stats(){
        stat.OccultBonus += 40
    }
}

class LuckyCloverRing extends ArmorRing {
    constructor(properties = {}) {
        super(properties);
        this.name = `Lucky Clover Ring`;
        this.flavor = `"Bears the symbol of fortune."`;
        this.skillDescription = function() { return `+ 15% Luck` };
        this.img = 193;
        this.quality = `Uncommon`;
        Object.assign(this, properties);
    }
    stats(){
        stat.Luck += 15
    }
}

class ScorpionRing extends ArmorRing {
    constructor(properties = {}) {
        super(properties);
        this.name = `Scorpion Ring`;
        this.flavor = `"Hardened, sharp cobweb in the shape of a ring."`;
        this.skillDescription = function() { return `+ 10% Crit Chance` };
        this.img = 561;
        this.quality = `Common`;
        Object.assign(this, properties);
    }
    stats(){
        stat.CritChance += 10
    }
}

class WaddlingBand extends ArmorRing {
    constructor(properties = {}) {
        super(properties);
        this.name = `Waddling Band`;
        this.flavor = `"Well it\'s not going anywhere now."`;
        this.skillDescription = function() { return `+ 15% Offline Bonus` };
        this.img = 166;
        this.quality = `Rare`;
        this.baseHp = 20;
        Object.assign(this, properties);
    }
    stats(){
        stat.OfflineBonus += 15
    }
}



class MoonNecklace extends ArmorTrinket {
    constructor(properties = {}) {
        super(properties);
        this.name = `Moon Necklace`;
        this.flavor = `"A delicate pendant depicting the moon. It makes you feel at ease just by looking at it."`;
        this.skillDescription = function() { return `1/${Math.ceil(this.baseSkillChance*this.skillChance)} chance to gain Blessing of the Moon for 15 seconds, summoning stars with your attacks that deal x${this.baseSkillDamage*this.skillDamage} of your Power as Occult Damage` };
        this.img = 412;
        this.baseSkillChance = 10;
        this.baseSkillDamage = 1;
        this.quality = `Uncommon`;
        this.noScrap = true
        Object.assign(this, properties);
    }
    dealDamage(){

        if (chance(1/(this.baseSkillChance*this.skillChance))) {
            animatedSplash("player","moon","float","0")
            buffs.MoonPendantBuff.time=15;
            playerBuffs()
            particleTrackers.push(new ParticleRiseup());

        }

        if (buffs.MoonPendantBuff.time>0){

            particleTrackers.push(new ParticleMoonNecklace());
            setTimeout(() => {
                enemyOccultDamage(stat.Power*(this.baseSkillDamage*this.skillDamage))
                enemyDamageAnimation("medium")
            }, 600);
        }
    }
}

class CabbageBoots extends ArmorFeet {
    constructor(properties = {}) {
        super(properties);
        this.name = `Cabbage Boots`;
        this.flavor = `"Great as a snack, not so great as armor."`;
        this.skillDescription = function() { return `+ 10% Nature Bonus` };
        this.img = 560;
        this.quality = `Common`;
        this.baseHp = 85;
        Object.assign(this, properties);
    }
    stats(){
        stat.NatureBonus += 10
    }
}


function updateOffhandDurability(item){

    let percentageEXP = (item.uses / item.initialUses) * 100;
    did(item.index+"usebar").style.background = `linear-gradient(90deg, lawngreen ${percentageEXP}%, rgba(55,42,60,1) ${percentageEXP}%)`

    if (item.uses<1){
        itemInventory.splice(item.index, 1);
        equippedOffhand=undefined
        changeLoadout()
    }

}

class WoodenShield extends ArmorOffhand {
    constructor(properties = {}) {
        super(properties);
        this.name = `Tattered Wooden Shield`;
        this.flavor = `"Hope you dont mind splinters."`;
        this.skillDescription = function() { return `+ 100 Max Health` };
        this.img = 563;
        this.quality = `Common`;

        Object.assign(this, properties);
    }
    stats(){
        stat.MaxHealth += 100
    }
    receiveDamage(){
       this.uses--
       updateOffhandDurability(this)
    }
}

class PoisonScroll extends ArmorOffhand {
    constructor(properties = {}) {
        super(properties);
        this.name = `Poison Bolt Scroll`;
        this.flavor = `"A parchment depicting rather dangerous and noxious enchantments."`;
        this.skillDescription = function() { return `1/5 chance to deal x1 of your Power as Nature Damage and inflict Poisoned for 3 seconds` };
        this.img = 562;
        this.quality = `Uncommon`;
        this.initialUses = 200;
        this.contextTooltip = function() { return [ `<img src="img/src/buffs/B1.jpg"> <span style="color:lawngreen">Poisoned</span> enemies take 1/3 of your Power per second as Nature Damage` ] };

        Object.assign(this, properties);
    }

    dealDamage(){
       if (chance(1/5)){
        this.uses--
        particleTrackers.push(new ParticlePoisonBolt());
        setTimeout(() => {
         enemyNatureDamage(stat.Power)
         enemyDamageAnimation("medium")
         buffs.EnemyPoison.time = 3
         playerBuffs()
        }, 900);
        updateOffhandDurability(this)
       }
       
    }
}

class PoisonScroll2 extends ArmorOffhand {
    constructor(properties = {}) {
        super(properties);
        this.name = `Poison Barrage Scroll`;
        this.flavor = `"A parchment depicting REALLY dangerous and noxious enchantments. Oh wow. They weren\'t kidding."`;
        this.skillDescription = function() { return `1/5 chance to deal x1 of your Power 4 times as Nature Damage and inflict Poisoned for 3 seconds` };
        this.img = 564;
        this.quality = `Rare`;
        this.initialUses = 200;
        this.contextTooltip = function() { return [ `<img src="img/src/buffs/B1.jpg"> <span style="color:lawngreen">Poisoned</span> enemies take 1/3 of your Power per second as Nature Damage` ] };

        Object.assign(this, properties);
    }
    dealDamage(){
       if (chance(1/3)){

        this.uses--
        updateOffhandDurability(this)


        for (let i = 0; i < 4; i++) { setTimeout(loop, 100 * i);}


      function loop(){

        this.uses--
        particleTrackers.push(new ParticlePoisonBolt());
        setTimeout(() => {
         enemyNatureDamage(stat.Power)
         enemyDamageAnimation("medium")
         buffs.EnemyPoison.time = 3
         playerBuffs()
        }, 900);
    }


       }
       
    }
}





class SilverRing extends ArmorRing {
    constructor(properties = {}) {
        super(properties);
        this.name = `Silver Ring`;
        this.flavor = `"An ordinary jewelry ring. You can sense good craftsmanship out of it."`;
        this.skillDescription = function() { return `+ 50 Max Health` };
        this.img = 7;
        this.quality = `Common`;
        Object.assign(this, properties);
    }
    stats(){
        stat.MaxHealth += 50
    }
}

class ThornBinding extends ArmorRing {
    constructor(properties = {}) {
        super(properties);
        this.name = `Thorn Binding`;
        this.flavor = `"A fierce ring made out of thorns and blossoms. To inflict pain one must be ready to receive pain."`;
        this.skillDescription = function() { return `+ 20% Thorns` };
        this.img = 131;
        this.quality = `Uncommon`;
        Object.assign(this, properties);
    }
    stats(){
        stat.Thorns += 20
    }
}

class Potara extends ArmorRing {
    constructor(properties = {}) {
        super(properties);
        this.name = `Angel-Breaker Earrings`;
        this.flavor = `"Sacred earrings shining with almighty radiance."`;
        this.skillDescription = function() { return `+ 20% Attack Speed<br>+ 20% Luck<br>+ 20% Offline Bonus` };
        this.img = 424;
        this.quality = `Epic`;
        Object.assign(this, properties);
    }
    stats(){
        stat.AttackSpeed += 20
        stat.Luck += 20
        stat.OfflineBonus += 20
    }
}

class RanaHat extends ArmorHead {
    constructor(properties = {}) {
        super(properties);
        this.name = `Rana Hat`;
        this.flavor = `"Ribbit."`;
        this.skillDescription = function() { return `+ 10% Nature Resist` };
        this.img = 59;
        this.quality = `Common`;
        this.baseHp = 90;
        Object.assign(this, properties);
    }
    stats(){
        stat.NatureResist += 10
    }
}

class FlowerGarland extends ArmorHead {
    constructor(properties = {}) {
        super(properties);
        this.name = `Flower Garland`;
        this.flavor = `"Beautiful flowers, too, eventually wither and fall."`;
        this.skillDescription = function() { return `+ 15% Nature Bonus` };
        this.img = 397;
        this.quality = `Common`;
        this.baseHp = 85;
        Object.assign(this, properties);
    }
    stats(){
        stat.NatureBonus += 15
    }
}

class ClothHead extends ArmorHead {
    constructor(properties = {}) {
        super(properties);
        this.name = `Cloth Bandana`;
        this.flavor = `"A foul-smelling rag for the forehead. Unfortunately, it goes in the head slot."`;
        this.img = 3;
        this.quality = `Common`;
        this.baseHp = 45;
        this.set = `Cloth`;
        this.setMin = 3;
        Object.assign(this, properties);
    }

}

class ClothFeet extends ArmorFeet {
    constructor(properties = {}) {
        super(properties);
        this.name = `Cloth Slippers`;
        this.flavor = `"The kind your turtle grandmother would wear."`;
        this.img = 2;
        this.quality = `Common`;
        this.baseHp = 41;
        this.set = `Cloth`;
        this.setMin = 3;
        Object.assign(this, properties);
    }

}

class ClothChest extends ArmorChest {
    constructor(properties = {}) {
        super(properties);
        this.name = `Cloth Shirt`;
        this.flavor = `"More effective than nothing whatsoever. Not much more, though."`;
        this.img = 5;
        this.quality = `Common`;
        this.baseHp = 52;
        this.set = `Cloth`;
        this.setMin = 3;
        Object.assign(this, properties);
    }
}

class ClothLegs extends ArmorLegs {
    constructor(properties = {}) {
        super(properties);
        this.name = `Cloth Pants`;
        this.flavor = `"They must at least be resistant if they were able to survive this long."`;
        this.img = 6;
        this.quality = `Common`;
        this.baseHp = 50;
        this.set = `Cloth`;
        this.setMin = 3;
        Object.assign(this, properties);
    }
}

class DruidSkirt extends ArmorLegs {
    constructor(properties = {}) {
        super(properties);
        this.name = `Druid Skirt`;
        this.flavor = `"An attire made out of the most pristine leaves of the forest, commonly worn by shamans and exhibitionists."`;
        this.img = 565;
        this.skillDescription = function() { return `+ 15% Nature Resist<br>+ 15% Nature Bonus` };
        this.quality = `Uncommon`;
        this.baseHp = 300;
        Object.assign(this, properties);
    }
    stats(){
        stat.NatureResist += 15
        stat.NatureBonus += 15
    }
}

class MysteriousPackage extends Key {
    constructor(properties = {}) {
        super(properties);
        this.name = `Mysterious Package`;
        this.flavor = `"No peeking!"`;
        this.quality = `Quest`;
        this.img = 16;
        this.value = function() { return 0 }
        Object.assign(this, properties);
    }
}

class FrogLeg extends Key {
    constructor(properties = {}) {
        super(properties);
        this.name = `Frog Leg`;
        this.flavor = `"This better ought to do it."`;
        this.quality = `Quest`;
        this.img = 51;
        this.value = function() { return 10 }
        Object.assign(this, properties);
    }
}

class CaesarSalad extends Key {
    constructor(properties = {}) {
        super(properties);
        this.name = `Caesar Salad`;
        this.flavor = `"So good it is well worth the 23 stabs."`;
        this.quality = `Quest`;
        this.img = 310;
        this.value = function() { return 10 }
        Object.assign(this, properties);
    }
}

class MedicatedBandaid extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Medicated Bandaid`;
        this.flavor = `"Nothing else but a bandaid fix."`;
        this.img = 176;
        this.quality = `Common`;
        this.quickAccess = true
        this.description = function() { return `<span style="color:#1eff00">★ Use: Clears Poison. Uses 1 Combat Action</span>`}
        this.contextTooltip = function() { return [ `<img src="img/src/buffs/B4.jpg">Up to <span style="color:coral">5 Combat Actions</span> can be used on boss encounters. Combat Actions immediately recharge once the battle ends<br><br><span style="display:flex;justify-content:center">${colorTag("✦ "+combatActions + " remaining", "#789E45")}</span>`,
            ,`<img src="img/src/buffs/B1.jpg"> <span style="color:lawngreen">Poison</span> takes 1/100 of your Max Health as Nature Damage per second per stack`
         ] };

        Object.assign(this, properties);
    }

    use(){
        if (combatActions<1) {playSound("audio/thud.mp3"); return}
        if (bossTime) combatActions--
        buffs.PlayerPoison.time = 0
        playerBuffs();
        this.constructor.count--;
    }
}


class Sparkler1 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Yellow Sparkler`;
        this.flavor = `"A handheld firework emiting bright sparks, often used in celebrations and festivities."`;
        this.img = 499;
        this.quality = `Common`;
        this.description = function() { return `<span style="color:#1eff00">★ Use: Spark your cursor for 10 minutes</span>`}
        Object.assign(this, properties);
    }

    use(){
        playSound("audio/gas.mp3")
        buffs.Sparkler1.time=60*10
        this.constructor.count--;
        setTimeout(() => {
            itemContextMenuBegone()
        }, 1);
    }
}

class Sparkler2 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Blue Sparkler`;
        this.flavor = `"A handheld firework emiting bright sparks, often used in celebrations and festivities."`;
        this.img = 500;
        this.quality = `Common`;
        this.description = function() { return `<span style="color:#1eff00">★ Use: Spark your cursor for 10 minutes</span>`}
        Object.assign(this, properties);
    }

    use(){
        playSound("audio/gas.mp3")
        buffs.Sparkler2.time=60*10
        this.constructor.count--;
        setTimeout(() => {
            itemContextMenuBegone()
        }, 1);
    }
}

class Sparkler3 extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Green Sparkler`;
        this.flavor = `"A handheld firework emiting bright sparks, often used in celebrations and festivities."`;
        this.img = 501;
        this.quality = `Common`;
        this.description = function() { return `<span style="color:#1eff00">★ Use: Spark your cursor for 10 minutes</span>`}
        Object.assign(this, properties);
    }

    use(){
        playSound("audio/gas.mp3")
        buffs.Sparkler3.time=60*10
        this.constructor.count--;
        setTimeout(() => {
            itemContextMenuBegone()
        }, 1);
    }
}


class FoodLizard extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Skewed Lizard`;
        this.flavor = `"Don\'t complain, it tastes like chicken."`;
        this.img = 12;
        this.quality = `Common`;
        this.quickAccess = true;
        this.description = function() { return `<span style="color:#1eff00">★ Use: Restores 1000 Health over 20 seconds. Uses 1 Combat Action</span>`}
        this.contextTooltip = function() { return [ `<img src="img/src/buffs/B4.jpg">Up to <span style="color:coral">5 Combat Actions</span> can be used on boss encounters. Combat Actions immediately recharge once the battle ends<br><br><span style="display:flex;justify-content:center">${colorTag("✦ "+combatActions + " remaining", "#789E45")}</span>` ] };
        Object.assign(this, properties);
    }

    use(){
        if (combatActions<1) {playSound("audio/thud.mp3"); return}
        if (bossTime) combatActions--
        playSound("audio/monch.mp3")
        buffs.FoodRegen.time=0
        playerBuffs();
        buffs.FoodRegen.time=20;
        buffs.FoodRegen.stacks=1000/20;
        playerBuffs();
        this.constructor.count--;
    }
}

class FoodCheese extends Consumable {
    constructor(properties = {}) {
        super(properties);
        this.name = `Goat Cheese`;
        this.flavor = `"A pungent-smelling cheese."`;
        this.img = 34;
        this.quality = `Common`;
        this.quickAccess = true;
        this.description = function() { return `<span style="color:#1eff00">★ Use: Restores 2000 Health over 20 seconds. Uses 1 Combat Action</span>`}
        this.contextTooltip = function() { return [ `<img src="img/src/buffs/B4.jpg">Up to <span style="color:coral">5 Combat Actions</span> can be used on boss encounters. Combat Actions immediately recharge once the battle ends<br><br><span style="display:flex;justify-content:center">${colorTag("✦ "+combatActions + " remaining", "#789E45")}</span>` ] };
        Object.assign(this, properties);
    }

    use(){
        if (combatActions<1) {playSound("audio/thud.mp3"); return}
        if (bossTime) combatActions--
        playSound("audio/monch.mp3")
        buffs.FoodRegen.time=0
        playerBuffs();
        buffs.FoodRegen.time=20;
        buffs.FoodRegen.stacks=2000/20;
        playerBuffs();
        this.constructor.count--;
    }
}





let tierClothDescription = '+10% Dodge Chance';
let tierClothItems = [3,2,5,6]


function returnWeaponDamageType(type, formula){

if (type==="Nature") enemyNatureDamage(formula+100)
if (type==="Elemental") enemyElementalDamage(formula+100)
if (type==="Occult") enemyOccultDamage(formula+100)

}


class MonsterCard extends Item {
    constructor(properties = {}) {
        super(properties);
        this.flavor = `"A trading-based collectors edition card depicting a monster. Initially only valuable among young turtles, was later introduced into the turtle market as a legal trade currency."`;
        this.description = function() { return `<span style="color:#1eff00">★ Use: Add this card to your Bestiary collection</span>`}
        Object.assign(this, properties);
    }


    init() {

         this.savedName = `${enemies[stats.currentEnemy].name} Collectible Card`
         this.savedImg = 434
         this.savedQuality = `Rare`;

         if (chance(1/3)){
            this.savedName = `${enemies[stats.currentEnemy].name} Time-Limited Card`
            this.savedImg = 435
            this.savedQuality = `Epic`;

         }


         if (chance(1/6)){
            this.savedName = `${enemies[stats.currentEnemy].name} Ultra Rare Card`
            this.savedImg = 436
            this.savedQuality = `Mythic`;

         }

         this.savedInfo = stats.currentEnemy
         

    }

    use(){
        if(this.quality==="Rare")  enemies[this.savedInfo].card1.got = true;
        if(this.quality==="Epic")  enemies[this.savedInfo].card2.got = true;
        if(this.quality==="Mythic")  enemies[this.savedInfo].card3.got = true;
    }


    invInit(){
        this.name = this.savedName
        this.img = this.savedImg
        this.quality = this.savedQuality
    }

    

}


class AncientChestplate extends ArmorChest {
    constructor(properties = {}) {
        super(properties);
        this.name = `Ancient Chestplate`;
        this.flavor = `"A stone-carved chiseled armor piece. Quite bad for mobility, but defense-wise, it rocks."`;
        this.skillDescription = function() { return `- 10% Attack Speed<br>+ 20% All Resist Up` };
        this.img = 396;
        this.quality = `Common`;
        this.baseHp = 120;
        Object.assign(this, properties);
    }
    stats(){
        stat.AttackSpeed -= 10;
        stat.NatureResist += 20
        stat.OccultResist += 20
        stat.ElementalResist += 20
    }
}


class WoodenSword extends Weapon {
    constructor(properties = {}) {
        super(properties);
        this.name = `Wooden Sword`
        this.flavor = `"A wooden stick shaped like a sword, retaining all the properties of a wooden stick and none of a sword."`
        this.skillDescription = function() { return `1/${Math.ceil(this.baseSkillChance*this.skillChance)} chance to deal an align-infused slash ${1+this.skillMultishot} times dealing x${this.baseSkillDamage*this.skillDamage} weapon damage`}
        this.img = 8
        this.baseDamage = 20
        this.baseSkillChance = 5
        this.baseSkillDamage = 3
        this.quality = `Common`
        Object.assign(this, properties);
    }

    attack(){

        if (chance(1/(this.baseSkillChance*this.skillChance))) {for (let i = 0; i < 1+this.skillMultishot; i++) { setTimeout(() => weaponSkill(this), 100 * i) }}
        else {for (let i = 0; i < 1+this.multishot; i++) { setTimeout(() => weaponAttack(this), 100 * i) }}

        function weaponAttack(i){
            attackAnimation("melee")


            enemyDamageAnimation("low")
                returnWeaponDamageType(i.align,i.finalDamage())

        }

        function weaponSkill(i){

            attackAnimation("melee")
            let miau = 0
            if (i.align != undefined && i.align === "Elemental") miau = 320
            if (i.align != undefined && i.align === "Occult") miau = 230
            if (i.align != undefined && i.align === "Nature") miau = 50
            particleTrackers.push(new ParticleSlash(undefined,undefined,{imageHue:miau}));
            particleTrackers.push(new ParticleShockwave(undefined,undefined,{imageHue:miau}));
            particleTrackers.push(new ParticleSparks(enemyRect.left - containerRect.left + enemyRect.width / 2 * rngD(0.8,1.2), enemyRect.top - containerRect.top + enemyRect.height / 2 *1.4 * rngD(0.9,1.1)));
            particleTrackers.push(new ParticleSparks(enemyRect.left - containerRect.left + enemyRect.width / 2 * rngD(0.8,1.2), enemyRect.top - containerRect.top + enemyRect.height / 2 *1.4 * rngD(0.9,1.1)));
            particleTrackers.push(new ParticleSparks(enemyRect.left - containerRect.left + enemyRect.width / 2 * rngD(0.8,1.2), enemyRect.top - containerRect.top + enemyRect.height / 2 *1.4 * rngD(0.9,1.1)));
            enemyDamageAnimation("medium")
            returnWeaponDamageType(i.align,i.finalDamage()*(i.baseSkillDamage*i.skillDamage))

            
        }

    }


}




class WoodenBow extends Weapon {

    constructor(properties = {}) {
        super(properties);
        this.name = `Wooden Bow`
        this.flavor = `"It should hold together for a few shots before falling apart entirely."`
        this.skillDescription = function() { return `1/${Math.ceil(this.baseSkillChance*this.skillChance)} chance to fire ${2+this.skillMultishot} explosive arrows dealing x${this.baseSkillDamage*this.skillDamage} weapon damage`}
        this.img = 9
        this.baseDamage = 45
        this.baseSkillChance = 5
        this.baseSkillDamage = 2
        this.quality = `Common`
        this.noScrap = true
        Object.assign(this, properties);
    }

    attack(){

        if (chance(1/(this.baseSkillChance*this.skillChance))) {for (let i = 0; i < 2+this.skillMultishot; i++) { setTimeout(() => weaponSkill(this), 100 * i) }}
        else {for (let i = 0; i < 1+this.multishot; i++) { setTimeout(() => weaponAttack(this), 100 * i) }}

        function weaponAttack(i){
            attackAnimation("ranged")

            particleTrackers.push(new ParticleArrow());

            setTimeout(() => {
                enemyDamageAnimation("low")
                returnWeaponDamageType(i.align,i.finalDamage())
            }, 500);

        }

        function weaponSkill(i){

            attackAnimation("ranged")

            if (i.align != undefined && i.align === "Elemental") particleTrackers.push(new ParticleWoodenBowE());
            if (i.align != undefined && i.align === "Occult")particleTrackers.push(new ParticleWoodenBowO());
            if (i.align != undefined && i.align === "Nature") particleTrackers.push(new ParticleWoodenBowN());

            setTimeout(() => {
                enemyDamageAnimation("medium")
                returnWeaponDamageType(i.align,i.finalDamage()*(i.baseSkillDamage*i.skillDamage))
            }, 500);
            
        }

    }

}

class ChrysalisRecurver extends Weapon {

    constructor(properties = {}) {
        super(properties);
        this.name = `Chrysalis Recurver`
        this.flavor = `"A short, ominous bow splintered with red crystals."`
        this.skillDescription = function() { return `1/${Math.ceil(this.baseSkillChance*this.skillChance)} chance to fire a volley of ${5+this.skillMultishot} heat-seeking shards dealing x${this.baseSkillDamage*this.skillDamage} weapon damage`}
        this.img = 83
        this.baseDamage = 90
        this.baseSkillChance = 5
        this.baseSkillDamage = 1
        this.quality = `Uncommon`
        Object.assign(this, properties);
    }

    attack(){

        if (chance(1/(this.baseSkillChance*this.skillChance))) {for (let i = 0; i < 5+this.skillMultishot; i++) { setTimeout(() => weaponSkill(this), 50 * i) }}
        else {for (let i = 0; i < 2+this.multishot; i++) { setTimeout(() => weaponAttack(this), 100 * i) }}

        function weaponAttack(i){
            attackAnimation("ranged")

            particleTrackers.push(new ParticleHooperonaBow());

  

            setTimeout(() => {
                enemyDamageAnimation("low")
                returnWeaponDamageType(i.align,i.finalDamage())
            }, 500);

        }

        function weaponSkill(i){

            attackAnimation("ranged")

            //if (i.align != undefined && i.align === "Elemental") particleTrackers.push(new ParticleWoodenBowE());
            //if (i.align != undefined && i.align === "Occult")particleTrackers.push(new ParticleWoodenBowO());
            //if (i.align != undefined && i.align === "Nature") particleTrackers.push(new ParticleWoodenBowN())

            if (i.align != undefined && i.align === "Nature") particleTrackers.push(new ParticleHooperonaBowSkill());
            if (i.align != undefined && i.align === "Occult") particleTrackers.push(new ParticleHooperonaBowSkill(undefined,undefined,{particleConfig: {initialColor : { r: 232, g: 222, b: 86 },finalColor : { r: 175, g: 106, b: 178 },}}));
            if (i.align != undefined && i.align === "Elemental") particleTrackers.push(new ParticleHooperonaBowSkill(undefined,undefined,{particleConfig: {initialColor : { r: 92, g: 255, b: 240 },finalColor : { r: 113, g: 125, b: 186 },}}));




            setTimeout(() => {
                enemyDamageAnimation("medium")
                returnWeaponDamageType(i.align,i.finalDamage()*(i.baseSkillDamage*i.skillDamage))
            }, 500);
            
        }

    }

}


class FoliarBlade extends Weapon {
    constructor(properties = {}) {
        super(properties);
        this.name = `Foliar Blade`
        this.flavor = `"A blossoming blade emerging from the heart of the forest."`
        this.skillDescription = function() { return `1/${Math.ceil(this.baseSkillChance*this.skillChance)} chance to shoot ${3+this.skillMultishot} razor-sharp leaves  dealing x${this.baseSkillDamage*this.skillDamage} weapon damage`}
        this.img = 33
        this.baseDamage = 190
        this.baseSkillChance = 5
        this.baseSkillDamage = 1
        this.quality = `Uncommon`
        Object.assign(this, properties);
    }

    attack(){

        if (chance(1/(this.baseSkillChance*this.skillChance))) {for (let i = 0; i < 1; i++) { setTimeout(() => weaponSkill(this), 100 * i) }}
        else {for (let i = 0; i < 1+this.multishot; i++) { setTimeout(() => weaponAttack(this), 100 * i) }}

        function weaponAttack(i){
            attackAnimation("melee")




            enemyDamageAnimation("low")
                returnWeaponDamageType(i.align,i.finalDamage())
        }

        function weaponSkill(i){

            attackAnimation("melee")
            let miau = 0
            if (i.align != undefined && i.align === "Elemental") miau = 320
            if (i.align != undefined && i.align === "Occult") miau = 230
            if (i.align != undefined && i.align === "Nature") miau = 50
            particleTrackers.push(new ParticleSlash(undefined,undefined,{imageHue:miau}));
            particleTrackers.push(new ParticleShockwave(undefined,undefined,{imageHue:miau}));
            particleTrackers.push(new ParticleSparks(enemyRect.left - containerRect.left + enemyRect.width / 2 * rngD(0.8,1.2), enemyRect.top - containerRect.top + enemyRect.height / 2 *1.4 * rngD(0.9,1.1)));
            particleTrackers.push(new ParticleSparks(enemyRect.left - containerRect.left + enemyRect.width / 2 * rngD(0.8,1.2), enemyRect.top - containerRect.top + enemyRect.height / 2 *1.4 * rngD(0.9,1.1)));


            enemyDamageAnimation("low")
            returnWeaponDamageType(i.align,i.finalDamage())



            for (let b = 0; b < 3+i.skillMultishot; b++) { setTimeout(() => loop(i), 100 * b) }


            function loop(e) {


                particleTrackers.push(new ParticleLeaf(undefined,undefined,{imageHue:miau}));
                
    
                setTimeout(() => {
                    returnWeaponDamageType(e.align,e.finalDamage()*(e.baseSkillDamage*e.skillDamage))
                    enemyDamageAnimation("medium")
                }, 700);






            }




        


            
        }

    }


}


function attackAnimation(type){

    if (settings.disableCombatAnimations) return

    if (!document.hasFocus()) return

    if(type==="ranged"){
        voidAnimation("playerAnimation", "gelatine 0.5s 1 ease")
        voidAnimation("weaponAnimation", "gelatine 0.5s 1 ease")
    }

    if(type==="melee"){
        voidAnimation("playerAnimation", "playerAttack 0.5s 1 ease")
    }

}

function enemyDamageAnimation(type, target){

    if (!document.hasFocus()) return



    if (settings.disableCombatAnimations) return
    if (settings.quality === "Low" || settings.quality === "Very Low") return

    let miau = enemy
    if (target === "player") miau = did("playerAnimation")


    if (type==="low"){
        miau.style.animation = "";
        void miau.offsetWidth;
        miau.style.animation =  "attackSmallHit 0.2s 1";
        if (!settings.disableCombatAudio) playSound("audio/button4.mp3")
    }

    if (type==="medium"){
        miau.style.animation = "";
        void miau.offsetWidth;
        miau.style.animation =  "attackMediumHit 0.2s 1";
        if (!settings.disableCombatAudio) playSound("audio/button4.mp3")
        if (!settings.disableCombatAudio) playSound("audio/hit1.mp3")
    }

    if (type==="high"){
        miau.style.animation = "";
        void miau.offsetWidth;
        miau.style.animation =  "shakeFlash 0.4s 1";
        if (!settings.disableCombatAudio) playSound("audio/explosion.mp3")
    }

}







class TheCaught extends Weapon {
    constructor(properties = {}) {
        super(properties);
        this.name = `The Caught`
        this.flavor = `"A two-pronged fishing spear forged from a unique blue-hued metal, reflecting the mysteries of the deep."`
        this.skillDescription = function() { return `1/${this.baseSkillChance*this.skillChance} chance to fire 2 align-infused arrows dealing x${this.baseSkillDamage*this.skillDamage} base damage`}
        this.img = 169
        this.baseDamage = 60
        this.baseSkillChance = 5
        this.baseSkillDamage = 5
        this.quality = `Rare`
        Object.assign(this, properties);
    }

    attack(){}
}



class SkullRing extends ArmorRing {
    constructor(properties = {}) {
        super(properties);
        this.name = `Skull Ring`;
        this.flavor = `"A omnious ring shaped like a skull, promising great riches to the wearer. Usually, these kinds of jewelry happen to be cursed, but we are here for the short run."`;
        this.skillDescription = function() { return `+ 10 Income ?` };
        this.img = 427;
        this.quality = `Uncommon`;
        Object.assign(this, properties);
    }
    stats(){
        stat.Income += 10
        stat.Luck = 0
        stat.HealingBonus = 0
        stat.DodgeChance = 0
        stat.OfflineBonus = 0
    }
}




function prefixTrigger(item){

    if (item.prefix2 === `Vampiric`) {
        if (chance(1/1)){
            particleTrackers.push(new TrackerLifesteal());
            setTimeout(() => {
                playerHealingDamage(item.finalDamage())
            }, 300);
        }
    }

    if (item.prefix2 === `Fulgurant`) {
        if (chance(1/1)){
            particleTrackers.push(new TrackerFulgurant());
        }
        setTimeout(() => {
            particleTrackers.push(new TrackerFulgurant());
            enemyDamageAnimation("low")
            enemyElementalDamage(item.finalDamage())
        }, 300);
        setTimeout(() => {
            enemyDamageAnimation("low")
            enemyElementalDamage(item.finalDamage())
        }, 600);
    }

    if (item.prefix2 === `Shackled`) {
        if (chance(1/1)){
            particleTrackers.push(new TrackerShackled());
        }
        setTimeout(() => {
            enemyDamageAnimation("low")
            enemyOccultDamage(item.finalDamage())
        }, 700);

    }






}













