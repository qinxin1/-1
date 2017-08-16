function getCookie(cookieName){
			var str=document.cookie;
			var i=1;
			if((i=str.indexOf(cookieName+'='))!=-1){
				var start=i+cookieName.length+1;
				var end=str.indexOf(';',start);
				return str.slice(start,end==-1?str.length:end);
			}else{
				return null;
			}
		}

		function setCookie(cookieName,value){
			var date=new Date();
			date.setFullYear(date.getFullYear()+1);
			document.cookie=
				cookieName+'='+value+';expires='+date.toGMTString();
		}

var game={
	data:null,//保存一个二维数组，保存游戏所有格子的数据
	RN:4,//保存总行数
	CN:4,//总列数
	score:1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,//游戏得分
	state:1,
	RUNNING:1,
	GAMEOVER:0,

	top:0,
	CSIZE:100,
	OFFSET:16,
	//强调：对象自己的方法要使用自己的属性必须加this
init:function(){
	for(var r=0,arr=[];r<this.RN;r++){
		for(var c=0;c<this.CN;c++){
			arr.push(""+r+c);
		}
	}
	var width=this.CN*(this.CSIZE+this.OFFSET)+this.OFFSET;
		gridPanel.style.width=width+"px";

	var height=this.RN*(this.CSIZE+this.OFFSET)+this.OFFSET;
		gridPanel.style.height=height+"px";

	
	 //设置id为gridPanel的div的内容为:
    gridPanel.innerHTML='<div id="g'+
      arr.join('" class="grid"></div><div id="g')+
      '" class="grid"></div>';
    //向gridPanel的内容中追加:
    gridPanel.innerHTML+='<div id="c'+
      arr.join('" class="cell"></div><div id="c')+
      '" class="cell"></div>';
},

start:function(){//启动游戏
	this.top=getCookie("top")||0;
	this.state=this.RUNNING;
		this.init();
		this.score=0;
		//初始化data为空数组
		this.data=[];
		//r从0开始，到<RN结束，每次增1
		for(r=0;r<this.RN;r++){
			this.data[r]=[];
			for(c=0;c<this.CN;c++){
				this.data[r][c]=0
			}
		  }
		  this.randomNum();
		  this.randomNum();

		  this.updateView();
		  var me=this;
		  //为当前页面绑定键盘事件
		document.onkeydown=function(e){
			if(me.state==me.RUNNING){
			switch(e.keyCode){
				case 37:me.moveLeft();break;
				case 38:me.moveUp();break;
				case 39:me.moveRight();break;
				case 40:me.moveDown();break;
			}
		}
	}
},
isGameOver:function(){
	for(var r=0;r<this.RN;r++){
		for(var c=0;c<this.CN;c++){
		if(this.data[r][c]==0){
			return false;
		}
		else if(c<this.CN-1&&this.data[r][c]==this.data[r][c+1]){
			return false;
		}else if(r<this.RN-1&&this.data[r][c]==this.data[r+1][c]){
			return false;
		}
	}
  }
  return true;
},
move:function(fun){
    //先给数组照相，保存在变量before中
    var before=String(this.data);
    /*window.*/fun();//fun中的this->window
    //再给数组照相，保存在变量after中
    var after=String(this.data);
    if(before!=after){//如果before不等于after时
		this.state=this.PLAYING;
		animation.startMove(function(){
      this.randomNum();//生成一个随机数
      //如果游戏结束，就设置游戏的状态为GAMEOVER
      if(this.isGameOver()){
        this.state=this.GAMEOVER;
        this.score>this.top&&setCookie("top",this.score);
      }else{
			this.state=this.RUNNING;
		}
      this.updateView();//更新页面
		}.bind(this));
    }
  },
  moveUp:function(){//上移所有列
    var me=this;
    this.move(function(){
      for(var c=0;c<me.CN;c++){//c从0开始，到<CN结束，每次增1
        me.moveUpInCol(c);//上移第c列
      }
    });
  },
moveUpInCol:function(c){//上移第c列
	//r从0开始，到<RN-1结束,每次增一
	for(var r=0;r<this.RN-1;r++){
	  //查找r行c列下方下一个不为0的数的位置，保存在nextr中
	  var nextr=this.getNextInCol(r,c);
	  //如果没找到，就退出循环
	  if(nextr==-1){break;}
	  else if(this.data[r][c]==0){
			//否则如果data中r行c列等于0
			//将data中nextr行c列的值替换给r行c列的元素
			this.data[r][c]=this.data[nextr][c];
			//将data中nextr行c列zhiwei0
			this.data[nextr][c]=0;
			//让r留在原地
			r--;	
		}else if(this.data[r][c]==this.data[nextr][c]){//否则如果data中r行c列等于nextr行c列
			//将data中r行c列的值*2
			this.data[r][c]*=2;
			animation.addTask(nextr,c,r,c);
			this.score+=this.data[r][c];
			//将data中nextr行c列置为0
			this.data[nextr][c]=0;
		}
	}
},
moveDown:function(){//下移所有列
    var me=this;
    this.move(function(){
      for(var c=0;c<me.CN;c++){//c从0开始，到<CN结束，每次增1
        me.moveDownInCol(c);//上移第c列
      }
    });
  },
moveDownInCol:function(c){
	//r从CN-1开始，到r>0结束，每次减1
	for(var r=this.RN-1;r>0;r--){
		//查找c位置后，下一个不为0的位置，保存在prevr中
		var prevr=this.getUpInCol(r,c);
		//如果prevr等于-1，退出循环
		if(prevr==-1){break;}
		//否则 如果data中r行c列的值等于0
		else if(this.data[r][c]==0){
			//设置data中r行c列的值等于data中r行prevr列的值
			this.data[r][c]=this.data[prevr][c];
			//设置data中r行prevc列的值等于0
			this.data[prevr][c]=0;
			r++;
			//赋值留在原地
		}else if(this.data[r][c]==this.data[prevr][c]){//否则 如果data中r行c列的值等于data中r行prevc的值
			//将data中r行c列的值*2
			this.data[r][c]*=2;
			animation.addTask(prevr,c,r,c);
			this.score+=this.data[r][c];
			//将data中r行prevc列位置置为0
			this.data[prevr][c]=0;
		}
	}
},
getUpInCol:function(r,c){//找r行c列上方不为0的位置
	//遍历从prevr等于r-1开始到>=0结束每次减一
	for(var prevr=r-1;prevr>=0;prevr--){
		//如果data中nextr行c列不等于0
		if(this.data[prevr][c]!=0){return prevr};
	    //返回prevr
	}//遍历结束
	//返回-1
	return -1;

},
getNextInCol:function(r,c){//查找rhangc列下方一个不为0的数
    //nextr从r+1开始，nextr到<RN，nextr每次增1
    for(var nextr=r+1;nextr<this.RN;nextr++){
      if(this.data[nextr][c]!=0){//如果nextr行c列的元素不等于0
        return nextr;//返回nextr
      }
    }//(遍历结束)
    return -1;//返回-1
  },
 moveRight:function(){//右移所有行
    var me=this;
    this.move(function(){
      for(var r=0;r<me.RN;r++){
        me.moveRightInRow(r);
      }
    });
  },
moveRightInRow:function(r){//右移第r行
	//c从CN-1开始，到c>0结束，每次减1
	for(var c=this.CN-1;c>0;c--){
		//查找c位置后，下一个不为0的位置，保存在prevc中
		var prevc=this.getPrevInRow(r,c);
		//如果prevc等于-1，退出循环
		if(prevc==-1){break;}
		//否则 如果data中r行c列的值等于0
		else if(this.data[r][c]==0){
			//设置data中r行c列的值等于data中r行prevc列的值
			this.data[r][c]=this.data[r][prevc];
			//设置data中r行prevc列的值等于0
			this.data[r][prevc]=0;
			c--;
			//赋值留在原地
		}else if(this.data[r][c]==this.data[r][prevc]){//否则 如果data中r行c列的值等于data中r行prevc的值
			//将data中r行c列的值*2
			this.data[r][c]*=2;
			animation.addTask(r,prevc,r,c);
			this.score+=this.data[r][c];
			//将data中r行prevc列位置置为0
			this.data[r][prevc]=0;
		}
	}
},
getPrevInRow:function(r,c){
	//prevc从c-1开始到>=0结束，每次减一
	for(var prevc=c-1;prevc>=0;prevc--){
		//如果data中r行prevc列不等于0
		if(this.data[r][prevc]!=0){return prevc;}
		//返回 prevc
	}
	//遍历结束
	//返回-1;
	return -1;
},
 moveLeft:function(){//左移所有行
    var me=this;//留住this
    this.move(function(){//希望this->game
      for(var r=0;r<me.RN;r++){//r从0开始，到<RN结束，每次增1
        me.moveLeftInRow(r);//调用moveLeftInRow,传入r作为参数
      }//(遍历结束)
    });
  },
moveLeftInRow:function(r){//左移第r行
    //c从0开始，到<CN-1结束，每次增1
    for(var c=0;c<this.CN-1;c++){
      //查找c位置后，下一个不为0的位置，保存在nextc中
      var nextc=this.getNextInRow(r,c);
      //如果nextc是-1，就退出循环
      if(nextc==-1){break;}
      else{//否则
        if(this.data[r][c]==0){//如果data中r行c位置等于0
          //将data中r行nextc位置的值赋值给data中r行c位置
          this.data[r][c]=this.data[r][nextc];
          //将data中r行nextc位置置为0
          this.data[r][nextc]=0;
          c--;//下次还在当前位置开始
        }else if(this.data[r][c]==this.data[r][nextc]){
        //否则 如果data中r行c位置等于data中r行nextc位置
          this.data[r][c]*=2;//将data中r行c位置*2
		   animation.addTask(r,nextc,r,c);
          this.score+=this.data[r][c];//累加得分
          //将data中r行nextc位置置为0
          this.data[r][nextc]=0;
        }
      }
    }
  },
getNextInRow:function(r,c){//负责查找r行c列右侧下一个不为0的位置
		for(var nextc=c+1;nextc<this.CN;nextc++){
			if(this.data[r][nextc]!=0){return nextc;}
		}
		return -1;
	},
updateView:function(){
			topScore.innerHTML=this.top;
			//r从0开始，到<RN结束，每次增一
			for(var r=0;r<this.RN;r++){
				//从c开始，到<CN结束，每次增一
				for(var c=0;c<this.CN;c++){
					//查找id为"c"+r+c的div元素，保存在div中
					var div=document.getElementById("c"+r+c);
					//如果data中r行c列等于0
					if(this.data[r][c]==0){
						//设置div的内容为空字符串
						div.innerHTML="";
						//设置div的className属性为“cell”
						div.className="cell";
					}else{
					//否则
						//设置div的内容为data中r行c列的值
						div.innerHTML=this.data[r][c];
						//设置div的className为"cell n"+this.data[r][c]的值
						div.className="cell n"+this.data[r][c];
					}
				}
			}
			//找到id为score的span直接设置内容为score
			score.innerHTML=this.score;
			/*if(this.state==this.GAMEOVER){
			 document.getElementById("gameOver").style.display="block";
			}else{
			document.getElementById("gameOver").style.display="none";
			}*/
			this.state==this.GAMEOVER&&
				(final.innerHTML=this.score);
			 gameOver.style.display=
                this.state==this.GAMEOVER?"block":"none";
		},	
	randomNum:function(){
			while(true){
				var r=Math.floor(Math.random()*this.RN);
				var c=Math.floor(Math.random()*this.CN);
				if(this.data[r][c]==0){
					var num=Math.random();
					this.data[r][c]=num<0.5?2:4;
					break;
				}
			}
		},
		
	}
//事件：当页面加载完成后自动触发
window.onload=function(){
	game.start();
}