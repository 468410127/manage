<template>
	<view>
		<view class="upload-img">
			<view>
				<view class="ck-img" v-for="(item, index) in imgList" :key="index" @click="perviewImg(index)">
					<image :src="item" v-if="item"></image>
					<view class="ck-icon-close" @click.stop="handRemove(index)">
						<view class="cuIcon-roundclosefill"></view>
					</view>
				</view>
				<view class="ck-img-add" @click="chooseImage">
					<view class="cuIcon-cameraadd"></view>
				</view>
			</view>
		</view>
		
		<!-- <upload-images @upload='upload'></upload-images> -->
	</view>
</template>

<script>
	import qiniuUploader from './qiniuUploader.js';
	export default {
		name: 'ck-upload-img',
		components: {},
		data() {
			return {
				imgList: [],
				imgKeyList: []
			};
		},
		props: {
			initImgList: { //页图初始化图片回显
				type: Array,
				default () {
					return []
				}
			},
			selectNum: {
				//选择图片的数量
				type: Number,
				default: 1,
			},
			token: {
				//七牛云从后台服务器获取的token,不知道的看官方文档，
				type: String,
				default: '',
			},
		},
		computed: {},
		created() {
			this.initImg();
		},
		methods: {
			initImg() {
				console.log(this.token, 'token')
				//传入图片，回显
				this.imgList = this.initImgList;
				for (var i = 0; i < this.imgList.length; i++) {
					let name = this.getUrlKey(this.imgList[i]);
					this.imgKeyList.push(name)
				}
				console.log('selectNum=' + this.selectNum)
			},
			chooseImage() {
				uni.chooseImage({
					count: this.selectNum, //默认9
					success: (chooseImageRes) => {
						for (var i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
							let file = chooseImageRes.tempFilePaths[i];
							let index = file.lastIndexOf('/');
							let len = file.length
							let name = file.substring(index + 1, len)
							// 交给七牛上传
							let newLen = this.selectNum-this.imgList.length
							if (newLen > 0) {
								qiniuUploader.upload(file, (res) => {
									let inLen = this.selectNum-this.imgList.length
									if (inLen > 0) {
										this.imgList.push(file);
										this.imgKeyList.push(res.key)
									}
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
						}
					}
				})
			},
			perviewImg(index) {
				let urls = [];
				if (index != -1) {
					urls[0] = this.imgList[index];
				} else {
					urls = this.imgList;
				}
				uni.previewImage({
					urls: urls
				});
			},
			handRemove(index) {
				let il = [],
					ibl = [];
				for (var i = 0; i < this.imgList.length; i++) {
					if (i != index) {
						il.push(this.imgList[i]);
						ibl.push(this.imgKeyList[i]);
					}
				}
				this.imgList = il;
				this.imgKeyList = ibl;
			},
			getUrlKey(file) {
				let index = file.lastIndexOf('/');
				let len = file.length
				let name = file.substring(index + 1, len)
				return name;
			}
		}
	}
</script>

<style>
	.ck-img-add {
		border: 1px solid red;
		
	}
	.upload-img {
		margin: 5upx 20upx;
	}

	.ck-img {
		float: left;
		margin-right: 10upx;
		border-radius: 20upx;
		height: 115upx;
	}

	.ck-img>image {
		border-radius: 20upx;
	}

	.ck-img-add {
		float: left;
		margin-right: 10upx;
		height: 100upx;
		width: 100upx;
		background-color: #C8C7CC;
		text-align: center;
		font-size: 90upx;
		border-radius: 20upx;
		margin-bottom: 10upx;
	}

	.ck-img>image {
		height: 100upx;
		width: 100upx;
	}

	.ck-icon-close {
		position: relative;
		right: -75upx;
		top: -120upx;
		color: #DC2929;
	}

	.ck-icon-close>view {
		font-size: 40upx;
	}
</style>
