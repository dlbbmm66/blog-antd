import React, { Component } from 'react'
import axios from 'axios'

import { Table,Button } from 'antd'
import { EditOutlined,DeleteOutlined,LaptopOutlined } from '@ant-design/icons';

class List extends Component {
    state = {
        articleList:[],
		columns:[
			{ title: '文章标题', dataIndex: 'title', key: 'title' },
			{ title: '文章作者', dataIndex: 'author', key: 'author' },
			{ title: '文章分类', dataIndex: 'category', key: 'category',
				// 处理分类的显示：娱乐/明星 
				render:(item)=>{
					console.log("itemlist---",item)
					return <div>{item.join("/")}</div>
				}
			},
			{
			    title: '操作',
			    dataIndex: '',
			    key: 'x',
			    render: (item) => {
					console.log("item--",item.id)
					return <div>
						<Button onClick={()=>this.handlePreview(item.id)} shape="circle" icon={<LaptopOutlined />}  />
						&nbsp;
						<Button onClick={()=>this.handleUpdate(item.id)} type="primary" shape="circle" icon={<EditOutlined />}  />
						&nbsp;
						<Button onClick={()=>this.handleDelete(item.id)} type="danger" shape="circle" icon={<DeleteOutlined />} />
				</div>}
			}
		]
    }
	// 预览：
	handlePreview = (id)=>{
		console.log("跳到预览",id)
		this.props.history.push(`/article/preview/${id}`)
	}
	
	// 修改文章：将其设置为动态路由，传参
	handleUpdate = (id)=>{
		this.props.history.push(`/article/update/${id}`)
	}
	
	handleDelete = (id)=>{
		console.log("delete id---",id);
		axios.delete(`http://localhost:3001/articles/${id}`).then(res=>{
			console.log("删除文章成功");
			this.setState({
				// 更新视图：
				articleList:this.state.articleList.filter(item => item.id != id)
			})
		})
	}
	
	componentDidMount(){
		axios.get("http://localhost:3001/articles").then(res=>{
			console.log(res.data);
			this.setState({
				articleList:res.data
			})
		})
	}
	
    render() {
        return (
            <div>
				<Button onClick={this.handleToAdd} type="primary">添加文章</Button>
                {/* 点击某文章，跳到其详情预览 */}
                <Table columns={this.state.columns} dataSource={this.state.articleList}
					rowKey={item=>{
						return item.id
					}}
				/>
            </div>
        )
    }
	
	handleToAdd = ()=>{
		this.props.history.push("/article/create")
	}

    handleClick = (id)=>{
        console.log(id);
        // this.props是父组件传过来的属性：这里的父就是Route组件
        console.log(this.props);
        
        // 编程式导航---跳转到详情页面：要传id过去
        this.props.history.push(`/article/preview/${id}`)
    }
}

export default List
