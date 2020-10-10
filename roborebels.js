let cnvs=document.getElementById('zone');
let cw=1000//canvas width
let ch=900;
let rw=cw/30//robo width
let rh=ch/2
let roboPos=0
let bulletFired=false
let ctx=cnvs.getContext('2d');
ctx.fillStyle="firebrick";
// function mapDraw() { 
//     for (let i = 0; i < 10; ) {
//         ctx.fillRect(++i * cw / 5, 0, cw / 10, ch);
//     }
// }
function roboMove(){
    if(roboPos>cw||bulletFired){
        return "robo crossed canvas";
    }
    setTimeout(() => {
        roboMove()
    }, 20);
    ctx.fillStyle="red"
    ctx.clearRect(0,0,cw,ch);
ctx.fillRect(++roboPos,ch-rh,rw,rh);
ctx.fillStyle="firebrick"
mapDraw();
};
function shoot(evnt){
    
    let rect = cnvs.getBoundingClientRect();
    let borderWidth = +((getComputedStyle(document.getElementById('zone'), null).getPropertyValue('border-left-width')).replace('px', ''))
    let xcanvas = evnt.clientX - rect.left - borderWidth
    let ycanvas = evnt.clientY - rect.top - borderWidth;
    let colorClicked=String(ctx.getImageData(xcanvas,ycanvas,1,1).data)
    killShow();
    bulletFired=true
     if(xcanvas>roboPos&&xcanvas<roboPos+rw&&colorClicked=='178,34,34,255'){//...colorClicked==wallcolor 
         console.log('robot disassembled');
         setTimeout(() => {//show killed notice after killShow() effect is seen
            id('zone').style.display='none';
            id('robodead').style.display='block'
   
         }, 2000);
         return; 
     };
     if(colorClicked!='178,34,34,255'){//color clicked != wall color
         setTimeout(() => {
            id('zone').style.display='none'
            id('walltip').style.display='block'
         }, 2000);
         return
     }
     setTimeout(() => {
        id('zone').style.display='none'
        id('missedaim').style.display='block'
     }, 2000);
     function killShow() {
        ctx.fillStyle="red"
        ctx.clearRect(0,0,cw,ch);
    ctx.fillRect(roboPos,ch-rh,rw,rh);
    ctx.fillText('💥',xcanvas-5,ycanvas+3)//-5 & +3 align fire symbol's centre 
    
    }
}
function id(elementId) {return document.getElementById(elementId)}
function startGame() {
    mapDraw();
    roboMove();   
}
function hideAllNotice() {
    document.querySelectorAll('.notice').forEach(
        (item)=>{item.style.display='none'}
        )
}
function restartGame() {
    id('zone').style.display='block';
    roboPos=0;
    bulletFired=false;
    startGame();
    hideAllNotice();
    
}
function mapDraw (map='0021202120212') {
    map=map.split('')
    let bw=cw/map.length;
    map.forEach(read)
    function read(value,i) {
      if(value==1){ctx.fillStyle='firebrick',ctx.fillRect(i*bw,0,bw,ch)};
      if(value==2){ctx.fillStyle='#7b9095', ctx.fillRect(i*bw,0,bw,ch);}//steel
    }
        }
    
