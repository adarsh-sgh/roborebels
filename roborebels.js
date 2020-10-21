let cnvs;let cw;let ch;let rw;let rh;let roboPos;let level=0
sizeSet();
let bulletFired=false
let ctx=cnvs.getContext('2d');
let map=[
    "021010010110",//level 0

    "0021202120212",
    "0221202120212",
    "0221202212021",
    
    "0221200221200",
    "022120022120",
    "0222120222120",

    "0021200",
    "00221200",
    "002221200"//level 9
]
ctx.fillStyle="firebrick";
function roboMove(){
    if(bulletFired){return}
    if(roboPos>cw){ 
        noticeShow('roboescaped')
        return "robo crossed canvas";
    }
    setTimeout(() => {
        roboMove()
    }, 20);
    ctx.fillStyle="red";
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
        if(level==9){alert('Congratulations,All Levels Completed.');return}
        level++;
        id('robodead').querySelector('button').innerHTML=`Start Mission @ <b style="font-size:larger">Map ${level}⏭<b>`
         setTimeout(()=>{noticeShow('robodead')}, 2000);
         return; 
     };
     if(colorClicked!='178,34,34,255'){//color clicked != wall color
         setTimeout(()=>{noticeShow('walltip')}, 2000);
         return
     }
     setTimeout(()=>{noticeShow('missedaim')}, 2000);
     function killShow() {
        ctx.fillStyle="red"
        ctx.clearRect(0,0,cw,ch);
    ctx.fillRect(roboPos,ch-rh,rw,rh);
    ctx.fillText('💥',xcanvas-5,ycanvas+3)//-5 & +3 align fire symbol's centre 
    }
}
function id(elementId) {return document.getElementById(elementId)}
function startGame() {
    sizeSet()
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
    cnvs.requestFullscreen();
    roboPos=0;
    bulletFired=false;
    startGame();
    hideAllNotice();
    
}
function mapDraw () {
    let bw=cw/map.length;
    map[level].split('').forEach(read)
    function read(value,i) {
      if(value==1){ctx.fillStyle='firebrick',ctx.fillRect(i*bw,0,bw,ch)};
      if(value==2){ctx.fillStyle='#7b9095', ctx.fillRect(i*bw,0,bw,ch);}//steel
    }
        }
    
function noticeShow(noticeId) {
    id('zone').style.display='none';
    id(noticeId).style.display='block';
 document.exitFullscreen();
}
function sizeSet() {
    cnvs=document.getElementById('zone');
    cw=Math.max(document.documentElement.clientWidth ||0, window.innerWidth ||0)||640//canvas width
    ch=Math.max(document.documentElement.clientHeight||0, window.innerHeight||0)||360;
    cnvs.width=cw;cnvs.height=ch;
    rw=cw/30//robo width
    rh=ch
}