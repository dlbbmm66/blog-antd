const roleListReducer = (oldState=[],action)=>{ // action就是发布者传过来的对象参数
    console.log("store收到---",action);
    // 判断type的类型，区别传过来的是什么动作：
    let {type,payload} = action;
    switch (type) {
        case "setRoleList": 
            var newState = [...oldState,...payload]
            return newState
    
        default: //都不匹配，返回老状态
            // break;
            return oldState
    }
}

export default roleListReducer