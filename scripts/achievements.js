
var logs = {}

//book1

stats.logsGotLog = 0


logs.L1P1 = {}
logs.L1P1.name = "Cultivated Mind";
logs.L1P1.description = "Complete 10 Achievements";
logs.L1P1.hint = '"What do I like more than materialistic things? Knowledge."';
logs.L1P1.logic = 'stats.logsGotLog>9';
logs.L1P1.tag = '📕';
logs.L1P1.progressTotal = 10;
logs.L1P1.category = "A1";
logs.L1P1.repeatable = true;
logs.L1P1.repeatableClick = function() {return stats.logsGotLog -= 10};
logs.L1P1.progressDescription = function() { return `${beautify(stats.logsGotLog )}/10` };

logs.L1P2 = {}
logs.L1P2.name = "Big Brain";
logs.L1P2.description = "Complete 25 Achievements";
logs.L1P2.hint = '"Oh yeah it is time."';
logs.L1P2.logic = 'stats.logsGot>24';
logs.L1P2.tag = '📕';
logs.L1P2.progressTotal = 25;
logs.L1P2.category = "A1";

logs.L1P3 = {}
logs.L1P3.name = "Knowledge Garden";
logs.L1P3.description = "Complete 50 Achievements";
logs.L1P3.hint = '"Have you been studying a lot?"';
logs.L1P3.logic = 'stats.logsGot>49';
logs.L1P3.tag = '📕';
logs.L1P3.category = "A1";

/*


logs.L1P3B = {}
logs.L1P3B.name = "Library of Babel";
logs.L1P3B.description = "Collect 100 Books";
logs.L1P3B.hint = '"Well alright I lied."';
logs.L1P3B.logic = 'stats.logsGot>99';
logs.L1P3B.tag = '📕';
logs.L1P3B.category = "A1";

logs.L1P3C = {}
logs.L1P3C.name = "Library of Ruina";
logs.L1P3C.description = "Collect 120 Books";
logs.L1P3C.hint = '"The real ruina is going to be fitting all of these on the shelf."';
logs.L1P3C.logic = 'stats.logsGot>119';
logs.L1P3C.tag = '📕';
logs.L1P3C.category = "A1";
*/
logs.L1P4 = {}
logs.L1P4.name = "Nice.";
logs.L1P4.description = "Deal exactly 69 damage";
logs.L1P4.hint = '"Nice."';
logs.L1P4.tag = '♋';
logs.L1P4.category = "A1";

/*
logs.L1P4A1 = {}
logs.L1P4A1.name = "Not Nice";
logs.L1P4A1.description = "Deal exactly 0 damage";
logs.L1P4A1.hint = '"So did I missed or?"';
logs.L1P4A1.tag = '♋';
logs.L1P4A1.category = "A1";
*/
logs.L1P4A = {}
logs.L1P4A.name = "Small Fortune";
logs.L1P4A.description = "Obtain 10K Total Shells<FONT COLOR='gray'> (Only the TOTAL COINS GAINED on the statistics panel will count)";
logs.L1P4A.hint = '"Not decided yet on what to spend it on."';
logs.L1P4A.logic = 'stats.totalCoins>10000';
logs.L1P4A.tag = '💰';
logs.L1P4A.category = "A1";

logs.L1P4B = {}
logs.L1P4B.name = "Here Comes The Money";
logs.L1P4B.description = "Obtain 100K Total Shells";
logs.L1P4B.hint = '"Money talk."';
logs.L1P4B.logic = 'stats.totalCoins>100000';
logs.L1P4B.tag = '💰';
logs.L1P4B.category = "A1";

/* 

logs.L1P4C = {}
logs.L1P4C.name = "Bury Me With...";
logs.L1P4C.description = "Obtain 1M Total Shells";
logs.L1P4C.hint = '"...........my mone."';
logs.L1P4C.logic = 'stats.totalCoins>1000000';
logs.L1P4C.tag = '💰';
logs.L1P4C.category = "A1";

logs.L1P4D = {}
logs.L1P4D.name = "Tax Fraud";
logs.L1P4D.description = "Obtain 10M Total Shells";
logs.L1P4D.hint = '"Turtles can\'t possibly go to jail."';
logs.L1P4D.logic = 'stats.totalCoins>10000000';
logs.L1P4D.tag = '💰';
logs.L1P4D.category = "A1";

logs.L1P4E = {}
logs.L1P4E.name = "Tortullionaire";
logs.L1P4E.description = "Obtain 100M Total Shells";
logs.L1P4E.hint = '"Look it up, its a real word."';
logs.L1P4E.logic = 'stats.totalCoins>100000000';
logs.L1P4E.tag = '💰';
logs.L1P4E.category = "A1";

*/

stats.questsCompletedLog = 0

logs.L1P5 = {}
logs.L1P5.name = "Beginner Adventurer";
logs.L1P5.description = "Complete 6 Quests";
logs.L1P5.hint = '"I\'m Ready! I\'m Ready! I\'m Ready! I\'m Ready!"';
logs.L1P5.logic = 'stats.questsCompletedLog>5';
logs.L1P5.tag = '📜';
logs.L1P5.category = "A1";
logs.L1P5.repeatable = true;
logs.L1P5.repeatableClick = function() {return stats.questsCompletedLog  -= 6};
logs.L1P5.progressDescription = function() { return `${beautify(stats.questsCompletedLog )}/6` };


logs.L1P6 = {}
logs.L1P6.name = "Advanced Adventurer";
logs.L1P6.description = "Complete 10 Quests";
logs.L1P6.hint = '"I really was ready."';
logs.L1P6.logic = 'stats.questsCompleted>9';
logs.L1P6.tag = '📜';
logs.L1P6.category = "A1";


/*




logs.L1P7A = {}
logs.L1P7A.name = "Lending a Cat Paw";
logs.L1P7A.description = "Complete 50 Quests";
logs.L1P7A.hint = '"A turtle will do."';
logs.L1P7A.logic = 'stats.questsCompleted>49';
logs.L1P7A.tag = '📜';
logs.L1P7A.category = "A1";

*/

stats.areaBossKills = 0
stats.areaBossKillsLog = 0

logs.B1 = {}
logs.B1.name = "Drop The Loot";
logs.B1.description = "Defeat an Area Boss 15 Times";
logs.B1.hint = '"I need your materials, old man."';
logs.B1.logic = 'stats.areaBossKillsLog>14';
logs.B1.tag = '💀';
logs.B1.category = "A1";
logs.B1.repeatable = true;
logs.B1.repeatableClick = function() {return stats.areaBossKillsLog  -= 15};
logs.B1.progressDescription = function() { return `${beautify(stats.areaBossKillsLog )}/15` };

logs.B2 = {}
logs.B2.name = "Monster Hunter";
logs.B2.description = "Defeat an Area Boss 55 Times";
logs.B2.hint = '"Your fate was sealed the moment you dropped a cool weapon."';
logs.B2.logic = 'stats.areaBossKills>54';
logs.B2.tag = '💀';
logs.B2.category = "A1";


logs.L1P8 = {}
logs.L1P8.name = "Arachnophobia";
logs.L1P8.description = "Defeat Hoopperoona";
logs.L1P8.hint = '"Turtles and spiders were never meant to be friends."';
logs.L1P8.logic = 'enemies.E4.killCount>0';
logs.L1P8.tag = '🕷️';
logs.L1P8.category = "A1";

logs.L1P9 = {}
logs.L1P9.name = "Fight Poison With Poison";
logs.L1P9.description = "Poison Hoopperoona";
logs.L1P9.hint = '"Feels good man."';
logs.L1P9.logic = "stats.currentEnemy==='E4' && (buffs.EnemyPoison.time>0)";
logs.L1P9.tag = '🕷️';
logs.L1P9.category = "A1";

logs.L1P10 = {}
logs.L1P10.name = "Whatever Did We Do?";
logs.L1P10.description = "Check out the Discord";
logs.L1P10.hint = '"Everyone is invited c:"';
logs.L1P10.logic = 'logTrackClickDiscord';
logs.L1P10.tag = '💬';
logs.L1P10.category = "A1";

logs.L1P11 = {}
logs.L1P11.name = "Power Surge";
logs.L1P11.description = "Reach level 10";
logs.L1P11.hint = '"First of many."';
logs.L1P11.logic = 'rpgClass[stats.currentClass].level>9';
logs.L1P11.tag = '⚜️';
logs.L1P11.category = "A1";

