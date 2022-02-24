import React from 'react';
import { Form, Upload, Row, Col, Table, Input, Button, Select, Modal, DatePicker, message } from 'antd';
import {CloseOutlined } from '@ant-design/icons';

import env from '../../../../config/config';
import { delCart, getCartList} from '../../../../api/pet'
import "./index.scss";

const moment = require("moment");
const { Search } = Input;
const { prefix } = env

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const { Option } = Select;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const formRef = React.createRef();
const $ = require("jquery");

var rows = [];
const goodList = [
  {
    id:"nihoo",
    name:"Apple iPhone 11, 128G",
    image:"https://img1.baidu.com/it/u=3809066891,839766530&fm=253&fmt=auto&app=120&f=JPEG?w=650&h=447",
    price:200.00,
  },
  {
    id:"nihoo22",
    name:"Apple iPhone 11, 128G",
    image:"https://img1.baidu.com/it/u=3809066891,839766530&fm=253&fmt=auto&app=120&f=JPEG?w=650&h=447",
    price:200.00,
  }
];
class NoteList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      objItem: {},
      searchValue: '',
      list: [],
      price:0
    }

  }

  // detect whether the user has logged in
  componentWillMount() {
    this.loadData();
  }

  async search() {
    const { searchValue } = this.state;

    let res = await getCartList({
      searchValue
    });

    console.log("list=====", res);
    this.setState({
      list: res.contact(res)
    })
  }

  async del(index) {
    const { list } = this.state;

    let res = await delCart(
      list[index].id
    );
    list.splice(index,1);
    this.computerPrice();
  }

  computerPrice(){
    const { list } = this.state;
    let p;
    if(list.length===1){
      p = list[0].price*list[0].num
    }else if(list.length===0){
      p = 0;
    }else{
      p = list.reduce((item1,item2)=>{
        

        if(!item2){
          return item1.price*item1.num;
        }else {
          let p1 = 0;
          let p2 = 0;
          if(item1.price){
            p1 = item1.price*item1.num;
          }
          if(item2.price){
            p2 = item2.price*item2.num;
          }
          console.log("item2==",item2,p1,p2);
          return p1 + p2
        }
        
      });
    }
    this.setState({
      price:p
    })

  }

  async loadData() {
    let res = await getCartList({

    });
    console.log("list=====", res);
    this.state.list = res;
    this.computerPrice();
  }

  render() {
    const { showCreateBlankNote, isModalVisible, update, objItem, searchValue,price } = this.state;
    console.log("this.state.list",this.state.list);
    // let list = this.state.list.concat(goodList);
    let list = this.state.list;

    let user = null;
    if(localStorage.getItem("user")){
      user = JSON.parse(localStorage.getItem("user"));
    }
    const uploadProps = {
      name: 'file',
      action: prefix + '/uploadfile',
      headers: {
        authorization: 'authorization-text',
      },
      onChange: (info) => {
        console.log("info", info);
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {

          this.setState({
            Hosted: {
              thumbnail: `/${info.file.response}`,
              id: this.state.Hosted.id
            }
          })
          message.success(`file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <div className='shopping-cart' style={{ backgroundColor: "#E4E5E7", height: "100%", boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', height: "100%" }}>
          {/* <div style={{ width: '200px', }}>

            <div style={{ marginTop: "80px" }}>
              {folders.map((item) => {
                return (<div onClick={()=>{
                  this.setState({
                    selectedFolder:item.name
                  })
                }} style={{ display: 'flex',padding:"10px", cursor:"pointer", alignItems: 'center', height: '50px',backgroundColor:selectedFolder===item.name?'#BCBFC4':"" }}>
                  <img alt="" height="20px" src="/folder.jpg" /><span style={{ fontSize: '13px', marginLeft: "10px" }}>{item.name}</span>
                </div>)
              })}
            </div>
          </div> */}
          <div style={{ flex: "1", backgroundColor: "#ffffff", height: "100%" }}>
            <div style={{ display: "flex", alignItems: 'center', justifyContent: "flex-end", height: "100px", borderBottom: "1px solid #cccccc", padding: "10px" }}>
              <div style={{ color: "#222222", fontSize: "25px", fontWeight: "bold", flex: 1, cursor: "pointer" }} onClick={() => {
                this.props.history.push("/");
              }}>
                shopping cart
              </div>
              
            </div>
            <div style={{ padding: 10 }}>
              <div className="shopping-cart-list">
                {list.map((row,index) => {
                  return (<div className="item">
                    <div className="item-image">
                      <img src={row.image?row.image:'https://img1.baidu.com/it/u=3809066891,839766530&fm=253&fmt=auto&app=120&f=JPEG?w=650&h=447'}></img>
                    </div>
                    <div className="item-content">
                      <div className="item-title">{row.name}</div>                      
                    </div>
                    <div className="item-price">${row.price}</div>
                    <div className="item-count">
                      <button className='mul-button' onClick={(event) => {
                        event.stopPropagation();
                        row.num--;
                        this.computerPrice();
                      }}>-</button>
                      <input value={row.num} onChange={(event)=>{
                        row.num = event.target.value;
                        this.computerPrice();
                      }} style={{width:60,height:30,border:"1px solid #6565ff",outline:"none",textAlign:"center"}}></input>
                      <button className='add-button' onClick={(event) => {
                        row.num++;
                        this.computerPrice();
                      }}>+</button>

                      <button className='del-button' onClick={(event) => {
                        this.del(index);
                      }}><CloseOutlined /></button>
                    </div>
                  </div>);
                })}

              </div>

              <div className='total-price'>total price:{price}</div>

            </div>
          </div>
        </div>
      </div>


    )
    // } else {
    //   return (
    //     <div>
    //       <h1>Note List</h1>
    //     </div>
    //   )
    // }

  }
}
export default NoteList;