buffs.EnemyPoison = {
    name: 'Poison',
    description: '<FONT COLOR="#8fbaff">Losing Life',
    effect : function() { statHidden.enemyNatureDot += stat.Power*0.3 },
    img : 'img/src/buffs/B1.jpg',
    debuff: true,
    position: `enemy`,
}

buffs.EnemyBurning = {
    name: 'Burning',
    description: '<FONT COLOR="#8fbaff">Losing Life',
    effect : function() { statHidden.enemyElementalDot += stat.Power*0.3 },
    img : 'img/src/buffs/B16.jpg',
    debuff: true,
    position: `enemy`,
} 

buffs.EnemyEnrage = {
    name: 'Enrage',
    description: '<FONT COLOR="#8fbaff">Increased Attack',
    effect : function() { enemyDamageMultiplier = 1 + this.stacks*0.10 },
    img : 'img/src/buffs/B26.jpg',
    position: `enemy`,
    stacks: 0,
    tag: "clear",
} 

buffs.BossAura1 = {
    name: 'BossAura1',
    hidden : true,
    description: '<FONT COLOR="#8fbaff">Increased Attack',
    img : 'img/src/buffs/B26.jpg',
    position: `enemy`,
    tag: "clear",
} 

buffs.EnemyInvulnerable = {
    name: 'Invulnerable',
    description: '<FONT COLOR="#8fbaff">Unable to receive damage',
    img : 'img/src/buffs/B33.jpg',
    position: `enemy`,
    tag: "clear",

}

buffs.TigerSet = {
    name: 'Mighty Roar',
    description: '<FONT COLOR="#8fbaff">Crit Chance increased by 100%!',
    effect : function() { stat.CritChance+=100 },
    img : 'img/src/items/I134.jpg',
    position: `player`,
}

buffs.PlayerPoison = {
    name: 'Poison',
    description: '<FONT COLOR="#8fbaff">Losing Life',
    effect : function() { statHidden.playerNatureDot += (stat.MaxHealth/100)*this.stacks },
    img : 'img/src/buffs/B1.jpg',
    debuff: true,
    tag: "clear",
    stacks: 0,
    position: `player`,
}

buffs.PlayerBurning = {
    name: 'Burning',
    description: '<FONT COLOR="#8fbaff">Losing Life',
    effect : function() { statHidden.playerElementalDot += (stat.MaxHealth/100)*this.stacks },
    img : 'img/src/buffs/B16.jpg',
    debuff: true,
    tag: "clear",
    stacks: 0,
    position: `player`,
}

buffs.PlayerPetrify = {
    name: 'Petrified',
    description: '<FONT COLOR="#8fbaff">Unable to attack',
    img : 'img/src/buffs/B35.jpg',
    debuff: true,
    tag: "clear",
    position: `player`,
}


buffs.PlayerSlow = {
    name: 'Slow',
    description: '<FONT COLOR="#8fbaff">Feeling Sluggish...',
    effect : function() { stat.AttackSpeed -= 5*this.stacks },
    img : 'img/src/buffs/B36.jpg',
    debuff: true,
    stacks: 0,
    tag: "clear",
    position: `player`,
}

buffs.Skamtebord = {
    name: 'Skamtebord',
    description: '<FONT COLOR="#8fbaff">Increased Attack Speed with every stack',
    effect : function() { stat.AttackSpeed += (5*this.stacks)*statHidden.skamtebord },
    img : 'img/src/buffs/B2.jpg',
    stacks: 0,
    tag: "clear",
    position: `player`,
}

buffs.HardModeCurse1 = {
    name: 'Curse Of Fraility',
    description: '<FONT COLOR="#8fbaff">- 30% All Align Bonus (Hard Mode Debuff)',
    effect : function() { stat.OccultBonus-=30; stat.NatureBonus-=30; stat.ElementalBonus-=30; },
    img : 'img/src/buffs/B60.jpg',
    debuff: true,
    tag: "clear",
    position: `player`,
}

buffs.HardModeCurse2 = {
    name: 'Curse Of Weakness',
    description: '<FONT COLOR="#8fbaff">- 30% All Align Resist (Hard Mode Debuff)',
    effect : function() { stat.OccultResist-=30; stat.NatureResist-=30; stat.ElementalResist-=30; },
    img : 'img/src/buffs/B61.jpg',
    debuff: true,
    tag: "clear",
    position: `player`,
}

buffs.HardModeCurse3 = {
    name: 'Curse Of Blighting',
    description: '<FONT COLOR="#8fbaff">- 30% Healing Bonus (Hard Mode Debuff)',
    effect : function() { stat.HealingBonus-=30; },
    img : 'img/src/buffs/B62.jpg',
    debuff: true,
    tag: "clear",
    position: `player`,
}



