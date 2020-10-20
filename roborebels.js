let cnvs;let cw;let ch;let rw;let rh;let roboPos;
sizeSet();
let bulletFired=false
let ctx=cnvs.getContext('2d');
let map='0021202120212'
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
    map.split('').forEach(read)
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