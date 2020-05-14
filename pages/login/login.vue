<template>
	<view class="content" :style="{height: height}">
		<image src="../../static/logo.jpg" class="logo"></image>
		<form @submit="formSubmit" @reset="formReset">
			<view class="input-box">
				<input id="phone" placeholder="帐号" class="input" maxlength="11" @input="verify"/>
			</view>
			<view class="input-box">
				<input id="password" password placeholder="请输入密码" class="input code-input" @input="verify"/>
			</view>
			<button class="button enter" type="primary" hover-class="button-hover" :disabled="isDisabled" formType="submit"> 确定 </button>
		</form>
		<view class="message">
			
			<!-- <view class="wechat">
				企业微信公众号:
			</view> -->
			<image src="../../static/wechat.jpg" class="wechat-img"></image>
			<view class="phone">
				企业咨询电话：400-926-0409
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				height: "100%",
				isDisabled: true,
				mynote: {
					phone: "",
					password: ""
				},
				info: null
			}
		},
		onLoad() {
			//#ifdef APP-PLUS
			let info = plus.push.getClientInfo();
			this.info = info;
			//#endif
			this.height = uni.getSystemInfoSync().screenHeight-67 +"px";
			this.loginout();
		},
		onShow() {
			//#ifdef APP-PLUS
			let info = plus.push.getClientInfo();
			this.info = info;
			//#endif
			this.height = uni.getSystemInfoSync().screenHeight-67 +"px";
			this.loginout();
		},
		
		// mounted(){
		// 	this.login();
			
		// },
		methods: {
			...mapMutations(['login']),
			go(url) {
				uni.navigateTo({
					url: url
				})
			},
			// 清除所有数据
			loginout(){
				uni.clearStorageSync();
			},
			login2(){
				let clientId = this.info && this.info.clientid;
				let url = ''
				if(clientId){
					url =`/pro_Servers/users/login/${this.mynote.phone}/${this.mynote.password}/${clientId}`
				}else{
					url = `/pro_Servers/users/login/${this.mynote.phone}/${this.mynote.password}`
				};
				this.$api.httpRequest({
					url,
					method: 'POST'
				}).then(res => {
					if(res.status === "ok"){
						this.$store.commit("SET_USER",  {
							...res.t
						})
						this.login(res.t)
						// uni.navigateBack();
						uni.redirectTo({
							url: '/pages/index/index'
						})
					}else{
						
						this.mynote.phone = '';
						this.mynote.password = '';
						uni.showToast({
							title: "您输入的账号或者密码不正确",
							icon: 'none'
						})
					}
					
				})
			},
			formReset(){
				this.mynote = {
					phone: '',
					password: ''
				}
			},
			formSubmit(e) {
				this.login2();
			},
			verify(e) {
				var id = e.currentTarget.id;
				var ad = this.mynote;
				var _this = this;
				for(var key in ad){
					key == id ? ad[key] = e.detail.value : ad[key];
					if(ad[key] !== ""){
						_this.isDisabled = false;
					}
					for(var k in ad){
						if(ad[k] == ""){
							_this.isDisabled = true
						}
					}
				}
			}
		},
		onBackPress() {
			// uni.showModal({
			// 	title: '提示',
			// 	content: '是否退出当前页面？',
			// 	success: (res) => {
			// 		if (res.confirm) {
			// 			uni.navigateTo({
			// 				url: `/pages/login/login`
			// 			})
						
			// 		} else if (res.cancel) {
			// 			console.log('用户点击取消');
			// 		}
			// 	}
			// });
			return true 
		
		}
	}
</script>

<style>
	.content{padding: 80upx 80upx 0 80upx;text-align: center;background-color: #fff;box-sizing: border-box;}
	.logo{width: 180upx;height: 180upx;margin-bottom: 60upx;}
	.input-box{height: 94upx;background: #fff;border-bottom: 1px solid #f0f0f0;margin-bottom: 50upx;text-align: left;}
	.input{width: 100%;height: 94upx;font-size: 30upx;float: left;line-height: 94upx;}
	.code{float: left;border-left: 1px solid #bebebe;line-height: 34upx;padding-left: 30upx;margin-top: 30upx;}
	.code-hover{color: #999;}
	.code-input{width: 600upx;}
	.enter{width: 100%;margin-top: 80upx;}
	.member{padding-top: 120upx;color: #28518c;}
	.line{color: #d9d9d9;margin: 0 30upx;}
	.button-hover{opacity: 0.6;}
	.navigator{display: inline-block;}
	.message {
		/* border: 1px solid red; */
		margin-top: 60rpx;
		text-align: center;
	}
	.wechat-img {
		width: 180upx;
		height: 180upx;
		margin-top: 20upx;
	}
</style>
