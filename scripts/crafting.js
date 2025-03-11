const craftingRecipes = {}



craftingRecipes.CopperworkAxe = {
    category: `SA`,
    item: {CopperworkAxe:1},
    reagents: {ScrapMaterial1:10,ScrapMaterial2:1,CopperOre:10},
    time: 2.5*60,
    level: 1,
    exp: 15,
}

craftingRecipes.CopperShield = {
    category: `SA`,
    item: {CopperShield:1},
    reagents: {ScrapMaterial1:10,ScrapMaterial2:1,CopperOre:5},
    time: 60*2,
    level: 7,
    exp: 15,
}

craftingRecipes.ShurikenFan = {
    category: `SA`,
    item: {ShurikenFan:1},
    reagents: {ScrapMaterial1:10,ScrapMaterial2:1,CopperOre:5},
    time: 60*2,
    level: 8,
    exp: 20,
    locked: true,
}

craftingRecipes.KingKatDecapitator = {
    category: `SA`,
    item: {KingKatDecapitator:1},
    reagents: {StripedPelt:2,CopperOre:10},
    time: 2.5*60,
    level: 9,
    exp: 30,
    locked: true,
}

craftingRecipes.ExplorerHead = {
    category: `SG`,
    item: {ExplorerHead:1},
    reagents: {ScrapMaterial1:10,CopperOre:5},
    time: 2*60,
    level: 1,
    exp: 15,
}

craftingRecipes.ExplorerChest = {
    category: `SG`,
    item: {ExplorerChest:1},
    reagents: {ScrapMaterial1:10,CopperOre:5},
    time: 2*60,
    level: 2,
    exp: 15,
}

craftingRecipes.ExplorerLegs = {
    category: `SG`,
    item: {ExplorerLegs:1},
    reagents: {ScrapMaterial1:10,CopperOre:5},
    time: 2*60,
    level: 3,
    exp: 15,
}

craftingRecipes.ExplorerFeet = {
    category: `SG`,
    item: {ExplorerFeet:1},
    reagents: {ScrapMaterial1:10,CopperOre:5},
    time: 2*60,
    level: 4,
    exp: 15,
}



///

craftingRecipes.TigerHead = {
    category: `SG`,
    item: {TigerHead:1},
    reagents: {StripedPelt:1,CopperOre:5},
    time: 2*60,
    level: 7,
    exp: 25,
}

craftingRecipes.TigerChest = {
    category: `SG`,
    item: {TigerChest:1},
    reagents: {StripedPelt:1,CopperOre:5},
    time: 2*60,
    level: 7,
    exp: 25,
}

craftingRecipes.TigerLegs = {
    category: `SG`,
    item: {TigerLegs:1},
    reagents: {StripedPelt:1,CopperOre:5},
    time: 2*60,
    level: 8,
    exp: 25,
}

craftingRecipes.TigerFeet = {
    category: `SG`,
    item: {TigerFeet:1},
    reagents: {StripedPelt:1,CopperOre:5},
    time: 2*60,
    level: 8,
    exp: 25,
}


craftingRecipes.Geode1Open = {
    category: `SO`,
    item: {Geode1Open:1},
    reagents: {Geode1:1},
    time: 10*60,
    level: 5,
    exp: 10,
}



craftingRecipes.HealingFlask = {
    category: `AA`,
    item: {HealingFlask:1},
    reagents: {GlassFlask:1,Dayleaf:5},
    time: 60,
    level: 1,
    exp: 5,
}


craftingRecipes.NaturalTincture = {
    category: `AT`,
    item: {NaturalTincture:1},
    reagents: {GlassFlask:1,Dayleaf:5,WhiteStinger:3},
    time: 60,
    level: 2,
    exp: 15,
}

craftingRecipes.SinisterTincture = {
    category: `AT`,
    item: {SinisterTincture:1},
    reagents: {GlassFlask:1,Dayleaf:5,SlimyResidue:3},
    time: 60,
    level: 3,
    exp: 15,
}

craftingRecipes.ElementalTincture = {
    category: `AT`,
    item: {ElementalTincture:2},
    reagents: {GlassFlask:2,Dayleaf:10,TinyLifeMote:1},
    time: 60,
    level: 4,
    exp: 15,
}

craftingRecipes.LuckyTincture = {
    category: `AT`,
    item: {LuckyTincture:1},
    reagents: {GlassFlask:1,Dayleaf:5,StarPiece:1},
    time: 60,
    level: 9,
    exp: 15,
    locked: true,
}



