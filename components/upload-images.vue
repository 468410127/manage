<template>
	<view class="uni-list list-pd">
		<view class="uni-list-cell cell-pd">
			<view class="uni-uploader">
				<view class="uni-uploader-head">
					<view class="uni-uploader-title">点击可预览选好的图片</view>
					<view class="uni-uploader-info">{{imageList.length}}/5</view>
				</view>
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imageList" :key="index">
							<view class="uni-uploader__file">
								<view class="delete" @tap="delate(index)">
									X
								</view>
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
							</view>
						</block>
						<view class="uni-uploader__input-box">
							<view class="uni-uploader__input" @tap="chooseImage"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import qiniuUploader from './ck-uploadImg/qiniuUploader.js';
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
		data() {
			return {
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2,3,4,5],
				imgKeyList: []
				
				
			};
		},
		props: {
			// initImgList: { //页图初始化图片回显
			// 	type: Array,
			// 	default () {
			// 		return []
			// 	}
			// },
			// selectNum: {
			// 	//选择图片的数量
			// 	type: Number,
			// 	default: 1,
			// },
			token: {
				//七牛云从后台服务器获取的token,不知道的看官方文档，
				type: String,
				default: '',
			},
		},
		methods: { 
			delate(index) {
				uni.showModal({
					title: '提示',
					content: '是否要删除该图片',
					success: (res)=> {
						if(res.confirm){
							this.imageList.splice(index,1)
							this.$emit('upload', this.imageList)
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
					
				if (this.imageList.length === 5) {
					let isContinue = await this.isFullImg();
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						// this.imageList = this.imageList.concat(res.tempFilePaths);
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							let file = res.tempFilePaths[i];
							let index = file.lastIndexOf('/');
							let len = file.length
							let name = file.substring(index + 1, len)
							// 交给七牛上传
							// let newLen = this.selectNum-this.imageList.length
							qiniuUploader.upload(file, (res) => {
								// let inLen = this.selectNum-this.imageList.length
								this.imageList.push(file);
								this.imgKeyList.push(res.key)
								this.$emit('returnImgUrl', this.imgKeyList) //将图片回传父页面
							}, (error) => {
								console.log('error: ' + error);
							}, {
								region: 'SCN',
								key: name,
								uptoken: this.token, // 由其他程序生成七牛 uptoken
							}, (res) => {
								console.log('上传进度', res.progress)
							}, () => {
								// 取消上传
							}, () => {
								// `before` 上传前执行的操作
							}, (err) => {
								// `complete` 上传接受后执行的操作(无论成功还是失败都执行)
							});
						}
						// this.$emit('upload', this.imageList)
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
						content: "已经有5张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								this.imgKeyList = [];
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

<style lang="less" scoped>
	.cell-pd {
			padding: 22rpx 30rpx;
		}
	
		.list-pd {
			 margin-bottom: 100rpx;
		}
		.uni-uploader__file {
			position: relative;
		}
		.delete {
			position: absolute;
			right: 0;
			top:0;
			/* background: #333; */
			color: #fff;
			z-index: 2;
			width: 40rpx;
		}
		
		.uni-list::before {
			height: 0;
		} 

</style>
