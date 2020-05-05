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
						 <input class="uni-input" @change='handleMoney' v-model="money" type="number" placeholder="这是一个数字输入框" />
					</view>
				</view>
			</block>
			
		</view>
		<view class="textarea">
			<view class="uni-textarea">
				<textarea v-model='status' placeholder="请简单描述一下保修的内容,以便我们更好的处理..." />
			</view>
			<!-- <upload-images @upload='upload'></upload-images> -->
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
			console.log('加载页面')
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
					// console.log(res, 'token')
					this.upToken = res;
				})
			},
			init(){
				console.log(this.userInfo, '金额')
				// this.money = +this.userInfo.repairMoney;
				this.name = this.userInfo.name;
				// this.user = this.$store.state.userInfo;
				this.status = Status[this.currentListInfo.repairStates].name
				
				
			},
			getImgUrl(urls){
				const qiniuUrl = this.$store.state.qiniuUrl;
				let obj = {
				}
				for(let i in urls){
					obj['fixImg'+Number(i+1)] = `${qiniuUrl}${urls[i]}`
				}
				this.fixImg = Object.assign({}, obj)
				console.log(obj, 'obj',this.fixImg)
			},
			handleMoney(value){
				// console.log(value, 'vavvv')
				// this.money = this.money.toFixed(2);
				
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
				
				uni.request({
				    url: 'http://47.104.223.203:8080/pro_Servers/repair/update',
				    header: {
				     'content-type': 'application/x-www-form-urlencoded'
				    },
					method: 'POST',
				    data: {
						 ...this.currentListInfo,
						 ...this.fixImg,
						 repairStates: 3,
						 repairMoney: +this.money,
						 
				    },
				    success: function(res) {
						uni.showToast({
							title: "标记成功",
							icon: 'success'
						})
						uni.navigateTo({
							url: `/pages/index/index`
						})
				    },
				    
				});
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
