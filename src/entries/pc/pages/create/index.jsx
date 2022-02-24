/**
 * 士兵页面
 *
 *
 */
import React, { memo, useState, useEffect } from 'react';
import { message, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import './index.scss';
import { add,getDetail } from '../../../../api/pet'
const Option = Select.Option
class ListData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id:"",
      name: "",
      image: null,
      category: null,
      price: "",
      desc: "",
      quantity: ""
    };
  }


  // detect whether the user has logged in
  componentWillMount() {
    if(this.props.match.params.id){
      this.loadData();
    }
    
  }

  async loadData() {
    console.log("res=====", this.props);
    let res = await getDetail({
      id: this.props.match.params.id
    });
    
    this.setState({
      id:res.id,
      name: res.name,
      image: res.image,
      category: res.category,
      price: res.price,
      desc: res.desc,
      quantity: res.quantity
    })

    // axios({
    //   method: 'get',
    //   url: 'http://localhost:8080/notelist',
    //   params: {
    //     userid: cookie.load("userId")
    //   }
    // })
    //   .then((response) => {
    //     this.setState({ msg: true, notelist: response.data });
    //   })
  }

  async submit() {
    const { id,name, image, price, desc, category, quantity } = this.state;

    let res = await add({
      id:id?id:new Date().getTime(),
      name, 
      image, 
      price, 
      desc, 
      category, 
      quantity
    });
    console.log("res=", res);
    // if (res.error) {
    //   message.error(res.error);
    // } else {
      this.props.history.push("/")
    // }
  }

  render() {
    const { name, image, price, desc, category, quantity } = this.state;
    const uploadProps = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      previewFile(file) {
        console.log('Your upload file:', file);
        // Your process logic. Here we just mock to the same file
        return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
          method: 'POST',
          body: file,
        })
          .then(res => res.json())
          .then(({ thumbnail }) => thumbnail);
      },
    };
    return (
      <div class="container">
        <div class="container-wrapper">
          <div class="caption">
            Create Product
          </div>
          <div class="row">
            <div>Product name</div>
            <input class="row-input" value={name} onChange={(event) => {
              this.setState({
                name: event.target.value
              })
            }} />
          </div>

          <div class="row">
            <div>Product Description</div>
            <input class="row-input" value={desc} onChange={(event) => {
              this.setState({
                desc: event.target.value
              })
            }} />
          </div>
          <div className='row-span'>
            <div class="row">
              <div>Category</div>
              <Select className="row-input" defaultValue={category} style={{ paddingLeft: 0, height: 40, border: "none" }} onChange={(value) => {
                this.setState({
                  category: value
                })
              }}>
                <Option value="book">book</Option>
                <Option value="phone">phone</Option>
                <Option value="shoes">
                  shoes
                </Option>
              </Select>
            </div>
            <div class="row" style={{ marginLeft: "20px" }}>
              <div>Price</div>
              <input class="row-input" value={price} onChange={(event) => {
                this.setState({
                  price: event.target.value
                })
              }} />
            </div>
          </div>

          <div className='row-span'>
            <div class="row">
              <div>In Stock Quantity</div>
              <input class="row-input" value={quantity} onChange={(event) => {
                this.setState({
                  quantity: event.target.value
                })
              }} />
            </div>
            <div class="row" style={{ marginLeft: "20px" }}>
              <div>Add Image Link</div>
              <div style={{ display: "flex", alignItems: "center", height: 40, border: "1px solid #eee" }}>
                <input class="row-input" style={{ border: "none", height: 30 }} value={image} onChange={(event) => {
                  this.setState({
                    image: event.target.value
                  })
                }} />
                <Upload {...uploadProps}>
                  <Button type='primary' style={{ marginLeft: "10px" }}>Upload</Button>
                </Upload>
              </div>
            </div>
          </div>
          <div className='image-preview'>
            <img style={{ width: 30, height: 30 }} src={require("../../../../images/image.png")} />
            <span style={{ marginTop: 10 }}>image preview!</span>
          </div>
          <div class="login-button" click="confirm" onClick={() => {
            this.submit();
          }}>Add Product</div>
        </div>
      </div>);
  }
};

export default ListData;
