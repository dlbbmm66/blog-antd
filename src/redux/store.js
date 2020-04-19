import {createStore , applyMiddleware} from 'redux'

import {combineReducers,compose} from 'redux'

// 引入解决异步的中间件：
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'

import collapsedReducer from '../redux/reducers/collapsedReducer'
import roleListReducer from '../redux/reducers/roleListReducer'
import rightListReducer from '../redux/reducers/rightListReducer'

// 创建一个reducer，修改状态（接收老状态，深复制之后，再返回新状态，并保留老状态）
const reducer = combineReducers({
    isCollapsed:collapsedReducer,
    roleList:roleListReducer,
    rightList:rightListReducer,
})

//创建一个store对象，并且应用解决异步的中间件，
    // 默认action只能是普通对象，如果action传过来的是一个函数，交给中间件处理，
    // 中间件会向组件中的action中传一个形参

// 配置redux-devtools：增强store能力
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer , composeEnhancers(applyMiddleware(reduxThunk,reduxPromise))) 

export default store