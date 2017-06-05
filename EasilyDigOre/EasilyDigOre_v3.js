/**
* EasilyDigOre
* v3
*
* (c) 2016 SorrowBlue
*
* Do NOT redistribute my source code.
* 私のソースコードを再配布しないでください。
*
* Do NOT claim my source code as your own.
* 私のソースコードを自作であると騙らないでください。
*
* If you have any questions, please ask me via email (message).
* 質問がある場合は私にメールで問い合わせてください。
*
* kirigaya.yu2s2@gmail.com
*/

let bex,bey,byz,block_flag,block_yield;

const XYZ=[];
const ORE_DICTIONARY=[14,15,16,21,56,73,74,89,153];

function dropMoveUp(x,y,z,xx,yy,zz,area,id){
	setTile(x+xx-area,yy,z+zz-area,0,0);
	Entity.setVelY(Level.dropItem(x+0.5,y+1,z+0.5,0,id,1,0),0.3);
}

function setArea(x,y,z,area){
	block_flag=true;
	XYZ.push([x,y,z,area]);
	Entity.setCarriedItem(getPlayerEnt(),0,0,0);
}

function setDesBlock(x,y,z){
	bex=x;
	bey=y;
	bez=z;
	Level.destroyBlock(x,y,z,false);
	Level.destroyBlock(x,y+1,z,false);
	setTile(x,y,z,247,0);
}

function blockYield(x,y,z,area){
	setDesBlock(x,y,z);
	loop:for(let zz=area*2;zz--;)for(let xx=2*area;xx--;){
		for(let yy=y;yy--;){
			let id=getTile(x+xx-area,yy,z+zz-area);
			if(!block_flag)break loop;
			if(-1!==ORE_DICTIONARY.indexOf(id))
				dropMoveUp(x,y,z,xx,yy,zz,area,id);
		}
		yield;
	}
	Level.destroyBlock(x,y,z,false);
	block_flag=false;
	bex=bey=bez=0;
}


/**
* HookFunction
*/

function destroyBlock(x,y,z){
	if(x==bex&&(y==bey||bey+1)&&z==bez)
		block_flag=false;
}

function useItem(x,y,z,a,b,s,c,d){
	if(getTile(x,y+1,z)===89&&b===41&&d===0){
		if(block_flag)clientMessage("他の場所で採掘が行われています。");
		switch(a){
			case 257:setArea(x,y,z,4);break;
			case 285:setArea(x,y,z,8);break;
			case 278:setArea(x,y,z,16);break;
		}
	}
};

function modTick(){
	if(null!=block_yield){
		try{
			block_yield.next();
		}catch(e){
			clientMessage("採掘が終了しました。");
			block_yield=null;
		}
	}else if(0!==XYZ.length){
		block_yield=blockYield(XYZ[0][0],XYZ[0][1],XYZ[0][2],XYZ[0][3]);
		XYZ.shift();
	}
}