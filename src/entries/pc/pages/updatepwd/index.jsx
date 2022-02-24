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
    let res = await register({
      email,
      password,
      name,
    });
    console.log("res=",res);
    if(res.error){
      message.error(res.error);
    }else{
      this.props.history.push("/login")
    }
  }
  render() {
    const {email,password,cpassword,name} = this.state;
    return (
      <div class="reg-container">
        <div class="container-wrapper">
          <div class="caption">
            pdate your password
          </div>
          <div class="desc">
            Enter your email link, we will send you the recovery link
          </div>
          <div class="email">
            <div>Email</div>
            <input class="email-input"  value={email} onChange={(event)=>{
              this.setState({
                email:event.target.value
              })
            }}  />
          </div>
          <div class="confirm-button" click="confirm" onClick={()=>{
            this.submit();
          }}>Update password</div>
          
        </div >
      </div >);
  }
};

export default ListData;
