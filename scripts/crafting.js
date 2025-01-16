const craftingRecipes = {}

craftingRecipes.R1 = {
    category: `SN`,
    item: {AreaChest1:1, ExpGummy1:10},
    reagents: {UpgradeMaterial1:10, UpgradeMaterial0:20},
    time: 1,
    description: `Open up with a key`,
    level: 1,
    exp: 30,
}

craftingRecipes.R2 = {
    category: `SN`,
    item: {DungeonKey1:1, ExpGummy1:10},
    reagents: {UpgradeMaterial1:10},
    time: 5,
    description: `Open up with a key`,
    level: 1,
    exp: 52,
}

craftingRecipes.R3 = {
    category: `AN`,
    item: {ExpGummy1:10},
    reagents: {UpgradeMaterial1:10, UpgradeMaterial0:20},
    time: 4,
    description: `Open up with a key`,
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

        const parent = eval(Object.keys(craftingRecipes[r].item)[0])
        const item = new parent()

        if (!did(r+"recipe")) {


        if (craftingRecipes[r].level >= (jobs[rpgPlayer.currentJob].level+5)) continue

         const div = document.createElement('div');
         div.id = r+"recipe";
         div.innerHTML = '<span id="'+r+'recipeLevel">'+craftingRecipes[r].level+'</span><img id="'+r+'recipeImage" src="img/src/items/I'+item.img+'.jpg"><strong id="'+r+'recipeName">?????</strong><span style="margin-left: auto; background: #603E56; color: #7ACCDE; transition:0s !important;" id="'+r+'craftQueue"><img id="'+r+'craftIcon" src="img/src/icons/craftOne.png">200</span>';
         did(craftingRecipes[r].category + "panel").appendChild(div);
         div.className = 'craftRecipe';


         div.addEventListener('click', function() {
            currentRecipe = r;
            recipePanel();
        });

    }

        if(craftingRecipes[r].level <= (jobs[rpgPlayer.currentJob].level)) {did(r+'recipeName').innerHTML = limitText(item.name,14); did(r+"recipeName").style.color = "white"; did(r+"recipeImage").style.display = "flex"}
        else{ did(r+'recipeName').innerHTML = '?????'; did(r+"recipeName").style.color = "gray"; did(r+"recipeLevel").style.background = "gray"; did(r+"recipeImage").style.display = "none";}
   


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
            if (item.constructor.count<craftingRecipes[currentRecipe].item[i]) div.style.outline = "#f54842 solid 2px"
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

updateRecipes()

}


did('craftButtonCancel').addEventListener('click', cancelCrafting);


function cancelCrafting() {
    voidAnimation(currentRecipe+'craftQueue','areaClick 0.3s 1')

    craftingRecipes[currentRecipe].que = 0
    craftingRecipes[currentRecipe].timeCurrent = 0
    updateRecipes()

        did('craftBar').style.transition = "0s all linear"
        did('craftBar').style.width = "0%";
    
 }


 setInterval(craftingProgress,1000);
 function craftingProgress(){
    for (let r in craftingRecipes) {

        if (craftingRecipes[r].que===0) continue


        craftingRecipes[r].timeCurrent++
        console.log(craftingRecipes[r].timeCurrent)


        if (craftingRecipes[r].timeCurrent>=craftingRecipes[r].time){ //on finish craft

            craftingRecipes[r].que--


            for (i in craftingRecipes[r].item) { //add items



                if (currentRecipe === r){
                    did('craftBar').style.transition = "0s all linear"
                    voidAnimation('craftBookBarBox', "levelUp 1s 1")
                    did('craftBar').style.width = "0%";
                }


                const parent = eval(i)
                const item = new parent()
                spawnItem(parent, craftingRecipes[r].item[i])
                console.log("itemCreated! " + item.name +"x"+craftingRecipes[r].item[i])
            }


            for (i in craftingRecipes[r].reagents) {//deduct reagents
                const parent = eval(i)
                parent.count -= craftingRecipes[r].reagents[i]

                if (!(parent.count>=craftingRecipes[r].reagents[i])) {//if next que reqs havent met
                craftingRecipes[r].que = 0
                }
            }


            craftingRecipes[r].timeCurrent = 0
            updateRecipes()


            const category = craftingRecipes[r].category

            const recipeJob = "blacksmith"
            if (category.startsWith("A")) recipeJob = "alchemy"
            if (category.startsWith("E")) recipeJob = "engineering"

            let expmult = 1
            if (craftingRecipes[r].level <= (jobs[recipeJob].level)) expmult = bonusExpMultiplier
            if (craftingRecipes[r].level <= (jobs[recipeJob].level) - 5) expmult = 1
            if (craftingRecipes[r].level <= (jobs[recipeJob].level) - 10) expmult = 0



            jobs[recipeJob].exp += Math.floor(craftingRecipes[r].exp*expmult);
            
            jobExp()
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