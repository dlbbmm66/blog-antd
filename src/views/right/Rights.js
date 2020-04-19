import React, { Component } from 'react'
// import Right from './Right'
// import Role from './Role'

// import {
//     Route
// } from 'react-router-dom'

import {Tabs} from 'antd'
const { TabPane } = Tabs;

export default class Rights extends Component {
    callback = (key)=> {
        // console.log(key);
        // console.log(this.props.match.params);
        this.props.history.push(key)
    }

    render() {
        return (
            <div>
                <Tabs activeKey={this.props.location.pathname} onChange={this.callback}>
                    <TabPane tab="角色列表" key="/rights/role">
						 {/*this.props.children*/}
                    </TabPane>
                    <TabPane tab="权限列表" key="/rights/right">
						 {/*this.props.children*/}
                    </TabPane>
                </Tabs>

                {/* 写法一：渲染子组件--相当于给子组件留个插槽 */}
                {this.props.children}

                {/* 写法2： */}
                {/* <Route path="/rights/role" component = {Role}></Route>
                <Route path="/rights/right" component = {Right}></Route> */}
            </div>
        )
    }
}