logs.L1P12 = {}
logs.L1P12.name = "Path of the Hero";
logs.L1P12.description = "Reach level 20";
logs.L1P12.hint = '"And they don\'t stop coming..."';
logs.L1P12.logic = 'rpgClass[stats.currentClass].level>19';
logs.L1P12.tag = '⚜️';
logs.L1P12.category = "A1";

logs.HAT1 = {}
logs.HAT1.name = "Unusual Addiction";
logs.HAT1.description = "Buy 1 Shell Co. Delivery Box";
logs.HAT1.hint = '"Oh dear now I need to get them all."';
logs.HAT1.logic = 'stats.hatsGot>0';
logs.HAT1.tag = '🧢';
logs.HAT1.category = "A1";

stats.hatsGotLog = 0

logs.HAT2 = {}
logs.HAT2.name = "The Bigger Wardrobe";
logs.HAT2.description = "Buy 25 Shell Co. Delivery Boxes";
logs.HAT2.hint = '"I\'m considering getting the prime subscription."';
logs.HAT2.logic = 'stats.hatsGotLog>24';
logs.HAT2.tag = '🧢';
logs.HAT2.category = "A1";
logs.HAT2.repeatable = true;
logs.HAT2.repeatableClick = function() {return stats.hatsGotLog -= 25};
logs.HAT2.progressDescription = function() { return `${beautify(stats.hatsGotLog)}/25` };
logs.HAT2.category = "A1";

logs.HAT3 = {}
logs.HAT3.name = "Grand Gambling";
logs.HAT3.description = "Buy 110 Shell Co. Delivery Boxes";
logs.HAT3.hint = '"At least it didn\'t drained my wallet."';
logs.HAT3.logic = 'stats.hatsGot>109';
logs.HAT3.tag = '🧢';
logs.HAT3.category = "A1";

logs.L1P14 = {}
logs.L1P14.name = "You Shall be Known as...";
logs.L1P14.description = "Change the name of your turtle";
logs.L1P14.hint = '"Let your voice be heard."';
logs.L1P14.logic = "logTrackName!=='base'";
logs.L1P14.tag = '✒️';
logs.L1P14.category = "A1";

logs.L1P15 = {}
logs.L1P15.name = "Back in Black";
logs.L1P15.description = "Change the name of your turtle back to Jeffrey";
logs.L1P15.hint = '"It\'s like he never left..."';
logs.L1P15.logic = "logTrackName==='jeffrey' || logTrackName==='Jeffrey'";
logs.L1P15.tag = '✒️';
logs.L1P15.category = "A1";

logs.L1P15A = {}
logs.L1P15A.name = "Impostor Syndrome";
logs.L1P15A.description = "Change the name of your turtle to Duck";
logs.L1P15A.hint = '"Besides the fact that you got the wrong animal."';
logs.L1P15A.logic = "logTrackName==='duck' || logTrackName==='Duck'";
logs.L1P15A.tag = '✒️';
logs.L1P15A.category = "A1";

logs.L1P16 = {}
logs.L1P16.name = "So I Just Need To Let It Run?";
logs.L1P16.description = "Play for 5 hours";
logs.L1P16.hint = '"Gameplay."';
logs.L1P16.logic = 'stats.activeSeconds>18000';
logs.L1P16.tag = '⌛';
logs.L1P16.category = "A1";

stats.activeSecondsLog = 0

logs.L1P17 = {}
logs.L1P17.name = "Turtle Rabbithole";
logs.L1P17.description = "Play for 15 hours";
logs.L1P17.hint = '"Where will it take me?"';
logs.L1P17.logic = 'stats.activeSecondsLog>54000';
logs.L1P17.tag = '⌛';
logs.L1P17.repeatable = true;
logs.L1P17.repeatableClick = function() {return stats.activeSecondsLog -= 54000};
logs.L1P17.progressDescription = function() { return `${beautify(stats.activeSecondsLog/60/60)}/15` };
logs.L1P17.category = "A1";

logs.L1P18 = {}
logs.L1P18.name = "I Can Stop Whenever I want";
logs.L1P18.description = "Play for 50 hours";
logs.L1P18.hint = '"I just don\'t want to."';
logs.L1P18.logic = 'stats.activeSeconds>180000';
logs.L1P18.tag = '⌛';
logs.L1P18.category = "A1";


logs.L1P19 = {}
logs.L1P19.name = "Pat Pat Pat Pat Pat";
logs.L1P19.description = "Click the turtle 100 times";
logs.L1P19.hint = "'pat pat pat pat pat pat pat pat pat'";
logs.L1P19.logic = 'stats.clickCount>99';
logs.L1P19.tag = '✋';
logs.L1P19.category = "A1";

stats.upgradedItemsLog = 0

logs.UPG1 = {}
logs.UPG1.name = "Enhancer";
logs.UPG1.description = "Upgrade gear 4 times";
logs.UPG1.hint = "'I don\'t claim to be the best blacksmith in Cradle Hills.'";
logs.UPG1.logic = 'stats.upgradedItemsLog>3';
logs.UPG1.tag = '⬆️';
logs.UPG1.category = "A1";
logs.UPG1.repeatable = true;
logs.UPG1.repeatableClick = function() {return stats.upgradedItemsLog  -= 4};
logs.UPG1.progressDescription = function() { return `${beautify(stats.upgradedItemsLog )}/4` };

logs.UPG2 = {}
logs.UPG2.name = "Limit Breaker";
logs.UPG2.description = "Upgrade gear 20 times";
logs.UPG2.hint = "'Beyond any known lines.'";
logs.UPG2.logic = 'stats.upgradedItems>19';
logs.UPG2.tag = '⬆️';
logs.UPG2.category = "A1";

logs.L1P20 = {}
logs.L1P20.name = "Quack.";
logs.L1P20.description = "Click the hidden duck";
logs.L1P20.hint = '"That\'s not the animal you want to click."';
logs.L1P20.logic = 'logTrackClickDuck';
logs.L1P20.tag = '🦆';
logs.L1P20.category = "A1";

logs.AR1 = {}
logs.AR1.name = "???????";
logs.AR1.description = "Obtain a Glitched Item";
logs.AR1.hint = '"Turtle-made horrors beyond comprehension."';
logs.AR1.tag = '👾';
logs.AR1.category = "A1";

logs.P30 = {}
logs.P30.name = "This One Officer";
logs.P30.description = "Click this book";
logs.P30.hint = '"Caught red handed."';
logs.P30.tag = '🧶';
logs.P30.category = "A1";

logs.P34 = {}
logs.P34.name = "Ill Take Your Entire Stock";
logs.P34.description = "Buy 100 items";
logs.P34.hint = '"Do you have the client card?"';
logs.P34.logic = 'stats.boughtItems>99';
logs.P34.tag = '🛒';
logs.P34.category = "A1";

logs.P34A = {}
logs.P34A.name = "Oniomaniac Therapy";
logs.P34A.description = "Buy 1000 items";
logs.P34A.hint = '"I got enough points for the pot set."';
logs.P34A.logic = 'stats.boughtItems>999';
logs.P34A.tag = '🛒';
logs.P34A.category = "A1";

logs.P35 = {}
logs.P35.name = "One Punch Turtle";
logs.P35.description = "Deal 1K Damage in one hit";
logs.P35.hint = '"That\'s a lotta damage."';
logs.P35.logic = '';
logs.P35.tag = '⚔️';
logs.P35.category = "A1";



/*
logs.P35B = {}
logs.P35B.name = "One way trip";
logs.P35B.description = "Deal 1M Damage in one hit";
logs.P35B.hint = '"To the shadow realm."';
logs.P35B.logic = '';
logs.P35B.tag = '⚔️';
logs.P35B.category = "A1";

logs.P35BA = {}
logs.P35BA.name = "Assisted Atomisation";
logs.P35BA.description = "Deal 10M Damage in one hit";
logs.P35BA.hint = '"Smokin\' Sexy Style!"';
logs.P35BA.logic = '';
logs.P35BA.tag = '⚔️';
logs.P35BA.category = "A1";

logs.P35BB = {}
logs.P35BB.name = "Starshatter";
logs.P35BB.description = "Deal 100M Damage in one hit";
logs.P35BB.hint = '"Gone, reduced to atoms."';
logs.P35BB.logic = '';
logs.P35BB.tag = '⚔️';
logs.P35BB.category = "A1";

logs.P35BC = {}
logs.P35BC.name = "Subterranean Supernova";
logs.P35BC.description = "Deal 100B Damage in one hit";
logs.P35BC.hint = '<FONT COLOR="yellow">"CAUTION!! ☢ CAUTION!! ☢ CAUTION!! ☢"';
logs.P35BC.logic = '';
logs.P35BC.tag = '⚔️';
logs.P35BC.category = "A1";

logs.P35BD = {}
logs.P35BD.name = "Atom Splitter";
logs.P35BD.description = "Deal 100T Damage in one hit";
logs.P35BD.hint = '"I am become death."';
logs.P35BD.logic = '';
logs.P35BD.tag = '⚔️';
logs.P35BD.category = "A1";
*/

