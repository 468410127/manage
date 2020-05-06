<template>
	<view class="details">
		<view class="details-content">
			<view class="details-fix">
				<view class="uni-tab-bar">
					<scroll-view scroll-y="true" class="uni-swiper-tab">
						<block v-for="(tab,index) in tabBars" :key="tab.id">
							<view class="swiper-tab-list" :class="{'active':tabIndex == index}" @tap="tabtap(index)">
								{{tab.name}}
								<view class="swiper-tab-line">
								</view>
							</view>
						</block>
					</scroll-view>
				</view>
			</view>
			<view class="main" v-if='tabIndex === 0'>
				<view class="details-list">
					<view class="header">
						<view class="title">
							<i class="iconfont icon-icon-test7" @tap='goIndex'></i>
							{{address}}
						</view>
						<view class="status">
							{{status}}
						</view>
					</view>
					<view class="content">
						<block v-for="(item,index) in config" :key="index">
							<view class="panel">
								<view class="left">
									{{item.value}}
								</view>
								<view class="right" v-if='data'>
									{{data[item.key]}}
								</view>
							</view>
						</block>	
					</view>
				</view>
				<view class="details-footer" v-if='!isFinish'>
					<button type="primary" v-if='isStatus' hover-class="btn-hover" @tap="goSubmit">接单</button>
					<view class="utils" v-else>
						<block v-for="(item, index) in tabList" :key="index">
							<view class="list" @tap="goJump(item.path)">
								<!-- <i class="iconfont icon-icon-test3">
								</i> -->
								<image :src="item.img" class="img"></image>
								<view class="tab-name">
									{{item.name}}
								</view>
							</view>
						</block>
					</view>
				</view>
				
			</view>
			<view class="main" v-else>
				<view v-if='imgArr.length'>
					<block v-for="(item,index) in imgArr" :key='index'>
						<image :src="item" class="image"></image>
					</block>
				</view>
				<view class="empty">
					暂无数据
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import indexList from '@/components/index-list.vue'
	import { Position,Status } from '@/common/js/enum.js';
	
	export default {
		components: {
			indexList
			
		},
		data(){
			return {
				isFinish: false,
				isStatus: false,
				swiperHeight: null,
				tabIndex: 0,
				tabBars: [
					{
						name: '详情',
						id: 0
					},
					{
						name: '图片',
						id: 1
					},
					
				],
				config: [
					{
						value: '期待上门时间',
						key: 'expectTime'
					},
					{
						value: '提交人',
						key: 'user'
					},
					{
						value: '联系电话',
						key: 'telephone'
					},
					{
						value: '报修地址',
						key: 'repairInfo'
					},
					{
						value: '工单编号',
						key: 'repariID'
					},
					{
						value: '报修内容',
						key: 'repairDes'
					}
					
				],
				
				tabList: [
					{
						img: require("../../static/footer.png"),
						name: '标记完成',
						path: 'mark'
					},
					{
						img: require("../../static/footer2.png"),
						name: '添加记录',
						path: 'finish'
					},
					{
						img: require("../../static/footer3.png"),
						name: '关闭工单',
						path: 'close'
					}
				],
				data: null,
				address: '',
				status: '',
				userInfo: null,
				nickName: '',
				telephone: '',
				
				currentId: null, // 当前订单id
				currentListInfo: null, // 当前订单消息
				imgArr: []
				
			}
		},
		onLoad(options){
			this.userInfo = JSON.parse(uni.getStorageSync(
			     'admin',
			))
			this.currentListInfo = JSON.parse(uni.getStorageSync(
			     'currentList',
			))
			this.init(this.currentListInfo.repariID);
			
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100);
					this.swiperHeight = height;
				}
			})
		},
		onLoad(options){
			this.userInfo = JSON.parse(uni.getStorageSync(
			     'admin',
			))
			this.currentListInfo = JSON.parse(uni.getStorageSync(
			     'currentList',
			))
			this.init(this.currentListInfo.repariID);
			
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100);
					this.swiperHeight = height;
				}
			})
		},
		methods: {
			// 返回
			goIndex(){
				uni.redirectTo({
				    url: `/pages/index/index`
				});
			},
			init(repariID){
				this.$api.httpRequest({
					url: `/pro_Servers/repair/repId/${repariID}`,
					method: 'get'
				}).then(res => {
					if(res.status === 'ok'){
						const data = res.t || {};
						this.address = Position[data.position].name;
						this.status = Status[data.repairStates].name;
						this.isStatus = data.repairStates === 0 ? true: false;
						
						if(this.userInfo.userRole === 1){
							this.isFinish = true;
						}else{
							this.isFinish = data.repairStates === 3 || data.repairStates === 4? true: false;
						}
						// 获取当前下单人的信息
						
						this.$api.httpRequest({
							url: `/pro_Servers/owner/ownerID/${data.ownerID}`,
							method: 'get'
						}).then(res => {
							if(res.status === 'ok'){
								const data2 = res.t || {};
								if(data2){
									this.nickName = data2.ownerName;
									this.telephone = data2.ownerTel;
									this.data = Object.assign(data, {
										user: this.nickName,
										telephone: this.telephone,
										expectTime: data.expectTime !== null ?data.expectTime:''
									})
								}
							}
						})
					}
				})
				
			},
			tabtap(index) {
				this.tabIndex = index;
				if(index === 1){
					let arr = [];
					for(let key in this.currentListInfo){
						if(typeof this.currentListInfo[key] === 'string' && this.currentListInfo[key] &&  this.currentListInfo[key].includes('http') ){
							arr.push(this.currentListInfo[key])
						}
					}
					this.imgArr = arr;
				}
			},
			goSubmit(){
				// 接单
				this.ststus(1);
			},
			ststus(num,type){
				const repariID = this.data.repariID;
				// uni.request({
				//     url: 'http://47.104.223.203:8080/pro_Servers/repair/update',
				//     header: {
				//      'content-type': 'application/x-www-form-urlencoded'
				//     },
				// 	method: 'POST',
				//     data: {
				// 		 ...this.data,
				// 		 repairStates: num
				//     },
				//     success: (res)=> {
				// 		if(num === 1){
				// 			this.init(repariID);
				// 			this.isStatus = false;
				// 			uni.showToast({
				// 				title: "接单成功",
				// 				icon: 'success'
				// 			})
				// 		}else if(num === 3 && type === 'close'){
				// 			this.init(repariID);
				// 			this.isFinish = true;
				// 			uni.showToast({
				// 				title: "处理成功",
				// 				icon: 'success'
				// 			})
				// 		}else if(num === 3 && type === 'mark'){
				// 			this.init(repariID);
				// 			this.isFinish = true;
				// 			uni.redirectTo({
				// 			    url: `/pages/index/index`
				// 			});
				// 		}
				//     },
				// });
				this.$api.httpRequest({
					url: `/pro_Servers/repair/update`,
					method: 'POST'
				}, {
					...this.data,
					repairStates: num
				}).then(res => {
					if(num === 1){
						this.init(repariID);
						this.isStatus = false;
						uni.showToast({
							title: "接单成功",
							icon: 'success'
						})
					}else if(num === 3 && type === 'close'){
						this.init(repariID);
						this.isFinish = true;
						uni.showToast({
							title: "处理成功",
							icon: 'success'
						})
					}else if(num === 3 && type === 'mark'){
						this.init(repariID);
						this.isFinish = true;
						uni.redirectTo({
						    url: `/pages/index/index`
						});
					}
				})
			},
			goJump(value){
				if(value === 'mark') {
					this.ststus(3, value); // 标记完成
				}else if(value === 'finish') {
					uni.navigateTo({
						url: `/pages/${value}/index`
					})
				}else if(value === 'close') {
					this.ststus(3,value); // 已结束
				}
			}
		},
		onShow(){
			this.userInfo = JSON.parse(uni.getStorageSync(
			     'admin',
			))
			this.currentListInfo = JSON.parse(uni.getStorageSync(
			     'currentList',
			))
			this.init(this.currentListInfo.repariID);
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100);
					this.swiperHeight = height;
				}
			})
		},
	}
</script>

<style>
	@import './index.css'
</style>