/*
craftingRecipes.NatureFlask = {
    category: `AA`,
    item: {NatureFlask:1},
    reagents: {GlassFlask:1,AlchemicalDust:5,WhiteStinger:5},
    time: 1,
    level: 1,
    exp: 30,
}

craftingRecipes.ElementalFlask = {
    category: `AA`,
    item: {ElementalFlask:1},
    reagents: {GlassFlask:1,AlchemicalDust:5,WhiteStinger:5},
    time: 1,
    level: 1,
    exp: 30,
}

craftingRecipes.OccultFlask = {
    category: `AA`,
    item: {OccultFlask:1},
    reagents: {GlassFlask:1,AlchemicalDust:5,SlimyResidue:5},
    time: 1,
    level: 1,
    exp: 30,
}

*/


craftingRecipes.FireScroll = {
    category: `AO`,
    item: {FireScroll:1},
    reagents: {BlankParchment:1,TinyLifeMote:1},
    time: 60,
    level: 5,
    exp: 20,
}

craftingRecipes.PoisonScroll = {
    category: `AO`,
    item: {PoisonScroll:1},
    reagents: {BlankParchment:1,TinyLifeMote:1,WhiteStinger:5},
    time: 60,
    level: 8,
    exp: 20,
}

craftingRecipes.PoisonFlask = {
    category: `EA`,
    item: {PoisonFlask:1},
    reagents: {GlassFlask:1,WhiteStinger:1},
    time: 30,
    level: 3,
    exp: 15,
}

craftingRecipes.TopazRing = {
    category: `EI`,
    item: {TopazRing:1},
    reagents: {CopperOre:5,ScrapMaterial2:1,GemTopaz:1},
    time: 2*60,
    level: 7,
    exp: 30,
    locked: true,

}

craftingRecipes.NatureConverter = {
    category: `EI`,
    item: {NatureConverter:1},
    reagents: {CopperOre:5,ScrapMaterial2:1,TinyLifeMote:2,GemSapphire:1,},
    time: 60*3,
    level: 10,
    exp: 40,
    locked: true,

}

craftingRecipes.OccultConverter = {
    category: `EI`,
    item: {OccultConverter:1},
    reagents: {CopperOre:5,ScrapMaterial2:1,TinyLifeMote:2,GemSapphire:1,},
    time: 60*3,
    level: 10,
    exp: 40,
    locked: true,

}

craftingRecipes.ElementalConverter = {
    category: `EI`,
    item: {ElementalConverter:1},
    reagents: {CopperOre:5,ScrapMaterial2:1,TinyLifeMote:2,GemSapphire:1,},
    time: 60*3,
    level: 1,
    exp: 40,
    locked: true,

}

craftingRecipes.GemCritical1 = {
    category: `EG`,
    item: {GemCritical1:1},
    reagents: {GemRuby:1},
    time: 60*5,
    level: 6,
    exp: 30,
}

craftingRecipes.GemMoon1 = {
    category: `EG`,
    item: {GemMoon1:1},
    reagents: {GemSapphire:1},
    time: 60*5,
    level: 7,
    exp: 30,
}

craftingRecipes.GemScarab1 = {
    category: `EG`,
    item: {GemScarab1:1},
    reagents: {GemRuby:1,GemshellBeetle:1,},
    time: 60*5,
    level: 9,
    exp: 30,
}

craftingRecipes.GemRebound1 = {
    category: `EG`,
    item: {GemRebound1:1},
    reagents: {GemTopaz:1},
    time: 60*5,
    level: 11,
    exp: 30,
}



craftingRecipes.AreaChest1Key = {
    category: `EK`,
    item: {AreaChest1Key:1},
    reagents: {CopperOre:3,},
    time: 30,
    level: 1,
    exp: 5,
}


Object.keys(craftingRecipes).forEach(function(key) {
    craftingRecipes[key].que = 0;  
    craftingRecipes[key].timeCurrent = 0;  
  });



const bonusExpMultiplier = 1.5


