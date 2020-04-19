import React, { Component } from 'react'

// 富文本
import { Editor } from 'react-draft-wysiwyg'; //使用的组件
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { EditorState, ContentState } from 'draft-js';

export default class RichEditor extends Component {
	state = {
	    editorState: "", //同步编辑器状态
		contentState:"" //同步输入的内容
	}
	
	componentDidMount(){ // 只走一次，第一次content为空
	// componentWillReceiveProps(){
		
		if(!this.props.content) {
		    return;
		}// Create组件创建文章时候，没有传入content, 因为不是父传子，所以此时undefined ,不处理
		
		// const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
		const html = this.props.content;
		// 将html转为draft可识别的：
		const contentBlock = htmlToDraft(html);
		if (contentBlock) {
			  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
			  const editorState = EditorState.createWithContent(contentState);
			  this.setState({
					editorState
			  })
		}
	}
	  
    render() {
        return (
            <div>
				{/* {this.props.content} */}
                <Editor
                  editorState={this.state.editorState}
                  // toolbarClassName="toolbarClassName"
                  // wrapperClassName="wrapperClassName"
                  // editorClassName="editorClassName"
                  onEditorStateChange={this.onEditorStateChange}
                  onContentStateChange={this.onContentStateChange}
				  onBlur = {()=>{
					  // 富文本失去焦点时，再把输入的内容传给父，提高性能：
					  this.props.getEditorContent(draftToHtml(this.state.contentState))
				  }}
                />
            </div>
        )
    }
	
	onEditorStateChange = (editorState) => {
		this.setState({
		  editorState
		  // editorState: editorState
		});
		// console.log(editorState)
    };
	
	// 这个函数里有我们输入的内容
	onContentStateChange = (contentState)=>{
		this.setState({
			// contentState:contentState
			contentState
		})
	}
}