logs.J1 = {}
logs.J1.name = "Shot Down";
logs.J1.description = "Click on a Balloon Turtle";
logs.J1.hint = '"No slingshot required."';
logs.J1.logic = 'stats.jesterTurtleClicks>0';
logs.J1.tag = '🎈';
logs.J1.category = "A1";

stats.jesterTurtleClicksLog = 0

logs.J2 = {}
logs.J2.name = "The Entire Circus";
logs.J2.description = "Click on 10 Balloon Turtles";
logs.J2.hint = '"You got all us laughing."';
logs.J2.logic = 'stats.jesterTurtleClicksLog>9';
logs.J2.tag = '🎈';
logs.J2.category = "A1";
logs.J2.repeatable = true;
logs.J2.repeatableClick = function() {return stats.jesterTurtleClicksLog  -= 10};
logs.J2.progressDescription = function() { return `${beautify(stats.jesterTurtleClicksLog )}/10` };

logs.P42 = {}
logs.P42.name = "Critical Thinking";
logs.P42.description = "Deal a Critical Hit";
logs.P42.hint = '"Glad we sorted this out one with words alone."';
logs.P42.logic = 'stats.criticalHitsDealt>0';
logs.P42.tag = '⚔️';
logs.P42.category = "A1";

logs.P42A = {}
logs.P42A.name = "Critical Mistake";
logs.P42A.description = "Deal 1000 Critical Hits";
logs.P42A.hint = '"You being alive, that is."';
logs.P42A.logic = 'stats.criticalHitsDealt>999';
logs.P42A.tag = '⚔️';
logs.P42A.category = "A1";

logs.P43 = {}
logs.P43.name = "Luck Issue";
logs.P43.description = "Obtain a Golden Clover";
logs.P43.hint = '"It\'s shrimple."';
logs.P43.logic = 'GoldenClover.count>0';
logs.P43.tag = '🍀';
logs.P43.category = "A1";

stats.stampsUsedLog = 0




//--------------------------------a2--------------------------------


logs.L1P3A = {}
logs.L1P3A.name = "Final Eden";
logs.L1P3A.description = "Collect 80 Books";
logs.L1P3A.hint = '"And this will be my last one."';
logs.L1P3A.logic = 'stats.logsGot>79';
logs.L1P3A.tag = '📕';
logs.L1P3A.category = "A2";

logs.L1P7 = {}
logs.L1P7.name = "Master Adventurer";
logs.L1P7.description = "Complete 15 Quests";
logs.L1P7.hint = '"Peraphs too ready."';
logs.L1P7.logic = 'stats.questsCompleted>14';
logs.L1P7.tag = '📜';
logs.L1P7.category = "A2";

logs.L1P7A = {}
logs.L1P7A.name = "Helping Hand";
logs.L1P7A.description = "Complete 25 Quests";
logs.L1P7A.hint = '"And the tortuga has four of them."';
logs.L1P7A.logic = 'stats.questsCompleted>24';
logs.L1P7A.tag = '📜';
logs.L1P7A.category = "A2";

logs.L1P13 = {}
logs.L1P13.name = "Potential Overflow";
logs.L1P13.description = "Reach level 30";
logs.L1P13.hint = '"And this... Is to go further beyond."';
logs.L1P13.logic = 'rpgClass[stats.currentClass].level>29';
logs.L1P13.tag = '⚜️';
logs.L1P13.category = "A2";

logs.L1P13A = {}
logs.L1P13A.name = "New Heights";
logs.L1P13A.description = "Reach level 40";
logs.L1P13A.hint = '"Much wiser through the years."';
logs.L1P13A.logic = 'rpgClass[stats.currentClass].level>39';
logs.L1P13A.tag = '⚜️';
logs.L1P13A.category = "A2";

logs.UPG3 = {}
logs.UPG3.name = "Limit Surpasser";
logs.UPG3.description = "Upgrade gear 70 times";
logs.UPG3.hint = "'Now we are the ones drawing the lines.'";
logs.UPG3.logic = 'stats.upgradedItems>69';
logs.UPG3.tag = '⬆️';
logs.UPG3.category = "A2";

logs.P27 = {}
logs.P27.name = "Apprentice Blacksmith";
logs.P27.description = "Reach Level 10 In Blacksmithing";
logs.P27.hint = '"Break a leg."';
logs.P27.logic = 'jobs.blacksmith.level>9';
logs.P27.tag = '⚒️';
logs.P27.category = "A2";

logs.P27B = {}
logs.P27B.name = "Apprentice Alchemist";
logs.P27B.description = "Reach Level 10 In Alchemy";
logs.P27B.hint = '"Brew a leg."';
logs.P27B.logic = 'jobs.alchemy.level>9';
logs.P27B.tag = '⚒️';
logs.P27B.category = "A2";

logs.P27C = {}
logs.P27C.name = "Apprentice Engineer";
logs.P27C.description = "Reach Level 10 In Engineering";
logs.P27C.hint = '"Create a leg."';
logs.P27C.logic = 'jobs.engineering.level>9';
logs.P27C.tag = '⚒️';
logs.P27C.category = "A2";

logs.P29 = {}
logs.P29.name = "Vive la Révolution";
logs.P29.description = "Craft 100 Items";
logs.P29.hint = '"Really putting the \'Craft\' in TurtleCraft."';
logs.P29.logic = 'stats.craftedItems>99';
logs.P29.category = "A2";
logs.P29.tag = '⚒️';

logs.P29A = {}
logs.P29A.name = "Satisfying Factory";
logs.P29A.description = "Craft 1000 Items";
logs.P29A.hint = '"The factory must grow."';
logs.P29A.logic = 'stats.craftedItems>999';
logs.P29A.category = "A2";
logs.P29A.tag = '⚒️';


stats.mysteryPresentsOpenedLog = 0

logs.P31 = {}
logs.P31.name = "Who Left All These Here?";
logs.P31.description = "Open 10 Mysterious Presents";
logs.P31.hint = '"Thank you, kind stranger."';
logs.P31.logic = 'stats.mysteryPresentsOpenedLog>9';
logs.P31.tag = '🎁';
logs.P31.category = "A2";
logs.P31.repeatable = true;
logs.P31.repeatableClick = function() {return stats.mysteryPresentsOpenedLog -= 10};
logs.P31.progressDescription = function() { return `${beautify(stats.mysteryPresentsOpenedLog )}/10` };

logs.P31B = {}
logs.P31B.name = "Happy Hanukkah";
logs.P31B.description = "Open 55 Mysterious Presents";
logs.P31B.hint = '"Hanukkah Matata as they say."';
logs.P31B.logic = 'stats.mysteryPresentsOpened>49';
logs.P31B.tag = '🎁';
logs.P31B.category = "A2";

logs.P33 = {}
logs.P33.name = "Mysterious Benefactor";
logs.P33.description = "Open 105 Mysterious Presents";
logs.P33.hint = '"I don\'t care who it was, they are now mine."';
logs.P33.logic = 'stats.mysteryPresentsOpened>99';
logs.P33.tag = '🎁';
logs.P33.category = "A2";

logs.P32 = {}
logs.P32.name = "Lucky Streak";
logs.P32.description = "Open All Presents In The Mysterious Present Minigame";
logs.P32.hint = '"Gacha? Gacha? Gacha!"';
logs.P32.tag = '🎁';
logs.P32.category = "A2";

logs.P38 = {}
logs.P38.name = "Take a Break";
logs.P38.description = "Defeat King-Kat";
logs.P38.hint = '"You must defeat tortuga to stand a chance."';
logs.P38.logic = 'enemies.E8.killCount>0';
logs.P38.tag = '🐯';
logs.P38.category = "A2";

