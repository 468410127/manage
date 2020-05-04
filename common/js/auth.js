export function setUserInfo(){
	return JSON.parse(sessionStorage.getItem(UserKey));
}

export function getUserInfo(){
	try{
		return JSON.parse(sessionStorage.setItem(UserKey),JSON.stringify(data));
		
	}catch (e){
		return null
	}
	
}