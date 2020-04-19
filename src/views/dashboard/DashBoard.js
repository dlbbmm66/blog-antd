import React, { Component } from 'react'
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'

// 子组件：
import NotFound from '../error/NotFound';
import Home from '../home/Home';
import User from '../user/User';
import Rights from '../right/Rights';
import Role from '../right/Role';
import Right from '../right/Right';
// 自定义样式组件：
import './DashBoard.css'
import List from '../article/List';
import Create from '../article/Create';
import Preview from '../article/Preview';
import Update from '../article/Update';

// 引入antd：
import { Layout } from 'antd';

import SiderMenu from './SiderMenu';
import Category from '../article/Category';
import TopHeader from './TopHeader';

const { Content } = Layout;

// DashBoard被包裹在Router中了：/router/index.js中
export default class DashBoard extends Component {
    componentDidMount(){
        // 传给自己的孩子
        // console.log(this.props.history);
    }

    // 使用antd：
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
		var roleType = JSON.parse(localStorage.getItem("userinfo")).roleType;
        return (
            <Layout style={ {height:"100%"} }>
                {/* 侧边栏 */}
                {/* <SiderMenu tohistory={this.props.history}></SiderMenu> */}
                <SiderMenu></SiderMenu>

                <Layout className="site-layout">
                    <TopHeader></TopHeader>
                    
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
							// minHeight:280,
                            minHeight: 'auto', //修改超出部分
                        }}
                    >
                        {/* 内容区 */}
                        <Switch>
                            {/* 首页 */}
                            <Route path="/home" component={Home}></Route>

                            {/* 用户管理--用户列表 */}
                            {
								roleType == 3
								? <Route path="/user/users" component={User}></Route>
								: null
							}

                            {/* 嵌套路由：rights模块--角色+权限 */}
                            {/* <Route path="/rights" component = {Rights}></Route> */}
                            {
								roleType == 3?
								<Route path="/rights" render={(props) =>
								// 这里的Rights不能直接拿到Route的属性，要在render中传给他，才能拿到
								    <Rights {...props}>
								        <Switch>
								            {/* 嵌套的子组件：这种写法，要在父组件中留出路由占位 */}
								            <Route path="/rights/role" component={Role}></Route>
								            <Route path="/rights/right" component={Right}></Route>
								            <Redirect from="/rights" to="/rights/role"></Redirect>
								        </Switch>
								    </Rights>
								}></Route>
								: null
							}

                            {/* 文章管理--文章列表 */}
                            <Route path="/article/list" component={List}></Route> 
							{/* 文章管理--添加文章 */}
                            <Route path="/article/create" component={Create}></Route>
							{/* 文章管理--修改文章 */}
                            <Route path="/article/update/:artid" component={Update}></Route>
                            {/* 文章管理--文章预览 */}
                            <Route path="/article/preview/:artid" component={Preview}></Route>
                            {/* 文章管理--文章分类 */}
                            {
								roleType > 1?
								<Route path="/article/category" component={Category}></Route>
								:null
							}

                            {/* 路由重定向：exact精确匹配 */}
                            <Redirect from="/" to="/home" exact></Redirect>

                            {/* 加上星号，匹配除了配置的路由外的所有路由 */}
                            <Route path="*" component={NotFound}></Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