logs.P47B = {} 
logs.P47B.name = "Monster Foster";
logs.P47B.description = "Reach Bestiary Score 10";
logs.P47B.hint = '"I feel so... Informed."';
logs.P47B.logic = 'bestiaryScore>9';
logs.P47B.tag = '📒'; 
logs.P47B.category = "A2";

logs.P47C = {} 
logs.P47C.name = "Monster Obsession";
logs.P47C.description = "Reach Bestiary Score 20";
logs.P47C.hint = '"Gotta study them all."';
logs.P47C.logic = 'bestiaryScore>19';
logs.P47C.tag = '📒';
logs.P47C.category = "A2";

logs.P47D = {} 
logs.P47D.name = "Monster Degree";
logs.P47D.description = "Reach Bestiary Score 30";
logs.P47D.hint = '"I could tell you a thing or two..."';
logs.P47D.logic = 'bestiaryScore>29';
logs.P47D.tag = '📒';
logs.P47D.category = "A2";



logs.PCARD = {} 
logs.PCARD.name = "Card Collector Tortuga";
logs.PCARD.description = "Collect 5 Monster Cards In The Bestiary";
logs.PCARD.hint = '"These monsters ain\'t quite pocket."';
logs.PCARD.logic = 'stats.monsterCardsObtainedLog>4';
logs.PCARD.tag = '🎴';
logs.PCARD.category = "A2";
logs.PCARD.repeatable = true;
logs.PCARD.repeatableClick = function() {return stats.monsterCardsObtainedLog -= 5};
logs.PCARD.progressDescription = function() { return `${beautify(stats.monsterCardsObtainedLog )}/5` };

logs.PCARD2 = {} 
logs.PCARD2.name = "Monster Blackjack";
logs.PCARD2.description = "Collect 21 Monster Cards In The Bestiary";
logs.PCARD2.hint = '"No folding now."';
logs.PCARD2.logic = 'stats.monsterCardsObtained>20';
logs.PCARD2.tag = '🎴';
logs.PCARD2.category = "A2";

logs.PLOTTO = {} 
logs.PLOTTO.name = "Lucky Numbers";
logs.PLOTTO.description = "Win The Third Price At The Lottery";
logs.PLOTTO.hint = '"My lucky numbers are... Not these apparently."';
logs.PLOTTO.tag = '🎰';
logs.PLOTTO.category = "A2";

logs.PLOTTO2 = {} 
logs.PLOTTO2.name = "Luckier Numbers";
logs.PLOTTO2.description = "Win The Second Price At The Lottery";
logs.PLOTTO2.hint = '"Be glad there is not a third achievement."';
logs.PLOTTO2.tag = '🎰';
logs.PLOTTO2.category = "A2";

logs.PDRUNK = {} 
logs.PDRUNK.name = "Celebratory Toast";
logs.PDRUNK.description = "Get A Bit Tipsy";
logs.PDRUNK.hint = '"Where are my glasses?"';
logs.PDRUNK.tag = '🍶';
logs.PDRUNK.category = "A2";
logs.PDRUNK.logic = 'buffs.Tipsy.stacks>2';

stats.socketedGems = 0

logs.PGEM = {} 
logs.PGEM.name = "Bejeweled";
logs.PGEM.description = "Socket 1 Gemstone In A Weapon";
logs.PGEM.hint = '"The shinier the mightier."';
logs.PGEM.tag = '💎';
logs.PGEM.category = "A2";
logs.PGEM.logic = 'stats.socketedGems>0';

logs.PGEM2 = {} 
logs.PGEM2.name = "My Precious Power Gem";
logs.PGEM2.description = "Socket 50 Gemstones In A Weapon";
logs.PGEM2.hint = '"Gone forever, 👹."';
logs.PGEM2.tag = '💎';
logs.PGEM2.category = "A2";
logs.PGEM2.logic = 'stats.socketedGems>49';

logs.P35A = {}
logs.P35A.name = "Ultrakill";
logs.P35A.description = "Deal 10K Damage in one hit";
logs.P35A.hint = '"You make even the DEVIL CRY!"';
logs.P35A.logic = '';
logs.P35A.tag = '⚔️';
logs.P35A.category = "A2";

logs.B3 = {}
logs.B3.name = "Local Fauna Relocation";
logs.B3.description = "Defeat an Area Boss 150 Times";
logs.B3.hint = '"Relocated to the void, that is."';
logs.B3.logic = 'stats.areaBossKills>149';
logs.B3.tag = '💀';
logs.B3.category = "A2";

logs.L1P18A = {}
logs.L1P18A.name = "Or Maybe Not?";
logs.L1P18A.description = "Play for 100 hours";
logs.L1P18A.hint = '"But the new update..."';
logs.L1P18A.logic = 'stats.activeSeconds>360000';
logs.L1P18A.tag = '⌛';
logs.L1P18A.category = "A2";

logs.J3 = {}
logs.J3.name = "99 Turtballons";
logs.J3.description = "Click on 99 Jester Turtles";
logs.J3.hint = '"ZOMG INCOMING!"';
logs.J3.logic = 'stats.jesterTurtleClicks>98';
logs.J3.tag = '🎈';
logs.J3.category = "A2";

logs.P45 = {}
logs.P45.name = "Officework";
logs.P45.description = "Use 50 Stampers";
logs.P45.hint = '"This is not the adventure I signed for."';
logs.P45.logic = 'stats.stampsUsedLog>49';
logs.P45.tag = '🗳️';
logs.P45.category = "A2";
logs.P45.repeatable = true;
logs.P45.repeatableClick = function() {return stats.stampsUsedLog  -= 50};
logs.P45.progressDescription = function() { return `${beautify(stats.stampsUsedLog )}/49` };


