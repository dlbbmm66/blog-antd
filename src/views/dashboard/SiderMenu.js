import React, { Component } from 'react'

// 引入react-redux的connect：
import {connect} from 'react-redux'

// 引入store，使用redux：
// 使用react-redux，不需要自己监听了：
// import store from '../../redux/store'

// 引入高阶组件--withRouter：为低阶组件提供属性
import {withRouter} from 'react-router'

// 引入antd：
import { Layout, Menu } from 'antd';

// 自定义样式组件：
import './DashBoard.css'

// 引入自定义菜单列表数据：
import Menus from '../../router/menu'

const { Sider } = Layout;
const { SubMenu } = Menu;


class SiderMenu extends Component {
    // 使用antd：
    // state = { 用了react-redux之后，自己不需要定义状态了
    //     collapsed: false,
    // };
	
	componentDidMount(){
        // 不需要自己订阅/监听了：
		// this.unsubscibe = store.subscribe(()=>{
        //     console.log("SideMenu 获取发布的状态---",store.getState())
        //     this.setState({
        //         collapsed:store.getState().isCollapsed
        //     })
        // })    
    }
    
    componentWillUnmount(){
        // 调用这个订阅返回的函数，就是取消订阅
        //  this.unsubscibe()
    }

    render() {
        console.log(this.props.location);
        var pathname = this.props.location.pathname;
        var openKeys = ["/" + pathname.split("/")[1]];
        
        return (
            
            <Sider trigger={null} collapsible 
            // collapsed={this.state.collapsed}>
            collapsed={this.props.isCollapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" 
                // defaultSelectedKeys={[pathname]}，这个属性只有第一次创建时才生效，并且不改变了，所以换成selectedKeys
                selectedKeys={[pathname]}
                defaultOpenKeys={openKeys} onClick={this.handleClick}>

                    {this.renderMenu(Menus)}

                    {/* 包含子菜单的导航：SubMenu */}
                </Menu>
            </Sider>
        )
    }

    // 点击菜单:
    handleClick = (arg)=>{
        console.log("点击菜单",arg.key);

        // 1、因为该组件的父亲不是Route，所以拿不到props下的属性：
            //用了withRouter之后，才有
        this.props.history.push(arg.key) 

        // 2、如果父组件的父亲是Route，那么父组件有props，所以所以，可以传给子：拿到父传过来的history：
        // this.props.tohistory.push(arg.key)  //如果父组件也没有，那么就用干爹组件--WithRouter

    }

    // 渲染菜单：要根据用户权限roleType，显示相应菜单
    renderMenu = (Menus)=>{
        return Menus.map(item=>{
			// 有的菜单中有子菜单：
				// 获取此时登录用户的信息--的得到其身份：
				var roleType = JSON.parse(localStorage.getItem("userinfo")).roleType;
                if (item.children) {
					if(item.permission > roleType){
						return null;
					}
					return <SubMenu
						key={item.path}
						title={
						<span>
							<item.icon/>
							<span>{item.title}</span>
						</span>
						}
					>
						{this.renderMenu(item.children)}
					</SubMenu>
				
                } else {
					if(item.permission > roleType){
						return null;
					}
                    return (<Menu.Item key={item.path}>
                        <item.icon/>
                        <span>{item.title}</span>
                    </Menu.Item>)
                }
            }
        )
    }
}

//被withRouter包裹之后，在导出：
// export default withRouter(SiderMenu)

const mapStateToProps = (state)=>{ //store中定义的oldState
    // 返回这个属性对象，传给子组件：
    return {
        // 拿到相应组件需要的状态，传给SiderMenu
        isCollapsed:state.isCollapsed
    }
}
export default withRouter(connect(mapStateToProps)(SiderMenu)) //处理订阅者

/* 
connect类似于这样：
    function connect(){
        return function(){

        }
    }

*/
