<template>
	<view class="finish">
		<view class="finish-list">
			<block>
				<view class="panel">
					<view class="title">
						员工
					</view>
					<view class="content">
						{{user.name}}
					</view>
				</view>
				<view class="panel">
					<view class="title">
						金额
					</view>
					<view class="content">
						{{money}}
						
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
			<button type='default' class="btn">取消</button>
			<button type='primary' class="btn">确定</button>
			
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
				fixImg: null
				
				
			}
		},
		onLoad(){
			
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
				this.money = +this.$store.state.listInfo.repairMoney;
				this.user = this.$store.state.userInfo;
				this.status = Status[this.$store.state.listInfo.repairStates].name
				
				
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
			
			 
		}
	}
</script>

<style>
	@import './index.css'
</style>