/*




logs.L1P13B = {}
logs.L1P13B.name = "The Last Frontier";
logs.L1P13B.description = "Reach level 50";
logs.L1P13B.hint = '"And its not Space"';
logs.L1P13B.logic = 'rpgClass[stats.currentClass].level>49';
logs.L1P13B.tag = '⚜️';

logs.L1P13D = {}
logs.L1P13D.name = "Transcendence";
logs.L1P13D.description = "Reach level 60";
logs.L1P13D.hint = '"Thats what comes after ascendence."';
logs.L1P13D.logic = 'rpgClass[stats.currentClass].level>59';
logs.L1P13D.tag = '⚜️';


logs.L1P22 = {}
logs.L1P22.name = "Once in a Blue Moon";
logs.L1P22.description = "Obseve a Blue Moon";
logs.L1P22.hint = '"Literally speaking, that is."';
logs.L1P22.logic = 'stats.currentWeather==="bluemoon"';
logs.L1P22.tag = '🌙';

logs.L1P22A = {}
logs.L1P22A.name = "Strong Guts";
logs.L1P22A.description = "Survive With 1% HP Left in a Boss Fight";
logs.L1P22A.hint = '"Threading in between life and death."';
logs.L1P22A.logic = '';
logs.L1P22A.tag = '⚔️';

logs.P22B = {}
logs.P22B.name = "Meat Beater";
logs.P22B.description = "Touch slimy meat a bunch of times";
logs.P22B.hint = '"Squish Splosh Splooch."';
logs.P22B.logic = 'meatBeat>20';
logs.P22B.tag = 'upper';
logs.P22B.tag = '🥩';

logs.P23 = {}
logs.P23.name = "Pay 2 Win";
logs.P23.description = "Buy this book out of a store";
logs.P23.hint = '"It just doesn\'t feel morally right, right?"';
logs.P23.tag = 'upper';
logs.P23.tag = '🛒';

logs.P24 = {}
logs.P24.name = "Nothing Like The Present";
logs.P24.description = "Receive a present from your turtle";
logs.P24.hint = '"Repaying just a bit of all your kindness."';
logs.P24.logic = 'stats.recievedPresents>0';
logs.P24.tag = 'upper';
logs.P24.tag = '🎁';

logs.P25 = {}
logs.P25.name = "Grateful Representation";
logs.P25.description = "Receive 15 presents from your turtle";
logs.P25.hint = '"It seems she took a liking to you."';
logs.P25.logic = 'stats.recievedPresents>14';
logs.P25.tag = 'upper';
logs.P25.tag = '🎁';

logs.P26 = {}
logs.P26.name = "Unpresented Betrayal";
logs.P26.description = "Sell a present from your turtle";
logs.P26.hint = '"Totally uncool, dude."';
logs.P26.logic = '';
logs.P26.tag = 'upper';
logs.P26.tag = '🎁';


logs.P31A = {}
logs.P31A.name = "Christmas Is Cancelled";
logs.P31A.description = "Destroy 10 Mysterious Presents";
logs.P31A.hint = '"If I can\'t get them, no one will."';
logs.P31A.insight = 5;
logs.P31A.logic = 'enemies.E15.killCount>9';
logs.P31A.tag = '🎁';




logs.P39 = {}
logs.P39.name = "Big Dreams";
logs.P39.description = "Smack King-Kat with a giant fish";
logs.P39.hint = '"Give the cat what he wants."';
logs.P39.tag = '🐯';

logs.P40 = {}
logs.P40.name = "Heroes Never Die!";
logs.P40.description = "Perish 10 times";
logs.P40.hint = '"We still need you."';
logs.P40.logic = 'stats.timesDied>9';
logs.P40.tag = '⚰️';

logs.P41 = {}
logs.P41.name = "Pawn Star";
logs.P41.description = "Sell 10K items.";
logs.P41.hint = '"Best I can do is 200 Coins."';
logs.P41.logic = 'stats.soldItems>9999';
logs.P41.tag = '📈';

logs.P41A = {}
logs.P41A.name = "Gang Star";
logs.P41A.description = "Sell 100K items.";
logs.P41A.hint = '"Step 3: Profit."';
logs.P41A.logic = 'stats.soldItems>99999';
logs.P41A.tag = '📈';

logs.P44 = {}
logs.P44.name = "It All Returns to Nothing";
logs.P44.description = "Witness a World-Ending Event";
logs.P44.hint = '"It all comes tumbling down, tumbling down, tumbling down..."';
logs.P44.logic = 'stats.currentWeather==="vortex"';
logs.P44.tag = '🌀';



logs.P45A = {}
logs.P45A.name = "Turtle Champion";
logs.P45A.description = "Obtain a Gold Medal in the Monster Arena";
logs.P45A.hint = '"The turtle remains undefeated."';
logs.P45A.logic = 'goldenMedalsGot>0';
logs.P45A.tag = '🥇';

logs.P45C = {}
logs.P45C.name = "World Record Any%";
logs.P45C.description = "Obtain a Last Time of 0 Seconds in a Showdown";
logs.P45C.hint = '"(Unbeatable)"';
logs.P45C.logic = 'showdown.S1.bestTime===0 || showdown.S2.bestTime===0';
logs.P45C.tag = '🥇';

logs.P45B = {}
logs.P45B.name = "Awww Man";
logs.P45B.description = "Die from a Cubomite Explosion";
logs.P45B.hint = '"Should have brought a cat."';
logs.P45B.logic = 'rpgPlayer.alive===false && stats.currentEnemy === "E10"';
logs.P45B.tag = '🧨';

logs.P45D = {}
logs.P45D.name = "Sweet Revenge";
logs.P45D.description = "Ignite 100 Cubomites";
logs.P45D.hint = '"I love the smell of gunpowder in the morning."';
logs.P45D.logic = 'stats.ignitedCubomites>99';
logs.P45D.tag = '🧨';

logs.P46 = {}
logs.P46.name = "Break a Drake";
logs.P46.description = "Defeat Terragosa";
logs.P46.hint = '"Shattering your expectations."';
logs.P46.logic = 'enemies.E12.killCount>0';
logs.P46.tag = '🐲';

logs.P46A = {}
logs.P46A.name = "Cry about it";
logs.P46A.description = "Achieve 150 stacks of Prismatic Shield";
logs.P46A.hint = '"What are you going to do? Call the rock police?"';
logs.P46A.tag = '🐲';

logs.P47 = {} 
logs.P47.name = "Encased Forever";
logs.P47.description = "Collect 10 Collectibles";
logs.P47.hint = '"Go show it to an owl or something."';
logs.P47.logic = 'collectiblesGot>9';
logs.P47.tag = '💎';

logs.P47A = {} 
logs.P47A.name = "A fine collection";
logs.P47A.description = "Collect 50 Collectibles";
logs.P47A.hint = '"Gunther would like to have a word with you."';
logs.P47A.logic = 'collectiblesGot>49';
logs.P47A.tag = '💎';

logs.P47AA = {} 
logs.P47AA.name = "Collectathon";
logs.P47AA.description = "Collect 100 Collectibles";
logs.P47AA.hint = '"At least you dont have to deal with space mafia."';
logs.P47AA.logic = 'collectiblesGot>99';
logs.P47AA.tag = '💎';




logs.P47E = {} 
logs.P47E.name = "Monster University";
logs.P47E.description = "Complete a Whole Lot of Entries of the Bestiary";
logs.P47E.hint = '"or three, or four..."';
logs.P47E.logic = '(unlocks.bestiary && bestiaryPointEntry + bestiaryPointBronze + medalsGot)>100';
logs.P47E.tag = '📒';

logs.P47F = {} 
logs.P47F.name = "Monster Inc";
logs.P47F.description = "Complete quite the amount of Entries of the Bestiary";
logs.P47F.hint = '"Scary feet, Scary feet, Scary feet."';
logs.P47F.logic = '(unlocks.bestiary && bestiaryPointEntry + bestiaryPointBronze + medalsGot)>120';
logs.P47F.tag = '📒';

logs.P48 = {}
logs.P48.name = "Stop Right There";
logs.P48.description = "Steal 100 Times";
logs.P48.hint = '"You criminal scum."';
logs.P48.logic = 'stats.timesStolen>99';
logs.P48.tag = '🎭';

logs.P49 = {}
logs.P49.name = "Phantom Thief";
logs.P49.description = "Steal 1000 Times.";
logs.P49.hint = '"The tortuga always had my heart anyways"';
logs.P49.logic = 'stats.timesStolen>999';
logs.P49.tag = '🎭';

logs.P50 = {}
logs.P50.name = "Red Herring";
logs.P50.description = "Amass 1000 Fishing Junk";
logs.P50.hint = '"It wasnt such a special catch after all..."';
logs.P50.logic = '(items.I158.count + items.I89.count + items.I88.count )>999';
logs.P50.tag = '🎣';

logs.P51 = {}
logs.P51.name = "Big Game";
logs.P51.description = "Fish a Rare Catch";
logs.P51.hint = '"This one is going to the wall."';
logs.P51.logic = 'items.I169.count>0 || items.I117.count>0';
logs.P51.tag = '🎣';

logs.P52 = {}
logs.P52.name = "Blast Fishing";
logs.P52.description = "Throw a Dynamite to a Pond";
logs.P52.hint = '"It was worth a try."';
logs.P52.logic = '';
logs.P52.tag = '🧨';

logs.P52A = {}
logs.P52A.name = "Et tu, Bunnytus?";
logs.P52A.description = "Throw an Incendiary Bunny into a Jabbit";
logs.P52A.hint = '"I\'m you but stronger."';
logs.P52A.logic = '';
logs.P52A.tag = '🐇';

logs.P53 = {}
logs.P53.name = "Turtle Spelunky";
logs.P53.description = "Clear the Penguin Glacier";
logs.P53.hint = '"And without angering the shopkeeper."';
logs.P53.logic = 'enemies.E23.killCount>0';
logs.P53.tag = '🐧';

logs.P53D = {}
logs.P53D.name = "Party Killer";
logs.P53D.description = "Clear the Pirate Galleon";
logs.P53D.hint = '"Drinks are on me."';
logs.P53D.logic = 'enemies.E26.killCount>0';
logs.P53D.tag = '🏴‍☠️';

logs.P53B = {}
logs.P53B.name = "New Religion Dropped";
logs.P53B.description = "Clear the Temple of Dusk";
logs.P53B.hint = '"Bow before your new overlord."';
logs.P53B.logic = 'enemies.E49.killCount>0';
logs.P53B.tag = '🌙';

logs.P53C = {}
logs.P53C.name = "False Idol";
logs.P53C.description = "Clear the Temple of Dawn";
logs.P53C.hint = '"Not so bright after all."';
logs.P53C.logic = 'enemies.E53.killCount>0';
logs.P53C.tag = '☀️';

logs.P53A = {}
logs.P53A.name = "Tuxedo Friends";
logs.P53A.description = "Pat the Penguin Helper";
logs.P53A.hint = '"Thank you for your service."';
logs.P53A.logic = '';
logs.P53A.tag = '🐧';

logs.P54 = {}
logs.P54.name = "Containment Breach";
logs.P54.description = "Encounter La Creatura"
logs.P54.hint = '"It escaped."';
logs.P54.logic = '';
logs.P54.tag = '❓';

logs.P55 = {}
logs.P55.name = "God of Hell Fire";
logs.P55.description = "Defeat Infernalus";
logs.P55.hint = '"I\'ll take you to burn."';
logs.P55.logic = 'enemies.E27.killCount>0';
logs.P55.tag = '🔥';

logs.P56 = {}
logs.P56.name = "Extinguished";
logs.P56.description = "Fight Infernalus While Raining";
logs.P56.hint = '"Bad day to be made out of fire."';
logs.P56.logic = 'stats.currentEnemy === "E27" && stats.currentWeather === "rain"';
logs.P56.tag = '🔥';

logs.P56A = {}
logs.P56A.name = "Shiny Hunting";
logs.P56A.description = "Defeat a Gilded Enemy";
logs.P56A.hint = '"No charm or anything, just skill."';
logs.P56A.logic = 'stats.gildedKilled>0';
logs.P56A.tag = '✨';

logs.P56B = {}
logs.P56B.name = "Golden Touch";
logs.P56B.description = "Defeat 50 Gilded Enemies";
logs.P56B.hint = '"Anything you want it to be, baby."';
logs.P56B.logic = 'stats.gildedKilled>49';
logs.P56B.tag = '✨';

logs.P56C = {}
logs.P56C.name = "Goliath Killer";
logs.P56C.description = "Defeat 100 Gilded Enemies";
logs.P56C.hint = '"Thats it! I\'m gettin\' me slingshot."';
logs.P56C.logic = 'stats.gildedKilled>99';
logs.P56C.tag = '✨';

logs.P57 = {}
logs.P57.name = "Jack Of All Trades";
logs.P57.description = "Unlock 3 Classes at the Same Time";
logs.P57.hint = '"Your pitiful average protagonist can only get one of these."';
logs.P57.logic = 'talent.TI0.active === true && talent.TG0.active === true && talent.TA0.active === true';
logs.P57.tag = '⚜️';

logs.P58 = {}
logs.P58.name = "The Plan";
logs.P58.description = "Research anything";
logs.P58.hint = '"It\'s work o clock."';
logs.P58.logic = 'stats.researchedBuildings>0';
logs.P58.tag = '🧱';

logs.P58E = {}
logs.P58E.name = "The Better Plan";
logs.P58E.description = "Research 10 items";
logs.P58E.hint = '"What did we learned today in class, kids?"';
logs.P58E.logic = 'stats.researchedBuildings>9';
logs.P58E.tag = '🧱';

logs.P58B = {}
logs.P58B.name = "The Ultimate Plan";
logs.P58B.description = "Research 100 items";
logs.P58B.hint = '"If it fails, its not my fault."';
logs.P58B.logic = 'stats.researchedBuildings>99';
logs.P58B.tag = '🧱';

logs.P59 = {}
logs.P59.name = "Super Turtle Grinder";
logs.P59.description = "Level Up a Building to Level 10";
logs.P59.hint = '"At least it farms itself."';
logs.P59.logic = 'buildings.B1.level>9 || buildings.B2.level>9 || buildings.B3.level>9 || buildings.B7.level>9';
logs.P59.tag = '🧱';

logs.P58A = {}
logs.P58A.name = "Salt Splash";
logs.P58A.description = "Exorcise 15 Morgatos";
logs.P58A.hint = '"Who are you going to call?"';
logs.P58A.logic = 'stats.purifiedMorgatosDefeated>14';
logs.P58A.tag = '👻';

logs.P60 = {}
logs.P60.name = "Gambling Addiction";
logs.P60.description = "Win a Coin Flip 5 Times in a Row";
logs.P60.hint = '"This coin will take me out poverty."';
logs.P60.logic = 'coinWins>4';
logs.P60.tag = '🎲';

logs.P61 = {}
logs.P61.name = "Honest Mistake";
logs.P61.description = "Throw Purifying Salt on a Caulislug";
logs.P61.hint = '"I just wanted to salt the salad..."';
logs.P61.logic = '';
logs.P61.tag = '🧂';

logs.P61A = {}
logs.P61A.name = "???";
logs.P61A.description = "Search the secret";
logs.P61A.hint = '"It\'s a secret to everybody."';
logs.P61A.logic = '';
logs.P61A.tag = '❔';

logs.P61B = {}
logs.P61B.name = "Sworn Guardian";
logs.P61B.description = "Defeat Eis Zeith";
logs.P61B.hint = '"Ultimately, he could not guard the world against you."';
logs.P61B.tag = '🐘';

logs.P62 = {}
logs.P62.name = "Community Service";
logs.P62.description = "Complete Nanny\'s Questline";
logs.P62.hint = '"I gained a powerful ally."';
logs.P62.tag = '🍪';

logs.P63 = {}
logs.P63.name = "One Less Deity to Pray";
logs.P63.description = "Defeat Raijin-Goran";
logs.P63.hint = '"One less day to church."';
logs.P63.tag = '🦖';

logs.P64 = {}
logs.P64.name = "Toxin-Free";
logs.P64.description = "Eat 50 Suspicious Mushrooms";
logs.P64.hint = '"The toxicity, of our city."';
logs.P64.logic = 'stats.mushroomsUsed>49';
logs.P64.tag = '🍄';

logs.P65 = {}
logs.P65.name = "Green Pinky";
logs.P65.description = "Harvest 100 Plants";
logs.P65.hint = '"Just a little dabble."';
logs.P65.logic = ' stats.plantsHarvested>99';
logs.P65.tag = '🌱';

logs.P66 = {}
logs.P66.name = "Green Index";
logs.P66.description = "Harvest 1000 Plants";
logs.P66.hint = '"Its not much, but its honest work."';
logs.P66.logic = ' stats.plantsHarvested>999';
logs.P66.tag = '🌱';

logs.P67 = {}
logs.P67.name = "Green Thumb";
logs.P67.description = "Harvest 10000 Plants";
logs.P67.hint = '"They are growing on my walls..."';
logs.P67.logic = ' stats.plantsHarvested>9999';
logs.P67.tag = '🌱';

logs.P68 = {}
logs.P68.name = "Technologist";
logs.P68.description = "Discover 15 unique seeds";
logs.P68.hint = '"I got a knack for this."';
logs.P68.logic = 'plantCompletionProgress>14';
logs.P68.tag = '🌿';

logs.P69 = {}
logs.P69.name = "Global Seed Bank";
logs.P69.description = "Discover 35 unique seeds";
logs.P69.hint = '"Just in case. You never know."';
logs.P69.logic = 'plantCompletionProgress>34';
logs.P69.tag = '🌿';

logs.P70 = {}
logs.P70.name = "F?tal Er?or";
logs.P70.description = "Discover a game-breaking mutation";
logs.P70.hint = '"Not really damaging, dont worry."';
logs.P70.logic = 'plants.g16.harvested>0';
logs.P70.tag = '👾';

logs.P71 = {}
logs.P71.name = "Mythical Morning";
logs.P71.description = "Obtain a Mythical item";
logs.P71.hint = '"Was it worth it? Probably not."';
logs.P71.tag = '👑';

logs.P72 = {}
logs.P72.name = "Bound by Darkness";
logs.P72.description = "Defeat Xezdeth";
logs.P72.hint = '"We must kill chaos."';
logs.P72.logic = 'enemies.E41.killCount>0';
logs.P72.tag = '⛓️';

logs.P73 = {}
logs.P73.name = "His Actual Name is Princess";
logs.P73.description = "Pet Xezdeth";
logs.P73.hint = '"Dont worry, he doesn\'t bite."';
logs.P73.tag = '⛓️';

logs.P74 = {}
logs.P74.name = "Amidst Moonlight";
logs.P74.description = "Defeat the Lady of the Lake";
logs.P74.hint = '"I am not returing any more orbs to no one."';
logs.P74.logic = 'enemies.E56.killCount>0';
logs.P74.tag = '🎣';

*/




