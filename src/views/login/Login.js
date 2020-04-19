import React, { Component } from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import axios from 'axios'
export default class Login extends Component {

    componentDidMount() {
        // console.log(window.innerHeight)
    }   
    
    onFinish = values => {
        console.log('Received values of form: ', values);
        //ajax .存在用户名密码， 登录成功
        // localStorage.setItem("isLogin",true)
        // this.props.history.push('/')

        // get获取:
        axios.get(`http://localhost:3001/users?username=${values.username}&password=${values.password}&roleState=true`).then(res=>{
            console.log(res.data.length)
            if (res.data.length > 0) {
                localStorage.setItem("isLogin",true)
                localStorage.setItem("userinfo",JSON.stringify(res.data[0]))
                this.props.history.push("/")
            } else {
                localStorage.setItem("isLogin",false)
                alert("用户名或密码错误")
            }
        })

        // post 添加
        // axios.post("http://localhost:8000/list",{
        //     text:"ddd"
        // }).then(res=>{
        //     console.log(res.data)
        // })

        // put 更新
        // axios.put("http://localhost:8000/list/2",{
        //     text:"修改了"
        // }).then(res=>{
        //     console.log(res.data)
        // })

        // delete 删除
        // axios.delete("http://localhost:8000/list/2").then(res=>{
        //     console.log(res.data)
        // })
    }  
    
    render() {
        return (
            <div style={{background: 'rgb(35, 39, 65)',height:"100%"}}>

            <Form
                name="normal_login"
                className="login-form"
                // initialValues={{ username: "111111" }} // 初始值
                onFinish={this.onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入你的用户名' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入你的密码' }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                    </Button>
                </Form.Item>
                </Form>
            </div>
        )
    }
}