function updateRecipes(){


    for (let r in craftingRecipes) {


        if (craftingRecipes[r].locked) continue

        const parent = eval(Object.keys(craftingRecipes[r].item)[0])
        const item = new parent()

        if ( did(r+"recipe") ) {did(r+"recipe").className = 'craftRecipe';}

        if (!did(r+"recipe")) {


        if (craftingRecipes[r].level >= (jobs[rpgPlayer.currentJob].level+5)) continue

         const div = document.createElement('div');
         div.id = r+"recipe";
         div.innerHTML = '<span id="'+r+'recipeLevel">'+craftingRecipes[r].level+'</span><img id="'+r+'recipeImage" src="img/src/items/I'+item.img+'.jpg"><strong id="'+r+'recipeName">?????</strong><span style="margin-left: auto; background: #603E56; color: #7ACCDE; transition:0s !important; white-space:nowrap !important" id="'+r+'craftQueue"><img id="'+r+'craftIcon" src="img/src/icons/craftOne.png">200</span>';
         did(craftingRecipes[r].category + "panel").appendChild(div);
         div.className = 'craftRecipe';


         div.addEventListener('click', function() {
            if (craftingRecipes[r].level > (jobs[rpgPlayer.currentJob].level)) return
            currentRecipe = r;
            playSound("audio/button4.mp3")
            for (let r in craftingRecipes) { if ( did(r+"recipe") ) {did(r+"recipe").className = 'craftRecipe'} }
            div.className = 'craftRecipeActive';
            recipePanel();

        });

    }

        if(craftingRecipes[r].level <= (jobs[rpgPlayer.currentJob].level)) {did(r+'recipeName').innerHTML = limitText(item.name,14); did(r+"recipeName").style.color = "white"; did(r+"recipeImage").style.display = "flex"; did(r+'craftQueue').style.display = "flex"}
        else{ did(r+'recipeName').innerHTML = '?????'; did(r+"recipeName").style.color = "gray"; did(r+"recipeLevel").style.background = "gray"; did(r+"recipeImage").style.display = "none"; did(r+'craftQueue').style.display = "none"}
   


        if (craftingRecipes[r].level <= (jobs[rpgPlayer.currentJob].level)) {
            did(r+"recipeLevel").style.background = "#FF993B"; 
            did(r+'craftQueue').style.color = "#FF993B";
            did(r+'craftQueue').innerHTML = beautify(craftingRecipes[r].exp*bonusExpMultiplier) +" XP";
    
         }
           
         if (craftingRecipes[r].level <= (jobs[rpgPlayer.currentJob].level - 5)) {
            did(r+"recipeLevel").style.background = "#6BAD51";  
            did(r+'craftQueue').style.color = "#6BAD51";
            did(r+'craftQueue').innerHTML = beautify(craftingRecipes[r].exp) +" XP";
         }
           
         if(craftingRecipes[r].level <= (jobs[rpgPlayer.currentJob].level - 10)) {
            did(r+"recipeLevel").style.background = "gray";
            did(r+"recipeName").style.color = "gray";
            did(r+'craftQueue').style.color = "gray";
            did(r+'craftQueue').innerHTML = "0 XP";
        }     


        if(craftingRecipes[r].que!==0) did(r+'craftQueue').innerHTML = '<img id="'+r+'craftIcon" src="img/src/icons/craftOne.png">'+craftingRecipes[r].que
        if(craftingRecipes[r].que>=10000) did(r+'craftQueue').innerHTML = '<img id="'+r+'craftIcon" src="img/src/icons/craftOne.png"> ∞'
   
        if (craftingRecipes[r].que!==0) {
           did(r+'craftQueue').style.color = "#7ACCDE";
        }




   
            
        

    }


}



