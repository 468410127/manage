<template>
	<view class="empty">
		<view class="main">
			暂无数据
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	.empty {
		// padding: 20rpx;
		// height: 400rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: calc(100vh - 200rpx);
		box-sizing: border-box;
		.main {
			margin: 0 auto;
			font-size: 14px;
			font-weight: bold;
			
		}
	}

</style>