buffs.KingKatDecapitator = {
    name: 'Mighty Grip',
    description: '<FONT COLOR="#8fbaff">+ 3% Crit Damage per Stack',
    effect : function() { stat.CritDamage += 3*this.stacks },
    img : 'img/src/items/I137.jpg',
    stacks: 0,
    position: `player`,
}

buffs.LumaTiger = {
    name: 'Will of the Tiger',
    description: '<FONT COLOR="#8fbaff">+ 5% Attack Speed per Stack',
    effect : function() { stat.AttackSpeed += 5*this.stacks },
    img : 'img/src/items/I587.jpg',
    stacks: 0,
    position: `player`,
}

buffs.MoonPendantBuff = {
    name: 'Blessing of the Moon',
    description: '<FONT COLOR="#8fbaff">Blessed by the pale mother',
    img : 'img/src/items/I412.jpg',
    position: `player`,
}

buffs.HeartyTincture = {
    name: 'Hearty Tincture',
    description: '<FONT COLOR="#8fbaff">+ 15% Max Health',
    img : 'img/src/items/I54.jpg',
    position: `global`,
    tag: `tincture`,
    effect : function() { stat.MaxHealth *= 1.15 },
}

buffs.NaturalTincture = {
    name: 'Natural Tincture',
    description: '<FONT COLOR="#8fbaff">+ 30% Nature Bonus',
    img : 'img/src/items/I110.jpg',
    position: `global`,
    tag: `tincture`,
    effect : function() { stat.NatureBonus += 30 },
}

buffs.ElementalTincture = {
    name: 'Elemental Tincture',
    description: '<FONT COLOR="#8fbaff">+ 30% Elemental Bonus',
    img : 'img/src/items/I188.jpg',
    position: `global`,
    tag: `tincture`,
    effect : function() { stat.ElementalBonus += 30 },
}

buffs.SinisterTincture = {
    name: 'Sinister Tincture',
    description: '<FONT COLOR="#8fbaff">+ 30% Occult Bonus',
    img : 'img/src/items/I189.jpg',
    position: `global`,
    tag: `tincture`,
    effect : function() { stat.OccultBonus += 30 },
}

buffs.LuckyTincture = {
    name: 'Lucky Tincture',
    description: '<FONT COLOR="#8fbaff">+ 20% Luck',
    img : 'img/src/items/I129.jpg',
    position: `global`,
    tag: `tincture`,
    effect : function() { stat.Luck += 20 },
}

buffs.WeekendBuff = {
    name: 'Turtle Weekend',
    description: '<FONT COLOR="#8fbaff">+ 20% Luck & x1.5 Income',
    img : 'img/src/buffs/B63.jpg',
    position: `global`,
    effect : function() { stat.Luck += 20; stat.Income*=1.5 },
}

buffs.NatureFlask = {
    name: 'Nature Flask',
    description: '<FONT COLOR="#8fbaff">+ 60% Nature Bonus',
    img : 'img/src/items/I49.jpg',
    position: `player`,
    tag: `potion`,
    effect : function() { stat.NatureBonus += 60 },
}

buffs.ElementalFlask = {
    name: 'Elemental Flask',
    description: '<FONT COLOR="#8fbaff">+ 60% Elemental Bonus',
    img : 'img/src/items/I154.jpg',
    position: `player`,
    tag: `potion`,
    effect : function() { stat.ElementalBonus += 60 },
}

buffs.OccultFlask = {
    name: 'Occult Flask',
    description: '<FONT COLOR="#8fbaff">+ 60% Occult Bonus',
    img : 'img/src/items/I156.jpg',
    position: `player`,
    tag: `potion`,
    effect : function() { stat.OccultBonus += 60 },
}

buffs.Bloon1Luck = {
    name: 'Lucky Boost!',
    description: '<FONT COLOR="#8fbaff">Luck increased by 20%',
    effect : function() { stat.Luck += 20 },
    img : 'img/src/buffs/B53.jpg',
    position: `global`,
}

buffs.Bloon1Exp = {
    name: 'Exp Boost!',
    description: '<FONT COLOR="#8fbaff">EXP Bonus increased by 20%',
    effect : function() { stat.ExpBonus += 20 },
    img : 'img/src/buffs/B53.jpg',
    position: `global`,
}

buffs.Bloon1Luma = {
    name: 'Click Boost!',
    description: '<FONT COLOR="#8fbaff">Clicking Power increased by 20%',
    effect : function() { stat.LumaPower += 20 },
    img : 'img/src/buffs/B53.jpg',
    position: `global`,
}

buffs.Bloon1Income = {
    name: 'Income Boost!',
    description: '<FONT COLOR="#8fbaff">Income increased by x2',
    effect : function() { stat.Income *=2 },
    img : 'img/src/buffs/B53.jpg',
    position: `global`,
}

buffs.Bloon1Speed = {
    name: 'Attack Speed Boost!',
    description: '<FONT COLOR="#8fbaff">Attack Speed increased by 20%',
    effect : function() { stat.AttackSpeed +=20 },
    img : 'img/src/buffs/B53.jpg',
    position: `global`,
}

