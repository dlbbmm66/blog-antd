import {fromJS} from 'immutable'

const rightListReducer = (oldState=fromJS([]),action)=>{ // action就是发布者传过来的对象参数
    console.log("store收到---",action);
    // 判断type的类型，区别传过来的是什么动作：
    let {type,payload} = action;
    switch (type) {
        case "setRightList": 
            // var newState = [...oldState,...payload]
            // return newState
            return oldState.concat(payload) //用了immutable之后，直接用老状态即可，也不会影响老状态
    
        default: //都不匹配，返回老状态
            // break;
            return oldState
    }
}

export default rightListReducer