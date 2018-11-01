// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        probar:cc.ProgressBar,
        actionTime : {//几秒完成
            visible:false,
            default:0,
        },
        spri : {
            default : null,
            type : cc.Sprite,
            visible :false,
        },
        probar2 : cc.Sprite,
        probar1 : cc.Sprite,
        tihun : {
            default : false,
            
            visible : false,
        },

        fangx : cc.node,
        level : {
            default : 0,
        },
        txtlabel : cc.Label,
        maxcountall : 3,
        zhiling : {
            default:[],
           
            visible:false
        },
        mubiao : {
            default:[],
            visible:false,
        },
        zhiz : 0,
        speed : {//增加速度
            visible : false,
            default : 0,
        },
        leveAndCco : cc.Label,
        fenshu : 0,
        life : cc.Label,
        lifevalue : 3,
        isSucess : false,
        gamebig : false,
        ketiji : true,
        audio: {
            default: null,
            type: cc.AudioClip
        },
        audiobg2: {
            default: null,
            type: cc.AudioClip
        },
        audio1 :  {
            type: cc.AudioSource,
            default: null
         },
         audio2 :  {
            type: cc.AudioSource,
            default: null
         },
         audio3 :  {
            type: cc.AudioSource,
            default: null
         },
         audio4 :  {
            type: cc.AudioSource,
            default: null
         },
        
    },
    

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         if(Math.random() * 10 >= 5) {

             cc.audioEngine.play(this.audio, true, 0.5);
         } else {
            cc.audioEngine.play(this.audiobg2, true, 0.5);
         }
      
        
     },

    start () {
       
        
        this.probar.progress = 1;
        this.spri = this.probar.node.children[0],
       // console.log(this.spri.getName());
       this.tihuan  = false;
       this.spri.runAction(cc.scaleTo(this.actionTime,1));
       this.fangx  = this.node.getChildByName('fangx');
       this.level = 0;
       this.txtlabel.string = "请做好准备...   " ;
       this.jianp();
       this.actionTime = 4;
       this.speed =0.1;
       this.leveAndCco.string = "level: " + this.actionTime + " 分数: " + this.fenshu;
       this.life.string = "生命: " + this.lifevalue;
       this.isSucess = false;
       this.audio1.play();
    },

    update(dt) {
        this.life.string = "生命: " + this.lifevalue;
         if(this.spri.scaleX == 1) {
           if(this.tihuan) {
            this.spri.getComponent(cc.Sprite).spriteFrame =  this.probar1.spriteFrame;
            this.tihuan = false;
            this.gamebig = true;
            this.shengch(this.level);
            console.log("目标: " + this.mubiao);

            this.spri.scaleX = 0;
            this.spri.runAction(cc.scaleTo(this.actionTime,1));
            if(this.actionTime < 2) {
                this.actionTime = 2;
            }
            this.ketiji  =true;
        } else {
          //  this.spri.getComponent(cc.Sprite).spriteFrame =  this.probar2.spriteFrame;
            this.tihuan = true;
            this.level++;
          
     //       console.log("当前节点数: " + this.fangx.childrenCount);
            var zcount = this.fangx.children;
            var count = this.fangx.childrenCount;
            for(var k = 0; k < count;k++) {
                
                this.fangx.removeChild(zcount[0]);
            }
            //清除指令
            this.zhiling.splice(0,this.zhiling.length);
            this.mubiao.splice(0,this.mubiao.length);
            this.zhiz = 0;
            if(!this.isSucess && this.gamebig) {
                this.lifevalue-=1;
                this.audio4.play();
                if(this.lifevalue <0) this.lifevalue = 0;
                this.actionTime = 4;
                this.maxcountall = 3;
                this.level = 0
                this.spri.getComponent(cc.Sprite).spriteFrame =  this.probar2.spriteFrame;
                this.spri.runAction(cc.scaleTo(2,1));
            }
            if(this.lifevalue <= 0) {
                cc.audioEngine.stopAll();
                this.spri.scaleX = 0;
                cc.director.loadScene("GameOver");
            } else {

                this.isSucess = false;
        //        console.log("删除节点后" + this.fangx.childrenCount);
               
            this.actionTime = this.actionTime - this.speed;
            this.spri.scaleX = 1;
         //   this.spri.runAction(cc.scaleTo(0.1,1));
            // var liz = self.node.getChildByName('liz');
            // liz.x = -600;
            }
       
        
    }
       

        
    }
   
            
    
    
    },


    bijiao : function() {
        if(!this.tihuan && this.zhiz > 0) {
            
            var playZhiz = this.zhiling[this.zhiz-1];
            var mubiaoZhiz = this.mubiao[this.zhiz-1];
            if(this.zhiz <= this.mubiao.length) {
                
                //这里可以不作处理
                console.log("输入: " + this.zhiling)
                if(playZhiz === mubiaoZhiz) {
                    var node = new cc.Node("c");
                     var sprite = node.addComponent(cc.Sprite);
                     var usrname = "";
                     switch (mubiaoZhiz) {
                             case 1:
                             usrname = 's2';
                             break;
                             case 2:
                             usrname = 'x2';
                             break;
                             case 3:
                             usrname = 'z2';
                             break;
                             case 4:
                             usrname = 'y2';
                             break;

                     
                         default:
                             break;
                     }
                     var fangx = this.fangx;
                     var chilnode = fangx.children[this.zhiz -1];
                     node.setPosition(chilnode.x,chilnode.y);
                     sprite.spriteFrame = new cc.SpriteFrame(usrname);
                     node.setContentSize(chilnode.width,chilnode.height);
                     this.fangx.addChild(node);
                     
                } else {
                    //输入错误了
                    console.log("error: ")
                    this.audio4.play();
                    var fangx = this.fangx;
                    var count = fangx.childrenCount;
                    for(var m = 0 ; m < count;m++) {
                        if(fangx.children[m].getName() == 'c') {
                            fangx.children[m].removeFromParent();
                            --m;
                            count-=1
                        }
                    }
                    this.zhiz = 0;
                    this.zhiling.splice(0,this.zhiling.length);
                  

                }
            }
        }
    },


    shengch : function (levels) {
        if(this.txtlabel.string != "") {
            this.txtlabel.string = "";
        }
        var fangx=this.fangx; 
        var maxcount = this.maxcountall; //出来几个目标
     //   console.log("level: " + levels + " coun " + maxcount);
        if(levels % 5 == 0) {
            this.maxcountall+=1;
        }
        if(maxcount > 8) {
            this.maxcountall = 8
        }
        var cur = 80;//方块的大小
        for(var  i = 0 ; i < maxcount; i++) {
            var mun = Math.random() * maxcount +1;
            mun = Math.round(mun);
        //    console.log(mun);
            var urlname = "";
            switch (mun) {
                case 1:
                    urlname = 's1';
                    this.mubiao.push(1);
                    break;
                case 2:
                urlname = 'x1';
                this.mubiao.push(2);
                    break;
                 case 3:
                 urlname = 'z1';
                 this.mubiao.push(3);
                    break;
                 case 4:
                 urlname = 'y1';
                 this.mubiao.push(4);
                    break;
            
                default:
                urlname = 's1';
                this.mubiao.push(1);
            }
        //     cc.loader.loadRes(urlname, cc.SpriteFrame,function(err,spriteFrame){  
      
        //         //创建一个新的节点，因为cc.Sprite是组件不能直接挂载到节点上，只能添加到为节点的一个组件  
        //         var node=new cc.Node('myNode' + i)  
        //         //调用新建的node的addComponent函数，会返回一个sprite的对象  
        //         const sprite=node.addComponent(cc.Sprite)  
        //         //给sprite的spriteFrame属性 赋值  
        //         sprite.spriteFrame=spriteFrame  
        //         node.setContentSize(95,95);
        //         node.x = -(4-i) * 95;
        //         console.log(node.x)
        //         //把新的节点追加到self.node节点去。self.node，就是脚本挂载的节点  
        //         fangx.addChild(node)  
      
        //    })
        if(maxcount % 2 != 0) {

            var zhongx = Math.round((maxcount) / 2 -1) ;
            var node = new cc.Node();
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame(urlname);
            node.setContentSize(cur,cur);
            if(i < zhongx) {
                node.x = fangx.x - (zhongx - i) * cur
            } else if(i == zhongx) {
                node.x = fangx.x 
            } else {
                node.x = fangx.x + (i - zhongx ) * cur
            }


           

        //    console.log("mi: " + fangx.x + " : " + i + "-" + node.x)
        } else {
            var zhongx = Math.round((maxcount) / 2 -1) ;
            var node = new cc.Node();
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = new cc.SpriteFrame(urlname);
            node.setContentSize(cur,cur);
            if(i <= zhongx) {
                node.x = fangx.x - ((zhongx - i) * cur+ cur / 2) 
            }  else {
                node.x = fangx.x + (i - zhongx ) * cur -cur/2
            }
         //   console.log("msi: " + fangx.x + " : " + i + "-" + node.x)
        }
        
        fangx.addChild(node);
        }
    },


    jianp : function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onkeyDown,this)
    },

    onkeyDown : function(event) {
        if(!this.tihuan ) {

            
            switch (event.keyCode) {
                    case cc.macro.KEY.up:
                    this.zhiling.push(1);
                    this.zhiz++;
                    break;
                    case cc.macro.KEY.down:
                    this.zhiling.push(2);
                    this.zhiz++;
                    break;
                    case cc.macro.KEY.left:
                    this.zhiling.push(3);
                    this.zhiz++;
                    break;
                    case cc.macro.KEY.right:
                    this.zhiling.push(4);
                    this.zhiz++;
                    break;
                    case cc.macro.KEY.space:
                    var self = this;
                    this.tijiao(self);
                    break;
            
                default:
                    break;
            }
            if(event.keyCode != cc.macro.KEY.space) {

                this.bijiao();
            }
        }
      // console.log(this.zhiling)
    },

    tijiao : function(self) {
       if(self.zhiz >= self.mubiao.length) {
           if(this.ketiji) {

               console.log("提交" +self.spri.scaleX);
               this.audio2.play();
              
               this.isSucess = true;
               if((1-self.spri.scaleX) * 100  > 70) {
                    this.audio3.play(); 
               }
               self.fenshu +=  (1-self.spri.scaleX) * 100
               this.leveAndCco.string = "level: " + this.actionTime.toFixed(2) + " 分数: " + Math.floor(this.fenshu);
               this.ketiji = false;
               var liz = self.node.getChildByName('liz');
               var nodeSta = self.fangx.children[0];
               var nodeEnd = self.fangx.children[self.fangx.childrenCount - 1];
               console.log(nodeEnd.x);
               liz.x = -nodeEnd.x;
               liz.y = self.fangx.y;
               var finished = cc.callFunc(function(target, liz) {
                liz.x = -1600;
            }, this, liz);//动作完成后会给玩家加100分
            var action = cc.sequence(cc.moveTo(0.5,nodeEnd.x,self.fangx.y),finished);
            liz.runAction(action);
            self.fangx.removeAllChildren();
            window.Global = {
               fs : self.fenshu,
            };
              
           }
            
       }
    },
    
    
    
});
