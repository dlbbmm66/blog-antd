import React from 'react';
import './App.css';
import { Component } from 'react';

// 导入供应商组件，使用react-redux：
import {Provider} from 'react-redux'
import store from './redux/store'

// 引入声名式导航组件：
// import {NavLink} from 'react-router-dom'

// 引入自定义组件：
// import BlogRouter from './router/index'
import BlogRouter from './router'

// 项目的根组件：
class App extends Component{
  render(h) {
    return (
      <Provider store={store}>
        <BlogRouter/>
      </Provider>
    )
        // return <di v>
      //   App组件:
      //   <BlogRouter />
      // </di>

      {/* 导航：NavLink不能写在Router组件外面 */}
      {/* <ul>
        <li>
          <NavLink to="/home">首页</NavLink>
        </li>
        <li>
          <NavLink to="users/user">用户列表</NavLink>
        </li>
      </ul> */}

      {/* 配置项目的所有路由 */}
      
  }
}

export default App;
