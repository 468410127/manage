<template>
	<view class="main">
		<view class="mian-content">
			<view>
				<view class="main-fix">
					<view class="main-header">
						<view class="img">
							
						</view>
						<view class="name">
						复地连城国际花园333333
						</view>
						<i class="iconfont icon-icon-test3 back"></i>
					</view>
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
				<view class="uni-tab-bar-list">
					<!-- <swiper class="swiper-box" :style="{height: swiperHeight+'px'}" :current="tabIndex" @change="tabChange">
						<swiper-item v-for="(items,index) in dataList" :key="index">
							<scroll-view scroll-y class="list">
								<block v-for='(item,index2) in items.list' :key='index2'>
									<index-list :list='item' :index="index2"></index-list>
								</block>
							</scroll-view>
						</swiper-item>
					</swiper> -->
					<index-list :list='list' :index="tabIndex" @goJump="handleJump"></index-list>
				</view>
				<view class="main-footer">
					<button type="primary" hover-class="btn-hover" @tap="goSubmit">报事保修</button>
					<!-- <button type='primary'>我的提交</button> -->
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
				swiperHeight: null,
				tabIndex: 0,
				tabBars: [
					{
						name: '全部',
						id: 0
					},
					{
						name: '待处理',
						id: 1
					},
					{
						name: '处理中',
						id: 2
					},
					{
						name: '待付款',
						id: 3
					},{
						name: '待评价',
						id: 4
					}
				],
				list: []
			}
		},
		onLoad(){
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100);
					this.swiperHeight = height;
				}
				
			})
			this.init();
			
		},
		mounted(){
			// this.init();
			
		},
		methods: {
			init(){
				this.$api.httpRequest({
					url: `/pro_Servers/repair/`,
					method: 'get'
				}).then(res => {
					const data = res.infos || [];
					data.forEach(item => {
						item.adress = Position[item.position].name
						item.status = Status[item.repairStates].name
					})
					this.list = data;
					console.log(data, 'data')
				})
				
			},
			tabtap(index) {
				this.tabIndex = index;
			},
			goSubmit(){
				uni.navigateTo({
					url: '/pages/submit/index'
				})
			},
			handleJump(value){
				// console.log(value, '88888')
				uni.navigateTo({
					url: `/pages/details/index?repariID=${value.repariID}`
				})
			}
		}
	}
</script>

<style>
	@import './index.css'
</style>
