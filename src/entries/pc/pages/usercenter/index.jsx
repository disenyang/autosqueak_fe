import React from 'react';
import { Form, Upload, Row, Col, Radio, Table, Input, Button, Select, Modal, DatePicker, message } from 'antd';
import { FormOutlined, UploadOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import env from '../../../../config/config';
import { getList, saveObj, updateObj, publish } from '../../../../api/pet'

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
      list: []
    }

  }

  // detect whether the user has logged in
  componentWillMount() {
    this.loadData();
  }

  async loadData() {
    let user = null;
    if(localStorage.getItem("user")){
      user = JSON.parse(localStorage.getItem("user"));
    }

    let res = await getList({

    });
    console.log("list=====", res);
    this.setState({
      list: res.listings.filter((item)=>{
        return item.owner === user.email
      })
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

  async onFinish(values) {
    const { objItem, update } = this.state;
    console.log("objItem====", objItem);

    console.log("values", values);
    const {
      title,
      type,
      beds,
      address,
      price,
      bathrooms,
      thumbnail,
      amenities
    } = values;

    let params = {
      title,
      type,
      beds,
      address,
      price,
      bathrooms,
      thumbnail,
      metadata: [

      ]

    }
    if (update) {
      params.id = objItem.id
    }
    console.log("params", params);

    // if(!objItem.thumbnail){
    //   message.error(`please upload thumbnail`);
    //   return;
    // }
    if (update) {
      await updateObj({
        thumbnail: objItem.thumbnail,
        ...params
      });
    } else {
      await saveObj({
        thumbnail: objItem.thumbnail,
        ...params
      });
    }
    this.setState({
      isModalVisible: false
    })

    await this.loadData();
  }

  async edit(record) {
    // let result = await listSuper({
    //   id:record.id
    // });
    this.setState({
      isModalVisible: true,
      update: true,
      objItem: record,
    }, () => {
      console.log("formRef", formRef);
      formRef.current.setFieldsValue({
        title: record.title,
        address: record.address,
        price: record.price
      });
    })
  }
  async publish(record) {
    let result = await publish({
      id:record.id,
      availability:true
    });
    this.loadData();
  }

  

  render() {
    const { list, showCreateBlankNote, isModalVisible, update, objItem } = this.state;
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
      <div style={{ backgroundColor: "#E4E5E7", height: "100%", boxSizing: 'border-box' }}>
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
              <div style={{ color: "#222222", fontSize: "25px", fontWeight: "bold", flex: 1 ,cursor:"pointer"}} onClick={() => {
                this.props.history.push("/");
              }}>
                HOME
              </div>
              <div style={{ height: "35px", margin: "10px 50px 10px 10px", borderRadius: "5px", display: 'flex', alignItems: 'center', padding: '5px', border: '1px solid #eee', backgroundColor: "#ffffff" }}>
                <img height="20px" alt="" src="/search.png" />
                <input style={{ border: 'none', backgroundColor: "transparent", outline: "none" }} />
              </div>
              <div style={{ backgroundColor: "#3370FF", cursor: "pointer", width: "160px", borderRadius: "5px", display: "flex", alignItems: 'center', justifyContent: "center", height: "48", 'lineHeight': "48px", "color": "white" }} onClick={() => {
                this.setState({
                  isModalVisible: true
                })
              }}><span style={{ fontSize: "25px", marginRight: '10px' }}>+</span><span>create</span></div>
            </div>
            <div style={{ padding: 10 }}>
              <div style={{ color: "#222222", fontSize: "20px" }}>Hosted List</div>
              <table style={{ width: '100%' }}>
                <tr style={{ height: "50px" }}>
                  <th style={{ textAlign: 'left', fontSize: "15px", color: "#111111", fontWeight: "normal" }}>Title</th>
                  <th style={{ textAlign: 'left', fontSize: "15px", color: "#111111", fontWeight: "normal" }}>Type</th>
                  <th style={{ textAlign: 'left', fontSize: "15px", color: "#111111", fontWeight: "normal" }}>Beds</th>
                  <th style={{ textAlign: 'left', fontSize: "15px", color: "#111111", fontWeight: "normal", width: "100px" }}>Bathrooms</th>
                  <th style={{ textAlign: 'left', fontSize: "15px", color: "#111111", fontWeight: "normal", width: "100px" }}>Thumbnail</th>
                  <th style={{ textAlign: 'left', fontSize: "15px", color: "#111111", fontWeight: "normal", width: "100px" }}>Rating</th>
                  <th style={{ textAlign: 'left', fontSize: "15px", color: "#111111", fontWeight: "normal", width: "100px" }}>Reviews</th>
                  <th style={{ textAlign: 'left', fontSize: "15px", color: "#111111", fontWeight: "normal", width: "100px" }}>Price</th>
                  <th style={{ textAlign: 'left', fontSize: "15px", color: "#111111", fontWeight: "normal", width: "100px" }}>Options</th>

                </tr>
                {list.map((row) => {
                  return (<tr style={{ height: "40px" }}>
                    <td style={{ textAlign: 'left', fontSize: "15px", color: "#000000", fontWeight: "normal" }}>
                      <div style={{ display: "flex", alignItems: "center" }}><img alt="" height="20px" src="/note.jpg" /><span style={{ marginLeft: "10px" }}>{row.title}</span></div>
                    </td>
                    <td style={{ textAlign: 'left', fontSize: "15px", color: "#646A73", fontWeight: "normal" }}>{row.type}</td>
                    <td style={{ textAlign: 'left', fontSize: "15px", color: "#646A73", fontWeight: "normal" }}>{row.beds}</td>
                    <td style={{ textAlign: 'left', fontSize: "15px", color: "#646A73", fontWeight: "normal", width: "100px" }}>
                      {row.bathrooms}
                    </td>
                    <td style={{ textAlign: 'left', fontSize: "15px", color: "#646A73", fontWeight: "normal" }}>{row.thumbnail}</td>
                    <td style={{ textAlign: 'left', fontSize: "15px", color: "#646A73", fontWeight: "normal" }}>{row.rating}</td>
                    <td style={{ textAlign: 'left', fontSize: "15px", color: "#646A73", fontWeight: "normal" }}>{row.reviews}</td>
                    <td style={{ textAlign: 'left', fontSize: "15px", color: "#646A73", fontWeight: "normal" }}>{row.price}</td>
                    <td style={{ textAlign: 'left', fontSize: "15px", color: "#646A73", fontWeight: "normal",width:200 }}><Button onClick={() => {
                      this.edit(row);
                    }}>Edit</Button>
                    {!row.published?<Button style={{marginLeft:10}} onClick={() => {
                        this.publish(row);
                      }}>Publish</Button>:''}
                      

                    </td>
                  </tr>);
                })}

              </table>
            </div>
          </div>
        </div>

        <Modal title={update ? 'Update Hosted' : 'Register Hosted'} width="700px" visible={isModalVisible} onOk={() => {
          this.handleOk()
        }} onCancel={() => {
          this.setState({
            isModalVisible: false

          })
        }}>
          <Row >
            {/* <Col>
              <div className="thumbnail-wrapper">
                <div>
                  Thumbnail
                </div>
                <div style={{ marginTop: "20px" }}>
                  <img className="thumbnail-img" src={objItem.thumbnail ? (prefix + objItem.thumbnail) : require('../../../../images/avator.jpg')}></img>
                </div>
                <div style={{ marginTop: "20px" }}>
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </div>
              </div>
            </Col> */}
            <Col style={{ flex: '1', marginRight: "30px" }}>
              <Form {...layout} ref={formRef} name="control-ref" onFinish={(values) => {
                this.onFinish(values);
              }}>
                <Form.Item name="title" label="Title" rules={[{ required: true, message: 'please input Title' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="address"
                  label="Address:"
                >
                  <Input />
                </Form.Item>
                <Form.Item name="type" label="Type" rules={[{ required: true, message: 'please choose type' }]}>
                  <Input />
                  {/* <Radio.Group>
                    <Radio value={1}>Male</Radio>
                    <Radio value={2}>Female</Radio>
                  </Radio.Group> */}
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true, message: 'please choose price' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="thumbnail" label="Thumbnail" rules={[{ required: true, message: 'please choose Thumbnail' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="bathrooms" label="Number of bathrooms:" rules={[{ required: true, message: 'please input bathrooms' }]} >
                  <Input />
                </Form.Item>
                <Form.Item name="bedrooms"
                  label="Bedrooms:" rules={[{ required: true, message: 'please input Bedrooms' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="amenities"
                  label="Amenities:" rules={[{ required: true, message: 'please input Amenities' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item name="images"
                  label="Images:" rules={[{ required: true, message: 'please input images' }]}
                >
                  <Input />
                </Form.Item>





                {/* <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="button" onClick={this.saveCaogao}>
                    
                  </Button>
                  <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }} >
                    
                  </Button>
                </Form.Item> */}
              </Form>
            </Col>
          </Row>

        </Modal>
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