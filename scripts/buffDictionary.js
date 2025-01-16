buffs.EnemyPoison = {
    name: 'Poison',
    description: '<FONT COLOR="#8fbaff">Losing Life',
    effect : function() { statHidden.enemyNatureDot += stat.Power*0.3 },
    img : 'img/src/buffs/B1.jpg',
    debuff: true,
    position: `enemy`,
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

buffs.MoonPendantBuff = {
    name: 'Blessing of the Moon',
    description: '<FONT COLOR="#8fbaff">Blessed by the pale mother',
    img : 'img/src/items/I412.jpg',
    position: `player`,
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
    description: '<FONT COLOR="#8fbaff">Luma Power increased by 20%',
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
    description: '<FONT COLOR="#8fbaff">Luma Power increased by 100%',
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
    description: '<FONT COLOR="#8fbaff">Luma Power increased by 200%',
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

buffs.Sparkler1 = {
    name: 'Yellow Sparkler',
    description: '<FONT COLOR="#8fbaff">"I like the pretty lights"',
    img : 'img/src/items/I499.jpg',
    position: `global`,
}

buffs.Sparkler2 = {
    name: 'Blue Sparkler',
    description: '<FONT COLOR="#8fbaff">"I like the pretty lights"',
    img : 'img/src/items/I500.jpg',
    position: `global`,
}

buffs.Sparkler3 = {
    name: 'Green Sparkler',
    description: '<FONT COLOR="#8fbaff">"I like the pretty lights"',
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