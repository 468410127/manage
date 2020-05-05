export function setUserInfo(data){
 return uni.setStorage({
	 key: 'admin',
	 data: JSON.stringify(data)
 });
}

export function getUserInfo(){
 try{
  return JSON.parse(uni.getStorage({
	  key: 'admin'
  }));
  
 }catch (e){
  return null
 }
}

export function setListInfo(data){
 return uni.setStorage({
	 key: 'currentList',
	 data: JSON.stringify(data)
 });
 // 'currentList', JSON.stringify(data)
}

export function getListInfo(){
 try{
  return JSON.parse(uni.getStorage({
	  key: 'currentList'
  }));
  
 }catch (e){
  return null
 }
}