Object.keys(logs).forEach(function(i) { logs[i].unlocked = false; logs[i].once = false; });

var totalLogs = 0;

for (var i in logs) {
  if (logs[i]) { totalLogs++; } 
  logs[i].claimed = false;


}


let achievementShop = {}

achievementShop.I1 = {
    item: new CoinPile1(),
    price: 500,
    level: 0,
    effect : function() {},
};

achievementShop.I2 = {
  item: new ChanceDie1(),
  price: 400,
  level: 0,
};

achievementShop.I3 = {
  item: new Stamp1(),
  price: 600,
  level: 0,
};

achievementShop.I4 = {
  item: new LuckyCloverRing(),
  price: 2500,
  level: 1,
};

achievementShop.I5 = {
  item: new LottoTicket(),
  price: 300,
  level: 1,
};

achievementShop.I9 = {
  item: new Area1AchievementRing(),
  price: 5000,
  level: 2,
  condition : function() { if (checkAchievementCompletion("A1")===true) return true },
  conditionText : '<span style="color:coral">❌ Complete all achievements of Cradle Hills to purchase this item</span>'
};

achievementShop.I6 = {
  item: new StarPiece(),
  price: 600,
  level: 2,
};

achievementShop.I7 = {
  item: new CraftingTools(),
  price: 850,
  level: 2,
  condition : function() { if (jobs.blacksmith.level>9 && jobs.alchemy.level>9 && jobs.engineering.level>9) return true },
  conditionText : '<span style="color:coral">❌ Reach level 10 in all crafting categories to purchase this item</span>'
};

