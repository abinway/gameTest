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
      thiswen : cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
      //  console.log(this.thiswen.string)
    
       // this.node.on(cc.Node.EventType.MOUSE_DOWN,this.wenz,this);
       this.node.on(cc.Node.EventType.MOUSE_DOWN,this.wenz,this);
     },

    start () {
      
    },
    wenz : function () {
        console.log("点击");
       this.thiswen.string = "加载中,请稍等..."
       cc.director.loadScene("GameSreen");
    }
    

    // update (dt) {},
});
