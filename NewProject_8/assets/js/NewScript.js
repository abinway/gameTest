var heroConfig = require('config')
cc.Class({
    extends: cc.Component,

   properties:{
    end:cc.SpriteFrame,
    speed : 4,
    key:'',
    hero:cc.Node,
   
   },
    statics: {
        HeroAnim : {
            type : cc.Animation
        },

        actOnEven:{
            type:new Map(),
        },
        nowAni:{
            type:String,
            default:'non',
        },
        actNames:[],
    },
    onLoad: function () {
        // add key down and key up event
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this); 
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.HeroAnim = this.hero.getComponent(cc.Animation);
        this.actOnEven = new Map();
        this.nowAni = 'non';
        this.actNames=['D_act1','D_act2','D_act3'];
        heroConfig.heroRunState = new Map;

    },
    
    update: function() {
        var contime = new Date().getTime() - heroConfig.actEndTime;
      //  cc.log('contime='+contime + ' herconfigtime='+heroConfig.actEndTime + ' comb='+heroConfig.actComb)
       //动作复原
        if(contime > 0 && contime > heroConfig.actContinueTime && heroConfig.actComb != 0 && heroConfig.act == false) {
            //重置动作
          //  cc.log('continue  time>>>>>>>>>>>>>>>>>>> ' +new Date().getTime() )
            heroConfig.act = false;
            heroConfig.actComb = 0;
            var anim = this.hero.getComponent(cc.Animation);
            anim.play('wait');
        }
        this.checkClipOver(this.nowAni);
        this.heroRun();

    },



    //是否播放结束了
    checkClipOver:function() {
        var name = this.nowAni;
        if(name == 'non') {
            return ;
        }
        var clipstate = this.HeroAnim.getAnimationState(name); 
        if(clipstate == null ) {
            return ;
        }
        //当前是否有动作在播放
        if(clipstate.isPlaying == false) {
            //没有动作播放了
         //   cc.log(name + ' atk end time: '  + new Date().getTime());
            heroConfig.actComb +=1;
            //有动作衔接
            if(heroConfig.isNexAct == true) {
                //下一段的攻击
                heroConfig.isNexAct = false //动作衔接 恢复
                this.HeroAtk(this.actNames[heroConfig.actComb]);
            } else {               
                //动画播放完毕 
                heroConfig.act = false;
                heroConfig.actEndTime = new Date().getTime();
                this.nowAni = 'non';
            }
        }
        return ;
    },

    //攻击
    HeroAtk: function(atkname) {
        if(typeof(atkname) == "undefined"){
            return
        }
        

       // cc.log('atk: ' + atkname)
        var name = atkname;
        var anim = this.HeroAnim;
        anim.play(name);
        heroConfig.act = true;
        this.nowAni = name;
    },

    //是否延续攻击
    NextAtk: function() {
        var name = this.nowAni;
        var anim = this.HeroAnim.getAnimationState(name);
        if(anim != null) {
            //动作衔接
            if(anim.duration - anim.time < heroConfig.actNexTime) {
                cc.log('动作衔接')
                heroConfig.isNexAct = true;
            }
        }
    },

    heroRun:function() {
        if( heroConfig.act == true) {//攻击中
            return;
        }

        if(heroConfig.heroRunState.get('stopRun') != null && this.HeroAnim.getAnimationState('run').isPlaying){
            //待机
            cc.log('待机')
             if( !this.HeroAnim.getAnimationState('wait').isPlaying) {
                 cc.log('停止奔跑')
                 this.HeroAnim.play('wait');
                 return
           }
        }
        
                    if(heroConfig.heroRunState.get('left') != null) {
                        //左运动           
                        this.hero.scaleX = -Math.abs(this.hero.scaleX);
                        this.hero.x-=this.speed;
                        if( !this.HeroAnim.getAnimationState('run').isPlaying) {
                         this.HeroAnim.play('run');
                     }
                    } 
                     if(heroConfig.heroRunState.get('right') != null) {
                        //右运动
                        this.hero.scaleX = Math.abs(this.hero.scaleX);
                        this.hero.x+=this.speed;
                        if( !this.HeroAnim.getAnimationState('run').isPlaying) {
                         this.HeroAnim.play('run');
                     }
                    }
                    if(heroConfig.heroRunState.get('up') != null) {
                        //上运动
                       // this.hero.scaleX = Math.abs(this.hero.scaleX);
                        this.hero.y+=this.speed-1;
                        if( !this.HeroAnim.getAnimationState('run').isPlaying) {
                         this.HeroAnim.play('run');
                     }
                    }
                    if(heroConfig.heroRunState.get('down') != null) {
                        //下运动
                        //this.hero.scaleX = Math.abs(this.hero.scaleX); 
                        this.hero.y-=this.speed-1;
                        if( !this.HeroAnim.getAnimationState('run').isPlaying) {
                         this.HeroAnim.play('run');
                     }
                    } 
              
    },
    onKeyDown: function (event) {
      //  cc.log('anxia ' + new Date().getTime())
      heroConfig.heroRunState.delete('stopRun');
        switch(event.keyCode) {
            case cc.macro.KEY.x:
  
                if(heroConfig.act == false) {
                    //攻击
                    this.HeroAtk(this.actNames[heroConfig.actComb]);
                } 
                //检查动作衔接
               this.NextAtk();
              break;
        case cc.macro.KEY.right:
             //   cc.log('anxia ' + new Date().getTime())
            if(heroConfig.heroRunState.get('right') == null) {
                heroConfig.heroRunState.set('right','right');
              //  cc.log('right:  size: ' + heroConfig.heroRunState.size)
            }

                break;
        case cc.macro.KEY.left:
             //   cc.log('anxia ' + new Date().getTime())
             if(heroConfig.heroRunState.get('left') == null) {
                heroConfig.heroRunState.set('left','left');
               // cc.log('left:  size: ' + heroConfig.heroRunState.size)
            }
              

            break;
         case cc.macro.KEY.up:
                    //   cc.log('anxia ' + new Date().getTime())
                    if(heroConfig.heroRunState.get('up') == null) {
                        heroConfig.heroRunState.set('up','up');
                    //    cc.log('up:  size: ' + heroConfig.heroRunState.size)
                    }
                     
       
                   break;
         case cc.macro.KEY.down:
             //   cc.log('anxia ' + new Date().getTime())
             if(heroConfig.heroRunState.get('down') == null) {
                heroConfig.heroRunState.set('down','down');
             //   cc.log('down:  size: ' + heroConfig.heroRunState.size)
            }
              

            break;           

        }
    },

    onKeyUp: function (event) {
        switch(event.keyCode) {
            
            case cc.macro.KEY.right:
                    heroConfig.heroRunState.delete('right');
                //this.removeStr(heroConfig.heroRunState,'right');
                break;
            case cc.macro.KEY.left:
                    heroConfig.heroRunState.delete('left');
                  //  this.removeStr(heroConfig.heroRunState,'left');
                   break;
            case cc.macro.KEY.up:
                    heroConfig.heroRunState.delete('up');
                  //  this.removeStr(heroConfig.heroRunState,'up');
                    break;
            case cc.macro.KEY.down:
                    heroConfig.heroRunState.delete('down');
                    break;
                 //   this.removeStr(heroConfig.heroRunState,'down');
                 //   break;
              
                 // cc.log('song k' + new Date().getTime())
                }
                // heroConfig.heroRunState.unshift('stopRun');
                if(heroConfig.heroRunState.size == 0) {
                    heroConfig.heroRunState.set('stopRun','stopRun');
                   // cc.log('stopRun:  size: ' + heroConfig.heroRunState.size)
                }
      
    },

 
});