achievementShop.I8 = {
  item: new RubberFeet(),
  price: 2000,
  level: 2,
  condition : function() { if (enemies.E14.card1.got && enemies.E14.card2.got && enemies.E14.card3.got) return true },
  conditionText : '<span style="color:coral">❌ Obtain all bestiary cards of Dayleaf Shrub to purchase this item</span>'
};

achievementShop.I10 = {
  item: new Area2AchievementRing(),
  price: 5000,
  level: 3,
  condition : function() { if (checkAchievementCompletion("A2")===true) return true },
  conditionText : '<span style="color:coral">❌ Complete all achievements of Lost Dojo to purchase this item</span>'
};

achievementShop.I11 = {
  item: new GemCaptor1(),
  price: 900,
  level: 3,
  condition : function() { if (stats.monsterCardsObtained>19) return true },
  conditionText : '<span style="color:coral">❌ Obtain 20 monster cards to purchase this item</span>'
};



rpgPlayer.shop = {}
rpgPlayer.shop.achievement = {}
rpgPlayer.shop.achievement.level = 0
rpgPlayer.shop.achievement.exp = 0


function achievementShopExpUpdate(){

  voidAnimation("achievementShopExp","areaClick 0.5s 1")


if (rpgPlayer.shop.achievement.exp>999) {
  rpgPlayer.shop.achievement.exp-=1000;
  rpgPlayer.shop.achievement.level++;
  playSound("audio/levelup.mp3","all")

  voidAnimation("achievementShopLevelBox","gelatine 0.4s ease")
  updateAchievementShop()
}

did("achievementShopLevel").innerHTML = rpgPlayer.shop.achievement.level
did("achievementShopExp").innerHTML = `${rpgPlayer.shop.achievement.exp} / 1000 🏆`

let percentage = ((rpgPlayer.shop.achievement.exp / 1000) * 100);
did('achievementShopExpBar').style.width = percentage+"%";

} 


function achievementShopSwitch(id){

  playSound("audio/button2.mp3","all")
  playSound("audio/book.mp3","all")

  if (did(id).classList.contains("dedicatedShopTabActive")) return;

did("achievementShopButton1").setAttribute("class", "dedicatedShopTab");
did("achievementShopButton2").setAttribute("class", "dedicatedShopTab");
did(id).setAttribute("class", "dedicatedShopTabActive");
voidAnimation(id,"areaClick 0.5s 1")



if (id==="achievementShopButton1"){
  did("achievementShop").style.backgroundColor = "#43171B";
  voidAnimation("achievementListing","menuSlideEnter 0.4s 1")
  voidAnimation("achievementInsideShop","menuSlideExit 0.4s 1")
  setTimeout(() => {
    did("achievementInsideShop").style.display = "none"
    did("achievementListing").style.display = "flex"
    voidAnimation("achievementListing","menuSlideEnter 0.4s 1")
  }, 350);
}

if (id==="achievementShopButton2"){
  did("achievementShop").style.backgroundColor = "#40132C";
  voidAnimation("achievementInsideShop","menuSlideEnter 0.4s 1")
  voidAnimation("achievementListing","menuSlideExit 0.4s 1")
  setTimeout(() => {
    did("achievementListing").style.display = "none"
    did("achievementInsideShop").style.display = "flex"
    voidAnimation("achievementInsideShop","menuSlideEnter 0.4s 1")
  }, 350);
}





//achievementInsideShop







}


function updateAchievementShop() {

    did('achievementInsideShopListing').innerHTML = ""

    for (let i in achievementShop) {
    if (!did(i+"achievementShop")) {
     
     const div = document.createElement("span");




     if (rpgPlayer.shop.achievement.level >= achievementShop[i].level) {


      if (achievementShop[i].condition && !achievementShop[i].condition()) div.style.filter = "brightness(0.5)"

      
      div.item = achievementShop[i].item; 
      div.tag = "shop"
      div.tag2 = "shopAchievement"
      div.shopID = i

      div.innerHTML = `<img src="img/src/items/I${achievementShop[i].item.img}.jpg" style="outline: 3px solid ${returnQualityColor(achievementShop[i].item.quality)}">`


     } else  div.innerHTML = `<div class="dedicatedShopLevelTag"><span>${achievementShop[i].level}</span></div><img src="img/src/icons/pageLocked.jpg" style="outline: 3px solid ${returnQualityColor(achievementShop[i].item.quality)}">`







     did('achievementInsideShopListing').appendChild(div);

     
     
 
     
   
 
 
 
 
     
     
    }
        
 


    }    
 }












//#region Trackers
var logTrackClickDuck = false;
var logTrackClickDiscord = false;
var logTrackTier = false;
var playerInsight = 0;
//#endregion

document.addEventListener("click", function(event) { if (event.target && event.target.closest("#P30log")) { logs.P30.unlocked = true; logCheck() } });


document.addEventListener("click", function(event) {
  if (event.target && event.target.id && event.target.id.endsWith("log") && rpgPlayer.debug) {
      logs[event.target.id.replace("log", "")].unlocked=true
      logCheck()
  }
});

document.addEventListener("click", function(event) {
  // Asegúrate de que el elemento clicado es una imagen
  if (event.target.tagName === 'IMG') {
    // Compara el atributo src del elemento clicado
    if (event.target.src.includes('img/src/enemies/E41.png')) {
      logs.P73.unlocked = true;
      logCheck();
      animState(stats.currentEnemy+"enemy", "gelatine 0.3s 1");


    }
  }
});



function calculateInsight(){

  let insightFromLogs = 0

  for (let i in logs) {  if (logs[i].unlocked) insightFromLogs += 10  }

playerInsight = insightFromLogs

}

