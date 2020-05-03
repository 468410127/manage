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
							{{details.title}}
						</view>
						<view class="status">
							{{details.status}}
						</view>
						
					</view>
					<view class="content">
						<block v-for="(item,index) in details.dataList" :key="index">
							<view class="panel">
								<view class="left">
									{{item.key}}
								</view>
								<view class="right">
									{{item.value}}
								</view>
							</view>
						</block>
					</view>
				</view>
				<view class="details-footer">
					<!-- <button type="primary" hover-class="btn-hover" @tap="goSubmit">报时保修</button> -->
					
					<view class="utils">
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
						name: '详情',
						id: 0
					},
					{
						name: '日志',
						id: 1
					},
					
				],
				details: {
					title: '室内',
					status: '未处理',
					dataList: [
						{
							key: '期待上门时间',
							value: ''
						},
						{
							key: '提交人',
							value: 'LLT'
						},
						{
							key: '联系电话',
							value: '15732625925'
						},
						{
							key: '报修地址',
							value: '杭州市乔司街道石通东路复地连城国际3幢2单元798'
						},
						{
							key: '工单编号',
							value: '15666673444444444'
						},
						{
							key: '报修内容',
							value: '卧室等坏掉了，请快点来修理，是小灯泡,请快点来修理，'
						}
					]
				},
				tabList: [
					{
						icon: '',
						name: '分配工单',
						path: 'finish'
					},
					{
						icon: '',
						name: '标记完成',
						path: 'finish'
					},
					{
						icon: '',
						name: '添加记录',
						path: 'finish'
					},
					{
						icon: '',
						name: '关闭工单',
						path: 'finish'
					}
				]
				
			}
		},
		onLoad(){
			uni.getSystemInfo({
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100);
					this.swiperHeight = height;
				}
				
			})
			
		},
		methods: {
			tabtap(index) {
				this.tabIndex = index;
				
			},
			goSubmit(){
				uni.navigateTo({
					url: '/pages/submit/index'
				})
			},
			goJump(value){
				uni.navigateTo({
					url: `/pages/${value}/index`
				})
			}
		}
	}
</script>

<style>
	@import './index.css'
</style>
