<template>
	<view class="finish">
		<view class="finish-list">
			<block>
				<view class="panel">
					<view class="title">
						部门
					</view>
					<view class="content">
						4444444
						<i class="iconfont icon-icon-test3">
						</i>
					</view>
					
				</view>
				<view class="panel">
					<view class="title">
						员工
					</view>
					<view class="content">
						4444444
						<i class="iconfont icon-icon-test3">
						</i>
					</view>
					
				</view>
				<view class="panel">
					<view class="title">
						金额
					</view>
					<view class="content">
						10
						
					</view>
					
				</view>
				
			</block>
			
			
		</view>
		<view class="textarea">
			<view class="uni-textarea">
				<textarea v-model='text' placeholder="请简单描述一下保修的内容,以便我们更好的处理..." />
			</view>
			
			<upload-images @upload='upload'></upload-images>
			
		</view>
		<view class="footer">
			<button type='default' class="btn">取消</button>
			<button type='primary' class="btn">确定</button>
			
		</view>
		
		
		
		
	</view>
</template>

<script>
	import uploadImages from '@/components/upload-images.vue'
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		components: {
			uploadImages
		},
		data(){
			return {
				text: '已完成',
				imglist: [],
				
				
			}
		},
		methods: {
			upload(arr) {
				this.imglist = arr;
				
			},
			delate(index) {
				uni.showModal({
					title: '提示',
					content: '是否要删除该图片',
					success: (res)=> {
						if(res.confirm){
							this.imageList.splice(index,1)
						}
					}
				})
				
			},
			sourceTypeChange: function(e) {
				this.sourceTypeIndex = parseInt(e.detail.value)
			},
			sizeTypeChange: function(e) {
				this.sizeTypeIndex = parseInt(e.detail.value)
			},
			countChange: function(e) {
				this.countIndex = e.detail.value;
			},
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
		
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			async checkPermission(code) {
				let type = code ? code - 1 : this.sourceTypeIndex;
				let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
					await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
						'android.permission.READ_EXTERNAL_STORAGE');
		
				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "没有开启权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
		
				return status;
			}
		}
	}
</script>

<style>
	@import './index.css'
</style>
