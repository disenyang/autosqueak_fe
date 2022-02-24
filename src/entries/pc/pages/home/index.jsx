import React from 'react';
import { Form, Upload, Row, Col, Table, Input, Button, Select, Modal, DatePicker, message } from 'antd';
import { FormOutlined, UploadOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import env from '../../../../config/config';
import { getList, saveObj, updateObj, publish,addCart } from '../../../../api/pet'
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
      list: []
    }

  }

  // detect whether the user has logged in
  componentWillMount() {
    this.loadData();
  }

  async search() {
    const { searchValue } = this.state;

    let res = await getList({
      searchValue
    });

    console.log("list=====", res);
    this.setState({
      list: res.contact(res)
    })
  }

  async loadData() {
    let res = await getList({

    });
    console.log("list=====", res);
    this.setState({
      list: res
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
    this.props.history.push("/create/"+record.id)
  }
  async publish(record) {
    let result = await publish({
      id: record.id,
      availability: true
    });
    this.loadData();
  }
  
  async addToCart(record) {
    let result = await addCart({...record,
      num:1
    });
    
  }
  
  handleChange(){

  }



  render() {
    const { showCreateBlankNote, isModalVisible, update, objItem, searchValue } = this.state;
    // let list = this.state.list.concat(goodList);
    let list = this.state.list;

    return (
      <div className="maxWidth">
				<div>
					<div>
						<div className="car">
							<div className="content">
								<div className="title">Welcome to</div>
								<div className="title">AutoSqueak</div>
								<div className="cont">One of the largest and most progressive distributors of car vehicle cleaning products in the UK.</div>
								<div className="btn" onClick={()=>{
                  this.changShow();
                }}><a href="/homepage/">Shop Now</a></div>
							</div>
						</div>
						<div>
							<div className="ul-title">What's New?</div>
							<div className="uls flex-center">
								{/* {% for product in products %}
								<div className="ulBox">
									<img src="{{ product.imageURL }}" style={{width: 100%;height: 202px;" />
									<div className="moneytext">{{product.name}}</div>
									<div className="money">
                    <span style={{color: #3F757B;">£{{product.discountPrice|floatformat:1}}</span>
                    {% if product.discount != 1 %}
                    <span style={{text-decoration: line-through;margin-right: 10px;">£{{product.price}}</span>
                    {% endif %}
                  </div>
									<div className="flex-center">
										<a className="btnLeft flex" href="{% url 'slider?pk={{ product.pk }}">View Details</a>
										<a  data-product="{{ product.id }}"
											data-color="{{ product.color }}"
											data-combo="{{ product.combo }}"
											data-price="{{ product.discountPrice }}"
											data-count=1
											data-action="add" className="flex btnRight add-btn update-cart">
											<img src="/img/index/box2.png" className="btnImg" />
											<div>+</div>
										</a>
									</div>
								</div>
								{% endfor %} */}

							</div>
						</div>
						<div>
							<div className="swiperTitle">DisCover More</div>
							<div className="swiper-containerFour">
								<div className="swiper-wrapper">
									{/* ${% for product in products1 %}
									<div className="swiper-slide">
										<div className="swiperImg">
											<img src="{{ product.image_new }}" style={{width: 100%;height: 100%;" />
											<div className="name flex"><a href="{% url 'slider?pk={{ product.pk }}">{{ product.name }}</a></div>
										</div>
									</div>
									{% endfor %} */}
								</div>
								<img src="/img/index/left.png" style={{"width": "0.2rem","height": "0.3rem"}}
									className="swiper-button-prev" />
								<img src="/img/index/right.png" style={{width: "0.2rem",height: "0.3rem"}}
									className="swiper-button-next" />
							</div>
							<div className="swiper-containerThree">
								<div className="swiper-wrapper">
									{/* ${% for product in products1 %}
									<div className="swiper-slide">
										<div className="swiperImg">
											<img src="{{ product.image_new }}" style={{width: 100%;height: 100%;" />
											<div className="name flex"><a href="{% url 'slider?pk={{ product.pk }}">{{ product.name }}</a></div>
										</div>
									</div>
									{% endfor %} */}
								</div>
								<img src="/img/index/left.png" style={{width: "0.2rem",height: "0.3rem"}}
									className="swiper-button-prev" />
								<img src="/img/index/right.png" style={{width: "0.2rem",height: "0.3rem"}}
									className="swiper-button-next" />
							</div>
							<div className="swiper-containerTwo">
								<div className="swiper-wrapper">
									{/* ${% for product in products1 %}
									<div className="swiper-slide">
										<div className="swiperImg">
											<img src="{{ product.image_new }}" style={{width: 100%;height: 100%;" />
											<div className="name flex"><a href="{% url 'slider?pk={{ product.pk }}">{{ product.name }}</a></div>
										</div>
									</div>
									{% endfor %} */}
								</div>
								<img src="/img/index/left.png" style={{width:"0.2rem",height: "0.3rem"}}
									className="swiper-button-prev" />
								<img src="/img/index/right.png" style={{width:"0.2rem",height: "0.3rem"}}
									className="swiper-button-next" />
							</div>
							<div className="swiper-containerOne">
								<div className="swiper-wrapper">
									{/* ${% for product in products1 %}
									<div className="swiper-slide">
										<div className="swiperImg">
											<img src="{{ product.image_new }}" style={{width: 100%;height: 100%;" />
											<div className="name flex"><a href="{% url 'slider?pk={{ product.pk }}">{{ product.name }}</a></div>
										</div>
									</div>
									{% endfor %} */}
								</div>
								<img src="/img/index/left.png" style={{width: "0.2rem",height: "0.3rem"}}
									className="swiper-button-prev" />
								<img src="/img/index/right.png" style={{width: "0.2rem",height: "0.3rem"}}
									className="swiper-button-next" />
							</div>
						</div>
					</div>
				</div>
			</div>
    )

  }
}
export default NoteList;