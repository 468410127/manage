<template>
	<view class="main">
		<view class="mian-content">
			<view>
				<view class="main-fix">
					<view class="main-header">
						<!-- <image src="../../static/index.png" class="img"></image> -->
						<i class="iconfont  icon-dingwei"></i>
						<view class="name">
						{{location}}
						</view>
						<i class="iconfont icon-loginout" @tap='loginout'></i>
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
					<index-list v-if='list.length' :list='list' :index="tabIndex" @goJump="handleJump"></index-list>
					<empty-page v-else></empty-page>
				</view>
				<view class="main-footer">
					<button  v-if='isUser' type="primary" tisUserype="primary" hover-class="btn-hover" @tap="goSubmit">报事报修</button>
					<!-- <button type="primary" hover-class="btn-hover" @tap="goSubmit">接单</button> -->
					<!-- <button type='primary'>我的提交</button> -->
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import indexList from '@/components/index-list.vue'
	import emptyPage from '@/components/empty-page.vue'
	import { Position,Status } from '@/common/js/enum.js';
	import { formateDate } from '@/common/js/utils.js';
	export default {
		components: {
			indexList,
			emptyPage
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
					// {
					// 	name: '未付款',
					// 	id: 3
					// },
					{
						name: '已结束',
						id: 3
					},{
						name: '已评价',
						id: 4
					}
				],
				list: [],
				location: '',
				allDataList: [],
				isUser: false,
				userInfo: null
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
			this.getLocation();
		},
		mounted(){
			
		},
		methods: {
			init(){
				this.userInfo = JSON.parse(uni.getStorageSync(
				     'admin',
				))
				
				if(this.userInfo.userRole === 2){
					this.isUser = false; // // 修理工
					
				}else if(this.userInfo.userRole === 1) {
					
					this.isUser = true;  // 业主
				}
				this.location =this.userInfo.houserDes;
				// this.location =this.userInfo.nickName;
				this.$api.httpRequest({
					url: `/pro_Servers/repair/`,
					method: 'get'
				}).then(res => {
					const data = res.infos || [];
					data.forEach(item => {
						item.adress = Position[item.position].name
						item.status = Status[item.repairStates].name
						// item.update_Tm = formateDate(item.update_Tm, 'Y-M-D')
					})
					data.sort(function(a,b){return a.repairStates>b.repairStates?1:-1});
					this.list = data;
					this.allDataList = data;
					
				})
				
			},
			// 获取用户地理位置
			getLocation(){
				this.$api.httpRequest({
					url: `/pro_Servers/owner/`,
					method: 'get'
				}).then(res => {
					const data = res.infos || [];
					// const currentUser = data.find(item => {
					// 	return item.ownerID === this.$store.state.userInfo.id
					// })
					
				})
			},
			// 登出
			loginout(){
				console.log('登出')
				this.$api.httpRequest({
					url: '/pro_Servers/users/loginOut/',
					method: 'POST'
				}).then(res => {
					console.log()
					// 清除所有本地数据
					uni.clearStorageSync();
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}).catch(err => {
					uni.clearStorageSync();
					uni.navigateTo({
						url: '/pages/login/login'
					})
				})
				
			},
			tabtap(index) {
				this.tabIndex = index;
				if(index == 0){
					this.list = this.allDataList;
					
				}else if(index == 3){
					this.getList(index)
				}else if(index == 4) {
					this.getList(index)
				}else{
					this.getList(Number(index - 1))
				}
			},
			getList(index){
				this.list = this.allDataList.filter(item => {
					return item.repairStates === index
				});
			},
			goSubmit(){
				uni.navigateTo({
					url: '/pages/submit/index'
				})
			},
			handleJump(value){
				this.$store.commit("SET_LIST_INFO",  {
					...value
				})
				console.log(value, '999')
				uni.setStorage({
				    key: 'repariID',
				    data: value.repariID,
				});
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
