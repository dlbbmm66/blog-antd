import React, { Component } from 'react'
import axios from 'axios'

import store  from '../../redux/store'

import { Table, Tag } from 'antd';
import { connect } from 'react-redux';

// 权限组件：
// export default class Right extends Component {
class Right extends Component {
	
	state = {
		// 每一列显示的列名 
		columns: [
			{
				title:'#',
				dataIndex:'id',
				key:'id',
				// 在render中，可以自己处理显示的数据
				render:item=>{
					return <b>{item}</b>
				}
			},
		  {
		    title: '权限名称', //列名
		    dataIndex: 'title', //对应的是datalist中的属性名
		    key: 'title', //一定要有key，对应的是datalist中的属性名
		    render: text => <a>{text}</a>,
		  },
		  {
		    title: '权限等级',
		    dataIndex: 'grade',
		    key: 'grade',
			render: item => {
				console.log(item)
				let colors = ["green","orange","red"]
				
				return <Tag color={colors[item-1]}>{item}</Tag>
			}
		  },
		  {
		    // title: '权限等级',
		    // key: 'address',
		    // dataIndex: 'addressaddress'
		    // render: tags => (
		    //   <span>
		    //     {tags.map(tag => {
		    //       let color = tag.length > 5 ? 'geekblue' : 'green';
		    //       if (tag === 'loser') {
		    //         color = 'volcano';
		    //       }
		    //       return (
		    //         <Tag color={color} key={tag}>
		    //           {tag.toUpperCase()}
		    //         </Tag>
		    //       );
		    //     })}
		    //   </span>
		    // ),
		  }
		],
		
		// datalist: [],
		pageSize:5
	}

	// 使用redux进行ajax：管理异步状态，需要配合redux-promise中间件来解决异步编程问题
		// actions会立即执行，而ajax是异步的
		// action可以return一个promise对象
	// actions = ()=>{
	// 	// 使用redux-promise：action返回一个promise对象：
	// 	return axios.get("http://localhost:3001/rights").then(res=>{

	// 		console.log(res.data);
	// 	// 第一个then进行return之后，第二个then才能拿到数据：
	// 		return {
	// 			type:"setRightList",
	// 			payload:res.data
	// 		}
	// 	})


	// 	// return ()=>{ 
	// 	// 	//axios是基于promise封装的，本身就是个promise对象
	// 	// 	 axios.get("http://localhost:3001/rights").then(res=>{
	// 	// 		console.log(res.data)
	// 	// 		// 使用redux-promise：这里return一个对象，再下个then中拿到这个对象
	// 	// 		return {
	// 	// 			type:"setRightList",
	// 	// 			payload:res.data
	// 	// 		}

	// 	// 		// this.setState({
	// 	// 		// 	datalist:res.data
	// 	// 		// })

	// 	// 		// 请求成功之后：dispatch到store中：
	// 	// 		// dispatch({
	// 	// 		// 	type:"setRightList",
	// 	// 		// 	payload:res.data
	// 	// 		// })
	// 	// 	})
	// 	// }
	// }
	
	componentDidMount(){
		if (this.props.datalist.length === 0) {
			//immutable返回的是List对象，长度是size,并且取值的时候，要通过get属性取值
		// if (this.props.datalist.size === 0) { 
			// connect进行dispatch：ajax
			this.props.actions()
		} 
		// else {
		// 	this.setState({
		// 		datalist:this.props.datalist
		// 	})
		// }

		// if (store.getState().rightList.length === 0) {
		// 	store.dispatch(this.actions()).then(data=>{
		// 		this.setState({
		// 			datalist:store.getState().rightList
		// 		})
		// 	})
		// } else {
		// 	this.setState({
		// 		datalist:store.getState().rightList
		// 	})
		// }

		// redux-promise不需要监听/订阅：
		// this.unsubscribe = store.subscribe(()=>{
		// 	this.setState({
		// 		datalist:store.getState().rightList
		// 	})
		// })

		// axios.get("http://localhost:3001/rights").then(res=>{
		// 	console.log(res.data)
		// 	this.setState({
		// 		datalist:res.data
		// 	})
		// })
	}

	// componentWillUnmount(){
	// 	this.unsubscribe()
	// }
	
    render() {
        return (
            <div>
                {/* <Table columns={this.state.columns} dataSource={this.state.datalist} pagination={ {pageSize:this.state.pageSize} } /> */}
				<Table columns={this.state.columns} dataSource={this.props.datalist} pagination={ {pageSize:this.state.pageSize} } />
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
	console.log("store-rightList--",state.rightList);
	
	return {
		datalist:state.rightList.toJS() //转为普通对象，或者用size判断
		// datalist:state.rightList
	}
}

const mapDispatchToProps = {
	actions: ()=>{
		// 使用redux-promise：action返回一个promise对象：
		return axios.get("http://localhost:3001/rights").then(res=>{

			console.log(res.data);
		// 第一个then进行return之后，第二个then才能拿到数据：
			return {
				type:"setRightList",
				payload:res.data
			}
		})
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Right)
