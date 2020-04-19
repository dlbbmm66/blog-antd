import React, { Component } from 'react'
import axios from 'axios'

import {Table,Switch,Button,Modal,Form,Input,Select,message} from 'antd'
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
const { Option } = Select;

export default class User extends Component {
	state = {
		columns: [
		    { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
		    { title: '用户名', dataIndex: 'username', key: 'username' },
		    { title: '用户状态', dataIndex: 'roleState', key: 'roleState',
				 render:(data,item)=>{
					 console.log(data)
					 console.log(item)
					 return <Switch onClick={(checked)=>{
							this.onSwitchChange(checked,item)
							// this.onSwitchChange(checked,item.id)
						}} defaultChecked={data} disabled={item.default}></Switch>
				 }
			 },
		    {
		        title: '操作',
		        dataIndex: '',
		        key: 'x',
		        render: (item) => {
					console.log("item--",item)
					return <div>
						<Button onClick={()=>{this.handleUpdate(item.id)}} type="primary" shape="circle" icon={<EditOutlined />} disabled={item.default} />
						&nbsp;
						<Button onClick={()=>this.handleDelete(item.id)} type="danger" shape="circle" icon={<DeleteOutlined />} disabled={item.default} />
				</div>}
		    }
		],
		datalist: [],
		
		visible:false,
		visibleUpdate:false,
		
		roleType:1,
		
		updateForm:null
	}
	
	componentDidMount(){
		axios.get("http://localhost:3001/users").then(res=>{
			console.log(res.data);
			this.setState({
				datalist:res.data
			})
		})
	}
	
	// 用户状态开关：
	onSwitchChange = (checked,useritem)=>{
		// console.log("eeee111---",this)
		console.log("checked---",checked,useritem)
		axios.put(`http://localhost:3001/users/${useritem.id}`,{
			...useritem,
			roleState:checked //覆盖老的roleState
		})
	}
	
	// 删除：
	handleDelete = (id)=>{
		console.log("id--",id)
		axios.delete(`http://localhost:3001/users/${id}`).then(res=>{
			console.log("删除用户成功")
			this.setState({
				datalist:this.state.datalist.filter(item=>item.id != id)
			})
			
			message.success("删除成功")
		})
	}
	
	// 添加用户--点击确认按钮，获取到输入框内容，触发校验
	handleAdd = ()=>{
		this.setState({
			visible:true
		});
	}	
	handleAddOk = () => {
	    console.log("AddOK");
		console.log("addUser--",this.refs.addUser)
		this.refs.addUser.validateFields()
          .then(values => {
			  // 校验成功，返回给后端：
            // form.resetFields();
            // onCreate(values);
			console.log(values); // values中是将输入的东西返回成对象
			console.log({...values , roleType:this.state.roleType , roleState:false}) //默认为false
			
			// 重置表单，下次在再进来，就不会有上次留下的数据了
			this.refs.addUser.resetFields();
			
			// ajax提交到后台：
			axios.post("http://localhost:3001/users",{
				...values , roleType:this.state.roleType , roleState:false
			}).then(res=>{
				console.log("111",res.data)
				// ajax成功之后：隐藏弹出框，更新datalist
				this.setState({
				  visible: false,
				  datalist:[...this.state.datalist,res.data]
				});
			})
		  })
          .catch(info => {
			  // 校验失败：
            console.log('Validate Failed:', info);
          });
	  };
	  
	  // 修改用户：根据这个id取出相应的原数据（1、ajax取；2、或者根据id从datalist中过滤对应数据）
	  handleUpdate = (id)=>{
		  // this.setState({
		  // 	visibleUpdate:true
		  // })
		  
		  // console.log("update id---",id)
		  // 设置一个状态，让状态更新，渲染Form时传入：赋给表单组件的initialValues属性,
			// 让表单第一次打开时，就能显示数据，不报错
		  var updateOldData = this.state.datalist.filter(item=>item.id == id)
		  this.setState({
			  updateForm:updateOldData[0],
			  visibleUpdate:true,
			  roleType:updateOldData[0].roleType
		  })
		  console.log("updateForm",this.updateForm) //返回的是一个数组
		  
		  // 将Form组件中的ref替换：调用该组件的方法setFieldsValue,
			// 这里不能直接用setFieldsValue，因为setState是异步的，会导致表单还未创建完，所以拿不到setFieldsValue
		  // this.refs.updateUser && this.refs.updateUser.setFieldsValue({
			 //  username:updateOldData[0].username,
			 //  password:updateOldData[0].password,
			 //  roleName:updateOldData[0].roleName
		  // })
		  
		  // 解构赋值：
		  let {username,password,roleName} = updateOldData[0]
		  // 第一次之后，每次再打开，就能正常显示了
		  this.refs.updateUser && this.refs.updateUser.setFieldsValue({
			  username,
			  password,
			  roleName
		  })
		  
		  
	  }
	  // 点击确认进行输入校验，校验成功 再进行ajax
	  handleUpdateOk = ()=>{
		  this.refs.updateUser.validateFields().then(values=>{
			  console.log("values",values)
			  axios.put(`http://localhost:3001/users/${this.state.updateForm.id}`,{
				  ...this.state.updateForm,
			  	  ...values, 
				  roleType:this.state.roleType
							
			  }).then(res=>{
				  var newList = this.state.datalist.map(item=>{
					  if(item.id == this.state.updateForm.id){
						  return res.data;
					  }else{
						  return item
					  }
				  })
			  	  this.setState({ 
					  visibleUpdate:false,
					  // 更新datalist：
						// 深复制datalist，再splice替换成新数据；
						// 或者：定义一个新的arr，用map
					  datalist:newList
				  })	  
			  })
		  })
	  }
	
	// onCancel={this.handleCancel}
	  // handleCancel = e => {
	  //   console.log(e);
	  //   this.setState({
	  //     visible: false,
	  //   });
	  // };
	  
	  // 一选择，就拿到select下拉列表中value属性的值：
		// 根据选择的角色，动态的给其设置相应的roleType值：1，2，3
			// 然后再同步到数据库中
	  onSelectChange = (val)=>{
		  var roles = ["小编","管理员","超级管理员"]
		  this.setState({
			  roleType:roles.indexOf(val) + 1
		  })
	  }
	
    render() {
        return (
            <div>
				<Button type="primary" onClick={this.handleAdd}>添加用户</Button>
				<Table rowKey={item=>{
					return item.id
				}}
					columns={this.state.columns}
					dataSource={this.state.datalist}
				 />
				 
				 {/* 添加用户的模态框 */}
				 <Modal
				   title="添加用户"
				   visible={this.state.visible}
				   onOk={this.handleAddOk}
				   onCancel={()=>{
					   this.setState({
					   		visible:false
					   })
				   }}
				 >
					<Form
							ref="addUser"
					        layout="vertical"
					        name="form_in_modal"
					      >
					        <Form.Item
					          name="username"
					          label="用户名"
					          rules={[{ required: true, message: '请输入用户名!' }]}
					        >
					          <Input />
							  
					        </Form.Item>
							<Form.Item
							    name="password"
							    label="密码"
							    rules={[{ required: true, message: '请输入密码!' }]}
							  >
							    <Input type="password" />
					        </Form.Item>
							
							<Form.Item
							    name="roleName"
							    label="角色"
							    rules={[{ required: true, message: '请选择角色!' }]}
							  >
								<Select
									showSearch
									style={{ width: 200 }}
									placeholder="Please select"
									optionFilterProp="children" 
									onChange={this.onSelectChange} // 拿到下拉列表选中的
									// onFocus={onFocus}
									// onBlur={onBlur}
									// onSearch={onSearch}
									// filterOption={(input, option) =>
									//   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									// }
								  >
									<Option value="超级管理员">超级管理员</Option>
									<Option value="管理员">管理员</Option>
									<Option value="小编">小编</Option>
									{/*<Option value="3">超级管理员</Option>
									<Option value="2">管理员</Option>
									<Option value="1">小编</Option>*/}
								</Select>
							
							</Form.Item>
							
					      </Form>
						 </Modal>
						 
						 {/* 修改用户的模态框 */}
						 <Modal
						   title="修改用户"
						   visible={this.state.visibleUpdate}
						   onOk={this.handleUpdateOk}
						   onCancel={()=>{
							   this.setState({
								   visibleUpdate:false
							   })
						   }}
						 >
							<Form
								ref="updateUser"
								layout="vertical"
								name="form_in_modal2"
								initialValues={this.state.updateForm}
							  >
								<Form.Item
								  name="username"
								  label="用户名"
								  rules={[{ required: true, message: '请输入用户名!' }]}
								>
								  <Input />
								  
								</Form.Item>
								<Form.Item
									name="password"
									label="密码"
									rules={[{ required: true, message: '请输入密码!' }]}
								  >
									<Input type="password" />
								</Form.Item>
								
								<Form.Item
									name="roleName"
									label="角色"
									rules={[{ required: true, message: '请选择角色!' }]}
								  >
									<Select
										showSearch
										style={{ width: 200 }}
										placeholder="Please select"
										optionFilterProp="children" 
										onChange={this.onSelectChange} // 拿到下拉列表选中的
										// onFocus={onFocus}
										// onBlur={onBlur}
										// onSearch={onSearch}
										// filterOption={(input, option) =>
										//   option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										// }
									  >
										<Option value="超级管理员">超级管理员</Option>
										<Option value="管理员">管理员</Option>
										<Option value="小编">小编</Option>
										{/*<Option value="3">超级管理员</Option>
										<Option value="2">管理员</Option>
										<Option value="1">小编</Option>*/}
									</Select>
								
								</Form.Item>
							  </Form>
							 </Modal>
						 
            </div>
        )
    }
}
