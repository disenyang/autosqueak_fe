/**
 * 士兵页面
 *
 *
 */
import React, { memo, useState, useEffect } from 'react';
import { Form, Upload, Row, Col, Radio, Table, Input, Button, Select, Modal, DatePicker } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { FormOutlined, UploadOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { List, message, Avatar, Spin } from 'antd';
import './index.scss';
import { register} from '../../../../api/pet'

class ListData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      cpassword:"",
      name:"",
    };
  }

  async submit(){
    const {email,password,name} = this.state;
    if(!email){
      message.error("请输入邮箱");
      return;
    }
    if(!password){
      message.error("请输入密码");
      return;
    }
    let res = await register({
      email,
      password,
      name,
    });
    console.log("res=",res);
    // if(res.error){
    //   message.error(res.error);
    // }else{
      message.success("注册成功");
      this.props.history.push("/login")
    // }
  }
  render() {
    const {email,password,cpassword,name} = this.state;
    return (
      <div class="reg-container">
        <div class="container-wrapper">
          <div class="caption">
            Sign up an account
          </div>
          <div class="email">
            <div>Email</div>
            <input class="email-input" placeholder="Input email"  value={email} onChange={(event)=>{
              this.setState({
                email:event.target.value
              })
            }}  />
          </div>
          <div class="password">
            <div>Password</div>
            <input class="password-input" type="password" placeholder="Input password"  value={password} onChange={(event)=>{
              this.setState({
                password:event.target.value
              })
            }}  />
          </div>
          <div class="confirm-button" click="confirm" onClick={()=>{
            this.submit();
          }}>Confirm</div>
          <div class="tail"><div class="right" onClick={() => {
            this.props.history.push("/login")
          }}>Login</div></div>
        </div >
      </div >);
  }
};

export default ListData;