function createLog() {
   for (let i in logs) {
   if (!did(i+"log")) {
    
    const div = document.createElement("span");
    div.innerHTML = '<span id="'+i+'tag"></span><img src="img/src/icons/pageLocked.jpg" >'
    if (logs[i].repeatable) div.innerHTML = '<div class="itemLock" style="font-size:1.5rem; top:-20%;right:-20%">🔄</div><span id="'+i+'tag"></span><img src="img/src/icons/pageLocked.jpg" >'
    
    div.getElementsByTagName("img")[0].id = i+"log";

    did('achievementListing'+logs[i].category).appendChild(div);

    div.src = "img/src/icons/pageLocked.jpg";   
    div.id = i+"logBlock";   

    

    div.addEventListener("click", function () {
      if (GoldenGlass.count>0 && !logs[i].revealed && !logs[i].unlocked) {
        playSound("audio/talent.mp3","all");
        div.style.animation = "";
        void div.offsetWidth;
        div.style.animation = "gelatineHigh 0.3s 1, flashNoScale 0.5s 1";
        setTimeout(() => {
          particleTrackers.push(new ParticleSellPulse(mousePositionX, mousePositionY, {x:mousePositionX,y:mousePositionY}));
        }, 10);
        GoldenGlass.count--;
        logs[i].revealed = true;
        let logName = `<span style="display:flex;align-items:center;white-space: nowrap; font-size:1.4rem">🏆 ${logs[i].name}&nbsp;&nbsp;<div class="separator"></div></span>`
        did("tooltipDescription").innerHTML = logName+logs[i].description;
        updateInventory()
      


      }
    });

    div.addEventListener("click", function () {
      if (logs[i].unlocked && !logs[i].claimed) {
        logs[i].claimed = true
        did(i+"logBlock").style.animation = "none";
        createLog()

        let itemDiv = div

        selectedItemRect = itemDiv.getBoundingClientRect();

        playSound("audio/retro2.mp3","all")
        playSound("audio/button5.mp3","all")

        



        itemDiv.style.animation = "";
        void itemDiv.offsetWidth;
        itemDiv.style.animation = "gelatineHigh 0.3s 1, flashNoScale 0.5s 1";
        particleTrackers.push(new ParticleSellPulse(mousePositionX, mousePositionY));
        particleTrackers.push(new ParticlePrismScute(mousePositionX, mousePositionY));
        particleTrackers.push(new ParticlePrismScute(mousePositionX, mousePositionY));
        particleTrackers.push(new ParticlePrismScute(mousePositionX, mousePositionY));
        particleTrackers.push(new ParticlePrismScute(mousePositionX, mousePositionY));

        if (logs[i].onceEver!==true){
          voidAnimation("prismCounter","areaClick 0.5s 1 ease")
          rpgPlayer.scutes+=300;
          stats.totalScutes += 300
          updateCounters()
          resetTooltip()
          rpgPlayer.shop.achievement.exp+=50
          achievementShopExpUpdate()
          createPopup(`<span style="color:cyan; display:flex; justify-content:center; align-items:center;background:transparent;"><img src="img/src/icons/scutes.jpg" style="height:1.3rem; width:1.3rem;margin-right:0.6rem;border-radius:0.2rem">Prism Scute x300 <span style="color:lawngreen;background:transparent; margin-left:0.3rem">got! </span></span>`)


        } 

        
        if (logs[i].repeatableClick!==undefined) {

          logs[i].repeatableClick()
          logCheck()
          rpgPlayer.scutes+=100;
          stats.totalScutes += 100
          updateCounters()
          resetTooltip()
          logs[i].once = false
          createPopup(`<span style="color:cyan; display:flex; justify-content:center; align-items:center;background:transparent;"><img src="img/src/icons/scutes.jpg" style="height:1.3rem; width:1.3rem;margin-right:0.6rem;border-radius:0.2rem">Prism Scute x100 <span style="color:lawngreen;background:transparent; margin-left:0.3rem">got! </span></span>`)

        } 

        logs[i].onceEver = true



      }
    });




  




    //tooltip here
    //areaButton(areas[a]);
    tooltipLog(i);   
   }
       
   if (logs[i].unlocked) {
    did(i+"log").src = "img/src/icons/pageCompleted.jpg";
    did(i+"log").style.outline = "solid #db991f 0.15rem";
    calculateInsight();
    did(i+"tag").innerHTML = logs[i].tag
  }   


  if (logs[i].unlocked && !logs[i].claimed) {
    did(i+"logBlock").style.animation = "claimableAchievement 2s infinite linear";
  }   



   }    
}


function tooltipLog(i) {
    if (did(i+"log")) {
    did(i+"log").addEventListener('mouseenter', function (event) { //on mouseenter
    did(i+"log").style.animation = "none";
    playSound("audio/page.mp3")
    did('tooltip').style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipPrice").innerHTML = '';

    let logName = `<span style="display:flex;align-items:center;white-space: nowrap; font-size:1.4rem">🏆 ${logs[i].name}&nbsp;&nbsp;<div class="separator"></div></span>`


    let claimdesc = ""
    if (!logs[i].claimed) claimdesc = `<span style="animation:colorRainbow 8s infinite; font-size:1.1rem"><br>🌟Click to claim the reward!</span>`

 
    let progressdesc = ""
    if (logs[i].progressDescription!==undefined) progressdesc = `<br>🔁 This achievement can be repeated<br>💡 Achievement progress: ${logs[i].progressDescription()}`
    
    if (logs[i].unlocked){
    did("tooltipRarity").textContent = 'Completed Book';
    did("tooltipRarity").style.color = "white";      
    did("tooltipName").style.color = "white";     
    did("tooltipDescription").innerHTML = `${logName}<span style="color:#89DCCC; font-size:1.1rem">✦ ${logs[i].description}</span>${claimdesc}${progressdesc}`;
    did('tooltipImage').src = "img/src/icons/pageCompleted.jpg";
        
    } else {
    did("tooltipRarity").textContent = 'Missing Book';
    did("tooltipRarity").style.color = "gray";
    did("tooltipName").style.color = "gray";
    did("tooltipDescription").innerHTML = logName+`<span style="color:gray">Locked Achievement</span>`;
    if (GoldenGlass.count>0) did("tooltipDescription").innerHTML += bestiaryTag(colorTag("Click to use a Golden Magnifying Glass", "#966c38"), "transparent");
    if (logs[i].revealed) did("tooltipDescription").innerHTML = logName+logs[i].description;
    did('tooltipImage').src = "img/src/icons/pageLocked.jpg";     
    }
        
    did("tooltipFlavor").innerHTML = logs[i].hint;
    did("tooltipArrowUp").style.display = 'flex';
    did("tooltipArrow").style.display = 'none';







    const hoveredElement = event.target;
    const elementRect = hoveredElement.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const seventyPercentWidth = windowWidth * 0.5;


  var movingDiv = did("tooltip");
  var referenceDiv = did(i+"log");
  var referenceRect = referenceDiv.getBoundingClientRect();
  
    if (elementRect.left < seventyPercentWidth) {


 
    var newLeft = referenceRect.left/(stats.zoomLevel/100);
    var newTop = referenceRect.top/(stats.zoomLevel/100) - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft - 8+ "px";
    movingDiv.style.top = newTop - 20+ "px";

    } else {


      const referenceLeft = referenceRect.left + 8;
      const referenceTop = referenceRect.top - 13;
      const newLeft = referenceLeft/(stats.zoomLevel/100) + referenceRect.width - movingDiv.offsetWidth;
      const newTop = referenceTop/(stats.zoomLevel/100)  - movingDiv.offsetHeight;
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";



    }


    
        
  });
    did(i+"log").addEventListener('mouseleave', function () {
    resetTooltip();
    });
  }
}


setInterval(logCheck, 3000);
function logCheck() {
    //if (unlocks.journal){
        
      for (i in logs) {

        if (   ( !logs[i].unlocked && "logic" in logs[i]) || (logs[i].repeatable && "logic" in logs[i] )   ) {
          if (eval(logs[i].logic)) {
            logs[i].unlocked=true;
            if (logs[i].repeatable) {
              logs[i].claimed = false;
              createLog()
            }
          }
        }

        if (logs[i].unlocked && !logs[i].once && !logs[i].claimed) { //plays only once ever
          stats.logsGotLog++
          stats.logsGot++;
          logs[i].once = true;
          createPopup('<img src="img/src/icons/achievementGotIcon.png"> Achievement Got!<br>'+logs[i].name)
          particleTrackers.push(new ParticleFirework());
          playSound("audio/achievement.mp3","all");
          did("achievementShopWidget").style.animation = "widgetAlert 2s infinite"
          createLog();
          did(i+"log").style.animation = "logUnlock infinite 1s";
          statsUpdate()
          updateStatsUI()
        }

      }
    //}

    //they have new names
    did('logHeaderBooks').innerHTML = 'Books Collected :<strong style="background:#4c5673">' + stats.logsGot+'/'+totalLogs +'</strong> <strong style="background:orange">['+Math.round(stats.logsGot/totalLogs*100)+'%]</strong>';
    did('logHeaderInsight').innerHTML = 'Archive Mastery: <strong style="background: #6eb1b8;">' + stats.logsGot*5+'</strong><img src="img/src/icons/insight.png">';
    
}

function unlockAllLogs(){
  for (var i in logs) { logs[i].unlocked = true }
}


document.addEventListener('DOMContentLoaded', logInitialization);

function logInitialization(){
    createLog();
    logCheck();
    bestiaryEntry("E1")
    achievementShopExpUpdate();
    updateAchievementShop()
}