import React, { Component } from 'react'
import axios from 'axios'

import RichEditor from '../article/RichEditor'

import { PageHeader,Steps,message,Button,Form,Input,Cascader } from 'antd';
const { Step } = Steps;

export default class Create extends Component {
	state = {
		current:0,
		categoryList:[],
		newArticles:{},
		contentEditor:""
	}
	
	componentDidMount(){
		axios.get("http://localhost:3001/categories").then(res=>{
			console.log(res.data)
			this.setState({
				categoryList:res.data
			})
		})
	}
	
    render() {
		const steps = [
		  {
		    title: '基本信息',
		    // content: <input type="text" />,
		    // content: 'First-content',
		  },
		  {
		    title: '文章内容'
		    // content: 'Second-content',
		  },
		  {
		    title: '提交文章'
		    // content: 'Last-content',
		  },
		]
		
		const layout = {
		  labelCol: { span: 4 }, //label占几份 共24份栅格
		  wrapperCol: { span: 20 }, // 内容占几份
		};
		
        return (
            <div>
				<PageHeader
					className="site-page-header"
					onBack={() => {
						// console.log(this.props.history);
						this.props.history.goBack();
					}}
					title="添加文章"
					// subTitle="This is a subtitle"
				  />
			
                {/* 进度条 */}
				<Steps current={this.state.current}>
					  {steps.map(item => (
						<Step key={item.title} title={item.title} />
					  ))}
				</Steps>
				
				{/* 进度条对应的内容 */}
				<div className="steps-content" style={
						{display: this.state.current == 0 ? 'block' : 'none'}
					}>
					
					<Form
						ref="addArticleForm"
						// layout="vertical" // 垂直布局
						{...layout}
						name="form_in_modal"
					  >
						<Form.Item
						  name="title"
						  label="文章标题"
						  rules={[{ required: true, message: '请输入标题!' }]}
						>
						  <Input />
						  
						</Form.Item>
						<Form.Item
							name="category"
							label="文章分类"
							rules={[{ required: true, message: '请选择分类!' }]}
						  >
							<Cascader fieldNames={{ label: 'title', value: 'value', children: 'children' }} options={this.state.categoryList} onChange={this.onCateChange} placeholder="Please select" />
						</Form.Item>
						
					  </Form>
				</div>
				<div className="steps-content" style={
						{display: this.state.current == 1 ? 'block' : 'none'}
				}>
				  {/* 将富文本封装成一个组件 子传父 */}
					<RichEditor getEditorContent={this.getEditorContent}></RichEditor> 
				</div>
				
				<div className="steps-action">
				          {this.state.current < steps.length - 1 && (
				            <Button type="primary" onClick={() => this.next()}>
				              下一步
				            </Button>
				          )}
				          {this.state.current === steps.length - 1 && (
				            <Button type="primary" onClick={this.handleSubmit}>
				              提交
				            </Button>
				          )}
				          {this.state.current > 0 && (
				            <Button style={{ margin: 8 }} onClick={() => this.prev()}>
				              上一步
				            </Button>
				          )}
				        </div>
            </div>
        )
    }
	
	// 提交添加文章：
	handleSubmit = ()=>{
		// var user = JSON.parse(localStorage.getItem(("userinfo")))
		let {username,roleType} = JSON.parse(localStorage.getItem(("userinfo")))
		console.log(this.state.newArticles,this.state.contentEditor)
		axios.post("http://localhost:3001/articles",{
			...this.state.newArticles,
			content:this.state.contentEditor,
			author:username,
			roleType:roleType
		}).then(res=>{
			console.log(res.data)
			this.props.history.push("/article/list")
		})
	}
	
	// 子传父--调用子时，绑定回调：
	getEditorContent = (editorContent)=>{
		console.log("父组件中的回调函数---",editorContent)
		this.setState({
			contentEditor:editorContent
		})
	}
	
	// 文章分类下拉菜单：
	onCateChange(e){
		console.log(e)
	}
	
	// 点击下一步时，进行表单校验：第二步的文章内容可以为空
	next () {
		if(this.state.current == 0){ //在第一步
			this.refs.addArticleForm.validateFields().then(values=>{
					console.log(values) //第一步时，输入的标题和分类
					this.setState({
						newArticles:values,
						current:this.state.current + 1
					})
			})
			
			// 校验失败：
			return;
		}
		this.setState({
			current:this.state.current + 1
		})
	  }

	  prev () {
		const current = this.state.current - 1;
		this.setState({ current });
	  }
}