function recipePanel(){

    if (currentRecipe==undefined) return

    const parent = eval(Object.keys(craftingRecipes[currentRecipe].item)[0])
    const item = new parent()

    did("recipePanel").style.display = "flex";
    did('recipeOutcome').innerHTML = "";
    did('recipeReagents').innerHTML = "";
    did('recipeImage').style.border = returnQualityColor(item.quality) +' solid 3px';
    did('recipeTitle').style.color= returnQualityColor(item.quality);
    did('recipeImage').src = "img/src/items/I"+item.img+".jpg";
    did('recipeTitle').innerHTML = item.name;
    did('recipeTimer').innerHTML = convertSecondsToHMS(craftingRecipes[currentRecipe].time, "mini") + " ⏱️";
    did('recipeTimer').style.color = "white"
    if (craftingRecipes[currentRecipe].que>0) {did('recipeTimer').innerHTML = convertSecondsToHMS(craftingRecipes[currentRecipe].time*craftingRecipes[currentRecipe].que-craftingRecipes[currentRecipe].timeCurrent, "mini") + " ⏱️"; did('recipeTimer').style.color = "#9ADE7A"}
    if (craftingRecipes[currentRecipe].que>=10000) did('recipeTimer').innerHTML = "♾️⏱️";

    
    let extraDescription = ""
    craftingRecipes[currentRecipe].description!==undefined ? extraDescription = "<br>"+craftingRecipes[currentRecipe].description : extraDescription = ""
    did('recipeDescription').innerHTML = `Create ${item.name} ${extraDescription}`;

    

    const arrowUp = `<svg style="background:transparent" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path fill="currentColor" fill-opacity="0" stroke-dasharray="28" stroke-dashoffset="28" d="M12 10l4 7h-8Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.7s" dur="0.5s" values="0;1"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="28;0"/></path><path d="M12 10l4 7h-8Z" opacity="0"><animate attributeName="d" begin="0.4s" dur="0.8s" keyTimes="0;0.25;1" repeatCount="indefinite" values="M12 10l4 7h-8Z;M12 4l9.25 16h-18.5Z;M12 4l9.25 16h-18.5Z"/><animate attributeName="opacity" begin="0.4s" dur="0.8s" keyTimes="0;0.1;0.75;1" repeatCount="indefinite" values="0;1;1;0"/></path></g></svg>`

    if (craftingRecipes[currentRecipe].level <= (jobs[rpgPlayer.currentJob].level)) {
        did('recipeExp').style.color = "#FF993B";
        did('recipeExp').innerHTML = beautify(craftingRecipes[currentRecipe].exp*bonusExpMultiplier) +" XP "+arrowUp;
     }
       
     if (craftingRecipes[currentRecipe].level <= (jobs[rpgPlayer.currentJob].level - 5)) {
        did('recipeExp').style.color = "#6BAD51";
        did('recipeExp').innerHTML = beautify(craftingRecipes[currentRecipe].exp) +" XP";
     }
       
     if(craftingRecipes[currentRecipe].level <= (jobs[rpgPlayer.currentJob].level - 10)) {
        did('recipeExp').style.color = "gray";
        did('recipeExp').innerHTML = "0 XP";
    }     

    addReagent()
    addOutcome()


    function addReagent(){ 
        
        for (i in craftingRecipes[currentRecipe].reagents) {
            const parent = eval(i)
            const item = new parent()

            const div = document.createElement('div');
            div.id = i + 'reagent';  
            div.innerHTML = '<img src = "img/src/items/I'+item.img+'.jpg"><div class="itemCount">'+beautify(craftingRecipes[currentRecipe].reagents[i])+'</div>';
            div.className = 'craftBookRecipeReagent';
            div.item = item
            div.tag = "crafting"
            did('recipeReagents').appendChild(div);
            div.style.outline = returnQualityColor(item.quality) +' solid 2px';
            if (item.constructor.count<craftingRecipes[currentRecipe].reagents[i]) div.style.outline = "#f54842 solid 2px"
        }
    }  




    function addOutcome(){ 
        for (i in craftingRecipes[currentRecipe].item) {

            const parent = eval(i)
            const item = new parent()

            const div = document.createElement('div');
            div.id = i + 'reagent';  
            div.innerHTML = '<img src = "img/src/items/I'+item.img+'.jpg"><div class="itemCount">'+beautify(craftingRecipes[currentRecipe].item[i])+'</div>';
            div.className = 'craftBookRecipeReagent';
            div.item = item
            div.tag = "crafting"
            did('recipeOutcome').appendChild(div);
            div.style.outline = returnQualityColor(item.quality) +' solid 2px';
        }
    } 
    
    
        did('craftBar').style.width = "0%";
        did('craftBar').style.transition = "0s all linear"
        let percentage =  ((craftingRecipes[currentRecipe].timeCurrent / (craftingRecipes[currentRecipe].time-1)) * 100);
        did('craftBar').style.width = percentage+"%";
    




        
}



let itemQueueValue = 1;


function craftButton(count){

    if (craftingQueue.value.length!==0) {itemQueueValue = craftingQueue.value} else itemQueueValue = 1;

    if (isNaN(craftingQueue.value) || craftingQueue.value < 1 || craftingQueue.value > 999) {
        itemQueueValue = 1;
    }


    for (i in craftingRecipes[currentRecipe].reagents) {
        const parent = eval(i)
        const item = new parent()
        if (!(item.constructor.count>=craftingRecipes[currentRecipe].reagents[i])) {
            createPopup('&#10060; Not Enough Resources');
            playSound("audio/close.mp3")
            return
        }
    }


voidAnimation(currentRecipe+'craftQueue','areaClick 0.3s 1')

if (craftingRecipes[currentRecipe].que>=100000) craftingRecipes[currentRecipe].que = 0
if (count === "all") craftingRecipes[currentRecipe].que = 100000
craftingRecipes[currentRecipe].que += parseInt(itemQueueValue)
playSound("audio/craft.mp3")
voidAnimation(currentRecipe+"recipe","areaClick 0.2s 1")
recipePanel()

updateRecipes()

}


