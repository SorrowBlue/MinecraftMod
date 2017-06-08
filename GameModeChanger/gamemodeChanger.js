/**
* GameModeChanger
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

const activity=com.mojang.minecraftpe.MainActivity.currentMainActivity,
      button=new android.widget.Button(activity.get()),
      popupWindow=new android.widget.PopupWindow(Button,150,150);

button.setText("G");
button.setTextSize(14);
button.setOnClickListener(function(){
	if(Level.getGameMode()==0){
		Level.setGameMode(1);
		clientMessage("クリエイティブ");
	}else{
		Level.setGameMode(0);
		print("サバイバル");
	}
});

function newLevel(){
	activity.get().runOnUiThread(function(){
		button.showAtLocation(activity.get().getWindow().getDecorView(),android.view.Gravity.RIGHT|android.view.Gravity.BOTTOM,0,0);
	});
}

function leaveGame(){
	activity.get().runOnUiThread(function(){
		button.dismiss();
	});
}