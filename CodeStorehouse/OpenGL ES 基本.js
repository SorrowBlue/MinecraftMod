const GL10=javax.microedition.khronos.opengles.GL10;

// 配列をfloatバッファに変換
function makeFloatBuffer(a){
	const fb=java.nio.ByteBuffer.allocateDirect(a.length*4).
		order(java.nio.ByteOrder.nativeOrder()).asFloatBuffer();
	fb.put(a).position(0);return fb;
}
//配列をByteバッファに変換
function makeByteBuffer(a){
	const bb=java.nio.ByteBuffer.allocateDirect(a.length).
	order(java.nio.ByteOrder.nativeOrder());
	bb.put(a).position(0);return bb;
}

function drawBox(gl10){
	
	//頂点バッファの指定
	gl10.glVertexPointer(3,GL10.GL_FLOAT,0,vertexBuffer);
	
	//面0の描画
	gl10.glColor4f(0,1,0,1);//色
	indexBuffer.position(0);
	// GL_TRIANGLE_STRIP 連続した三角形を描写
	// GL_UNSIGNED_BYTE バイトバッファから取得
	gl10.glDrawElements(GL10.GL_TRIANGLE_STRIP,
		10,GL10.GL_UNSIGNED_BYTE,indexBuffer);
		//バイトバッファの0から10個
		
	//面1の描画
	gl10.glColor4f(0,0,1,1);//色
	indexBuffer.position(10);
	gl10.glDrawElements(GL10.GL_TRIANGLE_STRIP,
		4,GL10.GL_UNSIGNED_BYTE,indexBuffer);
		//
	//面2の描画
	gl10.glColor4f(1,0,0,1);
	indexBuffer.position(14);
	gl10.glDrawElements(GL10.GL_TRIANGLE_STRIP,
		4,GL10.GL_UNSIGNED_BYTE,indexBuffer);

}


let aspect=0; //アスペクト比 用の変数
let vertexBuffer; //頂点バッファ 用の変数
let indexBuffer; //インデックスバッファ用の変数
ar=0;
// *レンダラ*

const renderer=new android.opengl.GLSurfaceView.Renderer({
	
	// *生成時に呼ばれるリスナー*
	onSurfaceCreated(gl10,elg){
	
		//ポリゴンの両面を描くようにする
		gl10.glDisable(GL10.GL_CULL_FACE);
		
		//頂点配列の有効化
		gl10.glEnableClientState(GL10.GL_VERTEX_ARRAY);
		//デプステストの有効化
		gl10.glEnable(GL10.GL_DEPTH_TEST);
		
		
		//頂点バッファの生成
		const vertexs=[
			1.0, 1.0, 1.0,//頂点0
			1.0, 1.0,-1.0,//頂点1
			-1.0, 1.0, 1.0,//頂点2
			-1.0, 1.0,-1.0,//頂点3
			1.0,-1.0, 1.0,//頂点4
			1.0,-1.0,-1.0,//頂点5
			-1.0,-1.0, 1.0,//頂点6
			-1.0,-1.0,-1.0//頂点7
		];vertexBuffer=makeFloatBuffer(vertexs);
		
		
		//インデックスバッファの生成
		const indexs=[
			0,1,2,3,6,7,4,5,0,1,//面0
			1,5,3,7,//面1
			0,2,4,6//面2
		];indexBuffer=makeByteBuffer(indexs);
	},
	
	// *画面サイズ更新時に呼ばれる*
	onSurfaceChanged(gl10,w,h){
		
		//ビューポートの変換
		gl10.glViewport(0,0,w,h);
		aspect=w/h;
		gl10.glOrthof(-1,1,1/aspect,1/aspect,0.01,100.0);
		
	},
	
	// *画面更新時に呼ばれる*
	onDrawFrame(gl10){
		
		//画面の初期化
		gl10.glClear(GL10.GL_COLOR_BUFFER_BIT|GL10.GL_DEPTH_BUFFER_BIT);
		
		
		gl10.glPointSize(20);
		
		//射影変換
		gl10.glMatrixMode(GL10.GL_PROJECTION);
		gl10.glLoadIdentity();
		android.opengl.GLU.gluPerspective(gl10,
			90,//Y方向の画角
			aspect,//アスペクト比
			0.01,//ニアクリップ
			100//ファークリップ
		);
		
		var nativeGetPlayerLoc = net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetPlayerLoc;
    var nativeGetYaw = net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetYaw;
    var nativeGetPitch = net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetPitch;
    var nativeGetPlayerEnt = net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetPlayerEnt;
		 var yaw = nativeGetYaw(nativeGetPlayerEnt()) % 360;
                var pitch = nativeGetPitch(nativeGetPlayerEnt()) % 360;
            
                var eyeX = nativeGetPlayerLoc(0);
                var eyeY = nativeGetPlayerLoc(1);
                var eyeZ = nativeGetPlayerLoc(2);

                var dCenterX = Math.sin(yaw / 180 * Math.PI);
                var dCenterZ = Math.cos(yaw / 180 * Math.PI);
                var dCenterY = Math.tan((pitch - 180) / 180 * Math.PI);

                

		
		
		
		
		
		
		
		//ビュー変換
		gl10.glMatrixMode(GL10.GL_MODELVIEW);
		gl10.glLoadIdentity();
		/*android.opengl.GLU.gluLookAt(gl10,
			5,0,0,//カメラの視点
			0,0,0,//カメラの焦点
			0,1,0//カメラの上方向
		);*/
		android.opengl.GLU.gluLookAt(gl10, eyeX, eyeY, eyeZ, eyeX-dCenterX, eyeY-dCenterY, eyeZ+dCenterZ, 0, 1, 0);
		//ポリゴン回転
		gl10.glRotatef(ar++,0,1,0);
		
		
		//描画(ここでは塗りつぶし : 後日記載)
		drawBox(gl10);
		}
	
	
});


const ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({
	run(){
		const view=new android.opengl.GLSurfaceView(ctx);
		
		//GL View の背景を透過;
		view.setZOrderOnTop(true);
		view.setEGLConfigChooser(8,8,8,8,0,0);
		view.getHolder().setFormat(android.graphics.PixelFormat.TRANSLUCENT);
		
		//GL View にレンダラを渡す(後日記載)
		view.setRenderer(renderer);
		
		//GL View をアクティビティに配置する
		ctx.setContentView(view);﻿
		
	}
}));

