const baseUrl = 'http://47.104.223.203:8080'
// const baseUrl = '/api'
const httpRequest = (opts, data) => {
	// console.log(opts, data, '请求的参数')
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: {
			'Access-Control-Allow-Origin': '*', //跨域加上头
			"content-type": "application/x-www-form-urlencoded"
		},
		
		
		// url: 'http://47.104.223.203:8080/pro_Servers/repair/', //测试域名
		//     header: {'content-type': 'application/x-www-form-urlencoded'},
		//     method: 'POST',
		//     data: data,
		// dataType: 'json'
	}
	let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
	// console.log(res, 'res')
                resolve(res[1].data)
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )
    })
	 return promise
	
}

//带Token请求
const httpTokenRequest = (opts, data) => {
    let token = "";
    uni.getStorage({
        key: 'token',
        success: function(ress) {
            token = ress.data
        }
    });
    //此token是登录成功后后台返回保存在storage中的
    let httpDefaultOpts = {
        url: baseUrl+opts.url,
        data: data,
        method: opts.method,
        header: opts.method == 'get' ? {
       
        'X-Requested-With': 'XMLHttpRequest',
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8"
    } : {
       
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
        dataType: 'json',
    }
    let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
                resolve(res[1])
            }
        ).catch(
            (response) => {
                reject(response)
            }
        )
    })
    return promise
};
 
export default {
     baseUrl,
     httpRequest,
     httpTokenRequest                    
}



// import uniRequest from 'uni-request';
// // import store from '@/store/index.js';
// // import md5 from 'js-md5';


// uniRequest.defaults.baseURL = baseUrl;
// uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// function showToast(title) {
// 	uni.showToast({
// 		icon: 'none',
// 		title: title
// 	})
// }

// function successState(res, data) {
// 	if (res) {
// 		if (res.status === 500) {
// 			showToast('500服务器访问失败');
// 			return;
// 		}
// 		if (res.data.status === 513) {
// 			showToast('请先缴清物业欠费');
// 			return;
// 		}
		

// 	}
// }

// function errorState(error) {
// 	showToast('您可能断网了，请重试！')
// 	// store.commit('logout');
// }

// //ascii排序
// function sort_ASCII(obj) {
// 	var arr = new Array();
// 	var num = 0;
// 	for (var i in obj) {
// 		arr[num] = i;
// 		num++;
// 	}
// 	var sortArr = arr.sort();
// 	var sortObj = {};
// 	for (var i in sortArr) {
// 		sortObj[sortArr[i]] = obj[sortArr[i]];
// 	}
// 	return sortObj;
// }
// //对象转为字符串
// function data_toStirng(obj) {
// 	let str = ''
// 	let arrayData = []
// 	Object.getOwnPropertyNames(obj).forEach(function(key) {
// 		if (obj[key]) {
// 			arrayData.push(key + '=' + obj[key]);
// 		}
// 	})
// 	for (let i = 0; i < arrayData.length; i++) {
// 		//最后一条数据
// 		let lastLength = arrayData.length - 1;
// 		//如果不是最后一条数据加上& 
// 		if (i !== lastLength) {
// 			str += arrayData[i] + '&'
// 		} else {
// 			str += arrayData[lastLength]
// 		}
// 	}
// 	return str;

// }
// //获取access_token
// function accessToken(data) {
// 	let asciiData = sort_ASCII(data);
// 	let asciiData_toStirng = data_toStirng(asciiData);
// 	let md5data = md5(asciiData_toStirng);
// 	let upperCaseData = md5data.toUpperCase();
// 	return upperCaseData;
// }


// let requests = {}
// requests.post = (url, data) => {
	
// 	//公用loginToken
// 	// let objData = {};
// 	// if(!store.state.login_token){
// 	// 	objData = data;
// 	// }else{
// 	// 	let loginToken = {
// 	// 		login_token: store.state.login_token
// 	// 	}
// 	//     objData = Object.assign(data, loginToken);
// 	// }
// 	// let access_token = accessToken(objData);
// 	// uni.showLoading({
// 	// 	title:'正在加载...'
// 	// })
// 	let promise = new Promise(function(resolve, reject) {
// 		uniRequest.post(url, objData).then((res) => {
// 			uni.hideLoading();
// 			successState(res)
// 			if (res.data.code === 1) {
// 				resolve(res.data)
// 			}
// 		}).catch((response) => {
			
// 			uni.hideLoading();
// 			errorState(response)
// 			reject(response)
// 		});
// 	})
// 	return promise
// }

// export default requests;
