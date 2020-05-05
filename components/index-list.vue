<template>
	<view class="index-list">
		<block v-for="(item, index) in list" :key='index'>
			<view class="panel">
				<view class="date">
					{{item.update_Tm}}
					
				</view>
				<view class="item" @tap="goDetails(item)">
					<view class="header">
						<view class="title">
							{{item.adress}}
						</view>
						<view class="status">
							{{item.status}}
							<i class="iconfont icon-icon-test3">
							</i>
						</view>
					</view>
					<view class="content">
						{{item.repairDes}}
					</view>
					
					
				</view>
			</view>
			
			
		</block>
	</view>
</template>
<!-- 
import indexList from '@/components/index-list.vue' -->

<script>
	import { Position } from '@/common/js/enum.js';
	export default {
		props: {
			list: Array,
			index: Number
		},
		data() {
			return {
				
				
			};
		},
		onLoad(){
			
		},
		created(){
		},
		methods: {
			goDetails(value){
				this.$emit('goJump',value)
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.index-list {
		box-sizing: border-box;  
		padding: 0 20rpx;
		.date {
			text-align: center;
			line-height: 60rpx;
			margin: 20rpx 0;
			
		}
		.item {
			border-radius: 10rpx;
			background: #fff;
			padding: 0 20rpx;
			.header {
				display: flex;
				justify-content: space-between;
				vertical-align: middle;
				padding: 20rpx 0;
				border-bottom: 1px solid #FFF4F4F4;
				.title {
					line-height: 60rpx;
					font-size: 14px;
				}
				.status {
					line-height: 60rpx;
					font-size: 14px;
					color: #007AFF;
					i {
						color: #333;
						vertical-align: bottom;
						
					}
				}
				
				
			}
			
			.content {
				color: #969696;
				line-height: 60rpx;
				padding: 20rpx 0 30rpx 0;
				font-size: 14px;
				width: 100%;
				word-wrap: break-word;
				
			}
			
		}
		
		
		
	}
	
	
	
	

</style>