buffs.Bloon2Luck = {
    name: 'Lucky Frenzy!',
    description: '<FONT COLOR="#8fbaff">Luck increased by 50%',
    effect : function() { stat.Luck += 50 },
    img : 'img/src/buffs/B54.jpg',
    position: `global`,
}

buffs.Bloon2Exp = {
    name: 'Exp Frenzy!',
    description: '<FONT COLOR="#8fbaff">EXP Bonus increased by 100%',
    effect : function() { stat.ExpBonus += 100 },
    img : 'img/src/buffs/B54.jpg',
    position: `global`,
}

buffs.Bloon2Luma = {
    name: 'Click Frenzy!',
    description: '<FONT COLOR="#8fbaff">Clicking Power increased by 100%',
    effect : function() { stat.LumaPower += 100 },
    img : 'img/src/buffs/B54.jpg',
    position: `global`,
}

buffs.Bloon2Income = {
    name: 'Income Frenzy!',
    description: '<FONT COLOR="#8fbaff">Income increased by x5',
    effect : function() { stat.Income *=5 },
    img : 'img/src/buffs/B54.jpg',
    position: `global`,
}

buffs.Bloon2Speed = {
    name: 'Attack Speed Frenzy!',
    description: '<FONT COLOR="#8fbaff">Attack Speed increased by 50%',
    effect : function() { stat.AttackSpeed +=50 },
    img : 'img/src/buffs/B54.jpg',
    position: `global`,
}

buffs.Bloon3Luck = {
    name: 'Lucky Mania!',
    description: '<FONT COLOR="#8fbaff">Luck increased by 200%',
    effect : function() { stat.Luck += 200 },
    img : 'img/src/buffs/B55.jpg',
    position: `global`,
}

buffs.Bloon3Exp = {
    name: 'Exp Mania!',
    description: '<FONT COLOR="#8fbaff">EXP Bonus increased by 300%',
    effect : function() { stat.ExpBonus += 300 },
    img : 'img/src/buffs/B55.jpg',
    position: `global`,
}

buffs.Bloon3Luma = {
    name: 'Click Mania!',
    description: '<FONT COLOR="#8fbaff">Clicking Power increased by 200%',
    effect : function() { stat.LumaPower += 200 },
    img : 'img/src/buffs/B55.jpg',
    position: `global`,
}

buffs.Bloon3Income = {
    name: 'Income Mania!',
    description: '<FONT COLOR="#8fbaff">Income increased by x50',
    effect : function() { stat.Income *=50 },
    img : 'img/src/buffs/B55.jpg',
    position: `global`,
}

buffs.Bloon3Speed = {
    name: 'Attack Speed Mania!',
    description: '<FONT COLOR="#8fbaff">Attack Speed increased by 500%',
    effect : function() { stat.AttackSpeed +=500 },
    img : 'img/src/buffs/B55.jpg',
    position: `global`,
}

buffs.Tipsy = {
    name: 'Tipsy',
    description: '<FONT COLOR="#8fbaff">"Was the ground always this close?"',
    img : 'img/src/buffs/B59.jpg',
    position: `global`,
    effect : function() { if (this.stacks>2) did("mainScreen").style.animation = "tipsyBlur 20s infinite"   },
    stacks: 0,
    debuff: true,
}

buffs.Brightbug = {
    name: 'Bright Bug',
    description: '<FONT COLOR="#8fbaff">All align bonuses increased by 40% per stack',
    img : 'img/src/items/I589.jpg',
    position: `player`,
    effect : function() { stat.NatureBonus += this.stacks*40; stat.OccultBonus += this.stacks*40; stat.ElementalBonus += this.stacks*40;   },
    stacks: 0,
}

buffs.Sparkler1 = {
    name: 'Yellow Sparkler',
    description: '<FONT COLOR="#8fbaff">"I like the pretty lights."',
    img : 'img/src/items/I499.jpg',
    position: `global`,
}

buffs.Sparkler2 = {
    name: 'Blue Sparkler',
    description: '<FONT COLOR="#8fbaff">"I like the pretty lights."',
    img : 'img/src/items/I500.jpg',
    position: `global`,
}

buffs.Sparkler3 = {
    name: 'Green Sparkler',
    description: '<FONT COLOR="#8fbaff">"I like the pretty lights."',
    img : 'img/src/items/I501.jpg',
    position: `global`,
}

buffs.FoodRegen = {
    name: 'Well Fed',
    description: `<FONT COLOR="#8fbaff">Restoring Health overtime`,
    img : 'img/src/buffs/B56.jpg',
    tag : "Food",
    effect : function() { statHidden.playerHealingDot += buffs.FoodRegen.stacks },
    position: `player`,
}







Object.keys(buffs).forEach(function(key) {
    buffs[key].percentage = 1;      
    buffs[key].time = 0;
    buffs[key].statUp = 0;    
  });