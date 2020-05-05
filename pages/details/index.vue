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
			<view class="details-list">
				<view class="header">
					<view class="title">
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
							<i class="iconfont icon-icon-test3">
							</i>
							<view class="tab-name">
								{{item.name}}
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import indexList from '@/components/index-list.vue'
	import { Position,Status } from '@/common/js/enum.js';
	// const Map = {
	// 	key: ['expectTime', 'user', 'telephone', 'repairInfo', 'repariID', 'repairDes'],
	// 	value: ['期待上门时间', '提交人', '联系电话', '报修地址', '工单编号', '报修内容']
	// }
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
						name: '日志',
						id: 1
					},
					
				],
				config: [
					{
						value: '期待上门时间',
						key: 'telephone'
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
						icon: '',
						name: '标记完成',
						path: 'mark'
					},
					{
						icon: '',
						name: '添加记录',
						path: 'finish'
					},
					{
						icon: '',
						name: '关闭工单',
						path: 'close'
					}
				],
				data: null,
				address: '',
				status: '',
				
			}
		},
		onLoad(options){
			// option
			// console.log(options, 'options');
			this.init(this.$store.state.listInfo.repariID);
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100);
					this.swiperHeight = height;
				}
				
			})
			
		},
		methods: {
			init(repariID){
				this.$api.httpRequest({
					url: `/pro_Servers/repair/repId/${repariID}`,
					method: 'get'
				}).then(res => {
					// console.log(res, 'detail')
					if(res.status === 'ok'){
						const data = res.t || {};
						this.address = Position[data.position].name;
						this.status = Status[data.repairStates].name;
						this.isStatus = data.repairStates === 0 ? true: false
						this.data = Object.assign(data, {
							user: this.$store.state.userInfo.nickName,
							telephone: this.$store.state.userInfo.phone,
						})
						console.log(this.$store.state.userInfo, this.data, 'data')
					}
				})
				
			},
			tabtap(index) {
				this.tabIndex = index;
				
			},
			goSubmit(){
				// 接单
				this.ststus(1);
			},
			ststus(num){
				uni.request({
				    url: 'http://47.104.223.203:8080/pro_Servers/repair/update',
				    header: {
				     'content-type': 'application/x-www-form-urlencoded'
				    },
					method: 'POST',
				    data: {
						 ...this.data,
						 repairStates: num
				    },
				    success: function(res) {
						console.log(res.data, '参数', num);
						if(num === 1){
							this.isStatus = false;
							console.log(this.isStatus, '状态的改变')
						}else if(num === 3){
							this.init(this.$store.state.listInfo.repariID);
							this.isFinish = true;
							// console.log(this.isFinish,this.data, '结束了')
						}
				    },
				    
				});
				
			},
			goJump(value){
				if(value === 'mark') {
					this.ststus(3);
				}else if(value === 'finish') {
					uni.navigateTo({
						url: `/pages/${value}/index`
					})
					
				}else if(value === 'close') {
					
				}
				
			}
		}
	}
</script>

<style>
	@import './index.css'
</style>
