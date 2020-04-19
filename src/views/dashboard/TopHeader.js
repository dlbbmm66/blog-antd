import React, { Component } from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

// 不需要自己dispatch了：
// import store from '../../redux/store'

// 引入antd：
import { Layout,Dropdown,Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
	DownOutlined
} from '@ant-design/icons';
const { Header } = Layout;

class TopHeader extends Component {

    // 使用antd：
    state = {
        collapsed: false,
    };
	
	// 下拉菜单的项：
	// menu = (<Menu>
 //    <Menu.Item>
 //      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
 //        1st menu item
 //      </a>
 //    </Menu.Item>
 //    <Menu.Item>
 //      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
 //        2nd menu item
 //      </a>
 //    </Menu.Item>
 //    <Menu.Item>
 //      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
 //        3rd menu item
 //      </a>
 //    </Menu.Item>
 //  </Menu>);

	// 一点击缩放按钮：就控制侧边栏缩放
    toggle = (isCollapsed) => {
		console.log("点击TopHeader");
        this.setState({
            collapsed: !this.state.collapsed,
        });
		
		// 发布状态改变：一调用完dispatch，就会把其对象参数传到store中，被reducer函数接收
		// store.dispatch({
		// 	// 根据不同的类型，做不同的函数处理：
		// 	type:"sideMenuCollapsed",
		// 	// 这里是触发改变时，传过来的参数
		// 	payload:isCollapsed
		// });

		// store.dispatch(this.actions(isCollapsed)); 用react-redux
		this.props.actions(isCollapsed)
	};
	
	// actions = (isCollapsed)=>{
	// 	return {
	// 		// 根据不同的类型，做不同的函数处理：
	// 			type:"sideMenuCollapsed",
	// 		// 	// 这里是触发改变时，传过来的参数
	// 			payload:isCollapsed
	// 	}
	// }
	
	exit = ()=>{
		localStorage.setItem("isLogin",false);
		localStorage.setItem("userinfo",JSON.stringify({}));
		this.props.history.push("/login")
	}

    render() {
		var user = JSON.parse(localStorage.getItem(("userinfo")))
		const menu = (
		<Menu>
		  <Menu.Item>
		    <div>{user.roleName}</div>
		  </Menu.Item>
		  <Menu.Item>
		    <div onClick={this.exit}>退出</div>
		  </Menu.Item>
		</Menu>);
		
        return (
            <Header className="site-layout-background" style={{ padding: 0 }}>
            {/* 相当于返回了一个标签元素（bable-loder会把jsx的元素标签React.createElement） */}
                {/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                })} */}

                {/* 上面的代码相当于以下： */}
                {
                    this.state.collapsed ?
					<MenuUnfoldOutlined onClick={()=>this.toggle(false)}/>
					:
					<MenuFoldOutlined onClick={()=>this.toggle(true)}/>
                }
				
				{/* 下拉菜单： */}
				<Dropdown overlay={menu}>
					<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
					  Hover me <DownOutlined />
					</a>
			    </Dropdown>
				欢迎你,{user.username}
            </Header>
        )
    }
}

const mapStateToProps = ()=>{
	return {

	}
}

// 将方法映射成属性：
const mapDispatchToProps = {
	// 回调函数：
	// a(){

	// }
	actions:(isCollapsed)=>{
		return {
			// 根据不同的类型，做不同的函数处理：
				type:"sideMenuCollapsed",
			// 	// 这里是触发改变时，传过来的参数
				payload:isCollapsed
		}
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TopHeader)) //处理发布者
