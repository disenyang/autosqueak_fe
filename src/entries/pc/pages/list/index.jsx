// /**
//  * 士兵页面
//  *
//  *
//  */
// import React, { memo, useState, useEffect } from 'react';
// import { Form, Upload,Row, Col,Radio,Table, Input, Button, Select, Modal ,DatePicker} from 'antd';
// import { FormInstance } from 'antd/lib/form';
// import { FormOutlined,UploadOutlined, DeleteOutlined ,ExclamationCircleOutlined} from '@ant-design/icons';

// import { List, message, Avatar, Spin } from 'antd';
// import { getList,savePet,updatePet,removePet,listSuper,getChildrenList} from '../../../../api/pet'
// import './index.scss';
// import env from '../../../../config/config';

// const io = require('weapp.socket.io')



// const moment = require("moment");
// const { Search } = Input;
// const {prefix} =env

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
// const { Option } = Select;
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };
// const formRef = React.createRef();
// const $ = require("jquery");
// class ListData extends React.Component {

  
//   constructor(props) {
//     super(props);

//     const columns = [
//       {
//         title: 'Avatar',
//         dataIndex: 'avatar',
//         key: 'avatar',
//         render: text => <img  className="avatar-list-img" src={`${prefix}${text}`}></img>,
//       },
//       {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//         defaultSortOrder: 'descend',
//         sorter: (a, b) => a.name - b.name,
//         render: text =>text,
//       },
//       {
//         title: 'Classify',
//         dataIndex: 'classify',
//         key: 'classify',
//         defaultSortOrder: 'descend',
//         sorter: (a, b) => a.classify - b.classify,
//         render: text =>text,
//       },
//       {
//         title: 'Sex',
//         dataIndex: 'sex',
//         key: 'sex',
//         defaultSortOrder: 'descend',
//         sorter: (a, b) => (s, t) => {
//           console.log("s",s);
//           let a = s.sex.toLowerCase();  
//           let b = t.sex.toLowerCase();  
//           if (a < b) return -1;  
//           if (a > b) return 1;  
//           return 0;  
//         },
//         render: text =>text==1?'Male':'Female',
//       },
//       {
//         title: 'Master',
//         dataIndex: 'master',
//         key: 'master',
//         defaultSortOrder: 'descend',
//         sorter: (s, t) => {
//           console.log("s",s);
//           let a = s.master.toLowerCase();  
//           let b = t.master.toLowerCase();  
//           if (a < b) return -1;  
//           if (a > b) return 1;  
//           return 0;  
//         },
//         render: text =>text,
//       },
//       {
//         title: 'MasterPhone',
//         dataIndex: 'masterphone',
//         key: 'masterphone',
//         defaultSortOrder: 'descend',
//         sorter: (s, t) => {
//           console.log("s",s);
//           let a = s.masterphone.toLowerCase();  
//           let b = t.masterphone.toLowerCase();  
//           if (a < b) return -1;  
//           if (a > b) return 1;  
//           return 0;  
//         },
//         render: text =>text,
//       },
//       {
//         title: 'Birthday',
//         dataIndex: 'birthday',
//         key: 'birthday',
//         defaultSortOrder: 'descend',
//         sorter: (a, b) => moment(a.birthday).valueOf() - moment(b.birthday).valueOf(),
//         render: text =>text,
//       },
//       {
//         title: 'Edit',
//         key: 'Edit',
//         render: (text, record) => (
//           <>
//             <Button type="text" icon={<FormOutlined />} style={{ marginLeft: '10px' }} onClick={()=>{
//               this.edit(record)
//             }}>
//             </Button>
//           </>
//         ),
//       },
//       {
//         title: 'Delete',
//         key: 'Delete',
//         render: (text, record) => (
//           <>
//             <Button type="text" icon={<DeleteOutlined />} onClick={()=>{
//               this.remove(record.id,record.superior)
//             }}>
//             </Button>
//           </>
//         ),
//       },
//     ];
//     this.state = {
//       list: [],
//       selectClassifyList:[{
//         id:"dog",
//         name:"dog"
//       },{
//         id:"cat",
//         name:"cat"
//       },{
//         id:"pig",
//         name:"pig"
//       },{
//         id:"fox",
//         name:"fox"
//       }],
//       columns:columns,
//       isModalVisible:false,
//       update:false,
//       offset:0,
//       searchValue:'',
//       queryType:0,
//       pet:{
//         avatar:null,
//         id:null
//       }
//     }
//   }

