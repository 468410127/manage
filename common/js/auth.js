export function setUserInfo(data){
	return sessionStorage.setItem('admin', JSON.stringify(data));
}

export function getUserInfo(){
	try{
		return JSON.parse(sessionStorage.getItem('admin'));
		
	}catch (e){
		return null
	}
}

export function setListInfo(data){
	return sessionStorage.setItem('currentList', JSON.stringify(data));
}

export function getListInfo(){
	try{
		return JSON.parse(sessionStorage.getItem('currentList'));
		
	}catch (e){
		return null
	}
}