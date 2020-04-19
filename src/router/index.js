// 配置路由：这是一个路由组件，相当于vue的router/index.js
    // 万物皆组件--react-router4、5版本遵循这个

import {
//    HashRouter, //路由最外层包括的组件
    HashRouter as Router, //重命名
   Route, //每个路由都需要这个组件包着 
   Redirect,
   Switch
//    Redirect,
//    Switch //精确匹配
} from 'react-router-dom'
// import { Component } from 'react';
import React,{Component} from 'react';

// 引入自定义的组件：
// import Home from '../views/home/Home'
// import User from '../views/user/User';
// import Rights from '../views/right/Rights'
// import Right from '../views/right/Right'
// import Role from '../views/right/Role'
// import NotFound from '../views/error/Error';
import DashBoard from '../views/dashboard/DashBoard';
import login from '../views/login/Login';
// import { Switch } from 'antd';

// 自定义一个路由组件/模块：类的方式/函数的方式
class BlogRouter extends Component{
    //  HashRouter 包在最外层--hash模式的路由组件
    // BrowserRouter--history模式的路由
    render(h) {
        return (<Router>

            <Switch>
                {/* 登录成功，才能显示导航栏等：否则，跳转到登录页面 */}
                <Route path="/login" component={login}></Route>

                {/* {
                    localStorage.getItem("isLogin")
                    ?<Route path="/" component={DashBoard} />
                    :<Redirect to="/login"></Redirect>
                } */}

                {/* 这样写，每次路由更改，就会重新渲染页面 */}
                <Route path="/" render={()=>
                    localStorage.getItem("isLogin") == "true"
                    ?<DashBoard></DashBoard>
                    :<Redirect to="/login" />
                } />
            </Switch>

            {/* 相当于只要，从上到下匹配到一个路由组件，就停（break出来） */}
            {/* <Switch> */}

                {/* 未登录，login组件页面，不需要复用导航栏、header栏等 */}
                {/* <Route path="/login" component = {Login}></Route> */}

                {/* 登录之后，其他一些组件要复用导航栏等，所以将他们包裹在一个路由中： */}
                {/* <Route path="/" component={DashBoard} /> */}

            {/* </Switch> */}
        </Router>)
    }
}
// const BlogRouter = ()=>(
//     //  HashRouter 包在最外层--hash模式的路由组件
//     // BrowserRouter--history模式的路由
//     <Router>

//         <Switch>
//             {/* 登录成功，才能显示导航栏等：否则，跳转到登录页面 */}
//             <Route path="/login" component={login}></Route>

//             {/* {
//                 localStorage.getItem("isLogin")
//                 ?<Route path="/" component={DashBoard} />
//                 :<Redirect to="/login"></Redirect>
//             } */}

//             {/* 这样写，每次路由更改，就会重新渲染页面 */}
//             <Route path="/" render={()=>
//                 localStorage.getItem("isLogin") == "true"
//                 ?<DashBoard></DashBoard>
//                 :<Redirect to="/login" />
//             } />
//         </Switch>

//         {/* 相当于只要，从上到下匹配到一个路由组件，就停（break出来） */}
//         {/* <Switch> */}

//             {/* 未登录，login组件页面，不需要复用导航栏、header栏等 */}
//             {/* <Route path="/login" component = {Login}></Route> */}

//             {/* 登录之后，其他一些组件要复用导航栏等，所以将他们包裹在一个路由中： */}
//             {/* <Route path="/" component={DashBoard} /> */}

//         {/* </Switch> */}
//     </Router>
// ) 

export default BlogRouter
