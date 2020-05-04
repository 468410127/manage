<template>
	<view class="submit">
		<view class="textarea">
			<view class="uni-textarea">
				<textarea v-model='text' placeholder="请简单描述一下保修的内容,以便我们更好的处理..." />
			</view>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
			<input v-show='current === 1' class="uni-input" v-model='detailPosition' focus placeholder="请输入具体室外地址" />
			
		
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						当前期望上门时间
					</view>
					<view class="uni-list-cell-db">
						<picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
							<view class="uni-input">{{time}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						当前期望上门日期
					</view>
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			<upload-images @upload='upload' @returnImgUrl="getImgUrl" :token="upToken"></upload-images>
			<!-- <ck-upload-img @returnImgUrl="getImgUrl" :initImgList="urls" :selectNum=3 :token="upToken"></ck-upload-img> -->
		</view>
		<view class="footer">
			<button type='primary' class="btn" @tap="submit">提交</button>
		</view>
		
	</view>
</template>

<script>
	import uploadImages from '@/components/upload-images.vue'
	import ckUploadImg from '@/components/ck-uploadImg/ck-uploadImg.vue'
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
			uploadImages,
			ckUploadImg
		},
		data(){
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				index: 0,
				            date: currentDate,
				            time: '12:01',
				items: [{
						value: 'USA',
						name: '室内'
					},
					{
						value: 'CHN',
						name: '室外',
					}
				],
				detailPosition: '',
				current: 0,
				text: '',
				imglist: [],
				imageList: [],
				isRotate: false,
				upToken:'',//上传七牛云通过后台java接口获取token,参考文档https://developer.qiniu.com/kodo/sdk/1239/java
				urls:[],
				repairImg: null
			};
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
			onLoad(){
				this.getToken();
				
			},
		methods: {
			getToken(){
				this.$api.httpRequest({
					url: '/pro_Servers/token/qiniu',
					method: 'get'
				}).then(res => {
					// console.log(res, 'token')
					this.upToken = res;
				})
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			upload(arr) {
				this.imglist = arr;
				
			},
			submit(){
				if(!this.text){
					uni.showToast({
						icon: 'none',
						title: '请输入内容'
					});
					return;
					
				}
				if(this.current === 1 && !this.detailPosition){
					uni.showToast({
						icon: 'none',
						title: '请输入具体室外地址'
					});
					return;
				}
				const currentTime = `${this.date}`
				
				let timestamp1 = currentTime.replace(/-/g,'/');
				let timestamp2 = new Date(timestamp1).getTime();
				// console.log(currentTime, 'currentTime',timestamp2, '时间戳')
				// return
				const data = {
					repairDes: this.text,
					position: this.current,
					expectTime: timestamp2, // 期望上门时间 时间戳
					repairInfo: this.detailPosition
				}
				// console.log(data, currentTime,typeof currentTime, '上传的数据', '99999’')
				
				const requestTask1 = uni.request({
				    url: 'http://47.104.223.203:8080/pro_Servers/repair/',
				    header: {
				     'content-type': 'application/x-www-form-urlencoded'
				    },
					method: 'POST',
					
				    data: {
				     // repairDes:"新增楼道损坏测试推送",
				     // position:1,
				     // repairMoney:30,
				     // repairDel:0,
				     // repairInfo:"公共公园8888",
					 repairDes:this.text,
					 position: 1,
					 expectTime:currentTime,
					 repairMoney:30,
					 repairDel:0,
					 repairInfo:"公共公园666",
					 fixerId:0,
					 fixDes:'',
					 repairIdentify:'',
					 // repairImg1:'',
					 // repairImg2:'',
					 // repairImg3:'',
					 // repairImg4:'',
					 // repairImg5:'',
					 
					 repairStates:0,
					 fixImg1:'',
					 fixImg2:'',
					 fixImg3:'',
					 fixImg4:'',
					 fixImg5:'',
					 update_Tm:1462204800000,
					 repairStates:0,
					 ...this.repairImg
				    },
				    success: function(res) {
				     console.log(res.data);
					 	uni.navigateTo({
					 		url: '/pages/index/index'
					 	})
				    },
				    fail: function(res) {
				   
				    }
				   });
				
				
				// uni.request({  
				//     url: 'http://47.104.223.203:8080/pro_Servers/repair/', //测试域名  
				//     header: {'content-type': 'application/x-www-form-urlencoded'},
				//     method: 'POST',
				//     data: data,
				//     success: function(result) {  
				//         console.log(result.data, '数据');
				//     }  
				// });
				
				// this.$api.httpRequest({
				// 	url: `/pro_Servers/repair/`,
				// 	method: 'POST',
				// }, data).then(res => {
				// 	// console.log(res, 'res')
				// 	// console.log(this.$store, '仓库')
				// 	uni.navigateTo({
				// 		url: '/pages/index/index'
				// 	})
					
				// })
			},
			getImgUrl(urls){
				// console.log(urls, typeof urls, this.$store.state.qiniuUrl, '88888')
				const qiniuUrl = this.$store.state.qiniuUrl;
				let obj = {
					
				}
				for(let i in urls){
					obj['repairImg'+Number(i+1)] = `${qiniuUrl}${urls[i]}`
				}
				this.repairImg = Object.assign({}, obj)
				console.log(obj, 'obj',this.repairImg)
				
				
			},
			
			
			
		}
	}
</script>

<style>
	@import './index.css'
</style>
