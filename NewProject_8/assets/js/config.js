var heroConfig = {
     act : false,
     actComb : 0,
     actEndTime : 0, //当前动作结束的时间
     actContinueTime : 100,//结束几秒内会重置动作 (ms)
     actNexTime:0.5,//动画结束前几秒可以衔接动作
     isNexAct:false,//是否下一段攻击
     heroRunState:new Map,
};



module.exports = heroConfig