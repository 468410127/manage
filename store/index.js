import Vue from 'vue'
import Vuex from 'vuex'
import  {setUserInfo, getUserInfo, setListInfo, getListInfo } from '../common/js/auth.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		requestLoading: false,//加载等待是否显示
		hasLogin: false,
		userHeadimg: "/static/logo.png",
		userInfo: getUserInfo(),
		listInfo: getListInfo(),
		
		addressList: [],
		cartList: [],
		total: 0,
		user: null,
		qiniuUrl :'http://q9oi24cdo.bkt.clouddn.com/'
	},
	mutations: {
		SET_USER:(state, data) => {
			 state.userInfo = data;
			 setUserInfo(data);
			
		},
		SET_LIST_INFO:(state, data) => {
			 state.listInfo = data;
			 setListInfo(data);
		},
		// 登陆
		login(state, provider) {
			
			state.hasLogin = true;
			// state.userInfo.token = provider.token;
			uni.setStorage({
				key: 'userInfo',
				data: provider
			})
			// state.userInfo.userName = provider.user_name
		},
		// 退出登陆
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		},
		//显示请求加载动画
		request_show_loading(state) {
			state.requestLoading = true;
		},
		//隐藏请求加载动画
		request_hide_loading(state) {
			state.requestLoading = false;
		}

	}
})

export default store