did('craftButtonCancel').addEventListener('click', cancelCrafting);



function simulateCraftingTime(seconds){


    for (let r in craftingRecipes) {

        if (craftingRecipes[r].que===0) continue
        craftingRecipes[r].timeCurrent+=seconds




    }






}


function cancelCrafting() {
    playSound("audio/close.mp3")
    voidAnimation(currentRecipe+'craftQueue','areaClick 0.3s 1')

    craftingRecipes[currentRecipe].que = 0
    craftingRecipes[currentRecipe].timeCurrent = 0
    updateRecipes()

        did('craftBar').style.transition = "0s all linear"
        did('craftBar').style.width = "0%";
        recipePanel()

    
 }

 let noCraftTime = false

 setInterval(craftingProgress,1000);
 function craftingProgress(){
    for (let r in craftingRecipes) {

        if (craftingRecipes[r].que===0) {craftingRecipes[r].timeCurrent=0; continue}


        if (r === currentRecipe) did('recipeTimer').innerHTML = convertSecondsToHMS((craftingRecipes[currentRecipe].time*craftingRecipes[currentRecipe].que-craftingRecipes[currentRecipe].timeCurrent), "mini") + " ⏱️";
        if(craftingRecipes[currentRecipe]?.que>=10000) did('recipeTimer').innerHTML = "♾️⏱️";



        craftingRecipes[r].timeCurrent+=nofarmToggleBonus+statHidden.extraCraftingTime

        if (equippedOffhand?.img===593){
        equippedOffhand.uses--
        updateOffhandDurability(equippedOffhand)
        }

        if (noCraftTime) craftingRecipes[r].timeCurrent+=craftingRecipes[r].time*craftingRecipes[r].que


        if (craftingRecipes[r].timeCurrent>=craftingRecipes[r].time){ //on finish craft



            for (i in craftingRecipes[r].reagents) {//checks if the player still has materials for the recipe before proceeding
                const parent = eval(i)
                if (!(parent.count>=craftingRecipes[r].reagents[i])) { craftingRecipes[r].que = 0; craftingRecipes[r].timeCurrent = 0; updateRecipes(); recipePanel();  return }
            }


            craftingRecipes[r].que--
            for (i in craftingRecipes[r].item) { //add items



                if (currentRecipe === r){
                    did('craftBar').style.transition = "0s all linear"
                    voidAnimation('craftBookBarBox', "levelUp 1s 1")
                    did('craftBar').style.width = "0%";
                }


                const parent = eval(i)
                const item = new parent()
                spawnItem(parent, craftingRecipes[r].item[i], "container")
                stats.craftedItems++
                //console.log("itemCreated! " + item.name +"x"+craftingRecipes[r].item[i])
            }


            for (i in craftingRecipes[r].reagents) {//deduct reagents
                const parent = eval(i)
                parent.count -= craftingRecipes[r].reagents[i]

                if (!(parent.count>=craftingRecipes[r].reagents[i])) {//if next que reqs havent met
                craftingRecipes[r].que = 0
                }
            }

            
   


            const category = craftingRecipes[r].category

            let recipeJob = "blacksmith"
            if (category.startsWith("A")) recipeJob = "alchemy"
            if (category.startsWith("E")) recipeJob = "engineering"

            let expmult = 1
            if (craftingRecipes[r].level <= (jobs[recipeJob].level)) expmult = bonusExpMultiplier
            if (craftingRecipes[r].level <= (jobs[recipeJob].level) - 5) expmult = 1
            if (craftingRecipes[r].level <= (jobs[recipeJob].level) - 10) expmult = 0



            jobs[recipeJob].exp += Math.floor(craftingRecipes[r].exp*expmult);
            
            jobExp()


            craftingRecipes[r].timeCurrent -= craftingRecipes[r].time //controls overflow of crafting time, used for offline
            if (craftingRecipes[r].timeCurrent>craftingRecipes[r].time) setTimeout(() => { craftingProgress() }, 1); 
            if (craftingRecipes[r].que === 0) craftingRecipes[r].timeCurrent = 0
            updateRecipes()




            recipePanel()




        }

    }


    if (currentRecipe===undefined) return
    if (craftingRecipes[currentRecipe].timeCurrent>0){
        did('craftBar').style.transition = "1s all linear"
        let percentage =  ((craftingRecipes[currentRecipe].timeCurrent / (craftingRecipes[currentRecipe].time-1)) * 100);
        did('craftBar').style.width = percentage+"%";
    }

    


 }








document.addEventListener('DOMContentLoaded', initializationCrafting);

function initializationCrafting() {
    updateRecipes();



}