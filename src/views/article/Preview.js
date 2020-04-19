import React, { Component } from 'react'
import axios from 'axios'

import {PageHeader} from 'antd'

// 在这个组件中，拿到传过来的id：
export default class Preview extends Component {
	state = {
		title:"",
		category:[],
		content:""
	}
	
    // 挂载完成生命周期：
    componentDidMount(){
        console.log("在预览组件，拿到传过来的id：",this.props.match.params.artid);
		axios.get(`http://localhost:3001/articles/${this.props.match.params.artid}`).then(res=>{
			console.log(res.data);
			let {title,category,content} = res.data
			this.setState({
				title,
				category,
				content
			})
		})
    }

    render() {
        return (
            <div>
                <PageHeader
                	className="site-page-header"
                	onBack={() => {
                		// console.log(this.props.history);
                		this.props.history.goBack();
                	}}
                	title={this.state.title} //预览的文章的标题
                	subTitle={this.state.category.join("/")} //预览的文章的分类
                  />
				  
				  {/* 显示的预览文章内容 */}
				  <div style={{ padding: "24px" }} dangerouslySetInnerHTML={{
				      __html:this.state.content
				  }}>
				     {/* {this.state.content} */}
				  </div>
            </div>
        )
    }
}