//   async componentDidMount(){
//     console.log("22222222",io);
//     if(!localStorage.getItem("user")){
//       this.props.history.push("/login");
//     }
//     const socket = io('http://123.56.232.62:8089')

//     socket.on('news', d => {
//       console.log('received news: ', d)
//     })

//     socket.emit('news', {
//       title: 'this is a news'
//     })
//     await this.query();
//     let _this = this;
//     $(window).scroll(async function(){
//         var scrollTop = $(this).scrollTop();
//         var scrollHeight = $(document).height();
//         var windowHeight = $(this).height();
//         if(scrollTop + windowHeight == scrollHeight){
//           console.log("滚动到底部");
//           await _this.handleFetch();
//         }
//     });


    
//   }

//   async query(){
//     let result = await getList();
//     console.log("result",result);
//     this.setState({
//       list:result.result,
//       queryType:0,
//     }); 
//   }

//   async search(value){
//     console.log("value",value);
//     let result = await getList({
//       name:value
//     });
//     this.setState({
//       list:result.result,
//       searchValue:value
//     }); 
//   }

//   async searchChildren(id){
//     console.log("id",id);
//     let result = await getChildrenList({
//       id:id
//     });
//     this.setState({
//       list:result.result,
//       queryType:1
//     }); 
//   }

  

//   async edit(record){
//     let result = await listSuper({
//       id:record.id
//     });
//     this.setState({
//       isModalVisible:true,
//       update:true,
//       pet:{
//         avatar:record.avatar,
//         id:record.id
//       },
//     },()=>{
//       console.log("formRef",formRef);
//       formRef.current.setFieldsValue({
//         name:record.name,
//         master:record.master,
//         sex:record.sex,
//         birthday:moment(record.birthday),
//         masterphone:record.masterphone,
//         classify:record.classify
//       });
//     })
//   }

//   async remove(id,superior){
//     Modal.confirm({
//         title: 'confirm remove this?',
//         icon: <ExclamationCircleOutlined/>,
//         content: '',
//         okText: 'YES',
//         okType: 'danger',
//         cancelText: 'NO',
//         onOk: async() => {
//           console.log("id",id);
//           let result = await removePet({
//             id:id,
//             superior
//           });
//           await this.query();
//         }
//         ,
//         onCancel() {
//             console.log('Cancel');
//         },
//     });
    
//   }


//   async handleFetch(){
//     const {list,page,offset,searchValue,queryType} = this.state;
//     if(queryType!=0){
//       return;
//     }
//     let result = await getList({
//       offset:list.length,
//       name:searchValue
//     });
//     if(result.result.length>0){
//       this.setState({
//         list:list.concat(result.result)
//       })
//     }
    
//   }

//   async handleOk(values) {
//     console.log("formRef",formRef);
//     formRef.current.submit();

//   };

//   handleCancel(values) {
//     console.log(values);
//   };

//   async onFinish(values){
//     const {pet,update} = this.state;
//     console.log("pet====",pet);

//     console.log("values",values);
//     const {
//       name,
//       classify,
//       sex,
//       birthday,
//       master,
//       masterphone
//     } = values;

//     let params = {
//       name,
//       classify,
//       sex,
//       birthday:birthday.format("yyyy-MM-DD"),
//       master,
//       masterphone
//     }
//     if(update){
//       params.id = pet.id
//     }
//     console.log("params",params);

//     if(!pet.avatar){
//       message.error(`please upload avatar`);
//       return;
//     }
//     if(update){
//       await updatePet({
//         avatar:pet.avatar,
//         ...params
//       });
//     }else{
//         await savePet({
//           avatar:pet.avatar,
//           ...params
//         });
//     }
//     this.setState({
//       isModalVisible:false
//     })

//     await this.query();
//   }

  
//   saveCaogao() {

//   }

//   render() {
//     const {list,isModalVisible,columns,selectClassifyList,pet,update,searchValue} = this.state;
//     const uploadProps = {
//       name: 'file',
//       action: prefix+'/uploadfile',
//       headers: {
//         authorization: 'authorization-text',
//       },
//       onChange:(info)=> {
//         console.log("info",info);
//         if (info.file.status !== 'uploading') {
//           console.log(info.file, info.fileList);
//         }
//         if (info.file.status === 'done') {
          
