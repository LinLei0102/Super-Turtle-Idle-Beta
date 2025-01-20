

let lastofflinetime = 0


function calculateInactiveTime() { //calculates idle time
    const lastVisitTime = localStorage.getItem('lastVisitTime');
    if (lastVisitTime) {
        const currentTime = new Date().getTime();
        const inactiveTime = currentTime - parseInt(lastVisitTime);
        const secondsInactive = Math.floor(inactiveTime / 1000);
        //const secondsInactive = 28800;

        lastofflinetime = secondsInactive

        if (secondsInactive > 60) {
            stats.totalSeconds += secondsInactive; 
            for (let i in cd) if (cd[i]>0) {cd[i]-=secondsInactive};

            if (offlineFarmCheck()===true){

                offlineRewards(secondsInactive);
                //if (!settings.disablePenguinRecap) { did("penguinRecap").style.display = "flex"; }
                //offlineDrops(secondsInactive/60)

            } 



            setTimeout(() => {
                if (unlocks.garden){ plantTick(secondsInactive/30) }
               }, 1000);
            

            
            
            for (let i in research) { if (research[i].status === "researching" && research[i].timer>1) research[i].timer -= secondsInactive}


            for (let i in buildings) { if (buildings[i].unlocked && buildings[i].progress<8640) {buildings[i].progress += secondsInactive/30; if (buildings[i].progress>8640) buildings[i].progress=8640}}


            for (let i in areas) {

                if ("dungeonTimer" in areas[i] && areas[i].dungeonTimer>0) {

                    areas[i].dungeonTimer -= secondsInactive;
                    if (secondsInactive >= 3600) areas[i].charges++
                    if (secondsInactive >= 7200) areas[i].charges++
                    if (areas[i].charges>3) areas[i].charges = 3;
                
                }



                if (areas[i].dungeonTimer<0) areas[i].dungeonTimer=0;
            
            }

            setTimeout(() => {
                save();
            }, 1500);
            save();
        }

        localStorage.setItem('lastVisitTime', new Date().getTime());
    }
}



function tooltipTurtleBot() {
    did('turtleBot').addEventListener('mouseenter', function () { //on mouseenter

    voidAnimation("turtleBot","gelatine 0.3s 1")
    did('tooltip').style.display = "flex";
    did("upperTooltip").style.display = 'none';
    //did('tooltip').style.width = "30vh";

    
       
    did("tooltipFlavor").textContent = '';
    did("tooltipDescription").style.textAlign = "center";




    let requirementMsg = ""
    if (offlineFarmCheck()==="boss") requirementMsg = `${colorTag("Not valid!","#F44049")}<br><span style="color:gray">Bosses and dungeons can not be offline farmed</span> `
    if (offlineFarmCheck()==="level") requirementMsg = `${colorTag("Level is too low!","#F44049")}<br><span style="color:gray">Increase your level to allow offline farming</span> `
    if (offlineFarmCheck()==="power") requirementMsg = `${colorTag("Not enough Power!","#F44049")}<br><span style="color:gray">Increase this stat to allow offline farming</span> `
    if (offlineFarmCheck()==="health") requirementMsg = `${colorTag("Not enough Max Health!","#F44049")}<br><span style="color:gray">Increase this stat to allow offline farming</span> `

    if (offlineFarmCheck()===true) requirementMsg = `<span style="color:gray">You will farm the current enemy while offline at a rate of</span><br><br><span style="font-size:1.1rem">${colorTag(  (5/Math.max(1,enemies[stats.currentEnemy].hp() / stat.Power)*(1+stat.OfflineBonus/100)).toFixed(1)+" Kills per minute", "#E68B29" )      }</span>  `



    did("tooltipDescription").innerHTML = `${bestiaryTag("⚙️ Turtlebot ⚙️", "#456E75")}<span style="color:gray">Turtlebot will farm for you while you\'re away!</span><br><br><div class="separador"></div><br><span id="turtlebotFarming">${requirementMsg}</span><br><br>`;




    const movingDiv = did('tooltip');
    const referenceDiv = did('turtleBot');
    const referenceRect = referenceDiv.getBoundingClientRect();
    const tooltipWidth = movingDiv.offsetWidth;
    
    const newLeft = referenceRect.left/(stats.zoomLevel/100) + referenceRect.width / 2 - tooltipWidth / 2;
    const newTop = referenceRect.bottom/(stats.zoomLevel/100); // Punto inferior del turtleBot
    
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 10 + 'px';
    
        
  });
    did('turtleBot').addEventListener('mouseleave', function () {
    voidAnimation("turtleBot","gelatineHigh 0.3s 1")
    resetTooltip();
    });
  
}tooltipTurtleBot()

function offlineFarmCheck(){

if (bossTime) return "boss"
if ( returnEnemyLevelGap()==="red") return "level"
if ( (enemies[stats.currentEnemy].hp()/25) >= stat.Power) return "power"
if ( (enemies[stats.currentEnemy].attack()*10) >= stat.MaxHealth) return "health"


return true
}


function updateOfflineIndicator(){

if (offlineFarmCheck() !== true) {
    did("turtleBot").innerHTML = `                <img src="img/src/icons/turtlebot.png">
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20">
                        <path fill="#ff5151" d="M16 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-2.939 12.789L10 11.729l-3.061 3.06l-1.729-1.728L8.271 10l-3.06-3.061L6.94 5.21L10 8.271l3.059-3.061l1.729 1.729L11.729 10l3.06 3.061z" />
                    </svg>`
} else {
    did("turtleBot").innerHTML = `                 <img src="img/src/icons/turtlebot.png">
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#57ff74" d="M19 3H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2m-7.933 13.481l-3.774-3.774l1.414-1.414l2.226 2.226l4.299-5.159l1.537 1.28z"/></svg>
`
}

}


function offlineRewards(seconds){

    const times = ( 5/Math.max(1,enemies[stats.currentEnemy].hp() / stat.Power) * (1+stat.OfflineBonus/100) ) * (seconds/60)



    createPopup(`<img src="img/src/icons/turtlebot.png">You have been away for ${convertSecondsToHMS(seconds)} and defeated ${beautify(times)} ${enemies[stats.currentEnemy].name}s while you were out. Go check your loot!`,undefined,"long")




    for (let i = 0; i < times; i++) { loop();}

    function loop() {
        lootTable(enemies[stats.currentEnemy].lootTable(),"hidden")
    }



}








