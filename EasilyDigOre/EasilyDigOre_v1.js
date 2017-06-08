//     ______           _ __      ____  _      
//    / ____/___ ______(_) /_  __/ __ \(_)___ _
//   / __/ / __ `/ ___/ / / / / / / / / / __ `/
//  / /___/ /_/ (__  ) / / /_/ / /_/ / / /_/ / 
// /_____/\__,_/____/_/_/\__, /_____/_/\__, /  
//                      /____/        /____/   
//                         ____              V2    
//                        / __ \________  _____
//                       / / / / ___/ _ \/ ___/
//                      / /_/ / /  /  __(__  ) 
//  © 2016 YuYu.        \____/_/   \___/____/  
                       

const $={f:false,x:0,y:0,z:0},XYZ=[];let fa=null;function Des(x,y,z,a){$.x=x;$.y=y;$.z=z;Level.destroyBlock(x,y,z,false);Level.destroyBlock(x,y+1,z,false);setTile(x,y,z,247,0);let id=0;lp:for(let zz=a*2;zz--;)for(let xx=2*a;xx--;){for(let yy=y;yy--;){id=getTile(x+xx-a,yy,z+zz-a);if($.f){if(id===14||id===15||id===16||id===21||id===56||id===73||id===74||id===89||id===153){setTile(x+xx-a,yy,z+zz-a,0,0);let e=Level.dropItem(x+0.5,y+1,z+0.5,0,id,1,0);Entity.setVelY(e,0.3);}}else break lp;}yield;}Level.destroyBlock(x,y,z,false);$.f=false;$.x=$.y=$.z=0;}function destroyBlock(x,y,z){if(x==$.x&&(y==$.y||$.y+1)&&z==$.z)$.f=false;}function useItem(x,y,z,a,b,s,c,d){if(getTile(x,y+1,z)===89&&b===41&&d===0){if(!$.f){switch(a){case 257:$.f=true;Entity.setCarriedItem(getPlayerEnt(),0,0,0);XYZ.push([x,y,z,4]);break;case 285:$.f=true;Entity.setCarriedItem(getPlayerEnt(),0,0,0);XYZ.push([x,y,z,8]);break;case 278:$.f=true;Entity.setCarriedItem(getPlayerEnt(),0,0,0);XYZ.push([x,y,z,16]);break;}}else if($.f)clientMessage("他の場所で採掘が行われています。");}};function modTick(){if(fa!==null){try{fa.next();}catch(e){clientMessage("採掘が終了しました。");fa=null;}}else if(XYZ.length!==0){fa=Des(XYZ[0][0],XYZ[0][1],XYZ[0][2],XYZ[0][3]);XYZ.shift();}}