//           this.setState({
//             pet:{
//               avatar:`/${info.file.response}`,
//               id:this.state.pet.id
//             }
//           })
//           message.success(`file uploaded successfully`);
//         } else if (info.file.status === 'error') {
//           message.error(`${info.file.name} file upload failed.`);
//         }
//       },
//     };
//     return (
//       <div className="list-manage">
//         <div className="search-form">
//             <Search
//               placeholder="name"
//               value={searchValue}
//               onChange={async (e) => {
//                 this.setState({
//                   searchValue:e.target.value
//                 })
//               }}
//               onSearch={async value => await this.search(value)}
//               style={{ width: 200 }}
//             />
//             <div>
//               <Button type="primary" onClick={async ()=>{
//                 this.setState({
//                   searchValue:""
//                 })
//                 await this.query()
//               }}>Reset</Button>
//               <Button type="primary" onClick={async ()=>{
//                 let result = await listSuper();
//                 this.setState({
//                   update:false,
//                   isModalVisible:true,
//                   pet:{
//                     avatar:null,
//                     id:null
//                   }
//                 },()=>{
//                   formRef.current.resetFields()
//                 })
//               }} style={{marginLeft:20}}>Register Pet</Button>
//           </div>
//         </div>
//         <div className="list">
//           <Table 
//             columns={columns}
//             pagination={false}
//             rowKey='id' 
//             dataSource={list} />
//         </div>
//         <Modal title={update?'Update Pet':'Register Pet'} width="700px" visible={isModalVisible} onOk={()=>{
//           this.handleOk()
//         }} onCancel={()=>{
//           this.setState({
//             isModalVisible:false
            
//           })
//         }}>
//           <Row >
//             <Col>
//               <div className="avatar-wrapper">
//                 <div>
//                   Pet
//                 </div>
//                 <div style={{marginTop:"20px"}}>
//                   <img  className="avatar-img" src={pet.avatar?(prefix+pet.avatar) : require('../../../../images/avatar.jpg')}></img>
//                 </div>
//                 <div style={{marginTop:"20px"}}>
//                   <Upload {...uploadProps}>
//                     <Button icon={<UploadOutlined />}>Click to Upload</Button>
//                   </Upload>
//                 </div>
//               </div>
//             </Col>
//             <Col style={{flex:'1',marginRight:"30px"}}>
//               <Form {...layout} ref={formRef} name="control-ref" onFinish={(values)=>{
//                 this.onFinish(values);
//               }}>
//                 <Form.Item name="name" label="Name" rules={[{ required: true, message: 'please input Name' }]}>
//                   <Input />
//                 </Form.Item>
//                 <Form.Item name="classify"
//                   label="Classify:" 
//                 >
//                   <Radio.Group
//                       placeholder=""
//                       allowClear
//                     >
//                       {selectClassifyList.map((item)=>(
//                         <Radio value={item.id}>{item.name}</Radio>
//                       ))}
//                   </Radio.Group>
//                 </Form.Item>
//                 <Form.Item name="sex" label="Sex" rules={[{ required: true, message: 'please choose sex' }]}>
//                   <Radio.Group>
//                     <Radio value={1}>Male</Radio>
//                     <Radio value={2}>Female</Radio>
//                   </Radio.Group>
//                 </Form.Item>
//                 <Form.Item name="birthday" label="Birthday:" rules={[{ required: true, message: 'please choose Birthday' }]} >
//                   <DatePicker onChange={this.onChange} />
//                 </Form.Item>
//                 <Form.Item name="master" 
//                   label="Master:" rules={[{ required: true, message: 'please input Master' }]} 
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item name="masterphone" 
//                   label="Master Phone:" rules={[{ required: true, message: 'please input Master Phone' }]} 
//                 >
//                   <Input />
//                 </Form.Item>
                
//                 {/* <Form.Item {...tailLayout}>
//                   <Button type="primary" htmlType="button" onClick={this.saveCaogao}>
                    
//                   </Button>
//                   <Button type="primary" htmlType="submit" style={{ marginLeft: '10px' }} >
                    
//                   </Button>
//                 </Form.Item> */}
//               </Form>
//             </Col>
//           </Row>
          
//         </Modal>
//       </div>
//     );
//   }
// };

// export default ListData;
