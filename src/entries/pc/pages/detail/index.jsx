import React from 'react';
import { Form, Upload, Row, Col, Table, Input, Button, Select, Modal, DatePicker, message } from 'antd';
import { FormOutlined, UploadOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import env from '../../../../config/config';
import { getList, saveObj, updateObj, book, getDetail } from '../../../../api/pet'
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

class NoteList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      objItem: {},
      searchValue: '',
      list: [],
      detail: {}
    }

  }

  // detect whether the user has logged in
  componentWillMount() {

    this.loadData();
  }

  async loadData() {
    console.log("res=====", this.props);
    let res = await getDetail({
      id: this.props.match.params.id
    });
    
    this.setState({
      detail: res
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

  // deleteNote(noteId){
  //   axios({
  //     method: 'get',
  //     url: 'http://localhost:8080/deleteNote',
  //     params: {
  //       noteId: noteId
  //     }
  //   })
  //     .then((response) => {
  //       this.setState({ msg: true, notelist: response.data });
  //     })
  // }


  async handleOk(values) {
    console.log("formRef", formRef);
    formRef.current.submit();

  };

  handleCancel(values) {
    console.log(values);
  };

  async addCar() {
    // if (!localStorage.getItem("user")) {
    //   this.props.history.push("/login");
    //   return;
    // }
    // const { detail } = this.state;
    // let result = await book({
    //   id: this.props.match.params.id,
    //   dateRange: [],
    //   totalPrice: detail.price
    // });
    message.success("Add Success");
  }



  render() {
    const { detail } = this.state;
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
      <div className='detail-container' style={{height: "100%", boxSizing: 'border-box' }}>
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
          <div style={{ flex: "1", height: "100%" }}>
            <div style={{ display: "flex", alignItems: 'center', justifyContent: "flex-end", height: "100px", padding: "10px" }}>
              <div style={{ color: "#222222", fontSize: "25px", fontWeight: "bold", flex: 1, cursor: "pointer" }} onClick={() => {
                this.props.history.push("/");
              }}>
                Products Detail
              </div>


            </div>
            <div style={{ padding: 20 ,backgroundColor:"#fff",margin:20}}>
              <div className="item">
                <div className="item-image">
                  <img src={detail.image}></img>
                </div>
                <div className="item-content">
                  <div className="item-category">Category1</div>
                  <div className="item-title">{detail.name}</div>
                  <div className="item-desc">{detail.desc}</div>
                  <div className="item-price">${detail.price}</div>
                  <div className="item-buttons">
                    <Button size="small" type="primary" onClick={() => {
                      this.addCar();
                    }}>Add To Cart</Button>
                    <Button size="small" style={{marginLeft:20}} onClick={() => {
                      this.props.history.push("/create/"+detail.id)
                    }}>Edit</Button>
                  </div>
                </div>
              </div>
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