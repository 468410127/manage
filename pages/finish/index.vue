<template>
	<view class="finish">
		<view class="finish-list">
			<block>
				<view class="panel">
					<view class="title">
						员工
					</view>
					<view class="content">
						{{name}}
					</view>
				</view>
				<view class="panel">
					<view class="title">
						金额
					</view>
					<view class="content">
						 <input class="uni-input" @input='handleMoney' v-model="money" type="number" placeholder="请输入金额" />
					</view>
				</view>
			</block>
			
		</view>
		<view class="textarea">
			<view class="uni-textarea">
				<textarea v-model='status' placeholder="请简单描述一下报修的内容,以便我们更好的处理..." />
			</view>
			<upload-images @upload='upload' @returnImgUrl="getImgUrl" :token="upToken"></upload-images>
		</view>
		<view class="footer">
			<button type='default' class="btn" @tap='cancle'>取消</button>
			<button type='primary' class="btn" @tap="submit">确定</button>
		</view>
	</view>
</template>

<script>
	import uploadImages from '@/components/upload-images.vue'
	
	
	import { Position,Status } from '@/common/js/enum.js';
	
	export default {
		components: {
			uploadImages
		},
		data(){
			return {
				status: '',
				imglist: [],
				user: {},
				money: null,
				isRotate: false,
				upToken:'',
				urls:[],
				fixImg: null,
				userInfo: null,
				currentListInfo: null,
				name: ''
			}
		},
		onLoad(){
			
			this.userInfo = JSON.parse(uni.getStorageSync(
			     'admin',
			))
			this.currentListInfo = JSON.parse(uni.getStorageSync(
			     'currentList',
			))
			
			this.init();
			this.getToken();
			
			
		},
		methods: {
			getToken(){
				this.$api.httpRequest({
					url: '/pro_Servers/token/qiniu',
					method: 'get'
				}).then(res => {
					this.upToken = res;
				})
			},
			init(){
				this.name = this.userInfo.name;
				this.status = Status[this.currentListInfo.repairStates].name
			},
			getImgUrl(urls){
				const qiniuUrl = this.$store.state.qiniuUrl;
				let obj = {
				}
				for(let i in urls){
					const num = `${Number(i)+1}`;
					obj['fixImg'+num] = `${qiniuUrl}${urls[i]}`
				}
				this.fixImg = Object.assign({}, obj)
			},
			handleMoney(e){
				if (e.target.value.indexOf(".") < 0 && e.target.value != "") {
				} else if (e.target.value.indexOf(".") == 0) {
					e.target.value = e.target.value.replace(/[^$#$]/g, "0.");
					e.target.value = e.target.value.replace(/\.{2,}/g, ".");
				}else if(!(/^(\d?)+(\.\d{0,2})?$/.test(e.target.value))){
					e.target.value = e.target.value.substring(0, e.target.value.length - 1)
				}
				this.$nextTick(function(){
					this.money = e.target.value
				})
					
				
			},
			// 点击确定
			submit(){
				if(!this.money){
					uni.showToast({
						title: "请输入金额",
						icon: 'none'
					})
					return false
				}
				// uni.request({
				//     url: 'http://47.104.223.203:8080/pro_Servers/repair/update',
				//     header: {
				//      'content-type': 'application/x-www-form-urlencoded'
				//     },
				// 	method: 'POST',
				//     data: {
				// 		 ...this.currentListInfo,
				// 		 fixImg1: this.fixImg && this.fixImg.fixImg1?this.fixImg.fixImg1: '',
				// 		 fixImg2: this.fixImg && this.fixImg.fixImg2?this.fixImg.fixImg2: '',
				// 		 fixImg3: this.fixImg && this.fixImg.fixImg3?this.fixImg.fixImg3: '',
				// 		 fixImg4: this.fixImg && this.fixImg.fixImg4?this.fixImg.fixImg4: '',
				// 		 fixImg5: this.fixImg && this.fixImg.fixImg5?this.fixImg.fixImg5: '',
				// 		 repairStates: 3,
				// 		 repairMoney: +this.money,
						 
				//     },
				//     success: function(res) {
				// 		uni.showToast({
				// 			title: "标记成功",
				// 			icon: 'success'
				// 		})
				// 		uni.navigateTo({
				// 			url: `/pages/index/index`
				// 		})
				//     },
				    
				// });
				this.$api.httpRequest({
					url: '/pro_Servers/repair/update',
					method: 'POST'
				}, {
					...this.currentListInfo,
					 fixImg1: this.fixImg && this.fixImg.fixImg1?this.fixImg.fixImg1: '',
					 fixImg2: this.fixImg && this.fixImg.fixImg2?this.fixImg.fixImg2: '',
					 fixImg3: this.fixImg && this.fixImg.fixImg3?this.fixImg.fixImg3: '',
					 fixImg4: this.fixImg && this.fixImg.fixImg4?this.fixImg.fixImg4: '',
					 fixImg5: this.fixImg && this.fixImg.fixImg5?this.fixImg.fixImg5: '',
					 repairStates: 3,
					 repairMoney: +this.money
				}).then(res => {
					uni.showToast({
						title: "标记成功",
						icon: 'success'
					})
					uni.navigateTo({
						url: `/pages/index/index`
					})
				})
			},
			// 点击取消
			cancle(){
				uni.navigateTo({
					url: `/pages/details/index`
				})
			}
			
			 
		}
	}
</script>

<style>
	@import './index.css'
</style>
