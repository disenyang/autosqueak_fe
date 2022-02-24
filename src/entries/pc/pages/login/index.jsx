/**
 * 士兵页面
 *
 *
 */
import React, { memo, useState, useEffect } from 'react';
import { message } from 'antd';

import './index.scss';
import { login} from '../../../../api/pet'

class ListData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:""
    };
  }

  async submit(){
    const {email,password} = this.state;
    let res = await login({
      email,
      password
    });
    console.log("res=",res);
    if(!res){
      message.error("username or password is not correct");
    }else{
    //   localStorage.setItem("token","Bearer "+res.token);
      localStorage.setItem("user",JSON.stringify({
        email,
        password
      }))
      this.props.history.push("/")
    }
  }

  render() {
    const {email,password} = this.state;

    return (
      <div class="container">
        <div class="container-wrapper">
          <div class="caption">
            Sign in to your account
          </div>
          <div class="email">
            <div>Email</div>
            <input class="email-input" placeholder="Input Email" value={email} onChange={(event)=>{
              this.setState({
                email:event.target.value
              })
            }} />
          </div>
          <div class="password">
            <div>Password</div>
            <input class="password-input"  type="password" placeholder="Input Password" value={password} onChange={(event)=>{
              this.setState({
                password:event.target.value
              })
            }}  />
          </div>
          <div class="login-button" click="confirm" onClick={()=>{
            this.submit();
          }}>Login</div>
          <div class="tail">
            <div class="left">Don’t have an account?
             <a onClick={()=>{
              this.props.history.push("/register")
            }}>Sign up</a></div>
             <a class="right" onClick={()=>{
              this.props.history.push("/updatepwd")
            }}>Forgot password?</a>
          </div>
        </div>
      </div>);
  }
};

export default ListData;
