const collapsedReducer = (oldState=false,action)=>{ // action就是发布者传过来的对象参数
    console.log("store收到---",action);
    // 判断type的类型，区别传过来的是什么动作：
    let {type,payload} = action;
    switch (type) {
        case "sideMenuCollapsed": 
            return payload
    
        default: //都不匹配，返回老状态
            // break;
            return oldState
    }
}

export default collapsedReducer