import React, { Component } from 'react'
import { Table,Button ,Tag} from 'antd';
import axios from 'axios'

import store from '../../redux/store'

import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

class Role extends Component {
    state = {
        columns: [
            { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: () => <div>Delete</div>,
            }
        ],
        // datalist: []

    }
    componentDidMount() {
        if (this.props.datalist.length === 0) {
            this.props.actions()
        }

        // 用redux做数据缓存：如果store中已经有这个异步数据了，
            // 就直接用，不需要再次ajax了，否则就先进行ajax请求数据
        // if (store.getState().roleList.length == 0) {
        //     // 进行ajax
        //     store.dispatch(this.actions())
        // } else {
        //     this.setState({
        //         datalist:store.getState().roleList
        //     })
        // }

        // 订阅这个action，监听store中的值是否变化，第一次就能拿到store中的数据：
        // this.unsubcribe = store.subscribe(()=>{
        //     console.log("订阅角色列表");
        //     this.setState({
        //         datalist:store.getState().roleList
        //     })
        // })

        // axios.get("http://localhost:3001/roles").then(res => {
        //     console.log(res.data)
        //     this.setState({
        //         datalist: res.data
        //     })
        // })
    }

    // componentWillUnmount(){
    //     this.unsubcribe()
    // }

    // 使用redux进行ajax：管理异步状态，需要配合redux-thunk中间件来解决异步编程问题
        // actions会立即执行，而ajax是异步的
    // actions = ()=>{
    //     // action返回一个函数，交给中间件处理
    //     return (dispatch)=>{
    //         axios.get("http://localhost:3001/roles").then(res => {
    //             console.log(res.data)
    //             // this.setState({
    //             //     datalist: res.data
    //             // })

    //             // ajax结束之后，自己把数据dispatch到store的reducer中
    //             dispatch({
    //                 type:"setRoleList",
    //                 payload:res.data
    //             })
    //         })
    //     }
    // }

    render() {
        return (
            <Table
                columns={this.state.columns}
                dataSource={this.props.datalist}
                rowKey= {item=>{
                    // console.log(item)
                    return item.id
                }} //设置key值
                
                //配置展开属性
                expandable={{
					// 额外的展开行
                    expandedRowRender: record => {
                        console.log(record)
                        return <div style={{ margin: 0 }}>
                        {
							// 根据请求回的数据结构，遍历两次：record.roleRight和item.list
                            record.roleRight.map(item=>
                               <div key={item.category}>
                                   {/* <h3>{item.category}:</h3> */}
                                   {
                                       item.list.map(data=>
                                        <Tag color={"green"} key={data}>{data}</Tag>
                                        )
                                   }
                               </div> 
                            )
                        }
                    </div>
                    },
                    // rowExpandable: record => true, 允许展开，默认也是true
                }}
               
            />
        )
    }
}

const mapStateToProps = (state)=>{
    console.log("state---",state);
    
    return {
        datalist:state.roleList
    }
}

const mapDiapatchToProps = {
    actions: ()=>{
        // action返回一个函数，交给中间件处理
        return (dispatch)=>{
            axios.get("http://localhost:3001/roles").then(res => {
                console.log(res.data)
                // this.setState({
                //     datalist: res.data
                // })

                // ajax结束之后，把数据dispatch到store的reducer中
                dispatch({
                    type:"setRoleList",
                    payload:res.data
                })
            })
        }
    }
}

export default connect(mapStateToProps,mapDiapatchToProps)(Role)
