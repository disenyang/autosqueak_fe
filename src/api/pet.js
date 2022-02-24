import { get,post,put } from '../http/api'
// 获取图书列表
export const getList = async (params) => {
  let list = localStorage.getItem("goods_list");
  if(list){
    list = JSON.parse(list);
  }else{
    list = [];
  }
  return list;
  // return get('/listings',params)
}
export const getCartList = async (params) => {
  let list = localStorage.getItem("cart_list");
  if(list){
    list = JSON.parse(list);
  }else{
    list = [];
  }
  return list;
  // return get('/listings',params)
}
export const getDetail = async (params) => {
  let list = localStorage.getItem("goods_list");
  if(list){
    list = JSON.parse(list);
  }else{
    list = [];
  }
  return list.find((item)=>item.id==params.id)
  // return get('/listings/'+params.id,params)
}

export const addCart = async (params) => {
  let list = localStorage.getItem("cart_list");
  if(list){
    list = JSON.parse(list);
    let detailIndex = list.findIndex((item)=>item.id==params.id)
    console.log("detailIndex",detailIndex);
    if(detailIndex!=-1){
      list.splice(detailIndex,1);
    }else{
      
    }
    list.push(params);
    
  }else{
    list = [params];
  }
  
  localStorage.setItem("cart_list",JSON.stringify(list))
}

export const delCart = async (id) => {
  let list = localStorage.getItem("cart_list");
  if(list){
    list = JSON.parse(list);
    let detailIndex = list.findIndex((item)=>item.id==id)
    console.log("detailIndex",detailIndex);
    if(detailIndex!=-1){
      list.splice(detailIndex,1);
    }else{
      
    }
    
  }else{
  }
  
  localStorage.setItem("cart_list",JSON.stringify(list))
}

export const listSuper = async (params) => {
  return post('/listSuper',params)
}

// save Pet
export const saveObj = async (params) => {
  return post('/listings/new',params)
}

// update Pet
export const updateObj = async (params) => {
  return put('/listings/'+params.id,params)
}

// update Pet
export const publish = async (params) => {
  return put('/listings/publish/'+params.id,params)
}
export const book = async (params) => {
  return post('/bookings/new/'+params.id,params)
}

// remove Pet
export const removeObj = async (params) => {
  return post('/removePet',params)
}
export const getChildrenList = async (params) => {
  return post('/getChildrenList',params)
}



export const register = async (params) => {
  let list = localStorage.getItem("users_list");
  if(list){
    list = JSON.parse(list);
    list.push(params);
  }else{
    list = [];
    list.push(params);
  }
  localStorage.setItem("users_list",JSON.stringify(list));

  // return post('/user/auth/register',params)
}

export const login = async (params) => {
  let list = localStorage.getItem("users_list");
  if(list){
    list = JSON.parse(list);
  }else{
    list = [];
  }
  return list.find((item)=>item.email==params.email && item.password==params.password)
  //return post('/user/auth/login',params)
}
export const add = async (params) => {
  let list = localStorage.getItem("goods_list");
  if(list){
    list = JSON.parse(list);
    let detailIndex = list.findIndex((item)=>item.id==params.id)
    console.log("detailIndex",detailIndex);
    if(detailIndex!=-1){
      list.splice(detailIndex,1);
    }else{
      
    }
    list.push(params);
    
  }else{
    list = [params];
  }
  
  localStorage.setItem("goods_list",JSON.stringify(list))
  // return post('/user/auth/login',params)
}





